# Tabard (member)

**Domain authority:** actor identity — provable, unforgeable authorship. "Who is this actor, and is this binding genuine?" The federation's **actor-identity authority** and the ***who*** coordinate of the who/what/when identity triad (Loomweave = *what*/SEI; Tabard = *who*; Warpline = *when*). Peer to Loomweave's identity authority — **neither nested**.
**Repo:** `~/tabard` · **Language:** Python (planned) · **PyPI:** `tabard` (name reserved; `0.0.0` placeholder honestly states "no implementation").
**Current details:** *(snapshot — not authoritative; see repo)* **Admitted by gap-naming (2026-06-16); implementation does not exist yet.** The build is a Phase-0 go/no-go spike. For the latest, see `~/tabard/docs/product/` and `~/tabard/docs/proposals/2026-06-16-tabard-federation-spec.md`.

## Roster status — read this first

Tabard is the **sixth member, admitted by gap-naming** ([doctrine.md](../doctrine.md) §7 stage 1, owner ruling 2026-06-16; [hub PDR-0028](../pm/product/decisions/0028-ratify-tabard-the-who-coordinate.md)). **What is admitted is the position + name** — the *who* coordinate was structurally unowned (SEI keys *what*, nothing keyed *who*; Wardline's own `core/attest.py` states the gap verbatim) — **not an implementation.** Stage-2 *implementation membership* (the shipped-behaviour quality bar) remains to be earned, gated on the spike. Tabard is **not** in the five-member launch cutover.

> **PROVISIONAL — home open (2026-06-16, later).** The *who* coordinate is named for good, but its **home is not settled**: a separate member (this repo), a fold of the certification *Seal* into Loomweave/Legis, or — under the hierarchical session-prefix identifier (`model+body+time` ± ticket) — mostly a cross-member stamping *convention* plus a small *Seal*. The Phase-0 spike + key-custody review decide. Read this "member" briefing as the *maximal* framing until then. See [../pm/2026-06-16-background-ticket-change-debt-IDEA.md](../pm/2026-06-16-background-ticket-change-debt-IDEA.md).

## What it owns (authoritative in Tabard)

The actor-identity binding store and the certification root: an opaque, certified agent **principal**, its `actor_id ↔ public_key` binding, and an append-only lineage (`enrolled · key_rotated · revoked`). It answers exactly one question — *"is this actor who the credential says it is, and is that binding currently valid?"* — and **nothing** about what the actor may *do* (Legis) or what work it *claims* (Filigree).

The founding reframe — **assignment-as-principal** (the 2026-06-16 hub session): agents do not own durable identities; *tasks* do, and an agent inherits one by assignment (dons the tabard). Three layers:

- **Body** — `model + PID (+ host/nonce)`, self-minted, broker-free, ephemeral. (Today; needs no component.)
- **Tabard** — the task's identity, inherited by assignment = **Filigree's `work_claim`** (the full project-qualified issue ID is the durable handle; a bare ticket number is project-local). (Today; needs no component.)
- **Seal** — the attestation that this body genuinely wears that tabard. **This is the only new thing Tabard the component builds.**

## Federation role (points to weft for patterns)

- **Roster:** sixth member by gap-naming (above). The §2/§6 re-scope (Loomweave = identity authority **for code/entities**; Tabard = peer **actor**-identity authority; Warpline = temporal-*correlation*) is owner-endorsed with Loomweave's pre-consent; the `doctrine.md` lock is filed in this edit.
- **Certifies, never sole-signs.** The agent mints its own Ed25519 keypair on its host; Tabard certifies the binding **once at enrollment**; consumers verify **offline**, with **no call to Tabard at verify time** (keeps it off the §6 shared-infrastructure line). Tabard never holds the agent's private key.
- **Attributes, never gates.** It makes authorship provable (the T1 → T2 jump); it renders no verdict (Legis) and owns no work-state (Filigree). Re-derive any "security" shimmer as provable-attribution, not authorization ([deconfliction-not-security](../doctrine.md)).
- **Enrich-only, never load-bearing.** Absence degrades every consumer to free-text with `identity_stable:false`, and never blocks. Encoded as the **first conformance fixture** (authority-absent degrade), so enrich-only is *proven, not asserted*.
- **Consumes SEI opaquely, never mints it.** Where a signed payload references code entities, it keys on Loomweave's SEI (I-1), stored opaque (I-3). It is the *actor* axis, orthogonal to SEI's *entity* axis.
- **Conformance is oracle-gated** (the SEI §8 analogue): identity round-trip + opacity, enrolment trust-root, forged-credential fail-closed, capability-absent honest-degrade. Honesty conformance (`weft-reason`, no confident-empty — I-4) is a hard admission gate.

## Consumers (the 2026-06-16 intake round)

- **Filigree** — primary consumer + co-producer; owns the Tabard layer (`work_claim`), building the `verified_actor` enrich-only socket; the broadcast board (PRD-0001) is the **de-risking pilot** that proves Body+Tabard coordination *before* the crypto exists.
- **Legis** — highest-value verified-principal surface (closes the HMAC-shared-key gap, deferred C5). **Intake still outstanding.**
- **Wardline** — signed-artifact proving ground + zero-dep adoptability (`wardline[tabard]` opt-in extra, never a base dep) + the who/what/when demonstrator.
- **Loomweave** — adoption-pattern precedent (SEI) + the *what* coordinate; thin additive provenance, late.
- **Warpline** — bidirectional: *gives* the `branch@sha` *when* axis Tabard signs over; *consumes* Tabard to resolve its `actor` field. Rung-3.

All bindings: enrich-only, principal/SEI opaque, **hub-blessed (no forked dialect)**. The canonical handle and the `branch@sha` stamping convention are **hub-authored**, not bilateral.

## Notes

- **Build-maturity gates OUTSTANDING:** Phase-0 spike unrun (no code); §2/§6 federation lock-in (this `doctrine.md` edit + roster, owner-filed); key-custody **security review** unmet.
- **Phase-0 is scoped to the Seal only** — two of the three layers already exist. NO-GO is consumer-safe (Filigree already degrades) and does not un-name the gap; it folds the in-session piece into Filigree `verified_actor` / Legis launch-binding as a *capability*, not a member.
- **Still open upstream (Tabard consumes, does not fork):** the hub-side identity PDR on whether a "stable handle from spawn context" survives if identity = current assignment, and the unassigned-agent edge (a body with no ticket → anonymous until it claims).
