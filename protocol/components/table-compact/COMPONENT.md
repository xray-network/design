---
id: table-compact
name: Table Compact
summary: A compact data table in a framed section with an optional title, row dividers, row links, an empty row and a pagination footer.
motion: 0
requires: [tokens]
components: [pagination, skeleton]
files: [table-compact.css, table-compact.html, table-compact.controller.js, table-compact.tsx]
---

# Table Compact

A dense table inside a framed section with its own title, for dashboards and cards. For a plain data
table with built-in paging, use Table.

Rows of comparable data: endpoints, payments, invoices, customers. Each row is one object; its
first cell names it and can link to it. For one or two facts per object, List reads better on phones.

## Anatomy

```
section.x-table-compact[aria-labelledby|aria-label]         hairline frame, 20px radius
├── div.x-table-compact-head (optional)                     20px padding
│   ├── h3.x-table-compact-title                            18/700
│   └── p.x-table-compact-description                       12px muted
├── div.x-table-compact-scroll                              scrolls sideways when the table is wide
│   └── table                                       12px (XRAY Graph table scale), tabular digits, no wrapping
│       ├── caption                                 names the table for screen readers (visually hidden)
│       ├── thead th[scope=col][data-align]         11px muted; a hairline above when there is a title
│       └── tbody tr                                hairline between rows
│           ├── th[scope=row]                       600, --x-fg-1; [a.x-table-compact-link] makes the row clickable
│           │   ├── svg.x-table-compact-arrow       14px arrow after the link, --x-fg-3
│           │   └── span.x-table-compact-sub        optional second line: 11px, --x-fg-3, one line, max 280px
│           └── td[data-align]
└── div.x-table-compact-foot (optional)                     hairline above; holds Pagination
```

Cells are 12px from each other and 20px from the frame.

## Variants

| Attribute | Values |
|---|---|
| `th`, `td` `data-align` | `end` (numbers, amounts), `center` |
| `th` `aria-sort` + `button.x-table-compact-sort` | optional sortable column; `td data-value` gives the sort key |
| `tr.x-table-compact-empty` | one row spanning all columns: the empty state |

## Loading

`loading` (React) shows `loadingRows` skeleton rows (default 5) in `tr.x-table-compact-loading`, a skeleton line
per cell aligned like the data, two lines in a first column that has a description; the scroll area gets
`aria-busy="true"`.

## States

| State | Source | Look |
|---|---|---|
| row link | `a.x-table-compact-link` in the first cell | link color; the whole row is the click target |
| row hover / focus | `tr:hover`, `tr:focus-within` | link turns `--x-accent-ink-hover` |
| row link focus | `.x-table-compact-link:focus-visible` | 2px ring around the whole row |

## Accessibility

- A real `<table>` with `th scope="col"` and the first cell as `th scope="row"`.
- Name it: a visible `.x-table-compact-title` with `aria-labelledby` on the section, plus the `caption`.
- The row link is a real link on the row's name; other controls in the row stay separately clickable.
- Sorting buttons announce their order through `aria-sort`.

## Motion

None beyond color on `--x-duration-fast` and the sort arrow turning.

## Component tokens

`--x-table-compact-pad-edge`, `--x-table-compact-pad-cell`.

## Invariants

- Hairlines between rows, none between columns; the frame clips the corners.
- Numbers right-aligned with tabular digits; cells never wrap (the scroll container handles width).
- Native table elements. No div grids posing as tables.

## Safe edits

- Cells with other components: Avatar or a token disc before the name, Delta, Status, Tag, a round IconButton.
- A toolbar (search Input, Select) in the head next to the title.
- Pagination at the top as well (a second `.x-table-compact-foot` above the scroll container, with the hairline below).
- Server-side sorting: set `aria-sort` from the request and skip the controller.

## Checklist

- [ ] Clicking anywhere on a linked row opens it; buttons in the row still work
- [ ] Wide tables scroll inside the frame, never the page
- [ ] Empty state shows one row
- [ ] Both themes
