import React from 'react';

const CSS = `
.wf-btn{
  --_bg:var(--indigo-600); --_fg:var(--text-on-accent); --_bd:transparent; --_bgh:var(--indigo-700);
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  font-family:var(--font-sans); font-weight:var(--fw-semibold); font-size:var(--text-sm);
  line-height:1; white-space:nowrap; cursor:pointer; user-select:none;
  border:1px solid var(--_bd); background:var(--_bg); color:var(--_fg);
  border-radius:var(--radius-md); padding:0 16px; height:36px;
  transition:background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.wf-btn:hover{ background:var(--_bgh); }
.wf-btn:active{ transform:translateY(1px); }
.wf-btn:focus-visible{ outline:none; box-shadow:var(--ring); }
.wf-btn[disabled]{ cursor:not-allowed; opacity:.5; }
.wf-btn--secondary{ --_bg:var(--surface-card); --_fg:var(--text-body); --_bd:var(--border-strong); --_bgh:var(--linen-200); }
.wf-btn--ghost{ --_bg:transparent; --_fg:var(--text-body); --_bd:transparent; --_bgh:rgba(70,65,52,.07); }
.wf-btn--danger{ --_bg:var(--madder-600); --_fg:#fff; --_bd:transparent; --_bgh:var(--madder-700); }
.wf-btn--sm{ height:28px; padding:0 12px; font-size:var(--text-xs); gap:6px; border-radius:var(--radius-sm); }
.wf-btn--lg{ height:44px; padding:0 22px; font-size:var(--text-base); }
.wf-btn--block{ width:100%; }
.wf-btn--icon{ padding:0; width:36px; }
.wf-btn--icon.wf-btn--sm{ width:28px; }
.wf-btn--icon.wf-btn--lg{ width:44px; }
`;

function useStyle(id, css) {
  React.useEffect(() => {
    if (document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id; el.textContent = css; document.head.appendChild(el);
  }, [id, css]);
}

/**
 * Button — the primary action control.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  iconOnly = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  className = '',
  children,
  ...rest
}) {
  useStyle('wf-btn-css', CSS);
  const Tag = as;
  const cls = [
    'wf-btn',
    variant !== 'primary' && `wf-btn--${variant}`,
    size !== 'md' && `wf-btn--${size}`,
    block && 'wf-btn--block',
    iconOnly && 'wf-btn--icon',
    className,
  ].filter(Boolean).join(' ');
  return (
    <Tag className={cls} {...rest}>
      {iconLeft}
      {!iconOnly && children}
      {iconOnly && children}
      {iconRight}
    </Tag>
  );
}
