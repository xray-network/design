---
id: funnel-chart
name: FunnelChart
summary: The steps of one path, each a bar as wide as its share of the first, with how many came through from the step before.
motion: 0
requires: [tokens, chart]
components: []
files: [funnel-chart.css, funnel-chart.html, funnel-chart.controller.js, funnel-chart.controller.d.ts, funnel-chart.tsx]
---

# FunnelChart

For a sequence people drop out of: checkout, sign-up, onboarding. Each step is a centered bar, narrower than the
one above by what was lost, with its count and the share of the previous step that reached it. The steps are in
the order they happen. For amounts that are not steps of one path, use BarList.

## Anatomy

```
figure.x-chart.x-funnel-chart[data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: steps in order, then one column of counts
└── ol.x-chart-plot.x-funnel-chart-steps[aria-hidden]
    └── li.x-funnel-chart-step          span.x-funnel-chart-name, span.x-funnel-chart-track › span.x-funnel-chart-bar, span.x-funnel-chart-value, span.x-funnel-chart-rate
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

## Accessibility

- The data table is always in the document: it is what assistive technology reads, and `data-view="table"` shows
  it to everyone in place of the plot.
- Every value is written on the chart and is in the table.
- Name the figure with its title (`figcaption`), or `aria-label`.

## Motion

Tier 0. Nothing draws in and nothing animates when the data changes (protocol section 16). None.

## Component tokens

`--x-chart-surface` (the color behind the marks) and the chart colors, from the tokens.

## Invariants

- Web: one controller draws the plot for HTML and React, from the data table; React renders the table from `data`.
- One series, in the order the steps happen. The first step is the whole.
- Each step shows its count and the share of the step before it; the first shows no share.
- Bars are centered, so the narrowing reads from both sides.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The surface color behind the marks, to match a card or a panel.

## Checklist

- [ ] Each bar is as wide as its share of the first step
- [ ] The share beside a step is of the step before it, not of the first
- [ ] Both themes; phone width; the table view shows the same data
