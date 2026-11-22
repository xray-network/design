---
id: tabs-line
name: TabsLine
summary: Tabs on a hairline, with a 3px line under the current tab that slides and stretches to the next one.
motion: 1
requires: [tokens, motion]
components: []
files: [tabs-line.css, tabs-line.html, tabs-line.controller.js, tabs-line.controller.d.ts, tabs-line.tsx]
---

# TabsLine

The sections of one page or one record: Overview, Activity, Disputes. The tabs are words on a hairline, and the
current one has a line under it in the accent color. Moving to another tab moves the line: its leading edge goes
first and the other follows on a softer spring, so it stretches toward the new tab and settles (the
LiquidIndicator motion, drawn as a line).

For the app's own views (Dashboard, one tab per open app) use Tabs; for a short choice inside a control use
Segmented. The app shows the view of the current tab.

## Anatomy

```
div|nav.x-tabs-line[data-indicator][data-direction][data-width]    a 1px hairline under the row; scrolls sideways
├── button|a.x-tabs-line-item[aria-current]     40px; [icon] label [count]; no padding: the line is as wide as the text
│   └── span.x-tabs-line-count                  optional; how many the tab holds
└── span.x-tabs-line-bar (aria-hidden)           the one line, 3px, on the hairline
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-width` | `full`: the tabs share the row equally (two to four tabs over a panel) | the tabs' own width, 24px apart |

## States

| State | Source | Look |
|---|---|---|
| current | `aria-current` on one tab | strong text; the line sits under it |
| hover | `:hover` | strong text |
| focus | `:focus-visible` | ring inside the tab |
| disabled | `disabled` on a button tab | faint text, not pressable |
| before JS | no `data-indicator` | the current tab draws its own line; nothing is lost without the controller |

## Accessibility

- Navigation: `nav` with links and `aria-current="page"`. Sections of one page: a named group of buttons with
  `aria-current="true"`.
- The line is decorative (`aria-hidden`); the current tab is known from `aria-current` and its strong text.
- Every tab is in the Tab order; arrow keys are not needed.
- A row wider than its place scrolls sideways, and the tab that becomes current is scrolled into view.

## Motion

Tier 1. `trackIndicator()` from `core/motion.js` measures the current tab and sets `--x-ind-left` and
`--x-ind-right`. The leading edge moves on `--x-spring` (85% of its duration), the trailing edge on
`--x-spring-soft` (110%); at an end tab the leading edge eases into place on `--x-ease` (`data-settle`). First
placement and resizes snap. Reduced motion: instant.

## Component tokens

`--x-tabs-line-height` (40px), `--x-tabs-line-gap` (24px), `--x-tabs-line-thick` (3px) and `--x-tabs-line-color`
(`--x-accent`).

## Invariants

- Wider than its place, the row scrolls sideways and never shows a scrollbar: a mouse drags it like a finger,
  a drag never selects, and a shade (`--x-scroll-shade`) marks each side with hidden tabs (`scrollStrip` in
  `core/motion.js`).
- One line per row; it travels, it never fades out at one tab and in at another.
- The line is exactly as wide as the current tab's content, and lies on the hairline.
- State is `aria-current`; the controller reads it and never invents it.
- Labels are one or two words, never wrapped.

## Safe edits

- The tabs, their icons and counts.
- `full` width for a few tabs over a panel.
- The line's color, through `--x-tabs-line-color`.

## Checklist

- [ ] Too narrow: no scrollbar; a mouse drags the row without selecting; a shade marks each side with hidden tabs
- [ ] The line lands exactly under the tab after resizing and font loading
- [ ] Far jumps stretch and settle; moving back does the same in reverse
- [ ] A row that scrolls keeps the line under its tab, and brings the new current tab into view
- [ ] Without JS the current tab is still underlined; reduced motion: no slide
- [ ] Both themes
