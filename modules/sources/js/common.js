/* Shared helpers for every page. Classic script (no modules) so the site
   runs by simply opening index.html — no local server required. */
(function () {
  "use strict";

  var SOURCE_COLORS = {
    statute:    { accent: "#7c2d3a", tint: "#efe0df" },
    regulation: { accent: "#2f6d56", tint: "#dde9e2" },
    case:       { accent: "#28406b", tint: "#dde2ed" }
  };

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null) return;
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k === "text") node.textContent = v;
      else if (k.slice(0, 2) === "on" && typeof v === "function") node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function sourceColor(id) { return SOURCE_COLORS[id] || { accent: "#3a372f", tint: "#e8e0cd" }; }
  function applyTheme(node, id) {
    var c = sourceColor(id);
    node.style.setProperty("--accent", c.accent);
    node.style.setProperty("--accent-tint", c.tint);
  }

  function navItem(id) {
    return (window.HOME.nav || []).filter(function (n) { return n.id === id; })[0];
  }

  /* ---- accessible dropdown ---- */
  var openMenus = [];
  function buildDropdown(label, itemIds, activeId, extraClass) {
    var inSection = itemIds.indexOf(activeId) !== -1;
    var listId = "menu-" + label.toLowerCase();
    var btn = el("button", {
      class: "menu-btn" + (inSection ? " in-section" : ""), type: "button",
      "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": listId
    }, [label, el("span", { class: "caret", "aria-hidden": "true" }, ["\u25be"])]);

    var ul = el("ul", { class: "menu-list", id: listId, role: "menu" });
    itemIds.forEach(function (id) {
      var item = navItem(id);
      if (!item) return;
      var a = el("a", {
        role: "menuitem", href: item.page,
        "aria-current": id === activeId ? "page" : null
      }, [ item.label.replace(" \u2014 Deep Dive", "") ]);
      ul.appendChild(el("li", { role: "none" }, [a]));
    });

    function close() { btn.setAttribute("aria-expanded", "false"); ul.classList.remove("open"); }
    function open() {
      closeAll();
      btn.setAttribute("aria-expanded", "true"); ul.classList.add("open");
    }
    function toggle() { (btn.getAttribute("aria-expanded") === "true") ? close() : open(); }

    btn.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); open(); var first = ul.querySelector("a"); if (first) first.focus(); }
      else if (e.key === "Escape") { close(); }
    });
    ul.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); btn.focus(); }
    });

    openMenus.push({ close: close, btn: btn, ul: ul });
    return el("div", { class: "menu" + (extraClass ? " " + extraClass : "") }, [btn, ul]);
  }
  function closeAll() { openMenus.forEach(function (m) { m.close(); }); }

  /* ---- masthead + nav ---- */
  function buildHeader(activeId) {
    var sourcesIds = ["statute", "regulation", "case"];
    var modulesIds = ["workflow", "quiz", "connections"]; // how each source is made, knowledge check, bringing it together

    var topnav = el("nav", { class: "topnav", "aria-label": "Primary" }, [
      el("a", { class: "navlink", href: "../../index.html" }, ["Home Page"]),
      el("a", { class: "navlink", href: "../../chapter.html?ch=1" }, ["Ch. 1 \u00b7 Foundations"]),
      el("a", { class: "navlink", href: "index.html", "aria-current": activeId === "home" ? "page" : null }, ["How Law Is Made"]),
      buildDropdown("Sources", sourcesIds, activeId, "nav-sub"),
      buildDropdown("Modules", modulesIds, activeId, "nav-sub")
    ]);

    var notesBtn = el("button", { class: "btn-notes", type: "button", onclick: downloadCompanion }, ["\u2193 Companion Notes"]);
    var navArea = el("div", { class: "nav-area", id: "primary-nav" }, [topnav, notesBtn]);

    var toggle = el("button", {
      class: "nav-toggle", type: "button", "aria-expanded": "false",
      "aria-controls": "primary-nav", "aria-label": "Open menu"
    }, ["\u2630"]);
    toggle.addEventListener("click", function () {
      var open = navArea.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // close dropdowns when clicking elsewhere
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".menu")) closeAll();
    });

    return el("header", { class: "masthead" }, [
      el("div", { class: "wrap" }, [
        el("div", { class: "masthead-inner" }, [
          el("a", { class: "brand", href: "../../index.html" }, [
            el("span", { class: "mark" }, ["The Question Method of Legal Research"]),
            el("span", { class: "sub" }, ["Interactive Legal Research Modules"])
          ]),
          toggle,
          navArea
        ])
      ])
    ]);
  }

  function buildFooter() {
    return el("footer", { class: "foot" }, [
      el("div", { class: "wrap", style: "display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;width:100%;" }, [
        el("span", {}, ["How Law Is Made \u2014 an interactive primer for first-year law students."]),
        el("span", {}, ["Sources of law: cases \u00b7 statutes \u00b7 regulations"])
      ])
    ]);
  }

  function mountChrome(activeId) {
    document.body.classList.add("shell");
    var main = document.querySelector("main");
    if (main && !main.id) main.id = "main";
    var skip = el("a", { class: "skip", href: "#main" }, ["Skip to content"]);
    document.body.insertBefore(skip, document.body.firstChild);
    document.body.insertBefore(buildHeader(activeId), main);
    document.body.appendChild(buildFooter());
  }

  /* ---- companion notes -> downloadable .txt ---- */
  function buildCompanionText() {
    var C = window.COMPANION, W = 52, lines = [], bar = "=".repeat(60);
    lines.push(bar); lines.push(C.title.toUpperCase()); lines.push(bar); lines.push("");
    wrap(C.intro, 64).forEach(function (l) { lines.push(l); });
    lines.push("");
    C.sections.forEach(function (sec) {
      lines.push(""); lines.push(sec.heading); lines.push("-".repeat(sec.heading.length));
      sec.fields.forEach(function (f) {
        lines.push("  " + f.label + ":");
        lines.push("    " + "_".repeat(W));
        lines.push("    " + "_".repeat(W));
        lines.push("");
      });
    });
    lines.push(""); lines.push(C.footer); lines.push("");
    return lines.join("\n");
  }
  function wrap(text, width) {
    var words = String(text).split(/\s+/), out = [], line = "";
    words.forEach(function (w) {
      if ((line + " " + w).trim().length > width) { if (line) out.push(line); line = w; }
      else line = (line ? line + " " : "") + w;
    });
    if (line) out.push(line);
    return out;
  }
  function downloadCompanion() {
    var blob = new Blob([buildCompanionText()], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = el("a", { href: url, download: "sources-of-law-companion-notes.txt" });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function getSource(id) { return (window.SOURCES.sources || []).filter(function (s) { return s.id === id; })[0]; }
  function getParam(name) {
    var m = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  window.LP = {
    el: el, sourceColor: sourceColor, applyTheme: applyTheme,
    mountChrome: mountChrome, downloadCompanion: downloadCompanion,
    getSource: getSource, getParam: getParam
  };
})();
