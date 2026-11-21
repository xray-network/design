---
id: table-view
name: TableView
summary: A table with what you need around it, a search field and filters above, the count and the pages below.
motion: 0
requires: [tokens]
components: [input, segmented, table, pagination, button]
files: [table-view.css, table-view.html, table-view.tsx]
---

# TableView

A list page in a console: payments, customers, requests, orders. The Table
is the page; this block puts in their places the things every such page needs: a search field, one or two
filters, the page's actions, and under the table how many rows match and the pages.

The app filters, sorts and pages the rows.

## Anatomy

```
section.x-table-view[aria-label]
├── div.x-table-view-toolbar
│   ├── div.x-input.x-table-view-search[data-size="sm"]    svg.x-icon + input[type="search"]
│   ├── div.x-table-view-filters                           a small Segmented, Chips, a Select
│   └── div.x-table-view-actions                           at the end: Export, New
├── div.x-table                                            the Table
└── footer.x-table-view-foot
    ├── span.x-table-view-count[aria-live]                 "1–20 of 312"
    └── form.x-pagination                                  the Pagination
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| no matches | the Table's own empty state | the Table says nothing matches and how to clear the search; the count reads 0 results |

## Accessibility

- The section is named; the search field has its own name.
- The count is a polite live region, so a new search is announced.
- Filters are a radio group or checkboxes with a name, never bare buttons.

## Motion

Tier 0. None.

## Component tokens

None.

## Invariants

- Search first, then filters, then actions at the end of the row.
- Two filters at most in the toolbar; more go behind a Filters button.
- The count always says how many rows match, not only how many are showing.

## Safe edits

- Which of search, filters, actions, count and pages are present.
- A row of Chips under the toolbar for the filters that are on.

## Checklist

- [ ] With no matches the table says so and the count reads 0
- [ ] The toolbar wraps on a narrow page with nothing cut off
- [ ] Both themes
