---
id: bar-list
name: BarList
summary: Amounts compared across named things, each row a line with the name and its value over a slim bar as long as the value.
motion: 0
requires: [tokens, chart]
components: []
files: [bar-list.css, bar-list.html, bar-list.controller.js, bar-list.controller.d.ts, bar-list.tsx]
---

# BarList

For a ranking where the names matter and may be long: top customers, endpoints by traffic, assets by value. Each
row is a line of text, the name and its number, over a slim bar: it reads as a list, and the bars rank it at a
glance. Rows keep the order of the data, so sort the data. For categories along an axis (months, days), use
BarChart.

## Anatomy

```
figure.x-chart.x-bar-list[data-view][data-drawn]
├── figcaption.x-chart-title            optional
├── table.x-chart-data                  the data: names, then one column of amounts
└── ol.x-chart-plot.x-bar-list-rows[aria-hidden]
    └── li.x-bar-list-row
        ├── span.x-bar-list-name        cut with an ellipsis
        ├── span.x-bar-list-value       at the end of the line
        └── span.x-bar-list-track       under the line, the row's full width: the whole scale; 6px, round
            └── span.x-bar-list-bar     the chart color, as long as the value; none for a zero
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
| row hover | `:hover` | its value brightens; the other rows' bars step back to 55% |

## Accessibility

- The data table is always in the document: it is what assistive technology reads, and `data-view="table"` shows
  it to everyone in place of the plot.
- Every value is written on the chart and is in the table.
- Name the figure with its title (`figcaption`), or `aria-label`.

## Motion

Tier 0. Nothing draws in and nothing animates when the data changes (protocol section 16). None.

## Component tokens

`--x-bar-list-thick` (the bar's thickness, 6px) and `--x-bar-list-color` (the bar's color, the first chart color).

## Invariants

- Web: one controller draws the plot for HTML and React, from the data table; React renders the table from `data`.
- One series. The longest bar is the largest value and fills the row; every bar starts at zero.
- The bar is slim and round, on a faint track as wide as the row: the color is a stroke, never a block, and no
  text sits on it.
- The value is written at the end of every row: this is a list as much as a chart, so there is no readout.
- A name that does not fit is cut with an ellipsis; the table has it in full.
- Text takes the text colors, never a chart color.

## Safe edits

- The data, the title and the number format.
- The bar's thickness and color.

## Checklist

- [ ] The longest bar belongs to the largest value, and a zero has no bar
- [ ] Long names are cut, never wrapped; values line up at the end
- [ ] Both themes; phone width; the table view shows the same data
