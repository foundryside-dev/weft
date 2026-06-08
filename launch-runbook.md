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

### Current deployment state (verified first-principles 2026-06-08)

The dogfood-2 fixes are **almost entirely landed and locally live; the gap is now
push + merge, not implementation.** Verified by reading each installed artifact (not
the tracker):

- **filigree — LIVE (installed rc8, copy install).** F1 (per-project token + canonical
  store-dir), F2 (un-bridged-findings line), F3 (container types non-startable), R1
  (route fail-closed + C-10a read-echo), N2 (promote suppression-guard + hardening),
  plus C2/C3/Le1. **Local install is ahead of `origin/release/3.0.0` by 6 and unmerged
  to `main`** — push + merge outstanding.
- **legis — LIVE (installed rc4, copy install).** N3, N4, W3, Le1. Ahead of origin by 1.
- **wardline — LIVE via *editable* install (`.pth` → `/home/john/wardline/src`, tracks
  rc4 HEAD).** C-4 foreign-safe block injector (`c58da86`/`779e3c5`), F1 emit-path
  mint-read (`e3ee92e`), N1 destination-echo (`25971c9`), W1/W2/W3. *Caveat: editable
  means "live" == working tree; a real versioned `wardline install` must be cut so the
  fixes survive independent of this checkout.*
- **loomweave — STALE (the one laggard).** Compiled binary is `1.1.0-rc3` and PREDATES
  `cb49008` (L1 whole-project finding browser + N5 consumer-visible `worktree_dirty_note`);
  `strings` on the binary confirms neither is present. **`cb49008` is also not pushed
  (ahead of `origin/rc3` by 1).** Needs **push + `cargo` rebuild/reinstall** to go live.

**Merge-inversion note:** for filigree/legis/wardline the *installed* build is **ahead**
of both `origin` and `main` — so for them the operative step is **push + merge-to-main to
bring the trunk up to the already-installed code**, not "build then install." loomweave
is the inverse (code committed, binary stale) and needs the rebuild.

**Reinstall / push set (so nothing silently stays at an old snapshot):**
filigree `release/3.0.0` (≥`ee63114`, rc8) · legis `rc4` (≥`4a254f2`) · wardline `rc4`
(≥`e3ee92e`; cut a versioned install off editable) · loomweave `rc3` (≥`cb49008`; **push
first**, then rebuild the binary).

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
  - **Emit-URL repoint (separate from the token):** the token fix is necessary but not
    sufficient — the `--filigree-url` in each member's `.mcp.json` must point **path-scoped
    at the `:8749` server-mode daemon** and the project must be **registered** in
    `server.json`. As of 2026-06-09 filigree+wardline point at local dashboards and legis is
    unregistered (only lacuna is correct). See [federation-topology.md](./federation-topology.md)
    for the model + liveness check and [pm/2026-06-09-federation-emit-remediation.md](./pm/2026-06-09-federation-emit-remediation.md)
    for the concrete repoint/registration diffs.
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
