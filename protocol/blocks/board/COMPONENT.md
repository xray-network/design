---
id: board
name: Board
summary: Work laid out in columns by state, each column a short stack of cards with a key, a title, labels and who has it.
motion: 0
requires: [tokens]
components: [tag, avatar, button]
files: [board.css, board.html, board.tsx]
---

# Board

A sprint, a hiring pipeline, a list of orders by stage: anything that moves through a few states. Each state is a
column with its count, and each thing is a card with what is needed to pick it out: a key, a title, a label or
two, and who has it. Wider than its page, the board scrolls sideways.

The app supplies the cards and moves them. Inside a column, order cards with the
Reorder pattern.

## Anatomy

```
div.x-board[role="group"][aria-label]         columns side by side; scrolls sideways
└── section.x-board-column[aria-labelledby]
    ├── header.x-board-head
    │   ├── h3.x-board-title
    │   ├── span.x-board-count
    │   └── button.x-icon-button              optional; add a card
    ├── ol.x-board-cards
    │   └── li › a.x-board-card               or a button
    │       ├── span.x-board-key              optional; mono
    │       ├── span.x-board-name             three lines at most
    │       └── span.x-board-foot             span.x-board-tags + the assignee's Avatar (22px)
    └── p.x-board-empty                       when the column has no cards
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| empty column | no cards | the column keeps its place and says nothing is there |
| hover | the pointer is over a card | the card's hairline steps up |

## Accessibility

- A named group; each column is a section named by its title, and its cards are an ordered list.
- Each card is one link or button; its key and title are its name.
- The add button says which column it adds to.
- Moving a card must also work without dragging: a Menu on the card, or the Reorder pattern's keys.

## Motion

Tier 0 of its own. With Reorder, cards move as that pattern defines.

## Component tokens

None.

## Invariants

- Three to six columns, in the order work moves through them.
- A card shows a key, a title, two labels at most and one person. The rest is on its page.
- Columns are at least 240px wide; the board scrolls rather than squeezing them.
- No colored columns and no colored cards: the labels carry the kind.

## Safe edits

- A status dot before a column's title.
- A limit after the count ("3 / 5").
- A priority icon in a card's foot.

## Checklist

- [ ] Four columns scroll sideways on a narrow page, and the page itself does not
- [ ] An empty column still reads as a column
- [ ] Both themes
