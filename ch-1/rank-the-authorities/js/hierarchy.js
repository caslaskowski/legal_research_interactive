(function () {
  var el = LP.el, app = document.getElementById("app");
  var D = window.HIERARCHY;
  LP.mountChrome("hierarchy");

  /* intro */
  app.appendChild(el("section", { class: "reveal" }, [
    el("p", { class: "eyebrow" }, ["Orient"]),
    el("h1", {}, ["The Hierarchy"]),
    el("p", { class: "lede measure" }, [D.intro])
  ]));

  /* ---- the authority ladder (interactive) ---- */
  var P = D.pyramid;
  var ladderSection = el("section", { class: "reveal d1 block" }, [
    el("p", { class: "eyebrow" }, [P.eyebrow]),
    el("h2", {}, ["Higher law controls lower law"]),
    el("p", { class: "measure" }, [P.lede])
  ]);
  var ladder = el("ol", { class: "ladder", "aria-label": "Hierarchy of authority, highest first" });
  P.levels.forEach(function (lv, i) {
    var detailId = "rung-" + i;
    var btn = el("button", {
      class: "rung tier-" + lv.tier, type: "button",
      "aria-expanded": "false", "aria-controls": detailId
    }, [
      el("span", { class: "rung-rank", "aria-hidden": "true" }, [String(i + 1)]),
      el("span", { class: "rung-label" }, [lv.label]),
      el("span", { class: "rung-tier" }, [lv.tier]),
      el("span", { class: "rung-caret", "aria-hidden": "true" }, ["\u25be"])
    ]);
    var detail = el("div", { class: "rung-detail", id: detailId, hidden: "hidden" }, [el("p", {}, [lv.note])]);
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      if (open) {
        detail.classList.remove("open");
        detail.setAttribute("hidden", "hidden");
      } else {
        detail.removeAttribute("hidden");
        detail.classList.add("open");
      }
    });
    ladder.appendChild(el("li", {}, [btn, detail]));
  });
  ladderSection.appendChild(ladder);
  ladderSection.appendChild(el("p", { class: "callout measure" }, [P.note]));
  app.appendChild(ladderSection);

  /* ---- primary vs secondary ---- */
  var PS = D.primarySecondary;
  app.appendChild(el("section", { class: "reveal d2 block" }, [
    el("p", { class: "eyebrow" }, [PS.eyebrow]),
    el("h2", {}, ["The law itself, and the map to it"]),
    el("p", { class: "measure" }, [PS.body]),
    el("p", { class: "callout measure" }, [PS.callout])
  ]));

  /* ---- binding vs persuasive: first forum explorer ----
     (The second scenario — "Switch the Question — and the Court" — now lives on
     its own page, switch.html, so each page carries one idea.) */
  (D.forumExplorers || []).forEach(function (F, fi) {
    LP.renderForumExplorer(app, F, fi);
  });
})();
