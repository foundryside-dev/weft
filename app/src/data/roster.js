// roster.js — the canonical federation roster, the single source of truth for the
// app. Landing-card copy mirrors design-system/project/ui_kits/weft-hub/HubData.jsx
// (name, thread, lang, domain, status, answers). Repo URLs and per-member page
// bodies come from the FACTS PACK (members/<member>.md briefings). Versions/counts
// are hub-owned SNAPSHOTS — every member page labels them "snapshot — not
// authoritative; see the repo".

// foundryside-dev org. Per www/README: weft/wardline/lacuna resolve today;
// filigree/clarion/legis/charter still 404 until they migrate — expected.
const ORG = 'https://github.com/foundryside-dev';

export const MEMBERS = [
  {
    id: 'loomweave',
    name: 'Loomweave',
    thread: 'var(--thread-loomweave)',
    lang: 'Rust',
    domain: 'Code structure + identity authority (SEI)',
    surface: 'the code-structure surface',
    answers: 'what is this codebase, where do I touch, what is the durable identity?',
    status: 'built · in use',
    repo: `${ORG}/clarion`,
    repoLabel: 'foundryside-dev/clarion',
    repoNote: 'the repo is named clarion; the Loomweave rename is display-only.',
    authority:
      'structural truth about the codebase — and the suite’s identity authority. Owns the entity catalog, the code graph, guidance sheets, and the Stable Entity Identity (SEI) every cross-tool binding keys on.',
    owns: [
      'entity extraction — the 3-segment locator {plugin_id}:{kind}:{qualname}',
      'the code graph (edges) and subsystem clustering',
      'briefings and guidance sheets',
      'the BLAKE3 content_hash over an entity body',
      'SEI minting / persistence / resolution / lineage — load-bearing for suite identity',
    ],
    composes: [
      'identity authority: serves resolve / resolve_sei / lineage / _capabilities; the SEI standard is the suite contract (LOCKED 2026-06-05), Loomweave verifies member conformance against the oracle.',
      'hosts Wardline’s taint-fact store opaque (never parses the blob).',
      'reconciles Wardline’s metadata.wardline.qualname to an SEI; consumes Legis’s git-rename signal through a typed seam.',
    ],
    facts: [
      ['version', 'v1.0.0', 'clean-break rename — shipped as Clarion 1.3.0, now Loomweave 1.0.0'],
      ['MCP tools', '~39', 'consult-mode tools'],
      ['surfaces', 'CLI + MCP (stdio) + loopback HTTP read API', ''],
      ['scale target', 'elspeth (~425k LOC)', 'first-customer target'],
    ],
  },
  {
    id: 'filigree',
    name: 'Filigree',
    thread: 'var(--thread-filigree)',
    lang: 'Python',
    domain: 'Work state / issue lifecycle',
    surface: 'the work-state surface',
    answers: 'what work exists, what state is it in, what happened?',
    status: 'built · in use',
    repo: `${ORG}/filigree`,
    repoLabel: 'foundryside-dev/filigree',
    repoNote: '',
    authority:
      'work state and workflow lifecycle. Answers what work exists, what state it is in, and what happened. Owns issues, observations, and finding-triage state.',
    owns: [
      'issues & workflow state machines',
      'dependencies and critical-path',
      'observations (14-day TTL)',
      'files & scan-findings',
      'the entity_associations table (opaque entity ids)',
      'the named HTTP generations — classic /api/* and weft /api/weft/*',
      'the web dashboard (the one real GUI in the suite)',
    ],
    composes: [
      'hosts the federation transport: named, pinnable HTTP generations (classic frozen vs weft) — evolution by adding a new generation, never mutating one.',
      'binds an issue to your opaque entity id (an SEI) via the classic /api/issue/… entity-association surface; drift detection is the consumer’s job via content_hash_at_attach.',
      'scan-results intake turns findings into tracked work; loose cooperation — every weft-generation endpoint is functional with peers absent.',
    ],
    facts: [
      ['version', 'v3.0.0rc2', 'release candidate, branch release/3.0.0'],
      ['MCP tools', '116', ''],
      ['HTTP', 'classic + weft generations', ''],
      ['GUI', 'web dashboard', ''],
    ],
  },
  {
    id: 'wardline',
    name: 'Wardline',
    thread: 'var(--thread-wardline)',
    lang: 'Python',
    domain: 'Trust-boundary analysis',
    surface: 'the trust-policy surface',
    answers: 'what is allowed, and does this still satisfy the constraints?',
    status: 'built · in use',
    repo: `${ORG}/wardline`,
    repoLabel: 'foundryside-dev/wardline',
    repoNote:
      'trust-boundary analysis is deconfliction / policy, not security scanning — this is not a security tool.',
    authority:
      'trust policy and rule enforcement. A semantic-tainting static analyzer over the source itself plus its adjacent declarations — it has no separate authoritative config store.',
    owns: [
      'the trust lattice — an 8-state taint lattice (not a "tier 1–4" model)',
      '3 canonical decorators: external_boundary, trust_boundary, trusted',
      '~20 rules — PY-WL-101..120',
      'the scanner engine and the wardline.yaml manifest',
      'the corpus of ground-truth specimens',
    ],
    composes: [
      'emits findings straight to Filigree’s weft transport (native emitter); findings become tracked work.',
      'produces metadata.wardline.qualname (byte-for-byte with Loomweave’s extractor) that Loomweave reconciles to an SEI.',
      'computes per-entity taint and persists it opaque to Loomweave; degrades gracefully when the sei capability is absent.',
      'findings route through Legis’s 2×2 enforcement cells — trust vocabulary passes through verbatim. "Wardline analyses, Legis governs."',
    ],
    facts: [
      ['version', 'v1.0.0rc1', ''],
      ['analyzer', 'semantic-tainting static analyzer', ''],
      ['output', 'SARIF v2.1.0', ''],
      ['lattice', '8-state taint lattice', 'not tier 1–4'],
      ['rules', '~20 (PY-WL-101..120)', ''],
    ],
  },
  {
    id: 'legis',
    name: 'Legis',
    thread: 'var(--thread-legis)',
    lang: 'Python (FastAPI)',
    domain: 'Git/CI governance & attestations',
    surface: 'the governance surface',
    answers: 'what changed, and is this change governed?',
    status: 'built · in use',
    repo: `${ORG}/legis`,
    repoLabel: 'foundryside-dev/legis',
    repoNote: '',
    authority:
      'git/CI governance and attestations — change provenance and SEI-keyed governance verdicts. A consumer of Loomweave’s identity; it never re-adjudicates trust.',
    owns: [
      'governance verdicts — CLEAR / VIOLATION / UNKNOWN with an honest provenance_gap',
      'the 2×2 enforcement cells — chill / coached / structured / protected',
      'HMAC-signed protected verdicts',
      'SEI-keyed attestations + the sign-off ledger',
      'the git/CI provenance surfaces',
    ],
    composes: [
      'pull-only consumer of Loomweave’s SEI surface; re-establishes lineage integrity at its own boundary (prefix-hash custody). Passes the SEI oracle as a consumer.',
      'one judge, not two: routes Wardline findings through the enforcement cells, trust vocabulary verbatim — never re-adjudicates.',
      'binds a sign-off to a Filigree issue via the entity-association surface; supplies Loomweave’s matcher with the git-rename signal.',
    ],
    facts: [
      ['version', 'v1.0.0rc3', 'rc1 shipped 2026-06-03'],
      ['service', 'HTTP service live', 'git/CI, overrides, signoff, policy, Wardline routing'],
      ['MCP tools', '~13', 'read-mode'],
    ],
  },
  {
    id: 'charter',
    name: 'Charter',
    thread: 'var(--thread-charter)',
    lang: 'Python',
    domain: 'Requirements, traceability, verification',
    surface: 'the obligations surface',
    answers: 'what must be true, and how do we know it is?',
    status: 'scaffolded',
    repo: `${ORG}/charter`,
    repoLabel: 'foundryside-dev/charter',
    repoNote: '',
    authority:
      'requirements, traceability, baselines, and verification evidence — what must be true, how we know it, what claims satisfy it, and what is impacted by a change. A read-only consumer of its peers.',
    owns: [
      'requirements / obligations',
      'the trace-link ontology and authority states',
      'baselines',
      'verification records',
      'impact analysis',
    ],
    composes: [
      'newest realized member (started 2026-06-04); a read-only consumer that never assumes a peer’s authority.',
      'SEI consumer (ADR-005): stores SEI opaque on trace links, marks links stale on lineage change, falls back to file/symbol refs when Loomweave is absent.',
      'designed to publish the weft.charter.preflight_facts.v1 envelope to Legis (facts only — Legis alone decides enforcement).',
    ],
    // The honesty constraint: state the pending status loudly on the page.
    pending:
      'Charter’s domain core and a read-only MCP surface (10 read tools) are SHIPPED; its federation adapters remain PENDING. The composition bindings below are designed in ADRs but not yet wired.',
    facts: [
      ['version', 'v0.1.0', ''],
      ['shipped', 'domain core + read-only MCP surface (10 read tools)', ''],
      ['federation adapters', 'PENDING', 'designed in ADRs, not yet wired'],
    ],
  },
];

export const SHUTTLE = {
  id: 'shuttle',
  name: 'Shuttle',
  thread: 'var(--thread-shuttle)',
  lang: '—',
  domain: 'Change execution (future)',
  answers: 'carry this approved change through the weave, under guard rails.',
  status: 'roadmap thought-bubble',
  repo: null,
  repoLabel: 'no repo',
};

export const LACUNA = {
  id: 'lacuna',
  name: 'Lacuna',
  lang: 'Python',
  kind: 'demonstration specimen',
  repo: `${ORG}/lacuna`,
  repoLabel: 'foundryside-dev/lacuna',
  blurb:
    'The deliberately-flawed app the suite is run against — "the MissingNo of the suite". Point the tools at it and watch them work.',
  detail:
    'Planted Wardline trust violations (PY-WL-101..104) and Loomweave structural findings (dead code, import cycles), tracked in Filigree. The flaws are intentional and permanent — removing one fails make verify.',
};

export const HERO_STATS = [
  { label: 'Realized members', value: 5, tone: 'var(--ready)' },
  { label: 'Pairwise combos', value: 10, tone: 'var(--accent)' },
  { label: 'Runtime / brokers', value: 0, tone: 'var(--text-muted)' },
  { label: 'On the roadmap', value: 1, tone: 'var(--thread-shuttle)' },
];

export function memberById(id) {
  return MEMBERS.find((m) => m.id === id);
}
