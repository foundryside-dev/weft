# Weft hub — document-set manifest

This manifest declares the structure, derivation discipline, ownership, and review triggers for the `~/weft` document set. The hub is a **wiki** managed under root/derivative discipline: weft is the *root* for federation patterns; member-repo federation docs are *derivatives* that defer here.

## Document classification

### Root (authoritative here — the interop layer)

| Doc | Authoritative for | Notes |
|---|---|---|
| [doctrine.md](./doctrine.md) | Federation axiom, composition law, go/no-go, roster | Promoted from `~/clarion/docs/suite/loom.md` |
| [glossary.md](./glossary.md) | Cross-product vocabulary | Promoted from `~/clarion/docs/suite/glossary.md` |
| [sei-standard.md](./sei-standard.md) | Stable Entity Identity conformance standard | Promoted from `~/wardline/docs/superpowers/specs/2026-06-01-loom-stable-entity-identity-conformance.md` |
| [federation-map.md](./federation-map.md) | Pairwise integration matrix | Indexes contracts; restates no schema |
| [asterisk-register.md](./asterisk-register.md) | Named axiom-violation asterisks + retirement | — |
| [uri-scheme.md](./uri-scheme.md) | Cross-product addressing status | `weft://` closed; SEI is the spine |
| [contracts-index.md](./contracts-index.md) | Index of cross-product contracts | Points to owning-repo schema authority |
| [conflict-register.md](./conflict-register.md) | Conflicts & ambiguities (Class A/B) | First-class deliverable |
| [compatibility.md](./compatibility.md) | Integration-liveness matrix (+ post-1.0 version matrix) | Technical face of SHIPPING decision 2 |
| [SHIPPING.md](./SHIPPING.md) | Go-to-market / launch / packaging decisions | PM-owned; authoritative for release posture |
| [roadmap-ideas.md](./roadmap-ideas.md) | Speculative sub-app candidate bench | Ideas only — NOT the roster |
| [README.md](./README.md) | Hub entry point + authority model | — |

### Derivative (snapshot + pointer — authority lives in the repo)

`members/*.md` — one thin briefing per member (+ shuttle, lacuna). Each defers to its repo for surface facts and to the root docs for federation patterns.

## Derivation recipe (for every derivative)

A `members/*.md` briefing or any member-repo federation doc is written by this recipe:

1. **State the domain authority and role** in one or two lines.
2. **Surface facts** (version/status/counts/routes) appear *only* as an explicit snapshot, marked *"NOT authoritative here — see the repo,"* with a pointer to the owning file. Prefer omitting volatile numbers entirely.
3. **Federation patterns** (axiom, roster, identity model, asterisks, URI status, contract shapes) are **not restated** — link to the root doc.
4. **Corrections/notes** reference [conflict-register.md](./conflict-register.md) items by id.

**Self-sufficiency vs deferral:** a derivative must let a reader *act* (know where authority lives) without restating the authority. If you find yourself copying a version number, a rule count, or a route schema into a derivative, that is the drift smell — replace it with a pointer.

## Ownership & review triggers

- **Owner:** the hub (federation-level). Member-repo federation docs are owned by each project but must resolve to this hub for patterns.
- **Review the root docs when:** a member is added/removed/renamed (doctrine + roster); an asterisk is named or retired (asterisk-register); a cross-product contract changes shape (contracts-index — update the *pointer/quick-ref*, not a copied schema); SEI locks or its status changes (sei-standard + conflict-register §B-2).
- **Do not** add CI/runtime consumers of these docs (doctrine §6 — that converts federation-safe docs into shared infrastructure).

## Registries (audit standard)

- [registries/terminology.md](./registries/terminology.md) — terms whose hub usage must stay consistent.
- [registries/claims.md](./registries/claims.md) — load-bearing factual claims with their authoritative source, for the consistency audit.

## Audit invariants (run before point releases)

1. No restated project-internal fact in any root doc without a pointer (grep versions/counts/route literals).
2. Every member-repo federation-pattern doc resolves to a weft root doc.
3. All internal links resolve; every `members/*.md` links to its repo and to the root docs it defers to.
4. Every [conflict-register.md](./conflict-register.md) item is Class A (fixed) or Class B (ruling + owner).
