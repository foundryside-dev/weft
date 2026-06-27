# Agent prompt — full live dogfood + merge-gate validation (give to a LACUNA-rooted agent)

> **Why lacuna-rooted:** a hub-dispatched agent inherits the hub's MCP wiring and
> *misroutes* member MCP calls (false verdicts). This validation MUST run from a
> session rooted in `~/lacuna` so the member MCP servers resolve correctly. Copy
> everything below the line into that agent.

---

You are running a **full live cross-member dogfood** of the Weft suite from the
`~/lacuna` harness. It doubles as the **merge gate** for two un-merged enrich-only
fills (PM session 2026-06-27/28). Work methodically; report raw results. Do not
push or merge anything — your output decides whether the PM merges.

## Part 0 — Install the suite at the versions under test (uv)

Install the **latest** of every member, but for the two fills install their
**feature branches** (the whole point is to validate them live):

- loomweave → branch **`feat/warpline-churn-consumer`** (the churn fill):
  `uv tool install --force --reinstall "git+file:///home/john/loomweave@feat/warpline-churn-consumer"`
  (loomweave also ships `loomweave-plugin-python` / `loomweave-plugin-rust` — reinstall those from the same ref if the dogfood needs them).
- legis → branch **`feat/plainweave-preflight-consumer`** (the Plainweave-landing fill):
  `uv tool install --force --reinstall "git+file:///home/john/legis@feat/plainweave-preflight-consumer"`
- filigree, wardline, warpline → latest **`main`** (`git+file:///home/john/<m>@main`).
- **plainweave → 1.0.0 from PyPI** (`uv tool install --force plainweave`). **NOTE:** plainweave's local
  `main` wheel build is currently BROKEN (`weft-5b26c6129d` — hatchling "second file in wheel archive"),
  so do NOT install from local main; 1.0.0 is the working published version and is what legis's consumer
  was contract-tested against.
- Run lacuna's provisioning: `cd ~/lacuna && make setup` (provisions `audit_log` etc.).
- **Assert + record the installed version of every tool** (`uv tool list`) before proceeding. If any tool
  fails to install, STOP and report — do not dogfood a half-installed suite.

## Part 1 — Standard full dogfood (the north-star)

Run lacuna's normal dogfood (`make verify` and/or the dogfood targets; see
`~/lacuna/docs/dogfood/` for the latest report format). Record:
- the **4 federation joins** green/red (the north-star: dogfood pass rate);
- the planted-lacuna defects surfaced *and tracked using the suite, not grep*;
- any seam that returns a **confident-empty** answer (the seam-health failure mode — an empty/partial/stale
  result with NO machine-readable reason is a FAIL even if it "looks" clean).
- Keep the tree clean before `make verify` (legis signing records ✅ only on a clean tree; ledger/DBs/
  findings.jsonl stay gitignored).

## Part 2 — Targeted merge-gate validation of the two fills

**2A. Loomweave churn/recency consumer (hub `weft-670ec2fe90`).** With **warpline live**:
- Call `entity_high_churn_list` and `entity_recent_change_list`. Assert they return real churn data ranked
  by warpline's change count, each item carrying `churn_count` + `churn_source: "warpline"` (never-observed
  entities present with `churn_count: 0`, not omitted).
- Then **disable warpline** (unconfigure the client) and re-call: assert **honest-empty** — `total: 0`,
  `entities: []`, `churn_source: "warpline"`, a `reason` (`warpline-disabled`/`warpline-unreachable`), a
  `signal` note. It must NOT read as empty-as-clean and must NOT hard-error (JSON-RPC `error` stays null).
- If green, this clears the live-validation follow-up `weft-6fc4a166dc`; the GV-LW-2 golden can be re-marked
  live-captured.

**2B. Legis←Plainweave advisory preflight (hub `weft-46b2f002fa`).** With **plainweave live** (`PLAINWEAVE_MCP_CMD` set):
- Run the legis preflight read (`plainweave_preflight_get` MCP tool / `read_plainweave_preflight`) over a real
  `base..head`. Assert it returns `status: "checked"` with the `weft.plainweave.preflight_facts.v1` envelope
  passed through verbatim (incl. `data.authority_boundary.{local_only:true, live_peer_calls:false,
  governance_verdicts:false}` and `data.freshness`).
- **Disable plainweave** → assert `status: "unavailable"` with a reason (not empty-as-clean, not INTERNAL_ERROR).
- **The enrich-only proof:** run a legis `policy_evaluate` / governance verdict over the same change with
  plainweave present vs absent and assert the **verdict is byte-identical** (plainweave is purely advisory; it
  must never move a verdict).
- If green, this clears `weft-a0d04046f5`; re-mark the legis golden `_provenance.source` → `live-captured` and
  re-pin `GOLDEN_BLOB_SHA`.

## Part 3 — Report (this is the deliverable)

Return: (1) the installed-version table; (2) Part-1 federation-join results + any confident-empty / untracked
defects; (3) Part-2A and Part-2B verdicts (with the actual returned envelopes for the with/without-sibling
cases); (4) any NEW defect surfaced (file nothing — list them for the PM to triage); and (5) a clear
**GO / NO-GO** on merging each fill branch to its member `main`. A NO-GO needs the specific failing assertion.
