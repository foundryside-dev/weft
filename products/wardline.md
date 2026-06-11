---
body class: thread-wardline
---

# Wardline — cheat-sheet

> Trust-boundary analysis. Coral thread.
> Authority: [`~/wardline`](https://github.com/foundryside-dev/wardline) ·
> briefing: [members/wardline.md](../members/wardline.md)

## What it does

Wardline answers one question, statically and deterministically: **"is the data
each trust-annotated function works with as trusted as it claims to be?"** It
propagates a taint lattice across the call graph and flags untrusted data
reaching a trusted producer with no validation in between — a semantic-tainting
static analyzer with zero runtime dependencies.

Its "configuration" is the source code itself plus the adjacent trust
declarations; there is no separate authoritative config store. It is the
federation's **trust-policy surface**, and it emits findings as SARIF.

## Quick-start

```bash
wardline scan        # scan for trust-boundary violations (SARIF + human output)
wardline assure      # gate: assert the trust posture still holds
wardline attest      # produce a signed assurance bundle
wardline dossier     # the per-entity trust dossier
```

The trust lattice states, the decorator vocabulary, and the rule IDs
(`PY-WL-1xx`) are **Wardline's authority** — see the repo for the exact set
rather than relying on any count quoted elsewhere.

## How it composes

Wardline scans and analyses with all siblings absent; its Filigree emitter is
fail-soft (`core/filigree_emit.py`). Filigree is enrich-only here, **not**
load-bearing.

- **Wardline → Loomweave** — taint facts enrich the entity graph, keyed on SEI
  ([contracts-index.md §3](../contracts-index.md)).
- **Wardline → Filigree** — findings become tracked work. **Asterisk A-1
  (live):** they route through Loomweave's SARIF translator until the native
  emitter retires the asterisk
  ([asterisk-register.md](../asterisk-register.md);
  [contracts-index.md §4](../contracts-index.md)).
- **Wardline → Legis** — findings are governed by Legis
  ([contracts-index.md §8](../contracts-index.md)).

Federation role and the A-1 retirement condition:
[members/wardline.md](../members/wardline.md) and the
[asterisk register](../asterisk-register.md).

## Most-used commands & MCP verbs

!!! note "See the repo for the full surface"
    A curated subset, not the full surface. Rule counts, decorator names, and
    lattice states live in **Wardline** — this page does not restate
    them. **See [`~/wardline/README.md`](https://github.com/foundryside-dev/wardline),
    `~/wardline/src/wardline/scanner/rules/`, and
    `~/wardline/src/wardline/core/taints.py`.**

| Surface | Verb | Does |
|---------|------|------|
| CLI | `wardline scan` | scan for trust-boundary violations |
| CLI | `wardline assure` | gate the trust posture (pass/fail) |
| CLI | `wardline attest` | produce a signed assurance bundle |
| CLI | `wardline dossier` | per-entity trust dossier |
| MCP | `scan` | scan with a conjunctive `where` + `explain` |
| MCP | `scan_file_findings` | dry-run findings for one file |
| MCP | `decorator_coverage` | trust-decorator coverage report |
| MCP | `dossier` | the dossier surface over MCP |

## Pointers

- **Repo / authority:** [`~/wardline`](https://github.com/foundryside-dev/wardline)
  (`README.md`, `src/wardline/scanner/rules/`, `core/taints.py`)
- **Briefing (federation role):** [members/wardline.md](../members/wardline.md)
- **Integration docs:** [asterisk-register.md](../asterisk-register.md) ·
  [contracts-index.md](../contracts-index.md)
