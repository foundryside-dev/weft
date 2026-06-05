// Kanban.jsx — the 3-column board + issue cards (faithful to Filigree's renderCard).
const { useState: useStateK } = React;

function ageLabel(i) {
  if (i.cat !== "wip" || !i.ageH) return null;
  const h = i.ageH;
  if (h < 1) return <span style={{ color: "var(--text-muted)" }}>{Math.round(h * 60)}m</span>;
  if (h < 24) return <span style={{ color: h > 4 ? "var(--aging)" : "var(--text-muted)" }}>{h}h</span>;
  return <span style={{ color: "var(--stale)" }}>{Math.floor(h / 24)}d</span>;
}

function Card({ i, onOpen }) {
  const typeColor = TYPE_COLORS[i.type] || "#6B7280";
  const prioColor = PRIORITY_COLORS[i.priority];
  const catColor = CATEGORY_COLORS[i.cat];
  const openBlocks = (i.blocked_by || []).length;
  const ready = i.ready && i.cat === "open";
  let border = "1px solid var(--border-default)";
  let leftRule = null;
  if (ready) border = "1px solid var(--border-default)";
  const agingBorder = i.cat === "wip" && i.ageH > 24 ? "var(--stale)" : i.cat === "wip" && i.ageH > 4 ? "var(--aging)" : null;

  return (
    <div onClick={() => onOpen(i)} tabIndex={0} style={{
      position: "relative", background: "var(--surface-raised)",
      border, borderLeft: ready ? "4px solid var(--ready)" : agingBorder ? `4px solid ${agingBorder}` : border,
      borderRadius: "var(--radius)", padding: "10px 11px 10px 16px", cursor: "pointer",
      transition: "background .15s",
    }} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hover)")}
       onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface-raised)")}>
      {!ready && !agingBorder && (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, borderRadius: "var(--radius) 0 0 var(--radius)", background: typeColor }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
        <span style={{ fontSize: 13 }}>{TYPE_ICONS[i.type]}</span>
        {i.priority <= 1
          ? <span style={{ fontSize: 11, fontWeight: 700, color: prioColor }}>P{i.priority}</span>
          : <span style={{ width: 8, height: 8, borderRadius: "50%", background: prioColor, flex: "0 0 auto" }} />}
        <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.title}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "var(--text-muted)", flexWrap: "wrap" }}>
        <span style={{ background: "var(--surface-overlay)", color: "var(--text-primary)", padding: "1px 6px", borderRadius: "var(--radius-sm)" }}>{i.id}</span>
        <span style={{ background: "var(--surface-overlay)", color: "var(--text-secondary)", padding: "1px 6px", borderRadius: "var(--radius-sm)" }}>{i.type}</span>
        <span style={{ background: catColor + "33", color: catColor, padding: "1px 6px", borderRadius: "var(--radius-sm)" }}>{i.status}</span>
        {openBlocks > 0 && <span style={{ color: "var(--stale)" }}>🔗 blocked by {openBlocks}</span>}
        {i.impact > 0 && <span style={{ color: "var(--aging)" }}>⚡{i.impact}</span>}
        {i.assignee && <span style={{ color: "var(--text-secondary)" }}>👤 {i.assignee}</span>}
        {ageLabel(i)}
      </div>
    </div>
  );
}

function Column({ label, color, items, onOpen }) {
  return (
    <div style={{ minWidth: 280, flex: "1 1 0", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9, padding: "0 4px" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: "var(--text-primary)" }}>{label}</span>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{items.length}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", paddingRight: 4, minHeight: 200 }}>
        {items.length
          ? items.map((i) => <Card key={i.id} i={i} onOpen={onOpen} />)
          : <div style={{ fontSize: 12, color: "var(--text-muted)", padding: 16, textAlign: "center" }}>No issues</div>}
      </div>
    </div>
  );
}

function Kanban({ issues, onOpen }) {
  const cols = { open: [], wip: [], done: [] };
  issues.forEach((i) => cols[i.cat] && cols[i.cat].push(i));
  return (
    <div style={{ display: "flex", gap: 16, padding: 16, flex: 1, overflowX: "auto" }}>
      <Column label="Open" color={CATEGORY_COLORS.open} items={cols.open} onOpen={onOpen} />
      <Column label="In Progress" color={CATEGORY_COLORS.wip} items={cols.wip} onOpen={onOpen} />
      <Column label="Done" color={CATEGORY_COLORS.done} items={cols.done} onOpen={onOpen} />
    </div>
  );
}

Object.assign(window, { Kanban, Card });
