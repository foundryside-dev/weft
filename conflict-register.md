# Weft — federation conflict & ambiguity register

**Status:** **Authoritative** and **first-class.** This is the deliverable the cutover exists to produce: every conflict and ambiguity found between the federation's sources of truth, classified and either *fixed* or *ruled with a named owner*. Flush these before major point releases.

**Date of sweep:** 2026-06-05. Sources compared: this hub (pre-cutover), `~/clarion`, `~/filigree`, `~/wardline`, `~/legis`, `~/charter`, `~/lacuna`.

**Two classes:**
- **Class A — hub stale, repo fresh.** The hub restated a project-internal fact that moved. *Resolution: fixed by this cutover* (and prevented from recurring — weft no longer restates volatile facts; it points). No ruling needed.
- **Class B — two live sources disagree.** A genuine contradiction between current repos that needs a decision. *Resolution: a ruling + a named owner.*

---

## Class A — stale-hub drift (fixed by this cutover)

| # | Drift (old hub said → reality) | Authoritative source | Fix |
|---|---|---|---|
| A-1 | Old roster = 4 (filigree/clarion/wardline/**shuttle**) → hub ruling admitted Legis + Charter to the Weft family and excluded Shuttle; current launch taxonomy is 4 live core + Charter planned integration | repos exist at `~/legis`, `~/charter`; current adapter status in [members/charter.md](./members/charter.md) | Roster ruled (§B-1); taxonomy refreshed 2026-06-12 |
| A-2 | `lacuna` (the demo specimen) absent → it is the federation's canonical demonstrator | `~/lacuna/README.md` | [members/lacuna.md](./members/lacuna.md) added |
| A-3 | filigree "v2.1 / 113 MCP tools" → **2.3.0 / 115 tools** | `~/filigree/pyproject.toml`, README | weft stops restating; [members/filigree.md](./members/filigree.md) snapshots + points |
| A-4 | clarion "v1.0 walking skeleton, v0.1 in flight / 7 MCP tools" → **v1.3.0 shipped / 39 tools** | `~/clarion/Cargo.toml`, README | weft stops restating; [members/loomweave.md](./members/loomweave.md) snapshots + points |
| A-5 | wardline "unreleased / 38 decorators / 11 rules PY-WL-001..009 / Tier 1–4" → **1.0.0rc1 / 3 canonical decorators / 20 rules PY-WL-101..120 / 8-state lattice** | `~/wardline/src/wardline/{_version,decorators,core/taints,scanner/rules}` | weft stops restating; [members/wardline.md](./members/wardline.md) snapshots + points |
| A-6 | "Wardline→Filigree integration is **load-bearing**" → it is **enrich-only** (work-tracking only; analysis needs no Filigree) | `~/wardline/docs/integration/2026-05-29-wardline-weft-integration-brief.md`; `core/filigree_emit.py` (fail-soft) | Corrected in doctrine §5 and [members/wardline.md](./members/wardline.md) |
| A-7 | Identity = `{plugin_id}:{kind}:{qualname}` taught as **identity** → that is the **locator (address)**; **SEI** is identity | Clarion ADR-038; [sei-standard.md](./sei-standard.md) | SEI standard promoted; glossary `locator`/`SEI` rows |
| A-8 | Entity-assoc routes under `/api/weft/*` → they are **classic `/api/issue/…` + `/api/entity-associations`** | `~/filigree/src/filigree/dashboard_routes/entities.py`; `~/legis/src/legis/filigree/client.py` | Corrected in [contracts-index.md](./contracts-index.md) §1 |
| A-9 | `shuttle://` described as the "nascent addressing scheme" → the `weft://` URI scheme it belonged to was **closed by SEI** | [sei-standard.md](./sei-standard.md) §0/§9 | [uri-scheme.md](./uri-scheme.md) |
| A-10 | Retired asterisk unknown to hub → the `wardline.core.registry.REGISTRY` import asterisk **retired 2026-06-05** | Clarion ADR-018 Rev 3; CHANGELOG | [asterisk-register.md](./asterisk-register.md) A-2 |
| A-11 | `wardline-watcher` could be mistaken for a member → it belonged to the defunct heavier `wardline.old` and is **out of the federation** | John (2026-06-05); `~/wardline-watcher/README.md` | Excluded everywhere; noted in doctrine/README |

> **Recurrence prevention.** A-3/A-4/A-5 were caused by the hub *copying* version/count facts. The cutover's structural fix is the authority model ([README.md](./README.md)): weft points to the owning project for all volatile surface facts and marks any snapshot it shows as non-authoritative. Audit gate: weft must contain no restated project-internal fact without a pointer.

---

## Class B — live contradictions (ruled, with owners)

### B-1 — Federation roster & ordinality  *(RULED)*

**Conflict.** Loomweave's founding doctrine (`~/clarion/docs/suite/weft.md`, dated 2026-06-05) lists only Loomweave/Filigree/Wardline + Shuttle (proposed) and names **neither legis nor charter**. But `~/legis/README.md` calls legis "the fourth Weft product," and `~/charter/README.md` calls charter "the fifth member" with "shuttle a future sixth." Three live sources, three different rosters.

**Ruling (hub, 2026-06-05, ratified by John).** The canonical roster admitted **Loomweave, Filigree, Wardline, Legis, and Charter** to the Weft family. Shuttle is a **roadmap thought-bubble, not a member** — it has no repo and is displaceable by any better idea (Charter, started 2026-06-04, is exactly such a better idea taking priority). Lacuna is the **demo specimen, not a member.** The hub ([doctrine.md](./doctrine.md)) is the body that declares the roster going forward.

**Taxonomy refresh (2026-06-12).** Admission is not the same as launch-core integration status. Current hub docs distinguish four live core tools (Loomweave, Filigree, Wardline, Legis) from Charter's realized local core/read-only MCP surface with Weft adapters still planned.

**Owner / follow-up.** weft (declared). Downstream: Loomweave's founding doctrine is reduced to a pointer to [doctrine.md](./doctrine.md) (Part B of the cutover), so the divergent three-member framing no longer sits in a repo as a competing authority.

**Corroboration.** [SHIPPING.md](./SHIPPING.md) (PM decision, 2026-06-05) independently rules the same roster (five products incl. legis + charter; shuttle future, not #4) and labels the three-disagreeing-canon-docs situation a **launch-blocking go-to-market defect** ("a suite whose canon can't name its members can't be marketed as a suite"). It also sets the docs topology this cutover implements: one hub owns the authoritative member list + compatibility matrix; the disagreeing canon docs collapse to one source. Launch is **gated by Wardline + Charter reaching 1.0**.

### B-2 — SEI lock  *(RESOLVED — LOCKED 2026-06-05)*

**Was.** The [SEI standard](./sei-standard.md) read "DRAFT — not yet locked," yet Loomweave/legis/wardline described SEI as shipped and in use. The *track* was canonical and substantially built (Loomweave authority + Legis/Wardline consumers pass the oracle); the open gate was Filigree's locator→SEI backfill + a coordinated cutover and lock declaration.

**Resolution (2026-06-05).** The owner — who controls every member's release cycle (§7.1) — **declared SEI locked.** The interface is frozen; **post-lock changes require a versioned revision** (§0.3). The supersession (§0.2) and the oracle-gated, no-grandfathering conformance regime (§0.1) now apply in full.

**Residual (not a reopening).** Locking freezes the *interface*; *conformance* is separate. Where Filigree's locator→SEI backfill is still outstanding it is a **migration/conformance task carried out under the locked standard**, oracle-gated — it does not unlock SEI. Owner: Filigree (backfill), Loomweave (authority, conformance verification). Treat any binding still on a `locator` as legacy to migrate.

### B-3 — `shuttle://` reference scheme  *(DEFERRED — prefix RESERVED)*

**Conflict.** Filigree's planning-deprecation uses `shuttle://…` milestone references and a `migrate-to-shuttle` path, but Shuttle has no repo and the broader `weft://` scheme it belonged to is closed by SEI ([uri-scheme.md](./uri-scheme.md)).

**Disposition (2026-06-05, ruled).** **Deferred; the `shuttle://` prefix is RESERVED but inert.** Nothing resolves a `shuttle://` URI today and nothing should be built on it. Reserving the prefix prevents reuse; it grants no behaviour. Whether a thin milestone-reference convenience is actually adopted is decided **if/when a change-execution authority is built** — which may not be "Shuttle" at all. Shuttle itself is flagged **speculative** everywhere ([members/shuttle.md](./members/shuttle.md)).

**Owner.** Filigree (owns the milestone surface + migrate-to-shuttle tooling) + whoever designs the eventual change-execution authority.

### B-4 — Home of the suite-wide SEI standard  *(RULED — resolved by this cutover)*

**Conflict.** The SEI conformance standard physically lived in `~/wardline/docs/superpowers/specs/` while declaring itself a suite-wide standard with Loomweave as authority — and it carried an instruction to "propagate the normative sections into clarion/filigree." A suite-wide standard living inside one consumer's specs tree is a latent drift source.

**Ruling.** Promoted into the hub as [sei-standard.md](./sei-standard.md) — the canonical home. The wardline-tree copy is reduced to a pointer (Part B). Owner: weft.

---

## 2026-06-06 ground-truth sweep (code-verified)

**Date of sweep:** 2026-06-06. **Method:** per-member executable-source extraction
(build manifests, file bytes, server code, error paths, live CLI/MCP runs) +
adversarial code re-verification — docs treated as hypotheses, because the member
repos' *own* docs had drifted too. 6 of 11 candidate calls survived verification; the
5 rejected are listed so they are not silently re-raised. Per-member doc-vs-code drift
is recorded under [conventions.md](./conventions.md) "Member-owned findings" (owned by
each repo, not fixed here).

### B-5 — Charter is not a 1.0 launch gate  *(RULED)*

**Conflict.** [compatibility.md](./compatibility.md) listed Charter as a "1.0 launch
gate" and attributed the gate to "Wardline + Charter"; [SHIPPING.md](./SHIPPING.md)
Decision 2 says Charter is **non-gating** and joins on its own cadence.
**Ruling.** SHIPPING.md wins — release posture / gate membership is SHIPPING's domain
(see §B-6). Charter is non-gating; the gate is Wardline (pre-1.0) + Legis (rc→1.0).
compatibility.md corrected. **Owner:** hub/PM.

### B-6 — Canon fragmentation: canon is split by domain  *(RULED)*

**Conflict.** [SHIPPING.md](./SHIPPING.md) flags "three docs claim canon and disagree."
README, federation-map, and compatibility each gesture at owning roster/posture/contract canon.
**Ruling.** Do **not** crown one doc for everything (that caused the fragmentation).
Canon is **split by domain**: roster/membership/composition-law → [doctrine.md](./doctrine.md)
(already ruled §B-1); release posture/gate → [SHIPPING.md](./SHIPPING.md); cross-product
contract index → [contracts-index.md](./contracts-index.md). README, federation-map, and
compatibility are **derived views that point to the domain owner**, not competing canon.
Volatile per-member facts live in each repo (the hub points). **Owner:** hub/PM.

### B-7 — Shuttle: "thought-bubble" vs "future 6th member"  *(RULED)*

**Conflict.** [doctrine.md](./doctrine.md) (roster canon, §B-1) says Shuttle is a
speculative thought-bubble — not a member, no repo, displaceable, may not even be called
Shuttle. [SHIPPING.md](./SHIPPING.md):58 called it the "future 6th member."
**Ruling.** Reconcile under doctrine.md (roster canon). SHIPPING.md reworded to doctrine's
"speculative thought-bubble, displaceable, not committed" framing — *not* "planned/reserved
member," which over-promotes. doctrine keeps canon. **Owner:** hub/PM.

### A-12 — Charter schema namespace `loom.charter.*` → `weft.charter.*`  *(DONE — landed 2026-06-07)*

**Was.** Charter's code + ADR-006 + its **entire MCP envelope** use the `loom.charter.*`
namespace (**54 sites**, e.g. `loom.charter.preflight_facts.v1`, `loom.charter.<entity>.vN`).
**Ruling (owner, 2026-06-06).** This is **un-propagated Loom→Weft rename lag, not intended
canon.** The canonical namespace is **`weft.charter.*`**. Because the Loom→Weft *federation*
rename is a brand/suite-prefix change and **no charter emitter is shipped to a consumer yet**,
it is renamed **now, pre-launch** — the only free window (a versioned schema namespace cannot
move cleanly once consumers bind to it).
**What changes.** Charter renames its code + ADR-006 + MCP envelope schema strings
`loom.charter.*` → `weft.charter.*` (tracked `weft-a46edbbf98`, now CLOSED). **LANDED on
charter `main` (commit `cbbcb2f`, 2026-06-07): 54 `weft.charter.*` / 0 `loom.charter.*` in
src, 164 tests green, SEI untouched.** Hub cites `weft.charter.*` as canonical, now matched
by charter code. (The `clarion_entity` trace-kind enum is DEFERRED — persisted DB value +
external producer = a federation-wide schema decision, not a charter-local edit.)
**Scope guard.** This is the *federation-prefix* rename only. It does **NOT** touch the
LOCKED `loomweave:eid:` SEI scheme (member identity, frozen — §B-2) nor the `clarion →
loomweave` member rename (a separate target — those go to *Loomweave*, not Weft).
**Owner.** charter (code/ADR), hub/PM (decision + tracking).

### Rejected calls (verified false against code — recorded so they are not re-raised)

- **A-1 asterisk reword (rejected):** a proposed reword of asterisk A-1's blocker to "awaiting Filigree's `/api/weft/findings/promote` route" is false — that route **is shipped** on Filigree `release/3.0.0` (`files.py:852`), and Wardline's native emitter has shipped. So **both clauses of A-1's retirement condition may now be met**, but retirement needs a *live* (Wardline+Filigree, Loomweave-absent) composition run — see the dated note on [asterisk-register.md](./asterisk-register.md) A-1. Do not retire on code-reading alone.
- **C-1 reference reassignment (rejected):** rested on a misquoted filigree commit; filigree *co-authored* the standard (not a "mirror"). loomweave is the C-1 reference (ADR-005 origin); filigree C-1 is pending (unshipped). Recorded in [conventions.md](./conventions.md).
- **C-2 "loomweave conforms" (rejected → corrected):** loomweave's WAL checkpoint is on an rc branch, not shipped — `reference †` (not-shipped), not `conforms`.
- **wardline C-6 rationale (rejected → corrected):** `file_finding` vs `scan_file_findings` are two distinct deliberate tools, not naming drift; rationale corrected in conventions.md.
- **bulk "fill all unverified cells" (rejected → applied cell-by-cell, NOT bulk-verified):** the verifier rejected promoting cells to `conforms` on grep / `check-ignore` rather than shipped firsthand behaviour. Cells were applied individually at each extractor's stated `source_tier` — **only the cells that drove a survived call were adversarially re-derived; the rest are single-extractor `code`-tier**, flagged in conventions.md's "Verification calibration" note. The matrix is re-checkable against `file:line`, not independently re-verified per cell.

---

## 2026-06-07 decisions

### A-13 — Federation loopback token renamed to `WEFT_FEDERATION_TOKEN`  *(DECIDED — implementing)*

**Was.** The federation loopback bearer (guarding the `weft` HTTP generation) had
**multiple member-scoped names**: `FILIGREE_API_TOKEN` (filigree client),
`FILIGREE_FEDERATION_API_TOKEN` (filigree daemon — the name exported in `~/.bashrc`),
and `WARDLINE_FILIGREE_TOKEN` (wardline's own name for the same *value*). lacuna's
`.mcp.json` referenced `${FILIGREE_API_TOKEN}` (unset) → silent 401, system broken.
This is the glossary §8 "same thing, two names" drift made operational.
**Ruling (owner, 2026-06-07).** Canonical name is **`WEFT_FEDERATION_TOKEN`** — it is
*federation*-scope plumbing (guards the `weft` generation), so it takes the Weft prefix,
not a member name. Supersedes both `FILIGREE_*` names (kept as **deprecated fallback
aliases** through the transition so the existing `~/.bashrc` export keeps working) and
supersedes filigree issue `filigree-3ee7250b54`'s `FILIGREE_API_TOKEN` convention. This
is **deconfliction plumbing, not a security key** — the operator/authority-key custody
question is the separate C-8 / key-custody-sidecar track.
**What changes.** filigree (anchor: daemon + client + `.mcp.json` template + `doctor`
check, fallback chain `WEFT_FEDERATION_TOKEN` → `FILIGREE_FEDERATION_API_TOKEN` →
`FILIGREE_API_TOKEN`, on `release/3.0.0`); loomweave (`token_env`, the C-3 reference);
wardline (adopt the federation name with `WARDLINE_FILIGREE_TOKEN` fallback, **or**
document the value-mapping in the glossary — wardline's call); operator
(`export WEFT_FEDERATION_TOKEN="$FILIGREE_FEDERATION_API_TOKEN"`). legis + charter: no
token-named references today (re-check when charter wires adapters). Hub docs updated:
`conventions.md` C-3, `glossary.md` (managed clash), `federation-sdk.md`.
**Owner.** filigree (daemon/anchor) + each member (own client) + hub/PM (decision + register).

### A-14 — Federation config/store consolidation into `.weft/` + `weft.toml`  *(DECIDED — rolling out)*

**Was.** Each member scattered its own runtime dir and config differently —
filigree `.filigree/` + `.filigree.conf`, loomweave `.loomweave/`, wardline
`.wardline/`, legis **cwd-relative** sqlite URLs (`legis-checks.db` etc.) dropped
wherever the process ran. "Federated" had become "sloppy": no shared layout, stores
littering the working tree, no single place an operator declares federation config.
**Ruling (PM, 2026-06-07).** Two surfaces, two owners — codified as **conventions
[C-9](./conventions.md#c-9-federation-configstore-layout-weftmember-runtime-state-operator-owned-wefttoml)**:
- **`.weft/<member>/`** holds machine-written runtime state; each member is the **sole
  writer** of its own subtree, never touches a sibling's.
- **`weft.toml`** (project root) is **operator-authored, members read-only** — *no
  member installer writes it* (C-4's multi-writer truncation lesson, gate
  `weft-eb3dee402f`, applied pre-emptively to a second shared file).
- **Enrich-only; malformed = absent (normative).** A member runs with no `weft.toml`
  and **must not hard-fail** on a malformed one — silent fallback to defaults. (Raised
  by legis as a federation-parity risk: if one member hard-fails on a bad shared file
  and another degrades, the federation is inconsistent on the *same* file. Resolved:
  all members degrade silently; hard-fail would make `weft.toml` load-bearing,
  violating doctrine §5.)
- **Member-private keys ship now; shared keys are hub-pinned and PENDING.** `[<member>]`
  private overrides (canonical store knob `store_dir`) are member-owned. Cross-member
  keys (sibling endpoints, cross-read flags) live **once** at a well-known top-level
  path and **no member bakes them until the hub pins the layout** — **loomweave drafts
  that proposal**.
- **Backcompat = filigree only** (retains `.filigree.conf` reads, migrates forward,
  reuses the `from_conf` relocation path from the fg-da8d50 split-brain fix); the other
  realized members **clean-break**.
- **Authority keys do not move** into `.weft/` — capability confinement (proposed C-8),
  not store tidiness, governs Legis operator/signing keys.
**Sequencing.** **Fast-follow, not a dogfood-#2 gate blocker** — store relocation ships
per member independently; the C-4 gate stays scoped to the managed-block fix.
Clean-break orphans lacuna's `.loomweave/`/`.wardline/` dirs → re-init owned by the
retrofit propagation issues (`weft-46f866cb85`, `weft-71ce4f8253`).
**State.** legis **landed** the member-private form (all four stores under `.weft/legis/`,
`[legis].store_dir`, malformed-tolerant, keys untouched, 676 green) and is the C-9
**reference** for that form. filigree / loomweave / wardline **pending**. Shared-key
layout **pending** loomweave's proposal.
**Owner.** each member (own relocation) + loomweave (shared-schema proposal) + hub/PM
(C-9 + this ruling).

### A-15 — Federation token written literally into host-local agent-transport config  *(DECIDED — implementing)*

**Was.** C-3 mandated `${ENV}` indirection and "never a literal" for plumbing tokens.
But the agent runtime (Claude Code) can only populate a `.mcp.json` **streamable-http**
`Authorization` header by `${ENV}` expansion or a literal — it cannot read filigree's
auto-minted `.weft/filigree/federation_token` file. So the indirection left exactly one
surface where an *unset* `${WEFT_FEDERATION_TOKEN}` silently 401s → the agent loses its
tracker → coordinates blind. That is **the lacuna failure**, and it is the precise
deconfliction failure the suite exists to prevent — caused *by* the secret-protecting
indirection on a token that is **not a secret**.
**Ruling (PM, 2026-06-07).** For the **auto-provisioned loopback federation token**,
`install` / `doctor --fix` MAY write the **resolved literal** into host-local
streamable-http `.mcp.json` headers by default. Rationale: it is **deconfliction
plumbing, not a security key** (per filigree's own README + `federation_token.py`
docstring: "loopback deconfliction plumbing, **not** an authority key (C-8)"); these
are agentic-first tools meant to *just work* for the agent without an export dance.
**Condition (what makes it safe).** `doctor` must detect **host-drift** — a header
literal ≠ the locally-resolvable token (stale clone / foreign host) → flag, and
`--fix` re-localizes. This converts "a git-tracked literal silently 401s on another
host" into a detected, one-command-fixable drift (C-7's honest-failure principle
applied to the literal). **stdio** entries carry no token and are untouched.
**Scope guard.** This does **not** loosen `${ENV}`/`token_env` for operator secrets,
cross-environment configs, or **authority keys** — Legis operator/signing keys stay
operator-held and out of agent reach (capability confinement, proposed C-8). It is a
narrow carve-out for one non-secret token on one transport surface.
**Reference.** **filigree** — `federation_token.py` 3-tier resolution (`$WEFT_FEDERATION_TOKEN`
override → auto-minted `0600 .weft/filigree/federation_token` → off) + the
`install`/`doctor --fix` literal swap. Amends [conventions.md](./conventions.md) C-3;
refines the §A-13 token rename.
**Owner.** filigree (install/doctor/`federation_token.py`) + each member writing an
`.mcp.json` streamable-http entry + hub/PM (C-3 amendment + this ruling).

---

## 2026-06-14 decisions

### B-8 — Warpline admitted as the 5th member  *(RULED — PDR-0022, 2026-06-14)*

**Conflict.** Warpline (temporal / change-impact authority — "what changed, when, and
what does this change touch") was carried as a PM-selected go/no-go spike on the
[roadmap-ideas.md](./roadmap-ideas.md) bench, and PDR-0017 had earlier ruled it
**not ready** for admission. Its shipped behaviour subsequently met the doctrine §7
quality bar (standalone parity with peers AND federation-enhanced).
**Ruling (owner, 2026-06-14, PDR-0022).** Warpline is **admitted as the fifth member**
of the Weft federation (Loomweave, Filigree, Wardline, Legis, Warpline) — **reversing
PDR-0017's "not ready" ruling**. Its implementation is an admitted **fast-follow,
outside the four-member lockstep launch cutover** (Filigree, Loomweave, Wardline,
Legis). Charter remains a **planned integration**, not a full member; Shuttle stays a
roadmap thought-bubble (§B-7); Lacuna stays the demo specimen. **Owner:** hub/PM;
roster canon recorded in [doctrine.md](./doctrine.md).

### A-16 — heddle → warpline federation-wide rename  *(DONE — landed 2026-06-14)*

**Was.** The member shipped under the name **heddle** (repo `~/heddle`,
`src/heddle/`). A PyPI name collision forced a rename.
**Ruling (owner, 2026-06-14, PDR-0022).** Renamed **federation-wide to `warpline`** —
live repo at `~/warpline` (`src/warpline/`), version 1.0.0; the old `~/heddle`
directory is now a husk. All hub `~/heddle` / `src/heddle/` path tokens are stale and
point to `~/warpline` / `src/warpline/`. State dir is `.weft/warpline/`; entities keyed
by `loomweave:eid` SEIs; consumed contract `warpline.reverify_worklist.v1`. **Scope
guard.** This is a member/brand rename only; the LOCKED `loomweave:eid:` SEI scheme is
untouched (§B-2), and historical PDR *filenames* (`0016-`, `0017-heddle-`,
`0021-heddle-`) keep their stable archival IDs. **Owner:** warpline (code/repo) + hub/PM
(decision + register).

---

## How to use this register

- Before a point release, walk Class B: every item must be **ruled** (done) or have an **owner actively closing it** (B-2 Filigree backfill, B-3 deferred-with-owner).
- New conflicts found later are appended here with the same classification. A Class-B item is never silently resolved — it gets a ruling and an owner, or it stays open and visible.
