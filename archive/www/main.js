/* ============================================================================
   WEFT FEDERATION — hub interactions (progressive enhancement)
   The page is content-complete without JS: the member roster is built from
   native <details> elements (every card expands and every repo link works with
   JS disabled), and the default composition panel renders server-side. This
   script only layers in interactive behaviour faithful to the weft-hub UI kit:
     · single-open accordion on the member roster (default: loomweave)
     · the Solo / Pair / Suite composition-law toggle (default: pair),
       with full keyboard support for its ARIA tablist
   ============================================================================ */
(function () {
  "use strict";

  /* ---- Member roster: single-open accordion --------------------------- *
   * Native <details> already expand/collapse with zero JS. Here we only
   * upgrade the set to single-open: opening one card closes the rest.      */
  var cards = Array.prototype.slice.call(document.querySelectorAll("details.member-card"));

  cards.forEach(function (card) {
    card.addEventListener("toggle", function () {
      if (!card.open) return;
      cards.forEach(function (other) {
        if (other !== card) other.open = false;
      });
    });
  });

  /* ---- Composition law: Solo / Pair / Suite --------------------------- */
  var MODES = {
    solo: "Each tool has a complete, respectable use-case by itself. Filigree files, works, and closes a bug with Loomweave absent or broken.",
    pair: "Combined with any one sibling it creates a meaningful capability — Wardline findings become tracked Filigree work; never a broken fragment.",
    suite: "All together form something richer: the agent understands the code, its trust posture, what it may do, and every unit of work — keyed on one identity."
  };

  var modeBtns = Array.prototype.slice.call(document.querySelectorAll(".mode-btn"));
  var panel = document.getElementById("mode-panel");

  function selectMode(mode, focus) {
    if (!MODES[mode] || !panel) return;
    modeBtns.forEach(function (b) {
      var active = b.getAttribute("data-mode") === mode;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", String(active));
      b.setAttribute("tabindex", active ? "0" : "-1");
      if (active && focus) b.focus();
    });
    panel.innerHTML = '<span class="mode-text"></span>';
    panel.firstChild.textContent = MODES[mode];
  }

  modeBtns.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      selectMode(btn.getAttribute("data-mode"));
    });
    // Roving-tabindex keyboard model expected of an ARIA tablist.
    btn.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % modeBtns.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + modeBtns.length) % modeBtns.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = modeBtns.length - 1;
      if (next === null) return;
      e.preventDefault();
      selectMode(modeBtns[next].getAttribute("data-mode"), true);
    });
  });
})();
