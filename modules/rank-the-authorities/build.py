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
    "nav.json": "NAV",
}

def load(name):
    return json.loads((DATA / name).read_text(encoding="utf-8"))

out = ["/* Auto-generated from data/*.json by build.py \u2014 do not edit by hand. */\n"]
for fname, gname in MAP.items():
    out.append("window.%s = %s;\n" % (gname, json.dumps(load(fname), ensure_ascii=False, indent=2)))

(HERE / "js" / "data.js").write_text("\n".join(out), encoding="utf-8")
print("rebuilt js/data.js from", len(MAP), "data files")
