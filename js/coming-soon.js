/* Renders the placeholder for a single chapter from window.REGISTRY, keyed by ?ch=N. */
(function () {
  "use strict";
  var R = window.REGISTRY || {};
  var host = document.getElementById("cs");

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k]; if (v == null) return;
      if (k === "class") n.className = v; else if (k === "html") n.innerHTML = v;
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

  var ft = document.getElementById("foot-tag");
  if (ft && R.suite) ft.textContent = R.suite.tagline || "";

  var ch = parseInt(param("ch"), 10);
  var mod = (R.modules || []).filter(function (m) { return m.ch === ch; })[0];

  if (!mod) {
    host.appendChild(el("a", { class: "cs-back", href: "index.html" }, ["\u2190 All modules"]));
    host.appendChild(el("div", { class: "cs-card", style: "margin-top:20px" }, [
      el("h1", {}, ["Module not found"]),
      el("p", { class: "cs-sub" }, ["We couldn't find that chapter. Head back to the full list of modules."])
    ]));
    return;
  }

  var part = (R.parts || []).filter(function (p) { return p.id === mod.part; })[0];
  var inDev = mod.status === "dev";
  var statusCls = inDev ? "dev" : "plan";
  var statusLabel = inDev ? "In development" : "Planned";

  host.appendChild(el("a", { class: "cs-back", href: "index.html" }, ["\u2190 All modules"]));
  host.appendChild(el("p", { class: "cs-tag" }, [
    "Part " + mod.part + (part ? " \u00b7 " + part.name : "") + " \u00b7 Chapter " + mod.ch
  ]));

  var card = el("div", { class: "cs-card" });
  card.appendChild(el("h1", {}, [mod.title]));
  card.appendChild(el("p", { class: "cs-sub" }, [mod.desc || ""]));

  if (mod.will && mod.will.length) {
    var ul = el("ul");
    mod.will.forEach(function (w) { ul.appendChild(el("li", {}, [w])); });
    card.appendChild(el("div", { class: "cs-will" }, [
      el("h3", {}, ["What this module will let you do"]),
      ul
    ]));
  }

  card.appendChild(el("div", { class: "cs-status" }, [
    el("span", { class: "pill " + statusCls }, [statusLabel]),
    el("span", { class: "note" }, [
      inDev
        ? "This interactive module is being built now. Check back soon \u2014 it's constantly in beta."
        : "This module is planned. The chapter exists in the textbook; the interactive version is on the way."
    ])
  ]));

  host.appendChild(card);
  document.title = mod.title + " \u2014 In Development";
})();
