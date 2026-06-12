---
body class: thread-charter
---

# Charter — cheat-sheet

> Requirements, traceability, and verification. Gold thread.
> Authority: [`~/charter`](https://github.com/foundryside-dev/charter) ·
> briefing: [members/charter.md](../members/charter.md)

## What it does

Charter is the federation's **obligations system-of-record**: it records what
must be true, keeps accepted truth **separate** from proposed / inferred / stale
/ imported guesses (never collapsing them), tracks how each obligation is
verified and when that evidence goes stale, and answers *"what obligations does
this change touch?"*

It owns requirements, the trace-link ontology with authority + freshness states,
immutable requirement versions, baselines, and verification records. It
is a **read-only consumer** of its peers — it never assumes their authority.

## Quick-start

Charter exposes a CLI for authoring obligations and a **read-only** MCP surface
for agents consuming them.

```bash
charter req add              # author a requirement / obligation
charter req approve          # approve a requirement version
charter baseline create      # manage baselines
charter verify status        # review verification freshness
charter doctor               # health check
```

```text
charter_requirement_dossier_get { id }   # the obligation dossier (current)
charter_project_context_get              # self-describing capability + authority
charter_baseline_get / charter_baseline_diff
charter_verification_status_get { id }   # how it is verified, and freshness
```

The MCP surface is the federation's **reference envelope** — `{schema, ok,
data|error, warnings, meta{producer, generated_at, project}}` with closed error
enums and a self-describing `project_context`.

## How it composes

Charter states and tracks obligations whether peers are installed or not — with
manual trace links and file/symbol refs in solo mode, and SEI-keyed links plus
work / finding references when peers are present.

- **Charter → Loomweave** — SEI consumer for trace links; marks links stale on
  lineage change, falls back to file/symbol refs when Loomweave is absent
  ([contracts-index.md §10](../contracts-index.md)).
- **Charter → Legis** — `weft.charter.preflight_facts.v1` envelope feeds
  governance ([contracts-index.md §9](../contracts-index.md)).
- **Charter ↔ Filigree / Wardline** — requirement ⇄ work and finding ⇄
  requirement trace links.

!!! info "Weft integrations are planned"
    Charter's **domain core and read-only MCP surface ship**, but its federation
    integrations (the SEI consumer and the `preflight_facts.v1` producer) remain
    planned, so its matrix cells read **planned**. See the
    [briefing](../members/charter.md) and the repo for current details. Some
    Charter ADRs still use legacy Clarion/Loom names; the hub uses
    Weft/Loomweave terminology.

## Most-used commands & MCP verbs

!!! note "See the repo for the full surface"
    A curated subset, not the full surface. The requirement-identity model and
    trace ontology live in Charter. **See
    [`~/charter/README.md`](https://github.com/foundryside-dev/charter),
    `~/charter/docs/concept.md`, and
    `~/charter/docs/architecture/decisions/`.**

| Surface | Verb | Does |
|---------|------|------|
| CLI | `charter req add` | author a requirement / obligation |
| CLI | `charter req approve` | approve a requirement version |
| CLI | `charter baseline create` | manage baselines |
| MCP | `charter_requirement_dossier_get` | the obligation dossier (current) |
| MCP | `charter_project_context_get` | self-describing capability + authority |
| MCP | `charter_baseline_get` / `charter_baseline_diff` | baseline state / diff |
| MCP | `charter_verification_status_get` | verification status + freshness |
| MCP | `charter_trace_link_list` | trace links for a requirement |

## Pointers

- **Repo / authority:** [`~/charter`](https://github.com/foundryside-dev/charter)
  (`README.md`, `docs/concept.md`, `docs/architecture/decisions/`)
- **Briefing (federation role):** [members/charter.md](../members/charter.md)
- **Identity / integration docs:** [sei-standard.md](../sei-standard.md) ·
  [contracts-index.md](../contracts-index.md)
