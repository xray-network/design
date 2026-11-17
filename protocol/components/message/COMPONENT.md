---
id: message
name: Message
summary: A notification card in the top-right corner, with a tone, title, text and an optional action; it leaves on its own or when dismissed.
motion: 1
requires: [tokens, motion]
components: [button]
files: [message.css, message.html, message.controller.js, message.controller.d.ts, message.tsx]
---

# Message

Tells the user about something that happened outside their current focus: a confirmed delegation,
a finished sync, a warning about their pool. It has room for a title, a sentence and one action.
For a one-line confirmation of what the user just did, use Toast. For a message tied to a place in
the page, use Alert.

## Anatomy

```
section.x-messages[popover=manual][aria-live=polite]   top right, 360px, top layer, click-through
└── div.x-message[data-tone][role]                     16px radius, panel surface
    ├── svg.x-message-icon (tone only)                 20px, tone color
    ├── div.x-message-content
    │   ├── p.x-message-title (optional)               14/600
    │   ├── p.x-message-text (optional)                13px
    │   └── div.x-message-actions (optional)           one chip Button
    └── button.x-icon-button[data-size=sm][aria-label=Dismiss]
```

## Variants

| Option | Values | Default |
|---|---|---|
| `tone` | `info`, `success`, `warning`, `danger` | neutral (no icon) |
| `duration` | ms, or `Infinity` | 6000; 10000 with an action |
| `action` | `{ label, onClick }` | none |
| `max` (region) | visible messages | 4 |

## States

| State | Source | Look |
|---|---|---|
| entering | inserted at the top | slides in 32px from the right on `--x-spring` (`@starting-style`) |
| stacked | siblings change | moves to its new place by FLIP on `--x-spring-soft` |
| closing | `data-state="closing"` | slides back out to the right and fades on `--x-ease`, then removed |
| paused | pointer or focus inside the region | timers stop |

## Accessibility

- The region is `aria-live="polite"` and exists before the first message. Warning and danger messages are `role="alert"`.
- Timers pause on hover and focus. Use `duration: Infinity` for anything the user must act on.
- The tone is never color alone: each tone has its icon, and the title says what happened.

## Motion

Tier 1. Entry and exit are CSS. Stack reflow uses `createFlip()` from `core/motion.js`.
Reduced motion: no movement; messages appear and disappear.

## Component tokens

`--x-message-tone`, `--x-message-enter-x`.

## Invariants

- One region per app; one shared controller for HTML and React (`<Messages />` + `message()`).
- The region is a manual popover (top layer), so messages show above modal dialogs.
- Text content only: title and text are plain strings.

## Safe edits

- Another corner: change the region's `inset` and flip `--x-message-enter-x`.
- A progress bar for the remaining time.
- A different `max` or default duration.

## Checklist

- [ ] The newest message is on top; the stack reflows smoothly
- [ ] Hover pauses the timer; leaving resumes
- [ ] Shows above an open dialog
- [ ] Full width on phones
- [ ] Both themes; reduced motion
