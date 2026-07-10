#!/usr/bin/env python3
"""Compile data/*.json into js/data.js as classic-script window globals.

Run after editing any file in data/ so the module works when index.html is
opened directly (no server). Mirrors the repo's registry build pattern.

    python3 build.py
"""
import json
import pathlib

HERE = pathlib.Path(__file__).parent
DATA = HERE / "data"

# JSON file -> window global name
MAP = {
    "home.json": "HOME",
    "hierarchy.json": "HIERARCHY",
    "drill.json": "DRILLS",
    "rank.json": "RANK",
    "courts.json": "COURTS",
    "companion.json": "COMPANION",
}

def load(name):
    return json.loads((DATA / name).read_text(encoding="utf-8"))

out = ["/* Auto-generated from data/*.json by build.py \u2014 do not edit by hand. */\n"]

home = None
for fname, gname in MAP.items():
    obj = load(fname)
    if fname == "home.json":
        home = obj
    out.append("window.%s = %s;\n" % (gname, json.dumps(obj, ensure_ascii=False, indent=2)))

# Derived navigation registry used by common.js (Home + the home-page nav items).
nav = [{"id": "home", "label": "Home", "page": "index.html"}]
for n in home["nav"]:
    nav.append({"id": n["id"], "label": n["label"], "page": n["page"]})
out.append("window.NAV = %s;\n" % json.dumps(nav, ensure_ascii=False, indent=2))

(HERE / "js" / "data.js").write_text("\n".join(out), encoding="utf-8")
print("rebuilt js/data.js from", len(MAP), "data files")
