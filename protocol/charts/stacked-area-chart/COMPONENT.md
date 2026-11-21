---
id: stacked-area-chart
name: StackedAreaChart
summary: A total over time as bands laid on each other, one per series, so the top edge is the total.
motion: 0
requires: [tokens, chart]
components: []
files: [stacked-area-chart.css, stacked-area-chart.html, stacked-area-chart.controller.js, stacked-area-chart.controller.d.ts, stacked-area-chart.tsx]
---

# StackedAreaChart

For how a total and its makeup move together: balance by account over a year, traffic by region over a day. The
top edge is the total; each band's thickness is its series. Only the bottom band has a flat base, so thin bands
high in the stack are hard to judge: for the series themselves, use LineChart.

## Anatomy

```
figure.x-chart.x-stacked-area-chart[data-height][data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: an ordered scale, then one column per series
├── ul.x-chart-legend                   each entry switches its series off and on
└── div.x-chart-plot[tabindex=0]
    ├── svg.x-chart-svg                 grid and ticks; g.x-stacked-area-chart-series › path.x-stacked-area-chart-band, path.x-stacked-area-chart-line; line.x-chart-cursor
    └── div.x-chart-tip                 the readout: every series, then the total
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
- Amounts only: nothing below zero. The axis starts at zero.
- A band is a wash of its series color under a 2px line on its upper edge.
- Series stack in the table's order, the first at the bottom. Six series at most.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The surface color behind the marks, to match a card or a panel.

## Checklist

- [ ] The top edge equals the total in the readout at every category
- [ ] A legend entry takes its band out and the others settle onto each other
- [ ] Both themes; phone width; the table view shows the same data
