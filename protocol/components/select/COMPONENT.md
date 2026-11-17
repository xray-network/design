---
id: select
name: Select
summary: Custom single-choice dropdown with a listbox popover, keyboard and type-to-find.
motion: 0
requires: [tokens]
components: []
files: [select.css, select.html, select.controller.js, select.controller.d.ts, select.tsx]
---

# Select

One choice from a list that is too long for Segmented or Option cards: networks, accounts, sort
orders. The trigger looks like the text input; the list opens below it.

## Anatomy

```
button.x-select[popovertarget][aria-haspopup=listbox][aria-expanded]   44px, 12px radius, hairline
├── span.x-select-value[data-placeholder]    selected label, or the placeholder when empty
└── svg.x-select-chevron                     turns 180° when open
div.x-select-list[popover][role=listbox]     panel surface, 14px radius, at least as wide as the trigger
└── div.x-select-option[role=option][aria-selected][tabindex=-1]
    ├── svg.x-select-check                   accent check, shown on the selected option
    ├── span                                 label
    └── span.x-select-option-note            optional muted note on the right
input[type=hidden][data-for=<list id>]       optional: submits the value with a form
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `.x-select` `data-size` | `sm` 36px / 10px radius | 44px / 12px radius |

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | border to `--x-border-hover` |
| focus, open | `:focus-visible`, `aria-expanded="true"` | border to `--x-focus` |
| invalid | `aria-invalid="true"` | border to `--x-danger` |
| option active | focused option | soft wash |
| option selected | `aria-selected="true"` | check mark, weight 600 |
| option disabled | `aria-disabled="true"` | 40% opacity, skipped by keys |

## Accessibility

- The trigger has `aria-haspopup="listbox"` and `aria-expanded`; the list is `role="listbox"` with `role="option"` items.
- Name the control: in a Field, `aria-labelledby` the label and the value; standalone, `aria-label`.
- Keyboard: ArrowDown, ArrowUp, Enter or Space opens; arrows, Home and End move; typing letters jumps to a match;
  Enter or Space picks; Esc and Tab close. Focus starts on the selected option and returns to the trigger.

## Motion

Tier 0. The list drops in 4px from 0.98 on `--x-spring` (exit on `--x-ease`); the chevron turns and the
check mark pops in on the spring. Reduced motion: instant.

## Component tokens

`--x-select-height`, `-radius`, `-pad`, `-font-size`, `-border`, `--x-select-origin`.

## Invariants

- One shared controller (`bindSelect`) for HTML and React. With `onSelect`, the caller owns the selection;
  without it, the controller updates the markup.
- The Popover API opens and dismisses the list. No custom outside-click or Esc handling.
- The trigger matches the text input: same height, radius and border behavior, including focus (border only, no ring).

## Safe edits

- Option content: an avatar or tile before the label; a second line under it.
- Groups: a non-interactive heading row between options (`role="presentation"`).
- Width: the list can be wider than the trigger (`min-width` is a floor).

## Checklist

- [ ] Mouse and keyboard both pick an option; focus returns to the trigger
- [ ] Type-to-find jumps to the matching option
- [ ] Disabled options are skipped and cannot be picked
- [ ] List flips above near the bottom of the viewport; never off-screen
- [ ] Both themes; reduced motion; inside a form, the hidden input submits the value
