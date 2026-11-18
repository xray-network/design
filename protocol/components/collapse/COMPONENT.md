---
id: collapse
name: Collapse
summary: Sections that open and close in place (accordion); content renders on first open unless forced.
motion: 0
requires: [tokens]
components: []
files: [collapse.css, collapse.html, collapse.controller.js, collapse.controller.d.ts, collapse.tsx]
---

# Collapse

Long or secondary content behind a header: FAQ answers, advanced settings, transaction details. Each item
opens in place. As an accordion, opening one closes the others. Hidden content is not rendered until it
first opens, which keeps heavy sections (charts, lists) cheap; `forceMount` renders it up front.

## Platform contract

Native GUI implementations use the platform's disclosure group or expandable list rows, keep the header a
single focusable control that announces expanded/collapsed, and render content lazily the same way.

## Anatomy

```
div.x-collapse[data-variant]                    one frame with hairline dividers (default)
└── details.x-collapse-item[name][open]         name: accordion (one open at a time)
    ├── summary.x-collapse-header               48px row: title, optional extra, chevron
    │   ├── span.x-collapse-title               14/600, --x-fg-1
    │   ├── span.x-collapse-extra (optional)    13px, --x-fg-3, right-aligned
    │   └── svg.x-collapse-chevron              16px, turns when open
    └── div.x-collapse-content                  16px padding; [template data-lazy] until first open (HTML)
```

## Variants

| Attribute | Values |
|---|---|
| `.x-collapse` `data-variant` | `ghost`: no frame, dividers only |
| `details` `name` | the same name on every item: an accordion |

## States

| State | Source | Look |
|---|---|---|
| open | `details[open]` | chevron turned, content shown (height animates where supported) |
| hover | `summary:hover` | chevron darkens to `--x-fg-1`; no fill |
| focus | `summary:focus-visible` | 2px inset ring |

## Accessibility

- `details`/`summary`: the header is a button that announces expanded or collapsed; Enter and Space toggle.
- Content that is not rendered yet is still announced as collapsed; nothing is lost for screen readers.

## Motion

Height and opacity on `--x-duration-base` with `--x-ease` where `::details-content` and
`interpolate-size` are supported; instant elsewhere and when motion is reduced. Chevron turns on `--x-duration-fast`.

## Component tokens

`--x-collapse-radius`, `--x-collapse-header-height`.

## Invariants

- Native `details`/`summary` (web): no ARIA re-implementation.
- Lazy by default: content renders on first open and stays rendered after closing.

## Safe edits

- An icon before the title; a Tag or count as the extra.
- `forceMount` for content that must exist before opening (forms with validation, anchors, search in page).

## Checklist

- [ ] Opens and closes with mouse and keyboard; accordion closes the others
- [ ] Lazy content appears on first open; forced content is present while closed
- [ ] Both themes
