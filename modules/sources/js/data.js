/* Auto-generated from data/*.json */

window.HOME = {
  "title": "How Law Is Made: Cases, Statutes, and Regulations",
  "subtitle": "An interactive introduction for first-year law students.",
  "intro": "Most legal rules you will study come from three sources: statutes, regulations, and cases. This module shows what each one is, how it is created, and when a lawyer reaches for it. Work through the pages in order, and keep your companion notes open as you go.",
  "objectives": [
    "Identify cases, statutes, and regulations and say who creates each.",
    "Trace the process that turns each one into binding law.",
    "Recognize when each source is the right tool for a legal question."
  ],
  "nav": [
    { "id": "workflow", "label": "How Each Source Is Made", "page": "workflow.html", "blurb": "Click through the lifecycle of each source." },
    { "id": "statute", "label": "Statutes \u2014 Deep Dive", "page": "source.html?id=statute", "blurb": "The written law enacted by the legislature." },
    { "id": "regulation", "label": "Regulations \u2014 Deep Dive", "page": "source.html?id=regulation", "blurb": "The detailed rules agencies issue under a statute." },
    { "id": "case", "label": "Cases \u2014 Deep Dive", "page": "source.html?id=case", "blurb": "How courts decide disputes and make precedent." },
    { "id": "connections", "label": "Bringing It Together", "page": "connections.html", "blurb": "How the three sources interact and check one another." },
    { "id": "quiz", "label": "Knowledge Check", "page": "quiz.html", "blurb": "Test yourself, with detailed feedback on every answer." }
  ],
  "companion": {
    "title": "Companion Notes",
    "description": "A fill-in-the-blanks worksheet. Complete it as you move through the module \u2014 once it is filled in, it becomes your one-page cheat sheet.",
    "buttonText": "Download Companion Notes (.txt)"
  },
  "atAGlance": {
    "columns": ["Source", "Made by", "What it does", "Best used when"],
    "rows": [
      ["Statute", "Legislature", "Sets broad, binding rules and policy", "You need foundational, jurisdiction-wide authority or a brand-new rule"],
      ["Regulation", "Executive agency, under a statute", "Fills in the technical detail a statute leaves open", "You need precise, operational specifics on a delegated subject"],
      ["Case", "Court (judge)", "Interprets law, applies it to facts, and makes precedent", "You need to know how the law applies, what ambiguous text means, or the rule where no statute speaks"]
    ]
  }
};

window.SOURCES = {
  "sources": [
    {
      "id": "statute",
      "slug": "statute",
      "title": "Statutes",
      "tagline": "The written laws enacted by elected legislators.",
      "madeBy": "A legislature \u2014 the elected representatives of the public.",
      "role": "Sets the broad, binding rules and policy choices for a jurisdiction.",
      "whenUseful": "When you need the foundational, democratically enacted rule on a subject. Statutes carry broad authority and can create entirely new rights, duties, programs, or crimes.",
      "theme": "statute",
      "workflow": [
        {
          "id": "bill",
          "label": "Bill",
          "brief": "A proposed law introduced by a legislator. It has been written down and formally offered, but it is not yet law and has no legal effect.",
          "use": "The starting point: an idea for a new rule that must survive committee review, debate, and votes before it can bind anyone."
        },
        {
          "id": "session-law",
          "label": "Session Law",
          "brief": "Once the legislature passes the bill and the executive signs it (or a veto is overridden), it becomes an enacted law, published in the order in which it was passed.",
          "use": "The authoritative record of exactly what the legislature adopted, and when \u2014 the law as enacted, before it is reorganized."
        },
        {
          "id": "codified-statute",
          "label": "Codified Statute",
          "brief": "The enacted law is broken apart and filed by subject into the jurisdiction's code, with later amendments woven in alongside related laws.",
          "use": "Where lawyers and the public actually find the current law on a topic. Codification gathers scattered enactments into one organized, up-to-date place."
        }
      ],
      "deepDive": {
        "intro": "A statute is a law written and enacted by a legislature \u2014 the branch made up of elected representatives. In most modern legal systems, statutes are the primary form of law, because they come directly from the people's chosen lawmakers.",
        "sections": [
          {
            "heading": "What a statute is",
            "body": "A statute is a binding rule adopted by the legislature. Because it comes from elected lawmakers, it is usually the most direct expression of public policy, and it can do things no other source can do on its own: create new programs, define crimes, grant or remove rights, and raise and spend public money."
          },
          {
            "heading": "How a statute is made",
            "body": "A statute begins life as a bill \u2014 a proposed law that any legislator can introduce. The bill is studied in committee, debated, amended, and voted on. To become law it must pass the legislature and then be signed by the executive (or, if vetoed, be re-passed by a large enough majority). At that moment it becomes a session law. Later, it is codified: editors place it by subject into the jurisdiction's code so it can be found and read alongside related laws."
          },
          {
            "heading": "Session law versus codified statute",
            "body": "These are the same law in two different arrangements. The session law is the official text exactly as enacted, frozen in time and numbered in the order it passed \u2014 useful when you need to see precisely what the law said at a given moment. The codified statute is that same law reorganized by topic and kept current as amendments are added \u2014 useful when you simply need the law in force today. Knowing both exist explains why a single statute can be found in two very different-looking places."
          },
          {
            "heading": "When a statute is the right source",
            "body": "Reach for a statute when you need broad, durable authority: a brand-new rule where none exists, the controlling policy on a subject, or a rule that applies across the whole jurisdiction. As a general matter, statutes outrank regulations and ordinary case law on the same subject, so a statute is also where you look first to see whether those other sources are even allowed to operate."
          }
        ],
        "whyUseful": "Statutes are the backbone of the legal system: broad in reach, forward-looking, and democratically legitimate. They are generally supreme over regulations and over case law that merely interprets a statute, which makes them the natural place to start when you ask, 'What is the rule, and who is allowed to change it?'",
        "keyTerms": [
          { "term": "Bill", "definition": "A proposed law that has been introduced but not yet enacted." },
          { "term": "Legislature", "definition": "The branch of elected representatives that makes statutes." },
          { "term": "Enact", "definition": "To formally make a bill into law." },
          { "term": "Session law", "definition": "An enacted law published in the order it was passed." },
          { "term": "Codify", "definition": "To organize enacted laws by subject into a code." },
          { "term": "Amendment", "definition": "A formal change to an existing statute." }
        ]
      }
    },
    {
      "id": "regulation",
      "slug": "regulation",
      "title": "Regulations",
      "tagline": "The detailed rules agencies issue to carry out a statute.",
      "madeBy": "An executive agency, using authority that a statute delegated to it.",
      "role": "Fills in and implements the broad commands of a statute with specific, technical detail.",
      "whenUseful": "When you need the precise, operational specifics a statute leaves to experts \u2014 and when the legislature has handed the subject to an agency.",
      "theme": "regulation",
      "workflow": [
        {
          "id": "authorizing-statute",
          "label": "Authorizing Statute",
          "brief": "A statute gives an agency the power to make rules on a subject and sets the limits of that power.",
          "use": "Regulations exist only because a statute authorized them. This is both the source of the agency's authority and the leash on it."
        },
        {
          "id": "proposed-rule",
          "label": "Proposed Rule",
          "brief": "The agency publishes a draft rule and invites the public to comment on it during a set period.",
          "use": "Lets affected people respond before a rule binds them, and builds a record the agency must consider before finalizing."
        },
        {
          "id": "final-rule",
          "label": "Final Rule",
          "brief": "After reviewing the comments, the agency issues the binding final rule, usually with an explanation of its reasoning.",
          "use": "This is the rule that now carries the force of law. The accompanying explanation lets the public and courts understand and check it."
        },
        {
          "id": "codified-regulation",
          "label": "Codified Regulation",
          "brief": "The final rule is organized by subject into the jurisdiction's regulatory code.",
          "use": "Where you find the current operative regulations on a topic, gathered with related rules."
        }
      ],
      "deepDive": {
        "intro": "A regulation \u2014 sometimes called a 'rule' \u2014 is a detailed directive issued by an executive agency to put a statute into practice. Agencies are staffed by subject-matter specialists, so regulations are where broad legislative goals become concrete, workable requirements.",
        "sections": [
          {
            "heading": "What a regulation is",
            "body": "A regulation is a binding rule issued by an executive agency rather than by the legislature. Statutes often set a goal in general terms \u2014 'keep the water safe,' 'prevent unfair trade practices' \u2014 and leave the technical specifics to experts. The regulation supplies those specifics: the exact limits, procedures, forms, and definitions."
          },
          {
            "heading": "Where the authority comes from",
            "body": "Agencies have no inherent power to make law. A statute must first delegate authority to the agency and mark its boundaries. This matters in practice: a regulation that goes beyond what its authorizing statute allows can be challenged and struck down. Every regulation is therefore tethered to a statute behind it."
          },
          {
            "heading": "How a regulation is made",
            "body": "Once a statute grants authority, the agency typically uses a public process. It first issues a proposed rule and invites comments from anyone affected. After reading and weighing those comments, it issues a final rule, usually accompanied by an explanation that responds to the major objections. The final rule is then codified \u2014 placed by subject into the regulatory code \u2014 so it can be found alongside related rules. The comment step is what gives the public a voice and gives courts a record to review."
          },
          {
            "heading": "When a regulation is the right source",
            "body": "Reach for a regulation when you need precise, technical, operational detail; when the subject is one the legislature handed to an agency; or when the rules need to keep pace with changing facts. Statutes change slowly; regulations can be updated far more nimbly within the authority the statute provides."
          }
        ],
        "whyUseful": "Regulations translate broad statutory goals into rules people can actually follow. They are expert-driven, far quicker to update than statutes, and binding like law \u2014 but only within the boundaries their statute sets, which keeps them accountable to the legislature's choices.",
        "keyTerms": [
          { "term": "Agency", "definition": "An executive body that administers a statute and issues regulations." },
          { "term": "Authorizing (enabling) statute", "definition": "The statute that grants and limits an agency's rulemaking power." },
          { "term": "Proposed rule", "definition": "A draft regulation published for public comment; not yet binding." },
          { "term": "Comment period", "definition": "The window during which the public can respond to a proposed rule." },
          { "term": "Final rule", "definition": "The binding regulation issued after comments are considered." },
          { "term": "Codified regulation", "definition": "A final rule organized by subject into the regulatory code." }
        ]
      }
    },
    {
      "id": "case",
      "slug": "case",
      "title": "Cases",
      "tagline": "Courts deciding real disputes \u2014 and, in the process, making precedent.",
      "madeBy": "Courts (judges), deciding actual disputes between parties.",
      "role": "Resolves a specific dispute and, when published, interprets the law and creates precedent that guides later courts.",
      "whenUseful": "When you need to know how the law applies to facts, what ambiguous statutory or regulatory language means, or what the rule is where no statute speaks.",
      "theme": "case",
      "workflow": [
        {
          "id": "appellate-dispute",
          "label": "Appellate Dispute",
          "brief": "A party who lost in the trial court asks a higher court to review legal errors. The appellate court focuses on questions of law, not on re-trying the facts.",
          "use": "Appeals are where courts typically announce rules that will guide future cases \u2014 the engine of precedent. (The dispute first passed through a trial court below.)"
        },
        {
          "id": "slip-opinion",
          "label": "Slip Opinion",
          "brief": "The court's written decision as first released, on its own, right after the court rules \u2014 before official publication and subject to later correction.",
          "use": "The earliest official statement of the court's reasoning and result; how the parties and public first learn the outcome."
        },
        {
          "id": "published-opinion",
          "label": "Published Opinion",
          "brief": "The finalized decision printed in the official reports, fixed in form and citable.",
          "use": "Once published, the opinion is precedent \u2014 later courts look to it to decide similar cases."
        }
      ],
      "deepDive": {
        "intro": "A case is a court's written decision resolving a real dispute between parties. Along the way, the court must say what the law is and how it applies. When that decision is published, its reasoning guides future courts \u2014 and that is how cases make law through precedent.",
        "sections": [
          {
            "heading": "What a case is",
            "body": "A court decides an actual controversy between parties, and in doing so it interprets and applies the law to a concrete set of facts. The written explanation of that decision is the opinion. Unlike a statute, a case does not announce a rule in the abstract; it shows the law in action, settling exactly how a rule plays out when real facts meet it."
          },
          {
            "heading": "Why appeals matter most for law-making",
            "body": "Trial courts mostly resolve who wins on the facts of a single dispute, and their decisions usually do not bind anyone else. Appellate courts focus on questions of law, and their published opinions are what create precedent for future cases. That is why this module follows a dispute at the appellate stage: it is where a single case turns into guidance for everyone."
          },
          {
            "heading": "How a precedent is made",
            "body": "After an appellate court decides, it releases a slip opinion \u2014 the decision standing alone, issued right away and still open to correction. Once finalized, it becomes a published opinion in the official reports: fixed in form, assigned a citation, and available for any later court or lawyer to rely on. Publication is the moment a one-off decision becomes durable law."
          },
          {
            "heading": "When a case is the right source",
            "body": "Reach for a case when you need to know how the law actually applies: what an ambiguous statute or regulation means in practice, how a rule resolves a specific fact pattern, or what the governing rule is where no statute addresses the issue at all. In that last situation, the court itself supplies the rule \u2014 law made entirely through cases."
          }
        ],
        "whyUseful": "Cases give law its meaning in the real world. They resolve ambiguity, adapt rules to new facts, and fill gaps where no statute speaks. Through precedent, they also make the law predictable: once a court has decided how a rule applies, others can rely on that answer.",
        "keyTerms": [
          { "term": "Court / judge", "definition": "The body and official that decide disputes and write opinions." },
          { "term": "Appeal", "definition": "A request that a higher court review a lower court's decision for legal error." },
          { "term": "Question of law", "definition": "An issue about what the law is or means, as opposed to what the facts were." },
          { "term": "Slip opinion", "definition": "A court's decision as first released, before official publication and subject to correction." },
          { "term": "Published opinion", "definition": "The finalized, citable decision printed in the official reports." },
          { "term": "Precedent", "definition": "A published decision that guides how later courts decide similar cases." }
        ]
      }
    }
  ]
};

window.CONNECTIONS = {
  "intro": "The three sources do not sit in separate boxes. They constantly shape, limit, and override one another. A statute hands power to an agency; a court polices both; the legislature can answer back. Understanding these moves is what lets you reason about a legal problem instead of memorizing it. Each interaction below names the move, explains it, and \u2014 where helpful \u2014 gives a real example.",
  "interactions": [
    {
      "id": "statute-authorizes-regulation",
      "title": "Statutes give agencies the power to make regulations",
      "from": "statute",
      "to": "regulation",
      "summary": "A statute delegates rulemaking authority \u2014 and sets its limits.",
      "explanation": "A legislature cannot anticipate every detail, so a statute often authorizes an expert agency to fill in the specifics by regulation, while marking the boundaries of what the agency may do. The regulation draws all of its force from that statute and must stay inside the lines the statute draws.",
      "example": {
        "label": "21 U.S.C. \u00a7 393 \u2014 the statute that creates the FDA",
        "detail": "This statute establishes the Food and Drug Administration and sets its mission: ensuring that foods, drugs, and medical devices are safe and properly labeled. That grant of authority is what lets the FDA issue the detailed regulations that actually govern those products.",
        "link": "https://www.law.cornell.edu/uscode/text/21/393"
      }
    },
    {
      "id": "case-invalidates-regulation",
      "title": "Courts can strike down a regulation that conflicts with its statute",
      "from": "case",
      "to": "regulation",
      "summary": "Because a regulation's power comes from a statute, a court can void a regulation that exceeds or contradicts that statute.",
      "explanation": "A regulation is only valid to the extent its authorizing statute allows. When a court concludes that an agency's rule goes beyond, or clashes with, what the statute permits, it can hold the regulation invalid.",
      "example": {
        "label": "Rowan Cos. v. United States (452 U.S. 247)",
        "detail": "The Supreme Court held Treasury regulations invalid because they failed to implement the statute's definition of 'wages' in a consistent, reasonable way. The agency's rule could not survive once it strayed from the statute behind it.",
        "link": "https://supreme.justia.com/cases/federal/us/452/247/"
      }
    },
    {
      "id": "case-interprets-statute",
      "title": "Courts interpret statutes",
      "from": "case",
      "to": "statute",
      "summary": "When a court decides what ambiguous statutory words mean, that reading becomes part of how the statute operates.",
      "explanation": "Statutes are written in general language, and disputes turn on what that language means in a concrete situation. A court's interpretation settles the meaning for the case before it and guides how the statute is applied going forward \u2014 until the legislature changes the text or a higher court rules otherwise.",
      "example": {
        "label": "Smith v. United States (508 U.S. 223)",
        "detail": "The Court had to decide whether trading a gun for drugs counts as 'using' a firearm under a federal statute. By settling what the single word 'use' means, the Court's reading became part of how that statute applies in every later case.",
        "link": "https://supreme.justia.com/cases/federal/us/508/223/"
      }
    },
    {
      "id": "statute-overrides-case",
      "title": "A new statute can overturn a court's reading of a statute",
      "from": "statute",
      "to": "case",
      "summary": "If the legislature dislikes how a court interpreted a statute, it can amend the statute to change the rule going forward.",
      "explanation": "When a decision rests on what a statute means, the legislature gets the last word: it can rewrite the statute so the rule comes out differently. This is the legislature answering the courts.",
      "example": {
        "label": "Congress's response to Rowan (Social Security Amendments of 1983)",
        "detail": "After the Court's decision in Rowan, Congress reversed the holding by amending the statute so the definition of 'wages' worked the way it wanted. The same dispute thus shows two moves in sequence: a court striking a regulation, then the legislature overriding the court by statute.",
        "link": "https://supreme.justia.com/cases/federal/us/452/247/"
      }
    },
    {
      "id": "case-strikes-statute-constitution",
      "title": "Courts can hold a statute unconstitutional",
      "from": "case",
      "to": "statute",
      "summary": "A court can rule that a statute violates the constitution and so cannot be enforced \u2014 even though the text usually stays in the code.",
      "explanation": "Constitutional limits sit above ordinary statutes. A court can hold that a statute crosses those limits and refuse to enforce it. Notably, being struck down is not the same as being erased: the unenforceable statute typically remains printed in the code, so you can still find it even though it no longer has effect.",
      "example": {
        "label": "Flag Protection Act, 18 U.S.C. \u00a7 700 (United States v. Eichman)",
        "detail": "The Supreme Court held the federal Flag Protection Act unconstitutional on free-speech grounds in United States v. Eichman, yet \u00a7 700 still appears in the U.S. Code today \u2014 findable, but unenforceable.",
        "link": "https://www.law.cornell.edu/uscode/text/18/700"
      }
    }
  ]
};

window.QUIZ = {
  "instructions": "Choose the best answer. After you answer, you'll get an explanation \u2014 including why each wrong choice is wrong. Aim to understand the feedback, not just to get a score.",
  "questions": [
    {
      "id": "q1",
      "topic": "roles",
      "prompt": "Who creates statutes?",
      "options": [
        { "id": "a", "text": "A legislature of elected representatives" },
        { "id": "b", "text": "An executive agency" },
        { "id": "c", "text": "A court" },
        { "id": "d", "text": "The public, by direct vote on every law" }
      ],
      "correct": "a",
      "feedback": {
        "correct": "Right. Statutes are enacted by the legislature \u2014 the branch of elected lawmakers \u2014 which is what gives statutes their democratic authority.",
        "b": "Agencies make regulations, not statutes. An agency can only act after a statute has delegated power to it.",
        "c": "Courts decide cases and interpret the law; they do not enact statutes.",
        "d": "Statutes come from the legislature, not from a direct public vote on each law."
      }
    },
    {
      "id": "q2",
      "topic": "process",
      "prompt": "A bill that has passed the legislature and been signed by the executive first becomes a ______, before it is reorganized by subject into the code.",
      "options": [
        { "id": "a", "text": "regulation" },
        { "id": "b", "text": "session law" },
        { "id": "c", "text": "slip opinion" },
        { "id": "d", "text": "codified statute" }
      ],
      "correct": "b",
      "feedback": {
        "correct": "Right. The freshly enacted law is a session law \u2014 the official text as passed \u2014 and only later gets codified by subject.",
        "a": "A regulation comes from an agency, not from a bill passing the legislature.",
        "c": "A slip opinion is an early court decision, part of the case process, not the legislative one.",
        "d": "Codification happens after this stage. The question asks what the law is before it is organized into the code \u2014 that's the session law."
      }
    },
    {
      "id": "q3",
      "topic": "roles",
      "prompt": "Where does an agency get the power to issue a regulation?",
      "options": [
        { "id": "a", "text": "From a court order directing it to act" },
        { "id": "b", "text": "From a statute that delegates authority to it" },
        { "id": "c", "text": "From the agency simply deciding the rule is needed" },
        { "id": "d", "text": "From a published court opinion" }
      ],
      "correct": "b",
      "feedback": {
        "correct": "Right. Agencies have no inherent lawmaking power. A statute must first delegate authority \u2014 and that statute also sets the limits of what the agency may do.",
        "a": "Courts review agency action; they are not the source of an agency's rulemaking power.",
        "c": "An agency cannot bootstrap its own authority. Without a statute behind it, a regulation has no force.",
        "d": "Opinions can interpret or invalidate regulations, but they do not grant an agency the power to make them."
      }
    },
    {
      "id": "q4",
      "topic": "process",
      "prompt": "Why does an agency publish a proposed rule before issuing a final rule?",
      "options": [
        { "id": "a", "text": "To give the public a chance to comment before the rule binds anyone" },
        { "id": "b", "text": "Because proposed rules are more legally powerful than final rules" },
        { "id": "c", "text": "To ask the legislature for permission to act" },
        { "id": "d", "text": "Because a court ordered it to publish a draft" }
      ],
      "correct": "a",
      "feedback": {
        "correct": "Right. The proposed-rule stage opens a comment period so affected people can respond, and it builds a record the agency must weigh before finalizing.",
        "b": "It's the reverse: the proposed rule is just a draft and binds no one. The final rule is the one with the force of law.",
        "c": "Permission already came from the authorizing statute. The comment process is about public input, not legislative sign-off.",
        "d": "The notice-and-comment step is a normal part of rulemaking, not something triggered by a court order."
      }
    },
    {
      "id": "q5",
      "topic": "process",
      "prompt": "A court's decision as first released \u2014 standing alone and still subject to correction \u2014 is called a ______.",
      "options": [
        { "id": "a", "text": "bill" },
        { "id": "b", "text": "slip opinion" },
        { "id": "c", "text": "session law" },
        { "id": "d", "text": "final rule" }
      ],
      "correct": "b",
      "feedback": {
        "correct": "Right. The slip opinion is the decision in its earliest form, before it is finalized and published in the official reports.",
        "a": "A bill is a proposed statute, not a court decision.",
        "c": "A session law is an enacted statute, part of the legislative process.",
        "d": "A final rule is an agency regulation, not a court's opinion."
      }
    },
    {
      "id": "q6",
      "topic": "when-to-use",
      "prompt": "A lawmaker wants to create an entirely new, jurisdiction-wide program and provide funding for it. Which source is the right tool?",
      "options": [
        { "id": "a", "text": "A regulation" },
        { "id": "b", "text": "A statute" },
        { "id": "c", "text": "A single court opinion" },
        { "id": "d", "text": "A slip opinion" }
      ],
      "correct": "b",
      "feedback": {
        "correct": "Right. Creating a broad new program and funding it is exactly what statutes do \u2014 only the legislature has that authority.",
        "a": "A regulation can implement a program, but it can't create one from nothing; it needs a statute behind it first.",
        "c": "A court resolves a specific dispute; it cannot stand up a funded, jurisdiction-wide program.",
        "d": "A slip opinion is just an early form of a court decision \u2014 same limits as any case, and not a tool for building programs."
      }
    },
    {
      "id": "q7",
      "topic": "when-to-use",
      "prompt": "A statute directs an agency to set 'safe exposure limits,' but you need the exact numerical limit. Where do you look?",
      "options": [
        { "id": "a", "text": "The bill" },
        { "id": "b", "text": "The session law" },
        { "id": "c", "text": "The regulation" },
        { "id": "d", "text": "A constitutional provision" }
      ],
      "correct": "c",
      "feedback": {
        "correct": "Right. The statute set the goal and delegated the detail; the precise number lives in the agency's regulation.",
        "a": "A bill is only a proposal \u2014 and the technical limit wouldn't be there anyway; that detail was left to the agency.",
        "b": "The session law is the statute as enacted, which here sets the goal but not the specific number.",
        "d": "A constitution sets broad limits on government power, not specific technical exposure thresholds."
      }
    },
    {
      "id": "q8",
      "topic": "when-to-use",
      "prompt": "A statute is silent on whether it covers a brand-new situation, and you need to know how it applies to specific facts. Which source is most likely to answer?",
      "options": [
        { "id": "a", "text": "A proposed rule" },
        { "id": "b", "text": "A published court opinion" },
        { "id": "c", "text": "The session law" },
        { "id": "d", "text": "The original bill" }
      ],
      "correct": "b",
      "feedback": {
        "correct": "Right. Courts interpret the law and apply it to concrete facts; a published opinion is where that guidance lives and can be relied on.",
        "a": "A proposed rule is a draft regulation that binds no one, and it won't tell you how a statute applies to your facts.",
        "c": "The session law gives you the enacted text \u2014 but the text is exactly what's silent here; you need an interpretation.",
        "d": "The bill is just the earlier proposal; it won't resolve how the enacted law applies to a new situation."
      }
    }
  ]
};

window.COMPANION = {
  "title": "Sources of Law \u2014 Companion Notes",
  "intro": "Fill in each blank as you work through the module. Try to answer from memory first, then check yourself against the pages. When every blank is filled, this becomes your one-page cheat sheet.",
  "sections": [
    {
      "id": "statute",
      "heading": "STATUTE",
      "fields": [
        { "label": "Made by" },
        { "label": "What it is, in one line" },
        { "label": "The three stages of how it is made" },
        { "label": "Best used when" }
      ]
    },
    {
      "id": "regulation",
      "heading": "REGULATION",
      "fields": [
        { "label": "Made by" },
        { "label": "What it is, in one line" },
        { "label": "Where its authority comes from" },
        { "label": "The stages of how it is made" },
        { "label": "Best used when" }
      ]
    },
    {
      "id": "case",
      "heading": "CASE",
      "fields": [
        { "label": "Made by" },
        { "label": "What it is, in one line" },
        { "label": "The three stages of how a precedent is made" },
        { "label": "Best used when" }
      ]
    },
    {
      "id": "connections",
      "heading": "HOW THEY FIT TOGETHER",
      "fields": [
        { "label": "A statute gives an agency the power to make" },
        { "label": "A court can strike down a regulation when it" },
        { "label": "A new statute can overturn a case by" },
        { "label": "A court can refuse to enforce a statute when it" },
        { "label": "Where no statute exists, courts" }
      ]
    }
  ],
  "footer": "Tip: if you can fill this in without looking, you understand the module."
};
