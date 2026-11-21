---
id: line-chart
name: LineChart
summary: A value over time or along any ordered scale, one line per series, with a crosshair that reads every series at once.
motion: 0
requires: [tokens, chart]
components: []
files: [line-chart.css, line-chart.html, line-chart.controller.js, line-chart.controller.d.ts, line-chart.tsx]
---

# LineChart

For change: revenue by month, a price over a day, sign-ups since launch. The slope is the message, so the axis
need not start at zero. With `data-area` the line gets a wash under it and a zero baseline, for amounts that add
up to something (volume, balance). For amounts compared across categories with no order, use BarChart.

## Anatomy

```
figure.x-chart.x-line-chart[data-area][data-height][data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: first column the categories, one more column per series
├── ul.x-chart-legend                   drawn for two or more series
└── div.x-chart-plot[tabindex=0]
    ├── svg.x-chart-svg
    │   ├── g.x-chart-grid, text.x-chart-tick     hairline gridlines, value ticks, category labels
    │   ├── g.x-line-chart-series                 per series: path.x-line-chart-area (optional), path.x-line-chart-line, circle.x-line-chart-dot at the end
    │   └── line.x-chart-cursor                   the crosshair
    └── div.x-chart-tip                 the readout
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-area` | present: a 10% wash under each line, and the axis starts at zero | lines only; the axis fits the data |
| `data-height` | the plot's height in px | 220 |
| `data-view` | `table`: the data table in place of the plot | the plot |

## States

| State | Source | Look |
|---|---|---|
| before JavaScript | no `data-drawn` | the data table shows |
| drawn | `data-drawn` | the plot; the table is kept for assistive technology |
| reading | pointer over the plot, or arrow keys | the readout, on the nearest mark |

## Accessibility

- The data table is always in the document: it is what assistive technology reads, and `data-view="table"` shows
  it to everyone in place of the plot. Every value the readout shows is in the table.
- The plot takes the focus (`tabindex="0"`): arrow keys move the readout along the categories, Home and End jump to the
  ends, Esc hides it.
- A series is never told by color alone: the legend names every series whenever there are two or more. Its
  entries are buttons (`aria-pressed`): pressed is on the chart; off is hollow, muted and struck through.
- Name the figure with its title (`figcaption`), or `aria-label`.

## Motion

Tier 0. Nothing draws in and nothing animates when the data changes: a chart is read, and data never animates
(protocol section 8). The readout is not data, and it moves: it fades in and grows from 96%, then glides from mark
to mark with the crosshair and its dots, on `--x-ease`. The marks around the one being read dim on the same curve. Reduced motion: instant.

## Component tokens

`--x-chart-surface` (the color behind the marks) and the series colors `--x-chart-1` to `-6`, from the tokens.

## Invariants

- Web: one controller draws the plot for HTML and React, from the data table; React renders the table from `data`.
- The table is the source of truth. Whatever the plot shows is in it.
- One value axis. Two measures on different scales are two charts.
- Six series at most, in the kit's fixed color order; a series keeps its color when others are filtered out.
- The readout lists every series at the crosshair: the pointer never has to land on a line.
- Marks: Lines are 2px with round joins. Each line ends in a dot with a ring in the surface color. An area is a 10% wash, never a block.
- A press on a legend entry takes its series off the chart, and the axis fits what is left; colors do not change.
- Text takes the text colors, never a series color.

## Safe edits

- The data, the height and the number format.
- The surface color behind the marks, to match a card or a panel.
- A title, or an aria-label when the chart sits under its own heading.

## Checklist

- [ ] The crosshair snaps to the nearest category and reads every series there, by pointer and by arrow keys
- [ ] Category labels never collide: they thin out as the chart narrows, keeping the first and the last
- [ ] Both themes; phone width; the table view shows the same numbers
