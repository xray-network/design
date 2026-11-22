---
id: select-native
name: SelectNative
summary: The browser's own select, styled like the text input; for forms, long option lists and phones.
motion: 0
requires: [tokens]
components: []
files: [select-native.css, select-native.html, select-native.tsx]
---

# SelectNative

A real `<select>` with the input's height, border, radius and focus, plus a chevron. Use it in forms that
submit natively, for long option lists, and where the platform picker reads better (phones). For options
with notes, icons or custom rows use Select.

## Platform contract

Native GUI implementations use the platform's picker or pop-up button (UIPickerView/Menu, Spinner,
ComboBox), styled to the input's height and radius where the platform allows.

## Anatomy

```
div.x-select-native[data-size]          the input's frame: 40px, 12px radius, hairline
├── select                              fills the frame; the platform draws the list
└── svg.x-select-native-chevron         16px, --x-fg-3, decorative
```

## Variants

| Attribute | Values |
|---|---|
| `data-size` | `sm` (36px), `lg` (48px); default 40px: the same heights as every form control (`--x-control-*`) |

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | `--x-border-hover` border |
| focus | `select:focus-visible` | `--x-focus` border, no extra ring |
| invalid | `select[aria-invalid=true]` | `--x-danger` border |
| disabled | `select:disabled` | 0.4 opacity |

## Accessibility

- A `label for` (or Field) names it; the platform handles keyboard and screen readers.
- `required` and `aria-invalid` work as on any form control.

## Motion

Border color on `--x-duration-fast`.

## Component tokens

`--x-select-native-height`, `--x-select-native-radius`, `--x-select-native-border`.

## Invariants

- The same height, radius, border and focus as Input at each size.
- The platform draws the option list; never restyle `option` beyond color.

## Safe edits

- `multiple` or `size` attributes: the chevron hides and the frame grows.

## Checklist

- [ ] Labelled; submits with its form
- [ ] Focus and invalid borders visible in both themes
