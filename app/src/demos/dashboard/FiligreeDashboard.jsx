// FiligreeDashboard.jsx — ported from ui_kits/filigree-dashboard/Dashboard.jsx
// to ESM:
//   const { useState, useMemo } = React → import; window Tabs/Toast → import from
//   ds; the kit-local Marks.jsx Mark → the library Mark (identical glyph set);
//   data constants → import from ./data; App renamed FiligreeDashboard; the
//   self-mount block removed.
// LAYOUT: the original owns the viewport (height:100vh; overflow:hidden). Dropped
// into a /demos page with site chrome it would fight it, so it is sized to a
// bounded frame (height:560 — the kit's documented viewport) here. Its OWN
// data-theme toggle stays (the vendored tokens honor [data-theme="light"] on any
// element, so the in-demo flip is scoped to this frame).
import React, { useState, useMemo } from 'react';
import { Tabs, Toast, Mark } from '../../ds/index.js';
import { Kanban } from './Kanban.jsx';
import { DetailPanel } from './DetailPanel.jsx';
import { ISSUES, PROJECT, TYPE_ICONS, CATEGORY_COLORS, PRIORITY_COLORS } from './data.js';

function Pill({ on, onClick, children }) {
  const styles = on
    ? { background: 'var(--accent)', color: 'var(--text-on-accent)', border: '1px solid var(--accent)' }
    : { background: 'var(--surface-overlay)', color: 'var(--text-secondary)', border: '1px solid var(--border-strong)' };
  return (
    <button onClick={onClick} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, padding: '4px 9px', borderRadius: 'var(--radius)', cursor: 'pointer', ...styles }}>
      {children}
    </button>
  );
}

function ReadyTable({ issues, onOpen }) {
  const ready = issues.filter((i) => i.ready && i.cat !== 'done');
  return (
    <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>Ready to Work</span>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{ready.length} issues · no open blockers</span>
      </div>
      <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-strong)' }}>
            {['P', 'ID', 'Type', 'Title', 'Assignee', 'Status'].map((h) => (
              <th key={h} style={{ padding: '8px 8px', fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ready.map((i) => (
            <tr
              key={i.id}
              onClick={() => onOpen(i)}
              style={{ cursor: 'pointer', borderBottom: '1px solid var(--border-default)', borderLeft: '3px solid var(--ready)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <td style={{ padding: '9px 8px', color: PRIORITY_COLORS[i.priority], fontWeight: 600 }}>{i.priority}</td>
              <td style={{ padding: '9px 8px', color: 'var(--text-primary)' }}>{i.id}</td>
              <td style={{ padding: '9px 8px', color: 'var(--text-secondary)' }}>{TYPE_ICONS[i.type]} {i.type}</td>
              <td style={{ padding: '9px 8px', color: 'var(--text-primary)' }}>{i.title}</td>
              <td style={{ padding: '9px 8px', color: 'var(--text-secondary)' }}>{i.assignee || '—'}</td>
              <td style={{ padding: '9px 8px' }}>
                <span style={{ background: CATEGORY_COLORS[i.cat] + '33', color: CATEGORY_COLORS[i.cat], padding: '2px 7px', borderRadius: 'var(--radius-sm)' }}>{i.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Placeholder({ label }) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10, textAlign: 'center', padding: 24 }}>
      <Mark name="filigree" size={40} title="Filigree" style={{ color: 'var(--border-strong)' }} />
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{label} view — Cytoscape graph &amp; flow metrics live in the full product.</span>
    </div>
  );
}

export function FiligreeDashboard() {
  const [view, setView] = useState('kanban');
  const [sel, setSel] = useState(null);
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [pills, setPills] = useState({ open: true, active: true, done: true });
  const [toast, setToast] = useState(null);
  const notify = (t) => {
    setToast(t);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 3400);
  };

  const issues = useMemo(() => {
    let list = ISSUES.slice();
    if (ready) list = list.filter((i) => i.ready);
    list = list.filter((i) => (i.cat === 'open' && pills.open) || (i.cat === 'wip' && pills.active) || (i.cat === 'done' && pills.done));
    return list;
  }, [ready, pills]);

  const stats = useMemo(
    () => ({
      open: ISSUES.filter((i) => i.cat === 'open').length,
      wip: ISSUES.filter((i) => i.cat === 'wip').length,
      ready: ISSUES.filter((i) => i.ready && i.cat !== 'done').length,
      blocked: ISSUES.filter((i) => (i.blocked_by || []).length).length,
      deps: ISSUES.reduce((a, i) => a + (i.deps || []).length + (i.blocked_by || []).length, 0),
    }),
    []
  );

  const health = 78;

  return (
    <div
      // explicit on both values (not undefined) so the demo's own toggle is
      // independent of the site-wide theme — otherwise, with the site in light,
      // an undefined "dark" would inherit light and the demo couldn't go dark.
      data-theme={theme === 'light' ? 'light' : 'dark'}
      style={{
        height: 560,
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--surface-base)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-modal)',
        position: 'relative',
      }}
    >
      {/* Top nav */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border-default)', flexShrink: 0, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>
            <Mark name="filigree" size={16} title="Filigree" style={{ color: 'var(--accent)' }} /> Filigree
          </span>
          <button onClick={() => notify({ tone: 'var(--accent)', icon: '✨', title: 'Issue created', body: 'fg-new1 · open · via dashboard' })} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: 'var(--accent)', color: 'var(--text-on-accent)', padding: '4px 9px', borderRadius: 'var(--radius)', border: 'none', cursor: 'pointer' }}>+ New</button>
          <nav>
            <Tabs
              variant="pill"
              value={view}
              onChange={setView}
              tabs={[
                { id: 'kanban', label: 'Kanban' },
                { id: 'ready', label: 'Ready' },
                { id: 'graph', label: 'Graph' },
                { id: 'insights', label: 'Insights' },
                { id: 'files', label: 'Files' },
              ]}
            />
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Pill on={ready} onClick={() => setReady(!ready)}>● Ready ({stats.ready})</Pill>
          <div style={{ display: 'flex', gap: 4 }}>
            <Pill on={pills.open} onClick={() => setPills({ ...pills, open: !pills.open })}>Open</Pill>
            <Pill on={pills.active} onClick={() => setPills({ ...pills, active: !pills.active })}>Active</Pill>
            <Pill on={pills.done} onClick={() => setPills({ ...pills, done: !pills.done })}>Done</Pill>
          </div>
          <span title="System health" style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius)', background: 'rgba(6,78,59,.4)', color: 'var(--ready)', border: '1px solid #047857' }}>{health}</span>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle demo theme" aria-label="Toggle demo theme" style={{ background: 'var(--surface-overlay)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', color: 'var(--text-secondary)', cursor: 'pointer', padding: '5px 8px', fontSize: 12 }}>☀</button>
        </div>
      </header>

      {/* Main */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          {view === 'kanban' && <Kanban issues={issues} onOpen={setSel} />}
          {view === 'ready' && <ReadyTable issues={ISSUES} onOpen={setSel} />}
          {view === 'graph' && <Placeholder label="Graph" />}
          {view === 'insights' && <Placeholder label="Insights" />}
          {view === 'files' && <Placeholder label="Files" />}
        </div>
        <DetailPanel issue={sel} onClose={() => setSel(null)} onNotify={notify} />
      </div>

      {/* Footer stats */}
      <footer style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '5px 14px', background: 'var(--surface-raised)', borderTop: '1px solid var(--border-default)', fontSize: 11, color: 'var(--text-secondary)', flexShrink: 0, flexWrap: 'wrap' }}>
        <span>Open: <b style={{ color: 'var(--text-primary)' }}>{stats.open}</b></span>
        <span>In Progress: <b style={{ color: 'var(--text-primary)' }}>{stats.wip}</b></span>
        <span>Ready: <b style={{ color: 'var(--ready)' }}>{stats.ready}</b></span>
        <span>Blocked: <b style={{ color: 'var(--stale)' }}>{stats.blocked}</b></span>
        <span>Deps: <b style={{ color: 'var(--text-primary)' }}>{stats.deps}</b></span>
        <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>filigree v{PROJECT.version} · ethereal</span>
      </footer>

      {/* Transient toast — anchored to this frame */}
      {toast && (
        <div style={{ position: 'absolute', right: 16, bottom: 40, zIndex: 200 }}>
          <Toast tone={toast.tone} icon={toast.icon} title={toast.title} onDismiss={() => setToast(null)}>{toast.body}</Toast>
        </div>
      )}
    </div>
  );
}
