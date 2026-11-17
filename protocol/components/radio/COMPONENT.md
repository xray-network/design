---
id: radio
name: Radio
summary: Native radio, restyled, with a label, an optional description, and vertical or row groups.
motion: 0
requires: [tokens]
components: []
files: [radio.css, radio.html, radio.tsx]
---

# Radio

One choice from a short list of plain labels that applies on submit. For two to five options that
switch a view, use Segmented; when each option needs details, use Option cards; for long lists, Select.

## Anatomy

```
fieldset.x-radio-group[data-direction]   vertical (12px gaps) or a row
├── legend                               13/600 group label
└── label.x-radio
    ├── input[type=radio]                18px circle; look replaced, behavior native
    └── span.x-radio-text
        └── [span.x-radio-description]   second line, 13px muted
```

## Variants

| Attribute | Values | Default |
|---|---|---|
| `.x-radio-group` `data-direction` | `row` | column |

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | circle border one step stronger |
| checked | `:checked` | accent fill; white dot pops in |
| focus | `input:focus-visible` | 2px accent ring |
| disabled | `input:disabled` | 40% opacity |

## Accessibility

- Native radios sharing a `name`: arrow keys move the selection; Tab enters and leaves the group.
- Always in a `fieldset` with a `legend`, and with one option preselected.

## Motion

Tier 0. Fill and border on `--x-duration-fast`; the dot scales in on `--x-spring`. Reduced motion: instant.

## Component tokens

`--x-radio-size`.

## Invariants

- Native `input type="radio"`; state from `:checked`, never classes.
- The label wraps the input; checked is accent blue.

## Safe edits

- A trailing element in the row (a fee, a Tag).
- Row layout for two or three short options.

## Checklist

- [ ] Arrow keys move the selection; focus ring visible
- [ ] Both themes; disabled; row and column groups
