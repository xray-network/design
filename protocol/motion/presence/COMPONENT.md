---
id: presence
name: Presence
summary: How a surface arrives and leaves, growing in from where it was opened and fading out the same way.
motion: 0
requires: [tokens]
components: []
files: [presence.css, presence.html, presence.tsx]
---

# Presence

For anything that is sometimes there and sometimes not: a filter panel, an inline banner, a details pane, a
floating action bar. It arrives with a short spring and leaves quietly, so appearing reads as an arrival and not
as a flash. The kit's overlays (Modal, Menu, Popover, Toast) already enter this way; Presence gives the same
entry to a surface the app builds itself.

## Anatomy

```
*.x-presence[hidden][data-from]     any element; hidden when it is not there
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-from` | `above`, `below`, `start`, `end`: it keeps its size and travels 8px into place from that side | it grows in place, from 96% |

`--x-presence-origin` is the point it grows from (a transform origin): the corner next to what opened it.

## States

| State | Source | Look |
|---|---|---|
| shown | no `hidden` | in place, opaque |
| arriving | `hidden` removed, or the element inserted | from faded and 96% (or 8px away) on `--x-spring` |
| leaving | `hidden` set | fades and shrinks back on `--x-ease`, then leaves the layout |

## Accessibility

- A hidden element is out of the layout, the tab order and the accessibility tree.
- What opens it says so: `aria-expanded` and `aria-controls` on the trigger. Something that appears by itself
  and matters (a status, an error) is a live region: `role="status"` or `role="alert"`.
- Never move focus into it just because it appeared, unless it is a dialog; a dialog is a Modal.

## Motion

Tier 0, CSS only. `@starting-style` gives the start of the entry, and `display` waits for the exit to end
(`transition-behavior: allow-discrete`); where a browser supports neither, the element simply appears and goes.
Size and place move on `--x-spring`; opacity, and the whole exit, on `--x-ease`. Reduced motion: instant.

## Component tokens

`--x-presence-scale`, `-distance`, `-origin`.

## Invariants

- Entry may overshoot a little; the exit never does, and is shorter than the entry.
- It moves 8px or grows from 96%: enough to say where it came from. It never slides across the screen; a sheet or
  a drawer is a Drawer.
- Shown and hidden only through `hidden`. The content stays mounted; in React, `unmount` takes the children
  out of the tree once the exit has ended, for content that should not keep its state or its cost.

## Safe edits

- The side it comes from, and the origin.
- The distance and the starting size, through the tokens.
- Pairing it with Stagger for its contents.

## Checklist

- [ ] It arrives from its origin or its side, and leaves the same way, faster
- [ ] Hidden, it takes no space and no focus
- [ ] Toggling quickly never leaves it half shown
- [ ] Reduced motion: instant; both themes
