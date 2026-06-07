# Weft — conventions register & conformance matrix

**Status:** **Authoritative** for *which suite-wide conventions exist, what the rule
is, and which member is the reference implementation.* Each member's **conformance
cell** is a 2026-06-06 finding derived from executable source (not docs); its
confidence is the `source_tier` it carries. **Verification depth varies** — see the
calibration note under the matrix: cells that drove a *survived call* (reference
assignments, downgrades) were independently re-derived from code; the rest carry a
single extractor's `code`-tier evidence. Treat a `code`-tier `conforms` as "the
implementing code is present," not "runtime-confirmed shipped behaviour."

This is the behavioral sibling of [glossary.md](./glossary.md) (which does the same
job for *vocabulary*). It exists because the federation has cross-cutting
*behavioral* expectations — nested `.gitignore`, WAL hygiene, token handling,
managed-doc blocks, the MCP envelope — that were each invented per-member and
**evolve unevenly**. Without a register, "who owns the standard?" has no honest
answer; with one, the answer is explicit (below).

---

## The ownership model (why this is doctrine-safe)

Weft does not own enforcement. It owns the **statement** and the **scorecard**.
This is the exact model [doctrine.md](./doctrine.md) §8 already establishes for
vocabulary, extended to behavior:

- **The hub states the convention** and names a reference implementation. (This doc.)
- **Each component conforms locally**, on its own cadence, in its own release.
- **No runtime or CI cross-repo enforcement.** A convention here is a read-only
  design-review artifact — nothing imports it, nothing runs from it, removing it
  changes no member's semantics. Per doctrine §5/§6, the moment the suite *enforced*
  a convention at runtime it would become the shared infrastructure the axiom forbids.

**Uneven evolution is a tracked state, not a defect.** A member may be `reference`
for one convention and `pending` on another; that asymmetry is recorded here with a
target, exactly as [asterisk-register.md](./asterisk-register.md) records time-bound
couplings. The hub coordinates; it does not block any member's independent release.

## Conformance vocabulary

| State | Meaning |
|---|---|
| **reference** | The exemplar other members copy. The convention was first proven here. May be `reference` while a *newer* implementation is unshipped — that is tracked, not a defect. |
| **conforms** | Meets the rule in *shipped* behavior; not necessarily the reference. |
| **pending** | Recognized as in-scope; not yet met *in a shipped build*. A fix that exists only on an unmerged branch is `pending` (conformance is shipped behavior). Carries a target/owner. |
| **exempt** | The convention does not apply to this member (with a stated reason). |
| **unknown** | In-scope but conformance could not be determined firsthand. Treat as work. |

> **Provenance (code-verified 2026-06-06).** Cells were derived from executable
> source per [[weft-docs-have-drifted-ground-truth]]: build manifests for versions,
> literal artifacts/code for conventions, and live CLI/MCP runs where the tool is
> installed. Source tiers: `manifest`, `code`, `runtime`, `test`, `doc-only`. A
> **`†` marks reference-but-not-shipped** (the reference code sits on an unmerged
> branch / pre-release; the released build lacks it). Member-doc-vs-code drift found
> in this pass is listed under "Member-owned findings" below and is owned by each
> member, not fixed here.

---

## The register

### C-1 — Every tool ships a complete nested `.gitignore` for its own dot-dir

- **Rule:** each member ships a `.gitignore` inside its runtime dot-dir excluding all
  ephemera (WAL/shm, locks, ports, instance ids, logs, migration backups, generated
  snapshots) with a **durable-vs-ephemeral header comment**. `git add -A` must never
  stage a live database, a credential, or a lock.
- **Reference:** **loomweave** — ADR-005, with `crates/loomweave-cli/src/install.rs`
  `GITIGNORE_CONTENTS` as the source-of-truth template. filigree co-authored the
  suite-wide standard (commit `d4f8921`: "Filigree's *half* of the cross-suite
  nested-`.gitignore` standard") but its implementation is not yet shipped.

| Member | State | Evidence |
|---|---|---|
| loomweave | **reference** | on-disk `.loomweave/.gitignore` complete + ADR-005 header; `git add -A --dry-run` stages nothing. **Caveat:** the *generated* on-disk file has drifted from the ADR-005 template — it excludes `loomweave.db`, which ADR-005 mandates *tracked* (member finding LW-1). |
| filigree | **pending** | `install.py:258-330` `FILIGREE_DIR_GITIGNORE` complete on `release/3.0.0`@rc4 (`d4f8921`); **absent from installed rc3** (grep=0). Co-author of the standard, not yet shipped. |
| wardline | **conforms** | `.gitignore` excludes `findings.jsonl`, `.env`, `.mcp.json`, agent docs; live secret/db/lock leak test passes. *Minor:* section comments, not the full durable-vs-ephemeral header; owns no live DB dot-dir. |
| legis | **conforms** | ignores its runtime artifacts; no live db/credential stages. (runtime tier) |
| charter | **pending** | not installed; dot-dir hygiene unverified firsthand. |

### C-2 — SQLite WAL checkpoint hygiene

- **Rule:** any member with a SQLite store checkpoints the WAL on idle and/or exposes
  a `snapshot`/`export` verb that checkpoints first, so the `.db` on disk is a
  reliable point-in-time artifact.
- **Reference:** **loomweave †** — first member to ship checkpoint-on-snapshot.

| Member | State | Evidence |
|---|---|---|
| loomweave | **reference †** | `writer.rs:394` `checkpoint_truncate` issues `PRAGMA wal_checkpoint(TRUNCATE)` at the run-commit boundary + `db.rs:32` backup verb. **On `rc/1.1.0-rc2` only — released v1.0.0 has no checkpoint**, so the large-WAL hazard still holds on the shipped build. |
| filigree | **pending** | `core.py:1446` sets `PRAGMA journal_mode=WAL`; zero `wal_checkpoint` calls anywhere; the export verb (`admin.py:757`) is a logical JSONL export, does not checkpoint. |
| wardline | **exempt** | no SQLite store (`grep sqlite3 src/` = none); outputs are `findings.jsonl` + YAML. |
| legis | **pending** | SQLite-backed; no checkpoint verb found. |
| charter | **pending** | not installed; unverified. |

### C-3 — Tokens via `${ENV}` / `token_env`, never literals

- **Rule:** every **plumbing** token (federation/coordination connectivity) references
  an environment variable; shipped config / `.mcp.json` templates reference `${TOKEN}`,
  never a literal. **The federation loopback token's canonical name is
  `WEFT_FEDERATION_TOKEN`** (decided 2026-06-07) — it guards the `weft` HTTP generation,
  so it is federation-scoped, *not* a member-named token. It **supersedes**
  `FILIGREE_API_TOKEN` and `FILIGREE_FEDERATION_API_TOKEN` (now deprecated **fallback
  aliases** for the transition) and supersedes issue `filigree-3ee7250b54`'s
  `FILIGREE_API_TOKEN` choice. See [conflict-register.md](./conflict-register.md) §A-13.
- **Why:** config **hygiene + portability + connectivity diagnostics** — *not* secret
  protection. These tokens are loopback/federation plumbing, not secrets (Weft is
  deconfliction-first, not a security system). The `${ENV}` convention keeps configs
  portable per-environment and lets a health check catch an *unset* connectivity
  token instead of a silent 401 (the lacuna failure mode; see C-7 + the doctor gap).
- **Carve-out — authority keys are a different class.** A key that lets a caller grant
  itself authority/override (e.g. **Legis operator keys**) must be kept **out of any
  agent-reachable environment** — `${ENV}` is *not* sufficient, because an agent can
  read its own env ("water finds its path"; the threat is the agent's instrumental
  goal-seeking, not malice). That is **capability confinement**, not hygiene, and is
  tracked separately (proposed **C-8**), not satisfied by this rule.
- **Reference:** **loomweave** — `loomweave.yaml` `token_env` (renaming `FILIGREE_API_TOKEN` → `WEFT_FEDERATION_TOKEN` under the canonical-name decision; keep the old name as a fallback during transition).

| Member | State | Evidence |
|---|---|---|
| loomweave | **reference** | `config.rs` defaults `token_env`; refuses unauthenticated HTTP on a routable interface if `${token_env}` is unset; literal creds only under `#[cfg(test)]`. |
| filigree | **conforms** | `core.py` `token_env`; daemon + client moving to canonical `WEFT_FEDERATION_TOKEN` with `FILIGREE_FEDERATION_API_TOKEN` / `FILIGREE_API_TOKEN` as deprecated fallbacks (implementing on `release/3.0.0`); `hmac.compare_digest`; no literal in any shipped config. |
| wardline | **conforms** | `filigree/config.py:18-32` reads `WARDLINE_FILIGREE_TOKEN` (its own name — "only the token *value* must match") from env or a git-ignored `.env`; `.mcp.json` `env={}`. Under the rename, wardline to adopt `WEFT_FEDERATION_TOKEN` (fallback `WARDLINE_FILIGREE_TOKEN`) **or** document the value-mapping in the glossary — wardline's call (§A-13). |
| legis | **conforms** | reads tokens from env; no literal in shipped config. |
| charter | **exempt** | no credentialed transport surface yet (read-only consumer). |

### C-4 — Multi-owner managed-block contract for shared agent docs

- **Rule (NORMATIVE).** When more than one tool writes managed blocks into a shared
  agent doc (`CLAUDE.md`, `AGENTS.md`), each tool's block is delimited by **namespaced
  HTML-comment fences** — `<!-- <ns>:instructions:vN:hash -->` … `<!-- /<ns>:instructions -->`
  — and every writer MUST obey:
  - **(a) One block per tool** — each tool owns exactly one block, delimited by its own namespaced fences.
  - **(b) Own-namespace mutation only** — a tool mutates only spans matched by its own vendor-namespaced token, never a namespace-agnostic prefix or wildcard.
  - **(c) Bounded recovery** — when repairing a malformed/unclosed own block, stop at the **next foreign-namespace fence after the own start marker**, falling back to EOF only if none follows; **never truncate-to-EOF across a foreign block**. This applies to the well-formed replace path too: end the replaced span at the own block's immediate close *or* the next foreign fence, whichever comes first.
  - **(d) Append-on-missing-end** — if the own end-marker is absent, append a fresh block and preserve all existing text verbatim; never rewrite.
  - **(e) Own-duplicate canonicalisation, foreign-safe** — canonicalise duplicate *own* blocks, but leave an own duplicate that sits *beyond* a foreign block in place (foreign-safety > own-dedup) and surface it.
  - **(f) Never reorder or relocate foreign blocks.**
  - **(g) Atomic, refuse-to-empty writes.**
  - **(h) Namespace charset `[A-Za-z0-9_-]+`, matched case-insensitively** — an uppercase-namespaced sibling must register as a boundary.

  A single command must restore all blocks; a write must never empty the file.
- **Reference:** *none yet* — no member satisfies the full normative contract. The
  cross-tool investigation (filigree issue `filigree-bcbd4d66fd`) **identified the
  foreign-deletion vector**: filigree and legis both (i) **truncate-to-EOF** when their
  own end-marker is missing and (ii) **swallow a sibling block sandwiched** between an
  unclosed-first and a closed-later own block — and both **auto-fire on SessionStart
  refresh**, with a live on-disk exposure in `~/lacuna` (co-resident filigree+wardline
  blocks in `CLAUDE.md` + `AGENTS.md`). That is the **partial** root cause of the lacuna
  corruption. **The C-4 gate (campaign `weft-eb3dee402f`) stays LIVE:** filigree's fix
  (landing on `release/3.0.0`) removes its foreign-deletion vector, but it does **not**
  explain a *full* 0-byte emptying — that remains open.

| Member | State | Evidence |
|---|---|---|
| filigree | **pending (non-conforming)** | **Violates (b)/(c)/(g):** `install.py:285` truncates-to-EOF on a missing own end-marker; `install.py:274-276` well-formed splice swallows a sibling block sandwiched between an unclosed-first and a closed-later own block; **auto-fires on SessionStart refresh**. Fix **landing now on `release/3.0.0`**. |
| wardline | **conforms (all reachable orderings)** | namespaced non-greedy `_FENCE_RE`, append-on-missing-end — complies for every reachable block ordering. *Theoretical residual (not reachable under normal append ordering):* a foreign block sitting strictly between two wardline fences would be swallowed by its canonicalising `.sub()`. |
| loomweave | **pending** | `instructions.rs` is exemplary at code tier (namespaced, preserves filigree+wardline, atomic temp-rename, both files) but **branch-only** (commit `0a93731` on unmerged `feat/agent-instructions-injection`); `main` + installed rc1 have **no** managed-block surface. |
| legis | **pending (non-conforming)** | **Violates (b)/(c)/(g):** `install.py:208` truncates-to-EOF on a missing own end-marker; `install.py:200-202` swallows a sandwiched sibling block; **auto-fires on SessionStart refresh**. Tracked as a **peer P0 (owner already tasked).** |
| charter | **exempt** | does not write to shared agent docs. |

### C-5 — `doctor`/`--fix`/`--repair` applies its auto-fixable subset

- **Rule:** a `doctor` that prints a remedy must be able to *apply* the
  auto-applicable subset, not merely diagnose.
- **Reference:** **loomweave** — `doctor --fix` applies (verified by a live run).

| Member | State | Evidence |
|---|---|---|
| loomweave | **reference** | runtime: `doctor --fix` applied skill pack + SessionStart hook + `.mcp.json` merge + three-way bindings; re-run reports "All orientation surfaces healthy." |
| filigree | **conforms** | runtime (rc3): `doctor --fix` applied `hooks.session_context` (auto-fix set = MCP/hooks/ephemeral cleanup). *Note:* `git.ignore` is diagnosed-only. **This reverses the friction-report "no-op" claim** — the no-op was a subset, not the whole `--fix`. |
| wardline | **conforms** | `doctor` repair path applies its installable surface (runtime). |
| legis | **pending** | `install`/`session-context` repair subcommands exist only in rc4 source; installed rc3 lacks them. |
| charter | **pending** | not installed; unverified. |

### C-6 — One MCP envelope: schema-versioned, side-effect-labelled, honest-empty

- **Rule:** one envelope shape (`{schema:"<member>.<entity>.vN", ok, data|error,
  warnings, meta{producer,…}}`), per-tool side-effect metadata (`mutates` /
  `local_only` / `peer_side_effects`), honest-empty semantics, a capability-discovery
  tool. Full convergence is the NEXT-tier *Weft MCP Conventions interop note*
  (product-analysis F2); the *convention* is registered here.
- **Reference:** **charter** — its envelope **is** the canonical shape
  (`schema "weft.charter.<entity>.vN"` + `meta.producer` + canonical
  `mutates/local_only/peer_side_effects`), confirmed live. loomweave's **honest-empty
  `result_kind` tri-state** is separately cited as the reference for *that facet*.

| Member | State | Evidence |
|---|---|---|
| charter | **reference** | full canonical envelope, runtime-confirmed (schema `weft.charter.<entity>.vN` + `meta.producer` + canonical side-effect fields). **Namespace renamed `loom.charter.*` → `weft.charter.*` — LANDED on charter `main` (`cbbcb2f`): 54/0 in src, 164 tests green.** [conflict-register.md](./conflict-register.md) §A-12. |
| loomweave | **pending** | runtime envelope `{ok,result,error,diagnostics,truncated,…}` (`lib.rs:2858-2922`): field is `result` not `data`, `diagnostics` not `warnings`, **no** `schema` id, **no** `meta.producer`. Ships a *richer, non-canonical* side-effect taxonomy (`read_only/writes_local_state/writes_external_state/spawns_process/may_call_llm`) — needs **aligning/renaming, not building**. Strong honest-empty (facet reference). *(Downgraded from reference: it overstated full-envelope conformance.)* |
| legis | **pending** | bare success shape (`mcp.py:350`) — payload carries the discriminated `outcome` (in success *and* error paths) but lacks the C-6 envelope: no schema id / top-level `ok` / `warnings` / `meta.producer`, and no per-tool side-effect metadata (`mcp.py:220`) or capability-discovery tool. *(Downgraded from "conforms": absent fields cannot be added by registration alone.)* |
| filigree | **pending** | flat error `{error,code,details?}` (`api.py:140`), list `{items,has_more,next_offset?}`; no top-level `schema`/`ok`/`meta{producer}`, no per-tool side-effect metadata. Has honest-empty + `ErrorCode` enum + a post-hoc `warnings` array. |
| wardline | **pending** | no canonical schema-versioned envelope (raw payloads in the plain MCP content shape, `server.py:1421`); `tools/list` exposes only a coarse read/write/network triad (`tooling.py:26-31`, `server.py:1311`), **not** the C-6 `mutates/local_only/peer_side_effects` metadata. *(`file_finding` and `scan_file_findings` are two distinct deliberate tools — not a rename.)* |

### C-7 — Distinguish transport-unreachable from auth-rejected

- **Rule:** a failed cross-tool call distinguishes "could not reach" from "reached,
  got 401 — set the token." The message names the actionable cause.
- **Reference:** **loomweave** — `project_status_get` reports the resolved endpoint
  *and its resolution source*; `filigree.rs` preserves 401/403 as numeric status.

| Member | State | Evidence |
|---|---|---|
| loomweave | **reference** | `filigree.rs` `get_json`/`get_json_or_none` return `HttpStatus{status,body}` for non-success; `404→Ok(None)` only; 401/403 preserved, never collapsed to unreachable. |
| filigree | **conforms** | `registry.py:403-412` `HTTP 401 → cause_kind='auth'` ("check token_env"); other 4xx/5xx → `http_error`; Timeout/Transport → `network`/`unreachable`; `403 BRIEFING_BLOCKED` kept distinct. |
| wardline | **pending** | a 401 is reported as "could not reach Filigree"; the `filigree_emit` path collapses auth-rejected into unreachable (`filigree_emit.py` docstring drift on `main`). |
| legis | **pending** | unverified-distinct; treat as work. |
| charter | **exempt** | no outbound credentialed call surface yet. |

### C-9 — Federation config/store layout: `.weft/<member>/` runtime state + operator-owned `weft.toml`

- **Rule.**
  - **(a) Runtime state under `.weft/<member>/`.** Machine-written state — SQLite
    stores, generated `context.md`/caches — lives under a per-member subtree at the
    project root. Each member is the **sole writer of its own subtree** and never reads
    or writes a sibling's; deleting a sibling's subtree must not break you.
  - **(b) `weft.toml` is operator-authored; members are read-only.** No member's
    installer / CLI / `doctor` writes or rewrites `weft.toml`. Single writer = the
    operator (or `weft init`). This is **C-4's multi-writer truncation lesson applied
    to a second shared file before it can recur** — gate `weft-eb3dee402f` is the
    precedent: do not add a writer to a shared multi-section file.
  - **(c) Enrich-only; malformed = absent (NORMATIVE).** A member MUST install and run
    with **no `weft.toml`** (and no sibling `.weft/` subtree), booting on its own
    authoritative config + discovery defaults — the §5 deletion test is the acceptance
    criterion. A **malformed or unreadable `weft.toml` is treated as absent** (silent
    fallback to defaults); a member MUST NOT hard-fail on it. Hard-failing would make
    the shared file load-bearing and split the federation across the *same* file
    (surfaced by legis, ratified here).
  - **(d) Member-private keys vs shared keys.** Member-private operator overrides live
    under `[<member>]`, owned by that member — each may ship its own now. **The canonical
    store-relocation knob is `[<member>].store_dir`** (legis reference). **Shared /
    cross-member keys** — a sibling's federation endpoint, an `enabled` flag another
    member reads — are **hub-pinned and PENDING**: they live **once** at a well-known
    top-level path any member may read (never duplicated into a second section — the §8
    / glossary managed-clash rule), and **no member bakes them until the layout is pinned.**
    A member that **already resolves a sibling endpoint** must **keep sibling resolution
    working this pass** via env/flag/on-disk discovery — but do *not* migrate the endpoint
    into a `[<member>.<sibling>]` weft.toml key. A **persisted operator-declared
    sibling-endpoint config rung is itself an instance of the pending shared fact**:
    prefer **retiring** it (resolution falls to env-var + the (e) on-disk
    `.weft/<sibling>/` port discovery) over relocating it to another per-member file,
    which only moves the §8 duplicate. Such a member is a **stakeholder of the
    shared-layout proposal** (`weft-a2f4cf95c7`): record the endpoint key it needs
    *there*, and it returns at the canonical top-level key when the schema lands.
  - **(e) Cross-member discovery.** Prefer `.weft/<sibling>/`; **tolerate** the legacy
    dot-dir through the transition window. This is **on-disk location** of a sibling's
    subtree — distinct from an operator-declared **endpoint URL**, which is a (d) shared
    key (pending).
  - **(f) Backcompat is filigree-only.** filigree retains legacy-path reads
    (`.filigree/`, `.filigree.conf`) and migrates forward; the other realized members
    **clean-break** to `.weft/`.
- **Schema status.** The `.weft/<member>/` layout, the member-private form (incl.
  `store_dir`), and the malformed=absent rule are **pinned now**. The **shared `weft.toml`
  key layout** (section naming for cross-read facts, the sibling-endpoint home,
  precedence) is **PENDING** — **loomweave drafts the proposal to the hub** (it surfaced
  the gap); blessed here, not shipped solo.
- **Sequencing.** This is a **fast-follow**, not part of the C-4 gate — store relocation
  ships per member independently; `weft-eb3dee402f` stays scoped to the managed-block
  fix. Clean-break members orphan lacuna's existing `.loomweave/`/`.wardline/` dirs →
  re-init is owned by the retrofit propagation issues (`weft-46f866cb85`,
  `weft-71ce4f8253`).
- **Reference:** **legis** for the **member-private form**. **No reference yet** for the
  shared-key layout (pending the hub pin).
- **Authority-key carve-out.** Operator/authority keys (e.g. Legis signing keys) are
  **never** relocated into the shared `.weft/` namespace by this convention —
  capability confinement (proposed C-8) governs them, not store-layout tidiness.

| Member | State | Evidence |
|---|---|---|
| legis | **conforms (member-private form) — reference** | `src/legis/config.py`: all four stores (check/governance/binding/pull) resolve under `.weft/legis/`; `[legis].store_dir` read **read-only** from `weft.toml`; absent/section-less/malformed → built-in defaults; `ensure_sqlite_parent` mkdirs at open-time; signing keys untouched. 676 passed / ruff+mypy clean; acceptance criterion smoke-tested (runs with no `weft.toml`). Shared-key layout: N/A (pending). |
| filigree | **pending** | backcompat relocation `.filigree/`→`.weft/filigree/` retaining the legacy `.filigree.conf` read, reusing the `from_conf` relocation machinery (the fg-da8d50 split-brain fix); single resolved anchor. weft.toml read deferred to the pinned shared layout. *(Its existing `.weft` refs are an unrelated `generations/weft` module, not this contract.)* |
| loomweave | **pending** | clean-break `.loomweave/`→`.weft/loomweave/` + federation resolver preferring `.weft/filigree/` (tolerating `.filigree/`); SEI scheme frozen. **Owns the shared `weft.toml` schema proposal.** |
| wardline | **pending** | clean-break `.wardline/`→`.weft/wardline/`; `doctor` updates its layout checks but **must not** write `weft.toml` or a sibling subtree. |
| charter | **pending (not installed)** | no live store / not installed; adopts on first store/install. |

---

## Consolidated matrix

`R` reference · `R†` reference-but-not-shipped · `✓` conforms · `…` pending · `—` exempt · `?` unknown

| Convention | filigree | loomweave | wardline | legis | charter |
|---|:--:|:--:|:--:|:--:|:--:|
| C-1 nested `.gitignore` | … | R | ✓ | ✓ | … |
| C-2 WAL checkpoint | … | R† | — | … | … |
| C-3 token via env | ✓ | R | ✓ | ✓ | — |
| C-4 managed-block contract | … | … | ✓ | … | — |
| C-5 `doctor` applies fixes | ✓ | R | ✓ | … | … |
| C-6 MCP envelope | … | … | … | … | R |
| C-7 401-vs-unreachable | ✓ | R | … | … | — |
| C-9 `.weft/`+`weft.toml` layout | … | … | … | R | … |

loomweave is the dominant reference member (C-1/C-2†/C-3/C-5/C-7); charter is the
C-6 reference; legis is the C-9 reference (member-private form). No member is reference
for C-4 (the unowned cross-tool gap) or for C-9's shared-key layout (hub-pending).
(C-8 — authority-key confinement — is reserved/proposed; see the C-3 carve-out.)

### Verification calibration (honest confidence)

The 2026-06-06 swarm extracted every cell from executable source, but **adversarial
re-derivation covered only the cells that became *survived calls*** — filigree C-1,
loomweave C-1/C-2/C-6, wardline C-6, legis C-6, charter C-6 (the reference
assignments and downgrades). Those are high-confidence. **Runtime-tier** cells
(exercised by a live run): filigree C-5, loomweave C-5/C-6, wardline C-5, charter
C-6. **Every other cell rests on a single extractor's `code`-tier evidence** — code
present in the cited build, not a live run; a `conforms` there means "the
implementing code is present," not "observed in shipped behaviour" (and `legis`'s
runtime tag is really a file-read — it has no `--version` and was not exercised
live). The bulk "promote every cell" move was *rejected* in verification for exactly
this reason; cells were applied individually at their stated tier and are
re-checkable against the cited `file:line`. Re-running the live tools per member
(campaign `weft-ab0a6555f5`) upgrades the `code`-tier cells to runtime.

## Member-owned findings (surfaced by the ground-truth pass — fixed in each repo, not here)

These are member-repo defects (their *own* docs disagree with their *own* code, or a
generated artifact drifted). The hub records them; each member owns the fix.

- **LW-1 (loomweave):** generated `.loomweave/.gitignore` excludes `loomweave.db`, but ADR-005 mandates it *tracked* — the generated artifact drifted from its `install.rs` template.
- **LW-2 (loomweave):** `README.md`/`CHANGELOG` version drift — README says "v1.0.0 current" while the working branch's `Cargo.toml` is `1.1.0-rc2`; CHANGELOG orders `[1.0.0] 2026-06-05` above `[1.3.0]`.
- **WD-1 (wardline):** `README.md`/`ROADMAP.md` say "four policy rules / 0.3.0 shipped"; code has **20 rules** (`PY-WL-101..120`) at `1.0.0rc1`.
- **LG-1 (legis):** `README.md:9` says `1.0.0rc1` and "MCP forthcoming"; code is `1.0.0rc4` with the **13-tool MCP shipped**. No `--version` flag exists. `install`/`session-context` are rc4-only (installed rc3 lacks them).
- **CH-1 (charter):** not installed (no `charter` console script though `README.md:31` lists `charter --version`); README still calls Charter "the fifth **Loom** member" and points at a `Loom` hub (Loom→Weft rename not propagated); a review doc says "139 tests" vs 164 passing on `main`.
- **FL-1 (filigree):** mixed `loom`/`weft` naming in `dashboard_auth.py` docstrings + a contract fixture marked "DECLARED — implementation lands in Phase C1" for a route that **is** implemented and mounted.

## How a convention moves through its lifecycle

1. **Named** — added here with a rule, a *why*, and a named reference (or "none yet").
2. **Adopted** — members move `pending → conforms` on their own cadence; the cell
   records shipped behavior, not branch state.
3. **Settled** — when every non-exempt member is `conforms`/`reference`, the
   convention stays in the register as the audit record (conventions are not deleted
   when met, mirroring retired asterisks).

## Review triggers

Review when: a friction/ground-truth pass surfaces a new cross-cutting expectation
(name it `C-n`); a member ships a fix that moves a cell; a new member joins (seed its
column); or a convention reaches *settled*. Do **not** add a CI or runtime consumer
of this file (doctrine §6).
