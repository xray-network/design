---
id: scatter-chart
name: ScatterChart
summary: Points placed by two measures, to see whether one rises with the other and which points stand apart.
motion: 0
requires: [tokens, chart]
components: []
files: [scatter-chart.css, scatter-chart.html, scatter-chart.controller.js, scatter-chart.controller.d.ts, scatter-chart.tsx]
---

# ScatterChart

For a relationship: order size against delivery time, spend against revenue per customer, latency against load.
Every row is one point. The shape of the cloud is the message, and the points off on their own are the questions.
For one measure over time, use LineChart.

## Anatomy

```
figure.x-chart.x-scatter-chart[data-height][data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: a name per point, then two columns: along the bottom, up the side
└── div.x-chart-plot[tabindex=0]
    ├── svg.x-chart-svg[data-active]    grid and ticks; text.x-scatter-chart-axis (the two measures, named); circle.x-scatter-chart-dot[data-active]
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
- Two numeric axes, both named on the plot: the column headers are the names.
- One color. Dots are 4px in radius with a ring in the surface color, so they stay apart where they overlap.
- The readout goes to the nearest point: a dot never has to be hit exactly.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The surface color behind the marks, to match a card or a panel.

## Checklist

- [ ] Each point sits at its two values; both axes are named
- [ ] The readout follows the nearest point, and the arrow keys walk the points left to right
- [ ] Both themes; phone width; the table view shows the same data
