#!/usr/bin/env python3
"""Generate js/registry.js from data/registry.json.

data/registry.json is the single hand-edited source of truth for all content
(suite text, the method steps, parts, chapters, and modules). The site loads
js/registry.js as a classic <script> so the pages render from file:// with no
server; this script keeps that mirror in sync.

Run after editing data/registry.json:  python3 build_registry.py
(Do not edit js/registry.js by hand — it is overwritten here.)
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(HERE, "data", "registry.json")
JS_PATH   = os.path.join(HERE, "js", "registry.js")


def main():
    with open(JSON_PATH, encoding="utf-8") as f:
        registry = json.load(f)
    blob = json.dumps(registry, ensure_ascii=False, indent=2)
    os.makedirs(os.path.dirname(JS_PATH), exist_ok=True)
    with open(JS_PATH, "w", encoding="utf-8") as f:
        f.write("/* Auto-generated from data/registry.json by build_registry.py "
                "\u2014 do not edit by hand. */\n\n")
        f.write("window.REGISTRY = " + blob + ";\n")

    chs = registry.get("chapters", [])
    nmod = sum(len(c.get("modules", [])) for c in chs)
    live = sum(1 for c in chs for m in c.get("modules", []) if m.get("status") == "live")
    print("chapters: %d   modules: %d   live: %d" % (len(chs), nmod, live))
    print("wrote", os.path.relpath(JS_PATH, HERE))


if __name__ == "__main__":
    main()
