---
id: bar-chart
name: BarChart
summary: Amounts compared across categories, as columns from a zero baseline, grouped when there are several series.
motion: 0
requires: [tokens, chart]
components: []
files: [bar-chart.css, bar-chart.html, bar-chart.controller.js, bar-chart.controller.d.ts, bar-chart.tsx]
---

# BarChart

For comparison: payouts by month, customers by plan, volume by network. Length carries the value, so the axis
always includes zero. Several series sit side by side in each category. For change along an ordered scale where
the slope matters more than the amounts, use LineChart.

## Anatomy

```
figure.x-chart.x-bar-chart[data-height][data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: first column the categories, one more column per series
├── ul.x-chart-legend                   drawn for two or more series
└── div.x-chart-plot[tabindex=0]
    ├── svg.x-chart-svg[data-active]
    │   ├── g.x-chart-grid, text.x-chart-tick     hairline gridlines, value ticks, category labels
    │   ├── rect.x-bar-chart-band                 the soft band behind the category being read
    │   └── g.x-bar-chart-group[data-active]      per category: one path.x-bar-chart-bar per series
    └── div.x-chart-tip                 the readout
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
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
to mark with the band behind the category, on `--x-ease`. The marks around the one being read dim on the same curve. Reduced motion: instant.

## Component tokens

`--x-chart-surface` (the color behind the marks) and the series colors `--x-chart-1` to `-6`, from the tokens.

## Invariants

- Web: one controller draws the plot for HTML and React, from the data table; React renders the table from `data`.
- The table is the source of truth. Whatever the plot shows is in it.
- The axis includes zero. A bar that does not start at zero misstates its value.
- Six series at most, in the kit's fixed color order.
- A category's whole slot is its target, not only the painted bars; the one being read gets a soft band behind
  it and the others step back.
- A press on a legend entry takes its series off the chart; the others close up and keep their colors.
- Marks: A bar is slim: 10px thick at most, however wide its slot, with a fully round cap at its data end and its base
square on the baseline. The bars of one category are 3px apart. A negative value hangs below the zero line.
- Text takes the text colors, never a series color.

## Safe edits

- The data, the height and the number format.
- The surface color behind the marks, to match a card or a panel.
- A title, or an aria-label when the chart sits under its own heading.

## Checklist

- [ ] Pointing anywhere in a category's slot reads it: a band behind it, the others dimmed
- [ ] Bars stay 10px at most on a wide chart and stay apart on a narrow one
- [ ] A legend entry switches its series off and on; the axis fits what is showing; colors do not change
- [ ] Both themes; phone width; the table view shows the same numbers
