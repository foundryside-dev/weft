# PDR-0044 — Bless `weft.wardline.scan_manifest.v1`; close AMBER-2 (scan_manifest seam BUILT)

- **Date:** 2026-07-01
- **Status:** accepted (hub bless of a federation contract — within "hub blesses every seam")
- **Bet/Now:** fabric-first (PDR-0035) — the single clearest half-built seam from the 06-29 audit is now closed

## Context
AMBER-2 (`weft-9a35aa00e7`) was the audit's clearest half-seam: plainweave's `wardline_adapter`
reached for a `scan_manifest` record wardline never emitted, degrading to a path-set heuristic
(`wardline_scan_identity_absent`). Warpline-session built it at owner direction; both ends are now
released **on main**.

## Verified against source + live (not trusting the handover doc)
- **Producer — wardline:** `cli/scan.py:41-56` builds the `scan_manifest` record and writes it as the
  unconditional header line of `.wardline/<ts>-findings.jsonl`; `core/run.py` exposes
  `analyzed_paths`. Commit `14030acb` **is on main** (`release/consolidation` merged, wardline main
  `e541ff09`), tag **`v1.2.0`**. Live e2e: a real `wardline scan` emitted
  `{"kind":"scan_manifest","scope":{"covered_paths":["pkg/a.py","pkg/b.py"]},"ruleset_id":"sha256:…"}`
  — exact shape, repo-relative POSIX paths, header present even with findings.
- **Consumer — plainweave:** `wardline_adapter.py:104-220` parses `kind==scan_manifest`, extracts
  `scope.covered_paths` and `ruleset_id`, and guards ruleset-mismatch between snapshots. Commits
  `9ca6698` + `4782fd6` on main; CI runs `make ci` + a real wardline scan green.

## THE BLESSED CONTRACT — `weft.wardline.scan_manifest.v1`
First line of `.wardline/<ts>-findings.jsonl` (additive header; line-by-line finding readers ignore
the unknown `kind`; the signed legis artifact / `scan_scope` is untouched):
```json
{"kind": "scan_manifest",
 "scope": {"covered_paths": ["<repo-relative posix path>", "..."]},
 "ruleset_id": "sha256:<hex>"}
```
- **`covered_paths`** = the paths wardline actually **analyzed**, in the SAME repo-relative POSIX
  format as `Finding.location.path`. A now-absent prior finding reads **RESOLVED** only when its path
  is genuinely in this set. **Defaults to the ANALYZED set** so `--affected` delta mode does not
  over-claim coverage (a discovered-but-not-re-analyzed file stays *indeterminate*, not falsely
  resolved); `wardline scan --manifest-full-coverage` restores the full discovered inventory.
- **`ruleset_id`** = `ruleset_hash(config)` (`sha256:…`, **== the legis `rule_set_version`**) so a
  consumer detects a ruleset change between snapshots and does NOT read a finding's disappearance
  under a different ruleset as a resolution.
- **Producer:** wardline. **Consumer:** plainweave (echo-only, advisory). Enrich-only; never gates.
- **Change discipline:** any change is a new vN+1 URI, never a v1 mutation.

## Where the bless lives (honest: the hub seam-index doesn't exist yet)
There is no hub-owned machine-readable seam-index to register this in — that index is exactly what
`weft-dbaada5883` (hub reclaims seam stewardship) will create; today the registry is wardline-resident
(`seam_registry.json`, now on main). So this PDR **is** the authoritative hub bless for now.
Follow-ups: (a) ensure wardline's `seam_registry.json` carries a `scan_manifest` row that syncs UP to
the hub index once re-homed; (b) the contract's drift-protection is the existing CI cross-checks
(plainweave adapter reads real wardline output; wardline source-drift) — the same distributed pattern
as the warpline oracles (PDR-0043), not a central gate.

## Consequences
- **Close AMBER-2 `weft-9a35aa00e7`** — the producer-side gap it tracked no longer exists (e2e-confirmed).
- **Unblocks `weft.plainweave.wardline_peer_facts.v1`** — the peer-facts producer's scan_manifest
  dependency is satisfied; relevant to half-seam #3 (`weft-61c55deab9`, the wardline_peer_facts spike).
- Confirms the "not-yet vs never" framing again: another audit half-seam moved from named-gap to built
  within days.

## Reversal
- If a wardline scan is found NOT emitting the manifest (e.g. a non-jsonl format path), reopen — the
  contract is "unconditional on the default jsonl artifact," and a silent omission would re-strand
  plainweave on the heuristic.
