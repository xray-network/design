---
id: option
name: Option cards
summary: Single choice between options that each need a second line, such as fee tiers.
motion: 0
requires: [tokens]
components: [skeleton]
files: [option.css, option.html, option.tsx]
---

# Option cards

A block: a labelled group of selectable cards built on native radios. One choice where every option has
consequences worth showing: speed and cost of a fee, limits of a
plan. If a one-word label is enough, use Segmented.

## Anatomy

```
div.x-options[role=radiogroup][aria-label]     three equal columns, 8px gaps
└── label.x-option                             16px radius, hairline, 12px 14px padding
    ├── input[type=radio]                      the 16px dot in the top-right corner
    ├── span.x-option-title                    14/600
    ├── span                                   12px, what it means
    └── span.x-option-value                    12px mono, what it costs
```

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | border to `--x-border-hover`; an empty dot darkens |
| selected | `input:checked` | `--x-accent-ink` border, `--x-accent-wash` fill; the dot fills with `--x-accent` and its center pops in on the spring |
| focus | `input:focus-visible` | ring around the card |
| disabled | `input:disabled` | 40% opacity |

## Loading

React `loading` (`aria-busy`, disabled inputs): each card keeps its size with one-line bars of varied widths in place of its texts, and none can be chosen.

## Accessibility

- Native radios in a labelled `radiogroup`: arrow keys move the selection; the value submits with forms.
- The whole card is the label, so every line is read with the option.
- Always preselect the recommended option.

## Motion

Tier 0. Border and fill on `--x-duration-fast`; the dot's center pops in on `--x-spring` (instant with reduced motion).

## Component tokens

`--x-options-columns`, `--x-option-dot`.

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
