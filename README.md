# Weft

Weft is **one product** — a shared-identity, agent-native code-intelligence federation — of which five sibling developer-tools (Loomweave, Filigree, Wardline, Legis, Warpline) are components. The value is the **glue**: the SEI identity spine, the **seams** (the joins between members — the crown jewels), and the cross-cutting quality conventions, chief of them provenance-honesty.

> **This README is orientation, not canon.** It is the "what do you need to know" onboarding standard — it gets you to the right authoritative doc fast. **[doctrine.md](./doctrine.md) is the authoritative federation canon** (the roster, the composition law, the seam-governance posture, and the honesty invariant); when this README and doctrine.md ever differ, **doctrine.md wins.** This folder (`~/weft`) is the source of truth for federation-wide interoperability — but the *authority* for each topic lives in its named domain owner (below), not in this entry page. It is **documentation only**: no code, no runtime, no store. There is nothing called "Weft" to install or run.

> **The federation is the product** ([PDR-0023](./pm/product/decisions/0023-federation-is-the-product-glue-is-the-value.md), 2026-06-15). The unit of value is the federation, not the member; the members are components/proof-points. **The seams are the crown jewels** — a broken join is the *product* broken. **Provenance-honesty is a protected invariant and a hard admission gate** (no result without its `cause + reason_class + fix` — the [`weft-reason` contract](./contracts/weft-reason-vocab.json), owner-blessed 2026-06-15; [doctrine.md §10](./doctrine.md), [federation-sdk.md](./federation-sdk.md) I-4). The federation framing is **hub blesses every seam**: members keep autonomy over their own jobs, but every cross-member interaction is hub-authored — "enrich-only" is now a per-seam *property*, not the headline. *(Candidate, not yet canon: PDR-0024's fleet-OS frame — [doctrine.md §11](./doctrine.md).)*

> **Canon is split by domain** (resolved 2026-06-06 — [conflict-register.md](./conflict-register.md) §B-6): **[doctrine.md](./doctrine.md)** owns the roster/membership/composition-law **and the honesty invariant (§10)**, **[SHIPPING.md](./SHIPPING.md)** owns release posture/gate, **[contracts-index.md](./contracts-index.md)** owns the contract index. This README, [federation-map.md](./federation-map.md), and [compatibility.md](./compatibility.md) are **derived views that point to the domain owner, not competing canon.**

> **As of 2026-06-05 this hub was rebuilt to be authoritative.** It previously drifted badly (wrong roster, stale versions, wrong identity model). The fix is structural — see *The authority model* below — and every conflict found is recorded in **[conflict-register.md](./conflict-register.md)**.

## The roster

| Member | Repo | Lang | Domain authority | Briefing |
|---|---|---|---|---|
| Loomweave | `~/loomweave` | Rust | Code structure **+ identity authority (SEI)** | [members/loomweave.md](./members/loomweave.md) |
| Filigree | `~/filigree` | Python | Work state / issue lifecycle | [members/filigree.md](./members/filigree.md) |
| Wardline | `~/wardline` | Python | Trust-boundary analysis | [members/wardline.md](./members/wardline.md) |
| Legis | `~/legis` | Python | Git/CI governance & attestations | [members/legis.md](./members/legis.md) |
| Warpline | `~/warpline` | Python | Temporal / change-impact authority | [members/warpline.md](./members/warpline.md) |

**Planned integration:** **Charter** (`~/charter`, Python — requirements, traceability, verification) has a realized local core and a read-only MCP surface, but its federation adapters are still pending, so it is not yet a full member (see [doctrine.md](./doctrine.md) §1 and [members/charter.md](./members/charter.md)).

Not members, but part of the story:
- **[Shuttle](./members/shuttle.md)** — a roadmap *thought-bubble* for a future change-execution authority. No repo; lowest priority; displaceable by any better idea.
- **[Lacuna](./members/lacuna.md)** — the deliberately-flawed *demonstration specimen* the suite is run against.
- **[roadmap-ideas.md](./roadmap-ideas.md)** — a bench of *speculative* sub-app candidates (incl. Shuttle). Ideas only; none are members until they pass the go/no-go test.

Excluded entirely: `wardline-watcher`, `wardline.old`, `weft.old` (the defunct heavier builds).

## The authority model (why this hub stays accurate)

The hub drifted because it **restated project-internal facts that move** (versions, tool counts, rule lists, routes). The rule that prevents recurrence:

- **weft owns the interop layer** and is authoritative for it: the roster, the [doctrine](./doctrine.md), the [SEI identity model](./sei-standard.md), the [asterisk register](./asterisk-register.md), the [URI/addressing status](./uri-scheme.md), the [integration matrix](./federation-map.md), the [glossary](./glossary.md), and the [contract index](./contracts-index.md).
- **weft points to each project** for that project's own surface facts. Any version/status shown here is marked *"snapshot — not authoritative; see the repo."*
- **each project points back to weft** for federation patterns, keeping authority only over its own domain surface.

**Audit invariant:** weft contains no restated project-internal fact without a pointer; every federation-pattern doc in every member repo resolves to weft.

## Where to look

- **New here?** [doctrine.md](./doctrine.md) (the federation law) → [federation-map.md](./federation-map.md) (how they compose) → the member briefing you care about.
- **Building a cross-tool integration?** [contracts-index.md](./contracts-index.md) (points to the authoritative schema in the owning repo) + [sei-standard.md](./sei-standard.md) (identity is the spine).
- **Building your own tool to drop into the federation?** [federation-sdk.md](./federation-sdk.md) — the member-builder's interface contract: the conformance spine, every interface surface, and the oracle gate.
- **Pre-release conflict flush?** [conflict-register.md](./conflict-register.md) — walk Class B before any point release.
- **Shared vocabulary?** [glossary.md](./glossary.md). **Documented axiom violations?** [asterisk-register.md](./asterisk-register.md).
- **How it ships / launch & go-to-market?** [SHIPPING.md](./SHIPPING.md) (PM-decided 2026-06-05) + [compatibility.md](./compatibility.md) (integration-liveness now; version matrix at 1.0).
- **How this doc set is organized & governed?** [MANIFEST.md](./MANIFEST.md).

## Federation axiom (the one sentence)

> Each member is authoritative for one domain, solo-useful, meaningfully composable pairwise, and **enrich-only — never load-bearing** — when composed. ([doctrine.md](./doctrine.md) §5.)
