---
id: sparkline
name: Sparkline
summary: A small line with no axes that shows the shape of a trend beside the number it belongs to.
motion: 0
requires: [tokens]
components: []
files: [sparkline.css, sparkline.html, sparkline.controller.js, sparkline.controller.d.ts, sparkline.tsx]
---

# Sparkline

For a glance: the last week of a price in a table row, the trend of a stat on a tile. It shows the shape only,
with no scale, so it always sits beside the number it explains and never stands alone. For values that must be
read, use LineChart.

## Anatomy

```
span.x-sparkline[data-values][data-trend][role=img][aria-label]
└── svg
    ├── path.x-sparkline-line      1.5px, muted
    └── circle.x-sparkline-dot     the last value, in the accent
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-trend` | `up`, `down`: the line takes the success or the danger color | neutral line, accent dot |
| size | `width` and `height` on the element | 96 by 24px |

## States

| State | Source | Look |
|---|---|---|
| drawn | the controller ran | the line and its dot |

## Accessibility

- `role="img"` with an `aria-label` that says what the line shows, in words ("Up 12% over 7 days"): without an
  axis, the label is the only way to read it.
- Decorative when the number beside it already says the same: then hide it with `aria-hidden`.

## Motion

Tier 0. None.

## Component tokens

`--x-sparkline-color`, `-dot`.

## Invariants

- Web: `sparklineShape()` in the controller gives the geometry; the HTML controller and the React component draw it.
- No axis, no readout: the label and the number beside it carry the values.
- About twelve points. More turns the shape to noise at this size.
- The trend colors mean direction; whether up is good is said in words or by a Delta beside it.
- Marks: A 1.5px line scaled to fill its box, and a dot on the last value.
- Text takes the text colors, never a series color.

## Safe edits

- The data, the height and the number format.
- The trend color, and the size.

## Checklist

- [ ] The label says in words what the line shows
- [ ] The dot is fully inside the box at both extremes
- [ ] Both themes; phone width
