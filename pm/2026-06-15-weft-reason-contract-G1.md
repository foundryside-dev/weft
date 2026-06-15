# The `weft-reason` contract — canonical honesty vocabulary (G1)

**Date:** 2026-06-15 · **Status:** BLESSED (owner gate, 2026-06-15) — hub-owned contract,
members conform · **Class:** federation contract / honesty-invariant Part 1
(`weft-e295ec3be3`) · **Driver:** the four seam-honesty strikes each minted a *different*
"why empty" dialect (G1 fragmentation).

## Doctrine (owner, 2026-06-15)

> **They get what they wanted.** If we cannot understand what they wanted, that is a
> **massive tell on our side** — the interface failed to capture intent, which is our
> defect, not merely their error. And **any time they don't get what they wanted, we give
> an actual explanation of the CAUSE, the REASON, and the FIX.**

This is the honesty invariant (PDR-0023) sharpened from "carry a machine-readable reason"
to a **three-part explanation**. An empty/partial/stale/degraded result is not honest
unless it tells the caller *what happened, which class of not-getting-what-you-wanted it
is, and what to do about it.*

## The carrier

Every result that is not a clean, complete true-negative carries:

```jsonc
{
  "reason_class": "<one of the canonical 11>",  // REASON — the class a consumer switches on
  "cause":        "<what mechanically happened, machine+human readable>",  // CAUSE
  "fix":          "<the recruiting action that gets the caller what they wanted>"  // FIX
}
```

- A **`clean`** result carries `reason_class: "clean"` with `cause`/`fix` omitted — the
  empty is *earned and complete*. (Explicit `clean` beats "no carrier," so a present-but-
  clean result is never ambiguous with a forgotten carrier.)
- **Every non-`clean` result MUST carry all three.** `fix` is **mandatory** — recruit,
  don't just confess (lead-summary convention).

## The canonical classes (11) — owner ruled "keep them split" (granularity Q1: *per previous*)

| group | `reason_class` | trust it? | example `cause` → `fix` |
|---|---|---|---|
| real | `clean` | **yes** | — |
| not on | `disabled` | no | "LEGIS_WARDLINE_ARTIFACT_KEY unset" → "set the key to enable artifact verification" |
| caller input | `unresolved_input` | no | "SEI loomweave:eid:… not in snapshot" → "re-capture, or check the ref" |
| | `rejected` | no | "finding body failed filigree validation" → "fix field X and re-emit" |
| producer/seam | `dead_path` | no | "advertised field max_entities not consumed" → "(bug) handler unwired — file/await fix" |
| | `unreachable` | no | "POST /scan-results connection refused" → "check the filigree endpoint / retry" |
| | `misrouted` | no | "blank ?project= routed to default project" → "pass the project key" |
| | `error` | no (**loud catch-all, never silent**) | "unrecognized emit status 'foo'" → "(contract drift) report to hub" |
| identity/time | `scheme_mismatch` | **NO — silent-corruption risk (loudest)** | "fingerprint wlfp2 != stored wlfp3" → "re-baseline; do NOT trust the join" |
| | `stale` | qualified | "snapshot 3 commits behind HEAD" → "re-capture before trusting completeness" |
| incomplete | `partial` | qualified | "capped at max_entities=500 (DELTA)" → "raise the cap or scope down" |

`reason_detail` (free member-local text) may accompany `cause` for nuance below the class.

## Standardization scope — owner ruled "as far as we can" (Q2)

- **VALUE vocabulary (the 11 `reason_class` strings): standardized NOW**, across all
  members — mandatory and **non-breaking** (constrain existing emitted strings to the set).
- **CARRIER SHAPE (the cause/reason/fix triple): the target**, adopted *as far as each
  member can without a re-shock.* New surfaces use the full triple from day one; the
  already-shipped strikes (warpline/wardline/loomweave/legis, 2026-06-15) align where it
  is additive. Full carrier-shape convergence lands with **G3** (loomweave typed output —
  the natural place to unify shape) and, **for filigree, inside the held `3.0.0`**
  (additive — never a 3.1.x re-break). Do not re-break shipped work.

## Home + enforcement — owner: **yes** (Q3)

- **Canonical list = this hub contract doc.** No shared runtime dependency — members stay
  independent repos and conform by convention + test (preserves the no-shared-dep posture).
- **Conformance = a shared test vector** (`canonical-classes` + cases) each member's suite
  asserts its emitted reasons against. **This shared test IS `weft-e295ec3be3` Part 1** —
  the honesty guardrail's last limb.
- **`fix` mandatory** on every non-`clean` result.

## Governance — every seam is hub-blessed (owner ruling, 2026-06-15)

The switch in focus to L2 means members **no longer have full independence**: they retain
autonomy over **their own jobs**, but **every cross-member interaction — every seam — is
hub-decided and hub-blessed**, so the joined flood stays coherent enough for L2 to
synthesise over. This `weft-reason` vocab is the **first hub-blessed contract**; the
**G4 scheme-echo handshake** will likewise be **authored hub-side** and implemented by
the members, not negotiated bilaterally.

## Release posture (owner, 2026-06-15)

- **filigree `3.0.0` HOLDS** specifically to land this honesty/conformance surface
  *properly* (additive, done right) — no clock.
- **The other four members are soft-launched** (out, but still moving) **until we crack
  the L2 mystery** — they conform to the value vocab now and converge on the carrier shape
  as they iterate.

## Rollout (feeds the G2/G3/G4 strike batch)

1. Land this doc + the shared conformance vector → closes `weft-e295ec3be3` Part 1.
2. **G2 / G3** strikes emit canonical `{reason_class, cause, fix}`.
3. **G4** is a hub-authored **seam contract** (the scheme-echo handshake) — its filigree
   half is **additive-only** and may fold into the held `3.0.0`; not a free-swinging strike.
