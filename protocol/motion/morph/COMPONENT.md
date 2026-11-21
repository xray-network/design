---
id: morph
name: Morph
summary: One element becomes another, as when a card grows into its detail view and shrinks back, so the person never loses track of what they opened.
motion: 1
requires: [tokens, motion]
components: []
files: [morph.css, morph.html, morph.controller.js, morph.controller.d.ts, morph.tsx]
---

# Morph

A shared-element transition. The thing that was pressed turns into the thing that opens: a list row into a
detail panel, a thumbnail into a full picture, a button into the form it reveals. One surface grows from the
source's box to the target's, its corners changing on the way, and the content changes under it; closing runs the
same path back. Nothing is scaled, so text and borders stay crisp. Use it where the two elements are the same
object at two sizes. Unrelated content should simply appear.

## Anatomy

```
div.x-morph[data-open]
├── div.x-morph-from      the small form (a card, a row, a button), at the group's top left; hidden from view while open
└── div.x-morph-to        the large form, over the small one; in the layout only while open (hidden otherwise)
```

The two share one place, so the group is as large as the form that shows. Where the target sits is the app's
choice: in the source's place, or over the content around it (`data-cover`: it covers the `.x-morph` box).

The surface is the form itself when it has a border, a background or a radius; a bare wrapper lends its only
child's (a Button inside `.x-morph-from`). While a morph runs, the controller adds one `div[aria-hidden]` after
the target: the frame that draws the moving edge. It is removed when the morph ends.

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-cover` | present: the target covers the whole `.x-morph` box, over its other content | the target opens in the source's place, and what follows the group makes room |

## States

| State | Source | Look |
|---|---|---|
| closed | no `data-open` | the source shows; the target is `hidden` |
| open | `data-open` | the target shows; the source keeps its place and is hidden from view |
| closing | `data-open`, until the morph back ends | the target is still in the layout, shrinking into the source |

## Accessibility

- The source is a button (or holds one) with `aria-expanded`; the target holds a way back.
- Focus moves into the target when it opens and back to the source when it closes.
- The hidden one of the two is out of the accessibility tree (`hidden`, or `visibility: hidden`), so content is
  never read twice.

## Motion

Tier 1. `morph(from, to)` from the controller measures both forms and runs three things together:

- **The window.** The target stays laid out at its real size and is shown through a `clip-path` window that
  travels from the source's box to the target's, with the corner radius going from one to the other.
- **The frame.** An empty box on the window's edge draws the border the window cuts off.
- **The fade-through.** The frame's veil, in the surface's own color, closes over the old content while the
  window is small, the forms change places under it, and it lifts off the new content as the window arrives. No
  half-revealed text is ever on show. When the two surfaces differ in color (a filled button into a panel), the
  veil goes from one color to the other on the way, so the surface is seen to change, not to vanish. Surfaces
  with no background color cross-fade instead.

Opening runs on `--x-spring-soft`. Closing is an exit: `morph(from, to, { open: false })` on `--x-ease` and
`--x-duration-slow`, starting with the veil. A morph started mid-flight continues from where the window is. In
place (no `data-cover`), the room the group takes in the flow follows the morph, so what comes after it glides;
a group that is positioned out of the flow is left where it is.
Reduced motion: the swap is instant.

## Component tokens

None.

## Invariants

- One morph at a time per region, and never over 600ms.
- The two elements are the same object: same title, same picture. Otherwise use a plain appearance.
- Nothing is scaled and no content slides: only the window, the frame and opacity animate. The frame is an empty
  box outside the flow; the one layout value that moves is the group's end margin, when the target opens in place.
- `morph()` resolves `true` when it ran to the end and `false` when another morph took over; swap the forms back
  only on `true`, in the same task, so the swap lands before the next paint.

## Safe edits

- What the two forms contain.
- Covering the group (`data-cover`) or expanding in place.
- A scrim behind a covering target, faded on `--x-ease`.

## Checklist

- [ ] Opening starts exactly at the source's box, border and radius included; closing ends exactly on it
- [ ] Text is never squeezed, and never cut by the moving edge while it is readable
- [ ] Focus moves in on open and back on close; Esc closes
- [ ] Quick open-close-open never leaves both or neither visible
- [ ] Reduced motion: instant swap; both themes
