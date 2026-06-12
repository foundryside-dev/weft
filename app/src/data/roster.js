// roster.js — the canonical federation roster for the site app.
//
// The hub owns the story, role split, and composition map. Each product repo
// owns its own release facts, so refresh version/count fields from the sibling
// repo before publication.

const ORG = 'https://github.com/foundryside-dev';

export const CORE_MEMBERS = [
  {
    id: 'loomweave',
    name: 'Loomweave',
    thread: 'var(--thread-loomweave)',
    group: 'live core',
    lang: 'Rust',
    domain: 'Code structure + stable identity',
    surface: 'the code-structure surface',
    answers: 'what is this codebase, where do I touch, what is the durable identity?',
    status: 'live · launch core',
    repo: `${ORG}/loomweave`,
    repoLabel: 'foundryside-dev/loomweave',
    repoNote: '',
    authority:
      'codebase structure and stable identity. Owns the entity catalog, code graph, guidance sheets, and the stable identifiers that keep cross-tool links attached through moves and renames.',
    owns: [
      'entity extraction — the 3-segment locator {plugin_id}:{kind}:{qualname}',
      'the code graph (edges) and subsystem clustering',
      'briefings and guidance sheets',
      'the BLAKE3 content_hash over an entity body',
      'stable identity minting, persistence, resolution, and lineage',
    ],
    composes: [
      'resolves stable code identities and lineage so sibling tools can keep links attached through refactors.',
      'stores Wardline analysis facts without needing to understand their internal format.',
      'matches Wardline findings to stable code identities and uses Legis change signals to keep identity history accurate.',
    ],
    facts: [
      ['version', 'v1.1.0-rc4', 'current release line'],
      ['MCP tools', '~42', 'consult-mode tools'],
      ['surfaces', 'CLI + MCP (stdio) + loopback HTTP read API', ''],
      ['scale target', 'elspeth (~425k LOC)', 'first-customer target'],
    ],
    sources: [
      ['README', `${ORG}/loomweave/blob/main/README.md`],
      ['User docs', `${ORG}/loomweave/tree/main/docs/loomweave/1.0`],
      ['Architecture decisions', `${ORG}/loomweave/tree/main/docs/loomweave/adr`],
      ['Integration docs', `${ORG}/loomweave/blob/main/docs/federation/contracts.md`],
    ],
  },
  {
    id: 'filigree',
    name: 'Filigree',
    thread: 'var(--thread-filigree)',
    group: 'live core',
    lang: 'Python',
    domain: 'Work state / issue lifecycle',
    surface: 'the work-state surface',
    answers: 'what work exists, what state is it in, what happened?',
    status: 'live · launch core',
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
      'links between issues and external code identities',
      'HTTP surfaces for existing callers and Weft integrations',
      'the web dashboard (the one real GUI in the suite)',
    ],
    composes: [
      'hosts the local HTTP handoff points used by Weft integrations while keeping existing callers working.',
      'links issues to stable code identities so work can stay attached as code moves.',
      'turns scan results into tracked work and stays useful even when sibling tools are absent.',
    ],
    facts: [
      ['version', 'v3.0.0rc12', 'current release line'],
      ['MCP tools', '116', ''],
      ['HTTP', 'classic + weft generations', ''],
      ['GUI', 'web dashboard', ''],
    ],
    sources: [
      ['Docs site', `${ORG}/filigree/tree/main/docs`],
      ['README', `${ORG}/filigree/blob/main/README.md`],
      ['MCP reference', `${ORG}/filigree/blob/main/docs/mcp.md`],
    ],
  },
  {
    id: 'wardline',
    name: 'Wardline',
    thread: 'var(--thread-wardline)',
    group: 'live core',
    lang: 'Python',
    domain: 'Trust-boundary analysis',
    surface: 'the trust-policy surface',
    answers: 'what is allowed, and does this still satisfy the constraints?',
    status: 'live · launch core',
    repo: `${ORG}/wardline`,
    repoLabel: 'foundryside-dev/wardline',
    repoNote:
      'trust-boundary analysis is deconfliction / policy, not security scanning — this is not a security tool.',
    authority:
      'trust policy and rule enforcement. A semantic-tainting static analyzer over the source itself plus its adjacent declarations.',
    owns: [
      'the trust lattice — an 8-state taint lattice (not a "tier 1–4" model)',
      '3 canonical decorators: external_boundary, trust_boundary, trusted',
      'the PY-WL rule set',
      'the scanner engine and the weft.toml [wardline] + .weft/wardline/ local surface',
      'the reference corpus used to validate the analyzer',
    ],
    composes: [
      'sends findings to Filigree so they become tracked work.',
      'labels findings in a way Loomweave can match to stable code identities.',
      'stores per-entity trust facts with Loomweave and still works when identity data is unavailable.',
      'routes findings through Legis for governed change decisions. Wardline analyses; Legis governs.',
    ],
    facts: [
      ['version', 'v1.0.0rc4', 'current release line'],
      ['analyzer', 'semantic-tainting static analyzer', ''],
      ['output', 'JSONL / SARIF / agent-summary / Legis artifact / native Filigree scan-results', ''],
      ['lattice', '8-state taint lattice', 'not tier 1–4'],
      ['rules', '~20 (PY-WL-101..120)', ''],
    ],
    sources: [
      ['Product site', 'https://wardline.foundryside.dev/'],
      ['Docs site', `${ORG}/wardline/tree/main/docs`],
      ['Weft guide', `${ORG}/wardline/blob/main/docs/guides/weft.md`],
    ],
  },
  {
    id: 'legis',
    name: 'Legis',
    thread: 'var(--thread-legis)',
    group: 'live core',
    lang: 'Python (FastAPI)',
    domain: 'Git/CI governance & attestations',
    surface: 'the governance surface',
    answers: 'what changed, and is this change governed?',
    status: 'live · launch core',
    repo: `${ORG}/legis`,
    repoLabel: 'foundryside-dev/legis',
    repoNote: '',
    authority:
      'git/CI governance and attestations. It uses Loomweave identity data for change decisions and keeps Wardline’s trust analysis separate from governance.',
    owns: [
      'governance verdicts — CLEAR / VIOLATION / UNKNOWN with an honest provenance_gap',
      'the 2×2 enforcement cells — chill / coached / structured / protected',
      'HMAC-signed protected verdicts',
      'stable-identity attestations and the sign-off ledger',
      'the git/CI provenance surfaces',
    ],
    composes: [
      'uses Loomweave identity data without becoming another identity service.',
      'routes Wardline findings through governance cells while preserving Wardline’s trust vocabulary.',
      'links sign-offs to Filigree issues and supplies Loomweave with git rename signals.',
    ],
    facts: [
      ['version', 'v1.0.0', 'current release'],
      ['service', 'HTTP + MCP service live', 'git/CI, overrides, signoff, policy, Wardline routing'],
      ['MCP tools', 'read + governed write actions', 'see src/legis/mcp.py'],
    ],
    sources: [
      ['README', `${ORG}/legis/blob/main/README.md`],
      ['Operator guide', `${ORG}/legis/tree/main/docs/guide`],
      ['Integration posture', `${ORG}/legis/blob/main/docs/federation/sei-conformance.md`],
    ],
  },
];

export const PROPOSED_MEMBERS = [
  {
    id: 'charter',
    name: 'Charter',
    thread: 'var(--thread-charter)',
    group: 'planned extension',
    lang: 'Python',
    domain: 'Requirements, traceability, verification',
    surface: 'the obligations surface',
    answers: 'what must be true, and how do we know it is?',
    status: 'core shipped · Weft integrations planned',
    repo: `${ORG}/charter`,
    repoLabel: 'foundryside-dev/charter',
    repoNote: '',
    authority:
      'requirements, traceability, baselines, and verification evidence: what must be true, how we know it, what claims satisfy it, and what is impacted by a change. Charter can join the suite on its own cadence.',
    owns: [
      'requirements / obligations',
      'the trace-link ontology and authority states',
      'baselines',
      'verification records',
      'impact analysis',
    ],
    composes: [
      'read-only MCP surface is shipped; write workflows, live integrations, impact analysis, durable gaps, import/export, and release-readiness verdicts remain planned.',
      'designed to store stable code identities on trace links, mark links stale when lineage changes, and fall back to file/symbol references when Loomweave is absent.',
      'planned to send preflight facts to Legis while leaving enforcement decisions to Legis.',
    ],
    pending:
      'Charter has a working core and read-only MCP surface. Its Weft integrations are planned, so it appears here as an upcoming extension rather than a live core tool.',
    facts: [
      ['version', 'v0.1.0', 'current release line'],
      ['shipped', 'domain core + read-only MCP surface', ''],
      ['planned', 'write workflows + live integrations + impact analysis', ''],
    ],
    sources: [
      ['README', `${ORG}/charter/blob/main/README.md`],
      ['Concept', `${ORG}/charter/blob/main/docs/concept.md`],
      ['Architecture decisions', `${ORG}/charter/tree/main/docs/architecture/decisions`],
    ],
  },
  {
    id: 'heddle',
    name: 'Heddle',
    thread: 'var(--thread-shuttle)',
    group: 'planned extension',
    lang: 'TBD',
    domain: 'Temporal graph + change impact',
    surface: 'the temporal/change-impact candidate',
    answers: 'what changed over time, and what downstream verification does that imply?',
    status: 'design spike · not admitted',
    repo: null,
    repoLabel: 'local design repo only',
    repoNote: 'Local design repo: ~/heddle; no public/admitted product repo yet.',
    authority:
      'a candidate temporal graph for per-entity change history across runs. Loomweave explains the current codebase; Heddle would explain how it changed over time.',
    owns: [
      'per-entity change history across analysis runs',
      'downstream-affected queries over the call graph',
      'change history keyed on stable code identities',
      're-verification prompts after a diff',
    ],
    composes: [
      'would read from live core tools without changing how those tools work.',
      'would consume Loomweave identity and graph facts without mirroring Loomweave’s current-state graph.',
      'would help Charter and Legis decide what needs re-verification after a change.',
    ],
    pending:
      'Heddle is an early design spike, not a committed member. The next step is proving whether the temporal graph is useful enough to build.',
    facts: [
      ['status', 'design spike', 'validation in progress'],
      ['tracker', 'weft-e4589e6570', 'design validation'],
      ['repo', '~/heddle', 'local design repo; no package/CLI/MCP yet'],
    ],
    sources: [
      ['Local design repo', null],
      ['Weft roadmap idea', `${ORG}/weft/blob/main/roadmap-ideas.md`],
      ['Product decision', `${ORG}/weft/blob/main/pm/product/decisions/0013-post-launch-priority-stack-and-discovery-pipeline.md`],
    ],
  },
];

export const SHUTTLE = {
  id: 'shuttle',
  name: 'Shuttle',
  thread: 'var(--thread-shuttle)',
  group: 'future idea',
  lang: '—',
  domain: 'Change execution (future)',
  answers: 'carry this approved change through the weave, under guard rails.',
  status: 'future idea',
  repo: null,
  repoLabel: 'no repo',
  route: false,
};

export const LACUNA = {
  id: 'lacuna',
  name: 'Lacuna',
  thread: 'var(--lacuna-accent)',
  group: 'demo project',
  lang: 'Python',
  kind: 'demo app',
  repo: `${ORG}/lacuna`,
  repoLabel: 'foundryside-dev/lacuna',
  domain: 'Demo app with seeded issues',
  surface: 'the shared demo project',
  answers: 'what happens when the suite is run against known, repeatable issues?',
  status: 'live demo app',
  blurb:
    'A small demo application with seeded issues. Point the Weft tools at it and watch the suite work end to end.',
  detail:
    'Planted Wardline trust violations (PY-WL-101..126 plus fail-closed parse coverage), Loomweave structural findings, and Legis policy-boundary evidence, tracked through the tour manifest. The flaws are intentional and permanent — removing one fails make verify.',
  authority:
    'the demo app, seeded-issue manifest, tour harness, generated explainers, and combination-matrix coverage for showing the Weft tools together.',
  owns: [
    'the clean-core app plus isolated planted flaws',
    'tour/lacunae.toml as the single source of truth for flaws',
    'the tour harness that degrades honestly when a tool is absent',
    'generated narrative docs and per-lacuna explainers',
  ],
  composes: [
    'Wardline scans the seeded trust violations and keeps expected demo findings from blocking the tour.',
    'Loomweave surfaces structural lacunae such as dead code, import cycles, duplicate locators, entry points, and coupling hotspots.',
    'Filigree receives findings as tracked work; Legis participates in the live core path. Charter remains labelled as a planned integration.',
  ],
  pending:
    'Lacuna is a demo project, not a Weft tool. Its job is to keep the suite demonstration honest and repeatable.',
  facts: [
    ['setup', 'make setup', 'creates gitignored local secrets'],
    ['tour', 'make tour', 'drives the four live core tools against Lacuna and regenerates docs'],
    ['verification', 'make verify', 'asserts lacunae and docs stay in lockstep'],
  ],
  sources: [
    ['README', `${ORG}/lacuna/blob/main/README.md`],
    ['Tour docs', `${ORG}/lacuna/blob/main/docs/tour.md`],
    ['Matrix', `${ORG}/lacuna/blob/main/docs/matrix.md`],
  ],
};

export const HERO_STATS = [
  { label: 'Live core', value: 4, tone: 'var(--ready)' },
  { label: 'Planned extensions', value: 2, tone: 'var(--thread-charter)' },
  { label: 'Demo app', value: 1, tone: 'var(--lacuna-accent)' },
  { label: 'Runtime / brokers', value: 0, tone: 'var(--text-muted)' },
];

export const MEMBERS = [...CORE_MEMBERS, ...PROPOSED_MEMBERS];
export const SITE_SURFACES = [...CORE_MEMBERS, ...PROPOSED_MEMBERS, LACUNA];

export function memberById(id) {
  return SITE_SURFACES.find((m) => m.id === id);
}
