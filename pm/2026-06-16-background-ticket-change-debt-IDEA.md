# Captured idea — the background ticket ("change debt") + post-facto identity capture

> **STATUS: CAPTURED IDEA — NOT A DECISION.** Authored late 2026-06-16 in a hub↔tabard
> design conversation; the owner was explicitly intoxicated and asked for a sober
> re-read before anything here is acted on. **Do not promote to a PDR, dispatch, or
> build without that review.** This is a thinking artifact, not canon.

## Why this exists (the gap it closes)
The identity model (A′ / assignment-as-principal — see [hub PDR-0028](./product/decisions/0028-ratify-tabard-the-who-coordinate.md), tabard PDR-0002/0003) says: identity = the ticket you're assigned (the *tabard*); an agent with no ticket is just an anonymous *body* (`model+PID`). The awkward gap was **ticketless work** — edits made before/without claiming a ticket. This idea closes that gap **without a gate**.

## The mechanism
- Any time an agent edits **without an explicit ticket**, a **background ticket** silently accrues its changes ("change debt").
- The **through-line during the coatless stretch is the BODY** (`model+PID`) — *not* a counterfactual "tabard it would have had" (that's spooky). Edits are captured live under the body; the ticket is named **afterward** and the body's accrued edits are stapled to it. (This is the job the body layer exists for.)
- Terminal outcomes — modelled on **Filigree's existing `observation` lifecycle** (transient → promote-or-expire), which is the right precedent and means little new machinery:
  - **SEALED** — Legis detects a commit → Filigree auto-bakes the bundle as honestly-labelled *"unplanned work, auto-captured,"* associated with the commit(s). *(This terminal state is the one thing observations don't have: auto-completion on an external git event.)*
  - **PROMOTED** — the agent (or operator) formalises it into a full ticket: a quick *"oh yeah, was fixing a thing,"* **or** a full P0 with tags + linked tickets. Exactly `observation_promote_to_issue`.
  - **DISMISSED / EXPIRED** — abandoned/reverted/never mattered. Like an observation lapsing.
- Net effect: **"all work has a ticket + a why" becomes true BY CONSTRUCTION** — the no-ticket state never really exists — yet nothing is ever blocked. (Owner's phrase: "a *soft* version 1" — the wall made soft by always-having-a-ticket instead of demanding one.)

## The new ticket KIND (not a bug, not a task)
- Its own **type** with a **2-state workflow**: `in-flight` (watching a growing change-list) → terminal (sealed / promoted / dismissed). No triage/workflow states. Filigree already supports **per-type workflows** (`type_list`, `workflow_status_list`), so this composes — not a new subsystem.
- **Running commentary** = a lightweight annotate affordance ("oh yeah, was fixing a thing"). Filigree already has `comment_add` *and* an annotation subsystem — so this is a convention on the type, not new plumbing.
- **Precedent = observations.** Same lifecycle *shape* (transient, cheap, promotable), **different payload**: an observation is an *incidental defect you noticed outside your scope*; a background ticket is *your own accruing changes*. Reuse the **pattern**, not the type.

## Who owns "the big list of changes"? (envelope / contents / seal)
The list from "first edit" → "commit" is **three things with three owners** — giving it all to Legis *feels* neat only because Legis owns the commit, which is the **last event in the list, not the list itself**:
- **Envelope** (the work-item, in-flight/completed) → **Filigree** (it owns tickets; already has `file_register` / `issue_file_list` / `file_timeline_get` file-association tooling).
- **Contents** (the accruing list of what changed, when) → **Warpline** (`change_events` = "what changed, when" *is* its domain), with **Loomweave** for *which entities* (SEI) and the **body/Tabard** for *who*.
- **Seal** (detect commit; attest "this bundle, by this actor, became this sha") → **Legis** (git/CI boundary + attestation lineage).

**Decisive reason it can't all be Legis: enrich-only (doctrine §5).** You must be able to **edit and accrue with Legis absent** — editing is core flow; if change-capture needs Legis, Legis becomes load-bearing. So **Legis owns the bracket, not the body**: it adds the seal *at commit-time when present*; the bundle accrues regardless. This is the who/what/when triad doing live work — which is *why* single-owner felt suspiciously neat.

## Load-bearing rails (keep it on-doctrine)
1. **Post-facto, never reject.** The hook OBSERVES and RECORDS; it NEVER rejects an edit. (Owner's lived reason: a rejecting hook's failure mode is the *operator* hand-debugging the hook because nothing can be edited anymore — it bricks the agent and dumps the debt on the human. Cf. the git-stash-blocking hook.)
2. **Best-effort / never load-bearing.** Any member absent → edits still happen, just anonymously (the gradient). The bundle is enrichment, never a precondition.
3. **Hook-fed, not daemon-watched.** Rides the existing edit-time hook (mechanism B's PreToolUse, PDR-0009), not a watching process. A watcher daemon = the §6 orchestrator we forbid.
4. **Honest labelling** (§10 honesty invariant); identity **coordinates, never gates** (deconfliction-first, not security).

**The only hard stop is different in kind:** the **collision guard** (mechanism B) aborts a *clobber* of a peer's in-flight work — deconfliction, NOT permission — and even it **self-disables if it false-fires** (PDR-0003), for the same reason rejecting hooks are banned.

## Compaction, resolved
Don't try to *detect* a compaction. The signal is **"the agent had to re-request its identity"** — that act IS the discontinuity event; stamp it. The bundle/logbook accrues re-orientation events across a stretch even if the body changes (crash → new PID) mid-bundle.

## Open / fiddly (for the sober read)
- **Terminal states:** `in-flight → {sealed-at-commit | promoted-into-real-ticket | dismissed/expired}` — confirm these three.
- **One sha or many?** An episode can span **multiple commits** → the seal associates a **commit range/set**, not a single sha (which is exactly Warpline's episode shape — another sign the *contents* are Warpline's, the *seal* is Legis's).
- **Expiry differs from observations:** a background ticket probably must **not** expire while it holds **uncommitted live changes** (it's live work, not a stale note) — expire only when empty/abandoned. Different expiry logic.
- **Start/stop/merge rule:** when does a new background ticket begin vs roll into the current one? Candidate: align to **Warpline's episode boundary (≈ work-session)**.
- **Keep/forget classifier** (already exists for B/C, PDR-0009) gates what's worth bundling so stray edits don't spawn noise tickets.
- **Multi-body bundles:** attribution records the body-transitions inside the bundle; it does NOT fabricate a single author.

## Relationships
A′ question (this closes the unassigned-agent edge); assignment-as-principal + the body/tabard/seal model (tabard); mechanisms A/B/C (PDR-0003) + in-house hooks (PDR-0009); the who/what/when triad ([hub PDR-0028](./product/decisions/0028-ratify-tabard-the-who-coordinate.md), tabard PDR-0002); Warpline temporal episode (weft PDR-0025); Filigree `observation` lifecycle (the precedent).

## Note
The 2026-06-16 identity-north-star readiness workflow (six per-project POs) is expected to test the ownership split independently — watch whether Warpline claims the change-list, Legis flags the commit-seal + load-bearing risk, and Filigree surfaces its file-association tooling + the new-type idea. If they don't converge on envelope/contents/seal, the story has a hole.

---

## UPDATE 2026-06-16 (post-readiness-workflow) — the "always-available, NOT persistent" reframe
*(The readiness panel ran — see [`2026-06-16-identity-north-star-readiness.md`](./2026-06-16-identity-north-star-readiness.md). This update responds to it and SUPERSEDES the framing above where they conflict. Still a CAPTURED IDEA — sober read pending.)*

**The reframe (owner):** Tabard ensures an agent **always has an identity to attribute actions to**, even with no Filigree ticket. Crucially that means attribution is always **AVAILABLE** — *not* that an agent has a **persistent self**.

**Why it's structurally safe (the timestamp is the anti-persona mechanism):** the handle is `model + ticket + time + body(pid)` — a **snapshot of an engagement** ("this body, on this ticket, at this time, with this model"), NOT a durable *who*. A reputation/persona cannot accrete because the identity dissolves the moment any coordinate changes. This satisfies the persona anti-goal (PDR-0006) **structurally, not by policy** — there is no durable agent-self to attach a track record to.

**It does NOT walk back assignment-as-principal — it sharpens it.** The durable thread is still the **ticket** (continuity = successive engagement-snapshots attaching to the same ticket; the handover rides on the ticket, not the agent). Ticketless work is `model + time + body` — a valid snapshot minus the ticket coordinate, still attributable. So: **identity = a timestamped engagement *with* a durable task**; the task is the anchor, the agent is a fungible moment-bound body.

**Two timestamps, two jobs (do not conflate):**
- **Engagement-anchor** — set when this body-on-ticket *begins*; STABLE for the engagement; part of the snapshot identity (the "...at this time" the owner means; the anti-persona field).
- **Freshness/heartbeat** — *updates* as the engagement lives; read as the liveness / discontinuity signal ("had to re-ask who I am"); NOT part of the name. (If the heartbeat were the name, identity would change every tick.)

**Effect on the readiness-panel objections:**
- **#3 auto-bake "manufactures a principal by fiat" — DISSOLVED, and better.** The principal exists at edit-time (the engagement snapshot), so nothing is invented on commit. It also removes the *need* for auto-bake: attribution is free, so the background-ticket demotes to **OPTIONAL** "bundle my unplanned work for the *why*" — which sidesteps the seam-inversion + §6-daemon objections by not requiring them. Trade: the auto-bake "flex" becomes optional/manual. Worth it.
- **PDR-0028 "who is just a field-set, not a member" — REBUTTED.** A field on a ticket can't supply identity when there's no ticket; ticket-independent identity needs a standalone authority (cert root + store) = member-shaped. (Still doesn't make the code exist or the spike pass.)
- **#2 honesty/assurance axis — REINFORCED.** "Always attributable" tempts treating weak (T0/T1) attribution as strong; the assurance tier is *more* essential, not less.
- **#9 BODY launch-bound — ELEVATED.** An always-on identity is only worth its anchor; freely self-minted = spoofable (Legis's lesson).
- **#1 never-reject · #4 verified_actor name taken · #5 two WHAT axes · #8 delegated SEAL — UNCHANGED.** #6 (Warpline already owns the WHO-on-episode join) slightly supported. #7 (SEI unavailable post-commit) partly dissolves if auto-bake is demoted.

**Net consequence for the Phase-0 spike (PDR-0028, still uncommitted):** the principal under test is "always-available verified actor = a timestamped engagement snapshot," with the **ticket as context, not the identity itself.** The spike should additionally de-risk (a) **delegated verification** (members carry an opaque seal, not every member holds a key — Wardline) and (b) **launch-bound body** (Legis). Two things to confirm on the sober read: lock "available, not persistent," and accept auto-bake demoted to optional.

---

## UPDATE 2026-06-16 (later) — the hierarchical session-prefix identifier (THE KEYSTONE)
*(Supersedes the background-ticket / auto-bake machinery above where they conflict. Still a CAPTURED IDEA — sober read pending.)*

**The move:** make the identifier **hierarchical** — a session *prefix* + an optional ticket *suffix*:
- `model + body + time` = the **SESSION** (always present, ticket or not; `time` = the stable session-START anchor, NOT the heartbeat).
- `model + body + time + ticket` = an action within that session, scoped to a ticket.

Bundling falls out of the prefix structure — **no mechanism required.**

**What it dissolves:**
- **Always-available attribution** = the bare prefix. Never anonymous; never persistent (the time-anchored prefix dissolves each session).
- **Background-ticket + auto-bake — retired as objects.** The session prefix IS the bundle. "Everything this session" = prefix-match `model:body:time`; "unplanned work" = that prefix with no ticket suffix; "the #9 work" = `…:time:9`. All regex. **Promotion** = an additive association (link loose work → a ticket), never a rewrite or a fiat-minted principal. **No commit-watching daemon, no inverted Legis→Filigree seam** — Legis just seals "this commit, by this session, → this sha"; no ticket need exist unless promoted. (Retires the panel's #3 objection AND the §6-daemon problem at once.)
- **"Who owns the change-list" — nobody.** Each member stamps its OWN records with the session id and owns only those; "the full session" is a read-time **prefix-union across everyone's records** — a federated query, no central aggregate (doctrine §6-clean, enrich-only).

So the **envelope/contents/seal split collapses**: contents aren't owned, they're queried; only the **Seal** (proving a `model+body+time` really was that actor) is component-shaped. → most of "Tabard" is a **naming convention**, not a component; only the small Seal needs a home.

**Four catches (it solves itself, not everything):**
1. **Legible handle vs opaque Seal — two objects.** The regex needs the handle parseable; the certified Seal stays opaque and attests *over* it. Don't regex the Seal.
2. **Needs a cross-member stamping convention** — every member tags its records with the session id (hub-authored, additive, enrich-only). Aggregation is free; stamping is the adoption cost.
3. **Anchor-vs-heartbeat is now load-bearing** — the prefix MUST use the stable session-start anchor, never the updating heartbeat, or the prefix changes every tick and the regex shatters.
4. **Uniqueness still needs the earlier rulings** — body carries **host** (cross-host); ticket is the **project-qualified** Filigree id (cross-project) — else two sessions collapse to one prefix.

Does NOT touch the **assurance axis** (panel #2): the id is who/when/which-ticket, never how-proven. The tier rides the Seal, separately.

**Consequence for the home decision:** this shrinks "is Tabard its own component" to "where does the small Seal module live" — which the Phase-0 spike + key-custody review answer. The doctrine §2/§6 edit, PDR-0028, and `members/tabard.md` are marked **provisional on the home decision** (the gap-naming of the *who* coordinate holds regardless; the *home* — separate sixth member vs fold into Loomweave/Legis vs mostly-a-convention+Seal — is open).

**Design lesson worth keeping:** the most robust version *removed* machinery (daemon, auto-bake, owned aggregates) and replaced it with a **structural identifier convention + a federated query**. A naming structure beat a system — and the system it replaced (a commit-watching daemon inverting seams and minting principals by fiat) would have been fragile. **Prefer the convention over the mechanism.**

### Why the field ORDER is load-bearing (slowest → fastest changing)
The identifier runs most-stable → most-volatile: `model` (≈never) → `body` (per agent instance/host) → `time` (per session, and per re-orientation/compaction) → `ticket` (per piece of work picked up). This is the canonical **big-endian / most-significant-first** hierarchical key (URLs, timestamps, reverse-DNS, composite DB indexes). It buys two things:
- **Every prefix is a stable, nested grouping** — truncate anywhere and you get a meaningful bucket (all-this-model ⊃ this-body ⊃ this-session ⊃ this-engagement). This is *why* the prefix-query grouping is semantically sound; reorder the fields (e.g. ticket before time) and truncation stops meaning anything.
- **Longest-common-prefix = relationship altitude, for free.** Where two ids stop sharing tells you how two actors relate, no logic: share through *ticket* = same engagement; through *time*, differ on ticket = same session, different work; through *body*, differ on time = same agent, returned/restarted; share only *model* = different agent. The collision/relationship readout *is* the shared-prefix length.

**Invariant to preserve by design:** each field must change strictly more often than the one before. `body` is genuinely rarer than `time` *because* a re-orientation/compaction bumps `time` while `body` survives it — the compaction-stamp idea doing structural work, not a coincidence.
