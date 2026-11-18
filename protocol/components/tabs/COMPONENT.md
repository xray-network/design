---
id: tabs
name: Tabs
summary: View tabs on the canvas; the current view is filled. Tabs can carry small actions.
motion: 0
requires: [tokens]
components: [button]
files: [tabs.css, tabs.html, tabs.controller.js, tabs.tsx]
---

# Tabs

The app's top-level view switcher: Dashboard, Mini Apps, then one tab per open mini app. Tabs are
navigation, so the current one carries `aria-current="page"`. For switching a small view in place
(periods, panes) use Segmented.

## Platform contract

All platforms expose exactly one current view and keep it reachable at compact widths. Native GUI
implementations bind framework navigation/selection state to the filled current tab and accessibility
state; they do not recreate DOM attributes. Preserve separately accessible tab actions, the absence of
an underline/sliding indicator, and base-scale spacing/radius. Let text and hit areas grow as needed.

## Anatomy

```
nav.x-tabs[aria-label]                   row with 6px gaps; scrolls sideways without a scrollbar
├── button.x-tab[aria-current=page]      36px, 10px radius, [icon] label
├── span.x-tabs-separator                1×18px hairline between groups
├── span.x-tab                           composite tab
│   ├── button.x-tab-main[aria-current]  the tab itself; app tabs lead with a gray .x-tab-placeholder
│   └── button.x-tab-action[aria-label]  22px actions: more, close
└── button.x-icon-button                 trailing "add" (36px)
div.x-tabs-panels (optional)             views under the row, 16px below
└── section.x-tabs-panel[aria-labelledby][hidden]   one per tab with aria-controls
```

## States

| State | Source | Look |
|---|---|---|
| resting | — | `--x-bg-faint` fill, `--x-fg-3` text |
| hover | `:hover` | `--x-bg-soft` fill, `--x-fg-1` text |
| current | `aria-current="page"` on the tab or its `.x-tab-main` | `--x-bg-active` fill, `--x-fg-1` text |
| action hover | `.x-tab-action:hover` | full opacity, soft wash |

## Accessibility

- A `nav` with a label; each tab is a button (or a link when a router owns the views).
- Exactly one tab has `aria-current="page"`.
- Tab actions are separate buttons with their own `aria-label` ("Close Graph"), never nested inside the tab button.
- The row scrolls horizontally; the current tab is scrolled into view when it changes.

## Views and lazy content

Tabs can carry their views: a tab with `aria-controls` shows its `.x-tabs-panel` while current. A view
renders the first time its tab becomes current and then stays rendered, so hidden views cost nothing until
used; `forceMount` (React) renders every view up front. In HTML, lazy content goes in `<template data-lazy>`.

## Motion

Tier 0. Fill and text color on `--x-duration-fast`. Tabs do not slide: there is no indicator.

## Component tokens

`--x-tabs-gap`; `--x-tab-height`, `--x-tab-bg`, `--x-tab-fg`.

## Invariants

- Web current state comes from `aria-current="page"`, not a class; native state uses framework navigation/selection state.
- 36px tall, 10px radius, weight 600: the same size and radius as icon buttons beside them.
- No underline or sliding indicator; the filled tab is the indicator.

## Safe edits

- A leading app tile or avatar inside a tab.
- A decorative `.x-tab-placeholder`: a 20px gray rounded square in place of an app icon.
- Links instead of buttons (`<a class="x-tab" href>`), with the router setting `aria-current`.
- A split tab: several `.x-tab-main` segments in one composite tab, separated by hairlines.

## Checklist

- [ ] One current tab; it is visible after switching in a narrow row
- [ ] Tab and its actions are separately focusable and labelled
- [ ] Both themes; the row never shows a scrollbar
