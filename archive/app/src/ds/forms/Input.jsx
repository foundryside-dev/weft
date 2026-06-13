import React, { useState } from 'react';

/**
 * Input — a single-line text field. Mono, overlay fill, strong-border, 6px
 * radius. Focus draws the accent border + a 1px accent ring. Optional uppercase
 * label sits above.
 */
export function Input({
  label,
  value,
  defaultValue,
  placeholder,
  type = 'text',
  readOnly = false,
  disabled = false,
  onChange,
  width = 260,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const field = {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    background: 'var(--surface-overlay)',
    color: 'var(--text-primary)',
    border: '1px solid',
    borderColor: focus ? 'var(--accent)' : 'var(--border-strong)',
    borderRadius: 'var(--radius)',
    padding: '8px 11px',
    width,
    maxWidth: '100%',
    boxSizing: 'border-box',
    boxShadow: focus ? '0 0 0 1px var(--accent)' : 'none',
    outline: 'none',
    opacity: disabled ? 0.5 : 1,
    transition: 'border-color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease)',
    ...style,
  };
  return (
    <label style={{ display: 'block' }}>
      {label && (
        <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 7 }}>
          {label}
        </div>
      )}
      <input
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={field}
        {...rest}
      />
    </label>
  );
}
