# The Question Method of Legal Research — Interactive Modules

A static, GitHub Pages–hostable **hub** that links to interactive legal-research
modules, one per chapter of the *Question Method of Legal Research* textbook.
Built by Cas Laskowski (Firebrand).

## Layout

```
/
├── index.html              ← the hub (GitHub Pages landing page)
├── coming-soon.html        ← shared placeholder for not-yet-built modules
├── assets/firebrand.css    ← the shared brand design system (one source of truth)
├── js/
│   ├── portal.js           ← renders the hub from the registry
│   ├── coming-soon.js      ← renders a placeholder from the registry
│   └── registry.js         ← auto-generated mirror of data/registry.json
├── data/registry.json      ← THE list of modules + statuses (edit this)
└── modules/
    ├── sources/            ← Ch. 1 — "How Law Is Made" (live)
    └── question-method/    ← Ch. 3 — Notice-of-Claim research sandbox (draft)
```

## Adding or updating a module (no code)

1. Edit `data/registry.json`. Each entry has:
   - `ch`, `part` (`I` / `II` / `III`), `title`, `desc`
   - `status`: `"live"`, `"dev"` (in development), or `"plan"` (planned)
   - `href` (only for `live` modules — the path to the module's `index.html`)
   - `will` (optional bullet list shown on the placeholder page)
   - `note` (optional small label, e.g. `"Draft"`)
2. Regenerate the classic-script mirror so the site works when opened locally:

   ```bash
   python3 - <<'PY'
   data = open('data/registry.json',encoding='utf-8').read().rstrip()
   open('js/registry.js','w',encoding='utf-8').write(
     "/* Auto-generated from data/registry.json — do not edit by hand. */\n\n"
     "window.REGISTRY = " + data + ";\n")
   print("rebuilt js/registry.js")
   PY
   ```

A `plan` or `dev` module needs no page of its own — the hub links it to
`coming-soon.html?ch=N`, which builds its holding page from the registry.
When a module is ready, drop it under `modules/<slug>/`, set `status` to
`"live"`, and add its `href`.

## Host on GitHub Pages

Repo → Settings → Pages → Build from branch → pick your branch and `/ (root)`.
Your URL will be `https://<user>.github.io/<repo>/`.

## Local preview

Open `index.html` directly in a browser — no server required. Content loads
from classic scripts (`registry.js`), so double-clicking works. An internet
connection is only used to fetch web fonts.
