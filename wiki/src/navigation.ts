import type { Sidebar } from "@rspress/core"

/** One entry per kit component (primitive): protocol/components/<id> and src/pages/components/<id>.mdx. Alphabetical. */
export const components = [
  { id: "alert", text: "Alert" },
  { id: "avatar", text: "Avatar" },
  { id: "border-beam", text: "BorderBeam" },
  { id: "button", text: "Button" },
  { id: "card", text: "Card" },
  { id: "card-option", text: "CardOption" },
  { id: "checkbox", text: "Checkbox" },
  { id: "chips", text: "Chips" },
  { id: "collapse", text: "Collapse" },
  { id: "combobox", text: "Combobox" },
  { id: "command", text: "Command" },
  { id: "copy", text: "Copy" },
  { id: "empty", text: "Empty" },
  { id: "icon", text: "Icon" },
  { id: "input", text: "Input" },
  { id: "input-amount", text: "InputAmount" },
  { id: "input-group", text: "InputGroup" },
  { id: "list", text: "List" },
  { id: "menu", text: "Menu" },
  { id: "menu-list", text: "MenuList" },
  { id: "menu-navigation", text: "MenuNavigation" },
  { id: "message", text: "Message" },
  { id: "modal", text: "Modal" },
  { id: "numeral", text: "Numeral" },
  { id: "pagination", text: "Pagination" },
  { id: "popconfirm", text: "Popconfirm" },
  { id: "popover", text: "Popover" },
  { id: "progress", text: "Progress" },
  { id: "radio", text: "Radio" },
  { id: "result", text: "Result" },
  { id: "segmented", text: "Segmented" },
  { id: "select", text: "Select" },
  { id: "select-native", text: "SelectNative" },
  { id: "skeleton", text: "Skeleton" },
  { id: "slider", text: "Slider" },
  { id: "spinner", text: "Spinner" },
  { id: "stats", text: "Stats" },
  { id: "steps", text: "Steps" },
  { id: "switch", text: "Switch" },
  { id: "table", text: "Table" },
  { id: "table-compact", text: "TableCompact" },
  { id: "tabs", text: "Tabs" },
  { id: "tag", text: "Tag" },
  { id: "timeline", text: "Timeline" },
  { id: "toast", text: "Toast" },
  { id: "tooltip", text: "Tooltip" },
  { id: "typography", text: "Typography" },
] as const

/** One entry per kit block: protocol/blocks/<id> and src/pages/blocks/<id>.mdx. Alphabetical. */
export const blocks = [
  { id: "balance", text: "Balance" },
  { id: "send-form", text: "SendForm" },
  { id: "stats-grid", text: "StatsGrid" },
  { id: "swap", text: "Swap" },
  { id: "transactions", text: "Transactions" },
] as const

/** One entry per showcase screen: src/pages/showcase/<id>.mdx, and the components and blocks it is built from. */
export const showcase = [
  { id: "settings-form", text: "SettingsForm", description: "Grouped preferences: text, select, radio, checkbox and switch controls.", uses: ["input", "select", "radio", "checkbox", "switch", "button"] },
] as const

const byName = <T extends { text: string }>(items: readonly T[]) => [...items].sort((a, b) => a.text.localeCompare(b.text))

/** First item of each section menu: back to the home page and the main menu. The arrow is drawn in theme.css. */
const back = { text: "Back to Home", link: "/" }

/** One menu per section: Rspress shows the menu whose path prefix matches the page best. */
export function sidebar(): Sidebar {
  return {
    "/components/": [
      back,
      { sectionHeaderText: "Components" },
      { text: "All components", link: "/components/" },
      ...byName(components).map(({ id, text }) => ({ text, link: `/components/${id}` })),
    ],
    "/blocks/": [
      back,
      { sectionHeaderText: "Blocks" },
      { text: "All blocks", link: "/blocks/" },
      ...byName(blocks).map(({ id, text }) => ({ text, link: `/blocks/${id}` })),
    ],
    "/showcase/": [
      back,
      { sectionHeaderText: "Showcase" },
      { text: "All screens", link: "/showcase/" },
      ...showcase.map(({ id, text }) => ({ text, link: `/showcase/${id}` })),
    ],
    "/": [
      { sectionHeaderText: "Get started" },
      { text: "Overview", link: "/" },
      { text: "Installation", link: "/installation" },
      { text: "Core concepts", link: "/concepts" },
      { sectionHeaderText: "UI kit" },
      { text: "Components", link: "/components/" },
      { text: "Blocks", link: "/blocks/" },
      { text: "Showcase", link: "/showcase/" },
      { text: "Icons", link: "/icons" },
      { sectionHeaderText: "Reference" },
      { text: "Design protocol", link: "/protocol" },
      { text: "Tokens", link: "/tokens" },
      { text: "Theming", link: "/theming" },
      { text: "Tailwind", link: "/tailwind" },
      { text: "Native GUI", link: "/native-gui" },
      { text: "Releases", link: "/releases" },
    ],
  }
}
