// Terminal.jsx — Loom CLI / agent-first terminal surface.
// The non-GUI members (Clarion, Wardline, Legis, Charter) live here: CLI + MCP
// over stdio. Sessions are drawn from each tool's real README output.
const { useState, useEffect, useRef } = React;

// line kinds → color
const K = {
  cmd:   { color: "var(--text-primary)" },
  ps:    { color: "var(--ready)" },          // prompt $
  out:   { color: "var(--text-secondary)" },
  dim:   { color: "var(--text-muted)" },
  ok:    { color: "var(--ready)" },
  warn:  { color: "var(--aging)" },
  err:   { color: "var(--stale)" },
  acc:   { color: "var(--accent)" },
};
const thread = (id) => ({ color: `var(--thread-${id})` });

function L({ k = "out", ind = 0, children }) {
  return <div style={{ ...K[k], paddingLeft: ind * 14, whiteSpace: "pre-wrap" }}>{children}</div>;
}
function Prompt({ tool, cmd }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
      <span style={K.ps}>$</span>
      <span style={{ color: "var(--text-primary)" }}>{tool}{" "}<span style={{ color: "var(--text-secondary)" }}>{cmd}</span></span>
    </div>
  );
}
function Tag({ id, children }) {
  return <span style={{ ...thread(id), border: `1px solid currentColor`, borderRadius: "var(--radius-sm)", padding: "0 5px", fontSize: 11, marginRight: 6 }}>{children}</span>;
}

const SESSIONS = {
  wardline: {
    member: "wardline", label: "wardline scan",
    render: () => (<>
      <Prompt tool="wardline" cmd="scan . --fail-on ERROR" />
      <L k="dim">scanned 1 file(s); 3 finding(s) — 0 suppressed, 1 new → findings.jsonl</L>
      <div style={{ height: 8 }} />
      <L><span style={K.err}>● PY-WL-101</span>  <span style={{ color: "var(--text-primary)" }}>demo.build_record</span></L>
      <L ind={1} k="out">declares return trust <span style={K.ok}>ASSURED</span> but returns <span style={K.err}>EXTERNAL_RAW</span> —</L>
      <L ind={1} k="out">untrusted data reaches a trusted producer with no validation.</L>
      <L ind={1} k="dim">demo.py:8 · entity <span style={{ color: "var(--text-primary)" }}>clarion:sei:7f3a…b1</span></L>
      <div style={{ height: 8 }} />
      <L k="dim">2 finding(s) NONE-severity (engine facts) — hidden</L>
      <Prompt tool="echo" cmd="$?" />
      <L k="err">1   <span style={K.dim}># gate tripped — fix at the boundary, not the sink</span></L>
    </>),
  },
  clarion: {
    member: "clarion", label: "clarion · MCP",
    render: () => (<>
      <Prompt tool="clarion" cmd="serve   # 39-tool MCP surface over stdio" />
      <L k="dim">consult-mode agent → entity_orientation_pack_get("auth.session.build_record")</L>
      <div style={{ height: 8 }} />
      <L><span style={K.acc}>◆ entity</span>  auth.session.build_record  <span style={K.dim}>fn · python</span></L>
      <L ind={1} k="out"><span style={K.dim}>sei</span>        clarion:sei:7f3a…b1  <span style={K.ok}>● stable</span></L>
      <L ind={1} k="out"><span style={K.dim}>callers</span>    14 · 2 subsystems · entry-point: no</L>
      <L ind={1} k="out"><span style={K.dim}>enriched</span>   <Tag id="wardline">wardline</Tag>taint EXTERNAL_RAW→ASSURED</L>
      <L ind={1} k="out"><span style={{ paddingLeft: 0 }} /><span style={{ marginLeft: 62, display: "inline-block" }} /><Tag id="filigree">filigree</Tag>issue fg-da8d · fixing</L>
      <div style={{ height: 8 }} />
      <L k="dim">summary(id) dispatches the LLM lazily, one entity at a time.</L>
    </>),
  },
  legis: {
    member: "legis", label: "legis · governance",
    render: () => (<>
      <Prompt tool="legis" cmd="verdict --cell coached   # simple · judge ON" />
      <L k="dim">policy PY-WL-101 fired at the git/CI boundary →</L>
      <div style={{ height: 8 }} />
      <L k="out">agent proposed override:</L>
      <L ind={1} k="dim">"boundary validates downstream in sanitize() — false positive"</L>
      <div style={{ height: 6 }} />
      <L><span style={K.err}>⚖  BLOCKED</span>  <span style={K.dim}>judge rejected — sanitize() is not on the return path</span></L>
      <L k="dim">agent must correct the code or sharpen its rationale; cannot self-clear.</L>
      <div style={{ height: 8 }} />
      <L k="dim">trail: append-only · keyed on SEI · survives rename/move</L>
      <L><span style={thread("legis")}>HMAC</span> <span style={K.dim}>verdict signed · file_fingerprint + ast_path bound</span></L>
    </>),
  },
  tour: {
    member: "shuttle", label: "make tour → lacuna",
    render: () => (<>
      <Prompt tool="make" cmd="tour   # drive every live tool against the specimen" />
      <L k="dim">target: ~/lacuna · the deliberately-flawed demonstration specimen</L>
      <div style={{ height: 8 }} />
      <L><span style={thread("clarion")}>clarion </span><span style={K.ok}>✓ live</span>   <span style={K.dim}>catalog built · 312 entities · SEI minted</span></L>
      <L><span style={thread("wardline")}>wardline</span> <span style={K.ok}>✓ live</span>   <span style={K.dim}>4 baselined lacunae surfaced · gate green</span></L>
      <L><span style={thread("filigree")}>filigree</span> <span style={K.ok}>✓ live</span>   <span style={K.dim}>findings → 4 tracked issues</span></L>
      <L><span style={thread("legis")}>legis   </span> <span style={K.warn}>◐ design-only</span>  <span style={K.dim}>labelled, never faked</span></L>
      <L><span style={thread("charter")}>charter </span> <span style={K.warn}>◐ design-only</span>  <span style={K.dim}>labelled, never faked</span></L>
      <div style={{ height: 8 }} />
      <L k="ok">✓ narrative regenerated · matrix coverage in lockstep</L>
      <L k="dim">degrades honestly — point the suite at Lacuna and watch it work.</L>
    </>),
  },
};

function Terminal() {
  const order = ["wardline", "clarion", "legis", "tour"];
  const [tab, setTab] = useState("wardline");
  const S = SESSIONS[tab];
  return (
    <div style={{ width: 760, maxWidth: "94vw", margin: "0 auto", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-modal)", background: "#070C0E" }}>
      {/* window chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 13px", background: "var(--surface-raised)", borderBottom: "1px solid var(--border-default)" }}>
        <span style={{ display: "flex", gap: 7 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
        </span>
        <span style={{ marginLeft: 8, fontSize: 11.5, color: "var(--text-muted)" }}>agent@loom — {S.label} — stdio</span>
        <Mark name="loom" size={14} style={{ color: "var(--text-muted)", marginLeft: "auto" }} />
      </div>
      {/* tab bar */}
      <div style={{ display: "flex", gap: 2, padding: "7px 9px 0", background: "var(--surface-raised)", borderBottom: "1px solid var(--border-default)" }}>
        {order.map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            fontFamily: "var(--font-mono)", fontSize: 11.5, padding: "6px 12px", cursor: "pointer",
            border: "none", borderBottom: `2px solid ${tab === t ? `var(--thread-${SESSIONS[t].member})` : "transparent"}`,
            background: "transparent", color: tab === t ? "var(--text-primary)" : "var(--text-muted)",
            display: "flex", alignItems: "center", gap: 7,
          }}>
            <Mark name={SESSIONS[t].member} size={13} style={thread(SESSIONS[t].member)} />
            {SESSIONS[t].label}
          </button>
        ))}
      </div>
      {/* body */}
      <div style={{ padding: "16px 18px 22px", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.65, minHeight: 300 }}>
        {S.render()}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <span style={K.ps}>$</span>
          <span style={{ width: 8, height: 16, background: "var(--accent)", display: "inline-block", animation: "blink 1.1s steps(1) infinite" }} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-base)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", gap: 22 }}>
      <div style={{ textAlign: "center" }}>
        <div className="t-label" style={{ marginBottom: 8 }}>Agent-first · humans on the loop, not in it</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0 }}>The Loom CLI surface</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-secondary)", maxWidth: 600, margin: "10px auto 0", lineHeight: 1.6 }}>
          Four members with no GUI drive the same loop: scan → explain → fix → rescan, over CLI and a dependency-free MCP-over-stdio server. Switch sessions below.
        </p>
      </div>
      <Terminal />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
