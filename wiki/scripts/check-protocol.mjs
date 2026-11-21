#!/usr/bin/env node
/**
 * Checks ../protocol, the folder that is installed as-is to .agents/design/. Runs before every wiki build (prebuild).
 *
 * 1. Structure: SKILL.md, DESIGN-PROTOCOL.md, CHANGELOG.md, references/ and core/ files exist, with nothing extra; every
 *    component has a COMPONENT.md whose frontmatter matches its folder, files and dependencies.
 *    Protocol: DESIGN-PROTOCOL.md declares Protocol-ID: xray/design and a semver Protocol-Version; CHANGELOG.md has a
 *    section for that version; wiki/package.json names the same version; and the tokens in its YAML header equal
 *    core/tokens.css in both themes, with none missing on either side.
 * 2. CSS: wrapped in @layer components; no raw colors, hard-coded durations, shadows or blur; every
 *    token it reads is defined.
 * 3. Code: relative imports stay inside the kit and are declared in the frontmatter; hook components
 *    start with "use client"; controllers that React imports ship types.
 * 4. Web parity: everything the React version renders (x- classes, data-* values, roles) appears in the
 *    component's HTML reference or controller, and every .x- class the CSS styles is shown there.
 */
import { build } from "esbuild"
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { parse as parseYaml } from "yaml"
import { frontMatter, protocolMeta, protocolTokens, resolveTokens, UNLISTED } from "./tokens.mjs"

const WIKI = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const KIT = resolve(WIKI, "../protocol") // installed as-is to <project>/.agents/design/
const SHARED = { tokens: ["core/tokens.css"], motion: ["core/motion.js", "core/motion.d.ts"], place: ["core/place.js", "core/place.d.ts"] }
// The installed layout: root documents and references/, web code in core/, components/ and blocks/.
const ROOT_FILES = ["SKILL.md", "DESIGN-PROTOCOL.md", "CHANGELOG.md"]
const REFERENCE_FILES = ["native-gui.md"]
const CORE_FILES = ["tokens.css", "base.css", "motion.js", "motion.d.ts", "place.js", "place.d.ts"]

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
for (const f of ROOT_FILES) if (!existsSync(join(KIT, f))) error(`protocol/${f}`, "missing")
for (const f of REFERENCE_FILES) if (!existsSync(join(KIT, "references", f))) error(`protocol/references/${f}`, "missing")
for (const f of CORE_FILES) if (!existsSync(join(KIT, "core", f))) error(`protocol/core/${f}`, "missing")
const stray = [
  ...readdirSync(KIT).filter((f) => !["components", "blocks", "core", "references", ...ROOT_FILES].includes(f)),
  ...(existsSync(join(KIT, "core")) ? readdirSync(join(KIT, "core")).filter((f) => !CORE_FILES.includes(f)).map((f) => `core/${f}`) : []),
  ...(existsSync(join(KIT, "references")) ? readdirSync(join(KIT, "references")).filter((f) => !REFERENCE_FILES.includes(f)).map((f) => `references/${f}`) : []),
]
for (const f of stray) error(`protocol/${f}`, "unexpected file: everything in protocol/ is installed, so keep it to the kit")
// References must remain usable in the installed catalog, independently of wiki routes.
for (const file of [...ROOT_FILES, ...REFERENCE_FILES.map((f) => `references/${f}`)]) {
  const source = join(KIT, file)
  if (!existsSync(source)) continue
  const markdown = read(source)
  if (!markdown.trim()) error(`protocol/${file}`, "empty document")
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
    const target = match[1].split("#")[0]
    if (!target || /^[a-z][a-z\d+.-]*:/i.test(target)) continue
    const resolved = resolve(dirname(source), target)
    if (relative(KIT, resolved).startsWith("..")) error(`protocol/${file}`, `document link "${target}" leaves the catalog`)
    else if (!existsSync(resolved) || !statSync(resolved).isFile()) error(`protocol/${file}`, `document link "${target}" does not resolve to a file`)
  }
}
if (existsSync(join(KIT, "SKILL.md"))) for (const f of REFERENCE_FILES) {
  if (!read(join(KIT, "SKILL.md")).includes(`](references/${f}`)) error("protocol/SKILL.md", `does not link references/${f}`)
}
// The protocol: Protocol-ID and Protocol-Version under its title; every token in its YAML header.
const PROTOCOL = join(KIT, "DESIGN-PROTOCOL.md")
const protocolText = existsSync(PROTOCOL) ? read(PROTOCOL) : ""
let protocol = {}
try {
  protocol = protocolText ? parseYaml(frontMatter(protocolText)) ?? {} : {}
} catch (e) {
  error("protocol/DESIGN-PROTOCOL.md", `header is not valid YAML: ${e.message}`)
}
const { id: protocolId, version } = protocolMeta(protocolText)
if (protocolId !== "xray/design") error("protocol/DESIGN-PROTOCOL.md", 'missing the line "Protocol-ID: xray/design"')
if (!/^\d+\.\d+\.\d+$/.test(version)) error("protocol/DESIGN-PROTOCOL.md", `Protocol-Version "${version}" is not a plain semver (1.2.3)`)
// Every version has its changelog section, so an upgrade can tell what changed.
if (existsSync(join(KIT, "CHANGELOG.md")) && !new RegExp(`^## ${version.replace(/\./g, "\\.")}\\b`, "m").test(read(join(KIT, "CHANGELOG.md"))))
  error("protocol/CHANGELOG.md", `no "## ${version}" section for the protocol version`)
// The wiki header shows wiki/package.json's version; it must name the same release.
const wikiVersion = JSON.parse(read(join(WIKI, "package.json"))).version
if (wikiVersion !== version) error("wiki/package.json", `version "${wikiVersion}" does not match Protocol-Version "${version}"`)
// Tokens: the header lists exactly what core/tokens.css defines, with the same final values in both themes.
try {
  const css = resolveTokens(join(KIT, "core/tokens.css"))
  const listed = protocolTokens(protocol.tokens)
  for (const [name, value] of css) {
    if (UNLISTED.has(name)) continue
    const doc = listed.get(name)
    if (!doc) error("protocol/DESIGN-PROTOCOL.md", `token "${name}" (--x-${name}) is missing from the header`)
    else for (const theme of ["light", "dark"])
      if (doc[theme] !== value[theme]) error("protocol/DESIGN-PROTOCOL.md", `token "${name}" is "${doc[theme]}" in ${theme}, but core/tokens.css resolves it to "${value[theme]}"`)
  }
  for (const name of listed.keys()) if (!css.has(name)) error("protocol/DESIGN-PROTOCOL.md", `token "${name}" is not defined in core/tokens.css`)
} catch (e) {
  error("protocol/DESIGN-PROTOCOL.md", e.message)
}

// Components are primitives; blocks are screen sections built only from components.
const KINDS = ["components", "blocks"]
const entries = {} // "components/button", "blocks/send-form" -> { kind, id, meta, dir, files }
const components = {} // components only, by id: what frontmatter `components:` may reference
for (const kind of KINDS) {
  if (!existsSync(join(KIT, kind))) continue
  for (const id of readdirSync(join(KIT, kind)).filter((d) => statSync(join(KIT, kind, d)).isDirectory()).sort()) {
    const dir = join(KIT, kind, id)
    const doc = join(dir, "COMPONENT.md")
    if (!existsSync(doc)) { error(`${kind}/${id}`, "missing COMPONENT.md"); continue }
    const meta = frontmatter(doc)
    if (!meta) { error(`${kind}/${id}/COMPONENT.md`, "missing frontmatter"); continue }
    for (const key of ["id", "name", "summary", "motion", "requires", "components", "files"]) {
      if (meta[key] === undefined) error(`${kind}/${id}/COMPONENT.md`, `frontmatter needs "${key}"`)
    }
    const entry = { kind, id, meta, dir, files: readdirSync(dir).filter((f) => f !== "COMPONENT.md").sort() }
    if (Object.values(entries).some((e) => e.id === id)) error(`${kind}/${id}`, "id is already used by a component or block")
    entries[`${kind}/${id}`] = entry
    if (kind === "components") components[id] = entry
  }
}
const ids = Object.values(entries).map((e) => e.id)

// ---------------------------------------------------------------------------
// 2 + 3. CSS and code
// ---------------------------------------------------------------------------
const defined = new Set()
const collect = (css) => { for (const m of css.matchAll(/(--x-[\w-]+)\s*:/g)) defined.add(m[1]) }
for (const f of ["core/tokens.css", "core/base.css"]) if (existsSync(join(KIT, f))) collect(read(join(KIT, f)))
for (const { dir, files } of Object.values(entries)) for (const f of files) if (f.endsWith(".css")) collect(read(join(dir, f)))

for (const [where, { kind, id, meta, dir, files }] of Object.entries(entries)) {
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
  // Blocks may build on other blocks, declared in `blocks:`; components never use blocks.
  if (meta.blocks !== undefined && kind !== "blocks") error(where, "only blocks may declare blocks: dependencies")
  for (const b of meta.blocks ?? []) {
    if (!entries[`blocks/${b}`]) error(where, `depends on unknown block "${b}"`)
    if (b === id) error(where, "a block cannot depend on itself")
  }

  for (const f of files) {
    const text = read(join(dir, f))

    if (f.endsWith(".css")) {
      const css = stripComments(text)
      if (!css.includes("@layer components")) error(`${where}/${f}`, "must be wrapped in @layer components")
      if (!/^\s*@layer theme, base, components, utilities;/m.test(css)) error(`${where}/${f}`, "must start with the layer order: @layer theme, base, components, utilities;")
      if (/@layer\s+x\./.test(css)) error(`${where}/${f}`, "uses an old x.* layer name; use theme, base or components")
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
        if (rel.startsWith("core/place") && !meta.requires.includes("place")) error(`${where}/${f}`, `imports ${spec} but requires lacks "place"`)
        const other = rel.match(/^components\/([^/]+)\//)?.[1]
        if (other && !(kind === "components" && other === id) && !meta.components.includes(other)) error(`${where}/${f}`, `imports ${spec} but components lacks "${other}"`)
        const block = rel.match(/^blocks\/([^/]+)\//)?.[1]
        if (block && kind === "components") error(`${where}/${f}`, `imports the block "${block}": components may only import components`)
        else if (block && block !== id && !(meta.blocks ?? []).includes(block)) error(`${where}/${f}`, `imports ${spec} but blocks lacks "${block}"`)
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
// 4. Web parity (native implementations require their target framework's checks)
// ---------------------------------------------------------------------------
const OUT = join(WIKI, "node_modules/.cache/check-protocol/parity.mjs")
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

const FREE = new Set(["data-placeholder", "data-for", "data-value", "data-seed", "data-id", "data-keywords"])
const facts = (markup) => {
  const out = new Set()
  for (const m of markup.matchAll(/class(?:Name)?="([^"]*)"/g)) for (const c of m[1].split(/\s+/)) if (c.startsWith("x-")) out.add(`.${c}`)
  for (const m of markup.matchAll(/\s(data-[\w-]+)="([^"]*)"/g)) {
    if (m[1].startsWith("data-x-")) continue
    // Free-text attributes (labels, ids, keys) are compared by name only.
    out.add(FREE.has(m[1]) ? `[${m[1]}=*]` : `[${m[1]}="${m[2]}"]`)
  }
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

for (const [where, { id, dir, files }] of Object.entries(entries)) {
  if (!files.includes(`${id}.html`)) continue
  const html = read(join(dir, `${id}.html`))
  const css = files.filter((f) => f.endsWith(".css")).map((f) => read(join(dir, f))).join("\n")
  const js = files.filter((f) => f.endsWith(".js")).map((f) => read(join(dir, f))).join("\n")
  const reference = new Set([...facts(html), ...controllerFacts(js)])

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
  console.error(`Protocol check failed (${errors.length}):\n${[...new Set(errors)].map((e) => `  - ${e}`).join("\n")}`)
  process.exit(1)
}
const list = (kind) => Object.values(entries).filter((e) => e.kind === kind).map((e) => e.id)
console.log(`XRAY/DESIGN protocol ${version} OK: ${list("components").length} components (${list("components").join(", ")}), ${list("blocks").length} blocks${list("blocks").length ? ` (${list("blocks").join(", ")})` : ""}`)
