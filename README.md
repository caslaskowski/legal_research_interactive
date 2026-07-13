# The Question Method of Legal Research — Interactive Modules

A static, GitHub Pages–hostable site of interactive legal-research modules, organized
to match the *Question Method of Legal Research* textbook by Cas Laskowski. The modules
are **supplementary reinforcement** of the book's concepts — the book's own drills and
demonstrations are worked outside this site.

The **home page** is a chapter index. Every chapter has a **static page** at `/ch-N/`
listing that chapter's modules; modules not yet built appear as labeled placeholders.
Modules live inside their chapter's directory — `/ch-2/database-interface/` — so the
URL itself teaches the chapter mapping. Every old `/modules/<slug>/` address keeps a
redirect stub, so links already in syllabi and the LMS continue to work. If a future
edition renumbers chapters, the stub pattern is how those links survive too.

<<<<<<< HEAD
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
=======
## Privacy (FERPA) and accessibility — standing mandates

All content is local to the repository. **The site makes zero external requests**: fonts
are self-hosted in `assets/fonts/` (Archivo, IBM Plex Mono, Newsreader), there are no
analytics, no trackers, and no CDNs — `build.py` fails the build if any third-party
host sneaks in. Student work never leaves the browser: modules persist answers in
`localStorage`/`sessionStorage` only, disclose that with a visible notice and a
"Clear my saved work" control (`js/lib.js`), and let students download their own
record to submit (`js/export-reflect.js`, or a module's richer bespoke export).

Every page ships a skip link, semantic headings, visible focus states, a
`prefers-reduced-motion` override, WCAG AA color contrast (asserted in the build),
and `aria-live` regions on dynamic feedback. A GitHub Action runs pa11y (WCAG 2 AA)
over every page on every push.
>>>>>>> 0fcdfe816c7fb7bd63a2c5d81276b5151bee3f23

## Layout

```
/
<<<<<<< HEAD
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
=======
├── index.html               ← home: the method in brief + chapter index + appendices
├── about.html
├── chapter.html             ← redirect shim for old ?ch=N links → /ch-N/
├── ch-1/ … ch-17/           ← static chapter pages (generated) — each chapter's
│   └── <slug>/              ← modules live INSIDE their chapter's directory
├── assets/
│   ├── firebrand.css        ← the shared design system (one source of truth)
│   └── fonts/               ← self-hosted woff2 (the site's only fonts)
├── partials/                ← _head/_masthead/_footer shell fragments
├── data/registry.json       ← THE content file: suite, method, parts, chapters,
│                              modules, appendices
├── js/
│   ├── registry.js          ← generated mirror of registry.json (do not hand-edit)
│   ├── portal.js            ← renders the home page from the registry
│   ├── lib.js               ← shared helpers: el(), live regions, storage notice
│   ├── export-reflect.js    ← download-your-own-record submission component
│   └── research-log.js      ← the book's eight-field Research Log; ONE log,
│                              shared across every module that mounts it
├── build.py                 ← ONE entry point: registry → site → validation checks
├── build_registry.py        ← regenerates js/registry.js from data/registry.json
├── build_site.py            ← assembles the shell, generates /ch-N/, injects module nav
├── appendices/<slug>/       ← appendix-only modules (glossary flashcards)
└── modules/<slug>/          ← redirect stubs only — modules moved to ch-N/<slug>/
>>>>>>> 0fcdfe816c7fb7bd63a2c5d81276b5151bee3f23
```

Chapter numbering and Part assignments follow the textbook exactly:
**Part I** = Chapters 1–9, **Part II** = Chapters 10–17. The appendices (A–D reading
guides, plus the glossary flashcards) are cross-listed on the home page and menu.

## How content flows

<<<<<<< HEAD
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
=======
`data/registry.json` is the single source of truth — edit it by hand, then run the
build. It drives the home page, the browse-modules menu on every page, every static
`/ch-N/` page, and the prev/next module navigation injected at the foot of each
module. `js/registry.js` is a generated mirror; never hand-edit it.

## Build

```
python3 build.py
```

That runs `build_registry.py`, then `build_site.py`, then the validation checks
(no third-party hosts anywhere; every registry href resolves; every live module has
shell markers; every internal link resolves; the contrast tokens haven't regressed).
CI runs the same command and fails if the committed output is stale — so always
commit after building. `python3 build.py --check` runs only the checks.

## Adding or updating a module — the checklist

Every new module must satisfy all of these before it ships. The two module
generations diverged because these conventions were implicit; now they're the law.

1. **Registry entry** in `data/registry.json` under its chapter, with `status`,
   `type` (`orientation` or `practice`), `slug`, `href`, `title`, `desc` — and
   `verified: "YYYY-MM-DD"` if the module states real law.
2. **Shell markers** present (`shell:head`, `shell:masthead`, `shell:footer`);
   run `python3 build.py` and commit the assembled page.
3. **`firebrand.css` only** — no duplicated design tokens. Module-specific styles
   go in a short inline block; legacy token names alias the shared ones.
4. **Title convention**: `{Module} — Ch. {N} · {Chapter title}`. Draft status goes
   in the registry `note` badge, never the title.
5. **Zero external requests.** Fonts come from `assets/fonts/`; the build fails
   otherwise.
6. **Submission path — every module has a meaningful downloadable record** a
   student can turn in: mount `ExportReflect` (or a richer bespoke export in its
   spirit — decisions, scores, and reflections, not click tracking) with at least
   one reflection prompt. Chain-style modules should also mount `ResearchLog`
   (`js/research-log.js`): one shared log that follows the student between
   modules, matching the book's eight-field template.
7. **Storage disclosure**: if the module persists anything, mount
   `QM.storageNotice(...)` from `js/lib.js`.
8. **Feedback is audible**: every dynamic right/wrong container carries
   `role="status" aria-live="polite"`, created *before* content is injected.
9. **Chain-style mechanics teach the method**: the next question does not unlock
   until the current answer is recorded, and distractors are keyed to the named
   anti-patterns (a compressed leap, a term of art not yet surfaced, a sibling
   asked before its parent) with feedback naming the anti-pattern. Wherever
   question types are named, use the book's exact vocabulary — definitional;
   exploratory (no-clue / foundational / survey); focusing; application
   (fact-finding / constructive) — never near-synonyms, and never
   hypothesis-testing framing anywhere.
10. **Accessibility passes**: keyboard operability, one `<h1>`, reduced-motion
    override, and a clean pa11y run (CI enforces this).
11. **Hypo provenance documented**: a comment noting which textbook chapter or
    appendix the module implements, and — if it states real law — the
    "Authorities verified as of {date}" line rendered via the registry.
>>>>>>> 0fcdfe816c7fb7bd63a2c5d81276b5151bee3f23

## Host on GitHub Pages

Settings → Pages → deploy from the `main` branch root. No build step is required at
deploy time; the committed output is the site.

## Local preview

<<<<<<< HEAD
Open `index.html` directly in a browser — no server and **no internet connection**
required. Content loads from the classic-script mirror (`js/registry.js`) and all
fonts are local.
=======
Any static server works (`python3 -m http.server`), and every page also opens
directly from `file://`.
>>>>>>> 0fcdfe816c7fb7bd63a2c5d81276b5151bee3f23
