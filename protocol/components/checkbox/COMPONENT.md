---
id: checkbox
name: Checkbox
summary: Native checkbox, restyled, with a label, an optional description, indeterminate state and groups.
motion: 0
requires: [tokens]
components: []
files: [checkbox.css, checkbox.html, checkbox.tsx]
---

# Checkbox

Independent on/off choices that apply on submit: notification types, terms, filters in a form.
A setting that applies immediately is a Switch; one choice from a short list is Radio.

## Anatomy

```
fieldset.x-checkbox-group             vertical, 12px gaps
├── legend                            13/600 group label
└── label.x-checkbox                  the whole row is clickable
    ├── input[type=checkbox]          18px, 5px radius; look replaced, behavior native
    └── span.x-checkbox-text
        └── [span.x-checkbox-description]   second line, 13px muted
```

## States

| State | Source | Look |
|---|---|---|
| hover | `:hover` | box border one step stronger |
| checked | `:checked` | accent fill; white check pops in |
| indeterminate | `.indeterminate = true` (JS) | accent fill; white dash |
| focus | `input:focus-visible` | 2px accent ring around the box |
| disabled | `input:disabled` | 40% opacity |

## Accessibility

- Native input: Space toggles; the value submits with forms.
- Group related checkboxes in a `fieldset` with a `legend`.
- Indeterminate is visual only ("some children checked"); set it from JS.

## Motion

Tier 0. Fill and border on `--x-duration-fast`; the mark scales in on `--x-spring`. Reduced motion: instant.

## Component tokens

`--x-checkbox-size`.

## Invariants

- Native `input type="checkbox"`; state from `:checked` and `:indeterminate`, never classes.
- The label wraps the input, so the text is clickable.
- Checked is accent blue.

## Safe edits

- A trailing element in the row (a Tag, a price).
- A "select all" checkbox driving indeterminate from its children.

## Checklist

- [ ] Clicking the label toggles; Space toggles when focused
- [ ] Both themes; disabled; indeterminate
- [ ] Reduced motion: the mark appears without scaling
