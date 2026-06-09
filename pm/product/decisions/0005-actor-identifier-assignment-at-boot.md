# PDR-0005 — Close the actor-identifier gap (P3): minted session id, not a persona, not Tabard

Date: 2026-06-09   Status: accepted   Author: claude-filigree (PM)   Owner sign-off: yes (owner spotted the gap)
Supersedes: —   Related: PDR-0003, PDR-0004, filigree-c2009921cf, filigree-81d3971467, pm/2026-06-06-agent-identity-component-plan.md (Tabard)

## Context
PDR-0003 reshaped the bet to a path-keyed handover (A) + identity-free write-guard/presence (B/C),
and in doing so **under-specified a real gap the owner caught:** filigree *attribution* — every
`work_claim` / comment / close records an `--actor`/`--assignee` — fundamentally needs a
**non-colliding identifier per booting agent**, and assigning it is unsolved. Today it is free-text;
"everyone is `claude`" is what produced the `ACTOR_MISMATCH` confusion on the loomweave issues and
part of why today's stomp was hard to attribute (rogue agent and worktree agent shared a name).
"Identity-free" was true of B/C, **not** of filigree attribution — the two were conflated.

This is a **third problem (P3)** the discovery panel never addressed: the interview prompt handed
them "your actor identity is just a free-text string" as *fixed background*, so they never solved it.
It is the load-bearing core of the owner's original "identity management" intuition, minus personas
and minus crypto-verification.

## Options considered
1. **Status quo** — free-text `--actor` + the A1 hand convention (`claude-filigree[-worktree]`). Collides
   across concurrent agents; no continuity; the observed `ACTOR_MISMATCH` pain. Reject.
2. **Per-session minted id only** — filigree mints a unique id each boot; use it as the actor. Solves
   uniqueness, but **breaks cross-session claim continuity** (every run a stranger; a resumed agent can't
   reclaim its own prior work) — and the handover (A) loses a stable address.
3. **Two-level: stable handle + minted run id** — a stable *handle* for claims/continuity, a minted
   per-session *run id* for event attribution/uniqueness.

## The call
**Option 3, layered to stay cheap.** Close P3 with the **assignment side of `filigree-c2009921cf`** (the
session/run object the handover already rides on):
- On boot, filigree **mints a per-session run id** → this is the unit of event attribution and guarantees
  uniqueness; it **replaces free-text `--actor`** for event records.
- **Claims/continuity bind to a stable handle** supplied by **spawn context** (an operator-given label,
  the worktree, or a harness-passed value), defaulting to context-derived, and falling back to the bare
  run id for one-shot agents (which then simply have no cross-session continuity — acceptable).
- **Two layers, kept separate:** (1) *have a non-colliding id* = THIS, cheap, part of mechanism A's
  substrate; (2) *trust the id is unforgeable* = **Tabard, Later, out of scope.** Do not pull Tabard in to
  solve P3.

This **folds into mechanism A** (same `filigree-c2009921cf` substrate); it does **not** change B/C.
The stable handle is an **attribution key, not a behavioural persona**, and per PDR-0003 it must **not**
carry area-ownership (the cross-cutting-deference hazard) — it names *who/which run*, never *whose lane*.

## Rationale
filigree's whole coordination model rests on attribution (claims, events, the ready queue), so a
non-colliding actor id is not optional — it's the substrate the rest assumes. The owner's "menu" instinct
was right about *where the stable handle comes from* (spawn context can supply it; a memoryless agent
can't remember it) and wrong only about it being a *personality*. Minting solves uniqueness for free off
an object we're already building; deferring trust to Tabard keeps this cheap and avoids the doctrine
§2/§6 amendment for a problem that doesn't need it.

## Reversal trigger / open design question (→ the A/B design spike)
- **Open:** exactly where the stable handle comes from (operator label vs worktree vs harness), and
  whether `work_claim`/`--assignee` bind to the handle (continuity) while events bind to the run id
  (attribution). Resolve in the spike, not by opinion.
- If minting an id adds boot friction agents route around (back to free-text), **fall back to
  context-derived ids** (worktree+model+nonce) rather than a filigree round-trip.
- If a P3 collision ever causes a *wrong* claim/attribution with real consequence (not just confusion),
  its priority rises toward B's.
