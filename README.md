# Loom

Loom is a federation of sibling developer-tools projects, each authoritative for one domain, each useful standalone, each composable pairwise, and **enrich-only** (never load-bearing) when composed.

This folder (`~/loom`) is the **authoritative source of truth for federation-wide interoperability** — the roster, the doctrine, the shared identity model, the integration matrix, the asterisk register, the glossary, and the cross-product contract index. It is **documentation only**: no code, no runtime, no store. There is nothing called "Loom" to install or run.

> **As of 2026-06-05 this hub was rebuilt to be authoritative.** It previously drifted badly (wrong roster, stale versions, wrong identity model). The fix is structural — see *The authority model* below — and every conflict found is recorded in **[conflict-register.md](./conflict-register.md)**.

## The roster

| Member | Repo | Lang | Domain authority | Briefing |
|---|---|---|---|---|
| Clarion | `~/clarion` | Rust | Code structure **+ identity authority (SEI)** | [members/clarion.md](./members/clarion.md) |
| Filigree | `~/filigree` | Python | Work state / issue lifecycle | [members/filigree.md](./members/filigree.md) |
| Wardline | `~/wardline` | Python | Trust-boundary analysis | [members/wardline.md](./members/wardline.md) |
| Legis | `~/legis` | Python | Git/CI governance & attestations | [members/legis.md](./members/legis.md) |
| Charter | `~/charter` | Python | Requirements, traceability, verification | [members/charter.md](./members/charter.md) |

Not members, but part of the story:
- **[Shuttle](./members/shuttle.md)** — a roadmap *thought-bubble* for a future change-execution authority. No repo; lowest priority; displaceable by any better idea.
- **[Lacuna](./members/lacuna.md)** — the deliberately-flawed *demonstration specimen* the suite is run against.
- **[roadmap-ideas.md](./roadmap-ideas.md)** — a bench of *speculative* sub-app candidates (incl. Shuttle). Ideas only; none are members until they pass the go/no-go test.

Excluded entirely: `wardline-watcher`, `wardline.old`, `loom.old` (the defunct heavier builds).

## The authority model (why this hub stays accurate)

The hub drifted because it **restated project-internal facts that move** (versions, tool counts, rule lists, routes). The rule that prevents recurrence:

- **loom owns the interop layer** and is authoritative for it: the roster, the [doctrine](./doctrine.md), the [SEI identity model](./sei-standard.md), the [asterisk register](./asterisk-register.md), the [URI/addressing status](./uri-scheme.md), the [integration matrix](./federation-map.md), the [glossary](./glossary.md), and the [contract index](./contracts-index.md).
- **loom points to each project** for that project's own surface facts. Any version/status shown here is marked *"snapshot — not authoritative; see the repo."*
- **each project points back to loom** for federation patterns, keeping authority only over its own domain surface.

**Audit invariant:** loom contains no restated project-internal fact without a pointer; every federation-pattern doc in every member repo resolves to loom.

## Where to look

- **New here?** [doctrine.md](./doctrine.md) (the federation law) → [federation-map.md](./federation-map.md) (how they compose) → the member briefing you care about.
- **Building a cross-tool integration?** [contracts-index.md](./contracts-index.md) (points to the authoritative schema in the owning repo) + [sei-standard.md](./sei-standard.md) (identity is the spine).
- **Pre-release conflict flush?** [conflict-register.md](./conflict-register.md) — walk Class B before any point release.
- **Shared vocabulary?** [glossary.md](./glossary.md). **Documented axiom violations?** [asterisk-register.md](./asterisk-register.md).
- **How it ships / launch & go-to-market?** [SHIPPING.md](./SHIPPING.md) (PM-decided 2026-06-05) + [compatibility.md](./compatibility.md) (integration-liveness now; version matrix at 1.0).
- **How this doc set is organized & governed?** [MANIFEST.md](./MANIFEST.md).

## Federation axiom (the one sentence)

> Each member is authoritative for one domain, solo-useful, meaningfully composable pairwise, and **enrich-only — never load-bearing** — when composed. ([doctrine.md](./doctrine.md) §5.)
