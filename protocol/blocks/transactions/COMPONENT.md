---
id: transactions
name: Transactions
summary: Transaction history with type filters, rows grouped by day, and compact paging.
motion: 0
requires: [tokens]
components: [chips, list, pagination, skeleton]
files: [transactions.css, transactions.html, transactions.tsx]
---

# Transactions

An account's history: what moved, when, and how much. Filter by type, read by day, page through older
entries. Rows open the transaction's details.

## Anatomy

```
section.x-transactions[aria-label]
├── div.x-transactions-head          h2 title (15/600) + optional action ("View all")
├── div.x-chips                      All · Sent · Received · Refunds, with counts
├── div.x-transactions-days          20px between days
│   └── div.x-list.x-transactions-day
│       ├── .x-list-heading          "Today", "Yesterday", "Nov 9"
│       └── .x-list-row[data-kind]   icon circle · title + time/counterparty · signed amount + fiat
├── p.x-transactions-empty           "No transactions yet"
└── div.x-transactions-foot          Pagination under a hairline
```

## Kinds

| `data-kind` | Icon | Amount |
|---|---|---|
| `sent` | arrow up-right | `−` amount, default color |
| `received` | arrow down-left, green | `+` amount, `--x-success-fg` |
| `refund` | return arrow, green | `+` refund, `--x-success-fg` |

## Behavior

- Filtering: in HTML, CSS `:has()` hides rows of other kinds and day groups left empty, with no JS. In React,
  the filter resets paging and counts come from the data.
- Paging: React pages the filtered items (`pageSize`, default 8); HTML pages are links to server-rendered pages.

## Loading

React `loading` (`aria-busy`): rows keep their structure as placeholders (List rows' loading state, day headings as bars); with no data yet, `pageSize` placeholder rows (at most 5) in one group. Rows are not clickable and paging is disabled until the data arrives.

## Accessibility

- The filter is a labelled radiogroup (Chips); each day is a labelled list.
- Amounts carry their sign in text; color is extra.
- Rows that open details are links or buttons.

## Motion

None beyond its components.

## Invariants

- Newest first; one heading per day; no dividers between rows.
- Signs on every amount; incoming in green, outgoing in the default color.

## Safe edits

- More kinds (`swap`, `mint`): add a chip, an icon, and the two `:has()` rules for HTML.
- Infinite loading instead of paging: replace the foot with a "Load more" ghost Button.
- A search Input in the head.

## Checklist

- [ ] Each filter shows only its kind and hides empty days
- [ ] Paging stays within the filtered set; changing the filter returns to page 1
- [ ] Empty state shows when there is nothing to list
- [ ] Both themes; phone width
