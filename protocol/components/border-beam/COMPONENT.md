---
id: border-beam
name: BorderBeam
summary: A short light that travels around a container's border to mark one featured element; decorative, opt-in.
motion: 0
requires: [tokens]
components: []
files: [border-beam.css, border-beam.html, border-beam.tsx]
---

# BorderBeam

Draws attention to one featured element: a new mini app card, a promoted plan, an onboarding step. A short
accent light runs around the container's border. It is decoration: the element must make sense without it.
It is the motion budget's one decorative loop (DESIGN-PROTOCOL.md §8), so use it at most once per screen.

## Platform contract

Native GUI implementations may draw the same traveling highlight along the container's rounded border, or
omit it; it never carries meaning. It stops when the platform's reduce-motion setting is on.

## Anatomy

```
.any-container (position: relative; border-radius)
└── span.x-border-beam[aria-hidden]          fills the container; shows only on its 1.5px border
    ::after                                   the light: a short gradient from --x-accent-ink to transparent,
                                              moving along the rounded border
```

## Accessibility

- `aria-hidden="true"`: purely decorative, never the only sign of anything.
- Hidden when motion is reduced (OS setting or `data-motion="reduce"` on an ancestor).

## Motion

A linear loop around the border, one lap in about 6s (`--x-border-beam-duration`). Allowed only as this
component; it does not move layout and stops entirely when motion is reduced.

## Component tokens

`--x-border-beam-size` (light length), `--x-border-beam-width` (border width), `--x-border-beam-duration`,
`--x-border-beam-color`.

## Invariants

- At most one beam per screen; never on controls, never on text.
- Follows the container's own `border-radius`; the container keeps its hairline.

## Safe edits

- Speed and length through the tokens; `data-direction="reverse"`.
- `--x-border-beam-color: var(--x-success)` for a success highlight.

## Checklist

- [ ] The element reads the same without the beam
- [ ] Gone when motion is reduced
- [ ] Only one on the screen
