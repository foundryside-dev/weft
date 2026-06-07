// Hub.jsx — the Weft federation portfolio / documentation landing.
const { useState } = React;

function Chip({ children, dim }) {
  return <span style={{
    fontSize: 11, color: dim ? "var(--text-muted)" : "var(--text-secondary)",
    border: "1px solid var(--border-default)", background: "var(--surface-raised)",
    borderRadius: "var(--radius-sm)", padding: "3px 9px",
  }}>{children}</span>;
}

function HubHeader() {
  const links = ["Doctrine", "Federation", "Members", "SEI", "Glossary"];
  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 22, padding: "12px 30px",
      borderBottom: "1px solid var(--border-default)", background: "var(--surface-raised)",
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <Mark name="weft" size={26} style={{ color: "var(--text-primary)" }} />
        <span style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
          Weft
        </span>
        <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 2 }}>~/weft</span>
      </div>
      <nav style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
        {links.map((l) => (
          <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{
            fontSize: 12, color: "var(--text-secondary)", textDecoration: "none",
            padding: "6px 11px", borderRadius: "var(--radius)",
          }} onMouseEnter={(e) => { e.target.style.background = "var(--surface-overlay)"; e.target.style.color = "var(--text-primary)"; }}
             onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "var(--text-secondary)"; }}>{l}</a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ padding: "64px 30px 40px", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 22 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ready)" }} />
        <span className="t-label">Authoritative · interop layer · documentation only</span>
      </div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02, margin: 0, color: "var(--text-primary)" }}>
        Distinct threads,<br />woven on purpose.
      </h1>
      <p className="t-body" style={{ fontSize: 16, maxWidth: 680, marginTop: 22 }}>
        Weft is an agent-first federation of small, local-first developer tools. Each member is
        authoritative for one domain, useful on its own, and meaningfully composable with any
        sibling — <span style={{ color: "var(--text-primary)" }}>enrich-only, never load-bearing</span> when composed.
      </p>
      <div style={{
        marginTop: 26, padding: "16px 20px", borderLeft: "3px solid var(--accent)",
        background: "var(--surface-raised)", borderRadius: "0 var(--radius) var(--radius) 0",
      }}>
        <div className="t-label" style={{ marginBottom: 7 }}>The federation axiom</div>
        <div style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.5 }}>
          Each member is authoritative for one domain, solo-useful, meaningfully composable
          pairwise, and enrich-only — never load-bearing — when composed.
        </div>
      </div>
      <div style={{ display: "flex", gap: 9, marginTop: 24, flexWrap: "wrap" }}>
        <Chip>5 realized members</Chip>
        <Chip>local-first · no cloud</Chip>
        <Chip>no runtime · no broker · no store</Chip>
        <Chip dim>Shuttle — roadmap</Chip>
      </div>
    </section>
  );
}

function MemberCard({ m, open, onToggle, dim }) {
  return (
    <div onClick={onToggle} style={{
      background: "var(--surface-raised)", border: "1px solid var(--border-default)",
      borderLeft: `3px solid ${m.thread}`, borderRadius: "var(--radius)",
      padding: "16px 18px", cursor: "pointer", opacity: dim ? 0.72 : 1,
      transition: "transform .15s, box-shadow .15s",
    }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-overlay)"; }}
       onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-raised)"; }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Mark name={m.id} size={28} style={{ color: m.thread, flex: "0 0 auto" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{m.name}</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.lang}</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{m.domain}</div>
        </div>
        <span style={{ fontSize: 10.5, color: m.thread, whiteSpace: "nowrap" }}>{m.status}</span>
      </div>
      {open && (
        <div style={{ marginTop: 13, paddingTop: 13, borderTop: "1px solid var(--border-default)" }}>
          <div className="t-label" style={{ marginBottom: 6 }}>Answers</div>
          <div style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5, fontStyle: "italic" }}>“{m.answers}”</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 10 }}>{m.repo}</div>
        </div>
      )}
    </div>
  );
}

function Roster() {
  const [openId, setOpenId] = useState("loomweave");
  const toggle = (id) => setOpenId(openId === id ? null : id);
  return (
    <section style={{ padding: "20px 30px 40px", maxWidth: 980, margin: "0 auto" }}>
      <div className="t-label" style={{ marginBottom: 16 }}>The roster — click to expand</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MEMBERS.map((m) => <MemberCard key={m.id} m={m} open={openId === m.id} onToggle={() => toggle(m.id)} />)}
        <MemberCard m={SHUTTLE} open={openId === "shuttle"} onToggle={() => toggle("shuttle")} dim />
      </div>
      <LacunaStrip />
    </section>
  );
}

function LacunaStrip() {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: "none", display: "block", marginTop: 22 }}>
      <div className="t-label" style={{ marginBottom: 10, color: "var(--lacuna-accent-dim)" }}>Adjacent — not a member</div>
      <div style={{
        display: "flex", alignItems: "center", gap: 14, padding: "15px 18px",
        background: "var(--lacuna-surface)", border: "1.5px dashed var(--lacuna-border)",
        borderRadius: "var(--radius)", cursor: "pointer", transition: "border-color .15s",
      }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--lacuna-accent-dim)")}
         onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--lacuna-border)")}>
        <Mark name="lacuna" size={28} style={{ color: "var(--lacuna-accent)", flex: "0 0 auto" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>Lacuna</span>
            <span style={{ fontSize: 11, color: "var(--lacuna-accent-dim)" }}>demonstration specimen</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>The deliberately-flawed app the suite is run against. Point the tools at it and watch them work.</div>
        </div>
        <span style={{ fontSize: 11, color: "var(--lacuna-accent)", whiteSpace: "nowrap" }}>~/lacuna →</span>
      </div>
    </a>
  );
}

const MODES = {
  solo: { label: "Solo", text: "Each tool has a complete, respectable use-case by itself. Filigree files, works, and closes a bug with Loomweave absent or broken." },
  pair: { label: "Pair", text: "Combined with any one sibling it creates a meaningful capability — Wardline findings become tracked Filigree work; never a broken fragment." },
  suite: { label: "Suite", text: "All together form something richer: the agent understands the code, its trust posture, what it may do, and every unit of work — keyed on one identity." },
};

function CompositionLaw() {
  const [mode, setMode] = useState("pair");
  return (
    <section style={{ padding: "28px 30px 44px", maxWidth: 980, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, letterSpacing: "-0.015em", color: "var(--text-primary)", margin: "0 0 4px" }}>The composition law</h2>
      <p className="t-body" style={{ maxWidth: 640, marginBottom: 20 }}>Any Weft product must satisfy all three modes. Pairwise composability is a hard rule, not an aspiration.</p>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {Object.keys(MODES).map((k) => (
          <button key={k} onClick={() => setMode(k)} style={{
            fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
            padding: "8px 16px", borderRadius: "var(--radius)", cursor: "pointer",
            border: "1px solid " + (mode === k ? "var(--accent)" : "var(--border-strong)"),
            background: mode === k ? "var(--accent)" : "var(--surface-overlay)",
            color: mode === k ? "var(--text-on-accent)" : "var(--text-secondary)",
          }}>{MODES[k].label}</button>
        ))}
      </div>
      <div style={{
        background: "var(--surface-raised)", border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)", padding: "22px 24px", minHeight: 64,
      }}>
        <div style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.55 }}>{MODES[mode].text}</div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-base)", fontFamily: "var(--font-mono)" }}>
      <HubHeader />
      <Hero />
      <Roster />
      <CompositionLaw />
      <footer style={{ borderTop: "1px solid var(--border-default)", padding: "20px 30px", maxWidth: 980, margin: "0 auto", display: "flex", gap: 14, alignItems: "center" }}>
        <Mark name="weft" size={18} style={{ color: "var(--text-muted)" }} />
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>~/weft is documentation only — there is nothing called “Weft” to install or run.</span>
        <a href="https://foundryside.dev" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
           onMouseEnter={(e) => { const s = e.currentTarget.querySelector("span"); if (s) s.style.color = "var(--text-secondary)"; }}
           onMouseLeave={(e) => { const s = e.currentTarget.querySelector("span"); if (s) s.style.color = "var(--text-muted)"; }}>
          <Mark name="foundryside" size={17} style={{ color: "var(--text-muted)" }} />
          <span style={{ fontSize: 11, color: "var(--text-muted)", transition: "color .15s" }}>part of Foundryside · foundryside.dev</span>
        </a>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>MIT · 2026</span>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
