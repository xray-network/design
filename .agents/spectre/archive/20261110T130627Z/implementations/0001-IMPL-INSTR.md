# XRAY Design implementation 0001 instruction

Implementation-Version: v1
Implementation-ID: xray-design/0001
Created: 20260906T112307Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request: Read https://wiki.xraynetwork.io/spectre/SPECTRE-PROTOCOL.md completely and install SPECTRE in this repository. | `LOCAL` | Yes | Authorize installation and the bootstrap acceptance exception. |
| [Pinned SPECTRE protocol](../SPECTRE-PROTOCOL.md) | `LOCAL` | Yes | Define installation, runtime extraction, canonical content, and validation. |
| [Repository README](../../../README.md) | `LOCAL` | Yes | Establish repository identity and ownership of one design protocol with supporting documentation. |
| [Documentation README](../../../docs/README.md) | `LOCAL` | Yes | Establish that the documentation publishes this repository's design protocol. |
| [Documentation manifest](../../../docs/package.json) | `LOCAL` | Yes | Confirm the sole package is the documentation project and inspect its completion commands. |
| [Git ignore rules](../../../.gitignore) | `LOCAL` | Yes | Exclude generated output and dependencies during discovery. |

## Objective

Install SPECTRE 1.0.0 and validate its tracking structure for XRAY Design.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Install the pinned protocol, 13 deterministically extracted runtime modules, three canonical templates, and required README. | Preserve canonical bytes and existing repository files. | `.agents/spectre/` | Compare mirror and pinned release; verify metadata, SHA-256, extraction bytes, templates, and README. |
| C02 | Install the canonical command router and root agent pointer. | Preserve unrelated instructions; activate only on explicit human invocation. | `.agents/skills/spectre/SKILL.md`, `AGENTS.md` | Compare with prescribed content; run the skill validator; inspect routing and invocation boundaries. |
| C03 | Create the flat repository ledger and installation instruction/result with the required accepted bootstrap row. | Keep one repository-wide sequence; no product-source changes. | `SPECTRE.md`, `.agents/spectre/implementations/` | Validate schemas, IDs, links, dispositions, exact human-request proof, file inventory, and tracked-file hashes. |

## Implementation steps

1. Read the complete protocol and repository guidance; confirm no existing installation or conflicting files.
2. Pin the matching immutable release and choose flat storage from repository evidence.
3. Extract runtime modules and canonical content locally, then create this instruction.
4. Validate structure and the command skill before writing the result.
5. Record actual outcomes, create the bootstrap ledger row, and validate the complete installation.

## Validation

- Compare downloaded entry-point and canonical release bytes using `cmp`; verify the protocol's metadata and SHA-256.
- Run `python3 /private/tmp/xray-design-spectre-install.py stage` for deterministic extraction and structural checks.
- Run `PYTHONPATH=/private/tmp/xray-design-spectre-python python3 /Users/claude/.codex/skills/.system/skill-creator/scripts/quick_validate.py /private/tmp/xray-design-spectre-stage/.agents/skills/spectre` before writing the result.
- Run `python3 /private/tmp/xray-design-spectre-install.py validate` for complete staged checks and `python3 /private/tmp/xray-design-spectre-install.py verify-installed` after publication.
- Compare every pre-existing tracked file's SHA-256 with the pre-installation baseline; run `git diff --exit-code` and `git diff --cached --exit-code`.
- Apply every relevant protocol §13 invariant. Archives, provider evidence, and derived dependencies are absent; their conditional checks are inapplicable.
- No product build is required because installation changes only Markdown tracking and agent guidance.

## Compatibility and human review

Repository discovery establishes one design protocol and its supporting documentation, with no workspace or independently owned product packages. Use flat storage and the repository slug `xray-design`.
Root `AGENTS.md` and `.agents/` were absent at discovery. Preserve all existing tracked files.
The human's installation request explicitly accepts this bootstrap alone under protocol §2.

## Completion criteria

All 23 prescribed installation files exist, canonical extraction matches byte for byte, full validation passes, and `xray-design/0001` has the sole `ACCEPTED` bootstrap row with proof `Human requested installation of SPECTRE.`

## Out of scope

Product source, dependency changes, documentation deployment, provider capture, archive creation, additional implementation records, automatic lifecycle activation, upgrades, and migration.

## Blockers

None.
