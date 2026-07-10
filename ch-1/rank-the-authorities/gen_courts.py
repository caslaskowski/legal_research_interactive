#!/usr/bin/env python3
"""Regenerate data/courts.json for the Court Up / Court Down task.

Adds, on top of the original up/down items:
  - a `level` on every item: "intro" (shown in both modes) or "advanced"
    (shown only in Advanced mode);
  - a `reporter` slot on every item, surfaced only in Advanced mode;
  - extra advanced-only items (Federal Circuit, CA Supreme Court, NY
    Appellate Division, AZ Superior cross-system trap).

Court structure and reporter facts are public; the module never reproduces
Bluebook tables and always tells students to confirm exact forms in T1.
"""
import json, pathlib

# ---- reusable accept-lists (normalizer lowercases, strips punctuation and
# ---- whitespace, and drops a leading "the", so spelling/spacing is forgiving)
NONE_TOP  = ["none", "n/a", "na", "nothing", "no court", "highest",
             "highest court", "it is the highest", "this is the highest court", "top"]
NONE_TRIAL = ["none", "n/a", "na", "nothing", "no court", "trial court",
              "it is a trial court", "this is the trial court"]
UNREPORTED = ["none", "n/a", "na", "not reported", "unreported",
              "generally not reported", "not published", "nothing", "no reporter"]

F_REPORTER = ["federal reporter", "fed reporter", "f.4th", "f 4th", "f4th",
              "f.3d", "f 3d", "f3d", "f.2d", "f2d", "f."]
P_REPORTER = ["pacific reporter", "p.3d", "p 3d", "p3d", "p.2d", "p2d"]

COURTS = {
    "eyebrow": "Apply \u00b7 Court systems",
    "title": "Court Up / Court Down",
    "intro": "Precedent runs down a single court system: a court is bound by the courts above it in its own system, and binds the courts below it. Place a court correctly and you know at a glance whose decisions control it. Given a court, name the court directly above it (the one whose decisions bind it) and the court directly below it (the one it binds).",
    "bluebookNote": "This is where your Bluebook earns its keep. Court structures \u2014 and especially their official names \u2014 are not intuitive. Verify the exact name and abbreviation of every court in Table 1 (United States Jurisdictions) before you rely on it. The ladders below give the structure; the Bluebook gives the authoritative names.",
    "watchOut": "Two traps to watch. First, stay inside one system: a federal Court of Appeals does not sit \u2018above\u2019 a state trial court \u2014 they are different systems. Second, names lie: New York\u2019s trial court is called the \u2018Supreme Court,\u2019 and its highest court is the \u2018Court of Appeals.\u2019 Read the structure, not the label.",
    # shown only in Advanced mode
    "modes": {
        "intro": {
            "label": "Introductory",
            "blurb": "Name the court directly above and below each court."
        },
        "advanced": {
            "label": "Advanced",
            "blurb": "Same placements, plus the reporter each court publishes in \u2014 and a few trickier courts. Confirm every reporter\u2019s exact series and abbreviation in Bluebook Table 1."
        }
    },
    "reporterNote": "A reporter is the published set of volumes a court\u2019s decisions appear in. Appellate decisions are routinely reported; trial-court decisions usually are not (the federal district courts are the main exception). Where a court has both an official and a regional reporter, either is accepted here \u2014 but always cite the form your jurisdiction\u2019s rules and Bluebook Table 1 require.",
    "ladders": [
        {
            "system": "Federal",
            "rungs": [
                "Supreme Court of the United States (highest)",
                "U.S. Courts of Appeals \u2014 the circuits (intermediate appellate)",
                "U.S. District Courts (trial)"
            ],
            "note": "Arizona sits in the Ninth Circuit. Specialized and limited courts exist, but this is the core appellate ladder."
        },
        {
            "system": "Arizona",
            "rungs": [
                "Arizona Supreme Court (highest)",
                "Arizona Court of Appeals (intermediate appellate)",
                "Arizona Superior Court (trial, general jurisdiction)"
            ],
            "note": "Limited-jurisdiction courts (justice and municipal courts) sit below the Superior Court, but the ladder above is what drives binding precedent."
        },
        {
            "system": "California",
            "rungs": [
                "Supreme Court of California (highest)",
                "California Courts of Appeal (intermediate appellate)",
                "California Superior Courts (trial)"
            ],
            "note": "A clean three-tier system, like Arizona\u2019s."
        },
        {
            "system": "New York (read carefully)",
            "rungs": [
                "New York Court of Appeals (highest \u2014 yes, the top)",
                "Appellate Division of the Supreme Court (intermediate appellate)",
                "New York Supreme Court (trial \u2014 yes, the trial court)"
            ],
            "note": "The famous trap: in New York the \u2018Supreme Court\u2019 is the trial court and the \u2018Court of Appeals\u2019 is the highest court \u2014 the reverse of what the names suggest."
        }
    ],
    "items": []
}


def item(id, court, system, level, above, below, reporter, note=None):
    it = {"id": id, "court": court, "system": system, "level": level,
          "above": above, "below": below, "reporter": reporter}
    if note:
        it["note"] = note
    return it


def ask(accept, canonical, why):
    return {"ask": True, "accept": accept, "canonical": canonical, "why": why}


def noask():
    return {"ask": False}


COURTS["items"] = [
    # ---------------- INTRO items (court names; reporter surfaces in Advanced)
    item("c1", "U.S. District Court for the District of Arizona", "Federal", "intro",
         above=ask(
             ["us court of appeals for the ninth circuit", "ninth circuit", "9th circuit",
              "court of appeals for the ninth circuit", "us court of appeals ninth circuit",
              "ninth circuit court of appeals", "united states court of appeals for the ninth circuit"],
             "U.S. Court of Appeals for the Ninth Circuit",
             "The District of Arizona sits within the Ninth Circuit, so the Ninth Circuit is the court directly above it and its decisions bind this district court."),
         below=ask(NONE_TRIAL, "None \u2014 it is a trial court",
             "A U.S. District Court is the federal trial court; there is no court below it in the appellate ladder."),
         reporter=ask(
             ["federal supplement", "fed supplement", "f. supp.", "f supp", "fsupp",
              "f. supp. 3d", "f supp 3d", "fsupp3d", "f. supp. 2d", "f supp 2d", "fsupp2d"],
             "Federal Supplement (F. Supp. 3d)",
             "Federal district-court opinions that get published appear in the Federal Supplement (current series F. Supp. 3d) \u2014 but most trial-court rulings are never published at all. Confirm the series in Bluebook Table 1.")),

    item("c2", "U.S. Court of Appeals for the Ninth Circuit", "Federal", "intro",
         above=ask(
             ["supreme court of the united states", "us supreme court", "united states supreme court",
              "scotus", "supreme court"],
             "Supreme Court of the United States",
             "Only the Supreme Court of the United States sits above the circuit courts in the federal system."),
         below=ask(
             ["us district courts", "united states district courts", "district courts",
              "us district court", "district court"],
             "U.S. District Courts (within the circuit)",
             "The circuit court binds the U.S. District Courts in its circuit \u2014 the trial courts directly below it."),
         reporter=ask(F_REPORTER, "Federal Reporter (F.4th)",
             "The U.S. Courts of Appeals publish in the Federal Reporter; the current series is F.4th (after F.3d, F.2d, and F.). Verify in Bluebook Table 1.")),

    item("c3", "Arizona Court of Appeals", "Arizona", "intro",
         above=ask(
             ["arizona supreme court", "supreme court of arizona", "az supreme court"],
             "Arizona Supreme Court",
             "The Arizona Supreme Court is the highest court in Arizona\u2019s system, directly above the Court of Appeals."),
         below=ask(
             ["arizona superior court", "superior court", "az superior court",
              "superior court of arizona", "arizona superior courts"],
             "Arizona Superior Court",
             "The Superior Court is Arizona\u2019s general trial court; the Court of Appeals reviews and binds it."),
         reporter=ask(
             P_REPORTER + ["arizona reports", "ariz.", "ariz", "arizona appeals reports", "ariz. app.", "ariz app"],
             "Pacific Reporter (P.3d) \u2014 also the official Arizona Reports (Ariz.)",
             "Arizona appellate decisions appear in the regional Pacific Reporter (P.3d) and the official Arizona Reports (Ariz.). Either is accepted here; confirm the required form in Bluebook Table 1.")),

    item("c4", "New York Court of Appeals", "New York (read carefully)", "intro",
         above=ask(NONE_TOP, "None \u2014 it is New York\u2019s highest court",
             "Despite the name, the New York Court of Appeals is the highest court in the state \u2014 nothing sits above it in the New York system."),
         below=ask(
             ["appellate division", "appellate division of the supreme court",
              "appellate division of the new york supreme court", "appellate divisions"],
             "Appellate Division of the Supreme Court",
             "The intermediate appellate court in New York is the Appellate Division of the Supreme Court, directly below the Court of Appeals."),
         reporter=ask(
             ["new york reports", "ny reports", "n.y.", "ny",
              "north eastern reporter", "n.e.3d", "ne3d", "n.e.", "ne",
              "new york supplement", "n.y.s.3d", "nys3d", "n.y.s.", "nys"],
             "New York Reports (N.Y.) \u2014 also North Eastern Reporter (N.E.3d)",
             "New York\u2019s high court is published in the official New York Reports (N.Y.) and the regional North Eastern Reporter (N.E.3d). Verify in Bluebook Table 1.")),

    item("c5", "New York Supreme Court", "New York (read carefully)", "intro",
         above=ask(
             ["appellate division", "appellate division of the supreme court",
              "appellate division of the new york supreme court", "appellate divisions"],
             "Appellate Division of the Supreme Court",
             "In New York the \u2018Supreme Court\u2019 is the trial court, so the court directly above it is the Appellate Division \u2014 not the Court of Appeals."),
         below=ask(NONE_TRIAL, "None in the main ladder \u2014 it is a trial court",
             "The New York Supreme Court is a trial court of general jurisdiction; the headline appellate ladder has nothing below it."),
         reporter=ask(
             UNREPORTED + ["miscellaneous reports", "misc.", "misc", "misc. 3d", "misc 3d",
                           "new york supplement", "n.y.s.3d", "nys3d", "n.y.s.", "nys"],
             "Mostly unreported \u2014 some appear in Miscellaneous Reports (Misc. 3d) or the New York Supplement (N.Y.S.3d)",
             "Most trial-court decisions are never published. New York is unusual in reporting some, in Miscellaneous Reports and the New York Supplement. \u2018Unreported\u2019 is also accepted. Confirm in Bluebook Table 1.")),

    item("c7", "California Court of Appeal", "California", "intro",
         above=ask(
             ["supreme court of california", "california supreme court", "ca supreme court"],
             "Supreme Court of California",
             "The Supreme Court of California is the state\u2019s highest court, directly above the Courts of Appeal."),
         below=ask(
             ["california superior court", "california superior courts", "superior court",
              "ca superior court", "superior courts", "superior court of california"],
             "California Superior Courts",
             "The Superior Courts are California\u2019s trial courts; the Courts of Appeal review and bind them."),
         reporter=ask(
             P_REPORTER + ["california appellate reports", "cal. app.", "cal app",
                           "cal. app. 5th", "cal app 5th", "california reporter",
                           "cal. rptr.", "cal rptr", "cal. rptr. 3d", "cal rptr 3d"],
             "California Appellate Reports (Cal. App. 5th) \u2014 also Pacific Reporter (P.3d)",
             "California intermediate decisions appear in California Appellate Reports and the regional Pacific Reporter (P.3d). Confirm the exact series in Bluebook Table 1.")),

    # ---------------- ADVANCED-only items
    item("c6", "Arizona Superior Court", "Arizona", "advanced",
         note="Trap check: do not reach into the federal system. The court above is in Arizona\u2019s own ladder \u2014 a federal circuit court does not sit over a state trial court.",
         above=ask(
             ["arizona court of appeals", "court of appeals", "az court of appeals",
              "arizona court of appeals division", "court of appeals of arizona"],
             "Arizona Court of Appeals",
             "Within Arizona\u2019s own system, the Court of Appeals reviews the Superior Court and binds it. The Ninth Circuit is a different system and does not sit above a state trial court."),
         below=noask(),
         reporter=ask(UNREPORTED,
             "Generally not reported",
             "Trial-court decisions are generally not published in a reporter \u2014 you cite to the record or docket instead. That is why nearly all reported, citable authority is appellate.")),

    item("c8", "U.S. Court of Appeals for the Federal Circuit", "Federal", "advanced",
         note="A geography trap. The Federal Circuit is defined by subject matter \u2014 patent cases, claims against the United States, international trade \u2014 not by a region. (The court for Washington, D.C., is the separate \u2018D.C. Circuit.\u2019)",
         above=ask(
             ["supreme court of the united states", "us supreme court", "united states supreme court",
              "scotus", "supreme court"],
             "Supreme Court of the United States",
             "Like every circuit, the Federal Circuit answers only to the Supreme Court of the United States."),
         below=noask(),
         reporter=ask(F_REPORTER, "Federal Reporter (F.4th)",
             "It is a U.S. Court of Appeals, so like the other circuits it publishes in the Federal Reporter (F.4th). Verify in Bluebook Table 1.")),

    item("c9", "Supreme Court of California", "California", "advanced",
         above=ask(NONE_TOP, "None \u2014 it is California\u2019s highest court",
             "The Supreme Court of California is the top of the state system; only the U.S. Supreme Court, on federal questions, sits above it \u2014 and that is a different system."),
         below=ask(
             ["california courts of appeal", "california court of appeal", "court of appeal",
              "courts of appeal", "ca court of appeal", "ca courts of appeal"],
             "California Courts of Appeal",
             "The Courts of Appeal are the intermediate appellate courts directly below the Supreme Court of California."),
         reporter=ask(
             P_REPORTER + ["california reports", "cal.", "cal", "cal. 5th", "cal 5th"],
             "California Reports (Cal. 5th) \u2014 also Pacific Reporter (P.3d)",
             "The California high court is published in the official California Reports (Cal. 5th) and the regional Pacific Reporter (P.3d). Confirm in Bluebook Table 1.")),

    item("c10", "Appellate Division of the Supreme Court", "New York (read carefully)", "advanced",
         note="The intermediate appellate court in New York \u2014 it sits between the trial-level \u2018Supreme Court\u2019 and the Court of Appeals.",
         above=ask(
             ["new york court of appeals", "ny court of appeals", "court of appeals",
              "new york court of appeal"],
             "New York Court of Appeals",
             "In New York the high court \u2014 above the Appellate Division \u2014 is the Court of Appeals, not the \u2018Supreme Court.\u2019"),
         below=ask(
             ["new york supreme court", "ny supreme court", "supreme court",
              "new york supreme court trial"],
             "New York Supreme Court (the trial court)",
             "Below the Appellate Division is the New York Supreme Court \u2014 which, confusingly, is the trial court."),
         reporter=ask(
             ["appellate division reports", "a.d.3d", "ad3d", "a.d.", "ad", "a.d. 3d", "ad 3d",
              "new york supplement", "n.y.s.3d", "nys3d", "n.y.s.", "nys",
              "north eastern reporter", "n.e.3d", "ne3d"],
             "Appellate Division Reports (A.D.3d) \u2014 also New York Supplement (N.Y.S.3d)",
             "The Appellate Division is published in the Appellate Division Reports (A.D.3d) and the New York Supplement (N.Y.S.3d). Verify in Bluebook Table 1.")),
]

out = pathlib.Path(__file__).parent / "data" / "courts.json"
out.write_text(json.dumps(COURTS, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("wrote", out)
n = len(COURTS["items"])
intro = sum(1 for i in COURTS["items"] if i["level"] == "intro")
print("items: %d  (intro %d / advanced %d)" % (n, intro, n - intro))
