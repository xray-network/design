---
id: replace
name: Replace
summary: Content changes in place, the old fading out and the new fading in, for a tab's panel, a step of a flow or a result.
motion: 1
requires: [tokens, motion]
components: []
files: [replace.css, replace.html, replace.controller.js, replace.controller.d.ts, replace.tsx]
---

# Replace

For a region that stays while what it holds changes: the panel under a row of tabs, the steps of a wizard, a
message that turns from "Checking…" to "Valid", a skeleton giving way to data. A hard cut reads as a glitch; a
short fade says the content was changed on purpose. The region's shape is not part of it: when the surface
itself changes size or place, that is Morph, and a whole screen changing is Screen.

## Anatomy

```
*.x-replace[data-replacing]     the region; its content is what changes
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| at rest | | the content |
| leaving | `data-replacing` | the old content fades out on `--x-ease`, `--x-duration-fast`; the region takes no input |
| arriving | | the new content fades in and rises 4px on `--x-spring-soft` |

## Accessibility

- The region is in the document throughout: only its content changes, so focus on the region or outside it is
  kept. Focus inside content that is replaced is lost: move it deliberately when that can happen.
- A change the person did not cause and should hear is announced: `role="status"` on the region.
- The content is swapped between the two fades, so it is never read half-and-half.

## Motion

Tier 1. `replace(el, change)` from the controller plays the fade out, runs `change`, and plays the arrival; the
React component does the same when its `id` changes. A change made mid-flight shows at once and the arrival
starts again. The region's height is not animated: when the new content is taller or shorter, what follows moves
at the swap, while nothing is on show. Reduced motion: instant.

## Component tokens

None.

## Invariants

- One thing fades out and one fades in, in turn, never across each other: text is never doubled.
- Only opacity and a 4px `translate` on the arrival. The content's own data never animates.
- Under 600ms in all, most of it the arrival.

## Safe edits

- What counts as a new content: the `id` (React), or when `replace()` is called.
- Wrapping only part of a surface, so a title stays while a body changes.

## Checklist

- [ ] The old content is gone before the new one shows; nothing overlaps
- [ ] Changing twice quickly ends on the last content, with no flash of the one in between
- [ ] Focus outside the region is untouched
- [ ] Reduced motion: an instant change; both themes
