import { fontPage, fontStack, type Token, type UserTheme } from "./theme/userTheme"

/** The protocol version this wiki documents (DESIGN-PROTOCOL.md's Protocol-Version, injected by rspress.config.ts). */
export const KIT_VERSION = process.env.KIT_VERSION as string

/** Agent prompts, the same form as SPECTRE's. The latest protocol tells the agent how to install or upgrade, so their text never changes. */
export const installationPrompt =
  "Read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and install XRAY/Design in this repository."

export const upgradePrompt = "Read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and upgrade XRAY/Design in this repository."

export const primaryGuiTargets = [
  { value: "auto", label: "Auto", framework: "this project's existing GUI framework" },
  { value: "react", label: "React", framework: "React for the web" },
  { value: "swiftui", label: "SwiftUI", framework: "SwiftUI" },
  { value: "compose", label: "Compose", framework: "Jetpack Compose (Kotlin)" },
  { value: "javafx", label: "JavaFX", framework: "JavaFX" },
] as const

export const moreGuiTargets = [
  { value: "flutter", label: "Flutter", framework: "Flutter" },
  { value: "html", label: "HTML / CSS", framework: "plain HTML and CSS" },
  { value: "vue", label: "Vue", framework: "Vue" },
  { value: "svelte", label: "Svelte", framework: "Svelte" },
  { value: "uikit", label: "UIKit", framework: "UIKit" },
  { value: "appkit", label: "AppKit", framework: "AppKit" },
  { value: "android-views", label: "Android Views", framework: "Android Views in the project's existing Java or Kotlin language" },
  { value: "react-native", label: "React Native", framework: "React Native" },
  { value: "qt", label: "Qt", framework: "Qt in the project's existing language" },
  { value: "wpf", label: "WPF", framework: "WPF" },
  { value: "swing", label: "Swing", framework: "Swing" },
  { value: "custom", label: "Other framework", framework: "" },
] as const

const guiTargets = [...primaryGuiTargets, ...moreGuiTargets]
export type GuiTarget = (typeof guiTargets)[number]["value"]
export type GuiPreference = { target: GuiTarget; custom: string }
export type DemoEntry = { id: string; name: string; kind: "component" | "block" | "motion" | "chart" }

/** Where an entry lives in the kit, and what the prompt calls it. */
export const kitPath = (entry: Pick<DemoEntry, "id" | "kind">) => (entry.kind === "motion" ? `motion/${entry.id}` : `${entry.kind}s/${entry.id}`)
const kindName = (kind: DemoEntry["kind"]) => (kind === "motion" ? "motion pattern" : kind)
export const GUI_PREFERENCE_KEY = "xray-design-gui-preference"
export const defaultGuiPreference: GuiPreference = { target: "auto", custom: "" }

/** Ignore stale or malformed saved choices; never replace Auto with an unknown target. */
export function parseGuiPreference(value: string | null): GuiPreference {
  try {
    const saved = JSON.parse(value ?? "null")
    if (!saved || !guiTargets.some((target) => target.value === saved.target)) return defaultGuiPreference
    return { target: saved.target, custom: typeof saved.custom === "string" ? saved.custom : "" }
  } catch {
    return defaultGuiPreference
  }
}

/** The framework phrase for a prompt; empty when "Other framework" has no name yet. */
export function frameworkFor(preference: GuiPreference): string {
  return preference.target === "custom"
    ? preference.custom.trim()
    : guiTargets.find((target) => target.value === preference.target)!.framework
}

/** Implementation instructions stay in the skill; prompts identify the entry and target. */
export function componentPrompt(entry: DemoEntry, preference: GuiPreference): string {
  const framework = frameworkFor(preference)
  if (!framework) return ""
  return `Use the installed XRAY/Design design skill. If it is not installed, read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and install XRAY/Design in this repository.\n\nAdd the ${entry.name} ${kindName(entry.kind)} (${kitPath(entry)}) using ${framework}. Follow its contract and the skill's guidance for this framework, preserving the existing app structure.`
}

/** One screen of a showcase app: the agent reads the published page and rebuilds it in the project. */
export function appScreenPrompt(app: string, screen: string, url: string): string {
  return `Use the installed XRAY/Design design skill. If it is not installed, read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and install XRAY/Design in this repository.\n\nBuild a screen like the ${app} ${screen} screen at ${url} in this project. Read that page's HTML first: classes that start with x- are kit components, blocks and motion patterns, and classes that start with app- are layout only. Add the kit parts it uses with the skill, follow their contracts and the skill's guidance for this project's GUI framework, recreate the layout in this project's own layout system, and use this project's data, copy and navigation, preserving the existing app structure.`
}

/** Theming: the reader's primary color, tone and font, with every token derived from them, for the skill's "Theme or
    rebrand" steps to write into the project's theme layer. */
export function themePrompt(theme: UserTheme, tokens: Token[], preference: GuiPreference): string {
  const framework = frameworkFor(preference)
  if (!framework) return ""
  const width = Math.max(...tokens.map((token) => token.name.length))
  const colors = tokens.map((token) => `${token.name.padEnd(width)}  ${token.light === token.dark ? token.light : `${token.light} / ${token.dark}`}   (${token.note})`).join("\n")
  const font = theme.font.trim()
    ? `Font: ${theme.font.trim()}, from Google Fonts (${fontPage(theme.font)}). Load weights 400, 500, 600 and 700 with font-display: swap, the way this project loads fonts, and set --x-font-sans to ${fontStack(theme.font.trim())}.`
    : "Font: keep the kit's system font stack."
  return `Use the installed XRAY/Design design skill. If it is not installed, read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and install XRAY/Design in this repository.

Theme XRAY/Design for this project using ${framework}. Follow the skill's "Theme or rebrand" steps: put these values in the project's theme layer (recorded as "theme" in design.lock.json), never edit copied kit files, and keep every token not listed here as the kit has it.

Primary color ${theme.primary}, ${theme.tone} grays. The colors, light / dark, where they differ:

${colors}

${font}

Then check contrast in light and dark theme: text on the canvas and on accent fills at least 4.5:1, focus rings, icons and chart lines at least 3:1.`
}
