# Fleet coordination plane — the "tag-out" board (shaping / bet)

**Date:** 2026-06-15 · **Status:** SHAPING (bet, owner not yet ruled — do NOT treat as
adopted) · **Class:** product shaping / new-capability bet · **Driver:** owner, live
session 2026-06-15 (the dogfood → seam-health → "what is weft's final form" thread).

> Capture artifact, not a decision. Promote the chosen cut to PDR-0024 on owner go.
> All code held until the shape is steered.

## Frame: the federation's customer is a FLEET, not one agent

PDR-0023 located weft's value in the glue (the SEI spine + honest seams). The natural
next question — *who is the glue for?* — answers: **a fleet of agents working the same
repos concurrently**, not a single agent with a toolbox. A fleet needs two planes:

- **Sense-making plane** — read the honest, joined flood and synthesise wisdom
  ("what to fix first, what a change breaks, where drift accelerates"). This is the
  **L2 synthesis application** — noted here as the sibling bet, shaped separately.
- **Coordination plane** — agents don't silently collide; presence, advisory
  reservation, escalation. **This doc shapes the coordination plane.** It is the most
  on-charter of the two: weft is *deconfliction-first by design*, and "two agents don't
  edit the same tree blind" is deconfliction in its purest form.

Both planes rest on the **same precondition we hardened on 2026-06-15**: the honesty
invariant. A coordination board whose stale tag reads as live, or a synthesis engine fed
a lying flood, fails the same way — confident-wrong, at higher leverage.

## The bet (falsifiable)

> A fleet of agents will **honor** an honest, low-friction **advisory tag-out board**,
> reducing silent collisions on shared trees below the current status quo (heavyweight
> per-agent worktree isolation, or hand-partitioning repos) — **measured on our own
> multi-agent workflow runs.**

**Falsifiers (any one kills or reshapes the bet):**
1. Agents **defect under task pressure** — ignore tags when honoring is inconvenient.
   Advisory locks only work if honoring is cheap and trust is high.
2. The board **cries wolf** — too many low-relevance alerts and agents learn to skim
   past it (the "everyone ignores the amber" failure).
3. **Contention is too low to matter** — on solo or low-overlap work the board is pure
   overhead. (Value scales with fleet concurrency on a shared tree — same "value at
   scale" caveat the cold-eval put on loomweave.)

## The model: lockout-tagout (LOTO)

The doctrine is industrial **lockout-tagout**: before servicing, you hang a tag/lock on
the breaker; **only the holder (or a supervisor) may remove it.** Importing LOTO gives
settled answers for free — who can clear a tag (holder or operator, never a bystander),
group locks (a whole workflow's agents under one tag), shift-handover.

A tag carries **two orthogonal axes:**

### Axis 1 — lifecycle / expiry (when the tag ends)
| Mode | Meaning | Owner / substrate |
|------|---------|-------------------|
| `hold-until-clear` | manual release by holder/operator | board |
| `expire-at <ts>` | TTL | **already** filigree's `claim_expires_at` lease, at path granularity |
| `expire-on-merge <branch>` | event-triggered — dies when the work lands | **legis** (already sits at the git/CI merge boundary) — the differentiator |
| `holder-dead → reap` | *(implicit 4th)* heartbeat lapses → tag reaped | filigree heartbeat/reap |

The 4th is **not optional**: without it, `hold-until-clear` is the stale-lease lie — a
dead agent's tag never clears and the folder deadlocks on a ghost. LOTO's own answer: a
supervisor cuts a tag whose owner left the building.

`expire-on-merge` is the **weft-native killer feature**: a generic lock tool can do
manual + TTL; only one wired into the merge boundary can say *"this reservation dies
automatically when the work it was protecting merges,"* closing the loop with zero
manual cleanup. (Same merge-event substrate as the already-filed `weft-ff30fd979f`
close-the-loop ticket.) **Recursive dependency worth naming:** `expire-on-merge` is only
as honest as the seam that *observes* the merge — if legis misses the event, the tag
never expires. The coordination plane's fanciest mode rests on the seam-honesty work of
2026-06-15.

### Axis 2 — enforcement posture (what happens on conflict)
`advisory` (warn, proceed) · `soft-block` (surface to operator, wait for decision) ·
`hard-block` (refuse the edit). Separate from expiry — `hold-until-clear` implies a
stronger posture than a TTL tag, but the axes are independent. Escalation = legis's
graded-enforcement tier (self-clear / judge inline / escalate-to-human).

## v1 — ships without legis, dogfoodable Monday

- **Board = tool-agnostic filesystem sentinel** under the existing `.weft/` convention:
  an append-only `events.jsonl` (clock-in / tag / release / clock-out — legis-ledger
  idiom) + a current `tags` projection. Any hook in any runtime reads it with a `cat`.
- **Identity** keyed to the existing agent-identity convention (filigree `--actor` /
  legis launch-bound `--agent-id`) + session id.
- **The gate:** `PreToolUse(Edit|Write)` hook checks project-wide tags for the target
  path; on conflict, escalate to operator (the proven pattern — weft already ships
  `PreToolUse` hooks: the git-stash block, the wardline gate).
- **The feed ("check weft output on every command"):** `PostToolUse` hook (matcher `*`)
  surfaces the board **delta past this agent's watermark** as additionalContext —
  *"agent-7 clocked in and tagged out `docs/` (expire-on-merge → main)."* This is the
  existing **SessionStart** snapshot (the filigree Project Snapshot every session opens
  with) generalized from once-per-session to a per-command delta.
  - **Delta + per-agent watermark, never a full reprint** (bounded-by-default / C-12 —
    a redump every command is the 72k-overflow wart reborn).
  - **Honest silence vs board-unreachable** must be distinguishable (the invariant: a
    quiet feed that's actually broken tells the agent the coast is clear when it's blind).
  - **Relevance-weighted:** a tag intersecting your working tree interrupts loudly;
    distant clock-ins batch terse.
- **Lifecycles in v1:** `hold-until-clear`, `expire-at`, `holder-dead → reap`.
- **Cross-runtime:** weft ships the hook adapters for **Anthropic (Claude Code)** and
  **Codex (OpenAI)** — we own the integration; third parties don't "conform." Board data
  stays tool-agnostic; adapters are thin.

## v2 — the differentiator

`expire-on-merge <branch>` wired through legis's merge observation. Optional: SEI-bound
tags (rename-surviving reservations on code entities, not just paths).

## Honesty-invariant inheritance

Every board surface obeys the 2026-06-15 invariant: a tag's disappearance carries a
machine-readable reason (`cleared` / `expired-time` / `expired-merge` / `reaped-dead` /
`board-unreachable`), and the feed distinguishes clean-silence from degraded. This is the
**same shared reason-vocabulary** gap (G1) the seam strikes surfaced — the board is
another consumer of, and reason to build, a canonical `weft-reason` vocab.

## Composes existing substrate (the tell that it's on-charter)

- filigree: claim + lease + heartbeat + `work_stale_list` + reap (the TTL/reaping engine,
  already built at issue granularity).
- legis: git/CI boundary, branch/PR/merge observation, graded escalation, the
  close-the-loop merge-event work (`weft-ff30fd979f`).
- existing hooks: `SessionStart` (the feed's proof-of-concept), `PreToolUse` (the gate's
  proven pattern).

## Dogfood plan (how the falsifier gets tested)

Enable the v1 sentinel + gate + feed; run a multi-agent workflow on a **single** repo
(today those collisions are avoided with heavyweight worktree isolation — the board is
the lighter, visible replacement). Measure: collision rate, tag honor-rate, false-alert
rate, vs the worktree-isolation baseline. If agents defect or the signal is noise, the
bet is falsified.

## Open design forks (decide before/within v1)

- **Hosting: RESOLVED → filigree for now** *(owner ruling, 2026-06-15)* — host the board
  **inside filigree** to reuse its proven claim/lease/heartbeat/reap engine (generalized
  from *issue* to *path* granularity). Accepted cost: the functionality will have to be
  **extracted into protoweft later** when the fleet-OS console materializes.
  - **HARD CONSTRAINT — additive-only, no second shock.** Filigree has real-world users
    and `3.0.0` (schema v26 wire-break) is the "hard shock" they are already braced for.
    The owner will NOT shock them twice. Therefore the board must be a **purely additive**
    filigree surface (new tables + new MCP tools + hooks; **zero** change to existing v26
    contracts). Additive ≠ shock, so an additive board can ship post-3.0.0 with no second
    break. If — and only if — some part genuinely cannot be additive, it must fold INTO
    the held 3.0.0 cutover (the single shock), never into a 3.1.x break. This is the one
    place the relaxed prototype discipline (below) does NOT apply.
- **Tag granularity / nesting** — exact-path vs prefix-match; I tag `/src`, you want
  `/src/foo`. Standard hierarchical-lock problem; v1 keep simple (prefix-match,
  first-writer-wins, escalate on overlap).
- **Feed relevance model** — all-tags-terse vs working-set-intersection (requires the
  agent to declare/infer its working set).
- **Group tags** — one tag covering a workflow's fleet of subagents.

## Discipline posture (owner recalibration, 2026-06-15)

The program's self-image shifted from *"98%-finished suite, polishing the surface"* to a
**"rapidly-evolving prototype for the L2 layer on a solid core."** This **relaxes
discipline for the PROTOTYPE layers** (the coordination board, the L2 strategic-view MCP):
build fast, iterate, don't gold-plate for permanence or treat every new surface as a
frozen contract.

It does **NOT** relax for the **solid core** — the five members — and **especially not for
filigree**, which has real-world users and a pending `3.0.0` hard shock (don't shock them
twice → additive-only; see the hosting constraint above). `3.0.0` **holds until ready**;
the other four members **ship when they need to**. Core honesty/correctness fixes (the
five gaps) keep full rigor; **G4 (cascade-close) keeps the highest**. The relaxation is
*"stop polishing a finished thing"* permission, not *"skip tests on the core."*

## Status / next

SHAPING. Owner has not ruled. On go: promote the chosen cut to **PDR-0024** (record the
bet + falsifier + reversal trigger), then build v1. The **L2 synthesis layer** is the
shaped sibling on the sense-making plane — same fleet-OS frame, separate bet; its
concrete first surface is a weft **"strategic view" MCP interface** — the "so what" /
wisdom query that reads the honest, joined flood and answers "given all this, what
matters and what do I do." (Owner priority #3.)
