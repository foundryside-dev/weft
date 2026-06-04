# Loom hub — claim registry

Load-bearing factual claims the hub makes, each with its **authoritative source**, so the consistency audit can re-verify them. Volatile surface facts (versions, counts) are deliberately **excluded** — the hub does not assert those; it points. A claim here should be re-checked against its source when that source changes.

| # | Claim | Authoritative source |
|---|---|---|
| C-1 | The federation has 5 realized members: Clarion, Filigree, Wardline, Legis, Charter | [doctrine.md](../doctrine.md) §1–2; repos at `~/{clarion,filigree,wardline,legis,charter}` |
| C-2 | Shuttle has no repo and is a roadmap thought-bubble, not a member | absence of `~/shuttle`; John 2026-06-05 |
| C-3 | Lacuna is the demonstration specimen, not a member | `~/lacuna/README.md` |
| C-4 | Clarion is the suite's identity authority; SEI is the binding key; locator is the address | [sei-standard.md](../sei-standard.md); Clarion ADR-038 |
| C-5 | SEI standard is **LOCKED (2026-06-05)**; interface frozen, post-lock changes need a versioned revision; member backfills are conformance tasks under the lock | [sei-standard.md](../sei-standard.md) §0.3; [conflict-register.md](../conflict-register.md) §B-2 |
| C-6 | Entity-association routes are classic `/api/issue/…` + `/api/entity-associations`, not `/api/loom/…` | `~/filigree/src/filigree/dashboard_routes/entities.py`; `~/filigree/docs/federation/contracts.md` |
| C-7 | Wardline↔Filigree is enrich-only (work-tracking), not load-bearing | `~/wardline/docs/integration/2026-05-29-wardline-loom-integration-brief.md`; `~/wardline/src/wardline/core/filigree_emit.py` |
| C-8 | Asterisk A-1 (Wardline→Filigree via Clarion SARIF) is LIVE; A-2 (registry import) RETIRED 2026-06-05 | [asterisk-register.md](../asterisk-register.md); Clarion ADR-015 Rev 2, ADR-018 Rev 3 |
| C-9 | The `loom://` URI scheme is formally closed (superseded by SEI) | [sei-standard.md](../sei-standard.md) §0/§9; [uri-scheme.md](../uri-scheme.md) |
| C-10 | The founding doctrine, glossary, and SEI standard are now authoritative in this hub; repo copies are pointers | this cutover (Part B); [MANIFEST.md](../MANIFEST.md) |
| C-11 | `wardline-watcher` and the `.old` repos are out of the federation | John 2026-06-05; `~/wardline-watcher/README.md` |
| C-12 | Charter (requirements) and Shuttle (change execution) are distinct, non-overlapping | Charter ADR-001; [doctrine.md](../doctrine.md) §2 |
| C-13 | Loom ships as 5 separately-installable products behind one brand; one coordinated 1.0 launch (gated by Wardline + Charter), independent semver after | [SHIPPING.md](../SHIPPING.md) |
