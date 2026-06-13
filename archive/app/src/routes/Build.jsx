import React from 'react';
import { Link } from 'react-router-dom';
import { CodeSample } from '../components/CodeSample.jsx';

const SDK = 'https://github.com/foundryside-dev/weft/blob/main/federation-sdk.md';
const LOOMWEAVE_REPO = 'https://github.com/foundryside-dev/loomweave';
const WARDLINE_REPO = 'https://github.com/foundryside-dev/wardline';

// Build — the member-builder section, grounded in federation-sdk.md. The three
// integration basics, then two annotated static code samples:
// a Rust Loomweave entity-extraction plugin and a Python Wardline trust rule.
// Samples are schematic where a signature is uncertain — they
// point to the owning repo rather than fabricate an API.

const INTEGRATION_BASICS = [
  {
    id: 'I-1',
    title: 'Use stable identity for code links',
    body:
      'When your tool refers to code, use the stable identity from Loomweave. That keeps issues, findings, and sign-offs connected when a developer renames or moves code.',
  },
  {
    id: 'I-2',
    title: 'Keep every tool useful on its own',
    body:
      'A Weft tool should still deliver its core value when no other Weft tool is installed. Integrations add context; they do not become runtime requirements.',
  },
  {
    id: 'I-3',
    title: 'Be clear when context is missing',
    body:
      'If another tool is unavailable or its data is stale, say that directly. The user should always know whether they are seeing a complete answer or a best available answer.',
  },
];

// --- Rust: a Loomweave entity-extraction plugin. Illustrative but faithful to the
// {plugin_id}:{kind}:{qualname} + SEI + content_hash model. Schematic where a
// real trait signature is uncertain. ---
const RUST_SAMPLE = `
// loomweave entity-extraction plugin (example)
// Emits 3-segment LOCATORS; Loomweave mints them to opaque SEIs.
// Locator form:  {plugin_id}:{kind}:{qualname}
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

// Integration rule: treat the returned SEI as opaque, store
// it verbatim, and never mint it yourself. On rename-with-unchanged-body the SEI
// is carried; on a body edit during a rename Loomweave fails closed (new SEI,
// old one orphaned). Test this behavior before relying on it.
`;

// --- Python: a Wardline trust-boundary rule / decorator usage. Real vocabulary:
// external_boundary / trust_boundary / trusted decorators, a PY-WL-1xx rule, the
// 8-state taint lattice. Wardline is deconfliction/policy, NOT a security scanner. ---
const PY_SAMPLE = `
# wardline trust-boundary usage + a PY-WL-1xx rule (example)
# Wardline is a deconfliction / trust-policy analyzer, NOT a security scanner.
# Vocabulary: 3 canonical decorators + an 8-state taint
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
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Weft</Link>
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
        A Weft member is a focused tool that is useful by itself and gets more helpful when paired
        with the rest of the suite. There is no broker and no central runtime: connect through the
        shared interfaces and keep your own tool dependable on its own.
      </p>

      <SectionHeading id="invariants">Integration Basics</SectionHeading>
      <p className="t-body" style={{ maxWidth: 740, marginTop: 0 }}>
        These are the rules that keep Weft integrations predictable for users and agents.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {INTEGRATION_BASICS.map((inv) => (
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
        The full integration checklist is in the{' '}
        <a href={SDK} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          federation SDK
        </a>
        .
      </p>

      <SectionHeading id="samples">Two annotated plugin samples</SectionHeading>
      <p className="t-body" style={{ maxWidth: 740, marginTop: 0 }}>
        These examples show the shape of an integration without pretending to replace each
        project’s own API reference.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 8 }}>
        <CodeSample
          label="Loomweave entity-extraction plugin"
          language="rust"
          code={RUST_SAMPLE}
          caption="Emits code entities that Loomweave can turn into stable identities."
          href={LOOMWEAVE_REPO}
          hrefLabel="foundryside-dev/loomweave"
        />
        <CodeSample
          label="Wardline trust-boundary rule"
          language="python"
          code={PY_SAMPLE}
          caption="Uses Wardline’s trust-boundary decorators and rule vocabulary."
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
        <div className="t-label" style={{ marginBottom: 6 }}>Adding your own tool</div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Start with a useful standalone workflow. Add stable identity for code references, connect
          only to the tools you need, and make missing context visible to the user. The full path is{' '}
          <a href={`${SDK}#4-dropping-in-your-own-member--the-path`} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--accent)' }}>
            the federation SDK
          </a>
          .
        </p>
      </div>
    </div>
  );
}
