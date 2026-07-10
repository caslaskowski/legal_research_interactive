# How Law Is Made — interactive 1L primer

A static, GitHub Pages–hostable module on the three basic sources of law:
**cases, statutes, and regulations** — what each is, how it's made, and when to use it.

## Try it locally
Just open `index.html` in a browser. No server needed — the content loads from
`js/data.js` (classic scripts), so double-clicking the file works. An internet
connection is only used to fetch the web fonts; without it, the site falls back
to system serifs.

## Host on GitHub Pages
1. Put the contents of this `site/` folder at the root of a repo (or in `/docs`).
2. Repo → Settings → Pages → Build from branch → pick the branch and folder.
3. Your URL will be `https://<user>.github.io/<repo>/`.

## Pages
- `index.html` — overview, objectives, navigation, companion-notes download, at-a-glance table
- `workflow.html` — clickable lifecycle for each source
- `source.html?id=statute|regulation|case` — full deep-dive (one template, three URLs)
- `connections.html` — how the sources interact (with examples)
- `quiz.html` — knowledge check with per-answer feedback

## Editing content (no coding)
All wording lives in the JSON files in `data/`. After editing them, regenerate
`js/data.js` (the file the site actually reads) by running, from `site/`:

```
python3 - <<'PY'
files=[("HOME","home.json"),("SOURCES","sources.json"),("CONNECTIONS","connections.json"),("QUIZ","quiz.json"),("COMPANION","companion.json")]
out=["/* Auto-generated from data/*.json */",""]
for v,fn in files:
    out.append(f"window.{v} = "+open('data/'+fn,encoding='utf-8').read().rstrip()+";\n")
open('js/data.js','w',encoding='utf-8').write("\n".join(out))
print("rebuilt js/data.js")
PY
```

Or just edit the objects directly in `js/data.js` — they mirror the JSON exactly.
