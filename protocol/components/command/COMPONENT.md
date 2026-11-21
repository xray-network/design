---
id: command
name: Command
summary: A command menu in one framed panel: a search row, grouped actions with a lead tile and two lines, and a row of key hints.
motion: 0
requires: [tokens]
components: []
files: [command.css, command.html, command.controller.js, command.controller.d.ts, command.tsx]
---

# Command

Finds and runs an action by name: open an app, switch account, copy an address, change the theme. It is the
menu itself, framed and complete: show it inline, or open it over the page with ⌘K or "/" in the app's own
overlay (it needs no Modal header or padding around it). For picking a value, use Combobox.

## Anatomy

```
div.x-command                                  hairline frame, 20px radius, panel surface; 620px at most
├── label.x-command-search                     60px row, hairline under it
│   ├── svg.x-command-icon                     20px magnifier
│   ├── input.x-command-input[role=combobox][aria-expanded=true][aria-controls][aria-autocomplete=list][aria-activedescendant]
│   └── kbd                                    "esc", when the menu can be closed
├── div.x-command-list[role=listbox]           6px padding; scrolls past 420px
│   ├── div.x-command-group[role=group][aria-labelledby]
│   │   ├── div.x-command-group-label          12/600, muted; 34px tall
│   │   └── div.x-command-item[role=option][id][data-value]     52px, 12px radius
│   │       ├── span.x-command-lead            36px tile: an icon on a chip, or the app's own Avatar or Tile
│   │       ├── span.x-command-text
│   │       │   ├── span.x-command-label       14/600, one line
│   │       │   └── span.x-command-sub         optional second line: 12px, muted
│   │       ├── span.x-command-keys            optional: the item's own shortcut, shown at rest
│   │       └── kbd.x-command-enter            "Enter", shown on the active item only
│   └── p.x-command-empty                      'No results for "…".', 86px tall
└── div.x-command-foot                         40px row of key hints, hairline above it
```

## Variants and sizes

None. Width follows the container up to `--x-command-width`.

## States

| State | Source | Look |
|---|---|---|
| active | `data-active` (arrows and pointer), `aria-selected="true"` | active fill; "Enter" on the right. The first visible item is active after each keystroke |
| hidden | `hidden` (filtered out) | not shown; a group with no visible items hides too |
| empty | every item hidden | one row with the query, as tall as a group title plus one item, so the menu keeps its height |
| disabled | `aria-disabled="true"` | 40% opacity, skipped by keys |

## Accessibility

- The input is a combobox that controls an always-open listbox; `aria-activedescendant` names the active item,
  so focus never leaves the input.
- Groups are `role="group"` named by their label; group names also match the search ("accounts").
- Keyboard: typing filters; ArrowDown and ArrowUp move and wrap; Enter runs the active item; Esc asks to close.
- Key hints and the lead tiles are decorative (`aria-hidden`); the label and second line carry the meaning.

## Motion

Tier 0. None inside the menu: filtering and the active fill are instant, so it keeps up with typing. The overlay
that holds it brings its own entry.

## Component tokens

`--x-command-width`, `-max-height`, `-lead`.

## Invariants

- Web: one controller (`bindCommand`) for HTML and React. It filters by hiding items; the markup holds them all.
- Running an item fires `select`, and Esc fires `close` (HTML: events on the root; React: `onSelect`, `onClose`).
  The command never runs actions or closes anything itself.
- One active item at all times while there are results.

## Safe edits

- The lead: an icon, an Avatar, a Tile, or none.
- One line or two per item; a shortcut on items that have one.
- Hints: more of them (a modifier that changes what Enter does), or none.

## Checklist

- [ ] Typing filters items and hides empty groups; no results shows the query and keeps the height
- [ ] Arrows wrap; Enter runs the active item; the pointer sets the active item without stealing focus
- [ ] The active item shows Enter in place of its own shortcut
- [ ] Esc calls close; both themes; phone width (hints never wrap)
