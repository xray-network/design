---
id: popconfirm
name: Popconfirm
summary: A quick confirmation in a popover next to the action; for reversible or low-stakes actions.
motion: 0
requires: [tokens]
components: [popover, button]
files: [popconfirm.css, popconfirm.html, popconfirm.tsx]
---

# Popconfirm

Asks "are you sure?" right where the action is: remove an app from the dashboard, clear a list, cancel a
pending request. It is lighter than a Modal and keeps the page usable. For irreversible or costly actions
(removing an account, sending funds) use a Modal instead.

## Platform contract

Native GUI implementations use a small anchored confirmation (popover or action sheet on phones) with the
question, an optional description, and Cancel/Confirm buttons; Escape and outside tap cancel.

## Anatomy

```
button[popovertarget]                                the action
div.x-popover.x-popconfirm[popover][role=alertdialog][aria-labelledby][aria-describedby]
  [data-tone=danger] [data-placement=bottom|left|right]   default top, like Popover
├── div.x-popconfirm-content
│   ├── svg.x-icon                                   18px; --x-accent-ink, or --x-danger-fg when danger
│   └── div
│       ├── p.x-popover-title                        the question
│       └── p.x-popconfirm-description (optional)
└── div.x-popconfirm-actions                         right-aligned small buttons: Cancel (ghost), Confirm
```

## Variants

| Attribute | Values |
|---|---|
| `data-tone` | `danger`: danger icon and a danger Confirm button, and Cancel gets the initial focus |

## Accessibility

- `role="alertdialog"` named by the question and described by the description.
- Initial focus: Confirm, or Cancel when the tone is danger (`data-autofocus`). Esc and outside click cancel.
- Both buttons close the popover; focus returns to the trigger.

## Motion

Popover's entry and exit.

## Component tokens

Popover's (`--x-popover-width` is 300px here).

## Invariants

- Exactly two buttons, Cancel first; the confirm label names the action ("Remove"), never "OK".
- Not for irreversible actions: those use Modal.

## Safe edits

- No description for self-explanatory questions.
- Labels in the product's voice.

## Checklist

- [ ] Esc, outside click and Cancel all cancel; Confirm runs the action once
- [ ] Focus starts on the safe choice for danger; returns to the trigger
