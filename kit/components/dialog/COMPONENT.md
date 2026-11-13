---
id: dialog
name: Dialog
summary: Modal dialog on native <dialog>; centered panel on desktop, bottom sheet on phones.
motion: 0
requires: [tokens]
components: [button]
files: [dialog.css, dialog.html, dialog.controller.js, dialog.tsx]
---

# Dialog

Interrupts the flow for one decision or one short task: confirm, rename, add account. Long flows
belong on a page. Non-blocking information belongs in a toast.

## Anatomy

```
dialog.x-dialog[aria-labelledby]       460px panel, 20px radius, panel surface, hairline
├── header.x-dialog-header
│   ├── h2.x-dialog-title
│   └── .x-icon-button[aria-label=Close]
├── .x-dialog-body                     scrolls when tall
│   └── p.x-dialog-description (optional)
└── footer.x-dialog-footer             actions; primary last (right on desktop, bottom on phones)
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-size` | `sm` 380px, `lg` 620px | 460px |
| `data-x-dismiss` (HTML) / `dismissible` (React) | `none` / `false`: no backdrop or Esc close | dismissible |

Below 560px every size becomes a full-width bottom sheet with stacked full-width actions.

## States

| State | Source | Look |
|---|---|---|
| open | `[open]` via `showModal()` | rises from 10px below (48px on phones) at 0.96 scale on `--x-spring`; scrim fades in |
| closing | `[open]` removed | fades and sinks on `--x-ease`, no overshoot |

## Accessibility

- Always `showModal()`, never `show()` and never the `open` attribute in markup: that gives focus trap, Esc, top layer and an inert page.
- `aria-labelledby` points to the title; `aria-describedby` to the description when there is one.
- Initial focus: the safest action for destructive dialogs, otherwise the first field. HTML: `autofocus`.
  React: `data-autofocus` (React strips `autofocus` and focuses on mount, before the dialog opens).
  Without either, the first focusable element (the Close button) gets focus.
- Focus returns to the opener on close (native).

## Motion

Tier 0. CSS transitions with `@starting-style` and `allow-discrete` on `display` and `overlay`.
Entry is liquid (`--x-spring` on scale and translate); exit is geometric (`--x-ease`), because
overshoot reads as hesitation on the way out. Reduced motion: instant.

## Component tokens

`--x-dialog-width`, `-pad`, `-enter-y`.

## Invariants

- Native `<dialog>` with `showModal()`. No div-based modal, no custom focus trap.
- One primary action per dialog, placed last.
- Shadow-free: separation comes from the scrim and the hairline.

## Safe edits

- Form dialogs: wrap body and footer in `<form method="dialog">`; submit buttons close with their `value` as `returnValue`.
- Wider custom sizes through `--x-dialog-width`.
- Header extras: an icon or status tag before the title.

## Checklist

- [ ] Opens with focus inside; Tab stays inside; Esc closes (unless not dismissible); focus returns to the opener
- [ ] Backdrop click closes; keyboard "click" on the dialog never closes it
- [ ] Page behind does not scroll
- [ ] Phone width: bottom sheet, stacked actions, safe-area padding
- [ ] Both themes; reduced motion
