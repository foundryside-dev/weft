import React, { useState } from 'react';
import { Highlight } from 'prism-react-renderer';

// CodeSample — a syntax-highlighted, copy-able static code block. Uses
// prism-react-renderer (the lean runtime-highlight choice; flagged in README).
// Theme is a token-driven custom theme so the sample sits in the Loom palette
// rather than importing a foreign Prism theme. No color values authored beyond
// mapping Prism token kinds onto the existing semantic/thread tokens.
const loomTheme = {
  plain: { color: 'var(--text-primary)', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--text-muted)', fontStyle: 'italic' } },
    { types: ['punctuation'], style: { color: 'var(--text-secondary)' } },
    { types: ['keyword', 'tag', 'operator', 'boolean'], style: { color: 'var(--thread-legis)' } },
    { types: ['function', 'class-name', 'attr-name'], style: { color: 'var(--thread-filigree)' } },
    { types: ['string', 'char', 'attr-value', 'regex'], style: { color: 'var(--thread-loomweave)' } },
    { types: ['number', 'constant', 'symbol'], style: { color: 'var(--accent)' } },
    { types: ['builtin', 'namespace', 'macro'], style: { color: 'var(--thread-wardline)' } },
    { types: ['decorator', 'annotation'], style: { color: 'var(--thread-wardline)' } },
    { types: ['variable', 'property'], style: { color: 'var(--text-primary)' } },
  ],
};

export function CodeSample({ code, language, label, caption, href, hrefLabel }) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.replace(/^\n+|\n+$/g, '');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard may be unavailable (insecure context); fail quietly.
    }
  };

  return (
    <figure
      style={{
        margin: 0,
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
    >
      <figcaption
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '9px 14px',
          borderBottom: '1px solid var(--border-default)',
          background: 'var(--surface-overlay)',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{language}</span>
        <span style={{ fontSize: 11, color: 'var(--aging)' }}>illustrative — see the contract</span>
        <button type="button" className="copy-btn" style={{ marginLeft: 'auto' }} onClick={copy} aria-label="Copy code to clipboard">
          {copied ? 'copied ✓' : 'copy'}
        </button>
      </figcaption>
      <Highlight code={trimmed} language={language} theme={loomTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              margin: 0,
              padding: '16px 18px',
              overflowX: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: 12.5,
              lineHeight: 1.65,
              background: 'var(--surface-code, var(--surface-base))',
            }}
            tabIndex={0}
          >
            {tokens.map((line, i) => {
              const { key, ...lineProps } = getLineProps({ line });
              return (
                <div key={i} {...lineProps}>
                  <span style={{ display: 'inline-block', width: 28, color: 'var(--text-muted)', userSelect: 'none' }}>{i + 1}</span>
                  {line.map((token, j) => {
                    const { key: tk, ...tokenProps } = getTokenProps({ token });
                    return <span key={j} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
      {(caption || href) && (
        <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border-default)', fontSize: 11.5, color: 'var(--text-muted)' }}>
          {caption}{' '}
          {href && (
            <a href={href} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
              {hrefLabel || 'see the contract'}
            </a>
          )}
        </div>
      )}
    </figure>
  );
}
