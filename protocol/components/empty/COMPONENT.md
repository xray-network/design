---
id: empty
name: Empty
summary: The empty state of a list, table or screen, with an icon in a soft circle, a title, a hint and an optional action.
motion: 0
requires: [tokens]
components: []
files: [empty.css, empty.html, empty.tsx]
---

# Empty

What a region shows when it has nothing yet: no payments, no search results, no mini apps added. It
says what is missing and, when possible, how to fill it. Inside Table use its `empty` row instead.

## Platform contract

Native GUI implementations center the same stack (icon, title, hint, action) in the empty region, use
platform text styles for title and hint, and keep the action a real button.

## Anatomy

```
div.x-empty                     centered column, 32px padding
├── span.x-empty-icon           48px circle, --x-bg-chip, 24px outline icon in --x-fg-3
├── p.x-empty-title             15/600, --x-fg-1
├── p.x-empty-description       13px, --x-fg-3, max 36ch
└── div.x-empty-actions         buttons, 16px above
  [data-size=sm]                smaller icon and text, 20px padding: for cards and menus
```

## Accessibility

- The title is plain text (not a heading) unless the empty state replaces a whole page.
- The icon is decorative (`aria-hidden`).

## Motion

None.

## Component tokens

`--x-empty-icon-size`.

## Invariants

- Centered; icon, title, hint, action in that order.
- No illustration beyond the outline icon; no color other than text tones.

## Safe edits

- Another outline icon, or none.
- Left alignment in narrow side panels.

## Checklist

- [ ] Says what is missing and what to do next
- [ ] Action, if any, is a real button or link
