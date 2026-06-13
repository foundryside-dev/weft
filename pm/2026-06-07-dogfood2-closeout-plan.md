# Dogfood #2 Closeout — Federation Resolution Plan

_Authored 2026-06-07 from the legis session. Grounded in the 2026-06-07 `john-pm`
ground-truth comments + code/install verification, not the stale tracker titles._

## The reframe (read this first)

The open weft tickets are titled as if the fixes are unshipped ("Propagation:
ship X"). **They are not.** Ground-truth from the 2026-06-07 live lacuna run plus
install-receipt inspection shows the fixes are **already live on the installed
builds**:

| Member | Installed | Install mode | Fixes live? | `main` lag |
|---|---|---|---|---|
| filigree | 3.0.0rc6 | **directory-install** of `~/filigree` (byte-identical to `release/3.0.0` HEAD) | yes | main 2.2.0, **123 behind** |
| legis | 1.0.0rc4 | **directory-install** of `~/legis` (this checkout, branch `rc4`) | yes | main rc3, **73 behind** |
| loomweave | 1.1.0rc3 | pinned rc artifact (`==1.1.0rc3`) | yes | main v1.0.0, pristine |
| wardline | 1.0.0rc4 | pinned rc artifact | yes | main v1.0.0, pristine |

**Consequence:** the epic's A-criteria ("installed build shows fixed behavior,
not old") are **already met**. Merge-to-main is **release hygiene / debt**, not a
functional readiness gate. The 4 "propagation" tickets are therefore mostly
*done* — what remains under them is `merge → main → release`, which should not sit
on the critical path to declaring dogfood #2 ready.

What is *genuinely* still open splits into: **(1) one canon decision** that gates
the token defect, **(2) a handful of real defects**, **(3) the C-4 0-byte root
cause** (foreign-deletion vector is fixed; full emptying is not), **(4) release
hygiene merges**, **(5) tracker reconciliation** to ground-truth.

---

## Workstreams (sequenced)

### WS-0 — Unblock tooling (now, ~2 min, near-zero cost)
- **Hub filigree-MCP daemon is stale v26 vs DB v27 (`SCHEMA_MISMATCH`)** — any
  agent using filigree-MCP in `~/weft` is blocked (this is why this very session
  fell back to the CLI and hit `ACTOR_MISMATCH`). Reinstall/reload `filigree-mcp`
  from rc6 and reload so Claude Code relaunches it. CLI is unaffected.
  _(sub-item of weft-677779a3d0; actionable immediately, independent of everything else.)_

### WS-1 — DECISION GATE: §A-15 canon correction (blocks F1 + R1)
- **weft-23574069a1 (F1, token 401)** and **weft-7a399b8124 (R1, server-mode
  scope)** are **two faces of one defect**: filigree server-mode resolves
  ambiguous/unscoped federation requests to the *daemon's HOME* project/store
  instead of the *caller's*. The per-store token auto-mint then diverges from the
  daemon's token → wardline's project-mint bearer gets a 401.
- **This is blocked on a canon ruling, not code.** The F1 comment is explicit: the
  shipped §A-15 auto-mint framing has the authority **backwards** — the host-drift
  `--fix` would re-localize the *working* daemon token to the project mint and
  break the one client that works. Required ruling (PM):
  1. **One tier-1 `WEFT_FEDERATION_TOKEN` pin** is the authority, shared by daemon +
     MCP bearer + wardline; demote per-store auto-mint to a single-store/no-daemon
     **fallback**.
  2. **Unscoped / ambiguous server-mode requests FAIL CLOSED** — never default to
     the daemon's home project.
- **Action:** correct §A-15 in `conventions.md` **first**; then WS-2 implements.

### WS-2 — Genuine open defects (by owner; parallelizable except where noted)

**filigree**
- F1 token unification + R1 fail-closed scoping (weft-23574069a1, weft-7a399b8124)
  — **after WS-1**. End-to-end: scope token + route to the calling project.
- F2 analyzer findings never surface as work (weft-1ce99ceda8) — **blocked by F1**.
- F3 `start-next-work` surfaces a `[release]` placeholder as startable; C2
  SessionStart "Prefix collision" false-error on healthy re-register — both in the
  residual tail (weft-f506e5f845). _(C2 is the cosmetic cousin of WS-0's real staleness.)_

**wardline**
- W1 default scan output ~123 KB, overflows token cap (weft-439d09fc8d).
- W2 default gate vacuously green; prescribed `--fail-on ERROR` trips (weft-b937e53854).
- W3 `active` overloaded (suppression sense clash) + `summary.total` 107 ≠ buckets 35;
  L-side rename to `suppression_state`, make buckets sum (in weft-f506e5f845).
- wardline-side of F1: `doctor` token-mismatch detect + `filigree_emit.py:145` C-7
  extension to distinguish "no token sent" vs "token sent, rejected" — **after WS-1**.

**loomweave**
- **C1 (weft-d822a7de2d): runtime DB tracked under `.weft/loomweave/` → dirties
  tree → blocks legis signing.** This one **reaches into legis** (legis needs a
  clean tree to sign). Fix = gitignore the loomweave runtime DB so it stops
  dirtying the consumer's tree. _(Note: this session's SessionStart reported no
  loomweave index at `~/legis/.weft/loomweave/loomweave.db` — run
  `loomweave install --path ~/legis && loomweave analyze ~/legis` if legis
  archaeology is wanted; orthogonal to C1's gitignore fix.)_
- L1 no whole-project finding browser; `entity_finding_list` needs an entity id;
  `entity_wardline_list` returns 171 mostly-empty blobs — add project-wide finding
  list / `has_findings` filter (in weft-f506e5f845).

**legis (our slice — executable from this session)**
- **Le1: `filigree_closure_gate_get` → `CELL_NOT_ENABLED` with no enablement path.**
  Confirmed: `mcp.py:377` + `:409` map every `NotEnabledError` to the generic
  recovery hint _"Ask the operator to enable the required governance cell."_ The
  raise sites (`governance.py:238/271/302/326`, `mcp.py:762/882/888/1011`) say
  *which* cell ("protected cell not enabled", "binding ledger not enabled", …) but
  the hint names no config key/command. **Fix:** make the recovery hint name the
  concrete enablement path (the policy-cell config / `weft.toml [legis]` knob or
  the `legis` command that wires the cell) per raise site, not a generic sentence.
- **C3: `comment_add verified_author: null`** — write actor is self-asserted
  (fine for trust-local). **Action:** this is a *note for the governance story*,
  not a code fix — record the gap in the charter/governance doc.
- **LG-1: `legis` has no `--version` flag** (in weft-9da517a67e). Small add.

**cross-cutting (C-4)**
- weft-eb3dee402f: **foreign-deletion vector is FIXED** (legis `install.py`
  `_first_foreign_fence_pos` bounded scan — own-namespace absorption,
  case-insensitive, refuse-to-claim-foreign — **is committed on rc4**, contra the
  stale "uncommitted" memory; filigree fix on `release/3.0.0`). **STILL OPEN:** the
  full **0-byte emptying root cause** is unexplained. Keep the gate live; the
  2026-06-07 run *held* (8949 B, 4 namespaces co-resident) but holding ≠ root-caused.
- weft-e408dc2b82: hub doc — downgrade the self-contradictory C-4 scorecard +
  promote bounded-recovery to normative. Pairs with eb3dee402f.

### WS-3 — Release hygiene: merge rc→main + release (the "GATED" item)
Debt, not a gate. Each repo independent. Sequence *after* its own WS-2 defects so
we don't release-then-immediately-repatch.
- **legis** `rc4 → main` (73 ahead, **0 behind → clean fast-forward**) + release. ← ours
- **filigree** `release/3.0.0 → main` (123 ahead) + release; cut the released artifact.
- **loomweave** rc3 → main + release.
- **wardline** rc4 → main + release.

### WS-4 — Conventions / standards finish (P2)
- weft-a2f4cf95c7: C-9 shared `weft.toml` sibling-endpoint key-layout (loomweave
  drafts → hub blesses). Legis already reads `[legis] store_dir`; design the shared
  top-level `[filigree].url` / `[loomweave].url` home (wardline is the real
  multi-sibling consumer; it retired its `[wardline.*].url` keys — Option 1).
- weft-8e3d02f409: C-2 WAL checkpoint hygiene — loomweave done; filigree side remains.

### WS-5 — Cleanup
- weft-3c9bae6a40: re-init lacuna member stores under `.weft/` + delete orphan
  legacy `.filigree`/`.loomweave`/`.wardline` dirs (blocked by loomweave propagation,
  now effectively satisfied — installed loomweave already writes `.weft/loomweave`).
- weft-f506e5f845: close once its child papercuts (F3/W3/L1/Le1/C2/C3) are dispatched.

### WS-6 — Spike (independent, parallelizable)
- weft-e4589e6570: go/no-go on the temporal / change-impact authority ("Warpline").
  Legis-adjacent (change-impact is legis's wheelhouse). Decision spike, not blocking.

---

## Tracker reconciliation (do this alongside, so the board stops lying)
- **weft-677779a3d0 / 46f866cb85 / 71ce4f8253 / 9da517a67e** (the 4 "propagation"
  tasks): the INSTALL goal is **met**. Comment each with ground-truth and narrow
  the remaining scope to "merge→main + release" (WS-3), or close the install
  portion and open a clean `merge+release` follow-up per repo. Don't leave them
  reading as "not shipped."
- **weft-9da517a67e** is a `triage` bug — needs `--advance` to become startable.
- **weft-eb3dee402f**: keep **open** (0-byte root cause). Do not let "live run held"
  close it.
- **weft-cd62a4da9b (epic)**: A is met; B (C-4 0-byte) keeps it live; re-confirm
  C/D/E/F from the run record before declaring dogfood-ready.

## Critical path
WS-0 (now) → WS-1 canon ruling → WS-2 filigree F1/R1 (+ wardline detect, + F2) is
the only true chain. Everything else (legis slice, wardline W1/W2, loomweave C1/L1,
all of WS-3, WS-4, WS-6) runs **in parallel**. The single highest-leverage unlock
is the **§A-15 ruling** — it gates the only multi-member dependency knot.

## Legis slice — EXECUTED 2026-06-08 ✅
1. ✅ WS-0: `filigree` reinstalled (binary refreshed to rc6). **Reload pending:** the
   running hub filigree-MCP daemon still needs Claude Code to relaunch it to clear
   the v26↔v27 `SCHEMA_MISMATCH` (binary is current; only a session reload remains).
2. ✅ Le1: `CELL_NOT_ENABLED` recovery hint now names the enablement path
   (`mcp.py` `_recovery_for`) + test. Shipped in rc4.
3. ✅ LG-1: `legis --version` added (`cli.py`) + test. Shipped in rc4.
4. ✅ C3: `docs/design/legis-charter.md` documents the `verified_author: null` gap.
5. ⚠️ WS-3 (legis): `rc4 → main` merged via **PR #7** (merge `369302a`); GitHub
   pre-release **v1.0.0rc4** tagged on main; installed build reinstalled →
   `legis --version` → `1.0.0rc4` (this is what the dogfood agent actually runs —
   directory-install, not PyPI). **PyPI publish FAILED and rc4 is NOT on PyPI**
   (only rc2/rc3 are). The `release.yml` `publish` job `needs: [build, conformance]`;
   the **Live Loomweave conformance** gate (added in rc4, fail-closed by design)
   errored because `LOOMWEAVE_URL` / `LOOMWEAVE_LIVE_ORACLE_LOCATOR` vars +
   `LEGIS_LOOMWEAVE_HMAC_KEY` secret are unset in CI — so `publish` never ran. The
   version is **not burned** (publish didn't execute); re-runnable once a
   CI-reachable Loomweave oracle + secret are wired, OR the gate's CI-applicability
   is reconsidered. **This is a user-only action (repo secrets / hosted oracle).**
6. ✅ Reconciliation: **weft-9da517a67e closed** (fixed); friction-tail
   **weft-f506e5f845** annotated (Le1+C3 done, F3/W3/L1/C2 remain — left open);
   **weft-eb3dee402f** annotated (legis foreign-deletion fix released; 0-byte root
   cause keeps it live).

**Addendum 2026-06-08 — newer dogfood-#2 legis governance findings, DONE on branch
rc4 (commit f921562), ship gated on filigree-first merge:** N3 (weft-df8d2ef454,
governance honest-state — subsumes the old Le1), N4 (weft-a7a92a40dd, honest
dirty-tree skip), C3 (weft-f506e5f845, charter names legis's own self-asserted
agent_id/operator_id). All preserve C-8 (keys out of agent reach) — red-teamed safe.
See memory `dogfood2-legis-governance-fixes`.

**Addendum 2026-06-08 — W3 cross-tool key adoption, DONE on branch rc4 (commit
fbdf949), ship gated:** legis adopted Wardline's per-finding key rename
`suppressed` → `suppression_state` (weft-ef79348eb2) — the signed Wardline→legis
hop was broken by the changed canonical bytes. Ingest reads the new key (clean
break, fail-safe over-gate); no signing change needed (signer already byte-aligned);
legis now pins its own cross-impl golden mirror (`2b2cf09…`). Live-verified:
wardline `-m legis_e2e test_legis_accepts_signed_artifact` PASSES against
reinstalled legis. See memory `cross-tool-canonical-json-contract`.

**Still open after this session (not legis-owned):** §A-15 canon ruling (WS-1);
filigree F1/R1, F2, F3, C2; wardline W1/W2/W3; loomweave C1, L1; the C-4 0-byte
root cause; the 3 sibling merge→main+release; WS-4/5/6.
