---
id: table
name: Table
summary: A data table in a hairline frame with a tinted header row, optional sorting and built-in paging with Pagination.
motion: 0
requires: [tokens]
components: [pagination, skeleton]
files: [table.css, table.html, table.controller.js, table.tsx]
---

# Table

Rows of comparable data on a page: payments, invoices, customers, endpoints. A hairline frame with a
tinted header row and dividers between rows, like the tables in these docs. Give it a page size and it
pages the rows with Pagination under the frame. For a dense table with its own title inside a dashboard
card, use Table Compact; for one or two facts per object on phones, use List.

## Platform contract

Native GUI implementations use the platform's table or data grid with a header row, row dividers, the same
alignment rules (numbers end-aligned) and the kit's Pagination equivalent under it. Sorting announces its
order through the platform's accessibility API.

## Anatomy

```
div.x-table
├── div.x-table-frame                       hairline, 20px radius; scrolls sideways when wide
│   └── table                               14px, tabular digits
│       ├── caption                         names the table for screen readers (visually hidden)
│       ├── thead th[scope=col][data-align] --x-bg-panel fill, 14/600, --x-fg-1, 12×16px, hairline under
│       └── tbody tr                        canvas; hairline between rows; --x-bg-soft on hover
│           ├── th[scope=row]               the row's name, same look as a cell
│           └── td[data-align]              12×16px, --x-fg-1
└── div.x-table-foot (optional)             12px above; holds Pagination, end-aligned
```

## Variants

| Attribute | Values |
|---|---|
| `th`, `td` `data-align` | `end` (numbers, amounts), `center` |
| `th[aria-sort]` + `button.x-table-sort` | a sortable column; `td data-value` gives the sort key (HTML) |
| `tr.x-table-empty` | one row spanning all columns: the empty state |
| `tr.x-table-loading` + `.x-table-frame[aria-busy=true]` | loading: a skeleton line in every cell, aligned like the data; paging disabled. React: `loading`, `loadingRows` (default: the page size, or 5) |

## States

| State | Source | Look |
|---|---|---|
| row hover | `tbody tr:hover` | `--x-bg-soft` fill |
| sorted | `aria-sort` on the header cell | arrow shown; turned for ascending |

## Accessibility

- A real `<table>` with `th scope="col"` and the first cell as `th scope="row"`; a `caption` names it.
- Sort buttons live in the header cells and announce the order through `aria-sort`.
- Pagination is a labelled navigation under the table; changing the page keeps focus in Pagination.

## Motion

Row hover color on `--x-duration-fast`; the sort arrow turns on `--x-spring`.

## Component tokens

`--x-table-radius`, `--x-table-cell-pad`.

## Invariants

- Header row on `--x-bg-panel` at weight 600; body cells at weight 500 on the canvas.
- No vertical lines; dividers between rows only.
- Numbers are end-aligned with tabular digits.

## Safe edits

- Controls (buttons, menus, tags) in cells.
- A fixed column width through `width` on a column.

## Checklist

- [ ] Caption names the table; first cell is the row header
- [ ] Wide tables scroll sideways inside the frame on phones
- [ ] Paging and sorting work by keyboard; both themes
