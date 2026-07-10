/* Runtime smoke test: execute every page's inline scripts in a real DOM.
   Fails on any uncaught exception during load. */
const jsdomPath = require.resolve("jsdom", { paths: [process.cwd(), "/home/claude/smoketest"] });
const { JSDOM, VirtualConsole } = require(jsdomPath);
const fs = require("fs"), path = require("path");
const ROOT = process.cwd();

let pages = process.argv.slice(2);
if (!pages.length) {
  const reg = JSON.parse(fs.readFileSync(path.join(ROOT, "data/registry.json"), "utf-8"));
  const set = new Set();
  for (const c of reg.chapters || [])
    for (const m of c.modules || [])
      if (m.status === "live" && m.href) {
        const dir = path.join(ROOT, path.dirname(m.href));
        for (const f of fs.readdirSync(dir))
          if (f.endsWith(".html")) set.add(path.join(path.dirname(m.href), f));
      }
  for (const a of (reg.appendices && reg.appendices.items) || [])
    if (a.href && a.href.endsWith(".html")) set.add(a.href);
  pages = [...set].sort();
}
let failures = 0;

for (const rel of pages) {
  const full = path.join(ROOT, rel);
  let html = fs.readFileSync(full, "utf-8");
  // inline local script srcs so QM/ExportReflect/etc. exist
  html = html.replace(/<script[^>]*src="([^"]+)"[^>]*><\/script>/g, (m, src) => {
    if (/^https?:/.test(src)) return "";
    const p = path.resolve(path.dirname(full), src);
    try { return "<script>\n" + fs.readFileSync(p, "utf-8").replace(/<\/script/g, "<\\/script") + "\n</script>"; }
    catch (e) { return ""; }
  });
  const errs = [];
  const vc = new VirtualConsole();
  vc.on("jsdomError", e => { if (e.type !== "css parsing") errs.push(e.detail || e.message || String(e)); });
  try {
    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      url: "http://localhost/" + rel,
      pretendToBeVisual: true,
      virtualConsole: vc
    });
    // page-specific assertion: flashcards must render a card + chips
    if (rel.includes("glossary-flashcards")) {
      const face = dom.window.document.getElementById("face");
      const chips = dom.window.document.querySelectorAll(".chchip").length;
      if (!face || !face.textContent || face.textContent === "Loading\u2026" || face.textContent === "Loading...")
        errs.push("card never rendered");
      if (chips < 2) errs.push("chapter chips missing (" + chips + ")");
    }
  } catch (e) { errs.push(String(e && e.message || e)); }
  if (errs.length) {
    failures++;
    console.log("FAIL " + rel);
    errs.slice(0, 2).forEach(e => console.log("     " + String(e).split("\n")[0].slice(0, 160)));
  }
}
console.log(failures ? failures + " page(s) failed" : "all " + pages.length + " pages passed runtime smoke test \u2713");
process.exit(failures ? 1 : 0);
