---
id: treemap
name: Treemap
summary: The parts of one whole as rectangles that fill a box, each as large as its value, for more parts than a donut can hold.
motion: 0
requires: [tokens, chart]
components: []
files: [treemap.css, treemap.html, treemap.controller.js, treemap.controller.d.ts, treemap.tsx]
---

# Treemap

For composition with many parts of very different sizes: a portfolio of twenty holdings, storage by folder,
spend by merchant. Area carries the value, so the few large parts and the long tail both show. For six parts or
fewer a DonutChart or a ShareBar reads faster.

With a second column of moves (a day's price change, growth on last month) it is a market map: size is the
amount, color is the direction of the move, and its strength the size of the move.

## Anatomy

```
figure.x-chart.x-treemap[data-height][data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: parts, a column of amounts, and optionally a column of moves
└── div.x-chart-plot[tabindex=0]
    ├── svg.x-chart-svg[data-active]    g.x-treemap-tile[data-active][data-strong][data-trend] › rect.x-treemap-fill, text.x-treemap-name, text.x-treemap-share
    └── div.x-chart-tip                 the readout
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-view` | `table`: the data table in place of the plot | the plot |
| `data-height` | the plot's height in px | the chart's own |

## States

| State | Source | Look |
|---|---|---|
| before JavaScript | no `data-drawn` | the data table shows |
| drawn | `data-drawn` | the plot; the table is kept for assistive technology |
| reading | pointer over the plot, or arrow keys | the readout, on the nearest mark |
| moved | `data-trend="up"`, `"down"` or `"flat"` on a tile, from the second column | the up color, the down color or grey, stronger for a larger move |

## Accessibility

- The data table is always in the document: it is what assistive technology reads, and `data-view="table"` shows
  it to everyone in place of the plot.
- The plot takes the focus (`tabindex="0"`): arrow keys move the readout, Esc hides it.
- Every value the readout shows is in the table.
- Name the figure with its title (`figcaption`), or `aria-label`.

## Motion

Tier 0. Nothing draws in and nothing animates when the data changes (protocol section 16). The readout fades in and glides from mark to mark; the marks around the one being read dim, on `--x-ease`. Reduced motion: instant.

## Component tokens

`--x-treemap-color` (the one color, the first chart color), `--x-treemap-up` and `--x-treemap-down` (the colors of
a rise and a fall, the success and danger colors), and `--x-chart-surface` (the color behind the marks).

## Invariants

- Web: one controller draws the plot for HTML and React, from the data table; React renders the table from `data`.
- One whole: parts are never negative. Largest first, laid out as near to square as the values allow.
- One color, stronger for larger parts: there are more parts than colors, so identity is the name, not the hue.
- With a column of moves, color is the direction and nothing else: up, down, or grey for no move, stronger for a
  larger move and never the full color, so the text on a tile keeps the text color. The tile and the readout
  write the move as the table does (`+1.8%`): the sign is in the text, never in the color alone.
- A part is named inside it only where the name fits with room to spare; the readout and the table name every part.
- Tiles are 2px apart, in the surface color.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The surface color behind the marks, to match a card or a panel.

## Checklist

- [ ] Areas match the values; the largest tile is first, at the top left
- [ ] No name is cut or runs out of its tile; small tiles are named in the readout
- [ ] With moves: a rise and a fall differ by their written sign as well as their color
- [ ] Both themes; phone width; the table view shows the same data
