---
id: candlestick-chart
name: CandlestickChart
summary: A price over periods, each period a candle that shows where it opened and closed and how far it ranged.
motion: 0
requires: [tokens, chart]
components: []
files: [candlestick-chart.css, candlestick-chart.html, candlestick-chart.controller.js, candlestick-chart.controller.d.ts, candlestick-chart.tsx]
---

# CandlestickChart

For a traded price: a token over a day, a pair over a month. Each period is one candle: a thin wick from its low
to its high, and a body from its open to its close, green when it closed higher and red when it closed lower.
For a price where only the level matters, a LineChart is calmer.

## Anatomy

```
figure.x-chart.x-candlestick-chart[data-height][data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: periods, then open, high, low, close, in that order
└── div.x-chart-plot[tabindex=0]
    ├── svg.x-chart-svg                 grid and ticks; rect.x-candlestick-chart-band; g.x-candlestick-chart-candle[data-trend=up|down] › line.x-candlestick-chart-wick, rect.x-candlestick-chart-body
    └── div.x-chart-tip                 the readout: open, high, low, close and the change
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
- Four columns after the period, in this order: open, high, low, close.
- Green and red mean direction here, as everywhere in the kit; the readout says Up or Down in words.
- The axis fits the prices: a price is a level, not an amount, so it does not start at zero.
- A body is 8px wide at most; a period that closed where it opened shows a hairline.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The surface color behind the marks, to match a card or a panel.

## Checklist

- [ ] A candle is green when its close is above its open, and its wick spans low to high
- [ ] The readout names the direction as well as coloring it
- [ ] Both themes; phone width; the table view shows the same data
