# Seam-health map — the build spec for PDR-0023's central feature

**Date:** 2026-06-15 · **Source:** `seam-health-map` ultracode workflow (8 agents,
~688k tokens; full output in the run transcript) · **Frame:** PDR-0023 (the
federation is the product; the seams are the crown jewels) · **OS metaphor:** each
seam is a syscall an agent trusts without re-deriving.

## The thesis (cross-seam pattern)

**Every seam has lost its ability to say "I don't know."** When a join silently
misses — wrong key scheme, unresolved SEI, stale snapshot, dropped signature,
absent artifact key, ignored freshness field — the result is **not an error**, it's
a *confident, well-formed, low-cardinality* answer: `affected:[]`,
`findings_created:0`, `failed:[]`, `allowed:true`, `freshness_status:"unknown"`,
`artifact_status:"unverified"`. In every case the empty/partial/stale result is
**byte-indistinguishable from a legitimate true-negative.**

The OS framing is load-bearing: a syscall that returns a plausible wrong answer
instead of `-ENOENT` is **worse than one that crashes**, because every process
downstream commits the corruption as fact and propagates it. An agent that asks
warpline "what does my change break?" and gets a stale `affected:[]` ships the
change; an agent that asks loomweave "what issues touch this?" and gets a
join-missed empty set closes the loop believing it's clean; legis closes an issue
as "fixed" because a scheme-drifted fingerprint swept the real finding to unseen.
**The lie becomes the premise of the next decision.** The dead loomweave→filigree
seam (four stacked, separately-rejected contract violations, dead for weeks) was
**not an outlier — it was this pattern caught once.** The map finds the same shape
latent or live in all six seams.

## Seam health matrix

| Seam | Health | Sharpest finding |
|------|--------|------------------|
| ADR-029 entity association (issue↔SEI + drift) | **healthy** ✅ | the reference-done-right: explicit `result_kind` + diagnostics + in-band "why null". *But* governance fields (signature/sign-off) dropped consumer-side → a governed-stale binding reads as a plain drifted row (P1). |
| wardline→filigree emit (the working one) | silent-failure-risk | **fingerprint scheme drift is invisible end-to-end** — `fingerprint_scheme` sent but never read; a wlfp2→wlfp3 bump would join-miss everything and cascade-close issues as "fixed" (P1). `failed:[]` hardwired → partial ingest reads as success (P1). |
| loomweave→filigree emit (the cautionary tale) | silent-failure-risk | **unscoped classic-write misroute is silent** — blank `?project=` routes findings to the default project (P0). No fingerprint → identity degrades to line-positional (P1). Best-effort emit swallows total failure as exit-0 (P1). |
| SEI identity spine (mint/resolve/rename) | silent-failure-risk | **the rename feed fails only into a `tracing::warn`** — a producer key-rename drops every hint → renamed entities re-mint fresh SEIs, severing governance (P1). No conformance vector (code flags it deferred). |
| legis closure gate | silent-failure-risk | **the gate's own interrogation surface lies** — `filigree_closure_gate_get` returns `allowed:true` for drifted content (joins issue_id only, never content_hash) (P1). Dropped-signature → silent ungated close (P1). |
| wardline→legis attest | silent-failure-risk | **key-absent fail-open is not interrogable** — no `LEGIS_WARDLINE_ARTIFACT_KEY` → every scan governs as "unverified" with no doctor amber (P1). No `key_id` on wire → mismatch ≡ tamper. No replay guard. *(Consumer wire-validation is otherwise the anti-pattern done RIGHT.)* |
| **Warpline change-impact** | **silent-failure-risk (worst)** | **the quiet segfault — fails OPEN and quiet, PDR-0023's worst posture.** Stale-but-FULL snapshot → confident `affected:[]`/non-empty with zero warning (P1). Unresolved SEI silently dropped (P1). `enrichment.edges:"stale"` is **dead vocab** no code emits (P1). **`capture` advertises `if_stale_after`/`max_entities`/`changed_refs` but consumes none — DEAD INPUT (P0).** |

**Two exemplars prove the invariant is buildable:** the ADR-029 drift axis and the
wardline→legis *consumer* (rejects absent-findings-key / unknown-kind / unknown-
severity **loudly** rather than reading them as zero). They are the reference the
others must reach.

## The design — a SEAM-HEALTH PROBE (three layers that roll up)

**Core principle: never trust a self-reported status field — it's exactly the thing
that lies.** Reading `freshness_status` / `artifact_status` lets a dead field rot
while reporting health. Instead, **round-trip a sentinel through the real
producer→consumer path** and assert retrievability under the agreed contract — the
one thing a lying field cannot fake.

- **Layer 1 — per-member self-check** (`<member> doctor --seams` / MCP
  `*_seam_self_check`): each member asserts what only it can see — wardline checks
  the artifact-key presence *and echoes the non-secret `key_id`*; legis doctor adds
  an artifact-key-posture amber; warpline asserts `latest_snapshot.commit_sha ==
  HEAD`, emits a *live* `edges:"stale"`, and asserts every advertised inputSchema
  field is actually consumed (closes the DEAD-INPUT P0).
- **Layer 2 — the round-trip JOIN PROBE** (`POST /seam-health/probe` on each
  *consumer*): the producer mints a reserved-prefix sentinel through its *real* wire
  path; the consumer's *own read surface* is queried for it. Asserts **(a)
  retrievability under the agreed identity scheme** (catches scheme drift — a wlfp3
  sentinel won't read back against a wlfp2 store, the one thing no current surface
  detects); **(b) live key-set conformance** (diffs producer-emitted keys vs
  consumer-accepted keys — would have caught all four loomweave→filigree
  violations + the rename-feed drift); **(c) freshness** vs the live anchor (HEAD /
  content_hash). Writes nothing durable; never gates.
- **Layer 3 — federation roll-up** (a legis MCP/CLI tool, since legis holds the
  identity + audit spine): one matrix per seam — `{posture, conformance, identity,
  freshness, last_carried_value_at, reason}`. **The `reason` string is mandatory and
  is the honesty surface** — an empty/degraded verdict MUST distinguish *clean vs
  disabled vs unreachable vs dead vs misrouted vs scheme-drifted.* This is the
  single agent-facing call: *"is the federation carrying value, and where is it
  lying?"*

## Roadmap (the prioritized strikes)

1. **P0 — Warpline: make the quiet segfault loud, BEFORE any probe.** (a) staleness
   downgrades completeness + wire the dead `edges:"stale"` vocab; (b) unresolved
   refs return a miss-set (`resolved:[]`/`unresolved:[]`) so an agent can ask "did
   my SEI resolve?"; (c) honor-or-reject the DEAD INPUT + a startup assertion that
   schema-advertised == handler-consumed. *Why first: a probe over a member that
   can't say "I don't know" just launders the lie. Owner's call — a confident-empty
   member is the most corrosive thing to the moat.*
2. **P0 — the honesty-invariant guardrail.** A shared federation contract test:
   every empty/partial/stale result carries a machine-readable reason. Kill the
   three structurally-confident-empty surfaces — wardline's hardwired `failed:[]`
   (real per-finding failure tracking); loomweave's best-effort emit (a
   non-fatal-but-visible degraded signal an agent can gate on, not exit-0); legis
   key-absent posture (doctor amber, not silent unsigned governance). *Why second:
   it's the protected invariant itself; build every later layer on members that can
   already tell the truth about their own emptiness.*
3. **P1 — per-seam conformance (Layer 1+2).** Sentinel round-trip + live key-set
   diff, starting with the seams that have NO shared conformance artifact and fail
   only into a warn log: the **SEI rename feed** and **loomweave→filigree**. Add the
   **scheme-echo handshake** + the legis artifact-key/`key_id` posture checks.
4. **P2 — federation roll-up (Layer 3) + a standing scheduled probe** recording
   `last_carried_value_at`. *Converts "dead for weeks, nobody noticed" into "dead
   for minutes, alarmed."*
5. **P3 — identity-key hygiene** on the multi-key seams (the SEI↔issue_id↔
   content_hash triple-join; filigree's structurally-always-"unknown" forward
   freshness read; the issue_id-only closure-gate join with no project namespace).

## Concurrency verdict (PDR-0023's contingency)

**The write/claim/identity story holds as-seen** — and the strong cases are
genuinely strong: filigree's CONTRACT-E private-per-call connections + unique
`(scan_source,fingerprint)` / `(issue_id,entity_id)` indexes (race-free,
convergent claims; re-ingest can't close a just-regressed issue); loomweave's
single writer-actor (ADR-011 — no double-mint/carry, orphan-before-carry ordering);
legis's append-only HMAC ledger + governance-sticky UPSERT; wardline→legis is
stateless verification. **Race-free claims ✅, identity-consistent-under-concurrent-
writes ✅, governance-escalates-not-bottlenecks ✅** (down legis bounded to one
timeout/batch; dirty tree → typed 409, not a false green).

**Two untested limbs** the contingency should treat as open: (1) **warpline's
`capture_snapshot` is non-transactional** (create → clear edges → append-per-commit)
— a concurrent read mid-rebuild sees a FULL snapshot with a transiently empty edge
set and returns a hollow `affected:[]` with no warning (compounds the stale P1, no
golden vector); (2) **cross-project isolation rests entirely on the
one-DB-file-per-project convention** — the legis closure gate joins `issue_id` with
**no project namespace**, so a shared ledger across two projects is an untested
correctness hole, not a proven-safe path.
