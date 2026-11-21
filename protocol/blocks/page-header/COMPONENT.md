---
id: page-header
name: PageHeader
summary: The top of a page, with its title, one line about it, a way back, and the page's actions at the end.
motion: 0
requires: [tokens]
components: [button]
files: [page-header.css, page-header.html, page-header.tsx]
---

# PageHeader

Every page of a console starts the same way: what it is called, one line about it, and what you can do here. A
page that sits below another (one payment, one deployment) gets an arrow back to its list before the title.

The app supplies the text and the actions.

## Anatomy

```
header.x-page-header
├── a.x-icon-button.x-page-header-back[aria-label]    optional; a button when it has no href
├── div.x-page-header-text
│   ├── h1.x-page-header-title                        one line; it shortens with an ellipsis
│   └── p.x-page-header-description                   optional
└── div.x-page-header-actions                         optional; small buttons, primary last
```

## Variants and sizes

None.

## States

None.

## Accessibility

- The title is the page's `h1`: one PageHeader per page.
- The way back is named for where it goes ("Back to payments"), not "Back".

## Motion

Tier 0. None.

## Component tokens

None.

## Invariants

- One primary action at most, and it is the last one.
- The description is one line of fact, not a slogan.
- Actions never wrap under the title: with more than three, the rest go into a Menu.

## Safe edits

- A Tag or a Status after the title's text.
- A Select or a Segmented in place of buttons, when the page's action is a choice of scope.

## Checklist

- [ ] A long title shortens, and the actions stay on the row
- [ ] The back arrow lines up with the page's left edge
- [ ] Both themes
