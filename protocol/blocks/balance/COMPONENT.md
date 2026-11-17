---
id: balance
name: Balance
summary: The screen's headline amount with its fiat value, change over a period, and main actions.
motion: 0
requires: [tokens]
components: [numeral, tag, button]
files: [balance.css, balance.html, balance.tsx]
---

# Balance

The top of a wallet or account screen: what the user holds, what it is worth, how it moved, and
what they can do next. One per screen.

## Anatomy

```
section.x-balance[aria-label]
├── div.x-balance-label          13px muted: "Total balance"
├── span.x-numeral[data-size=hero]   48px integer, small fraction, ticker (Numeral)
├── div.x-balance-meta           15px: fiat value · Delta · period
└── div.x-balance-actions        Buttons: one primary (Send), the rest ghost
```

## Accessibility

- A labelled `section`; the amount is real text.
- With hidden balances, the Numeral and the fiat value are both masked; the Delta stays (it reveals no amount).

## Motion

None: amounts never animate (DESIGN-PROTOCOL.md section 8).

## Invariants

- One primary action; the others are ghost buttons.
- The amount uses Numeral `hero`; the fiat value is plain text below it.

## Safe edits

- Other labels: "Available", "Staked", "Portfolio".
- No actions, or a Segmented period switcher (24h / 7d / 30d) in the meta row.
- Phones: actions stretch to equal widths (built in under 560px).

## Checklist

- [ ] Masked state hides the amount and the fiat value
- [ ] Phone width: the numeral shrinks and the actions fill the row
- [ ] Both themes
