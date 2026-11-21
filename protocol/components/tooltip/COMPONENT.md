---
id: tooltip
name: Tooltip
summary: Short label on hover and keyboard focus, for icon buttons and compact values.
motion: 0
requires: [tokens, place]
components: []
files: [tooltip.css, tooltip.html, tooltip.controller.js, tooltip.controller.d.ts, tooltip.tsx]
---

# Tooltip

Names an icon-only control ("Copy address") or adds a short fact to a compact value ("Ends in
4d 07h"). Never the only place for information someone needs, and never interactive: no links or
buttons inside. For richer content, use a Menu or a Dialog.

## Anatomy

```
trigger[data-x-tooltip=<id>]                     any focusable element
div.x-tooltip#<id>[popover=manual]               8px radius, panel surface, hairline, 12/600, no pointer events
  [data-placement=bottom|left|right]             the side it shows on; default top, centered; flips when out of room
  ::after                                        8px arrow pointing at the trigger's center (data-side, --x-tooltip-arrow)
```

## Variants

| Use | Markup |
|---|---|
| Label: repeats the trigger's `aria-label` | tooltip `aria-hidden="true"` |
| Description: adds information | tooltip `role="tooltip"`; trigger `aria-describedby="<id>"` |

## Behavior

- Shows at once on hover and on keyboard focus (`:focus-visible`); fades in on `--x-duration-fast`.
- Hides on pointer leave, blur, click and Esc.
- Above the trigger, centered; below it when there is no room above; clamped to the viewport.

## Accessibility

- The trigger must be focusable and have its own name; the tooltip never replaces `aria-label`.
- Pick the right kind (label or description) so screen readers do not read the text twice.
- Touch has no hover: never hide something essential in a tooltip.

## Motion

Tier 0. Fades and moves 2px toward the trigger on `--x-duration-fast`. Reduced motion: instant.

## Component tokens

`--x-tooltip-shift`.

## Invariants

- Manual popover in the top layer, positioned by the shared controller (`bindTooltip`).
- Plain text, one or two lines; no interactive content.

## Safe edits

- Live values (countdowns): update the tooltip's text while open; tabular digits keep its width.
- A hover delay for dense toolbars: wrap `show` in a timer in the controller.

## Checklist

- [ ] Hover and keyboard focus show it at once; Esc hides it
- [ ] Near the top edge it flips below; never off-screen
- [ ] Screen reader reads the name once
