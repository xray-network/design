#!/usr/bin/env node
/**
 * End-to-end install check against dist/ (run `npm run build` first):
 *  1. React fixture: install the kit, init, add every component, type-check the copied code.
 *  2. HTML fixture: init + add, and confirm no React files were copied.
 *  3. Upgrade: modify a copied file locally, publish a "new" catalog that changes the same file
 *     elsewhere, run upgrade, and expect a clean 3-way merge that keeps both changes.
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const WORK = join(ROOT, "node_modules/.cache/xray-design/fixtures");
if (!existsSync(join(DIST, "design/manifest.json"))) throw new Error("dist/ is missing: run npm run build");

const manifest = JSON.parse(readFileSync(join(DIST, "design/manifest.json"), "utf8"));
const all = Object.keys(manifest.components);
let failed = 0;
const check = (ok, message) => { console.log(`${ok ? "✓" : "✗"} ${message}`); if (!ok) failed++; };

function fixture(name) {
  const dir = join(WORK, name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  cpSync(join(DIST, "design"), join(dir, ".agents/design"), { recursive: true });
  cpSync(join(DIST, "skills/design"), join(dir, ".agents/skills/design"), { recursive: true });
  return dir;
}
const lock = (dir, ...args) => execFileSync("node", [".agents/skills/design/scripts/lock.mjs", ...args], { cwd: dir, encoding: "utf8" });

// 1. React
{
  const dir = fixture("react");
  lock(dir, "init", "--ui", "src/ui", "--stack", "react");
  lock(dir, "add", ...all);
  const missing = all.filter((id) => !existsSync(join(dir, "src/ui/components", id, `${id}.tsx`)));
  check(missing.length === 0, `react: every component copied${missing.length ? ` (missing ${missing})` : ""}`);
  check(existsSync(join(dir, "src/ui/motion/motion.js")) && existsSync(join(dir, "src/ui/motion/motion.d.ts")), "react: motion helpers copied with types");
  check(!existsSync(join(dir, "src/ui/components/segmented/segmented.controller.js")), "react: unused controllers are not copied");
  check(existsSync(join(dir, "src/ui/components/menu/menu.controller.js")), "react: controllers the components import are copied");
  check(!existsSync(join(dir, "src/ui/components/button/button.html")), "react: HTML references stay in the catalog");

  writeFileSync(join(dir, "tsconfig.json"), JSON.stringify({
    compilerOptions: { target: "ES2022", lib: ["ES2023", "DOM", "DOM.Iterable"], module: "ESNext", moduleResolution: "bundler", jsx: "react-jsx", strict: true, noEmit: true, skipLibCheck: true, typeRoots: [join(ROOT, "node_modules/@types")], types: ["react", "react-dom"], paths: { "react": [join(ROOT, "node_modules/@types/react")], "react/*": [join(ROOT, "node_modules/@types/react/*")] } },
    include: ["src/**/*.tsx", "env.d.ts"],
  }));
  writeFileSync(join(dir, "env.d.ts"), 'declare module "*.css";\n');
  try {
    execFileSync(join(ROOT, "node_modules/.bin/tsc"), ["-p", "."], { cwd: dir, encoding: "utf8" });
    check(true, "react: copied components type-check in a fresh project");
  } catch (e) {
    check(false, `react: copied components type-check in a fresh project\n${e.stdout}`);
  }
  const status = lock(dir, "status");
  check(!/modified|missing/.test(status), "react: status reports every file unchanged");
}

// 2. HTML
{
  const dir = fixture("html");
  lock(dir, "init", "--ui", "ui", "--stack", "html", "--no-base");
  lock(dir, "add", "segmented", "toast");
  check(existsSync(join(dir, "ui/components/segmented/segmented.controller.js")), "html: controllers copied");
  check(existsSync(join(dir, "ui/components/button/button.css")), "html: component dependencies copied (toast -> button)");
  check(!existsSync(join(dir, "ui/components/segmented/segmented.tsx")) && !existsSync(join(dir, "ui/motion/motion.d.ts")), "html: no React or type files");
  check(!existsSync(join(dir, "ui/base/base.css")), "html: --no-base skips the reset");
}

// 3. Upgrade with a local modification
{
  const dir = fixture("upgrade");
  lock(dir, "init", "--ui", "src/ui", "--stack", "react");
  lock(dir, "add", "button");
  const local = join(dir, "src/ui/components/button/button.css");
  writeFileSync(local, readFileSync(local, "utf8").replace("--x-button-pad: 18px;", "--x-button-pad: 20px; /* project */"));

  // A "next" catalog that changes the same file elsewhere and adds a dependency.
  cpSync(join(dir, ".agents/design"), join(dir, ".agents/design.prev"), { recursive: true });
  const nextCss = join(dir, ".agents/design/components/button/button.css");
  writeFileSync(nextCss, readFileSync(nextCss, "utf8").replace("user-select: none;", "user-select: none;\n    touch-action: manipulation;"));
  const m = JSON.parse(readFileSync(join(dir, ".agents/design/manifest.json"), "utf8"));
  m.version = "0.1.1";
  m.components.button.requires = ["tokens", "motion"];
  writeFileSync(join(dir, ".agents/design/manifest.json"), JSON.stringify(m));

  let out = "";
  try { out = lock(dir, "upgrade", "--base", ".agents/design.prev"); } catch (e) { out = e.stdout; }
  const merged = readFileSync(local, "utf8");
  check(merged.includes("/* project */") && merged.includes("touch-action: manipulation"), "upgrade: 3-way merge keeps the local edit and the kit change");
  check(existsSync(join(dir, "src/ui/motion/motion.js")), "upgrade: new dependencies are added");
  check(JSON.parse(readFileSync(join(dir, ".agents/design.lock.json"), "utf8")).kit.version === "0.1.1", "upgrade: lock moves to the new version");
  check(/merged/.test(out), "upgrade: reports the merge");
}

if (failed) {
  console.error(`\nInstall check failed: ${failed}`);
  process.exit(1);
}
