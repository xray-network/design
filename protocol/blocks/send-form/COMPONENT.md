---
id: send-form
name: SendForm
summary: Recipient, amount with Max, network fee options, a live total and the review button.
motion: 0
requires: [tokens]
components: [input, button, card-option, skeleton]
files: [send-form.css, send-form.html, send-form.controller.js, send-form.tsx]
---

# SendForm

The send step of a payment: who, how much, how fast, and what it costs in total. It ends in a review
step (a Dialog, or a page), never in sending directly.

## Anatomy

```
form.x-send-form                          single column, 24px gaps, 560px max
├── .x-field  Recipient                   Field + Input: email or account ID
├── .x-field  Amount                      Input lg + chip Button "Max" + ticker; hint: fiat · available
├── .x-field  Fee                 CardOption: Slow / Standard / Fast with time and cost
├── dl.x-send-form-summary                Fee, Total (bold); hairline above
└── button.x-button[data-size=lg][data-width=full]   "Review transaction"
```

## Behavior

- Max fills the amount with the available balance minus the selected fee.
- The summary follows the amount and the fee as they change.
- An amount (plus fee) above the balance marks the amount invalid with the reason and the maximum.
- Submit validates the recipient and the amount, then calls `onReview` (React) or submits the form (HTML).

HTML: `send-form.controller.js` does the above from `data-available`, `data-ticker`, `data-fee` on each
fee radio, `[data-x-amount]`, `[data-x-max]`, `[data-x-fee]` and `[data-x-total]`.

## Loading

React `loading` (`aria-busy`): bars in place of the available balance, the fee options' texts and the summary amounts; the fields stay usable and the submit button is disabled.

## Accessibility

- Every control has a label; the fee group is a labelled radiogroup.
- Errors are text under the field, linked with `aria-describedby` and announced (`role="alert"`).
- The submit button stays enabled; submitting explains what is missing instead.

## Motion

None beyond its components.

## Invariants

- Review before sending: the button opens a review, it does not send.
- The total includes the fee and uses the asset's own decimals.
- CardOption preselects the recommended fee (Standard).

## Safe edits

- Other assets: an asset Select next to the amount; `available` and `ticker` follow it.
- A note field (Textarea) before the summary.
- Fiat-first entry: swap the amount and the hint.

## Checklist

- [ ] Max fills the right amount for each fee
- [ ] Total updates while typing; over-balance error appears and clears
- [ ] Empty recipient or amount explains itself on submit
- [ ] Phone width: fee cards stack; the button stays full width
- [ ] Both themes
