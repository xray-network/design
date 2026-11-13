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
- **Agent-native:** `RULES.md` (the design rules), a `COMPONENT.md` contract per component, and a
  skill that adds, adapts, upgrades (3-way merge) and audits components.

Docs and live playground: https://wiki.xraynetwork.io/design/

## Install into a project

The `kit/` folder is installed exactly as it is in this repository: no build, no package. Give
your agent this prompt (replace the version with the release you want):

> Install XRAY/DESIGN v0.1.0. Clone `https://github.com/xray-network/design.git` with `--depth 1 --branch v0.1.0`
> into a temporary directory. Check that its `kit/VERSION` is 0.1.0. Copy its `kit/` folder to
> `.agents/skills/design/`, then delete the temporary directory. Then follow the Setup section of
> `.agents/skills/design/SKILL.md`.

The wiki's Installation page always shows this prompt for the current version, with upgrade steps and requirements.

## Repository layout

```text
kit/                      the kit; installed as-is to <project>/.agents/skills/design/
├── SKILL.md              agent skill: setup, add, adapt, create, theme, upgrade, audit
├── RULES.md              design rules
├── VERSION               kit version (plain semver)
├── core/                 shared code every component builds on
│   ├── tokens.css        tokens and cascade layers
│   ├── base.css          optional reset, focus ring, utilities
│   ├── tailwind.css      optional Tailwind v4 bridge
│   └── motion.js (+ .d.ts)  spring() -> linear(), trackIndicator, createFlip
└── components/<id>/      COMPONENT.md, <id>.css, <id>.html, [<id>.controller.js], <id>.tsx
wiki/                     docs and live playground (Rspress), deployed with every release
├── src/pages/            overview (home), installation, rules and one page per component
├── src/demos/            live demos: React and HTML versions, reduced-motion toggle, HTML source
└── scripts/check-kit.mjs the one kit check; runs before every wiki build
```

Components in 0.1.0 (15): `button` (+ icon button), `tabs`, `segmented`, `chips`, `switch`, `option`
(option cards), `field` (+ input), `list`, `card` (+ tile), `numeral`, `avatar`, `tag` (+ status, delta),
`dialog`, `menu`, `toast`. Their look and markup follow the XRAY app (new UI v6).

Everything in `kit/` reaches users, so it holds only kit files: no tests, demos or tooling. Documents sit at
its root; `core/` and `components/` hold the code that agents copy into projects.

## Development

All tooling lives in the wiki:

```sh
cd wiki
npm install
npm run dev         # wiki + playground at http://localhost:10009/design/
npm run check:kit   # validate kit/ and HTML <-> React parity
npm run typecheck   # type-checks the wiki and every kit component
npm run build       # runs check:kit first
```

The wiki imports components, `RULES.md` and each `COMPONENT.md` straight from `kit/`, so edits there
hot-reload in the running wiki.

`check:kit` fails on raw colors, hard-coded durations, shadows or blur in component CSS, undefined
tokens, imports that leave the kit, missing `"use client"`, missing types for controllers that React
imports, COMPONENT.md metadata that does not match the files, stray files in `kit/`, and markup the
React version renders that the HTML reference never shows.

## Adding a component to the kit

1. `kit/components/<id>/` with `COMPONENT.md` (frontmatter: id, name, summary, motion tier,
   requires, components, files), `<id>.css` in `@layer x.components`, `<id>.html`, and `<id>.tsx`.
2. A React example in `wiki/scripts/parity.tsx`.
3. A demo in `wiki/src/demos/demos.tsx`, a page `wiki/src/pages/components/<id>.mdx`, and an entry with an
   icon in `wiki/src/navigation.ts`.
4. `npm run check:kit` and `npm run typecheck` in `wiki/`.

## Releasing

1. Bump `kit/VERSION` and run the checks.
2. Commit and tag the commit `v<version>`. The tag is what the install prompt clones.
3. Deploy the wiki: `npm run deploy` in `wiki/` (it shows the new version and updates the prompts).

## License

MIT. See [LICENSE](./LICENSE).
