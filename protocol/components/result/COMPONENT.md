---
id: result
name: Result
summary: The outcome of a finished flow, with an animated status mark (ring, then check or cross), title, text and actions.
motion: 0
requires: [tokens]
components: []
files: [result.css, result.html, result.tsx]
---

# Result

The end of a flow: account added, payment sent, card declined, nothing to claim. It sits in a dialog or
fills a screen, says what happened, and offers the next step. The mark draws itself once: the ring, then the
check or cross (after the XRAY app's success and error marks).

## Platform contract

Native GUI implementations draw the same ring and mark with the status color, animate the stroke once on
appearance (skipped when motion is reduced), center title, text and actions, and announce the title.

## Anatomy

```
div.x-result[data-status][role=status]            centered column, 24px padding
├── svg.x-result-icon                             96px (64px when sm); 100×100 viewBox
│   ├── circle.x-result-ring                      r 44, stroke 6, drawn first
│   └── path.x-result-mark[data-step]             check, cross (2 strokes), i or !; drawn after the ring
├── p.x-result-title                              22/700, --x-fg-1
├── p.x-result-description                        14px, --x-fg-3, max 42ch
└── div.x-result-actions                          buttons, 24px above
```

## Variants

| Attribute | Values |
|---|---|
| `data-status` | `success` (`--x-success`), `error` (`--x-danger`), `info` (`--x-accent-ink`), `warning` (`--x-warning`), `loading` (an open `--x-accent` ring that turns, the Spinner's blue; `aria-busy="true"`) |
| `data-size` | `sm`: 64px mark, 18px title; for cards and popovers |

## Accessibility

- `role="status"` so the outcome is announced; errors that need action may use `role="alert"`.
- The mark is decorative (`aria-hidden`): the title says the outcome in words.
- Move focus to the primary action when the result replaces a form.

## Motion

Loading: the open ring turns once per 700ms, linear, until the status changes (progress, kept when motion is
reduced). Otherwise once, on appearance: the ring draws over `--x-spring-soft-duration` with `--x-ease`, then each mark stroke
over `--x-duration-slow`. Every step stays under 600ms; reduced motion shows the finished mark.

## Component tokens

`--x-result-color`, `--x-result-icon-size`.

## Invariants

- Ring then mark, drawn once; never looping.
- Status color only on the mark; title and text keep their text colors.

## Safe edits

- No actions, for results that close themselves.
- Extra content (a payment id, a summary list) between the description and the actions.

## Checklist

- [ ] The title states the outcome without the mark
- [ ] Reduced motion shows the complete mark at once
- [ ] Both themes
