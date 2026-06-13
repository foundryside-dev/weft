# Weft suite glossary

**Audience**: anyone designing or reviewing a cross-product-visible field name, ADR, or wire-shape change in any Weft product
**Purpose**: a single read-only catalogue of terms whose meaning crosses product boundaries, so the same word never silently means two things in the federation
**Status**: **Authoritative.** Promoted here from `~/clarion/docs/suite/glossary.md` (2026-06-02); that file is now a pointer to this one. This is the suite-level vocabulary catalogue.
**Companion**: [doctrine.md](./doctrine.md) §8 for the federation axiom this glossary defends

---

## How to use this glossary

This file is a **design-review artifact**, not infrastructure. Nothing imports it, nothing runs from it, and removing it changes no product's semantics — it is the same shape as [doctrine.md](./doctrine.md) itself. Per doctrine §5, this means the glossary is federation-safe: it does not introduce semantic, initialization, or pipeline coupling between siblings.

**Consult this glossary when**:

- Authoring an ADR that introduces or renames a cross-product-visible field name
- Reviewing a wire-format change that adds a new top-level key
- Onboarding to a Weft product after working on another, to surface vocabulary surprises
- Triaging a bug whose framing depends on what a word means

**Update this glossary when**:

- An ADR moves a term from `open` to `managed` (note the ADR ID in the Authority column)
- A new cross-product term is introduced (add a row before the ADR is Accepted; see ADR-acceptance rule below)
- A term retires from cross-product visibility (mark `retired` with the retirement ADR ID, do not delete)

**Do not** add CI lint, repo gate, or runtime check that consumes this file. Per doctrine §5, that would convert a federation-safe doc into shared infrastructure. The glossary is consulted by humans during design review; that is its only job.

> **Note on product-internal detail.** Some Authority cells cite a specific product's ADRs (mostly Loomweave's, since Loomweave drove the early clash resolutions). Those citations are *evidence*, not the authority of this hub: each product remains authoritative for its own surface, and rule IDs / decorator names / route shapes belong to the owning project's docs (see [members/](./members/)). This glossary fixes only the *cross-product meaning* of a shared word.

## ADR-acceptance rule

ADRs introducing cross-product-visible field names must update this glossary before moving from Proposed to Accepted, with one of three explicit verdicts:

- **`no clash`** — the term is unique to this product, no sibling currently uses it
- **`managed clash`** — a sibling uses the same term; an explicit mapping table exists in the ADR
- **`renamed`** — the proposed term clashed with a sibling; this ADR renames the local term to avoid the clash

A vocabulary verdict is part of ADR-acceptance evidence, not a courtesy. This rule converts the next clash from "discovered during implementation" to "blocked at design review." Each product mirrors this rule in its own ADR process, citing [doctrine.md](./doctrine.md) §8 as the suite-level authority.

## Status legend

| Status | Meaning |
|---|---|
| `managed` | Same term used by ≥2 products; an Accepted ADR provides explicit mapping or namespacing |
| `renamed` | Was a clash; an Accepted ADR renamed the local term to avoid the collision; the cross-product collision is gone |
| `open` | Same term used by ≥2 products; **no managing ADR yet** — clash is live |
| `no clash (informational)` | Term is unique to one product but listed here to head off cross-product reader confusion |
| `deferred` | Clash exists; retirement condition documented; tracked elsewhere |
| `retired` | Was a clash; retiring ADR named; kept as historical record |

## Cross-product terms

### Managed clashes

| Term | Products | Semantics by product | Authority |
|---|---|---|---|
| `severity` | Loomweave ↔ Filigree | Loomweave internal: `INFO\|WARN\|ERROR\|CRITICAL` for defects, `NONE` for facts. Filigree wire: `critical\|high\|medium\|low\|info` (lowercase). | Loomweave ADR-017 — explicit mapping table; `metadata.loomweave.internal_severity` round-trip slot |
| `rule_id` | Loomweave + Wardline → Filigree | Namespaced prefix per emitter: `LMWV-PY-*`, `LMWV-INFRA-*`, `LMWV-FACT-*`, `LMWV-SEC-*`, `WLN-*` (Wardline's own rule IDs, e.g. the `PY-WL-*` family, are authoritative in Wardline — see [members/wardline.md](./members/wardline.md)). Filigree stores byte-for-byte; round-trip preserved. | Loomweave ADR-017, ADR-022 — namespacing convention + grammar enforcement at the Loomweave-plugin boundary |
| `finding` (wire shape) | Loomweave + Wardline → Filigree | Cross-product unified record type. Field ownership documented; extension via `metadata` slot (top-level keys outside the enumerated set are silently dropped). | Loomweave ADR-004 — full wire schema with explicit ownership |
| **federation loopback token** (env-var name) | filigree, loomweave, wardline | One bearer token guarding the `weft` HTTP generation. **Canonical name `WEFT_FEDERATION_TOKEN`**; `FILIGREE_API_TOKEN` (client) + `FILIGREE_FEDERATION_API_TOKEN` (daemon) are **deprecated fallback aliases**; wardline's `WARDLINE_FILIGREE_TOKEN` is its own name for the same *value*. Deconfliction plumbing, **not** a secret. | Weft `conventions.md` C-3 + [conflict-register.md](./conflict-register.md) §A-13 (decided 2026-06-07; supersedes `filigree-3ee7250b54`) |

### Renamed clashes (resolved by Loomweave ADR-024)

Each row names the pre-rename collision and the post-rename Loomweave field name; Filigree's vocabulary is unchanged.

| Term (post-rename) | Products | Resolution | Authority |
|---|---|---|---|
| `scope_level` (Loomweave) ← was `priority` | Loomweave ↔ Filigree | Loomweave's guidance scope-of-applicability field is now `scope_level` (six-level string enum) plus a companion `scope_rank` integer (1..6) for `ORDER BY`. Filigree's `priority` (P0..P4) keeps its name. The shared word is gone. | Loomweave ADR-024 |
| `pinned` (Loomweave) ← was `critical` | Loomweave ↔ Filigree | Loomweave's guidance budget-protection flag is now `pinned: bool`. Filigree's `severity:critical` tier and informal "Critical" P0 label keep their meanings. | Loomweave ADR-024 |
| `provenance` (Loomweave) ← was `source` | Within-Loomweave + Loomweave ↔ Filigree | Loomweave's `finding.source` struct (`{tool, tool_version, run_id}`) is now `finding.provenance`; the guidance `entity.properties.source` enum is now `entity.properties.provenance`. `entity.source` (`SourceRange`) is unchanged. Filigree's `source:` taxonomy label keeps its meaning. | Loomweave ADR-024 |

### No-clash informational entries

| Term | Owning product | Note for cross-product readers |
|---|---|---|
| `tags` (Loomweave) vs `labels` (Filigree) | both | Different word, similar concept. Loomweave's `tags` are free-form (plugin/LLM-emitted); Filigree's `labels` are a curated namespaced taxonomy (`area:`, `cluster:`, `effort:`, `priority:`, …). No rename. |
| `kind` | Loomweave (three uses) | `entity.kind`, `edge.kind`, `finding.kind` — disambiguated by struct context. Filigree uses `type` for the analogous concept on issues. |
| `status` | Loomweave + Filigree | Distinct state machines on distinct objects: Loomweave `runs.status` / `findings.status`, Filigree per-type issue state machines. Always disambiguated by table or struct. |
| `entity` | Loomweave | Loomweave code object (function, class, module, guidance, file, subsystem). Other products do not use this term. |
| `SEI` (Stable Entity Identity) | Loomweave (authority) → Wardline, Filigree, Legis, Charter (consumers) | Durable, opaque surrogate identity for a code entity, minted and resolved by Loomweave; the single key every cross-tool binding uses, stable across rename/move/edit. Single meaning suite-wide — `no clash`. Authority: the [SEI standard](./sei-standard.md) for the suite definition; Loomweave ADR-038 (`~/loomweave/docs/loomweave/adr/ADR-038-sei-token-and-signature.md`) for Loomweave's token form, persistence, and the reserved `loomweave:eid:` namespace. Consumers MUST treat it opaque (do not parse). |
| `locator` | Loomweave (authority) → suite | The mutable address form `{plugin_id}:{kind}:{qualname}` (the pre-SEI entity id, **demoted by Loomweave ADR-038 from *identity* to *address***). Resolvable to a current SEI; changes on rename/move. Single meaning suite-wide — `no clash`. |
| `subsystem` | Loomweave | Cluster of entities produced by Loomweave's clustering phase. Loomweave-only. |
| `briefing` | Loomweave | Structured per-entity summary served to consult-mode agents. Loomweave-only. |
| `guidance sheet` | Loomweave | Institutional knowledge attached to an entity. Loomweave-only. |
| `observation` | Filigree | Fire-and-forget agent note that expires after 14 days. Filigree-only. |
| `run` / `run_id` | Loomweave + Wardline | Each product has its own analyse/scan run lifecycle. The `run_id` field is namespaced by emitter; the strings are not assumed cross-product-meaningful. |
| `requirement` / `obligation` | Charter | Charter's owned domain term for a stated obligation with traceability and verification evidence. Charter-only. |
| `attestation` / `verdict` / `sign-off` | Legis | Legis governance records (CLEAR / VIOLATION / UNKNOWN, overrides, signoffs), keyed on SEI. Legis-only. |

### Wardline -> Legis governance artifact terms

| Term | Product / authority | Meaning | Source |
|---|---|---|---|
| `dirty` | Wardline (emitter) -> Legis (consumer) | Top-level strict boolean on the unsigned Wardline scan artifact. `dirty: true` means the artifact was emitted from a dirty working tree under the dev-only `allow_dirty` posture and is intentionally unsigned; Legis records keyless dev artifacts as `dirty`, returns `SKIPPED_DIRTY_TREE` when a CI artifact key is configured without dev-mode, and governs only under the explicit dev-mode opt-in. | Wardline `src/wardline/core/legis.py::DIRTY_FIELD`; Legis `src/legis/wardline/ingest.py`; shared vector `tests/contract/weft/vectors/wardline_dirty_scan_artifact.v1.json` — `no clash` |

### Wardline taint-store wire terms (Loomweave ADR-036)

These terms cross the Wardline↔Loomweave wire in the taint-store contract (`/api/wardline/*` routes on Loomweave). All are `no clash`.

| Term | Products | Semantics | Authority |
|---|---|---|---|
| `wardline_json` | Loomweave ↔ Wardline | The taint/provenance fact blob. **Opaque to Loomweave and Wardline-owned**: Loomweave stores and returns it verbatim, never parses or validates it. All taint semantics stay Wardline-side. | Loomweave ADR-036 — `no clash` |
| `scan_id` | Loomweave ↔ Wardline | Wardline's scan generation identifier for a taint fact; a queryable column for observability. Wardline-namespaced. | Loomweave ADR-036 — `no clash` |
| `content_hash_at_compute` | Loomweave ↔ Wardline | The containing-file content hash Wardline recorded **at compute time** (whole-file `blake3`, hex). | Loomweave ADR-036 — `no clash` |
| `current_content_hash` | Loomweave ↔ Wardline | The entity's containing-file content hash **as derived now** at read time, returned on fetch. Match → fresh; mismatch/absent → stale → Wardline recomputes. | Loomweave ADR-036 — `no clash` |
| `unresolved_qualnames` | Loomweave ↔ Wardline | Pre-composed qualnames a batch write could **not** resolve to an `exact` Loomweave entity; returned so Wardline can fall back rather than guess. | Loomweave ADR-036 — `no clash` |

### Deferred clashes (tracked, not resolved)

| Term | Products | Status | Tracked by |
|---|---|---|---|
| L7 qualname format | Loomweave ↔ Wardline | Loomweave's L7 emits combined dotted `module.qualified_name`; Wardline's `FingerprintEntry` stores `(module, qualified_name)` as separate fields. Reconciliation is handled in the qualname-normalization contract (Loomweave ADR-018) at cross-product join time. | Loomweave ADR-018 amendment trigger |

## Wardline-side terms (for cross-product reader benefit)

These terms are owned by Wardline; authoritative definitions live in [members/wardline.md](./members/wardline.md) and the Wardline repo. Listed here so a Loomweave / Filigree reader does not assume local semantics.

| Term | Wardline meaning |
|---|---|
| taint state | One of Wardline's trust-lattice states (the 8-state lattice; not a "Tier 1–4" model — see Wardline's `core/taints.py`). Authoritative count and names live in Wardline. |
| `annotation_group` / `wardline_group` | Group of related Wardline annotations sharing a tier or policy band. Used as a `match_rules.type` value in Loomweave guidance sheets. |
| `FingerprintEntry` | Wardline's storage object pairing `(module, qualified_name)`. See deferred clash above. |
| `governed default` | Wardline policy concept: a default value declared as policy-governed. (Rule-ID examples are illustrative; the authoritative `PY-WL-*` rule numbering lives in Wardline.) |

## Shuttle (proposed)

Shuttle is not in flight. When Shuttle's design begins, the first design-review pass against this glossary should add Shuttle's authoritative terms and explicitly check `change`, `apply`, `commit`, `rollback`, `transaction` against the existing Weft vocabulary surface.

## History

- **2026-05-03** — Glossary created (in Loomweave) during the v0.1 skeleton audit. Seeded with managed/renamed/no-clash entries.
- **2026-05-31** — Clarion ADR-036 Accepted; SP9 Wardline taint-store wire terms added.
- **2026-06-05** — Promoted into the Weft hub as the authoritative suite glossary; Loomweave's copy reduced to a pointer. SEI-consumer list extended to include Legis and Charter; Legis/Charter owned terms added; product-internal rule-ID examples flagged as illustrative (authoritative in the owning project).
