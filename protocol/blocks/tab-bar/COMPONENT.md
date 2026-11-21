---
id: tab-bar
name: TabBar
summary: The floating bar at the foot of a phone screen, with one tab per main section and a pill that slides to the current one.
motion: 1
requires: [tokens, motion]
components: []
patterns: [liquid-indicator]
files: [tab-bar.css, tab-bar.html, tab-bar.tsx]
---

# TabBar

The main navigation of a phone app: three to five sections, always in reach of the thumb. The bar floats a little
in from the edges, the screen scrolls on under it, and the pill slides to the tab in view (the
LiquidIndicator pattern).

The app supplies the tabs and what the current one is. A screen that is not a tab (a conversation, a detail)
hides the bar.

## Anatomy

```
footer.x-tab-bar                              absolute, at the foot of its positioned frame
└── nav.x-liquid-indicator[data-width="full"][data-layout="stack"][aria-label]
    ├── a.x-liquid-indicator-item[aria-current="page"]    svg.x-icon + span (label)
    └── span.x-liquid-indicator-pill[aria-hidden]
```

## Variants and sizes

None.

## States

None.

## Accessibility

- A `nav` with a name; the current tab has `aria-current="page"`.
- Every tab has a text label under its icon, never an icon alone.
- The bar respects the bottom safe area.

## Motion

Tier 1, from LiquidIndicator: the pill slides and stretches to the current tab. Reduced motion: it moves at once.

## Component tokens

`--x-tab-bar-inset` (the gap under the bar, at least the safe area) and `--x-tab-bar-surface` (the color the screen fades into behind the bar; the screen's background).

## Invariants

- Three to five tabs. More sections go behind a More tab or into a menu.
- One bar per screen frame, and the frame is positioned.
- The scrolling content ends with room for the bar (96px), so its last rows can be scrolled clear.

## Safe edits

- The tabs, their icons and their order.
- `--x-tab-bar-surface`, to match a screen that is not on the page background.

## Checklist

- [ ] The pill follows the current tab, also after the browser's back button
- [ ] The last rows of a long screen scroll clear of the bar
- [ ] Both themes; a 320px-wide screen
