# Convention: lead summary on count-returning tools

**Status:** adopted 2026-06-15 · **Class:** agent-first ergonomics convention
(sibling to *bounded-by-default*, C-12 / `weft-801d21fa4d`) · **Origin:** the
2026-06-15 cold-eval — a paid external reviewer docked *trust* because
`entity_dead_list`'s raw headline ("141 candidates") misled until the caveat block
was found. **Reference implementation:** loomweave `1.1.0-rc10`
(`entity_dead_list` `summary`).

## The rule

> Any tool that returns **"a number of things in various kinds"** must state the
> **breakdown up front**, in a top-level `summary` block — so an agent reads the
> *shape* of the result without counting rows or hunting for a footnote.

A raw count is a trap: `141 dead`, `156 findings`, `203 hotspots` all *read as
alarming or authoritative* before the agent learns how many are baselined,
withheld, low-confidence, or not-analysed. The fix is a self-qualifying headline.

## The shape

A `summary` block carries:

1. **Counts by kind** — the total *decomposed* into its meaningful categories
   (active vs baselined; reachable vs unreachable vs not-analysed; by severity; by
   status; withheld/excluded counts). Never just `total`.
2. **A confidence / completeness verdict** — `moderate` | `low` (or
   `complete` | `partial`), so the agent knows whether to trust the numbers.
3. **A recruiting advisory** — *only when a threshold is crossed* (too many
   unknowns / too-high a withheld or unreachable share / a stale or rootless
   index). The advisory must **recruit, not just confess**: tell the agent what to
   *do* ("configure entry-point roots", "re-capture the snapshot", "pass
   `--trust-suppressions`"), not merely that the result is partial. A silent or
   passive honest-degrade is a defection trigger (see exit-interview §8).

This is L2 (ergonomics: the answer is one read away) and L3 (trust: the result
declares its own limits) from the reach-for agenda, made concrete.

## Rollout targets (the campaign)

Each tool below returns counts in kinds and should carry a `summary`:

| Tool | `summary` should decompose into |
|------|--------------------------------|
| **loomweave `entity_dead_list`** | ✅ done (reference) — candidates / reachable / not-analysed / confidence |
| **wardline `scan`** | total / **active** / baselined-suppressed / withheld / by-severity / by-rule-class. *(Highest value: the reviewer hand-computed "156 findings, 1 active, 42 baselined" — that's the headline the tool should have led with.)* |
| **loomweave `entity_coupling_hotspot_list`** | ranked total / withheld-secret / scope-excluded (the reviewer hit "holes I can't see into") |
| **loomweave `module_circular_import_list`** | cycles found / modules in cycles / scan-truncated |
| **loomweave `project_finding_list`** | total / by-severity / by-status / by-rule |
| **loomweave faceted/entity lists** (`find_by_tag`/`kind`, churn) | total / by-kind / withheld / scope-truncated |
| **filigree `finding_list` / `issue_list`** | total / by-status / by-priority |

## Acceptance

A tool satisfies the convention when: (a) a `summary` block leads with counts
decomposed by kind; (b) the result carries a confidence/completeness verdict; and
(c) any partial/low-confidence result emits a *recruiting* advisory naming the
operator action that would make it whole. New count-returning tools ship with it
from day one (add to the tool-authoring checklist).
