# Gold-standard launch — program plan (formalisation of the sequencing nomination)

**Status:** `/axiom-program-management` formalisation of `pm/2026-06-10-gold-standard-launch-sequencing.md`.
**Adds (per the nomination's hand-off):** the formal cross-project dependency model, a WSJF / cost-of-delay
ranking, and a defensible forecast.
**Sources:** the nomination; `pm/2026-06-10-federation-interface-audit.md`; `pm/2026-06-10-in-flight-state-of-the-federation.md`;
PDR-0011 (`do it right` / gold-standard gate); live filigree state read 2026-06-10.
**Scale call:** this is a **program** (four members — filigree, wardline, legis, loomweave — driving one
clean-break-launch outcome no single member owns) but a *small* one: one owner, agent-dispatched teams.
Rigor is matched to that — lightweight instrument, no ceremony (see §6). The Rust line is **out of the
launch envelope** (PDR-0012); it is excluded here except as the freeze-declaration paperwork the oracle must enumerate.

---

## Verdict (read first)

**The nomination's wave order is dependency-correct. I am not re-litigating it** — G5-emit-first, fix-and-lock-per-seam,
oracle-after-shapes-settle, dogfood-then-ship is the right order, and the WSJF in §4 confirms rather than reorders it.

Formalisation surfaces **three things the nomination did not model**, in descending severity:

1. **HIGH — the gold-standard gate has a wiring hole on its own headline criterion (GS-7).** The oracle harness
   is split across **two duplicate umbrellas**; the gate blocks on the near-empty one. Three of the five oracle
   seams do not gate the launch. The gate can go green without the conformance proof PDR-0011 says is the point. (§3.3)
2. **HIGH — the four-member lockstep cutover is the true program convergence point, and it is not a tracked
   dependency.** The nomination's "Wave 4 → clean-break launch" collapses the single highest-variance event in the
   whole program — merge-to-main across 131/60/39/22 unmerged commits, filigree-first, in lockstep on a hard schema
   wire-break — into one cell. The in-flight sweep already named this "the single biggest unscheduled risk." (§3.4)
3. **MEDIUM — no defensible launch date exists yet, and one should not be quoted.** This is a cold-start forecast
   (agent-dispatched work, thin throughput record) with two open scope questions feeding it. A single committed date
   today would be date-theatre. The honest output is a range, a confidence, and a forecast-and-correct loop. (§5)

---

## 3. The formal cross-project dependency model

### 3.1 The dependency board *is* the gate's blocked-by graph

At this scale we do not stand up a separate PI-planning instrument (§6). The **program dependency board is the
filigree blocked-by set of the gate** `weft-cd62a4da9b` (*Dogfood #2 readiness gate*, P1 epic, open). Verified
live 2026-06-10 — nine inbound contracts, mapped to the nomination's waves:

| Wave | Seam / gap | Ticket | Pri/Status | Producer → Consumer (+vector) | Gate-wired? |
|---|---|---|---|---|---|
| 0 | **G5** emit topology | `weft-7436c1959e` | P1 / triage | ops runbook — repoint 3/4 members to `:8749` | ✅ direct |
| 0 | **C-4** multi-owner managed block | `weft-eb3dee402f` | P1 / triage | filigree+loomweave+wardline writers (shared contract) | ✅ direct |
| 1 | **G1** `findings` key | `weft-37455bf407` | P1 / triage | wardline `core/legis.py:252` → legis `ingest.py:360` + golden vector | ✅ direct |
| 1 | **G13** `dirty` key | `weft-61d27fb808` | P2 / — | wardline `core/legis.py:292` → legis `ingest.py:202` + shared const | ✅ direct |
| 2 | **G9** qualname suffix | `weft-94284025f5` | P2 / triage | wardline `index.py:133` → loomweave `wardline_reconcile.rs:54` + fixture | ✅ direct |
| 2 | **G11** dead signing handshake | `weft-c7e3486246` | P2 / triage | legis `client.py:50` → filigree `entities.py:122` | ✅ direct |
| 2 | **G18** suppression vocab | `weft-eef2fa8bbb` | P2 / open | wardline `SuppressionState` enum → filigree `db_files.py:97` shared const | ✅ direct |
| 2 | **G15** entity-assoc serde oracle | `weft-045076e30f` | P2 / open | filigree `filigree.rs:78` → loomweave `EntityAssociation` + alias | ✅ direct |
| 3 | **GS-7 oracle epic** | `weft-1e053eac02` | P1 / open | (umbrella — see §3.3) | ✅ direct |

**Finding (positive):** contrary to a first read, G9/G11/G18 *are* gate-wired. The nomination's Wave 2 is gate-correct.
Every leaf above is a both-sides(+vector) unit, matching the nomination's "dispatch per-seam, not per-repo" rule.

### 3.2 The program critical chain (as the board currently encodes it)

filigree computes the longest open chain as **3 links**:

```
weft-560f243c95  ──▶  weft-1e053eac02  ──▶  weft-cd62a4da9b
(X-series seam        (GS-7 oracle epic)     (Dogfood #2 gate)
 consistency, P2)
```

Every other gate blocker is a leaf bug with no upstream chain — i.e. the contract fixes (Waves 0–2) are
**mutually independent and fully parallelisable**, exactly as the nomination states. The chain's length is set
entirely by the **oracle spine** (`560f → 1e053`), which is why the oracle, not the fix count, paces the gate.
**This is the lever:** the only way to shorten the chain is to settle the oracle scope (§3.3), because nothing
else is sequential.

### 3.3 HIGH — the gate-integrity defect: two umbrellas, and the gate blocks on the empty one

The GS-7 conformance harness — the audit's *dominant systemic finding* and PDR-0011's stated gold-standard
criterion — is tracked under **two duplicate umbrellas created 49 minutes apart on 2026-06-09**:

| Umbrella | Pri | Children | Gate-wired? |
|---|---|---|---|
| `weft-1e053eac02` "GS-7 oracle epic" | **P1** | **only `weft-dfeb20c4fa`** (ADR-049 Rust-freeze *declaration* — paperwork) | ✅ gate blocks on this |
| `weft-43e8fcda0c` "conformance harness (umbrella)" | P2 | `560f243c95`(X/"G6"), `513aa35a08`(G12), `8f1c6c512e`(G14), `045076e30f`(G15), `06b5fa64dd`(G16) | ❌ gate does **not** block on this |

Consequence, precisely:

- The gate's oracle blocker (`weft-1e053eac02`) closes when **560f** (its upstream) and the **Rust-freeze
  declaration** are done. Its closure does **not require** G12, G14, or G16 to exist.
- Of the five oracle seams, **only G15 (`045076e30f`) independently blocks the gate.** **G12 (`513aa35a08`),
  G14 (`8f1c6c512e`), and G16 (`06b5fa64dd`) are all P3 and gate-invisible.**
- **Net: the gold-standard gate can go green with three of the five oracle seams unbuilt** — i.e. with the
  GS-7 "proven, not asserted" criterion under-enforced on the very seams it names (Legis↔Filigree bind/gate,
  the machine-loaded SEI oracle, the Legis↔Loomweave rename-JSON two-way). That is the build-trap shape
  (output "epic closed" banked as outcome "conformance proven") wired into the dependency graph.

**This is a decision, not just a bug.** Either G12/G14/G16 are genuinely *post-launch hardening* (defensible —
they are real-HTTP/machine-load oracles that strengthen proof rather than gate a contract shape), in which case
the gate is honest but the **wiring lies about it**; or they are *in* the gold-standard envelope, in which case
the **gate is hollow**. The owner owns which (see Decisions). Either resolution requires the same first move:
**reconcile the two umbrellas into one and re-point the gate at the umbrella that holds the real children.**

### 3.4 HIGH — the post-gate convergence point is untracked

The gate was deliberately re-scoped (2026-06-08) to *fix → dogfood #2 → ship*: the dogfood runs against the
**fix branches**, and propagation/cutover is post-gate. Correct. But that places the **single highest-variance
event in the program entirely after the board ends**, with no dependency modelling it:

```
[Waves 0–3 close] ─▶ [Dogfood #2 vs fix branches] ─▶ ★ LOCKSTEP CUTOVER ─▶ launch
                       = the thin-slice integration     filigree 3.0.0 (schema v26, hard
                         exercise (de-risks ★)          rebrand wire-break) merges FIRST;
                                                         all four re-point in lockstep.
                                                         131 / 60 / 39 / 22 commits unmerged.
```

Per the cross-project-integration discipline this is a **big-bang convergence** — the riskiest possible shape —
and the in-flight sweep flags it as the biggest unscheduled risk. Two program-management consequences:

- **The dogfood IS the program's integration cadence** — the thin end-to-end slice that makes the convergence a
  non-event. Its value is precisely that it exercises the assembled seams *before* the lockstep merge. Frame and
  resource it as integration de-risking, not as a test pass.
- **Stage the cutover filigree-first per the launch runbook; do not big-bang all four.** And add it to the board
  as a tracked, dated dependency with the four members as named lockstep participants — right now it is a risk
  living only in a prose doc, which is how knowable dependencies become integration-day surprises.

---

## 4. WSJF / cost-of-delay

**Honest-inputs caveat (this is where most WSJF tables lie):** weft is own-use tooling with **no external
deadline** (`do it right`, PDR-0011). So **Time Criticality is genuinely LOW almost everywhere** — there is no
market window. The one real exception is the cutover: the four release branches diverge from an actively-maintained
`origin/main` (filigree already +131), so **merge debt compounds with delay** — that is real TC, and it sits on
the convergence, not on the fixes. With TC low, cost-of-delay here is driven by **RR/OE (unblocking) and UBV**, not
urgency. Scored 1–10; Job Size on the Fibonacci effort proxy; this is a *ranking* instrument, not currency.

| Work item | UBV | TC | RR/OE | CoD | Size | **WSJF** | Note |
|---|---|---|---|---|---|---|---|
| **G5 emit** (W0) | 6 | 4 | **10** | 20 | 2 | **10.0** | prerequisite to *verify* every other fix; tiny |
| **C-4 multi-owner block** (W0) | 6 | 3 | 8 | 17 | 3 | **5.7** | a 0-byte CLAUDE.md mid-dogfood wrecks the run |
| **G1+G13 critical seam** (W1) | 9 | 3 | 8 | 20 | 5 | **4.0** | the gate population itself; silent green-zero-findings |
| **Cutover staging prep** (W4-pre) | 8 | **7** | 7 | 22 | 5 | **4.4** | TC real here (merge debt); de-risks the convergence |
| **Wave-2 seams** G9/G11/G18 (each) | 4 | 2 | 5 | 11 | 5 | **2.2** | independent hardening; parallel |
| **G15 serde oracle** (W2/3) | 5 | 2 | 6 | 13 | 5 | **2.6** | gate-wired oracle seam |
| **Oracle G6/G14** (W3) | 5 | 2 | 6 | 13 | 8 | **1.6** | locks shapes; must follow W1–2 (dependency) |
| **Oracle G12/G16** (W3) | 4 | 2 | 4 | 10 | 8 | **1.3** | P3, gate-invisible — the §3.3 in/out candidates |

**What the arithmetic says — and does not.** WSJF **confirms** the nomination's order (G5 top, then C-4, then the
critical seam) rather than reordering it; at this scale, with dependencies this dominant, that is the expected and
honest result — full WSJF is arguably overkill and the dependency graph already forces the sequence. Its one load-
bearing contribution is the **bottom two rows**: G12/G16 are both lowest-WSJF *and* gate-invisible *and* P3. **That
triple is the signal that they are the natural fast-follow** — which is exactly the §3.3 scope decision the owner
must make consciously rather than have the wiring make by accident. The cutover-prep row scoring above the Wave-2
seams is the other signal: the highest-leverage *unscheduled* work is de-risking the convergence, not the next contract fix.

---

## 5. Forecast

**There is no defensible single launch date yet, and quoting one would be date-theatre.** Reasons, stated honestly:

- **Cold-start throughput.** Agent-dispatched work has no stable item/week record to Monte-Carlo from. The nearest
  reference class is this week's own output (the federation audit: 21 agents / ~1.66M tokens / 2-at-a-time for one
  analysis pass; several fixes — G1+G13 — already in flight). That seeds a *shape*, not a date.
- **Two open scope questions feed the forecast.** The oracle envelope (§3.3) and the cutover staging (§3.4) each
  move the endpoint materially. Forecasting across an unsettled scope is forecasting a moving target.
- **The variance lives in two places, neither of them the fix engineering.** The contract fixes are small,
  parallel, and partly done — low variance. The variance is (a) the **dogfood verification loop** (unknown number
  of fix→re-dogfood round-trips) and (b) the **lockstep cutover** (highest-variance single event). A date is only
  as good as those two, and both are currently un-sized.

**The honest forecast form** — a range with confidence, framed on the critical chain, to be tightened weekly:

- **Reference-class read:** with Waves 0–1 partly in flight and the fixes parallelisable, the *fix-and-lock* body
  of work (Waves 0–3) is a **small** body — the chain length, not the work volume, governs it. Plausible P50 for
  *gate-green* is **near-term** once the oracle scope is settled; the tail is set by the oracle spine
  (`560f → 1e053`) and the dogfood loop.
- **The launch endpoint adds the cutover**, whose variance dominates everything upstream. Until it is staged and
  sized, the launch interval is **wide and low-confidence by design** — and saying so *is* the rigor.
- **Method going forward:** forecast-and-correct on a short loop. Close G5 (unblocks dogfood-verification of
  everything), settle the oracle scope, size the cutover as a staged filigree-first sequence — and *then* the
  interval narrows fast because the two variance sources become observable. Commit at P85, name the confidence,
  never hand over a P50 as if it were safe.

---

## 6. Operating-model fit (keep it lean — don't add ceremony)

This is a four-member program, but the right instrument is **the one already in place**, not SAFe:

- **Synchronisation instrument = the filigree dependency graph** (the gate's blocked-by set is the cross-team
  dependency board). It does not need replacing — it needs its **integrity fixed** (§3.3) and the **cutover added**
  as a tracked node (§3.4).
- **Integration cadence = Dogfood #2** (the thin-slice convergence exercise, §3.4).
- **Cross-team coordinator = the PM/owner.** One person already owns the seams; no Release-Train-Engineer seat to create.
- **Do not** stand up PI planning, scrum-of-scrums, or a release-train calendar — that would be ceremony copied
  before the coordination problem warranted it (the pack's spine failure). The coordination problem here is small
  and the instrument is adequate; the gap is wiring integrity, not ceremony volume.

---

## Decisions — RULED & EXECUTED (owner, 2026-06-10)

1. **Oracle envelope (§3.3) — RULED: Split.** In-gate (protect contract *shape*): **G15** (`weft-045076e30f`) +
   **G14** machine-load (`weft-8f1c6c512e`), alongside the G6/X-series spine (`weft-560f243c95`). Fast-follow
   (harden *proof* of already-shape-locked seams): **G12** (`weft-513aa35a08`) + **G16** (`weft-06b5fa64dd`).
2. **Gate re-wire — RULED: do it now. ✅ DONE.** The two duplicate umbrellas were *disambiguated* (cleaner and
   reversible vs merge-and-close): `weft-1e053eac02` (P1) is the gate-wired **in-gate** oracle epic, now blocked by
   G15 + G14 + G6/X-series (the §3.3 hole is closed — it cannot go green without the shape-locking oracles).
   `weft-43e8fcda0c` was repurposed to the **POST-LAUNCH fast-follow** umbrella (P3, `post-launch`), holding only
   G12 + G16, neither gating the launch. G14 bumped P3→P2 to reflect its new launch-gating status.
3. **Cutover tracked — ✅ DONE.** Created `weft-4b2f948f70` (P1 epic, `launch`/`federation`), blocked by the gate.
   The program critical chain is now **4 links**: G15 → oracle epic (`weft-1e053eac02`) → gate (`weft-cd62a4da9b`)
   → cutover (`weft-4b2f948f70`) — the convergence point is no longer invisible.

## Recommended next actions

- **Now, unblocking:** dispatch **G5** (`weft-7436c1959e`) — top WSJF, prerequisite to dogfood-verify everything.
- **Reconcile the board** to match the in-flight reality: the shipped-but-open items (C-1/WL-1/line_start track/
  FIL-2/LW-1/C-2/C-9/LEG-1-3) are DONE *on release branches, not main* — set them to a *building/verified* state,
  not closed, until the cutover lands (per the in-flight sweep). "Done" = "merged + cut over."
- Keep the per-seam fix-and-lock dispatch exactly as the nomination specifies (both-sides + vector, per seam).
