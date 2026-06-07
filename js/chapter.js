/* Renders a single chapter page from window.REGISTRY, keyed by ?ch=N.
   Lists every module for that chapter: live modules link out; planned and
   in-development modules render as inline placeholders with a "what it will
   do" list. Classic script so the page works when opened locally. */
(function () {
  "use strict";
  var R = window.REGISTRY || {};
  var host = document.getElementById("chapter");
  if (!host) return;

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k]; if (v == null) return;
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else n.setAttribute(k, v);
    });
    (kids || []).forEach(function (c) {
      if (c == null) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }
  function param(name) {
    var m = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  var STATUS = {
    live: { cls: "live", label: "Available" },
    dev:  { cls: "dev",  label: "In development" },
    plan: { cls: "plan", label: "Planned" }
  };

  var ft = document.getElementById("foot-tag");
  if (ft && R.suite) ft.textContent = R.suite.tagline || "";

  var chapters = R.chapters || [];
  var ch = parseInt(param("ch"), 10);
  var chap = chapters.filter(function (c) { return c.ch === ch; })[0];

  /* ---- not found ---- */
  if (!chap) {
    host.appendChild(el("a", { class: "cs-back", href: "index.html" }, ["\u2190 All chapters"]));
    host.appendChild(el("div", { class: "cs-card", style: "margin-top:20px" }, [
      el("h1", {}, ["Chapter not found"]),
      el("p", { class: "cs-sub" }, ["We could not find that chapter. Head back to the full chapter index."])
    ]));
    document.title = "Chapter not found \u2014 The Question Method of Legal Research";
    return;
  }

  var part = (R.parts || []).filter(function (p) { return p.id === chap.part; })[0];

  /* ---- back link + breadcrumb eyebrow ---- */
  host.appendChild(el("a", { class: "cs-back", href: "index.html" }, ["\u2190 All chapters"]));
  host.appendChild(el("p", { class: "ch-eyebrow" }, [
    "Part " + chap.part + (part ? " \u00b7 " + part.name : "") + " \u00b7 Chapter " + chap.ch
  ]));

  /* ---- chapter header ---- */
  host.appendChild(el("header", { class: "ch-header" }, [
    el("h1", {}, [chap.title]),
    chap.desc ? el("p", { class: "ch-lede measure" }, [chap.desc]) : null
  ]));

  /* ---- module list ---- */
  var mods = chap.modules || [];
  var liveN = mods.filter(function (m) { return m.status === "live"; }).length;

  host.appendChild(el("div", { class: "mod-sectionhead" }, [
    el("h2", {}, [mods.length === 1 ? "Module" : "Modules"]),
    el("span", { class: "mod-count" }, [
      mods.length + (mods.length === 1 ? " module" : " modules") +
      (liveN ? " \u00b7 " + liveN + " available now" : " \u00b7 in the pipeline")
    ])
  ]));

  var list = el("div", { class: "mod-list" });

  mods.forEach(function (m) {
    var st = STATUS[m.status] || STATUS.plan;
    var isLive = m.status === "live" && m.href;

    var head = el("div", { class: "mod-head" }, [
      el("h3", { class: "mod-title" }, [m.title]),
      el("span", { class: "pill " + st.cls }, [st.label])
    ]);

    var body = [head];
    if (m.desc) body.push(el("p", { class: "mod-desc" }, [m.desc]));

    if (m.will && m.will.length) {
      var ul = el("ul", { class: "mod-will" });
      m.will.forEach(function (w) { ul.appendChild(el("li", {}, [w])); });
      body.push(el("div", { class: "mod-willwrap" }, [
        el("p", { class: "mod-willhead" }, ["What this module will let you do"]),
        ul
      ]));
    }

    if (isLive) {
      body.push(el("span", { class: "mod-open", "aria-hidden": "true" }, ["Open module \u2192"]));
      list.appendChild(el("a", {
        class: "mod-card is-live",
        href: m.href,
        "aria-label": "Open module: " + m.title
      }, body));
    } else {
      var note = m.status === "dev"
        ? "This interactive module is being built now \u2014 check back soon."
        : "This module is planned. The chapter exists in the textbook; the interactive version is on the way.";
      body.push(el("p", { class: "mod-note" }, [note]));
      list.appendChild(el("div", { class: "mod-card is-" + m.status }, body));
    }
  });

  host.appendChild(list);

  /* ---- prev / next chapter nav ---- */
  var ordered = chapters.slice().sort(function (a, b) { return a.ch - b.ch; });
  var idx = ordered.findIndex
    ? ordered.findIndex(function (c) { return c.ch === ch; })
    : (function () { for (var i = 0; i < ordered.length; i++) if (ordered[i].ch === ch) return i; return -1; })();
  var prev = idx > 0 ? ordered[idx - 1] : null;
  var next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

  var nav = el("nav", { class: "ch-nav", "aria-label": "Chapter navigation" }, [
    prev ? el("a", { class: "ch-nav-link prev", href: "chapter.html?ch=" + prev.ch }, [
      el("span", { class: "ch-nav-dir" }, ["\u2190 Previous"]),
      el("span", { class: "ch-nav-title" }, ["Ch. " + prev.ch + " \u00b7 " + prev.title])
    ]) : el("span", {}, []),
    next ? el("a", { class: "ch-nav-link next", href: "chapter.html?ch=" + next.ch }, [
      el("span", { class: "ch-nav-dir" }, ["Next \u2192"]),
      el("span", { class: "ch-nav-title" }, ["Ch. " + next.ch + " \u00b7 " + next.title])
    ]) : el("span", {}, [])
  ]);
  host.appendChild(nav);

  document.title = "Chapter " + chap.ch + ": " + chap.title +
    " \u2014 The Question Method of Legal Research";
})();
