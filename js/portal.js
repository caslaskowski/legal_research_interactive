/* Firebrand hub — renders the landing page from window.REGISTRY.
   Classic script (no modules, no fetch) so opening index.html locally works. */
(function () {
  "use strict";
  var R = window.REGISTRY || {};
  var app = document.getElementById("app");

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

  var STATUS = {
    live: { cls: "live", label: "Available" },
    dev:  { cls: "dev",  label: "In development" },
    plan: { cls: "plan", label: "Planned" }
  };

  // footer tagline
  var ft = document.getElementById("foot-tag");
  if (ft && R.suite) ft.textContent = R.suite.tagline || "";

  /* ---- hero ---- */
  var s = R.suite || {};
  app.appendChild(el("section", { class: "hero reveal" }, [
    el("p", { class: "eyebrow" }, ["Interactive companion to the textbook"]),
    el("h1", {}, [s.title || "The Question Method of Legal Research"]),
    el("p", { class: "lede" }, [s.lede || ""])
  ]));

  /* ---- method strip ---- */
  if (R.method && R.method.length) {
    var ol = el("ol");
    R.method.forEach(function (m) {
      ol.appendChild(el("li", {}, [el("b", {}, [m.t]), m.d]));
    });
    app.appendChild(el("section", { class: "method reveal d1" }, [
      el("p", { class: "eyebrow" }, ["The cycle every module trains"]),
      ol
    ]));
  }

  /* ---- parts + chapter ledger ---- */
  var parts = R.parts || [];
  var mods = R.modules || [];

  parts.forEach(function (part, pi) {
    var inPart = mods.filter(function (m) { return m.part === part.id; });
    if (!inPart.length) return;
    var liveCount = inPart.filter(function (m) { return m.status === "live"; }).length;

    var ledger = el("div", { class: "ledger" });
    inPart.forEach(function (m) {
      var st = STATUS[m.status] || STATUS.plan;
      var isLive = m.status === "live";
      var href = m.href || ("coming-soon.html?ch=" + m.ch);

      var meta = el("div", { class: "ch-meta" }, [
        m.note ? el("span", { class: "ch-note" }, [m.note]) : null,
        el("span", { class: "pill " + st.cls }, [st.label]),
        el("span", { class: "go", "aria-hidden": "true" }, ["\u2192"])
      ]);

      ledger.appendChild(el("a", {
        class: "entry is-" + m.status,
        href: href,
        "aria-label": "Chapter " + m.ch + " \u2014 " + m.title + " (" + st.label + ")"
      }, [
        el("div", { class: "ch-no", "aria-hidden": "true" }, [String(m.ch)]),
        el("div", { class: "ch-body" }, [
          el("p", { class: "ch-title" }, [m.title]),
          el("p", { class: "ch-desc" }, [m.desc || ""])
        ]),
        meta
      ]));
    });

    app.appendChild(el("section", { class: "part reveal d" + Math.min(pi + 2, 4) }, [
      el("div", { class: "part-head" }, [
        el("span", { class: "pnum" }, ["Part " + part.id]),
        el("h2", {}, [part.name]),
        el("span", { class: "pcount" }, [liveCount + " of " + inPart.length + " live"])
      ]),
      part.blurb ? el("p", { class: "part-blurb" }, [part.blurb]) : null,
      ledger
    ]));
  });
})();
