---
id: depth-chart
name: DepthChart
summary: An order book as two stepped areas, bids on one side and asks on the other, with the spread between them.
motion: 0
requires: [tokens, chart]
components: []
files: [depth-chart.css, depth-chart.html, depth-chart.controller.js, depth-chart.controller.d.ts, depth-chart.tsx]
---

# DepthChart

For a market's order book: how much is waiting to be bought below the price and sold above it. The bids rise to
the left of the middle and the asks to the right; a tall wall is a large order, and the gap between the two
sides is the spread. It belongs beside a CandlestickChart, on a trading screen.

## Anatomy

```
figure.x-chart.x-depth-chart[data-height][data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: prices low to high, then bids and asks (total size at that price; 0 where a side has none)
├── ul.x-chart-legend                   Bids and Asks; each entry switches its side off and on
└── div.x-chart-plot[tabindex=0]
    ├── svg.x-chart-svg                 grid and ticks; g.x-depth-chart-side[data-side=bids|asks] › path.x-depth-chart-area, path.x-depth-chart-line; line.x-chart-cursor
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
- Prices run low to high. Sizes are running totals: bids grow toward lower prices, asks toward higher.
- Steps, not slopes: depth changes at a price, not between prices.
- Green and red mean the two sides here; the legend and the readout name them.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The surface color behind the marks, to match a card or a panel.

## Checklist

- [ ] Bids step up toward the left, asks toward the right, with a gap at the spread
- [ ] The readout names the side as well as the size
- [ ] Both themes; phone width; the table view shows the same data
