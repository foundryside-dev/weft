# PDR-0028 — Ratify Tabard: the *who* coordinate, admitted by gap-naming; the who/what/when triad; §2/§6 re-scope

Date: 2026-06-16   Status: **proposed** (gap-naming of the *who* coordinate is owner-ruled; the doctrine §2/§6 **filing** and the **member-vs-fold home** are owner-gated + provisional — see the provisional-update callout)   Author: claude (Weft hub PM)   Owner sign-off: partial — gap-naming owner-ruled; the doctrine lock-in filing + home decision await the owner's (sober) confirmation and the Phase-0 spike
Supersedes: —   Related: tabard PDR-0002 (§2/§6 + triad), tabard PDR-0003 (admission as a position), tabard `docs/proposals/2026-06-16-tabard-federation-spec.md`, weft PDR-0023 (federation-is-the-product), PDR-0024 (fleet-OS), PDR-0025 (Warpline temporal-correlation), PDR-0026 (five-member cutover), `pm/2026-06-06-agent-identity-component-plan.md`, `federation-sdk.md` (I-1..I-4), `sei-standard.md`

> **PROVISIONAL UPDATE (2026-06-16, later same day).** A subsequent design move — the
> hierarchical **session-prefix identifier** (`model+body+time` ± ticket; see
> [../../2026-06-16-background-ticket-change-debt-IDEA.md](../../2026-06-16-background-ticket-change-debt-IDEA.md))
> — reduces most of "Tabard" to a cross-member *stamping convention* + a small certification
> *Seal*, and offline verification removes the pipeline-coupling that originally forced a
> standalone member. **The gap-naming of the *who* coordinate stands; its HOME is provisional**
> (separate sixth member vs fold into Loomweave/Legis vs mostly-a-convention+Seal), pending the
> Phase-0 spike + key-custody review. Treat the "sixth member" framing below as the maximal
> option, not a settled one. It also retires the auto-bake mechanism (the session prefix is the
> bundle; "who owns the change-list" = nobody, it's a federated prefix-query).

## Context
The federation had a structurally **unowned coordinate**: SEI keys *what* changed; nothing kept *who*. Actor attribution across the suite is free-text (`--actor`, git author) or a shared-key HMAC — in-session-spoofable (T0/T1) and defeated by a lying host; Wardline's own `core/attest.py` states the gap verbatim. The owner stood up `~/tabard`, the Tabard PM produced a federation spec, and the owner ruled two things: **(a)** Tabard is the sixth member — admitted *as a position*, reframed by the owner as **"recognising we have a gap and giving it a name"** (function + name are members; the implementation is not); and **(b)** the doctrine §2/§6 "identity authority for the suite" (singular) re-scopes, with Loomweave's pre-consent. This PDR ratifies both into hub canon.

## Options considered
1. **Refuse / keep Tabard a bench candidate** — reject: the gap is real, twice-deferred, structurally unowned, and the need is proven (not speculative). Leaving the *who* coordinate unnamed invites name-sniping and leaves Legis's non-repudiation story resting on an identity it cannot mint.
2. **Admit Tabard as a full member now** — reject: no implementation exists; the shipped-behaviour quality bar (standalone parity + federation enhancement + honesty conformance) cannot be met by a spec. Admitting a built-nothing as a full member would hollow the bar.
3. **Admit by gap-naming (two-stage admission); ratify the contract shape in principle, pending the spike** — CHOSEN. Seat + name the *who* coordinate now (stage 1, owner-reserved); the implementation earns stage-2 membership against the quality bar, gated on the Phase-0 spike, off the cutover clock.

## The call
**Option 3.** Recorded into doctrine + registries + the member briefing:

1. **Two-stage admission (doctrine §7, new).** *Gap recognition + naming* (reserve an unowned coordinate's domain, authority, name, and roster seat — owner-reserved; all that roster membership requires) is distinct from *implementation membership* (the build clears the shipped-behaviour quality bar and joins the working suite). Stage 1 grants nothing the build hasn't earned; a named-but-unbuilt seat that never clears the bar is a documented gap, not a member tool. **Tabard is admitted at stage 1.**
2. **The identity triad (doctrine §2).** Identity is a coordinate space, none nested: **Loomweave** owns *what* (SEI, minted), **Tabard** owns *who* (certified credential), **Warpline** owns *when* (`branch@sha`, *correlated* — explicitly **not** an identity authority). Two identity authorities + one temporal-correlation authority. Phrased coordinate-extensibly; do not flatten to "three identifiers."
3. **§2/§6 re-scope.** Loomweave = identity authority **for code/entities**; Tabard = peer **actor**-identity authority. Owner-endorsed, Loomweave pre-consented.
4. **Roster = 6, cutover = 5 (doctrine §9).** Tabard joins the roster but **not** the five-member launch cutover; the two counts deliberately diverge.
5. **Bless the canonical handle in principle, pending the spike.** Body/Tabard/Seal is the one hub-authored handle Filigree (PRD-0001), Wardline, and Loomweave consume — **no member forks a dialect** (`weft-560f243c95`). At LOCK it must: (a) keep the **legible body coordination-key** and the **opaque certified principal** as two objects bridged by the ticket; (b) carry **host** in the shape (multi-host is Tabard's mandate even though today's fleet is single-host loopback); (c) use the **full project-qualified Filigree issue ID** as the tabard, never a bare integer — which disambiguates a *federation of projects* for free (project belongs in the assignment coordinate, never in the body or the principal).
6. **Hub authors the `branch@sha` stamping convention** (PDR-0025) Tabard signs over — not a Tabard↔Warpline bilateral token.

## Rationale
The component plan already did the adversarial go/no-go; the spec adopts SEI's adoption pattern (oracle, `_capabilities`, enrich-only consumer ADRs, LOCK) and the SDK invariants I-1..I-4. Gap-naming is the honest minimum: it reserves a coordinate the suite demonstrably needs without pretending a build exists, and the owner's "name the gap" framing self-enforces the two-stage split (it plainly is not "this implementation earned in"). Ratifying the contract *shape* in principle lets the spike run against a stable target; ratifying nothing *shipped* keeps the quality bar intact.

## Reversal trigger
- **Phase-0 NO-GO** (no offline-verifiable, no-reachable-signer attestation, or assignment-as-principal reintroduces intra-fleet forgeability): the *gap stays named* but the *crypto member-build* is abandoned — fold the in-session piece into Filigree `verified_actor` / Legis launch-binding as a capability. The seat persists as a documented gap; no implementation joins.
- If the **honesty-conformance** or **enrich-only** fixtures fail in the build, implementation membership is refused regardless of capability (doctrine §7 growth-guard).
- **Still owner-reserved / pending:** the §2/§6 `doctrine.md` commit (this edit, owner-filed); the key-custody security review; and the hub-side identity PDR (does a "stable handle from spawn context" survive if identity = current assignment; the unassigned-agent edge) — unresolved, and Tabard consumes that ruling once made.
