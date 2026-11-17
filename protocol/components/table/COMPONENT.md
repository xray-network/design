---
id: table
name: Table
summary: Data in a framed section with an optional title, row dividers, row links, an empty row and a pagination footer.
motion: 0
requires: [tokens]
components: [pagination]
files: [table.css, table.html, table.controller.js, table.tsx]
---

# Table

Rows of comparable data: endpoints, transactions, assets, delegations. Each row is one object; its
first cell names it and can link to it. For one or two facts per object, List reads better on phones.

## Anatomy

```
section.x-table[aria-labelledby|aria-label]         hairline frame, 20px radius
├── div.x-table-head (optional)                     20px padding
│   ├── h3.x-table-title                            18/700
│   └── p.x-table-description                       12px muted
├── div.x-table-scroll                              scrolls sideways when the table is wide
│   └── table                                       14px, tabular digits, no wrapping
│       ├── caption                                 names the table for screen readers (visually hidden)
│       ├── thead th[scope=col][data-align]         12px muted; a hairline above when there is a title
│       └── tbody tr                                hairline between rows
│           ├── th[scope=row]                       600, --x-fg-1; [a.x-table-link] makes the row clickable
│           └── td[data-align]
└── div.x-table-foot (optional)                     hairline above; holds Pagination
```

Cells are 12px from each other and 20px from the frame.

## Variants

| Attribute | Values |
|---|---|
| `th`, `td` `data-align` | `end` (numbers, amounts), `center` |
| `th` `aria-sort` + `button.x-table-sort` | optional sortable column; `td data-value` gives the sort key |
| `tr.x-table-empty` | one row spanning all columns: the empty state |

## States

| State | Source | Look |
|---|---|---|
| row link | `a.x-table-link` in the first cell | link color; the whole row is the click target |
| row hover / focus | `tr:hover`, `tr:focus-within` | link turns `--x-accent-ink-hover` |
| row link focus | `.x-table-link:focus-visible` | 2px ring around the whole row |

## Accessibility

- A real `<table>` with `th scope="col"` and the first cell as `th scope="row"`.
- Name it: a visible `.x-table-title` with `aria-labelledby` on the section, plus the `caption`.
- The row link is a real link on the row's name; other controls in the row stay separately clickable.
- Sorting buttons announce their order through `aria-sort`.

## Motion

None beyond color on `--x-duration-fast` and the sort arrow turning.

## Component tokens

`--x-table-pad-edge`, `--x-table-pad-cell`.

## Invariants

- Hairlines between rows, none between columns; the frame clips the corners.
- Numbers right-aligned with tabular digits; cells never wrap (the scroll container handles width).
- Native table elements. No div grids posing as tables.

## Safe edits

- Cells with other components: Avatar or a token disc before the name, Delta, Status, Tag, a round IconButton.
- A toolbar (search Input, Select) in the head next to the title.
- Pagination at the top as well (a second `.x-table-foot` above the scroll container, with the hairline below).
- Server-side sorting: set `aria-sort` from the request and skip the controller.

## Checklist

- [ ] Clicking anywhere on a linked row opens it; buttons in the row still work
- [ ] Wide tables scroll inside the frame, never the page
- [ ] Empty state shows one row
- [ ] Both themes
