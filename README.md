# XRAY/DESIGN

A visual protocol and copy-in web UI kit for agents. It ships as source plus rules: an agent copies
web components into a project, or uses the native GUI guidance to implement the design in its framework.

- **Two versions of every component:** plain HTML + CSS (with small vanilla controllers where
  state needs JS) and React 19. Both share one stylesheet and one markup contract. State lives in
  `aria-*` / `data-*` attributes, so any framework can drive it.
- **Two themes, one set of tokens:** `light-dark()` semantic tokens; `data-theme` forces a theme on
  any subtree. Rebrand by overriding about five variables.
- **Liquid motion with a budget:** spring easings as CSS `linear()` curves, used only where things
  physically move. No runtime motion library; reduced motion collapses every duration token.
- **Agent-native:** `DESIGN-PROTOCOL.md` (the version, every token and the design rules), a `COMPONENT.md` contract per component, and a
  skill that adds, adapts, upgrades (3-way merge for web copies) and audits components.
- **Native GUI guidance:** the skill also maps the design into SwiftUI, UIKit/AppKit, JavaFX, Android
  and other GUI frameworks. Native implementations use platform themes, state and accessibility;
  the shipped component sources and parity checks cover HTML/React, not native SDKs.

Docs and live playground: https://wiki.xraynetwork.io/design/

## Install into a project

The `protocol/` folder is installed exactly as it is in this repository: no build, no package. Give
your agent this prompt:

> Read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and install XRAY/DESIGN in this repository.

The protocol's Installation section tells the agent the rest: clone this repository, copy `protocol/` to
`.agents/design/`, and run the Setup section of `SKILL.md`. It installs the latest protocol and kit from `main`. The wiki's Installation page has the same prompt, plus upgrade steps
and requirements.

## Repository layout

```text
protocol/                 the protocol and kit; installed as-is to <project>/.agents/design/
├── SKILL.md              agent skill: setup, add, adapt, create, theme, upgrade, audit
├── DESIGN-PROTOCOL.md    the design protocol: tokens in its YAML header, Protocol-ID and -Version, then the rules
├── CHANGELOG.md          what changed in each version (shown on the wiki's Releases page)
├── references/           conditional skill guidance: native-gui.md
├── core/                 shared code every component builds on
│   ├── tokens.css        tokens and cascade layers
│   ├── base.css          optional reset, focus ring, utilities
│   ├── motion.js (+ .d.ts)  spring() -> linear(), trackIndicator, createFlip
│   └── place.js (+ .d.ts)   placeElement: sides, flipping, the visual viewport
├── components/<id>/      primitives: COMPONENT.md, <id>.css, <id>.html, [<id>.controller.js], <id>.tsx
├── blocks/<id>/          screen sections built from components (and other blocks); same files
└── motion/<id>/          motion patterns (an entrance, a sliding indicator, a drag, a screen change); same files
wiki/                     docs and live playground (Rspress), deployed with every release
├── src/pages/            overview (home), installation, protocol, tokens and one page per component
├── src/demos/            interactive React previews, reduced-motion toggle and GUI-specific usage prompts
└── scripts/check-protocol.mjs  the one check; runs before every wiki build
```

Components in 1.0.0 (48): `alert`, `avatar`, `border-beam`, `button` (+ icon button), `calendar`, `card` (+ tile), `card-option`,
`checkbox`, `chips`, `collapse`, `combobox`, `command`, `copy`, `empty`, `icon` (interface, social and crypto icons),
`input` (+ field, textarea), `input-amount`, `input-group`, `list`, `menu`, `menu-list`, `menu-navigation`, `message`,
`modal` (+ side sheet), `numeral`, `pagination`, `popconfirm`, `popover`, `progress` (+ meter), `radio`, `result`, `segmented`,
`select`, `select-native`, `skeleton`, `slider`, `spinner`, `stats`, `steps`, `switch`, `table`, `table-compact`, `tabs`,
`tag` (+ status, delta), `timeline`, `toast`, `tooltip`, `typography`.

Blocks in 1.0.0 (9): `balance`, `chat`, `post`, `profile`, `send-form`, `sign-in`, `stats-grid`, `swap`, `transactions`.

Motion patterns in 1.0.0 (8): `presence`, `stagger`, `expand` (arriving and leaving), `liquid-indicator`, `reflow`,
`drag` (moving), `morph` (becoming), `screen` (navigating).

Their look and markup follow the XRAY app (new UI v6).

Everything in `protocol/` reaches users, so it holds only kit files: no tests, demos or tooling. Documents sit at
its root; `references/` holds conditional guidance, and `core/`, `components/` and `blocks/` hold web code.
Native project implementations and token resources are produced in the project's own UI folder.

## Native GUI projects

Use the same installation prompt in a native project. Setup detects the actual GUI framework and OS,
then follows [the native guide](protocol/references/native-gui.md) instead of copying browser CSS or TSX.
The agent translates YAML tokens into the project's theme resources, implements component contracts
using accessible platform controls and records the framework, protocol version and implemented IDs.
It verifies the result with that framework's build/runtime tools. JavaFX, Android Views and Swing are
different targets; the agent preserves the framework already used by the app.

Native upgrades review changes to tokens, contracts and reference behavior, then update native code
while preserving project adaptations. They do not merge Swift/Java files with web sources.

## Development

All tooling lives in the wiki:

```sh
cd wiki
npm install
npm run dev         # wiki + playground at http://localhost:10009/design/
npm run check:protocol   # validate protocol/ and HTML <-> React parity
npm run typecheck   # type-checks the wiki and every kit component
npm run build       # runs check:protocol first
```

The wiki imports components, `DESIGN-PROTOCOL.md` and each `COMPONENT.md` straight from `protocol/`, so edits there
hot-reload in the running wiki.

`check:protocol` fails on raw colors, hard-coded durations, shadows or blur in component CSS, undefined
tokens, imports that leave the kit, missing `"use client"`, missing types for controllers that React
imports, COMPONENT.md metadata that does not match the files, stray files in `protocol/`, and markup the
React version renders that the HTML reference never shows.

## Adding a component or block to the kit

1. `protocol/components/<id>/` (or `protocol/blocks/<id>/` for a block) with `COMPONENT.md` (frontmatter: id, name, summary, motion tier,
   requires, components, files), `<id>.css` in `@layer components`, `<id>.html`, and `<id>.tsx`.
2. A React example in `wiki/scripts/parity.tsx`.
3. A demo in `wiki/src/demos/demos.tsx` (blocks: `blocks.tsx`), a page in `wiki/src/pages/components/` (blocks:
   `wiki/src/pages/blocks/`), and an entry with an icon in `wiki/src/navigation.ts`.
4. A line in `protocol/CHANGELOG.md` (step below).
5. `npm run check:protocol` and `npm run typecheck` in `wiki/`.

## Changelog

Every change to `protocol/` adds a line to the top section of `protocol/CHANGELOG.md`, under **Added**, **Changed**, **Fixed**
or **Breaking**. Breaking entries say what a project has to change; agents apply them during an upgrade. The wiki's
Releases page renders this file.

## Releasing

`main` is the release: the install and upgrade prompts clone it, so everything merged into `protocol/` reaches new
installs immediately. Keep `main` shippable.

1. Bump the `Protocol-Version` line in `protocol/DESIGN-PROTOCOL.md` and `version` in `wiki/package.json` (the wiki
   header shows it). Give the new version its `## <version>` section at the top of `protocol/CHANGELOG.md`.
2. Run the checks. They fail when the version has no changelog section, `wiki/package.json` names another version,
   or a token differs from `core/tokens.css`.
3. Commit to `main` and tag the commit `v<version>`. The tag lets people pin that exact version.
4. Deploy the wiki: `npm run deploy` in `wiki/`. It publishes the latest protocol at
   `/design/DESIGN-PROTOCOL.md`; earlier versions are not kept (the git tags have them).

## License

MIT. See [LICENSE](./LICENSE).
