---
name: design
description: XRAY/DESIGN kit. Use when building or changing UI in this project. Covers adding kit components (button, segmented, switch, field, dialog, menu, toast), adapting them, creating new components in the kit's style, theming, upgrading the kit, and auditing UI against the design rules. The catalog lives in .agents/design; copied components are project code.
---

# XRAY/DESIGN

This project uses XRAY/DESIGN, a copy-in UI kit. Nothing is installed as a dependency: components
are copied into the project and become project code that you may adapt.

- Catalog (read-only, replaced on upgrade): `.agents/design/`
  - `RULES.md`: the design rules. **Read it completely before any UI work.**
  - `manifest.json`: components, their dependencies and files
  - `components/<id>/COMPONENT.md`: anatomy, states, accessibility, motion, invariants, safe edits, checklist
  - `tokens/`, `base/`, `motion/`: shared foundations
- Lock: `.agents/design.lock.json` records the kit version, the UI folder, the stack, and a hash of every copied file.
- Helper: `node .agents/skills/design/scripts/lock.mjs <command>` (Node 18+). If Node is unavailable,
  do the same steps by hand and keep the lock in the same format.

Never edit files under `.agents/design/`. Edit the project copies.

## Setup (once, right after the kit files are placed)

1. Detect the stack:
   - React if `package.json` has `react` (React 19+ expected; on 18, replace `ref`-as-prop with `forwardRef`).
   - Tailwind v4 if `tailwindcss` ≥ 4 is a dependency.
   - Otherwise plain HTML/CSS.
2. Choose the UI folder (`uiRoot`): an existing `components/ui` or `src/ui`, or ask the human if unclear.
   Default: `src/ui`.
3. Run `node .agents/skills/design/scripts/lock.mjs init --ui <uiRoot> --stack <react|html> [--tailwind] [--no-base]`.
   This copies `tokens/` (and `base/` unless `--no-base`) and writes the lock.
4. Load the tokens once, globally, before any component CSS:
   - React: import `<uiRoot>/tokens/tokens.css` (and `base/base.css`) in the root entry or root layout.
   - Tailwind: in the main CSS, after `@import "tailwindcss"`, import `tokens.css` and `tokens/tailwind.css`.
   - HTML: `<link rel="stylesheet">` tags for `tokens.css` and `base.css` in every page head.
   If the project has its own reset, pass `--no-base` and keep only the focus-ring rule from `base.css`.
5. Add this section to `AGENTS.md` (create the file if it does not exist; do not duplicate the section):
   ```markdown
   ## Design

   - Read `.agents/design/RULES.md` before creating or changing UI.
   - Use the `design` skill (`.agents/skills/design/SKILL.md`) to add, adapt, upgrade or audit components.
   ```
6. Claude Code reads skills from `.claude/skills/`. If the project uses Claude Code, link the skill:
   `mkdir -p .claude/skills && ln -s ../../.agents/skills/design .claude/skills/design`.

## Add a component

1. Read `.agents/design/components/<id>/COMPONENT.md`.
2. Run `node .agents/skills/design/scripts/lock.mjs add <id> [<id> …]`. This copies the component and
   everything it needs (other components, `motion/`) into `<uiRoot>/` with the catalog's layout, so
   relative imports keep working. Files that already exist are never overwritten.
3. Wire it in:
   - React: import from `<uiRoot>/components/<id>/<id>` (the component imports its own CSS).
     Match the project's conventions where cheap: path aliases, file naming, a barrel file.
   - HTML: add a `<link>` to `<uiRoot>/components/<id>/<id>.css`. Paste markup from the catalog's `<id>.html`.
     If there is a controller, load it with `<script type="module">` and call its init function once.
   - Tailwind projects: keep the component's CSS as it is. Rewrite it as utilities on the bridge tokens
     only if the human asks for that.
4. Run the component's checklist.

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
own COMPONENT.md in the same format. Do not add it to the lock (the lock tracks kit files only).

## Theme or rebrand

Override semantic tokens in a project stylesheet loaded after `tokens.css`, never in the copied
files. Usually you need `--x-accent`, `--x-accent-hover`, `--x-accent-press`, `--x-accent-wash`, `--x-focus`, and
optionally fonts. For a different dark palette, override the `light-dark()` pairs. Verify contrast (AA).

## Status

`node .agents/skills/design/scripts/lock.mjs status` lists installed components, the kit version, and
each copied file as `unchanged`, `modified` or `missing`.

## Upgrade the kit

Only when the human asks. Pin the exact version they name.

1. `mv .agents/design .agents/design.prev` (the old catalog is the merge base).
2. Fetch the new kit into a temp dir:
   `git clone --depth 1 --branch kit/v<version> <kit-repo-url> <tmp>`. Verify `<tmp>/design/VERSION`,
   then copy `<tmp>/design` → `.agents/design` and `<tmp>/skills/design` → `.agents/skills/design`.
3. `node .agents/skills/design/scripts/lock.mjs upgrade --base .agents/design.prev`:
   - unchanged files are replaced with the new version
   - modified files get a 3-way merge (`git merge-file`); conflicts are left marked and listed
   - new dependency files are added
4. Resolve every listed conflict, keeping the project's intent and the new kit's fixes. Re-run checklists.
5. Delete `.agents/design.prev` and the temp dir. Summarize what changed (read `.agents/design/CHANGELOG.md` if present).

## Audit

When asked to review UI, check the code against RULES.md and report by rule number:
- raw colors, sizes or durations instead of tokens
- state classes instead of attributes
- missing focus ring, accessible name or keyboard path
- motion outside the budget, or motion that ignores reduced motion
- shadows, blur or decorative gradients
- only one theme checked
Fix them only if asked.
