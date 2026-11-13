#!/usr/bin/env node
/**
 * XRAY/DESIGN kit helper. Copies catalog files into the project and tracks them in a lock file.
 * Run from the project root. No dependencies (Node 18+).
 *
 *   node .agents/skills/design/scripts/lock.mjs init --ui src/ui --stack react [--tailwind] [--no-base]
 *   node .agents/skills/design/scripts/lock.mjs add segmented dialog
 *   node .agents/skills/design/scripts/lock.mjs status
 *   node .agents/skills/design/scripts/lock.mjs upgrade --base .agents/design.prev
 *
 * Options: --catalog <dir> (default .agents/design), --lock <file> (default .agents/design.lock.json)
 *
 * Catalog paths map 1:1 into the UI folder: <catalog>/components/x/x.css -> <ui>/components/x/x.css,
 * so the components' relative imports (../../motion/motion.js) keep working.
 */
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const args = process.argv.slice(2);
const command = args[0];
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};
const VALUE_OPTIONS = new Set(["--ui", "--stack", "--catalog", "--lock", "--base"]);
const positional = args.slice(1).filter((a, i, all) => !a.startsWith("--") && !VALUE_OPTIONS.has(all[i]) && !VALUE_OPTIONS.has(all[i - 1]));

const CATALOG = option("catalog", ".agents/design");
const LOCK = option("lock", ".agents/design.lock.json");

const sha = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const fail = (message) => { console.error(`error: ${message}`); process.exit(1); };
const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const manifestOf = (catalog) => {
  const file = join(catalog, "manifest.json");
  if (!existsSync(file)) fail(`no manifest at ${file}. Is the kit in ${catalog}?`);
  return readJson(file);
};
const readLock = () => (existsSync(LOCK) ? readJson(LOCK) : fail(`no lock at ${LOCK}. Run "init" first.`));
const writeLock = (lock) => {
  lock.components.sort();
  lock.files = Object.fromEntries(Object.entries(lock.files).sort(([a], [b]) => a.localeCompare(b)));
  mkdirSync(dirname(LOCK), { recursive: true });
  writeFileSync(LOCK, JSON.stringify(lock, null, 2) + "\n");
};

/** Files of one component for this stack. */
function componentFiles(manifest, catalog, id, stack) {
  const meta = manifest.components[id];
  const tsx = meta.files.filter((f) => f.endsWith(".tsx"));
  const importedByTsx = (file) => {
    const base = file.split("/").pop().replace(/\.d\.ts$/, ".js");
    return tsx.some((t) => readFileSync(join(catalog, t), "utf8").includes(`./${base}`));
  };
  return meta.files.filter((f) => {
    if (f.endsWith(".md") || f.endsWith(".html")) return false; // docs and reference markup stay in the catalog
    if (f.endsWith(".css")) return true;
    if (stack === "html") return f.endsWith(".js");
    if (f.endsWith(".tsx")) return true;
    return importedByTsx(f); // react: controllers and their types only when the component imports them
  });
}

/** Every catalog file needed for these components, dependencies included. */
function closure(manifest, catalog, ids, lock) {
  const seen = new Set();
  const files = new Set();
  const visit = (id) => {
    if (seen.has(id)) return;
    const meta = manifest.components[id];
    if (!meta) fail(`unknown component "${id}". Known: ${Object.keys(manifest.components).join(", ")}`);
    seen.add(id);
    for (const dep of meta.components) visit(dep);
    for (const group of meta.requires) for (const f of manifest.shared[group] ?? []) {
      if (lock.stack === "html" && f.endsWith(".d.ts")) continue;
      files.add(f);
    }
    for (const f of componentFiles(manifest, catalog, id, lock.stack)) files.add(f);
  };
  ids.forEach(visit);
  return { ids: [...seen], files: [...files] };
}

function copyIn(lock, catalog, file, report) {
  const target = join(lock.uiRoot, file);
  if (existsSync(target)) {
    if (!lock.files[file]) report.push(`  kept   ${target} (exists and is not from the kit; not overwritten)`);
    return;
  }
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(join(catalog, file), target);
  lock.files[file] = sha(join(catalog, file));
  report.push(`  added  ${target}`);
}

switch (command) {
  case "init": {
    if (existsSync(LOCK)) fail(`${LOCK} already exists.`);
    const manifest = manifestOf(CATALOG);
    const stack = option("stack");
    if (!["react", "html"].includes(stack)) fail('--stack must be "react" or "html"');
    const lock = {
      kit: { version: manifest.version, commit: manifest.commit },
      uiRoot: option("ui", "src/ui"),
      stack,
      tailwind: flag("tailwind"),
      base: !flag("no-base"),
      components: [],
      files: {},
    };
    const report = [];
    const groups = ["tokens", ...(lock.tailwind ? ["tailwind"] : []), ...(lock.base ? ["base"] : [])];
    for (const group of groups) for (const f of manifest.shared[group]) copyIn(lock, CATALOG, f, report);
    writeLock(lock);
    console.log(`XRAY/DESIGN ${manifest.version} set up in ${lock.uiRoot} (${stack}${lock.tailwind ? " + tailwind" : ""})`);
    console.log(report.join("\n"));
    console.log(`\nNext: load ${join(lock.uiRoot, "tokens/tokens.css")}${lock.base ? ` and ${join(lock.uiRoot, "base/base.css")}` : ""} globally.`);
    break;
  }

  case "add": {
    if (!positional.length) fail("name at least one component");
    const lock = readLock();
    const manifest = manifestOf(CATALOG);
    if (manifest.version !== lock.kit.version) fail(`catalog is ${manifest.version} but the project is on ${lock.kit.version}; finish the upgrade first`);
    const { ids, files } = closure(manifest, CATALOG, positional, lock);
    const report = [];
    for (const f of files) copyIn(lock, CATALOG, f, report);
    lock.components = [...new Set([...lock.components, ...ids])];
    writeLock(lock);
    console.log(`Added ${ids.join(", ")}`);
    console.log(report.length ? report.join("\n") : "  (all files already present)");
    break;
  }

  case "status": {
    const lock = readLock();
    const manifest = existsSync(join(CATALOG, "manifest.json")) ? readJson(join(CATALOG, "manifest.json")) : null;
    console.log(`kit ${lock.kit.version} (${lock.kit.commit ?? "unknown commit"}) in ${lock.uiRoot}, ${lock.stack}${lock.tailwind ? " + tailwind" : ""}`);
    if (manifest && manifest.version !== lock.kit.version) console.log(`catalog is ${manifest.version}: an upgrade is in progress or pending`);
    console.log(`components: ${lock.components.join(", ") || "none"}`);
    for (const [file, hash] of Object.entries(lock.files)) {
      const target = join(lock.uiRoot, file);
      const state = !existsSync(target) ? "missing" : sha(target) === hash ? "unchanged" : "modified";
      console.log(`  ${state.padEnd(9)} ${target}`);
    }
    if (manifest) {
      const available = Object.keys(manifest.components).filter((id) => !lock.components.includes(id));
      if (available.length) console.log(`available: ${available.join(", ")}`);
    }
    break;
  }

  case "upgrade": {
    const base = option("base");
    if (!base || !existsSync(base)) fail("--base <old catalog dir> is required (move the old .agents/design there first)");
    const lock = readLock();
    const manifest = manifestOf(CATALOG);
    const git = spawnSync("git", ["--version"]).status === 0;
    const report = [];
    const conflicts = [];

    for (const [file, pristine] of Object.entries(lock.files)) {
      const target = join(lock.uiRoot, file);
      const theirs = join(CATALOG, file);
      const ancestor = join(base, file);
      if (!existsSync(theirs)) { report.push(`  removed upstream, kept locally: ${target}`); delete lock.files[file]; continue; }
      if (!existsSync(target)) { report.push(`  missing locally, skipped: ${target}`); continue; }
      const next = sha(theirs);
      if (next === pristine) continue; // kit did not change this file
      if (sha(target) === pristine) {
        copyFileSync(theirs, target);
        report.push(`  updated  ${target}`);
      } else if (git && existsSync(ancestor)) {
        const r = spawnSync("git", ["merge-file", "-L", "project", "-L", `kit ${lock.kit.version}`, "-L", `kit ${manifest.version}`, target, ancestor, theirs]);
        if (r.status === 0) report.push(`  merged   ${target}`);
        else if (r.status > 0) { conflicts.push(target); report.push(`  CONFLICT ${target} (${r.status} conflict${r.status > 1 ? "s" : ""})`); }
        else fail(`git merge-file failed on ${target}: ${r.stderr}`);
      } else {
        copyFileSync(theirs, `${target}.kit-new`);
        conflicts.push(target);
        report.push(`  MANUAL   ${target} (new kit version written to ${target}.kit-new)`);
      }
      lock.files[file] = next;
    }

    // Files the new version needs that the old one did not.
    const known = lock.components.filter((id) => manifest.components[id]);
    const { files } = closure(manifest, CATALOG, known, lock);
    for (const f of files) if (!lock.files[f]) copyIn(lock, CATALOG, f, report);
    for (const id of lock.components) if (!manifest.components[id]) report.push(`  component "${id}" no longer exists in the kit; its files were kept`);

    const from = lock.kit.version;
    lock.kit = { version: manifest.version, commit: manifest.commit };
    writeLock(lock);
    console.log(`Upgraded ${from} -> ${manifest.version}`);
    console.log(report.length ? report.join("\n") : "  no file changes");
    if (conflicts.length) {
      console.log(`\nResolve ${conflicts.length} file(s) before finishing:\n${conflicts.map((c) => `  ${c}`).join("\n")}`);
      process.exitCode = 2;
    }
    break;
  }

  default:
    console.log("usage: lock.mjs <init|add|status|upgrade> [options] (see the header of this file)");
    process.exitCode = command ? 1 : 0;
}
