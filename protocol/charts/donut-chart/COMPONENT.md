---
id: donut-chart
name: DonutChart
summary: The parts of one whole as a ring, with the total in the middle and each part named in the legend.
motion: 0
requires: [tokens, chart]
components: []
files: [donut-chart.css, donut-chart.html, donut-chart.controller.js, donut-chart.controller.d.ts, donut-chart.tsx]
---

# DonutChart

For composition: a portfolio by asset, revenue by method, storage by type. It answers "how much of the whole",
for a handful of parts. Past five, the smallest fold into Other. To compare amounts precisely, or across time, use
BarChart: angles are hard to compare.

## Anatomy

```
figure.x-chart.x-donut-chart[data-total][data-height][data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: first column the parts, second their amounts
├── ul.x-chart-legend                   every part with its share
└── div.x-chart-plot[tabindex=0]
    ├── svg.x-chart-svg[data-active]
    │   ├── path.x-donut-chart-slice[data-active]     one per part
    │   └── text.x-donut-chart-total, text.x-donut-chart-caption
    └── div.x-chart-tip                 the readout
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-total` | the caption under the total in the middle | no caption |
| `data-height` | the plot's height in px | 200 |
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
- The plot takes the focus (`tabindex="0"`): arrow keys move the readout round the parts, Home and End jump to the
  ends, Esc hides it.
- A series is never told by color alone: the legend names every series whenever there are two or more. Its
  entries are buttons (`aria-pressed`): pressed is on the chart; off is hollow, muted and struck through.
- Name the figure with its title (`figcaption`), or `aria-label`.

## Motion

Tier 0. Nothing draws in and nothing animates when the data changes: a chart is read, and data never animates
(protocol section 8). The readout is not data, and it moves: it fades in and grows from 96%, then glides from mark
to mark, on `--x-ease`. The marks around the one being read dim on the same curve. Reduced motion: instant.

## Component tokens

`--x-chart-surface` (the color behind the marks) and the series colors `--x-chart-1` to `-6`, from the tokens.

## Invariants

- Web: one controller draws the plot for HTML and React, from the data table; React renders the table from `data`.
- The table is the source of truth. Whatever the plot shows is in it.
- One whole: parts are never negative and always add up to the total shown.
- Six parts at most; the rest are summed into Other, in the muted color. Order is the table's order.
- Set `--x-chart-surface` to the surface the chart sits on, so the gaps between parts match it.
- Marks: Parts are separated by a 2px gap in the surface color. The ring is about a quarter of the radius thick. The total
is the one large number; the legend carries the names and shares.
- A press on a legend entry takes its part out of the whole: the total and the shares are of what is showing.
- Text takes the text colors, never a series color.

## Safe edits

- The data, the height and the number format.
- The surface color behind the marks, to match a card or a panel.
- A title, or an aria-label when the chart sits under its own heading.

## Checklist

- [ ] Shares add up to 100% and match the table; a seventh part appears as Other
- [ ] On a panel, the gaps between parts take the panel's color
- [ ] Both themes; phone width; the table view shows the same numbers
