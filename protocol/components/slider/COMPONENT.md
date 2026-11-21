---
id: slider
name: Slider
summary: One value picked by dragging a thumb along a track, on a native range input.
motion: 0
requires: [tokens]
components: []
files: [slider.css, slider.html, slider.controller.js, slider.controller.d.ts, slider.tsx]
---

# Slider

A value where the rough position matters more than the exact number: a fee level, a share of a balance,
a volume. When the exact number matters, use an input (with a slider beside it if both help).

## Anatomy

```
div.x-slider
├── div.x-slider-head                  optional
│   ├── label.x-slider-label[for]
│   └── output.x-slider-value[for]     the current value, formatted
├── input.x-slider-input[type=range]   native; the filled part follows --x-slider-fill
└── div.x-slider-marks                 optional scale labels, spread evenly
    └── span
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-size` | `sm` (16px thumb) | 20px thumb |

## States

| State | Source | Look |
|---|---|---|
| filled part | `--x-slider-fill` on the input (0%–100%) | accent from the start to the thumb |
| hover | `:hover` | thumb border steps up |
| pressed | `:active` | thumb grows 10% on the spring |
| focus | `:focus-visible` | ring around the thumb |
| disabled | `:disabled` | 40% opacity |

## Accessibility

- A native `input[type=range]`: arrows, Page Up/Down, Home and End work, and screen readers announce the value.
- Name it with the label (`for`), or `aria-label`. Set `aria-valuetext` when the number alone is unclear ("Fast, 2.4 gwei").
- The visible value is an `<output>` tied to the input.

## Motion

Tier 0. The thumb grows on `--x-spring` while pressed and settles back. The fill follows the thumb with no
transition. Reduced motion: no growth.

## Component tokens

`--x-slider-track-h`, `-thumb`, `-track`, `-fill-bg`, `-thumb-bg`, `--x-slider-fill`.

## Invariants

- The native range input stays: no custom drag handling.
- The filled part comes from `--x-slider-fill`, kept current by the controller (HTML) or the component (React).

## Safe edits

- Marks: any number of labels, or none.
- The value text: units, words for steps ("Slow", "Fast").
- Fill color for risky ranges (`--x-slider-fill-bg: var(--x-danger)`).

## Checklist

- [ ] Drag, click on the track, arrows and Home/End all move the value; the fill follows
- [ ] The output shows the formatted value
- [ ] Both themes; `sm`; disabled
- [ ] Reduced motion: the thumb does not grow
