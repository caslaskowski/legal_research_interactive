/* Firebrand home page — renders the chapter index from window.REGISTRY.
   Classic script (no modules, no fetch) so opening index.html locally works.
   Each chapter links to its own page (chapter.html?ch=N), which lists that
   chapter's modules. */
(function () {
  "use strict";
  var R = window.REGISTRY || {};
  var app = document.getElementById("app");
  if (!app) return;

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

  // status precedence for a chapter's summary badge
  var STATUS = {
    live: { cls: "live", rank: 3, label: "Available" },
    dev:  { cls: "dev",  rank: 2, label: "In development" },
    plan: { cls: "plan", rank: 1, label: "Planned" }
  };

  function chapterStatus(mods) {
    var best = "plan";
    (mods || []).forEach(function (m) {
      if ((STATUS[m.status] || STATUS.plan).rank > STATUS[best].rank) best = m.status;
    });
    return best;
  }

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

  /* ---- the method strip: five steps + a checkpoint ---- */
  var method = R.method;
  if (method && method.steps && method.steps.length) {
    var ol = el("ol", { class: "method-steps" });
    method.steps.forEach(function (m) {
      ol.appendChild(el("li", {}, [el("b", {}, [m.t]), m.d]));
    });
    var kids = [
      el("p", { class: "eyebrow" }, [method.eyebrow || "The Question Method, in brief"])
    ];
    if (method.intro) kids.push(el("p", { class: "method-intro" }, [method.intro]));
    kids.push(ol);
    if (method.checkpoint) {
      kids.push(el("p", { class: "method-checkpoint" }, [
        el("b", {}, [method.checkpoint.t + ". "]),
        method.checkpoint.d
      ]));
    }
    app.appendChild(el("section", { class: "method reveal d1", "aria-label": "The Question Method in brief" }, kids));
  }

  /* ---- parts + chapter index ---- */
  var parts = R.parts || [];
  var chapters = R.chapters || [];

  parts.forEach(function (part, pi) {
    var inPart = chapters.filter(function (c) { return c.part === part.id; });
    if (!inPart.length) return;

    var liveChapters = inPart.filter(function (c) {
      return (c.modules || []).some(function (m) { return m.status === "live"; });
    }).length;

    var ledger = el("div", { class: "ledger" });
    inPart.forEach(function (c) {
      var mods = c.modules || [];
      var st = STATUS[chapterStatus(mods)] || STATUS.plan;
      var liveN = mods.filter(function (m) { return m.status === "live"; }).length;
      var countTxt = mods.length + (mods.length === 1 ? " module" : " modules");
      var availTxt = liveN ? " \u00b7 " + liveN + " available" : "";

      var meta = el("div", { class: "ch-meta" }, [
        el("span", { class: "ch-note" }, [countTxt + availTxt]),
        el("span", { class: "pill " + st.cls }, [st.label]),
        el("span", { class: "go", "aria-hidden": "true" }, ["\u2192"])
      ]);

      ledger.appendChild(el("a", {
        class: "entry" + (liveN ? " is-live" : " is-plan"),
        href: "chapter.html?ch=" + c.ch,
        "aria-label": "Chapter " + c.ch + " \u2014 " + c.title +
          " (" + countTxt + availTxt + ")"
      }, [
        el("div", { class: "ch-no", "aria-hidden": "true" }, [String(c.ch)]),
        el("div", { class: "ch-body" }, [
          el("p", { class: "ch-title" }, [c.title]),
          el("p", { class: "ch-desc" }, [c.desc || ""])
        ]),
        meta
      ]));
    });

    app.appendChild(el("section", { class: "part reveal d" + Math.min(pi + 2, 4) }, [
      el("div", { class: "part-head" }, [
        el("span", { class: "pnum" }, ["Part " + part.id]),
        el("h2", {}, [part.name]),
        el("span", { class: "pcount" }, [
          liveChapters + " of " + inPart.length + " chapters started"
        ])
      ]),
      part.blurb ? el("p", { class: "part-blurb" }, [part.blurb]) : null,
      ledger
    ]));
  });
})();
