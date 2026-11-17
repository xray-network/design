---
# XRAY/DESIGN protocol: the design standard for XRAY interfaces.
# This header is machine-readable: every design token with its final value in the light and dark themes.
# core/tokens.css implements exactly these values (the protocol check compares them). The protocol's id and
# version are the Protocol-ID and Protocol-Version lines under the title.
name: XRAY/DESIGN
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
    gray-50: "#f9fafb"
    gray-100: "#f3f4f6"
    gray-200: "#e5e7eb"
    gray-300: "#d1d5db"
    gray-400: "#9ca3af"
    gray-500: "#6e758d"
    gray-600: "#55556d"
    gray-700: "#374151"
    gray-800: "#1f2937"
    gray-900: "#1e2232"
    gray-950: "#0e0e18"
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
    bg-panel: { light: "#f9fafb", dark: "#0e0e18" }  # cards, menus, dialogs
    bg-chip: { light: "#f3f4f6", dark: "#1f2937" }  # chips, soft buttons, tracks
    bg-chip-hover: { light: "#e5e7eb", dark: "#374151" }
    bg-active: { light: "#e5e7eb", dark: "#1f2937" }  # selected item
    bg-active-hover: { light: "#d1d5db", dark: "#374151" }
    bg-soft: { light: "rgb(0 0 0 / 0.06)", dark: "rgb(255 255 255 / 0.06)" }  # hover wash
    bg-faint: { light: "rgb(0 0 0 / 0.03)", dark: "rgb(255 255 255 / 0.04)" }  # resting tabs
    scrim: { light: "rgb(0 0 0 / 0.35)", dark: "rgb(0 0 0 / 0.6)" }
    border: { light: "#e5e7eb", dark: "#1e2232" }
    border-hover: { light: "#d1d5db", dark: "#374151" }
    fg-1: { light: "#0e0e18", dark: "#ffffff" }  # titles, values
    fg-2: { light: "#374151", dark: "#d1d5db" }  # body
    fg-3: "#6e758d"  # secondary, labels
    fg-4: { light: "#9ca3af", dark: "#55556d" }  # placeholders, legal
    fg-frac: { light: "#6e758d", dark: "#9ca3af" }  # numeral fractions
    accent: "#1940ed"
    accent-hover: "#3f5ff0"
    accent-press: "#0f2fbf"
    accent-fg: "#ffffff"  # text on an accent fill
    accent-wash: { light: "rgb(25 64 237 / 0.07)", dark: "rgb(25 64 237 / 0.14)" }  # selected option fill
    accent-ink: { light: "#1940ed", dark: "#657ff3" }
    accent-ink-hover: { light: "#3f5ff0", dark: "#8b9ef6" }
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

# XRAY/DESIGN protocol

Protocol-ID: xray/design

Protocol-Version: 1.0.0

The design standard for every XRAY interface. The YAML header at the top of this file holds every token with its
value in both themes (the wiki shows them on the Tokens page); the rules follow. Read this file
completely before creating or changing interface code.

Precedence: **DESIGN-PROTOCOL.md** → the component's **COMPONENT.md** → existing host code. If a request
conflicts with a rule, follow the request only when the human explicitly asks for it, and say
which rule you broke.

## Installation

These steps are for the coding agent. When asked to install XRAY/DESIGN in a repository:

1. Clone the kit into a temporary directory outside the repository:
   `git clone https://github.com/xray-network/design.git <tmp>`
2. Copy `<tmp>/protocol/` to `.agents/design/` in the repository, then delete `<tmp>`.
3. Follow the Setup section of `.agents/design/SKILL.md`. It chooses the UI folder, copies and loads the tokens,
   connects dark mode, writes `<uiRoot>/design.lock.json` and adds a Design section to `AGENTS.md`.

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
- Overlays (menus, dialogs, toasts, messages) use the Popover API or `<dialog>`, so they sit in the top layer. Avoid z-index wars.
- Modal dialogs dim the page with `--x-scrim`. Nothing else dims.

## 7. Icons

24px-grid outline icons (Heroicons outline style), stroke 1.75, round caps and joins, `currentColor`.
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
  overlay **entry** (dialog, menu, toast, sheet), list and stack reflow (FLIP), and drag release.
- Never animate: data values and text content, numbers ticking, page scroll, color on a spring,
  anything that loops (except progress spinners), or anything over 600ms.
- Exits never overshoot: they use `--x-ease`.
- Animate `transform`, `scale`, `translate`, `opacity`; small `left`/`right`/`width` only on tiny elements such as indicators and thumbs.
- One moving thing at a time per region. Stagger only for lists of more than 3 items, by 30ms each, 5 items at most.

**Implementation tiers**

0. CSS: transitions, `@starting-style`, `linear()` springs. The default.
1. Kit helpers in `core/motion.js`: `trackIndicator`, `createFlip`, `afterTransition`. No dependencies.
2. A JS motion library (for example `motion`), only for gesture physics such as drag-to-dismiss, only in React,
   and only if the project already depends on it or the human approves adding it.

**Reduced motion** collapses every duration token to 0 (OS setting, or `data-motion="reduce"`
on any ancestor). Components that use the tokens need nothing else. Never hard-code a duration.

## 9. Markup and state contract

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
- Hit targets are at least 24×24 (prefer 36+ on touch). The visual size can be smaller if the hit area is padded.
- Respect reduced motion (tokens) and forced colors (do not remove outlines or borders in `forced-colors` mode).
- Errors are text, linked with `aria-describedby`, and announced (`role="alert"`).

## 11. Themes

Light and dark are both first-class. `light-dark()` tokens follow `color-scheme`:
no attribute follows the OS; `data-theme="light|dark"` forces a theme on the page or any subtree.

- Every screen is verified in both themes before it is done.
- Rebrand by overriding semantic tokens in a host stylesheet (`--x-accent`, `-hover`, `-press`, `-wash`, `--x-accent-ink`, `-ink-hover`, fonts),
  never by editing component CSS. Override color tokens on `:root, [data-theme]`, the selector the kit declares them
  on, so forced-theme sections keep them.

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
(Balance, Send form, Transactions) built only from components: they add layout, never new controls or tokens.
If a block needs a control the kit lacks, that control becomes a component first. A block may build on other blocks,
declared in its frontmatter `blocks:`; components never use blocks.

1. Start from the catalog (`.agents/design/components/<id>` or `blocks/<id>`). Read its COMPONENT.md.
2. Copy it into the project (see the skill) and keep the HTML and React versions consistent if both are used.
3. Adapt within the component's **Safe edits**. Never break its **Invariants** or these rules without the human's explicit request.
4. A new component must look like it came from the kit: semantic and component tokens, attribute state,
   `x-` naming, `@layer components`, both themes, keyboard support, a motion tier, and its own COMPONENT.md in the project.
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
