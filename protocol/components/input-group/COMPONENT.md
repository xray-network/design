---
id: input-group
name: InputGroup
summary: Joins buttons, inputs and selects into one control with a shared size, plus text or icon addons before and after.
motion: 0
requires: [tokens]
components: []
files: [input-group.css, input-group.html, input-group.tsx]
---

# InputGroup

Several controls that act as one: an input with a button ("Copy", "Max"), a split button, a currency
picker beside an amount, a toolbar of related buttons, or an input with a fixed prefix (`https://`) or
suffix (`USD`). The group sets one size for everything inside it and joins the edges, so only the outer
corners are round.

## Platform contract

Native GUI implementations lay the parts out edge to edge in one row of equal height, round only the
outer corners, and keep each part a separate focusable control with its own accessible name.

## Anatomy

```
div.x-group[role=group][aria-label][data-size]     one row; children share the height
├── span.x-group-addon                             prefix: text or icon on --x-bg-chip, hairline
├── .x-input | .x-select | .x-select-native        fills the free width
├── .x-button | .x-icon-button
└── span.x-group-addon                             suffix
```

Inner corners are square and touching borders collapse into one hairline; the focused or hovered part
draws its border on top.

## Variants

| Attribute | Values |
|---|---|
| `data-size` | `sm` (36px), `lg` (48px); default 40px: the same heights as every form control (`--x-control-*`). Overrides the size of every part. |
| `data-orientation` | `vertical`: a column of full-width parts (rare; stacked buttons) |

## Accessibility

- `role="group"` with an `aria-label` when the parts form one question ("Amount").
- Every part keeps its own label; addons are text for everyone (not `aria-hidden`) unless purely decorative.

## Motion

None beyond each part's own color transitions.

## Component tokens

`--x-group-height`, `--x-group-radius`.

## Invariants

- One height for every part; only the group's outer corners are rounded.
- Parts keep their own look (filled button, hairline input); the group never adds a frame of its own.

## Safe edits

- Any mix and order of parts and addons.
- A ghost button as the last part for secondary actions ("Paste").

## Checklist

- [ ] Every part has an accessible name; the group has a label when it is one question
- [ ] Focus ring of each part is fully visible
- [ ] Heights match at every size
