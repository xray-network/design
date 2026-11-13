---
id: list
name: List
summary: Rows without boxes for transactions, assets and settings, with a soft fill on hover.
motion: 0
requires: [tokens]
components: []
files: [list.css, list.html, list.tsx]
---

# List

The app's way of showing many items of one kind: transactions, assets, pools, settings. Rows have
no borders or cards; the hover fill overhangs the content, so text stays on the page's edge.

## Anatomy

```
div.x-list[role=list]                          2px gaps
├── div.x-list-heading                         12/600 group title: a day, a category
└── div|a|button.x-list-row[role=listitem]     14px radius, 10px 12px padding
    ├── lead: .x-list-icon | .x-list-token | Avatar | Tile     36px
    ├── span.x-list-text
    │   ├── .x-list-title                      14/600, one line
    │   └── .x-list-sub                        13px, one line
    └── span.x-list-end[data-tone]             right-aligned, tabular digits
        ├── .x-list-title                      amount
        └── .x-list-sub                        fiat value or detail
```

## Variants

| Attribute | Values |
|---|---|
| `.x-list-end` / `.x-list-icon` `data-tone` | `positive` (incoming funds, rewards) |
| `.x-list-token` `--x-list-token-bg` | the asset's color token; default `--x-accent` |

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | `--x-bg-soft` fill |
| focus | `:focus-visible` on `a` / `button` rows | global focus ring |

## Accessibility

- `role="list"` and `role="listitem"`. A row that does something is an `<a>` or `<button>`, never a clickable div.
- Positive amounts carry a "+" and negative ones a true minus (−); color is extra.
- Title and sub truncate to one line each; put the full value in a detail view.

## Motion

Tier 0. Only the hover fill, on `--x-duration-fast`.

## Component tokens

`--x-list-row-inset`, `--x-list-token-bg`.

## Invariants

- No borders, dividers or cards around rows.
- The hover fill overhangs by the row inset on both sides; content aligns with the page edge.
- Amounts are right-aligned with tabular digits.

## Safe edits

- Trailing controls in place of `.x-list-end`: a Switch (settings), a Tag, a round IconButton.
- A checkbox or radio row: make the row a `<label>`.
- Denser rows through padding; a different inset through `--x-list-row-inset`.

## Checklist

- [ ] Long titles and subs truncate; the right side never wraps
- [ ] Interactive rows are reachable and show the focus ring
- [ ] Both themes
