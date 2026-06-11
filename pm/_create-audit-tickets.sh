#!/usr/bin/env bash
# Create federation-audit gap tickets: hub (weft) parents + member counterparts.
# Convention: member ticket gets label `from-weft-hub` + prose naming the hub id;
# hub ticket gets label `has-counterpart` + a comment naming the member ids.
# No cross-DB deps (deliberate). All tagged `federation-audit` for traceability.
set -uo pipefail
ACTOR=pm-federation-audit
DOC="pm/2026-06-10-federation-interface-audit.md"
MAP=/home/john/weft/pm/_audit-ticket-map.txt
: > "$MAP"

jid() { python3 -c "import sys,json; print(json.load(sys.stdin)['issue_id'])" 2>/dev/null; }

# newhub TYPE PRIO TITLE DESC [PARENT] -> echoes id
newhub() {
  local t=$1 p=$2 title=$3 desc=$4 parent=${5:-}
  local args=(create "$title" --type "$t" -p "$p" --actor "$ACTOR"
              -l federation-audit -l has-counterpart -d "$desc" --json)
  [ -n "$parent" ] && args+=(--parent "$parent")
  ( cd /home/john/weft && filigree "${args[@]}" ) | jid
}

# cp REPO TYPE PRIO TITLE HUBID GAP BODY -> echoes member id
cp_member() {
  local repo=$1 t=$2 p=$3 title=$4 hub=$5 gap=$6 body=$7
  local full="Counterpart of ${hub} (weft federation interface audit 2026-06-10, gap ${gap}). ${body} Authoritative write-up: ${DOC} in the weft hub. Linked by label convention (from-weft-hub), no hard cross-DB dep."
  ( cd /home/john/"$repo" && filigree create "$title" --type "$t" -p "$p" --actor "$ACTOR" \
      -l federation-audit -l from-weft-hub -d "$full" --json ) | jid
}

# link HUBID "members text"  -> label + comment on hub
link() {
  local hub=$1 members=$2
  ( cd /home/john/weft && filigree add-label "$hub" has-counterpart --actor "$ACTOR" >/dev/null 2>&1
    filigree add-comment "$hub" "Member counterparts (federation audit): ${members}" --actor "$ACTOR" >/dev/null 2>&1 )
}

rec() { echo "$1" | tee -a "$MAP"; }

echo "### ORACLE UMBRELLA ###"
UMB=$(newhub task 2 \
  "Federation conformance: stand up an executable cross-repo conformance harness (umbrella)" \
  "Umbrella for the systemic GS-7 gap surfaced by the 2026-06-10 federation interface audit (${DOC}): the same wire contracts are hand-transcribed in 2-3 repos/languages with no shared executable oracle, so producer/consumer drift is undetectable until production. Children: G6 (SEI oracle in wardline CI), G12 (Legis<->Filigree bind/gate real-HTTP oracle), G14 (SEI oracle machine-loaded from canonical JSON across all 3 impls), G15 (Filigree<->Loomweave entity-assoc deserialization oracle), G16 (Legis<->Loomweave rename-JSON parser shared vectors). Goal: one canonical wire-shape fixture per seam, loaded+executed in producer and every consumer CI, with a drift-fail job.")
rec "UMBRELLA oracle-harness = $UMB"

echo "### EXISTING HUB TICKETS: relabel + counterparts ###"

# G1 (existing weft-37455bf407) legis+wardline
G1=weft-37455bf407
m=$(cp_member legis bug 1 "G1: validate \`findings\` as a required key before signature verification (silent zero-route under verified)" $G1 G1 "verify_wardline_artifact (ingest.py:160-241) omits \`findings\` from ARTIFACT_PROVENANCE_FIELDS (ingest.py:28-33); active_defects defaults to [] (ingest.py:357); a producer rename re-signs cleanly and routes zero findings under artifact_status=verified. Fix: add \`findings\` to the required/validated set before sig-verify; shared constant.")
m2=$(cp_member wardline task 2 "G1: emit \`findings\` key from a shared constant + add cross-impl golden vector" $G1 G1 "Producer core/legis.py:252 emits bare \"findings\": no shared constant pins the key name. Fix: register the key as a shared constant both repos; add a golden vector exercising a present, correctly-named findings array.")
link $G1 "legis:$m, wardline:$m2"; rec "G1 $G1 -> legis:$m wardline:$m2"

# G2 (existing weft-feea638ec0) loomweave+legis
G2=weft-feea638ec0
m=$(cp_member loomweave task 3 "G2: expose a resolve-by-historical-locator surface (move-stable SEI backfill)" $G2 G2 "resolve_locator (sei.rs:209-212) matches only current_locator on alive bindings; a stale (pre-move) locator returns not_found. No surface recovers an SEI from a historical locator. Fix: expose resolve-by-historical-locator (or lineage-by-old-locator).")
m2=$(cp_member legis task 3 "G2: consume a move-aware recovery path in SEI backfill" $G2 G2 "sei_backfill.py:83-84 resolves by the stored (old) locator; degrades gracefully to unresolved (sei_backfill.py:121-129) but cannot recover SEIs for entities moved before backfill. Fix: route old locators through the historical-locator surface once Loomweave exposes it.")
link $G2 "loomweave:$m, legis:$m2"; rec "G2 $G2 -> loomweave:$m legis:$m2"

# G3 (existing weft-2f86803f0a) filigree
G3=weft-2f86803f0a
m=$(cp_member filigree bug 2 "G3: enrich-only fallback when a configured Loomweave is unreachable (don't 503 the batch)" $G3 G3 "FiligreeDB allow_local_fallback defaults False (core.py:1670); a configured-but-down Loomweave -> RegistryUnavailableError -> 503 (files.py:670-671) -> whole findings batch dropped. Fix: fall back to local registry on unreachability / flip default / config-time error.")
link $G3 "filigree:$m"; rec "G3 $G3 -> filigree:$m"

# G4 (existing weft-171fc22a50) filigree
G4=weft-171fc22a50
m=$(cp_member filigree bug 2 "G4: FindingsSummary rollups must split suppressed buckets (baselined/waived counted as open)" $G4 G4 "get_*_findings_summary / get_global_findings_stats (db_files.py:2639-2687) bucket severity via _OPEN_FINDINGS_FILTER only, never consulting suppression_state; row-level orthogonality breaks at rollup. Fix: split suppressed buckets or add an actionable-open API.")
link $G4 "filigree:$m"; rec "G4 $G4 -> filigree:$m (NOTE: rescope existing ticket to the rollup; promote path is correctly guarded)"

# G5 (existing weft-7436c1959e) — deployment/ops, hub-only, no member code counterpart
( cd /home/john/weft && filigree add-comment weft-7436c1959e "Federation audit G5: confirmed still real (DEPLOYMENT axis). No member-code counterpart — remediation is the emit-topology runbook pm/2026-06-09-federation-emit-remediation.md (repoint .mcp.json URLs to :8749/api/p/<project>/weft/scan-results, register each store, unregister legacy .filigree). See ${DOC}." --actor "$ACTOR" >/dev/null 2>&1 )
rec "G5 weft-7436c1959e -> (hub-only, deployment; no member counterpart)"

# G6 (existing weft-560f243c95) -> reparent under umbrella; wardline counterpart
G6=weft-560f243c95
( cd /home/john/weft && filigree update $G6 --parent "$UMB" --actor "$ACTOR" >/dev/null 2>&1 )
m=$(cp_member wardline task 2 "G6: run the shared SEI conformance oracle in CI (wardline currently uses FakeClient mocks only)" $G6 G6 "legis runs tests/conformance/test_sei_oracle.py in CI (ci.yml:25); wardline has no equivalent, only FakeClient mocks (test_sei_resolver.py:10-31) and an env-gated non-CI live test. Fix: add wardline/tests/conformance/test_sei_oracle.py as a required CI check.")
link $G6 "wardline:$m"; rec "G6 $G6 (reparented under $UMB) -> wardline:$m"

# G20 (existing weft-a9ae398c5b) filigree
G20=weft-a9ae398c5b
m=$(cp_member filigree bug 4 "G20: migrate_store_to_weft must unregister the legacy .filigree key on relocation" $G20 G20 "register_project has root-based stale-key pruning (server.py:243-253) but migrate_store_to_weft (core.py:816-895) never calls unregister_project, so server.json keeps the legacy .filigree key. Fix: unregister old store dir inside migrate_store_to_weft.")
link $G20 "filigree:$m"; rec "G20 $G20 -> filigree:$m"

# G21 (existing weft-1e7eeec1b6) legis
G21=weft-1e7eeec1b6
m=$(cp_member legis task 4 "G21: scan_route description must document keyless-posture governs (not rejects) dirty trees" $G21 G21 "mcp.py:303-310 implies dirty trees are only handled where signed provenance is required; ingest.py:204-207 actually governs dirty trees in keyless posture too (artifact_status=dirty). Fix: update MCP + HTTP descriptions, keep them in sync.")
link $G21 "legis:$m"; rec "G21 $G21 -> legis:$m"

echo "### NEW HUB TICKETS ###"

# G7 wardline
H=$(newhub bug 3 "G7: Wardline taint write-path 401 routes loud instead of fail-soft, aborting the scan (ADR-036)" "Per ${DOC} gap G7. client.py:225-227 softens only 403; Loomweave 401 on HMAC/clock-skew (auth.rs:198-204) routes loud -> LoomweaveError -> exit 2 before findings return, violating ADR-036 fail-soft. Fix: add 401 to the soft set; document the finite soft-4xx set in ADR-036.")
m=$(cp_member wardline bug 3 "G7: add 401 to the soft-status set in the Loomweave write client (fail-soft)" $H G7 "client.py:225-227 only softens 403; 401 (auth/clock-skew) aborts the scan. Fix: WriteResult(reachable=False, disabled_reason=HMAC_AUTH_FAILED) on 401; doc the soft-4xx set.")
link $H "wardline:$m"; rec "G7 $H -> wardline:$m"

# G8 legis
H=$(newhub bug 3 "G8: Legis governance makes unguarded Loomweave calls (resolve_batch/resolve_sei) — outage 500s identity-gaps + breaks backfill resumability" "Per ${DOC} gap G8. sei_backfill.py:84 and gaps.py:65 call Loomweave unguarded while lineage calls are wrapped; a live-but-down Loomweave 500s /governance/identity-gaps and breaks the resumable-backfill contract. Fix: wrap both in try/except mirroring the lineage pattern; add BrokenResolveClient tests.")
m=$(cp_member legis bug 3 "G8: guard resolve_batch (sei_backfill.py:84) and resolve_sei (gaps.py:65) like lineage" $H G8 "Unguarded calls vs guarded lineage; outage 500s the identity-gaps route and breaks backfill resumability. Fix: degrade to unresolved/skip+log; add BrokenResolveClient tests + an API test that identity-gaps returns unavailable not 500.")
link $H "legis:$m"; rec "G8 $H -> legis:$m"

# G9 wardline
H=$(newhub bug 3 "G9: Wardline :setter/:deleter qualname suffix leaks onto the wire; Loomweave exact-match never reconciles (confidence=None)" "Per ${DOC} gap G9. index.py:133-135 appends :setter/:deleter to Entity.qualname -> metadata.wardline.qualname (finding.py:272-273); Loomweave reconciler does exact byte-match (wardline_reconcile.rs:54-55) and never matches a property setter -> resolution_confidence=None silently. Fix (preferred A): strip the suffix before wire serialization.")
m=$(cp_member wardline bug 3 "G9: strip :setter/:deleter before wire serialization of qualname" $H G9 "The suffix is Wardline's internal dedup discriminator (index.py:68-72) leaking onto the seam. Fix: strip before finding.py:272-273 serialization; regenerate the parity fixture. Document in ADR-018.")
link $H "wardline:$m"; rec "G9 $H -> wardline:$m"

# G10 filigree+loomweave (deployment-model decision)
H=$(newhub task 3 "G10: Reverse-lookup entity-association is per-project scoped; multi-project consumers silently miss bindings (decide topology)" "Per ${DOC} gap G10. GET /api/entity-associations is isolated by DB file (db_entity_associations.py:407-409); Loomweave's URL builder (filigree.rs:711-717) carries no project selector, so issues_for reads only the default project in multi-project server mode. Decide: one-Filigree-per-project (document as by-design) OR add project_key/?project= for multi-project.")
m=$(cp_member filigree task 3 "G10: add optional project scoping to reverse entity-assoc lookup OR document per-project limitation" $H G10 "GET /api/entity-associations is unscoped/default-project in server mode. Fix depends on deployment model; if multi-project supported, add ?project=; else document in contracts.md + federation-sdk.md.")
m2=$(cp_member loomweave task 3 "G10: carry a project selector in the entity-associations URL builder (if multi-project)" $H G10 "filigree.rs:711-717 / config.rs:531-570 / graph.rs:533 carry no project key; issues_for silently reads default project. Fix: optional project_key on FiligreeConfig + ?project= when set, or document the single-project assumption.")
link $H "filigree:$m, loomweave:$m2"; rec "G10 $H -> filigree:$m loomweave:$m2"

# G11 filigree+legis
H=$(newhub bug 3 "G11: bind-issue write provenance unverifiable — Legis signs X-Weft-* headers, Filigree classic route ignores them (dead handshake)" "Per ${DOC} gap G11. Legis signs (client.py:50-69,179-190); Filigree's entity-assoc POST route (entities.py:122-176) performs zero verification; classic routes are excluded from dashboard_auth (:55). Contract-completeness defect, not a breach. Fix: verify the signature (fail-closed) OR document classic API as transport-open and stop emitting dead signatures.")
m=$(cp_member filigree bug 3 "G11: verify X-Weft-Signature on the entity-association POST route (or document transport-open)" $H G11 "entities.py:122-176 ignores X-Weft headers; dashboard_auth.py:55 protects only /weft/*. Fix: verify+fail-closed mirroring the loom surface, or document the classic API is unauthenticated.")
m2=$(cp_member legis task 3 "G11: align signing with Filigree's verification posture (stop dead signatures if route stays open)" $H G11 "Legis signs entity-assoc writes Filigree never checks. Fix: either rely on Filigree verifying, or stop emitting the dead X-Weft-* headers and document the unauthenticated bind.")
link $H "filigree:$m, legis:$m2"; rec "G11 $H -> filigree:$m legis:$m2"

echo "### ORACLE-CLUSTER CHILDREN (under $UMB) ###"

# G12 legis+filigree
H=$(newhub task 3 "G12: real-HTTP oracle for the Legis<->Filigree bind + closure-gate contracts (both sides mock-only today)" "Per ${DOC} gap G12. Legis tests use _FakeFiligree; Filigree tests use legis_stub; the byte-for-byte bind/gate contract is never executed end-to-end. Fix: CI integration fixture (real Legis + real Filigree) running bind->attach->readback->gate, on every change to client.py/entities.py." "$UMB")
m=$(cp_member legis task 3 "G12: add a real-Filigree integration test for bind-issue + closure-gate" $H G12 "_FakeFiligree echoes fields without persisting. Fix: run against a real Filigree server; assert all bound fields + gate outcomes.")
m2=$(cp_member filigree task 3 "G12: add a real-Legis integration test for entity-assoc attach + readback" $H G12 "legis_stub returns canned responses. Fix: run against a real Legis server; assert the attach/readback contract.")
link $H "legis:$m, filigree:$m2"; rec "G12 $H (child $UMB) -> legis:$m filigree:$m2"

# G14 loomweave+legis+wardline
H=$(newhub task 3 "G14: SEI conformance oracle is hand-transcribed in 3 repos/langs, never machine-loaded from the canonical JSON" "Per ${DOC} gap G14. sei-conformance-oracle.json declares itself normative but sei_conformance_oracle.rs encodes scenarios in Rust; legis test_sei_oracle.py transcribes; wardline mocks. Fix: canonical wire-shape file with concrete bodies, loaded+executed in producer + all consumer CIs, with a drift-fail job." "$UMB")
m=$(cp_member loomweave task 3 "G14: make the producer SEI oracle load the canonical JSON (not Rust-encoded scenarios)" $H G14 "sei_conformance_oracle.rs encodes 6 scenarios and never loads sei-conformance-oracle.json. Fix: load the canonical file; treat it as the single source.")
m2=$(cp_member legis task 3 "G14: load the canonical SEI oracle JSON instead of transcribing it" $H G14 "test_sei_oracle.py transcribes responses from the spec. Fix: load the shared canonical fixture; fail on drift.")
m3=$(cp_member wardline task 3 "G14: load the canonical SEI oracle JSON in CI instead of FakeClient mocks" $H G14 "test_sei_resolver.py hand-mocks. Fix: execute the shared canonical fixture in CI.")
link $H "loomweave:$m, legis:$m2, wardline:$m3"; rec "G14 $H (child $UMB) -> loomweave:$m legis:$m2 wardline:$m3"

# G15 loomweave+filigree
H=$(newhub task 3 "G15: no oracle proving Loomweave EntityAssociation deserialization matches Filigree emission; rename hard-fails serde" "Per ${DOC} gap G15. Filigree owns the response shape (db_entity_associations.py:40-72); Loomweave's struct (filigree.rs:78) pins loomweave_entity_id with no serde default/alias; tests use FakeFiligreeClient. A field rename hard-fails deserialization with no degrade and no test trips. Fix: serde alias+default + a real-Filigree deserialization conformance test." "$UMB")
m=$(cp_member loomweave task 3 "G15: add serde alias+default and a real-Filigree deserialization test for EntityAssociation" $H G15 "filigree.rs:78 pins loomweave_entity_id, no default/alias; storage_tools.rs uses a fake client. Fix: #[serde(alias=\"entity_id\", default)] + real-HTTP deser test.")
m2=$(cp_member filigree task 3 "G15: pin entity-assoc response field stability (emit both names through any rename)" $H G15 "dict(row) at db_entity_associations.py owns the shape; an ADR-029 rename could drop loomweave_entity_id. Fix: keep both names through any rename, asserted by a test.")
link $H "loomweave:$m, filigree:$m2"; rec "G15 $H (child $UMB) -> loomweave:$m filigree:$m2"

# G16 legis+loomweave
H=$(newhub task 3 "G16: Legis<->Loomweave rename-JSON parser re-implemented per repo with a one-way conformance test" "Per ${DOC} gap G16. Loomweave parser sei_git.rs:292-311; legis reimplements in test_git_renames_contract.py:20-27; the proof runs only on legis output. Fix: shared fixtures/git-renames-parser-conformance.json run identically in both repos, or a shared parser lib." "$UMB")
m=$(cp_member legis task 3 "G16: run shared rename-parser conformance vectors (two-way)" $H G16 "_parse_like_loomweave reimplements the parser; one-way test. Fix: shared input/expected vectors asserted both directions.")
m2=$(cp_member loomweave task 3 "G16: publish/consume shared rename-parser conformance vectors" $H G16 "parse_legis_rename_json (sei_git.rs:292-311) has no shared vector with legis. Fix: shared fixture both run, or extract a shared lib.")
link $H "legis:$m, loomweave:$m2"; rec "G16 $H (child $UMB) -> legis:$m loomweave:$m2"

echo "### REMAINING NEW HUB TICKETS ###"

# G17 wardline + existing clarion-6ab5668d82 (loomweave)
H=$(newhub bug 3 "G17: Wardline vocab-descriptor consumer fixture drifted (omits schema key) + consumer ignores the schema format gate" "Per ${DOC} gap G17. Producer descriptor.py:32-39 says consumer gates on schema (DESCRIPTOR_SCHEMA='wardline.vocabulary/v1'); Loomweave wardline_descriptor.py:140-188 never reads schema, and its test fixture omits the key. No cross-suite test validates the consumer against producer bytes. Loomweave half tracked under clarion-6ab5668d82 (broad Task-B scope).")
m=$(cp_member wardline task 3 "G17: emit a generated vocab-descriptor fixture as a shared artifact for the consumer suite" $H G17 "descriptor.py builds the descriptor; the consumer test fixture is hand-copied and omits the schema key. Fix: commit a generated fixture from build_vocabulary_descriptor(); both suites import it.")
( cd /home/john/loomweave && filigree add-label clarion-6ab5668d82 from-weft-hub --actor "$ACTOR" >/dev/null 2>&1
  filigree add-comment clarion-6ab5668d82 "Federation audit G17 (hub ${H}): the schema-format gate + consumer-fixture-from-producer-bytes halves are the focused scope here — wardline_descriptor.py:146 gates on version only, never schema; add schema==DESCRIPTOR_SCHEMA validation and consume a generated fixture. See ${DOC}." --actor "$ACTOR" >/dev/null 2>&1 )
link $H "wardline:$m, loomweave:clarion-6ab5668d82 (existing, relabeled)"; rec "G17 $H -> wardline:$m loomweave:clarion-6ab5668d82(existing)"

# G18 filigree+wardline
H=$(newhub task 4 "G18: Filigree hardcodes the suppression-filter vocabulary independent of Wardline's SuppressionState enum (no oracle)" "Per ${DOC} gap G18. wardline finding.py:67-72 defines {ACTIVE,BASELINED,WAIVED,JUDGED}; filigree db_files.py:97 hardcodes VALID_SUPPRESSION_FILTERS. A 5th state silently fails to filter. Fix: derive from the enum or add a cross-repo contract test.")
m=$(cp_member filigree task 4 "G18: derive VALID_SUPPRESSION_FILTERS from Wardline's enum or add a sync test" $H G18 "db_files.py:97 hardcodes the set. Fix: introspect the enum or assert membership equality each run.")
m2=$(cp_member wardline task 4 "G18: publish SuppressionState as a consumable contract for Filigree's filter set" $H G18 "finding.py:67-72 owns the enum; Filigree restates it. Fix: expose it as a shared descriptor/constant.")
link $H "filigree:$m, wardline:$m2"; rec "G18 $H -> filigree:$m wardline:$m2"

# G19 wardline
H=$(newhub task 4 "G19: Wardline soft/loud HTTP routing keys on status code, not Loomweave's closed ErrorCode enum" "Per ${DOC} gap G19. client.py routes on status code (>=500 and 403 soft); the closed HttpErrorCode enum (errors.rs:46-62) is the source of truth. A new soft 4xx (e.g. 429) misclassifies loud. Fix: whitelist soft 4xx / probe _capabilities / document the finite set in an ADR.")
m=$(cp_member wardline task 4 "G19: classify soft/loud on Loomweave's ErrorCode, not raw status" $H G19 "client.py:8-11,176-178,225-226 routes on status code. Fix: whitelist known soft 4xx or key on the closed enum; document the set.")
link $H "wardline:$m"; rec "G19 $H -> wardline:$m"

# G22 filigree
H=$(newhub task 4 "G22: unscoped classic reads silently resolve to the default project with no consumer warning/docs" "Per ${DOC} gap G22. dashboard.py:978-982 emits X-Filigree-Project on unscoped classic reads; fail-closed correctly blocks unscoped WRITES, but unscoped READS silently return default-project data with no doc warning. Fix: document in contracts.md/federation-sdk.md; optionally a stderr warning.")
m=$(cp_member filigree task 4 "G22: document that unscoped classic reads default to the default project (+ X-Filigree-Project)" $H G22 "No code change required. Fix: contracts.md note + federation-sdk.md §2.2 'scope reads via ?project='; optional stderr warning.")
link $H "filigree:$m"; rec "G22 $H -> filigree:$m"

# G23 filigree
H=$(newhub task 4 "G23: ADR-002 documents stale /api/loom paths; code serves /api/weft" "Per ${DOC} gap G23. ADR-002 lines 57,66,87 say /api/loom; dashboard.py:916-921 mounts /api/weft; test_api.py:18-26 asserts /api/loom is 404. Fix: update ADR-002 §1/§4 to /api/weft with a rename note; reference in the test comment + CHANGELOG.")
m=$(cp_member filigree task 4 "G23: update ADR-002 /api/loom -> /api/weft with a rename note" $H G23 "Stale ADR example. Fix: correct §1/§4, add the rename rationale, cross-reference the test + CHANGELOG.")
link $H "filigree:$m"; rec "G23 $H -> filigree:$m"

# G24 wardline+loomweave
H=$(newhub task 4 "G24: module_dotted_name split primitives differ on non-normalized paths; 'byte-for-byte' claim understates the precondition" "Per ${DOC} gap G24. wardline qualname.py:47 uses rel_path.split('/'); loomweave extractor.py:308 uses PurePosixPath(...).parts; they agree on normalized relpaths but diverge on malformed input. Fix: document the normalized-relpath precondition both sides (or adopt PurePosixPath both).")
m=$(cp_member wardline task 4 "G24: document module_dotted_name's normalized-relpath precondition (or adopt PurePosixPath)" $H G24 "qualname.py:30,47. Fix: state the precondition or match the consumer's path primitive.")
m2=$(cp_member loomweave task 4 "G24: align/extract path-split primitive with Wardline (extractor.py:308)" $H G24 "PurePosixPath(...).parts normalizes differently than wardline's split. Fix: document or converge.")
link $H "wardline:$m, loomweave:$m2"; rec "G24 $H -> wardline:$m loomweave:$m2"

# G25 loomweave+wardline
H=$(newhub task 4 "G25: qualname parity fixtures asymmetric; Loomweave lacks property-setter coverage so G9 is undetectable" "Per ${DOC} gap G25. Wardline qualnames.json:85-91 has property_setter_first_wins; Loomweave's fixture (qualified_name_vectors :93-143) has zero property-setter cases; Loomweave doesn't run Wardline's corpus; the live oracle is deferred. So G9 is invisible to the proof mechanism. Fix: add the setter vector to Loomweave, cross-run Wardline's corpus, ship the deferred live oracle.")
m=$(cp_member loomweave task 4 "G25: add property-setter qualname vector + cross-run Wardline's conformance corpus" $H G25 "Loomweave fixture lacks setter cases; test_extractor.py doesn't run Wardline's corpus. Fix: add the vector + cross-run; ship the deferred live oracle.")
m2=$(cp_member wardline task 4 "G25: expose the qualname conformance corpus for Loomweave to cross-run" $H G25 "qualnames.json:85-91 has the setter case Loomweave never runs. Fix: make the corpus consumable by the Loomweave suite.")
link $H "loomweave:$m, wardline:$m2"; rec "G25 $H -> loomweave:$m wardline:$m2"

echo; echo "=== DONE. Map written to $MAP ==="
cat "$MAP"