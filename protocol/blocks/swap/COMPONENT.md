---
id: swap
name: Swap
summary: Exchange one currency for another, with the amount you pay, a flip button, the quoted amount you receive, the rate and fees, and the review button.
motion: 0
requires: [tokens]
components: [input-amount, button, skeleton]
files: [swap.css, swap.html, swap.controller.js, swap.controller.d.ts, swap.tsx]
---

# Swap

Trades one currency for another at a quoted rate. The person types what they pay; the app quotes what they
receive, the rate and the fees; the flip button turns the pair around. The block never fetches quotes or rates:
the app supplies them and decides when a quote is stale.

## Anatomy

```
form.x-swap
├── div.x-swap-pair
│   ├── div.x-amount                       "You pay": editable, with balance and Max
│   ├── button.x-icon-button.x-swap-flip   round, on the seam between the two amounts
│   └── div.x-amount                       "You receive": read-only quote
├── dl.x-swap-details                      Rate, Network fee, Minimum received …
│   └── div > dt + dd
└── button.x-button[type=submit]           "Review swap", full width, large
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| quoting | `aria-busy="true"` on the form | the receive amount and the details show skeletons; review disabled |
| invalid | the pay InputAmount's error | review disabled |
| flipped | `data-turned` on the flip button, toggled by each press | the icon turns half a turn on the spring, and back on the next press; the app swaps the pair |

## Accessibility

- A `form`: Enter in the amount submits to review, the same as the button.
- The flip button is named ("Switch currencies").
- The receive amount is read-only, not disabled, so it is still read out and focusable.
- The details are a description list: each term reads with its value.

## Motion

Tier 0. The flip icon turns 180° on `--x-spring`, and back on the next press. Reduced motion: no turn.

## Component tokens

None; it uses InputAmount and Button tokens.

## Invariants

- The pay side is editable, the receive side is a read-only quote. Flipping swaps the currencies, never the roles.
- The review button submits; the swap itself happens on a review screen or Modal, never on this click.
- Rates, fees and minimums come from the app's quote.

## Safe edits

- Details: any rows (route, slippage, price impact). Put a warning tone on price impact with text, not color alone.
- An editable receive side when the app supports exact-output quotes.
- A settings button (slippage) in the details header.

## Checklist

- [ ] Typing in the pay amount asks the app for a quote; while quoting, skeletons show and review is disabled
- [ ] Flip swaps the currencies; the icon turns
- [ ] Over-balance error shows and blocks review
- [ ] Phone width: amounts and details fit; the flip button stays on the seam
- [ ] Both themes; reduced motion
