/* ============================================================================
   LOOM FEDERATION — hub interactions (progressive enhancement)
   The page is content-complete without JS: every member card and the default
   composition panel render server-side, and all links work. This script only
   layers in interactive behaviour faithful to the loom-hub UI kit:
     · single-open accordion on the member roster (default: clarion)
     · the Solo / Pair / Suite composition-law toggle (default: pair)
   ============================================================================ */
(function () {
  "use strict";

  /* ---- Member roster: single-open accordion --------------------------- */
  var toggles = Array.prototype.slice.call(document.querySelectorAll(".member-toggle"));

  function setOpen(target) {
    toggles.forEach(function (t) {
      t.setAttribute("aria-expanded", String(t === target));
    });
  }

  toggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      // Toggle: clicking the open card closes it; otherwise open it (closing the rest).
      setOpen(isOpen ? null : toggle);
    });
  });

  /* ---- Composition law: Solo / Pair / Suite --------------------------- */
  var MODES = {
    solo: "Each tool has a complete, respectable use-case by itself. Filigree files, works, and closes a bug with Clarion absent or broken.",
    pair: "Combined with any one sibling it creates a meaningful capability — Wardline findings become tracked Filigree work; never a broken fragment.",
    suite: "All together form something richer: the agent understands the code, its trust posture, what it may do, and every unit of work — keyed on one identity."
  };

  var modeBtns = Array.prototype.slice.call(document.querySelectorAll(".mode-btn"));
  var panel = document.getElementById("mode-panel");

  function selectMode(mode) {
    if (!MODES[mode] || !panel) return;
    modeBtns.forEach(function (b) {
      var active = b.getAttribute("data-mode") === mode;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", String(active));
    });
    panel.innerHTML = '<span class="mode-text"></span>';
    panel.firstChild.textContent = MODES[mode];
  }

  modeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectMode(btn.getAttribute("data-mode"));
    });
  });
})();
