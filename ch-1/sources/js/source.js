(function () {
  var el = LP.el, app = document.getElementById("app");
  var id = LP.getParam("id") || "statute";
  var src = LP.getSource(id);
  LP.mountChrome(id);

  if (!src) {
    app.appendChild(el("p", {}, ["Unknown source. ", el("a", { href: "index.html" }, ["Back to home"]), "."]));
    return;
  }

  var c = LP.sourceColor(id);
  document.documentElement.style.setProperty("--accent", c.accent);
  document.documentElement.style.setProperty("--accent-tint", c.tint);
  document.title = src.title + " \u2014 How Law Is Made";

  var dd = src.deepDive;

  // hero
  app.appendChild(el("section", { class: "source-hero reveal" }, [
    el("p", { class: "eyebrow" }, ["Source of law"]),
    el("h1", {}, [src.title]),
    el("p", { class: "tagline" }, [src.tagline])
  ]));

  // meta strip
  app.appendChild(el("div", { class: "meta-strip reveal d1" }, [
    metaCell("Made by", src.madeBy),
    metaCell("Its role", src.role),
    metaCell("Best used when", src.whenUseful)
  ]));

  // lifecycle recap
  var recap = el("p", { class: "reveal d1", style: "margin-top:18px;color:var(--ink-soft);font-size:.92rem" }, [
    el("b", { style: "font-variant:small-caps;letter-spacing:.04em;color:var(--ink)" }, ["Lifecycle: "])
  ]);
  src.workflow.forEach(function (s, i) {
    if (i) recap.appendChild(el("span", { style: "color:" + c.accent }, ["  \u2192  "]));
    recap.appendChild(el("span", {}, [s.label]));
  });
  app.appendChild(recap);

  // LEAD prose: intro + first section ("What a [source] is")
  var lead = el("article", { class: "prose lead reveal d2", style: "margin-top:26px" });
  lead.appendChild(el("p", {}, [dd.intro]));
  var first = dd.sections[0];
  if (first) {
    lead.appendChild(el("h2", {}, [first.heading]));
    lead.appendChild(el("p", {}, [first.body]));
  }
  app.appendChild(lead);

  // WHY box — now right after "What a [source] is"
  app.appendChild(el("aside", { class: "why reveal d2" }, [
    el("p", { class: "eyebrow" }, ["Why it's useful"]),
    el("p", {}, [dd.whyUseful])
  ]));

  // REST of the sections
  var rest = el("article", { class: "prose reveal d3" });
  dd.sections.slice(1).forEach(function (sec) {
    rest.appendChild(el("h2", {}, [sec.heading]));
    rest.appendChild(el("p", {}, [sec.body]));
  });
  app.appendChild(rest);

  // glossary
  var dl = el("dl");
  dd.keyTerms.forEach(function (t) {
    dl.appendChild(el("dt", {}, [t.term]));
    dl.appendChild(el("dd", {}, [t.definition]));
  });
  app.appendChild(el("section", { class: "terms reveal d4" }, [
    el("p", { class: "eyebrow" }, ["Key terms"]), dl
  ]));

  // pager
  var list = window.SOURCES.sources;
  var i = list.map(function (s) { return s.id; }).indexOf(id);
  var prev = list[(i - 1 + list.length) % list.length];
  var next = list[(i + 1) % list.length];
  app.appendChild(el("nav", { class: "pager reveal d4", "aria-label": "Other sources" }, [
    el("a", { href: "source.html?id=" + prev.id }, ["\u2190 " + prev.title]),
    el("a", { href: "connections.html" }, ["How they connect"]),
    el("a", { href: "source.html?id=" + next.id }, [next.title + " \u2192"])
  ]));

  function metaCell(lbl, val) {
    return el("div", { class: "cell" }, [ el("div", { class: "lbl" }, [lbl]), el("div", { class: "val" }, [val]) ]);
  }
})();
