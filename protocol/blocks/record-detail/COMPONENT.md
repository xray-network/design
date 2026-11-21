---
id: record-detail
name: RecordDetail
summary: One record in full, with its name and state at the top, its facts as a list of labels and values, and what happened to it below.
motion: 0
requires: [tokens]
components: [tag, button, timeline, skeleton]
files: [record-detail.css, record-detail.html, record-detail.tsx]
---

# RecordDetail

The page behind a row: one payment, one order, one deployment, one customer. At the top, what it is and what
state it is in, with what can be done to it. Then its facts as labels and values, the ones people look up first
at the top. Below, its history as a Timeline, or any other section.

The app supplies the record and what its actions do.

## Anatomy

```
article.x-record-detail[aria-labelledby][aria-busy]
├── header.x-record-detail-head
│   ├── div.x-record-detail-id
│   │   ├── div.x-record-detail-line          h2.x-record-detail-title + the status Tag
│   │   └── p.x-record-detail-sub             optional
│   └── div.x-record-detail-actions           optional; small ghost buttons
├── dl.x-record-detail-facts
│   └── div.x-record-detail-fact              dt (label) + dd (value)
└── section.x-record-detail-section[aria-labelledby]    any number
    ├── h3.x-record-detail-heading
    └── …                                     a Timeline, a Table, a Copy block
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| loading | `aria-busy="true"` | skeletons for the title, the line under it and every value; labels stay |
| narrow | the block is 420px wide or less | each label sits above its value |

## Accessibility

- An `article` named by its title.
- Facts are a description list, so each value is read with its label.
- The state is written in the Tag, never a dot alone.

## Motion

Tier 0. None.

## Component tokens

None.

## Invariants

- The title is the thing people recognize the record by, not its database id; the id is a fact.
- A destructive action is the last one, and it asks before it acts.
- Long values wrap; ids and hashes use the Copy component.
- Loading keeps every label in place.

## Safe edits

- Which facts and sections it has.
- Stats above the facts for a record that is mostly numbers.

## Checklist

- [ ] A long id or address wraps inside its value and never widens the page
- [ ] At 420px and less labels sit above values
- [ ] Both themes
