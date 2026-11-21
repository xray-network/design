---
id: menu-list
name: MenuList
summary: Grouped rows of destinations in rounded panels, each with an icon tile, a label and an optional value and chevron; the current one is filled.
motion: 0
requires: [tokens]
components: []
files: [menu-list.css, menu-list.html, menu-list.tsx]
---

# MenuList

A settings-style list of places to go: General, Display, Security, Notifications. It is the sidebar of a split
view (the current page is filled) or a settings screen on a phone (each row opens a page, marked with a chevron).
For actions on something, use Menu; for top navigation, MenuNavigation; for data rows such as transactions, List.

## Anatomy

```
nav.x-menu-list[aria-label]
└── div.x-menu-list-section                     one per group
    ├── h2.x-menu-list-heading                  optional, above the panel
    ├── ul.x-menu-list-group                    panel surface, 16px radius, hairline
    │   └── li > a|button.x-menu-list-item[aria-current=page]   44px tall
    │       ├── span.x-menu-list-icon           30px tile with an icon (svg.x-icon)
    │       ├── span.x-menu-list-label
    │       ├── span.x-menu-list-value          optional: the current setting ("On", "Automatic")
    │       └── svg.x-menu-list-chevron         optional: the row opens a page
    └── p.x-menu-list-note                      optional, under the panel
```

Rows are divided by a hairline that starts at the label, so icons sit in an unbroken column.

## Variants and sizes

None. The list fills its container; a sidebar is usually 280–320px wide.

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | soft wash |
| pressed | `:active` | active fill |
| current | `aria-current="page"` | accent fill, accent text; the dividers around it disappear |
| focus | `:focus-visible` | ring inside the row |
| disabled | `aria-disabled="true"` | 40% opacity, no pointer |

## Accessibility

- A `nav` with a name ("Settings"); a heading per group when there is one.
- Rows are links (`href`) when they lead to a page, buttons when they open something in place.
  The current page has `aria-current="page"`.
- The value is read after the label ("Wi-Fi, Home"). Icons are decorative (`aria-hidden`).
- Rows are 44px tall: a full touch target.

## Motion

Tier 0. Fills change color on `--x-ease`. Nothing moves.

## Component tokens

`--x-menu-list-item-h`, `-pad`, `-tile`, `-radius`.

## Invariants

- One current row at most, from the route, never from click state.
- Icon tiles stay neutral: color in the kit is for actions and status, not identity. The current row is the only
  accent in the list.
- Dividers start at the label.

## Safe edits

- Row content: a Switch or a Tag in place of the value (a setting that changes in place).
- Groups: any number, with or without headings and notes.
- Without icons: dividers then start at the row's padding.

## Checklist

- [ ] The current row is filled and the dividers next to it disappear
- [ ] Tab reaches every row; the focus ring is visible on the current row too
- [ ] Long labels and values shorten with an ellipsis, the chevron stays
- [ ] Both themes; phone width
