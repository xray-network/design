---
id: drawer
name: Drawer
summary: A panel that slides in from the window's edge on native <dialog>, for filters, details and navigation.
motion: 0
requires: [tokens]
components: [button, modal]
files: [drawer.css, drawer.html, drawer.controller.js, drawer.controller.d.ts, drawer.tsx]
---

# Drawer

A panel at the window's edge for work that belongs beside the page, not instead of it: the filters of a list, the
details of a row, a few settings. The page stays in view next to it, dimmed. At the end edge by default; at the
start edge it is the app's navigation on phones.

One decision or one short task (confirm, rename) is a Modal. Options that hang off a
control are a Menu or a Popover. A long flow is a page.

## Platform contract

All platforms preserve modal interaction, title/description, initial focus, dismissal policy, the actions at the
bottom with one primary action placed last, a scrollable body and focus return to the opener. Native GUI
implementations use the framework's side sheet, drawer or inspector presentation and its accessibility focus
support. `<dialog>`, `showModal()`, DOM scrollbar handling and CSS transitions below specify the web implementation
only. Adapt the edge and the width to the target OS; record system-controlled sheet styling differences.

## Anatomy

```
dialog.x-drawer[aria-labelledby]       420px panel, full height less 12px on every side, 20px radius, hairline
├── header.x-drawer-header
│   ├── h2.x-drawer-title
│   └── .x-icon-button[aria-label=Close]
├── .x-drawer-body                     scrolls when tall; a hairline appears under the header once it scrolls
│   └── p.x-drawer-description (optional)
└── footer.x-drawer-footer             actions, always at the bottom; primary last
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-size` | `lg` 560px | 420px |
| `data-placement` | `start`: at the start edge (navigation) | the end edge |
| `data-x-dismiss` (HTML) / `dismissible` (React) | `none` / `false`: no backdrop or Esc close | dismissible |

The drawer floats 12px from the window on every side, its frame and corners whole. Below 560px it floats 8px from
the window and stays 32px short of the full width, so the page shows beside it; its actions stack full-width.
Start and end are logical: right-to-left mirrors them.

## States

| State | Source | Look |
|---|---|---|
| open | `[open]` via `showModal()` | slides in 32px from its edge on `--x-spring`; scrim fades in |
| closing | `[open]` removed | fades and slides back on `--x-ease`, no overshoot |

## Accessibility

- Always `showModal()`, never `show()` and never the `open` attribute in markup: that gives focus trap, Esc, top layer and an inert page.
- The page never shifts when a drawer opens: `initDrawers` and the React component use the Modal's scrollbar
  tracking, which keeps a `data-x-scrollbar` mark on `<html>` current while the page shows a classic scrollbar, and
  the scroll lock keeps that space only then.
- `aria-labelledby` points to the title; `aria-describedby` to the description when there is one.
- Initial focus: the first field. HTML: `autofocus`. React: `data-autofocus` (React strips `autofocus` and focuses
  on mount, before the drawer opens). Without either, the first focusable element (the Close button) gets focus.
- Focus returns to the opener on close (native).

## Lazy content

The body renders on first open and stays rendered after closing, so a heavy drawer costs nothing until it is
used. `forceMount` (React) renders it up front, for content that must exist while closed (form state that is
read before opening, anchors). In HTML, put lazy content in `<template data-lazy>`; `initDrawers` renders it
right before the first opening.

## Motion

Tier 0. CSS transitions with `@starting-style` and `allow-discrete` on `display` and `overlay`.
Entry is liquid (`--x-spring` on translate); exit is geometric (`--x-ease`), because
overshoot reads as hesitation on the way out. Reduced motion: instant.

## Component tokens

`--x-drawer-width`, `-pad`, `-inset`, `-enter-x`.

## Invariants

- Web: native `<dialog>` with `showModal()`. No div-based panel, no custom focus trap.
- One primary action per drawer, placed last, in the footer at the bottom.
- Shadow-free: separation comes from the scrim and the hairline.
- It never covers the whole window: the page stays visible beside it at every width.

## Safe edits

- Filter and settings forms: wrap body and footer in `<form method="dialog">`; submit buttons close with their `value` as `returnValue`.
- Wider custom sizes through `--x-drawer-width`.
- Header extras: an icon or status tag before the title.

## Checklist

- [ ] Opens with focus inside; Tab stays inside; Esc closes (unless not dismissible); focus returns to the opener
- [ ] Backdrop click closes; keyboard "click" on the drawer never closes it
- [ ] Page behind does not scroll, and does not shift sideways when the drawer opens: with a classic scrollbar
      (its space is kept) and without one (no gutter is added)
- [ ] Floats 12px from the window on every side (8px on phones); the footer is at the bottom however short the content
- [ ] Long content scrolls inside the body; header and footer stay put
- [ ] Slides in from its own edge, at the end and at the start, also right-to-left
- [ ] Phone width: 32px short of the full width, stacked actions
- [ ] Both themes; reduced motion
