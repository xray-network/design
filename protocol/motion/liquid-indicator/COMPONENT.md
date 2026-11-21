---
id: liquid-indicator
name: LiquidIndicator
summary: One pill that slides between items and stretches on the way, so a selection reads as a single thing that moved.
motion: 1
requires: [tokens, motion]
components: []
files: [liquid-indicator.css, liquid-indicator.html, liquid-indicator.controller.js, liquid-indicator.controller.d.ts, liquid-indicator.tsx]
---

# LiquidIndicator

The kit's signature motion: a selection is one object that travels, not two states that cross-fade. The edge in
the direction of travel leads, the other edge follows on a softer spring, so the pill stretches toward its target
and settles. Segmented uses it for options; this pattern is the same motion for anything else that has one
current item: a tab bar, navigation pills, a filter row, a toolbar.

## Anatomy

```
div|nav.x-liquid-indicator[data-indicator][data-direction]
├── button|a.x-liquid-indicator-item[aria-current]     any content: a label, an icon, both
└── span.x-liquid-indicator-pill (aria-hidden)         the one indicator, under the items
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-width` | `full`: items share the width equally (a tab bar) | content width |
| `data-layout` | `stack`: icon above label in each item | icon beside label |

## States

| State | Source | Look |
|---|---|---|
| current | `aria-current` on one item | strong text; the pill sits under it |
| hover | `:hover` | strong text |
| focus | `:focus-visible` | ring inside the item |
| before JS | no `data-indicator` | the current item has its own fill; nothing is lost without the controller |

## Accessibility

- Navigation: `nav` with links and `aria-current="page"`. A choice: buttons with `aria-current="true"`.
- The pill is decorative (`aria-hidden`); the current item is known from `aria-current`, not from the pill.
- Arrow keys are not needed: every item is in the Tab order.

## Motion

Tier 1. `trackIndicator()` from `core/motion.js` measures the current item and sets `--x-ind-left` and
`--x-ind-right`. The leading edge moves on `--x-spring` (85% of its duration), the trailing edge on
`--x-spring-soft` (110%). Between middle items the leading edge overshoots a little. At an end item
there is no room for that: the resting place, the track's padding away from the edge, is the destination, so the
leading edge eases into it on `--x-ease` (`data-settle`, set by JS) and never touches the edge.
First placement and resizes snap. Reduced motion: instant.

## Component tokens

`--x-liquid-indicator-pad`, `-item-height`, `-item-pad`, `-radius`, `-pill-bg`.

## Invariants

- One pill per group; it travels, it never fades out in one place and in at another.
- The pill stays under the labels, and is drawn on a spring only for position: color changes use `--x-ease`.
- State is `aria-current`; the controller reads it and never invents it.

## Safe edits

- Item content, and the pill's fill and radius through tokens (an accent wash for navigation).
- `stack` layout for a mobile tab bar.
- Which element is current: from the route, or from a click (the controller moves `aria-current` on click unless
  the item is a link).

## Checklist

- [ ] The pill lands exactly on the item after resizing and font loading
- [ ] Moving between far items stretches and settles; moving back does the same in reverse
- [ ] No overflow or scrollbar at the first and last item
- [ ] Without JS the current item is still marked; reduced motion: no slide
- [ ] Both themes
