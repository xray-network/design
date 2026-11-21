---
id: input-amount
name: InputAmount
summary: A large amount with its currency in one frame, with the balance and Max above and the fiat value below.
motion: 0
requires: [tokens]
components: [button, skeleton]
files: [input-amount.css, input-amount.html, input-amount.controller.js, input-amount.controller.d.ts, input-amount.tsx]
---

# InputAmount

The amount is the point of the screen: swap, buy, stake, top up. One frame holds the number in large type, the
currency it is in, what is available, and what it is worth. In a longer form where the amount is one field
among several, use Input with a ticker suffix instead.

It does no conversion: the app supplies the fiat value, the balance and the rate.

## Anatomy

```
div.x-amount                                hairline frame, 20px radius
├── div.x-amount-head
│   ├── label.x-amount-label[for]           "You pay"
│   └── span.x-amount-balance               "Balance 2.41" + optional Max chip (.x-button[data-variant=chip][data-x-max])
├── div.x-amount-main
│   ├── input.x-amount-input[inputmode=decimal]   large, tabular figures
│   └── button.x-amount-currency            pill that opens the app's currency picker (or span when fixed)
│       ├── span.x-amount-currency-mark     optional: a token icon or tile
│       ├── span                            ticker
│       └── svg.x-amount-chevron            only on the button
└── div.x-amount-foot
    ├── span.x-amount-fiat                  "≈ $4,812.60"
    └── p.x-amount-error[role=alert]        optional; replaces the fiat value
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-size` | `sm` (24px figures, for a second row such as "You receive") | 32px figures |

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | border to `--x-border-hover` |
| focus | input focused | border to `--x-focus` |
| invalid | `aria-invalid="true"` on the input | border to `--x-danger`; the error shows in the foot |
| read-only | `readonly` on the input | faint fill, no focus border: the result of a quote |
| loading | `aria-busy="true"` | skeleton bars for the balance and fiat value; the number stays |
| disabled | `disabled` on the input | 40% opacity |

## Accessibility

- The label names the input (`for`); the fiat value and error are tied to it with `aria-describedby`.
- `inputmode="decimal"` brings up a number pad on phones; the value stays text, so separators and
  precision are kept exactly as typed.
- The currency button says what it does: `aria-label="Change currency, USDC"`.
- Max has a name that includes the amount when it is not shown nearby.

## Motion

Tier 0. Border color on `--x-ease`. The number never animates.

## Component tokens

`--x-amount-pad`, `-radius`, `-border`, `-font-size`.

## Invariants

- The value is text, sanitized to digits and one decimal point, never a float: no rounding while typing.
- The fiat value and rate come from the app; the component never converts.
- One amount per frame.

## Safe edits

- The currency pill: any mark (token icon, tile, flag), or a fixed span with no picker.
- The head: a different label ("You receive"), the balance with a ticker, no Max.
- The foot: a second note on the right (a rate, a fee).

## Checklist

- [ ] Typing letters or a second point is ignored; a comma becomes a point; decimals stop at the limit
- [ ] Max fills the balance and keeps focus in the input
- [ ] Error replaces the fiat value and is read out
- [ ] Read-only and loading states; `sm`
- [ ] Both themes; phone width (long numbers shrink, the pill never wraps)
