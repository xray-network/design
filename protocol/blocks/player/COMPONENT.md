---
id: player
name: Player
summary: What is playing, with its artwork, title and artist, a bar to scrub through it and the controls, full size or as a small bar.
motion: 0
requires: [tokens]
components: [button, icon, slider]
files: [player.css, player.html, player.tsx]
---

# Player

The now-playing screen of a music or podcast app, and the small bar that stays at the foot of every other screen
while something plays. Full size it is the artwork, what it is, a bar to scrub through it and three controls;
mini, it is one row with a hairline of progress.

The app plays the sound and keeps the position. Open the full player from the mini one with the
Drag pattern, as a sheet.

## Anatomy

```
section.x-player[aria-label]
├── div.x-player-art                          a square; the first child fills it
├── div.x-player-meta
│   ├── div.x-player-text                     h2.x-player-title + p.x-player-artist, one line each
│   └── button.x-icon-button[aria-pressed]    optional; like
├── div.x-player-progress
│   ├── div.x-slider[data-size="sm"]          the scrubber, in seconds
│   └── div.x-player-times[aria-hidden]       played and length
└── div.x-player-controls                     previous, button.x-player-play, next

section.x-player[data-variant="mini"]
├── button.x-player-open                      span.x-player-art + span.x-player-text; opens the full player
├── div.x-player-controls                     button.x-player-play, next
└── span.x-player-line[aria-hidden]           --x-player-progress, 0 to 1
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-variant` | `mini`: one row with a line of progress | the full player |

## States

| State | Source | Look |
|---|---|---|
| playing | the app | the play button shows Pause and is named Pause |
| paused | the app | it shows Play and is named Play |
| liked | `aria-pressed="true"` on the like button | the pressed icon button |

## Accessibility

- A section named "Now playing".
- The play button's name is what it will do: Play, or Pause.
- The scrubber is a native range input; its value is read as time ("1:12 of 3:48").
- In the mini player the text is one button that opens the full one, named with the title and artist.

## Motion

Tier 0. The position moves with the sound, not with an animation. None.

## Component tokens

`--x-player-progress` on the mini player's line: the part played, 0 to 1.

## Invariants

- Play is the only filled control, and it is in the middle.
- Title and artist are one line each and shorten.
- The mini player has two controls at most.
- Times are written m:ss in tabular figures.

## Safe edits

- Shuffle and repeat at the ends of the controls row, as icon buttons with `aria-pressed`.
- A queue or a lyrics button under the controls.
- The artwork's radius, for round covers.

## Checklist

- [ ] The play button's name changes with its icon
- [ ] The scrubber works from the keyboard and reads time, not a number
- [ ] Both themes; a long title shortens in both sizes
