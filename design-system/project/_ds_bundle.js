/* @ds-bundle: {"format":3,"namespace":"LoomDesignSystem_ce3c4b","components":[],"sourceHashes":{"ui_kits/filigree-dashboard/Dashboard.jsx":"fd2e621fcffb","ui_kits/filigree-dashboard/DetailPanel.jsx":"6211d29f7d9f","ui_kits/filigree-dashboard/Kanban.jsx":"a8cbaaa99398","ui_kits/filigree-dashboard/Marks.jsx":"b60f925b021b","ui_kits/filigree-dashboard/data.jsx":"90ab4599260a","ui_kits/weft-cli/CliMarks.jsx":"b60f925b021b","ui_kits/weft-cli/Terminal.jsx":"4af557f6ed6e","ui_kits/weft-hub/Hub.jsx":"5edeababe17d","ui_kits/weft-hub/HubMarks.jsx":"b60f925b021b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LoomDesignSystem_ce3c4b = window.LoomDesignSystem_ce3c4b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/filigree-dashboard/Dashboard.jsx
try { (() => {
// Dashboard.jsx — Filigree dashboard shell: nav, filter bar, views, footer.
const {
  useState,
  useMemo
} = React;
function NavBtn({
  active,
  onClick,
  children,
  title
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 500,
      padding: "6px 12px",
      borderRadius: "var(--radius)",
      cursor: "pointer",
      border: "none",
      background: active ? "var(--surface-overlay)" : "transparent",
      color: active ? "var(--text-primary)" : "var(--text-secondary)"
    }
  }, children);
}
function Pill({
  on,
  onClick,
  children,
  tone
}) {
  const styles = on ? {
    background: "var(--accent)",
    color: "#06222F",
    border: "1px solid var(--accent)"
  } : {
    background: "var(--surface-overlay)",
    color: "var(--text-secondary)",
    border: "1px solid var(--border-strong)"
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 600,
      padding: "4px 9px",
      borderRadius: "var(--radius)",
      cursor: "pointer",
      ...styles
    }
  }, children);
}
function ReadyTable({
  issues,
  onOpen
}) {
  const ready = issues.filter(i => i.ready && i.cat !== "done");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 28px",
      overflowY: "auto",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, "Ready to Work"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)"
    }
  }, ready.length, " issues \xB7 no open blockers")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      fontSize: 12,
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: "left",
      color: "var(--text-muted)",
      borderBottom: "1px solid var(--border-strong)"
    }
  }, ["P", "ID", "Type", "Title", "Assignee", "Status"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: "8px 8px",
      fontWeight: 500
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, ready.map(i => /*#__PURE__*/React.createElement("tr", {
    key: i.id,
    onClick: () => onOpen(i),
    style: {
      cursor: "pointer",
      borderBottom: "1px solid var(--border-default)",
      borderLeft: "3px solid var(--ready)"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--surface-hover)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 8px",
      color: PRIORITY_COLORS[i.priority],
      fontWeight: 600
    }
  }, i.priority), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 8px",
      color: "var(--text-primary)"
    }
  }, i.id), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 8px",
      color: "var(--text-secondary)"
    }
  }, TYPE_ICONS[i.type], " ", i.type), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 8px",
      color: "var(--text-primary)"
    }
  }, i.title), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 8px",
      color: "var(--text-secondary)"
    }
  }, i.assignee || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: CATEGORY_COLORS[i.cat] + "33",
      color: CATEGORY_COLORS[i.cat],
      padding: "2px 7px",
      borderRadius: "var(--radius-sm)"
    }
  }, i.status)))))));
}
function Placeholder({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    name: "filigree",
    size: 40,
    style: {
      color: "var(--border-strong)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, label, " view \u2014 Cytoscape graph & flow metrics live in the full product."));
}
function App() {
  const [view, setView] = useState("kanban");
  const [sel, setSel] = useState(null);
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [pills, setPills] = useState({
    open: true,
    active: true,
    done: true
  });
  const issues = useMemo(() => {
    let list = ISSUES.slice();
    if (ready) list = list.filter(i => i.ready);
    list = list.filter(i => i.cat === "open" && pills.open || i.cat === "wip" && pills.active || i.cat === "done" && pills.done);
    return list;
  }, [ready, pills]);
  const stats = useMemo(() => ({
    open: ISSUES.filter(i => i.cat === "open").length,
    wip: ISSUES.filter(i => i.cat === "wip").length,
    ready: ISSUES.filter(i => i.ready && i.cat !== "done").length,
    blocked: ISSUES.filter(i => (i.blocked_by || []).length).length,
    deps: ISSUES.reduce((a, i) => a + (i.deps || []).length + (i.blocked_by || []).length, 0)
  }), []);
  const health = 78;
  return /*#__PURE__*/React.createElement("div", {
    "data-theme": theme === "light" ? "light" : undefined,
    style: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: "var(--surface-base)",
      color: "var(--text-primary)",
      fontFamily: "var(--font-mono)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 16px",
      background: "var(--surface-raised)",
      borderBottom: "1px solid var(--border-default)",
      flexShrink: 0,
      flexWrap: "wrap",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 14,
      fontWeight: 600,
      color: "var(--accent)"
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    name: "filigree",
    size: 16,
    style: {
      color: "var(--accent)"
    }
  }), " Filigree"), /*#__PURE__*/React.createElement("button", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      background: "var(--accent)",
      color: "#06222F",
      padding: "4px 9px",
      borderRadius: "var(--radius)",
      border: "none",
      cursor: "pointer"
    }
  }, "+ New"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(NavBtn, {
    active: view === "kanban",
    onClick: () => setView("kanban")
  }, "Kanban"), /*#__PURE__*/React.createElement(NavBtn, {
    active: view === "ready",
    onClick: () => setView("ready")
  }, "Ready"), /*#__PURE__*/React.createElement(NavBtn, {
    active: view === "graph",
    onClick: () => setView("graph")
  }, "Graph"), /*#__PURE__*/React.createElement(NavBtn, {
    active: view === "insights",
    onClick: () => setView("insights")
  }, "Insights"), /*#__PURE__*/React.createElement(NavBtn, {
    active: view === "files",
    onClick: () => setView("files")
  }, "Files"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    on: ready,
    onClick: () => setReady(!ready)
  }, "\u25CF Ready (", stats.ready, ")"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search\u2026 ( / )",
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      background: "var(--surface-overlay)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius)",
      padding: "5px 10px",
      width: 150
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    on: pills.open,
    onClick: () => setPills({
      ...pills,
      open: !pills.open
    })
  }, "Open"), /*#__PURE__*/React.createElement(Pill, {
    on: pills.active,
    onClick: () => setPills({
      ...pills,
      active: !pills.active
    })
  }, "Active"), /*#__PURE__*/React.createElement(Pill, {
    on: pills.done,
    onClick: () => setPills({
      ...pills,
      done: !pills.done
    })
  }, "Done")), /*#__PURE__*/React.createElement("span", {
    title: "System health",
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 8px",
      borderRadius: "var(--radius)",
      background: "rgba(6,78,59,.4)",
      color: "var(--ready)",
      border: "1px solid #047857"
    }
  }, health), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
    title: "Toggle theme",
    style: {
      background: "var(--surface-overlay)",
      border: "none",
      borderRadius: "var(--radius)",
      color: "var(--text-secondary)",
      cursor: "pointer",
      padding: "5px 8px",
      fontSize: 12
    }
  }, "\u2600"))), /*#__PURE__*/React.createElement("main", {
    style: {
      display: "flex",
      flex: 1,
      overflow: "hidden",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      overflow: "hidden"
    }
  }, view === "kanban" && /*#__PURE__*/React.createElement(Kanban, {
    issues: issues,
    onOpen: setSel
  }), view === "ready" && /*#__PURE__*/React.createElement(ReadyTable, {
    issues: ISSUES,
    onOpen: setSel
  }), view === "graph" && /*#__PURE__*/React.createElement(Placeholder, {
    label: "Graph"
  }), view === "insights" && /*#__PURE__*/React.createElement(Placeholder, {
    label: "Insights"
  }), view === "files" && /*#__PURE__*/React.createElement(Placeholder, {
    label: "Files"
  })), /*#__PURE__*/React.createElement(DetailPanel, {
    issue: sel,
    onClose: () => setSel(null)
  })), /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "5px 16px",
      background: "var(--surface-raised)",
      borderTop: "1px solid var(--border-default)",
      fontSize: 11,
      color: "var(--text-secondary)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", null, "Open: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-primary)"
    }
  }, stats.open)), /*#__PURE__*/React.createElement("span", null, "In Progress: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-primary)"
    }
  }, stats.wip)), /*#__PURE__*/React.createElement("span", null, "Ready: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ready)"
    }
  }, stats.ready)), /*#__PURE__*/React.createElement("span", null, "Blocked: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--stale)"
    }
  }, stats.blocked)), /*#__PURE__*/React.createElement("span", null, "Deps: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-primary)"
    }
  }, stats.deps)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      color: "var(--text-muted)"
    }
  }, "filigree v", PROJECT.version, " \xB7 ethereal")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filigree-dashboard/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filigree-dashboard/DetailPanel.jsx
try { (() => {
// DetailPanel.jsx — issue detail that slides in from the right.
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-label",
    style: {
      marginBottom: 6
    }
  }, label), children);
}
function DetailPanel({
  issue,
  onClose
}) {
  const open = !!issue;
  const i = issue || {};
  const catColor = CATEGORY_COLORS[i.cat] || "#64748B";
  const prioColor = PRIORITY_COLORS[i.priority];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      width: 460,
      maxWidth: "100%",
      background: "var(--surface-raised)",
      borderLeft: "1px solid var(--border-default)",
      display: "flex",
      flexDirection: "column",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform .2s var(--ease)",
      zIndex: 20,
      boxShadow: open ? "var(--shadow-modal)" : "none"
    }
  }, issue && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "15px 18px 10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, TYPE_ICONS[i.type]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      background: "var(--surface-overlay)",
      color: "var(--text-primary)",
      padding: "2px 7px",
      borderRadius: "var(--radius-sm)"
    }
  }, i.id), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, i.type), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      marginLeft: "auto",
      background: "transparent",
      border: "none",
      color: "var(--text-muted)",
      cursor: "pointer",
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 18px 18px",
      overflowY: "auto",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: "var(--text-primary)",
      margin: "4px 0 16px",
      lineHeight: 1.3
    }
  }, i.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t-label",
    style: {
      marginBottom: 6
    }
  }, "Status"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      background: catColor + "33",
      color: catColor,
      padding: "3px 9px",
      borderRadius: "var(--radius-sm)"
    }
  }, i.status)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t-label",
    style: {
      marginBottom: 6
    }
  }, "Priority"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: prioColor,
      fontWeight: 600
    }
  }, "P", i.priority, " \xB7 ", PRIORITY_LABEL[i.priority])), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t-label",
    style: {
      marginBottom: 6
    }
  }, "Assignee"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)"
    }
  }, i.assignee ? "👤 " + i.assignee : "— unassigned"))), /*#__PURE__*/React.createElement(Field, {
    label: "Description"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)",
      lineHeight: 1.6,
      margin: 0
    }
  }, i.body)), /*#__PURE__*/React.createElement(Field, {
    label: "Dependencies"
  }, i.blocked_by && i.blocked_by.length ? i.blocked_by.map(b => /*#__PURE__*/React.createElement("div", {
    key: b,
    style: {
      fontSize: 12,
      color: "var(--stale)",
      marginBottom: 4
    }
  }, "\uD83D\uDD17 blocked by ", b)) : i.deps && i.deps.length ? i.deps.map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      fontSize: 12,
      color: "var(--text-secondary)",
      marginBottom: 4
    }
  }, "\u21B3 depends on ", d)) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, "No blockers \xB7 ready to work"), i.impact > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--aging)",
      marginTop: 4
    }
  }, "\u26A1 blocks ", i.impact, " downstream")), /*#__PURE__*/React.createElement(Field, {
    label: "Activity"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", null, "\xB7 created via MCP ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, "issue_create")), /*#__PURE__*/React.createElement("div", null, "\xB7 transitioned \u2192 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: catColor
    }
  }, i.status)), /*#__PURE__*/React.createElement("div", null, "\xB7 context.md regenerated"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 600,
      padding: "8px 14px",
      borderRadius: "var(--radius)",
      border: "1px solid var(--accent)",
      background: "var(--accent)",
      color: "#06222F",
      cursor: "pointer"
    }
  }, "Advance state"), /*#__PURE__*/React.createElement("button", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      padding: "8px 14px",
      borderRadius: "var(--radius)",
      border: "1px solid var(--border-strong)",
      background: "var(--surface-overlay)",
      color: "var(--text-secondary)",
      cursor: "pointer"
    }
  }, "Claim")))));
}
Object.assign(window, {
  DetailPanel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filigree-dashboard/DetailPanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filigree-dashboard/Kanban.jsx
try { (() => {
// Kanban.jsx — the 3-column board + issue cards (faithful to Filigree's renderCard).
const {
  useState: useStateK
} = React;
function ageLabel(i) {
  if (i.cat !== "wip" || !i.ageH) return null;
  const h = i.ageH;
  if (h < 1) return /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, Math.round(h * 60), "m");
  if (h < 24) return /*#__PURE__*/React.createElement("span", {
    style: {
      color: h > 4 ? "var(--aging)" : "var(--text-muted)"
    }
  }, h, "h");
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--stale)"
    }
  }, Math.floor(h / 24), "d");
}
function Card({
  i,
  onOpen
}) {
  const typeColor = TYPE_COLORS[i.type] || "#6B7280";
  const prioColor = PRIORITY_COLORS[i.priority];
  const catColor = CATEGORY_COLORS[i.cat];
  const openBlocks = (i.blocked_by || []).length;
  const ready = i.ready && i.cat === "open";
  let border = "1px solid var(--border-default)";
  let leftRule = null;
  if (ready) border = "1px solid var(--border-default)";
  const agingBorder = i.cat === "wip" && i.ageH > 24 ? "var(--stale)" : i.cat === "wip" && i.ageH > 4 ? "var(--aging)" : null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onOpen(i),
    tabIndex: 0,
    style: {
      position: "relative",
      background: "var(--surface-raised)",
      border,
      borderLeft: ready ? "4px solid var(--ready)" : agingBorder ? `4px solid ${agingBorder}` : border,
      borderRadius: "var(--radius)",
      padding: "10px 11px 10px 16px",
      cursor: "pointer",
      transition: "background .15s"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--surface-hover)",
    onMouseLeave: e => e.currentTarget.style.background = "var(--surface-raised)"
  }, !ready && !agingBorder && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      borderRadius: "var(--radius) 0 0 var(--radius)",
      background: typeColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, TYPE_ICONS[i.type]), i.priority <= 1 ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: prioColor
    }
  }, "P", i.priority) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: prioColor,
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--text-primary)",
      fontSize: 12.5,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, i.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 11,
      color: "var(--text-muted)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--surface-overlay)",
      color: "var(--text-primary)",
      padding: "1px 6px",
      borderRadius: "var(--radius-sm)"
    }
  }, i.id), /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--surface-overlay)",
      color: "var(--text-secondary)",
      padding: "1px 6px",
      borderRadius: "var(--radius-sm)"
    }
  }, i.type), /*#__PURE__*/React.createElement("span", {
    style: {
      background: catColor + "33",
      color: catColor,
      padding: "1px 6px",
      borderRadius: "var(--radius-sm)"
    }
  }, i.status), openBlocks > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--stale)"
    }
  }, "\uD83D\uDD17 blocked by ", openBlocks), i.impact > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--aging)"
    }
  }, "\u26A1", i.impact), i.assignee && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, "\uD83D\uDC64 ", i.assignee), ageLabel(i)));
}
function Column({
  label,
  color,
  items,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 280,
      flex: "1 1 0",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 9,
      padding: "0 4px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 12,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, items.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      overflowY: "auto",
      paddingRight: 4,
      minHeight: 200
    }
  }, items.length ? items.map(i => /*#__PURE__*/React.createElement(Card, {
    key: i.id,
    i: i,
    onOpen: onOpen
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      padding: 16,
      textAlign: "center"
    }
  }, "No issues")));
}
function Kanban({
  issues,
  onOpen
}) {
  const cols = {
    open: [],
    wip: [],
    done: []
  };
  issues.forEach(i => cols[i.cat] && cols[i.cat].push(i));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      padding: 16,
      flex: 1,
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement(Column, {
    label: "Open",
    color: CATEGORY_COLORS.open,
    items: cols.open,
    onOpen: onOpen
  }), /*#__PURE__*/React.createElement(Column, {
    label: "In Progress",
    color: CATEGORY_COLORS.wip,
    items: cols.wip,
    onOpen: onOpen
  }), /*#__PURE__*/React.createElement(Column, {
    label: "Done",
    color: CATEGORY_COLORS.done,
    items: cols.done,
    onOpen: onOpen
  }));
}
Object.assign(window, {
  Kanban,
  Card
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filigree-dashboard/Kanban.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filigree-dashboard/Marks.jsx
try { (() => {
// Marks.jsx — Weft federation glyph set as React components.
// Stroke-based, inherit `color` via currentColor. Shared across UI kits.
const {
  createElement: h
} = React;
const MARK_PATHS = {
  foundryside: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 24 H27"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 24 V15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 24 V10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 24 V15"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "15",
    r: "2.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "10",
    r: "2.3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "21",
    cy: "15",
    r: "2.1"
  }))),
  weft: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 6 V18.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 23.2 V26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 6 V8.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 13.2 V26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 11 H8.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.2 11 H26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 21 H18.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23.2 21 H26"
  })),
  loomweave: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 5 V27"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11 H24"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 21 H8"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "5",
    r: "2.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "11",
    r: "2.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "21",
    r: "2.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "27",
    r: "2.4"
  }))),
  filigree: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 4 L28 16 L16 28 L4 16 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11 L21 16 L16 21 L11 16 Z",
    fill: "currentColor",
    stroke: "none"
  })),
  wardline: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 4 V28"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 10 H15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 16 H15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 22 H15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 16 L26 11 V21 L18 16Z",
    fill: "currentColor"
  })),
  legis: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 6 V25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 25 H23"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 9 H25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 9 L4 16 H10 L7 9Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 9 L22 16 H28 L25 9Z"
  })),
  charter: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 5 H24 V27 H8 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 11 H20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16 H17"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 21.5 L14 24 L20 17.5"
  })),
  shuttle: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 16 H28",
    strokeDasharray: "3 3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 16 C11 12, 21 12, 21 16 C21 20, 11 20, 11 16 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "1.6",
    fill: "currentColor",
    stroke: "none"
  })),
  lacuna: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M19 6 H25 A1 1 0 0 1 26 7 V25 A1 1 0 0 1 25 26 H7 A1 1 0 0 1 6 25 V7 A1 1 0 0 1 7 6 H13",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeDasharray: "2.6 3",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.4",
    y: "13.4",
    width: "5.2",
    height: "5.2",
    rx: "1",
    fill: "currentColor"
  }))
};
function Mark({
  name,
  size = 24,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    className: className,
    style: style,
    "aria-label": name,
    role: "img"
  }, MARK_PATHS[name]);
}

// Federation roster — single source for kits.
const MEMBERS = [{
  id: "loomweave",
  name: "Loomweave",
  thread: "var(--thread-loomweave)",
  lang: "Rust",
  domain: "Code structure + identity authority (SEI)",
  answers: "what is this codebase, where do I touch, what is the durable identity?",
  status: "built · in use",
  repo: "~/loomweave"
}, {
  id: "filigree",
  name: "Filigree",
  thread: "var(--thread-filigree)",
  lang: "Python",
  domain: "Work state / issue lifecycle",
  answers: "what work exists, what state is it in, what happened?",
  status: "built · in use",
  repo: "~/filigree"
}, {
  id: "wardline",
  name: "Wardline",
  thread: "var(--thread-wardline)",
  lang: "Python",
  domain: "Trust-boundary analysis",
  answers: "what is allowed, and does this still satisfy the constraints?",
  status: "built · in use",
  repo: "~/wardline"
}, {
  id: "legis",
  name: "Legis",
  thread: "var(--thread-legis)",
  lang: "Python",
  domain: "Git/CI governance & attestations",
  answers: "what changed, and is this change governed?",
  status: "1.0.0rc1",
  repo: "~/legis"
}, {
  id: "charter",
  name: "Charter",
  thread: "var(--thread-charter)",
  lang: "Python",
  domain: "Requirements, traceability, verification",
  answers: "what must be true, and how do we know it is?",
  status: "scaffolded",
  repo: "~/charter"
}];
const SHUTTLE = {
  id: "shuttle",
  name: "Shuttle",
  thread: "var(--thread-shuttle)",
  lang: "—",
  domain: "Change execution (future)",
  answers: "carry this approved change through the weave, under guard rails.",
  status: "roadmap thought-bubble",
  repo: "no repo"
};
Object.assign(window, {
  Mark,
  MEMBERS,
  SHUTTLE
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filigree-dashboard/Marks.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filigree-dashboard/data.jsx
try { (() => {
// data.jsx — fake Filigree project data (Weft federation development).
// Shapes mirror the real dashboard: status_category drives the 3 columns,
// is_ready = no open blockers, impact = downstream blocks count.

const TYPE_ICONS = {
  bug: "🐛",
  feature: "✨",
  task: "📋",
  epic: "📊",
  milestone: "🎯"
};
const TYPE_COLORS = {
  bug: "#EF4444",
  feature: "#8B5CF6",
  task: "#3B82F6",
  epic: "#F59E0B",
  milestone: "#10B981"
};
const CATEGORY_COLORS = {
  open: "#64748B",
  wip: "#38BDF8",
  done: "#7B919C"
};
const PRIORITY_COLORS = {
  0: "#EF4444",
  1: "#F97316",
  2: "#6B7280",
  3: "#D1D5DB",
  4: "#D1D5DB"
};
const PRIORITY_LABEL = ["Critical", "High", "Medium", "Low", "Backlog"];
const ISSUES = [{
  id: "fg-7f3a2b",
  type: "feature",
  priority: 0,
  title: "SEI backfill: locator → stable identity",
  status: "building",
  cat: "wip",
  assignee: "agent-3",
  ageH: 2,
  ready: true,
  impact: 5,
  blocked_by: [],
  body: "Filigree's locator→SEI backfill is the remaining lock gate for the suite identity track. Until issues key on SEI, Loomweave+Filigree orphans on rename.",
  deps: ["fg-1c4099"]
}, {
  id: "fg-da8d50",
  type: "bug",
  priority: 1,
  title: "Dashboard split-brain on relocated db path",
  status: "fixing",
  cat: "wip",
  assignee: "agent-1",
  ageH: 6,
  ready: false,
  impact: 2,
  blocked_by: ["fg-9920aa"],
  body: "When .filigree.conf relocates the db, the dashboard opened .filigree/filigree.db while CLI/MCP opened the conf path — a split-brain view. Honour from_conf.",
  deps: []
}, {
  id: "fg-1c4099",
  type: "task",
  priority: 2,
  title: "Write federation contract index pointer doc",
  status: "open",
  cat: "open",
  assignee: null,
  ageH: 0,
  ready: true,
  impact: 1,
  blocked_by: [],
  body: "Each cross-product contract should point to the authoritative schema in the owning repo. weft owns the index; repos own the schemas.",
  deps: []
}, {
  id: "fg-44b7e1",
  type: "feature",
  priority: 1,
  title: "Weft HTTP generation /api/weft/* contracts",
  status: "reviewing",
  cat: "wip",
  assignee: "agent-2",
  ageH: 1,
  ready: true,
  impact: 3,
  blocked_by: [],
  body: "Stable /api/weft/* generation with classic compatibility for existing callers. Phase C fills endpoints one at a time.",
  deps: []
}, {
  id: "fg-9920aa",
  type: "bug",
  priority: 0,
  title: "Optimistic claim race in multi-agent start-next",
  status: "confirmed",
  cat: "open",
  assignee: null,
  ageH: 0,
  ready: true,
  impact: 4,
  blocked_by: [],
  body: "Two agents calling start-next-work can double-claim under load. Optimistic lock must reject the second writer cleanly.",
  deps: []
}, {
  id: "fg-301f8c",
  type: "epic",
  priority: 1,
  title: "Federation 2.0 — suite-aware integrations",
  status: "in_progress",
  cat: "wip",
  assignee: "agent-2",
  ageH: 9,
  ready: true,
  impact: 0,
  blocked_by: [],
  body: "Umbrella epic for the Weft generation: SEI-keyed links, Wardline finding ingest, Legis sign-off binding.",
  deps: []
}, {
  id: "fg-77aa12",
  type: "task",
  priority: 2,
  title: "context.md regen on every mutation",
  status: "done",
  cat: "done",
  assignee: "agent-1",
  ageH: 30,
  ready: false,
  impact: 0,
  blocked_by: [],
  body: "Pre-compute context.md so the session hook injects a fresh orientation at startup. Regenerate on every write.",
  deps: []
}, {
  id: "fg-5510bd",
  type: "feature",
  priority: 2,
  title: "Wardline finding → tracked issue cascade",
  status: "done",
  cat: "done",
  assignee: "agent-3",
  ageH: 48,
  ready: false,
  impact: 0,
  blocked_by: [],
  body: "Ingest Wardline SARIF/native findings and open triage issues automatically. Findings become tracked work.",
  deps: []
}, {
  id: "fg-2`2b04e",
  type: "task",
  priority: 3,
  title: "Graph v2 dependency explorer perf pass",
  status: "open",
  cat: "open",
  assignee: null,
  ageH: 0,
  ready: true,
  impact: 0,
  blocked_by: [],
  body: "Cytoscape+dagre layout slows past ~400 nodes. Cap render and add a diagnostics bar.",
  deps: []
}, {
  id: "fg-88c3f0",
  type: "bug",
  priority: 2,
  title: "Stale-claim sweep misses ethereal restarts",
  status: "triage",
  cat: "open",
  assignee: null,
  ageH: 0,
  ready: true,
  impact: 1,
  blocked_by: [],
  body: "After an ethereal dashboard idle-shutdown, stale claims aren't released until next mutation.",
  deps: []
}, {
  id: "fg-93de77",
  type: "task",
  priority: 3,
  title: "Codex MCP autodiscovery on install",
  status: "done",
  cat: "done",
  assignee: "agent-1",
  ageH: 72,
  ready: false,
  impact: 0,
  blocked_by: [],
  body: "filigree install --codex writes the MCP entry via runtime autodiscovery.",
  deps: []
}, {
  id: "fg-61b0a4",
  type: "feature",
  priority: 1,
  title: "Bearer auth for federation + MCP surfaces",
  status: "approved",
  cat: "open",
  assignee: null,
  ageH: 0,
  ready: true,
  impact: 2,
  blocked_by: [],
  body: "FILIGREE_FEDERATION_API_TOKEN gates /api/weft/*, scan ingest, and /mcp. Dashboard UI stays open on loopback.",
  deps: []
}];
// fix a stray id typo
ISSUES.forEach(i => {
  i.id = i.id.replace("`", "");
});
const PROJECT = {
  name: "filigree",
  version: "2.0.1"
};
Object.assign(window, {
  ISSUES,
  PROJECT,
  TYPE_ICONS,
  TYPE_COLORS,
  CATEGORY_COLORS,
  PRIORITY_COLORS,
  PRIORITY_LABEL
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filigree-dashboard/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/weft-cli/CliMarks.jsx
try { (() => {
// Marks.jsx — Weft federation glyph set as React components.
// Stroke-based, inherit `color` via currentColor. Shared across UI kits.
const {
  createElement: h
} = React;
const MARK_PATHS = {
  foundryside: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 24 H27"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 24 V15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 24 V10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 24 V15"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "15",
    r: "2.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "10",
    r: "2.3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "21",
    cy: "15",
    r: "2.1"
  }))),
  weft: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 6 V18.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 23.2 V26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 6 V8.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 13.2 V26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 11 H8.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.2 11 H26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 21 H18.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23.2 21 H26"
  })),
  loomweave: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 5 V27"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11 H24"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 21 H8"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "5",
    r: "2.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "11",
    r: "2.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "21",
    r: "2.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "27",
    r: "2.4"
  }))),
  filigree: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 4 L28 16 L16 28 L4 16 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11 L21 16 L16 21 L11 16 Z",
    fill: "currentColor",
    stroke: "none"
  })),
  wardline: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 4 V28"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 10 H15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 16 H15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 22 H15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 16 L26 11 V21 L18 16Z",
    fill: "currentColor"
  })),
  legis: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 6 V25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 25 H23"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 9 H25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 9 L4 16 H10 L7 9Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 9 L22 16 H28 L25 9Z"
  })),
  charter: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 5 H24 V27 H8 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 11 H20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16 H17"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 21.5 L14 24 L20 17.5"
  })),
  shuttle: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 16 H28",
    strokeDasharray: "3 3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 16 C11 12, 21 12, 21 16 C21 20, 11 20, 11 16 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "1.6",
    fill: "currentColor",
    stroke: "none"
  })),
  lacuna: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M19 6 H25 A1 1 0 0 1 26 7 V25 A1 1 0 0 1 25 26 H7 A1 1 0 0 1 6 25 V7 A1 1 0 0 1 7 6 H13",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeDasharray: "2.6 3",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.4",
    y: "13.4",
    width: "5.2",
    height: "5.2",
    rx: "1",
    fill: "currentColor"
  }))
};
function Mark({
  name,
  size = 24,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    className: className,
    style: style,
    "aria-label": name,
    role: "img"
  }, MARK_PATHS[name]);
}

// Federation roster — single source for kits.
const MEMBERS = [{
  id: "loomweave",
  name: "Loomweave",
  thread: "var(--thread-loomweave)",
  lang: "Rust",
  domain: "Code structure + identity authority (SEI)",
  answers: "what is this codebase, where do I touch, what is the durable identity?",
  status: "built · in use",
  repo: "~/loomweave"
}, {
  id: "filigree",
  name: "Filigree",
  thread: "var(--thread-filigree)",
  lang: "Python",
  domain: "Work state / issue lifecycle",
  answers: "what work exists, what state is it in, what happened?",
  status: "built · in use",
  repo: "~/filigree"
}, {
  id: "wardline",
  name: "Wardline",
  thread: "var(--thread-wardline)",
  lang: "Python",
  domain: "Trust-boundary analysis",
  answers: "what is allowed, and does this still satisfy the constraints?",
  status: "built · in use",
  repo: "~/wardline"
}, {
  id: "legis",
  name: "Legis",
  thread: "var(--thread-legis)",
  lang: "Python",
  domain: "Git/CI governance & attestations",
  answers: "what changed, and is this change governed?",
  status: "1.0.0rc1",
  repo: "~/legis"
}, {
  id: "charter",
  name: "Charter",
  thread: "var(--thread-charter)",
  lang: "Python",
  domain: "Requirements, traceability, verification",
  answers: "what must be true, and how do we know it is?",
  status: "scaffolded",
  repo: "~/charter"
}];
const SHUTTLE = {
  id: "shuttle",
  name: "Shuttle",
  thread: "var(--thread-shuttle)",
  lang: "—",
  domain: "Change execution (future)",
  answers: "carry this approved change through the weave, under guard rails.",
  status: "roadmap thought-bubble",
  repo: "no repo"
};
Object.assign(window, {
  Mark,
  MEMBERS,
  SHUTTLE
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/weft-cli/CliMarks.jsx", error: String((e && e.message) || e) }); }

// ui_kits/weft-cli/Terminal.jsx
try { (() => {
// Terminal.jsx — Weft CLI / agent-first terminal surface.
// The non-GUI members (Loomweave, Wardline, Legis, Charter) live here: CLI + MCP
// over stdio. Sessions are drawn from each tool's real README output.
const {
  useState,
  useEffect,
  useRef
} = React;

// line kinds → color
const K = {
  cmd: {
    color: "var(--text-primary)"
  },
  ps: {
    color: "var(--ready)"
  },
  // prompt $
  out: {
    color: "var(--text-secondary)"
  },
  dim: {
    color: "var(--text-muted)"
  },
  ok: {
    color: "var(--ready)"
  },
  warn: {
    color: "var(--aging)"
  },
  err: {
    color: "var(--stale)"
  },
  acc: {
    color: "var(--accent)"
  }
};
const thread = id => ({
  color: `var(--thread-${id})`
});
function L({
  k = "out",
  ind = 0,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...K[k],
      paddingLeft: ind * 14,
      whiteSpace: "pre-wrap"
    }
  }, children);
}
function Prompt({
  tool,
  cmd
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: K.ps
  }, "$"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, tool, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, cmd)));
}
function Tag({
  id,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...thread(id),
      border: `1px solid currentColor`,
      borderRadius: "var(--radius-sm)",
      padding: "0 5px",
      fontSize: 11,
      marginRight: 6
    }
  }, children);
}
const SESSIONS = {
  wardline: {
    member: "wardline",
    label: "wardline scan",
    render: () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Prompt, {
      tool: "wardline",
      cmd: "scan . --fail-on ERROR"
    }), /*#__PURE__*/React.createElement(L, {
      k: "dim"
    }, "scanned 1 file(s); 3 finding(s) \u2014 0 suppressed, 1 new \u2192 findings.jsonl"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8
      }
    }), /*#__PURE__*/React.createElement(L, null, /*#__PURE__*/React.createElement("span", {
      style: K.err
    }, "\u25CF PY-WL-101"), "  ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-primary)"
      }
    }, "demo.build_record")), /*#__PURE__*/React.createElement(L, {
      ind: 1,
      k: "out"
    }, "declares return trust ", /*#__PURE__*/React.createElement("span", {
      style: K.ok
    }, "ASSURED"), " but returns ", /*#__PURE__*/React.createElement("span", {
      style: K.err
    }, "EXTERNAL_RAW"), " \u2014"), /*#__PURE__*/React.createElement(L, {
      ind: 1,
      k: "out"
    }, "untrusted data reaches a trusted producer with no validation."), /*#__PURE__*/React.createElement(L, {
      ind: 1,
      k: "dim"
    }, "demo.py:8 \xB7 entity ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-primary)"
      }
    }, "loomweave:sei:7f3a\u2026b1")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8
      }
    }), /*#__PURE__*/React.createElement(L, {
      k: "dim"
    }, "2 finding(s) NONE-severity (engine facts) \u2014 hidden"), /*#__PURE__*/React.createElement(Prompt, {
      tool: "echo",
      cmd: "$?"
    }), /*#__PURE__*/React.createElement(L, {
      k: "err"
    }, "1   ", /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "# gate tripped \u2014 fix at the boundary, not the sink")))
  },
  loomweave: {
    member: "loomweave",
    label: "loomweave · MCP",
    render: () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Prompt, {
      tool: "loomweave",
      cmd: "serve   # 39-tool MCP surface over stdio"
    }), /*#__PURE__*/React.createElement(L, {
      k: "dim"
    }, "consult-mode agent \u2192 entity_orientation_pack_get(\"auth.session.build_record\")"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8
      }
    }), /*#__PURE__*/React.createElement(L, null, /*#__PURE__*/React.createElement("span", {
      style: K.acc
    }, "\u25C6 entity"), "  auth.session.build_record  ", /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "fn \xB7 python")), /*#__PURE__*/React.createElement(L, {
      ind: 1,
      k: "out"
    }, /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "sei"), "        loomweave:sei:7f3a\u2026b1  ", /*#__PURE__*/React.createElement("span", {
      style: K.ok
    }, "\u25CF stable")), /*#__PURE__*/React.createElement(L, {
      ind: 1,
      k: "out"
    }, /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "callers"), "    14 \xB7 2 subsystems \xB7 entry-point: no"), /*#__PURE__*/React.createElement(L, {
      ind: 1,
      k: "out"
    }, /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "enriched"), "   ", /*#__PURE__*/React.createElement(Tag, {
      id: "wardline"
    }, "wardline"), "taint EXTERNAL_RAW\u2192ASSURED"), /*#__PURE__*/React.createElement(L, {
      ind: 1,
      k: "out"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        paddingLeft: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 62,
        display: "inline-block"
      }
    }), /*#__PURE__*/React.createElement(Tag, {
      id: "filigree"
    }, "filigree"), "issue fg-da8d \xB7 fixing"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8
      }
    }), /*#__PURE__*/React.createElement(L, {
      k: "dim"
    }, "summary(id) dispatches the LLM lazily, one entity at a time."))
  },
  legis: {
    member: "legis",
    label: "legis · governance",
    render: () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Prompt, {
      tool: "legis",
      cmd: "verdict --cell coached   # simple \xB7 judge ON"
    }), /*#__PURE__*/React.createElement(L, {
      k: "dim"
    }, "policy PY-WL-101 fired at the git/CI boundary \u2192"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8
      }
    }), /*#__PURE__*/React.createElement(L, {
      k: "out"
    }, "agent proposed override:"), /*#__PURE__*/React.createElement(L, {
      ind: 1,
      k: "dim"
    }, "\"boundary validates downstream in sanitize() \u2014 false positive\""), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6
      }
    }), /*#__PURE__*/React.createElement(L, null, /*#__PURE__*/React.createElement("span", {
      style: K.err
    }, "\u2696  BLOCKED"), "  ", /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "judge rejected \u2014 sanitize() is not on the return path")), /*#__PURE__*/React.createElement(L, {
      k: "dim"
    }, "agent must correct the code or sharpen its rationale; cannot self-clear."), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8
      }
    }), /*#__PURE__*/React.createElement(L, {
      k: "dim"
    }, "trail: append-only \xB7 keyed on SEI \xB7 survives rename/move"), /*#__PURE__*/React.createElement(L, null, /*#__PURE__*/React.createElement("span", {
      style: thread("legis")
    }, "HMAC"), " ", /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "verdict signed \xB7 file_fingerprint + ast_path bound")))
  },
  tour: {
    member: "shuttle",
    label: "make tour → lacuna",
    render: () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Prompt, {
      tool: "make",
      cmd: "tour   # drive every live tool against the specimen"
    }), /*#__PURE__*/React.createElement(L, {
      k: "dim"
    }, "target: ~/lacuna \xB7 the deliberately-flawed demonstration specimen"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8
      }
    }), /*#__PURE__*/React.createElement(L, null, /*#__PURE__*/React.createElement("span", {
      style: thread("loomweave")
    }, "loomweave "), /*#__PURE__*/React.createElement("span", {
      style: K.ok
    }, "\u2713 live"), "   ", /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "catalog built \xB7 312 entities \xB7 SEI minted")), /*#__PURE__*/React.createElement(L, null, /*#__PURE__*/React.createElement("span", {
      style: thread("wardline")
    }, "wardline"), " ", /*#__PURE__*/React.createElement("span", {
      style: K.ok
    }, "\u2713 live"), "   ", /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "4 baselined lacunae surfaced \xB7 gate green")), /*#__PURE__*/React.createElement(L, null, /*#__PURE__*/React.createElement("span", {
      style: thread("filigree")
    }, "filigree"), " ", /*#__PURE__*/React.createElement("span", {
      style: K.ok
    }, "\u2713 live"), "   ", /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "findings \u2192 4 tracked issues")), /*#__PURE__*/React.createElement(L, null, /*#__PURE__*/React.createElement("span", {
      style: thread("legis")
    }, "legis   "), " ", /*#__PURE__*/React.createElement("span", {
      style: K.warn
    }, "\u25D0 design-only"), "  ", /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "labelled, never faked")), /*#__PURE__*/React.createElement(L, null, /*#__PURE__*/React.createElement("span", {
      style: thread("charter")
    }, "charter "), " ", /*#__PURE__*/React.createElement("span", {
      style: K.warn
    }, "\u25D0 design-only"), "  ", /*#__PURE__*/React.createElement("span", {
      style: K.dim
    }, "labelled, never faked")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8
      }
    }), /*#__PURE__*/React.createElement(L, {
      k: "ok"
    }, "\u2713 narrative regenerated \xB7 matrix coverage in lockstep"), /*#__PURE__*/React.createElement(L, {
      k: "dim"
    }, "degrades honestly \u2014 point the suite at Lacuna and watch it work."))
  }
};
function Terminal() {
  const order = ["wardline", "loomweave", "legis", "tour"];
  const [tab, setTab] = useState("wardline");
  const S = SESSIONS[tab];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 760,
      maxWidth: "94vw",
      margin: "0 auto",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      border: "1px solid var(--border-strong)",
      boxShadow: "var(--shadow-modal)",
      background: "#070C0E"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 13px",
      background: "var(--surface-raised)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 7
    }
  }, ["#FF5F57", "#FEBC2E", "#28C840"].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: c
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontSize: 11.5,
      color: "var(--text-muted)"
    }
  }, "agent@weft \u2014 ", S.label, " \u2014 stdio"), /*#__PURE__*/React.createElement(Mark, {
    name: "weft",
    size: 14,
    style: {
      color: "var(--text-muted)",
      marginLeft: "auto"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2,
      padding: "7px 9px 0",
      background: "var(--surface-raised)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, order.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTab(t),
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11.5,
      padding: "6px 12px",
      cursor: "pointer",
      border: "none",
      borderBottom: `2px solid ${tab === t ? `var(--thread-${SESSIONS[t].member})` : "transparent"}`,
      background: "transparent",
      color: tab === t ? "var(--text-primary)" : "var(--text-muted)",
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    name: SESSIONS[t].member,
    size: 13,
    style: thread(SESSIONS[t].member)
  }), SESSIONS[t].label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 22px",
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      lineHeight: 1.65,
      minHeight: 300
    }
  }, S.render(), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: K.ps
  }, "$"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 16,
      background: "var(--accent)",
      display: "inline-block",
      animation: "blink 1.1s steps(1) infinite"
    }
  }))));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--surface-base)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-label",
    style: {
      marginBottom: 8
    }
  }, "Agent-first \xB7 humans on the loop, not in it"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "The Weft CLI surface"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      color: "var(--text-secondary)",
      maxWidth: 600,
      margin: "10px auto 0",
      lineHeight: 1.6
    }
  }, "Four members with no GUI drive the same loop: scan \u2192 explain \u2192 fix \u2192 rescan, over CLI and a dependency-free MCP-over-stdio server. Switch sessions below.")), /*#__PURE__*/React.createElement(Terminal, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/weft-cli/Terminal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/weft-hub/Hub.jsx
try { (() => {
// Hub.jsx — the Weft federation portfolio / documentation landing.
const {
  useState
} = React;
function Chip({
  children,
  dim
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: dim ? "var(--text-muted)" : "var(--text-secondary)",
      border: "1px solid var(--border-default)",
      background: "var(--surface-raised)",
      borderRadius: "var(--radius-sm)",
      padding: "3px 9px"
    }
  }, children);
}
function HubHeader() {
  const links = ["Doctrine", "Federation", "Members", "SEI", "Glossary"];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22,
      padding: "12px 30px",
      borderBottom: "1px solid var(--border-default)",
      background: "var(--surface-raised)",
      position: "sticky",
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    name: "weft",
    size: 26,
    style: {
      color: "var(--text-primary)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 19,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)"
    }
  }, "Weft"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      marginLeft: 2
    }
  }, "~/weft")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 4,
      marginLeft: "auto"
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontSize: 12,
      color: "var(--text-secondary)",
      textDecoration: "none",
      padding: "6px 11px",
      borderRadius: "var(--radius)"
    },
    onMouseEnter: e => {
      e.target.style.background = "var(--surface-overlay)";
      e.target.style.color = "var(--text-primary)";
    },
    onMouseLeave: e => {
      e.target.style.background = "transparent";
      e.target.style.color = "var(--text-secondary)";
    }
  }, l))));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "64px 30px 40px",
      maxWidth: 980,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--ready)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, "Authoritative \xB7 interop layer \xB7 documentation only")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 56,
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.02,
      margin: 0,
      color: "var(--text-primary)"
    }
  }, "Distinct threads,", /*#__PURE__*/React.createElement("br", null), "woven on purpose."), /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      fontSize: 16,
      maxWidth: 680,
      marginTop: 22
    }
  }, "Weft is an agent-first federation of small, local-first developer tools. Each member is authoritative for one domain, useful on its own, and meaningfully composable with any sibling \u2014 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, "enrich-only, never load-bearing"), " when composed."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      padding: "16px 20px",
      borderLeft: "3px solid var(--accent)",
      background: "var(--surface-raised)",
      borderRadius: "0 var(--radius) var(--radius) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-label",
    style: {
      marginBottom: 7
    }
  }, "The federation axiom"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: "var(--text-primary)",
      lineHeight: 1.5
    }
  }, "Each member is authoritative for one domain, solo-useful, meaningfully composable pairwise, and enrich-only \u2014 never load-bearing \u2014 when composed.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      marginTop: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Chip, null, "5 realized members"), /*#__PURE__*/React.createElement(Chip, null, "local-first \xB7 no cloud"), /*#__PURE__*/React.createElement(Chip, null, "no runtime \xB7 no broker \xB7 no store"), /*#__PURE__*/React.createElement(Chip, {
    dim: true
  }, "Shuttle \u2014 roadmap")));
}
function MemberCard({
  m,
  open,
  onToggle,
  dim
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onToggle,
    style: {
      background: "var(--surface-raised)",
      border: "1px solid var(--border-default)",
      borderLeft: `3px solid ${m.thread}`,
      borderRadius: "var(--radius)",
      padding: "16px 18px",
      cursor: "pointer",
      opacity: dim ? 0.72 : 1,
      transition: "background .15s, transform .15s"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-overlay)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "var(--surface-raised)";
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    name: m.id,
    size: 28,
    style: {
      color: m.thread,
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, m.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, m.lang)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, m.domain)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: m.thread,
      whiteSpace: "nowrap"
    }
  }, m.status)), open && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 13,
      paddingTop: 13,
      borderTop: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-label",
    style: {
      marginBottom: 6
    }
  }, "Answers"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-primary)",
      lineHeight: 1.5,
      fontStyle: "italic"
    }
  }, "\u201C", m.answers, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      marginTop: 10
    }
  }, m.repo)));
}
function Roster() {
  const [openId, setOpenId] = useState("loomweave");
  const toggle = id => setOpenId(openId === id ? null : id);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "20px 30px 40px",
      maxWidth: 980,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-label",
    style: {
      marginBottom: 16
    }
  }, "The roster \u2014 click to expand"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, MEMBERS.map(m => /*#__PURE__*/React.createElement(MemberCard, {
    key: m.id,
    m: m,
    open: openId === m.id,
    onToggle: () => toggle(m.id)
  })), /*#__PURE__*/React.createElement(MemberCard, {
    m: SHUTTLE,
    open: openId === "shuttle",
    onToggle: () => toggle("shuttle"),
    dim: true
  })), /*#__PURE__*/React.createElement(LacunaStrip, null));
}
function LacunaStrip() {
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      textDecoration: "none",
      display: "block",
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-label",
    style: {
      marginBottom: 10,
      color: "var(--lacuna-accent-dim)"
    }
  }, "Adjacent \u2014 not a member"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "15px 18px",
      background: "var(--lacuna-surface)",
      border: "1.5px dashed var(--lacuna-border)",
      borderRadius: "var(--radius)",
      cursor: "pointer",
      transition: "border-color .15s"
    },
    onMouseEnter: e => e.currentTarget.style.borderColor = "var(--lacuna-accent-dim)",
    onMouseLeave: e => e.currentTarget.style.borderColor = "var(--lacuna-border)"
  }, /*#__PURE__*/React.createElement(Mark, {
    name: "lacuna",
    size: 28,
    style: {
      color: "var(--lacuna-accent)",
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, "Lacuna"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--lacuna-accent-dim)"
    }
  }, "demonstration specimen")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, "The deliberately-flawed app the suite is run against. Point the tools at it and watch them work.")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--lacuna-accent)",
      whiteSpace: "nowrap"
    }
  }, "~/lacuna \u2192")));
}
const MODES = {
  solo: {
    label: "Solo",
    text: "Each tool has a complete, respectable use-case by itself. Filigree files, works, and closes a bug with Loomweave absent or broken."
  },
  pair: {
    label: "Pair",
    text: "Combined with any one sibling it creates a meaningful capability — Wardline findings become tracked Filigree work; never a broken fragment."
  },
  suite: {
    label: "Suite",
    text: "All together form something richer: the agent understands the code, its trust posture, what it may do, and every unit of work — keyed on one identity."
  }
};
function CompositionLaw() {
  const [mode, setMode] = useState("pair");
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "28px 30px 44px",
      maxWidth: 980,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: "-0.015em",
      color: "var(--text-primary)",
      margin: "0 0 4px"
    }
  }, "The composition law"), /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      maxWidth: 640,
      marginBottom: 20
    }
  }, "Any Weft product must satisfy all three modes. Pairwise composability is a hard rule, not an aspiration."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 16
    }
  }, Object.keys(MODES).map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setMode(k),
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 600,
      padding: "8px 16px",
      borderRadius: "var(--radius)",
      cursor: "pointer",
      border: "1px solid " + (mode === k ? "var(--accent)" : "var(--border-strong)"),
      background: mode === k ? "var(--accent)" : "var(--surface-overlay)",
      color: mode === k ? "#06222F" : "var(--text-secondary)"
    }
  }, MODES[k].label))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-raised)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: "22px 24px",
      minHeight: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: "var(--text-primary)",
      lineHeight: 1.55
    }
  }, MODES[mode].text)));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--surface-base)",
      fontFamily: "var(--font-mono)"
    }
  }, /*#__PURE__*/React.createElement(HubHeader, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Roster, null), /*#__PURE__*/React.createElement(CompositionLaw, null), /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--border-default)",
      padding: "20px 30px",
      maxWidth: 980,
      margin: "0 auto",
      display: "flex",
      gap: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    name: "weft",
    size: 18,
    style: {
      color: "var(--text-muted)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, "~/weft is documentation only \u2014 there is nothing called \u201CWeft\u201D to install or run."), /*#__PURE__*/React.createElement("a", {
    href: "https://foundryside.dev",
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none"
    },
    onMouseEnter: e => {
      const s = e.currentTarget.querySelector("span");
      if (s) s.style.color = "var(--text-secondary)";
    },
    onMouseLeave: e => {
      const s = e.currentTarget.querySelector("span");
      if (s) s.style.color = "var(--text-muted)";
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    name: "foundryside",
    size: 17,
    style: {
      color: "var(--text-muted)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      transition: "color .15s"
    }
  }, "part of Foundryside \xB7 foundryside.dev")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, "MIT \xB7 2026")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/weft-hub/Hub.jsx", error: String((e && e.message) || e) }); }

// ui_kits/weft-hub/HubMarks.jsx
try { (() => {
// Marks.jsx — Weft federation glyph set as React components.
// Stroke-based, inherit `color` via currentColor. Shared across UI kits.
const {
  createElement: h
} = React;
const MARK_PATHS = {
  foundryside: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 24 H27"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 24 V15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 24 V10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 24 V15"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "15",
    r: "2.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "10",
    r: "2.3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "21",
    cy: "15",
    r: "2.1"
  }))),
  weft: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 6 V18.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 23.2 V26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 6 V8.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 13.2 V26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 11 H8.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.2 11 H26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 21 H18.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23.2 21 H26"
  })),
  loomweave: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 5 V27"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11 H24"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 21 H8"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "5",
    r: "2.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "11",
    r: "2.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "21",
    r: "2.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "27",
    r: "2.4"
  }))),
  filigree: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 4 L28 16 L16 28 L4 16 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11 L21 16 L16 21 L11 16 Z",
    fill: "currentColor",
    stroke: "none"
  })),
  wardline: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 4 V28"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 10 H15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 16 H15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 22 H15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 16 L26 11 V21 L18 16Z",
    fill: "currentColor"
  })),
  legis: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 6 V25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 25 H23"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 9 H25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 9 L4 16 H10 L7 9Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 9 L22 16 H28 L25 9Z"
  })),
  charter: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 5 H24 V27 H8 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 11 H20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16 H17"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 21.5 L14 24 L20 17.5"
  })),
  shuttle: /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 16 H28",
    strokeDasharray: "3 3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 16 C11 12, 21 12, 21 16 C21 20, 11 20, 11 16 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "1.6",
    fill: "currentColor",
    stroke: "none"
  })),
  lacuna: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M19 6 H25 A1 1 0 0 1 26 7 V25 A1 1 0 0 1 25 26 H7 A1 1 0 0 1 6 25 V7 A1 1 0 0 1 7 6 H13",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeDasharray: "2.6 3",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.4",
    y: "13.4",
    width: "5.2",
    height: "5.2",
    rx: "1",
    fill: "currentColor"
  }))
};
function Mark({
  name,
  size = 24,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    className: className,
    style: style,
    "aria-label": name,
    role: "img"
  }, MARK_PATHS[name]);
}

// Federation roster — single source for kits.
const MEMBERS = [{
  id: "loomweave",
  name: "Loomweave",
  thread: "var(--thread-loomweave)",
  lang: "Rust",
  domain: "Code structure + identity authority (SEI)",
  answers: "what is this codebase, where do I touch, what is the durable identity?",
  status: "built · in use",
  repo: "~/loomweave"
}, {
  id: "filigree",
  name: "Filigree",
  thread: "var(--thread-filigree)",
  lang: "Python",
  domain: "Work state / issue lifecycle",
  answers: "what work exists, what state is it in, what happened?",
  status: "built · in use",
  repo: "~/filigree"
}, {
  id: "wardline",
  name: "Wardline",
  thread: "var(--thread-wardline)",
  lang: "Python",
  domain: "Trust-boundary analysis",
  answers: "what is allowed, and does this still satisfy the constraints?",
  status: "built · in use",
  repo: "~/wardline"
}, {
  id: "legis",
  name: "Legis",
  thread: "var(--thread-legis)",
  lang: "Python",
  domain: "Git/CI governance & attestations",
  answers: "what changed, and is this change governed?",
  status: "1.0.0rc1",
  repo: "~/legis"
}, {
  id: "charter",
  name: "Charter",
  thread: "var(--thread-charter)",
  lang: "Python",
  domain: "Requirements, traceability, verification",
  answers: "what must be true, and how do we know it is?",
  status: "scaffolded",
  repo: "~/charter"
}];
const SHUTTLE = {
  id: "shuttle",
  name: "Shuttle",
  thread: "var(--thread-shuttle)",
  lang: "—",
  domain: "Change execution (future)",
  answers: "carry this approved change through the weave, under guard rails.",
  status: "roadmap thought-bubble",
  repo: "no repo"
};
Object.assign(window, {
  Mark,
  MEMBERS,
  SHUTTLE
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/weft-hub/HubMarks.jsx", error: String((e && e.message) || e) }); }

})();
