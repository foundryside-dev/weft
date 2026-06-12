# Lacuna (demo app)

**Status:** **Live demo app.** Lacuna is a small application with seeded issues that the Weft tools can analyze together.
**Repo:** `~/lacuna` · **Language:** Python
**Current details:** demo app + seeded-issue manifest (`tour/lacunae.toml`) complete; `make setup`, `make tour`, and `make verify` are the current operator path; docs/tour, docs/matrix, and per-issue explainers are generated. For the latest details, use `~/lacuna/README.md`, `~/lacuna/docs/tour.md`, and `~/lacuna/docs/matrix.md`.

## Why it exists

Lacuna's issues are **intentional and permanent** — catalogued in `tour/lacunae.toml` and baselined in the current Wardline demo state so the demo stays repeatable (catalogued issues pass; genuinely new violations fail). Removing a seeded issue *fails* `make verify`. It exists to *be analyzed*, not to do real work:

- Seeded trust-boundary violations for **Wardline** to catch (`PY-WL-101..126` coverage plus the fail-closed `WLN-ENGINE-PARSE-ERROR` specimen).
- Seeded structural findings for **Loomweave** (dead entity, circular import, duplicate locator, too-complex, and related graph/quality specimens).
- Tracked work in **Filigree**, Loomweave analysis, Wardline baseline/gates, and **Legis** governance routing. Charter is labelled as planned while its Weft integrations remain pending.

## What it demonstrates (the matrix, end to end)

Lacuna is where the [federation-map](../federation-map.md) becomes runnable: Wardline+Loomweave dossier reads, Wardline→Filigree findings-as-work, Loomweave+Filigree issues bound to SEI with drift detection, and Legis governance over the live core path when the signing/governance preconditions are satisfied. It is the thing a newcomer runs to *see the suite work*. Charter remains a planned integration.

## Relationship to "elspeth"

Loomweave names **elspeth** (~425k LOC real Python) as its first-customer scale target. Lacuna is the small demo app — complementary, not the same role. Lacuna is the showcase; elspeth is the scale proof.

> Lacuna is documented here because the hub is the federation's front door and the demo is part of the federation story. It is **not** counted in the roster ([doctrine.md](../doctrine.md), [conflict-register.md](../conflict-register.md) §A-2).
