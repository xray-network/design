---
id: card
name: Card
summary: Object card (one action plus an optional menu) and the gray tile with the object's initial.
motion: 0
requires: [tokens]
components: [button, skeleton]
files: [card.css, card.html, card.tsx]
---

# Card

Cards present repeated objects of one kind: apps, accounts, plans. They are not for grouping
a page into sections (DESIGN-PROTOCOL.md section 4). A tile is the object's identity mark.

## Anatomy

```
div.x-card-grid                         auto-fill columns, 288px minimum, 12px gaps
└── article.x-card                      16px radius, panel surface, hairline
    ├── button|a.x-card-main            the whole card is one action; 16px padding
    │   ├── span.x-tile                 48px, 14px radius, gray chip surface, the object's initial
    │   └── span.x-card-text
    │       ├── .x-card-title           15/700, one line
    │       ├── .x-card-description     13px, always two lines tall (clamped)
    │       └── .x-card-meta            11px mono: id or path
    └── span.x-card-menu                28px icon button, top right
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `.x-tile` `data-size` | `lg` 64px, `md` 36px, `xs` 20px | 48px |

A tile holds one letter, the object's initial, in gray. No icons and no brand colors: the name beside it carries the identity.

## States

| State | Source | Look |
|---|---|---|
| hover | `.x-card:hover` | hairline to `--x-border-hover` |
| focus | `.x-card-main:focus-visible` | global focus ring around the card |

## Loading

React `loading` (`aria-busy`): a tile-shaped Skeleton in place of the lead, and bars of varied widths in place of the title, the description (two lines, as clamped) and the meta.

## Accessibility

- One primary action per card (`.x-card-main`, a button or a link) with an `aria-label` that names it ("Open Payments").
- The menu button is a sibling of the main action, not a child, and has its own label.
- Tiles are decorative (`aria-hidden`); the name is always in the title.

## Motion

Tier 0. Only the border color changes, on `--x-duration-base`. Cards do not lift or scale.

## Component tokens

`--x-card-pad`, `--x-card-radius`; `--x-tile-size`, `-radius`, `-font-size`.

## Invariants

- Flat: panel surface and hairline, no shadow, no hover lift.
- The tile is gray (`--x-bg-chip` with `--x-fg-2` text) and holds a letter, never an icon or a color.
- Title one line, description two lines; longer text is cut, not wrapped further.

## Safe edits

- Another lead visual (an Avatar) or none.
- A footer row inside `.x-card-text` (a Tag, a Numeral).
- Different column minimum through `grid-template-columns` on the grid.

## Checklist

- [ ] Whole card is clickable; the menu button still works and is reachable by keyboard
- [ ] Long titles truncate; long descriptions clamp to two lines
- [ ] Both themes: tiles stay gray and readable
