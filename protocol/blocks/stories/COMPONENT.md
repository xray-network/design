---
id: stories
name: Stories
summary: A row of round avatars that scrolls sideways, each ringed while it has something new to show.
motion: 0
requires: [tokens]
components: [avatar]
files: [stories.css, stories.html, stories.tsx]
---

# Stories

The strip at the top of a feed: who has posted something since you last looked. It scrolls sideways and never
wraps; a ring in the accent color means new, a hairline means seen.

The app supplies the people, their order (new first) and what opening one does.

## Anatomy

```
ul.x-stories[aria-label]                      scrolls sideways; no scrollbar
└── li
    └── button.x-stories-item[data-seen]      or an a, with href
        ├── span.x-stories-ring               the Avatar (52px) inside the ring
        └── span.x-stories-name               one line, shortened
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| new | no `data-seen` | a 2px ring in the accent ink |
| seen | `data-seen` | a hairline ring; the name is muted |

## Accessibility

- A list with a name; each item is a button or a link named by the person.
- New and seen differ by the ring's weight and the name's color, and the order says it too: new items come first.
- The avatars are decorative; the names carry the identity.

## Motion

Tier 0. The ring gives a little under the press. None otherwise.

## Component tokens

None.

## Invariants

- One row. It scrolls; it never wraps to a second line.
- The ring is the only color: no gradients.
- Names are one short word or a handle.

## Safe edits

- A plus badge on the first avatar for "add yours" (the Avatar's badge).
- The row's inline padding, to line up with the page.

## Checklist

- [ ] Ten items scroll sideways with no scrollbar and no page overflow
- [ ] Seen items are told apart without relying on color alone
- [ ] Both themes
