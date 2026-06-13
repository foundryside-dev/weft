// data.js — ported from design-system/project/ui_kits/filigree-dashboard/data.jsx
// to ESM: Object.assign(window, …) → named exports; fixed the stray-id typo at
// definition (the original patched it at runtime). Fake Filigree project data;
// shapes mirror the real dashboard.
//
// The original kit displayed an old Filigree version. Keep the demo chrome
// aligned with the current release line while the /demos page makes clear that
// the issue data is illustrative.

export const TYPE_ICONS = { bug: '🐛', feature: '✨', task: '📋', epic: '📊', milestone: '🎯' };
// Loom palette — hex (not var()) because cards build alpha tints by string-concat (catColor + "33").
export const TYPE_COLORS = { bug: '#E25C49', feature: '#B79BF2', task: '#56B7E2', epic: '#E9B04A', milestone: '#5FB98E' };
export const CATEGORY_COLORS = { open: '#8A7A64', wip: '#56B7E2', done: '#897C66' };
export const PRIORITY_COLORS = { 0: '#E25C49', 1: '#EC8A3C', 2: '#8A7A64', 3: '#C9BBA0', 4: '#C9BBA0' };
export const PRIORITY_LABEL = ['Critical', 'High', 'Medium', 'Low', 'Backlog'];

export const ISSUES = [
  { id: 'fg-7f3a2b', type: 'feature', priority: 0, title: 'Stable identity for issue links', status: 'building', cat: 'wip', assignee: 'agent-3', ageH: 2, ready: true, impact: 5, blocked_by: [],
    body: 'Keep issues attached to the same code entity when files or symbols move, using Loomweave identity data.',
    deps: ['fg-1c4099'] },
  { id: 'fg-da8d50', type: 'bug', priority: 1, title: 'Dashboard split-brain on relocated db path', status: 'fixing', cat: 'wip', assignee: 'agent-1', ageH: 6, ready: false, impact: 2, blocked_by: ['fg-9920aa'],
    body: 'When .filigree.conf relocates the db, the dashboard opened .filigree/filigree.db while CLI/MCP opened the conf path — a split-brain view. Honour from_conf.',
    deps: [] },
  { id: 'fg-1c4099', type: 'task', priority: 2, title: 'Publish integration docs', status: 'open', cat: 'open', assignee: null, ageH: 0, ready: true, impact: 1, blocked_by: [],
    body: 'Give users one place to understand how each tool connects, with links back to the owning project docs.', deps: [] },
  { id: 'fg-44b7e1', type: 'feature', priority: 1, title: 'Shared local API for Weft integrations', status: 'reviewing', cat: 'wip', assignee: 'agent-2', ageH: 1, ready: true, impact: 3, blocked_by: [],
    body: 'Add Weft-specific HTTP endpoints while preserving compatibility for existing Filigree callers.', deps: [] },
  { id: 'fg-9920aa', type: 'bug', priority: 0, title: 'Optimistic claim race in multi-agent start-next', status: 'confirmed', cat: 'open', assignee: null, ageH: 0, ready: true, impact: 4, blocked_by: [],
    body: 'Two agents calling start-next-work can double-claim under load. Optimistic lock must reject the second writer cleanly.', deps: [] },
  { id: 'fg-301f8c', type: 'epic', priority: 1, title: 'Weft integrations', status: 'in_progress', cat: 'wip', assignee: 'agent-2', ageH: 9, ready: true, impact: 0, blocked_by: [],
    body: 'Umbrella epic for stable code links, Wardline finding intake, and Legis sign-off binding.', deps: [] },
  { id: 'fg-77aa12', type: 'task', priority: 2, title: 'context.md regen on every mutation', status: 'done', cat: 'done', assignee: 'agent-1', ageH: 30, ready: false, impact: 0, blocked_by: [],
    body: 'Pre-compute context.md so the session hook injects a fresh orientation at startup. Regenerate on every write.', deps: [] },
  { id: 'fg-5510bd', type: 'feature', priority: 2, title: 'Wardline finding → tracked issue cascade', status: 'done', cat: 'done', assignee: 'agent-3', ageH: 48, ready: false, impact: 0, blocked_by: [],
    body: 'Ingest Wardline SARIF/native findings and open triage issues automatically. Findings become tracked work.', deps: [] },
  { id: 'fg-22b04e', type: 'task', priority: 3, title: 'Graph v2 dependency explorer perf pass', status: 'open', cat: 'open', assignee: null, ageH: 0, ready: true, impact: 0, blocked_by: [],
    body: 'Cytoscape+dagre layout slows past ~400 nodes. Cap render and add a diagnostics bar.', deps: [] },
  { id: 'fg-88c3f0', type: 'bug', priority: 2, title: 'Stale-claim sweep misses ethereal restarts', status: 'triage', cat: 'open', assignee: null, ageH: 0, ready: true, impact: 1, blocked_by: [],
    body: "After an ethereal dashboard idle-shutdown, stale claims aren't released until next mutation.", deps: [] },
  { id: 'fg-93de77', type: 'task', priority: 3, title: 'Codex MCP autodiscovery on install', status: 'done', cat: 'done', assignee: 'agent-1', ageH: 72, ready: false, impact: 0, blocked_by: [],
    body: 'filigree install --codex writes the MCP entry via runtime autodiscovery.', deps: [] },
  { id: 'fg-61b0a4', type: 'feature', priority: 1, title: 'Bearer auth for federation + MCP surfaces', status: 'approved', cat: 'open', assignee: null, ageH: 0, ready: true, impact: 2, blocked_by: [],
    body: 'FILIGREE_FEDERATION_API_TOKEN gates /api/weft/*, scan ingest, and /mcp. Dashboard UI stays open on loopback.', deps: [] },
];

// Current Filigree release line for the demo chrome.
export const PROJECT = { name: 'filigree', version: '3.0.0rc12' };
