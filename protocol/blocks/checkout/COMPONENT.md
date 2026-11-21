---
id: checkout
name: Checkout
summary: The last step before paying, with what is being bought, how the total adds up, how it is paid and one button that names the amount.
motion: 0
requires: [tokens]
components: [button]
files: [checkout.css, checkout.html, checkout.tsx]
---

# Checkout

The screen where someone decides to pay: a booking, a cart, a subscription. It answers three questions in order:
what am I buying, why does it cost this much, and how am I paying. Then one button, and the button says the
amount.

The app supplies the amounts and takes the payment.

## Anatomy

```
section.x-checkout[aria-labelledby]
├── h2.x-checkout-title
├── ul.x-checkout-items
│   └── li.x-checkout-item
│       ├── span.x-checkout-thumb             optional; a 56px square picture
│       ├── span.x-checkout-text              span.x-checkout-name + span.x-checkout-detail
│       └── span.x-checkout-price
├── dl.x-checkout-totals
│   └── div.x-checkout-row[data-total]        dt (label) + dd (amount); the total is last
├── div.x-checkout-method                     optional; a List row with the card and Change
└── div.x-checkout-pay
    ├── button.x-button[data-width="full"]    names the amount
    └── p.x-checkout-note                     optional
```

## Variants and sizes

None.

## States

None.

## Accessibility

- A section named by its title.
- The breakdown is a description list: each amount is read with its label.
- The button's text carries the amount, so it is heard before it is pressed.

## Motion

Tier 0. None.

## Component tokens

None.

## Invariants

- The button names what will be charged, and it equals the total above it.
- Every line of the breakdown is a label and an amount: no amount without a reason.
- One button. A way back belongs to the screen, not to this block.
- Amounts line up at the end in tabular figures.

## Safe edits

- A promo code field between the items and the totals.
- A discount as a breakdown line with a minus sign.
- The note under the button.

## Checklist

- [ ] The button's amount and the total are the same number
- [ ] A long item name shortens and never pushes its price out
- [ ] Both themes; 320px wide
