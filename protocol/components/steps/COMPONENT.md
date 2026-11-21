---
id: steps
name: Steps
summary: Where the person is in a multi-step flow: a marker above each title, joined by a line that fills as steps complete.
motion: 0
requires: [tokens]
components: [spinner]
files: [steps.css, steps.html, steps.tsx]
---

# Steps

Shows the stages of a flow that takes several screens or panels: basket, delivery, payment. It says where
the person is and what is left. Completed steps can be buttons that go back; make them so only when going back
is safe. For a record of past events, use Timeline.

## Anatomy

```
ol.x-steps[aria-label]                     a row by default; data-orientation=vertical for a column
└── li.x-steps-item[data-state]            complete | current | upcoming | loading | error
    └── span|button|a.x-steps-trigger      a button or link only when the step can be revisited
        ├── span.x-steps-marker            32px circle: the number, a check, a cross or a Spinner
        ├── span.x-steps-title             centered under the marker (beside it when vertical)
        └── span.x-steps-description       optional
```

A 2px rounded line joins each marker to the next, stopping 6px short of both. It fills from the start once
its step is complete.

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-orientation` | `vertical`: markers in a column, text beside them | horizontal: text centered under each marker |
| `data-width` | `full`: equal columns across the container | 128px columns (`--x-steps-col`); the row is as wide as its steps and sits at the start |

On phones a horizontal row keeps the markers and titles; descriptions are hidden from view and still read out.

## States

| State | Source | Look |
|---|---|---|
| upcoming | `data-state="upcoming"` | muted marker with a hairline and its number; muted title |
| current | `data-state="current"`, `aria-current="step"` | marker filled in the text color (light on dark, dark on light) with its number and a 4px gray halo |
| complete | `data-state="complete"` | marker filled in the text color with a check; the line after it is filled the same |
| loading | `data-state="loading"`, `aria-current="step"`, `aria-busy="true"` | chip marker with a halo and a small Spinner in the text color |
| error | `data-state="error"` | danger marker with a cross; the description says what failed |
| can go back | `button` or `a` trigger | soft wash on hover; focus ring around the trigger |

## Accessibility

- An ordered list with a name (`aria-label="Checkout progress"`).
- `aria-current="step"` on the step in progress; `aria-busy="true"` while it is working.
- Check and cross markers carry a text alternative ("Completed", "Failed").
- Only steps that can be revisited are buttons or links; the rest are text, so Tab skips them.

## Motion

Tier 0. The line fills from the start on `--x-ease` (`--x-duration-slow`) when its step completes. The halo
springs out on `--x-spring` around the step in progress, and the check or cross pops in on the same spring.
Marker colors change on `--x-ease`. Reduced motion: instant.

## Component tokens

`--x-steps-marker`, `-col`, `-track`, `-fill`, `-on`, `-halo`, `-gap`, `-pad`.

## Invariants

- State comes from `data-state` (and `aria-current`), never from position or classes.
- One step in progress at a time: one halo.
- Neutral, not accent: steps are filled in the text color, so the row never competes with the screen's one
  accent action. Only the error state brings a color.
- Error is shown with an icon and text, never color alone.

## Safe edits

- Descriptions: any short line (a date, a count, the error).
- Which steps can be revisited: completed ones by default; none when going back is unsafe.
- Vertical orientation for long flows or narrow panels.

## Checklist

- [ ] Every state renders: upcoming, current, complete, loading, error
- [ ] Moving forward fills the line and pops the check; moving back empties it
- [ ] Completed steps that are buttons take focus and go back; others are skipped by Tab
- [ ] Phone width: titles wrap under their markers, descriptions are hidden from view
- [ ] Both themes; vertical orientation; reduced motion
