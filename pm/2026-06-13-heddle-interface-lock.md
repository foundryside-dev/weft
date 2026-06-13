# Heddle Federation Seams — FROZEN Interface-Lock Specification

Status: **FROZEN at clean-break launch cutover** — LOCKED 2026-06-13 (owner nod).
The five open decisions are RESOLVED (§8). The §7 freeze-preconditions are codex's
heddle overnight punch-list.
Date: 2026-06-13
Author: PM (weft hub session)
Tracker: weft-54192f9400 (heddle seam contracts — design + golden-vector + freeze)
Heddle HEAD grounded against: `06f2597` in `/home/john/heddle`

---

## 0. Scope, doctrine, and what "frozen" means here

This document locks the **seam contracts** between heddle (the federation's 5th
member, the temporal / change-impact authority — "if I touch X, what breaks?")
and the four current members. heddle was admitted 2026-06-13 and pulled into the
launch envelope. Its consumer *implementations* are fast-follow; its seam
*contracts* freeze at the clean-break cutover and are expensive to edit
afterward (per [pre-launch clean break] doctrine — the coordinated launch IS the
clean break).

**What freezes (this document):** tool name, input schema, output schema, the
SEI/entity_ref keying, the success envelope, the error vocabulary + retryability,
the enrich-only degrade contract, and one golden vector per seam (producer +
consumer + vector). Once frozen, a member can implement against these shapes at
any time post-launch without a contract renegotiation.

**What does NOT freeze (fast-follow):** the consumer-side *implementations*
inside loomweave/filigree/wardline/legis, heddle's internal storage schema
(`heddle_schema_version`, surfaced on every response — `commands.py:56`), and any
pairwise enrichment that requires a sibling adapter that does not yet exist.

### Doctrine enforced in every seam below

1. **Clean-break freeze.** Name + schema + error vocab pinned and versioned
   (`heddle.<contract>.v1`). No post-launch edits expected. A v2 is a NEW
   contract URI, never a mutation of v1 — siblings pin to a version.
2. **ENRICH-ONLY.** No seam makes a member's *core* flow depend on heddle.
   Every heddle-outbound consumption is an enhancement a member can omit.
   Every heddle-inbound read degrades to a coherent partial answer.
3. **NO-DEAD-BY-DESIGN.** We do not freeze an advertised-but-inert surface. The
   churn-count read (§1) is specified now precisely so loomweave can light up
   `entity_high_churn_list` later *without a contract edit* — but it is marked
   FAST-FOLLOW on the consumer side and is not advertised by loomweave until the
   adapter ships.
4. **DECONFLICTION-FIRST.** heddle is deconfliction tooling, not security
   ([deconfliction-not-security]). Any "security"-shaped property is re-derived
   as availability/functional. Advisory facts NEVER gate: wardline/legis bindings
   are enrichment, never an allow/clean/govern verdict.
5. **Expert-panel HARD RULE — loomweave retains no cross-run history.** The
   loomweave↔heddle seam is therefore strictly: **loomweave READS heddle's
   churn-count / timeline keyed by SEI and retains NOTHING.** loomweave never
   stores a heddle fact; it joins at read time and discards. This is the
   load-bearing constraint behind §1.
6. **PROVEN-NEED GATE (owner 2026-06-13).** The hub supports what a member needs,
   but the member must PROVE the need — "we'll do it one day" does not earn a
   frozen seam. A seam enters the frozen set only on demonstrated, present
   consumption (a golden vector shows it actually used). This drove OD-2 (drop
   `project_context` — no cross-member need) and OD-3 (charter name-only — a
   non-member cannot prove a need). Applied to INBOUND sibling-burden reads:
   loomweave inbound is **PROVEN** (heddle captures real edges through it) and
   frozen; the filigree / wardline / legis inbound reads are **RESERVED-SHAPE**
   (named, NON-binding on the sibling) until heddle demonstrates consumption in
   shipped behaviour. The overnight run is heddle's chance to prove them: a
   reserved-shape inbound seam freezes as a sibling obligation ONLY when a golden
   vector shows heddle actually reading it. We do not freeze a sibling obligation
   for a need heddle has merely claimed.

### The canonical success envelope (FROZEN)

Every heddle-outbound MCP tool returns `structuredContent` with this envelope.
Grounded in the Interface Endorsement Package
(`federation-value-add-and-mcp-first-audit.md:60-95`) and the live shell in
`mcp.py:11-22,191-198`. The live code today emits a thinner
`{schema, ok, data, warnings, meta}` shell with `meta.producer` only; the FROZEN
contract is the full envelope below. The delta (`query`, `next_actions`,
`enrichment`, `meta.local_only`, `meta.peer_side_effects`) is heddle-side
fast-follow implementation, but the **shape is frozen now**.

```json
{
  "schema": "heddle.<contract>.v1",
  "ok": true,
  "query": {
    "repo": "/abs/path",
    "tool": "heddle_change_list",
    "arguments": {},
    "filters": {},
    "sort": {"by": "changed_at", "order": "asc"},
    "page": {"limit": 50, "cursor": null}
  },
  "data": {},
  "warnings": [],
  "next_actions": {},
  "enrichment": {
    "sei": "present|absent|unavailable",
    "edges": "present|absent|stale|partial|skipped|unavailable",
    "work": "present|absent|unavailable",
    "risk": "present|absent|unavailable",
    "governance": "present|absent|unavailable",
    "requirements": "present|absent|unavailable"
  },
  "meta": {
    "producer": {"tool": "heddle", "version": "0.1.0"},
    "local_only": true,
    "peer_side_effects": []
  }
}
```

**Frozen envelope rules:**

- `data` is tool-specific and schema-bound (the `heddle.<contract>.v1` shape).
- `enrichment` values are a CLOSED vocabulary. `absent` = the peer was present
  but had no fact; `unavailable` = the peer could not be reached. The two are
  never conflated, and **neither is ever a transport error** (the enrich-only
  degrade contract). A missing peer NEVER produces an empty-but-ambiguous answer
  or an implied clean/allowed state.
- `meta.local_only: true` and `meta.peer_side_effects: []` are an invariant for
  every read tool; only `heddle_edge_snapshot_capture` may carry a non-empty
  `peer_side_effects` and it is still `[]` because capture mutates only
  `.weft/heddle/` (`store.py:96-99`, `mcp.py:143-147`).

### The canonical error envelope (FROZEN)

Grounded in `federation-value-add-and-mcp-first-audit.md:107-145` and the live
`heddle.error.v1` emitter (`mcp.py:221-241`). JSON-RPC codes stay for protocol
compatibility; the recoverable contract is `error.data`:

```json
{
  "code": -32602,
  "message": "invalid params",
  "data": {
    "schema": "heddle.error.v1",
    "error_code": "invalid_rev_range",
    "rejected_field": "rev_range",
    "retryability": "retry_with_changes",
    "hint": "Pass a git revision range resolvable from repo, e.g. HEAD~1..HEAD.",
    "details": {}
  }
}
```

**FROZEN `retryability` vocabulary** (closed set): `retry_safe` (transient,
retry same args), `retry_with_changes` (caller must change an argument),
`fatal` (no agent-side recovery; surface to user).

**FROZEN `error_code` vocabulary** (closed set; additions are a v2):
`missing_required_field`, `invalid_repo`, `invalid_rev_range`,
`invalid_entity_ref`, `invalid_changed_refs`, `invalid_depth`, `invalid_filter`,
`invalid_sort`, `peer_unavailable`, `snapshot_unavailable`, `internal_error`.

> Note — live drift to reconcile pre-freeze (heddle-side, not a contract change):
> `mcp.py:221` currently emits `error_code: "invalid_params"`, which is NOT in
> the frozen vocabulary. The frozen set above is authoritative; heddle must map
> its current generic `invalid_params` onto the specific codes
> (`invalid_rev_range`, `invalid_entity_ref`, etc.) before the freeze. This is
> implementation reconciliation, listed as a freeze precondition in §7.

### Entity references and SEI keying (FROZEN)

The cross-tool binding key is the **SEI** — `loomweave:eid:<32-hex>`
(`sei.rs:36-60`), an opaque, FROZEN-scheme surrogate minted and owned by
loomweave. heddle stores it opaquely (`entity_keys.sei`, `store.py:21-31`) and
NEVER mints, parses, or reasons about its internal structure
([rename-taxonomy]: the `loomweave:eid:` scheme stays FROZEN).

The frozen input ref shape (`federation-value-add-and-mcp-first-audit.md:153-169`):

```json
{ "entity_ref":  { "kind": "auto|locator|sei|path|qualname|heddle_entity_key_id", "value": "..." } }
{ "changed_refs": [ { "kind": "locator", "value": "..." }, { "kind": "sei", "value": "loomweave:eid:..." } ] }
```

**Frozen keying rules:**

- Every heddle-outbound entity in `data` carries BOTH `locator` and `sei`
  (`sei: null` when heddle has not resolved one). This is already the store's
  read shape (`store.py:265-293` joins `ek.locator, ek.sei`).
- `heddle_entity_key_id` is accepted for compatibility but is NOT a federation
  key — it is a heddle-internal integer (`store.py:21`). Siblings MUST key on
  `sei` (preferred) or `locator` (fallback), never on `heddle_entity_key_id`.
  This closes the id-leak the morning audit flagged
  (`federation-value-add-and-mcp-first-audit.md:786-792`).
- **SEI-keyed facts depend on HX1.** The contract here SPECIFIES that heddle's
  facts are keyed by *real loomweave SEIs*. heddle resolving real SEIs (via
  `entity_resolve`, `loomweave.py:111-125`) is implementation ticket **HX1**;
  until HX1 lands, heddle emits `sei: null` + `enrichment.sei: "absent"` and
  remains locator-keyed. The contract does not change when HX1 lands — only the
  populated value does.

---

## SEAM 1 — heddle ↔ loomweave

**Authority split:** loomweave owns current structure, the entity catalogue, and
SEI minting/resolution. heddle owns temporal change facts and dated edge
snapshots (`federation-value-add-and-mcp-first-audit.md:33-35`,
`contracts.md:7-9`). loomweave retains NO cross-run history — this is the seam's
governing constraint.

### 1A. heddle OUTBOUND — tools loomweave (and other members) consume

#### `heddle_change_list`  (shim: `changed`)  — `heddle.change_list.v1`

List temporal change facts for a repo + rev range. FROZEN input/output below
(`federation-value-add-and-mcp-first-audit.md:198-258`; live thin version
`commands.py:44-72`, `mcp.py:48-67`).

Input:
```json
{
  "repo": "/abs/path",
  "rev_range": "HEAD~1..HEAD",
  "base_ref": null, "head_ref": null,
  "filters": {"path_prefix": null, "entity_kind": null, "change_kind": null,
              "actor": null, "commit": null, "since": null, "until": null, "has_sei": null},
  "sort_by": "changed_at|path|actor|change_kind",
  "sort_order": "asc|desc",
  "limit": 50, "cursor": null,
  "include_next_actions": true
}
```
Output `data`:
```json
{
  "items": [
    {"change_id": "heddle:change:...",
     "entity": {"heddle_entity_key_id": 1, "locator": "python:function:src/pkg/mod.py::fn",
                "sei": null, "path": "src/pkg/mod.py"},
     "change_kind": "modified", "actor": "agent:codex",
     "commit": "aaaa...", "changed_at": "2026-06-13T00:00:00Z"}
  ],
  "changed_refs": [{"kind": "sei", "value": "loomweave:eid:..."}],
  "page": {"limit": 50, "next_cursor": null, "has_more": false}
}
```
- `change_kind`, `actor`, `changed_at`, `commit`, `path` map 1:1 to
  `change_events` columns (`store.py:41-53`). `changed_refs` prefers `sei`,
  falls back to `locator` (never `heddle_entity_key_id`).
- Required `next_actions`: `heddle_reverify_worklist_get`,
  `heddle_impact_radius_get`.

#### `heddle_entity_timeline_get`  (shim: `timeline`)  — `heddle.entity_timeline.v1`

Ordered change history for ONE entity ref
(`federation-value-add-and-mcp-first-audit.md:260-296`; live `commands.py:75-83`,
store join `store.py:279-293` already accepts locator OR sei).

Input:
```json
{
  "repo": "/abs/path",
  "entity_ref": {"kind": "auto", "value": "src/pkg/mod.py::fn"},
  "filters": {"change_kind": null, "actor": null, "commit": null, "since": null, "until": null},
  "sort_by": "changed_at|commit", "sort_order": "asc|desc",
  "limit": 50, "cursor": null
}
```
Output `data`:
```json
{
  "entity": {"locator": "...", "sei": null, "sei_resolution": "resolved|unresolved|unknown"},
  "items": [{"change_kind": "...", "actor": "...", "commit": "...", "changed_at": "...", "path": "..."}],
  "page": {"limit": 50, "next_cursor": null, "has_more": false}
}
```
- `sei_resolution` (resolved|unresolved|unknown) is a heddle-local honesty signal —
  does heddle hold a resolved SEI for this entity — NOT a loomweave lineage claim.
  loomweave owns lineage (`sei.rs:402-502`); heddle never restates it. (Renamed from
  `identity_status` per OD-4 to remove the lineage-authority ambiguity.)

#### `heddle_entity_churn_count_get`  (NEW — closes the critical gap)  — `heddle.entity_churn_count.v1`

**This read does not exist in heddle today and is the named gap the
codebase-explorer flagged.** loomweave's `tool_high_churn`
(`shortcuts.rs:639-698`) ranks entities by `git_churn_count`, a column the
loomweave analyze pipeline **never populates in v1.0** (`shortcuts.rs:688-692`
emits a missing-signal note). loomweave's `tool_recently_changed`
(`shortcuts.rs:708-729`) is an honest no-op for the same reason, and
`index_diff` reports `entity_diff.available: false`
(`index_diff.rs:749-752`) — all three are dead **because loomweave retains no
cross-run history**. heddle is precisely the temporal authority that can supply
the count. We freeze the read now so loomweave can light up `high_churn` later
with no contract edit (NO-DEAD-BY-DESIGN).

Intent: given a set of entity refs (SEIs preferred), return a per-entity count of
change events over an optional window. Pure aggregation over `change_events`
(`store.py:41-53`); a `GROUP BY entity_key_id` is the whole implementation.

Input:
```json
{
  "repo": "/abs/path",
  "entity_refs": [
    {"kind": "sei", "value": "loomweave:eid:..."},
    {"kind": "sei", "value": "loomweave:eid:..."}
  ],
  "window": {"since": null, "until": null, "rev_range": null},
  "sort_by": "churn_count|sei", "sort_order": "desc",
  "limit": 100, "cursor": null
}
```
Output `data`:
```json
{
  "items": [
    {"entity": {"sei": "loomweave:eid:...", "locator": "python:function:..."},
     "churn_count": 7,
     "first_changed_at": "2026-05-01T00:00:00Z",
     "last_changed_at": "2026-06-13T00:00:00Z",
     "last_actor": "agent:codex"}
  ],
  "window": {"since": null, "until": null, "rev_range": null},
  "page": {"limit": 100, "next_cursor": null, "has_more": false}
}
```
**Keying:** input refs are SEIs; output items echo `sei` + `locator`. An input
SEI heddle has never observed returns `churn_count: 0` (NOT an error — "no
recorded change" is a real, complete answer). An input that is *not* a recognised
ref shape → `error_code: invalid_changed_refs`, `retryability:
retry_with_changes`.

**Why a dedicated read, not "loomweave calls `timeline` N times":** loomweave's
`high_churn` is a bounded list query (`shortcuts.rs:644` paginates); fanning it
out to per-entity `timeline` calls is O(N) MCP round-trips. The aggregation read
is one call, SEI-keyed, bounded — the shape loomweave can join at read time and
discard (HARD RULE).

### 1B. heddle INBOUND — the loomweave reads heddle captures from (MINIMAL)

heddle reads loomweave ONLY to capture dated edge snapshots and resolve SEIs.
These are the stable loomweave surfaces heddle needs and the frozen expectation
that loomweave keeps them. heddle calls them over loomweave's MCP
(`loomweave.py:73-108`, `snapshot.py:46-136`).

| loomweave MCP tool | heddle uses it for | Frozen shape heddle depends on |
| --- | --- | --- |
| `entity_resolve` | locator → SEI (HX1) | `{results: [{qualname, entity: {sei}, candidates: [{sei}]}]}` or `{entity: {sei}}` (`loomweave.py:111-152`) |
| `entity_neighborhood_get` | edge capture | `{entity: {id}, callers[], callees[], references_in[], references_out[], truncated: {callers, callees}}` (`snapshot.py:172-207`) |
| `project_status_get` | SEI availability probe | reports whether SEI bindings populated (`sei.rs:520-532`, `has_any_alive_binding`) |

**Frozen inbound rules:**
- heddle treats every loomweave fact as **dated enrichment**, stores only the
  temporal facts it owns, and marks `enrichment.edges` `present|partial|stale`
  accordingly (`snapshot.py:135`).
- A `truncated` neighborhood MUST NOT be snapshotted as complete
  (`snapshot.py:177-181` raises) — heddle records `DELTA`, never a false `FULL`.
- loomweave absence → heddle returns locator-keyed facts, `sei: unavailable`,
  `edges: SKIPPED` (`snapshot.py:56-69`). Never a transport failure.

### 1C. Degrade contract (loomweave seam)

- loomweave absent on capture → `completeness: SKIPPED`, `enrichment.edges:
  skipped`, no edges stored (`snapshot.py:56-69`). `heddle_impact_radius_get`
  then returns `NO_SNAPSHOT` (changed-set only, NOT an error —
  `contracts.md:30-32`, `mcp.py:182-183`).
- loomweave present but partial → `completeness: DELTA`, `failed_entities[]`
  populated (`snapshot.py:115-136`).
- loomweave reading heddle (churn/timeline) absent → loomweave's `high_churn`
  keeps its current honest-empty + missing-signal note (`shortcuts.rs:683-693`).
  No loomweave core flow breaks; this is the enrich-only guarantee in the
  loomweave→heddle direction.

### 1D. GOLDEN VECTORS — loomweave seam (freeze these)

| # | Producer | Consumer | Vector (frozen input → frozen output assertion) |
| --- | --- | --- | --- |
| GV-LW-1 | heddle `heddle_change_list` | loomweave temporal panel | rev_range `HEAD~1..HEAD` over a 2-entity change → `data.items` len 2, each item carries `locator`+`sei` keys, `changed_refs` SEI-keyed, `next_actions` names `heddle_reverify_worklist_get`. |
| GV-LW-2 | heddle `heddle_entity_churn_count_get` | loomweave `entity_high_churn_list` | input 3 SEIs, one never-observed → `data.items` len 3, observed two carry `churn_count>=1`, the unobserved carries `churn_count: 0` (not omitted, not error). |
| GV-LW-3 | heddle `heddle_edge_snapshot_capture` | heddle store | loomweave available, full neighborhood → `completeness: FULL`, `edges>0`; loomweave absent → `completeness: SKIPPED`, `edges: 0`, `enrichment.edges: skipped`, exit 0. |
| GV-LW-4 | loomweave `entity_neighborhood_get` | heddle capture | `truncated: {callers: true}` → heddle records `DELTA`, never `FULL` (`snapshot.py:177-181`). |
| GV-LW-5 | loomweave `entity_resolve` | heddle HX1 | locator `python:function:m.f` resolves → heddle stores `sei: loomweave:eid:...`, `enrichment.sei: present`; loomweave absent → `sei: null`, `enrichment.sei: unavailable`. |

---

## SEAM 2 — heddle ↔ filigree

**Authority split:** filigree owns work state, issues, observations, claims,
lifecycle. heddle reads or proposes links; never files, closes, claims, or
mutates work by default (`federation-value-add-and-mcp-first-audit.md:36,571-598`;
consumer ticket `post-admission-consumer-tickets.md:31-36`).

### 2A. heddle OUTBOUND — the reverify worklist filigree consumes

#### `heddle_reverify_worklist_get`  (shim: `reverify`)  — `heddle.reverify_worklist.v1`

The flagship. FROZEN shape (`federation-value-add-and-mcp-first-audit.md:346-405`;
live `commands.py:97-103`):

Input:
```json
{
  "repo": "/abs/path",
  "rev_range": "HEAD~1..HEAD",
  "changed_refs": [], "changed_entity_key_ids": [],
  "depth": 2,
  "filters": {"path_prefix": null, "risk_min": null, "finding_state": null,
              "requirement_id": null, "verification_state": null, "issue_status": null,
              "governance_state": null, "max_commits_behind": null},
  "sort_by": "priority|risk|depth|changed_at|staleness", "sort_order": "asc|desc",
  "group_by": "entity|file|requirement|issue|none",
  "limit": 100, "cursor": null,
  "include_federation": true
}
```
Output `data`:
```json
{
  "completeness": "FULL|DELTA|NO_SNAPSHOT|SKIPPED",
  "staleness": {"snapshot_commit": null, "commits_behind": null},
  "items": [
    {"entity": {"locator": "...", "sei": null},
     "priority": "P1|P2|P3|unknown",
     "reason": "changed|downstream|risk_enriched|requirement_enriched",
     "depth": 0, "why": [],
     "suggested_verification": [{"kind": "test", "command": "..."}],
     "enrichment": {"work": [], "risk": [], "governance": [], "requirements": []}}
  ],
  "next_actions": {"filigree": []},
  "page": {"limit": 100, "next_cursor": null, "has_more": false}
}
```
**Frozen work-enrichment shape** (`enrichment.work[]` items, when filigree
present): `{issue_id, issue_status, claim_state, stale_claim, link_kind}`. When
filigree absent → `enrichment.work: []` + envelope `enrichment.work:
"unavailable"`. heddle NEVER auto-files: any proposed work lands in
`next_actions.filigree[]` as a *candidate* a human or a write-capable filigree
tool must execute (`federation-value-add-and-mcp-first-audit.md:586-588`).

### 2B. heddle INBOUND — filigree work-state read (for reverify → worklist)

heddle reads filigree to answer "is this changed entity already tracked?" The
binding key is filigree's **entity-association** surface (CLAUDE.md ADR-029):
`entity_association_list_by_entity(entity_id)` — reverse lookup, given an opaque
external entity id (a `loomweave:eid:` SEI), return every filigree issue bound to
it.

| filigree read | heddle uses it for | Frozen shape heddle depends on |
| --- | --- | --- |
| `entity_association_list_by_entity` | SEI → linked issues | given `entity_id = loomweave:eid:...` → `[{issue_id, entity_kind, content_hash_at_attach}]` |
| `issue_get` / `issue_list` | issue status, claim state | `{id, status, assignee, claim_state}` for a linked issue |

**Frozen inbound rules:**
- heddle keys filigree reads on the **SEI** (the opaque `entity_id` ADR-029
  passes through; project isolation is by DB file). heddle supplies the SEI; it
  does not interpret filigree's `content_hash_at_attach` drift detection — that
  is filigree's read-path concern.
- filigree absent → heddle omits work enrichment, sets `enrichment.work:
  unavailable`, and NEVER fabricates an issue link.

### 2C. GOLDEN VECTORS — filigree seam

| # | Producer | Consumer | Vector |
| --- | --- | --- | --- |
| GV-FI-1 | heddle `heddle_reverify_worklist_get` | filigree closure-check evidence | rev_range over a changed entity with a linked P1 issue (filigree present) → item `priority: P1`, `enrichment.work[0].issue_status` populated, `next_actions.filigree` is a *candidate* (heddle filed nothing). |
| GV-FI-2 | heddle `heddle_reverify_worklist_get` | filigree | filigree absent → `enrichment.work: []`, envelope `enrichment.work: "unavailable"`, worklist still non-empty and useful (solo reverify). |
| GV-FI-3 | filigree `entity_association_list_by_entity` | heddle | `entity_id = loomweave:eid:X` with one bound issue → heddle work-enrichment shows that `issue_id`; SEI X with no binding → `enrichment.work: []` (not error). |

---

## SEAM 3 — heddle ↔ wardline

**Authority split:** wardline owns trust policy, findings, waivers, baselines,
the taint lattice. heddle consumes risk/finding facts as enrichment; **never
declares a change allowed or clean** (`federation-value-add-and-mcp-first-audit.md:37,601-624`).
DECONFLICTION-FIRST: wardline absence is `risk: unavailable`, NEVER `clean`.

### 3A. heddle OUTBOUND — the affected-scope hint wardline consumes

#### `heddle.affected_scope.v1`  (payload, surfaced via `heddle_impact_radius_get`)

heddle exposes a changed+affected entity set with completeness/staleness for
wardline to scope a rescan (`federation-value-add-and-mcp-first-audit.md:507,515-517`).
This rides on `heddle_impact_radius_get` (shim `blast_radius`):

#### `heddle_impact_radius_get`  (shim: `blast_radius`)  — `heddle.impact_radius.v1`

Input:
```json
{
  "repo": "/abs/path",
  "rev_range": null, "changed_refs": [], "changed_entity_key_ids": [],
  "depth": 2,
  "filters": {"edge_kind": null, "confidence": null, "path_prefix": null, "max_commits_behind": null},
  "sort_by": "depth|confidence|path|changed_at|risk", "sort_order": "asc|desc",
  "limit": 100, "cursor": null
}
```
Output `data` (`federation-value-add-and-mcp-first-audit.md:325-343`):
```json
{
  "completeness": "FULL|DELTA|NO_SNAPSHOT|SKIPPED",
  "staleness": {"snapshot_commit": "aaaa...", "commits_behind": 0},
  "changed": [{"entity": {"locator": "...", "sei": null}}],
  "affected": [
    {"entity": {"locator": "...", "sei": null}, "depth": 1,
     "via_edges": [{"from": "1", "to": "2", "kind": "calls", "confidence": "resolved"}]}
  ],
  "page": {"limit": 100, "next_cursor": null, "has_more": false}
}
```
- `completeness` + `staleness` are **MANDATORY in every answer** — a thin answer
  must look thin (NFR-06, `11-interface-contracts.md:30`). wardline consuming
  this scope MUST surface heddle's completeness/staleness in its scoped-scan
  metadata (`post-admission-consumer-tickets.md:27-30`).

### 3B. heddle INBOUND — wardline finding/risk read (advisory enrichment only)

| wardline read | heddle uses it for | Frozen shape heddle depends on |
| --- | --- | --- |
| finding facts keyed by SEI | sort/explain reverify by risk | `[{sei, finding_state, severity, trust_boundary}]` |

**Frozen inbound rules (DECONFLICTION-FIRST):**
- heddle re-derives any "security" finding as a functional/availability signal
  for *ordering* reverify work; it is never an allow/deny gate.
- wardline absent → `enrichment.risk: unavailable`. heddle NEVER treats absence
  as clean (`federation-value-add-and-mcp-first-audit.md:617`).

### 3C. GOLDEN VECTORS — wardline seam

| # | Producer | Consumer | Vector |
| --- | --- | --- | --- |
| GV-WL-1 | heddle `heddle_impact_radius_get` (`affected_scope`) | wardline scoped rescan | depth-2 over a changed entity with a FULL snapshot → `affected` non-empty, `completeness: FULL`, `staleness.commits_behind: 0`; wardline scan echoes that scope+staleness. |
| GV-WL-2 | heddle `heddle_impact_radius_get` | wardline | no snapshot → `completeness: NO_SNAPSHOT`, `changed` only, exit 0; wardline falls back to full scan (authoritative). |
| GV-WL-3 | wardline finding read | heddle reverify | wardline absent → `enrichment.risk: "unavailable"`, items still ordered by depth; NEVER an item marked clean/allowed. |

---

## SEAM 4 — heddle ↔ legis

**Authority split:** legis owns governance, signoff, CI/git attestations,
overrides, and the rename feed. heddle consumes provenance + rename facts and
emits **advisory** impact only; **never governs**
(`federation-value-add-and-mcp-first-audit.md:38,629-655`). Advisory never gates
([deconfliction-not-security]).

### 4A. heddle OUTBOUND — advisory preflight impact legis consumes

#### `heddle.preflight_impact.v1`  (payload, surfaced via `heddle_impact_radius_get`)

heddle exposes an advisory impacted-entity set for governance/preflight context
(`federation-value-add-and-mcp-first-audit.md:508,518`). Same wire shape as
`heddle_impact_radius_get` (§3A), consumed as advisory: legis shows heddle
completeness/staleness next to identity gaps and lineage integrity
(`post-admission-consumer-tickets.md:21-24`) and **never lets heddle decide a
governance verdict**.

### 4B. heddle INBOUND — legis git-rename feed + provenance read

The load-bearing inbound read is the **git-rename feed**, so heddle's `timeline`
and `changed` stay stable across file moves
(`federation-value-add-and-mcp-first-audit.md:639-646`).

> **AMENDED 2026-06-13** (expert panel + loomweave HX1 source-check — see §10 / PDR-0021).
> legis emits **path**-renames (`{old_path, new_path}`, legis `surface.py:166`), NOT
> locator-renames. The path→locator **derivation** (`file_renames_to_locator_renames`,
> loomweave `sei_git.rs:47-52`) is **loomweave's**, off legis's charter (legis
> `models.py:35-37` disclaims symbol-level detection). loomweave CONSUMES rename
> signals at analyze time (`LegisGitRenameSource`, `sei_git.rs:224-294`) and exposes
> **no** rename feed over MCP. So heddle's locator-rename source is an OPEN fast-follow
> choice — **C′** (loomweave grows a new MCP rename feed) or **A′** (heddle ports
> loomweave's derivation onto legis's path feed) — to settle when heddle proves the
> need. The shapes below are corrected to legis's real (path) output.

| legis read | heddle uses it for | Frozen shape heddle depends on |
| --- | --- | --- |
| `git_rename_list` / rename feed | stable timeline across moves (locator derivation is loomweave's — see amendment) | `[{old_path, new_path}]` (legis's native git shape, `surface.py:166`) |
| branch/commit/PR/signoff context | governance enrichment on outputs | `{branch, commit, pr, signoff_id, governance_state}` |

**Frozen inbound rules:**
- legis supplies **path**-renames (`{old_path, new_path}`). The path→locator
  translation the matcher needs is **loomweave's** (`file_renames_to_locator_renames`),
  never legis's git code — keeping the matcher contract identical across loomweave and
  heddle consumers, with loomweave the single derivation authority. The proven consumer
  of legis's path feed today is loomweave (`LegisGitRenameSource`), at analyze time.
- legis absent → heddle uses raw git history, sets `enrichment.governance:
  unavailable`. No governance verdict is implied
  (`federation-value-add-and-mcp-first-audit.md:508`).

### 4C. GOLDEN VECTORS — legis seam

| # | Producer | Consumer | Vector |
| --- | --- | --- | --- |
| GV-LG-1 | heddle `heddle_impact_radius_get` (`preflight_impact`) | legis preflight context | depth-2 advisory set → legis surfaces it next to identity-gap/lineage with heddle staleness; legis policy decision UNCHANGED by it. |
| GV-LG-2 | legis `git_rename_list` (path) → loomweave-owned derivation | heddle timeline | a `{old_path, new_path}` rename, run through loomweave's path→locator derivation (mechanism C′/A′ TBD — see §4B amendment), yields the new locator's timeline incl. pre-rename events; legis absent → raw-git fallback, `enrichment.governance: unavailable`. |
| GV-LG-3 | heddle outbound | legis | every heddle response carries `meta.local_only: true`, `peer_side_effects: []` — legis verifies heddle never claims a write/govern side effect. |

---

## 5. Bonus seam — `heddle_edge_snapshot_capture` (the only mutating tool)

#### `heddle_edge_snapshot_capture`  (shim: `capture_snapshot`)  — `heddle.edge_snapshot.v1`

Frozen because it is the only mutating outbound tool and its idempotency contract
must be pinned (`federation-value-add-and-mcp-first-audit.md:407-445`; live
`commands.py:106-128`, `mcp.py:142-166`, `snapshot.py:46-136`).

Input:
```json
{
  "repo": "/abs/path", "commit": "HEAD", "mode": "full|changed_only",
  "changed_refs": [], "if_stale_after": null, "max_entities": 1000,
  "dry_run": false, "idempotency_key": null
}
```
Output `data`:
```json
{
  "snapshot_id": 1, "commit_sha": "aaaa...", "source": "loomweave",
  "source_version": "1.1.0-rc4", "completeness": "FULL|DELTA|SKIPPED",
  "entities": 10, "edges": 12, "failed_entities": [],
  "idempotency": "created|already_current|dry_run"
}
```
**Frozen rules:** mutates ONLY `.weft/heddle/` (`store.py:96-99`,
`contracts.md:26-28`); never a sibling repo. Repeated calls for the same
`(repo, commit, mode, effective entity set)` return `already_current` or replace
the local snapshot atomically (`federation-value-add-and-mcp-first-audit.md:443-445`).
`completeness` is the closed set `FULL|DELTA|SKIPPED` enforced at the store
boundary (`store.py:311`).

> Live drift to reconcile (heddle-side): `mcp.py:148-157` still accepts
> `loomweave_command` as an agent-supplied string; the frozen input drops it in
> favour of server/project config (`federation-value-add-and-mcp-first-audit.md:893-897`).
> Removing `loomweave_command` from the public input is a freeze precondition
> (§7) — leaving it in freezes an agent-burden footgun.

---

## 6. FROZEN vs FAST-FOLLOW

| Item | FROZEN now (contract) | FAST-FOLLOW (implementation) |
| --- | --- | --- |
| `heddle_change_list` name + I/O + `heddle.change_list.v1` | ✅ | filters/sort/cursor population, real SEI keying (HX1) |
| `heddle_entity_timeline_get` name + I/O | ✅ | filters, `sei_resolution` population |
| `heddle_entity_churn_count_get` name + I/O (NEW) | ✅ | the GROUP-BY read in heddle; loomweave `high_churn` consuming it |
| `heddle_impact_radius_get` name + I/O (= `affected_scope` + `preflight_impact`) | ✅ | risk/depth sort, SEI-keyed inputs |
| `heddle_reverify_worklist_get` name + I/O | ✅ | risk/work/req/gov enrichment population |
| `heddle_edge_snapshot_capture` name + I/O + idempotency | ✅ | `idempotency_key`/`dry_run`/`mode` enforcement; drop `loomweave_command` |
| Success envelope (full shape) | ✅ | `query`/`next_actions`/`enrichment` population beyond thin shell |
| Error vocab (`heddle.error.v1`, retryability, error_code set) | ✅ | map live `invalid_params` → specific codes |
| SEI keying (`loomweave:eid:`, opaque, both `locator`+`sei` in every entity) | ✅ | HX1: heddle resolves real SEIs |
| loomweave inbound reads (`entity_resolve`, `entity_neighborhood_get`) | ✅ FROZEN — PROVEN (heddle captures real edges through it) | — already shipped in loomweave |
| filigree inbound (`entity_association_list_by_entity` SEI reverse-lookup) | ✅ FROZEN — EARNED (heddle reads it via `entity_association_list_by_entity` + `issue_get`; GV-FI-1/3 pass; byte-for-byte contract test pins the response) | filigree **consumer SHIPPED in 3.0.0**: `heddle_worklist_ingest` files/links worklist items, explicit-action only (weft-74f1e0c331) |
| wardline inbound (finding/risk by SEI) | ⏸ RESERVED-SHAPE — proven-need pending | freezes when heddle demonstrates risk-sort consumption; else non-binding |
| legis inbound (`git_rename_list` **path**-rename feed; locator derivation is loomweave's) | ⏸ RESERVED-SHAPE — proven-need pending (heddle uses raw git today); legis shape is `{old_path, new_path}`, not locator | freezes when heddle proves consumption; heddle-facing locator source is the OPEN **C′/A′** choice (loomweave MCP feed vs heddle ports derivation). See §4B amendment + PDR-0021 |
| Contract resource URIs (`heddle://contracts/heddle.*.v1`) | ✅ names | resource serving |
| Consumer implementations in all 4 members | — | filigree consumer (`heddle_worklist_ingest`) **PULLED INTO 3.0.0** (heddle ready; owner call 2026-06-13); loomweave/wardline/legis consumers remain fast-follow (per weft-54192f9400) |

---

## 7. Freeze preconditions (heddle-side reconciliation, not contract changes)

These are implementation drifts between live `06f2597` and the frozen contract.
None change the contract; all must land before the cutover freezes, or the
freeze locks a known-wrong surface:

1. **Error-code specificity** — map the live generic `invalid_params`
   (`mcp.py:221`) onto the frozen `error_code` set (`invalid_rev_range`,
   `invalid_entity_ref`, `invalid_changed_refs`, …). The frozen vocabulary is
   authoritative.
2. **Drop `loomweave_command`** from `heddle_edge_snapshot_capture` public input
   (`mcp.py:153`); move to server/project config.
3. **Schema names** — promote `heddle.draft.<tool>.v1` (`mcp.py:170-177`) to the
   frozen `heddle.<contract>.v1` URIs; the draft prefix must not survive the
   freeze.
4. **`heddle_entity_churn_count_get` must exist** — it is the NO-DEAD-BY-DESIGN
   read for loomweave `high_churn`; freezing the contract while the producer read
   is absent is acceptable ONLY because it is a pure GROUP-BY over existing
   `change_events` and is golden-vectored (GV-LW-2). Confirm it ships in the same
   contract slice.
5. **Endorsed names + shims both present** — `heddle_*` endorsed names live
   alongside the short shims (`changed`, `timeline`, …) until glossary freeze;
   aliases MUST return identical `schema` + data
   (`federation-value-add-and-mcp-first-audit.md:56-58`).

---

## 8. RESOLVED DECISIONS (owner-locked 2026-06-13)

> All five resolved at lock time (owner nod 2026-06-13). Authoritative resolutions:
>
> - **OD-1 → FREEZE ALL SIX.** `heddle_entity_churn_count_get` is in the frozen
>   launch slice (no-dead-by-design fill for loomweave `high_churn`; trivial
>   GROUP-BY; golden-vectored GV-LW-2).
> - **OD-2 → DROPPED.** `heddle_project_context_get` is NOT in the frozen surface —
>   member-internal ergonomics, not a cross-member seam, not live.
> - **OD-3 → NAME RESERVED ONLY.** No heddle↔charter schema freeze; charter binds to
>   the already-frozen `heddle_impact_radius_get` shape on arrival (avoids the
>   Shuttle pre-bind mistake).
> - **OD-4 → RENAMED.** `identity_status` → `sei_resolution`
>   (resolved|unresolved|unknown) on the timeline output, killing the
>   lineage-authority ambiguity (loomweave owns lineage).
> - **OD-5 → FOLD INTO GS-7.** heddle's 14 golden vectors join the existing
>   four-member conformance oracle as a fifth producer (one oracle, one gate, C-12).
>
> The original call-needed rationale is retained below for provenance.

**OD-1 — Does the churn-count read (`heddle_entity_churn_count_get`) freeze in
the launch slice, or is the loomweave consumer alone deferred?**
The contract gap is real and the read is cheap (a GROUP-BY). But adding a SIXTH
frozen heddle tool at the cutover expands the frozen surface. *Call needed:*
freeze all six now (recommended — NO-DEAD-BY-DESIGN, and the read is trivial), or
freeze five and admit a documented v1.1 contract addition later (violates
"no post-launch edits expected"). **Recommendation: freeze all six.**

**OD-2 — Is `heddle_project_context_get` in the frozen launch surface?**
The endorsement package lists it (`federation-value-add-and-mcp-first-audit.md:55`)
but it does not exist in live `mcp.py` (only 5 tools). It is a discovery
convenience, not a federation data seam. *Call needed:* freeze it as the 7th tool
(more surface), or drop it from the launch freeze and treat the contract-resource
URIs as the discovery path. **Recommendation: drop from launch freeze; it is
member-internal ergonomics, not a cross-member seam.**

**OD-3 — Charter is a future member; do we freeze the heddle↔charter seam now?**
The package reserves `heddle.obligation_impact_context.v1`
(`federation-value-add-and-mcp-first-audit.md:509,521`) but charter is not a
current member and `post-admission-consumer-tickets.md:14-18` gates it on
"when Charter impact analysis lands." Freezing a seam to a non-member risks the
exact pre-bind mistake the package warns against for Shuttle
(`federation-value-add-and-mcp-first-audit.md:710-725`). *Call needed:* reserve
the NAME only (no schema freeze) vs. full freeze. **Recommendation: reserve name
only — heddle's outbound impact shape is already frozen via
`heddle_impact_radius_get`; charter binds to it post-arrival with no heddle
edit.**

**OD-4 — `identity_status` on the timeline output: heddle-local honesty signal or
removed to avoid implying a lineage claim?**
The package includes `identity_status: stable|fragile|unknown`
(`federation-value-add-and-mcp-first-audit.md:291`). loomweave owns lineage
(`sei.rs:402-502`). There is a doctrine risk that an agent reads heddle's
`identity_status` as a lineage authority claim. *Call needed:* keep it (documented
as heddle-local "do I hold a resolved SEI" only) or drop it and let agents call
loomweave `resolve_sei` for true lineage. **Recommendation: keep but rename the
documented meaning to `sei_resolution: resolved|unresolved|unknown` to kill the
lineage-authority ambiguity** — this is a naming call with doctrine weight, hence
escalated.

**OD-5 — Does the golden-vector gate for heddle run at the SAME four-member
contract gate (GS-7 oracle), or a separate heddle gate?**
`11-interface-contracts.md:48-53` says heddle "would enter the oracle corpus
before its first frozen release." *Call needed:* fold heddle's 14 golden vectors
(§1D, 2C, 3C, 4C) into the existing four-member conformance oracle as a fifth
producer, or stand up a heddle-specific gate. **Recommendation: fold into the
existing oracle — same discipline, one gate, per [do-it-right] gold-standard.**
This is a launch-runbook ordering call, owner-visible.

---

## 9. Citations index (load-bearing source)

- heddle outbound surface, live: `/home/john/heddle/src/heddle/mcp.py:46-394`
- heddle command shapes, live: `/home/john/heddle/src/heddle/commands.py:44-129`
- heddle store (change_events, edge_snapshots, timeline join):
  `/home/john/heddle/src/heddle/store.py:21-378`
- heddle loomweave client + SEI resolve: `/home/john/heddle/src/heddle/loomweave.py:73-176`
- heddle snapshot capture + truncation guard: `/home/john/heddle/src/heddle/snapshot.py:46-207`
- Interface Endorsement Package (envelope, error vocab, entity_ref, tool
  contracts, pairwise table):
  `/home/john/heddle/docs/product/federation-value-add-and-mcp-first-audit.md:19-532`
- heddle contracts (endorsed names, degrade rule):
  `/home/john/heddle/docs/federation/contracts.md:11-34`
- heddle prose interface contracts (mandatory staleness/completeness, NO_SNAPSHOT):
  `/home/john/heddle/solution-architecture/11-interface-contracts.md:14-53`
- post-admission consumer tickets (per-member boundary + acceptance):
  `/home/john/heddle/docs/integration/post-admission-consumer-tickets.md:1-37`
- SEI scheme (FROZEN `loomweave:eid:` prefix, mint, resolve, GitRename seam):
  `/home/john/loomweave/crates/loomweave-storage/src/sei.rs:36-162,402-532`
- loomweave dead churn/recency surfaces (the NO-DEAD-BY-DESIGN target):
  `/home/john/loomweave/crates/loomweave-mcp/src/catalogue/shortcuts.rs:639-729`
- loomweave entity_diff unavailable (no cross-run history):
  `/home/john/loomweave/crates/loomweave-mcp/src/index_diff.rs:749-752`

---

## 10. AMENDMENTS (post-lock corrections, with provenance)

The freeze stands; these correct factual errors in the locked text without
renegotiating any frozen seam. Each names its evidence.

### A1 — §4B rename feed: path-vs-locator ownership (2026-06-13)

**Provenance:** expert panel (api-architect + product-decision-critic) +
loomweave HX1 source-check, all against executable source. Recorded as PDR-0021.

**What the lock got wrong:** §4B / GV-LG-2 / §6 stated legis emits
`[{old_locator, new_locator}]` (matching loomweave's `GitRename`). legis
structurally emits **path**-renames only — `RenameEvidence{old_path, new_path,
old_blob, new_blob}` (legis `surface.py:135-202`) — and its own
`models.py:35-37` disclaims symbol-level detection. The path→locator derivation
(`file_renames_to_locator_renames`, loomweave `sei_git.rs:47-52`) lives in
loomweave-cli, off legis's charter.

**Settled:** legis owns the git **path**-rename interface; **loomweave** owns
path→locator derivation (single locator authority). "legis grows a deriver"
(Option B) is dead.

**Corrected facts:** loomweave's rename sources (`ShellGitRenameSource`,
`LegisGitRenameSource`, `sei_git.rs:75-294`) produce locator-renames ONLY as an
**analyze-time input to loomweave's own SEI minting**; loomweave **emits no rename
feed over MCP**. legis's path feed *does* have a proven consumer — loomweave's
`LegisGitRenameSource`, at analyze time (committed-window, behind a
legis-reachability gate). That is a legis→loomweave consumer relation, **not** a
feed heddle can route through.

**Still OPEN (fast-follow, gated on heddle proving the need):** the heddle-facing
locator-rename source — **C′** (loomweave grows a new MCP rename-feed tool) vs
**A′** (heddle consumes legis's path feed and ports loomweave's derivation). Build
nothing until heddle demonstrates consumption (prove-the-need). The legis→loomweave
**path**-rename seam is itself proven and freeze-eligible at cutover; loomweave to
confirm `parse_legis_rename_json` matches legis's exact `git_rename_list` output
shape and guard the silent-under-carry failure (`sei_git.rs:288-294`).

**Reversal trigger:** revisit the C′/A′ choice only if heddle's own derivation
measurably diverges from loomweave's for the same rename → then C′ (loomweave
becomes heddle's single rename source via a new MCP tool).
