#!/usr/bin/env python3
"""Assemble the shared shell into every page that opts in, generate the static
per-chapter pages, and inject module prev/next navigation.

Managed regions (filled and re-filled on every run — idempotent):
    <!--shell:head:start--><!--shell:head:end-->          inside <head>
    <!--shell:masthead:start--><!--shell:masthead:end-->  right after <body ...>
    <!--shell:footer:start--><!--shell:footer:end-->      before the page scripts
    <!--shell:modnav:start--><!--shell:modnav:end-->      module prev/next nav
                    (auto-inserted before the footer on registry module pages)

Shell markup lives in partials/_head.html, _masthead.html, _footer.html.
The "Browse modules" menu and every /ch-N/ chapter page are generated from
data/registry.json, so registry edits update the whole site on rebuild.

Run:  python3 build_site.py        (or just: python3 build.py)
"""
import os, re, html, json

HERE = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(HERE, "data", "registry.json"), encoding="utf-8") as _f:
    R = json.load(_f)

PARTIALS = os.path.join(HERE, "partials")
def _load(name):
    with open(os.path.join(PARTIALS, name), encoding="utf-8") as f:
        return re.sub(r"^<!--.*?-->\s*", "", f.read(), count=1, flags=re.S)

HEAD     = _load("_head.html")
MASTHEAD = _load("_masthead.html")
FOOTER   = _load("_footer.html")

TAGLINE = html.escape(R.get("suite", {}).get("tagline", ""))
CHAPTERS = sorted(R.get("chapters", []), key=lambda c: c["ch"])

def esc(s): return html.escape(s or "", quote=True)
def base_for(relpath): return "../" * relpath.replace("\\", "/").count("/")
def ch_url(base, ch): return "%sch-%d/" % (base, ch)

# ---- module ordering index (for prev/next nav) -----------------------------
MOD_INDEX = {}   # href -> dict(chapter, i, mods)
for c in CHAPTERS:
    live = [m for m in c.get("modules", []) if m.get("status") == "live" and m.get("href")]
    for i, m in enumerate(live):
        MOD_INDEX.setdefault(m["href"], {"chapter": c, "i": i, "mods": live, "mod": m})

# ---- browse-modules menu ---------------------------------------------------
def build_menu(base, current_rel):
    parts = R.get("parts", [])
    cols = []
    for part in parts:
        ch_in = [c for c in CHAPTERS if c.get("part") == part["id"]]
        if not ch_in:
            continue
        rows = []
        for c in ch_in:
            live = [m for m in c.get("modules", [])
                    if m.get("status") == "live" and m.get("href")]
            mods_html = ""
            if live:
                lis = []
                for m in live:
                    href = m["href"]
                    cur = ' aria-current="page"' if href == current_rel else ""
                    lis.append('                  <li><a href="%s%s"%s>%s</a></li>'
                               % (base, esc(href), cur, esc(m["title"])))
                mods_html = ('\n                <ul class="modmenu-mods">\n'
                             + "\n".join(lis) + '\n                </ul>')
            rows.append('              <li class="modmenu-chap">\n'
                        '                <a href="%s"><span class="cn">%d</span> %s</a>%s\n'
                        '              </li>'
                        % (ch_url(base, c["ch"]), c["ch"], esc(c["title"]), mods_html))
        cols.append('            <section class="modmenu-part">\n'
                    '              <h2>Part %s &middot; %s</h2>\n'
                    '              <ul class="modmenu-chaps">\n'
                    % (esc(part["id"]), esc(part.get("name", "")))
                    + "\n".join(rows)
                    + '\n              </ul>\n            </section>')
    ap = R.get("appendices")
    if ap and ap.get("items"):
        lis = []
        for a in ap["items"]:
            cur = ' aria-current="page"' if a.get("href") == current_rel else ""
            lis.append('              <li class="modmenu-chap"><a href="%s%s"%s>'
                       '<span class="cn">%s</span> %s</a></li>'
                       % (base, esc(a.get("href", "")), cur, esc(a["id"]), esc(a["title"])))
        cols.append('            <section class="modmenu-part">\n'
                    '              <h2>%s</h2>\n'
                    '              <ul class="modmenu-chaps">\n'
                    % esc(ap.get("eyebrow", "Appendices"))
                    + "\n".join(lis)
                    + '\n              </ul>\n            </section>')
    return "\n".join(cols)

# ---- static chapter pages ---------------------------------------------------
STATUS = {"live": ("live", "Available"), "dev": ("dev", "In development"),
          "plan": ("plan", "Planned")}

def mod_card(m, base):
    cls, label = STATUS.get(m.get("status"), STATUS["plan"])
    live = m.get("status") == "live" and m.get("href")
    body = ['      <div class="mod-head"><h3 class="mod-title">%s</h3>'
            '<span class="pill %s">%s</span></div>' % (esc(m["title"]), cls, label)]
    if m.get("desc"):
        body.append('      <p class="mod-desc">%s</p>' % esc(m["desc"]))
    if m.get("will"):
        lis = "".join("<li>%s</li>" % esc(w) for w in m["will"])
        body.append('      <div class="mod-willwrap"><p class="mod-willhead">'
                    'What this module will let you do</p><ul class="mod-will">%s</ul></div>' % lis)
    if live:
        body.append('      <span class="mod-open" aria-hidden="true">Open module \u2192</span>')
        return ('    <a class="mod-card is-live" href="%s%s" aria-label="Open module: %s">\n%s\n    </a>'
                % (base, esc(m["href"]), esc(m["title"]), "\n".join(body)))
    note = ("This interactive module is being built now \u2014 check back soon."
            if m.get("status") == "dev"
            else "This module is planned. The chapter exists in the textbook; "
                 "the interactive version is on the way.")
    body.append('      <p class="mod-note">%s</p>' % note)
    return '    <div class="mod-card is-%s">\n%s\n    </div>' % (m.get("status", "plan"), "\n".join(body))

def mod_section(heading, subhead, items, base):
    if not items:
        return ""
    cards = "\n".join(mod_card(m, base) for m in items)
    return ('  <div class="mod-section">\n'
            '    <div class="mod-sectionhead"><h2>%s</h2>'
            '<span class="mod-count">%s</span></div>\n'
            '    <div class="mod-list">\n%s\n    </div>\n  </div>'
            % (esc(heading), esc(subhead), cards))

def chapter_page(c):
    base = "../"
    mods = c.get("modules", [])
    orient = [m for m in mods if m.get("type") == "orientation"]
    prac   = [m for m in mods if m.get("type") == "practice"]
    other  = [m for m in mods if not m.get("type")]
    idx = CHAPTERS.index(c)
    prev = CHAPTERS[idx - 1] if idx > 0 else None
    nxt  = CHAPTERS[idx + 1] if idx < len(CHAPTERS) - 1 else None
    nav = ['  <nav class="ch-nav" aria-label="Chapter navigation">']
    nav.append('    <a class="ch-nav-link prev" href="../ch-%d/"><span class="ch-nav-dir">'
               '\u2190 Previous</span><span class="ch-nav-title">Ch. %d \u00b7 %s</span></a>'
               % (prev["ch"], prev["ch"], esc(prev["title"])) if prev else '    <span></span>')
    nav.append('    <a class="ch-nav-link next" href="../ch-%d/"><span class="ch-nav-dir">'
               'Next \u2192</span><span class="ch-nav-title">Ch. %d \u00b7 %s</span></a>'
               % (nxt["ch"], nxt["ch"], esc(nxt["title"])) if nxt else '    <span></span>')
    nav.append('  </nav>')
    sections = (mod_section("Orientation", "Explore the concepts from this chapter", orient, base)
                + "\n" + mod_section("Practice", "Apply what you\u2019ve learned", prac, base)
                + "\n" + mod_section("Modules", "", other, base))
    title = "Chapter %d: %s \u2014 The Question Method of Legal Research" % (c["ch"], c["title"])
    return """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%s</title>
<meta name="description" content="%s">
<!--shell:head:start-->
<!--shell:head:end-->
</head>
<body class="shell">
<!--shell:masthead:start-->
<!--shell:masthead:end-->

<main id="main">
  <div class="wrap" id="chapter">
  <a class="cs-back" href="../index.html">\u2190 All chapters</a>
  <header class="ch-header">
    <h1>Chapter %d: %s</h1>
    <p class="ch-lede measure">%s</p>
  </header>
%s
%s
  </div>
</main>

<!--shell:footer:start-->
<!--shell:footer:end-->
</body>
</html>
""" % (esc(title), esc(c.get("desc", "")), c["ch"], esc(c["title"]), esc(c.get("desc", "")),
       sections, "\n".join(nav))

def emit_chapter_pages():
    for c in CHAPTERS:
        d = os.path.join(HERE, "ch-%d" % c["ch"])
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as f:
            f.write(chapter_page(c))
    print("chapter pages: %d written (ch-1/ \u2026 ch-%d/)" % (len(CHAPTERS), CHAPTERS[-1]["ch"]))

# ---- modnav (module prev/next) ----------------------------------------------
def build_modnav(rel, base):
    info = MOD_INDEX.get(rel)
    if not info:
        return None
    c, i, mods, m = info["chapter"], info["i"], info["mods"], info["mod"]
    parts = ['<nav class="modnav" aria-label="Module navigation">',
             '  <p class="modnav-crumb">Part of <a href="%s">Ch. %d \u00b7 %s</a></p>'
             % (ch_url(base, c["ch"]), c["ch"], esc(c["title"]))]
    if m.get("verified"):
        parts.append('  <p class="modnav-verified">Authorities verified as of %s. '
                     'The law changes \u2014 run the method, don\u2019t trust the module.</p>'
                     % esc(m["verified"]))
    links = []
    if i > 0:
        p = mods[i - 1]
        links.append('    <a class="modnav-link prev" href="%s%s"><span class="dir">\u2190 Previous</span>'
                     '<span class="t">%s</span></a>' % (base, esc(p["href"]), esc(p["title"])))
    else:
        links.append('    <span></span>')
    if i < len(mods) - 1:
        n = mods[i + 1]
        links.append('    <a class="modnav-link next" href="%s%s"><span class="dir">Next \u2192</span>'
                     '<span class="t">%s</span></a>' % (base, esc(n["href"]), esc(n["title"])))
    else:
        idx = CHAPTERS.index(c)
        if idx < len(CHAPTERS) - 1:
            nc = CHAPTERS[idx + 1]
            links.append('    <a class="modnav-link next" href="%s"><span class="dir">Next chapter \u2192</span>'
                         '<span class="t">Ch. %d \u00b7 %s</span></a>'
                         % (ch_url(base, nc["ch"]), nc["ch"], esc(nc["title"])))
        else:
            links.append('    <span></span>')
    parts.append('  <div class="modnav-links">\n%s\n  </div>' % "\n".join(links))
    parts.append('</nav>')
    return "\n".join(parts)

# ---- page assembly -----------------------------------------------------------
GFONTS = re.compile(r'^\s*<link[^>]*(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*>\s*\n', re.M)

def _region(name, content):
    s, e = "<!--shell:%s:start-->" % name, "<!--shell:%s:end-->" % name
    pat = re.compile(re.escape(s) + r".*?" + re.escape(e), re.S)
    return pat, s + "\n" + content.rstrip("\n") + "\n" + e

def process(path):
    rel = os.path.relpath(path, HERE).replace("\\", "/")
    src = open(path, encoding="utf-8").read()
    if "<!--shell:masthead:start-->" not in src:
        return False
    base = base_for(rel)
    src = GFONTS.sub("", src)

    cur_home  = ' aria-current="page"' if rel == "index.html" else ""
    cur_about = ' aria-current="page"' if rel == "about.html" else ""
    head = HEAD.replace("{{BASE}}", base)
    mast = (MASTHEAD.replace("{{MENU}}", build_menu(base, rel)).replace("{{BASE}}", base)
            .replace("{{CUR_HOME}}", cur_home).replace("{{CUR_ABOUT}}", cur_about))
    foot = FOOTER.replace("{{TAGLINE}}", TAGLINE)

    # auto-insert the modnav region on registry module pages that lack it
    modnav = build_modnav(rel, base)
    if modnav and "<!--shell:modnav:start-->" not in src and "<!--shell:footer:start-->" in src:
        src = src.replace("<!--shell:footer:start-->",
                          "<!--shell:modnav:start--><!--shell:modnav:end-->\n\n<!--shell:footer:start-->", 1)

    regions = [("head", head), ("masthead", mast), ("footer", foot)]
    if modnav:
        regions.append(("modnav", modnav))
    for name, content in regions:
        pat, block = _region(name, content)
        src = pat.sub(lambda m: block, src, count=1)

    open(path, "w", encoding="utf-8").write(src)
    return True

def main():
    emit_chapter_pages()
    n = 0
    for root, dirs, files in os.walk(HERE):
        if "/.git" in root or "/partials" in root:
            continue
        for fn in files:
            if fn.endswith(".html") and process(os.path.join(root, fn)):
                n += 1
    print("assembled %d page(s)" % n)

if __name__ == "__main__":
    main()
