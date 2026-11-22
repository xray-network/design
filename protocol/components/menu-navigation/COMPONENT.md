---
id: menu-navigation
name: MenuNavigation
summary: A site or app top navigation whose submenus open in one panel that slides between items.
motion: 0
requires: [tokens, motion]
components: []
files: [menu-navigation.css, menu-navigation.html, menu-navigation.controller.js, menu-navigation.controller.d.ts, menu-navigation.tsx]
---

# MenuNavigation

The main navigation of a site or a large app area: a row of items, some plain links, some opening a
submenu of links with short descriptions. All submenus share one panel. Moving from one item to the next
slides the new submenu in from that side, while the panel resizes and follows the item. For a list of
actions use Menu; for switching views inside an app use Tabs.

## Platform contract

Native GUI implementations use the platform's navigation pattern (menu bar, toolbar menus, or a drawer on
phones) with the same groups and link descriptions. The sliding panel is a web presentation; native targets
keep its order and labels, not its geometry.

## Anatomy

```
nav.x-menu-navigation[aria-label]                         position: relative
├── ul.x-menu-navigation-list                             row, 4px gaps
│   ├── li > button.x-menu-navigation-trigger             36px, 10px radius; [aria-expanded][aria-controls]; chevron
│   └── li > a.x-menu-navigation-trigger[href]            a plain top-level link, same look
└── div.x-menu-navigation-viewport[data-open]             the shared panel: --x-bg-panel, hairline, 16px radius
    └── div.x-menu-navigation-panel[id][hidden][data-motion]
        └── ul.x-menu-navigation-links                    one or two columns
            └── li > a.x-menu-navigation-link             10px radius, 12px padding
                ├── span.x-menu-navigation-link-title     14/600, --x-fg-1
                └── span.x-menu-navigation-link-text      13px, --x-fg-3
```

## States

| State | Source | Look |
|---|---|---|
| trigger hover | `:hover` | `--x-bg-soft` fill |
| trigger open | `aria-expanded="true"` | `--x-bg-active` fill, chevron turned |
| current page | `aria-current="page"` on a link or top-level link | `--x-fg-1`, `--x-bg-active` |
| panel switch | `data-motion="from-start"`/`"from-end"` on the incoming panel | slides 24px in from that side |

## Accessibility

- A `nav` with a label; triggers are buttons with `aria-expanded` and `aria-controls`; links are links.
- Click or Enter/Space opens; while a submenu is open, hovering or focusing another item switches to it.
  With `data-trigger="hover"` (React `trigger="hover"`), pointing at an item opens it and leaving the menu closes
  it after 150ms; keyboard and touch work as with click.
- ArrowLeft/ArrowRight move between top-level items; Esc closes and returns focus to the trigger;
  Tab past the last link or an outside click closes.

## Motion

Incoming panel: opacity and translate on `--x-spring-soft` (no overshoot). The viewport's position and size on
`--x-duration-base` with `--x-ease`. Opening and closing fade on `--x-duration-fast`. Reduced motion: instant.

## Component tokens

`--x-menu-navigation-panel-width` (one-column width; two columns double it).

## Invariants

- Wider than its place, the row scrolls sideways and never shows a scrollbar: a mouse drags it like a finger,
  a drag never selects, and a shade (`--x-scroll-shade`) marks each side with hidden items (`scrollStrip` in
  `core/motion.js`).
- One shared panel; only one submenu open at a time.
- Links in submenus carry a title and a one-line description.

## Safe edits

- `data-columns="2"` on a `.x-menu-navigation-links` list.
- Any content in a panel (a featured card) as long as links stay links.

## Checklist

- [ ] Too narrow: no scrollbar; a mouse drags the row without selecting; a shade marks each side with hidden items
- [ ] Opens by click and keyboard; switching items slides from the right side
- [ ] Esc, outside click and tabbing out close it; focus returns to the trigger on Esc
- [ ] The panel stays inside the viewport at narrow widths
