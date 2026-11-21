---
id: media-grid
name: MediaGrid
summary: A tight grid of square pictures, each one a way into its post, with a small mark on videos and sets.
motion: 0
requires: [tokens]
components: []
files: [media-grid.css, media-grid.html, media-grid.tsx]
---

# MediaGrid

Pictures first, nothing else: an explore page, the posts of a profile, a gallery. Every cell is square and two
pixels from its neighbors; one cell in a while may be tall, to break the rhythm. A small mark in the corner says a
cell is a video or a set.

The app supplies the pictures and where each one leads.

## Anatomy

```
ul.x-media-grid[aria-label]                   3 columns; --x-media-grid-columns changes that
└── li.x-media-grid-cell[data-span="tall"]    square; tall takes two rows
    └── a.x-media-grid-item[aria-label]       or a button
        ├── img                               the first child fills the cell (img, video, svg, the app's art)
        └── span.x-media-grid-mark            optional; an svg.x-icon in the corner
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-span` on a cell | `tall`: two rows high | square |
| `--x-media-grid-columns` | a number | 3 |

## States

| State | Source | Look |
|---|---|---|
| hover | the pointer is over a cell | the picture dims a little |

## Accessibility

- A list with a name; every item is a link or a button named for what its picture shows.
- The picture itself has an empty `alt`: the item's name already says it.
- The corner mark is decorative; say "video" or "4 pictures" in the item's name.

## Motion

Tier 0. None.

## Component tokens

`--x-media-grid-columns` (3) and `--x-media-grid-gap` (2px).

## Invariants

- Cells are square, 2px apart, with no radius and no captions.
- A tall cell is an accent: one in six at most.
- No text over the pictures except the corner mark.

## Safe edits

- The number of columns (2 on a narrow card, 4 on a desktop page).
- A radius on the grid's outer corners, by clipping its container.

## Checklist

- [ ] The grid has no gaps after a tall cell
- [ ] Every picture is named; the mark's meaning is in the name
- [ ] Both themes; 320px wide
