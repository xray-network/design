import type { Sidebar } from "@rspress/core"

/** One entry per kit component (primitive): protocol/components/<id> and src/pages/components/<id>.mdx. Alphabetical. */
export const components = [
  { id: "alert", text: "Alert" },
  { id: "avatar", text: "Avatar" },
  { id: "button", text: "Button" },
  { id: "checkbox", text: "Checkbox" },
  { id: "chips", text: "Chips" },
  { id: "dialog", text: "Modal" },
  { id: "field", text: "Input" },
  { id: "icon", text: "Icon" },
  { id: "menu", text: "Menu" },
  { id: "message", text: "Message" },
  { id: "numeral", text: "Numeral" },
  { id: "pagination", text: "Pagination" },
  { id: "radio", text: "Radio" },
  { id: "segmented", text: "Segmented" },
  { id: "select", text: "Select" },
  { id: "switch", text: "Switch" },
  { id: "table", text: "Table" },
  { id: "tabs", text: "Tabs" },
  { id: "tag", text: "Tag" },
  { id: "toast", text: "Toast" },
  { id: "tooltip", text: "Tooltip" },
] as const

/** One entry per kit block: protocol/blocks/<id> and src/pages/blocks/<id>.mdx. Alphabetical. */
export const blocks = [
  { id: "account-switcher", text: "Account switcher" },
  { id: "balance", text: "Balance" },
  { id: "card", text: "Card and Tile" },
  { id: "list", text: "List" },
  { id: "option", text: "Option cards" },
  { id: "send-form", text: "Send form" },
  { id: "stats", text: "Stats" },
  { id: "transactions", text: "Transactions" },
] as const

/** One entry per showcase screen: src/pages/showcase/<id>.mdx, and the components and blocks it is built from. */
export const showcase = [
  { id: "wallet", text: "Wallet", description: "Account, balance, activity and history; Send opens the send form in a modal.", uses: ["account-switcher", "balance", "segmented", "stats", "transactions", "dialog", "send-form", "tag", "button"] },
  { id: "dashboard", text: "API dashboard", description: "Headline numbers for a period, an incident note and a sortable endpoints table.", uses: ["segmented", "stats", "alert", "table", "pagination", "button"] },
  { id: "settings", text: "Settings", description: "Grouped preferences: text, select, radio, checkbox and switch controls.", uses: ["field", "select", "radio", "checkbox", "switch", "button"] },
  { id: "mini-apps", text: "Mini apps", description: "Tabs for views, a category filter, search and a grid of app cards.", uses: ["tabs", "chips", "field", "card", "alert"] },
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
      { text: "Components", link: "/components/" },
      { text: "Blocks", link: "/blocks/" },
      { text: "Showcase", link: "/showcase/" },
      { text: "Icons", link: "/icons" },
      { sectionHeaderText: "Reference" },
      { text: "Design protocol", link: "/design-protocol" },
      { text: "Tokens", link: "/tokens" },
      { text: "Tailwind", link: "/tailwind" },
      { text: "Native GUI", link: "/native-gui" },
      { text: "Releases", link: "/releases" },
    ],
  }
}
