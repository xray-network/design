---
id: card
name: Card and Tile
summary: Object card (one action plus an optional menu) and the dark identity tile with a color strip.
motion: 0
requires: [tokens]
components: [button]
files: [card.css, card.html, card.tsx]
---

# Card and Tile

Cards present repeated objects of one kind: mini apps, accounts, pools. They are not for grouping
a page into sections (RULES.md section 4). A tile is the object's identity mark.

## Anatomy

```
div.x-card-grid                         auto-fill columns, 288px minimum, 12px gaps
└── article.x-card                      16px radius, panel surface, hairline
    ├── button|a.x-card-main            the whole card is one action; 16px padding
    │   ├── span.x-tile                 48px, 14px radius, ink surface, 5px color strip
    │   └── span.x-card-text
    │       ├── .x-card-title           15/700, one line
    │       ├── .x-card-description     13px, two lines at most
    │       └── .x-card-meta            11px mono: id or path
    └── span.x-card-menu                28px icon button, top right
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `.x-tile` `data-size` | `lg` 64px, `md` 36px, `xs` 20px | 48px |
| `.x-tile` `--x-tile-strip` | any token | `--x-accent` |

A tile holds an outline icon or one serif letter.

## States

| State | Source | Look |
|---|---|---|
| hover | `.x-card:hover` | hairline to `--x-border-hover` |
| focus | `.x-card-main:focus-visible` | global focus ring around the card |

## Accessibility

- One primary action per card (`.x-card-main`, a button or a link) with an `aria-label` that names it ("Open Wallet").
- The menu button is a sibling of the main action, not a child, and has its own label.
- Tiles are decorative (`aria-hidden`); the name is always in the title.

## Motion

Tier 0. Only the border color changes, on `--x-duration-base`. Cards do not lift or scale.

## Component tokens

`--x-card-pad`, `--x-card-radius`; `--x-tile-size`, `-radius`, `-strip`, `-strip-height`, `-icon`.

## Invariants

- Flat: panel surface and hairline, no shadow, no hover lift.
- The tile is the same dark surface (`--x-ink`) in both themes; only its strip carries color.
- Title one line, description two lines; longer text is cut, not wrapped further.

## Safe edits

- Another lead visual (an Avatar) or none.
- A footer row inside `.x-card-text` (a Tag, a Numeral).
- Different column minimum through `grid-template-columns` on the grid.

## Checklist

- [ ] Whole card is clickable; the menu button still works and is reachable by keyboard
- [ ] Long titles truncate; long descriptions clamp to two lines
- [ ] Both themes: the tile looks the same, the card surface changes
