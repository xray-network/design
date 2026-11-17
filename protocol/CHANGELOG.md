# Changelog

What changed in each kit version. Newest first. Agents read this file when they upgrade a project's kit:
entries under **Breaking** need a change in project code; everything else arrives through the 3-way merge.

Versions follow semver, read for a copy-in kit:

- **Patch** (1.0.1): fixes. No markup, token or API changes.
- **Minor** (1.1.0): new components, blocks, tokens, variants and options. Existing markup keeps working.
- **Major** (2.0.0): renamed or removed classes, attributes, tokens, props or files. Listed under **Breaking**,
  with what to change.

## 1.0.0

The first version.

### Added

- **Core:** semantic tokens for two themes (`light-dark()`, `data-theme`, `data-motion="reduce"`), cascade
  layers that match Tailwind's, springs as CSS `linear()`, an optional reset and focus ring, and motion helpers
  (liquid indicator, FLIP).
- **Accent:** `--x-accent` for fills, the same blue in both themes; `--x-accent-ink` (+ `-hover`) for focus
  rings, focused borders, links, icons and check marks, lighter in dark theme. `--x-focus` and `--x-link`
  follow the ink.
- **Components (20):** Alert, Avatar, Button (+ icon button, round shape), Checkbox, Chips, Dialog, Input
  (field, input, textarea), Menu, Message, Numeral, Pagination, Radio, Segmented, Select, Switch, Table, Tabs,
  Tag (+ status, delta), Toast, Tooltip.
- **Blocks (8):** Account switcher, Balance, Card and Tile, List, Option cards (with a radio dot in the top-right
  corner), Send form, Stats, Transactions.
- **Protocol:** `DESIGN-PROTOCOL.md`: the version and every token (both themes) in its header; rules for color, type,
  spacing, radius, surfaces, motion, layout, accessibility, theming,
  writing, components and blocks.
- **Skill:** `SKILL.md`: setup, add a component or block, adapt, create, theme, upgrade (3-way merge), audit.
