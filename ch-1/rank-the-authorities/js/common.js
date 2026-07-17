/* Shared helpers for every page of the Hierarchy of Authorities module.
   Classic script (no modules) so the site runs by simply opening index.html
   — no local server and no network beyond web fonts. All state stays in the
   browser; nothing is transmitted (FERPA-safe by construction). */
(function () {
  "use strict";

  /* ---- tiny DOM helper ---- */
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

  function getParam(name) {
    var m = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  /* forgiving comparison for short free-text answers (court & reporter names) */
  function normalize(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .replace(/[.,;:'"\u2018\u2019\u201c\u201d]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^the\s+/, "")
      .replace(/\s+/g, "");   /* drop remaining spaces: "F. 3d" = "F.3d" = "f3d" */
  }
  function matchesAny(input, accepted) {
    var n = normalize(input);
    if (!n) return false;
    return (accepted || []).some(function (a) { return normalize(a) === n; });
  }

  /* ---- accessible dropdown menu ---- */
  var openMenus = [];
  function navItem(id) {
    return (window.NAV || []).filter(function (n) { return n.id === id; })[0];
  }
  function buildDropdown(label, itemIds, activeId, extraClass) {
    var inSection = itemIds.indexOf(activeId) !== -1;
    var listId = "menu-" + label.toLowerCase().replace(/\s+/g, "-");
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
      }, [item.label]);
      ul.appendChild(el("li", { role: "none" }, [a]));
    });

    function close() { btn.setAttribute("aria-expanded", "false"); ul.classList.remove("open"); }
    function open() { closeAll(); btn.setAttribute("aria-expanded", "true"); ul.classList.add("open"); }
    function toggle() { (btn.getAttribute("aria-expanded") === "true") ? close() : open(); }

    btn.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); open(); var first = ul.querySelector("a"); if (first) first.focus(); }
      else if (e.key === "Escape") { close(); }
    });
    ul.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); btn.focus(); }
    });
    openMenus.push({ close: close });
    return el("div", { class: "menu" + (extraClass ? " " + extraClass : "") }, [btn, ul]);
  }
  function closeAll() { openMenus.forEach(function (m) { m.close(); }); }

  /* ---- masthead + nav ---- */
  function navlink(id, activeId, extraClass) {
    var item = navItem(id);
    if (!item) return null;
    return el("a", {
      class: "navlink" + (extraClass ? " " + extraClass : ""), href: item.page,
      "aria-current": id === activeId ? "page" : null
    }, [item.label]);
  }
  /* Header pattern (site-wide): Home · the chapter we are in · the module ·
     "Module Pages" (every content page of this single module, in reading order) ·
     "Learning Resources" (knowledge check, companion notes, reflection). */
  function buildHeader(activeId) {
    var practiceIds = ["practice", "primary-secondary", "binding-persuasive", "statute-common", "rank", "courts"];
    var isPractice = practiceIds.indexOf(activeId) !== -1;

    var links = [
      el("a", { class: "navlink", href: "../../index.html" }, ["Home"]),
      el("a", { class: "navlink", href: "../../ch-1/" }, ["Ch.\u00a01 \u00b7 Foundations"])
    ];

    if (isPractice) {
      links.push(navlink("practice", activeId));
      links.push(buildDropdown("Drills", ["primary-secondary", "binding-persuasive", "statute-common"], activeId, "nav-sub"));
      links.push(navlink("rank", activeId, "nav-sub"));
      links.push(navlink("courts", activeId, "nav-sub"));
    } else {
      links.push(el("a", {
        class: "navlink", href: "index.html",
        "aria-current": activeId === "home" ? "page" : null
      }, ["Hierarchy of Authorities"]));
      links.push(buildDropdown("Module Pages", ["hierarchy", "switch"], activeId, "nav-sub"));
      var resources = buildDropdown("Learning Resources", ["quiz"], activeId, "nav-sub");
      var resList = resources.querySelector(".menu-list");
      var dlLink = el("a", { role: "menuitem", href: "#" }, ["Companion Notes (download)"]);
      dlLink.addEventListener("click", function (e) { e.preventDefault(); downloadCompanion(); });
      resList.appendChild(el("li", { role: "none" }, [dlLink]));
      links.push(resources);
    }

    var topnav = el("nav", { class: "topnav", "aria-label": "Primary" }, links.filter(Boolean));
    var navArea = el("div", { class: "nav-area", id: "primary-nav" }, [topnav]);

    var toggle = el("button", {
      class: "nav-toggle", type: "button", "aria-expanded": "false",
      "aria-controls": "primary-nav", "aria-label": "Open menu"
    }, ["\u2630"]);
    toggle.addEventListener("click", function () {
      var open = navArea.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    document.addEventListener("click", function (e) { if (!e.target.closest(".menu")) closeAll(); });

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
      el("p", { class: "foot-contact" }, [
        "Found a problem, or wish a module existed? ",
        el("a", { href: "https://github.com/caslaskowski/legal_research_interactive/issues", target: "_blank", rel: "noopener" },
          ["Report an issue or suggest a feature"]),
        " (opens GitHub in a new tab \u2014 nothing is sent from this site)."
      ]),

      el("span", {}, ["Hierarchy of Authorities \u2014 an interactive skill-builder for the Question Method of Legal Research."]),
      el("span", {}, ["Primary over secondary \u00b7 binding over persuasive \u00b7 higher court over lower"])
    ]);
  }

  /* ---- shared bottom pager: one reading order, same look on every page ----
     Mirrors the page-bottom navigation used across the site, so moving through
     the module feels the same everywhere. */
  var PAGE_ORDER = ["home", "hierarchy", "switch", "quiz"];
  function buildPager(activeId) {
    var i = PAGE_ORDER.indexOf(activeId);
    if (i === -1) return null;
    function entry(id) { return navItem(id); }
    var prev = i > 0 ? entry(PAGE_ORDER[i - 1]) : null;
    var next = i < PAGE_ORDER.length - 1 ? entry(PAGE_ORDER[i + 1]) : null;
    var kids = [];
    kids.push(prev ? el("a", { href: prev.page }, ["\u2190 " + (prev.id === "home" ? "Module home" : prev.label)]) : el("span", {}, [""]));
    if (activeId !== "home" && i > 0 && PAGE_ORDER[i - 1] !== "home") kids.push(el("a", { href: "index.html" }, ["Module home"]));
    kids.push(next ? el("a", { href: next.page }, [next.label + " \u2192"]) : el("span", {}, [""]));
    return el("nav", { class: "pager", "aria-label": "Module pages" }, kids);
  }

  function mountChrome(activeId) {
    document.body.classList.add("shell");
    var main = document.querySelector("main");
    if (main && !main.id) main.id = "main";
    var skip = el("a", { class: "skip", href: "#main" }, ["Skip to content"]);
    document.body.insertBefore(skip, document.body.firstChild);
    document.body.insertBefore(buildHeader(activeId), main);
    var pager = buildPager(activeId);
    if (pager && main) main.appendChild(el("div", { class: "wrap" }, [pager]));
    document.body.appendChild(buildFooter());
    /* FERPA disclosure: these pages persist answers in this browser only */
    var storing = ["practice", "primary-secondary", "binding-persuasive",
                   "statute-common", "rank", "courts"];
    if (window.QM && storing.indexOf(activeId) !== -1) {
      QM.storageNotice({ prefix: "rta_", parent: main });
    }
  }

  /* ---- companion notes: a formatted Word document generated by
     build_companions.py and committed to the repo — a plain static
     download, so nothing leaves the browser. ---- */
  function downloadCompanion() {
    var a = el("a", { href: "companion-notes.docx", download: "hierarchy-of-authorities-companion-notes.docx" });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  /* ---- forum explorer: shared by hierarchy.html and switch.html ---- */
  function renderForumExplorer(app, F, fi) {
    var section = el("section", { class: "reveal d3 block" }, [
      el("p", { class: "eyebrow" }, [F.eyebrow]),
      el("h2", {}, [F.heading]),
      el("p", { class: "measure" }, [F.lede])
    ]);

    var selectId = "forum-select-" + fi;
    var select = el("select", { id: selectId, class: "forum-select" },
      F.forums.map(function (fm) { return el("option", { value: fm.id }, [fm.label]); }));
    section.appendChild(el("div", { class: "forum-picker" }, [
      el("label", { for: selectId }, ["Deciding court:"]),
      select
    ]));

    var live = el("p", { class: "sr-only", role: "status", "aria-live": "polite" });
    section.appendChild(live);

    var rows = [];
    var list = el("ul", { class: "weigh-list", "aria-label": "Authorities and their weight before the selected court" });
    F.authorities.forEach(function (a) {
      var badge = el("span", { class: "weigh-badge" });
      var why = el("p", { class: "weigh-why" });
      list.appendChild(el("li", { class: "weigh-row" }, [
        el("div", { class: "weigh-main" }, [el("span", { class: "weigh-label" }, [a.label]), badge]),
        why
      ]));
      rows.push({ a: a, badge: badge, why: why });
    });
    section.appendChild(list);
    app.appendChild(section);

    function paint(forumId) {
      var fname = F.forums.filter(function (x) { return x.id === forumId; })[0].label;
      rows.forEach(function (r) {
        var w = r.a.weight[forumId];
        r.badge.className = "weigh-badge " + w;
        r.badge.textContent = w === "binding" ? "Binding" : "Persuasive";
        r.badge.setAttribute("aria-label", (w === "binding" ? "Binding" : "Persuasive") + " before this court");
        r.why.textContent = r.a.why[forumId];
      });
      live.textContent = "Showing how each authority weighs before the " + fname + ".";
    }
    select.addEventListener("change", function () { paint(select.value); });
    paint(F.forums[0].id);
  }

  window.LP = {
    el: el, renderForumExplorer: renderForumExplorer, getParam: getParam, normalize: normalize, matchesAny: matchesAny,
    mountChrome: mountChrome, downloadCompanion: downloadCompanion
  };
})();
