(function () {
  var el = LP.el, app = document.getElementById("app");
  LP.mountChrome("workflow");

  app.appendChild(el("section", { class: "reveal" }, [
    el("p", { class: "eyebrow" }, ["The process"]),
    el("h1", {}, ["How Each Source Is Made"]),
    el("p", { class: "lede" }, ["Every legal source travels a path from idea to binding law. Click any stage to see what it is and why it matters."])
  ]));

  window.SOURCES.sources.forEach(function (src, si) {
    var c = LP.sourceColor(src.id);
    var section = el("section", {
      class: "flow-section reveal d" + Math.min(si + 1, 6),
      style: "--accent:" + c.accent + ";--accent-tint:" + c.tint,
      "aria-label": "How " + src.title.toLowerCase() + " are made"
    });

    section.appendChild(el("div", { class: "flow-head" }, [
      el("h2", {}, [src.title]),
      el("span", { class: "role" }, [src.role])
    ]));

    var flow = el("div", { class: "flow" });
    var buttons = [];

    src.workflow.forEach(function (stage, idx) {
      var btn = el("button", {
        class: "stage-btn", type: "button", "aria-expanded": "false",
        "aria-controls": src.id + "-detail"
      }, [
        el("span", { class: "step" }, ["Stage " + (idx + 1)]),
        el("span", { class: "name" }, [stage.label])
      ]);
      buttons.push(btn);
      btn.addEventListener("click", function () { toggle(idx); });

      flow.appendChild(el("div", { class: "stage" }, [btn]));
      if (idx < src.workflow.length - 1) {
        flow.appendChild(el("div", { class: "stage-arrow", "aria-hidden": "true" }, ["\u2192"]));
      }
    });

    var detail = el("div", { class: "stage-detail", id: src.id + "-detail", role: "region", "aria-live": "polite" });

    function toggle(idx) {
      var stage = src.workflow[idx];
      var alreadyOpen = buttons[idx].getAttribute("aria-expanded") === "true";
      buttons.forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
      if (alreadyOpen) { detail.classList.remove("open"); detail.style.maxHeight = "0px"; return; }
      buttons[idx].setAttribute("aria-expanded", "true");
      detail.innerHTML = "";
      detail.appendChild(el("h4", {}, [stage.label]));
      detail.appendChild(el("p", {}, [stage.brief]));
      detail.appendChild(el("p", { class: "use" }, [el("b", {}, ["Why it matters \u2014 "]), stage.use]));
      detail.classList.add("open");
      detail.style.maxHeight = detail.scrollHeight + 40 + "px";
    }

    // Section-level "Learn more" — points to this source's deep-dive page,
    // since the deep dive is about the source as a whole, not a single stage.
    var more = el("div", { class: "flow-more" }, [
      el("a", { href: "source.html?id=" + src.id }, [
        "Learn more about " + src.title.toLowerCase() + " \u2192"
      ])
    ]);

    section.appendChild(flow);
    section.appendChild(detail);
    section.appendChild(more);
    app.appendChild(section);
  });

  // Page-to-page movement is handled by the shared bottom pager (mountChrome),
  // so every page advances the same way.
})();
