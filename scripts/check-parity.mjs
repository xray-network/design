#!/usr/bin/env node
/**
 * HTML <-> React parity. For each component:
 *  1. Server-render the React examples in tests/parity.tsx.
 *  2. Every x- class, data-* attribute (with its value) and role the React output produces must
 *     appear in the component's .html reference or its controller (which builds markup at runtime).
 *  3. Every .x- class selected in the component's CSS must appear in the HTML reference or controller,
 *     so the reference documents everything the CSS can style.
 */
import { build } from "esbuild";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "node_modules/.cache/xray-design/parity.mjs");
mkdirSync(dirname(OUT), { recursive: true });

await build({
  entryPoints: [join(ROOT, "tests/parity.tsx")],
  outfile: OUT,
  bundle: true,
  format: "esm",
  platform: "node",
  jsx: "automatic",
  loader: { ".css": "empty" },
  external: ["react", "react-dom", "react/*", "react-dom/*"],
  logLevel: "error",
});

const { renderToStaticMarkup } = await import("react-dom/server");
const { examples } = await import(pathToFileURL(OUT).href);

const facts = (markup) => {
  const out = new Set();
  for (const m of markup.matchAll(/class(?:Name)?="([^"]*)"/g)) for (const c of m[1].split(/\s+/)) if (c.startsWith("x-")) out.add(`.${c}`);
  for (const m of markup.matchAll(/\s(data-[\w-]+)="([^"]*)"/g)) if (!m[1].startsWith("data-x-")) out.add(`[${m[1]}="${m[2]}"]`);
  for (const m of markup.matchAll(/\srole="([^"]+)"/g)) out.add(`[role="${m[1]}"]`);
  return out;
};
// Controllers build markup in JS: count class names, dataset assignments and attributes they set.
const controllerFacts = (js) => {
  const out = new Set();
  for (const m of js.matchAll(/className\s*=\s*"([^"]+)"/g)) for (const c of m[1].split(/\s+/)) out.add(`.${c}`);
  for (const m of js.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) out.add(`.${c}`);
  for (const m of js.matchAll(/dataset\.(\w+)\s*=\s*"([^"]*)"/g)) out.add(`[data-${m[1].replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}="${m[2]}"]`);
  for (const m of js.matchAll(/dataset\.(\w+)\s*=\s*(\w+)/g)) out.add(`[data-${m[1]}=*]`);
  return out;
};

let failures = 0;
for (const id of readdirSync(join(ROOT, "src/components"))) {
  const dir = join(ROOT, "src/components", id);
  const files = readdirSync(dir);
  const html = readFileSync(join(dir, `${id}.html`), "utf8");
  const css = files.filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(dir, f), "utf8")).join("\n");
  const js = files.filter((f) => f.endsWith(".js")).map((f) => readFileSync(join(dir, f), "utf8")).join("\n");
  const reference = new Set([...facts(html), ...controllerFacts(js)]);
  const problems = [];

  if (!examples[id]) problems.push("no React example in tests/parity.tsx");
  else {
    const markup = renderToStaticMarkup(examples[id]);
    for (const fact of facts(markup)) {
      const wildcard = fact.replace(/="[^"]*"\]$/, "=*]");
      if (!reference.has(fact) && !reference.has(wildcard)) problems.push(`React renders ${fact}, which the HTML reference never shows`);
    }
  }

  const ownPrefix = `.x-${id === "button" ? "" : id}`;
  for (const m of css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/\.(x-[\w-]+)/g)) {
    const cls = `.${m[1]}`;
    if (!reference.has(cls) && cls.startsWith(ownPrefix)) problems.push(`CSS styles ${cls}, which the HTML reference never shows`);
  }

  const unique = [...new Set(problems)];
  if (unique.length) {
    failures += unique.length;
    console.log(`✗ ${id}\n${unique.map((p) => `    ${p}`).join("\n")}`);
  } else console.log(`✓ ${id}`);
}

if (failures) {
  console.error(`\nParity failed: ${failures} problem(s)`);
  process.exit(1);
}
