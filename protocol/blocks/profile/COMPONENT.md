---
id: profile
name: Profile
summary: The top of a person's or an organization's page, with the avatar, name and handle, a short bio, a row of counts, and the main actions.
motion: 0
requires: [tokens]
components: [avatar, button, skeleton]
files: [profile.css, profile.html, profile.tsx]
---

# Profile

Who this page belongs to, in one glance: a social profile, a contact card, a merchant or a team page. The counts
are the two or three figures that matter there (posts, followers, following; or orders, rating). One primary
action at most; the rest are ghost buttons.

The app supplies the identity, the counts and what the actions do.

## Anatomy

```
section.x-profile[aria-labelledby]
├── div.x-profile-top
│   ├── span.x-profile-lead              the Avatar (lg), or the app's own picture
│   └── dl.x-profile-stats               up to four counts, spread evenly
│       └── div > dd (value) + dt (label)
├── div.x-profile-id
│   ├── h2.x-profile-name
│   └── span.x-profile-handle            mono, muted
├── p.x-profile-bio                      optional; three lines at most before it clamps
└── div.x-profile-actions                equal-width buttons; primary first
```

## Variants and sizes

None. It fills its column; on wide layouts cap it with `max-width`.

## States

| State | Source | Look |
|---|---|---|
| loading | `aria-busy="true"` | skeletons for the name, handle, bio and counts; actions disabled |

## Accessibility

- A `section` named by the person's name (the `h2`).
- Counts are a description list: each value reads with its label ("1,204 followers").
- The avatar is decorative; the name carries the identity.

## Motion

Tier 0. None.

## Component tokens

None; it uses Avatar and Button tokens.

## Invariants

- Counts are values with labels, never bare numbers.
- One primary action at most.

## Safe edits

- Counts: two to four, or none.
- A verified mark or a Tag after the name.
- Counts as links to their lists.

## Checklist

- [ ] Long names and bios shorten; counts stay on one row at phone width
- [ ] Loading keeps the block's height
- [ ] Both themes
