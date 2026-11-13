---
id: toast
name: Toast
summary: Short, non-blocking feedback that leaves on its own.
motion: 1
requires: [tokens, motion]
components: [button]
files: [toast.css, toast.html, toast.controller.js, toast.controller.d.ts, toast.tsx]
---

# Toast

Confirms something that already happened ("Address copied") or reports a background failure
with one recovery action. Never for anything the user must read or decide; use a dialog or inline
error for that.

## Anatomy

```
section.x-toaster[popover=manual][aria-live=polite]   bottom center, top layer, click-through
└── div.x-toast[data-tone]                             40px min, 12px radius, panel surface
    ├── span.x-toast-dot (tone only)
    ├── p.x-toast-message
    ├── button.x-button[data-variant=chip]  (optional action)
    └── button.x-icon-button[data-size=xs][aria-label=Dismiss]
```

## Variants

| Option | Values | Default |
|---|---|---|
| `tone` | `success`, `danger`, `info` | neutral (no dot) |
| `duration` | ms, or `Infinity` | 4000; 6000 with an action |
| `action` | `{ label, onClick }` | none |
| `max` (toaster) | visible toasts | 3 |

## States

| State | Source | Look |
|---|---|---|
| entering | inserted | rises 16px from 0.96 on `--x-spring` (`@starting-style`) |
| stacked | siblings change | moves to its new place by FLIP on `--x-spring-soft` |
| closing | `data-state="closing"` | fades and shrinks on `--x-ease`, then removed |
| paused | pointer or focus inside the region | timers stop |

## Accessibility

- The region is `aria-live="polite"` and exists before the first toast, so screen readers announce messages.
- Messages are complete sentences without trailing periods; no "Success!" filler.
- Timers pause on hover and focus. Anything with an action stays at least 6 seconds.
- Never put the only path to an action in a toast.

## Motion

Tier 1. Entry and exit are CSS. Stack reflow uses `createFlip()` from `core/motion.js`
(Web Animations, soft spring). Reduced motion: no movement; toasts appear and disappear.

## Component tokens

`--x-toast-enter-y`, `--x-toast-radius`, `--x-toast-dot`.

## Invariants

- One toaster per app; one shared controller for HTML and React.
- The region is a manual popover (top layer) so toasts show above modal dialogs.
- Text only. No rich content, links in text, or images.

## Safe edits

- Position: change the region's `inset` (top center for mobile web apps); flip `--x-toast-enter-y`.
- Promise helper: `toast("Sending…", { duration: Infinity })`, then dismiss and toast the result.
- Different `max`.

## Checklist

- [ ] Rapid toasts stack smoothly; the oldest leaves after `max`
- [ ] Hover pauses; leaving resumes
- [ ] Shows above an open dialog
- [ ] Screen reader announces the message
- [ ] Both themes; reduced motion
