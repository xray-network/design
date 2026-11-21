---
id: share-bar
name: ShareBar
summary: The parts of one whole as a single thin bar, each part as wide as its share, named in the legend.
motion: 0
requires: [tokens, chart]
components: []
files: [share-bar.css, share-bar.html, share-bar.controller.js, share-bar.controller.d.ts, share-bar.tsx]
---

# ShareBar

For composition where space is short: a portfolio split in a card, storage by type in a row, a budget by
category. It says the same as a donut in a tenth of the height. Past five parts the rest fold into Other. To
compare the parts of several wholes side by side, use StackedBarChart.

## Anatomy

```
figure.x-chart.x-share-bar[data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: parts, then one column of amounts
├── ul.x-chart-legend                   every part with its share; each entry switches its part off and on
└── div.x-chart-plot
    ├── svg.x-chart-svg[data-active]    rect.x-share-bar-part[data-active], one per part
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
- Every value the readout shows is in the table.
- Name the figure with its title (`figcaption`), or `aria-label`.

## Motion

Tier 0. Nothing draws in and nothing animates when the data changes (protocol section 16). The readout fades in and glides from mark to mark; the marks around the one being read dim, on `--x-ease`. Reduced motion: instant.

## Component tokens

`--x-chart-surface` (the color behind the marks) and the chart colors, from the tokens.

## Invariants

- Web: one controller draws the plot for HTML and React, from the data table; React renders the table from `data`.
- One whole: parts are never negative. Six parts at most; the rest are summed into Other, in the muted color.
- The bar is 10px thick; parts are 2px apart, in the surface color.
- The legend carries the names and shares; a part switched off there leaves the whole, and the shares are of what is left.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The surface color behind the marks, to match a card or a panel.

## Checklist

- [ ] Widths match the shares; a seventh part appears as Other
- [ ] A legend entry switches its part off and the others fill the bar
- [ ] Both themes; phone width; the table view shows the same data
