import type { Sidebar } from "@rspress/core"

// Sidebar icons: 24px outline glyphs (Heroicons v2, MIT; two Lucide glyphs, ISC) that stay legible at 14px.
const svg = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`
const path = (d: string) => svg(`<path d="${d}"/>`)

export const icons = {
  overview: path("m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"),
  install: path("M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"),
  rules: path("M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"),
  // Releases: the changelog (Heroicons document-text)
  releases: path("M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"),
  // Tokens: color swatches (Heroicons swatch)
  tokens: path("M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"),
  // Tailwind: two-way mapping (Heroicons arrows-right-left)
  tailwind: path("M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"),
  // Button: a pointer clicking (Heroicons cursor-arrow-rays)
  button: path("M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"),
  // Segmented: side-by-side segments (Heroicons view-columns)
  segmented: path("M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"),
  // Switch: a toggle turned on (Lucide toggle-right, ISC)
  switch: svg('<rect x="2" y="6" width="20" height="12" rx="6"/><circle cx="16" cy="12" r="2"/>'),
  // Input: a text input with a caret (Lucide text-cursor-input, ISC)
  field: svg('<path d="M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1"/><path d="M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5"/><path d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"/><path d="M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"/><path d="M9 7v10"/>'),
  // Tabs: a window with tabs along the top
  tabs: svg('<rect x="3" y="4.5" width="18" height="15" rx="2.25"/><path d="M3 9.75h18M9.75 4.5v5.25"/>'),
  // Chips: a filter (Heroicons funnel)
  chips: path("M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"),
  // Option cards: a selected radio (Lucide circle-dot, ISC)
  option: svg('<circle cx="12" cy="12" r="9.75"/><circle cx="12" cy="12" r="2.5"/>'),
  // List: rows with bullets (Heroicons list-bullet)
  list: path("M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"),
  // Components overview: a building piece (Heroicons cube)
  catalogComponents: path("m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"),
  // Blocks overview: grouped sections (Heroicons rectangle-group)
  catalogBlocks: path("M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"),
  // Card and Tile: a grid of cards (Heroicons squares-2x2)
  card: path("M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"),
  // Numeral: digits (Heroicons hashtag)
  numeral: path("M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-4.5-19.5-3.9 19.5"),
  // Avatar: an account (Heroicons user-circle)
  avatar: path("M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"),
  // Tag: a label (Heroicons tag)
  tag: path("M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z M6 6h.008v.008H6V6Z"),
  // Select: a value with up/down chevrons (Heroicons chevron-up-down)
  select: path("M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"),
  // Checkbox: a checked box
  checkbox: svg('<rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4"/><path d="m8 12.5 2.75 2.75L16 9.5"/>'),
  // Radio: a selected radio (Lucide circle-dot, ISC)
  radio: svg('<circle cx="12" cy="12" r="9.75"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>'),
  // Table: header and rows
  table: svg('<rect x="3" y="4.5" width="18" height="15" rx="2.25"/><path d="M3 9.75h18M3 14.75h18M9.75 9.75v9.75"/>'),
  // Pagination: previous, pages, next
  pagination: svg('<path d="m6.75 8.25-3.75 3.75 3.75 3.75M17.25 8.25 21 12l-3.75 3.75M10.5 12h.008M13.5 12h.008"/>'),
  // Tooltip: a speech bubble (Heroicons chat-bubble-bottom-center)
  tooltip: path("M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"),
  // Alert: an exclamation in a circle (Heroicons exclamation-circle)
  alert: path("M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"),
  // Message: an envelope (Heroicons envelope)
  message: path("M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"),
  // Blocks
  // Stats: bars (Heroicons chart-bar)
  stats: path("M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"),
  // Balance: a wallet
  balance: path("M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"),
  // Send form: a paper plane (Heroicons paper-airplane)
  "send-form": path("M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"),
  // Transactions: history (Heroicons clock)
  transactions: path("M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"),
  // Account switcher: people (Heroicons users)
  "account-switcher": path("M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"),
  // Dialog: a window with a title bar
  dialog: path("M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"),
  // Menu: the "more actions" trigger (Heroicons ellipsis-horizontal-circle)
  menu: path("M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"),
  // Toast: a bell
  toast: path("M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"),
}

/** One entry per kit component (primitive): protocol/components/<id> and src/pages/components/<id>.mdx. Alphabetical. */
export const components = [
  { id: "alert", text: "Alert" },
  { id: "avatar", text: "Avatar" },
  { id: "button", text: "Button" },
  { id: "checkbox", text: "Checkbox" },
  { id: "chips", text: "Chips" },
  { id: "dialog", text: "Dialog" },
  { id: "field", text: "Input" },
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
