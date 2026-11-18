---
id: skeleton
name: Skeleton
summary: Gray placeholders in the shape of content that is loading (text lines, avatars, blocks), with a soft pulse.
motion: 0
requires: [tokens]
components: []
files: [skeleton.css, skeleton.html, skeleton.tsx]
---

# Skeleton

Holds the place of content while it loads, in roughly its shape, so the layout does not jump when the data
arrives: a list of rows, a card, a table, a profile. Use it for loads under a few seconds where the shape is
known; for unknown shapes or actions in progress use Spinner.

## Platform contract

Native GUI implementations draw the same placeholder shapes in the chip color (redacted/placeholder views
where the platform has them), pulse them gently, stop the pulse when motion is reduced, and mark the region busy
for assistive technology.

## Anatomy

```
[aria-busy=true][aria-label="Loading …"]     the region that is loading
└── span.x-skeleton[data-shape][aria-hidden]  --x-bg-chip fill; pulses between full and 45% opacity
    data-shape=text                           one line of text: a 0.75em bar centered in the line's height, 6px radius
    data-shape=circle                         an avatar or icon: round, square aspect
    data-shape=rect (default)                 a block: card, image, button; 10px radius
div.x-skeleton-text                           several text lines, 8px apart; the last one 60% wide
```

Placeholders follow the structure, not the content: the UI knows what it will show (two lines and an amount per
row, a value under a label) but not the data yet. Give text bars varied widths from a stable pattern
(`skeletonWidth(seed)` in React) so they read as text of different lengths, and keep labels the UI already knows.
A text bar is exactly as tall as one line of the text around it, so nothing moves when the data arrives.

Width and height come from `--x-skeleton-width` and `--x-skeleton-height` (inline style) or the layout.

## Accessibility

- Every skeleton is `aria-hidden`; the region carries `aria-busy="true"` and a label ("Loading payments").
- When the content arrives, remove `aria-busy` so it is announced as normal content.

## Motion

A pulse of opacity over 1.4s (`--x-duration-slow` × 5), ease in and out, looping while loading. It is progress
feedback, so the motion budget allows the loop (DESIGN-PROTOCOL.md §8). Reduced motion stops the pulse; the
placeholders stay.

## Component tokens

`--x-skeleton-width`, `--x-skeleton-height`, `--x-skeleton-radius`.

## Invariants

- Neutral fill only (`--x-bg-chip`); no shimmer gradients, no color.
- Shapes approximate the content; never fake data (no gray text that looks like real numbers).

## Safe edits

- Any size and count; a mix of shapes for a card or a row.
- Showing it only after a short delay (200ms) so fast loads never flash it.

## Checklist

- [ ] The region is busy and labelled; skeletons are hidden from screen readers
- [ ] No layout jump when content replaces it
- [ ] The pulse stops when motion is reduced
