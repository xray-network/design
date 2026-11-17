import type { Sidebar } from "@rspress/core"

import * as ui from "../../protocol/components/icon/icons.js"

// Sidebar icons come from the kit's Icon component (protocol/components/icon/icons.js). The sidebar renders
// them as HTML strings, so the stroke is written on the svg here instead of coming from icon.css.
const svg = ({ body }: { body: string }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`

export const icons = {
  overview: svg(ui.home),
  install: svg(ui.arrowDownTray),
  catalogComponents: svg(ui.cube),
  catalogBlocks: svg(ui.rectangleGroup),
  icons: svg(ui.sparkles),
  rules: svg(ui.bookOpen),
  tokens: svg(ui.swatch),
  tailwind: svg(ui.arrowsRightLeft),
  releases: svg(ui.documentText),
  // Components
  alert: svg(ui.exclamationCircle),
  avatar: svg(ui.userCircle),
  button: svg(ui.cursorArrowRays),
  checkbox: svg(ui.checkSquare),
  chips: svg(ui.funnel),
  dialog: svg(ui.window),
  field: svg(ui.textCursorInput),
  icon: svg(ui.sparkles),
  menu: svg(ui.ellipsisHorizontalCircle),
  message: svg(ui.envelope),
  numeral: svg(ui.hashtag),
  pagination: svg(ui.pagination),
  radio: svg(ui.radioSelected),
  segmented: svg(ui.viewColumns),
  select: svg(ui.chevronUpDown),
  switch: svg(ui.toggleRight),
  table: svg(ui.tableRows),
  tabs: svg(ui.windowTabs),
  tag: svg(ui.tag),
  toast: svg(ui.bell),
  tooltip: svg(ui.chatBubbleBottomCenter),
  // Blocks
  "account-switcher": svg(ui.users),
  balance: svg(ui.wallet),
  card: svg(ui.squares2x2),
  list: svg(ui.listBullet),
  option: svg(ui.circleDot),
  "send-form": svg(ui.paperAirplane),
  stats: svg(ui.chartBar),
  transactions: svg(ui.clock),
}

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

const byName = <T extends { text: string }>(items: readonly T[]) => [...items].sort((a, b) => a.text.localeCompare(b.text))

export function sidebar(): Sidebar {
  return {
    "/": [
      { sectionHeaderText: "Get started" },
      { text: "Overview", link: "/", icon: icons.overview },
      { text: "Installation", link: "/installation", icon: icons.install },
      { text: "Components", link: "/components/", icon: icons.catalogComponents },
      { text: "Blocks", link: "/blocks/", icon: icons.catalogBlocks },
      { text: "Icons", link: "/icons", icon: icons.icons },
      { sectionHeaderText: "Reference" },
      { text: "Design protocol", link: "/rules", icon: icons.rules },
      { text: "Tokens", link: "/tokens", icon: icons.tokens },
      { text: "Tailwind", link: "/tailwind", icon: icons.tailwind },
      { text: "Releases", link: "/releases", icon: icons.releases },
      { sectionHeaderText: "Components" },
      ...byName(components).map(({ id, text }) => ({ text, link: `/components/${id}`, icon: icons[id] })),
      { sectionHeaderText: "Blocks" },
      ...byName(blocks).map(({ id, text }) => ({ text, link: `/blocks/${id}`, icon: icons[id] })),
    ],
  }
}
