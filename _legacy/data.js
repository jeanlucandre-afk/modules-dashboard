// =============================================================
// modules-dashboard — Jean-Luc's SS26 module tracker
// =============================================================
// Edit this file to update the dashboard.
// After editing: git add . && git commit -m "..." && git push
// (Local: just refresh index.html in your browser.)
// =============================================================

window.DASHBOARD_DATA = {
  // ---------- HARD DEADLINE FOR ALL HAND-INS ----------
  deadline: "2026-05-04",          // YYYY-MM-DD
  semester: "SS26",
  student: "Jean-Luc",
  project: "Mango Lab → Still",
  lastUpdated: "2026-04-28",

  // ---------- TODAY'S FOCUS (top of dashboard) ----------
  // Edit this list to surface what to tackle right now.
  todayFocus: [
    "Confirm Roland Fassauer approves the €400 ENGINE_001 budget (PM_23)",
    "Finish PM_16 Part 4 (Q14–Q19) + verify all 5 artifact PDFs",
    "Decide PM_23 Sales Report angle: cold outreach OR objection handling",
    "Confirm SE_01 path: standard exam vs. project hand-in"
  ],

  // ---------- OPEN DECISIONS ----------
  // Things still to decide. Move to checklists once decided.
  decisions: [
    { id: "se01-path",   label: "SE_01 — standard exam vs alternative project vs combined assessment", status: "open" },
    { id: "id30-cp",     label: "ID_30 — confirmed 10 ECTS (✓ Jean-Luc verified)",                       status: "resolved" },
    { id: "pm22-level",  label: "PM_22 — Level 3 target → reflection essay OR community article OR workshop",  status: "open" },
    { id: "pm23-sales",  label: "PM_23 — Sales template choice: cold outreach OR objection handling",   status: "open" }
  ],

  // ---------- THE 8 MODULES ----------
  // Each has: id, code, title, ects, organizer, type, targetLevel,
  //           deliverables [{name, status, notes}],
  //           checklist [{label, done}],
  //           keyRules [strings],
  //           nextAction (string),
  //           oralExamDate (string or null),
  //           notes (free-text markdown-ish)
  modules: [
    {
      id: "pm22",
      code: "PM_22 / BM_22",
      title: "Product Discovery",
      ects: 10,
      organizer: "Swantje Quoos",
      type: "Core Compulsory Elective Group 2",
      targetLevel: 3,
      oralExamDate: null,
      keyRules: [
        "Better Products presentation + 25-min oral (10 present + 15 Q&A)",
        "Hand-in: single PDF of slides + AI-use statement",
        "≥5 user interviews/transcripts in appendix",
        "No remote assessment; no reassessment format change"
      ],
      deliverables: [
        { name: "Better Products presentation", status: "todo",        notes: "" },
        { name: "Slide deck (PDF) — covers all 6 knowledge areas",   status: "todo",        notes: "" },
        { name: "Oral exam prep (10 min talk + 15 min Q&A)",          status: "todo",        notes: "" },
        { name: "Level-3 add-on: reflection essay / article / workshop", status: "undecided", notes: "Pick one" }
      ],
      checklist: [
        { label: "Problem statement (in pitch deck: 73%/56%/$7K)",   done: true  },
        { label: "≥5 user interviews + transcripts",                 done: false },
        { label: "Secondary research (Constant Contact, Technavio, Data Catalyst)", done: true },
        { label: "User group definition + quantification (3 personas in deck)", done: true },
        { label: "1–3 Personas (SMB Founder / Growing Biz / Marketing Team)", done: true },
        { label: "User journey map",                                  done: false },
        { label: "Value Proposition Canvas",                          done: false },
        { label: "Competitor matrix (in deck — affordable × automated)", done: true },
        { label: "PESTLE analysis",                                   done: false },
        { label: "TAM / SAM / SOM ($356B / $47B / $480M)",            done: true  },
        { label: "Beachhead market definition (iGaming → Bet&Babes)", done: true  },
        { label: "Solution from creativity techniques (Still)",       done: true  },
        { label: "Value proposition statement",                       done: true  },
        { label: "Solution evaluation (DUF V S + SWOT)",              done: false },
        { label: "Prototype description (paying clients running on Still)", done: true },
        { label: "≥3 hypothesis cards (5 traction test cards exist)", done: true  },
        { label: "Experiment board",                                  done: null  },
        { label: "Prototype test methods + results",                  done: null  },
        { label: "MVP description + user story map",                  done: false },
        { label: "Build-Measure-Learn cycle (in validation-plan-v3)", done: true  },
        { label: "Level-2 extras (Lean Canvas / trends / S-I Board) — Lean Canvas exists", done: true },
        { label: "Level-3 add-on (essay / article / workshop)",       done: false }
      ],
      nextAction: "Run ≥5 user interviews (or transcribe the existing recorded one) + assemble all into a single PDF deck",
      notes: "Heavy lifting already done in pitch deck + BMC + traction cards + validation plan v3. Gaps: ≥5 transcripts, journey map, VPC, PESTLE, SWOT, user story map."
    },
    {
      id: "pm23",
      code: "PM_23 / BM_23",
      title: "Product Marketing and Sales",
      ects: 10,
      organizer: "Roland Fassauer",
      type: "Core Compulsory Elective Group 2",
      targetLevel: 3,
      oralExamDate: null,
      keyRules: [
        "ENGINE_001 strategy: real €400 Meta Ads sprint for Mango Lab — the campaign IS the deliverable",
        "Marketing Report ~18 pages (PDF) — citations MANDATORY (no citations = fail)",
        "Sales Report — enablement deck/presentation",
        "Active participation in consulting sessions required",
        "1 module-specific check-in with Roland during project phase",
        "Level-3 leveling-up report ≤3,000 words"
      ],
      deliverables: [
        { name: "Campaign Plan (HTML)",                        status: "done",       notes: "MangoLab_Campaign_Plan_Engine001.html — 12 sections, KPIs, calendar, risks" },
        { name: "Creative Brief — 5 creatives (HTML)",          status: "done",       notes: "3 HUMAN_ + 2 TECHNICAL_ with copy + Nano Banana 2 prompts" },
        { name: "Executive Summary for Roland (HTML)",          status: "done",       notes: "1-page brief asking for €400 ad budget" },
        { name: "Marketing Report (~18 pages, single PDF)",     status: "inprogress", notes: "Most content can be assembled from Campaign Plan HTML; needs academic framing + citations" },
        { name: "Sales Report — enablement deck",                status: "todo",       notes: "NOT YET STARTED. Persona, value-prop, cold outreach OR objection handling, sales funnel" },
        { name: "Check-in with Roland",                          status: "todo",       notes: "Status unknown — confirm" },
        { name: "Consulting sessions participation",             status: "todo",       notes: "Status unknown — confirm" },
        { name: "Run the actual Meta Ads campaign",              status: "todo",       notes: "14 days, €400, target 30–60 sign-ups @ ≤€15 CPS" },
        { name: "Class analysis report (post-campaign)",         status: "todo",       notes: "Performance + creative + funnel + ROI + lessons" },
        { name: "Level-3 add-on report (≤3,000 words)",          status: "undecided",  notes: "" }
      ],
      checklist: [
        { label: "Marketing — customer lifecycle mapped",                done: true  },
        { label: "Marketing — consumer behavior / pain signals",         done: true  },
        { label: "Marketing — Meta Ads strategy + structure",            done: true  },
        { label: "Marketing — KPIs + targets defined",                   done: true  },
        { label: "Marketing — risk analysis",                            done: true  },
        { label: "Marketing — 14-day calendar",                          done: true  },
        { label: "Marketing — academic citations added",                 done: false },
        { label: "Marketing — assembled into 18-page PDF",               done: false },
        { label: "Sales — user persona",                                  done: false },
        { label: "Sales — buyer persona",                                 done: false },
        { label: "Sales — value-based product proposition",               done: false },
        { label: "Sales — cold outreach OR objection-handling template", done: false },
        { label: "Sales — example sales funnel with qualified leads",    done: false },
        { label: "Sales — assembled into deck",                          done: false },
        { label: "Roland approves the €400 budget",                      done: null  },
        { label: "Campaign launched (D1)",                                done: null  },
        { label: "D7 building-in-public LinkedIn post",                   done: null  },
        { label: "Campaign closed (D14)",                                 done: null  },
        { label: "Class analysis report drafted",                        done: null  },
        { label: "Submitted via Google form",                            done: false }
      ],
      nextAction: "Decide cold-outreach vs objection-handling for Sales deck; confirm Roland check-in + budget approval status",
      notes: "Three core docs are drafted. Campaign Plan content covers most of the Marketing Report needs. Sales Report is the biggest blank."
    },
    {
      id: "pm18",
      code: "PM_18 / BM_18",
      title: "Data Science and AI for Product Managers",
      ects: 5,
      organizer: "Florian Grote",
      type: "Core Elective",
      targetLevel: 3,
      oralExamDate: null,
      keyRules: [
        "Portfolio (single PDF) + optional 15-min oral exam",
        "Reflection part max 2,000 words (descriptions/prompts don't count)",
        "≥1 runnable LLM prompt the assessor can use",
        "Hand-in must include statement on how genAI was used"
      ],
      deliverables: [
        { name: "Portfolio PDF (8 questions answered with applied examples)", status: "todo", notes: "Mango Lab as the example" },
        { name: "Runnable LLM prompt (assessor must be able to run it)",       status: "todo", notes: "" },
        { name: "Reflections per response (≤2,000 words total)",               status: "todo", notes: "" },
        { name: "GenAI usage statement",                                       status: "todo", notes: "" }
      ],
      checklist: [
        { label: "Q1: Getting most out of LLMs (with applied example)",        done: null },
        { label: "Q2: LLM tools in product ops (with applied example)",        done: null },
        { label: "Q3: Data infrastructure components in Mango Lab",            done: null },
        { label: "Q4: Data culture components in Mango Lab",                   done: null },
        { label: "Q5: Approach to data ethics",                                done: null },
        { label: "Q6: Where genAI could add user value in Mango Lab",          done: null },
        { label: "Q7: Ensuring ethical use of genAI",                          done: null },
        { label: "Q8: Measuring success of AI features",                       done: null },
        { label: "Detailed runnable prompt included + accessible",             done: null },
        { label: "Reflections per question (cumulative ≤2,000 words)",         done: null },
        { label: "AI-use statement included",                                  done: null },
        { label: "Compiled to single PDF, submitted via Google Form",          done: null }
      ],
      nextAction: "Map each of the 8 questions to a concrete Mango Lab example",
      notes: ""
    },
    {
      id: "pm16",
      code: "PM_16 / BM_16",
      title: "How to Start a Startup",
      ects: 5,
      organizer: "Fabiano Abreu Ott",
      type: "Core Mandatory",
      targetLevel: 3,
      oralExamDate: null,
      keyRules: [
        "100 points across 4 parts + Challenge Reflections (10) + Artifacts (40)",
        "Submit as ZIP: completed doc (PDF) + 'artifacts' folder",
        "Single Google Form for submission (linked in doc)",
        "Artifacts = 40% of grade — biggest single bucket"
      ],
      deliverables: [
        { name: "Main doc (Q2–Q21, all parts) — export as PDF", status: "inprogress", notes: "Doc ~80% drafted; Part 4 Journey & Reflection (Q14–19) needs filling" },
        { name: "Artifact 1 — TAM/SAM/SOM (PDF, 1 page)",        status: "inprogress", notes: "" },
        { name: "Artifact 2 — Lean Canvas (PDF, 1 page)",        status: "inprogress", notes: "Existing file in Drive" },
        { name: "Artifact 3 — Risk Ledger (PDF, 1 page)",        status: "inprogress", notes: "Existing file in Drive (Risks 4–6 written up)" },
        { name: "Artifact 4 — Unit Economics (PDF, 1 page)",     status: "inprogress", notes: "still_unit_economics.xlsx exists; needs PDF export" },
        { name: "Artifact 5 — Pitch Deck (PDF)",                  status: "inprogress", notes: "Mango Lab Pitch Deck.pdf exists" },
        { name: "Challenge 1/4 reflection",                       status: "todo",       notes: "" },
        { name: "Challenge 2/4 reflection",                       status: "todo",       notes: "" },
        { name: "Challenge 3/4 reflection",                       status: "todo",       notes: "" },
        { name: "Challenge 4/4 reflection",                       status: "todo",       notes: "" },
        { name: "ZIP + Google Form submission",                   status: "todo",       notes: "" }
      ],
      checklist: [
        { label: "Q2 Why in entrepreneurship",                            done: true  },
        { label: "Q3 Entrepreneurship definition",                        done: true  },
        { label: "Q4 Project type (CODE project: Mango Lab)",             done: true  },
        { label: "Q5–Q8 Venture / positioning / traction test",           done: true  },
        { label: "Q9 Risk Ledger reflection (Risks 4–6 written)",         done: true  },
        { label: "Q10 Six-month problem (capacity)",                      done: true  },
        { label: "Q11 Cross-cultural perception",                         done: true  },
        { label: "Q12 Moat / defensibility",                              done: true  },
        { label: "Q13 Innovation as competitive advantage",               done: true  },
        { label: "Q14 — needs check",                                     done: null  },
        { label: "Q15 — needs check",                                     done: null  },
        { label: "Q16 Personal non-negotiables",                          done: false },
        { label: "Q17 Legal entity choice",                               done: false },
        { label: "Q18 Most important thing/person to learn from in Berlin", done: false },
        { label: "Q19 Reflection on the journey",                         done: false },
        { label: "Q20 Generative AI usage statement",                     done: false },
        { label: "Q21 Original-work certification",                       done: false },
        { label: "Artifact 1 — TAM/SAM/SOM as 1-page PDF",                done: null  },
        { label: "Artifact 2 — Lean Canvas as 1-page PDF",                done: null  },
        { label: "Artifact 3 — Risk Ledger as 1-page PDF",                done: null  },
        { label: "Artifact 4 — Unit Economics as 1-page PDF",             done: null  },
        { label: "Artifact 5 — Pitch Deck as PDF",                        done: null  },
        { label: "Challenge 1/4 reflection",                              done: null  },
        { label: "Challenge 2/4 reflection",                              done: null  },
        { label: "Challenge 3/4 reflection",                              done: null  },
        { label: "Challenge 4/4 reflection",                              done: null  },
        { label: "Doc exported as PDF",                                   done: false },
        { label: "All files zipped",                                      done: false },
        { label: "Submitted via Google Form",                             done: false }
      ],
      nextAction: "Finish Part 4 (Q14–Q19) + verify all 5 artifacts are 1-page PDFs ready to zip",
      notes: "Doc is well underway. The 40-point artifacts bucket is where the biggest leverage is — confirm each is finalized as a 1-page PDF."
    },
    {
      id: "sts04",
      code: "STS_04",
      title: "Presentation",
      ects: 5,
      organizer: "Fabian Geier",
      type: "STS Mandatory",
      targetLevel: 3,
      oralExamDate: null,
      keyRules: [
        "Booked LU: 'The Universal, All-powerful... with Croissants'",
        "NO generative AI for assessment or much of teaching",
        "Specifics set by the lecturer of the chosen LU"
      ],
      deliverables: [
        { name: "Presentation or video essay (lecturer-set spec)", status: "todo", notes: "Get exact requirements from Fabian" }
      ],
      checklist: [
        { label: "Read all assigned materials thoroughly",            done: null },
        { label: "Review themes discussed in class",                  done: null },
        { label: "Develop own observations / criticisms / summaries", done: null },
        { label: "Get exact assessment spec from lecturer",           done: null },
        { label: "Outline the presentation/video",                    done: null },
        { label: "Create slides or storyboard",                       done: null },
        { label: "Rehearse",                                          done: null },
        { label: "Deliver / submit",                                  done: null }
      ],
      nextAction: "Confirm exact assessment format from Fabian for The Universal All-powerful LU",
      notes: "Claude can help plan + brainstorm + source-find but CANNOT write the deliverable — it must be Jean-Luc's own work."
    },
    {
      id: "se01",
      code: "SE_01",
      title: "Software Development Basics",
      ects: 5,
      organizer: "Samuel Boguslawski",
      type: "Core Elective",
      targetLevel: 3,
      oralExamDate: null,
      keyRules: [
        "Standard: in-person 1–4hr coding exam (build a small game/app)",
        "Granular Git commits required",
        "NO generative AI during exam OR for the hand-in",
        "Bring your own laptop with IDE + git + language pre-installed"
      ],
      deliverables: [
        { name: "Decision: standard exam / project hand-in / combined",  status: "undecided", notes: "" },
        { name: "Standard: in-person coding exam",                        status: "todo",      notes: "Choose only if going standard route" },
        { name: "Alt 1: intermediate code project + granular git history", status: "todo",     notes: "Choose only if going alternative" },
        { name: "Alt 2: combined assessment with another SE module",      status: "todo",      notes: "Possible: SE_08 / SE_19 / SE_45 / SE_46 / SE_47 / SE_48" }
      ],
      checklist: [
        { label: "Path decided",                                      done: null },
        { label: "OS_01 prerequisite confirmed",                      done: null },
        { label: "Practice: small project with granular commits",     done: null },
        { label: "Tools pre-installed on laptop (IDE, git, language)", done: null },
        { label: "Standard exam booked OR alternative form filed",    done: null }
      ],
      nextAction: "Decide which path to take",
      notes: "Claude cannot help generate code for the hand-in (no genAI rule). Can help with planning and practice setup."
    },
    {
      id: "id09",
      code: "ID_09 / DS_09",
      title: "Design Strategy",
      ects: 5,
      organizer: "Pras Gunasekera",
      type: "Core Elective",
      targetLevel: 3,
      oralExamDate: null,
      keyRules: [
        "TWO posters (PDF) uploaded to Fuxam pre-Demo",
        "Demo event poster presentation (open audience)",
        "~500-word reflective self-assessment",
        "APA 7th citations everywhere"
      ],
      deliverables: [
        { name: "Poster 1 (PDF)",                          status: "todo", notes: "Framing + role of Design + tools/methods + your usage" },
        { name: "Poster 2 (PDF)",                          status: "todo", notes: "Creative outcomes + next steps + design outcomes/touchpoints" },
        { name: "Poster presentation at Demo event",      status: "todo", notes: "" },
        { name: "Reflective self-assessment (~500 words)", status: "todo", notes: "Self-assessed level + reasoning + Gibbs (or other) reflective cycle" }
      ],
      checklist: [
        { label: "Topic/area/project chosen for Design Strategy",            done: null },
        { label: "Poster 1: framing + contextual relevance",                  done: null },
        { label: "Poster 1: role of Design in Industry",                      done: null },
        { label: "Poster 1: design strategy tools (advantages/disadvantages)", done: null },
        { label: "Poster 1: own utilization of tools",                        done: null },
        { label: "Poster 2: creative outcomes",                               done: null },
        { label: "Poster 2: project milestones (immediate/mid/long)",         done: null },
        { label: "Poster 2: design outcomes / touchpoints",                   done: null },
        { label: "Reflection: self-assessed level + reasoning",               done: null },
        { label: "Reflection: personal reflection + Gibbs cycle",             done: null },
        { label: "APA 7th citations across posters + reflection",             done: null },
        { label: "Posters uploaded to Fuxam pre-Demo",                        done: null }
      ],
      nextAction: "Decide the area/topic/project for Design Strategy",
      notes: ""
    },
    {
      id: "id30",
      code: "ID_30 / DS_30",
      title: "Artificial Intelligence in Design",
      ects: 10,
      organizer: "Daniel Buzzo",
      type: "Studio Module — mandatory weekly attendance",
      targetLevel: 3,
      oralExamDate: null,
      keyRules: [
        "MANDATORY on-campus group session (no-show = non-submission)",
        "Short oral Q&A at the session",
        "15-page annotated portfolio (PDF) + 500-word reflection",
        "Studio module: weekly participation + p5.js / Processing prep tasks",
        "GenAI use ALLOWED with proper documentation (prompts, revisions, GDPR-compliant tools)"
      ],
      deliverables: [
        { name: "Prototype / design / artwork / system",     status: "todo", notes: "" },
        { name: "Annotated portfolio (PDF, ≤15 pages)",      status: "todo", notes: "" },
        { name: "500-word self-reflection essay",             status: "todo", notes: "Includes self-assessed level + reasoning" },
        { name: "On-campus demo + oral exam",                 status: "todo", notes: "MANDATORY" }
      ],
      checklist: [
        { label: "Project idea chosen",                                done: null },
        { label: "Primary research / inspirations gathered",           done: null },
        { label: "AI/ML technique(s) selected (STT/TTS/CV/LLM/etc.)",  done: null },
        { label: "p5.js / Processing prototype built",                 done: null },
        { label: "Portfolio: design decisions + outcomes",             done: null },
        { label: "Portfolio: development process",                     done: null },
        { label: "Portfolio: social/regulatory/ethical/environmental", done: null },
        { label: "Portfolio: numbered + captioned figures",            done: null },
        { label: "Reflection: self-assessed level",                    done: null },
        { label: "Reflection: process + challenges + lessons",         done: null },
        { label: "AI-use statement (if used) on front page",           done: null },
        { label: "Submitted to Learning Platform",                     done: null },
        { label: "On-campus demo attended",                            done: null }
      ],
      nextAction: "Choose the project (or surface what already exists)",
      notes: "Studio module — weekly attendance is part of grading."
    }
  ]
};
