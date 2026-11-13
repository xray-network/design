---
name: design
description: XRAY/DESIGN kit. Use when building or changing UI in this project. Covers adding kit components (button, tabs, segmented, chips, switch, option cards, field, list, card and tile, numeral, avatar, tag, dialog, menu, toast), adapting them, creating new components in the kit's style, theming, upgrading the kit, and auditing UI against the design rules. This folder is the read-only catalog; copied components are project code.
---

# XRAY/DESIGN

This project uses XRAY/DESIGN, a copy-in UI kit. Nothing is installed as a dependency: components
are copied from this folder into the project and become project code that you may adapt.

This folder (`.agents/skills/design/`) is the **catalog**. It is read-only and replaced on upgrade:

| Path | What it is |
|---|---|
| `RULES.md` | The design rules. **Read it completely before any UI work.** |
| `VERSION` | The installed kit version |
| `core/tokens.css`, `core/base.css`, `core/tailwind.css` | Tokens and layers; optional reset; optional Tailwind v4 bridge |
| `core/motion.js`, `core/motion.d.ts` | Motion helpers (liquid indicator, FLIP, springs). No dependencies |
| `components/<id>/COMPONENT.md` | Contract: anatomy, states, accessibility, motion, invariants, safe edits, checklist. Its frontmatter lists dependencies (`requires`, `components`) and `files` |
| `components/<id>/<id>.css` `.html` `.tsx` `.controller.js` | Styles, HTML reference, React version, vanilla controller |

`.agents/design.lock.json` records what this project uses:

```json
{ "version": "0.1.0", "uiRoot": "src/ui", "stack": "react", "tailwind": false, "base": true, "components": ["button"] }
```

Only `core/` and `components/` hold code that is copied into the project; the files at the root of this folder
(`SKILL.md`, `RULES.md`, `VERSION`) never are. Never edit files in this folder. Edit the project copies under `uiRoot`.

## How copying works

Copied files keep the catalog's layout under `uiRoot`, so relative imports keep working:

```text
.agents/skills/design/core/tokens.css                 -> <uiRoot>/core/tokens.css
.agents/skills/design/core/motion.js                  -> <uiRoot>/core/motion.js
.agents/skills/design/components/menu/menu.css        -> <uiRoot>/components/menu/menu.css
```

Which files to copy for a component:

- Always: its `.css`.
- React (`stack: "react"`): its `.tsx`, plus any `.controller.js` and `.d.ts` that the `.tsx` imports.
- HTML (`stack: "html"`): its `.controller.js`. Paste markup from `<id>.html` into pages; do not copy the file.
- Never: `COMPONENT.md` and `<id>.html`. They stay in the catalog as the reference.
- Dependencies first: every component in its frontmatter `components`, and `core/motion.js` (plus `core/motion.d.ts` for React)
  when `requires` includes `motion`.

Never overwrite a file that already exists under `uiRoot`. A project file is **unchanged** when it is identical to its
catalog counterpart (`cmp -s <catalog file> <project file>`), and **modified** otherwise.

## Setup (once, right after the kit is placed in `.agents/skills/design/`)

1. Detect the stack:
   - React if `package.json` has `react` (React 19+ expected; on 18, replace `ref`-as-prop with `forwardRef`).
   - Tailwind v4 if `tailwindcss` ≥ 4 is a dependency.
   - Otherwise plain HTML/CSS.
2. Choose the UI folder (`uiRoot`): an existing `components/ui` or `src/ui`, or ask the human if unclear. Default: `src/ui`.
3. Copy `core/tokens.css` to `<uiRoot>/core/tokens.css`. Copy `core/base.css` too, unless the project has its own reset
   (then copy only its focus-ring rule into the project's CSS). Copy `core/tailwind.css` for Tailwind v4 projects.
4. Load the tokens once, globally, before any component CSS:
   - React: import `<uiRoot>/core/tokens.css` (and `core/base.css`) in the root entry or root layout.
   - Tailwind: in the main CSS, after `@import "tailwindcss"`, import `core/tokens.css` and then `core/tailwind.css`.
   - HTML: `<link rel="stylesheet">` tags for `core/tokens.css` and `core/base.css` in every page head.
5. Write `.agents/design.lock.json` with the version from `VERSION`, `uiRoot`, `stack`, `tailwind`, `base`, and `"components": []`.
6. Add this section to `AGENTS.md` (create the file if it does not exist; do not duplicate the section):
   ```markdown
   ## Design

   - Read `.agents/skills/design/RULES.md` before creating or changing UI.
   - Use the `design` skill (`.agents/skills/design/SKILL.md`) to add, adapt, upgrade or audit components.
   ```
7. Claude Code reads skills from `.claude/skills/`. If the project uses Claude Code, link the skill:
   `mkdir -p .claude/skills && ln -s ../../.agents/skills/design .claude/skills/design`.

## Add a component

1. Read `components/<id>/COMPONENT.md`, including its frontmatter.
2. Copy its dependencies and then its files, following "How copying works".
3. Add the component (and any dependency components) to `components` in the lock.
4. Wire it in:
   - React: import from `<uiRoot>/components/<id>/<id>` (the component imports its own CSS).
     Match the project's conventions where cheap: path aliases, file naming, a barrel file.
   - HTML: add a `<link>` to `<uiRoot>/components/<id>/<id>.css`. Paste markup from the catalog's `<id>.html`.
     If there is a controller, load it with `<script type="module">` and call its init function once.
   - Tailwind projects: keep the component's CSS as it is. Rewrite it as utilities on the bridge tokens
     only if the human asks for that.
5. Run the component's checklist.

## Adapt a component (the human asks for a change)

1. Read the component's COMPONENT.md: **Invariants** and **Safe edits**.
2. Prefer, in order: overriding component tokens → a new `data-variant`/`data-size` → editing markup within
   the safe edits → structural changes.
3. If the change would break an invariant or a rule, say so and propose the closest compliant
   option. Do it anyway only if the human confirms.
4. If both the HTML and React versions are in use, change both the same way. State stays in attributes.
5. Re-run the checklist (both themes, keyboard, reduced motion, phone width).

## Create a new component

When the kit has nothing suitable, build it in the kit's style (RULES.md section 14):
semantic and component tokens, `x-<name>` classes, attribute state, `@layer x.components`, native
elements first, a motion tier from the budget, both themes. Put it in `<uiRoot>/components/<name>/` with its
own COMPONENT.md in the same format. Do not add it to the lock (the lock lists kit components only).

## Theme or rebrand

Override semantic tokens in a project stylesheet loaded after `core/tokens.css`, never in the copied
files. Usually you need `--x-accent`, `--x-accent-hover`, `--x-accent-press`, `--x-accent-wash`, `--x-focus`, and
optionally fonts. For a different dark palette, override the `light-dark()` pairs. Verify contrast (AA).

## Status

Report the lock's version and components, and for each copied file whether it is unchanged, modified
or missing (compare with the catalog as described in "How copying works").

## Upgrade the kit

Only when the human asks. Pin the exact version they name. Ask them to commit first: version control is the rollback path.

1. Move the current catalog out as the merge base: `mv .agents/skills/design <tmp>/base`.
   (Do not leave a second copy inside `.agents/skills/`; it would be loaded as a skill.)
2. Fetch the new kit: `git clone --depth 1 --branch v<version> https://github.com/xray-network/design.git <tmp>/repo`.
   Check that `<tmp>/repo/kit/VERSION` is `<version>`, then copy `<tmp>/repo/kit` to `.agents/skills/design`.
   From here on, follow the **new** SKILL.md.
3. For every kit file the project has under `uiRoot` (the `core/` files it copied, and each component in the lock):
   - new catalog file identical to the base file → nothing to do
   - project file identical to the base file (unchanged) → replace it with the new catalog file
   - project file modified → 3-way merge:
     `git merge-file -L project -L "kit <old>" -L "kit <new>" <project file> <base file> <new catalog file>`.
     Conflicts are left marked; list them.
   - file no longer in the new catalog → keep the project file and report it
4. Copy any file the new version of an installed component needs that the project does not have yet.
5. Resolve every conflict, keeping the project's intent and the kit's fixes. Re-run the checklists of changed components.
6. Set `version` in the lock, delete `<tmp>`, and summarize what changed.

## Audit

When asked to review UI, check the code against RULES.md and report by rule number:
- raw colors, sizes or durations instead of tokens
- state classes instead of attributes
- missing focus ring, accessible name or keyboard path
- motion outside the budget, or motion that ignores reduced motion
- shadows, blur or decorative gradients
- only one theme checked
Fix them only if asked.
