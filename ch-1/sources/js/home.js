(function () {
  var el = LP.el, H = window.HOME, app = document.getElementById("app");
  LP.mountChrome("home");

  // 1) Title block
  app.appendChild(el("section", { class: "hero reveal" }, [
    el("p", { class: "eyebrow" }, ["An interactive primer \u00b7 first-year law"]),
    el("h1", {}, [H.title]),
    el("p", { class: "lede" }, [H.intro])
  ]));

  // 2) How this relates to the Question Method
  if (H.method) {
    var mbox = document.createElement("div");
    mbox.className = "method-callout reveal d1";
    mbox.style.cssText = "margin-top:28px;border-left:4px solid #a72d2a;background:#f6eeed;border-radius:0 4px 4px 0;padding:16px 20px";
    var mEyebrow = document.createElement("p");
    mEyebrow.className = "eyebrow";
    mEyebrow.style.cssText = "color:#a72d2a;margin-bottom:.4rem";
    mEyebrow.textContent = H.method.eyebrow;
    var mBody = document.createElement("p");
    mBody.style.margin = "0";
    mBody.textContent = H.method.body;
    mbox.appendChild(mEyebrow);
    mbox.appendChild(mBody);
    app.appendChild(mbox);
  }

  // 3) Companion notes
  app.appendChild(el("section", { class: "reveal d2", style: "margin-top:30px" }, [
    el("div", { class: "notes-callout" }, [
      el("div", { class: "txt" }, [
        el("h3", {}, [H.companion.title]),
        el("p", {}, [H.companion.description])
      ]),
      el("button", { class: "btn", type: "button", onclick: LP.downloadCompanion }, [H.companion.buttonText])
    ])
  ]));

  // 4) At a glance
  if (H.atAGlance) {
    var g = H.atAGlance;
    var thead = el("thead", {}, [ el("tr", {}, g.columns.map(function (c) { return el("th", { scope: "col" }, [c]); })) ]);
    var tbody = el("tbody");
    g.rows.forEach(function (r) {
      var tr = el("tr");
      r.forEach(function (cell, idx) { tr.appendChild(idx === 0 ? el("th", { scope: "row" }, [cell]) : el("td", {}, [cell])); });
      tbody.appendChild(tr);
    });
    app.appendChild(el("section", { class: "reveal d3", style: "margin-top:42px" }, [
      el("p", { class: "eyebrow" }, ["At a glance"]),
      el("table", { class: "glance" }, [
        el("caption", { class: "sr-only" }, ["The three sources of law compared by who makes them, what they do, and when to use them."]),
        thead, tbody
      ])
    ]));
  }

  // 5) Start-here block
  var first = (H.nav || []).filter(function (n) { return n.id === "workflow"; })[0];
  app.appendChild(el("section", { class: "reveal d4", style: "margin-top:42px" }, [
    el("div", { class: "notes-callout", style: "background:var(--paper-2)" }, [
      el("div", { class: "txt" }, [
        el("p", { class: "eyebrow", style: "margin-bottom:6px" }, ["Start here"]),
        el("h3", {}, ["How Each Source Is Made"]),
        el("p", {}, [(first && first.blurb) || "Click through the lifecycle of each source, from first draft to binding law."])
      ]),
      el("a", { class: "btn", href: (first && first.page) || "workflow.html" }, ["Begin the module \u2192"])
    ])
  ]));
})();
