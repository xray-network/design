---
# XRAY/Design protocol: the design standard for XRAY interfaces.
# This header is machine-readable: every design token with its final value in the light and dark themes.
# core/tokens.css implements exactly these values (the protocol check compares them). The protocol's id and
# version are the Protocol-ID and Protocol-Version lines under the title.
name: XRAY/Design
url: https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md
reference: https://wiki.xraynetwork.io/design/
tagline: Content-first. A quiet canvas, one electric blue, and data as the only other color.
themes: [light, dark]  # no attribute follows the OS; data-theme="light|dark" forces one
css_prefix: --x-       # token "bg-panel" is the CSS custom property --x-bg-panel
tokens:
  # Primitives: the raw palette. Components never use these directly.
  palette:
    white: "#ffffff"
    black: "#000000"
    blue-50: "#c3cdfa"
    blue-200: "#8b9ef6"
    blue-300: "#657ff3"
    blue-400: "#3f5ff0"
    blue-500: "#1940ed"
    blue-600: "#0f2fbf"
    gray-50: "#fafafa"
    gray-100: "#f4f4f4"
    gray-200: "#e7e6e6"
    gray-300: "#d5d4d4"
    gray-400: "#a3a2a2"
    gray-500: "#767575"
    gray-600: "#585757"
    gray-700: "#414040"
    gray-800: "#292828"
    gray-900: "#232222"
    gray-950: "#0f0f0f"
    green-500: "#15e4a3"
    green-800: "#07874d"
    red-200: "#ffa2a2"
    red-500: "#fa2c37"
    red-700: "#c10008"
    yellow-500: "#f0b000"
    orange-500: "#ff6900"
  # Semantic colors. { light, dark } when the themes differ.
  color:
    bg: { light: "#ffffff", dark: "#000000" }  # page canvas
    bg-panel: { light: "#fafafa", dark: "#0f0f0f" }  # cards, menus, dialogs
    bg-chip: { light: "#f4f4f4", dark: "#292828" }  # chips, soft buttons, tracks
    bg-chip-hover: { light: "#e7e6e6", dark: "#414040" }
    bg-active: { light: "#e7e6e6", dark: "#292828" }  # selected item
    bg-active-hover: { light: "#d5d4d4", dark: "#414040" }
    bg-soft: { light: "rgb(0 0 0 / 0.06)", dark: "rgb(255 255 255 / 0.06)" }  # hover wash
    bg-faint: { light: "rgb(0 0 0 / 0.03)", dark: "rgb(255 255 255 / 0.04)" }  # resting tabs
    scrim: { light: "rgb(0 0 0 / 0.35)", dark: "rgb(0 0 0 / 0.6)" }
    scroll-shade: { light: "rgb(0 0 0 / 0.1)", dark: "rgb(0 0 0 / 0.6)" }  # edge of a row with hidden items
    border: { light: "#e7e6e6", dark: "#232222" }
    border-hover: { light: "#d5d4d4", dark: "#414040" }
    fg-1: { light: "#000000", dark: "#ffffff" }  # titles, values
    fg-2: { light: "#414040", dark: "#d5d4d4" }  # body
    fg-3: "#767575"  # secondary, labels
    fg-4: { light: "#a3a2a2", dark: "#585757" }  # placeholders, legal
    fg-frac: { light: "#767575", dark: "#a3a2a2" }  # numeral fractions
    accent: "#1940ed"
    accent-hover: "#3f5ff0"
    accent-press: "#0f2fbf"
    accent-fg: "#ffffff"  # text on an accent fill
    accent-wash: { light: "rgb(25 64 237 / 0.07)", dark: "rgb(25 64 237 / 0.14)" }  # selected option fill
    accent-ink: { light: "#1940ed", dark: "#657ff3" }
    accent-ink-hover: { light: "#3f5ff0", dark: "#8b9ef6" }
    chart-1: { light: "#1940ed", dark: "#3f5ff0" }  # chart series, in a fixed order; never cycled
    chart-2: { light: "#ff6900", dark: "#e8590c" }
    chart-3: { light: "#1baf7a", dark: "#199e70" }
    chart-4: { light: "#eda100", dark: "#c98500" }
    chart-5: { light: "#e87ba4", dark: "#d55181" }
    chart-6: { light: "#6250d6", dark: "#9085e9" }
    link: { light: "#1940ed", dark: "#657ff3" }
    focus: { light: "#1940ed", dark: "#657ff3" }
    success: "#15e4a3"  # fills, dots
    success-fg: { light: "#07874d", dark: "#15e4a3" }  # text on canvas
    danger: "#fa2c37"
    danger-fg: { light: "#c10008", dark: "#ffa2a2" }
    danger-hover: "color-mix(in oklab, #fa2c37, #ffffff 14%)"
    danger-press: "color-mix(in oklab, #fa2c37, #000000 16%)"
    danger-on: "#ffffff"  # text on a danger fill
    warning: "#f0b000"
    info-fg: { light: "#1940ed", dark: "#8b9ef6" }
  # Font stacks. No webfonts unless the host brings them.
  font:
    font-sans: "\"-apple-system-body\", ui-sans-serif, -apple-system, system-ui, \"Segoe UI\", Helvetica, Arial, sans-serif"
    font-mono: "ui-monospace, SFMono-Regular, \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", monospace"
  # Font sizes.
  text:
    text-2xs: 11px  # kbd, ids
    text-xs: 12px  # captions, second lines
    text-sm: 13px  # small controls, menu items, addresses
    text-md: 14px  # body, controls
    text-lg: 15px  # card titles, section titles
    text-xl: 16px  # dialog input, context numerals
    text-2xl: 22px  # page title (app)
    text-3xl: 24px  # page title (shell), stat values
    text-4xl: 34px  # article title
    text-hero: 48px  # balance numerals
  # Font weights. The default weight is 500.
  weight:
    weight-body: "500"  # the default weight is 500, not 400
    weight-label: "600"
    weight-title: "700"
    weight-stat: "800"
    weight-numeral: "900"
  # Line height and letter spacing.
  type:
    leading-tight: 1.15
    leading-body: 1.4
    leading-prose: 1.6
    tracking-tight: -0.02em  # large numerals and titles
    tracking-caps: 0.04em  # tickers
  # Space: a 4px grid; 2px and 6px only for optical fixes.
  space:
    space-0-5: 2px
    space-1: 4px
    space-1-5: 6px
    space-2: 8px
    space-2-5: 10px  # window inset
    space-3: 12px
    space-3-5: 14px
    space-4: 16px
    space-5: 20px
    space-6: 24px
    space-7: 28px
    space-8: 32px
    space-10: 40px
    space-12: 48px
  # Radius follows the element's height; nested corners stay concentric.
  radius:
    radius-xs: 6px  # 22px controls, kbd, small tags
    radius-sm: 8px  # 26–28px controls, chip buttons, tooltips
    radius-md: 10px  # 32–36px controls: icon buttons, tabs, chips, tags, small buttons and inputs
    radius-lg: 12px  # 40–44px controls: buttons, inputs, segmented; toasts
    radius-xl: 14px  # 48–56px controls; menus, list rows
    radius-2xl: 16px  # cards, option cards, alerts, messages
    radius-3xl: 20px  # frames, dialogs
    radius-pill: 999px  # the switch, round buttons, the account chip; other controls are rounded rectangles
  # Control heights, icon sizes and icon stroke.
  size:
    size-xs: 22px
    size-sm: 28px
    size-md: 36px
    size-lg: 40px  # default button
    size-xl: 44px  # default input
    size-2xl: 48px
    control-sm: 36px  # form controls, small: toolbars, filters, page actions
    control-md: 40px  # form controls, default
    control-lg: 48px  # form controls, large
    icon-sm: 14px
    icon-md: 16px
    icon-lg: 18px
    stroke-icon: 1.75
  # Motion. The spring curves (spring, spring-soft) are generated linear() lists in core/tokens.css.
  motion:
    ease: "cubic-bezier(0.16, 1, 0.3, 1)"
    duration-fast: 120ms  # hover, press color
    duration-base: 180ms  # small reveals
    duration-slow: 280ms  # panels, layout
    spring-duration: 390ms
    spring-soft-duration: 517ms
    press-scale: 0.97  # press depth for moving parts (switch thumb stretch); 1 when motion is reduced
  # Stacking for overlays that are not in the top layer.
  layer:
    z-menu: "45"
    z-toast: "50"
    z-tooltip: "60"
---

# XRAY/Design protocol

Protocol-ID: xray/design

Protocol-Version: 1.0.0

The design standard for every XRAY interface. The YAML header at the top of this file holds every token with its
value in both themes (the wiki shows them on the Tokens page); the rules follow. Read this file
completely before creating or changing interface code.

Precedence: **DESIGN-PROTOCOL.md** → the component's **COMPONENT.md** → existing host code. If a request
conflicts with a rule, follow the request only when the human explicitly asks for it, and say
which rule you broke.

## Platform adaptation

The visual standard applies to web, native and other GUI frameworks. The supplied HTML, CSS and React
components are the web implementation. Native implementations translate the design into the target
framework's controls, theme, state and accessibility mechanisms; they do not require a browser or WebView.

- Preserve semantic colors in both themes, typography hierarchy, spacing and radius relationships,
  surface layering, component states, motion intent, content rules and identity assets.
- CSS names identify tokens across platforms. Map them to named theme values in the target framework.
  The YAML header remains the token source; do not maintain a separate handwritten native palette.
- Sizes in `px` describe the web reference. Define their mapping to logical layout units for the target
  framework; do not convert them to physical screen pixels. Allow text scaling, safe areas and the
  platform's accessible hit targets to enlarge controls and change layout. Record those adaptations.
- DOM structure, CSS layers/selectors, `aria-*`/`data-*`, Popover API, `<dialog>` and JS motion helpers
  are web mechanisms, including where a COMPONENT.md lists them as invariants. On native targets,
  preserve their outcomes using platform control state, accessibility roles/values, focus management
  and overlay presentation. Section 9 specifies the web contract, not native class/property names.
- Native control behavior and accessibility take priority over matching browser mechanics. Keep the
  XRAY styling where the framework exposes it; document system-controlled presentation differences.
  This does not waive the shared visual and behavioral contracts.

The skill's `references/native-gui.md` gives the native workflow; the wiki's
[Native GUI overview](https://wiki.xraynetwork.io/design/native-gui) explains what the agent handles automatically.
Read each component or block's contract before implementing it on any platform.

## Installation

These steps are for the coding agent. When asked to install XRAY/Design in a repository:

1. Clone the kit into a temporary directory outside the repository:
   `git clone https://github.com/xray-network/design.git <tmp>`
2. Copy `<tmp>/protocol/` to `.agents/design/` in the repository, then delete `<tmp>`.
3. Follow the Setup section of `.agents/design/SKILL.md`. It chooses the UI folder, copies and loads the tokens,
   or translates tokens into the native theme, connects dark mode, writes `<uiRoot>/design.lock.json`
   and adds a Design section to `AGENTS.md`. Setup selects the target framework before copying code.

**Protocol only.** When the human asks for just the rules and tokens, or the project keeps its own components, save
this file as `.agents/design/DESIGN-PROTOCOL.md` instead, and add to `AGENTS.md` (without replacing existing
instructions): "Read `.agents/design/DESIGN-PROTOCOL.md` before creating or changing interfaces."

**Upgrade.** When asked to upgrade, follow the Upgrade section of `.agents/design/SKILL.md`. With the protocol only,
replace the file with the latest copy from https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md. Either way, report
what changed from the Releases page (https://wiki.xraynetwork.io/design/releases).

## 1. Character

Content-first. A quiet canvas, one electric blue, and data as the only other color. Balances, addresses and
tables are the subject; the interface recedes into hairline-bordered surfaces, and color comes from the content
(deltas, tickers, account avatars), not from decoration.

- **Flat.** Surfaces separate by fill steps and 1px hairlines. No drop shadows, no glows, no
  glass or backdrop blur. Gradients are allowed only as overflow fades in the canvas color and as chart area fills.
- **Quiet chrome, loud data.** Navigation and controls stay gray. Color marks state (selected,
  success, danger) or identity (avatars, app tiles), never decoration.
- **Liquid where things move.** Things that physically travel (indicators, thumbs, sheets,
  stacks) move on springs. Everything else changes with short geometric fades.

## 2. Color

Use semantic tokens only (`--x-bg`, `--x-fg-2`, `--x-accent` …). Primitives (`--x-gray-800`) are
for the tokens file. Raw hex, rgb or hsl values never appear in component CSS.

| Role | Tokens | Use |
|---|---|---|
| Canvas | `--x-bg` | Page. Exact white in light, exact black in dark. |
| Surfaces | `--x-bg-panel` → `--x-bg-chip` → `--x-bg-active` | Cards, menus, dialogs → chips, tracks → selected items. Each step is one level up. |
| Washes | `--x-bg-soft`, `--x-bg-faint` | Hover on transparent controls; resting tabs. |
| Shade | `--x-scroll-shade` | The edge of a row that scrolls sideways, on the side with hidden items. |
| Lines | `--x-border`, `--x-border-hover` | Every edge. Hover steps the hairline up. |
| Text | `--x-fg-1` … `--x-fg-4` | Titles and values → body → labels and secondary → placeholders and legal. |
| Action | `--x-accent` (+ `-hover`, `-press`, `-fg`, `-wash`) | Accent fills: primary buttons, the switch, checked boxes, the active chart series. Same blue in both themes. |
| Accent ink | `--x-accent-ink` (+ `-hover`); `--x-focus`, `--x-link` follow it | The accent drawn thin on the canvas: focus rings and focused borders, links, info icons, check marks, the selected option card's border. Lighter in dark theme, where the fill blue is too dark for lines. |
| Status | `--x-success`, `--x-danger`, `--x-warning` (+ `-fg` for text) | Fills and dots use the base token; text on the canvas uses `-fg`. |

- One accent per view region. If two things are blue, one of them is wrong.
- Status is never color alone: pair it with a dot plus text, a sign (+/−) or an icon.
- Text contrast meets WCAG AA (4.5:1 body, 3:1 large and UI). `--x-fg-4` is for placeholders and legal text only.

## 3. Typography

System sans (`--x-font-sans`), system mono (`--x-font-mono`). No webfonts unless the host brings them.

| Use | Size / weight |
|---|---|
| Body, controls | 14 / 500 (the default weight is 500) |
| Small controls, menu items, addresses | 13 / 500 |
| Captions, second lines, hints | 12 / 500 |
| Labels, buttons, tabs | 13–14 / 600 |
| Card and section titles | 15 / 700 |
| Page titles | 22–24 / 700, tracking −0.01em |
| Stat values | 24 / 800, tracking −0.02em |
| Balances (numerals) | 16–48 / 900, tracking −0.02em |

- **Numerals:** integer part at full size; the fraction at 0.5–0.6em, weight 700, `--x-fg-frac`;
  the ticker at 12px, weight 700, tracking 0.04em, `--x-fg-3`. Lists and tables use
  `tabular-nums`; large standalone numerals use proportional digits.
- **Mono** for addresses, hashes, account labels, ids and code. Never for prose.
- Sentence case everywhere. No all-caps except tickers.

## 4. Space and layout

- 4px grid. 2px and 6px only for optical fixes (badge overhangs, tight gaps).
- App shell: 10px window inset; content sits in a framed area (`--x-radius-3xl`, hairline).
- Content column: 740px for single-task screens, 1080px for grids. Page padding 32/24 desktop, 24/16 phone.
- Sections stack with 40px gaps and **no boxes around sections**. Cards are for repeated objects (apps, accounts), not for grouping.
- Lists are rows without boxes: 14px radius rows with a soft wash on hover.
- **Form controls stand in line.** Button, Input, Select, SelectNative, Combobox, InputGroup and Segmented share
  one height per size: `sm` 36px with 13px text, the default 40px with 14px, `lg` 48px with 15px
  (`--x-control-sm`, `-md`, `-lg`). A search field, a filter and an action of the same size line up in any row.
  Icon buttons and chips keep their own sizes: they sit inside rows and fields, not beside them.

## 5. Radius

Controls are rounded rectangles, not capsules. The radius follows the element's height, and nested
corners are concentric: **inner radius = outer radius − padding** (subtract the hairline when it matters).

| Element | Radius |
|---|---|
| 22px controls, kbd, small tags | 6 (`--x-radius-xs`) |
| 26–28px controls, chip buttons, tooltips | 8 (`--x-radius-sm`) |
| 32–36px controls: icon buttons, tabs, chips, tags, small buttons and inputs | 10 (`--x-radius-md`) |
| 40–44px controls: buttons, inputs, segmented; toasts | 12 (`--x-radius-lg`) |
| 48–56px controls; menus, list rows | 14 (`--x-radius-xl`) |
| Cards, option cards, alerts, messages | 16 (`--x-radius-2xl`) |
| Frames, dialogs, sheets | 20 (`--x-radius-3xl`) |

Fully round shapes are for things that are round by nature: the switch, avatars, status dots, the icon and token
discs in lists, and the account chip. Buttons may opt in with `data-shape="round"` (a capsule), one shape per row.
Inputs, chips and tags are never capsules.

## 6. Surfaces and layering

- Elevation is expressed by surface step and hairline, never by shadow.
- Web overlays (menus, dialogs, toasts, messages) use the Popover API or `<dialog>`, so they sit in the top layer.
  Native targets use framework overlay/modal presentation with equivalent focus and dismissal behavior.
- Modal dialogs dim the page with `--x-scrim`. Nothing else dims, except the shade at the edge of a row that scrolls
  sideways (`--x-scroll-shade`), where items are hidden.

## 7. Icons

24px-grid outline icons, stroke 1.75, round caps and joins, `currentColor`.
Sizes: 14 (in 22px buttons), 16 (in menus, inputs and small buttons), 18 (in 36px buttons).
Filled marks are reserved for brand and chain logos and for verified badges. Decorative icons get
`aria-hidden="true"`.

## 8. Motion

Two families, both defined only by tokens:

| Family | Tokens | For |
|---|---|---|
| Geometric | `--x-ease` with `--x-duration-fast` 120 / `-base` 180 / `-slow` 280 | Color, border, opacity; exits; panels and layout shifts that must not wobble. |
| Liquid | `--x-spring` (slight overshoot) and `--x-spring-soft` (no overshoot) with their `-duration` tokens | Things that physically travel: selection indicators, thumbs, overlay entry, sheets, stack reflow. Buttons never move: their feedback is color only. |

**Motion budget**

- Liquid motion is allowed for: selection indicators (segmented, tabs, nav), switch thumbs (including their press stretch),
  **entry** of an overlay or a surface (dialog, menu, toast, sheet, a panel that appears), list and stack reflow (FLIP),
  one element becoming another, drag release, and a screen arriving in a flow (forward and back; tabs fade).
- Never animate: data values and text content, numbers ticking, page scroll, color on a spring,
  anything that loops (except progress: spinners and loading skeletons; and BorderBeam), or anything over 600ms.
- Skeletons pulse while loading, one pulse per 1.4s (a progress loop, so the 600ms limit does not apply to it);
  reduced motion stops the pulse and keeps the placeholders.
- BorderBeam is the one decorative loop: opt-in, at most one per screen, never on controls or text, and removed
  entirely when motion is reduced.
- A drawing in steps (Result's ring, then its mark) keeps every step under 600ms and plays once.
- Exits never overshoot: they use `--x-ease`.
- Animate `transform`, `scale`, `translate`, `opacity`; small `left`/`right`/`width` only on tiny elements such as indicators and thumbs.
- One moving thing at a time per region. Stagger only for lists of more than 3 items, by 30ms each, 5 items at most.

**Implementation tiers**

These tiers describe the web implementation. Native targets use their framework's animation tools with
the same motion budget, easing intent and reduced-motion behavior.

0. CSS: transitions, `@starting-style`, `linear()` springs. The default.
1. Kit helpers in `core/motion.js`: `trackIndicator`, `scrollStrip`, `createFlip`, `afterTransition`. No dependencies. The kit's
   motion patterns (`motion/`: Presence, Stagger, Expand, LiquidIndicator, Reflow, Drag, Reorder, Morph, Replace,
   Screen, Pager) are these helpers and tier 0 CSS applied, ready to add.
2. A JS motion library (for example `motion`), only for gesture physics such as drag-to-dismiss, only in React,
   and only if the project already depends on it or the human approves adding it.

**Reduced motion** collapses every duration token to 0 (OS setting, or `data-motion="reduce"`
on any ancestor). Components that use the tokens need nothing else. Never hard-code a duration.

## 9. Markup and state contract (web)

- Native elements first: `<button>`, `<input type=radio|checkbox>`, `<dialog>`, `popover`, `<details>`, `<label>`.
- **State lives in attributes**: `aria-*`, `data-state`, `data-*`, `:checked`, `:disabled`, `[open]`, `:popover-open`.
  CSS styles those attributes. No `.is-active` or `.open` state classes. Any framework or vanilla controller only toggles attributes.
- Variants and sizes are `data-variant` and `data-size`; defaults have no attribute.
- Classes are prefixed `x-` and named `x-<component>` and `x-<component>-<part>`.
- Component tokens (`--x-<component>-*`) are declared on the component root and default to semantic tokens.
  Restyling an instance means overriding component tokens, not writing new selectors.
- All kit CSS lives in the cascade layers `theme` (tokens), `base` (reset) or `components`, declared in that order
  with `utilities` last, as Tailwind does. Every kit CSS file starts with that order statement
  (`@layer theme, base, components, utilities;`), so load order never matters. Unlayered host CSS always wins;
  in Tailwind projects, utilities do too.

## 10. Accessibility floor

- A visible focus ring on every interactive element (2px `--x-focus`, 2px offset; text fields show the accent border instead).
- Full keyboard use: Tab order follows the visual order; arrows within composite widgets; Esc closes overlays.
- Every control has an accessible name. Icon-only buttons have `aria-label`.
- Web hit targets are at least 24×24 (prefer 36+ on touch). Native targets meet the target platform's
  accessible hit-area guidance, even when it exceeds the reference size. The visual size can be smaller if the hit area is padded.
- Respect reduced motion (tokens) and forced colors (do not remove outlines or borders in `forced-colors` mode).
- Errors are text, linked with `aria-describedby`, and announced (`role="alert"`).

## 11. Themes and theming

Light and dark are both first-class: every color token has a value for each theme, and every screen is verified in
both themes before it is done. On the web, `light-dark()` tokens follow `color-scheme`: no attribute follows the OS;
`data-theme="light|dark"` forces a theme on the page or any subtree. Native targets resolve each pair to the
platform's dynamic colors.

A project themes the kit, in any GUI framework, by overriding semantic tokens. This is the whole theming surface,
by protocol token name:

| Part | Tokens | Rule |
|---|---|---|
| Accent | `accent`, `accent-hover`, `accent-press`, `accent-fg`, `accent-wash`, `accent-ink`, `accent-ink-hover`, `link`, `focus`, `info-fg` | Derive the whole set from one brand color, for both themes. `accent` fills buttons and selections and may stay the same in both themes; `accent-fg` is the text on it. `accent-ink` (focus rings, focused borders, links, icons, check marks) is a lighter shade in dark theme; `link`, `focus` and `info-fg` follow it. |
| Fonts | `font-sans`, `font-mono` | Bring a font only if the project loads it; keep the system stacks as fallbacks. |
| Radius | `radius-xs` … `radius-3xl` | Scale them together, so nested corners keep their relationship. `radius-pill` stays. |
| Neutrals (optional) | `bg*`, `border*`, `fg-*`, `scrim` | Change light/dark pairs together, for a custom palette. |
| Chart series (optional) | `chart-1` … `chart-6` | Change them as a set, and check the set for color-blind separation in both themes. The first follows the brand color. |

- **Fixed:** components read semantic tokens, never raw values; both themes; AA contrast for text and focus rings,
  checked for every changed pair in both themes; status colors (`success`, `danger`, `warning`); space, size,
  type scale, motion and layer tokens; component anatomy and states.
- **One theme layer.** Overrides live in one project-owned place that is applied after the kit's tokens and holds only
  the changed values, keyed by protocol token names. Never edit copied kit files to theme them: upgrades replace
  those. The UI folder's `design.lock.json` records that place as `theme`, and upgrades never modify it.
  - Web: a stylesheet loaded after `core/tokens.css` that sets the custom properties (`--x-accent`, …). Set color
    tokens on `:root, [data-theme]`, the kit's own selector for them, so forced-theme sections keep the values.
  - Native: the project's theme module or resources, overriding the translated tokens with the same names.

## 12. Responsive

| Width | Behavior |
|---|---|
| ≤ 560px | Phone. Dialogs become bottom sheets; footer actions stack full-width; grids drop to 1–2 columns. |
| ≤ 760px | Compact shell: side navigation becomes a drawer; secondary chrome folds into menus. |
| ≤ 1160px | Toolbars shed labels before they shed actions (icon + shortcut stays). |

Never scroll the page sideways. Horizontal overflow scrolls inside its own container, with no
visible scrollbar and an edge fade in the canvas color.

## 13. Voice

- Short, plain, specific. Buttons are verbs ("Send", "Remove account"), not "OK" or "Submit".
- Sentence case. No trailing periods in labels, buttons, toasts or menu items.
- Second person: "you" and "your". The product never says "we".
- Addresses and hashes are truncated in the middle and set in mono: `addr1q…azf5ek`.
- No emoji. The only decorative character is the middle dot between footer links.
- Numbers carry units or tickers ("12.40 ADA", "4 min"). Negative values use a true minus (−).
- Errors say what happened and what to do: "Fee too low. Choose Standard or Fast."
- Destructive confirmations name the object and the consequence.

## 14. Working with components and blocks (for agents)

**Components** are single controls you build with (Button, Select, Table). **Blocks** are finished screen sections
(Balance, SendForm, TabBar, TableView) built from components: they add layout, never new controls or tokens.
If a block needs a control the kit lacks, that control becomes a component first. A block may build on other
blocks, and hold a motion pattern or a chart, each declared in its frontmatter (`blocks:`, `patterns:`,
`charts:`); components never use blocks. A block that restyles a part it holds writes that rule with two classes
(`.x-top-bar > .x-top-bar-nav`), so it holds whatever order the stylesheets load in.

1. Start from the catalog (`.agents/design/components/<id>` or `blocks/<id>`). Read its COMPONENT.md.
2. Copy the web implementation or implement its contract in the target GUI framework (see the skill).
   Keep the HTML and React versions consistent if both are used.
3. Adapt within the component's **Safe edits**. Never break its **Invariants** or these rules without the human's explicit request.
   A project copy is shared by every screen that uses it: keep a one-place change at that place, make a wider one
   a variant that is off by default, and build a new component when the result no longer fits the contract.
4. A new component must look like it came from the kit: semantic and component tokens, both themes,
   accessible framework state, keyboard support, a motion tier, and its own COMPONENT.md in the project.
   Web implementations also use attribute state, `x-` naming and `@layer components`.
5. Before finishing, run the component's checklist and the checks in section 10.

## 15. Do and don't

**Do**

- Let surface steps and 1px hairlines carry all depth, in both themes.
- Keep blue functional: actions, selection, focus, links. One blue element per region.
- Use green, red and yellow only for status, always with a sign, an icon or text.
- Drive every color through semantic tokens, so both themes work without extra code.
- Set machine data (addresses, hashes, ids) in mono, and balances as numerals with a small fraction.
- Keep layouts dense and aligned to the 4px grid.

**Don't**

- Don't use shadows, glows, glass, blur or multi-stop gradients.
- Don't use blue as decoration or as a large background.
- Don't make inputs, chips or tags into capsules.
- Don't add photography, illustration, textures, patterns or emoji.
- Don't hard-code colors, durations or radii in components.
- Don't animate numbers, text or anything that loops.

## 16. Charts

Charts follow every rule above, and add these. They exist because a chart is read: nothing in one is decoration.

**Form**

- Pick the chart by the question. Change along an ordered scale is a line, or stacked areas when a total and its
  makeup change together. Amounts compared across categories are bars: a list of horizontal bars when the names
  are long, stacked when each total has parts. The parts of one whole are a donut or a share bar (six at most), or
  a treemap for many. Steps people drop out of are a funnel; amounts across two dimensions are a heatmap; two
  measures against each other are a scatter; a state per period is a status strip; a traded price is candlesticks,
  with its order book as a depth chart; a trend beside a number is a sparkline. One number is not a chart: use Stats.
- One value axis. Two measures on different scales are two charts, never two axes.
- Bars start at zero. Lines may fit their data, unless they are filled (an area), which starts at zero.

**Color**

- Series take `chart-1` to `chart-6`, in that order, and keep their color whatever is filtered out. The order is
  what keeps neighbours apart for color-blind readers, so it is never shuffled and never cycled: a seventh series
  is folded into "Other", in a muted gray.
- Green, red and yellow stay out of series: they mean status and direction (section 2). Charts that show exactly
  that use them: up and down candles, bids and asks, the states of a status strip, always named in words as well.
- An amount shown as strength (a heatmap, a treemap) uses one hue, from a faint tint to the full color. Never a
  rainbow.
- Text never takes a series color. Values, labels and legends use the text tokens; a swatch beside them carries
  the identity.

**Marks**

- Lines are 2px with round joins; an area is a 10% wash of its line. Bars are slim, 10px thick at most, with a
  fully round cap at the data end and a square base on the baseline. Dots have a radius of 4px.
- Marks that touch are parted by the surface color: 3px between the bars of a category, 2px between the parts of
  a donut, a 2px ring round a dot. Never a border.
- Gridlines and axes are hairlines one step off the surface. Ticks are few, round and tabular; numbers are
  written in full under 10,000 and compact from there.
- No gradients, shadows, 3D or decoration (section 15).

**Reading**

- Two or more series always have a legend, so a series is never told by color alone. Its entries switch their
  series off and on; a series that is off is shown as off in more than color, and the others keep their colors.
- Every chart has a readout: on a line it snaps to the nearest category and lists every series there; on bars
  and parts it reads the one pointed at. It works the same from the keyboard, and nothing it shows is missing
  from the data table.
- Every chart carries its data as a table: it is what assistive technology reads, and it can be shown in place
  of the plot. On the web the table is the chart's source.
- A sparkline has no axis and no readout: it says what it shows in its label, and sits beside its number.

**Motion and states**

- Data never animates (section 8): a chart is simply drawn, and redrawn when its data changes. No draw-in, no
  growing bars, no morphing between data sets.
- The readout is not data, and it moves: it fades in and grows from 96% where it is first wanted, then glides from
  mark to mark with its crosshair, dots or band, on `--x-ease`, and fades out when the chart is left.
- While it loads, a Skeleton of the plot's size; with nothing to show, Empty.

**Implementation**

The kit's charts are the reference design: whatever draws a chart in a project, it looks and reads like these.

- Web, with no charting library in the project: `charts/<id>/` on the shared frame in `core/chart.js` and
  `core/chart.css` (scales, ticks, the legend, the readout, the table). Do not add a library for a chart the kit has.
- A project that already draws charts with a library (Recharts, Chart.js, ECharts, Nivo, Victory, Swift Charts,
  Compose or any other) keeps it. Configure it to this section through its own options, and use the kit's chart of
  the same form as the picture to match. Never restyle a library by overriding its markup from outside.
- Native targets with no chart library draw with their framework's own canvas or drawing tools, to the same rules.

Whatever the library, set these, in its own terms:

| Rule | What to set |
|---|---|
| Series colors | The six `chart-*` tokens, in order, as each series' stroke or fill. Turn off the library's own palette. |
| Lines | 2px, round joins, straight segments between points. No dots on every point: one on the last, and on the one being read. |
| Areas | The line's color at 10% opacity. No gradient. |
| Bars | 10px wide at most; the data end fully rounded, the base square; 3px between the bars of a category. |
| Donut | The ring about a quarter of the radius thick; 2px between parts, in the surface color; the total in the middle. |
| Grid and axes | Horizontal gridlines only, hairlines in `border`. No axis lines, no tick marks. Tick text in `fg-3` at `text-2xs`, tabular. |
| Legend | Shown for two or more series, above the plot, in text colors with a swatch. Its entries switch series off and on. |
| Readout | The library's tooltip, restyled as a panel (`bg-panel`, hairline, `radius-md`): the category, then each value with its series name. A crosshair on lines; a soft band behind bars. |
| Animation | The library's draw-in and data animations off. Only the readout moves. |
| Table | Render the same data as a table for assistive technology, and offer it as a view. |
