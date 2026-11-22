---
id: combobox
name: Combobox
summary: A text field that filters a list of options as you type, then picks one, or several as chips.
motion: 0
requires: [tokens, place]
components: []
files: [combobox.css, combobox.html, combobox.controller.js, combobox.controller.d.ts, combobox.tsx]
---

# Combobox

One choice from a list too long to scan: tokens, countries, contacts, networks. The person types to narrow
the list, then picks. For a short list, use Select; for actions rather than values, use Command.

**Multiple** picks several: each picked option becomes a chip in the field, and the list stays open so the next
one is a keystroke away. Use it for filters and tags (networks to show, labels on a contact).

## Anatomy

```
div.x-combobox[data-multiple]
├── div.x-combobox-field                    looks like the text input; grows by lines when multiple
│   ├── span.x-combobox-chip[data-value]    multiple only: one per picked option
│   │   ├── span                            its label
│   │   └── button.x-combobox-chip-remove[aria-label="Remove …"]
│   ├── input.x-combobox-input[role=combobox][aria-expanded][aria-controls][aria-autocomplete=list][aria-activedescendant]
│   └── svg.x-combobox-chevron
├── div.x-combobox-list[popover=manual][role=listbox]   panel surface, at least as wide as the field
│   ├── div.x-combobox-option[role=option][id][aria-selected][data-value]
│   │   ├── svg.x-combobox-check            accent check on the selected option
│   │   ├── span                            label (what the filter matches)
│   │   └── span.x-combobox-option-note     optional muted note on the right
│   └── div.x-combobox-empty                "No matches", shown when the filter hides everything
└── input[type=hidden][data-for=<list id>]  optional: submits the value with a form (one per value when multiple)
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `.x-combobox-field` `data-size` | `sm` 36px; the same heights as every form control (`--x-control-*`) | 40px |
| `.x-combobox` `data-multiple` | present: several values, shown as chips; the listbox is `aria-multiselectable` | one value |

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | border to `--x-border-hover` |
| focus, open | `:focus-within`, `aria-expanded="true"` | border to `--x-focus` |
| invalid | `aria-invalid="true"` on the input | border to `--x-danger` |
| option active | `data-active` (follows arrows and pointer) | soft wash |
| option selected | `aria-selected="true"` | check mark, weight 600; several at once when multiple |
| chip | multiple: one per selected option | chip fill; its × removes it |
| option hidden | `hidden` (filtered out) | not shown |

## Accessibility

- The ARIA combobox pattern: focus stays in the input; `aria-activedescendant` names the active option.
- Name it with a label (`for`) or `aria-label`.
- Keyboard: typing filters and opens; ArrowDown and ArrowUp move; Enter picks; Esc closes, then clears;
  Tab closes and keeps the picked value.
- The empty row is announced through the list; it is never an option.
- Multiple: Enter toggles the active option and the list stays open; Backspace in an empty input removes the last
  chip; every chip's remove button is named ("Remove Ethereum") and reachable with Tab.

## Motion

Tier 0. The list drops in 4px from 0.98 on `--x-spring` (exit on `--x-ease`), like Select. Reduced motion: instant.

## Component tokens

`--x-combobox-height`, `-radius`, `-pad`, `-border`, `--x-combobox-origin`.

## Invariants

- Web: one shared controller (`bindCombobox`) for HTML and React; it filters by hiding options, so the markup
  holds every option.
- Focus never leaves the input while the list is open.
- After a pick, the input shows the picked option's label. In multiple mode the input clears instead, and the
  chips show what is picked.

## Safe edits

- Option content: an icon or tile before the label; a second line under it.
- The match rule: pass `filter` to match on other text (a ticker as well as a name).
- Width: the list can be wider than the field.

## Checklist

- [ ] Typing filters; "No matches" shows when nothing matches
- [ ] Arrows move the active option and scroll it into view; Enter picks; focus stays in the input
- [ ] Esc closes, a second Esc clears; clicking outside closes
- [ ] Multiple: picking adds a chip and keeps the list open; × and Backspace remove; the field grows by lines and
      the list follows it
- [ ] Both themes; `sm`; the list flips above near the bottom of the window
