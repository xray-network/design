---
id: screen
name: Screen
summary: Moving between the screens of a flow, forward, back or sideways, so people always know where they are in it.
motion: 1
requires: [tokens, motion]
components: []
files: [screen.css, screen.html, screen.controller.js, screen.controller.d.ts, screen.tsx]
---

# Screen

For a flow that lives in one place: a list and its detail, the steps of a checkout, the sections of a phone app.
The direction of the movement is the map. Going deeper, the new screen slides in from the end; going back, it
slides away again and uncovers where you came from; moving sideways between sections, one screen fades into the
next. Use it inside one view. Between pages of a site, the browser's own navigation is the transition.

## Anatomy

```
div.x-screens                               one place; clips whatever is on its way in or out
└── section.x-screen[data-screen][hidden]   one per screen; only the current one is in the layout
```

## Variants and sizes

| Direction | For | Movement |
|---|---|---|
| `forward` (default) | going deeper: a row to its detail, the next step | the new screen slides in from the end, over the old one, which eases back 24% and dims |
| `back` | coming out again | the old screen slides away to the end; the one under it comes forward with it, a quarter as far, and both land together |
| `fade` | sideways: tabs, sections at the same level | the old screen fades out, then the new one fades in |

## States

| State | Source | Look |
|---|---|---|
| current | no `hidden` | in view |
| leaving | `data-leaving`, for the length of the transition | still in the layout, inert, moving out |
| others | `hidden` | out of the layout and the accessibility tree; their state is kept |

## Accessibility

- Focus moves to the new screen: to its `[data-autofocus]` (its heading, usually), or to the screen itself.
- Name each screen (`aria-label`, or a heading) so the move is announced as a new place.
- The leaving screen is inert while it goes, and hidden after.
- Back is always a control on the screen, and where the app has routes, also the browser's back button.

## Motion

Tier 1. `screenTransition(from, to, { direction })` from the controller stacks the two screens and plays both
with `translate` and `opacity`. Forward, the screen that arrives travels on `--x-spring-soft`; the one that leaves
is an exit, on `--x-ease` and `--x-duration-slow`. Back, the two move as one: both on `--x-spring-soft` at 80% of
its duration, so they start and land together, the leaving screen crossing the whole width and the one under it a
quarter of it. A change made mid-flight finishes the running one first.
Reduced motion: the screens simply swap.

## Component tokens

`--x-screen-bg`: the screen's own background (the page canvas by default), so one screen can cover another.

## Invariants

- One screen in view. Two only while one replaces the other, and never more.
- Direction follows the hierarchy, never the order of the clicks: deeper is forward, out is back, level is fade.
- Screens keep their state and scroll position while hidden. Nothing loads because of the transition.
- A screen has an opaque background.

## Safe edits

- Which direction each navigation takes.
- The background, through the token.
- Wiring it to the app's router: the route decides `current`, and its history decides forward or back.

## Checklist

- [ ] Forward slides in from the end, back slides out to it, and the two feel like the same movement reversed
- [ ] Focus lands on the new screen; the old one cannot be tabbed into while it leaves
- [ ] Going back shows the previous screen as it was left, scroll position included
- [ ] Two quick navigations never leave two screens, or none, in view
- [ ] Reduced motion: an instant swap; both themes; phone width
