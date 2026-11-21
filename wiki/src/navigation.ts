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
  { id: "api-keys", text: "ApiKeys" },
  { id: "asset-list", text: "AssetList" },
  { id: "balance", text: "Balance" },
  { id: "board", text: "Board" },
  { id: "chart-card", text: "ChartCard" },
  { id: "chat", text: "Chat" },
  { id: "chat-list", text: "ChatList" },
  { id: "checkout", text: "Checkout" },
  { id: "comments", text: "Comments" },
  { id: "composer", text: "Composer" },
  { id: "inbox", text: "Inbox" },
  { id: "market-list", text: "MarketList" },
  { id: "media-grid", text: "MediaGrid" },
  { id: "order-book", text: "OrderBook" },
  { id: "page-header", text: "PageHeader" },
  { id: "player", text: "Player" },
  { id: "post", text: "Post" },
  { id: "profile", text: "Profile" },
  { id: "record-detail", text: "RecordDetail" },
  { id: "send-form", text: "SendForm" },
  { id: "settings", text: "Settings" },
  { id: "sign-in", text: "SignIn" },
  { id: "stats-grid", text: "StatsGrid" },
  { id: "stories", text: "Stories" },
  { id: "swap", text: "Swap" },
  { id: "tab-bar", text: "TabBar" },
  { id: "table-view", text: "TableView" },
  { id: "top-bar", text: "TopBar" },
  { id: "transactions", text: "Transactions" },
  { id: "usage-meters", text: "UsageMeters" },
] as const

/** One entry per chart: protocol/charts/<id> and src/pages/charts/<id>.mdx. Alphabetical. */
export const charts = [
  { id: "bar-chart", text: "BarChart" },
  { id: "bar-list", text: "BarList" },
  { id: "candlestick-chart", text: "CandlestickChart" },
  { id: "depth-chart", text: "DepthChart" },
  { id: "donut-chart", text: "DonutChart" },
  { id: "funnel-chart", text: "FunnelChart" },
  { id: "heatmap", text: "Heatmap" },
  { id: "line-chart", text: "LineChart" },
  { id: "scatter-chart", text: "ScatterChart" },
  { id: "share-bar", text: "ShareBar" },
  { id: "sparkline", text: "Sparkline" },
  { id: "stacked-area-chart", text: "StackedAreaChart" },
  { id: "stacked-bar-chart", text: "StackedBarChart" },
  { id: "status-strip", text: "StatusStrip" },
  { id: "treemap", text: "Treemap" },
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
  { id: "reorder", text: "Reorder", group: "moving" },
  { id: "morph", text: "Morph", group: "becoming" },
  { id: "replace", text: "Replace", group: "becoming" },
  { id: "screen", text: "Screen", group: "navigating" },
  { id: "pager", text: "Pager", group: "navigating" },
] as const

/** One entry per showcase app. Each is one static page, src/pages/public/apps/<id>/index.html, whose screens are
    shown by the hash (`file`), on src/pages/showcase/<id>.mdx. `form` is what it was designed for first; `uses`
    lists the kit parts it is built from. */
export const apps = [
  {
    id: "gramainst", text: "Gramainst", form: "mobile", description: "A photo feed: stories, posts with pictures, an explore grid and a profile.",
    screens: [{ file: "feed", text: "Feed" }, { file: "explore", text: "Explore" }, { file: "profile", text: "Profile" }],
    uses: ["media-grid", "post", "profile", "stories", "tab-bar", "avatar", "button", "chips", "input", "segmented", "liquid-indicator", "screen"],
  },
  {
    id: "gramatel", text: "Gramatel", form: "mobile", description: "A messenger: the chat list, a conversation and settings.",
    screens: [{ file: "chats", text: "Chats" }, { file: "chat", text: "Conversation" }, { file: "settings", text: "Settings" }],
    uses: ["chat", "chat-list", "tab-bar", "avatar", "button", "input", "list", "menu-list", "liquid-indicator", "screen", "stagger"],
  },
  {
    id: "nancbin", text: "Nancbin", form: "mobile", description: "An exchange: markets, a trade screen and a wallet.",
    screens: [{ file: "markets", text: "Markets" }, { file: "trade", text: "Trade" }, { file: "wallet", text: "Wallet" }],
    uses: ["asset-list", "balance", "market-list", "swap", "tab-bar", "button", "input-amount", "list", "numeral", "segmented", "tag", "line-chart", "sparkline", "liquid-indicator", "screen", "stagger"],
  },
  {
    id: "tertwit", text: "Tertwit", form: "mobile", description: "A microblog: the timeline, a thread and a profile.",
    screens: [{ file: "home", text: "Timeline" }, { file: "post", text: "Thread" }, { file: "profile", text: "Profile" }],
    uses: ["composer", "post", "profile", "tab-bar", "avatar", "button", "segmented", "liquid-indicator", "screen"],
  },
  {
    id: "maskmeta", text: "Maskmeta", form: "mobile", description: "A wallet: what you hold, sending, swapping and the history.",
    screens: [{ file: "wallet", text: "Wallet" }, { file: "send", text: "Send" }, { file: "swap", text: "Swap" }, { file: "activity", text: "Activity" }],
    uses: ["asset-list", "balance", "send-form", "swap", "tab-bar", "transactions", "button", "card-option", "chips", "input", "input-amount", "list", "numeral", "pagination", "tag", "share-bar", "liquid-indicator", "screen", "stagger"],
  },
  {
    id: "tifyspo", text: "Tifyspo", form: "mobile", description: "A music app: home, the player, search and the library.",
    screens: [{ file: "home", text: "Home" }, { file: "player", text: "Now playing" }, { file: "search", text: "Search" }, { file: "library", text: "Library" }],
    uses: ["media-grid", "player", "tab-bar", "button", "chips", "input", "list", "segmented", "slider", "liquid-indicator", "screen", "stagger"],
  },
  {
    id: "bnbair", text: "Bnbair", form: "mobile", description: "A stays app: explore, a listing, booking with dates, trips and a profile.",
    screens: [{ file: "explore", text: "Explore" }, { file: "listing", text: "Listing" }, { file: "book", text: "Book" }, { file: "trips", text: "Trips" }, { file: "profile", text: "Profile" }],
    uses: ["checkout", "profile", "tab-bar", "avatar", "button", "calendar", "chips", "empty", "input", "list", "menu-list", "tag", "liquid-indicator", "pager", "screen", "stagger"],
  },
  {
    id: "mailg", text: "Mailg", form: "mobile", description: "A mail app: the inbox, a message with a reply box, writing one, and settings.",
    screens: [{ file: "inbox", text: "Inbox" }, { file: "thread", text: "Message" }, { file: "compose", text: "New message" }, { file: "sent", text: "Sent" }, { file: "settings", text: "Settings" }],
    uses: ["composer", "inbox", "tab-bar", "avatar", "button", "input", "list", "menu-list", "segmented", "liquid-indicator", "screen", "stagger"],
  },
  {
    id: "pestri", text: "Pestri", form: "desktop", description: "A payments dashboard: the month at a glance, the payments table, one payment, and settings.",
    screens: [{ file: "home", text: "Home" }, { file: "payments", text: "Payments" }, { file: "payment", text: "Payment" }, { file: "settings", text: "Settings" }],
    uses: ["chart-card", "page-header", "record-detail", "settings", "table-view", "top-bar", "avatar", "button", "checkbox", "input", "list", "pagination", "radio", "segmented", "select-native", "stats", "switch", "table", "tag", "timeline", "line-chart", "liquid-indicator", "screen", "stagger"],
  },
  {
    id: "raphg", text: "Raphg", form: "desktop", description: "An API console: traffic and endpoints, keys, and the request log.",
    screens: [{ file: "overview", text: "Overview" }, { file: "keys", text: "API keys" }, { file: "logs", text: "Logs" }],
    uses: ["api-keys", "chart-card", "page-header", "table-view", "top-bar", "avatar", "button", "input", "pagination", "segmented", "select-native", "stats", "table", "tag", "bar-chart", "bar-list", "expand", "liquid-indicator", "screen"],
  },
  {
    id: "celver", text: "Celver", form: "desktop", description: "A hosting console: service status, deployments and usage against limits.",
    screens: [{ file: "status", text: "Status" }, { file: "deployments", text: "Deployments" }, { file: "usage", text: "Usage" }],
    uses: ["chart-card", "page-header", "top-bar", "usage-meters", "avatar", "button", "list", "progress", "segmented", "tag", "timeline", "donut-chart", "line-chart", "sparkline", "status-strip", "liquid-indicator", "screen", "stagger"],
  },
  {
    id: "earlin", text: "Earlin", form: "desktop", description: "An issue tracker: the sprint board, the issue list, one issue with its thread, and an inbox.",
    screens: [{ file: "board", text: "Board" }, { file: "issues", text: "Issues" }, { file: "issue", text: "Issue" }, { file: "inbox", text: "Inbox" }],
    uses: ["board", "comments", "composer", "inbox", "page-header", "record-detail", "table-view", "top-bar", "avatar", "button", "input", "pagination", "segmented", "table", "tag", "liquid-indicator", "screen"],
  },
  {
    id: "viewtrad", text: "Viewtrad", form: "desktop", description: "A markets terminal: a watchlist, one market with its order book, and a market map.",
    screens: [{ file: "markets", text: "Markets" }, { file: "pair", text: "ETH / USDC" }, { file: "map", text: "Map" }],
    uses: ["chart-card", "market-list", "order-book", "page-header", "top-bar", "avatar", "button", "list", "segmented", "stats", "tag", "candlestick-chart", "depth-chart", "donut-chart", "line-chart", "sparkline", "treemap", "liquid-indicator", "screen", "stagger"],
  },
  {
    id: "fyshop", text: "Fyshop", form: "desktop", description: "A store admin: the day's sales, orders, one order, and products.",
    screens: [{ file: "home", text: "Home" }, { file: "orders", text: "Orders" }, { file: "order", text: "Order" }, { file: "products", text: "Products" }],
    uses: ["chart-card", "page-header", "record-detail", "table-view", "top-bar", "avatar", "button", "input", "pagination", "segmented", "stats", "table", "tag", "timeline", "bar-list", "funnel-chart", "stacked-bar-chart", "liquid-indicator", "screen"],
  },
  {
    id: "hubgit", text: "Hubgit", form: "desktop", description: "A code host: a repository, a pull request with its checks, and insights.",
    screens: [{ file: "repo", text: "Code" }, { file: "pull", text: "Pull request" }, { file: "insights", text: "Insights" }],
    uses: ["chart-card", "comments", "composer", "page-header", "top-bar", "avatar", "button", "list", "segmented", "stats", "steps", "tag", "heatmap", "share-bar", "stacked-area-chart", "status-strip", "liquid-indicator", "screen", "stagger"],
  },
] as const

/** A name as link text: its words apart ("CardOption" reads "Card Option"). `text` stays the name used in code and prompts. */
export const linkText = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, "$1 $2")

/** A showcase app as it is titled in links and on its page: "Pestri App". Inside the app, the brand stays "Pestri". */
export const appTitle = (name: string) => `${name} App`

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
    "/charts/": [
      back,
      { sectionHeaderText: "Charts" },
      { text: "All charts", link: "/charts/" },
      ...byName(charts).map(({ id, text }) => ({ text: linkText(text), link: `/charts/${id}` })),
    ],
    "/motion/": [
      back,
      { sectionHeaderText: "Motion" },
      { text: "Overview", link: "/motion/" },
      { text: "Foundations", link: "/motion/foundations" },
      ...motionGroups.flatMap((group) => [
        { sectionHeaderText: group.text },
        ...motion.filter((pattern) => pattern.group === group.id).map(({ id, text }) => ({ text: linkText(text), link: `/motion/${id}` })),
      ]),
    ],
    "/showcase/": [
      back,
      { sectionHeaderText: "Showcase" },
      { text: "All apps", link: "/showcase/" },
      { sectionHeaderText: "Mobile first" },
      ...apps.filter((app) => app.form === "mobile").map(({ id, text }) => ({ text: appTitle(text), link: `/showcase/${id}` })),
      { sectionHeaderText: "Desktop first" },
      ...apps.filter((app) => app.form === "desktop").map(({ id, text }) => ({ text: appTitle(text), link: `/showcase/${id}` })),
    ],
    "/": [
      { sectionHeaderText: "Get started" },
      { text: "Overview", link: "/" },
      { text: "Installation", link: "/installation" },
      { text: "Core concepts", link: "/concepts" },
      { sectionHeaderText: "UI kit" },
      { text: "Components", link: "/components/" },
      { text: "Blocks", link: "/blocks/" },
      { text: "Charts", link: "/charts/" },
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
