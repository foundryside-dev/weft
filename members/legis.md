# Legis (member)

**Domain authority:** git/CI governance & attestations — change provenance (branch/commit/PR/CI state) and SEI-keyed governance verdicts, overrides, sign-offs, and audit lineage. The federation's **governance surface**.
**Repo:** `~/legis` · **Language:** Python (FastAPI)
**Current details:** v1.0.0; HTTP + MCP service live (git/CI surfaces, overrides, protected overrides, signoff binding, policy evaluation, governance integrity, Wardline routing); MCP surface shipped (~13 read-mode tools, `src/legis/mcp.py`). For the latest details, use `~/legis/README.md`, `~/legis/pyproject.toml`, and `~/legis/CHANGELOG.md`.

## What it owns (authoritative in Legis)

Governance verdicts (CLEAR / VIOLATION / UNKNOWN with honest `provenance_gap`), the 2×2 enforcement cells (chill / coached / structured / protected), HMAC-signed protected verdicts, SEI-keyed attestations + sign-off ledger, and the git/CI provenance surfaces. Its endpoint list and policy grammar are Legis's authority.

## Federation role (points to weft for patterns)

- **Consumer of identity, not owner:** treats **[SEI](../sei-standard.md)** as opaque; consumes Loomweave `resolve_sei`/`lineage` and keeps its own governance records tied to stable code identity.
- **One judge, not two:** trust vocabulary passes through verbatim — "Wardline analyses, Legis governs." Legis never re-adjudicates trust.
- **Integrations:** SEI consumption + git-rename provider seam ([contracts-index.md](../contracts-index.md) §6), Filigree sign-off binding (§7), Wardline findings routing (§8), Charter preflight-fact consumer (§9).
- **Roster:** Legis is a **realized member** (4th to ship), ruled into the canonical roster — its own "fourth Weft product" framing now points to [doctrine.md](../doctrine.md). See [conflict-register.md](../conflict-register.md) §B-1.

## Notes

- Legis *supplies* the git-rename signal to Loomweave's matcher via `GET /git/renames`; operative enablement is jointly gated on Loomweave driving a committed rev-range.
- `~/legis/docs/federation/sei-conformance.md` keeps Legis's integration specifics and defers to [sei-standard.md](../sei-standard.md) for the standard itself.
