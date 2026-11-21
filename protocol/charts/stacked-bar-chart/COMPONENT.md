---
id: stacked-bar-chart
name: StackedBarChart
summary: Totals compared across categories, each column split into the series that make it up.
motion: 0
requires: [tokens, chart]
components: []
files: [stacked-bar-chart.css, stacked-bar-chart.html, stacked-bar-chart.controller.js, stacked-bar-chart.controller.d.ts, stacked-bar-chart.tsx]
---

# StackedBarChart

For a total and its makeup at once: volume by payment method per month, requests by status per day. The height
of a column is the total; its parts show the mix. Only the bottom series sits on a common baseline, so put the
one that matters most there. To compare the series themselves, use BarChart, which sets them side by side.

## Anatomy

```
figure.x-chart.x-stacked-bar-chart[data-height][data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: categories, then one column per series
├── ul.x-chart-legend                   each entry switches its series off and on
└── div.x-chart-plot[tabindex=0]
    ├── svg.x-chart-svg[data-active]    grid and ticks; rect.x-stacked-bar-chart-band; g.x-stacked-bar-chart-stack[data-active] › path.x-stacked-bar-chart-part
    └── div.x-chart-tip                 the readout: every part, then the total
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
- A stack is 12px thick at most; its parts are 2px apart, and only its top is round.
- Series stack in the table's order, the first at the bottom. Six series at most, in the kit's color order.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The surface color behind the marks, to match a card or a panel.

## Checklist

- [ ] The readout lists every part of a column and their total
- [ ] A legend entry takes its series out of every stack, and the axis refits
- [ ] Both themes; phone width; the table view shows the same data
