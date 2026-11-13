---
id: menu
name: Menu
summary: Popover list of actions anchored to a trigger.
motion: 0
requires: [tokens]
components: [button]
files: [menu.css, menu.html, menu.controller.js, menu.controller.d.ts, menu.tsx]
---

# Menu

Actions for one object (a row, a card, a tab), opened from a "more" icon button or a button.
Not for navigation (use links) and not for choosing a value (use Segmented or a select).

## Anatomy

```
trigger [popovertarget=<id>][aria-haspopup=menu][aria-expanded]
div.x-menu#<id>[popover][role=menu][aria-label]     240px min, 14px radius, panel surface
├── .x-menu-heading (optional group title)
├── button.x-menu-item[role=menuitem]  34px rows: [icon] label [.x-menu-note]
├── .x-menu-separator[role=separator]
└── button.x-menu-item[data-tone=danger]   destructive actions last
```

## Variants

| Attribute | Values |
|---|---|
| `.x-menu-item` `data-tone` | `danger` |
| `.x-menu-item` `disabled` | unavailable action (keep it visible and explain with a note) |

## States

| State | Source | Look |
|---|---|---|
| open | `:popover-open` | drops in 4px from 0.96 on `--x-spring`, from the trigger's corner |
| closing | popover hidden | fades out on `--x-ease` |
| item hover / focus | `:hover`, `:focus-visible` | soft wash, text and icon to `--x-fg-1` |
| trigger | `aria-expanded="true"` | icon buttons show their pressed wash |

## Accessibility

- `role="menu"` + `role="menuitem"` items; the trigger gets `aria-haspopup="menu"` and `aria-expanded` (the controller sets them).
- Opening focuses the first item; ArrowUp/ArrowDown/Home/End move focus; Esc and outside click close (native); Tab closes.
- Choosing an item closes the menu and returns focus to the trigger.

## Motion

Tier 0. Popover transitions with `@starting-style` and `allow-discrete`. `--x-menu-origin`
points at the trigger corner, so the menu grows out of it. Reduced motion: instant.

## Positioning

CSS anchor positioning (`position-area: block-end span-inline-end` with flip fallbacks) where
supported. Elsewhere the controller places the menu below the trigger, flipping above and
clamping to the viewport.

## Component tokens

`--x-menu-min-width`, `-offset`, `-origin`.

## Invariants

- Popover API for open/close. No custom outside-click or Esc handling.
- One shared controller (`bindMenu`) for HTML and React: fix behavior there, not in each.
- Items are `<button>`s; destructive items last, after a separator.

## Safe edits

- Checkable items: `role="menuitemcheckbox"` + `aria-checked` and a check icon (the controller keeps those menus open on activation).
- Header block with an avatar or app tile (as in the mini-app menu).
- Context menu: call `menu.showPopover()` on `contextmenu` and position at the pointer.

## Checklist

- [ ] Opens below the trigger; flips above near the bottom edge; never off-screen
- [ ] Keyboard: open with Enter/Space, arrows move, Esc closes and focus returns to the trigger
- [ ] Disabled items are skipped by the arrow keys
- [ ] Both themes; reduced motion
