---
name: design
description: Build, adapt, theme, upgrade and audit XRAY/DESIGN interfaces. Copy the supplied HTML or React components, or translate the visual protocol and component contracts into SwiftUI, UIKit, AppKit, JavaFX, Android and other GUI frameworks. Use for UI work in projects using XRAY/DESIGN. The installed catalog is read-only; project implementations are editable.
---

# XRAY/DESIGN

This project uses XRAY/DESIGN: a shared visual protocol and a copy-in web UI kit. Web components
are copied into the project and become project code. Native GUI projects implement the same design
using their framework; the catalog supplies contracts and web references, not prebuilt native libraries.

This folder (`.agents/design/`) is the **catalog**. It is read-only and replaced on upgrade:

| Path | What it is |
|---|---|
| `DESIGN-PROTOCOL.md` | The design protocol: every token in its YAML header, its `Protocol-Version` under the title, then the rules. **Read it completely before any UI work.** |
| `CHANGELOG.md` | What changed in each version; **Breaking** entries need project changes |
| `references/native-gui.md` | Native setup, token conversion, component implementation, status and upgrades; read only for native GUI work |
| `core/tokens.css`, `core/base.css` | Tokens and layers; optional reset |
| `core/motion.js`, `core/motion.d.ts` | Motion helpers (liquid indicator, FLIP, springs). No dependencies |
| `components/<id>/COMPONENT.md` | Contract: anatomy, states, accessibility, motion, invariants, safe edits, checklist. Its frontmatter lists dependencies (`requires`, `components`) and `files` |
| `components/<id>/<id>.css` `.html` `.tsx` `.controller.js` | Styles, HTML reference, React version, vanilla controller |
| `blocks/<id>/` | Blocks: screen sections built only from components. Same files as a component; `COMPONENT.md` lists the components it uses |

Only `core/`, `components/` and `blocks/` hold web code that is copied into the project; root documents and
`references/` remain guidance in the catalog. Never edit the installed catalog. Edit project implementations under `uiRoot`.

## Choose the implementation

Identify the target UI framework and OS from the requested screen, existing UI code and build files.
A repository may contain several apps: a `package.json` for tooling does not make its native UI a web app.

- React in a browser: use the web workflows below with `stack: "react"`.
- Plain HTML or another browser framework: use `stack: "html"`; adapt templates and controller integration to the host.
- Native or a non-DOM GUI (including React Native): read [Native GUI](references/native-gui.md) and use its
  setup, implementation, status and upgrade workflows instead of copying CSS/TSX or browser controllers.

For an existing installation, check the lock's stack and framework. For a new one, detect the framework before
writing a lock or copying files. If the target is still ambiguous, ask which app/framework to change; do not
fall back to HTML just because React is absent. Preserve the project's chosen framework and language.

The project's **UI folder** (`uiRoot`, for example `src/ui/`) holds its UI implementation and a lock file,
`<uiRoot>/design.lock.json`, that records what the project uses. Web example:

```json
{ "version": "1.0.0", "stack": "react", "base": true, "components": ["button", "numeral", "tag"], "blocks": ["balance"] }
```

Once the project has a theme (see "Theme or rebrand"), the lock also names its theme layer, relative to `uiRoot`:
`"theme": "theme.css"`. The theme layer belongs to the project; upgrades never modify it.

The lock's location defines `uiRoot`: it is the folder that contains `design.lock.json`. Find it through the
"UI folder" line of the Design section in `AGENTS.md`; if that is missing, search the project for `design.lock.json`.
No lock means the kit has not been set up in this project yet: run Setup.

## How copying works (web)

Copied files keep the catalog's layout under `uiRoot`, so relative imports keep working:

```text
.agents/design/core/tokens.css                 -> <uiRoot>/core/tokens.css
.agents/design/core/motion.js                  -> <uiRoot>/core/motion.js
.agents/design/components/menu/menu.css        -> <uiRoot>/components/menu/menu.css
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

## Setup (once, right after the kit is placed in `.agents/design/`)

Native targets follow [Native setup](references/native-gui.md#setup). The remaining steps are for web targets.

1. Confirm the target stack as described above. React 19+ is expected; on 18, replace `ref`-as-prop with `forwardRef`.
2. Choose the UI folder (`uiRoot`): an existing `components/ui` or `src/ui`, or ask the human if unclear. Default: `src/ui`.
3. Copy `core/tokens.css` to `<uiRoot>/core/tokens.css`. Copy `core/base.css` too, unless the project has its own reset
   (then copy only its focus-ring rule into the project's CSS).
4. Load the tokens once, globally, before any component CSS:
   - React: import `<uiRoot>/core/tokens.css` (and `core/base.css`) in the root entry or root layout.
   - HTML: `<link rel="stylesheet">` tags for `core/tokens.css` and `core/base.css` in every page head.
5. Connect dark mode. Kit colors follow `color-scheme`: the OS setting by default, or `data-theme="dark|light"`.
   If the project instead switches themes with a `.dark` class (for example `classList.toggle("dark")`,
   next-themes with `attribute="class"`, or an existing `@custom-variant dark`), add this to the main CSS, after the tokens:
   ```css
   .dark { color-scheme: dark; }
   :root:not(.dark) { color-scheme: light; }
   ```
   In a Tailwind project, also add `@custom-variant dark (&:where(.dark, .dark *));` if it is not there yet, so
   `dark:` utilities follow the same class. Projects that follow the OS need nothing.
6. Write `<uiRoot>/design.lock.json` with `version` from the `Protocol-Version` line of `DESIGN-PROTOCOL.md`, `stack`, `base`, `"components": []` and `"blocks": []`.
7. Add this section to `AGENTS.md` (create the file if it does not exist; do not duplicate the section):
   ```markdown
   ## Design

   - Read `.agents/design/DESIGN-PROTOCOL.md` before creating or changing UI.
   - Use the `design` skill (`.agents/design/SKILL.md`) to add, adapt, upgrade or audit components.
   - UI folder: `<uiRoot>/` (kit components are listed in `<uiRoot>/design.lock.json`).
   ```
   Write the actual path in place of `<uiRoot>`. If the UI folder moves later, move the lock with it and update this line.
8. Claude Code reads skills from `.claude/skills/`. If the project uses Claude Code, link the skill:
   `mkdir -p .claude/skills && ln -s ../../.agents/design .claude/skills/design`.

## Add a component

Native targets follow [Implement components and blocks](references/native-gui.md#implement-components-and-blocks).

1. Read `components/<id>/COMPONENT.md`, including its frontmatter.
2. Copy its dependencies and then its files, following "How copying works".
3. Add the component (and any dependency components) to `components` in the lock.
4. Wire it in:
   - React: import from `<uiRoot>/components/<id>/<id>` (the component imports its own CSS).
     Match the project's conventions where cheap: path aliases, file naming, a barrel file.
   - HTML: add a `<link>` to `<uiRoot>/components/<id>/<id>.css`. Paste markup from the catalog's `<id>.html`.
     If there is a controller, load it with `<script type="module">` and call its init function once.
5. Run the component's checklist.

## Add a block

Native targets use the same [native implementation workflow](references/native-gui.md#implement-components-and-blocks).

Blocks are finished screen sections (balance, send form, transaction history) built only from components.

1. Read `blocks/<id>/COMPONENT.md`. Its frontmatter `components` lists the components the block uses, and the
   optional `blocks` lists other blocks it builds on.
2. Add those components ("Add a component") and those blocks (this section) first, then copy the block's files the
   same way into `<uiRoot>/blocks/<id>/`. Its imports (`../../components/<id>/<id>`, `../<block>/<block>`) then resolve.
3. Add the block to `blocks` in the lock.
4. Wire it in like a component (React import, or HTML link, markup and controller), then feed it real data:
   blocks take data through props (React) or markup (HTML) and never fetch it themselves.
5. Run the block's checklist.

## Adapt a component (the human asks for a change)

1. Read the component's COMPONENT.md: **Invariants** and **Safe edits**.
2. Prefer, in order: overriding component tokens → a variant/size → composition within the safe edits → structural changes.
   Web variants use `data-variant`/`data-size`; native variants use typed properties and theme overrides.
3. If the change would break an invariant or a rule, say so and propose the closest compliant
   option. Do it anyway only if the human confirms.
4. If both the HTML and React versions are in use, change both the same way. Web state stays in attributes;
   native state uses the framework's properties/bindings and accessibility semantics.
5. Re-run the checklist (both themes, keyboard, reduced motion, phone width).

## Create a new component

When the kit has nothing suitable, build it in the kit's style (DESIGN-PROTOCOL.md section 14):
semantic and component tokens, framework-native controls first, a motion tier from the budget, both themes.
Web implementations use `x-<name>` classes, attribute state and `@layer components`; native implementations
follow [Native GUI](references/native-gui.md). Put it in the project's component folder under `uiRoot` with its
own COMPONENT.md in the same format. Do not add it to the lock (the lock lists kit components only).
A new block goes in `<uiRoot>/blocks/<name>/` and may use components and other blocks; components never use blocks.

## Theme or rebrand

The theming surface (which tokens may change, which stay) is defined in DESIGN-PROTOCOL.md §11. The same steps apply
to every GUI framework; only the theme layer's form differs.

1. Get the inputs from the human: the brand color, and optionally fonts (only ones the project loads), a radius
   preference (sharper or rounder than the kit), and a custom neutral palette. Do not invent a brand color.
2. Find the theme layer through the lock's `theme`. If there is none, create one in `uiRoot` and record its path
   there:
   - Web: a stylesheet such as `<uiRoot>/theme.css`, loaded once, globally, after `core/tokens.css` (next to the
     tokens import or `<link>`). Set color tokens on `:root, [data-theme]`, the kit's own selector for them, so
     sections with a forced `data-theme` keep your values. Tailwind projects need nothing more: utilities read the
     same variables.
   - Native: a theme file or resource set in the project's theme module that overrides the translated tokens,
     following [Translate tokens](references/native-gui.md#translate-tokens).
3. Derive the whole accent set from the brand color, for both themes: `accent` (fills; it may stay the same in both
   themes), `accent-hover` (lighter), `accent-press` (darker), `accent-fg` (text on the fill), `accent-wash` (the fill
   at low alpha: about 0.07 light, 0.14 dark), and `accent-ink` with `accent-ink-hover`: the brand color in light
   theme and a lighter shade in dark theme, for focus rings, links, icons and check marks. `link` and `focus` follow
   the ink (on the web, `core/tokens.css` already points them at it); set `info-fg` to match the ink. Fonts, radius
   and neutrals follow the rules in §11.
4. Write only the changed tokens into the theme layer. Never edit copied kit files, including `core/tokens.css`.
5. Check AA contrast for every changed pair in both themes: `accent-fg` on `accent`, and the ink and `link` on `bg`
   and `bg-panel`. Then look at the affected screens in light and dark theme, with keyboard focus visible.
6. Report the tokens you changed, with their values in both themes, and any pair that failed a check.

## Status

For native targets, use [Native status and upgrades](references/native-gui.md#status-and-upgrades), not catalog file comparison.

Report the lock's version and components, and for each copied file whether it is unchanged, modified
or missing (compare with the catalog as described in "How copying works"). If the lock names a `theme`, report it
and the tokens it overrides.

## Upgrade the kit

For native targets, use [Native status and upgrades](references/native-gui.md#status-and-upgrades). The copying
and 3-way merge procedure below applies only to web targets.

Only when the human asks. The latest version is the `main` branch; if the human names a version, use its tag
(`--branch v<version>`) instead. Ask them to commit first: version control is the rollback path.

1. Move the current catalog out as the merge base: `mv .agents/design <tmp>/base`.
   (Keep the base outside `.agents/`, so no agent reads it as the installed kit.)
2. Fetch the new kit: `git clone https://github.com/xray-network/design.git <tmp>/repo`.
   If the `Protocol-Version` line in `<tmp>/repo/protocol/DESIGN-PROTOCOL.md` equals the lock's `version`, move the base back,
   delete `<tmp>`, and report that the kit is already up to date. Otherwise copy `<tmp>/repo/protocol` to `.agents/design`.
   From here on, follow the **new** SKILL.md. Read the new `CHANGELOG.md` sections after the lock's `version`;
   apply every **Breaking** entry to the project code in step 5.
3. For every kit file the project has under `uiRoot` (the `core/` files it copied, and each component and block in the lock):
   - new catalog file identical to the base file → nothing to do
   - project file identical to the base file (unchanged) → replace it with the new catalog file
   - project file modified → 3-way merge:
     `git merge-file -L project -L "kit <old>" -L "kit <new>" <project file> <base file> <new catalog file>`.
     Conflicts are left marked; list them.
   - file no longer in the new catalog → keep the project file and report it

   The theme layer named by the lock's `theme` is not a kit file: never replace or merge it. If the changelog
   renames or removes a token it overrides, update that override in step 5 and report it.
4. Copy any file the new version of an installed component needs that the project does not have yet.
5. Resolve every conflict, keeping the project's intent and the kit's fixes. Re-run the checklists of changed components.
6. Set `version` in the lock, delete `<tmp>`, and summarize what changed, using the changelog sections you read.

## Audit

When asked to review UI, check the code against DESIGN-PROTOCOL.md and report by section number:
- raw colors, sizes or durations instead of tokens
- web state classes instead of attributes, or native visuals/accessibility out of sync with framework state
- missing focus ring, accessible name or keyboard path
- motion outside the budget, or motion that ignores reduced motion
- shadows, blur or decorative gradients
- only one theme checked
For native targets also check the recorded platform adaptations, text scaling and touch targets against
[Native verification](references/native-gui.md#verification). Browser-only mechanisms are checked only on web targets.
Fix them only if asked.
