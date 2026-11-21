---
id: popover
name: Popover
summary: A small panel anchored to a trigger for extra detail or a short form; light-dismissed, never modal.
motion: 0
requires: [tokens, place]
components: []
files: [popover.css, popover.html, popover.controller.js, popover.controller.d.ts, popover.tsx]
---

# Popover

Extra detail or a quick action next to what it belongs to: a fee breakdown, a plan's details, a small
form to rename an account. It closes on outside click and Esc and never blocks the page. For a list of
actions use Menu; for a one-line hint use Tooltip; for anything that needs the user's full attention use Modal.

## Platform contract

Native GUI implementations use the platform's popover (UIPopoverPresentation, NSPopover, Compose Popup,
JavaFX PopupControl) anchored to the trigger, dismissed by outside tap and Escape/back, returning focus
to the trigger.

## Anatomy

```
button[popovertarget][aria-expanded]           any trigger
div.x-popover[popover][role=dialog][aria-labelledby]
  [data-placement=bottom|left|right]           the side it opens on; default top. Start-aligned above and
                                               below, centered beside; flips to the opposite side when out of room
├── p.x-popover-title (optional)               14/600, --x-fg-1
├── div.x-popover-body                         13px, --x-fg-2
└── ::after                                    the arrow: 10px rotated square in the panel fill, pointing at the
                                               trigger's center (data-side, --x-popover-arrow from the controller)
```

Panel: `--x-bg-panel`, hairline, 16px radius, 16px padding, 280px wide by default.

## States

| State | Source | Look |
|---|---|---|
| open | `:popover-open` | fades and rises in on `--x-spring` |
| trigger | `aria-expanded` on the trigger | follows the panel |

## Accessibility

- `role="dialog"` named by its title (`aria-labelledby`) or `aria-label`; it is not modal, so the page stays usable.
- Opening keeps focus on the trigger unless the panel has an element with `data-autofocus` (forms, confirmations).
- Esc and outside click close it (Popover API); closing returns focus to the trigger.

## Motion

Entry: opacity on `--x-duration-fast`, scale and rise on `--x-spring`. Exit: `--x-ease`, no overshoot.

## Component tokens

`--x-popover-width`; `--x-popover-arrow` (set by the controller).

## Invariants

- One popover open at a time (`popover="auto"`); no scrim, no shadow.
- Top layer through the Popover API; placed by the controller, 10px from the trigger, with an arrow.

## Safe edits

- Any content: text, a list, a short form.
- A wider panel through `--x-popover-width`.

## Checklist

- [ ] Opens and closes with mouse, keyboard and Esc; focus returns to the trigger
- [ ] Stays inside the viewport near edges
- [ ] Both themes
