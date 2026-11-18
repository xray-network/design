---
id: stats-grid
name: Stats grid
summary: Headline figures in a framed grid of cells with hairline dividers; a cell can split its total in a bar with a legend.
motion: 0
requires: [tokens]
components: [skeleton]
files: [stats-grid.css, stats-grid.html, stats-grid.tsx]
---

# Stats grid

The overview at the top of a dashboard: revenue, payouts and fees, requests and traffic, each in its own cell
of one framed grid (after the overview on XRAY Graph). A cell can show how its total splits, as a bar with a
legend of values and shares. For figures inside a card or a row, use Stats.

## Platform contract

Native GUI implementations lay the cells out in a grid with hairline dividers inside one rounded frame,
collapse to one column on narrow widths, and give the split bar an accessible description listing each part and
its share.

## Anatomy

```
div.x-stats-grid                                    hairline frame, 20px radius, --x-bg-panel; container
└── dl.x-stats-grid-list[style=--x-stats-grid-columns]   N columns (3 by default); 1 column under 560px
    └── div.x-stats-grid-cell                       20px padding, hairline right and bottom
        ├── dt.x-stats-grid-label                   12px, --x-fg-3
        ├── dd.x-stats-grid-value                   18/700, --x-fg-1, tabular digits
        ├── dd.x-stats-grid-sub (optional)          11px, --x-fg-3, one line (truncated): period · detail
        └── dd.x-stats-grid-split (optional)        16px above
            ├── div.x-stats-grid-bar[role=img][aria-label]   8px pill, --x-bg-chip track
            │   └── span.x-stats-grid-segment[data-tone][style=width]
            └── dl.x-stats-grid-legend              12px above, rows 8px apart, 11px
                └── div.x-stats-grid-row
                    ├── dt  span.x-stats-grid-dot[data-tone] + label (--x-fg-3)
                    └── dd  value (500, --x-fg-1) span.x-stats-grid-share (--x-fg-3)
```

## Variants

| Attribute | Values |
|---|---|
| `--x-stats-grid-columns` | any count; default 3 |
| `data-tone` (segment, dot) | `success` (default for the first part), `accent` (second), `warning`, `danger`, `neutral` |

## Loading

React `loading` (`aria-busy`): labels and legend names stay; one-line bars of varied widths stand in for values, notes and legend values, and split bars show only their track.

## Accessibility

- A description list: each cell's label is a `dt`, its value and notes are `dd`.
- The bar is `role="img"` with an `aria-label` naming every part and its share; the legend repeats it as text.
- Shares are written out (`98.1%`), never color alone.

## Motion

None.

## Component tokens

`--x-stats-grid-columns`.

## Invariants

- One frame; cells are divided by hairlines, never separate cards.
- Segment widths are the parts' shares of the total; with no total the bar shows only its track.

## Safe edits

- Two, four or more columns; cells without a split.
- More than two parts in a split.

## Checklist

- [ ] Values use tabular digits and fit at the narrowest column
- [ ] The bar has a label with every part; the legend matches it
- [ ] One column on phones; both themes
