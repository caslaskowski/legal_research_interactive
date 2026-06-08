/* Auto-generated from data/registry.json by build_registry.py — do not edit by hand. */

window.REGISTRY = {
  "suite": {
    "title": "The Question Method of Legal Research",
    "subtitle": "Interactive Modules",
    "lede": "Hands-on companions to the textbook. Some drop you into a live research problem; others build a single skill the work depends on — reading a citation, navigating an annotated code, telling binding authority from persuasive. Together they map onto the book, chapter by chapter.",
    "tagline": "Constantly in beta · built by Cas Laskowski"
  },
  "method": {
    "eyebrow": "The Question Method, in brief",
    "intro": "The method runs through the whole book — a repeating cycle of five steps and a checkpoint. Some modules drill the entire cycle; others build a single skill the cycle depends on.",
    "steps": [
      {
        "t": "Write your research question",
        "d": "State the issue as a question that reflects what you currently understand. Be specific — a vague question gives vague results."
      },
      {
        "t": "Research to answer it",
        "d": "Choose the source most likely to answer the type of question you are asking. Search, and read."
      },
      {
        "t": "Write down what you found",
        "d": "In your research log, record the source, what it told you, and how it relates to your question."
      },
      {
        "t": "Identify your next question",
        "d": "Based on what you found, decide what you still need to know — and write it down."
      },
      {
        "t": "Repeat",
        "d": "Cycle through the steps until no substantive question remains."
      }
    ],
    "checkpoint": {
      "t": "Checkpoint — reflect and evaluate",
      "d": "Before you close out, review your work: Are your sources current, authoritative, and from the right jurisdiction? Did your sequence of questions capture the full scope of the issue? It is a habit you build into every cycle and perform formally at the end."
    }
  },
  "parts": [
    {
      "id": "I",
      "name": "Foundational Legal Research",
      "blurb": "Where the law lives, how to find it, and how to work through each major source type. Chapters 1–9 build the complete foundation for competent legal research."
    },
    {
      "id": "II",
      "name": "Advanced Legal Research",
      "blurb": "The professional obligations and deeper specialties that build on the foundation — ethics, court documents, legislative history, agency materials, practice contexts, AI, and the bar exam."
    },
    {
      "id": "III",
      "name": "Specialized Legal Research",
      "blurb": "Research in particular settings — legal scholarship and foreign, comparative, and international law."
    }
  ],
  "chapters": [
    {
      "ch": 1,
      "part": "I",
      "slug": "foundations-of-legal-authority",
      "title": "Foundations of Legal Authority",
      "desc": "Where law lives — constitutions, statutes, regulations, cases, and the rest — and how binding and persuasive authority fit together in a hierarchy.",
      "modules": [
        {
          "status": "live",
          "type": "orientation",
          "slug": "sources",
          "href": "modules/sources/index.html",
          "note": "Sources primer",
          "title": "How Law Is Made — A 1L Primer",
          "desc": "A guided tour of the U.S. sources of law and how they relate: cases, statutes, and regulations — who makes each, how it becomes law, and when to reach for it."
        },
        {
          "status": "live",
          "type": "orientation",
          "slug": "rank-the-authorities",
          "href": "modules/rank-the-authorities/index.html",
          "title": "Hierarchy of Authorities",
          "desc": "A map of the legal authority hierarchy: what makes one source control another, the line between primary and secondary, and why the same case can bind in one courtroom and only persuade in another."
        },
        {
          "status": "live",
          "type": "practice",
          "slug": "applying-the-hierarchy",
          "href": "modules/rank-the-authorities/practice.html",
          "title": "Applying the Hierarchy",
          "desc": "Drills and applied exercises to test your command of legal authority: sort primary from secondary, tell binding from persuasive, decide when a statute controls, rank a full stack of authorities by binding effect, and place a court in its system."
        }
      ]
    },
    {
      "ch": 2,
      "part": "I",
      "slug": "research-platforms",
      "title": "Introduction to Legal Research Platforms",
      "desc": "The mechanics of searching: natural-language vs. terms-and-connectors, the core Boolean operators, and setting jurisdiction and source filters before you run a query.",
      "modules": [
        {
          "status": "live",
          "type": "orientation",
          "slug": "database-interface",
          "href": "modules/database-interface/index.html",
          "title": "Database Interface Explorer",
          "desc": "Click through a generic legal database — header tools, the search bar, jurisdiction and content filters, the browse tabs, then a results page — and learn what every part does, so you can find the same features on any platform."
        },
        {
          "status": "live",
          "type": "orientation",
          "slug": "using-databases",
          "href": "modules/using-databases/index.html",
          "title": "Using Databases for Legal Research",
          "desc": "Read a citation as a retrieval address, pull a known source by location alone, and build a live terms-and-connectors search over a sample library — watching results change against natural language."
        },
        {
          "status": "live",
          "type": "practice",
          "slug": "database-practice",
          "href": "modules/database-practice/index.html",
          "title": "Database Practice",
          "desc": "Short scenarios for the mechanics: where to start in a database, how to change a search to narrow or broaden it, and what a citation does (and does not) need to retrieve a document."
        }
      ]
    },
    {
      "ch": 3,
      "part": "I",
      "slug": "the-question-method",
      "title": "The Question Method of Legal Research",
      "desc": "The engine of the whole book: ask a question, find an answer, write it down, and let that answer reveal the next question — until no substantive question remains.",
      "modules": [
        {
          "status": "live",
          "type": "orientation",
          "slug": "question-transformation",
          "href": "modules/question-transformation/index.html",
          "note": "New",
          "title": "Reverse-Engineering the Question",
          "desc": "Take a finished legal paragraph apart into the four research questions that built it, then watch those same questions become a synthesis table and an annotated outline — one color tying each question to its place in every form."
        },
        {
          "status": "live",
          "slug": "question-method",
          "href": "modules/question-method/index.html",
          "note": "Draft",
          "title": "Notice of Claim — Research Sandbox",
          "desc": "Work a real Arizona notice-of-claim problem through the question → answer → better-question cycle, logging every move in a research log."
        },
        {
          "status": "live",
          "slug": "question_chain",
          "href": "modules/question_chain/index.html",
          "note": "Draft",
          "title": "Working the Chain — Forward & Reverse",
          "desc": "Build a chain of research questions forward from a fact pattern, then reverse-engineer the questions behind a finished analysis."
        }
      ]
    },
    {
      "ch": 4,
      "part": "I",
      "slug": "secondary-sources",
      "title": "Secondary Sources Research",
      "desc": "Choosing the right secondary source for the question you are holding — encyclopedia, treatise, ALR, Restatement — and mining its footnotes to reach primary authority fast.",
      "modules": [
        {
          "status": "plan",
          "slug": "match-the-source",
          "title": "Match the Source to the Question",
          "desc": "Given a research question, pick the secondary source that fits its type, then follow the footnotes to the primary authority that answers it.",
          "will": [
            "Match question type to source: encyclopedia, treatise, ALR, Restatement",
            "Read by table of contents and index, not cover to cover",
            "Mine footnotes as your bridge to primary authority",
            "Know when to leave the secondary source behind"
          ]
        }
      ]
    },
    {
      "ch": 5,
      "part": "I",
      "slug": "case-law",
      "title": "Case Law Research",
      "desc": "Reading opinions critically, separating holding from dictum, and using headnotes, key numbers, and citators to find and validate the cases that govern.",
      "modules": [
        {
          "status": "plan",
          "slug": "holding-vs-dictum",
          "title": "Holding vs. Dictum",
          "desc": "Read an opinion and separate the holding that binds from the dictum that does not — then test it by changing the facts.",
          "will": [
            "Anatomy of a judicial opinion",
            "Holding vs. dictum",
            "Dispositive-fact identification (a NextGen skill)",
            "Headnotes and key numbers as research tools"
          ]
        },
        {
          "status": "plan",
          "slug": "validate-with-a-citator",
          "title": "Validate with a Citator",
          "desc": "Run an authority through a citator and read the signals before you rely on it.",
          "will": [
            "Why every case needs a citator check",
            "Read citator signals and depth of treatment",
            "Find later cases that erode or reaffirm a holding"
          ]
        }
      ]
    },
    {
      "ch": 6,
      "part": "I",
      "slug": "statutes",
      "title": "Statutes Research",
      "desc": "Finding, reading, and updating statutes — and using annotated codes to jump from the text to the cases that interpret it.",
      "modules": [
        {
          "status": "plan",
          "slug": "navigate-an-annotated-code",
          "title": "Navigate an Annotated Code",
          "desc": "Move from statutory text to its definitions, cross-references, and notes of decisions — reading a section in context, never in isolation.",
          "will": [
            "Navigate an annotated code",
            "Read a statute alongside its definitions and neighboring sections",
            "Use annotations to find interpreting cases",
            "Confirm the version in force when the events occurred"
          ]
        },
        {
          "status": "plan",
          "slug": "spot-the-ambiguity",
          "title": "Spot the Ambiguity",
          "desc": "Read a provision and flag the undefined terms and vague standards that become your next research questions — the NextGen “ambiguity spotting” skill.",
          "will": [
            "Find undefined terms and vague standards",
            "Apply the canons of construction",
            "Turn each ambiguity into a distinct next question"
          ]
        }
      ]
    },
    {
      "ch": 7,
      "part": "I",
      "slug": "regulations",
      "title": "Basic Regulations and Administrative Research",
      "desc": "Tracing a regulation from its enabling statute to the CFR and the Federal Register — and confirming it is still in force.",
      "modules": [
        {
          "status": "plan",
          "slug": "statute-to-regulation",
          "title": "Statute → Agency → Regulation",
          "desc": "Follow the delegation chain from a statute to the rule that implements it, and back again through the authority note.",
          "will": [
            "The delegation chain: statute to agency to rule",
            "Find a rule in the CFR and the Federal Register",
            "Read the preamble for the agency’s own explanation",
            "Update a regulation with the eCFR, the LSA, and a citator"
          ]
        }
      ]
    },
    {
      "ch": 8,
      "part": "I",
      "slug": "across-sources",
      "title": "Researching Across Sources",
      "desc": "Assembling an answer that spans statutes, regulations, and cases at both the federal and state levels — the statute-regulation-case-law triangle.",
      "modules": [
        {
          "status": "plan",
          "slug": "map-the-triangle",
          "title": "Map the Triangle",
          "desc": "Take an issue — like ADA website accessibility — and map it across every layer of authority, reconciling what each source tells you.",
          "will": [
            "Map an issue across statute, regulation, and case law",
            "Move fluidly between source types",
            "Reconcile and sequence what each source says",
            "Spot and resolve conflicts between sources"
          ]
        }
      ]
    },
    {
      "ch": 9,
      "part": "I",
      "slug": "closing-out",
      "title": "Narrowing and Closing Out Your Research",
      "desc": "The precision toolkit — proximity and frequency operators — and how to recognize analytical and practical closure so you know when to stop.",
      "modules": [
        {
          "status": "plan",
          "slug": "tighten-then-stop",
          "title": "Tighten the Search, Then Stop",
          "desc": "Sharpen a query with proximity and frequency connectors, then decide whether you have reached closure.",
          "will": [
            "Proximity connectors (/n, /s, /p) and frequency (ATLEAST)",
            "Tighten a search as the question narrows",
            "Tell “no results” from “no law”",
            "Recognize analytical vs. practical closure"
          ]
        }
      ]
    },
    {
      "ch": 10,
      "part": "II",
      "slug": "ethics",
      "title": "Ethics and Professional Responsibility in Legal Research",
      "desc": "The duty of competent research, candor to the tribunal, and the supervision and verification obligations that ride along with every search.",
      "modules": [
        {
          "status": "plan",
          "slug": "competent-research-duty",
          "title": "The Competent-Research Duty",
          "desc": "Walk scenarios where research — or its absence — triggers Model Rules 1.1, 3.3, 5.1, and 5.3, including the obligation to find adverse authority.",
          "will": [
            "Competence as a research duty (Rule 1.1)",
            "Candor and the duty to disclose adverse authority (Rule 3.3)",
            "Supervising others’ research (Rules 5.1 and 5.3)",
            "Build verification into the workflow"
          ]
        }
      ]
    },
    {
      "ch": 11,
      "part": "II",
      "slug": "dockets",
      "title": "Dockets and Court Document Research",
      "desc": "Finding briefs, motions, and docket entries — and what court filings can tell you that opinions cannot.",
      "modules": [
        {
          "status": "plan",
          "slug": "read-a-docket",
          "title": "Read a Docket",
          "desc": "Trace a case through its docket and pull the filings that reveal its posture, its arguments, and the road to the opinion.",
          "will": [
            "What lives in a docket",
            "Find briefs, motions, and orders",
            "Mine briefs for arguments and authorities",
            "Track pending cases and court rules"
          ]
        }
      ]
    },
    {
      "ch": 12,
      "part": "II",
      "slug": "legislative-history",
      "title": "Legislative History Research",
      "desc": "Reconstructing what a statute meant by tracing bills, committee reports, hearings, and floor debate — and weighing each source correctly.",
      "modules": [
        {
          "status": "plan",
          "slug": "trace-the-bill",
          "title": "Trace the Bill",
          "desc": "Start from a public-law citation and follow a statute back through its legislative record, in chronological order.",
          "will": [
            "The legislative process as a research trail",
            "Weigh committee reports, hearings, and floor statements",
            "Find compiled legislative histories first",
            "Use history responsibly — it is persuasive, not binding"
          ]
        }
      ]
    },
    {
      "ch": 13,
      "part": "II",
      "slug": "advanced-admin",
      "title": "Advanced Administrative Research",
      "desc": "Deeper agency work — guidance documents, policy statements, opinion letters, and adjudications — and recording exactly how much weight each carries after Loper Bright.",
      "modules": [
        {
          "status": "plan",
          "slug": "weigh-the-agency-materials",
          "title": "Weigh the Agency Materials",
          "desc": "Sort binding regulation from persuasive guidance and advisory letters, logging an authority level for every finding.",
          "will": [
            "Rulemaking vs. guidance vs. adjudication",
            "Locate guidance, opinion letters, and ALJ decisions",
            "Record an authority level for every finding",
            "Judicial deference after Loper Bright"
          ]
        }
      ]
    },
    {
      "ch": 14,
      "part": "II",
      "slug": "practice-specific",
      "title": "Practice-Specific Research Strategies",
      "desc": "How the research cycle’s parameters shift across litigation, transactional, and regulatory practice — the question types, first sources, and closure criteria each demands.",
      "modules": [
        {
          "status": "plan",
          "slug": "same-cycle-different-parameters",
          "title": "Same Cycle, Different Parameters",
          "desc": "Run one matter three ways — litigation, transactional, regulatory — and see how the default question type, first source, and closure test change.",
          "will": [
            "Default question type by practice context",
            "Where each context starts its research",
            "Closure criteria that differ by practice",
            "Specialized databases for each setting"
          ]
        }
      ]
    },
    {
      "ch": 15,
      "part": "II",
      "slug": "ai",
      "title": "AI and Legal Research",
      "desc": "Using generative and AI-assisted tools without abdicating judgment — their strengths, failure modes like hallucinated citations, and a verification workflow.",
      "modules": [
        {
          "status": "plan",
          "slug": "verify-the-ai",
          "title": "Verify the AI’s Work",
          "desc": "Run an AI-assisted query through the four-step framework and catch the fabricated authority before it reaches a brief.",
          "will": [
            "Where AI helps and where it hallucinates",
            "The four-step framework for AI-assisted research",
            "Verify every AI output against primary authority",
            "The professional-responsibility limits on AI use"
          ]
        }
      ]
    },
    {
      "ch": 16,
      "part": "II",
      "slug": "nextgen-bar",
      "title": "The NextGen Bar Exam and Legal Research",
      "desc": "How research skills are tested on the NextGen bar exam, and how the Question Method prepares you for each of the five named competencies.",
      "modules": [
        {
          "status": "plan",
          "slug": "five-named-skills",
          "title": "The Five Named Skills",
          "desc": "Drill the five NextGen research competencies — ambiguity spotting, source ranking, dispositive-fact identification, gap identification, and closure — under timed conditions.",
          "will": [
            "The five named NextGen research skills",
            "Work from a provided, closed set of sources",
            "Reach closure under time pressure",
            "Map exam tasks back to the textbook chapters"
          ]
        }
      ]
    },
    {
      "ch": 17,
      "part": "III",
      "slug": "scholarship",
      "title": "Research for Legal Scholarship",
      "desc": "Preemption checks, building a literature base, and the deeper, broader research that scholarly writing demands.",
      "modules": [
        {
          "status": "plan",
          "slug": "run-a-preemption-check",
          "title": "Run a Preemption Check",
          "desc": "Search the scholarly landscape to confirm your idea has not been done — and build the literature base around it.",
          "will": [
            "Run a preemption check",
            "Build and organize a literature base",
            "Use interdisciplinary and historical sources",
            "SSRN, working papers, and citing secondary sources in scholarship"
          ]
        }
      ]
    },
    {
      "ch": 18,
      "part": "III",
      "slug": "fcil",
      "title": "Basic FCIL Research",
      "desc": "A first map of foreign, comparative, and international legal research — treaties, foreign codes, and the finding tools for each.",
      "modules": [
        {
          "status": "plan",
          "slug": "foreign-comparative-international",
          "title": "Foreign, Comparative, or International?",
          "desc": "Sort a research question into the right FCIL bucket and reach for the finding tool that fits.",
          "will": [
            "Foreign vs. comparative vs. international law",
            "Treaties and their research tools",
            "Foreign primary law and finding aids",
            "When to bring in a specialist"
          ]
        }
      ]
    }
  ]
};
