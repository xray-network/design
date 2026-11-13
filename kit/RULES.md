# XRAY/DESIGN rules

These are the rules for every interface built with this kit, whether you copy a component, adapt
one or write new UI. Read this file completely before changing interface code.

Precedence: **RULES.md** → the component's **COMPONENT.md** → existing host code. If a request
conflicts with a rule, follow the request only when the human explicitly asks for it, and say
which rule you broke.

## 1. Character

Content-first. A quiet canvas, one electric blue, and data as the only other color.

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
| Action | `--x-accent` (+ `-hover`, `-press`, `-fg`, `-wash`) | Primary buttons, focus, the selected option card, the active chart series. Same blue in both themes. |
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
| Cards, option cards | 16 (`--x-radius-2xl`) |
| Frames, dialogs, sheets | 20 (`--x-radius-3xl`) |

Fully round shapes are reserved for things that are round by nature: the switch, avatars, status
dots, and the icon and token discs in lists. Do not make a button, input, chip or tag a capsule.

## 6. Surfaces and layering

- Elevation is expressed by surface step and hairline, never by shadow.
- Overlays (menus, dialogs, toasts) use the Popover API or `<dialog>`, so they sit in the top layer. Avoid z-index wars.
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
- All kit CSS lives in `@layer x.reset`, `x.tokens` or `x.components`, so unlayered host CSS always wins.

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
- Rebrand by overriding semantic tokens in a host stylesheet (`--x-accent`, `-hover`, `-press`, `-wash`, `--x-focus`, fonts),
  never by editing component CSS.

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
- Numbers carry units or tickers ("12.40 ADA", "4 min"). Negative values use a true minus (−).
- Errors say what happened and what to do: "Fee too low. Choose Standard or Fast."
- Destructive confirmations name the object and the consequence.

## 14. Working with components (for agents)

1. Start from the catalog (`.agents/skills/design/components/<id>`). Read its COMPONENT.md.
2. Copy it into the project (see the skill) and keep the HTML and React versions consistent if both are used.
3. Adapt within the component's **Safe edits**. Never break its **Invariants** or these rules without the human's explicit request.
4. A new component must look like it came from the kit: semantic and component tokens, attribute state,
   `x-` naming, `@layer x.components`, both themes, keyboard support, a motion tier, and its own COMPONENT.md in the project.
5. Before finishing, run the component's checklist and the checks in section 10.
