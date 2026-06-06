# Legis (member)

**Domain authority:** git/CI governance & attestations — change provenance (branch/commit/PR/CI state) and SEI-keyed governance verdicts, overrides, sign-offs, and audit lineage. The federation's **governance surface**.
**Repo:** `~/legis` · **Language:** Python (FastAPI)
**Surface facts (snapshot 2026-06-06 — NOT authoritative here; see the repo):** v1.0.0rc3 (rc1 shipped 2026-06-03); HTTP service live (git/CI surfaces, overrides, protected overrides, signoff binding, policy evaluation, governance integrity, Wardline routing); MCP surface shipped (~13 read-mode tools, `src/legis/mcp.py`). Authoritative: `~/legis/README.md`, `~/legis/pyproject.toml`, `~/legis/CHANGELOG.md`.

## What it owns (authoritative in Legis)

Governance verdicts (CLEAR / VIOLATION / UNKNOWN with honest `provenance_gap`), the 2×2 enforcement cells (chill / coached / structured / protected), HMAC-signed protected verdicts, SEI-keyed attestations + sign-off ledger, and the git/CI provenance surfaces. Its endpoint list and policy grammar are Legis's authority.

## Federation role (points to weft for patterns)

- **Consumer of identity, not authority:** treats **[SEI](../sei-standard.md)** opaque; consumes Loomweave `resolve_sei`/`lineage` (pull-only) and re-establishes lineage integrity at its own boundary (SEI REQ-L-01, Option 3 — prefix-hash custody). **Passes the §8 SEI oracle as a consumer.**
- **One judge, not two:** trust vocabulary passes through verbatim — "Wardline analyses, Legis governs." Legis never re-adjudicates trust.
- **Contracts it carries:** SEI consumption + git-rename provider seam ([contracts-index.md](../contracts-index.md) §6), Filigree sign-off binding (§7), Wardline findings routing (§8), Charter preflight-fact consumer (§9).
- **Roster:** Legis is a **realized member** (4th to ship), ruled into the canonical roster — its own "fourth Weft product" framing now points to [doctrine.md](../doctrine.md). See [conflict-register.md](../conflict-register.md) §B-1.

## Notes

- Legis *supplies* the git-rename signal to Loomweave's matcher via `GET /git/renames`; operative enablement is jointly gated on Loomweave driving a committed rev-range.
- `~/legis/docs/federation/sei-conformance.md` keeps Legis's consumer-side conformance specifics but defers to [sei-standard.md](../sei-standard.md) for the standard itself.
