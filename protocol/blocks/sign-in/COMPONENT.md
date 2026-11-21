---
id: sign-in
name: SignIn
summary: The sign-in form, with provider buttons, email and password with a reset link, "keep me signed in", submit, and a link to create an account.
motion: 0
requires: [tokens]
components: [input, button, checkbox]
files: [sign-in.css, sign-in.html, sign-in.tsx]
---

# SignIn

The door to the product. Provider buttons come first when there are any; then email and password. It is a real
`form`, so password managers fill it and Enter submits. The block never authenticates: the app gets the values
and answers with an error or a redirect.

## Anatomy

```
form.x-sign-in[aria-labelledby]            380px at most, centered by its container
├── header.x-sign-in-head
│   ├── h2.x-sign-in-title                 "Sign in"
│   └── p.x-sign-in-text                   optional line under it
├── div.x-sign-in-providers                optional: ghost Buttons, full width ("Continue with …")
├── div.x-sign-in-divider                  "or", between two hairlines; only with providers
├── .x-field                               Email: type=email, autocomplete=username
├── .x-field                               Password: autocomplete=current-password; a.x-sign-in-forgot in its label row
├── label.x-checkbox                       optional: "Keep me signed in"
├── button.x-button[type=submit]           large, full width
└── p.x-sign-in-foot                       "No account? Create one"
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| error | the password Field's error | red border and message under the password; never says which of the two was wrong |
| submitting | `aria-busy="true"` on the submit Button | spinner in the button; fields stay filled |

## Accessibility

- A `form` named by its title; fields are labelled and carry the right `autocomplete` and `type`.
- The error is tied to the password field and announced (`role="alert"`).
- "Forgot password?" is a link after the label, reachable before the field.

## Motion

Tier 0. Only the Field's error entry and the Button's spinner.

## Component tokens

`--x-sign-in-width`.

## Invariants

- One primary action: the submit button. Providers are ghost buttons.
- The error never reveals whether the email exists.
- Never a custom password field: the native one, so managers and "show password" work.

## Safe edits

- Providers: any number, or none (the divider goes with them).
- A code or passkey step in place of the password.
- No "keep me signed in"; no sign-up line.

## Checklist

- [ ] Password managers fill both fields; Enter submits
- [ ] A wrong password shows the error under the field and keeps the email
- [ ] Submitting disables a second submit and shows the spinner
- [ ] Both themes; phone width (full width)
