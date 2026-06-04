# Loom — federation conflict & ambiguity register

**Status:** **Authoritative** and **first-class.** This is the deliverable the cutover exists to produce: every conflict and ambiguity found between the federation's sources of truth, classified and either *fixed* or *ruled with a named owner*. Flush these before major point releases.

**Date of sweep:** 2026-06-05. Sources compared: this hub (pre-cutover), `~/clarion`, `~/filigree`, `~/wardline`, `~/legis`, `~/charter`, `~/lacuna`.

**Two classes:**
- **Class A — hub stale, repo fresh.** The hub restated a project-internal fact that moved. *Resolution: fixed by this cutover* (and prevented from recurring — loom no longer restates volatile facts; it points). No ruling needed.
- **Class B — two live sources disagree.** A genuine contradiction between current repos that needs a decision. *Resolution: a ruling + a named owner.*

---

## Class A — stale-hub drift (fixed by this cutover)

| # | Drift (old hub said → reality) | Authoritative source | Fix |
|---|---|---|---|
| A-1 | Roster = 4 (filigree/clarion/wardline/**shuttle**) → reality is **5 realized members** (+ legis, + charter) and shuttle is a thought-bubble | repos exist at `~/legis`, `~/charter` | Roster ruled (§B-1); members added under [members/](./members/) |
| A-2 | `lacuna` (the demo specimen) absent → it is the federation's canonical demonstrator | `~/lacuna/README.md` | [members/lacuna.md](./members/lacuna.md) added |
| A-3 | filigree "v2.1 / 113 MCP tools" → **2.3.0 / 115 tools** | `~/filigree/pyproject.toml`, README | loom stops restating; [members/filigree.md](./members/filigree.md) snapshots + points |
| A-4 | clarion "v1.0 walking skeleton, v0.1 in flight / 7 MCP tools" → **v1.3.0 shipped / 39 tools** | `~/clarion/Cargo.toml`, README | loom stops restating; [members/clarion.md](./members/clarion.md) snapshots + points |
| A-5 | wardline "unreleased / 38 decorators / 11 rules PY-WL-001..009 / Tier 1–4" → **1.0.0rc1 / 3 canonical decorators / 20 rules PY-WL-101..120 / 8-state lattice** | `~/wardline/src/wardline/{_version,decorators,core/taints,scanner/rules}` | loom stops restating; [members/wardline.md](./members/wardline.md) snapshots + points |
| A-6 | "Wardline→Filigree integration is **load-bearing**" → it is **enrich-only** (work-tracking only; analysis needs no Filigree) | `~/wardline/docs/integration/2026-05-29-wardline-loom-integration-brief.md`; `core/filigree_emit.py` (fail-soft) | Corrected in doctrine §5 and [members/wardline.md](./members/wardline.md) |
| A-7 | Identity = `{plugin_id}:{kind}:{qualname}` taught as **identity** → that is the **locator (address)**; **SEI** is identity | Clarion ADR-038; [sei-standard.md](./sei-standard.md) | SEI standard promoted; glossary `locator`/`SEI` rows |
| A-8 | Entity-assoc routes under `/api/loom/*` → they are **classic `/api/issue/…` + `/api/entity-associations`** | `~/filigree/src/filigree/dashboard_routes/entities.py`; `~/legis/src/legis/filigree/client.py` | Corrected in [contracts-index.md](./contracts-index.md) §1 |
| A-9 | `shuttle://` described as the "nascent addressing scheme" → the `loom://` URI scheme it belonged to was **closed by SEI** | [sei-standard.md](./sei-standard.md) §0/§9 | [uri-scheme.md](./uri-scheme.md) |
| A-10 | Retired asterisk unknown to hub → the `wardline.core.registry.REGISTRY` import asterisk **retired 2026-06-05** | Clarion ADR-018 Rev 3; CHANGELOG | [asterisk-register.md](./asterisk-register.md) A-2 |
| A-11 | `wardline-watcher` could be mistaken for a member → it belonged to the defunct heavier `wardline.old` and is **out of the federation** | John (2026-06-05); `~/wardline-watcher/README.md` | Excluded everywhere; noted in doctrine/README |

> **Recurrence prevention.** A-3/A-4/A-5 were caused by the hub *copying* version/count facts. The cutover's structural fix is the authority model ([README.md](./README.md)): loom points to the owning project for all volatile surface facts and marks any snapshot it shows as non-authoritative. Audit gate: loom must contain no restated project-internal fact without a pointer.

---

## Class B — live contradictions (ruled, with owners)

### B-1 — Federation roster & ordinality  *(RULED)*

**Conflict.** Clarion's founding doctrine (`~/clarion/docs/suite/loom.md`, dated 2026-06-05) lists only Clarion/Filigree/Wardline + Shuttle (proposed) and names **neither legis nor charter**. But `~/legis/README.md` calls legis "the fourth Loom product," and `~/charter/README.md` calls charter "the fifth member" with "shuttle a future sixth." Three live sources, three different rosters.

**Ruling (hub, 2026-06-05, ratified by John).** The canonical roster is **five realized members: Clarion, Filigree, Wardline, Legis, Charter.** Shuttle is a **roadmap thought-bubble, not a member** — it has no repo and is displaceable by any better idea (Charter, started 2026-06-04, is exactly such a better idea taking priority). Lacuna is the **demo specimen, not a member.** The hub ([doctrine.md](./doctrine.md)) is the body that declares the roster going forward.

**Owner / follow-up.** loom (declared). Downstream: Clarion's founding doctrine is reduced to a pointer to [doctrine.md](./doctrine.md) (Part B of the cutover), so the divergent three-member framing no longer sits in a repo as a competing authority.

**Corroboration.** [SHIPPING.md](./SHIPPING.md) (PM decision, 2026-06-05) independently rules the same roster (five products incl. legis + charter; shuttle future, not #4) and labels the three-disagreeing-canon-docs situation a **launch-blocking go-to-market defect** ("a suite whose canon can't name its members can't be marketed as a suite"). It also sets the docs topology this cutover implements: one hub owns the authoritative member list + compatibility matrix; the disagreeing canon docs collapse to one source. Launch is **gated by Wardline + Charter reaching 1.0**.

### B-2 — SEI is canonical but **not locked**; Filigree is the gate  *(RULING + OWNER)*

**Conflict.** The [SEI standard](./sei-standard.md) is "DRAFT — not yet locked," yet Clarion's doctrine and the legis/wardline repos describe SEI as shipped and in use. Both are true at once: the *track* is canonical and substantially built (Clarion authority + Legis/Wardline consumers pass the oracle), but the standard cannot **lock** because Filigree (`release/2.3.0`) has **no SEI in source** — its locator→SEI backfill and oracle pass have not happened.

**Ruling.** loom records SEI as **canonical direction, substantially built, lock-pending-Filigree.** No one may describe SEI as "locked" until Filigree conforms and a lock declaration is made. Treat any binding still on a `locator` as legacy.

**Owner.** Filigree (the backfill + oracle pass) is the lock gate; Clarion (authority) declares lock once all consumers conform. Tracked as the live federation-readiness item before the point releases.

### B-3 — `shuttle://` reference scheme survival  *(OPEN — OWNER ASSIGNED)*

**Conflict.** Filigree's planning-deprecation uses `shuttle://…` milestone references and a `migrate-to-shuttle` path, but Shuttle has no repo and the broader `loom://` scheme it belonged to is closed by SEI ([uri-scheme.md](./uri-scheme.md)).

**Disposition.** Low-stakes and **deferred**: nothing resolves a `shuttle://` URI today. Do not build on it. Whether a thin milestone-reference convenience is worth keeping is decided **if/when a change-execution authority is actually built** — and that authority may not be "Shuttle" at all.

**Owner.** Filigree (owns the milestone surface + migrate-to-shuttle tooling) + whoever designs the eventual change-execution authority.

### B-4 — Home of the suite-wide SEI standard  *(RULED — resolved by this cutover)*

**Conflict.** The SEI conformance standard physically lived in `~/wardline/docs/superpowers/specs/` while declaring itself a suite-wide standard with Clarion as authority — and it carried an instruction to "propagate the normative sections into clarion/filigree." A suite-wide standard living inside one consumer's specs tree is a latent drift source.

**Ruling.** Promoted into the hub as [sei-standard.md](./sei-standard.md) — the canonical home. The wardline-tree copy is reduced to a pointer (Part B). Owner: loom.

---

## How to use this register

- Before a point release, walk Class B: every item must be **ruled** (done) or have an **owner actively closing it** (B-2 Filigree backfill, B-3 deferred-with-owner).
- New conflicts found later are appended here with the same classification. A Class-B item is never silently resolved — it gets a ruling and an owner, or it stays open and visible.
