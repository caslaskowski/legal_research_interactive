# Part II Build Notes — approved queue & standing decisions
*Working document for the module build-out. Updated 2026-07-10.*

## Approved queue (from the marked v2 plan)
Built: **10-P1 Catch the Fabricated Citation** · **12-L1 Trace the Bill** · **15-L1 How the Machine Guesses** · **15-P1 Verify the AI's Work** · **15-P2 Right Tool, Right Question** · Ch. 17 overview + Scholarship Research Checklist (chapter page, no modules — per rejection of 17-L1/17-P1).
Remaining, in build order: 10-L1 Duties Behind the Research → 13-L1 + 13-P1 (one dating pass for deference content) → 11-L1 + 11-P1 → 16-L1 + 16-P1 → 14-L1 + 14-P1 → 10-P2.
Ch. 15 fully approved 2026-07-10 and built the same day.

## Her comments to honor at build time
- **11-L1 Read the Docket:** surface the *unintuitive* parts — reverse chronology (newest entries first) and multi-part docket entries for a single filing (rare but real).
- **12-L1 Trace the Bill:** modeled on Ch. 1 / the statute chapter — process overview *plus* a per-source deep dive naming the questions each source answers and when it is useful. (Built to this spec.)
- **14-L1 Same Cycle:** reiterate the book's closure types — practice-specific research closes practically (non-analytically) more often than appellate work.
- **16-P1 Closed Universe:** model original research-focused questions on the released NextGen sample's *format* — research Q&A and the gaps only; ignore its writing elements. **Never reproduce NCBE content — format only, original materials (copyright).**

## Standing rules added this round
- Reflection prompts must not assume prior experience with legal sources — students are presumed new to all of it. Ask what surprised them, what they'll do, how they decided — never how this compares to their past habits.
- Callouts use the warm `--callout` parchment (#f5efe0), red border and red headers retained; the red tint is reserved for hover affordance and wrong-answer feedback.
- "How to Read a …" modules: engage steps render as a numbered strip at the top (home-page style) and each carries a "Work the Page" exercise — hold a question, click the part that answers it. No "Your question is" framing anywhere.
- Glossary flashcards filter by chapter (term→chapter derived from first appearance in the textbook).

## Runtime-integrity round (2026-07-10, prompted by the flashcards loading failure)
Three production bugs found and fixed by executing every live page in jsdom: the flashcards chapter filter ran before state loaded (init order); the rank suite's header requested nav ids the generator never emitted (crashed every suite page); and the suite's practice and quiz pages shipped without their data files (`practice.json`, `quiz.json` now authored, generator MAP extended, `navlink` guarded). Standing rule: **every new module must pass `node scripts/smoke.js` before it ships** — CI enforces it.

## Module-structure standard (2026-07-10)
- **Single-page is the default.** A module splits into multiple pages only when one page would carry too much (her call on Trace the Bill).
- **Multi-page modules share one structure so students are never thrown:** the home page carries the intro, a **“Start the module →”** primary button (`.start-cta`), and a **Module contents** card list (`.modcontents`); every content page carries breadcrumbs back through the module home and a consistent **in-module pager** (`.modpager`); deep-dive material is reached by **“Learn more … →”** links from overview elements (the ch-1 sources pattern).
- **One record per module:** contributing pages call `ExportReflect.collect({module, chapter, session})`; the final page mounts the download UI with the same session key, so the record accumulates across pages for the browser session.
- CTA language standardized: sources home and rank home now also say “Start the module →”.

## Orientation-lesson rule (2026-07-10)
Every chapter that carries a “How to Read” appendix module lists a takeaway-reinforcing orientation lesson **above** it: ch-4 leads with The Types of Secondary Sources; ch-5 with Cases as a Web of Answers; ch-6 with How to Find a Statute; ch-7 with From Statute to Regulation. Part II chapters already follow this (each has a lesson before its practice modules). Standing rule for all future chapters.
