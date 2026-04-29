// =============================================================
// Module data — single source of truth for the dashboard
// Sourced ONLY from /deliverables/00_Module_Action_Plan.md (scraped from
// fuxam.app on 2026-04-28) and the module brief PDFs in /deliverables/{id}/.
// Nothing is invented — items I can't pin down are flagged "Confirm with X".
// =============================================================

export type DeliverableStatus = 'todo' | 'inprogress' | 'done' | 'undecided';

export interface Deliverable {
  name: string;
  status: DeliverableStatus;
  notes?: string;
  /** Path relative to /deliverables/{moduleId}/ — file in repo */
  file?: string;
  /** External URL (Drive, Notion, etc.) */
  url?: string;
}

export interface ChecklistItem {
  label: string;
  /** true=done, false=not done, null=unknown */
  done: boolean | null;
}

export interface Level3Step {
  /** What you have to do to clear the bar for a 3 on the standard path */
  step: string;
  /** Optional extra context */
  why?: string;
  done: boolean | null;
}

export interface ModuleData {
  id: string;
  code: string;
  title: string;
  ects: number;
  organizer: string;
  type: string;
  /** Path Jean-Luc is taking — always 'Standard' for SS26 */
  assessmentPath: string;
  /** Always 3 — the target level Jean-Luc has confirmed across the board */
  targetLevel: 3;
  oralExamDate: string | null;
  keyRules: string[];
  deliverables: Deliverable[];
  /** The exact, ordered to-do list to clear Level 3 on the standard path */
  level3Plan: Level3Step[];
  checklist: ChecklistItem[];
  nextAction: string;
  notes: string;
  accent: 'violet' | 'pink' | 'sky' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'teal';
  /** Filename of the module brief PDF inside /deliverables/{id}/ */
  briefFile?: string;
}

export interface DashboardData {
  deadline: string;
  semester: string;
  student: string;
  project: string;
  lastUpdated: string;
  todayFocus: string[];
  decisions: { id: string; label: string; status: 'open' | 'resolved' }[];
  modules: ModuleData[];
}

export const data: DashboardData = {
  deadline: '2026-05-04',
  semester: 'SS26',
  student: 'Jean-Luc',
  project: 'Mango Lab → Still',
  lastUpdated: '2026-04-29',

  todayFocus: [
    'PM_16 — finish Part 4 (Q14–Q19) in the main Google Doc + verify all 5 artifact PDFs',
    'PM_22 — schedule + run ≥5 user interviews (Level 1 minimum requirement)',
    'PM_23 — confirm Roland approves the €400 ENGINE_001 budget',
    'PM_23 — start the Sales Report (cold outreach template + funnel)',
  ],

  decisions: [
    { id: 'pm22-level',  label: 'PM_22 Level-3 add-on → REFLECTION ESSAY (locked)',                status: 'resolved' },
    { id: 'pm23-sales',  label: 'PM_23 Sales template → COLD OUTREACH (locked)',                   status: 'resolved' },
    { id: 'se01-path',   label: 'SE_01 path → STANDARD IN-PERSON EXAM (locked)',                   status: 'resolved' },
    { id: 'id30-cp',     label: 'ID_30 — confirmed 10 ECTS',                                        status: 'resolved' },
    { id: 'sts04-spec',  label: 'STS_04 — confirm exact assessment format with Fabian Geier',      status: 'open' },
    { id: 'pm22-add-on-spec', label: 'PM_22 — confirm reflection-essay spec/length with Swantje',  status: 'open' },
    { id: 'pm23-roland', label: 'PM_23 — book the mandatory Roland check-in if not done',          status: 'open' },
  ],

  modules: [
    /* ============================================================
       PM_22 / BM_22 — Product Discovery — 10 ECTS
       Source: action plan §3 (full Level 1/2/3 breakdown)
       Add-on choice: REFLECTION ESSAY (locked)
       ============================================================ */
    {
      id: 'PM_22',
      code: 'PM_22 / BM_22',
      title: 'Product Discovery',
      ects: 10,
      organizer: 'Swantje Quoos',
      type: 'Core Compulsory Elective Group 2',
      assessmentPath: 'Standard · Level 3 (Reflection Essay)',
      targetLevel: 3,
      oralExamDate: null,
      accent: 'violet',
      briefFile: 'module_brief.pdf',
      keyRules: [
        'Better Products presentation + 25-min oral exam (10-min talk + 15-min Q&A)',
        'Hand-in: SINGLE PDF of slides + statement on whether/how genAI was used',
        '≥5 user interviews/surveys MUST be in slide appendix',
        'No remote assessments. No reassessment format change.',
        'Submit via Google Form',
      ],
      deliverables: [
        { name: 'Single PDF — slide deck covering all 6 knowledge areas',  status: 'inprogress', notes: 'Pitch deck + BMC + traction cards already cover much of this', file: '../shared/01_pitch_deck.pdf' },
        { name: '"Better Products" presentation (10 min)',                 status: 'todo',       notes: '6 examples — one per knowledge area' },
        { name: 'Oral exam (15-min Q&A)',                                  status: 'todo',       notes: 'Synthesizes findings across the 6 knowledge areas' },
        { name: 'AI-use statement on the deck',                            status: 'todo',       notes: 'Declare every Claude usage' },
        { name: 'Level-3 add-on: Reflection Essay',                        status: 'todo',       notes: 'LOCKED (chose essay over community article / workshop). Confirm length + prompt with Swantje.' },
        { name: 'Pitch Deck (Mango Lab) — reference asset',                status: 'done',       file: '../shared/01_pitch_deck.pdf' },
        { name: 'Validation Plan v3 — reference asset',                    status: 'done',       file: '../shared/06_validation_plan_v3.pdf' },
        { name: 'Traction Test Cards — reference asset',                   status: 'done',       file: '../shared/07_traction_test_cards.html' },
      ],
      level3Plan: [
        { step: 'Level 1 — deliver every Level-1 minimum content item below in the slide deck', why: 'No L1 → no L3', done: false },
        { step: 'Level 2 — add Lean Canvas, trend-scenario analysis, Solution-Impact Board', why: 'L2 is the gateway to L3', done: false },
        { step: 'Level 3 — write the reflection essay (locked choice)', why: 'You chose essay over community article / workshop', done: false },
        { step: 'Confirm reflection-essay spec (length, prompt, citation style) with Swantje', why: 'PDFs cut off — exact spec not in scraped material', done: null },
        { step: 'Rehearse the 10-min talk + Q&A drill on every knowledge area', why: '15-min Q&A weighs as much as the talk', done: false },
        { step: 'Compile single PDF: deck + appendix (≥5 interviews) + AI-use statement', why: 'Single-PDF rule', done: false },
        { step: 'Submit via Google Form by 2026-05-04', done: false },
      ],
      checklist: [
        // Level 1 minimum content (from action plan §3)
        { label: 'L1 — Problem statement',                                 done: true  },
        { label: 'L1 — ≥5 user interviews/surveys (in appendix)',          done: false },
        { label: 'L1 — Secondary research',                                done: true  },
        { label: 'L1 — User/beneficiary group definition + quantification', done: true  },
        { label: 'L1 — 1–3 Personas',                                      done: true  },
        { label: 'L1 — User journey map',                                  done: false },
        { label: 'L1 — Value Proposition Canvas',                          done: false },
        { label: 'L1 — Competitor matrix',                                 done: true  },
        { label: 'L1 — PESTLE analysis',                                   done: false },
        { label: 'L1 — TAM / SAM / SOM (top-down + bottom-up)',            done: true  },
        { label: 'L1 — Future market prognosis',                           done: false },
        { label: 'L1 — Beachhead market',                                  done: true  },
        { label: 'L1 — Solution from creativity techniques',               done: true  },
        { label: 'L1 — Value proposition statement',                       done: true  },
        { label: 'L1 — Solution evaluation (DUFVS + SWOT)',                done: false },
        { label: 'L1 — Prototype description',                             done: true  },
        { label: 'L1 — ≥3 hypothesis cards',                               done: true  },
        { label: 'L1 — Experiment board',                                  done: null  },
        { label: 'L1 — Prototype test methods + results',                  done: null  },
        { label: 'L1 — MVP description + user story map',                  done: false },
        { label: 'L1 — Build-Measure-Learn cycle',                         done: true  },
        // Level 2 add-ons
        { label: 'L2 — Lean Canvas',                                       done: true  },
        { label: 'L2 — Trend-scenario analysis',                           done: false },
        { label: 'L2 — Solution-Impact Board',                             done: false },
        // Level 3 add-on
        { label: 'L3 — Reflection essay drafted',                          done: false },
        { label: 'L3 — Reflection essay reviewed for clarity + depth',     done: false },
      ],
      nextAction: 'Schedule + run the ≥5 user interviews this week (L1 hard gate) AND start the reflection essay in parallel',
      notes: 'Heaviest module. Pitch deck + BMC + traction cards already cover ~70% of L1 content. The L1 gaps are the interviews, journey map, VPC, PESTLE, SWOT, user story map. Reflection essay choice locked — no need to debate community article / workshop.',
    },

    /* ============================================================
       PM_23 / BM_23 — Product Marketing & Sales — 10 ECTS
       Source: action plan §2
       Sales template choice: COLD OUTREACH (locked)
       Level-3 add-on: optional ≤3,000-word leveling-up report
       ============================================================ */
    {
      id: 'PM_23',
      code: 'PM_23 / BM_23',
      title: 'Product Marketing & Sales',
      ects: 10,
      organizer: 'Roland Fassauer',
      type: 'Core Compulsory Elective Group 2',
      assessmentPath: 'Standard · Level 3 (Leveling-up Report)',
      targetLevel: 3,
      oralExamDate: null,
      accent: 'pink',
      briefFile: 'module_brief.pdf',
      keyRules: [
        '1 module-specific check-in with Roland during project phase (mandatory)',
        'Active participation in consulting sessions (mandatory)',
        'Marketing Report ~18 pages, single PDF — academic writing standards',
        'CITATIONS REQUIRED on Marketing Report — no citations = automatic fail',
        'Sales Report = enablement deck (persona + value-prop + cold outreach + funnel)',
        'Submit via Google Form',
      ],
      deliverables: [
        { name: 'Marketing Report (~18 pages, single PDF, with citations)',       status: 'inprogress', notes: 'Campaign Plan HTML covers most content; needs academic framing + citations' },
        { name: 'Sales Report — enablement deck (Cold Outreach template)',         status: 'todo',       notes: 'LOCKED: cold outreach. Persona + buyer persona + value prop + cold-email template + sample sales funnel' },
        { name: 'Roland check-in (module-specific, project-phase)',                 status: 'todo',       notes: 'MANDATORY — confirm booked' },
        { name: 'Consulting sessions — active participation',                       status: 'todo',       notes: 'MANDATORY — track attendance' },
        { name: 'Run the actual Meta Ads campaign (€400, 14 days)',                 status: 'todo',       notes: 'Target 30–60 sign-ups @ ≤€15 CPS' },
        { name: 'Class analysis report (post-campaign reflection)',                 status: 'todo',       notes: 'Performance + creative + funnel + ROI + lessons' },
        { name: 'Level-3 add-on: ≤3,000-word leveling-up report',                   status: 'todo',       notes: 'Achievements / community contributions, full academic standards' },
        { name: 'Submit via Google Form',                                            status: 'todo',       notes: '' },
        { name: 'Campaign Plan (HTML) — done reference',                             status: 'done',       file: '../shared/08_engine001_campaign_plan.html' },
        { name: 'Creative Brief — 5 creatives (HTML) — done reference',              status: 'done',       file: '../shared/09_engine001_creative_brief.html' },
        { name: 'Executive Summary for Roland (HTML) — done reference',              status: 'done',       file: '../shared/10_engine001_roland_summary.html' },
      ],
      level3Plan: [
        { step: 'Book + complete the mandatory check-in with Roland', why: 'No check-in = the assessment is incomplete', done: null },
        { step: 'Show up to consulting sessions (track attendance)', why: 'Active participation is mandatory', done: null },
        { step: 'Marketing Report — 18 pages with academic citations (no citations = auto-fail)', why: 'Hard rule on PM_23 marking grid', done: false },
        { step: 'Sales Report deck — persona + buyer persona + value prop + cold-outreach template + sample funnel', why: 'Cold outreach locked', done: false },
        { step: 'Run the €400 Meta Ads campaign and analyze results', why: 'Post-campaign analysis feeds the Marketing Report', done: false },
        { step: 'Write the ≤3,000-word leveling-up report (academic standards) — this is what unlocks Level 3', why: 'The "Leveling Up" optional report is the explicit L3 path in the action plan', done: false },
        { step: 'Submit everything via Google Form by 2026-05-04', done: false },
      ],
      checklist: [
        { label: 'Marketing — customer lifecycle mapped',                done: true  },
        { label: 'Marketing — consumer behavior / pain signals',         done: true  },
        { label: 'Marketing — Meta Ads strategy + structure',            done: true  },
        { label: 'Marketing — KPIs + targets defined',                   done: true  },
        { label: 'Marketing — risk analysis',                            done: true  },
        { label: 'Marketing — 14-day calendar',                          done: true  },
        { label: 'Marketing — academic citations added (no-fail rule)',  done: false },
        { label: 'Marketing — assembled into 18-page PDF',               done: false },
        { label: 'Sales — user persona',                                  done: false },
        { label: 'Sales — buyer persona',                                 done: false },
        { label: 'Sales — value-based product proposition',               done: false },
        { label: 'Sales — Cold Outreach template (subject + body + 2 follow-ups)', done: false },
        { label: 'Sales — example sales funnel with qualified leads',    done: false },
        { label: 'Sales — assembled into deck',                          done: false },
        { label: 'Roland approves the €400 budget',                      done: null  },
        { label: 'Roland mandatory check-in completed',                   done: null  },
        { label: 'Consulting sessions attended',                          done: null  },
        { label: 'Campaign launched (D1)',                                done: null  },
        { label: 'D7 building-in-public LinkedIn post',                   done: null  },
        { label: 'Campaign closed (D14)',                                 done: null  },
        { label: 'Class analysis report drafted',                        done: null  },
        { label: 'Leveling-up report drafted (≤3,000 words, academic)',  done: false },
        { label: 'Submitted via Google Form',                            done: false },
      ],
      nextAction: 'Confirm the Roland check-in is booked, then start the Sales Report (cold outreach + funnel) — biggest blank',
      notes: 'Three core docs are drafted (Campaign Plan, Creative Brief, Exec Summary). Sales Report is the biggest blank. Marketing Report needs the academic-citation pass to avoid auto-fail.',
    },

    /* ============================================================
       PM_18 / BM_18 — Data Science & AI for PMs — 5 ECTS
       Source: action plan §5 + PM_18 PDF Standard Assessment Instructions
       No explicit Level 3 add-on in scraped material — Level 3 = depth +
       quality of applied examples + reflection (per CODE Level Descriptions)
       ============================================================ */
    {
      id: 'PM_18',
      code: 'PM_18 / BM_18',
      title: 'Data Science & AI for PMs',
      ects: 5,
      organizer: 'Florian Grote',
      type: 'Core Elective',
      assessmentPath: 'Standard · Level 3 (Depth + Reflection)',
      targetLevel: 3,
      oralExamDate: null,
      accent: 'sky',
      briefFile: 'module_brief.pdf',
      keyRules: [
        'Portfolio assessment + optional 15-min oral exam',
        'Single PDF answering all 8 knowledge-area questions with APPLIED (not theoretical) examples',
        '≥1 detailed product/operations LLM prompt the assessor can ACTUALLY RUN',
        'Reflection part max 2,000 words (descriptions/prompts don\'t count)',
        'Statement on how genAI was used in creating the hand-in',
        'Submit via Google Form',
      ],
      deliverables: [
        { name: 'Portfolio PDF — 8 questions with applied Mango Lab examples', status: 'todo', notes: 'Each Q answered with concrete, applied example (not theory)' },
        { name: 'Runnable LLM prompt (assessor must be able to run it)',       status: 'todo', notes: 'Real prompt from Mango Lab ops, not a toy' },
        { name: 'Reflections per response (≤2,000 words total)',               status: 'todo', notes: 'Reflect on value creation potential + risks per Q' },
        { name: 'GenAI usage statement',                                       status: 'todo', notes: 'Disclose every Claude/AI usage during creation' },
      ],
      level3Plan: [
        { step: 'Pick Mango Lab as the single running example for all 8 questions', why: 'Action plan §5 says "applied not theoretical" — one consistent project beats 8 toy examples', done: false },
        { step: 'Q1+Q2 (Chat tools for PM): get-most-out-of-LLMs + LLM tools in product ops — written from real Mango Lab usage', done: null },
        { step: 'Q3+Q4+Q5 (Data Culture): infrastructure components + culture components + data-ethics approach — applied to Mango Lab', done: null },
        { step: 'Q6+Q7+Q8 (AI-enabled Products): where genAI adds user value + ethical use + measuring success', done: null },
        { step: 'Build ONE detailed runnable LLM prompt from real Mango Lab ops — must be reproducible by assessor', why: 'Hard requirement. Assessor must run it.', done: null },
        { step: 'Write reflection per response (cumulative ≤2,000 words) — focus on value + risks (this is the L3 differentiator)', why: 'Depth of reflection is what separates L1/L2/L3 per CODE Level Descriptions', done: null },
        { step: 'Add the AI-use statement (declare Claude usage)', done: null },
        { step: 'Compile to single PDF, submit via Google Form', done: null },
      ],
      checklist: [
        { label: 'Q1: Getting most out of LLMs (with Mango Lab example)',   done: null },
        { label: 'Q2: LLM tools in product ops (with Mango Lab example)',   done: null },
        { label: 'Q3: Data infrastructure components in Mango Lab',         done: null },
        { label: 'Q4: Data culture components in Mango Lab',                done: null },
        { label: 'Q5: Approach to data ethics',                             done: null },
        { label: 'Q6: Where genAI could add user value in Mango Lab',       done: null },
        { label: 'Q7: Ensuring ethical use of genAI',                       done: null },
        { label: 'Q8: Measuring success of AI features',                    done: null },
        { label: 'Detailed runnable prompt included + reproducible',        done: null },
        { label: 'Reflections per Q (cumulative ≤2,000 words)',             done: null },
        { label: 'Reflection emphasises value creation potential + risks',  done: null },
        { label: 'AI-use statement included',                               done: null },
        { label: 'Compiled to single PDF + submitted via Google Form',      done: null },
      ],
      nextAction: 'Map each of the 8 questions to a concrete Mango Lab example before drafting any text',
      notes: 'PM_18 brief PDF says "knowledge + application of knowledge + reflection on application" — Level 3 here is depth and quality of reflection, not an extra deliverable.',
    },

    /* ============================================================
       PM_16 / BM_16 — How to Start a Startup — 5 ECTS
       Source: data.js (notion classroom — 100-pt structure)
       Main doc: Jean-Luc's Google Doc (LIVE LINK)
       ============================================================ */
    {
      id: 'PM_16',
      code: 'PM_16 / BM_16',
      title: 'How to Start a Startup',
      ects: 5,
      organizer: 'Fabiano Abreu Ott',
      type: 'Core Mandatory',
      assessmentPath: 'Standard · Level 3 (100 points incl. Artifacts ×40)',
      targetLevel: 3,
      oralExamDate: null,
      accent: 'amber',
      briefFile: 'module_brief.pdf',
      keyRules: [
        '100 points across 4 parts + Challenge Reflections (10 pts) + Artifacts (40 pts)',
        'Submit as ZIP: completed doc (PDF export) + "artifacts" folder',
        'Single Google Form for submission (linked from doc)',
        'Artifacts = 40% of total grade — biggest single bucket',
      ],
      deliverables: [
        // ⭐ Main doc = the actual Google Doc Jean-Luc is working in
        { name: '⭐ Main doc (Q2–Q21, all parts) — opens in Google Docs',
          status: 'inprogress',
          notes: '~80% drafted. Part 4 (Q14–Q19) still needs filling.',
          url: 'https://docs.google.com/document/d/1vmkpRvypoWiZZHVhAvnnkhWK246ff_Jl-dNFZ8wdNgo/edit?usp=sharing',
        },
        { name: 'Part 4 drafts (Q14–Q19) — Claude scratchpad',          status: 'inprogress', notes: 'Working notes for the Google Doc', file: 'PM_16_Part4_Drafts.md' },
        { name: 'Artifact 1 — TAM/SAM/SOM (PDF, 1 page)',               status: 'inprogress', notes: 'Numbers exist in the pitch deck — needs 1-pg export' },
        { name: 'Artifact 2 — Lean Canvas (PDF, 1 page)',               status: 'inprogress', notes: 'Existing in shared assets', file: '../shared/02_business_model_canvas.pdf' },
        { name: 'Artifact 3 — Risk Ledger (PDF, 1 page)',               status: 'inprogress', notes: 'Risks 4–6 written up', file: '../shared/03_risk_ledger.pdf' },
        { name: 'Artifact 4 — Unit Economics (PDF, 1 page)',            status: 'inprogress', notes: 'still_unit_economics.xlsx needs PDF export', file: '../shared/04_unit_economics.xlsx' },
        { name: 'Artifact 5 — Pitch Deck (PDF)',                        status: 'done',       file: '../shared/01_pitch_deck.pdf' },
        { name: 'Challenge 1/4 reflection',                             status: 'todo',       notes: '' },
        { name: 'Challenge 2/4 reflection',                             status: 'todo',       notes: '' },
        { name: 'Challenge 3/4 reflection',                             status: 'todo',       notes: '' },
        { name: 'Challenge 4/4 reflection',                             status: 'todo',       notes: '' },
        { name: 'ZIP submission via Google Form',                       status: 'todo',       notes: 'Doc PDF + artifacts folder' },
      ],
      level3Plan: [
        { step: 'Finish Part 4 in the main Google Doc — Q14, Q15, Q16, Q17, Q18, Q19', why: 'Part 4 = 4 questions still empty + 2 unverified. Biggest open work.', done: false },
        { step: 'Verify Q20 (genAI usage statement) is filled', done: false },
        { step: 'Verify Q21 (original-work certification) is signed', done: false },
        { step: 'Export the Google Doc as PDF', done: false },
        { step: 'Finalize Artifact 1 — TAM/SAM/SOM as 1-page PDF', why: '40 pts across 5 artifacts = 8 pts each. All 5 must be 1-page PDFs.', done: null },
        { step: 'Finalize Artifact 2 — Lean Canvas as 1-page PDF', done: null },
        { step: 'Finalize Artifact 3 — Risk Ledger as 1-page PDF', done: null },
        { step: 'Finalize Artifact 4 — Unit Economics as 1-page PDF (export from xlsx)', done: null },
        { step: 'Finalize Artifact 5 — Pitch Deck as PDF', done: null },
        { step: 'Write the 4 Challenge reflections (10 pts total)', done: false },
        { step: 'ZIP doc PDF + artifacts folder + submit via Google Form', done: false },
      ],
      checklist: [
        { label: 'Q2 Why in entrepreneurship',                             done: true  },
        { label: 'Q3 Entrepreneurship definition',                         done: true  },
        { label: 'Q4 Project type (CODE project: Mango Lab)',              done: true  },
        { label: 'Q5–Q8 Venture / positioning / traction test',            done: true  },
        { label: 'Q9 Risk Ledger reflection (Risks 4–6 written)',          done: true  },
        { label: 'Q10 Six-month problem (capacity)',                       done: true  },
        { label: 'Q11 Cross-cultural perception',                          done: true  },
        { label: 'Q12 Moat / defensibility',                               done: true  },
        { label: 'Q13 Innovation as competitive advantage',                done: true  },
        { label: 'Q14 — needs check',                                      done: null  },
        { label: 'Q15 — needs check',                                      done: null  },
        { label: 'Q16 Personal non-negotiables',                           done: false },
        { label: 'Q17 Legal entity choice',                                done: false },
        { label: 'Q18 Most important thing/person to learn from in Berlin', done: false },
        { label: 'Q19 Reflection on the journey',                          done: false },
        { label: 'Q20 Generative AI usage statement',                      done: false },
        { label: 'Q21 Original-work certification',                        done: false },
        { label: 'Artifact 1 — TAM/SAM/SOM as 1-page PDF',                 done: null  },
        { label: 'Artifact 2 — Lean Canvas as 1-page PDF',                 done: null  },
        { label: 'Artifact 3 — Risk Ledger as 1-page PDF',                 done: null  },
        { label: 'Artifact 4 — Unit Economics as 1-page PDF',              done: null  },
        { label: 'Artifact 5 — Pitch Deck as PDF',                         done: null  },
        { label: 'Challenge 1/4 reflection',                               done: null  },
        { label: 'Challenge 2/4 reflection',                               done: null  },
        { label: 'Challenge 3/4 reflection',                               done: null  },
        { label: 'Challenge 4/4 reflection',                               done: null  },
        { label: 'Doc exported as PDF',                                    done: false },
        { label: 'All files zipped',                                       done: false },
        { label: 'Submitted via Google Form',                              done: false },
      ],
      nextAction: 'Open the main Google Doc (top of deliverables) and finish Part 4 (Q14–Q19) — that\'s the biggest gap to a full Level-3 hand-in',
      notes: 'Doc is well underway. Artifacts bucket (40 pts) is the biggest leverage — confirm all 5 are 1-page PDFs.',
    },

    /* ============================================================
       STS_04 — Presentation — 5 ECTS
       Source: action plan §1
       LU: "The Universal, All-powerful... with Croissants"
       Standard path — spec set by Fabian Geier
       ============================================================ */
    {
      id: 'STS_04',
      code: 'STS_04',
      title: 'Presentation',
      ects: 5,
      organizer: 'Fabian Geier',
      type: 'STS Mandatory',
      assessmentPath: 'Standard · Level 3 (LU-defined spec)',
      targetLevel: 3,
      oralExamDate: null,
      accent: 'rose',
      briefFile: undefined,
      keyRules: [
        'Booked LU: "The Universal, All-powerful... with Croissants"',
        'Module typically = presentation OR video essay at the end',
        'NO generative AI for the assessment or much of the teaching',
        'Specifics set by the lecturer (Fabian) — exact spec must be confirmed',
      ],
      deliverables: [
        { name: 'Presentation OR video essay (lecturer-set spec)', status: 'todo', notes: 'Get exact requirements from Fabian — this is the unblocker' },
      ],
      level3Plan: [
        { step: 'Confirm exact assessment format from Fabian (presentation vs video essay, length, format)', why: 'Cannot plan to L3 without knowing the brief', done: false },
        { step: 'Read all assigned materials thoroughly (LU-specific)', done: null },
        { step: 'Develop your own observations / criticisms / summaries (NO genAI)', why: 'No-AI rule means deliverable must be written entirely by Jean-Luc', done: null },
        { step: 'Outline the presentation/video', done: null },
        { step: 'Build slides or storyboard', done: null },
        { step: 'Rehearse', done: null },
        { step: 'Deliver / submit by 2026-05-04', done: null },
      ],
      checklist: [
        { label: 'Read all assigned materials thoroughly',            done: null },
        { label: 'Reviewed themes discussed in class',                done: null },
        { label: 'Own observations / criticisms / summaries developed', done: null },
        { label: 'Exact assessment spec confirmed with Fabian',       done: null },
        { label: 'Outlined the presentation/video',                   done: null },
        { label: 'Created slides or storyboard',                      done: null },
        { label: 'Rehearsed',                                         done: null },
        { label: 'Delivered / submitted',                             done: null },
      ],
      nextAction: 'Email Fabian Geier today to confirm exact assessment format for The Universal All-powerful LU — that unblocks everything',
      notes: 'Claude can help plan + brainstorm + source-find but CANNOT write the deliverable — no-AI rule. Biggest unblocker is the spec from Fabian.',
    },

    /* ============================================================
       SE_01 — Software Development Basics — 5 ECTS
       Source: action plan §4
       Path: STANDARD IN-PERSON EXAM (locked)
       ============================================================ */
    {
      id: 'SE_01',
      code: 'SE_01',
      title: 'Software Development Basics',
      ects: 5,
      organizer: 'Samuel Boguslawski',
      type: 'Core Elective',
      assessmentPath: 'Standard · Level 3 (In-person Exam)',
      targetLevel: 3,
      oralExamDate: null,
      accent: 'emerald',
      briefFile: 'module_brief.pdf',
      keyRules: [
        'Standard in-person exam: build a small game/app in 1–4 hours',
        'Granular Git commits required (push to remote)',
        'NO generative AI during the exam OR for the hand-in',
        'Bring own laptop with IDE + git + language pre-installed',
        'OS_01 prerequisite (base programming + folder/setup skills)',
      ],
      deliverables: [
        { name: 'Standard in-person coding exam — small game/app, 1–4hr', status: 'todo', notes: 'LOCKED: standard path (no alt project, no combined assessment)' },
      ],
      level3Plan: [
        { step: 'Confirm OS_01 prerequisite is met', why: 'Hard prerequisite — without it the exam doesn\'t count', done: null },
        { step: 'Practice 2–3 small projects (game/app) with granular Git commits before the exam', why: 'Git granularity is graded', done: false },
        { step: 'Pre-install IDE + git + your chosen language on your laptop', why: 'You have to bring it ready', done: false },
        { step: 'Book the standard exam slot', done: null },
        { step: 'Sit the exam, build the game/app, push to remote with granular commits', why: 'NO Claude help during the exam — purely your own code', done: false },
      ],
      checklist: [
        { label: 'OS_01 prerequisite confirmed',                         done: null },
        { label: 'Practice project 1 — small app, granular commits',     done: false },
        { label: 'Practice project 2 — small game, granular commits',    done: false },
        { label: 'IDE + git + language pre-installed on laptop',         done: false },
        { label: 'Standard exam slot booked',                            done: null },
        { label: 'Exam sat — game/app built + pushed with granular Git', done: false },
      ],
      nextAction: 'Confirm OS_01 prereq is met, then practice one small project with granular commits this week',
      notes: 'Claude CANNOT help generate code for the exam (no-AI rule). Can help with planning, practice setup, and reviewing your committed code AFTER the exam.',
    },

    /* ============================================================
       ID_09 / DS_09 — Design Strategy — 5 ECTS
       Source: action plan §7
       Standard path — Level 3 = self-assessed in 500-word reflection
       ============================================================ */
    {
      id: 'ID_09',
      code: 'ID_09 / DS_09',
      title: 'Design Strategy',
      ects: 5,
      organizer: 'Pras Gunasekera',
      type: 'Core Elective · Available SS26 (Assessment Only Fall/Winter)',
      assessmentPath: 'Standard · Level 3 (Self-assessed in reflection)',
      targetLevel: 3,
      oralExamDate: null,
      accent: 'teal',
      briefFile: 'module_brief.pdf',
      keyRules: [
        'TWO posters (PDF), uploaded to Fuxam pre-Demo',
        'Poster Presentation at Demo event (open audience)',
        '~500-word reflective self-assessment',
        'APA 7th citations EVERYWHERE (posters + reflection)',
        'Captioned/cited images',
      ],
      deliverables: [
        { name: 'Poster 1 (PDF, APA 7th)',                                 status: 'todo', notes: 'Framing + role of Design in Industry + design strategy tools (advantages/disadvantages/implications) + your usage of those methods' },
        { name: 'Poster 2 (PDF, APA 7th)',                                 status: 'todo', notes: 'Developed creative outcomes + next steps (immediate/mid/long) + design outcomes & touchpoints' },
        { name: 'Poster Presentation at Demo event (open audience)',       status: 'todo', notes: '' },
        { name: '~500-word Reflective self-assessment (with Gibbs cycle)', status: 'todo', notes: 'Self-assessed Level 3 + reasoning + role in team + reflective cycle (Gibbs)' },
      ],
      level3Plan: [
        { step: 'Pick the area/topic/project for the posters', why: 'Everything else flows from this', done: false },
        { step: 'Research design strategy tools/methods + sources (APA 7th)', done: false },
        { step: 'Build Poster 1: framing + role of Design + tools (advantages/disadvantages/implications) + your usage', done: false },
        { step: 'Build Poster 2: creative outcomes + next steps + design outcomes/touchpoints', done: false },
        { step: 'Write ~500-word reflection: Gibbs cycle + self-assessed Level 3 with REASONING', why: 'Level 3 here is YOU declaring it — the reasoning is what justifies the grade', done: false },
        { step: 'Add APA 7th citations across both posters AND the reflection', why: 'Hard requirement', done: false },
        { step: 'Upload both posters as PDFs to Fuxam BEFORE the Demo event', done: false },
        { step: 'Present at the Demo event (open audience)', done: false },
      ],
      checklist: [
        { label: 'Topic/area/project chosen',                                 done: null },
        { label: 'Poster 1: framing + contextual relevance',                  done: null },
        { label: 'Poster 1: role of Design in Industry',                      done: null },
        { label: 'Poster 1: design strategy tools (advantages/disadvantages)', done: null },
        { label: 'Poster 1: own utilization of tools',                        done: null },
        { label: 'Poster 2: creative outcomes',                                done: null },
        { label: 'Poster 2: project milestones (immediate/mid/long)',          done: null },
        { label: 'Poster 2: design outcomes / touchpoints',                    done: null },
        { label: 'Reflection: self-assessed Level 3 + reasoning',              done: null },
        { label: 'Reflection: personal reflection + Gibbs cycle',              done: null },
        { label: 'APA 7th citations across posters + reflection',              done: null },
        { label: 'Posters uploaded to Fuxam pre-Demo',                         done: null },
        { label: 'Demo presentation delivered',                                done: null },
      ],
      nextAction: 'Decide the area/topic/project for the poster pair — that\'s blocking everything',
      notes: 'Level 3 here is self-declared in the 500-word reflection. The REASONING for declaring Level 3 is what the assessor evaluates.',
    },

    /* ============================================================
       ID_30 / DS_30 — AI in Design — 10 ECTS
       Source: action plan §8
       Studio module — mandatory weekly attendance
       Level 3 = self-assessed in 500-word reflection
       ============================================================ */
    {
      id: 'ID_30',
      code: 'ID_30 / DS_30',
      title: 'AI in Design',
      ects: 10,
      organizer: 'Daniel Buzzo',
      type: 'Studio Module — mandatory weekly attendance',
      assessmentPath: 'Standard · Level 3 (Self-assessed in reflection)',
      targetLevel: 3,
      oralExamDate: null,
      accent: 'indigo',
      briefFile: 'module_brief.pdf',
      keyRules: [
        'MANDATORY group session on campus — poster/exhibition demo (no-show = non-submission)',
        'Short oral exam at the session (Q&A on knowledge + self-reflection)',
        'Annotated portfolio (PDF, ≤15 pages)',
        '500-word self-reflection essay',
        'Studio module: weekly participation + p5.js / Processing prep tasks',
        'GenAI use ALLOWED with documentation (prompts, revisions, GDPR-compliant tools)',
        'No genAI for fake data extrapolation without explicit written permission',
      ],
      deliverables: [
        { name: 'Prototype / design / artwork / system',                    status: 'todo', notes: 'Pick the project first' },
        { name: 'Annotated portfolio (PDF, ≤15 pages)',                     status: 'todo', notes: 'Design decisions + research evidence + AI/ML techniques used + ethical/social/regulatory aspects' },
        { name: '500-word self-reflection essay',                           status: 'todo', notes: 'Self-assessed Level 3 + reasoning + reflection on process / time' },
        { name: 'On-campus demo + oral exam',                                status: 'todo', notes: 'MANDATORY — no-show = non-submission' },
        { name: 'AI-use statement on portfolio front page',                  status: 'todo', notes: 'Or state if you chose NOT to use it' },
      ],
      level3Plan: [
        { step: 'Pick the project (prototype/design/artwork/system)', why: 'Blocks everything else', done: false },
        { step: 'Pick the AI/ML technique(s): STT / TTS / CV / neural nets / LLMs', done: false },
        { step: 'Build the p5.js / Processing prototype (basic coding expected)', done: false },
        { step: 'Annotated portfolio (≤15 pages): design decisions + research + dev process + social/regulatory/ethical/environmental aspects + numbered/captioned figures', done: false },
        { step: 'Write 500-word reflection: self-assessed Level 3 + reasoning + process + time + challenges', why: 'Same as ID_09 — L3 is self-declared and the REASONING is what\'s graded', done: false },
        { step: 'Document AI usage throughout the portfolio (prompts, revisions, tools)', why: 'AI use is allowed but MUST be documented', done: false },
        { step: 'Attend the on-campus demo + oral exam (mandatory)', why: 'No-show = non-submission. Hardest non-negotiable.', done: false },
        { step: 'Submit to Learning Platform', done: false },
      ],
      checklist: [
        { label: 'Project idea chosen',                                done: null },
        { label: 'Primary research / inspirations gathered',           done: null },
        { label: 'AI/ML technique(s) selected',                        done: null },
        { label: 'p5.js / Processing prototype built',                 done: null },
        { label: 'Portfolio: design decisions + outcomes',             done: null },
        { label: 'Portfolio: development process',                     done: null },
        { label: 'Portfolio: social/regulatory/ethical/environmental', done: null },
        { label: 'Portfolio: numbered + captioned figures',            done: null },
        { label: 'Reflection: self-assessed Level 3 + reasoning',      done: null },
        { label: 'Reflection: process + challenges + lessons',         done: null },
        { label: 'AI-use statement on front page',                     done: null },
        { label: 'Submitted to Learning Platform',                     done: null },
        { label: 'On-campus demo attended (MANDATORY)',                done: null },
      ],
      nextAction: 'Pick the project (or surface what already exists from your Studio sessions) — blocks the prototype + portfolio',
      notes: 'Studio module — weekly attendance is part of grading. The on-campus demo is the hardest non-negotiable.',
    },
  ],
};

/* ============================================================================
   Helpers — accent gradients, progress derivation, status labels
   ============================================================================ */

const ACCENT_MAP: Record<ModuleData['accent'], { from: string; to: string; ring: string; chip: string }> = {
  violet:  { from: '#a78bfa', to: '#7c3aed', ring: '#a78bfa', chip: 'rgba(167, 139, 250, 0.18)' },
  pink:    { from: '#f472b6', to: '#db2777', ring: '#f472b6', chip: 'rgba(244, 114, 182, 0.18)' },
  sky:     { from: '#7dd3fc', to: '#0284c7', ring: '#7dd3fc', chip: 'rgba(125, 211, 252, 0.18)' },
  emerald: { from: '#6ee7b7', to: '#059669', ring: '#6ee7b7', chip: 'rgba(110, 231, 183, 0.18)' },
  amber:   { from: '#fcd34d', to: '#d97706', ring: '#fcd34d', chip: 'rgba(252, 211, 77, 0.18)' },
  rose:    { from: '#fda4af', to: '#e11d48', ring: '#fda4af', chip: 'rgba(253, 164, 175, 0.18)' },
  indigo:  { from: '#a5b4fc', to: '#4338ca', ring: '#a5b4fc', chip: 'rgba(165, 180, 252, 0.18)' },
  teal:    { from: '#5eead4', to: '#0d9488', ring: '#5eead4', chip: 'rgba(94, 234, 212, 0.18)' },
};

export const getAccent = (m: ModuleData) => ACCENT_MAP[m.accent];

export function moduleProgress(m: ModuleData): { pct: number; doneCount: number; totalCount: number } {
  const counted = m.deliverables.filter(d => d.status !== 'undecided');
  if (counted.length === 0) return { pct: 0, doneCount: 0, totalCount: 0 };
  const done = counted.filter(d => d.status === 'done').length;
  const inprog = counted.filter(d => d.status === 'inprogress').length;
  const pct = Math.round(((done + inprog * 0.5) / counted.length) * 100);
  return { pct, doneCount: done, totalCount: counted.length };
}

export function moduleStatusLabel(m: ModuleData): { label: string; tone: 'ok' | 'warn' | 'crit' | 'todo' } {
  const { pct } = moduleProgress(m);
  if (pct >= 90) return { label: 'On track',   tone: 'ok'   };
  if (pct >= 50) return { label: 'In progress',tone: 'warn' };
  if (pct >= 15) return { label: 'Drafted',    tone: 'warn' };
  return            { label: 'Not started',     tone: 'todo' };
}
