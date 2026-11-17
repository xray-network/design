---
id: pagination
name: Pagination
summary: Previous, a page-number input and next in one joined control, with the page and item count.
motion: 0
requires: [tokens]
components: []
files: [pagination.css, pagination.html, pagination.tsx]
---

# Pagination

Moves through a long table or list one page at a time, or jumps to a page by number. It usually sits
in a Table's footer.

## Anatomy

```
nav|form.x-pagination[aria-label]                      12px muted text
├── span.x-pagination-control                         24px joined control; outer corners 8px
│   ├── a|button.x-pagination-step[aria-label]        previous
│   ├── input.x-pagination-input[type=number]         40px, centered page number
│   └── a|button.x-pagination-step[aria-label]        next
└── span.x-pagination-count                           "16 pages · 312 items" or "Page 7"
```

## Modes

| Mode | When | Look |
|---|---|---|
| Pages | the total is known | input editable (1 to last); count "N pages · M items" |
| Cursor | the total is unknown (`pageCount` omitted, `hasNext` given) | input read-only; count "Page N"; only neighbours reachable |

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` on an arrow or the input | hairline to `--x-border-hover`, arrow to `--x-fg-1` |
| focus (input) | `:focus` | input border to `--x-focus`, no ring |
| no previous / next | `disabled` or `aria-disabled="true"` | arrow to `--x-fg-4` |
| loading | `disabled` (React) | everything disabled |

## Behavior

- React: typing a number and pressing Enter (or leaving the box) goes to that page, clamped to 1…last; invalid input
  falls back to the current page.
- HTML: the control is a GET form, so Enter submits `?page=N`; the arrows are links to the neighbouring pages.

## Accessibility

- A navigation landmark with a label (`nav`, or `form role="navigation"`).
- Arrows and the input have their own labels ("Previous page", "Page number").
- After changing pages in place, move focus to the start of the new rows.

## Motion

None beyond color on `--x-duration-fast`.

## Component tokens

`--x-pagination-size`.

## Invariants

- Arrows stay in place at the ends, disabled, so the layout does not jump.
- One joined control: neighbours share a hairline; only the outer corners are rounded.

## Safe edits

- A page-size Select after the count.
- Centered or right-aligned in its container.
- Larger control (`--x-pagination-size: 32px`) in touch-first layouts.

## Checklist

- [ ] Enter and blur commit the typed page; out-of-range numbers clamp
- [ ] Arrows disabled on the first and last page; cursor mode reaches only neighbours
- [ ] Count reads "1 page" / "1 item" in the singular
- [ ] Both themes
