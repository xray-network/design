---
id: option
name: Option cards
summary: Single choice between options that each need a second line, such as fee tiers.
motion: 0
requires: [tokens]
components: []
files: [option.css, option.html, option.tsx]
---

# Option cards

One choice where every option has consequences worth showing: speed and cost of a fee, limits of a
plan. If a one-word label is enough, use Segmented.

## Anatomy

```
div.x-options[role=radiogroup][aria-label]     three equal columns, 8px gaps
└── label.x-option                             16px radius, hairline, 12px 14px padding
    ├── input[type=radio]                      visually hidden
    ├── span.x-option-title                    14/600
    ├── span                                   12px, what it means
    └── span.x-option-value                    12px mono, what it costs
```

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | border to `--x-border-hover` |
| selected | `input:checked` | `--x-accent` border, `--x-accent-wash` fill |
| focus | `input:focus-visible` | ring around the card |
| disabled | `input:disabled` | 40% opacity |

## Accessibility

- Native radios in a labelled `radiogroup`: arrow keys move the selection; the value submits with forms.
- The whole card is the label, so every line is read with the option.
- Always preselect the recommended option.

## Motion

Tier 0. Border and fill on `--x-duration-fast`.

## Component tokens

`--x-options-columns`.

## Invariants

- Selection is the accent border plus the faint accent wash. This is the one place a selected item is blue.
- Equal-width cards; one column under 420px.
- Native radios; state from `:checked`.

## Safe edits

- Two or four columns through `--x-options-columns`.
- A summary under the group that follows the choice with `:has()`, no JS:
  `form:has(#fee-fast:checked) [data-for="fee-fast"] { display: grid }`.
- A badge ("Recommended") in the title line.

## Checklist

- [ ] Arrow keys change the selection; focus ring visible
- [ ] Both themes: the selected wash is visible in each
- [ ] Phone width: cards stack
