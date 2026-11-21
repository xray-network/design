---
id: reflow
name: Reflow
summary: When a list changes order or gains and loses items, every item glides from where it was to where it is now.
motion: 1
requires: [tokens, motion]
components: []
files: [reflow.css, reflow.html, reflow.controller.js, reflow.controller.d.ts, reflow.tsx]
---

# Reflow

Keeps people oriented when a list rearranges under them: sorting, filtering, pinning, a new row arriving at the
top, a card removed from a grid. Items move from their old places to their new ones (FLIP: the layout changes at
once, and the difference is animated away), new items grow in, removed ones fade out where they were, and
nothing teleports.

## Anatomy

```
ul|ol|div.x-reflow          any layout: a column, a row that wraps, a grid; positioned, so items are measured in it
├── *                       the items, each a direct child that keeps its identity across the change
└── *[data-reflow-exit]     a removed item's copy (aria-hidden, inert), there only while it fades out
```

## Variants and sizes

None: the container's own layout decides where items go.

## States

| State | Source | Look |
|---|---|---|
| moved | an item's place changed | glides from the old place on `--x-spring-soft` |
| entered | a new direct child | fades in and grows from 96% while the others make room |
| removed | a direct child is gone | its copy stays where it was, out of the flow, and fades out at 96% while the others close the gap |

## Accessibility

- The DOM order is the real order: assistive technology reads the list as it is after the change.
- Announce what changed in words where it matters ("Sorted by amount"), with a status region.
- Movement is short and only on change; nothing loops.

## Motion

Tier 1. `reflow(list, change)` from the controller (or the React component, after every render) records where
each item is, lets the app change the DOM, and plays the difference:

- **Moved items** glide from their old place with `translate` on `--x-spring-soft`. Places come from layout
  (`offsetLeft`, `offsetTop`), so running animations and page scroll never skew them, and glides add up: a
  change made mid-flight continues from where the items are.
- **New items** fade in and grow on the same spring.
- **Removed items** leave a copy, out of the flow, that fades out on `--x-ease` and `--x-duration-base`.
- **What follows the list** glides too: the list's change in height is given back through its end margin.

Reduced motion: items are simply in their new places.

## Component tokens

None.

## Invariants

- Items keep their identity: the same element (HTML) or the same `key` (React) before and after.
- Items animate `translate`, `scale` and `opacity` only; an item's own size change is not animated. The one
  layout value that moves is the list's end margin.
- The change itself is instant in the DOM; the motion never delays the data.

## Safe edits

- Any layout for the container.
- What triggers the change: sort, filter, drag release, new data.

## Checklist

- [ ] Sorting moves every item along a straight path to its place; none jumps
- [ ] A new item fades in while the others make room; a removed one fades out while they close the gap
- [ ] A second change after the first has settled starts from the current places, not from older ones
- [ ] Changing again mid-flight continues from where items are, without a snap
- [ ] Reduced motion: no movement; both themes
