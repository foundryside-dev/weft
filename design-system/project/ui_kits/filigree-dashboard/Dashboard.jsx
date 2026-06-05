// Dashboard.jsx — Filigree dashboard shell: nav, filter bar, views, footer.
const { useState, useMemo } = React;

function NavBtn({ active, onClick, children, title }) {
  return (
    <button onClick={onClick} title={title} style={{
      fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, padding: "6px 12px",
      borderRadius: "var(--radius)", cursor: "pointer", border: "none",
      background: active ? "var(--surface-overlay)" : "transparent",
      color: active ? "var(--text-primary)" : "var(--text-secondary)",
    }}>{children}</button>
  );
}

function Pill({ on, onClick, children, tone }) {
  const styles = on
    ? { background: "var(--accent)", color: "#06222F", border: "1px solid var(--accent)" }
    : { background: "var(--surface-overlay)", color: "var(--text-secondary)", border: "1px solid var(--border-strong)" };
  return <button onClick={onClick} style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, padding: "4px 9px", borderRadius: "var(--radius)", cursor: "pointer", ...styles }}>{children}</button>;
}

function ReadyTable({ issues, onOpen }) {
  const ready = issues.filter((i) => i.ready && i.cat !== "done");
  return (
    <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>Ready to Work</span>
        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{ready.length} issues · no open blockers</span>
      </div>
      <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
        <thead><tr style={{ textAlign: "left", color: "var(--text-muted)", borderBottom: "1px solid var(--border-strong)" }}>
          {["P", "ID", "Type", "Title", "Assignee", "Status"].map((h) => <th key={h} style={{ padding: "8px 8px", fontWeight: 500 }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {ready.map((i) => (
            <tr key={i.id} onClick={() => onOpen(i)} style={{ cursor: "pointer", borderBottom: "1px solid var(--border-default)", borderLeft: "3px solid var(--ready)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <td style={{ padding: "9px 8px", color: PRIORITY_COLORS[i.priority], fontWeight: 600 }}>{i.priority}</td>
              <td style={{ padding: "9px 8px", color: "var(--text-primary)" }}>{i.id}</td>
              <td style={{ padding: "9px 8px", color: "var(--text-secondary)" }}>{TYPE_ICONS[i.type]} {i.type}</td>
              <td style={{ padding: "9px 8px", color: "var(--text-primary)" }}>{i.title}</td>
              <td style={{ padding: "9px 8px", color: "var(--text-secondary)" }}>{i.assignee || "—"}</td>
              <td style={{ padding: "9px 8px" }}><span style={{ background: CATEGORY_COLORS[i.cat] + "33", color: CATEGORY_COLORS[i.cat], padding: "2px 7px", borderRadius: "var(--radius-sm)" }}>{i.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Placeholder({ label }) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
      <Mark name="filigree" size={40} style={{ color: "var(--border-strong)" }} />
      <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{label} view — Cytoscape graph & flow metrics live in the full product.</span>
    </div>
  );
}

function App() {
  const [view, setView] = useState("kanban");
  const [sel, setSel] = useState(null);
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [pills, setPills] = useState({ open: true, active: true, done: true });

  const issues = useMemo(() => {
    let list = ISSUES.slice();
    if (ready) list = list.filter((i) => i.ready);
    list = list.filter((i) => (i.cat === "open" && pills.open) || (i.cat === "wip" && pills.active) || (i.cat === "done" && pills.done));
    return list;
  }, [ready, pills]);

  const stats = useMemo(() => ({
    open: ISSUES.filter((i) => i.cat === "open").length,
    wip: ISSUES.filter((i) => i.cat === "wip").length,
    ready: ISSUES.filter((i) => i.ready && i.cat !== "done").length,
    blocked: ISSUES.filter((i) => (i.blocked_by || []).length).length,
    deps: ISSUES.reduce((a, i) => a + (i.deps || []).length + (i.blocked_by || []).length, 0),
  }), []);

  const health = 78;

  return (
    <div data-theme={theme === "light" ? "light" : undefined} style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--surface-base)", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
      {/* Top nav */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: "var(--surface-raised)", borderBottom: "1px solid var(--border-default)", flexShrink: 0, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--accent)" }}>
            <Mark name="filigree" size={16} style={{ color: "var(--accent)" }} /> Filigree
          </span>
          <button style={{ fontFamily: "var(--font-mono)", fontSize: 11, background: "var(--accent)", color: "#06222F", padding: "4px 9px", borderRadius: "var(--radius)", border: "none", cursor: "pointer" }}>+ New</button>
          <nav style={{ display: "flex", gap: 2 }}>
            <NavBtn active={view === "kanban"} onClick={() => setView("kanban")}>Kanban</NavBtn>
            <NavBtn active={view === "ready"} onClick={() => setView("ready")}>Ready</NavBtn>
            <NavBtn active={view === "graph"} onClick={() => setView("graph")}>Graph</NavBtn>
            <NavBtn active={view === "insights"} onClick={() => setView("insights")}>Insights</NavBtn>
            <NavBtn active={view === "files"} onClick={() => setView("files")}>Files</NavBtn>
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Pill on={ready} onClick={() => setReady(!ready)}>● Ready ({stats.ready})</Pill>
          <input placeholder="Search… ( / )" style={{ fontFamily: "var(--font-mono)", fontSize: 11, background: "var(--surface-overlay)", color: "var(--text-primary)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius)", padding: "5px 10px", width: 150 }} />
          <div style={{ display: "flex", gap: 4 }}>
            <Pill on={pills.open} onClick={() => setPills({ ...pills, open: !pills.open })}>Open</Pill>
            <Pill on={pills.active} onClick={() => setPills({ ...pills, active: !pills.active })}>Active</Pill>
            <Pill on={pills.done} onClick={() => setPills({ ...pills, done: !pills.done })}>Done</Pill>
          </div>
          <span title="System health" style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: "var(--radius)", background: "rgba(6,78,59,.4)", color: "var(--ready)", border: "1px solid #047857" }}>{health}</span>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle theme" style={{ background: "var(--surface-overlay)", border: "none", borderRadius: "var(--radius)", color: "var(--text-secondary)", cursor: "pointer", padding: "5px 8px", fontSize: 12 }}>☀</button>
        </div>
      </header>

      {/* Main */}
      <main style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
          {view === "kanban" && <Kanban issues={issues} onOpen={setSel} />}
          {view === "ready" && <ReadyTable issues={ISSUES} onOpen={setSel} />}
          {view === "graph" && <Placeholder label="Graph" />}
          {view === "insights" && <Placeholder label="Insights" />}
          {view === "files" && <Placeholder label="Files" />}
        </div>
        <DetailPanel issue={sel} onClose={() => setSel(null)} />
      </main>

      {/* Footer stats */}
      <footer style={{ display: "flex", alignItems: "center", gap: 16, padding: "5px 16px", background: "var(--surface-raised)", borderTop: "1px solid var(--border-default)", fontSize: 11, color: "var(--text-secondary)", flexShrink: 0 }}>
        <span>Open: <b style={{ color: "var(--text-primary)" }}>{stats.open}</b></span>
        <span>In Progress: <b style={{ color: "var(--text-primary)" }}>{stats.wip}</b></span>
        <span>Ready: <b style={{ color: "var(--ready)" }}>{stats.ready}</b></span>
        <span>Blocked: <b style={{ color: "var(--stale)" }}>{stats.blocked}</b></span>
        <span>Deps: <b style={{ color: "var(--text-primary)" }}>{stats.deps}</b></span>
        <span style={{ marginLeft: "auto", color: "var(--text-muted)" }}>filigree v{PROJECT.version} · ethereal</span>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
