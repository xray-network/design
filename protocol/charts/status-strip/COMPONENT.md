---
id: status-strip
name: StatusStrip
summary: A row of thin bars, one per period, colored by the state of a service in that period.
motion: 0
requires: [tokens, chart]
components: []
files: [status-strip.css, status-strip.html, status-strip.controller.js, status-strip.controller.d.ts, status-strip.tsx]
---

# StatusStrip

For history at a glance: ninety days of uptime, a week of nightly jobs, the last builds. Each period is one bar,
in the color of its state; a bad day stands out of a run of good ones. It shows states, not amounts: for how
slow or how many, use LineChart or BarChart.

## Anatomy

```
figure.x-chart.x-status-strip[data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: periods in order, then one column of states, in words
└── div.x-chart-plot
    ├── svg.x-chart-svg                 rect.x-status-strip-bar[data-state][data-active], one per period
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
- A cell is a word: ok, degraded or down (up, operational, slow and outage are read too). Anything else is no data.
- State is never told by color alone: the readout and the table say it in words.
- Periods are in time order, oldest first. Bars are 2px apart.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The surface color behind the marks, to match a card or a panel.

## Checklist

- [ ] Every bar's color matches its word in the table; an empty cell is a muted bar
- [ ] Pointing at a bar says its period and its state
- [ ] Both themes; phone width; the table view shows the same data
