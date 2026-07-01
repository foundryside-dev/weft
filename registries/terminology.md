# Weft hub — terminology registry

Lean registry of terms whose usage **within this hub** must stay consistent. (Cross-product *product* vocabulary lives in [../glossary.md](../glossary.md); this registry governs the hub's own writing.) Audit: the consistency check verifies these terms are used as defined and not as synonyms.

| Term | Hub meaning | Don't say |
|---|---|---|
| **member** | A product admitted to the Weft family. The admitted **roster** is Loomweave, Filigree, Wardline, Legis, Warpline, **Plainweave**, and **Tabard** — but admission has **two stages** (doctrine §7), so the roster is not one flat count. The launch **cutover** runs as a **five-member lockstep** (Loomweave, Filigree, Wardline, Legis, Warpline) per PDR-0026. **Plainweave** (the reframed/renamed Charter) is admitted 2026-06-24 (PDR-0030) as the code-grounded-intent authority — realized core + a **live-peer-validated** seam, federation adapters maturing, **not** in the cutover. **Tabard** is seated by **gap-naming** (2026-06-16, §7 stage 1): its position+name (actor-identity, the *who* coordinate) are seated, its *implementation* is a pre-spike, and it is **not** in the cutover. So the cutover set (5), the implemented members, and the gap-named seats deliberately diverge. | Don't call Shuttle or Lacuna a "member"; don't call Warpline a "design spike", "candidate", "prototype", or "fast-follow outside the cutover" (superseded by PDR-0026); don't say "five members" for the *roster* (5 is the cutover set; the roster is broader); don't call Tabard's *implementation* a member (the position+name are the member; the build is a pre-spike bet); don't call Plainweave "planned / not-a-member" (admitted 2026-06-24) nor imply it gates the cutover (admitted but **non-gating**); don't call Plainweave "Charter" except as its historical precursor |
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
