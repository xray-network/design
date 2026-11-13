# XRAY/DESIGN

A copy-in UI kit for agents. It ships as source plus rules, not as a package: an agent copies
components into a project, where they become project code it can adapt.

- **Two versions of every component:** plain HTML + CSS (with small vanilla controllers where
  state needs JS) and React 19. Both share one stylesheet and one markup contract. State lives in
  `aria-*` / `data-*` attributes, so any framework can drive it.
- **Two themes, one set of tokens:** `light-dark()` semantic tokens; `data-theme` forces a theme on
  any subtree. Rebrand by overriding about five variables.
- **Liquid motion with a budget:** spring easings as CSS `linear()` curves, used only where things
  physically move. No runtime motion library; reduced motion collapses every duration token.
- **Agent-native:** `RULES.md` (the design rules), a `COMPONENT.md` contract per component, and an
  agent skill that adds, adapts, upgrades (3-way merge) and audits components.

## Install into a project

The kit is published on `kit/v<version>` tags as a dist-only tree. Give your agent:

> Install XRAY/DESIGN kit v0.1.0. Clone `https://github.com/xray-network/design.git` with
> `--depth 1 --branch kit/v0.1.0` into a temporary directory. Check that `design/VERSION` starts with
> `0.1.0`. Copy `design/` to `.agents/design/` and `skills/design/` to `.agents/skills/design/`, and
> delete the temporary directory. Then follow the Setup section of `.agents/skills/design/SKILL.md`.

See [`src/INSTALL.md`](src/INSTALL.md) (shipped as the kit README) for upgrades and requirements.

## Repository layout

```text
src/                      kit source (what ships, before the build)
├── rules/RULES.md        design rules            -> .agents/design/RULES.md
├── tokens/               tokens.css, tailwind.css (v4 bridge)
├── base/                 optional reset, focus ring, utilities
├── motion/               spring() -> linear(), trackIndicator, createFlip
├── components/<id>/      COMPONENT.md, <id>.css, <id>.html, [<id>.controller.js + .d.ts], <id>.tsx
├── skill/                SKILL.md + scripts/lock.mjs  -> .agents/skills/design/
└── INSTALL.md            README of the kit branch
wiki/                     public docs and live playground (Rspress), published with every release
├── src/pages/            install (index), rules and one page per component
└── src/demos/            live demos: React and HTML versions, reduced-motion toggle, HTML source
tests/parity.tsx          React renderings checked against the HTML references
scripts/
├── build-kit.mjs         validate src/ and emit dist/ (kit layout + manifest.json + VERSION)
├── check-parity.mjs      HTML <-> React <-> CSS parity
├── check-install.mjs     installs dist/ into fixture projects; add, type-check, upgrade with merge
└── springs.mjs           regenerate the spring tokens
```

Components in 0.1.0: `button` (+ icon button), `segmented`, `switch`, `field` (+ input), `dialog`,
`menu`, `toast`.

## Development

```sh
npm install
npm install --prefix wiki
npm run dev        # wiki + playground at http://localhost:10009/design/
npm run check      # build + validate, type-check, parity, install end-to-end
```

The wiki imports components, `RULES.md`, each `COMPONENT.md` and `INSTALL.md` straight from `src/`,
so edits there hot-reload in the running wiki.

The build fails on raw colors, hard-coded durations, shadows or blur in component CSS, undefined tokens,
imports that leave the kit layout, missing `"use client"`, missing types for controllers React
imports, and COMPONENT.md metadata that does not match the files.

## Adding a component to the kit

1. `src/components/<id>/` with `COMPONENT.md` (frontmatter: id, name, summary, motion tier,
   requires, components, files), `<id>.css` in `@layer x.components`, `<id>.html`, and `<id>.tsx`.
2. A React example in `tests/parity.tsx`.
3. A demo in `wiki/src/demos/demos.tsx`, a page `wiki/src/pages/components/<id>.mdx`, and an entry with an
   icon in `wiki/src/navigation.ts`.
4. `npm run check`.

## Releasing

1. Bump `version` in `package.json` and run `npm run check`.
2. Publish `dist/` as the root of an orphan commit tagged `kit/v<version>`.
3. Deploy the wiki: `npm run wiki:deploy` (it shows the new version in the sidebar).

## License

MIT. See [LICENSE](./LICENSE).
