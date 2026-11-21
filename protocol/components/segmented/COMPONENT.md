---
id: segmented
name: Segmented
summary: Single choice between 2–5 short options, with a liquid sliding indicator.
motion: 1
requires: [tokens, motion]
components: []
files: [segmented.css, segmented.html, segmented.controller.js, segmented.tsx]
---

# Segmented

Picks one of 2–5 short, mutually exclusive options that switch a view in place: periods, filters,
panes (Send / Request / Schedule). For navigation between pages use links. For more than 5 options
use a select or a menu.

## Anatomy

```
.x-segmented  (role="radiogroup", 12px radius, hairline border, 3px padding)
├── label.x-segmented-item × n
│   ├── input[type=radio]   visually hidden, native keyboard and form behavior
│   └── span                label text [+ <i> muted count]
└── span.x-segmented-indicator   the liquid indicator, 8px radius: concentric with the track (aria-hidden)
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-size` | `sm` (26px items, 12px text) | 32px items, 13px text |
| `data-width` | `full` (items share the width equally) | content width |

## States

| State | Source | Look |
|---|---|---|
| selected | `input:checked` | active fill (indicator), `--x-fg-1` text |
| hover | `:hover` | text to `--x-fg-1` |
| focus | `input:focus-visible` | ring on the item's span |
| disabled item | `input:disabled` | 40% opacity |
| enhanced | `data-indicator="placing" \| "ready"` (set by JS) | fill moves from the item to the indicator |
| travel direction | `data-direction="forward" \| "backward"` (set by JS) | picks which edge leads |
| no room to overshoot | `data-settle` (set by JS) | the leading edge eases to rest instead of springing past it |

## Accessibility

- Native radios: arrow keys move the selection, Tab enters and leaves the group, values submit with forms.
- The group needs an accessible name (`aria-label` or `aria-labelledby`).
- Without JS the control is fully functional; only the sliding motion is missing.

## Views and lazy content

Options can carry views: `div.x-segmented-panels` right after the control holds one
`section.x-segmented-panel[data-value][aria-labelledby]` per option, and the selected option's panel shows. A view
renders the first time its option is selected and then stays rendered; `forceMount` (React) renders every view up
front. In HTML, lazy content goes in `<template data-lazy>`.

## Motion

Tier 1. `trackIndicator()` from `core/motion.js` measures the checked item and sets
`--x-ind-left` / `--x-ind-right`. The edge in the direction of travel moves on `--x-spring`, the
trailing edge on `--x-spring-soft` (slightly longer), so the indicator stretches toward the target and
settles. Between middle items the leading edge overshoots a little. At an end item there is no room for that:
the resting place, the track's padding away from the edge, is the destination, so the leading edge eases into it
on `--x-ease` (`data-settle`) and never touches the edge. The slide never shows a scrollbar or scrolls the track. First placement and resizes snap without animation. Reduced motion: instant.

## Component tokens

`--x-segmented-pad`, `-item-height`, `-item-pad`, `-font-size`, `-indicator-bg`, `-radius`, `-item-radius`.

## Invariants

- Native radio inputs stay. Do not replace them with buttons and click handlers.
- One indicator element; the per-item fill is only the no-JS fallback.
- Indicator stays under the labels (`isolation: isolate` + `z-index: -1`).
- Item and indicator corners are concentric with the track: change `--x-segmented-radius`, not the item radius.

## Safe edits

- Icons inside the item span; counts in `<i>`.
- Panels that follow the selection: `form:has(input[value="send"]:checked) [data-panel="send"]`
  works with no JS at all.
- A `tabs` look: change the radius tokens and add `--x-bg-faint` to resting items.
- In React, controlled (`value` + `onValueChange`) or uncontrolled (`defaultValue`).

## Checklist

- [ ] Click, arrow keys and Tab all work; focus ring visible on the item
- [ ] Indicator lands exactly on the item after resizing and font loading
- [ ] Both themes; disabled item; `sm` size; `full` width
- [ ] Reduced motion: no sliding
- [ ] With JS disabled, the checked item is filled
