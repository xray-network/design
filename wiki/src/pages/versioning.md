# Versioning

XRAY Design releases use semantic versioning:

- A patch clarifies the standard without changing required component behavior or tokens.
- A minor version adds backward-compatible tokens, variants, components, or guidance.
- A major version changes or removes existing tokens, behavior, component contracts, or rules.

Use an immutable URL containing the complete version when adopting XRAY Design in another
repository. Versioned files under `protocol/` are the source of truth. The build generates
`/design/DESIGN.md` from the latest release for convenience; this floating download changes
when a new version is published.

Existing applications remain governed by the version they adopted until they deliberately migrate.
Major releases should include migration instructions alongside `DESIGN.md`.
