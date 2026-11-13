---
id: chips
name: Chips
summary: Filter chips on native radios or checkboxes; they wrap onto several lines.
motion: 0
requires: [tokens]
components: []
files: [chips.css, chips.html, chips.tsx]
---

# Chips

Filters above a list or grid: transaction types, chains, categories. Chips wrap, so they suit
longer or changing sets. For 2–5 fixed options that switch a view, use Segmented.

## Anatomy

```
div.x-chips[role=radiogroup|group][aria-label]     wraps, 8px gaps
└── label.x-chip
    ├── input[type=radio|checkbox]                 visually hidden, native behavior
    └── span                                       32px, 10px radius, hairline; label [+ <i> count]
```

## States

| State | Source | Look |
|---|---|---|
| resting | — | hairline border, `--x-fg-2` text |
| hover | `:hover` | border to `--x-border-hover` |
| on | `input:checked` | `--x-bg-active` fill, no border, `--x-fg-1` text |
| focus | `input:focus-visible` | ring on the chip |
| disabled | `input:disabled` | 40% opacity |

## Accessibility

- Radios for one choice (`role="radiogroup"`), checkboxes for several (`role="group"`); both need a group label.
- Native keyboard: arrows within radios, Space on checkboxes; values submit with forms.
- Include an "All" chip for single-choice filters instead of allowing nothing selected.

## Motion

Tier 0. Fill, border and text color on `--x-duration-fast`. No sliding indicator: chips wrap, so one would jump between lines.

## Component tokens

`--x-chip-height`.

## Invariants

- Native inputs stay; state comes from `:checked`.
- 32px tall, 10px radius, weight 600. The selected chip is filled gray, never accent blue.

## Safe edits

- A leading icon or status dot inside the span.
- Filtering with no JS: `main:has(#f-sent:checked) .tx:not(.sent) { display: none }`.

## Checklist

- [ ] Keyboard selection works; focus ring visible
- [ ] Chips wrap cleanly at phone width
- [ ] Both themes; disabled chip
