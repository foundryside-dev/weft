/* @ds-bundle: {"format":3,"namespace":"WeftDesignSystem_9a241d","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"Dossier","sourcePath":"components/dossier/Dossier.jsx"},{"name":"ChangeFlash","sourcePath":"components/feedback/ChangeFlash.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"IssueCard","sourcePath":"components/issue-card/IssueCard.jsx"},{"name":"Mark","sourcePath":"components/marks/Mark.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"},{"name":"Dropdown","sourcePath":"components/popover/Dropdown.jsx"},{"name":"Tooltip","sourcePath":"components/popover/Tooltip.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"f34ce3f9ea09","components/core/Button.jsx":"4eb6096c88d8","components/core/Tag.jsx":"c1dad8d7966f","components/data/Stat.jsx":"804b0b3317c3","components/data/Table.jsx":"3f64d98511d8","components/dossier/Dossier.jsx":"7524773afba6","components/feedback/ChangeFlash.jsx":"549207037aa2","components/feedback/Toast.jsx":"55b60937c54b","components/forms/Checkbox.jsx":"19161e09d28c","components/forms/Input.jsx":"c5b28f1a1fcf","components/forms/Select.jsx":"7c522965d2f4","components/issue-card/IssueCard.jsx":"b291487618fc","components/marks/Mark.jsx":"cd5a475c111b","components/navigation/Tabs.jsx":"31958d176987","components/overlay/Dialog.jsx":"376f92836f0c","components/popover/Dropdown.jsx":"09b1ad924434","components/popover/Tooltip.jsx":"4064419a129a","ui_kits/filigree-dashboard/Dashboard.jsx":"d7b15d512c18","ui_kits/filigree-dashboard/DetailPanel.jsx":"57db6b962e42","ui_kits/filigree-dashboard/Kanban.jsx":"88053fbcc5b9","ui_kits/filigree-dashboard/Marks.jsx":"b60f925b021b","ui_kits/filigree-dashboard/data.jsx":"948ede498470","ui_kits/weft-cli/CliData.jsx":"d44899fe9133","ui_kits/weft-cli/Terminal.jsx":"89993151e460","ui_kits/weft-hub/Hub.jsx":"883fee10f294","ui_kits/weft-hub/HubData.jsx":"a0df47df0bfa"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WeftDesignSystem_9a241d = window.WeftDesignSystem_9a241d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — a prominent status pill (Open / Active / Done). Filled accent or
 * bordered outline. For small inline metadata chips (type, status, severity)
 * use <Tag> instead.
 */
function Badge({
  children,
  variant = 'solid',
  style,
  ...rest
}) {
  const base = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 'var(--radius)',
    padding: '3px 9px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    lineHeight: 1.3
  };
  const VARIANTS = {
    solid: {
      background: 'var(--accent)',
      color: 'var(--text-on-accent)'
    },
    outline: {
      background: 'var(--surface-overlay)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-strong)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...(VARIANTS[variant] || VARIANTS.solid),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Button — the Weft action control. Mono, 6px radius, no pill shapes, no scale
 * on press. Hover lightens the surface one step (or, for primary, darkens the
 * amber). Focus shows a 2px accent ring. Color is rationed: `danger` and
 * `ready` are the only semantic fills.
 */
function Button({
  children,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const base = {
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    borderRadius: 'var(--radius)',
    border: '1px solid transparent',
    cursor: disabled || loading ? 'default' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    whiteSpace: 'nowrap',
    transition: 'background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease)',
    opacity: loading ? 0.6 : 1,
    pointerEvents: loading ? 'none' : undefined,
    outline: 'none',
    boxShadow: focus ? 'var(--focus-ring)' : undefined
  };
  const SIZES = {
    sm: {
      fontSize: 11,
      padding: '5px 9px',
      minHeight: 28
    },
    md: {
      fontSize: 12,
      padding: '7px 12px',
      minHeight: 34
    },
    lg: {
      fontSize: 13,
      padding: '9px 16px',
      minHeight: 40
    }
  };
  const VARIANTS = {
    primary: {
      rest: {
        background: 'var(--accent)',
        color: 'var(--text-on-accent)',
        borderColor: 'var(--accent)'
      },
      hover: {
        background: 'var(--accent-hover)',
        borderColor: 'var(--accent-hover)'
      }
    },
    secondary: {
      rest: {
        background: 'var(--surface-overlay)',
        color: 'var(--text-secondary)',
        borderColor: 'var(--border-strong)'
      },
      hover: {
        background: 'var(--surface-hover)',
        color: 'var(--text-primary)'
      }
    },
    ghost: {
      rest: {
        background: 'transparent',
        color: 'var(--text-secondary)'
      },
      hover: {
        background: 'var(--surface-overlay)',
        color: 'var(--text-primary)'
      }
    },
    danger: {
      rest: {
        background: 'var(--danger-fill)',
        color: 'var(--danger-fg)',
        borderColor: 'var(--danger-border)'
      },
      hover: {
        background: 'var(--danger-fill-hi)'
      }
    },
    ready: {
      rest: {
        background: 'var(--ready-fill)',
        color: 'var(--ready-fg)',
        borderColor: 'var(--ready-border)'
      },
      hover: {
        background: 'var(--ready-fill)'
      }
    }
  };
  const v = VARIANTS[variant] || VARIANTS.secondary;
  const composed = {
    ...base,
    ...SIZES[size],
    ...v.rest,
    ...(hover && !disabled && !loading ? v.hover : null),
    ...(disabled ? {
      opacity: 0.45,
      cursor: 'default',
      pointerEvents: 'none'
    } : null),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    style: composed,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest), loading ? 'Loading…' : children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — a small inline metadata chip: issue id, type, status word, or
 * severity. `tone` tints it semantically (a soft alpha wash of the hue, or a
 * bordered outline). With no tone it's a neutral overlay chip.
 *
 * `tone` accepts any CSS color, including a token: "var(--thread-filigree)",
 * "var(--sev-critical)", "var(--status-wip)", etc.
 */
function Tag({
  children,
  tone,
  variant = 'soft',
  style,
  ...rest
}) {
  const base = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: variant === 'severity' ? 600 : 400,
    borderRadius: 'var(--radius-sm)',
    padding: '2px 7px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    lineHeight: 1.4,
    border: '1px solid transparent'
  };
  let look;
  if (!tone || variant === 'plain') {
    look = {
      background: 'var(--surface-overlay)',
      color: 'var(--text-secondary)'
    };
  } else if (variant === 'soft') {
    look = {
      background: `color-mix(in srgb, ${tone} 20%, transparent)`,
      color: tone
    };
  } else if (variant === 'severity' || variant === 'outline') {
    look = {
      background: `color-mix(in srgb, ${tone} 18%, transparent)`,
      color: tone,
      borderColor: `color-mix(in srgb, ${tone} 55%, transparent)`
    };
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...look,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
/**
 * Stat — a single metric: big value, uppercase label, optional delta and a
 * tone dot. The footer counters and insight KPIs are built from these. Mono
 * throughout; the value uses the display face when `display` is set.
 *
 * Layout is `block` (stacked, for a KPI grid) or `inline` (label · value on one
 * row, for a dense footer strip).
 */
function Stat({
  label,
  value,
  delta,
  deltaTone,
  tone,
  layout = 'block',
  display = false,
  style
}) {
  const dotColor = tone || null;
  const deltaColor = deltaTone || (typeof delta === 'string' && delta.trim().startsWith('-') ? 'var(--stale)' : 'var(--ready)');
  if (layout === 'inline') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 8,
        fontFamily: 'var(--font-mono)',
        ...style
      }
    }, dotColor && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: dotColor,
        alignSelf: 'center',
        flex: '0 0 auto'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-primary)'
      }
    }, value), delta != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: deltaColor
      }
    }, delta));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, dotColor && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: dotColor,
      flex: '0 0 auto'
    }
  }), label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: display ? 'var(--font-display)' : 'var(--font-mono)',
      fontSize: display ? 34 : 26,
      fontWeight: display ? 700 : 600,
      letterSpacing: display ? '-0.02em' : '0',
      lineHeight: 1,
      color: 'var(--text-primary)'
    }
  }, value), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: deltaColor
    }
  }, delta)));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
/**
 * Table — the Weft data grid. Config-driven: `columns` describe header label,
 * alignment, width, and an optional cell `render`; `rows` are plain objects.
 * Hairline row rules, mono type, an uppercase header, hover highlight, and an
 * optional clickable row. No zebra striping — the brand keeps tables flat.
 *
 * columns: { key, label?, align?, width?, render?(value,row,i) }
 */
function Table({
  columns = [],
  rows = [],
  onRowClick,
  getRowKey,
  dense = false,
  empty = 'No rows',
  style
}) {
  const padY = dense ? 7 : 10;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)',
      background: 'var(--surface-raised)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      tableLayout: 'fixed'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-overlay)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      width: c.width,
      padding: `${padY}px 14px`,
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      borderBottom: '1px solid var(--border-default)',
      whiteSpace: 'nowrap'
    }
  }, c.label != null ? c.label : c.key)))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      padding: '22px 14px',
      textAlign: 'center',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, empty)) : rows.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: getRowKey ? getRowKey(row, ri) : ri,
    onClick: onRowClick ? () => onRowClick(row, ri) : undefined,
    style: {
      cursor: onRowClick ? 'pointer' : 'default',
      transition: 'background var(--dur-fast) var(--ease)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'var(--surface-hover)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: `${padY}px 14px`,
      fontSize: 12.5,
      color: 'var(--text-secondary)',
      borderBottom: ri === rows.length - 1 ? 'none' : '1px solid var(--border-default)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, c.render ? c.render(row[c.key], row, ri) : row[c.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ChangeFlash.jsx
try { (() => {
const {
  useEffect,
  useRef,
  useState
} = React;
/**
 * ChangeFlash — wraps any element and emits the brand's one-shot accent
 * box-shadow pulse whenever `flashKey` changes (e.g. a card's data updated).
 * This is the system's *only* ambient-ish motion besides the terminal cursor:
 * a brief bloom that fades, not a loop. Respects prefers-reduced-motion (the
 * pulse is skipped, the content still updates).
 *
 * Wrap the element whose data changes; bump `flashKey` to whatever value should
 * trigger the pulse (a version number, updatedAt, JSON.stringify(row), …).
 */
function ChangeFlash({
  flashKey,
  color = 'var(--accent)',
  children,
  style
}) {
  const [on, setOn] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    setOn(true);
    const t = setTimeout(() => setOn(false), 600);
    return () => clearTimeout(t);
  }, [flashKey]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius)',
      boxShadow: on ? `0 0 0 1px ${color}, 0 0 12px -1px ${color}` : '0 0 0 0 transparent',
      transition: 'box-shadow 0.6s var(--ease)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ChangeFlash });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ChangeFlash.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/**
 * Toast — a small, transient notification. Surface-raised card with a 3px
 * left rule in the tone color, a soft popover shadow, mono text, and an
 * optional × dismiss. Tone is semantic (ready / stale / accent / a thread).
 *
 * Stack several in a fixed corner container; this component is just the slip.
 */
function Toast({
  tone = 'var(--accent)',
  title,
  children,
  icon,
  onDismiss,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      minWidth: 240,
      maxWidth: 380,
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)',
      borderLeft: `3px solid ${tone}`,
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow-pop)',
      padding: '11px 13px',
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: tone,
      fontSize: 13,
      lineHeight: 1.4,
      flex: '0 0 auto'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-primary)',
      marginBottom: children ? 3 : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-secondary)',
      lineHeight: 1.5
    }
  }, children)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      fontSize: 15,
      lineHeight: 1,
      padding: 0,
      flex: '0 0 auto'
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — a controlled box + label. Checked state fills with the amber
 * accent and shows an ink check. Click anywhere on the label toggles it.
 */
function Checkbox({
  checked = false,
  onChange,
  children,
  disabled = false,
  style,
  ...rest
}) {
  const box = {
    width: 15,
    height: 15,
    borderRadius: 3,
    border: '1px solid',
    borderColor: checked ? 'var(--accent)' : 'var(--border-strong)',
    background: checked ? 'var(--accent)' : 'var(--surface-overlay)',
    color: 'var(--text-on-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    flex: '0 0 auto',
    transition: 'background var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease)'
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: box,
    "aria-hidden": "true"
  }, checked ? '✓' : ''), children);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Input — a single-line text field. Mono, overlay fill, strong-border, 6px
 * radius. Focus draws the accent border + a 1px accent ring. Optional uppercase
 * label sits above.
 */
function Input({
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
    ...style
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 7
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    readOnly: readOnly,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — a styled native <select>. Matches the Input field (overlay fill,
 * strong border, 6px radius) with a unicode ▾ caret. Optional uppercase label.
 */
function Select({
  label,
  value,
  defaultValue,
  onChange,
  children,
  disabled = false,
  width = 200,
  style,
  ...rest
}) {
  const field = {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    background: 'var(--surface-overlay)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)',
    borderRadius: 'var(--radius)',
    padding: '8px 28px 8px 11px',
    width,
    maxWidth: '100%',
    boxSizing: 'border-box',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    outline: 'none',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...style
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 7
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-block',
      width
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    style: field
  }, rest), children), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-muted)',
      fontSize: 11,
      pointerEvents: 'none'
    },
    "aria-hidden": "true"
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/issue-card/IssueCard.jsx
try { (() => {
const {
  useState
} = React;
/**
 * IssueCard — the canonical Filigree kanban card, faithful to the real
 * dashboard's renderCard. A type-colored 4px left rule (or a semantic
 * ready/aging rule with a soft fiber glow), the type emoji, a priority marker
 * (P0/P1 number, else a dot), the title, then a metadata row of id / type /
 * status tag / blockers / impact / assignee / age.
 *
 * Color is rationed and semantic throughout — the rule is the only "fill".
 */
const TYPE_ICONS = {
  bug: '🐛',
  feature: '✨',
  task: '📋',
  epic: '📊',
  milestone: '🎯'
};
const TYPE_COLORS = {
  bug: '#E25C49',
  feature: '#B79BF2',
  task: '#56B7E2',
  epic: '#E9B04A',
  milestone: '#5FB98E'
};
const CATEGORY_COLORS = {
  open: '#8A7A64',
  wip: '#56B7E2',
  done: '#897C66'
};
const PRIORITY_COLORS = {
  0: '#E25C49',
  1: '#EC8A3C',
  2: '#8A7A64',
  3: '#C9BBA0',
  4: '#C9BBA0'
};
function AgeLabel({
  issue
}) {
  if (issue.cat !== 'wip' || !issue.ageH) return null;
  const h = issue.ageH;
  if (h < 1) return /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, Math.round(h * 60), "m");
  if (h < 24) return /*#__PURE__*/React.createElement("span", {
    style: {
      color: h > 4 ? 'var(--aging)' : 'var(--text-muted)'
    }
  }, h, "h");
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--stale)'
    }
  }, Math.floor(h / 24), "d");
}
function IssueCard({
  issue,
  onOpen,
  style
}) {
  const [hover, setHover] = useState(false);
  const typeColor = TYPE_COLORS[issue.type] || '#8A7A64';
  const prioColor = PRIORITY_COLORS[issue.priority];
  const catColor = CATEGORY_COLORS[issue.cat] || '#8A7A64';
  const blockedBy = issue.blocked_by || issue.blockedBy || [];
  const openBlocks = blockedBy.length;
  const ready = issue.ready && issue.cat === 'open';
  const agingBorder = issue.cat === 'wip' && issue.ageH > 24 ? 'var(--stale)' : issue.cat === 'wip' && issue.ageH > 4 ? 'var(--aging)' : null;
  const border = '1px solid var(--border-default)';
  const leftBorder = ready ? '4px solid var(--ready)' : agingBorder ? `4px solid ${agingBorder}` : border;
  const glow = ready ? '-2px 0 9px -4px var(--ready)' : agingBorder ? `-2px 0 9px -4px ${agingBorder}` : 'none';
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onOpen && onOpen(issue),
    tabIndex: 0,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      background: hover ? 'var(--surface-hover)' : 'var(--surface-raised)',
      border,
      borderLeft: leftBorder,
      borderRadius: 'var(--radius)',
      padding: '10px 11px 10px 16px',
      cursor: onOpen ? 'pointer' : 'default',
      boxShadow: glow,
      transition: 'box-shadow .15s, border-color .15s',
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, !ready && !agingBorder && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      borderRadius: 'var(--radius) 0 0 var(--radius)',
      background: typeColor,
      boxShadow: `0 0 7px -1px ${typeColor}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, TYPE_ICONS[issue.type]), issue.priority <= 1 ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: prioColor
    }
  }, "P", issue.priority) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: prioColor,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-primary)',
      fontSize: 12.5,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, issue.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 11,
      color: 'var(--text-muted)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--surface-overlay)',
      color: 'var(--text-primary)',
      padding: '1px 6px',
      borderRadius: 'var(--radius-sm)'
    }
  }, issue.id), /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--surface-overlay)',
      color: 'var(--text-secondary)',
      padding: '1px 6px',
      borderRadius: 'var(--radius-sm)'
    }
  }, issue.type), /*#__PURE__*/React.createElement("span", {
    style: {
      background: `color-mix(in srgb, ${catColor} 20%, transparent)`,
      color: catColor,
      padding: '1px 6px',
      borderRadius: 'var(--radius-sm)'
    }
  }, issue.status), openBlocks > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--stale)'
    }
  }, "\uD83D\uDD17 blocked by ", openBlocks), issue.impact > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--aging)'
    }
  }, "\u26A1", issue.impact), issue.assignee && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "\uD83D\uDC64 ", issue.assignee), /*#__PURE__*/React.createElement(AgeLabel, {
    issue: issue
  })));
}
Object.assign(__ds_scope, { IssueCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/issue-card/IssueCard.jsx", error: String((e && e.message) || e) }); }

// components/marks/Mark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Mark — the Weft federation glyph set. Stroke-based, drawn on a 0 0 32 grid,
 * and rendered in `currentColor` so each mark picks up its thread color from
 * the surrounding text/element. Always inline (this component does); loading a
 * mark via <img> will not inherit color.
 *
 * Names: foundryside (parent org) · weft (the woven umbrella) · loomweave ·
 * filigree · wardline · legis · charter · shuttle (roadmap) · lacuna (the
 * adjacent demo specimen — off-palette, dashed).
 */
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
  className,
  title,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    className: className,
    style: style,
    role: "img",
    "aria-label": title || name
  }, rest), MARK_PATHS[name] || null);
}
Object.assign(__ds_scope, { Mark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marks/Mark.jsx", error: String((e && e.message) || e) }); }

// components/dossier/Dossier.jsx
try { (() => {
/**
 * Dossier — the SEI-keyed entity view: one durable code entity, with a row of
 * facts woven from each federation tool (Loomweave structure, Wardline taint,
 * Legis governance, Filigree work, Charter obligations). Each fact carries its
 * member's Mark and thread color on the left.
 *
 * This is the brand's central "composition" artifact — five tools enriching one
 * identity, never load-bearing.
 */
const THREADS = {
  loomweave: 'var(--thread-loomweave)',
  filigree: 'var(--thread-filigree)',
  wardline: 'var(--thread-wardline)',
  legis: 'var(--thread-legis)',
  charter: 'var(--thread-charter)',
  shuttle: 'var(--thread-shuttle)'
};
const LABELS = {
  loomweave: 'Loomweave',
  filigree: 'Filigree',
  wardline: 'Wardline',
  legis: 'Legis',
  charter: 'Charter',
  shuttle: 'Shuttle'
};
function Dossier({
  entity,
  sei,
  fresh = true,
  facts = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '13px 16px',
      borderBottom: '1px solid var(--border-default)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-primary)',
      fontWeight: 600
    }
  }, entity), sei && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: 'var(--text-muted)',
      background: 'var(--surface-overlay)',
      padding: '2px 7px',
      borderRadius: 'var(--radius-sm)'
    }
  }, sei), fresh && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 10,
      color: 'var(--ready)'
    }
  }, "\u25CF fresh")), facts.map((f, idx) => {
    const thread = THREADS[f.member] || 'var(--accent)';
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: '10px 16px',
        borderBottom: idx === facts.length - 1 ? 'none' : '1px solid var(--border-default)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Mark, {
      name: f.member,
      size: 18,
      style: {
        color: thread,
        flex: '0 0 auto'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: thread,
        width: 78,
        flex: '0 0 auto'
      }
    }, LABELS[f.member] || f.member), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-secondary)',
        flex: 1
      }
    }, f.value));
  }));
}
Object.assign(__ds_scope, { Dossier });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/dossier/Dossier.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Tabs — the Weft view switcher. Two variants:
 *  - `underline` : text tabs with a 2px accent (or thread) underline on the
 *                  active one, sitting on a hairline rule. The brand's member /
 *                  section tab treatment.
 *  - `pill`      : the dashboard nav style — active tab gets an overlay fill.
 *
 * `accent` recolors the active state (pass a thread var to tab by member).
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  variant = 'underline',
  accent = 'var(--accent)',
  style
}) {
  const items = tabs.map(t => typeof t === 'string' ? {
    id: t,
    label: t
  } : t);
  const isUnderline = variant === 'underline';
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: isUnderline ? 18 : 4,
      borderBottom: isUnderline ? '1px solid var(--border-default)' : 'none',
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, items.map(t => {
    const active = t.id === value;
    const base = {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: active ? 600 : 500,
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      // Only the text color fades. The underline/pill-fill (binary active
      // state) snaps instantly — a border-color/background transition can
      // stick at its from-value in throttled/headless contexts and show the
      // wrong tab as active.
      transition: 'color var(--dur-fast) var(--ease)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    };
    const look = isUnderline ? {
      padding: '9px 1px',
      color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
      borderBottom: `2px solid ${active ? accent : 'transparent'}`,
      marginBottom: -1
    } : {
      padding: '6px 12px',
      borderRadius: 'var(--radius)',
      color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
      background: active ? 'var(--surface-overlay)' : 'transparent'
    };
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(t.id),
      style: {
        ...base,
        ...look
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.color = 'var(--text-primary)';
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.color = 'var(--text-secondary)';
      }
    }, t.icon, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--text-muted)',
        fontWeight: 500
      }
    }, t.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
const {
  useEffect
} = React;
/**
 * Dialog — the Weft overlay. Two variants:
 *  - `modal`  : centered card (8px radius, shadow-modal) over a dim backdrop.
 *  - `panel`  : right-edge slide-in (the dashboard's detail panel), full height.
 *
 * Both stay mounted while closed so the open/close transition runs (0.2s ease,
 * the brand's panel/modal duration). No backdrop blur — the brand has no glass;
 * the backdrop is a flat dim. Esc and backdrop-click both close.
 */
function Dialog({
  open = false,
  onClose,
  title,
  children,
  footer,
  variant = 'modal',
  width,
  style
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  const isPanel = variant === 'panel';
  const backdrop = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(8, 6, 3, 0.62)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    transition: 'opacity var(--dur) var(--ease)',
    zIndex: 100
  };
  const surface = isPanel ? {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width: width || 460,
    maxWidth: '100%',
    background: 'var(--surface-raised)',
    borderLeft: '1px solid var(--border-default)',
    boxShadow: open ? 'var(--shadow-modal)' : 'none',
    transform: open ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform var(--dur) var(--ease)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 101,
    fontFamily: 'var(--font-mono)'
  } : {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: width || 440,
    maxWidth: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 32px)',
    background: 'var(--surface-raised)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-modal)',
    transform: open ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -48%) scale(0.98)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    transition: 'opacity var(--dur) var(--ease), transform var(--dur) var(--ease)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 101,
    fontFamily: 'var(--font-mono)'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: backdrop,
    onClick: onClose,
    "aria-hidden": !open
  }), /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-hidden": !open,
    style: {
      ...surface,
      ...style
    }
  }, (title || onClose) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 16px',
      borderBottom: '1px solid var(--border-default)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-primary)',
      flex: 1
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      fontSize: 18,
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      overflowY: 'auto',
      flex: 1,
      fontSize: 13,
      color: 'var(--text-secondary)',
      lineHeight: 1.6
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end',
      padding: '12px 16px',
      borderTop: '1px solid var(--border-default)',
      flex: '0 0 auto'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/popover/Dropdown.jsx
try { (() => {
const {
  useState,
  useRef,
  useEffect
} = React;
/**
 * Dropdown — a trigger button + a popover menu. Surface-raised list, hairline
 * border, 8px radius, soft popover shadow. Items hover to surface-hover; a
 * `danger` item reads in warm coral. Closes on select, outside-click, or Esc.
 *
 * Items: { label, icon?, onSelect?, danger?, disabled? } or { divider: true }.
 */
function Dropdown({
  trigger,
  items = [],
  align = 'left',
  width = 200,
  caret = true,
  style
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    "aria-haspopup": "menu",
    "aria-expanded": open,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '7px 12px',
      minHeight: 34,
      borderRadius: 'var(--radius)',
      background: open ? 'var(--surface-hover)' : 'var(--surface-overlay)',
      color: open ? 'var(--text-primary)' : 'var(--text-secondary)',
      border: '1px solid var(--border-strong)',
      cursor: 'pointer',
      transition: 'background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)'
    }
  }, trigger, caret && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--text-muted)'
    }
  }, "\u25BE")), open && /*#__PURE__*/React.createElement("div", {
    role: "menu",
    style: {
      position: 'absolute',
      top: '100%',
      marginTop: 6,
      [align === 'right' ? 'right' : 'left']: 0,
      minWidth: width,
      zIndex: 80,
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-pop)',
      padding: 5,
      fontFamily: 'var(--font-mono)',
      // Visibility is NOT gated on a transition (which can stick at the
      // from-frame in throttled/headless contexts) — the menu is rendered
      // only while open and is fully visible. A transform-only entrance
      // adds polish but never hides content even at its first frame.
      animation: 'ddMenuIn var(--dur-fast) var(--ease)',
      ...style
    }
  }, items.map((it, idx) => {
    if (it.divider) {
      return /*#__PURE__*/React.createElement("div", {
        key: idx,
        style: {
          height: 1,
          background: 'var(--border-default)',
          margin: '5px 0'
        }
      });
    }
    const color = it.danger ? 'var(--danger-fg)' : 'var(--text-secondary)';
    return /*#__PURE__*/React.createElement("button", {
      key: idx,
      role: "menuitem",
      disabled: it.disabled,
      onClick: () => {
        if (it.onSelect) it.onSelect();
        setOpen(false);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        width: '100%',
        textAlign: 'left',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        padding: '7px 9px',
        borderRadius: 'var(--radius-sm)',
        background: 'transparent',
        border: 'none',
        color: it.disabled ? 'var(--text-muted)' : color,
        cursor: it.disabled ? 'default' : 'pointer',
        opacity: it.disabled ? 0.55 : 1,
        transition: 'background var(--dur-fast) var(--ease)'
      },
      onMouseEnter: e => {
        if (!it.disabled) e.currentTarget.style.background = 'var(--surface-hover)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = 'transparent';
      }
    }, it.icon != null && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: '0 0 auto',
        width: 16,
        textAlign: 'center'
      }
    }, it.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label));
  })));
}
Object.assign(__ds_scope, { Dropdown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/popover/Dropdown.jsx", error: String((e && e.message) || e) }); }

// components/popover/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Tooltip — a small hover/focus popover. Surface-overlay slip, hairline border,
 * soft popover shadow, mono 11px. No glass/blur. Appears on hover and keyboard
 * focus; positioned around the trigger by `placement`.
 */
function Tooltip({
  content,
  children,
  placement = 'top',
  style
}) {
  const [show, setShow] = useState(false);
  const POS = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 6
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 6
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 6
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 6
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 60,
      background: 'var(--surface-overlay)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-sm)',
      padding: '4px 8px',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-pop)',
      pointerEvents: 'none',
      opacity: show ? 1 : 0,
      transition: 'opacity var(--dur-fast) var(--ease)',
      ...POS[placement],
      ...style
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/popover/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filigree-dashboard/Dashboard.jsx
try { (() => {
// Dashboard.jsx — Filigree dashboard shell: nav, filter bar, views, footer.
// This kit CONSUMES the Weft component library (Tabs/IssueCard/Dialog/Toast)
// from the compiled bundle rather than re-implementing chrome.
const {
  useState,
  useMemo
} = React;
const {
  Tabs,
  Toast
} = window.WeftDesignSystem_9a241d;
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
    color: "var(--text-on-accent)",
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
  const [toast, setToast] = useState(null);
  const notify = t => {
    setToast(t);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 3400);
  };
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
    onClick: () => notify({
      tone: "var(--accent)",
      icon: "✨",
      title: "Issue created",
      body: "fg-new1 · open · via dashboard"
    }),
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      background: "var(--accent)",
      color: "var(--text-on-accent)",
      padding: "4px 9px",
      borderRadius: "var(--radius)",
      border: "none",
      cursor: "pointer"
    }
  }, "+ New"), /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    value: view,
    onChange: setView,
    tabs: [{
      id: "kanban",
      label: "Kanban"
    }, {
      id: "ready",
      label: "Ready"
    }, {
      id: "graph",
      label: "Graph"
    }, {
      id: "insights",
      label: "Insights"
    }, {
      id: "files",
      label: "Files"
    }]
  }))), /*#__PURE__*/React.createElement("div", {
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
    onClose: () => setSel(null),
    onNotify: notify
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
  }, "filigree v", PROJECT.version, " \xB7 ethereal")), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      right: 16,
      bottom: 16,
      zIndex: 200
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: toast.tone,
    icon: toast.icon,
    title: toast.title,
    onDismiss: () => setToast(null)
  }, toast.body)));
}

// Self-mount only on this kit's own page. When this file is pulled into the
// design-system bundle, #root either doesn't exist yet (bundle loads in <head>)
// or already belongs to a consumer — so stay inert and never clobber it.
const __dashRoot = document.getElementById("root");
if (__dashRoot && __dashRoot.childElementCount === 0) {
  ReactDOM.createRoot(__dashRoot).render(/*#__PURE__*/React.createElement(App, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filigree-dashboard/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filigree-dashboard/DetailPanel.jsx
try { (() => {
// DetailPanel.jsx — issue detail hosted in the library <Dialog variant="panel">.
// The panel chrome (slide-in, backdrop, header, footer) is the library's; this
// file owns only the field content. Actions fire a library <Toast> via onNotify.
const {
  Dialog,
  Tag,
  Button
} = window.WeftDesignSystem_9a241d;
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
  onClose,
  onNotify
}) {
  const i = issue || {};
  const catColor = CATEGORY_COLORS[i.cat] || "#8A7A64";
  const prioColor = PRIORITY_COLORS[i.priority];
  const title = issue ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9
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
  }, i.type)) : null;
  const footer = issue ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNotify && onNotify({
      tone: "var(--text-secondary)",
      icon: "👤",
      title: "Claimed",
      body: i.id + " · assigned to you"
    })
  }, "Claim"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNotify && onNotify({
      tone: "var(--ready)",
      icon: "▸",
      title: "State advanced",
      body: i.id + " → next · context.md regenerated"
    })
  }, "Advance state")) : null;
  return /*#__PURE__*/React.createElement(Dialog, {
    variant: "panel",
    open: !!issue,
    onClose: onClose,
    title: title,
    footer: footer,
    width: 460
  }, issue && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: "var(--text-primary)",
      margin: "0 0 16px",
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
  }, "Status"), /*#__PURE__*/React.createElement(Tag, {
    tone: catColor
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
  }, i.status)), /*#__PURE__*/React.createElement("div", null, "\xB7 context.md regenerated")))));
}
Object.assign(window, {
  DetailPanel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filigree-dashboard/DetailPanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filigree-dashboard/Kanban.jsx
try { (() => {
// Kanban.jsx — the 3-column board. Cards are the library <IssueCard>; the board
// only owns column layout + bucketing now.
const {
  useState: useStateK
} = React;
const {
  IssueCard
} = window.WeftDesignSystem_9a241d;
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
      // fiber-glow: the loom signature — the strand blooms softly off the left edge
      boxShadow: ready ? "-2px 0 9px -4px var(--ready)" : agingBorder ? `-2px 0 9px -4px ${agingBorder}` : "none",
      // NB: do NOT transition `background` here — it's a theme var (--surface-raised);
      // Chromium traps the old computed fill when the theme flips, leaving the card dark.
      transition: "box-shadow .15s, border-color .15s"
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
      background: typeColor,
      boxShadow: `0 0 7px -1px ${typeColor}`
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
  }, items.length ? items.map(i => /*#__PURE__*/React.createElement(IssueCard, {
    key: i.id,
    issue: i,
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
      overflowX: "auto",
      backgroundImage: "var(--weave-warp)"
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
// Loom palette — warmed to match colors_and_type.css (hex, not var(), because
// the cards build alpha tints by string-concat: catColor + "33").
const TYPE_COLORS = {
  bug: "#E25C49",
  feature: "#B79BF2",
  task: "#56B7E2",
  epic: "#E9B04A",
  milestone: "#5FB98E"
};
const CATEGORY_COLORS = {
  open: "#8A7A64",
  wip: "#56B7E2",
  done: "#897C66"
};
const PRIORITY_COLORS = {
  0: "#E25C49",
  1: "#EC8A3C",
  2: "#8A7A64",
  3: "#C9BBA0",
  4: "#C9BBA0"
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

// ui_kits/weft-cli/CliData.jsx
try { (() => {
// CliData.jsx — the CLI kit's glyphs and the session tab control now come from
// the Weft component library (the bundle). Mark and Tabs are aliased onto
// window for Terminal.jsx to use.
const {
  Mark,
  Tabs
} = window.WeftDesignSystem_9a241d;
Object.assign(window, {
  Mark,
  Tabs
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/weft-cli/CliData.jsx", error: String((e && e.message) || e) }); }

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
      background: "#0C0A07"
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
      padding: "7px 12px 0",
      background: "var(--surface-raised)"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "underline",
    value: tab,
    onChange: setTab,
    accent: `var(--thread-${S.member})`,
    tabs: order.map(t => ({
      id: t,
      label: SESSIONS[t].label,
      icon: /*#__PURE__*/React.createElement(Mark, {
        name: SESSIONS[t].member,
        size: 13,
        style: thread(SESSIONS[t].member)
      })
    }))
  })), /*#__PURE__*/React.createElement("div", {
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
// Self-mount only on this kit's own page (see Dashboard.jsx for rationale).
const __cliRoot = document.getElementById("root");
if (__cliRoot && __cliRoot.childElementCount === 0) {
  ReactDOM.createRoot(__cliRoot).render(/*#__PURE__*/React.createElement(App, null));
}
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
  }, /*#__PURE__*/React.createElement(Chip, null, "4 live core members"), /*#__PURE__*/React.createElement(Chip, {
    dim: true
  }, "Charter \u2014 planned integration"), /*#__PURE__*/React.createElement(Chip, null, "local-first \xB7 no cloud"), /*#__PURE__*/React.createElement(Chip, null, "no runtime \xB7 no broker \xB7 no store"), /*#__PURE__*/React.createElement(Chip, {
    dim: true
  }, "Shuttle \u2014 roadmap")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 44,
      marginTop: 30,
      paddingTop: 26,
      borderTop: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Live core members",
    value: 4,
    tone: "var(--ready)",
    display: true
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Core pairings",
    value: 6,
    tone: "var(--accent)",
    display: true
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Runtime / brokers",
    value: 0,
    tone: "var(--text-muted)",
    display: true
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "On the roadmap",
    value: 1,
    tone: "var(--thread-shuttle)",
    display: true
  })));
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
      transition: "transform .15s, box-shadow .15s"
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
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    value: mode,
    onChange: setMode,
    tabs: Object.keys(MODES).map(k => ({
      id: k,
      label: MODES[k].label
    }))
  })), /*#__PURE__*/React.createElement("div", {
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

// Self-mount only on this kit's own page (see Dashboard.jsx for rationale).
const __hubRoot = document.getElementById("root");
if (__hubRoot && __hubRoot.childElementCount === 0) {
  ReactDOM.createRoot(__hubRoot).render(/*#__PURE__*/React.createElement(App, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/weft-hub/Hub.jsx", error: String((e && e.message) || e) }); }

// ui_kits/weft-hub/HubData.jsx
try { (() => {
// HubData.jsx — federation roster data for the hub kit. The glyph set and all
// shared primitives now come from the Weft component library (the bundle):
// Mark, Tabs, and Stat are aliased onto window for the page scripts to use.
const {
  Mark,
  Tabs,
  Stat
} = window.WeftDesignSystem_9a241d;

// Federation roster — single source for the hub.
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
  Tabs,
  Stat,
  MEMBERS,
  SHUTTLE
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/weft-hub/HubData.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Dossier = __ds_scope.Dossier;

__ds_ns.ChangeFlash = __ds_scope.ChangeFlash;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.IssueCard = __ds_scope.IssueCard;

__ds_ns.Mark = __ds_scope.Mark;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Dropdown = __ds_scope.Dropdown;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
