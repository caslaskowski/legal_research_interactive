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
    "practice.json": "PRACTICE",
    "quiz.json": "QUIZ",
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

# Derived navigation registry used by common.js — must cover EVERY id the
# suite header requests (home/hierarchy/quiz + practice/rank/courts + drills),
# or header construction throws on page load.
drills = load("drill.json")
rankd = load("rank.json")
courtsd = load("courts.json")
nav = [{"id": "home", "label": "Home", "page": "index.html"}]
for n in home["nav"]:
    nav.append({"id": n["id"], "label": n["label"], "page": n["page"]})
have = {n["id"] for n in nav}
extras = [
    ("quiz", "Knowledge Check", "quiz.html"),
    ("practice", "Applying the Hierarchy", "practice.html"),
    ("rank", rankd.get("title", "Rank the Authorities"), "rank.html"),
    ("courts", courtsd.get("title", "Courts & Reporters"), "courts.html"),
]
for did, d in (drills or {}).items():
    extras.append((did, d.get("title", did.replace("-", " ").title()), "drill.html?type=" + did))
for i, lbl, page in extras:
    if i not in have:
        nav.append({"id": i, "label": lbl, "page": page})
out.append("window.NAV = %s;\n" % json.dumps(nav, ensure_ascii=False, indent=2))

(HERE / "js" / "data.js").write_text("\n".join(out), encoding="utf-8")
print("rebuilt js/data.js from", len(MAP), "data files")
