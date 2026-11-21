---
id: progress
name: Progress
summary: A bar for how far a task has come, and a meter for a reading on a fixed scale, colored by level.
motion: 0
requires: [tokens]
components: [skeleton]
files: [progress.css, progress.html, progress.tsx]
---

# Progress

Two bars that look alike and mean different things:

- **Progress** (`role="progressbar"`): how far a task with a known length has come: an upload, a sync, a
  verification. For work of unknown length, use Spinner.
- **Meter** (`role="meter"`): a reading on a fixed scale that is not a task: storage used, a spending limit,
  a plan's quota. Its color says whether the level is fine, close to the limit or over it.

## Anatomy

```
div.x-progress[role=progressbar|meter][aria-valuenow][aria-valuemin][aria-valuemax]
├── div.x-progress-head                 optional, label left and value right
│   ├── span.x-progress-label
│   └── span.x-progress-value           tabular figures
└── div.x-progress-track                8px pill, chip fill
    └── div.x-progress-fill             scaled to --x-progress-value (0 to 1)
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-size` | `sm` (4px track) | 8px track |
| `data-tone` | `success`, `warning`, `danger`, `neutral` | accent |

A meter picks its tone from its level: React's `Meter` takes `warning` and `danger` thresholds; in HTML, set
`data-tone` yourself.

## States

| State | Source | Look |
|---|---|---|
| value | `--x-progress-value` (0–1) inline | fill scaled from the left |
| complete | value 1 | full fill; announce completion in text, not color alone |
| loading | `aria-busy="true"` | the head shows skeleton bars; the track stays empty |

## Accessibility

- Name every bar: `aria-labelledby` its label, or `aria-label`.
- Set `aria-valuenow`, `aria-valuemin` and `aria-valuemax`; add `aria-valuetext` when a percentage is not the
  clearest reading ("3.2 of 5 GB").
- A meter's tone always comes with its value as text: color is never the only signal.

## Motion

Tier 0. A progress fill moves to its new value on `--x-ease` (`--x-duration-slow`): it is task feedback.
A meter does not animate: it is data. Reduced motion: instant.

## Component tokens

`--x-progress-height`, `-track`, `-fill`, `--x-progress-value`.

## Invariants

- The fill scales with `scale`, never `width`, so updates do not cause layout.
- `role="progressbar"` only for tasks; readings use `role="meter"`.

## Safe edits

- The head: a hint under the label, or the value as "3.2 of 5 GB".
- Thresholds for a meter's tone.
- Height through `--x-progress-height`.

## Checklist

- [ ] Screen reader announces the name and value
- [ ] Meter tone changes at its thresholds and the value is still shown as text
- [ ] Both themes; `sm`; every tone
- [ ] Reduced motion: the fill jumps
