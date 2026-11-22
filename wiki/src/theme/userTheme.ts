/**
 * The reader's theme for the wiki's previews: one primary color, a tone for the grays (warm, default, cold) and a
 * font. The kit's color tokens are derived from them by the algorithm below, in OKLCH, for light and dark theme,
 * with contrast checked where text or thin marks sit on the canvas. The theme is kept in localStorage and applied
 * to every preview stage (not to the showcase apps, which are pages of their own).
 */

// ---------------------------------------------------------------------------------------------------------- model

export type Tone = "warm" | "default" | "cold"
export type UserTheme = { primary: string; tone: Tone; font: string }
export type Token = { name: string; light: string; dark: string; note: string }

export const KIT_PRIMARY = "#1940ED"
export const DEFAULT_THEME: UserTheme = { primary: KIT_PRIMARY, tone: "default", font: "" }
export const THEME_KEY = "xray-design-user-theme"
export const THEME_EVENT = "xray-design-user-theme"
/** Popular Google fonts for interfaces; any other Google font can be typed in. */
export const GOOGLE_FONTS = ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Nunito", "Manrope", "DM Sans", "Plus Jakarta Sans", "IBM Plex Sans", "Work Sans", "Figtree", "Outfit", "Space Grotesk", "Sora", "Rubik", "Geist"]

export const isDefault = (theme: UserTheme) => theme.primary.toUpperCase() === KIT_PRIMARY && theme.tone === "default" && !theme.font.trim()

// ----------------------------------------------------------------------------------------------------- color math

type RGB = [number, number, number] // sRGB, 0..1
type LCH = [number, number, number] // OKLCH: L 0..1, C, H in degrees

export function parseHex(value: string): string | null {
  const v = value.trim().replace(/^#?/, "#")
  if (/^#[0-9a-f]{3}$/i.test(v)) return ("#" + [...v.slice(1)].map((c) => c + c).join("")).toUpperCase()
  return /^#[0-9a-f]{6}$/i.test(v) ? v.toUpperCase() : null
}
const toRgb = (hex: string): RGB => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as RGB
const toHex = (rgb: RGB) => "#" + rgb.map((c) => Math.round(Math.min(1, Math.max(0, c)) * 255).toString(16).padStart(2, "0")).join("").toUpperCase()
const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const gam = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)

function toOklch(hex: string): LCH {
  const [r, g, b] = toRgb(hex).map(lin)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return [L, Math.hypot(A, B), ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360]
}

function oklchToRgb([L, C, H]: LCH): RGB {
  const a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map(gam) as RGB
}

/** OKLCH to hex, in the sRGB gamut: the chroma comes down until the color fits, lightness and hue kept. */
function fromOklch([L, C, H]: LCH): string {
  const lc = Math.min(1, Math.max(0, L))
  const inGamut = (c: number) => oklchToRgb([lc, c, H]).every((v) => v >= -0.0005 && v <= 1.0005)
  if (inGamut(C)) return toHex(oklchToRgb([lc, C, H]))
  let lo = 0, hi = C
  for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (inGamut(mid)) lo = mid; else hi = mid }
  return toHex(oklchToRgb([lc, lo, H]))
}

const luminance = (hex: string) => { const [r, g, b] = toRgb(hex).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
export const contrast = (a: string, b: string) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

/** The color moved in lightness until it reaches a contrast against a background (darker on light, lighter on dark). */
function reach(hex: string, background: string, ratio: number, direction: -1 | 1): string {
  let [L, C, H] = toOklch(hex)
  let out = hex
  for (let i = 0; i < 100 && contrast(out, background) < ratio; i++) { L = Math.min(1, Math.max(0, L + direction * 0.01)); out = fromOklch([L, C, H]) }
  return out
}
const shift = (hex: string, dL: number) => { const [L, C, H] = toOklch(hex); return fromOklch([Math.min(0.97, Math.max(0.05, L + dL)), C, H]) }
const alpha = (hex: string, a: number) => { const [r, g, b] = toRgb(hex).map((c) => Math.round(c * 255)); return `rgb(${r} ${g} ${b} / ${a})` }

// ------------------------------------------------------------------------------------------------------- the grays

/** The kit's grays: the faintest warm tint (oklch chroma 0.0015 at most), the default tone. */
const KIT_GRAYS: Record<string, string> = { "50": "#FAFAFA", "100": "#F4F4F4", "200": "#E7E6E6", "300": "#D5D4D4", "400": "#A3A2A2", "500": "#767575", "600": "#585757", "700": "#414040", "800": "#292828", "900": "#232222", "950": "#0F0F0F" }
/** Warm and cold grays keep each kit step's lightness and take a hue: most chroma in the middle of the scale. */
const TONES: Record<Exclude<Tone, "default">, { hue: number; chroma: number }> = { warm: { hue: 70, chroma: 0.014 }, cold: { hue: 255, chroma: 0.018 } }

function grays(tone: Tone): Record<string, string> {
  if (tone === "default") return KIT_GRAYS
  const { hue, chroma } = TONES[tone]
  return Object.fromEntries(Object.entries(KIT_GRAYS).map(([step, hex]) => {
    const [L] = toOklch(hex)
    return [step, fromOklch([L, chroma * Math.min(1, 4 * L * (1 - L) * 1.4), hue])]
  }))
}

// -------------------------------------------------------------------------------------------------- the derivation

/** The kit's own accent values, used as they are when the primary is the kit's blue. */
const KIT_ACCENT: Record<string, [string, string]> = {
  "--x-accent": ["#1940ED", "#1940ED"], "--x-accent-hover": ["#3F5FF0", "#3F5FF0"], "--x-accent-press": ["#0F2FBF", "#0F2FBF"],
  "--x-accent-fg": ["#FFFFFF", "#FFFFFF"], "--x-accent-wash": ["rgb(25 64 237 / 0.07)", "rgb(25 64 237 / 0.14)"],
  "--x-accent-ink": ["#1940ED", "#657FF3"], "--x-accent-ink-hover": ["#3F5FF0", "#8B9EF6"], "--x-info-fg": ["#1940ED", "#8B9EF6"], "--x-chart-1": ["#1940ED", "#3F5FF0"],
}

/** Every semantic token the theme sets, with its light and dark value. */
export function deriveTokens(theme: UserTheme): Token[] {
  const primary = parseHex(theme.primary) ?? KIT_PRIMARY
  const g = grays(theme.tone)
  const white = "#FFFFFF", black = "#000000"
  // The canvas: white and black, the light one faintly tinted with a warm or cold tone.
  const canvas = theme.tone === "default" ? white : fromOklch([0.995, theme.tone === "warm" ? 0.004 : 0.005, TONES[theme.tone].hue])

  let accent: Record<string, [string, string]>
  if (primary === KIT_PRIMARY) accent = KIT_ACCENT
  else {
    const fg = contrast(white, primary) >= 4.5 ? white : g["950"]
    // Ink: the accent drawn thin on the canvas. Light: at least 4.5:1 on white. Dark: at least 6:1 on black.
    const inkLight = reach(primary, white, 4.5, -1)
    const inkDark = reach(primary, black, 6, 1)
    const chartLight = contrast(primary, white) >= 3 ? primary : reach(primary, white, 3, -1)
    accent = {
      "--x-accent": [primary, primary],
      "--x-accent-hover": [shift(primary, 0.06), shift(primary, 0.06)],
      "--x-accent-press": [shift(primary, -0.07), shift(primary, -0.07)],
      "--x-accent-fg": [fg, fg],
      "--x-accent-wash": [alpha(primary, 0.07), alpha(primary, 0.14)],
      "--x-accent-ink": [inkLight, inkDark],
      "--x-accent-ink-hover": [shift(inkLight, 0.06), shift(inkDark, 0.07)],
      "--x-info-fg": [inkLight, reach(primary, black, 9, 1)],
      "--x-chart-1": [chartLight, reach(primary, black, 4, 1)],
    }
  }
  const t = (name: string, light: string, dark: string, note: string): Token => ({ name, light, dark, note })
  return [
    t("--x-accent", ...accent["--x-accent"], "fills: primary button, switch, checked boxes"),
    t("--x-accent-hover", ...accent["--x-accent-hover"], "an accent fill under the pointer"),
    t("--x-accent-press", ...accent["--x-accent-press"], "an accent fill pressed"),
    t("--x-accent-fg", ...accent["--x-accent-fg"], "text and icons on an accent fill"),
    t("--x-accent-wash", ...accent["--x-accent-wash"], "a selected option's fill"),
    t("--x-accent-ink", ...accent["--x-accent-ink"], "links, focus rings, check marks, icons on the canvas"),
    t("--x-accent-ink-hover", ...accent["--x-accent-ink-hover"], "a link under the pointer"),
    t("--x-info-fg", ...accent["--x-info-fg"], "information text"),
    t("--x-chart-1", ...accent["--x-chart-1"], "the first chart series"),
    t("--x-bg", canvas, black, "the page canvas"),
    t("--x-bg-panel", g["50"], g["950"], "cards, menus, dialogs"),
    t("--x-bg-chip", g["100"], g["800"], "chips, soft buttons, tracks"),
    t("--x-bg-chip-hover", g["200"], g["700"], "a chip under the pointer"),
    t("--x-bg-active", g["200"], g["800"], "a selected item"),
    t("--x-bg-active-hover", g["300"], g["700"], "a selected item under the pointer"),
    t("--x-border", g["200"], g["900"], "hairlines"),
    t("--x-border-hover", g["300"], g["700"], "a hairline under the pointer"),
    t("--x-fg-1", black, white, "titles, values"),
    t("--x-fg-2", g["700"], g["300"], "body text"),
    t("--x-fg-3", g["500"], g["500"], "secondary text, labels"),
    t("--x-fg-4", g["400"], g["600"], "placeholders"),
    t("--x-fg-frac", g["500"], g["400"], "numeral fractions"),
  ]
}

export const fontStack = (font: string) => `"${font.replace(/["\\]/g, "")}", ui-sans-serif, system-ui, sans-serif`
export const fontUrl = (font: string, weights = true) => `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.trim()).replace(/%20/g, "+")}${weights ? ":wght@400;500;600;700" : ""}&display=swap`
export const fontPage = (font: string) => `https://fonts.google.com/specimen/${encodeURIComponent(font.trim()).replace(/%20/g, "+")}`

/** The declarations the theme puts on a scope: every token as light-dark(), the font, and what follows them. */
export function themeDeclarations(theme: UserTheme): string {
  const lines = deriveTokens(theme).map((token) => `${token.name}: ${token.light === token.dark ? token.light : `light-dark(${token.light}, ${token.dark})`};`)
  // Declared on :root as var(--x-accent-ink), so they resolve there: restated here to follow the new ink.
  lines.push("--x-link: var(--x-accent-ink);", "--x-focus: var(--x-accent-ink);")
  if (theme.font.trim()) lines.push(`--x-font-sans: ${fontStack(theme.font.trim())};`, "font-family: var(--x-font-sans);")
  return lines.join(" ")
}

/** Where the theme applies: every preview stage and the Theming page's example, and what they open (toasts). */
export const THEME_SCOPE = ".wiki-demo-stage, .wiki-theme-example, .x-toaster, .x-messages"

// ----------------------------------------------------------------------------------------------------- the storage

export function readTheme(): UserTheme {
  try {
    const saved = JSON.parse(localStorage.getItem(THEME_KEY) ?? "null")
    if (!saved || typeof saved !== "object") return DEFAULT_THEME
    return {
      primary: parseHex(String(saved.primary ?? "")) ?? KIT_PRIMARY,
      tone: ["warm", "default", "cold"].includes(saved.tone) ? saved.tone : "default",
      font: typeof saved.font === "string" ? saved.font.slice(0, 60) : "",
    }
  } catch {
    return DEFAULT_THEME
  }
}

export function saveTheme(theme: UserTheme) {
  try {
    if (isDefault(theme)) localStorage.removeItem(THEME_KEY)
    else localStorage.setItem(THEME_KEY, JSON.stringify(theme))
  } catch {
    // The theme still applies to this page when storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }))
}

/** Puts the theme on the page: a style element for the previews, and the Google font's stylesheet. */
export function applyTheme(theme: UserTheme) {
  if (typeof document === "undefined") return
  let style = document.getElementById("wiki-user-theme") as HTMLStyleElement | null
  if (isDefault(theme)) { style?.remove(); document.getElementById("wiki-user-font")?.remove(); return }
  if (!style) { style = document.createElement("style"); style.id = "wiki-user-theme"; document.head.append(style) }
  style.textContent = `:is(${THEME_SCOPE}) { ${themeDeclarations(theme)} }`
  const font = theme.font.trim()
  let link = document.getElementById("wiki-user-font") as HTMLLinkElement | null
  if (!font) { link?.remove(); return }
  if (link?.dataset.font === font) return
  link?.remove()
  link = document.createElement("link")
  link.id = "wiki-user-font"
  link.rel = "stylesheet"
  link.dataset.font = font
  link.href = fontUrl(font)
  // A family without all four weights answers the weighted request with an error: then ask for the family alone.
  link.onerror = () => { if (link && link.href !== fontUrl(font, false)) link.href = fontUrl(font, false) }
  document.head.append(link)
}
