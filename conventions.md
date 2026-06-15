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
  nested-`.gitignore` standard") and now ships its matching nested-ignore writer.

| Member | State | Evidence |
|---|---|---|
| loomweave | **reference** | on-disk `.weft/loomweave/.gitignore` complete; `git add -A --dry-run` stages nothing. The generated file excludes `loomweave.db` — this is **correct, not drift**: ADR-005's "tracked db" mandate was deliberately **reversed by C1 (`weft-d822a7de2d`)** and `install.rs:37,44` cites the reversal in-comment (`loomweave analyze` rebuilds the db, so excluding it keeps the consumer's tree clean for legis signing). Former finding LW-1 is therefore void — see LW-1 below. |
| filigree | **conforms** | `install.py:409` `FILIGREE_DIR_GITIGNORE` (marker `managed-by: filigree`) ships in the installed build; the whole `.weft/` is root-ignored with the nested ignore as the un-ignore safety net (verified first-principles 2026-06-09). Co-author of the suite-wide standard (`d4f8921`). |
| wardline | **conforms** | `.gitignore` excludes `findings.jsonl`, `.env`, `.mcp.json`, agent docs; live secret/db/lock leak test passes. *Minor:* section comments, not the full durable-vs-ephemeral header; owns no live DB dot-dir. |
| legis | **conforms** | ignores its runtime artifacts; no live db/credential stages. (runtime tier) |
| charter | **exempt** | outside the four-app launch envelope and not installed as a launch-controlled member; if Charter is re-admitted, add a fresh installed-build C-1 row instead of carrying this placeholder. |

### C-2 — SQLite WAL checkpoint hygiene

- **Rule:** any member with a SQLite store checkpoints the WAL on idle and/or exposes
  a `snapshot`/`export` verb that checkpoints first, so the `.db` on disk is a
  reliable point-in-time artifact.
- **Reference:** **loomweave †** — first member to ship checkpoint-on-snapshot.

| Member | State | Evidence |
|---|---|---|
| loomweave | **reference †** | `writer.rs:394` `checkpoint_truncate` issues `PRAGMA wal_checkpoint(TRUNCATE)` at the run-commit boundary + `db.rs:32` backup verb. **On `rc/1.1.0-rc2` only — released v1.0.0 has no checkpoint**, so the large-WAL hazard still holds on the shipped build. |
| filigree | **conforms** | `checkpoint_wal()` runs `PRAGMA wal_checkpoint(TRUNCATE)` with busy/frame/WAL-byte reporting (`core.py:2394-2435`); CLI `db checkpoint --json` calls it (`cli_commands/admin.py:1038-1060`); MCP `checkpoint_db` exposes the same maintenance verb (`mcp_tools/meta.py:376-384`, `:959-964`). Tests cover idle truncation and busy reporting at core/CLI/MCP layers. Installed check 2026-06-13 after uv-tool reinstall from `/home/john/filigree`: `~/.local/bin/filigree db checkpoint --help` succeeds, and a fresh temp project `filigree init` followed by `filigree db checkpoint --json` returned `status:"checkpointed"` with `wal_size_after:0`. |
| wardline | **exempt** | no SQLite store (`grep sqlite3 src/` = none); outputs are `findings.jsonl` + YAML. |
| legis | **pending** | SQLite-backed audit store sets `PRAGMA journal_mode=WAL`, `synchronous=FULL`, and `busy_timeout` (`store/audit_store.py:78-83`) but has no checkpoint/snapshot/export checkpoint surface (`rg wal_checkpoint|checkpoint_wal|checkpoint_db` over `src/ tests/` returns none). |
| charter | **exempt** | outside the four-app launch envelope and no installed launch-controlled SQLite store was admitted for this verification. |

### C-3 — Tokens via `${ENV}` / `token_env`, never literals

- **Rule:** every **plumbing** token (federation/coordination connectivity) references
  an environment variable; shipped config / `.mcp.json` templates reference `${TOKEN}`,
  never a literal. **The federation loopback token's canonical name is
  `WEFT_FEDERATION_TOKEN`** (decided 2026-06-07) — it guards the `weft` HTTP generation,
  so it is federation-scoped, *not* a member-named token. It **supersedes**
  `FILIGREE_API_TOKEN` and `FILIGREE_FEDERATION_API_TOKEN` (now deprecated **fallback
  aliases** for the transition) and supersedes issue `filigree-3ee7250b54`'s
  `FILIGREE_API_TOKEN` choice. See [conflict-register.md](./conflict-register.md) §A-13.
- **Literal carve-out — host-local agent-transport config (DECIDED 2026-06-07).** The
  one place a *literal* is permitted: the **auto-provisioned loopback federation token**
  written into **host-local agent-transport config** — specifically `.mcp.json`
  **streamable-http** `Authorization` headers, which the agent runtime can only populate
  by `${ENV}` expansion or a literal (it cannot read the `.weft/` token file). Because
  this token is **deconfliction plumbing, not a secret**, and because the `${ENV}`
  indirection is *itself* the unset→silent-401 deconfliction-failure vector (the lacuna
  failure C-3's own "Why" cites), `install` / `doctor --fix` MAY write the resolved
  literal there by default — **provided `doctor` detects host-drift** (a header literal
  ≠ the locally-resolvable token → flag + `--fix` re-localizes; this is C-7's honest-
  failure principle applied to the literal, and it is what makes the literal safe to
  ship in a git-tracked file). **stdio** entries carry no token and are untouched. This
  does **not** loosen the rule for operator secrets, cross-environment configs, or
  authority keys (the carve-out below). See [conflict-register.md](./conflict-register.md) §A-15.
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
- **Reference (literal/auto-mint facet):** **filigree** — `federation_token.py` 3-tier
  resolution (`$WEFT_FEDERATION_TOKEN` override → auto-minted `0600`
  `<.weft/filigree>/federation_token` → off) makes federation auth on-by-default with
  zero ceremony for same-host siblings; `install`/`doctor --fix` write the resolved
  literal into streamable-http `.mcp.json` headers per the carve-out.

| Member | State | Evidence |
|---|---|---|
| loomweave | **reference** | `config.rs` defaults `token_env`; refuses unauthenticated HTTP on a routable interface if `${token_env}` is unset; literal creds only under `#[cfg(test)]`. |
| filigree | **conforms (installed rc6)** | `WEFT_FEDERATION_TOKEN` canonical (fallbacks `FILIGREE_FEDERATION_API_TOKEN` / `FILIGREE_API_TOKEN`), `hmac.compare_digest`. **`federation_token.py` 3-tier auto-mint** (env → `0600 .weft/filigree/federation_token` → off) is the literal/auto-mint reference; `install`/`doctor --fix` write the resolved literal into streamable-http `.mcp.json` headers (the §A-15 carve-out), gated by a doctor host-drift check. Code-verified live in installed rc6, 2026-06-07. |
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
  - **(i) Stable writer identity** — each rendered block records the tool/command
    that last wrote the block, without timestamps or per-run values that would
    break idempotency.

  A single command must restore all blocks; a write must never empty the file.
- **Reference:** **loomweave's current `instructions.rs` is the exemplar**, with
  Filigree, Legis, and Wardline now fixed to the same contract in their local
  writers. The cross-tool investigation (filigree issue `filigree-bcbd4d66fd`)
  originally found Filigree and Legis both (i) **truncate-to-EOF** on a missing
  own end-marker and (ii) **swallow a sandwiched sibling block**; Wardline also
  (iii) wrote **non-atomically** and could **swallow a foreign block** across an
  unclosed own-open. The normative rule above records the corrected contract, not
  a pre-existing property of those implementations: Filigree and Legis moved from
  violating to fixed, Wardline hardened the crash/truncation path, and Loomweave
  supplies the line-anchored reference implementation. Source-verified against the
  fetched member repos on 2026-06-12: Filigree `release/3.0.0` (`3.0.0rc12`),
  Legis `rc5` / `1.0.0`, Wardline `rc5`, and Loomweave `rc4` / `1.1.0-rc4`.
  **The C-4 conformance leg of the gate (`weft-eb3dee402f`) is met for those
  channels.** If a post-launch trunk differs from these branches, the forward-port
  must carry the same C-4 invariants.

| Member | State | Evidence |
|---|---|---|
| filigree | **conforming (fixed)** (`release/3.0.0`, package `3.0.0rc12`) | `src/filigree/install.py` implements the shared contract: `_INSTR_FENCE_RE` recognises namespaced fences with `[A-Za-z0-9_-]+` and case-insensitive comparison (`:125-146`); `_atomic_write_text` uses temp+`os.replace` and refuses empty/whitespace payloads (`:186-224`); `inject_instructions` bounds replacement at the first foreign fence or EOF, preserves tail bytes, appends when no own marker exists, and surfaces an own duplicate that cannot be canonicalised without crossing a foreign block (`:302-360`). SessionStart freshness runs through the same injector (`hooks.py:216-239`). This is a **fixed** state, not proof the earlier certified cell was ever conforming. |
| wardline | **conforming (fixed)** (`rc5`) — `src/wardline/install/block.py` | Module-level contract text states the C-4 constraints (`:1-11`). The implementation uses a case-insensitive namespace detector (`:53-60`), `_first_real_foreign_block_pos` and `_first_own_open_fence_pos` to avoid quoted markers and foreign spans (`:71-121`), foreign-safe own-duplicate canonicalisation (`:124-137`), temp+`os.replace` with refuse-empty guard (`:140-175`), append-on-missing-end (`:195-211`), bounded recovery (`:213-235`), and explicit surfacing of duplicates shielded beyond a foreign block (`:237-253`). Prior non-atomic / sibling-swallow behavior is fixed in the current writer. |
| loomweave | **reference / conforms** (`rc4`, package `1.1.0-rc4`) | `crates/loomweave-cli/src/instructions.rs` is the line-anchored reference: it documents coexistence as the point of the writer (`:11-20`), parses fences by namespace charset `[A-Za-z0-9_-]+` with case-insensitive comparison (`:219-247`), only finds top-level own opens (`:292-316`), bounds malformed recovery at real foreign blocks (`:269-290`), classifies stale duplicate own blocks as a doctor problem (`:86-118`, `:168-199`), and removes only complete own blocks in foreign-free spans (`:334-360`). It is wired into `install --instructions` / `doctor` through `install.rs`. |
| legis | **conforming (fixed)** (`rc5`, package `1.0.0`) | `src/legis/install.py` mirrors the fixed Filigree contract: `_INSTR_FENCE_RE` recognises namespaced fences with `[A-Za-z0-9_-]+` and case-insensitive comparison (`:41-62`); `_first_own_open_fence_pos` ignores own markers quoted inside foreign blocks (`:65-89`); `_instructions_block_is_current` uses the same foreign-aware bounds (`:222-242`); `_atomic_write_text` refuses empty payloads and uses temp+`os.replace` (`:277-307`); `inject_instructions` creates/updates/appends without crossing a foreign fence and leaves shielded own duplicates for manual resolution (`:310-386`). The `tests/test_install.py` coverage includes sandwich, uppercase sibling, quoted-marker, bounded-recovery idempotency, empty-file create, CRLF, duplicate, and refuse-empty cases. |
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
| legis | **conforms** | Installed `legis 1.0.0` ships `doctor --fix --format json`; a temporary empty-project run on 2026-06-13 repaired every installable check (`CLAUDE.md`, `AGENTS.md`, both skill packs, SessionStart hook, `.gitignore`, `.mcp.json`, and store dir) and returned `ok: true`, leaving only non-repairable runtime enablement warnings. Source path: `doctor.py:619-648` threads `repair=True` through the safe repair checks; `doctor.py:172-278` shows the instruction/skill/hook/gitignore repair branches. |
| charter | **exempt** | outside the four-app launch envelope and not installed as a launch-controlled member; C-5 should be re-evaluated if Charter is admitted. |

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
| wardline | **conforms (source)** | `core/filigree_emit.py` now separates auth-rejected (`401`/`403` or token-sent authorization failure) from transport/unreachable errors; the old "could not reach Filigree" collapse is stale. Source-verified 2026-06-12. |
| legis | **pending** | Outbound HTTP helpers preserve HTTP status vs transport exceptions (`filigree/client.py:105-110`, `enforcement/llm_client.py:110-117`), but no C-7-specific actionable "401/403 means token/auth, URLError means unreachable" diagnostic surface is verified for agent-facing cross-tool calls yet. |
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
    member reads — are **hub-pinned but partially shipped ahead of the hub**: Loomweave
    already reads `[filigree].url` as one rung in its Filigree endpoint precedence. The
    final shared-key layout remains tracked by `weft-a2f4cf95c7`; new members should
    treat existing shipped keys as compatibility facts, not a blank cheque to invent
    parallel `[<member>.<sibling>]` layouts.
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
  precedence) is **partially shipped but not fully blessed**: Loomweave reads
  `WEFT_FILIGREE_URL` → `weft.toml [filigree].url` → `.weft/filigree/ephemeral.port`
  → local config. The hub still owns the general schema decision.
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
| legis | **reference (member-private form)** | `src/legis/config.py`: stores resolve under `.weft/legis/`; `[legis].store_dir` is read-only from `weft.toml`; absent/section-less/malformed falls back to built-in defaults; signing keys stay outside the shared namespace. |
| filigree | **conforms** | canonical store is `.weft/filigree` with legacy `.filigree` fallback and explicit migration via init/install; token file auto-mint lives under the resolved store dir. Source-verified 2026-06-12 on `release/3.0.0` / `3.0.0rc12`. |
| loomweave | **conforms (ahead on shared-key usage)** | canonical store is `.weft/loomweave` with no `.loomweave` fallback; `[loomweave].store_dir` is read-only. Filigree endpoint precedence is `WEFT_FILIGREE_URL` → `[filigree].url` in `weft.toml` → `.weft/filigree/ephemeral.port` → local config, so the shared endpoint key is already shipped but still needs hub blessing as the general pattern. |
| wardline | **conforms (source)** | clean-break `.weft/wardline/` layout; reads `weft.toml [wardline]` for its own local config, never writes `weft.toml` or sibling subtrees. Source-verified on rc5 branch; package version still reports v1.0.0rc4. |
| charter | **pending / local core only** | v0.1.0 has a local domain core and read-only MCP surface; no live federation store/adapters yet. |

### C-10 — Honest federation seams: report scope, provenance, and config-state; no silent success

- **Rule.** A cross-member operation (emit, scan, gate, govern, promote) MUST be honest
  about its own effect:
  - **(a) Effective scope/destination.** The response echoes *where the side effect
    landed* (which project/store), so a misroute cannot read as success. (N1, `weft-7a399b8124`.)
  - **(b) Payload provenance.** Suppression/baseline/severity truth is carried *across*
    the seam, so an accepted/baselined defect is not reborn as fresh urgent work on the
    other side. (N2, `weft-171fc22a50`.)
  - **(c) Config-state.** An unconfigured/disabled capability says so, with the
    enablement path — it never presents an inert surface as functional. (N3, `weft-df8d2ef454`.)
  - **(d) No vacuous green / no silent success.** A `pass`/`ok`/2xx that evaluated no
    threshold or wrote nowhere meaningful declares `NOT_EVALUATED` / names what it did;
    it must not read as success. (W2, `weft-b937e53854`.)
- **Why.** The **agentic-first corollary of C-7** (which distinguishes *failure* modes),
  generalised to *success* reporting. An agent reasons from what the tool tells it, so a
  seam silent or dishonest about its own effect/scope/config produces *confidently-wrong*
  behaviour — the exact deconfliction failure the suite exists to prevent, moved up to
  the reasoning layer. Named from the dogfood-#2 throughline ("the plumbing works but the
  federation is quiet about itself").
- **Reference:** **none yet** — a cross-cutting gap (like C-4 at naming). Partial facets:
  loomweave's honest-empty `result_kind` tri-state + the C-7 ladder are (a)/(d)-adjacent;
  charter's C-6 envelope (`meta.producer`, honest-empty) is the closest discipline.

| Member | State | Evidence |
|---|---|---|
| filigree | **conforms** | unscoped writes fail closed (400, no default-project fallback) + `X-Filigree-Project` echo (R1, `dashboard.py:889-900`); finding→issue status surfaced via LEFT JOIN (N6, `weft-c815d5e77d` closed); F2 un-bridged-findings line in session-context (count predicate reads the new `suppression_state` key — dogfood-3 confirmed it self-heals on re-scan; the "0 baselined" miscount was a clean-break transition artifact, not a code defect). Verified 2026-06-09. **Residuals (tracked):** classic-router/ADR-029 writes outside the fail-closed set (`weft-eff938d3b6`); baselined findings still land `status:open` and `finding_list` lacks a suppression filter (N2 `weft-171fc22a50`, filter-gap `weft-d7273d61e3`). |
| wardline | **conforms** | destination echo block names where it posted + `project_pinned` (N1, `core/filigree_emit.py:84-111`); honest gate `verdict=NOT_EVALUATED` is unrepresentable-as-PASSED (W2, `core/run.py:93-140`, `weft-b937e53854`). Verified 2026-06-09. **Residual (tracked):** echoes the *pinned* not the daemon-*resolved* project (`weft-eff938d3b6`); N2 suppression-carry residual (`weft-171fc22a50`). |
| loomweave | **conforms** | `WORKTREE_DIRTY_NOTE` emitted on every status path documenting the un-indexed-untracked source scope + the `staleness==fresh` gate guidance (N5, `tools/status.rs:22-37`); honest-empty `result_kind` tri-state. Verified 2026-06-09. |
| legis | **conforms** | `legis doctor` report-only checks name each enablement path + `_recovery_for` next_actions for `CELL_NOT_ENABLED`/`INVALID_CELL_SPEC` (N3, `weft-df8d2ef454` closed; inert-by-default is by-design, C-8). N4 was **MISDIAGNOSED** — the default keyless posture *governs* a dirty tree (stamped `artifact_status=dirty`), never refuses (`ingest.py:204-216`, `weft-a7a92a40dd` closed). Verified 2026-06-09. **Residual (tracked):** `check_binding_ledger` (`weft-a92805f4cf`); `scan_route` description (`weft-1e7eeec1b6`). |
| charter | **pending** | no cross-member side-effect surface yet; its C-6 envelope discipline is the nearest exemplar to generalise from. |

### C-11 — Config-write discipline: write only consumed config, working out of the box, single-owner

- **Rule (NORMATIVE).** When a tool **writes, generates, or manages** a config file (the
  installed/generated/managed surface — not operator-authored input), it MUST obey:
  - **(a) No orphan writes.** Write a config only if the writer itself or a **named** consumer
    reads it. A tool never emits a config no one consumes. *(Motivating case: loomweave wrote a
    `wardline.yaml` no tool read — removed in `f9854f0`, 2026-06-10; the later
    loomweave `config.json` stub finding is fixed by `weft-da23c1f6bd`.)*
  - **(b) Works out of the box.** A freshly written config is functional **as written** — the
    consuming path works with no manual repair. Generating a config that must be hand-fixed to
    be read is a defect. *(Motivating case: wardline holds the works-on-write bar for the config
    it writes; cf. the emit-topology drift `weft-7436c1959e` (G5), where shipped emit config did
    not reach the daemon.)*
  - **(c) Single writer, no sibling writes.** Each config has exactly one owning writer; a tool
    never writes into a sibling member's config subtree. *(Already partially held: wardline
    "never writes `weft.toml`/sibling subtree", C-9.)*
- **Why.** A config nobody reads is dead weight that drifts silently and misleads the next agent
  into reading a seam as wired when it is not; a config that needs hand-repair pushes the failure
  onto the operator/agent and breaks the agentic-first "works on write" expectation; cross-writes
  reintroduce the multi-owner-destruction hazard C-4 closes for agent docs. This is the
  **config-surface sibling of C-4** (managed-doc blocks) and **C-9** (where config lives) — those
  cover *agent docs* and *store layout*; C-11 covers *what a tool may write as config and whether
  it works*. Named from two 2026-06-10 ground-truth learnings.
- **Reference: wardline** — earns the clause-(b) out-of-box bar for the config it writes
  (`core/filigree_emit.py` scoped emit + destination echo). Established by the config-write audit
  `weft-b683a56a20` → `pm/2026-06-10-config-write-audit.md` (source-read; F1 live-confirmed).
  Verdict: source layer substantially conforms, but the **installed build fails (b)** — the live
  lacuna emit URL is unscoped → server-mode daemon 400s → findings don't land (F1 = the G5 defect
  class `weft-7436c1959e`, now live-root-caused), and loomweave carries a clause-(a) regression.

| Member | State | Evidence |
|---|---|---|
| wardline | **reference** | clause (b) earned for what it writes; the live G5 misroute is a *loomweave-side* write of wardline's URL, not wardline's own. Audit `weft-b683a56a20`. |
| filigree | **conforms** | every config writer self-scopes to its own key (`register_project`/server.json). **Gap (F4, folded into G5):** the server-mode store carries no `mode`/`prefix` marker the loomweave scope-probe expects — the "am I server-mode?" contract is unwritten (`weft-7436c1959e`). |
| legis | **conforms** | config writers self-scoped; reads `weft.toml` read-only. Audit `weft-b683a56a20`. |
| loomweave | **pending** | Clause (a) is fixed: `install.rs:461-469` no longer writes the dead `.weft/loomweave/config.json` stub, and the install regression asserts it stays absent (`crates/loomweave-cli/tests/install.rs:38-43`). Remaining pending item is clause (b), the write defect behind F1/G5 (emits wardline's emit URL unscoped). |
| charter | **exempt** | no generated cross-member config surface. |

### C-12 — One status/freshness oracle per question; every other surface derives or defers by name

- **Rule (NORMATIVE).** For each status *question* a member answers — "is the index
  fresh?", "is this seam configured?", "what is blocked?" — the member designates
  **exactly one authoritative verdict surface**. Every other tool/endpoint/hook that
  mentions the same question either **derives its answer from the authority** (same
  code path, not a parallel reimplementation) or **defers to it by name** ("see
  `index_diff_get` for the authoritative verdict"). Two surfaces answering the same
  question from different code paths is a defect even when they currently agree.
- **Why.** An agent reasons from whichever surface it happens to call first; two
  contradictory oracles produce *confidently-wrong* behaviour with no error to catch
  (dogfood-4 B1: loomweave's `project_status_get` said **stale** while
  `index_diff_get` said **fresh** at the same instant; B8: wardline's `doctor` said
  *not configured* while the runtime seam was wired; B3: filigree's `stats_get`
  and `work_blocked` disagreed on the blocked count). This is the hub's own
  authority model (weft owns interop, points elsewhere for member facts —
  doctrine §8) applied **at the tool level**, and the status-surface sibling of
  C-10 (honest seams): C-10 makes one surface honest, C-12 makes the *set* of
  surfaces coherent. Named from dogfood-4 recommendation #2 (`weft-76abb3553e`).
- **Reference:** **loomweave ✓† (freshness question)** — its B1 fix deleted the second
  detector and rebuilt every status surface to derive from or defer to
  `index_diff_get`, the fullest C-12 shape shipped so far. The filigree/wardline
  cells are single-question repairs; no member has swept *all* its question-pairs.

| Member | State | Evidence |
|---|---|---|
| filigree | **conforms ✓† (blocked-count question)** | `db_meta.py get_stats` blocked_count now reuses `get_blocked`'s not-done predicate (same `_category_predicate_sql` path, not a parallel query) — B3 fix `weft-ecc7c34255`, source+installed-verified on `release/3.0.0` 3.0.0rc12 (2026-06-12/13, unmerged to main). Other question-pairs unswept. |
| wardline | **conforms ✓† (config question)** | `install/doctor.py:175-190` reports the *effective* runtime config with provenance ("from `--{key}-url` launch flag" / "from env" / "not configured"), threaded from the same values the runtime uses — B8 fix `weft-dc7b805dc4`, rc5, source-verified 2026-06-12. Other question-pairs unswept. |
| loomweave | **reference ✓† (freshness question)** | B1 fixed (`weft-4165f1ed71`, rc4 wave 2026-06-13): the second detector was **deleted** — `index_diff::compute_freshness` is the single oracle; `project_snapshot`/status/orientation/context/SessionStart hook all *derive from the oracle's code path*, and status notes *defer to `index_diff_get` by name*. The fullest C-12 shape shipped so far (derivation AND deferral); reference for the freshness question. Unmerged (rc4). |
| legis | **unknown** | `doctor_get` exists alongside gate/check surfaces; single-oracle coherence not yet examined firsthand. |
| charter | **exempt** | no freshness/staleness surface yet (local core + read-only MCP). |

### C-13 — Fail-degraded, never fail-dead: one hostile file never kills a run

- **Rule (NORMATIVE).** A member tool that walks or parses project source MUST NOT
  hard-fail the whole run on one hostile input (pathological nesting, huge
  expression chains, undecodable bytes). Per file: **skip + flag + continue** —
  the file is skipped, the skip is flagged *in-band* as a named marker the consumer
  can see (a finding / `parse_status` value such as `too_complex`, never only a log
  line), and the run completes over the remaining files. The result envelope makes
  the degraded scope visible (count + which files), per C-10(a). **Adoption
  includes a hostile-input fixture** (a `nesting_bomb.py`-class corpus file) in the
  member's own test suite; the cross-member conformance-harness case is owned by
  GS-7 (`weft-1e053eac02`).
- **Why.** A dogfood specimen file took down legis's entire `policy-boundary-check`
  with an uncaught `RecursionError` (dogfood-4 A2) while loomweave's extractor
  degraded the *same class* of input to a per-file `LMWV-PY-TOO-COMPLEX` finding
  and kept going. For a deconfliction suite, a tool that dies on file 37 of 400
  silently un-governs the other 363 — fail-dead converts one hostile file into a
  whole-run availability loss, which is strictly worse than one honestly-flagged
  gap. Named from dogfood-4 recommendation #3 (`weft-b181c75e39`).
- **Reference:** **loomweave** — `plugins/python/src/loomweave_plugin_python/extractor.py`
  degrades deep nesting / oversized expressions to `too_complex` with in-band
  markers instead of escaping `RecursionError` (`d5baac5`), with fixture coverage
  in `plugins/python/tests/test_extractor.py`.

| Member | State | Evidence |
|---|---|---|
| loomweave | **reference** | per-file `too_complex` degrade in the python-plugin extractor (`d5baac5`); fixtures in `test_extractor.py`; host accepts `parse_status` rides without changes. |
| legis | **conforms ✓†** | `policy/boundary_scan.py:58-80` wraps both `ast.parse` and the visitor walk per file; `RecursionError` → `POLICY_BOUNDARY_FILE_TOO_COMPLEX` finding ("file skipped, scan continued") — A2 fix `weft-9784d0e654`, rc5, live-verified against lacuna's `nesting_bomb.py` 2026-06-12; regression fixture (20 000-term BinOp chain) in `tests/policy/test_boundary_scan.py`. |
| wardline | **conforms ✓† (tested)** | already conformed — per-file isolation in `scanner/pipeline.py:178-235` (parse `RecursionError` → `WLN-ENGINE-FILE-SKIPPED`, `SyntaxError` → `WLN-ENGINE-PARSE-ERROR`) + per-entity/per-rule isolation in `scanner/analyzer.py:681/819`; proven 2026-06-13 by the new hostile-corpus fixture `tests/conformance/test_hostile_input_degrade.py` (600-deep nesting + 20 000-term BinOp bombs: run completes, in-band ERROR marker per hostile file, healthy neighbour findings still reported, degraded scope in `summary.unanalyzed`). rc5, unmerged. |
| filigree | **exempt** | no in-process source parsing (no `ast` import in `src/filigree/`); scanners delegate to external agent processes whose failures are per-scan, not per-run. |
| charter | **exempt** | no source-walking surface. |

### C-14 — System-command lifecycle: `init` / `install` / `doctor` / `doctor --fix` verb contract

- **Rule.** Every member exposes a common operator/agent lifecycle with fixed verb
  semantics, so blast radius is legible from the verb alone:
  - **`init` — one-way changes.** A once-off (first setup) or once-at-upgrade step
    performing irreversible / non-idempotent work (schema migration, a one-time hook
    install, a backfill). NOT safe to re-run blindly; gated to setup or an explicit
    upgrade boundary. **Conditional:** a member ships `init` only if it has one-way
    work — a member with none needs no `init`.
  - **`install` — benign, idempotent changes.** Re-runnable and convergent:
    (re)inject the member's managed instruction block (C-4), (re)install/refresh its
    skill pack, refresh/register its MCP server in `.mcp.json`, ensure `.gitignore`
    (C-1/C-9). Safe to run repeatedly; this IS the drift-repair path. Writes only its
    own consumed config (C-11), never a sibling's block (C-4).
  - **`doctor` — read-only diagnosis.** Surfaces config errors of any kind (missing
    or drifted instruction block / skill, unregistered hook, missing gitignore,
    mislocated store, unparseable config, unreachable sibling). Never mutates.
  - **`doctor --fix` — automated repair of the reasonable subset (C-5).** Applies
    every fix that can be reasonably automated; leaves genuinely out-of-band items
    reported-but-unfixed (runtime enablement, secrets, operator config), naming the
    manual action rather than silently passing.
- **Security posture — insecure by design.** These verbs write to the working tree,
  install git hooks, and register MCP servers, trusting whoever runs them. None
  authenticates its caller, sandboxes what it writes, or verifies provenance of the
  content it injects. They are an orientation/convenience surface, **not a security
  boundary** — consistent with the suite's deconfliction-first, "barely IRAP" posture
  ([[weft-deconfliction-not-security]]). An operator running `install` / `doctor
  --fix` is trusted; the commands assume a non-hostile local environment. Anything
  that would need a real trust boundary (capability confinement) is tracked separately
  (proposed C-8), not provided here.
- **Why.** A predictable verb contract lets an agent reason about reversibility
  without reading each member's CLI: `install` / `doctor` / `doctor --fix` are always
  safe to re-run; only `init` is one-way. It fences the dangerous operation behind one
  named verb instead of scattering irreversibility across the surface.
- **Relation to other cells.** C-14 is the *lifecycle/verb* layer over the *mechanical*
  cells: C-1 (gitignore), C-4 (managed-block injection `install` performs), C-5 (the
  `--fix` subset), C-9 (where `init`/`install` may write state), C-11 (config-write
  discipline). Those say *how* a write is done safely; C-14 says *which verb owns it*.
- **Reference: legis** — full verb contract code-verified 2026-06-13.

| Member | State | Evidence |
|---|---|---|
| legis | **reference** | code-verified 2026-06-13: idempotent `install` (a re-run on an empty project repaired every installable check and returned `ok: true`) + read-only `doctor` + `doctor --fix` (C-5 subset, `doctor.py:619-648`). One-way ops are a separate named migration (`sei-backfill`), not folded into `install` — the init/install split made explicit. No literal `init` (no one-way *setup* step). |
| loomweave | **conforms** | C-5 reference for `doctor --fix` (applied skill pack + SessionStart hook + `.mcp.json` merge + bindings); ships `init`/`install`. Verb-split not independently re-audited in this cell. |
| filigree | **conforms** | `install` proven benign+idempotent: injected `filigree:instructions:v3.0.0rc12:65e6fb25` (+ `filigree:last-writer:filigree install`) into a shared multi-owner `CLAUDE.md` without harming siblings; `doctor --fix` per C-5. |
| wardline | **conforms** | `install` injected `wardline:instructions:v1:bcd19330` via the C-4-conforming writer; `doctor` repair path per C-5. |
| warpline | **conforms** | hub sign-off 2026-06-13 via an **independent** throwaway-repo run (not the member's own fixtures): `install` injected `warpline:instructions:v0.1.0` into a 3-sibling `CLAUDE.md` with the filigree/loomweave/wardline blocks **byte-intact** through install, re-install (idempotent — 1 fence), and `--fix`; full artifact set landed (skill → `.claude`+`.agents`, SessionStart + post-commit hooks, `.gitignore` `.weft/`, `.mcp.json` stdio, `.weft/warpline/{config.json,INSTALL_VERSION}`); `doctor` → `warpline.doctor.v1`, 10 checks, exit 0 installed / exit 1 + honest `CLAUDE.md missing warpline:instructions block` when broken / `--fix` repairs without touching siblings. Ships `init` (one-way post-commit hook). **Minor (non-blocking):** the marker is version-only (`:v0.1.0`, no content-hash) → drift detection is version-gated, weaker than the legis/filigree `:v{ver}:{hash}` reference; `install` also writes user-global `~/.codex/config.toml` (marker-delimited, idempotent — within C-14's insecure-by-design trust model). |
| charter | **exempt** | outside the four-app launch envelope. |

### X-1 — Interim agent identity handoff register

**Interim — superseded by A′ (PDR-0005) when the continuity layer ships.** This
cell records today's handoff rule only; it does not mint a durable run id, add
member work, or weaken the A′ direction. Until A′ replaces free-text identities with
a continuity handle, use one stable line-of-effort string for the task (for example,
the active agent handle) and carry it only through identity surfaces the member
actually exposes. Do not invent an identity field on a surface that lacks one.

| Member | Current identity surface | Binding time | What crosses the seam now |
|---|---|---|---|
| filigree | **Per-call** `--actor` for audit trail plus `--assignee` for work ownership; atomic `start-work`/`start-next-work` binds the claim and transition in one operation. MCP write tools expose the same actor/assignee distinction where applicable. | Each write call. | Reuse the same line-of-effort string for `--actor`; use the same value for `--assignee` when the agent owns the work item. When handing from another tool back to Filigree, preserve that string instead of switching names mid-task. |
| legis | **Launch-bound** MCP `--agent-id`; MCP tool schemas deliberately do not accept a caller-supplied `agent_id`. HTTP/API write routes may record authenticated token actors or body `agent_id`/`operator_id`, but the agent-facing MCP identity is fixed at server launch. | MCP server launch. | Launch Legis MCP with the same line-of-effort string used as Filigree `--actor`/`--assignee` for the task. Governance records then attribute MCP-originated decisions to that launch-bound id; human/operator sign-offs remain operator identity, not agent carry-over. |
| wardline | No general caller identity flag on the main CLI/MCP scan surfaces. Wardline has scanner/provenance identity fields for artifacts and SEI/content identity for findings/entities, but not an agent actor identity equivalent to Filigree or Legis MCP. | Not locally bound for normal scans. | Carry the task identity in the surrounding Filigree issue/Legis governance context. Do not stamp a synthetic Wardline actor into findings merely to bridge the gap. |
| loomweave | No general caller identity flag on `install`, `analyze`, `serve`, or MCP startup. Loomweave is the code/entity identity authority (SEI), not today's agent-actor authority. | Not locally bound for normal analysis/serve. | Carry the task identity in the surrounding Filigree issue/Legis governance context; keep Loomweave identity fields reserved for code entities and SEI lineage. |
| charter | Exempt in the current matrix: local core/read-only MCP surface, no shipped cross-member write workflow that needs an agent handoff yet. | N/A | If Charter gains a write/governance surface before A′, add it here rather than borrowing another member's identity semantics. |

### C-15 — The honesty invariant: every non-clean result carries `cause + reason_class + fix`

- **Rule (NORMATIVE — the protected invariant, PDR-0023).** Any cross-member result
  that is **not** a clean, complete true-negative MUST carry a three-part honesty
  carrier `{ reason_class, cause, fix }`. A clean result carries
  `reason_class: "clean"` and omits `cause`/`fix`. `reason_class` is drawn from the
  **canonical 11** (`clean`, `disabled`, `unresolved_input`, `rejected`, `dead_path`,
  `unreachable`, `misrouted`, `error`, `scheme_mismatch`, `stale`, `partial`).
  `fix` is mandatory on every non-`clean` result — **recruit, don't just confess**
  (the lead-summary discipline): name the action that gets the caller what they wanted.
  An empty/partial/stale result that is byte-indistinguishable from a real
  true-negative is a **confident-empty** — the federation's worst failure mode, because
  the lie becomes the premise of the next decision.
- **Why.** This is the **moat-guard** (PDR-0023 consequence 2; the 2026-06-15 external
  cold-eval named provenance-honesty "your most underrated asset … the reason I trusted
  the answers"). It is the **banner that subsumes** the proto-honesty cells: C-6
  (honest-empty `result_kind`), C-7 (unreachable-vs-auth), C-10 (honest seams: scope /
  provenance / config-state / no-vacuous-green), and C-12 (one oracle per question) are
  all facets of "no result without its provenance." C-15 names the invariant they were
  circling and pins the *vocabulary* they emit it in.
- **Contract home (no shared runtime dep).** The canonical list is the hub contract
  [contracts/weft-reason-vocab.json](./contracts/weft-reason-vocab.json) +
  [pm/2026-06-15-weft-reason-contract-G1.md](./pm/2026-06-15-weft-reason-contract-G1.md);
  members conform by a **per-member conformance TEST** asserting their reason surface
  against it (the shared vector IS `weft-e295ec3be3` Part 1). Indexed as a federation
  contract at [contracts-index.md](./contracts-index.md) §0.
- **Rollout is staged (cells below grade against the staged target, not a single shock).**
  The **value vocabulary** (the 11 strings) is standardized now, additive/non-breaking.
  The **full carrier triple** converges with **G3** (loomweave typed output) and, for
  filigree, inside the **held `3.0.0`**. Do not re-break shipped work to land it.
- **Reference: warpline** — its 2026-06-15 "make the quiet segfault loud" strike
  (`281460e`) downgrades a stale snapshot off completeness, returns a resolved/unresolved
  miss-set instead of a silent drop, and honors-or-rejects its declared inputs; its G1
  conformance test (`a2c44e1`) locks the vocabulary. Reference for the *worst→fixed*
  trajectory the others must reach.

| Member | State | Evidence |
|---|---|---|
| warpline | **reference ✓† (vocab)** | `281460e fix(impact): make the quiet segfault loud — staleness, miss-set, dead-input` + `a2c44e1 test(reason): lock weft-reason G1 vocabulary conformance`; emits `reason_class` in `src/warpline/listing.py`; input-affordance honesty enforced by `assert_inputschema_consumed()` (`src/warpline/mcp.py`, the input-affordances-are-promises reference). Unmerged/just-landed. |
| loomweave | **conforms (vocab, status carrier)** | `analyze.rs` emits `reason_class` (`clean`/`disabled`/`error`/`unreachable`/`partial`) on the run-analysis carrier; honest-empty `result_kind` tri-state (the C-6 facet reference). Per-finding triple not yet universal (staged). |
| wardline | **conforms (vocab, failure carrier)** | `core/filigree_emit.py` `FailedFinding.to_wire()` emits `reason_class`; honest gate `verdict=NOT_EVALUATED` (C-10/W2). Per-finding triple staged. |
| legis | **conforms (vocab, status carrier)** | `wardline/ingest.py` maps `artifact_status`/`artifact_status_reason` to canonical `reason_class`. Staged. |
| filigree | **conforms (vocab, resolution carrier)** | `mcp_tools/issues.py` emits a `weft_reason` carrier with `reason_class` on entity-resolution failure (SEI-on-create path). Full carrier convergence is inside the held `3.0.0` (additive). |
| charter | **exempt** | no cross-member emit surface yet (local core + read-only MCP). |

> **Pending sibling conventions (roadmap — not yet registered as numbered cells).**
> The honesty banner has three ergonomics sub-clauses still to land here as full C-entries:
> **lead-summary** on count-returning tools (`pm/2026-06-15-lead-summary-convention.md`,
> reference impl loomweave `entity_dead_list`); **bounded-by-default / list-overflow-dump-to-file**
> (C-12 sibling, `weft-801d21fa4d`); and **input-affordances-are-promises** (reference impl
> warpline `assert_inputschema_consumed`). And a **speak-SEI-natively-at-entry** convention
> (data joins the spine as it enters — filigree `issue_create` SEI-on-create + loomweave
> guidance-append). See [pm/2026-06-15-federation-docs-maturation-plan.md](./pm/2026-06-15-federation-docs-maturation-plan.md) §5 (P1).

---

## Consolidated matrix

`R` reference · `R†` reference-but-not-shipped · `✓` conforms · `✓†` conforms in the installed/branch build, **unmerged to main (unreleased)** · `…` pending · `—` exempt · `?` unknown

> **C-9 + C-3 cells re-verified 2026-06-07** against the *installed* builds (lacuna's reinstalled suite), not just branch source. The `✓†` state records the recurring suite-wide fact the propagation P1s track: the work is live in the installed binary but the branch is **not merged to main / not released** (`weft-677779a3d0`/`-46f866cb85`/`-71ce4f8253`/`-9da517a67e`).

| Convention | filigree | loomweave | wardline | legis | charter |
|---|:--:|:--:|:--:|:--:|:--:|
| C-1 nested `.gitignore` | ✓ | R | ✓ | ✓ | — |
| C-2 WAL checkpoint | ✓ | R† | — | … | — |
| C-3 token via env | ✓ | R | ✓ | ✓ | — |
| C-4 managed-block contract | ✓ | R | ✓ | ✓ | — |
| C-5 `doctor` applies fixes | ✓ | R | ✓ | ✓ | — |
| C-6 MCP envelope | … | … | … | … | R |
| C-7 401-vs-unreachable | ✓ | R | ✓ | … | — |
| C-9 `.weft/`+`weft.toml` layout | ✓† | ✓† | ✓† | R | … |
| C-10 honest federation seams | … | … | … | … | … |
| C-11 config-write discipline | ✓ | … | R | ✓ | — |
| C-12 one status oracle | ✓† | R† | ✓† | ? | — |
| C-13 fail-degraded on hostile input | — | R | ✓† | ✓† | — |
| C-14 init/install/doctor verb contract | ✓ | ✓ | ✓ | R | — |
| X-1 interim agent identity handoff | ✓ | — | — | ✓ | — |

loomweave is the dominant reference member (C-1/C-2†/C-3/C-4/C-5/C-7/C-13); charter is
the C-6 reference; legis is the C-9 reference (member-private form). No member is
reference for C-9's shared-key layout (partially shipped, hub-pending), C-10
(the newly-named honest-seams bar — dogfood-#2's "works but quiet about itself" tier),
or C-12 (both motivating instances were violations; the ✓† cells are single-question
repairs). (C-8 — authority-key confinement — is reserved/proposed; see the C-3 carve-out.)

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
re-checkable against the cited `file:line`. The 2026-06-13 `weft-ab0a6555f5`
recheck replaced stale Filigree C-2 evidence with installed uv-tool verification
after reinstall and upgraded Legis C-5 from stale installed-rc3 `pending` to
runtime-verified `conforms`; remaining C-1..C-7 pending cells in the four-app
launch set are intentional backlog states, not unknown/unverified cells.

## Member-owned findings (surfaced by the ground-truth pass — fixed in each repo, not here)

These are member-repo defects (their *own* docs disagree with their *own* code, or a
generated artifact drifted). The hub records them; each member owns the fix.

- **LW-1 (loomweave): VOID (resolved 2026-06-09).** Was: generated `.gitignore` excludes `loomweave.db` against ADR-005's "tracked" mandate. That mandate was deliberately **reversed by C1 (`weft-d822a7de2d`)** — excluding the db keeps the consumer's tree clean so legis can sign. `install.rs:37,44` cites the reversal in-comment; the exclusion is now correct, not drift. No member action.
- **LW-2 (loomweave):** `README.md`/`CHANGELOG` version drift — README says "v1.0.0 current" while the working branch's `Cargo.toml` is `1.1.0-rc2`; CHANGELOG orders `[1.0.0] 2026-06-05` above `[1.3.0]`.
- **WD-1 (wardline):** `README.md`/`ROADMAP.md` say "four policy rules / 0.3.0 shipped"; code has **27 rules** (`PY-WL-003` + `PY-WL-101..126`) at `1.0.0rc4`.
- **LG-1 (legis):** `README.md:9` says `1.0.0rc1` and "MCP forthcoming"; code is `1.0.0rc4` with the **~22-tool MCP shipped**. No `--version` flag exists. `install`/`session-context` are rc4-only (installed rc3 lacks them).
- **CH-1 (charter):** local `uv` entrypoints exist (`charter`, `charter-mcp`), but no global install was observed; README/ADRs still carry legacy Loom/Clarion naming in places; a review doc says "139 tests" vs 164 passing on `main`.
- **FL-1 (filigree): VOID for the `loom` fixture claim (resolved 2026-06-12).** Source now uses `/api/weft/*` and `tests/fixtures/contracts/weft/scan-results.json`. Any remaining Filigree naming drift is member-owned docs cleanup, not a hub contract discrepancy.

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
