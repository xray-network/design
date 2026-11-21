---
id: stagger
name: Stagger
summary: The items of a list enter one after another, 30ms apart, each rising a little as it fades in.
motion: 0
requires: [tokens]
components: []
files: [stagger.css, stagger.html, stagger.tsx]
---

# Stagger

For the moment a group of things appears: the rows of a menu, the cards of a dashboard, search results. A short
cascade reads as one arrival with a direction, where everything appearing at once reads as a flash. Only the
first five items are staggered; the rest arrive with the fifth, so a long list never makes people wait.

## Anatomy

```
*.x-stagger            any container: a list, a grid, a row
└── *                  each direct child enters in turn
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-from` | `start`: items slide in from the start side (side panels, rails) | items rise from 8px below |

## States

| State | Source | Look |
|---|---|---|
| entering | the container is inserted or shown | children fade in and rise, 30ms apart, on `--x-spring-soft` |

Leaving is not staggered: a group goes away together, on `--x-ease`.

## Accessibility

- Purely visual: content is in the DOM and readable from the first frame.
- The whole cascade ends within 400ms.

## Motion

Tier 0, CSS only: `@starting-style` gives each child its start, and `transition-delay` steps by a quarter of
`--x-duration-fast` (30ms) for children 2 to 5. Reduced motion: every duration and delay is 0.

## Component tokens

`--x-stagger-step`, `-distance`.

## Invariants

- For lists of more than three items; fewer simply appear.
- 30ms steps, five steps at most (protocol section 8).
- Entry only, once per appearance. Never on scroll, never looping.

## Safe edits

- The distance (`--x-stagger-distance`) and the direction (`data-from`).
- Which container gets it: usually the list inside a panel that just opened.

## Checklist

- [ ] Items arrive top to bottom, the sixth and later with the fifth
- [ ] Showing the group again replays the cascade; scrolling never does
- [ ] Reduced motion: everything is simply there; both themes
