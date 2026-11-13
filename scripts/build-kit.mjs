#!/usr/bin/env node
/**
 * Builds the installable kit from src/ into dist/:
 *
 *   dist/README.md            install instructions (kit branch root)
 *   dist/design/              -> <project>/.agents/design/
 *     VERSION, manifest.json, RULES.md, tokens/, base/, motion/, components/<id>/
 *   dist/skills/design/       -> <project>/.agents/skills/design/
 *
 * Files are copied, not compiled: the kit ships readable source that agents adapt.
 * The build fails on any validation error (see validate* below).
 */
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const DIST = join(ROOT, "dist");
const KIT = join(DIST, "design");
const SKILL = join(DIST, "skills", "design");

const SHARED = {
  tokens: ["tokens/tokens.css"],
  tailwind: ["tokens/tailwind.css"],
  base: ["base/base.css"],
  motion: ["motion/motion.js", "motion/motion.d.ts"],
  spring: ["motion/spring.js", "motion/spring.d.ts"],
};
const DEV_ONLY = /\.(demo|test|stories)\.[jt]sx?$/;

const errors = [];
const error = (where, message) => errors.push(`${where}: ${message}`);
const read = (file) => readFileSync(file, "utf8");
const sha = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const p = join(dir, name);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

/** Minimal frontmatter: `key: value`, `key: [a, b]`, numbers. */
function frontmatter(file) {
  const match = read(file).match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const raw = m[2].trim();
    data[m[1]] = raw.startsWith("[")
      ? raw.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean)
      : /^\d+$/.test(raw) ? Number(raw) : raw;
  }
  return data;
}

function git(cmd) {
  try { return execSync(`git ${cmd}`, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); }
  catch { return ""; }
}

// ---------------------------------------------------------------------------
// Collect
// ---------------------------------------------------------------------------
const pkg = JSON.parse(read(join(ROOT, "package.json")));
const commit = git("rev-parse --short HEAD") || "unknown";
const dirty = git("status --porcelain -- src") ? "-dirty" : "";

const componentIds = readdirSync(join(SRC, "components")).filter((d) => statSync(join(SRC, "components", d)).isDirectory()).sort();
const components = {};
for (const id of componentIds) {
  const dir = join(SRC, "components", id);
  const docFile = join(dir, "COMPONENT.md");
  if (!existsSync(docFile)) { error(`components/${id}`, "missing COMPONENT.md"); continue; }
  const meta = frontmatter(docFile);
  if (!meta) { error(`components/${id}/COMPONENT.md`, "missing frontmatter"); continue; }
  for (const key of ["id", "name", "summary", "motion", "requires", "components", "files"]) {
    if (meta[key] === undefined) error(`components/${id}/COMPONENT.md`, `frontmatter needs "${key}"`);
  }
  const shipped = readdirSync(dir).filter((f) => f !== "COMPONENT.md" && !DEV_ONLY.test(f)).sort();
  components[id] = { meta, dir, shipped };
}

// ---------------------------------------------------------------------------
// Validate
// ---------------------------------------------------------------------------
const tokensCss = read(join(SRC, "tokens/tokens.css"));
const defined = new Set();
const collectDefined = (css) => { for (const m of css.matchAll(/(--x-[\w-]+)\s*:/g)) defined.add(m[1]); };
collectDefined(tokensCss);
for (const { dir, shipped } of Object.values(components)) for (const f of shipped) if (f.endsWith(".css")) collectDefined(read(join(dir, f)));
collectDefined(read(join(SRC, "base/base.css")));

for (const [id, { meta, dir, shipped }] of Object.entries(components)) {
  const where = `components/${id}`;
  if (meta.id !== id) error(where, `frontmatter id "${meta.id}" does not match the folder`);
  if (typeof meta.motion !== "number" || meta.motion < 0 || meta.motion > 2) error(where, "motion must be 0, 1 or 2");

  // files list = shipped files
  const listed = [...(meta.files ?? [])].sort();
  for (const f of listed) if (!shipped.includes(f)) error(where, `lists ${f}, which does not exist`);
  for (const f of shipped) if (!listed.includes(f)) error(where, `${f} is not listed in COMPONENT.md files`);
  if (!shipped.some((f) => f.endsWith(".css"))) error(where, "needs a .css file");
  if (!shipped.some((f) => f.endsWith(".html"))) error(where, "needs an .html reference");

  for (const r of meta.requires ?? []) if (!SHARED[r]) error(where, `requires unknown shared group "${r}"`);
  if (!(meta.requires ?? []).includes("tokens")) error(where, 'requires must include "tokens"');
  for (const c of meta.components ?? []) if (!components[c]) error(where, `depends on unknown component "${c}"`);

  for (const f of shipped) {
    const file = join(dir, f);
    const text = read(file);

    if (f.endsWith(".css")) {
      const css = stripComments(text);
      if (!css.includes("@layer x.components")) error(`${where}/${f}`, "must be wrapped in @layer x.components");
      for (const m of css.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(/g)) error(`${where}/${f}`, `raw color "${m[0]}": use a token`);
      for (const m of css.matchAll(/\b(box-shadow|backdrop-filter|text-shadow)\s*:/g)) error(`${where}/${f}`, `"${m[1]}" breaks the flat-surface rule`);
      for (const m of css.matchAll(/\b\d+(?:\.\d+)?m?s\b(?![^(]*\))/g)) {
        // durations must come from tokens; allowed only inside calc()/linear() and for the spinner
        if (!/700ms linear infinite/.test(css.slice(Math.max(0, m.index - 2), m.index + 30))) error(`${where}/${f}`, `hard-coded duration "${m[0]}": use a motion token`);
      }
      for (const m of css.matchAll(/var\((--x-[\w-]+)\s*\)/g)) if (!defined.has(m[1])) error(`${where}/${f}`, `${m[1]} is not defined (typo, or add a fallback if JS sets it)`);
    }

    if (/\.(tsx|js)$/.test(f)) {
      for (const m of text.matchAll(/from\s+["'](\.[^"']+)["']|import\s+["'](\.[^"']+)["']/g)) {
        const spec = m[1] ?? m[2];
        const target = resolve(dir, spec);
        const candidates = [target, `${target}.tsx`, `${target}.ts`, `${target}.js`];
        if (!candidates.some((c) => existsSync(c))) { error(`${where}/${f}`, `import "${spec}" does not resolve`); continue; }
        const rel = relative(SRC, target);
        if (rel.startsWith("motion/") && !meta.requires.includes("motion") && !meta.requires.includes("spring")) error(`${where}/${f}`, `imports ${spec} but requires lacks "motion"`);
        const other = rel.match(/^components\/([^/]+)\//)?.[1];
        if (other && other !== id && !meta.components.includes(other)) error(`${where}/${f}`, `imports ${spec} but components lacks "${other}"`);
        if (!rel.startsWith("motion/") && !rel.startsWith("components/")) error(`${where}/${f}`, `import ${spec} leaves the kit layout`);
      }
      if (f.endsWith(".tsx") && /\b(useState|useEffect|useLayoutEffect|useRef|useId)\b/.test(text) && !text.startsWith('"use client"')) {
        error(`${where}/${f}`, 'uses hooks, so it must start with "use client"');
      }
    }

    if (f.endsWith(".js")) {
      const types = f.replace(/\.js$/, ".d.ts");
      const importedByTsx = shipped.some((t) => t.endsWith(".tsx") && read(join(dir, t)).includes(`./${f}`));
      if (importedByTsx && !shipped.includes(types)) error(`${where}/${f}`, `is imported by React, so ship ${types}`);
    }
  }
}
for (const files of Object.values(SHARED)) for (const f of files) if (!existsSync(join(SRC, f))) error(`src/${f}`, "shared file missing");
if (!existsSync(join(SRC, "rules/RULES.md"))) error("src/rules", "RULES.md missing");
if (!existsSync(join(SRC, "skill/SKILL.md"))) error("src/skill", "SKILL.md missing");

if (errors.length) {
  console.error(`Kit validation failed (${errors.length}):\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------
rmSync(DIST, { recursive: true, force: true });
mkdirSync(KIT, { recursive: true });

const copy = (from, to) => { mkdirSync(dirname(to), { recursive: true }); cpSync(from, to); };
for (const files of Object.values(SHARED)) for (const f of files) copy(join(SRC, f), join(KIT, f));
copy(join(SRC, "rules/RULES.md"), join(KIT, "RULES.md"));
if (existsSync(join(SRC, "CHANGELOG.md"))) copy(join(SRC, "CHANGELOG.md"), join(KIT, "CHANGELOG.md"));
for (const [id, { dir, shipped }] of Object.entries(components)) {
  for (const f of [...shipped, "COMPONENT.md"]) copy(join(dir, f), join(KIT, "components", id, f));
}
for (const file of walk(join(SRC, "skill"))) copy(file, join(SKILL, relative(join(SRC, "skill"), file)));
const version = `${pkg.version}`;
// The kit branch README carries its own version in the install prompt.
writeFileSync(join(DIST, "README.md"), read(join(SRC, "INSTALL.md")).replaceAll("{{version}}", version));
writeFileSync(join(KIT, "VERSION"), `${version}\n${commit}${dirty}\n`);

const hashes = Object.fromEntries(walk(KIT).map((f) => [relative(KIT, f), sha(f)]).sort(([a], [b]) => a.localeCompare(b)));
const manifest = {
  name: "xray-design",
  version,
  commit: `${commit}${dirty}`,
  shared: SHARED,
  components: Object.fromEntries(Object.entries(components).map(([id, { meta, shipped }]) => [id, {
    name: meta.name,
    summary: meta.summary,
    motion: meta.motion,
    requires: meta.requires,
    components: meta.components,
    files: [...shipped, "COMPONENT.md"].map((f) => `components/${id}/${f}`),
  }])),
  hashes,
};
writeFileSync(join(KIT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

const count = walk(DIST).length;
console.log(`Built XRAY/DESIGN ${version} (${commit}${dirty}): ${Object.keys(components).length} components, ${count} files in dist/`);
