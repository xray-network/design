---
id: asset-list
name: AssetList
summary: What an account holds, each row an asset with the amount held, what it is worth, how it moved and its share of the whole.
motion: 0
requires: [tokens]
components: [list, tag]
files: [asset-list.css, asset-list.html, asset-list.tsx]
---

# AssetList

The holdings of a wallet, a brokerage account or a treasury. A row is one asset: how much of it there is, what
that is worth now, how it moved, and a slim line for its share of the whole, so the big positions stand out
without a chart.

The app supplies the holdings, largest first, and opens one. For prices of things you do not hold, use
MarketList.

## Anatomy

```
div.x-list.x-asset-list[role="list"][aria-label]
└── a.x-list-row[role="listitem"]             or a button
    ├── span.x-list-token[data-tone=neutral]   the asset's icon (Icon's crypto icons); or an Avatar, a logo
    ├── span.x-list-text
    │   ├── span.x-list-title                  the asset's name
    │   └── span.x-list-sub                    the amount held
    ├── span.x-list-end
    │   ├── span.x-list-title                  its worth
    │   └── span.x-list-sub › span.x-delta[data-trend]
    └── span.x-asset-list-share[aria-hidden]   optional; --x-asset-list-share, 0 to 1
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| masked | the app writes dots in place of amounts and values | •••• for every amount and value; names, changes and shares stay |

## Accessibility

- A list with a name; each row is a link or a button.
- The share line is decorative: the worth beside it carries the fact.
- The change is written with its sign.

## Motion

Tier 0. None.

## Component tokens

`--x-asset-list-share` on a share line: the asset's share of the whole, 0 to 1.

## Invariants

- Largest holding first, unless the app sorts by something it names.
- Amounts carry their ticker; values carry their currency.
- Masking hides amounts and values, never names.

## Safe edits

- The lead mark and the period of the change.
- Rows without a share line, or without a change.

## Checklist

- [ ] Values line up at the end in tabular figures
- [ ] Masked, no amount or value can be read or copied from the page
- [ ] Both themes; 320px wide
