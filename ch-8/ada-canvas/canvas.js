/* The ADA Canvas — a guided, single-purpose take on the spatial-research idea
   pioneered by R. Fordon's Bankruptcy Canvas (rlfordon.github.io/bankruptcy-canvas),
   rebuilt in this site's vanilla-JS house style. Center-canvas functionality only:
   cards, edges, drag, pan. No history sidebar, no import/export. */
(function () {
  "use strict";
  var CARDS = window.ADA.cards, TERMS = window.ADA.terms;

  /* ---------- auto-linkify: section refs + defined terms ---------- */
  var SEC_RE = /(?:sections?\s+)?(12(?:10[1-3]|18[1-9]))(?=[^\d]|$)/g;
  function linkify(id, html) {
    var termKeys = Object.keys(TERMS).sort(function (a, b) { return b.length - a.length; });
    var termDone = {};
    var parts = html.split(/(<[^>]+>)/);
    var inAnchor = 0;
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (p.charAt(0) === "<") {
        if (/^<a[\s>]/i.test(p)) inAnchor++;
        if (/^<\/a>/i.test(p)) inAnchor = Math.max(0, inAnchor - 1);
        continue;
      }
      if (inAnchor) continue;
      // section cross-references
      p = p.replace(SEC_RE, function (m, num) {
        var target = "s" + num;
        if (!CARDS[target] || target === id) return m;
        return '<a class="xref" data-ref="' + target + '">' + m + "</a>";
      });
      // defined terms: first occurrence per card, never on the defining card
      for (var t = 0; t < termKeys.length; t++) {
        var term = termKeys[t], target2 = TERMS[term];
        if (termDone[term] || target2 === id) continue;
        var re = new RegExp("\\b(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")\\b", "i");
        if (re.test(p)) {
          var replaced = false;
          p = p.replace(re, function (hit) {
            if (replaced) return hit;
            replaced = true;
            return '<a class="xref" data-ref="' + target2 + '" data-term="1">' + hit + "</a>";
          });
          if (replaced) termDone[term] = true;
        }
      }
      parts[i] = p;
    }
    return parts.join("");
  }

  /* ---------- stage / world / pan ---------- */
  var stage = document.getElementById("stage"),
      world = document.getElementById("world"),
      edgesSvg = document.getElementById("edges"),
      live = document.getElementById("live");
  var pan = { x: -40, y: -30 };
  function applyPan() { world.style.transform = "translate(" + pan.x + "px," + pan.y + "px)"; }
  applyPan();

  var panning = null;
  stage.addEventListener("pointerdown", function (e) {
    if (e.target.closest(".card") || e.target.closest("button")) return;
    panning = { sx: e.clientX, sy: e.clientY, ox: pan.x, oy: pan.y };
    stage.classList.add("panning");
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener("pointermove", function (e) {
    if (!panning) return;
    pan.x = Math.min(0, Math.max(-4500, panning.ox + (e.clientX - panning.sx)));
    pan.y = Math.min(0, Math.max(-3000, panning.oy + (e.clientY - panning.sy)));
    applyPan();
  });
  stage.addEventListener("pointerup", function () { panning = null; stage.classList.remove("panning"); });

  /* ---------- cards + edges ---------- */
  var open = {};   // id -> {el, x, y}
  var edges = [];  // {a, b, line}
  var spawnCount = 0;

  function center(rec) {
    return { x: rec.x + rec.el.offsetWidth / 2, y: rec.y + rec.el.offsetHeight / 2 };
  }
  function redraw() {
    edges.forEach(function (e) {
      if (!open[e.a] || !open[e.b]) { e.line.remove(); return; }
      var ca = center(open[e.a]), cb = center(open[e.b]);
      e.line.setAttribute("x1", ca.x); e.line.setAttribute("y1", ca.y);
      e.line.setAttribute("x2", cb.x); e.line.setAttribute("y2", cb.y);
    });
    edges = edges.filter(function (e) { return open[e.a] && open[e.b]; });
  }
  function addEdge(a, b) {
    if (a === b) return;
    if (edges.some(function (e) { return (e.a === a && e.b === b) || (e.a === b && e.b === a); })) return;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    edgesSvg.appendChild(line);
    edges.push({ a: a, b: b, line: line });
    redraw();
  }
  function panTo(rec) {
    var c = center(rec);
    pan.x = Math.min(0, Math.max(-4500, stage.clientWidth / 2 - c.x));
    pan.y = Math.min(0, Math.max(-3000, stage.clientHeight / 2 - c.y));
    applyPan();
  }
  function flash(rec) {
    rec.el.classList.add("flash");
    setTimeout(function () { rec.el.classList.remove("flash"); }, 900);
  }

  function leadsHtml(c) {
    if (!c.leads || !c.leads.length) return "";
    var links = c.leads.filter(function (t) { return CARDS[t]; }).map(function (t) {
      var tc = CARDS[t];
      var label = tc.kind === "case" ? tc.title : tc.cite;
      return '<a class="xref" data-ref="' + t + '">' + label + "</a>";
    });
    return '<p class="srcnote leads"><b>Where this leads:</b> ' + links.join(" \u00b7 ") + "</p>";
  }

  function spawn(id, near) {
    if (open[id]) { panTo(open[id]); flash(open[id]); if (near) addEdge(near, id); return open[id]; }
    var c = CARDS[id];
    if (!c) return null;
    var el = document.createElement("article");
    el.className = "card k-" + c.kind;
    el.setAttribute("data-id", id);
    el.innerHTML =
      '<header><span class="kk">' + c.kind + '</span>' +
      '<span class="t">' + c.title + '<span class="cite">' + c.cite + "</span></span>" +
      '<button class="x" type="button" aria-label="Close card">\u00d7</button></header>' +
      '<div class="bd">' + linkify(id, c.body) + leadsHtml(c) + "</div>";
    var x, y;
    if (near && open[near]) {
      x = open[near].x + 380 + (spawnCount % 2) * 30;
      y = open[near].y + 40 * ((spawnCount % 3) - 1);
    } else {
      x = 60 + (spawnCount % 3) * 60; y = 50 + (spawnCount % 3) * 40;
    }
    x = Math.max(10, Math.min(5600, x)); y = Math.max(10, Math.min(3500, y));
    el.style.left = x + "px"; el.style.top = y + "px";
    world.appendChild(el);
    open[id] = { el: el, x: x, y: y };
    spawnCount++;
    if (near) addEdge(near, id);
    panTo(open[id]); flash(open[id]);
    live.textContent = "Opened " + c.title;
    if (window.ExportReflect) ExportReflect.log("Opened source", c.title);
    trailHit(id);
    return open[id];
  }

  /* drag a card by its header */
  var drag = null;
  world.addEventListener("pointerdown", function (e) {
    var hd = e.target.closest(".card > header");
    if (!hd || e.target.closest(".x")) return;
    var el = hd.parentElement, id = el.getAttribute("data-id");
    drag = { id: id, sx: e.clientX, sy: e.clientY, ox: open[id].x, oy: open[id].y };
    el.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  world.addEventListener("pointermove", function (e) {
    if (!drag) return;
    var rec = open[drag.id];
    rec.x = Math.max(0, Math.min(5620, drag.ox + (e.clientX - drag.sx)));
    rec.y = Math.max(0, Math.min(3560, drag.oy + (e.clientY - drag.sy)));
    rec.el.style.left = rec.x + "px"; rec.el.style.top = rec.y + "px";
    redraw();
  });
  world.addEventListener("pointerup", function () { drag = null; });

  /* clicks inside cards: xrefs + close */
  world.addEventListener("click", function (e) {
    var xr = e.target.closest("a.xref");
    if (xr) {
      var from = e.target.closest(".card").getAttribute("data-id");
      spawn(xr.getAttribute("data-ref"), from);
      if (window.ExportReflect) ExportReflect.log("Followed cross-reference",
        CARDS[from].title + " \u2192 " + (CARDS[xr.getAttribute("data-ref")] || {}).title);
      return;
    }
    var x = e.target.closest(".x");
    if (x) {
      var el = x.closest(".card"), id = el.getAttribute("data-id");
      el.remove(); delete open[id]; redraw();
    }
  });

  function clearAll() {
    Object.keys(open).forEach(function (id) { open[id].el.remove(); delete open[id]; });
    edges.forEach(function (e) { e.line.remove(); }); edges = [];
    spawnCount = 0; pan.x = -40; pan.y = -30; applyPan();
  }
  document.getElementById("clear").addEventListener("click", clearAll);
  document.getElementById("arrange").addEventListener("click", function () {
    var ids = Object.keys(open), cols = 3;
    ids.forEach(function (id, i) {
      var rec = open[id];
      rec.x = 40 + (i % cols) * 380; rec.y = 40 + Math.floor(i / cols) * 300;
      rec.el.style.left = rec.x + "px"; rec.el.style.top = rec.y + "px";
    });
    pan.x = -10; pan.y = -10; applyPan(); redraw();
  });

  /* ---------- guided starter questions ---------- */
  var QUESTIONS = [
    {
      id: "cart",
      btn: "The golf cart \u2014 an answered question",
      q: "Casey, a professional golfer with a degenerative circulatory disorder, cannot walk a full course. A tour's rules require walking. Must the tour let him use a cart?",
      hint: "Start in the statute's general rule, chase \u201cplace of public accommodation\u201d and the reasonable-modifications standard into the definitions and the regulation, then find the case that settled it \u2014 and the one it overruled.",
      seed: "s12182",
      trail: ["s12182", "s12181", "reg36-302", "case_pga"],
      disc: "<b>This question has an answer.</b> \u00a7 12182(a) states the general rule; \u00a7 12181(7)(L) puts golf courses on the list of public accommodations; \u00a7 12182(b)(2)(A)(ii) and 28 C.F.R. \u00a7 36.302(a) supply the standard \u2014 reasonable modifications unless they would <i>fundamentally alter</i> the activity. In <i>PGA Tour v. Martin</i> the Supreme Court held the walking rule \u201cat best peripheral\u201d and required an individualized inquiry \u2014 affirming the Ninth Circuit's <i>Martin</i> and wiping out the Seventh Circuit's contrary <i>Olinger</i>, decided one day apart. Notice what your map shows: statute \u2192 definition \u2192 regulation \u2192 case, and a circuit split that existed for barely a year before the Court closed it. Open <i>Olinger</i> and <i>Martin, 204 F.3d 994</i> from the case cards to see both sides."
    },
    {
      id: "web",
      btn: "The website \u2014 an open question",
      q: "A grocery chain's website cannot be used with screen-reader software, so Maria cannot refill prescriptions online. Is the website a \u201cplace of public accommodation\u201d under Title III?",
      hint: "Start in the statutory definition. Every category in \u00a7 12181(7) is a physical place \u2014 or is it? Follow the question into the courts and watch four circuits answer it differently.",
      seed: "s12181",
      trail: ["s12181", "case_carparts", "case_weyer", "case_robles", "case_gil"],
      disc: "<b>This question is still open in much of the country.</b> The First Circuit (<i>Carparts</i>) read \u201cpublic accommodation\u201d beyond physical structures; the Ninth (<i>Weyer</i>, then <i>Robles</i>) requires a nexus to a physical place \u2014 which Domino's website had; the Eleventh (<i>Gil</i>) held websites are not places of public accommodation at all \u2026 and then the opinion was vacated as moot, un-answering the question in that circuit. Same statute, same words, different jurisdictions, different law \u2014 and one answer that evaporated after it was published. This is why the survey question (\u201chow do the circuits treat X?\u201d) is its own research step, and why a citator check is not optional. Your map is a picture of a live circuit split."
    },
    {
      id: "ramp",
      btn: "The step at the door \u2014 a factors question",
      q: "A small used bookstore in a 1920s building has one step at its entrance. Must the owner install a ramp?",
      hint: "The duty lives in \u00a7 12182(b)(2)(A)(iv) \u2014 but it turns on a defined term. Chase \u201creadily achievable\u201d into the statutory definitions, then into the regulation's factor list.",
      seed: "s12182",
      trail: ["s12182", "s12181", "reg36-104"],
      disc: "<b>The answer is \u201cit depends \u2014 on defined factors.\u201d</b> \u00a7 12182(b)(2)(A)(iv) requires removing architectural barriers in existing facilities where removal is <i>readily achievable</i>; \u00a7 12181(9) defines that term as \u201ceasily accomplishable \u2026 without much difficulty or expense\u201d and lists factors; 28 C.F.R. \u00a7 36.104 repeats and operationalizes them (cost, resources of the site, safety, parent-company resources). No case needed to state the rule \u2014 but every application is a fight about the factors. Notice the shape of this map compared to the first two: statute \u2192 definition \u2192 regulation, no case at the end. Some questions resolve inside the codes; knowing when you do and don't need case law is itself a research skill."
    }
  ];

  var qbtns = document.getElementById("qbtns"),
      qpanel = document.getElementById("qpanel"),
      qtext = document.getElementById("qtext"),
      qhint = document.getElementById("qhint"),
      qtrail = document.getElementById("qtrail"),
      qreveal = document.getElementById("qreveal"),
      qdisc = document.getElementById("qdisc");
  var activeQ = null, hits = {};

  function trailHit(id) {
    if (!activeQ) return;
    if (activeQ.trail.indexOf(id) === -1) return;
    hits[id] = true;
    renderTrail();
    if (activeQ.trail.every(function (t) { return hits[t]; })) {
      qreveal.classList.add("on");
    }
  }
  function renderTrail() {
    qtrail.innerHTML = "";
    activeQ.trail.forEach(function (t) {
      var s = document.createElement("span");
      s.textContent = (CARDS[t].cite || CARDS[t].title);
      if (hits[t]) s.classList.add("hit");
      qtrail.appendChild(s);
    });
  }
  function pickQ(Q, btn) {
    activeQ = Q; hits = {};
    [].forEach.call(qbtns.children, function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
    qpanel.classList.add("on");
    qtext.textContent = "\u201c" + Q.q + "\u201d";
    qhint.textContent = Q.hint;
    qreveal.classList.remove("on");
    qdisc.classList.remove("on"); qdisc.innerHTML = "";
    renderTrail();
    clearAll();
    spawn(Q.seed, null);
    if (window.ExportReflect) ExportReflect.log("Chose starter question", Q.btn);
  }
  QUESTIONS.forEach(function (Q) {
    var b = document.createElement("button");
    b.className = "qbtn"; b.type = "button"; b.textContent = Q.btn;
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", function () { pickQ(Q, b); });
    qbtns.appendChild(b);
  });
  qreveal.addEventListener("click", function () {
    qdisc.innerHTML = activeQ.disc;
    qdisc.classList.add("on");
    qreveal.classList.remove("on");
    if (window.ExportReflect) ExportReflect.log("Opened discussion", activeQ.btn);
  });

  window.addEventListener("resize", redraw);

  if (window.ExportReflect) {
    ExportReflect.mount(document.getElementById("export-slot"), {
      module: "The ADA Canvas",
      chapter: "Chapter 8 \u2014 Researching Across Sources",
      intro: "You mapped the ADA's public-accommodation rules across statute, regulation, and case law.",
      prompts: [
        "Pick one edge on your map and explain in a sentence why those two sources are connected.",
        "The golf-cart question is answered; the website question is open. What in the sources themselves tells you which is which?",
        "Gil v. Winn-Dixie was published, then vacated as moot. What does that do to a researcher's obligations in the Eleventh Circuit?"
      ]
    });
  }
})();
