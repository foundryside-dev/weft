---
body class: thread-legis
---

# Legis — cheat-sheet

> Git/CI governance and attestations. Walnut thread.
> Authority: [`~/legis`](https://github.com/foundryside-dev/legis) ·
> briefing: [members/legis.md](../members/legis.md)

## What it does

Legis makes every agent action at the git/CI boundary that breaks a policy
produce exactly **one attributable, tamper-evident, identity-stable audit
record** instead of a silent pass — and it grades *who must answer*
(self-record / LLM-judge / human sign-off) **server-side**, so the agent never
chooses how cheaply it clears a gate.

It owns governance verdicts (CLEAR / VIOLATION / UNKNOWN with an honest
`provenance_gap`), the 2×2 enforcement cells (chill / coached / structured /
protected), HMAC-signed protected verdicts, and the SEI-keyed sign-off ledger.
It is the federation's **governance surface** — *"the one judge."*

## Quick-start

Legis runs as a service; agents drive it over MCP (and the HTTP surface).

```bash
legis serve     # start the HTTP governance service
legis mcp --agent-id <id>  # start the MCP stdio surface for an attributable agent
```

```text
policy_evaluate { policy, target }  # CLEAR / VIOLATION / UNKNOWN verdict
policy_explain  { policy, target }  # why the verdict, which cell
override_submit { ... }         # one verb routes all four enforcement cells
signoff_status_get { seq }      # governed sign-off request state
```

`override_submit` is the unified verb across all four cells; `NEED_INPUTS` comes
back as a guided non-error, not a failure.

## How it composes

Legis governs change provenance whether Loomweave, Wardline, or Filigree are
present — a verdict still resolves with `identity_stable: false` honestly flagged
when a sibling capability is absent. Legis is a **consumer** of identity, never
an authority, and never re-adjudicates trust ("Wardline analyses, Legis
governs").

- **Loomweave → Legis** — consumes `resolve_sei` / `lineage` (pull-only) and the
  git-rename provider seam ([contracts-index.md §6](../contracts-index.md)).
- **Legis → Filigree** — SEI-keyed sign-off binding on issues
  ([contracts-index.md §7](../contracts-index.md)).
- **Wardline → Legis** — findings routing
  ([contracts-index.md §8](../contracts-index.md)).
- **Charter → Legis** — `preflight_facts.v1` consumer (planned;
  [contracts-index.md §9](../contracts-index.md)).

Federation role and integration details:
[members/legis.md](../members/legis.md).

## Most-used commands & MCP verbs

!!! note "See the repo for the full surface"
    A curated subset, not the full surface. The endpoint list and policy grammar
    live in **Legis**. **See
    [`~/legis/README.md`](https://github.com/foundryside-dev/legis),
    `~/legis/src/legis/mcp.py`, and `~/legis/CHANGELOG.md`.**

| Surface | Verb | Does |
|---------|------|------|
| CLI | `legis serve` | start the HTTP governance service |
| CLI | `legis mcp --agent-id <id>` | start the attributable MCP stdio surface |
| MCP | `policy_evaluate` | produce a governance verdict |
| MCP | `policy_explain` | explain the verdict and enforcement cell |
| MCP | `override_submit` | submit an override (routes all four cells) |
| MCP | `signoff_status_get` | governed sign-off request state by `seq` |
| MCP | `git_rename_feed_get` | the git-rename provider seam |
| MCP | `scan_route` | route a scan finding into governance |

## Pointers

- **Repo / authority:** [`~/legis`](https://github.com/foundryside-dev/legis)
  (`README.md`, `src/legis/mcp.py`, `CHANGELOG.md`)
- **Briefing (federation role):** [members/legis.md](../members/legis.md)
- **Identity / integration docs:** [sei-standard.md](../sei-standard.md) ·
  [contracts-index.md](../contracts-index.md)
