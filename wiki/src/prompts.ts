/** The protocol version this wiki documents (DESIGN-PROTOCOL.md's Protocol-Version, injected by rspress.config.ts). */
export const KIT_VERSION = process.env.KIT_VERSION as string

/** Agent prompts, the same form as SPECTRE's. The latest protocol tells the agent how to install or upgrade, so their text never changes. */
export const installationPrompt =
  "Read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and install XRAY/DESIGN in this repository."

export const upgradePrompt = "Read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and upgrade XRAY/DESIGN in this repository."

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
export type DemoEntry = { id: string; name: string; kind: "component" | "block" }
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
  return `Use the installed XRAY/DESIGN design skill. If it is not installed, read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and install XRAY/DESIGN in this repository.\n\nAdd the ${entry.name} ${entry.kind} (${entry.kind}s/${entry.id}) using ${framework}. Follow its contract and the skill's guidance for this framework, preserving the existing app structure.`
}

/** A showcase screen: the agent adapts the whole screen to the project with the skill, by its wiki URL. */
export function showcasePrompt(screen: { id: string; text: string }, parts: string[]): string {
  return `Use the installed XRAY/DESIGN design skill. If it is not installed, read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and install XRAY/DESIGN in this repository.\n\nAdapt the ${screen.text} showcase screen (https://wiki.xraynetwork.io/design/showcase/${screen.id}) to this project. It is built from: ${parts.join(", ")}. Add the components and blocks it needs, follow their contracts and the skill's guidance for this project's GUI framework, and use this project's data, copy and navigation, preserving the existing app structure.`
}

export type ThemeInputs = { brand: string; font: string; radius: "kit" | "sharper" | "rounder"; grays: "kit" | "cooler" | "warmer" | "neutral" }

/** Theming: the skill's "Theme or rebrand" steps do the work; the prompt carries the human's inputs and target. */
export function themePrompt(inputs: ThemeInputs, preference: GuiPreference): string {
  const framework = frameworkFor(preference)
  const brand = inputs.brand.trim()
  if (!framework || !brand) return ""
  const extras = [
    inputs.font.trim() && `font ${inputs.font.trim()} (already loaded by the project)`,
    inputs.radius !== "kit" && `${inputs.radius} corners than the kit's (scale the whole radius scale)`,
    inputs.grays !== "kit" && `${inputs.grays === "neutral" ? "pure neutral" : inputs.grays} grays (shift the background, border and text neutrals together, in light/dark pairs)`,
  ].filter(Boolean)
  return `Use the installed XRAY/DESIGN design skill. If it is not installed, read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and install XRAY/DESIGN in this repository.\n\nTheme XRAY/DESIGN for this project using ${framework}: brand color ${brand}${extras.length ? `, ${extras.join(", ")}` : ""}. Follow the skill's "Theme or rebrand" steps: keep the overrides in the project's theme layer (recorded as "theme" in design.lock.json), derive the accent set for both themes, never edit copied kit files, and check contrast in light and dark theme.`
}
