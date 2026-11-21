---
id: expand
name: Expand
summary: A region opens and closes by height while the content after it makes room, for details, extra options and long text.
motion: 0
requires: [tokens]
components: []
files: [expand.css, expand.html, expand.controller.js, expand.controller.d.ts, expand.tsx]
---

# Expand

For content that belongs where it is but not always in view: the breakdown under a total, advanced options in a
form, the rest of a long description, an error that appears under a field. The region grows to its content's
height and the page below moves down with it, so nothing jumps. For a list of titled sections that open one by
one, use Collapse; Expand is the bare movement, with a trigger of the app's choosing.

## Anatomy

```
div.x-expand[data-open][data-peek]      the region: a one-row grid whose row grows
└── div.x-expand-content                the content; clipped while the row is shorter than it
```

The trigger is anywhere: a button with `aria-expanded` and `aria-controls` pointing at the region.

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-peek` | present: closed, the first lines stay on show and fade out at the bottom | closed, nothing shows |

`--x-expand-peek` sets how much shows when peeking (4.5em: about three lines).

## States

| State | Source | Look |
|---|---|---|
| closed | no `data-open` | no height; the content is hidden from everyone (`visibility: hidden`) |
| open | `data-open` | the content's full height |
| peeking | `data-peek`, no `data-open` | `--x-expand-peek` tall, fading out at the bottom |

## Accessibility

- The trigger is a button with `aria-expanded`, and `aria-controls` naming the region.
- Closed content is out of the tab order and the accessibility tree. Peeking content stays readable: it is real
  text, cut short for the eye only, so do not put controls in the part that is cut off.
- The trigger stays where it is when the region opens, so the pointer and the focus do not lose it. Put it above
  the region, or directly under it.

## Motion

Tier 0, CSS only. The height is a grid row animating from `0fr` to `1fr` on `--x-ease` and `--x-duration-slow`,
which reaches the content's real height in every browser with nothing measured. The content fades on
`--x-duration-base`. A layout shift must not wobble, so there is no spring. Reduced motion: instant.

## Component tokens

`--x-expand-peek`.

## Invariants

- The state is `data-open` on the region. HTML: `initExpands()` wires triggers and fires `toggle` with `{ open }`.
  React: the `open` prop.
- The content keeps its own layout; the region adds no padding, border or background.
- Opening never scrolls the page and never moves what is above the region.

## Safe edits

- Any trigger: a button, a row, a "Show more" link-styled button, a switch.
- Peeking, and how much.
- Nesting: an Expand inside an Expand works.

## Checklist

- [ ] It opens to the content's exact height and closes to nothing (or to the peek); what follows moves with it
- [ ] Closed, its controls cannot be tabbed to
- [ ] Text inside rewraps correctly when the width changes while it is open
- [ ] Reduced motion: instant; both themes; phone width
