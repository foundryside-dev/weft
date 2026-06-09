# Panel synthesis — move-stable finding identity for the Wardline fingerprint

**Convened:** 2026-06-09. **Status:** design risk-assessment, pre-decision.
**Brief:** `2026-06-09-finding-fingerprint-stability-panel-brief.md`.
**Tracking:** residual of `weft-4a9d0f863c` (resolved); migration `weft-e618c4118a` (WL-1, P2 open).
**Panel:** 7 lenses returned (finding-identity/SARIF, AST/compiler, formal soundness/collision,
determinism/reproducibility, distributed migration/four-store, contract/versioning,
security/secret-safety). The ops/SRE lens hit a session limit; its rollout ground
(blast radius, partial-failure, rollback, probe, leg-ordering) is carried by the
migration lens and folded in below.

**Grounding (verified in source, not paraphrase):**
`compute_finding_fingerprint` is
`sha256("\x00".join(rule_id, path, str(line_start), qualname or "", taint_path or ""))`
(`src/wardline/core/finding.py:154-165`). ADR §8 is
`docs/decisions/2026-06-05-wardline-finding-identity-frozen-contract.md`. The four
stores (`baseline.py`, `judged.py`, `waivers.py`, `filigree_emit.py`) each store the
bare 64-hex value and re-implement an exact set-membership join; none store the hash
*inputs* (`line_start`/`qualname`/`taint_path`); none carries a fingerprint-*scheme*
stamp (only file-format `version` ints).

---

## 1. The verdict in one paragraph

**Back the hybrid/tiered key (brief Candidate 3), realized as a SARIF-`partialFingerprints`-style
scheme: remove `line_start` from the join key, key on `(scheme_version, rule_id, path,
qualname, discriminator)`, and make the discriminator a source-derived, *within-`qualname`-unique,
move-stable* anchor.** **No lens opposes the hybrid.** Tally: four back C3 explicitly
(finding-identity, AST, soundness, contract); determinism backs the scope-*ordinal* (C1) which the
hybrid uses *as its discriminator*, not as the primary key; migration is deliberately
scheme-agnostic (constrains, does not pick); security alone prefers SEI (C5) but gates that on a
rename-stability property the other lenses show it lacks (M-4). So the hybrid is the convergent
choice with one dissent that fails its own condition — not a unanimous blessing, and presented as
such. **Reject SEI-class identity (C5)** as the base anchor (not rename-stable per Loom
ground-truth, couples local-first, transitive version dependency). **Reject the content-window hash
(C2)** outright (provably cannot distinguish two identical sinks → soundness break; a
CRLF/BOM/NFC/whitespace determinism minefield; and a brute-forceable source-leak oracle on
low-entropy code). **Reject bare scope-ordinal as the *primary* key (C1)** — its denominator is
rule-dependent, so refining a rule renumbers every later finding, reintroducing the *exact*
ruleset-churn drift class `weft-4a9d0f863c` just killed; the ordinal is sound only as an
intra-collision-group *tiebreaker*, never the load-bearing key. **Bundle the change into WL-1**
(not yet run by most members → migrate once), **conditional on** the new scheme being
design-locked and passing an *extended* collision corpus *before* the fleet upgrades.

**Genuine alternative the panel converged on independently — do not bury it.** Three lenses
(soundness, determinism as their fallback; migration as H-4) arrived at the same architecture from
different directions: **re-anchor verdicts on every scan instead of chasing a perfect key.** Each
scan computes the finding set from current source and re-pins baseline/waiver/judge verdicts to
the current keys via an old→new remap (you have both source and stored keys in hand at scan time).
This sidesteps the entire collision-vs-stability tension — you don't need a move-stable key if you
re-derive the join each run. It is the strongest competitor to "pick a better key," is fully local
and deterministic, and composes with (rather than replaces) a better discriminator. Worth a
first-class design spike alongside the hybrid before committing.

---

## 2. The genuine open decision the panel surfaces (do not paper over)

Within the backed hybrid, two discriminator forms compete. They differ on one axis:
**does a cross-engine divergence fail LOUD (caught by the parity corpus) or SILENT (a hash that
looks like a legitimate source change)?** This matters because a Rust core (`ruff_python_ast`)
migration is the ADR's own #1 risk.

| | **A. Relative-span discriminator** (soundness lens) | **B. Group-ordinal discriminator** (AST lens) |
|---|---|---|
| Form | `{node.lineno - entity.line_start}:{col}:{end_col}` + callee spelling | sort the collision group by full span; store **only** the ordinal N |
| Move-stable (insert above entity) | ✅ rel_line invariant | ✅ |
| Reindent-stable (wrap in `if/try`) | ❌ col shifts | ✅ |
| Collision-complete within entity | ✅ two AST nodes can't share a full span | ✅ within the stable prefix |
| Cross-engine obligation | absolute UTF-8 **byte** columns must match | only **relative span ordering** within a group must match (weaker/more portable) |
| Failure mode if engines diverge | **LOUD** (fingerprint diff on a span the corpus exercises) | **SILENT** mis-assign (strictly worse than status quo on that subset) |

**Tie-breaker (both lenses agree):** the decision is gated on whether `ruff_python_ast`
reproduces (a) CPython byte-column semantics and (b) CPython sibling/document ordering — **both
verifiable before cutover**. If ruff conforms on ordering, prefer **B** (kills the reindent-rekey
residual, relaxes the byte-column obligation). If ruff's ordering can't be guaranteed, prefer
**A** (keep it loud-on-diff) and accept the reindent residual. **Do not ship the ordinal without a
cross-engine group-ordering golden on both interpreter legs.**

A defensible refinement combining both: anchor the discriminator on `rel_line` (move-stable, the
every-commit case) plus full `col:end_col` (collision-complete, loud-on-diff), and treat reindent
churn as an accepted, rarer residual until ruff ordering is proven — then migrate the col-pair to
an ordinal in a *second* (cheap) rekey if reindent churn proves material. This keeps the first
migration loud-failing.

---

## 3. Consolidated findings (deduped across lenses, severity-ranked)

### CRITICAL

**C-1 — One present collision bug + one latent collision the line_start removal would expose. (Both source-verified this session.)**
*(soundness A1/A3, AST F1)*
- **PY-WL-114 (`invalid_decorator_level`) — PRESENT-TENSE collision, verified.** Fingerprint uses
  `line_start=entity.location.line_start` (the *def* line, identical for every decorator on that
  def) + `taint_path=f"{name}:{token}"` (`invalid_decorator_level.py:169-174`). Two stacked
  identical decorators (`@trust_boundary(to_level="bogus")` ×2) on one def → same name, token,
  entity-line, qualname → **identical fingerprint today** → one silently masks the other on all
  four joins (`properties` differ but are not in the key). Same family as the chained-call bug
  already fixed, **still open**, and **not in the collision corpus**. Fix now, independent of the
  move-stability decision.
- **`broad_exception` / `silent_exception` — LATENT, exposed by the change, verified.** Emit **one
  finding per handler**, anchored at `line_start=handler.lineno` with `taint_path=None`
  (`broad_exception.py:52-68`). **Safe today** (the handler line disambiguates two handlers in one
  function), but two bare `except:` collide the **moment `line_start` leaves the join key** — so
  this is a precondition the move-stability redesign must handle, not a present bug.
- **Root cause:** the "`taint_path=None` ⇒ singleton" assumption (`finding.py:148-149`) is a
  *comment, not a check*, and conflates "def-anchored" with "emits ≤1 per (rule,path,qualname)".
- **Fix:** (a) fold the decorator node's own span into PY-WL-114's discriminator; (b) **reclassify
  every rule by cardinality** (can it emit >1 per `(rule_id, path, qualname)`?) not by anchor
  type, and give every multi-emit rule a within-scope discriminator; (c) add a scan-finalizer
  assertion that no two ACTIVE findings share a fingerprint (fail-loud locally — deconfliction-first).

**C-2 — The collision gate proves emptiness only over rules the fixtures happen to exercise; it is a witness test, not a proof. Extend it BEFORE any migration.** *(finding-id F8, soundness A2/B2, determinism F-1/F-2, migration F6)*
- `test_identity_parity.py` asserts `distinct-fp-count == finding-count` only over the captured
  corpus. PY-WL-114 is absent; the col-offset bug existed until a fixture exercised a chained call.
  This is **reactive** coverage.
- The named single-highest-leverage pre-migration deliverable. Add **mutation-PAIR** fixtures:
  (a) insert-line-above → **SAME** key required; (b) two co-located distinct sinks → **DISTINCT**
  keys (chained call; two identical statements in `if`/`else`); (c) rename → key MAY move (assert
  it does — documents the accepted boundary); (d) stacked identical decorators (closes C-1's blind
  spot); (e) a **DEFECT-producing** fixture carrying an NFKC-*unstable* identifier
  (`ﬁle_db.execute`, `µ_conn.execute`) + a multibyte char before the call (byte-col ≠ char-col,
  measured 9 vs 10) + a multi-line chained call — converts the silent cross-engine hazards into a
  loud frozen-fingerprint guard. Run on **both** interpreter legs (3.12/3.13) as §5 already does.
- Stronger complement: a **construction-shape lint** — for every call-site/entity rule, assert the
  discriminator expression includes a node-span (or ordinal) term. A corpus can never enumerate all
  collision shapes; an invariant on construction can.

**C-3 — Content-window hash (C2) converts an accepted metadata leak into a source leak and is non-deterministic across environments. Reject.** *(security SS-1/SS-2/SS-3/SS-5/TR-2, determinism F-5, soundness C2)*
- **Soundness:** provably collides on genuinely-identical code (`if a: os.system(x)` / `else:
  os.system(x)`). No window size is both collision-free (needs position) and move-stable (must
  ignore position).
- **Determinism:** imports CRLF/BOM/NFC-NFD/whitespace as four independent rekey triggers; member
  target repos are not governed by Wardline's `.gitattributes`; the scanner reads `read_text("utf-8")`
  with no BOM strip (`pipeline.py:123`).
- **Secret-safety:** a hash of a normalized slice of *low-entropy templated source* (SQLi/subprocess
  sinks) is dictionary-/confirm-by-hash-attackable by a consumer not entitled to the source —
  defeating the Loomweave `briefing_blocked` precedent — and lands on the one boundary that leaves
  the host (SARIF → GitHub Code Scanning, `sarif.py:110`). **Salting cannot rescue it:** a secret
  per-host salt breaks the cross-tool join; a shared embedded salt is not secret. The only safe
  content anchor is one that is *never* the cross-boundary key — i.e. not this.

**C-4 — No fingerprint-scheme stamp anywhere → a scheme change is a silent 100%-miss mis-join, not a detectable error.** *(contract F1/F2/F3/F6, migration F3)*
- A scheme change still yields a valid 64-hex string; baseline/judged validate only `len==64`
  (`baseline.py:174-180`, `judged.py:107-111`). SARIF already namespaces `wardlineFingerprint/v1`
  (`sarif.py:110`) while every other store carries bare hex — SARIF consumers are in a *stronger*
  contract position than Wardline's own peers.
- **Fix (the enabling primitive for detection, the consistency probe, and safe rekey):**
  self-describing value `wlfp1:<hex>` stored everywhere it is joined on; a `fingerprint_scheme`
  header in baseline/judged/waiver and the Filigree wire envelope (`build_scan_results_body`);
  every store loader asserts the scheme before reading; mismatch → loud `SCHEME_MISMATCH` naming
  found/expected scheme + "run `wardline rekey`". This makes the partial-upgrade and
  scheme-coexistence states LOUD on first scan rather than silently mis-joining.

### HIGH

**H-1 — `line_start` in the join key is the confirmed live drift defect; leaving it is not defensible for live members.** *(every lens; brief)*
- Inserting one line above a sink rekeys a byte-identical defect → resurfaces ACTIVE → trips
  `--fail-on ERROR` + mints a Filigree duplicate + orphans the old row (the live-confirmed
  `fc1bc079`/`8f68f390` debris). "Leave `line_start`" is tenable *only* for the specimen (barely
  moves); it fails the agentic-first axiom on live member repos that move every commit.

**H-2 — The residual is THREE movement axes, not one. Dropping `line_start` alone is necessary but not sufficient.** *(AST F0, soundness B2)*
- `qualname` rekeys on the canonical move — rename the enclosing function, move it to another
  module (`module_dotted_name` prefix changes), or wrap a def in a new outer def (a `.<locals>.`
  segment is inserted for every nested symbol). "Move a function to another file" is *the*
  code-movement case and the scheme fails it independent of `line_start`.
- The call-site `taint_path` discriminator carries absolute `col_offset` → **already rekeys on a
  pure reindent today** (wrap a body in `if/try/with`), with no `line_start` change. The
  relative-span / ordinal forms in §2 address this; the relative anchor for `qualname` is what SEI
  *would* solve but can't (rename-instability).
- **Accept** rename = new identity (renames are rare and semantically *are* a new shape; a
  re-baseline on rename is defensible). **Engineer for** the every-commit insert/reindent case.

**H-3 — The four-store join is four independent exact-match re-implementations with no shared match layer; even a perfect key rots unevenly, especially at the Rust cutover.** *(finding-id F1/F6)*
- SARIF's lesson is a *ranked set* of independent discriminators with a documented fallback and an
  observable "matched-on" record — Wardline collapsed an inherently multi-key problem into one hash
  and one all-or-nothing comparison (`baseline.py:41`).
- **Fix:** a single identity-resolution function all four stores call, returning
  `{matched, matched_on_key, drifted_from}`. Storage unchanged; drift becomes *observable* instead
  of silent, and there is one place to evolve match semantics. Without it, the multi-key scheme is
  re-implemented four times and rots independently.

**H-4 — A pure key change has no store-local old→new map; but a scan-driven remap PRESERVES judge/waiver proof that WL-1-as-written discards.** *(migration F2/F5, finding-id F7)*
- Stores hold the output key + `{rule_id, path, message}` but NOT the hash inputs, so you cannot
  recompute the new key from a row alone. You CAN recompute *both* keys from the current source
  tree at migration time: re-scan, emit `(old_fp, new_fp)` per finding; where source is unchanged,
  `current old_fp == stored old_fp` → carry the verdict to `new_fp`.
- WL-1-as-written ("re-run the judge, re-waive resurfaced") **throws verdict history away**. The
  scan-driven remap is a *free upgrade*: only genuinely-moved findings lose attachment.
- **Resume must read a persisted journal, never re-scan** — agents edit constantly; a re-scan on
  resume derives a different map against half-migrated stores. Persist
  `old_fp→new_fp` + per-leg done-flags to `.weft/wardline/migration_journal.yaml`.

**H-5 — Fail-loud-if-incomplete: a half-migrated member must not report a green gate while a store is key-inconsistent.** *(migration F4/F7, ops — folded)*
- The danger is the **parked-lacuna state**: YAML baseline regenerated (gate green) while Filigree
  is still old-scheme (lying tracker). Leg ordering contains it: **YAML legs first (gate-critical),
  Filigree daemon last (reconciliation debt that never trips the gate)**; stamp the scheme on a
  store only after its leg completes. Add a persistent "migration incomplete" marker + a
  consistency probe (`wardline migrate --probe` / fold into `assure`): a member is key-consistent
  iff all four stores report scheme N, every active finding's recomputed `new_fp` ∈
  baseline∪waiver∪judge or is genuinely new, and no Filigree row carries a scheme<N fingerprint in
  an open state. Probe failure ⇒ resume from journal.

**H-6 — The ADR §6 rekey escape hatch is prose, not a mechanized gate.** *(contract F4)*
- A dev can change `compute_finding_fingerprint`, run `regen.py --reason "…"`, and get green CI
  with no scheme bump, no rekey command, no Filigree migration. CODEOWNERS is admitted "not yet
  wired."
- **Fix:** `regen.py` requires `--new-scheme-version`; the parity test asserts
  `META.json:fingerprint_scheme == finding.FINGERPRINT_SCHEME`; CODEOWNERS on
  `tests/golden/identity/corpus/` + `finding.py:154-165`; a `wardline rekey` CLI command that
  migrates the three YAML stores in place and prints the Filigree migration instruction.

### MEDIUM

**M-1 — `\x00`-join injectivity is an unstated, fragile precondition frozen for a Rust re-impl.** *(soundness A4, determinism F-7)*
- Injective only because no component contains NUL today. A Rust frontend deriving a discriminator
  from raw source bytes could admit one, aliasing silently. **Fix:** assert each component is
  NUL-free at the call boundary, or hash components independently and concatenate digests
  (length-fixed, delimiter-free — collision reduces to SHA-256 collision). Compose with the WL-1 rekey.

**M-2 — CPython `ast` silently NFKC-normalizes identifiers (PEP-3131); `ruff_python_ast` may not.** *(determinism F-2)*
- Normalization isn't absent — it's delegated to the parser. `ﬁle`→`file`, `µ`→`μ` fold for free
  today and feed `qualname` + the `taint_path` dotted spelling. If ruff preserves raw text, the
  hash moves silently across engines for any non-NFKC-stable identifier. The current `café`/`naïve`
  fixtures are NFKC-*stable* and don't exercise this. **Fix:** the C-2 NFKC-unstable DEFECT fixture
  is the guard; if ruff diverges, add explicit `unicodedata.normalize("NFKC", …)` at the
  qualname/taint_path producer (single source of truth).

**M-3 — Path case-folding and symlink realpath are unaddressed in the identity contract.** *(determinism F-8)*
- `path` is POSIX-normalized (good) but on a case-insensitive FS `Repo/Mod.py` vs `repo/mod.py`
  give two keys for one file; relativization is against `root.resolve()` in some paths and
  unresolved `root` in others. The ADR's "location-independent" proof is *absolute-prefix*
  independence, not case/symlink independence. **Fix:** document the case-preserving-FS assumption;
  add a mixed-case fixture. Low urgency if all members are Linux.

**M-4 — SEI-class identity inherits `briefing_blocked` (a security PLUS) but fails on rename-stability and local-first (the disqualifiers).** *(security SS-6, finding-id F5, determinism F-6, contract F5, migration F10)*
- Security's *only* pro-SEI argument: resolution routes through Loomweave, which owns the
  source-withholding control, so identity is downstream of the gate (unlike content-window, which
  computes from raw source). **But** every other lens rejects SEI for the base anchor: Loom
  ground-truth says entity IDs are not refactor-stable (rename → orphan), it adds a network/index
  dependency violating local-first determinism, it makes Wardline's scheme version transitively
  depend on Loomweave's, and an SEI names an *entity* not a *finding-within-it* (still needs the §2
  discriminator underneath). **Disposition:** keep SEI in `related_entities`/metadata where it
  already is; revisit only if Loomweave ships a FROZEN, locally-resolvable, rename-stable SEI with
  its own parity gate.

**M-5 — Unkeyed sha256 is forgeable (collision-as-suppression), but keying is correctly out of scope.** *(security TR-1/TR-2)*
- Anyone can mint a baseline/waiver/judge row with an arbitrary fingerprint to pre-suppress a real
  finding, or craft source whose finding collides with a waived one. Under deconfliction-first this
  is **consciously traded away** — HMAC/keying would destroy the deterministic cross-tool join. The
  actionable residue is the *collision-freedom* half (owned by the soundness bar C-1/C-2), not the
  *forgery* half. State the trade explicitly; do not add keying.

### LOW (flagged, mostly accepted or verification-only)

- **L-1 — `qualname` already leaks names from withheld code** in SARIF/Filigree cleartext; structural
  candidates lean harder on it. A *names* leak (LOW, accepted), categorically below a *source* leak.
  Structural candidates leak names; content-window leaks source — that gap is the whole decision. *(security SS-4/TR-3)*
- **L-2 — Audit per-rule `message` templates for raw-source interpolation** — a *higher-yield*
  present source-leak than anything the fingerprint redesign introduces, if any rule does it
  (codeFlow messages checked clean — use qualnames). File as a bug if found. *(security TR-4)*
- **L-3 — `PYTHONHASHSEED`/array-ordering and floats** are already controlled (§4/§5 tiebreaker;
  no float rides identity). Keep the dual-interpreter legs; never fold a float or a set/dict into
  the key. *(determinism F-9/F-10)*
- **L-4 — `corpus_version` in META.json is an iteration counter, not the scheme version** — add a
  distinct `fingerprint_scheme` field the parity test asserts against the engine constant. *(contract F7)*

---

## 4. Migration decision

**Bundle the `line_start` change into WL-1 (`weft-e618c4118a`), conditional.** *(migration verdict;
agreed by finding-id, AST, contract; constrained by soundness/ops)*

- **Why bundle:** WL-1 hasn't run for most members and is *already* the identical four-store
  regenerate dance; `line_start` rides it for free. Sequencing guarantees a second identical
  fleet-wide migration. Only lacuna would re-migrate, cheaply (its Filigree leg is parked anyway).
  The WL-1 scan IS the old→new remap generator (H-4) → the bundle *preserves* proof the un-bundled
  WL-1 discards.
- **The condition that flips to "sequence":** the new scheme must be **design-locked AND passing
  the extended collision gate (C-2) before the fleet upgrades.** Because the failure asymmetry is
  dangerous — `line_start` fails loud/recoverable (resurface), a bad move-stable key fails as a
  silent false-negative (one finding masks another = a real trust-boundary miss) — shipping an
  unproven scheme into a one-shot clean-break migration is worse than two clean migrations. If the
  scheme can't be gated in WL-1's open window, ship WL-1 as-is now (for the resolution-invariance
  fix already done) and do `line_start` later as its own gated migration.
- **Not "don't change":** confirmed live defect (H-1); the only question is *when*, not *whether*.

**Protocol (idempotent, resumable):** pre-flight snapshot of three YAML stores + a Filigree export
→ single migration scan writing the `old_fp→new_fp` journal + per-leg flags + scheme N → YAML legs
1-3 (gate-green after leg 1) → Filigree leg 4 last (in-place rekey preserving issue links; skip if
new_fp row exists; close scheme<N orphans with no journal entry — idempotent) → `--probe` consistency
check, resume from journal on failure → forward-only rollback restores the snapshot and reverses
Filigree rekeys via the journal. Enabling primitives first: scheme stamp (C-4), the journal (H-4),
the extended collision gate (C-2).

---

## 5. Recommended sequence

1. **Now, independent of the move-stability decision:** fix the two live soundness bugs (C-1:
   PY-WL-114 span + rule cardinality reclassification + scan-finalizer collision assertion).
2. **Pre-work / gate:** extend the identity corpus with mutation-pair + NFKC/byte-column +
   stacked-decorator fixtures on both interpreter legs (C-2); add the construction-shape lint; add
   the `\x00`-free assertion (M-1).
3. **Scheme infrastructure:** `wlfp1:<hex>` value prefix + `fingerprint_scheme` store/wire headers +
   loader asserts + `SCHEME_MISMATCH` (C-4); mechanize the rekey escape hatch (H-6); add the
   identity-resolution function returning matched-on/drifted-from (H-3).
4. **Decide the discriminator (§2):** verify `ruff_python_ast` byte-column + sibling-ordering
   conformance → ordinal (loud-gated) if it conforms, relative-span (loud-on-diff) if not.
5. **Migrate:** bundle into WL-1 with the scan-driven remap + journal + leg-ordering + probe (§4).

---

## 6. The single risk that would change the panel's mind

**If `ruff_python_ast` (the planned Rust core — the ADR's own #1 migration risk) cannot be made to
reproduce CPython's identifier NFKC folding (M-2) and document-order sibling enumeration (§2/M-2),
then `qualname` and any ordinal both become *silent* cross-engine drift axes** — and the backed
hybrid inherits, invisibly, the exact failure class the resolution-invariance fix just closed. The
gate is concrete and pre-cutover: prove ruff's identifier-normalization and traversal-order against
the CPython contract, and make the C-2 NFKC-unstable DEFECT fixture pass on both engines. If ruff
diverges and cannot conform, fall back to the loud-on-diff relative-span form (keep full byte
spans) over the silent ordinal, accept the reindent residual, and invest in the scan-driven
re-anchoring migration (H-4) as the deliberate place to absorb drift — the "explicit decision about
where to trade" the brief invites.
