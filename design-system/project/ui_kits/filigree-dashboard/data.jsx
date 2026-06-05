// data.jsx — fake Filigree project data (Loom federation development).
// Shapes mirror the real dashboard: status_category drives the 3 columns,
// is_ready = no open blockers, impact = downstream blocks count.

const TYPE_ICONS = { bug: "🐛", feature: "✨", task: "📋", epic: "📊", milestone: "🎯" };
const TYPE_COLORS = { bug: "#EF4444", feature: "#8B5CF6", task: "#3B82F6", epic: "#F59E0B", milestone: "#10B981" };
const CATEGORY_COLORS = { open: "#64748B", wip: "#38BDF8", done: "#7B919C" };
const PRIORITY_COLORS = { 0: "#EF4444", 1: "#F97316", 2: "#6B7280", 3: "#D1D5DB", 4: "#D1D5DB" };
const PRIORITY_LABEL = ["Critical", "High", "Medium", "Low", "Backlog"];

const ISSUES = [
  { id: "fg-7f3a2b", type: "feature", priority: 0, title: "SEI backfill: locator → stable identity", status: "building", cat: "wip", assignee: "agent-3", ageH: 2, ready: true, impact: 5, blocked_by: [],
    body: "Filigree's locator→SEI backfill is the remaining lock gate for the suite identity track. Until issues key on SEI, Clarion+Filigree orphans on rename.",
    deps: ["fg-1c4099"] },
  { id: "fg-da8d50", type: "bug", priority: 1, title: "Dashboard split-brain on relocated db path", status: "fixing", cat: "wip", assignee: "agent-1", ageH: 6, ready: false, impact: 2, blocked_by: ["fg-9920aa"],
    body: "When .filigree.conf relocates the db, the dashboard opened .filigree/filigree.db while CLI/MCP opened the conf path — a split-brain view. Honour from_conf.",
    deps: [] },
  { id: "fg-1c4099", type: "task", priority: 2, title: "Write federation contract index pointer doc", status: "open", cat: "open", assignee: null, ageH: 0, ready: true, impact: 1, blocked_by: [],
    body: "Each cross-product contract should point to the authoritative schema in the owning repo. loom owns the index; repos own the schemas.", deps: [] },
  { id: "fg-44b7e1", type: "feature", priority: 1, title: "Loom HTTP generation /api/loom/* contracts", status: "reviewing", cat: "wip", assignee: "agent-2", ageH: 1, ready: true, impact: 3, blocked_by: [],
    body: "Stable /api/loom/* generation with classic compatibility for existing callers. Phase C fills endpoints one at a time.", deps: [] },
  { id: "fg-9920aa", type: "bug", priority: 0, title: "Optimistic claim race in multi-agent start-next", status: "confirmed", cat: "open", assignee: null, ageH: 0, ready: true, impact: 4, blocked_by: [],
    body: "Two agents calling start-next-work can double-claim under load. Optimistic lock must reject the second writer cleanly.", deps: [] },
  { id: "fg-301f8c", type: "epic", priority: 1, title: "Federation 2.0 — suite-aware integrations", status: "in_progress", cat: "wip", assignee: "agent-2", ageH: 9, ready: true, impact: 0, blocked_by: [],
    body: "Umbrella epic for the Loom generation: SEI-keyed links, Wardline finding ingest, Legis sign-off binding.", deps: [] },
  { id: "fg-77aa12", type: "task", priority: 2, title: "context.md regen on every mutation", status: "done", cat: "done", assignee: "agent-1", ageH: 30, ready: false, impact: 0, blocked_by: [],
    body: "Pre-compute context.md so the session hook injects a fresh orientation at startup. Regenerate on every write.", deps: [] },
  { id: "fg-5510bd", type: "feature", priority: 2, title: "Wardline finding → tracked issue cascade", status: "done", cat: "done", assignee: "agent-3", ageH: 48, ready: false, impact: 0, blocked_by: [],
    body: "Ingest Wardline SARIF/native findings and open triage issues automatically. Findings become tracked work.", deps: [] },
  { id: "fg-2`2b04e", type: "task", priority: 3, title: "Graph v2 dependency explorer perf pass", status: "open", cat: "open", assignee: null, ageH: 0, ready: true, impact: 0, blocked_by: [],
    body: "Cytoscape+dagre layout slows past ~400 nodes. Cap render and add a diagnostics bar.", deps: [] },
  { id: "fg-88c3f0", type: "bug", priority: 2, title: "Stale-claim sweep misses ethereal restarts", status: "triage", cat: "open", assignee: null, ageH: 0, ready: true, impact: 1, blocked_by: [],
    body: "After an ethereal dashboard idle-shutdown, stale claims aren't released until next mutation.", deps: [] },
  { id: "fg-93de77", type: "task", priority: 3, title: "Codex MCP autodiscovery on install", status: "done", cat: "done", assignee: "agent-1", ageH: 72, ready: false, impact: 0, blocked_by: [],
    body: "filigree install --codex writes the MCP entry via runtime autodiscovery.", deps: [] },
  { id: "fg-61b0a4", type: "feature", priority: 1, title: "Bearer auth for federation + MCP surfaces", status: "approved", cat: "open", assignee: null, ageH: 0, ready: true, impact: 2, blocked_by: [],
    body: "FILIGREE_FEDERATION_API_TOKEN gates /api/loom/*, scan ingest, and /mcp. Dashboard UI stays open on loopback.", deps: [] },
];
// fix a stray id typo
ISSUES.forEach((i) => { i.id = i.id.replace("`", ""); });

const PROJECT = { name: "filigree", version: "2.0.1" };

Object.assign(window, { ISSUES, PROJECT, TYPE_ICONS, TYPE_COLORS, CATEGORY_COLORS, PRIORITY_COLORS, PRIORITY_LABEL });
