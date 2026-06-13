import React from 'react';

/**
 * Table — the Weft data grid. Config-driven: `columns` describe header label,
 * alignment, width, and an optional cell `render`; `rows` are plain objects.
 * Hairline row rules, mono type, an uppercase header, hover highlight, and an
 * optional clickable row. No zebra striping — the brand keeps tables flat.
 *
 * columns: { key, label?, align?, width?, render?(value,row,i) }
 */
export function Table({ columns = [], rows = [], onRowClick, getRowKey, dense = false, empty = 'No rows', style }) {
  const padY = dense ? 7 : 10;

  return (
    <div style={{
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)',
      background: 'var(--surface-raised)',
      ...style,
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead>
          <tr style={{ background: 'var(--surface-overlay)' }}>
            {columns.map((c) => (
              <th
                key={c.key}
                style={{
                  textAlign: c.align || 'left',
                  width: c.width,
                  padding: `${padY}px 14px`,
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border-default)',
                  whiteSpace: 'nowrap',
                }}
              >
                {c.label != null ? c.label : c.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '22px 14px', textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>{empty}</td>
            </tr>
          ) : rows.map((row, ri) => (
            <tr
              key={getRowKey ? getRowKey(row, ri) : ri}
              onClick={onRowClick ? () => onRowClick(row, ri) : undefined}
              style={{
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background var(--dur-fast) var(--ease)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  style={{
                    textAlign: c.align || 'left',
                    padding: `${padY}px 14px`,
                    fontSize: 12.5,
                    color: 'var(--text-secondary)',
                    borderBottom: ri === rows.length - 1 ? 'none' : '1px solid var(--border-default)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c.render ? c.render(row[c.key], row, ri) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
