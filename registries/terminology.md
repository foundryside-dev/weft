# Weft hub — terminology registry

Lean registry of terms whose usage **within this hub** must stay consistent. (Cross-product *product* vocabulary lives in [../glossary.md](../glossary.md); this registry governs the hub's own writing.) Audit: the consistency check verifies these terms are used as defined and not as synonyms.

| Term | Hub meaning | Don't say |
|---|---|---|
| **member** | A product admitted to the Weft family. Current launch taxonomy separates **live core** (Loomweave, Filigree, Wardline, Legis) from **planned integration** (Charter) and design spikes (Heddle). | Don't call Shuttle or Lacuna a "member"; don't imply Charter gates the live-core launch until its adapters ship |
| **thought-bubble** | Shuttle's status: a roadmap idea, no repo, displaceable | Don't call Shuttle "proposed member" or imply a reserved slot |
| **demonstration specimen** | Lacuna's role: the deliberately-flawed target the suite runs against | Don't call Lacuna a member or a customer |
| **SEI** | Stable Entity Identity — opaque, Loomweave-minted; the identity | Don't equate SEI with the `locator` |
| **locator** | `{plugin_id}:{kind}:{qualname}` — the mutable *address*, demoted from identity by ADR-038 | Don't call the locator an "identity" or "entity id (identity)" |
| **enrich-only** | Composition that adds capability without being required for the other's semantics | Don't call any integration "load-bearing" (the failure mode) |
| **asterisk** | A *documented* axiom violation with a written retirement condition | Don't use "asterisk" for an undocumented coupling |
| **generation** (HTTP) | A named, pinnable Filigree API surface (`classic`, `weft`) | Don't confuse with the closed `weft://` URI scheme |
| **authoritative here** | This hub is the source of truth for the doc's subject | Don't mark a member's surface facts "authoritative here" |
| **snapshot** | A point-in-time, non-authoritative copy of a volatile repo fact | Don't present a snapshot as current/authoritative |
| **promoted** | A doc relocated from a repo into the hub as the new canonical home | — |
