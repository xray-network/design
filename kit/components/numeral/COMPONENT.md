---
id: numeral
name: Numeral
summary: Balance display with a heavy integer, a small muted fraction and a ticker; can be masked.
motion: 0
requires: [tokens]
components: []
files: [numeral.css, numeral.html, numeral.tsx]
---

# Numeral

Balances and other headline amounts. The integer carries the weight; the fraction and ticker step
back. Use plain text for amounts inside sentences, lists and tables.

## Anatomy

```
span.x-numeral
├── span.x-numeral-value        integer, weight 900, tracking −0.02em
│   └── span.x-numeral-frac     ".254221" at 0.6em, weight 700, --x-fg-frac
├── span.x-numeral-mask         "•••••", shown only when masked
└── span.x-numeral-ticker       12px, weight 700, tracking 0.04em, --x-fg-3
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-size` | `sm` 16px (fraction and ticker 12px), `hero` 48px (38px on phones; fraction 0.5em, ticker 15px) | 20px |
| `data-masked` | `true` | value visible |

One `hero` numeral per page.

## Accessibility

- The value is real text: it can be selected and read. Pass an already formatted string; do not split digits into elements.
- When masked, the value is removed (`display: none`) and the mask has `aria-label="Hidden"`.
- Negative amounts use a true minus (−).

## Motion

None. Amounts never animate or count up (RULES.md section 8).

## Component tokens

`--x-numeral-size`, `-frac-size`, `-ticker-size`, `-ticker-gap`.

## Invariants

- Weight 900 integer; the fraction is smaller and muted, never the same size.
- Tabular digits, except `hero`, which uses proportional digits.
- The ticker is uppercase text from the data, not styled with `text-transform`.

## Safe edits

- A second line under the numeral (fiat value, a delta from Tag).
- Another unit in place of the ticker ("%", "tx").
- Color for sign only through `--x-success-fg` / `--x-danger-fg` on the whole numeral.

## Checklist

- [ ] Integer, fraction and ticker share one baseline
- [ ] Masked state hides the value and keeps the ticker
- [ ] Both themes; hero size on a phone
