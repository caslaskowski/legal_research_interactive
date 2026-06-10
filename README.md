# The Question Method of Legal Research — Interactive Modules

A static, GitHub Pages–hostable site of interactive legal-research modules, organized
to match the *Question Method of Legal Research* textbook by Cas Laskowski (Firebrand).

The **home page** is a chapter index. Each chapter has **its own page** listing the
interactive modules for that chapter. A chapter can hold more than one module, and
modules that have not been built yet appear as labeled placeholders until they ship.

## Privacy (FERPA) and accessibility

- **Everything is local.** No analytics, no trackers, no CDNs, and no third-party
  font requests — all fonts (Archivo, IBM Plex Mono, Newsreader) are self-hosted in
  `assets/fonts/` (Newsreader under the SIL OFL; see `NEWSREADER-OFL.txt`).
  Opening any page makes **zero network requests** beyond the page's own files.
- **Student work never leaves the device.** Modules that save progress (e.g., the
  Hierarchy of Authorities drills) use the browser's `localStorage` only. Every page
  footer discloses this and offers a **"Clear saved progress on this device"** button —
  useful on shared or library computers.
- **Accessibility.** Every page carries the shared shell: a skip link to `#main`,
  a single `<h1>` first in the heading order, semantic landmarks, visible focus
  states, `prefers-reduced-motion` support, text (not color-only) feedback, and
  button-based interactions rather than drag-and-drop.

## Layout

```
/
├── index.html              ← home: the Question Method in brief + chapter index by Part
├── chapter.html            ← one template that renders any chapter, keyed by ?ch=N
├── about.html              ← about page (placeholder for now)
├── coming-soon.html        ← legacy placeholder page (chapter pages now render
│                              placeholders inline)
├── assets/
│   ├── firebrand.css       ← the shared brand design system (one source of truth)
│   └── fonts/              ← self-hosted woff2 fonts (no external font requests)
├── partials/               ← the shared shell: _head.html, _masthead.html, _footer.html
├── build_registry.py       ← regenerates js/registry.js from data/registry.json
├── build_site.py           ← bakes the shared shell (head/masthead/footer + the
│                              "Browse modules" menu) into every page that opts in
├── data/registry.json      ← THE content file: suite text, method, parts, chapters, modules
├── js/
│   ├── portal.js           ← renders the home chapter index
│   ├── chapter.js          ← renders a single chapter page + its module list/placeholders
│   ├── coming-soon.js      ← renders the legacy placeholder page
│   ├── export-reflect.js   ← shared export/reflection helpers
│   └── registry.js         ← auto-generated mirror of data/registry.json (do not hand-edit)
└── modules/                ← one folder per built module (Chapters 1–9 all have
                               live modules; see data/registry.json for the full list)
```

Chapter numbering and Part assignments follow the textbook exactly:
**Part I** = Chapters 1–9, **Part II** = Chapters 10–16, **Part III** = Chapters 17–18.

## How content flows

`data/registry.json` is the single source of truth for site content. Two build steps
keep everything in sync — run both after editing the registry:

```
python3 build_registry.py   # regenerates js/registry.js (the classic-script mirror)
python3 build_site.py       # re-bakes the shared shell + module menu into every page
```

`js/registry.js` is what lets the site work when you open the files directly
(`file://`) with no server. `build_site.py` is idempotent: every page that contains
the `<!--shell:…-->` marker pairs gets its head, masthead (including the generated
"Browse modules" menu), and footer refreshed in place. **If you add a module or
change a title and the menus look stale, you forgot to run `build_site.py`.**

Two modules (`modules/sources/`, `modules/rank-the-authorities/`) additionally
generate their own `js/data.js` from local JSON; run that module's `build.py`
after editing its `data/*.json`.

## Adding or updating a module

1. Edit `data/registry.json`. Each chapter has `ch`, `part`, `slug`, `title`, `desc`,
   and a `modules` list. Each module has:
   - `status`: `"live"` (built), `"dev"` (being built), or `"plan"` (planned)
   - `type`: `"orientation"` or `"practice"`
   - `title`, `desc`, `slug` (use hyphens, not underscores)
   - `href` (live modules only — the path to the module's entry page)
   - `note` (optional small label, e.g. `"Draft"`)
   - `will` (optional bullet list shown on placeholders)
2. Drop the module under `modules/<slug>/`. In its HTML, include the three shell
   marker pairs (copy them from any existing module) and give the main landmark
   `id="main"` so the skip link works.
3. Rebuild: `python3 build_registry.py && python3 build_site.py`.

Planned and in-development modules need no files of their own — they render as
placeholders on their chapter page.

## Host on GitHub Pages

Repo → **Settings → Pages → Build from branch** → pick your branch and `/ (root)`.
Your URL will be `https://<user>.github.io/<repo>/`.

## Local preview

Open `index.html` directly in a browser — no server and **no internet connection**
required. Content loads from the classic-script mirror (`js/registry.js`) and all
fonts are local.
