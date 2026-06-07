# Weft — launch / merge runbook

**Status:** operational sequencing for the coordinated pre-launch cutover. Release
*posture* and gate membership live in [SHIPPING.md](./SHIPPING.md) (§B-5/§B-6); this
doc is the *order of operations* that posture implies. Authority for the clean-break
decision: [conflict-register.md](./conflict-register.md) §A-14 + the pre-launch
clean-break ruling.

## Premise

The launch **is** the clean break (no released cross-member consumers to stay
compatible with). filigree does a 3.0.0 cutover; loomweave/wardline/legis do their
initial 1.0; charter joins on its own cadence (non-gating). As of 2026-06-07 every
member's work is **live in its installed build but unmerged to `main`** (the `✓†`
state in [conventions.md](./conventions.md)) — so this runbook is **merge → release →
reinstall**, not "build."

## The load-bearing invariant

**Order matters because clean-break siblings resolve against filigree.** A sibling
build expects filigree at `.weft/filigree/`, the canonical `WEFT_FEDERATION_TOKEN` /
auto-minted `.weft/filigree/federation_token`, and filigree's HTTP/MCP surface. If a
sibling is installed against a project before filigree provides those, sibling
resolution breaks mid-cutover. **Therefore: filigree lands first. Never install a
clean-break sibling build ahead of its slot against a live project.**

## Order of operations

**Step 0 — pre-flight (no installs).**
- Confirm each branch is green on its own gates (the per-member CI), and that
  `installed == branch HEAD` for each (it is, as of 2026-06-07).
- Tag the current installed state per member so any step is revertible
  (re-pin the prior uv directory/tool install).

**Step 1 — filigree first.** Owner: filigree · tracks `weft-677779a3d0`.
- Merge `release/3.0.0` → `main`; cut the release; reinstall.
- **Includes upgrading + reloading the hub `filigree-mcp`** (currently stale v26 vs
  DB v27 — blocks every MCP agent in `~/weft`). This is part of this step, not a
  separate chore.
- This establishes `.weft/filigree/`, the canonical token, and the
  `federation_token.py` 3-tier auto-mint that every sibling depends on.
- **Verify before proceeding:** `filigree doctor` clean; `mcp_status_get` reports
  schema 27==27; a `/mcp` call with the resolved bearer is past auth (not 401);
  `.weft/filigree/federation_token` exists (0600).

**Step 2 — siblings (after Step 1 verifies).** Order among them is not critical; do
them one at a time and re-run the dogfood orientation after each.
- **loomweave** — merge rc3 → `main`, release, reinstall. `weft-46f866cb85`.
- **wardline** — merge rc4 → `main`, release, reinstall. `weft-71ce4f8253`.
  Fold in the **F1 fix** here: wardline's outbound emit must resolve the federation
  token via the C-3 auto-mint path (env → `.weft/filigree/federation_token` → off) so
  it authenticates with zero `.mcp.json` env-block ceremony.
- **legis** — merge rc4 → `main`, release, **reinstall (clears the split-brain — the
  version string was ahead of the code).** `weft-9da517a67e`.
- After each: run lacuna orientation (`session-context`, a scan) — it's the canary.

**Step 3 — drop the token fallback aliases.** Owner: all members + operator.
- Once every member references `WEFT_FEDERATION_TOKEN` only and the auto-mint file
  covers same-host, remove the deprecated `FILIGREE_*` / `WARDLINE_FILIGREE_TOKEN`
  fallbacks (the §A-13 clean-break tail). The operator `~/.bashrc` export is no longer
  load-bearing for same-host (auto-mint covers it); keep it only as the cross-host
  escape hatch.

**Step 4 — lacuna re-init.** Owner: lacuna retrofit · `weft-3c9bae6a40`.
- Clear the orphaned legacy dirs (`.filigree/`, `.loomweave/`, `.wardline/`); re-init
  under `.weft/` only.
- Commit a `.gitignore` that covers the **whole** `.weft/` runtime tree — including
  `.weft/loomweave/` (the C1 dogfood finding: the loomweave runtime DB is currently
  tracked, dirties the tree on scan, and blocks legis signing).

**Step 5 — post-cutover bookkeeping.**
- Walk the [conventions.md](./conventions.md) matrix: every `✓†` whose branch merged
  and released moves to `✓` (or `R`). The propagation P1s close.
- Re-confirm the dogfood gate (`weft-cd62a4da9b`) on the merged+released suite.

## Rollback

Each step is independently revertible by re-pinning the prior install (Step 0 tags).
The dogfood is the canary at every step — if lacuna orientation regresses (token
401, a 0-byte managed-doc, a sibling resolving a stale dir), stop and revert that
step's install before proceeding.
