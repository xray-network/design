---
id: reorder
name: Reorder
summary: An item is dragged by its grip to a new place in a list while the others step aside, and it can be moved with the arrow keys too.
motion: 1
requires: [tokens, motion]
components: []
files: [reorder.css, reorder.html, reorder.controller.js, reorder.controller.d.ts, reorder.tsx]
---

# Reorder

For lists whose order is the person's own: accounts in a wallet, favorites, the steps of a routine, columns
of a table. The item in the hand rides under the finger, the others glide out of its way the moment it passes
their middle, and on release it springs into the gap. For a list that reorders itself (sorting, new data), use
Reflow.

## Anatomy

```
ul|ol.x-reorder
└── li[data-id][data-dragging]          an item; data-dragging while it is in the hand
    └── button.x-reorder-handle         the grip: 28px, two bars; the only part that picks the item up
```

## Variants and sizes

None. A vertical list; the items' own layout is the app's.

## States

| State | Source | Look |
|---|---|---|
| at rest | | the list |
| in the hand | `data-dragging` on the item | above the others, following the pointer along the list |
| stepping aside | another item passed this one's middle | glides to its new place on `--x-spring-soft` |
| let go | pointer up | springs into its place on `--x-spring` |

## Accessibility

- The grip is a button named for its item ("Move Savings"). Focused, ArrowUp and ArrowDown move the item one
  place; the grip keeps the focus, so it can go on moving.
- The DOM order is the real order at every moment of a drag, and after it.
- Say what happened where it matters, in a status region: "Savings moved to first".
- The rest of the item is not a drag target: its text selects and its controls work.

## Motion

Tier 1. The item in the hand is placed with `translate` under the pointer. When it passes another item's middle
the two change places in the DOM and the others play the difference away (FLIP) on `--x-spring-soft`; on
release the item springs the rest of the way on `--x-spring`. Reduced motion: places change at once.

## Component tokens

None.

## Invariants

- Only the grip starts a drag, and it takes the gesture (`touch-action: none`), so the page scrolls from
  anywhere else on the item.
- `reorder` fires once, on release or on a key press, and only when the place changed: `{ id, from, to, order }`
  (React: `onReorder` with the items in their new order).
- Every item has a `data-id` that is its own.
- One axis: items move along the list, not across it.

## Safe edits

- What an item holds and where its grip sits.
- What the new order does: save it, renumber, announce.

## Checklist

- [ ] The item stays under the pointer; others step aside as it passes their middle, never before
- [ ] Let go anywhere, it lands in the gap; the order reported matches what is on screen
- [ ] The arrow keys move an item from its grip, and the focus stays on the grip
- [ ] The page still scrolls when touched outside a grip
- [ ] Reduced motion; both themes; phone width
