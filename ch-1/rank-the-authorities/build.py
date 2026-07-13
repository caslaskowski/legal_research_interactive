#!/usr/bin/env python3
"""Compile data/*.json into js/data.js as classic-script window globals.

data/*.json is the single hand-edited source of truth for this module's
content. Run after editing any file in data/ so the module works when
index.html is opened directly (no server):

    python3 build.py

(Do not edit js/data.js by hand — it is overwritten here. If you ever must
hot-fix data.js, back-port the change to the matching data/*.json file.)
"""
import json
import pathlib

HERE = pathlib.Path(__file__).parent
DATA = HERE / "data"

# JSON file -> window global name (order matters: NAV last, used by common.js)
MAP = {
    "home.json": "HOME",
    "hierarchy.json": "HIERARCHY",
    "drill.json": "DRILLS",
    "rank.json": "RANK",
    "courts.json": "COURTS",
    "practice.json": "PRACTICE",
    "quiz.json": "QUIZ",
    "companion.json": "COMPANION",
<<<<<<< HEAD:modules/rank-the-authorities/build.py
    "nav.json": "NAV",
=======
    "practice.json": "PRACTICE",
    "quiz.json": "QUIZ",
>>>>>>> 0fcdfe816c7fb7bd63a2c5d81276b5151bee3f23:ch-1/rank-the-authorities/build.py
}

def load(name):
    return json.loads((DATA / name).read_text(encoding="utf-8"))

out = ["/* Auto-generated from data/*.json by build.py \u2014 do not edit by hand. */\n"]
for fname, gname in MAP.items():
<<<<<<< HEAD:modules/rank-the-authorities/build.py
    out.append("window.%s = %s;\n" % (gname, json.dumps(load(fname), ensure_ascii=False, indent=2)))
=======
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
>>>>>>> 0fcdfe816c7fb7bd63a2c5d81276b5151bee3f23:ch-1/rank-the-authorities/build.py

(HERE / "js" / "data.js").write_text("\n".join(out), encoding="utf-8")
print("rebuilt js/data.js from", len(MAP), "data files")
