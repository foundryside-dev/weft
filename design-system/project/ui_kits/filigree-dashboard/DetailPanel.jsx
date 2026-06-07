// DetailPanel.jsx — issue detail that slides in from the right.
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div className="t-label" style={{ marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

function DetailPanel({ issue, onClose }) {
  const open = !!issue;
  const i = issue || {};
  const catColor = CATEGORY_COLORS[i.cat] || "#64748B";
  const prioColor = PRIORITY_COLORS[i.priority];
  return (
    <div style={{
      position: "absolute", top: 0, right: 0, height: "100%", width: 460,
      maxWidth: "100%", background: "var(--surface-raised)",
      borderLeft: "1px solid var(--border-default)", display: "flex", flexDirection: "column",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform .2s var(--ease)", zIndex: 20, boxShadow: open ? "var(--shadow-modal)" : "none",
    }}>
      {issue && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "15px 18px 10px" }}>
            <span style={{ fontSize: 15 }}>{TYPE_ICONS[i.type]}</span>
            <span style={{ fontSize: 12, background: "var(--surface-overlay)", color: "var(--text-primary)", padding: "2px 7px", borderRadius: "var(--radius-sm)" }}>{i.id}</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{i.type}</span>
            <button onClick={onClose} style={{ marginLeft: "auto", background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ padding: "0 18px 18px", overflowY: "auto", flex: 1 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", margin: "4px 0 16px", lineHeight: 1.3 }}>{i.title}</h2>
            <div style={{ display: "flex", gap: 22, marginBottom: 18 }}>
              <div>
                <div className="t-label" style={{ marginBottom: 6 }}>Status</div>
                <span style={{ fontSize: 12, background: catColor + "33", color: catColor, padding: "3px 9px", borderRadius: "var(--radius-sm)" }}>{i.status}</span>
              </div>
              <div>
                <div className="t-label" style={{ marginBottom: 6 }}>Priority</div>
                <span style={{ fontSize: 12, color: prioColor, fontWeight: 600 }}>P{i.priority} · {PRIORITY_LABEL[i.priority]}</span>
              </div>
              <div>
                <div className="t-label" style={{ marginBottom: 6 }}>Assignee</div>
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{i.assignee ? "👤 " + i.assignee : "— unassigned"}</span>
              </div>
            </div>
            <Field label="Description">
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{i.body}</p>
            </Field>
            <Field label="Dependencies">
              {i.blocked_by && i.blocked_by.length
                ? i.blocked_by.map((b) => <div key={b} style={{ fontSize: 12, color: "var(--stale)", marginBottom: 4 }}>🔗 blocked by {b}</div>)
                : i.deps && i.deps.length
                ? i.deps.map((d) => <div key={d} style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>↳ depends on {d}</div>)
                : <div style={{ fontSize: 12, color: "var(--text-muted)" }}>No blockers · ready to work</div>}
              {i.impact > 0 && <div style={{ fontSize: 12, color: "var(--aging)", marginTop: 4 }}>⚡ blocks {i.impact} downstream</div>}
            </Field>
            <Field label="Activity">
              <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
                <div>· created via MCP <span style={{ color: "var(--text-secondary)" }}>issue_create</span></div>
                <div>· transitioned → <span style={{ color: catColor }}>{i.status}</span></div>
                <div>· context.md regenerated</div>
              </div>
            </Field>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: "var(--radius)", border: "1px solid var(--accent)", background: "var(--accent)", color: "var(--text-on-accent)", cursor: "pointer" }}>Advance state</button>
              <button style={{ fontFamily: "var(--font-mono)", fontSize: 12, padding: "8px 14px", borderRadius: "var(--radius)", border: "1px solid var(--border-strong)", background: "var(--surface-overlay)", color: "var(--text-secondary)", cursor: "pointer" }}>Claim</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

Object.assign(window, { DetailPanel });
