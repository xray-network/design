---
id: settings
name: Settings
summary: A settings form in sections, each a title and a line of explanation beside its controls, with one pair of save and cancel at the end.
motion: 0
requires: [tokens]
components: [input, switch, button]
files: [settings.css, settings.html, settings.tsx]
---

# Settings

The settings page of an account, a workspace or a project. Each section says in a title and one line what it is
about, and keeps its controls beside that, so a long form reads as a few short ones. One Save and one Cancel at
the end apply to the whole form; the things that cannot be undone are the last section.

The app supplies the controls and what saving does.

## Anatomy

```
form.x-settings
├── section.x-settings-section[data-tone="danger"][aria-labelledby]
│   ├── div.x-settings-about
│   │   ├── h2.x-settings-title
│   │   └── p.x-settings-description          optional
│   └── div.x-settings-fields                 fields, switches, groups: each at most 360px wide
└── div.x-settings-actions                    Save, then Cancel; under the fields column
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-tone` on a section | `danger`: the title takes the danger color | neutral |

## States

| State | Source | Look |
|---|---|---|
| narrow | the form is 600px wide or less | each section's explanation sits above its controls |

## Accessibility

- A `form`; each section is named by its title.
- Every control keeps its own label: the section title does not replace it.
- Save is a submit button, so Enter in a field saves.

## Motion

Tier 0. None.

## Component tokens

None.

## Invariants

- Three to six sections; more become pages of their own.
- Controls are at most 360px wide, however wide the page.
- The danger section is last and its button is the danger Button, never the primary.
- One Save for the whole form, or none when settings save as they change: never one per section.

## Safe edits

- The sections and their controls.
- A sticky actions row for a very long form.

## Checklist

- [ ] At 600px and less the sections stack and the actions line up with the fields
- [ ] Tab order runs down the fields, then Save, then Cancel
- [ ] Both themes
