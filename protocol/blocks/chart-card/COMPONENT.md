---
id: chart-card
name: ChartCard
summary: One figure and its chart on a panel, with the headline number, how it changed, and a switch for the period.
motion: 0
requires: [tokens]
components: [tag, skeleton, segmented]
charts: [line-chart, sparkline]
files: [chart-card.css, chart-card.html, chart-card.tsx]
---

# ChartCard

The unit a dashboard is made of: one measure, its number for the period in large type, how that compares with the
period before, and the chart that shows its shape. The period switch belongs to the card, so every card can be
read alone.

The app supplies the number, the change and the chart (any of the kit's charts).

## Anatomy

```
section.x-chart-card[aria-labelledby][aria-busy]
├── header.x-chart-card-head
│   ├── h3.x-chart-card-title                 what is measured; quiet
│   └── div.x-chart-card-controls             optional; a small Segmented or a Select
├── div.x-chart-card-figure
│   ├── span.x-chart-card-value               the headline number
│   ├── span.x-delta[data-trend]              optional
│   └── span.x-chart-card-note                optional; what the change is compared with
└── div.x-chart-card-plot                     the chart
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| loading | `aria-busy="true"` | skeletons for the number and the chart, at the chart's height |

## Accessibility

- A `section` named by its title.
- The change is written with its sign; the color repeats it.
- The chart inside keeps its own data table, so the card is readable without the plot.

## Motion

Tier 0. None of its own; the chart's readout moves as the chart defines.

## Component tokens

`--x-chart-surface` is set to the panel's color for the chart inside.

## Invariants

- One measure per card. Two measures are two cards.
- The headline number is the same quantity the chart plots, for the same period.
- The chart has no title of its own: the card's title is its name.
- Loading keeps the card's height.

## Safe edits

- The chart: any kit chart fits.
- A Menu at the end of the head for export or full screen.

## Checklist

- [ ] Switching the period changes the number, the change and the chart together
- [ ] Loading does not move the cards around it
- [ ] Both themes; the chart's gaps take the panel's color
