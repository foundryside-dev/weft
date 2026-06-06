---
body class: thread-filigree
---

# Filigree — cheat-sheet

> Work state and workflow lifecycle. Sky thread.
> Authority: [`~/filigree`](https://github.com/foundryside-dev/filigree) ·
> briefing: [members/filigree.md](../members/filigree.md)

## What it does

Filigree turns a swarm of stateless agents into a coordinated **workforce**. It
owns issues, dependencies, and workflow state machines, and gives an agent three
things it otherwise has to improvise: a **race-free claim** on a unit of work, a
**dependency-aware ready queue**, and a **pre-computed orientation snapshot** —
so no two agents collide and none re-reads history to learn what to do next.

It is the federation's **work-state surface**, and it hosts the named
[`weft` HTTP generation](../federation-map.md) that several siblings use as their
transport.

## Quick-start

```bash
filigree install                       # wire MCP, instructions, .gitignore
filigree session-context               # ready / in-progress / critical path
filigree start-next-work --assignee me # atomic claim + transition into work
# ... do the work, commit ...
filigree close <id>
```

Use the **atomic** claim+transition verbs (`start-next-work` /
`start-work`). Do not chain a separate `claim` with a status update — the
two-step form races; the combined verb does not.

## How it composes

Every `weft`-generation endpoint is functional with peers absent (Filigree
ADR-002) — work is created and closed the same way whether siblings are present
or not.

- **Loomweave ↔ Filigree** — entity ⇄ issue via the `entity_associations` table;
  Filigree stores SEI opaque and never parses it
  ([contracts-index.md §1](../contracts-index.md)).
- **Wardline → Filigree** — findings become tracked work
  ([contracts-index.md §4](../contracts-index.md); asterisk **A-1**, see the
  [asterisk register](../asterisk-register.md)).
- **Legis → Filigree** — SEI-keyed sign-offs on issues
  ([contracts-index.md §7](../contracts-index.md)).

Federation role and the transport-generation detail:
[members/filigree.md](../members/filigree.md) and the
[federation map](../federation-map.md).

## Snapshot — most-used commands & MCP verbs

!!! warning "snapshot 2026-06-06 — NOT authoritative here; see the repo"
    A curated subset, not the full surface. The repo is the authority for the
    complete CLI, the full MCP tool list, route shapes, and counts.
    **See [`~/filigree/docs/cli.md`](https://github.com/foundryside-dev/filigree),
    `~/filigree/docs/mcp.md`, and `~/filigree/pyproject.toml`.**

| Surface | Verb | Does |
|---------|------|------|
| CLI | `filigree session-context` | ready / in-progress / critical path |
| CLI | `filigree start-next-work` | claim the next startable issue (atomic) |
| CLI | `filigree start-work <id>` | claim a specific issue (atomic) |
| CLI | `filigree close <id>` | close a worked issue |
| MCP | `work_start_next` | atomic claim + transition into work |
| MCP | `work_ready` / `work_blocked` | the ready queue / what is blocked |
| MCP | `issue_create` / `issue_close` | create / close an issue |
| MCP | `entity_association_add` | bind an issue to an opaque external entity id |
| HTTP | `/api/weft/*` | the named `weft` transport generation |

## Pointers

- **Repo / authority:** [`~/filigree`](https://github.com/foundryside-dev/filigree)
  (`docs/cli.md`, `docs/mcp.md`, `pyproject.toml`)
- **Briefing (federation role):** [members/filigree.md](../members/filigree.md)
- **Transport / contracts:** [federation-map.md](../federation-map.md) ·
  [contracts-index.md](../contracts-index.md)
