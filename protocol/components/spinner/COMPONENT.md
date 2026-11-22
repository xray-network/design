---
id: spinner
name: Spinner
summary: An indeterminate progress ring for loading that has no known length; the only looping motion in the kit.
motion: 0
requires: [tokens]
components: []
files: [spinner.css, spinner.html, spinner.tsx]
---

# Spinner

Shows that something is loading when its length is unknown: a list fetching, a payment being processed.
Inside buttons use Button's own `loading` state instead. For a known duration use a progress bar.

## Platform contract

Native GUI implementations use the platform's indeterminate activity indicator, sized to the three steps
and colored by the tone; they keep it announced to assistive technology with a label.

## Anatomy

```
span.x-spinner[role=status][aria-label]     ring: 4px stroke (3 sm, 5 lg), a quarter left open
  [data-size=sm|lg]                         16 / 24 / 32px (md is the default)
  [data-tone=muted]                         --x-fg-3 instead of the ink
```

## Accessibility

- `role="status"` with an `aria-label` ("Loading payments") so it is announced once.
- Decorative spinners next to visible "Loading…" text get `aria-hidden="true"` instead.

## Motion

Progress: one turn every 700ms, linear, looping. This is the motion budget's one allowed loop, so it keeps
spinning when motion is reduced: it is the only sign of progress.

## Component tokens

`--x-spinner-size`, `--x-spinner-color`.

## Invariants

- 4px stroke (3px small, 5px large) with a quarter of the ring open; color from `--x-accent` (the accent, the same in both themes) or `--x-fg-3`.
- One spinner per loading region.

## Safe edits

- Any size through `--x-spinner-size`.
- A label beside it (`Loading…`) with the spinner `aria-hidden`.

## Checklist

- [ ] Announced once, with a label, or hidden next to visible text
- [ ] Visible in both themes
