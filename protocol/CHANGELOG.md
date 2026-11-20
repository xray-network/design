# Changelog

What changed in each kit version. Newest first. Agents read this file when they upgrade a project's kit:
entries under **Breaking** need a change in project code. Web copies use a 3-way merge; native
implementations review source contracts/tokens and apply changes in their own framework.

Versions follow semver, read for a copy-in kit:

- **Patch** (1.0.1): fixes. No markup, token or API changes.
- **Minor** (1.1.0): new components, blocks, tokens, variants and options. Existing markup keeps working.
- **Major** (2.0.0): renamed or removed classes, attributes, tokens, props or files. Listed under **Breaking**,
  with what to change.

## 1.0.0

The first version.

### Added

- **Native GUI guidance:** a platform-adaptation contract and skill workflow for SwiftUI, UIKit/AppKit,
  JavaFX, Android and other GUI frameworks. Covers token translation, accessible component ports,
  native implementation tracking and upgrades; native component libraries are not shipped.
- **Core:** semantic tokens for two themes (`light-dark()`, `data-theme`, `data-motion="reduce"`), cascade
  layers that match Tailwind's, springs as CSS `linear()`, an optional reset and focus ring, and motion helpers
  (liquid indicator, FLIP).
- **Accent:** `--x-accent` for fills, the same blue in both themes; `--x-accent-ink` (+ `-hover`) for focus
  rings, focused borders, links, icons and check marks, lighter in dark theme. `--x-focus` and `--x-link`
  follow the ink.
- **Grays:** neutral with the faintest warm tint (oklch chroma 0.0015 at most, hue 65), so chrome and text stay
  quiet beside any brand color; secondary text keeps 4.5:1 on the canvas in both themes.
- **Components (34):** Alert, Avatar, BorderBeam, Button (+ icon button, round shape), Checkbox, Chips, Collapse,
  Empty, Group, Icon (interface, social and crypto icons, all outline), Input (field, input, textarea), Menu, Menu Navigation, Message,
  Modal (`dialog`), Numeral, Pagination, Popconfirm, Popover, Radio, Result, Segmented, Select,
  Select Native, Skeleton, Spinner, Switch, Table, Table Compact, Tabs, Tag (+ status, delta), Toast, Tooltip, Typography.
- **Loading states:** Skeleton (shapes, and text bars exactly one line tall with stable varied widths). Table, Table
  Compact, Result, Button, Pagination, Avatar (a spinner on top) and every block take `loading`: placeholders follow
  the structure, not the content, and the layout does not move.
- **Lazy content:** Modal, Tabs, Segmented and Collapse render hidden content on first show; `forceMount` renders it
  up front. In HTML, lazy content goes in `<template data-lazy>`.
- **Blocks (9):** Account switcher, Balance, Card and Tile, List, Option cards (with a radio dot in the top-right
  corner), Send form, Stats, Stats grid, Transactions.
- **Protocol:** `DESIGN-PROTOCOL.md`: the version and every token (both themes) in its header; rules for color, type,
  spacing, radius, surfaces, motion, layout, accessibility, theming,
  writing, components and blocks.
- **Skill:** `SKILL.md`: setup, add a component or block, adapt, create, theme, upgrade (3-way merge), audit.
- **Theming:** DESIGN-PROTOCOL.md §11 defines the theming surface for every GUI framework (the accent set derived
  from one brand color, fonts, the radius scale, optional neutrals) and what stays fixed. Overrides live in one
  project-owned theme layer, recorded as `theme` in `design.lock.json`; upgrades never modify it.

### Changed

- **Component adaptations:** keep one-place changes at the use site, make shared variants opt-in,
  and create a new project component when the change goes beyond the shared contract.
- **Native GUI documentation:** the public page explains requests and automatic agent behavior;
  detailed implementation procedures remain in the skill reference.
