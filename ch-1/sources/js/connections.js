(function () {
  var el = LP.el, app = document.getElementById("app");
  var C = window.CONNECTIONS;
  LP.mountChrome("connections");

  var NAMES = { statute: "Statute", regulation: "Regulation", case: "Case" };

  app.appendChild(el("section", { class: "reveal" }, [
    el("p", { class: "eyebrow" }, ["Synthesis"]),
    el("h1", {}, ["Bringing It Together"]),
    el("p", { class: "lede" }, [C.intro])
  ]));

  var grid = el("div", { class: "conn reveal d1", style: "margin-top:26px" });

  C.interactions.forEach(function (it) {
    var rel = el("div", { class: "conn-rel" }, [
      el("span", { class: "chip " + it.from }, [NAMES[it.from]]),
      el("span", { class: "to" }, ["acts on \u2192"]),
      el("span", { class: "chip " + it.to }, [NAMES[it.to]])
    ]);

    var summary = el("summary", { class: "conn-summary" }, [
      rel,
      el("h3", {}, [it.title]),
      el("p", { class: "sum" }, [it.summary]),
      el("span", { class: "open-hint" }, ["Read more"])
    ]);

    var body = el("div", { class: "conn-body" }, [ el("p", {}, [it.explanation]) ]);

    if (it.example) {
      var exKids = [
        el("div", { class: "ex-lbl" }, ["Real example"]),
        el("div", { class: "ex-name" }, [it.example.label]),
        el("p", {}, [it.example.detail])
      ];
      if (it.example.link) {
        exKids.push(el("a", { href: it.example.link, target: "_blank", rel: "noopener" }, ["Read the source \u2197"]));
      }
      body.appendChild(el("div", { class: "example" }, exKids));
    }

    grid.appendChild(el("details", { class: "conn-card" }, [summary, body]));
  });

  app.appendChild(grid);
})();
