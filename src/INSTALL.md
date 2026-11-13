# XRAY/DESIGN kit

A copy-in UI kit for agents. Nothing is installed as a package. This branch contains only the
installable kit; its source and playground are on `main` of https://github.com/xray-network/design.

```
design/           -> <project>/.agents/design/          catalog: rules, tokens, motion, components
skills/design/    -> <project>/.agents/skills/design/   agent skill: add, adapt, upgrade, audit
```

## Install

Give your coding agent this prompt from the project root:

> Install XRAY/DESIGN kit v{{version}}. Clone `https://github.com/xray-network/design.git` with
> `--depth 1 --branch kit/v{{version}}` into a temporary directory. Check that `design/VERSION` starts with
> `{{version}}`. Copy `design/` to `.agents/design/` and `skills/design/` to `.agents/skills/design/`, and
> delete the temporary directory. Then follow the Setup section of `.agents/skills/design/SKILL.md`.

After setup, ask for components by name ("add the segmented control to the period filter"), or just
describe UI. The agent reads `.agents/design/RULES.md` and copies components from the catalog.

## Upgrade

> Upgrade XRAY/DESIGN to v<new version>, following the Upgrade section of `.agents/skills/design/SKILL.md`.

Local changes to copied components are kept with a 3-way merge. Conflicts are listed for the agent to resolve.

## Requirements

- Browsers: Baseline 2024 (Chrome/Edge 123+, Safari 17.5+, Firefox 128+). Newer features (anchor positioning,
  `@starting-style` exit transitions) degrade gracefully.
- React version: React 19+. Plain HTML pages need no build step.
- The helper script needs Node 18+. Without Node, the agent follows the same steps by hand.
