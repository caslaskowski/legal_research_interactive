#!/usr/bin/env python3
"""One-command build with validation.

    python3 build.py           build everything, then run the checks
    python3 build.py --check   run only the checks (used by CI)

Steps:
  1. build_registry.py   data/registry.json -> js/registry.js mirror
  2. build_site.py       shell assembly + static ch-N/ pages + module nav
  3. checks              fail loudly on the mistakes that have bitten us:
       - any third-party host in any HTML/CSS/JS (privacy: the site must
         make zero external requests)
       - a registry href that resolves to no file
       - a live registry module page missing its shell markers
       - internal links (href/src) that resolve to no file
       - the contrast tokens regressing to the old failing values
"""
import json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)

THIRD_PARTY = re.compile(
    r"(fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.|cdnjs\.|unpkg\.com|"
    r"jsdelivr\.net|googletagmanager|google-analytics)", re.I)
BAD_TOKENS = ("#86857d", "#9a6b1f")   # AC-01: the pre-fix failing contrast pairs

SKIP_DIRS = (".git", ".github", "partials")

def walk(exts):
    for root, dirs, files in os.walk(HERE):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for fn in files:
            if fn.endswith(exts):
                yield os.path.join(root, fn)

def check():
    errors = []

    # -- no third-party requests, no regressed tokens ------------------------
    for p in walk((".html", ".css", ".js")):
        s = open(p, encoding="utf-8", errors="replace").read()
        rel = os.path.relpath(p, HERE)
        m = THIRD_PARTY.search(s)
        if m:
            errors.append("third-party host '%s' in %s" % (m.group(1), rel))
        for tok in BAD_TOKENS:
            if tok in s:
                errors.append("failing contrast token %s regressed in %s" % (tok, rel))

    # -- registry integrity ---------------------------------------------------
    R = json.load(open("data/registry.json", encoding="utf-8"))
    for c in R.get("chapters", []):
        for mod in c.get("modules", []):
            if mod.get("status") == "live":
                href = mod.get("href")
                if not href or not os.path.exists(href):
                    errors.append("registry href missing on disk: %s (ch %s)" % (href, c["ch"]))
                elif "<!--shell:masthead:start-->" not in open(href, encoding="utf-8").read():
                    # the two JS-chromed suites render their own shell
                    if "/sources/" not in href and "/rank-the-authorities/" not in href:
                        errors.append("live module page lacks shell markers: %s" % href)
    for a in R.get("appendices", {}).get("items", []):
        if not os.path.exists(a.get("href", "")):
            errors.append("appendix href missing on disk: %s" % a.get("href"))

    # -- internal links resolve ----------------------------------------------
    ATTR = re.compile(r'(?:href|src)="([^"#?]+)(?:[#?][^"]*)?"')
    for p in walk((".html",)):
        base = os.path.dirname(p)
        s = open(p, encoding="utf-8", errors="replace").read()
        for target in ATTR.findall(s):
            if target.startswith(("http:", "https:", "mailto:", "data:", "javascript:")) or not target:
                continue
            t = os.path.normpath(os.path.join(base, target))
            if target.endswith("/"):
                t = os.path.join(t, "index.html")
            if not os.path.exists(t):
                errors.append("broken link %s -> %s" % (os.path.relpath(p, HERE), target))

    if errors:
        print("BUILD CHECK FAILED (%d):" % len(errors))
        for e in sorted(set(errors)):
            print("  \u2717", e)
        sys.exit(1)
    print("all checks passed \u2713")

def main():
    if "--check" not in sys.argv:
        subprocess.run([sys.executable, "build_registry.py"], check=True)
        subprocess.run([sys.executable, "build_site.py"], check=True)
        # module-level generators, folded into the pipeline (idempotent)
        gen = os.path.join("ch-1", "rank-the-authorities", "build.py")
        if os.path.exists(gen):
            subprocess.run([sys.executable, os.path.basename(gen)],
                           cwd=os.path.dirname(gen), check=True)
    check()

if __name__ == "__main__":
    main()
