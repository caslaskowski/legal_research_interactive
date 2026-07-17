(function () {
  var el = LP.el, app = document.getElementById("app");
  var S = window.HIERARCHY.switchPage;
  LP.mountChrome("switch");

  /* intro */
  app.appendChild(el("section", { class: "reveal" }, [
    el("p", { class: "eyebrow" }, ["Jurisdiction lines cut both ways"]),
    el("h1", {}, ["Switch the Question \u2014 and the Court"]),
    el("p", { class: "lede measure" }, [S.intro])
  ]));

  /* the explorer (shared renderer with hierarchy.html) — retitle the section
     so the page hero and the explorer don't repeat each other */
  var F = {};
  Object.keys(S.explorer).forEach(function (k) { F[k] = S.explorer[k]; });
  F.eyebrow = "Binding vs. persuasive \u2014 round two";
  F.heading = "The same authorities, two very different courts";
  F.lede = "Pick the deciding court, then read down the list. Ask of each authority: does binding force run from that court to this one, on this question?";
  LP.renderForumExplorer(app, F, 0);
})();
