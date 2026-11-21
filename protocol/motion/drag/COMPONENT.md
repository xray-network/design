---
id: drag
name: Drag
summary: Something follows the finger along one axis and settles on the spring when let go, for sheets, drawers and rows that swipe away.
motion: 1
requires: [tokens, motion]
components: []
files: [drag.css, drag.html, drag.controller.js, drag.controller.d.ts, drag.tsx]
---

# Drag

Direct manipulation: a bottom sheet pulled up and down between heights, a notification swiped away, a drawer
pushed back to the edge. While the finger is down the element is exactly under it; when it lets go, the element
carries on with the speed it was given and settles. That handover, from the hand to the spring, is the pattern.

## Anatomy

```
*.x-drag[data-axis][data-dragging]     any element; moved with translate
└── span.x-drag-handle                 optional grabber: a 28px strip across the top with a 36 by 4px bar; when present, only it starts a drag
```

## Variants and sizes

| Option (HTML attribute) | Values | Default |
|---|---|---|
| `axis` (`data-axis`) | `x`, `y` | `x` |
| `snap` (`data-snap`) | resting places, as offsets in px: `0 240` | `0` |
| `dismiss` (`data-dismiss`) | `start` (left or up), `end` (right or down), `both` | cannot be thrown away |
| handle | a `.x-drag-handle` inside: only it starts a drag | the whole element |
| `start` (controller), `place` (React) | where it rests to begin with; in React, changing `place` springs it to that resting place | offset 0 |

## States

| State | Source | Look |
|---|---|---|
| at rest | a resting place | `translate` at that offset |
| dragging | `data-dragging` (after 6px of movement) | follows the pointer; grabbing cursor, no text selection |
| held back | pulled past the last resting place, on a side it cannot leave by | stretches like a rubber band: less and less, 40px at most |
| settling | released | springs to the nearest resting place, judged by where the throw would end |
| leaving | `data-leaving`: thrown a third of its size past the end, on a `dismiss` side | fires `leave`, then flies out on `--x-ease`, fading |
| dismissed | the flight has ended | gone (it stays out of sight until the app acts); fires `dismiss` |

## Accessibility

- A drag is never the only way. Every dismissal has a button (or Esc) and every resting place can be reached
  without dragging: the pattern adds a gesture, it does not replace a control.
- A press that does not move 6px is still a press: buttons and links inside keep working, and a drag that did
  move swallows the click that follows it.
- Across its axis the page scrolls as usual (`touch-action`); fields inside never start a drag.
- A sheet is still a dialog: give it the role, a name, and focus handling, or build it on Modal.

## Motion

Tier 1. `bindDrag()` from the controller sets `translate` under the pointer, measures the release speed from the
last moves, and plays the rest: to a resting place on `--x-spring` (the one place the overshoot is earned: it is
the hand's own momentum), or away on `--x-ease` and `--x-duration-slow`. Catching it mid-settle continues from
where it is. Reduced motion: it follows the finger, and jumps to rest on release.

## Component tokens

None.

## Invariants

- One axis. The element moves only by `translate`; layout does not change while it is dragged.
- The pattern reports and never decides: `settle` gives `{ offset, index }`; `leave` (it was just thrown) and
  `dismiss` (it has gone) give `{ direction }` (HTML: events on the element; React: `onSettle`, `onLeave`,
  `onDismiss`). Removing a dismissed element is the app's job. Remove it on `dismiss`; or, in a list that animates
  its own changes (Reflow), on `leave`, so the gap closes while the row is still flying, with no wait.
- The flight out is a CSS animation, so a copy of the element (Reflow's stand-in for a removed row) continues it.
- Resting places are offsets from where the layout puts the element, so the layout decides the open position.
- A sheet reaches at least 48px past the edge it is attached to (a bottom sheet is taller than it looks), so
  neither a pull past its open place (40px at most) nor the spring's overshoot ever shows a gap behind it.

## Safe edits

- The axis, the resting places and the sides it can leave by.
- Moving it from code (`moveTo(offset)`; React: the `place` prop): a button that opens, collapses or closes a
  sheet takes the same spring as the hand does.
- Whether the whole element or only the grabber starts the drag.
- What a dismissal does: remove a row (inside a Reflow, the others close the gap), close a sheet, archive.

## Checklist

- [ ] It stays under the finger while dragged, and a short flick throws it as far as a long drag
- [ ] Let go anywhere, it comes to rest on a resting place; pulled past the end it is held back and returns
- [ ] Letting go outside the element, or outside the window, still ends the drag; nothing follows a pointer with no button down
- [ ] Caught while it settles, it carries on from where it is, with no jump
- [ ] Buttons inside still work; a drag does not trigger them
- [ ] Every outcome also has a button or a key
- [ ] Vertical page scroll still works over a horizontal drag; reduced motion; both themes
