---
id: switch
name: Switch
summary: On/off setting that applies immediately.
motion: 0
requires: [tokens]
components: []
files: [switch.css, switch.html, switch.tsx]
---

# Switch

A setting that takes effect immediately (hide balances, lock app, testnet). For choices that
apply on submit, use a checkbox. For one of several options, use Segmented.

## Anatomy

```
label.x-switch
├── input[type=checkbox][role=switch]   visually hidden, native behavior
├── span.x-switch-track (aria-hidden)   40×24 pill
│   └── span.x-switch-thumb             18px, white
└── span.x-switch-label                 optional visible label
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-size` | `sm` (32×20) | 40×24 |
| `data-label` | `start` (label first, switch at far end) | label after |

## States

| State | Source | Look |
|---|---|---|
| on | `input:checked` | accent track, thumb right |
| hover | `:hover` | track one step stronger |
| pressed | `:active` | thumb stretches 5px |
| focus | `input:focus-visible` | ring around the track |
| disabled | `input:disabled` | 40% opacity |

## Accessibility

- `role="switch"` on a native checkbox: screen readers announce on/off; Space toggles.
- Needs a name: visible label text or `aria-label`.
- The change must take effect immediately; never pair a switch with a Save button.

## Motion

Tier 0, CSS only. The thumb moves with `translate` on `--x-spring`. While pressed its width grows
by `--x-switch-stretch`; on release it springs across and back to round. The stretch scales
with `--x-press-scale`, so it is 0 when motion is reduced.

## Component tokens

`--x-switch-w`, `-h`, `-pad`, `-stretch`, `-track-off`, `-track-off-hover`, `-track-on`,
`-track-on-hover`, `-thumb-bg`.

## Invariants

- Native checkbox input stays; state comes from `:checked`, not classes.
- Thumb geometry is derived from the track tokens; change sizes through tokens only.

## Safe edits

- Label content (a description line under the label, an icon).
- Status colors for the on-track when the setting is risky (`--x-switch-track-on: var(--x-danger)`).

## Checklist

- [ ] Click label and track both toggle; Space toggles when focused
- [ ] Press-and-hold stretches the thumb in both positions
- [ ] Both themes; disabled; `sm`
- [ ] Reduced motion: no stretch, no slide
