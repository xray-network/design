---
id: field
name: Field and Input
summary: Labelled form row (label, control, hint, error) and the text input.
motion: 0
requires: [tokens]
components: [button]
files: [field.css, field.html, field.tsx]
---

# Field and Input

`.x-field` is a form row: label, control, then a hint or an error. `.x-input` is the text input,
which can hold affixes (icon, ticker) and a trailing button. The input also works alone, e.g. for search.

`components: [button]` is only for the inline Max/Paste button pattern. The field works without it.

## Anatomy

```
.x-field
├── label.x-field-label[for]
├── .x-input                       44px, 12px radius, hairline border
│   ├── [svg.x-icon | .x-input-affix]   leading
│   ├── input                       borderless, fills the box
│   └── [.x-input-affix | .x-button | .x-icon-button]   trailing
├── p.x-field-hint                  hidden while an error shows
└── p.x-field-error[role=alert]     springs in when added
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `.x-input` `data-size` | `sm` 36px / 10px radius (search, filters), `lg` 56px / 14px radius with 22px bold numerals (amounts) | 44px / 12px radius |

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | border to `--x-border-hover` |
| focus | `:focus-within` | border to `--x-focus` |
| invalid | `input[aria-invalid="true"]` | danger border; error text below |
| disabled | `input:disabled` | 40% opacity |

## Accessibility

- Every input has a name: `<label for>` in a field, or `aria-label` for standalone search.
- Hint and error are linked with `aria-describedby`. The error has `role="alert"` so it is announced when it appears.
- Use the right `type`, `inputmode` and `autocomplete`; turn `spellcheck` off for addresses and codes.
- Validate on blur or submit, not on every keystroke.

## Motion

Tier 0. Border color uses `--x-duration-fast`. The error message enters with
`@starting-style`: it fades and drops 6px into place on `--x-spring`. Reduced motion: it appears instantly.

## Component tokens

`--x-input-height`, `-pad`, `-font-size`, `-font-weight`, `-border`, `-radius`.

## Invariants

- The native `<input>` is the only text control inside `.x-input`. No contenteditable.
- Invalid state comes from `aria-invalid`, never from a class.
- The radius follows the height (56/14, 44/12, 36/10), never a capsule; focus is the accent border, not the global outline ring.

## Safe edits

- `textarea` variant: same tokens and radius, auto height.
- A `select` inside `.x-input` (`appearance: none` plus a chevron icon).
- Field layout: label beside the control on wide screens (grid with two columns).

## Checklist

- [ ] Clicking anywhere on the box focuses the input (wrap in `<label>`, or leave as is: the input fills it)
- [ ] Error appears with animation, is announced, and the hint hides
- [ ] Both themes; `sm` and `lg`; disabled
- [ ] Trailing button stays concentric inside the input
