---
id: top-bar
name: TopBar
summary: The header of a desktop app, with the brand, the main sections as tabs with a sliding pill, and the account at the end.
motion: 1
requires: [tokens, motion]
components: []
patterns: [liquid-indicator]
files: [top-bar.css, top-bar.html, top-bar.tsx]
---

# TopBar

The top of a console or a dashboard: who made it, where you can go, and whose account this is. The sections are
tabs with a pill that slides between them (the LiquidIndicator
pattern), without a track, so the bar stays quiet.

The app supplies the sections and what the current one is.

## Anatomy

```
header.x-top-bar
├── a.x-top-bar-brand                         or a span, when it is not a link
├── nav.x-liquid-indicator.x-top-bar-nav[aria-label]
│   ├── a.x-liquid-indicator-item[aria-current="page"]    svg.x-icon + span (label)
│   └── span.x-liquid-indicator-pill[aria-hidden]
└── div.x-top-bar-end                         optional: icon buttons, the account's Avatar
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| narrow | the tabs do not fit between the brand and the end | they scroll sideways, labels and all |

## Accessibility

- A `header` with a named `nav`; the current section has `aria-current="page"`.
- In a narrow bar the tabs scroll sideways; every tab keeps its visible label.
- The account control at the end needs its own name when it is a button.

## Motion

Tier 1, from LiquidIndicator: the pill slides to the current section. Reduced motion: it moves at once.

## Component tokens

None.

## Invariants

- Two to six sections, every one with an icon.
- One row, 56px: it never wraps.
- A hairline under it, no shadow.

## Safe edits

- The brand, the sections and what sits at the end.
- A search field or an environment Select at the end.

## Checklist

- [ ] The pill follows the current section
- [ ] On a phone the tabs scroll sideways and nothing is cut off at the end
- [ ] Both themes
