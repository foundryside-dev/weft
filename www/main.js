/* ============================================================
   Loom front-door — progressive enhancement only.
   The page is fully usable with this file absent:
   install commands are real DOM text, nav is anchor links,
   theme follows the system preference.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Theme toggle (persisted) ---------- */
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = current === 'dark' || (!current && systemDark);
      var next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    });
  }

  /* ---------- Close mobile nav popover after tapping a link ----------
     popover="auto" light-dismisses on outside-click / Esc, but an in-page
     anchor click inside the popover is not an outside-click, so it would
     otherwise stay open over the section you jumped to. JS-off: the button
     still opens/closes and the links still navigate. */
  var mnav = document.getElementById('mobile-nav');
  if (mnav) {
    mnav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (typeof mnav.hidePopover === 'function') {
          try { mnav.hidePopover(); } catch (e) { /* not open */ }
        }
      });
    });
  }

  /* ---------- Copy-to-clipboard on install code blocks ---------- */
  function flash(button, ok) {
    var label = button.querySelector('.code-block__copy-text');
    var original = label ? label.textContent : '';
    if (label) label.textContent = ok ? 'Copied!' : 'Press ⌘C';
    button.classList.add('is-copied');
    setTimeout(function () {
      if (label) label.textContent = original;
      button.classList.remove('is-copied');
    }, 2000);
  }

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  document.querySelectorAll('.code-block__copy').forEach(function (button) {
    button.addEventListener('click', function () {
      var block = button.closest('.code-block');
      var codeEl = block && block.querySelector('code');
      if (!codeEl) return;
      var text = codeEl.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { flash(button, true); },
          function () { flash(button, legacyCopy(text)); }
        );
      } else {
        flash(button, legacyCopy(text));
      }
    });
  });
})();
