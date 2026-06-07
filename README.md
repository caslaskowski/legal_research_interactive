# The Question Method of Legal Research — Interactive Modules

A static, GitHub Pages–hostable site of interactive legal-research modules, organized
to match the *Question Method of Legal Research* textbook by Cas Laskowski (Firebrand).

The **home page** is a chapter index. Each chapter has **its own page** listing the
interactive modules for that chapter. A chapter can hold more than one module, and
modules that have not been built yet appear as labeled placeholders until they ship.

All content is local to the repository — no analytics, no trackers, no third-party
data collection — so the site is FERPA-safe to host as-is. Pages are built for
accessibility (skip link, semantic headings, visible focus states, reduced-motion
support, and adequate color contrast).

## Layout

```
/
├── index.html              ← home: the Question Method in brief + chapter index by Part
├── chapter.html            ← one template that renders any chapter, keyed by ?ch=N
├── assets/firebrand.css    ← the shared brand design system (one source of truth)
├── build_registry.py       ← regenerates data/registry.json + js/registry.js together
├── data/registry.json      ← THE content file: suite text, method, parts, chapters, modules
├── js/
│   ├── portal.js           ← renders the home chapter index
│   ├── chapter.js          ← renders a single chapter page + its module list/placeholders
│   └── registry.js         ← auto-generated mirror of data/registry.json (do not hand-edit)
└── modules/
    ├── sources/            ← Ch. 1 — "How Law Is Made" (live)
    ├── question-method/    ← Ch. 3 — Notice-of-Claim research sandbox (live draft)
    └── question_chain/     ← Ch. 3 — Working the Chain, forward & reverse (live draft)
```

Chapter numbering and Part assignments follow the textbook exactly:
**Part I** = Chapters 1–9, **Part II** = Chapters 10–16, **Part III** = Chapters 17–18.

## How content flows

`data/registry.json` is the single source of truth. `build_registry.py` writes it and
also regenerates `js/registry.js`, an identical copy wrapped as `window.REGISTRY = …`.
The classic-script mirror is what lets the site work when you open the files directly
(`file://`) with no server. The pages render entirely from that object, so editing the
registry updates the home page, every chapter page, and every placeholder at once.

## Adding or updating a module (no hand-coding)

1. Open `build_registry.py` and find the chapter in the `chapters` list. Each chapter has:
   - `ch`, `part` (`"I"` / `"II"` / `"III"`), `slug`, `title`, `desc`
   - a `modules` list. Each module has:
     - `status`: `"live"` (built), `"dev"` (being built), or `"plan"` (planned)
     - `title`, `desc`, `slug`
     - `href` (live modules only — the path to the module's `index.html`)
     - `note` (optional small label, e.g. `"Draft"`)
     - `will` (optional bullet list shown on placeholders: "what this module will let you do")

2. Add or edit a module object inside the right chapter's `modules` list.

3. Regenerate both files:

   ```
   python3 build_registry.py
   ```

   (Don't edit `js/registry.js` by hand — it is overwritten each run.)

When a module is ready: drop it under `modules/<slug>/`, set its `status` to `"live"`,
add its `href`, and rebuild. Planned and in-development modules need no file of their
own — they render as placeholders right on the chapter page.

## Host on GitHub Pages

Repo → **Settings → Pages → Build from branch** → pick your branch and `/ (root)`.
Your URL will be `https://<user>.github.io/<repo>/`.

## Local preview

Open `index.html` directly in a browser — no server required. Content loads from the
classic-script mirror (`js/registry.js`), so double-clicking works. An internet
connection is used only to fetch the web fonts.

## Built modules

- **Ch. 1 · How Law Is Made — A 1L Primer** (`modules/sources/`)
- **Ch. 3 · Notice of Claim — Research Sandbox** (`modules/question-method/`, draft)
- **Ch. 3 · Working the Chain — Forward & Reverse** (`modules/question_chain/`, draft)

Everything else is a placeholder, with its planned scope described on the chapter page.
