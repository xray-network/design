import type { Sidebar } from "@rspress/core"

/** One entry per kit component (primitive): protocol/components/<id> and src/pages/components/<id>.mdx. Alphabetical. */
export const components = [
  { id: "alert", text: "Alert" },
  { id: "avatar", text: "Avatar" },
  { id: "border-beam", text: "BorderBeam" },
  { id: "button", text: "Button" },
  { id: "calendar", text: "Calendar" },
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
  { id: "chat", text: "Chat" },
  { id: "post", text: "Post" },
  { id: "profile", text: "Profile" },
  { id: "send-form", text: "SendForm" },
  { id: "sign-in", text: "SignIn" },
  { id: "stats-grid", text: "StatsGrid" },
  { id: "swap", text: "Swap" },
  { id: "transactions", text: "Transactions" },
] as const

/** The motion patterns are grouped by the question they answer; the order is the order of the menu and the overview. */
export const motionGroups = [
  { id: "arriving", text: "Arriving and leaving", description: "Something that was not there now is, or the other way round." },
  { id: "moving", text: "Moving", description: "Something that is already there changes place." },
  { id: "becoming", text: "Becoming", description: "One thing turns into another." },
  { id: "navigating", text: "Navigating", description: "The whole view changes to another one." },
] as const

/** One entry per motion pattern: protocol/motion/<id> and src/pages/motion/<id>.mdx. In menu order, by group. */
export const motion = [
  { id: "presence", text: "Presence", group: "arriving" },
  { id: "stagger", text: "Stagger", group: "arriving" },
  { id: "expand", text: "Expand", group: "arriving" },
  { id: "liquid-indicator", text: "LiquidIndicator", group: "moving" },
  { id: "reflow", text: "Reflow", group: "moving" },
  { id: "drag", text: "Drag", group: "moving" },
  { id: "morph", text: "Morph", group: "becoming" },
  { id: "screen", text: "Screen", group: "navigating" },
] as const

/** One entry per showcase screen: src/pages/showcase/<id>.mdx, and the components and blocks it is built from. */
export const showcase = [
  { id: "settings-form", text: "SettingsForm", description: "Grouped preferences: text, select, radio, checkbox and switch controls.", uses: ["input", "select", "radio", "checkbox", "switch", "button"] },
] as const

/** One entry per showcase app: its screens are static pages under src/pages/public/apps/<id>/<file>.html, shown on
    src/pages/showcase/<id>.mdx. `uses` lists the kit parts they are built from. */
export const apps = [
  {
    id: "gramainst", text: "Gramainst", description: "A photo feed: stories, posts with pictures, an explore grid and a profile.",
    screens: [{ file: "feed", text: "Feed" }, { file: "explore", text: "Explore" }, { file: "profile", text: "Profile" }],
    uses: ["post", "profile", "avatar", "button", "chips", "input", "segmented", "liquid-indicator"],
  },
  {
    id: "gramatel", text: "Gramatel", description: "A messenger: the chat list, a conversation and settings.",
    screens: [{ file: "chats", text: "Chats" }, { file: "chat", text: "Conversation" }, { file: "settings", text: "Settings" }],
    uses: ["chat", "list", "menu-list", "avatar", "button", "input", "liquid-indicator", "stagger"],
  },
  {
    id: "nancbin", text: "Nancbin", description: "An exchange: markets, a trade screen and a wallet.",
    screens: [{ file: "markets", text: "Markets" }, { file: "trade", text: "Trade" }, { file: "wallet", text: "Wallet" }],
    uses: ["balance", "swap", "input-amount", "list", "numeral", "tag", "segmented", "button", "liquid-indicator", "stagger"],
  },
  {
    id: "tertwit", text: "Tertwit", description: "A microblog: the timeline, a thread and a profile.",
    screens: [{ file: "home", text: "Timeline" }, { file: "post", text: "Thread" }, { file: "profile", text: "Profile" }],
    uses: ["post", "profile", "avatar", "button", "input", "segmented", "liquid-indicator"],
  },
] as const

/** A name as link text: its words apart ("CardOption" reads "Card Option"). `text` stays the name used in code and prompts. */
export const linkText = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, "$1 $2")

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
      ...byName(components).map(({ id, text }) => ({ text: linkText(text), link: `/components/${id}` })),
    ],
    "/blocks/": [
      back,
      { sectionHeaderText: "Blocks" },
      { text: "All blocks", link: "/blocks/" },
      ...byName(blocks).map(({ id, text }) => ({ text: linkText(text), link: `/blocks/${id}` })),
    ],
    "/motion/": [
      back,
      { sectionHeaderText: "Motion" },
      { text: "Overview", link: "/motion/" },
      ...motionGroups.flatMap((group) => [
        { sectionHeaderText: group.text },
        ...motion.filter((pattern) => pattern.group === group.id).map(({ id, text }) => ({ text: linkText(text), link: `/motion/${id}` })),
      ]),
    ],
    "/showcase/": [
      back,
      { sectionHeaderText: "Showcase" },
      { text: "All screens", link: "/showcase/" },
      { sectionHeaderText: "Apps" },
      ...apps.map(({ id, text }) => ({ text: linkText(text), link: `/showcase/${id}` })),
      { sectionHeaderText: "Screens" },
      ...showcase.map(({ id, text }) => ({ text: linkText(text), link: `/showcase/${id}` })),
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
      { text: "Motion", link: "/motion/" },
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
