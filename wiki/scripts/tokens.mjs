// Reads protocol/core/tokens.css and resolves every --x-* token to its final value in the light and dark themes.
// Shared by check-protocol.mjs (which compares them with DESIGN-PROTOCOL.md) and the wiki's Tokens page data.
import { readFileSync } from "node:fs"

/** Spring curves are long generated linear() lists; DESIGN-PROTOCOL.md describes them instead of listing them. */
export const UNLISTED = new Set(["spring", "spring-soft"])

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "")

/** Every --x-* declaration in the `:root` and `:root, [data-theme]` rules inside `@layer theme`: name (without --x-) → raw value. */
export function rootDeclarations(css) {
  const layer = css.indexOf("@layer theme {")
  if (layer < 0) throw new Error("tokens.css: no @layer theme block")
  const out = new Map()
  for (const m of stripComments(css.slice(layer)).matchAll(/(?<=^|[{};])\s*(:root(?:\s*,\s*\[data-theme\])?)\s*\{([^{}]*)\}/g)) {
    for (const d of m[2].matchAll(/--x-([\w-]+)\s*:\s*([^;]+);/g)) {
      if (out.has(d[1])) throw new Error(`tokens.css: --x-${d[1]} is declared twice`)
      out.set(d[1], d[2].trim().replace(/\s+/g, " "))
    }
  }
  if (!out.size) throw new Error("tokens.css: no :root token rules inside @layer theme")
  return out
}

/** Splits "a, b" at the top-level comma (ignores commas inside parentheses). */
function splitTopLevel(args) {
  let depth = 0
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "(") depth++
    else if (args[i] === ")") depth--
    else if (args[i] === "," && depth === 0) return [args.slice(0, i).trim(), args.slice(i + 1).trim()]
  }
  throw new Error(`light-dark() needs two values: ${args}`)
}

/** The value of `name` in one theme, with var(--x-*) and light-dark() resolved. */
function resolveIn(decls, name, theme, seen = new Set()) {
  if (seen.has(name)) throw new Error(`tokens.css: --x-${name} refers to itself`)
  const raw = decls.get(name)
  if (raw === undefined) throw new Error(`tokens.css: --x-${name} is not defined`)
  return resolveValue(decls, raw, theme, new Set([...seen, name]))
}

function resolveValue(decls, value, theme, seen) {
  let out = value
  // light-dark(a, b): innermost first
  for (let i = out.lastIndexOf("light-dark("); i >= 0; i = out.lastIndexOf("light-dark(")) {
    let depth = 0
    let j = i + "light-dark(".length - 1
    for (; j < out.length; j++) {
      if (out[j] === "(") depth++
      else if (out[j] === ")" && --depth === 0) break
    }
    const [light, dark] = splitTopLevel(out.slice(i + "light-dark(".length, j))
    out = out.slice(0, i) + (theme === "light" ? light : dark) + out.slice(j + 1)
  }
  return out.replace(/var\(--x-([\w-]+)\)/g, (_, n) => resolveIn(decls, n, theme, seen))
}

/** name → { light, dark } for every token in tokens.css's :root. */
export function resolveTokens(cssPath) {
  const decls = rootDeclarations(readFileSync(cssPath, "utf8"))
  const out = new Map()
  for (const name of decls.keys()) {
    out.set(name, { light: resolveIn(decls, name, "light"), dark: resolveIn(decls, name, "dark") })
  }
  return out
}

/** Flattens DESIGN-PROTOCOL.md's `tokens:` groups into name → { light, dark }. */
export function protocolTokens(tokens) {
  const out = new Map()
  for (const [group, entries] of Object.entries(tokens ?? {})) {
    for (const [name, value] of Object.entries(entries ?? {})) {
      if (out.has(name)) throw new Error(`DESIGN-PROTOCOL.md: token "${name}" is listed twice (again in ${group})`)
      const pair = value !== null && typeof value === "object" ? value : { light: value, dark: value }
      out.set(name, { light: String(pair.light), dark: String(pair.dark), group })
    }
  }
  return out
}

/** Protocol-ID and Protocol-Version lines under the protocol's title (the same form as SPECTRE's). */
export function protocolMeta(markdown) {
  return {
    id: /^Protocol-ID: (\S+)$/m.exec(markdown)?.[1] ?? "",
    version: /^Protocol-Version: (\S+)$/m.exec(markdown)?.[1] ?? "",
  }
}

/** The YAML front matter of a Markdown file, as text. */
export function frontMatter(markdown) {
  const m = markdown.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) throw new Error("no YAML front matter")
  return m[1]
}
