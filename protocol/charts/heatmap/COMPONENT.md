---
id: heatmap
name: Heatmap
summary: Amounts across two dimensions as a grid of cells, lighter for less and stronger for more.
motion: 0
requires: [tokens, chart]
components: []
files: [heatmap.css, heatmap.html, heatmap.controller.js, heatmap.controller.d.ts, heatmap.tsx]
---

# Heatmap

For where amounts gather: payments by weekday and hour, sign-ups by week and channel, errors by service and day.
The eye finds the strong cells at once. Strength is hard to read exactly, so the readout and the table carry the
numbers. For one dimension, use BarChart.

## Anatomy

```
figure.x-chart.x-heatmap[data-cell][data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: rows down the side, one column per column of the grid
└── div.x-chart-plot[tabindex=0]
    ├── svg.x-chart-svg                 text.x-chart-tick (row and column names); rect.x-heatmap-cell[data-active], one per value
    └── div.x-chart-tip                 the readout
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-view` | `table`: the data table in place of the plot | the plot |

## States

| State | Source | Look |
|---|---|---|
| before JavaScript | no `data-drawn` | the data table shows |
| drawn | `data-drawn` | the plot; the table is kept for assistive technology |
| reading | pointer over the plot, or arrow keys | the readout, on the nearest mark |

## Accessibility

- The data table is always in the document: it is what assistive technology reads, and `data-view="table"` shows
  it to everyone in place of the plot.
- The plot takes the focus (`tabindex="0"`): arrow keys move the readout, Esc hides it.
- Every value the readout shows is in the table.
- Name the figure with its title (`figcaption`), or `aria-label`.

## Motion

Tier 0. Nothing draws in and nothing animates when the data changes (protocol section 16). The readout fades in and glides from mark to mark; the marks around the one being read dim, on `--x-ease`. Reduced motion: instant.

## Component tokens

`--x-chart-surface` (the color behind the marks) and the chart colors, from the tokens.

## Invariants

- Web: one controller draws the plot for HTML and React, from the data table; React renders the table from `data`.
- One color, from a faint tint for the least to the full color for the most. Never a rainbow.
- Cells are 24px tall (`data-cell`) and 2px apart; they share the width evenly.
- The arrow keys move a cell at a time, in both directions.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The surface color behind the marks, to match a card or a panel.

## Checklist

- [ ] The strongest cell holds the largest value and the faintest the smallest
- [ ] Arrow keys reach every cell; the readout names its row and column
- [ ] Both themes; phone width; the table view shows the same data
