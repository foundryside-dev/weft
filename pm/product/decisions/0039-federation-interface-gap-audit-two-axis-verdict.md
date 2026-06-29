# PDR-0039 — Federation interface + gap audit: two-axis verdict + two new seam REDs

- **Date:** 2026-06-29
- **Status:** accepted (discovery/analysis — within grant)
- **Bet/Now:** fabric-first (PDR-0035) · seam-health epic `weft-b6effe30f9`
- **Artifact:** `pm/2026-06-29-federation-interface-gap-map.md` (+ raw per-member maps in scratchpad)

## Context
Owner asked (mid-session) to "reach in with subagents into each subproject and map
out the interfaces and gaps — the integration fabric is a bit of a mess, I think it's
complete but have no idea." This is squarely the seam-health Now. Ran 7 subagents
(one per member), each against a clean detached `main` worktree, **reading source not
docs** (docs have drifted suite-wide) and **not exercising MCP** (a hub-rooted agent
misroutes MCP → artifact verdicts); batched 2-at-a-time per the concurrency lesson.
Refreshes the 2026-06-15 seam-health map.

## What was found (the call is a verdict, not a choice)
**"Complete" splits on two independent axes:**
- **WIRED?** *Mostly* — holes are all known: two consumer fills mid-landing (churn →
  loomweave LANDED; preflight → legis on a branch), `scan_manifest` doesn't exist
  (`weft-9a35aa00e7`), warpline v4 `verification_events` landed-but-dark.
- **CORRECT/HONEST?** *Mostly yes now — the real story.* The 06-15 thesis ("every seam
  lost the ability to say I don't know") is **substantially cured**: wardline `failed:[]`
  fixed, scheme-drift nameable on the filigree wire, legis governance reads discriminated,
  warpline weft_reason triples, dropped-signature now fails closed. **Enrich-only holds:
  zero load-bearing cross-member deps across all 7 members** (one fail-closed seam —
  filigree→loomweave registry for scan-ingest — scoped to the federation feature).

**Two seams still LIE (the residue):**
- **RED-1** closure-gate drift is ownerless — a governed issue closes `allowed:true`
  against drifted content; neither legis nor filigree compares current-code-vs-attach.
  Cross-confirmed both sides. Filed `weft-0678843f13` (P1).
- **RED-2** plainweave `authority_boundary` lies — advertises `local_only`/no-live-peer-calls
  but makes a live loomweave HTTP call on trace-enrich when an endpoint is configured.
  New finding; honesty-invariant. Filed `weft-d5091cba12` (P1).

Both REDs are **functional/honesty** failures (deconfliction-not-security), small fixes.

## Options considered
- **A — Workflow tool fan-out (all at once).** Rejected: trips the concurrency-outage
  lesson; the Agent tool with manual 2-at-a-time batching is safer and the user asked for
  "subagents," not a workflow.
- **B — read docs/registries.** Rejected: docs have drifted; source is the only ground truth.
- **C — source-grounded per-member subagents → hub-side synthesis (chosen).** Reliable
  join + re-verification of cross-member claims against cited source.

## Rationale
The fabric is **structurally sound and newly honest about its own emptiness** — not a mess
so much as a fabric mid-weave with two frayed threads, while 4/7 members are concurrently
reshaping on feature/release branches (the wardline seam-conformance program + `seam_registry.json`
is NOT on main yet). The audit gives the seam-health epic a current, cited baseline and a
concrete strike list, and `weft-9a35aa00e7` a clean resolution path (lift wardline's
`scan_scope` into a standalone manifest).

## Reversal trigger
- If the **enrich-only guardrail (metrics.md) ever reads > 0** (a load-bearing cross-member
  dep appears), this "structurally sound" verdict is void — re-audit immediately.
- If a third confident-wrong seam surfaces beyond RED-1/RED-2, the "honesty epidemic mostly
  cured" claim reopens and the seam-conformance gate (PDR-0038) becomes higher priority.
- Re-run this audit after the wardline seam-conformance program + the legis refactor land on
  main (the snapshot was taken mid-flight).
