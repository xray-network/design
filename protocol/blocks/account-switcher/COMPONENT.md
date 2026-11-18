---
id: account-switcher
name: Account switcher
summary: The current account as a chip that opens a menu of accounts with avatars and balances.
motion: 0
requires: [tokens]
components: [avatar, menu]
files: [account-switcher.css, account-switcher.html, account-switcher.controller.js, account-switcher.tsx]
---

# Account switcher

Shows which account is active and switches to another one: the account chip of the app's mobile bar,
or the account control in a page header.

## Anatomy

```
div.x-account-switcher
├── button.x-account-switcher-trigger[popovertarget][aria-label]   36px chip, fully round, chip surface
│   ├── span.x-avatar                                             36px: fills the chip's height, seeded by the address
│   ├── span.x-account-switcher-text   label (13/600) / balance (11px muted)
│   └── svg.x-account-switcher-chevron
└── div.x-menu.x-account-switcher-menu[popover][role=menu]         Menu, 280px min
    ├── .x-menu-heading                "Accounts"
    ├── button.x-menu-item[role=menuitemradio][aria-checked][data-id]   48px rows: avatar 28px · label / balance · check
    ├── .x-menu-separator
    └── button.x-menu-item.x-account-switcher-add[role=menuitem]   dashed circle + "Add account"
```

## Behavior

- Opens like a Menu (keyboard, Esc, light dismiss, positioning): the Menu controller does it.
- Choosing an account checks it, closes the menu and returns focus to the trigger.
- HTML: `account-switcher.controller.js` also copies the chosen avatar, label and balance into the trigger and
  fires `change` with `detail.id`. React: `onValueChange(id)`; the parent passes the new `value`.

## Loading

React `loading`: the trigger's avatar shows Avatar's loading spinner (`aria-busy="true"`); the label and balance stay, so nothing moves.

## Accessibility

- The trigger's `aria-label` names the current account and the action ("Account …lkgc86, switch account").
- Accounts are `menuitemradio` with `aria-checked`, so the current one is announced.
- Avatars are decorative; the label carries the identity.

## Motion

Tier 0. The menu opens like Menu; the check pops in on `--x-spring`.

## Invariants

- One current account, always shown in the trigger.
- The trigger is the app's account chip: avatar flush left at full height, 12px on the right, fully round corners.
- Labels are short account names; balances are in the account's currency, on a smaller muted line.

## Safe edits

- Hidden balances: replace the balance with the mask, as Numeral does.
- Group accounts by workspace with extra `.x-menu-heading` rows.
- A badge on the avatars (Avatar `badge`: verified, admin).
- Compact trigger (avatar only) in narrow bars, with the label in the `aria-label`.

## Checklist

- [ ] Choosing an account updates the trigger and the check, closes the menu, keeps focus on the trigger
- [ ] Keyboard: open, move with arrows, choose with Enter, close with Esc
- [ ] Long labels truncate in the trigger
- [ ] Both themes
