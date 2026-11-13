#!/usr/bin/env node
/**
 * Checks ../kit, the folder that is installed as-is. Runs before every wiki build (prebuild).
 *
 * 1. Structure: SKILL.md, RULES.md, VERSION (semver) and the core/ files exist, with nothing extra; every component has a
 *    COMPONENT.md whose frontmatter matches its folder, files and dependencies.
 * 2. CSS: wrapped in @layer x.components; no raw colors, hard-coded durations, shadows or blur; every
 *    token it reads is defined.
 * 3. Code: relative imports stay inside the kit and are declared in the frontmatter; hook components
 *    start with "use client"; controllers that React imports ship types.
 * 4. Parity: everything the React version renders (x- classes, data-* values, roles) appears in the
 *    component's HTML reference or controller, and every .x- class the CSS styles is shown there.
 */
import { build } from "esbuild"
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const WIKI = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const KIT = resolve(WIKI, "../kit")
const SHARED = { tokens: ["core/tokens.css"], motion: ["core/motion.js", "core/motion.d.ts"] }
// The whole kit layout: documents at the root, copyable code in core/ and components/.
const ROOT_FILES = ["SKILL.md", "RULES.md", "VERSION"]
const CORE_FILES = ["tokens.css", "base.css", "tailwind.css", "motion.js", "motion.d.ts"]

const errors = []
const error = (where, message) => errors.push(`${where}: ${message}`)
const read = (file) => readFileSync(file, "utf8")
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "")

/** Minimal frontmatter: `key: value`, `key: [a, b]`, numbers. */
function frontmatter(file) {
  const match = read(file).match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const data = {}
  for (const line of match[1].split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/)
    if (!m) continue
    const raw = m[2].trim()
    data[m[1]] = raw.startsWith("[")
      ? raw.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean)
      : /^\d+$/.test(raw) ? Number(raw) : raw
  }
  return data
}

// ---------------------------------------------------------------------------
// 1. Structure
// ---------------------------------------------------------------------------
for (const f of ROOT_FILES) if (!existsSync(join(KIT, f))) error(`kit/${f}`, "missing")
for (const f of CORE_FILES) if (!existsSync(join(KIT, "core", f))) error(`kit/core/${f}`, "missing")
const stray = [
  ...readdirSync(KIT).filter((f) => !["components", "core", ...ROOT_FILES].includes(f)),
  ...(existsSync(join(KIT, "core")) ? readdirSync(join(KIT, "core")).filter((f) => !CORE_FILES.includes(f)).map((f) => `core/${f}`) : []),
]
for (const f of stray) error(`kit/${f}`, "unexpected file: everything in kit/ is installed, so keep it to the kit")
const version = existsSync(join(KIT, "VERSION")) ? read(join(KIT, "VERSION")).trim() : ""
if (!/^\d+\.\d+\.\d+$/.test(version)) error("kit/VERSION", `"${version}" is not a plain semver (1.2.3)`)

const ids = readdirSync(join(KIT, "components")).filter((d) => statSync(join(KIT, "components", d)).isDirectory()).sort()
const components = {}
for (const id of ids) {
  const dir = join(KIT, "components", id)
  const doc = join(dir, "COMPONENT.md")
  if (!existsSync(doc)) { error(`components/${id}`, "missing COMPONENT.md"); continue }
  const meta = frontmatter(doc)
  if (!meta) { error(`components/${id}/COMPONENT.md`, "missing frontmatter"); continue }
  for (const key of ["id", "name", "summary", "motion", "requires", "components", "files"]) {
    if (meta[key] === undefined) error(`components/${id}/COMPONENT.md`, `frontmatter needs "${key}"`)
  }
  components[id] = { meta, dir, files: readdirSync(dir).filter((f) => f !== "COMPONENT.md").sort() }
}

// ---------------------------------------------------------------------------
// 2 + 3. CSS and code
// ---------------------------------------------------------------------------
const defined = new Set()
const collect = (css) => { for (const m of css.matchAll(/(--x-[\w-]+)\s*:/g)) defined.add(m[1]) }
for (const f of ["core/tokens.css", "core/base.css"]) if (existsSync(join(KIT, f))) collect(read(join(KIT, f)))
for (const { dir, files } of Object.values(components)) for (const f of files) if (f.endsWith(".css")) collect(read(join(dir, f)))

for (const [id, { meta, dir, files }] of Object.entries(components)) {
  const where = `components/${id}`
  if (meta.id !== id) error(where, `frontmatter id "${meta.id}" does not match the folder`)
  if (![0, 1, 2].includes(meta.motion)) error(where, "motion must be 0, 1 or 2")

  const listed = [...(meta.files ?? [])].sort()
  for (const f of listed) if (!files.includes(f)) error(where, `lists ${f}, which does not exist`)
  for (const f of files) if (!listed.includes(f)) error(where, `${f} is not listed in COMPONENT.md files`)
  if (!files.includes(`${id}.css`)) error(where, `needs ${id}.css`)
  if (!files.includes(`${id}.html`)) error(where, `needs ${id}.html`)

  for (const r of meta.requires ?? []) if (!SHARED[r]) error(where, `requires unknown shared group "${r}"`)
  if (!(meta.requires ?? []).includes("tokens")) error(where, 'requires must include "tokens"')
  for (const c of meta.components ?? []) if (!components[c]) error(where, `depends on unknown component "${c}"`)

  for (const f of files) {
    const text = read(join(dir, f))

    if (f.endsWith(".css")) {
      const css = stripComments(text)
      if (!css.includes("@layer x.components")) error(`${where}/${f}`, "must be wrapped in @layer x.components")
      for (const m of css.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(/g)) error(`${where}/${f}`, `raw color "${m[0]}": use a token`)
      for (const m of css.matchAll(/\b(box-shadow|backdrop-filter|text-shadow)\s*:/g)) error(`${where}/${f}`, `"${m[1]}" breaks the flat-surface rule`)
      for (const m of css.matchAll(/\b\d+(?:\.\d+)?m?s\b(?![^(]*\))/g)) {
        // Durations come from tokens. The one exception is the progress spinner.
        if (!/700ms linear infinite/.test(css.slice(Math.max(0, m.index - 2), m.index + 30))) error(`${where}/${f}`, `hard-coded duration "${m[0]}": use a motion token`)
      }
      for (const m of css.matchAll(/var\((--x-[\w-]+)\s*\)/g)) if (!defined.has(m[1])) error(`${where}/${f}`, `${m[1]} is not defined (typo, or add a fallback if JS sets it)`)
    }

    if (/\.(tsx|js)$/.test(f)) {
      for (const m of text.matchAll(/from\s+["'](\.[^"']+)["']|import\s+["'](\.[^"']+)["']/g)) {
        const spec = m[1] ?? m[2]
        const target = resolve(dir, spec)
        if (![target, `${target}.tsx`, `${target}.ts`, `${target}.js`].some((c) => existsSync(c))) { error(`${where}/${f}`, `import "${spec}" does not resolve`); continue }
        const rel = relative(KIT, target)
        if (rel.startsWith("..")) { error(`${where}/${f}`, `import ${spec} leaves the kit`); continue }
        if (rel.startsWith("core/motion") && !meta.requires.includes("motion")) error(`${where}/${f}`, `imports ${spec} but requires lacks "motion"`)
        const other = rel.match(/^components\/([^/]+)\//)?.[1]
        if (other && other !== id && !meta.components.includes(other)) error(`${where}/${f}`, `imports ${spec} but components lacks "${other}"`)
      }
      if (f.endsWith(".tsx") && /\b(useState|useEffect|useLayoutEffect|useRef|useId)\b/.test(text) && !text.startsWith('"use client"')) {
        error(`${where}/${f}`, 'uses hooks, so it must start with "use client"')
      }
    }

    if (f.endsWith(".js")) {
      const types = f.replace(/\.js$/, ".d.ts")
      const importedByTsx = files.some((t) => t.endsWith(".tsx") && read(join(dir, t)).includes(`./${f}`))
      if (importedByTsx && !files.includes(types)) error(`${where}/${f}`, `is imported by React, so ship ${types}`)
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Parity
// ---------------------------------------------------------------------------
const OUT = join(WIKI, "node_modules/.cache/check-kit/parity.mjs")
mkdirSync(dirname(OUT), { recursive: true })
await build({
  entryPoints: [join(WIKI, "scripts/parity.tsx")],
  outfile: OUT,
  bundle: true,
  format: "esm",
  platform: "node",
  jsx: "automatic",
  loader: { ".css": "empty" },
  external: ["react", "react-dom", "react/*", "react-dom/*"],
  logLevel: "error",
})
const { renderToStaticMarkup } = await import("react-dom/server")
const { examples } = await import(pathToFileURL(OUT).href)

const facts = (markup) => {
  const out = new Set()
  for (const m of markup.matchAll(/class(?:Name)?="([^"]*)"/g)) for (const c of m[1].split(/\s+/)) if (c.startsWith("x-")) out.add(`.${c}`)
  for (const m of markup.matchAll(/\s(data-[\w-]+)="([^"]*)"/g)) if (!m[1].startsWith("data-x-")) out.add(`[${m[1]}="${m[2]}"]`)
  for (const m of markup.matchAll(/\srole="([^"]+)"/g)) out.add(`[role="${m[1]}"]`)
  return out
}
// Controllers build markup in JS: count the class names and dataset values they set.
const controllerFacts = (js) => {
  const out = new Set()
  for (const m of js.matchAll(/className\s*=\s*"([^"]+)"/g)) for (const c of m[1].split(/\s+/)) out.add(`.${c}`)
  for (const m of js.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) out.add(`.${c}`)
  for (const m of js.matchAll(/dataset\.(\w+)\s*=\s*"([^"]*)"/g)) out.add(`[data-${m[1].replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}="${m[2]}"]`)
  for (const m of js.matchAll(/dataset\.(\w+)\s*=\s*(\w+)/g)) out.add(`[data-${m[1]}=*]`)
  return out
}

for (const [id, { dir, files }] of Object.entries(components)) {
  if (!files.includes(`${id}.html`)) continue
  const html = read(join(dir, `${id}.html`))
  const css = files.filter((f) => f.endsWith(".css")).map((f) => read(join(dir, f))).join("\n")
  const js = files.filter((f) => f.endsWith(".js")).map((f) => read(join(dir, f))).join("\n")
  const reference = new Set([...facts(html), ...controllerFacts(js)])
  const where = `components/${id}`

  if (!examples[id]) error(where, "no React example in wiki/scripts/parity.tsx")
  else {
    for (const fact of facts(renderToStaticMarkup(examples[id]))) {
      if (!reference.has(fact) && !reference.has(fact.replace(/="[^"]*"\]$/, "=*]"))) error(where, `React renders ${fact}, which the HTML reference never shows`)
    }
  }
  const own = `.x-${id === "button" ? "" : id}`
  for (const cls of new Set([...stripComments(css).matchAll(/\.(x-[\w-]+)/g)].map((m) => `.${m[1]}`))) {
    if (cls.startsWith(own) && !reference.has(cls)) error(where, `CSS styles ${cls}, which the HTML reference never shows`)
  }
}

// ---------------------------------------------------------------------------
if (errors.length) {
  console.error(`Kit check failed (${errors.length}):\n${[...new Set(errors)].map((e) => `  - ${e}`).join("\n")}`)
  process.exit(1)
}
console.log(`Kit ${version} OK: ${ids.length} components (${ids.join(", ")})`)
