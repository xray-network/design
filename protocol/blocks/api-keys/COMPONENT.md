---
id: api-keys
name: ApiKeys
summary: The keys of an account, with a form to make a new one, the new key shown once to copy, and each key's last use and a way to revoke it.
motion: 0
requires: [tokens]
components: [input, button, copy, tag]
files: [api-keys.css, api-keys.html, api-keys.tsx]
---

# ApiKeys

Where a developer makes and looks after the keys of an account. Making a key asks only for a name; the new key is
then shown once, in full, with a copy button, and after that only its last four characters. Every key says when
it was last used, so an unused one is easy to find and revoke.

The app makes, stores and revokes the keys. The block never holds a full key except the one being shown.

## Anatomy

```
section.x-api-keys[aria-label]
├── form.x-api-keys-new                       optional: a name field, Create key, Cancel
├── div.x-api-keys-secret[role="status"]      optional: the new key, once
│   ├── p.x-api-keys-secret-title + p.x-api-keys-secret-note
│   ├── div.x-copy[data-variant="block"]      the full key and its copy button
│   └── button.x-button                       Done
└── ul.x-api-keys-list
    └── li.x-api-keys-key[data-state="revoked"]
        ├── span.x-api-keys-name
        ├── span.x-api-keys-meta              code.x-api-keys-value (masked) + last use
        ├── span.x-tag                        Active, or Revoked
        └── button.x-button                   Revoke; none on a revoked key
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| making a key | the form is present | a name field with Create key and Cancel |
| new key | the secret panel is present | the full key with a copy button, until Done |
| revoked | `data-state="revoked"` | the name is muted, the key struck through, no Revoke button |

## Accessibility

- The new key is announced (`role="status"`); its copy button says what it copies.
- Active and Revoked are written in the Tag, not shown by color alone.
- Create key is disabled until the name has text.

## Motion

Tier 0 of its own. Open the form and the new key with Expand; none otherwise.

## Component tokens

None.

## Invariants

- A full key is shown once and never again: the list shows the last four characters.
- Revoking asks first (a Popconfirm in the app) and cannot be undone.
- A revoked key stays in the list, so logs that name it still make sense.

## Safe edits

- More facts in the meta line: who made it, its scope, when it expires.
- A Select for the key's scope in the form.

## Checklist

- [ ] After Done the full key is nowhere on the page
- [ ] At 420px and less the status drops under the name and nothing overlaps
- [ ] Both themes
