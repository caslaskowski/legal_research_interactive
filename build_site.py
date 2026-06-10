#!/usr/bin/env python3
"""Assemble the shared shell into every page that opts in.

A page opts in by placing three pairs of managed-region markers. The build
fills (and re-fills, on every run) the content between each start/end pair:
    <!--shell:head:start--><!--shell:head:end-->          inside <head>
    <!--shell:masthead:start--><!--shell:masthead:end-->  right after <body ...>
    <!--shell:footer:start--><!--shell:footer:end-->      before the page scripts

Because the markers persist, re-running after editing a partial updates every
page in place (idempotent). The shell markup lives in partials/_head.html,
_masthead.html, _footer.html (edit those once, rebuild, every page updates).
The "Browse modules" menu is generated here from the single registry source so
it stays in sync, and it is baked into static HTML on each page — no runtime
JS, correct for any page depth, and accessible with JavaScript disabled.

Run:  python3 build_site.py        (run build_registry.py first if content changed)
"""
import os, re, html

HERE = os.path.dirname(os.path.abspath(__file__))

# Single content source — the same file that feeds js/registry.js.
import json
with open(os.path.join(HERE, "data", "registry.json"), encoding="utf-8") as _f:
    R = json.load(_f)

PARTIALS = os.path.join(HERE, "partials")
def _load(name):
    with open(os.path.join(PARTIALS, name), encoding="utf-8") as f:
        # strip the leading explanatory comment block from each partial
        return re.sub(r"^<!--.*?-->\s*", "", f.read(), count=1, flags=re.S)

HEAD     = _load("_head.html")
MASTHEAD = _load("_masthead.html")
FOOTER   = _load("_footer.html")

TAGLINE = html.escape(R.get("suite", {}).get("tagline", ""))


def base_for(relpath):
    """Relative path from a page back to the repo root."""
    depth = relpath.replace("\\", "/").count("/")
    return "../" * depth


def esc(s):
    return html.escape(s or "", quote=True)


def build_menu(base, current_rel):
    """Generate the 'Browse modules' panel from the registry.
    current_rel is the page's path relative to repo root, used to mark the
    active module link with aria-current."""
    parts = R.get("parts", [])
    chapters = sorted(R.get("chapters", []), key=lambda c: c["ch"])
    cols = []
    for part in parts:
        ch_in = [c for c in chapters if c.get("part") == part["id"]]
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
                    lis.append(
                        '                  <li><a href="%s%s"%s>%s</a></li>'
                        % (base, esc(href), cur, esc(m["title"])))
                mods_html = (
                    '\n                <ul class="modmenu-mods">\n'
                    + "\n".join(lis)
                    + '\n                </ul>')
            rows.append(
                '              <li class="modmenu-chap">\n'
                '                <a href="%schapter.html?ch=%d">'
                '<span class="cn">%d</span> %s</a>%s\n'
                '              </li>'
                % (base, c["ch"], c["ch"], esc(c["title"]), mods_html))
        cols.append(
            '            <section class="modmenu-part" aria-label="Part %s — %s">\n'
            '              <p class="modmenu-ph" aria-hidden="true">Part %s &middot; %s</p>\n'
            '              <ul class="modmenu-chaps">\n'
            % (esc(part["id"]), esc(part.get("name", "")),
               esc(part["id"]), esc(part.get("name", "")))
            + "\n".join(rows)
            + '\n              </ul>\n'
            '            </section>')
    return "\n".join(cols)


GFONTS = re.compile(r'^\s*<link[^>]*(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*>\s*\n',
                    re.M)


def _region(name, content):
    s, e = "<!--shell:%s:start-->" % name, "<!--shell:%s:end-->" % name
    pat = re.compile(re.escape(s) + r".*?" + re.escape(e), re.S)
    block = s + "\n" + content.rstrip("\n") + "\n" + e
    return pat, block


def process(path):
    rel = os.path.relpath(path, HERE).replace("\\", "/")
    src = open(path, encoding="utf-8").read()
    if "<!--shell:masthead:start-->" not in src:
        return False

    base = base_for(rel)
    src = GFONTS.sub("", src)  # purge any third-party font CDN requests

    cur_home  = ' aria-current="page"' if rel == "index.html" else ""
    cur_about = ' aria-current="page"' if rel == "about.html" else ""

    head = HEAD.replace("{{BASE}}", base)
    mast = (MASTHEAD
            .replace("{{MENU}}", build_menu(base, rel))
            .replace("{{BASE}}", base)
            .replace("{{CUR_HOME}}", cur_home)
            .replace("{{CUR_ABOUT}}", cur_about))
    foot = FOOTER.replace("{{TAGLINE}}", TAGLINE)

    for name, content in (("head", head), ("masthead", mast), ("footer", foot)):
        pat, block = _region(name, content)
        src = pat.sub(lambda m: block, src, count=1)

    open(path, "w", encoding="utf-8").write(src)
    return True


def main():
    n = 0
    for root, dirs, files in os.walk(HERE):
        if "/.git" in root or "/partials" in root:
            continue
        for fn in files:
            if fn.endswith(".html") and process(os.path.join(root, fn)):
                rel = os.path.relpath(os.path.join(root, fn), HERE)
                print("  shell ->", rel)
                n += 1
    print("assembled %d page(s)" % n)


if __name__ == "__main__":
    main()
