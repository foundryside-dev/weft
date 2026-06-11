# Weft suite-wide config-write audit — C-11 conformance

**Date:** 2026-06-10
**Ticket:** `weft-b683a56a20` (READ-ONLY config-write audit).
**Rubric:** conventions.md **C-11** — config-write discipline:
- **(a) No orphan writes** — write a config only if the writer or a *named* consumer reads it.
- **(b) Works out of the box** — a freshly written config is functional *as written*; the consuming path works with no manual repair.
- **(c) Single writer, no sibling writes** — each config has exactly one owning writer; a tool never writes into a sibling member's config subtree.

**Method:** writers were enumerated from executable source (every `fs::write` / `write_text` / `os.replace` / `json.dump` / `write_atomic` call across the five member repos + the hub), each written config traced to a *named consumer* in source, and the **installed** state cross-checked against `/home/john/lacuna` and `~/.config/filigree/`. Docs were not trusted (suite docs are known-drifted, [[weft-docs-have-drifted-ground-truth]]). Security-shaped findings were re-derived into functional/availability terms per the deconfliction-first lens ([[weft-deconfliction-not-security]]): a config nobody reads is a *dead/misleading seam*, a config that doesn't work on write is a *findings-don't-land availability* defect — not a breach.

---

## 1. Verdict

**The suite substantially conforms to C-11 at the *source* layer — every config writer scopes to its own key and the motivating orphan (`wardline.yaml`) is genuinely removed — but the suite fails C-11(b) *in the installed build*: the live lacuna emit topology writes wardline an UNSCOPED Filigree URL into a server-mode daemon that fail-closes it (400), so wardline findings do not land.** This is the same G5 (`weft-7436c1959e`) defect class the rubric names as the (b) exemplar failure, now confirmed *live* with its root cause localised (loomweave's server-mode detection keys on a `.weft/filigree/config.json` `mode` field that filigree never writes to that store). A second, lower-severity defect: **loomweave still writes an orphan `config.json` stub** into its own store that no loomweave code reads — the *same* clause-(a) pattern it just fixed for `wardline.yaml`, ironically committed as "durable." All other config writers (the daemon registry, the `.gitignore` family, the `.claude/settings.json` hooks, the per-member `.mcp.json` keys, the token files) are source-clean on (a)/(b)/(c).

**Severity counts:** **1 high** (F1 — live emit-misroute, clause b; maps to G5 `weft-7436c1959e`), **1 medium** (F2 — loomweave orphan `config.json` stub, clause a; UNTRACKED), **2 low** (F3 — `.mcp.json` two-writer overlap on the `wardline` key, clause c, benign-by-construction; F4 — filigree server-mode store lacks the `mode` marker loomweave reads, the (b) root cause, UNTRACKED), **0 critical**. No clause-(c) sibling-subtree violation exists: every member writes only its own store subtree and its own namespaced key in shared files.

---

## 2. Config inventory

Confidence: **[S]** = source-read (high, writer+consumer both read in source); **[I]** = inferred / installed-state only.

| config file | writer (file:line) | consumer(s) (file:line) | a | b | c | notes |
|---|---|---|:--:|:--:|:--:|---|
| `~/.config/filigree/server.json` (daemon project registry) | filigree `server.py:184` `write_server_config` ← `register_project:254` | filigree daemon/dashboard `dashboard.py:12` reads it; `read_server_config` `server.py:132` **[S]** | ✓ | ✓ | ✓ | Single writer (filigree, locked rmw `server.py:223`). Live file (Jun-10 07:52) lists all 4 members on `.weft/filigree` paths — the G5 *registry* drift is remediated; the *emit-URL* drift (F1) is separate. |
| `~/.config/filigree/federation_token` + `<store>/.weft/<m>/federation_token` | filigree `federation_token.py:147` `mint_token_file` (atomic, 0600) | filigree `resolve_federation_token` `federation_token.py:163`; embedded into `.mcp.json` headers `integrations.py:323` **[S]** | ✓ | ✓ | ✓ | Auto-mint reference (C-3). Self-consumed; 0600. |
| `.weft/filigree/config.json` (store metadata) | filigree `install.py` / `core.py` (durable metadata) | filigree `read_config` `core.py:1269` **[S]** | ✓ | ✓ | ✓ | Read by filigree's own store resolver. *Absent in lacuna* (tolerated) — see F4: its absence is what makes loomweave's server-mode probe miss. |
| `.weft/loomweave/config.json` (stub `{schema_version:1, last_run_id:null}`) | loomweave `install.rs:467` `fs::write(CONFIG_JSON_STUB)` | **NONE** — no reader in any loomweave crate **[S]** | ✗ | ✓ | ✓ | **F2.** Orphan write. `last_run_id`/`schema_version` deserialized nowhere (grep across all 9 crates = 0 readers). Committed to git (lacuna `git ls-files` shows it) + declared "Tracked (committed)" in the gitignore header — dead weight that misleads. |
| `loomweave.yaml` (repo-root MCP config) | loomweave `install.rs:479` (`LOOMWEAVE_YAML_STUB`, only if absent) + `integration_bindings.rs:202` enrich | loomweave `serve.rs:35`, `sarif.rs:18` (`load_mcp_config`) **[S]** | ✓ | ✓ | ✓ | Self-consumed (loomweave serve/analyze). Enrich-only, leaves operator content. |
| `wardline.yaml` (repo-root) | **REMOVED** — was loomweave `install_wardline_yaml` | n/a (was orphan: wardline reads no config-file URL) | — | — | — | **Lead confirmed.** Deleted in loomweave `f9854f0` (Jun-10 07:31) "stop writing dead wardline.yaml URL bindings." The motivating case was `wardline.yaml` (not `.conf`); C-11(a)'s "`wardline.conf`" label is imprecise. No `wardline.conf` writer exists anywhere. |
| `.mcp.json` → `mcpServers.filigree` | filigree `integrations.py:296` (stdio) / `:324` (streamable-http + literal token) **[S]** | Claude Code / Codex agent runtime (MCP launcher) **[I]** | ✓ | ✓ | ✓ | Own key only. Server-mode embeds literal token (C-3 §A-15 carve-out), chmod 0600 + gitignore-guards `.mcp.json`. |
| `.mcp.json` → `mcpServers.wardline` (`--filigree-url`/`--loomweave-url` args) | wardline `mcp_json.py:181` `merge_mcp_entry` **[S]** **AND** loomweave `integration_bindings.rs:~270` `install_wardline_mcp` **[S]** | wardline MCP server (`resolve_filigree_url` flag>env>port); Filigree daemon as emit target **[S]** | ✓ | ✗ | ⚠ | **F1 + F3.** Two writers for one key (wardline's own installer *and* loomweave's dogfood bindings). Both write the same canonical shape so it is benign-by-construction (idempotent, last-writer-wins on identical content), but it is a genuine two-owner surface (F3, low). **The (b) failure (F1):** the installed lacuna value is the UNSCOPED `…:8749/api/weft/scan-results` against a server-mode daemon that 400s it. |
| `.mcp.json` → `mcpServers.legis` | legis `install.py` (`_legis_mcp_entry` `:777`) **[S]** | Claude Code agent runtime **[I]** | ✓ | ✓ | ✓ | Own key only; `env:{}`. |
| `.mcp.json` → `mcpServers.loomweave` | loomweave `integration_bindings.rs` (own entry) + filigree/loomweave installers | agent runtime **[I]** | ✓ | ✓ | ✓ | Own key. Installed = stdio `serve`. |
| `.claude/settings.json` (SessionStart hook) | filigree `hooks.py`; legis `install.py:626/669`; loomweave `hooks_settings.rs:321` **[S]** | Claude Code harness (reads SessionStart) **[I]** | ✓ | ✓ | ✓ | Each appends its **own** matcher-less block (legis `install.py:660-668` comment: "append a dedicated … block"); malformed→backup+reset, atomic. No sibling-block clobber (C-4 discipline applied). |
| project-root `.gitignore` (`.weft/`, `.filigree/`, `.mcp.json`, legis rules) | filigree `install.py:393` `ensure_gitignore`; legis `install.py:763` `ensure_gitignore`; filigree `integrations.py:428` (`.mcp.json` guard) **[S]** | git **[S]** | ✓ | ✓ | ✓ | Append-only, each adds **only its own** rules; legis comment `install.py` "Only legis's OWN rules — never another member's." Multi-writer but additive + idempotent (no clobber). |
| `.weft/<m>/.gitignore` (nested ephemeral ignore) | filigree `install.py:409` `FILIGREE_DIR_GITIGNORE`; loomweave `install.rs:496` `write_gitignore` (atomic) | git **[S]** | ✓ | ✓ | ✓ | Single owner per member's own subtree (C-1). loomweave does full-file compare+rewrite (private dir, no merge needed). |
| `.env` (`WEFT_FEDERATION_TOKEN`) | wardline `doctor.py:226` `_rewrite_env_token` (0600, byte-preserving) **[S]** | wardline `filigree/config.py:18-32` reads `WEFT_FEDERATION_TOKEN` **[S]** | ✓ | ✓ | ✓ | Self-consumed; surgical single-line rewrite preserves sibling lines verbatim (incl. non-UTF8). |
| `.pre-commit-config.yaml` | wardline `pre_commit.py:33/40` (only if file already exists) **[S]** | `pre-commit` framework **[I]** | ✓ | ✓ | ✓ | Skips entirely if no `.pre-commit-config.yaml` (`:12`) — never originates the file. |
| `.weft/legis/<store>` head-anchor JSON + check/governance/binding/pull DBs | legis `head_anchor.py:90` (atomic); store layer | legis `head_anchor.py` `HeadAnchor` reader; `protected.py:25`, `signoff.py:20` **[S]** | ✓ | ✓ | ✓ | Runtime store, self-consumed under legis's own subtree (C-9 reference). |
| `~/.codex/config.toml` → `mcp_servers.filigree` | filigree `integrations.py:499` | Codex agent runtime **[I]** | ✓ | ✓ | ✓ | Own key in a host-shared agent config; merges, doesn't clobber. |
| `weft.toml` (operator-owned) | **no member writes it** — loomweave/wardline/legis only READ (`store.rs:sibling_url` read-only; wardline `doctor.py:131` read; legis `config.py` read) **[S]** | members (read-only, fail-soft) **[S]** | ✓ | ✓ | ✓ | C-9(b) holds suite-wide: zero tool-writers of `weft.toml`. malformed→absent everywhere. |

---

## 3. Findings (ranked)

### F1 — Installed wardline emit URL is unscoped against a server-mode daemon → findings 400, never land **[HIGH · clause (b) · maps to G5 `weft-7436c1959e`]**

**Evidence (source + installed):**
- Installed `lacuna/.mcp.json` `mcpServers.wardline.args` carries `--filigree-url http://127.0.0.1:8749/api/weft/scan-results` (UNSCOPED).
- The daemon at `:8749` is **server-mode** — `~/.config/filigree/server.json` registers 4 projects (`lacuna`, `wardline`, `legis`, `filigree`), each on its `.weft/filigree` path.
- Filigree fail-closes an unscoped federation write in server mode: `dashboard_auth.py:36-55` classes `weft/scan-results` as a federation path (`rest.startswith("weft/")` → True); `dashboard.py:962-968` returns **HTTP 400** (`"Ambiguous federation write in server mode: scope to a project"`) for any non-GET unscoped federation request. The correct URL is `…/api/p/lacuna/weft/scan-results`.

**Functional impact (deconfliction lens):** every wardline MCP scan emits to a URL the daemon rejects with 400 → **zero findings reach the tracker**, with no green-success masking on wardline's side (wardline's own C-10 honest-gate is intact, but the emit simply fails). This is precisely the G5 exemplar the C-11(b) clause cites ("shipped emit config did not reach the daemon").

**Root cause → F4:** the writer (loomweave bindings) *intends* to scope (`integration_bindings.rs:86-88` builds `/api/p/{prefix}/…` when server-mode is detected), but its server-mode probe `filigree_server_scope()` (`integration_bindings.rs:111-123`) reads `.weft/filigree/config.json` and checks `mode == "server"` — and **lacuna's filigree store has no `config.json`** (only `filigree.db`, `INSTALL_VERSION`, `federation_token`, `scanners/`). So the probe returns `None` → unscoped URL written. The authoritative server-mode signal lives in `~/.config/filigree/server.json` (multi-project registry), which the probe never consults.

**Remediation:** loomweave's `filigree_server_scope()` should consult the authoritative server-mode signal (`~/.config/filigree/server.json` presence + this project's registered prefix) rather than a `mode` key filigree doesn't write to the store; OR filigree's installer should write `mode:"server"`+`prefix` into `.weft/filigree/config.json` so the cross-member probe has a stable on-disk contract (this is F4). Until then, re-run `loomweave doctor --fix` *after* the daemon is registered will still mis-detect. **Tracking:** existing G5 `weft-7436c1959e` (emit-topology drift) — this is the *live, root-caused* instance; fold the root cause (F4) into it.

### F2 — loomweave writes an orphan `config.json` stub no code reads **[MEDIUM · clause (a) · UNTRACKED]**

**Evidence:** loomweave `install.rs:467` writes `.weft/loomweave/config.json` = `{"schema_version":1,"last_run_id":null}` (`CONFIG_JSON_STUB`, `install.rs:24-28`). Exhaustive grep across all 9 loomweave crates finds **no reader**: `last_run_id` appears only at the write site; the only `schema_version` reads are the SQLite `PRAGMA schema_version` (`hook.rs:80`, `doctor.rs`) and the plugin-manifest's unrelated field — none touch this JSON. The store resolver (`store.rs`) opens `loomweave.db`, never `config.json`.

**Functional impact:** dead weight that is *committed* to git (lacuna `git ls-files .weft/loomweave/` lists it) and the nested `.gitignore` header (`install.rs:44`) explicitly declares it "Tracked (committed): config.json" — so it actively *advertises itself as durable state* while being inert. This is the exact clause-(a) pattern loomweave just removed for `wardline.yaml` (`f9854f0`), recurring in its own subtree. A future agent reading the stub reasonably infers loomweave persists run state there; it does not.

**Remediation:** either (i) drop the `config.json` write + its gitignore "Tracked" line and let the db be the sole durable artifact, or (ii) wire a real reader (e.g. resume `last_run_id`) if that was the intent. Per the C-11(a) "named consumer" bar, (i) is the conservative fix. **No security dimension** — purely a dead-seam/honesty defect. **UNTRACKED → file P3 bug (loomweave/clarion counterpart).**

### F3 — `.mcp.json` `wardline` key has two writers (wardline installer + loomweave bindings) **[LOW · clause (c) · benign-by-construction · UNTRACKED]**

**Evidence:** wardline `mcp_json.py:181` `merge_mcp_entry` and loomweave `integration_bindings.rs` `install_wardline_mcp` both write `mcpServers.wardline`. Both emit the same canonical entry shape and preserve operator-pinned args; the writes are idempotent and last-writer-wins on identical content. This is *not* a sibling-subtree write (`.mcp.json` is shared host-local agent-transport config, not a member's store subtree), so it does not breach C-9's "never writes a sibling subtree." But clause (c)'s "exactly one owning writer" is technically not met for this key.

**Functional impact:** none today — but the two writers can disagree on the `--filigree-url` scoping rule (F1 is exactly such a disagreement surfacing: loomweave decides scope from a store probe; wardline's `merge_mcp_entry:152-160` decides from its own server-mode detection). When they diverge, whichever ran last wins, making the emit target depend on install ordering. **Remediation:** name one owner of the `wardline` entry's `--filigree-url` (the rubric's single-writer intent), or have both share one scoping helper so they cannot diverge. **UNTRACKED → file P3.**

### F4 — filigree server-mode store carries no `mode`/`prefix` marker the cross-member probe expects **[LOW · clause (b) root-cause · UNTRACKED, ties to F1/G5]**

**Evidence:** loomweave's server-mode detection (`integration_bindings.rs:112`) and a parallel expectation in wardline's `merge_mcp_entry` rely on `.weft/filigree/config.json` carrying `mode:"server"` + `prefix`. Filigree's installer/daemon does not write that field to the per-project store; the server-mode fact lives in `~/.config/filigree/server.json`. The cross-member contract is therefore *unwritten* — the producer (filigree) and the consumers (loomweave/wardline scope probes) disagree on where "am I server-mode?" is recorded. This is the mechanical root of F1.

**Remediation:** pin the server-mode signal contract (either filigree stamps `mode`+`prefix` into `.weft/filigree/config.json` on server-mode install, or the probes read `~/.config/filigree/server.json`). This is a small federation-contract gap, kin to the unwritten-key class in the federation interface audit. **UNTRACKED → fold into G5 `weft-7436c1959e` remediation as the contract fix.**

---

## 4. Proposed C-11 scorecard (drop-in for conventions.md)

`R` reference · `✓` conforms · `…` pending · `—` exempt · `?` unknown

| Member | reference | conforms | pending | exempt | evidence |
|---|:--:|:--:|:--:|:--:|---|
| **wardline** | **R** | | | | Holds the (b) out-of-box bar for the config *it* writes: `mcp_json.py` writes only its own `wardline` key, server-mode-scopes its own `--filigree-url` detection, `.env` token rewrite is surgical/byte-preserving (`doctor.py:226`), `.pre-commit` never originates the file. Sole writer of its `.weft/wardline/` subtree (C-9). *Caveat:* shares the `wardline` `.mcp.json` key with loomweave (F3) — not wardline's defect. **[S]** |
| **filigree** | | **✓** | | | (a) every write self-consumed: `server.json`↔daemon (`server.py:184`↔`dashboard.py:12`), `federation_token`↔`resolve_federation_token`, store `config.json`↔`read_config`. (b) literal-token `.mcp.json` works on write + 0600 + gitignore-guard. (c) single locked writer of `server.json`; own `filigree` key only; own `.gitignore` rules only. **[S]** |
| **legis** | | **✓** | | | (a)/(b)/(c) clean: `.mcp.json` own `legis` key (`install.py:777`), `.claude/settings.json` own matcher-less block, `.gitignore` "Only legis's OWN rules" (`install.py` comment), head-anchor + 4 stores under `.weft/legis/` self-consumed (`head_anchor.py:90`↔`protected.py:25`). No sibling write. **[S]** |
| **loomweave** | | | **…** | | Motivating (a) fix **confirmed** — `wardline.yaml` orphan removed (`f9854f0`). BUT two open items: **F2** orphan `config.json` stub (`install.rs:467`, no reader) → clause (a) regression in its *own* subtree; **F1/F4** its `.mcp.json` scope probe (`integration_bindings.rs:112`) keys on a filigree `mode` marker that isn't written → writes the unscoped (broken) emit URL → clause (b) fail in the installed build. Pending until both close. **[S]** |
| **charter** | | | | **—** | Not installed (v0.1.0); writes no config surface yet. Re-seed on first installer/store. **[I]** |

**Suite verdict for the consolidated matrix row C-11:** filigree `✓` · loomweave `…` · wardline `R` · legis `✓` · charter `—`.

> Net change vs the audit-pending seeds in conventions.md C-11: loomweave's *reported* no-orphan claim is **half-true** (wardline.yaml removed, but a fresh `config.json` orphan remains → `…`, not `✓`); wardline's reported out-of-box bar is **earned for what wardline writes** → promote to `R`; the G5 (b) instance is **confirmed live** and root-caused (F1/F4), and is a loomweave-side write defect, not a wardline one.

---

## 5. Action list (untracked defects warranting a ticket — not filed)

1. **F2 — loomweave orphan `config.json` stub** (clause a, P3). Drop the `install.rs:467` write + the gitignore "Tracked: config.json" line, or wire a real `last_run_id` reader. loomweave/clarion counterpart. **UNTRACKED.**
2. **F4/F1 root cause — server-mode signal contract** (clause b, P2). Pin where "filigree is server-mode for this project" is recorded so loomweave/wardline scope probes read the same fact filigree writes (stamp `mode`+`prefix` into `.weft/filigree/config.json`, or have probes read `~/.config/filigree/server.json`). **Fold into G5 `weft-7436c1959e`** as its contract fix — do not file standalone; G5 already owns the emit-topology remediation.
3. **F3 — `.mcp.json` `wardline`-key dual writer** (clause c, P3). Name one owner of the `--filigree-url` scoping, or share one scoping helper between wardline `mcp_json.py:152` and loomweave `integration_bindings.rs`, so install ordering can't change the emit target. **UNTRACKED.**
4. **C-11 text nit (no ticket, hub-doc):** clause (a)'s motivating case names "`wardline.conf`" — the actual removed file was **`wardline.yaml`** (loomweave `f9854f0`). Correct the label when next editing conventions.md.

---

## Confidence & caveats

- **F1 is high-confidence** — read from installed `.mcp.json` + `server.json` + filigree fail-close source (`dashboard.py:962`, `dashboard_auth.py:55`) + loomweave probe source (`integration_bindings.rs:112`). Not runtime-probed (no live POST issued, per READ-ONLY scope), but the 400 path is unambiguous from source: unscoped `weft/scan-results` → `is_loom_scoped_path`→True → `is_federation`→True → 400. Re-probe with a live wardline scan before closing G5.
- **F2 is high-confidence** — exhaustive cross-crate grep for any reader of the stub returned zero non-test hits.
- The `~/.config/filigree/server.json` registry (the original G5 *registry* drift) is **already remediated** (live file Jun-10 07:52 lists all 4 members on `.weft/filigree` paths) — distinct from F1, which is the *emit-URL* leg.
- **[I]**-tagged agent-runtime consumers (Claude Code / Codex reading `.mcp.json`/`settings.json`/`config.toml`) are inferred from the harness contract, not read from member source — but the *writers* are all source-verified to scope to their own keys, which is what clauses (a)/(c) turn on.
- Cites audit ticket **`weft-b683a56a20`**.
