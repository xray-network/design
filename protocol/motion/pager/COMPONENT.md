---
id: pager
name: Pager
summary: Pages side by side that are swiped through and snap into place, with dots that say where you are.
motion: 1
requires: [tokens, motion]
components: []
files: [pager.css, pager.html, pager.controller.js, pager.controller.d.ts, pager.tsx]
---

# Pager

For a short run of things of the same kind, one in view at a time: onboarding steps, the cards in a wallet, a
set of pictures, highlights on a dashboard. The finger moves the pages directly and the track stops on one. The
movement is the platform's own scrolling, snapping and momentum, so it feels like every other scroll on the
device. For the steps of a task, where order and going back matter, use Screen.

## Anatomy

```
div.x-pager[data-peek][role=group][aria-roledescription=carousel]
├── ul.x-pager-track[tabindex=0]             the scroller; snaps to pages
│   └── li.x-pager-page[role=group][aria-roledescription=slide][aria-label="1 of 3"]
└── div.x-pager-dots                          optional
    └── button.x-pager-dot[aria-current]      6px; the current one 18px wide
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-peek` | present: pages are 84% of the track, so the next shows at the edge | pages fill the track |

`--x-pager-gap` is the space between pages.

## States

| State | Source | Look |
|---|---|---|
| current page | the page nearest the start of the track | its dot is wide and strong (`aria-current="true"`) |
| scrolling | the finger, a wheel, a dot, the arrow keys | the track moves; it stops on a page |
| dragged | `data-dragging` on the track: a mouse press that moved 6px | the track follows the pointer, snapping off; a grabbing cursor |

## Accessibility

- The root is a group with `aria-roledescription="carousel"` and a name; each page is a `slide` labelled with its
  place ("2 of 3").
- The track takes the focus: ArrowLeft and ArrowRight go a page at a time. Every dot is a button named by its page.
- Nothing moves on its own: no autoplay. A pager that advanced by itself would need a pause control.
- Content on pages out of view is still in the document; keep interactive content to the page in view where the
  order of focus matters.

## Motion

Tier 1, but the movement is native: `scroll-snap` on the track, and a smooth `scrollTo` when a dot, a key or code
picks a page. The controller only watches where the track stops. A mouse, which has no swipe of its own, can
drag the track: it follows the pointer, and on release glides to the nearest page, or after a quick flick to the
next one that way. The current dot widens on `--x-spring`.
Reduced motion: going to a page jumps; the person's own swipe still scrolls, as the platform decides.

## Component tokens

`--x-pager-gap`.

## Invariants

- The controller never moves the track on its own and never fights a swipe. Touch and trackpads scroll it
  natively; only a mouse is given the drag.
- A mouse press that does not move 6px is still a press: links and buttons on a page work, and a drag swallows
  the click that would follow it.
- One page per stop (`scroll-snap-stop: always`): a hard flick goes one page, not five.
- `change` fires with `{ index }` when the track stops on another page (React: `onIndexChange`).
- A handful of pages. Past seven or so the dots stop saying where you are: use a list.

## Safe edits

- Peeking, and the gap.
- Hiding the dots when the pager has its own controls (previous, next, a counter).
- The page's own height: the track is as tall as its tallest page.

## Checklist

- [ ] A swipe stops on a page; a hard flick goes one page
- [ ] A mouse drags the track: let go, it glides to the nearest page; flicked, to the next; buttons on a page still work
- [ ] The dots follow the track, and a dot goes to its page
- [ ] Arrow keys move a page when the track has the focus
- [ ] Vertical page scrolling still works over the pager
- [ ] Reduced motion; both themes; phone width
