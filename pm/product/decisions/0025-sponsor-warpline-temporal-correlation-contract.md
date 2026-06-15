# PDR-0025 — Sponsor the Warpline-owned temporal-correlation contract

**Date:** 2026-06-16 · **Status:** Adopted (owner ruling, in-session) · **Class:**
authority-split / seam sponsorship · **Driver:** Warpline product-owner proposal
"Temporal Correlation Spine" (2026-06-16), taken to the foundation.

## Context

A single logical change ripples across the federation — code moves, a Filigree issue
changes state, a Wardline finding appears, a Legis attestation lands, the Loomweave
graph shifts. Today no member can reconstruct that bundle, because the events siblings
emit do not carry the originating change's git anchor (`branch@sha`). Warpline — the
admitted temporal / change-impact authority (PDR-0022) — proposed a hub-authored,
hub-blessed convention: **every member stamps the originating `branch@sha` on the events
it emits, as optional metadata**, and Warpline owns the **temporal-correlation contract**
(anchor semantics, granularity, reconstruction) and performs the read-time join. Git owns
the key value; no member mirrors another's data; no new identifier is minted. This is the
mechanism behind Warpline roadmap **Rung 3** (empirical blast radius) and a concrete
instance of PDR-0024's **sense-making plane** / PDR-0023's "seams are the crown jewels."

The proposal routed two questions to the owner: (1) sponsor a Warpline-owned
temporal-correlation contract as a domain-authority extension; (2) confirm the convention
stays on the enrich-only-metadata side of the owner-*closed* `weft://` registry/broker
decision (`uri-scheme.md`).

## Decision (owner)

1. **Sponsor in full, now.** Warpline is ratified as **owner of the temporal-episode
   axis** — the temporal-correlation contract (anchor semantics, granularity,
   reconstruction). This is a **domain extension within Warpline's already-admitted
   temporal/change-impact authority**, NOT a new member and NOT a second entity-identity
   authority. The SEI(entity/noun/spatial)-vs-episode(change/verb/temporal) split is clean
   and consistent with PDR-0021: entity identity remains Loomweave's single authority; the
   temporal anchor never touches it.
   - The owner chose **sponsor-now over the PM's recommended "bless in principle pending
     demo"** — a deliberate override of the prove-the-need *default*. Consequence: the
     authority grant is ratified ahead of the demonstration; the demo (§6 step 2) is now a
     **validation/shaping gate, not a go/no-go gate.**
2. **The no-broker line holds (owner-confirmed).** Stamping an existing git value on each
   member's own events + a read-time join is **enrich-only metadata** — no central store,
   no new minted identifier, no broker, no `weft://` scheme. The owner-closed `weft://`
   registry/multi-fetch decision is **not** reopened. The read-time join must stay
   decentralized (no member becomes the join's central index/store).

## What this authorizes vs. what still gates

- **Authorized now (no further sign-off):** Warpline executes §6 steps 1–2 —
  repo-local capture (`branch + HEAD SHA + detection timestamp` as the working-context
  anchor; today the store keeps only the introducing `commit_sha`) and a reconstruction
  demonstration. This was always within Warpline's repo autonomy; sponsorship adds the
  ratified contract ownership above it.
- **Still gated (proven-need discipline retained even under full sponsorship):** the
  **cross-member "stamp the originating SHA" convention** is authored **hub-side**, and
  members adopt **incrementally** (enrich-only, so partial adoption yields partial
  bundles). No sibling obligation (Filigree/Wardline/Legis/Loomweave) **freezes** until
  the hub authors the convention against Warpline's demonstrated reconstruction. The
  authority is granted; the four-member bill is not yet drawn.

## PM conditions attached to the sponsorship

These are PM guidance riding on the owner's ruling; they were not overridden.

1. **The demo must exercise the squash-merge/rebase case, not a convenient clean-history
   fixture.** The §7 history-rewrite candidate ("reconcile via the Legis→Loomweave
   rename/rewrite signal") **conflates two operations**: a *rename* (path→locator,
   Loomweave-owned, settled in PDR-0021) is **not** a *SHA-rewrite* (squash/rebase
   replaces the SHA for the same logical change), and the rename feed does **not** carry
   rewrite reconciliation today. SHA-rewrite reconciliation is the genuinely-unowned
   load-bearing question; the demonstration must bite there (cf. "verify with a
   representative fixture, not a convenient one").
   **Why squash is the headline failure, not an edge case:** squash-merge — a default
   merge mode on GitHub/GitLab — collapses N feature-branch commits into one *new*
   mainline SHA and the feature branch is typically deleted. Every anchor stamped during
   the episode (on Filigree issues, Wardline findings, Legis attestations) is therefore
   **orphaned the instant the PR merges** — it points at a SHA reachable from no branch.
   So the spine breaks on the *most common* merge workflow unless the contract handles it.
   **Candidate to test (not prescribed — Warpline's contract to shape):** Legis is the
   git/CI/**PR** authority and is the member that actually *observes the merge*, so it can
   emit a **merge/rewrite reconciliation mapping** ({squashed-away SHAs} → {new mainline
   SHA}) — a signal **distinct from** the PDR-0021 rename feed and on-charter for Legis.
   Any such new Legis signal is itself a future hub-blessed seam under prove-the-need; the
   demo's job is to show whether reconstruction *needs* it or survives on `branch` +
   episode-boundary alone.
2. **Define the episode boundary in the demo.** Granularity resolves toward "change
   *episode* ≈ work-session" (the desk/employee model), not per-commit; too fine
   fragments a logical change, too coarse blurs unrelated work. The contract must define
   the episode boundary and an honest fallback for dirty-tree / detached-HEAD (with an
   honest `weft-reason` class).
3. **Sequencing fence.** This is Rung-3 / token-tier. It must not compete with the
   four-member launch cutover (`weft-4b2f948f70`) or Warpline's base-implementation
   fast-follow (both of which sit ahead of it). Steps 1–2 are cheap and parallelizable,
   capacity permitting, **behind** both.

## Doctrine compliance (verified against source 2026-06-16)

- **Enrich-only (§5)** ✓ — optional metadata; absence degrades to "uncorrelated," never a
  failure; removing Warpline breaks no member.
- **Honesty invariant (§10)** ✓ — an unstamped/unjoinable event reconstructs as honestly
  partial via the `weft-reason` carrier, never "no related changes."
- **Hub-authored / hub-blessed (PDR-0023/0024)** ✓ — the convention is authored by the
  hub, not dictated peer-to-peer by Warpline.
- **Not a registry/broker (`uri-scheme.md`)** ✓ — owner-confirmed (decision §2).
- **Not a second identity authority** ✓ — temporal-episode axis is orthogonal to SEI
  (decision §1).

## Reversal trigger

Revisit the sponsorship if Warpline's reconstruction demonstration fails to produce a
useful bundle on a **rewritten-history** fixture (squash-merge), or if the read-time join
cannot stay decentralized in practice (a member is forced to become a central join store —
which would breach the §2 no-broker confirmation and reopen this PDR). At fleet scale
(elspeth), inherits PDR-0023/0024's falsifier: if the correlation adds nothing agents
couldn't get from the members standalone, the glue is inert here.

## Provenance

Owner ruling in the PM session, 2026-06-16, in response to the Warpline "Temporal
Correlation Spine" proposal. AskUserQuestion: "Sponsor the Warpline-owned contract fully
now" + "Confirm — [no-broker] distinction holds." Related: PDR-0021 (rename path-vs-locator
boundary), PDR-0023 (federation is the product), PDR-0024 (fleet/sense-making plane),
doctrine §5/§10, `uri-scheme.md` (`weft://` closure), `~/warpline/docs/product/roadmap.md`
(Rung 3 + temporal-correlation spine).
