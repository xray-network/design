---
id: market-list
name: MarketList
summary: A list of markets, each row an asset with its name, a small trend line, its price and how far it moved.
motion: 0
requires: [tokens]
components: [list, tag]
charts: [sparkline]
files: [market-list.css, market-list.html, market-list.tsx]
---

# MarketList

The markets screen of an exchange, a watchlist, the rates of a currency app. A row is one market: what it is,
where its price has been going (a Sparkline), what it costs now and how
far it moved.

The app supplies the markets in its own order (top, gainers, favorites) and opens one.

## Anatomy

```
div.x-list.x-market-list[role="list"][aria-label]
└── a.x-list-row[role="listitem"]             or a button
    ├── span.x-list-token                      the asset's mark; or an Avatar, a logo
    ├── span.x-list-text
    │   ├── span.x-list-title                  the ticker
    │   └── span.x-list-sub                    the name
    ├── span.x-market-list-trend               optional; holds a span.x-sparkline[data-trend], 72px wide
    └── span.x-list-end
        ├── span.x-list-title                  the price
        └── span.x-list-sub › span.x-delta[data-trend]
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-trend` on the Sparkline | `up`, `down`: the line takes the success or the danger color | grey |

## States

| State | Source | Look |
|---|---|---|
| narrow | the list is 280px wide or less | the trend lines are hidden; price and change stay |

## Accessibility

- A list with a name; each row is a link or a button.
- The change is written with its sign, so direction never depends on color.
- Each trend line has a text alternative ("Up over 7 days").

## Motion

Tier 0. None. Prices change in place; a row does not flash when its price moves.

## Component tokens

None.

## Invariants

- Prices line up at the end in tabular figures.
- A trend line shows one period, the same for every row, and the change beside it is for that period.
- Green and red mean up and down here and nothing else.

## Safe edits

- The lead mark, the second line, the period.
- A star button at the end of a row for favorites.

## Checklist

- [ ] Up, down and unchanged rows are told apart without color
- [ ] At 280px the trend lines go and nothing overlaps
- [ ] Both themes
