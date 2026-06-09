import React from 'react';
import { Link } from 'react-router-dom';
import { CodeSample } from '../components/CodeSample.jsx';

const SDK = 'https://github.com/foundryside-dev/weft/blob/main/federation-sdk.md';
const SEI_STD = 'https://github.com/foundryside-dev/weft/blob/main/sei-standard.md';
const LOOMWEAVE_REPO = 'https://github.com/foundryside-dev/clarion';
const WARDLINE_REPO = 'https://github.com/foundryside-dev/wardline';

// Build — the member-builder section, grounded in federation-sdk.md. The three
// conformance invariants, then two ANNOTATED STATIC code samples (not runnable):
// a Rust Loomweave entity-extraction plugin and a Python Wardline trust rule.
// Samples are illustrative and schematic where a signature is uncertain — they
// point to the owning repo rather than fabricate an API.

const INVARIANTS = [
  {
    id: 'I-1',
    title: 'Key every cross-tool binding on SEI',
    body:
      'Any durable reference your member holds to another member’s code entity must key on the Stable Entity Identity — the opaque, Loomweave-minted token that survives the renames and moves developers actually perform. Store it opaque; never parse, mint, or derive it. A binding keyed on a mutable locator silently orphans on the first refactor. Degrade honestly when the sei capability is absent.',
  },
  {
    id: 'I-2',
    title: 'Stay enrich-only / loosely cooperating',
    body:
      'Every surface your member exposes must be fully functional with every peer absent, and removing your member must never break a peer’s core flow. Federation writes you accept are off by default or additive; you compute your own domain result first, and a peer’s enrichment is layered on — never required to produce it.',
  },
  {
    id: 'I-3',
    title: 'Treat peer identifiers and blobs as opaque; own your drift check',
    body:
      'The holder of a foreign value never interprets it. Store what a peer hands you verbatim and detect drift on your own read path by snapshotting the peer’s content hash at attach time and comparing on read. The identity axis (alive / orphaned) and the content axis (fresh / stale) are separate signals — neither is inferred from the other.',
  },
];

// --- Rust: a Loomweave entity-extraction plugin (federation-sdk §2.1 + the
// loomweave briefing's locator/SEI model). Illustrative but faithful to the
// {plugin_id}:{kind}:{qualname} + SEI + content_hash model. Schematic where a
// real trait signature is uncertain. ---
const RUST_SAMPLE = `
// loomweave entity-extraction plugin (illustrative — see the contract)
// Emits 3-segment LOCATORS; Loomweave mints them to opaque SEIs.
// Locator form (Loomweave's authority, ADR-038):  {plugin_id}:{kind}:{qualname}
// SEI form (opaque to you — recognise, never parse):
//     loomweave:eid:<blake3(locator ++ 0x00 ++ mint_run_id)[:32 hex]>

use loomweave_plugin::{EntityKind, ExtractedEntity, Extractor, SourceFile};

/// A plugin is identified by its plugin_id — the first locator segment.
pub struct TomlExtractor;

impl Extractor for TomlExtractor {
    /// The plugin_id Loomweave namespaces your entities under.
    fn plugin_id(&self) -> &'static str {
        "toml"
    }

    /// Walk one file and emit entities. You supply the LOCATOR + the BLAKE3
    /// content_hash of the entity body; Loomweave owns minting/resolving the SEI.
    fn extract(&self, file: &SourceFile) -> Vec<ExtractedEntity> {
        file.tables()
            .map(|table| ExtractedEntity {
                // {plugin_id}:{kind}:{qualname} — the address, NOT the identity.
                kind: EntityKind::Record,
                qualname: table.dotted_path(),          // e.g. "tool.ruff.lint"
                // content_hash: BLAKE3 over the entity body. Loomweave compares
                // this on its own read path — the content axis, separate from
                // the identity axis. You do NOT compute drift; you report bytes.
                content_hash: file.blake3(table.span()),
                span: table.span(),
            })
            .collect()
    }
}

// Conformance (federation-sdk §3): you treat the returned SEI as opaque, store
// it verbatim, and never mint it yourself. On rename-with-unchanged-body the SEI
// is carried; on a body edit during a rename Loomweave fails closed (new SEI,
// old one orphaned). Prove it against the shared oracle, never assume it.
`;

// --- Python: a Wardline trust-boundary rule / decorator usage (federation-sdk
// §2.3 + the wardline briefing). Real vocabulary: external_boundary /
// trust_boundary / trusted decorators, a PY-WL-1xx rule, the 8-state taint
// lattice. Wardline is deconfliction/policy, NOT a security scanner. ---
const PY_SAMPLE = `
# wardline trust-boundary usage + a PY-WL-1xx rule (illustrative — see the contract)
# Wardline is a deconfliction / trust-policy analyzer, NOT a security scanner.
# Vocabulary (Wardline's authority): 3 canonical decorators + an 8-state taint
# lattice. Rule ids are PY-WL-101..120.

from wardline import external_boundary, trust_boundary, trusted, TaintState

# --- annotating the code under analysis --------------------------------------

@external_boundary          # data crossing in from outside is EXTERNAL_RAW
def read_request(req) -> str:
    return req.body                      # taint: EXTERNAL_RAW

@trust_boundary             # the validation gate that raises the trust level
def sanitize(raw: str) -> str:
    if not raw.isascii():
        raise ValueError("rejected at the boundary")
    return raw                           # taint: EXTERNAL_RAW -> VALIDATED

@trusted                    # declares it only accepts ASSURED data
def build_record(value: str) -> "Record":
    # PY-WL-101 fires here if VALIDATED/EXTERNAL_RAW reaches a 'trusted' sink:
    # "fix findings at the boundary (validate before returning), not at the sink."
    return Record(value)

# --- a rule in the scanner engine (schematic; real base lives in the repo) ----

class ReturnTrustMismatch(Rule):
    """PY-WL-101 — a function declares a return trust it does not honour."""
    id = "PY-WL-101"
    severity = "ERROR"

    def check(self, fn, lattice):
        declared = fn.declared_return_trust          # e.g. TaintState.ASSURED
        actual = lattice.resolve_return(fn)          # propagated up the lattice
        if not lattice.satisfies(actual, declared):
            self.report(
                fn,
                # Loomweave reconciles this dotted qualname to an opaque SEI;
                # the finding keys on the SEI, not the path, so it survives moves.
                qualname=fn.qualname,
                message=f"declares {declared} but returns {actual}",
            )
`;

function SectionHeading({ children, id }) {
  return (
    <h2
      id={id}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: '-0.015em',
        color: 'var(--text-primary)',
        margin: '38px 0 12px',
      }}
    >
      {children}
    </h2>
  );
}

export function Build() {
  return (
    <div className="page-shell" style={{ padding: '28px 30px 20px' }}>
      <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>~/weft</Link>
        <span aria-hidden> / </span>
        <span style={{ color: 'var(--text-secondary)' }}>build</span>
      </nav>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 1.5rem + 2vw, 2.8rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          margin: '0 0 8px',
        }}
      >
        Build a member
      </h1>
      <p className="t-body" style={{ maxWidth: 740, marginTop: 0 }}>
        A member is any tool that is authoritative for one domain, useful standalone, and enrich-only
        when composed. You do not register with a broker and there is no <code>weft://</code> URI
        scheme — joining is conforming to the interfaces. There is nothing to <code>pip install</code>;
        the SDK gives you the interface, and the owning repo gives you the bytes.
      </p>

      <SectionHeading id="invariants">The conformance spine — three invariants</SectionHeading>
      <p className="t-body" style={{ maxWidth: 740, marginTop: 0 }}>
        Every member satisfies these three, regardless of which peers it touches. They fall straight
        out of the doctrine and the locked identity standard.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {INVARIANTS.map((inv) => (
          <div
            key={inv.id}
            style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-default)',
              borderLeft: '3px solid var(--accent)',
              borderRadius: 'var(--radius)',
              padding: '14px 18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 5 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{inv.id}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{inv.title}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>{inv.body}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
        Conformance is oracle-gated, never assumed — a tool is conformant only when it passes the
        shared oracle. The full checklist is in the{' '}
        <a href={SDK} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          federation SDK
        </a>{' '}
        §3, against the{' '}
        <a href={SEI_STD} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          SEI standard
        </a>
        .
      </p>

      <SectionHeading id="samples">Two annotated plugin samples</SectionHeading>
      <p className="t-body" style={{ maxWidth: 740, marginTop: 0 }}>
        Both are illustrative and faithful to the briefings — schematic where an exact signature is
        uncertain, pointing to the owning repo rather than fabricating an API. Each is in its member’s
        real language.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 8 }}>
        <CodeSample
          label="Loomweave entity-extraction plugin"
          language="rust"
          code={RUST_SAMPLE}
          caption="Emits 3-segment locators that Loomweave mints to opaque SEIs (federation-sdk §2.1)."
          href={LOOMWEAVE_REPO}
          hrefLabel="foundryside-dev/clarion"
        />
        <CodeSample
          label="Wardline trust-boundary rule"
          language="python"
          code={PY_SAMPLE}
          caption="Uses the real vocabulary: external_boundary / trust_boundary / trusted + a PY-WL-1xx rule (federation-sdk §2.3)."
          href={WARDLINE_REPO}
          hrefLabel="foundryside-dev/wardline"
        />
      </div>

      <div
        style={{
          marginTop: 28,
          padding: '16px 20px',
          background: 'var(--surface-raised)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius)',
        }}
      >
        <div className="t-label" style={{ marginBottom: 6 }}>Dropping in your own member</div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Be solo-useful first; consume identity (resolve your refs to SEIs, store them opaque, probe
          capabilities and degrade); opt into only the surfaces you compose with; optionally expose
          your own enrich-only surface; pass the oracle. The full path is{' '}
          <a href={`${SDK}#4-dropping-in-your-own-member--the-path`} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--accent)' }}>
            federation-sdk §4
          </a>
          .
        </p>
      </div>
    </div>
  );
}
