---
id: order-book
name: OrderBook
summary: The open orders of a market, sells above and buys below the last price, each row with a bar for how much stands at that price or better.
motion: 0
requires: [tokens]
components: []
files: [order-book.css, order-book.html, order-book.tsx]
---

# OrderBook

The order book of a trading screen. Sell orders stand above the last price and buy orders below it, each at its
price with its amount, and a wash behind every row shows how much stands at that price or better, so the walls on
either side are visible before a number is read. Pressing a row takes its price to the order form.

The app supplies the levels and keeps them current. For the same data as one picture, use the
DepthChart.

## Anatomy

```
section.x-order-book[aria-label]
├── div.x-order-book-head[aria-hidden]        three column heads
├── ol.x-order-book-side[data-side="ask"]     sells; the best price next to the middle
│   └── li › button.x-order-book-row          span.x-order-book-price + amount + running total; --x-order-book-depth
├── div.x-order-book-spread                   span.x-order-book-last + the spread
└── ol.x-order-book-side[data-side="bid"]     buys; the best price next to the middle
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-side` on a list | `ask`: the danger color. `bid`: the success color | required |

## States

| State | Source | Look |
|---|---|---|
| hover | the pointer is over a row | its wash steps up |

## Accessibility

- A section with a name; each side is a named list.
- Each row is a button named in words: "Sell 4.120 at 3,209.80, 9.014 in total".
- Side is told by position and by the list's name, as well as by color.

## Motion

Tier 0. Numbers change in place; a row does not flash when it updates. The wash eases on hover.

## Component tokens

`--x-order-book-depth` on a row (0 to 1), `--x-order-book-row` (a row's height, 26px), and `--x-chart-surface` (the color behind the rows).

## Invariants

- The best prices meet in the middle: asks rise upward from it, bids fall downward.
- The same number of levels on both sides.
- The wash is the running total, measured against the deeper side, so the two sides compare.
- Figures are monospaced and tabular: columns never shift as numbers change.
- Red and green mean sell and buy here and nothing else.

## Safe edits

- The number of levels and the price step.
- A Select above it for grouping prices.
- Hiding the total column in a narrow column.

## Checklist

- [ ] The deepest row's wash is full width and the others are in proportion
- [ ] Columns do not move when the numbers change
- [ ] Both themes; the sides are told apart without color
