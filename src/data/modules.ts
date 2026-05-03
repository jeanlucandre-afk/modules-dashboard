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
  /** Click-to-expand: explicit requirements for this deliverable (bulleted) */
  requirements?: string[];
  /** Click-to-expand: ordered sub-tasks to complete this deliverable */
  subTodos?: ChecklistItem[];
  /** Optional longer paragraph of context */
  detail?: string;
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
  /** Click-to-expand: longer guidance / sub-bullets */
  detail?: string[];
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
  lastUpdated: '2026-05-03 (PM_23 submitted)',

  todayFocus: [
    'PM_16 — SUBMITTED ✓ (2026-05-02)',
    'PM_22 — SUBMITTED ✓ (2026-05-03) — deck + Better Products + reflection essay all done',
    'PM_23 — SUBMITTED ✓ (2026-05-03): Marketing Report + Sales Report + Leveling-up Report all uploaded via Google Form. CODE Hand-in template applied, every number traced to /sources/.',
    'PM_23 — NEXT: book oral-exam check-in with Roland + run a self-review session to rehearse walking through the 3 documents',
    'PM_23 — Roland check-in COMPLETED ✓ (steer: run Meta ads to validate)',
    'PM_23 — Campaign result (snapshot at hand-in, still in flight): €250.80 of €400 spent / 22,695 imp / 10,472 reach / 45 leads / CPL €5.57 (5.2x better than €29 benchmark)',
    'PM_18 — SUBMITTED ✓ (2026-05-03): Portfolio PDF uploaded via Google Form. All 8 Qs + Still UI screenshots + 6 multi-brand sample ads + runnable prompt verified live on gpt-image-1 + gpt-image-2.',
  ],

  decisions: [
    { id: 'pm22-level',  label: 'PM_22 Level-3 add-on → REFLECTION ESSAY (locked)',                status: 'resolved' },
    { id: 'pm23-sales',  label: 'PM_23 Sales template → COLD OUTREACH (locked)',                   status: 'resolved' },
    { id: 'se01-path',   label: 'SE_01 path → STANDARD IN-PERSON EXAM (locked)',                   status: 'resolved' },
    { id: 'id30-cp',     label: 'ID_30 — confirmed 10 ECTS',                                        status: 'resolved' },
    { id: 'sts04-spec',  label: 'STS_04 — confirmed: 10-min video essay on Morozov, MP4 link by 2026-05-04', status: 'resolved' },
    { id: 'pm22-add-on-spec', label: 'PM_22 — confirm reflection-essay spec/length with Swantje',  status: 'open' },
    { id: 'pm23-roland', label: 'PM_23 — Roland mandatory check-in COMPLETED ✓',                    status: 'resolved' },
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
      briefFile: 'module_brief.html',
      keyRules: [
        'Better Products presentation + 25-min oral exam (10-min talk + 15-min Q&A)',
        'Hand-in: SINGLE PDF of slides + statement on whether/how genAI was used',
        '≥5 user interviews/surveys MUST be in slide appendix',
        'No remote assessments. No reassessment format change.',
        'Submit via Google Form',
      ],
      deliverables: [
        {
          name: 'Single PDF — slide deck covering all 6 knowledge areas',
          status: 'done',
          notes: '48-page deck rendered 2026-05-03. Ready to submit via Google Form.',
          file: '../shared/01_pitch_deck.pdf',
          requirements: [
            'Single PDF',
            'Covers all 6 knowledge areas (one example per area)',
            '≥5 user interviews/surveys in appendix',
            'AI-use statement on the deck',
            'Submitted via Google Form',
          ],
          detail: 'The deck IS the hand-in. The 25-min oral exam (10 talk + 15 Q&A) walks through it. The 6 knowledge areas are: Problem ID, Customer Discovery & Market, Solution Ideation, Collaborative Design & Prototyping, Solution Validation, MVP + Build-Measure-Learn.',
          subTodos: [
            { label: 'Section 1 — Problem/Opportunity identification + definition', done: true },
            { label: 'Section 2 — Customer Discovery & Market Research (incl. ≥5 interviews in appendix)', done: true },
            { label: 'Section 3 — Solution ideation + creativity techniques', done: true },
            { label: 'Section 4 — Collaborative design + prototyping', done: true },
            { label: 'Section 5 — Solution validation (DUFVS + SWOT)', done: true },
            { label: 'Section 6 — MVP + Build-Measure-Learn cycle', done: true },
            { label: 'Appendix — ≥5 user interview transcripts', done: true },
            { label: 'AI-use statement on the deck', done: true },
            { label: 'Export to single PDF + submit via Google Form', done: true },
          ],
        },
        {
          name: '"Better Products" presentation (10 min)',
          status: 'done',
          notes: 'Delivered ✓ (2026-05-03)',
          requirements: [
            'Exactly 10 minutes',
            'One example per knowledge area (6 total)',
            'Reflection on what you applied + what you learned',
            'Live (no remote assessment allowed)',
          ],
          subTodos: [
            { label: 'Slide pacing rehearsed to ~1.5 min per knowledge area', done: true },
            { label: 'Each KA: example → method used → outcome → reflection', done: true },
            { label: 'Closing slide: top-level reflection on the discovery journey', done: true },
            { label: 'Rehearse with timer at least 3 times', done: true },
          ],
        },
        {
          name: 'Oral exam (15-min Q&A)',
          status: 'todo',
          notes: 'Click to expand. Synthesizes findings across the 6 knowledge areas',
          requirements: [
            '15 minutes of Q&A from Swantje',
            'Synthesizes findings — be ready to compare/contrast across knowledge areas',
            'Defend choices made (why this beachhead, why these personas, etc.)',
          ],
          subTodos: [
            { label: 'Mock Q&A: drill each KA with 3 likely questions', done: false },
            { label: 'Prep "synthesis" answers — how KAs connect to each other', done: false },
            { label: 'Prep "what would you do differently" reflection answer', done: false },
            { label: 'Practice 30-second versions of each section', done: false },
          ],
        },
        { name: 'AI-use statement on the deck',                            status: 'done',       notes: 'Included in deck — slide 48' },
        { name: 'Level-3 add-on: Reflection Essay',                        status: 'done',       notes: 'Drafted 2026-05-03. ~2,050 words. Word doc exported to Downloads.' },
        { name: 'Pitch Deck (Mango Lab) — reference asset',                status: 'done',       file: '../shared/01_pitch_deck.pdf' },
        { name: 'Validation Plan v3 — reference asset',                    status: 'done',       file: '../shared/06_validation_plan_v3.pdf' },
        { name: 'Traction Test Cards — reference asset',                   status: 'done',       file: '../shared/07_traction_test_cards.html' },
      ],
      level3Plan: [
        { step: 'Level 1 — deliver every Level-1 minimum content item below in the slide deck', why: 'No L1 → no L3', done: true },
        { step: 'Level 2 — add Lean Canvas, trend-scenario analysis, Solution-Impact Board', why: 'L2 is the gateway to L3', done: true },
        { step: 'Level 3 — write the reflection essay (locked choice)', why: 'You chose essay over community article / workshop', done: true },
        { step: 'Confirm reflection-essay spec (length, prompt, citation style) with Swantje', why: 'PDFs cut off — exact spec not in scraped material', done: true },
        { step: 'Rehearse the 10-min talk + Q&A drill on every knowledge area', why: '15-min Q&A weighs as much as the talk', done: true },
        { step: 'Compile single PDF: deck + appendix (≥5 interviews) + AI-use statement', why: 'Single-PDF rule', done: true },
        { step: 'Submit via Google Form by 2026-05-04', done: true },
      ],
      checklist: [
        // Level 1 minimum content (from action plan §3)
        { label: 'L1 — Problem statement',                                 done: true  },
        { label: 'L1 — ≥5 user interviews/surveys (in appendix)',          done: true  },
        { label: 'L1 — Secondary research',                                done: true  },
        { label: 'L1 — User/beneficiary group definition + quantification', done: true  },
        { label: 'L1 — 1–3 Personas',                                      done: true  },
        { label: 'L1 — User journey map',                                  done: true  },
        { label: 'L1 — Value Proposition Canvas',                          done: true  },
        { label: 'L1 — Competitor matrix',                                 done: true  },
        { label: 'L1 — PESTLE analysis',                                   done: true  },
        { label: 'L1 — TAM / SAM / SOM (top-down + bottom-up)',            done: true  },
        { label: 'L1 — Future market prognosis',                           done: true  },
        { label: 'L1 — Beachhead market',                                  done: true  },
        { label: 'L1 — Solution from creativity techniques',               done: true  },
        { label: 'L1 — Value proposition statement',                       done: true  },
        { label: 'L1 — Solution evaluation (DUFVS + SWOT)',                done: true  },
        { label: 'L1 — Prototype description',                             done: true  },
        { label: 'L1 — ≥3 hypothesis cards',                               done: true  },
        { label: 'L1 — Experiment board',                                  done: true  },
        { label: 'L1 — Prototype test methods + results',                  done: true  },
        { label: 'L1 — MVP description + user story map',                  done: true  },
        { label: 'L1 — Build-Measure-Learn cycle',                         done: true  },
        // Level 2 add-ons
        { label: 'L2 — Lean Canvas',                                       done: true  },
        { label: 'L2 — Trend-scenario analysis',                           done: true  },
        { label: 'L2 — Solution-Impact Board',                             done: true  },
        // Level 3 add-on
        { label: 'L3 — Reflection essay drafted',                          done: true  },
        { label: 'L3 — Reflection essay reviewed for clarity + depth',     done: true  },
      ],
      nextAction: 'SUBMITTED ✓ — prep 25-min oral exam Q&A when date is confirmed',
      notes: 'COMPLETE (2026-05-03). Deck submitted via Google Form. Better Products delivered. Reflection Essay done. Oral exam date TBC with Swantje.',
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
      briefFile: 'module_brief.html',
      keyRules: [
        '1 module-specific check-in with Roland during project phase (mandatory)',
        'Active participation in consulting sessions (mandatory)',
        'Marketing Report ~18 pages, single PDF — academic writing standards',
        'CITATIONS REQUIRED on Marketing Report — no citations = automatic fail',
        'Sales Report = enablement deck (persona + value-prop + cold outreach + funnel)',
        'Submit via Google Form',
      ],
      deliverables: [
        {
          name: 'Marketing Report (~18 pages, single PDF, with citations)',
          status: 'done',
          notes: 'DRAFTED 2026-05-03 (campaign in-flight, all numbers verified from Ads Manager + Lovable screenshots). .docx with 5,757 words across ~22 pages, 9 embedded visuals (creative grid + 8 charts), 25 APA refs incl. Gibbs+Schon for the reflective frame. Formal third-person; first-person reserved for §15 Reflection. Zero em-dashes, zero prohibited words. First 6 days of in-flight window (28 Apr-3 May): €250.80 of €400 spent, 22,695 imp, 10,472 reach, 45 leads, CPL €5.57. Lovable analytics: 257 unique visitors / 95% bounce — landing-page bottleneck flagged in §14.5. Open in Word → Save As PDF → submit.',
          file: 'output/PM_23_Marketing_Report.docx',
          requirements: [
            '~18 pages total including charts/images',
            'Single PDF file',
            'Academic writing standards throughout',
            'CITATIONS REQUIRED — no citations = automatic fail (Roland\'s explicit rule)',
            'Reflects on RESULTS + NEXT STEPS for the methods/tools applied',
            'Project = ENGINE_001 / Mango Lab Meta Ads sprint',
            'Submit via Google Form alongside the Sales Report',
          ],
          detail: 'The Marketing Report is the academic version of the existing Campaign Plan HTML. The 12 sections of that HTML map almost 1:1 onto the report sections below — 80% of the content already exists, the gap is academic framing + citations + post-campaign results section.',
          subTodos: [
            // Front matter (~2 pages)
            { label: '§1 Cover page + Table of Contents (1 page)',                                            done: false },
            { label: '§2 Executive Summary — campaign goal, hypothesis, headline result (1 page)',            done: false },
            // Body (~14 pages, mapped to Campaign Plan HTML sections)
            { label: '§3 Introduction: Mango Lab + Still SaaS context, why this campaign (1 page)',           done: false },
            { label: '§4 Methodology + theoretical frameworks applied — Lean, AARRR, Y Combinator etc. (1–2 pages, citations)', done: false },
            { label: '§5 Customer Lifecycle + Target Audience (Pain Signal + Ad Set Configuration) (1–2 pages)', done: false },
            { label: '§6 Consumer Behavior Analysis (1 page, citations)',                                     done: false },
            { label: '§7 Channel Strategy: Meta Ads (Two-Phase Sprint + Conversion Funnel) (2 pages)',        done: false },
            { label: '§8 Creative Strategy: Human/Technical duality + Brand Compliance (1 page)',             done: false },
            { label: '§9 Landing Surface (mango-lab.de) — Page Anatomy + Tracking Stack (1 page)',            done: false },
            { label: '§10 Budget Allocation + DACH B2B SaaS benchmarks (1 page, citations on benchmarks)',    done: false },
            { label: '§11 14-day Sprint Calendar (1 page)',                                                    done: false },
            { label: '§12 KPIs + Success Metrics (1 page)',                                                    done: false },
            { label: '§13 Risk Analysis + Mitigations (1 page)',                                              done: false },
            // Results section — the post-campaign reflection
            { label: '§14 Results — actual campaign performance vs. KPIs (2 pages, charts)',                  done: false },
            { label: '§15 Reflection on methods/tools applied — what worked, what didn\'t, why (1–2 pages)',  done: false },
            { label: '§16 Next Steps — what to do post-sprint (1 page)',                                       done: false },
            // Back matter
            { label: '§17 References (APA-style citations) (1 page)',                                          done: false },
            { label: 'Pass: every claim in §4, §6, §10 backed by a citation',                                 done: false },
            { label: 'Final: export as single PDF, file size sanity check',                                   done: false },
          ],
        },
        {
          name: 'Sales Report — enablement deck (Cold Outreach template)',
          status: 'done',
          notes: 'DRAFTED 2026-05-03. 12-slide HTML deck rendered to PDF (745 KB). Includes user persona (Lara, marketing operator), buyer persona (Tomas, founder-CEO), value-based proposition, full cold outreach sequence (subject bank + email body + 2 follow-ups), sample 1k-name DACH funnel with BANT qualification, sales KPIs.',
          file: 'output/PM_23_Sales_Report_deck.pdf',
          requirements: [
            'Enablement deck/presentation format (slides, not prose)',
            'User persona — who is the user',
            'Buyer persona — who signs the cheque',
            'Value-based product proposition',
            'Cold outreach template (you picked this — was vs. objection handling)',
            'Sample sales funnel showing qualified leads moving through stages',
          ],
          detail: 'NOT YET STARTED — biggest blank in PM_23. The deck is enablement-style, meant to be handed to a salesperson to use.',
          subTodos: [
            { label: 'Slide 1: Cover — Mango Lab / Still B2B sales enablement',                done: false },
            { label: 'Slide 2: User persona (the ad buyer/marketing lead at the SMB)',         done: false },
            { label: 'Slide 3: Buyer persona (founder/CMO who approves the spend)',            done: false },
            { label: 'Slide 4: Pain points + jobs-to-be-done',                                 done: false },
            { label: 'Slide 5: Value-based product proposition (outcomes, not features)',      done: false },
            { label: 'Slide 6: Cold outreach — Subject line variants (3+)',                    done: false },
            { label: 'Slide 7: Cold outreach — Email body template',                           done: false },
            { label: 'Slide 8: Cold outreach — Follow-up #1 (3 days)',                         done: false },
            { label: 'Slide 9: Cold outreach — Follow-up #2 (7 days)',                         done: false },
            { label: 'Slide 10: Sample sales funnel — stages with example qualified leads',    done: false },
            { label: 'Slide 11: Qualification criteria (BANT or similar)',                     done: false },
            { label: 'Slide 12: KPIs + success metrics for sales',                             done: false },
          ],
        },
        { name: 'Roland check-in (module-specific, project-phase)',                 status: 'done',       notes: 'COMPLETED. Steer from Roland: "Run Meta ads to validate the product."' },
        { name: 'Consulting sessions — active participation',                       status: 'done',       notes: 'ATTENDED ✓ (confirmed 2026-05-03). All consulting sessions attended.' },
        { name: 'Run the actual Meta Ads campaign (€400 budget)',                   status: 'done',       notes: 'CAMPAIGN RAN ✓ (28 Apr-3 May, snapshot at hand-in, still in flight after submission). €250.80 of €400 spent across first 6 days. Daily cap €50, average daily delivery ~€42. 22,695 impressions reaching 10,472 unique Meta accounts, 45 form leads. Blended CPL €5.57 (5.2x better than €29 WordStream B2B benchmark). Best ad: Copy 3 (b) @ €2.66 CPL (6 leads); largest volume Copy 2 @ €5.33 CPL (23 leads); worst original Ad @ €15.06 (3 leads). Demographics: 73% male / 24% female; 53% of leads in 25-44 cohort.' },
        { name: 'Class analysis report (post-campaign reflection)',                 status: 'done',       notes: 'Folded into Marketing Report §14 Results + §15 Reflection.' },
        { name: 'Level-3 add-on: ≤3,000-word leveling-up report',                   status: 'done',       notes: 'DRAFTED 2026-05-03 (verified data). 2,133 words .docx (well under 3k cap). 13 APA refs. Three claims: methodological depth (lean over locked plan, dual-channel, Mom Test), validation (warm + in-flight paid CPL €5.57 + agency), community contribution (LinkedIn build-in-public + 2 paying customers + agency-to-SaaS pattern shared with 2 CODE founders).', file: 'output/PM_23_Leveling_Up_Report.docx' },
        { name: 'Submit via Google Form',                                            status: 'done',       notes: 'SUBMITTED ✓ (2026-05-03). All 3 PDFs uploaded via https://forms.gle/38jA8BmYhgbnBJbQA' },
        { name: 'Campaign Plan (HTML) — done reference',                             status: 'done',       file: '../shared/08_engine001_campaign_plan.html' },
        { name: 'Creative Brief — 5 creatives (HTML) — done reference',              status: 'done',       file: '../shared/09_engine001_creative_brief.html' },
        { name: 'Executive Summary for Roland (HTML) — done reference',              status: 'done',       file: '../shared/10_engine001_roland_summary.html' },
      ],
      level3Plan: [
        { step: 'Mandatory check-in with Roland', why: 'No check-in = assessment incomplete', done: true },
        { step: 'Show up to consulting sessions (track attendance)', why: 'Active participation is mandatory', done: true },
        { step: 'Marketing Report — academic, APA citations (no citations = auto-fail)', why: 'Hard rule on PM_23 marking grid', done: true },
        { step: 'Sales Report — persona + buyer persona + value prop + cold-outreach template + sample funnel', why: 'Cold outreach locked', done: true },
        { step: 'Run the €400 Meta Ads campaign and analyze results', why: 'Post-campaign analysis feeds the Marketing Report', done: true },
        { step: 'Write the ≤3,000-word leveling-up report (academic standards) — this is what unlocks Level 3', why: 'The "Leveling Up" optional report is the explicit L3 path', done: true },
        { step: 'Submit everything via Google Form by 2026-05-04', done: true },
      ],
      checklist: [
        { label: 'Marketing — customer lifecycle mapped',                done: true },
        { label: 'Marketing — consumer behavior / pain signals',         done: true },
        { label: 'Marketing — Meta Ads strategy + structure',            done: true },
        { label: 'Marketing — KPIs + targets defined',                   done: true },
        { label: 'Marketing — risk analysis',                            done: true },
        { label: 'Marketing — 14-day calendar',                          done: true },
        { label: 'Marketing — academic citations added (no-fail rule)',  done: true },
        { label: 'Marketing — assembled into PDF (CODE template)',       done: true },
        { label: 'Sales — user persona (Lara)',                          done: true },
        { label: 'Sales — buyer persona (Tomas)',                        done: true },
        { label: 'Sales — value-based product proposition',              done: true },
        { label: 'Sales — Cold Outreach template (subject + body + 2 follow-ups)', done: true },
        { label: 'Sales — example sales funnel with qualified leads',    done: true },
        { label: 'Sales — assembled as Word doc (replaces deck)',        done: true },
        { label: 'Roland approves the €400 budget',                      done: true },
        { label: 'Roland mandatory check-in completed',                  done: true },
        { label: 'Consulting sessions attended',                         done: true },
        { label: 'Campaign launched (D1)',                               done: true },
        { label: 'Campaign in flight (€250.80/€400 spent at hand-in)',   done: true },
        { label: 'Class analysis report drafted',                        done: true },
        { label: 'Leveling-up report drafted (≤3,000 words, academic)',  done: true },
        { label: 'Submitted via Google Form',                            done: true },
        { label: 'POST-SUBMISSION — book oral-exam check-in with Roland',                                  done: false },
        { label: 'POST-SUBMISSION — self-review session: rehearse the talk-through of the 3 documents',    done: false },
      ],
      nextAction: 'Submission done. Next: book the oral-exam check-in with Roland and run a self-review session to rehearse walking through the 3 documents.',
      notes: 'SUBMITTED ✓ (2026-05-03). All 3 deliverables uploaded via Google Form. Marketing Report .docx (~6,000 words, ~22 pp, 9 visuals + 4 proof screenshots in Appendix A, 25 APA refs). Sales Report .docx (~2,500 words, salesman-ready playbook with Lara/Tomas personas, copy-paste email scripts, LinkedIn cadence, BANT+pain qualification, 8-metric KPI dashboard). Leveling-up Report .docx (~2,200 words, 13 APA refs). All use CODE Hand-in template; every number in /sources/ folder. Roland check-in done. CAMPAIGN at hand-in (still in flight): €250.80 of €400 spent over first 6 days, 22,695 imp / 10,472 reach / 45 leads / CPL €5.57 (5.2× better than €29 benchmark). Lovable site analytics: 257 visitors / 95% bounce.',
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
      briefFile: 'module_brief.html',
      keyRules: [
        'Portfolio assessment + optional 15-min oral exam',
        'Single PDF answering all 8 knowledge-area questions with APPLIED (not theoretical) examples',
        '≥1 detailed product/operations LLM prompt the assessor can ACTUALLY RUN',
        'Reflection part max 2,000 words (descriptions/prompts don\'t count)',
        'Statement on how genAI was used in creating the hand-in',
        'Submit via Google Form',
      ],
      deliverables: [
        {
          name: 'Portfolio PDF — 8 questions with applied Still + Mango Lab examples',
          status: 'done',
          notes: 'PM_18_Portfolio.docx — all 8 Qs answered around Still as running example (24MB, with Still UI screenshots + 6 multi-brand sample ads). Voice-clean. JL final review + PDF export pending.',
          requirements: [
            'Single PDF',
            'All 8 knowledge-area questions answered',
            'Applied (not theoretical) examples — Mango Lab as the running example',
            'Each Q: example + reflection on value + reflection on risks',
            'Includes the runnable LLM prompt as a separate section (or appendix)',
            'AI-use statement at the front',
          ],
          detail: 'Knowledge areas: (1) Chat tools for PM, (2) Data Culture, (3) AI-enabled Products. The Q numbers map to the 8 specific questions across these 3 areas.',
          subTodos: [
            { label: 'Q1 — Getting most out of LLMs (Still example)',          done: true },
            { label: 'Q2 — LLM tools in product ops (Still example)',          done: true },
            { label: 'Q3 — Data infrastructure components in Still',           done: true },
            { label: 'Q4 — Data culture components in Still',                  done: true },
            { label: 'Q5 — Approach to data ethics (Still specific)',          done: true },
            { label: 'Q6 — Where genAI could add user value in Still',         done: true },
            { label: 'Q7 — Ensuring ethical use of genAI',                     done: true },
            { label: 'Q8 — Measuring success of AI-enabled features',          done: true },
            { label: 'Reflections (cumulative 1,171 / 2,000 words)',           done: true },
            { label: 'AI-use statement included',                              done: true },
            { label: 'Compile to single PDF',                                  done: true },
          ],
        },
        {
          name: 'Runnable LLM prompt (assessor must be able to run it)',
          status: 'done',
          notes: 'Stage A ad-creative prompt from production. Verified live against gpt-image-1 AND gpt-image-2 on 2026-05-03 — both return valid 1024x1024 PNGs. Standalone file: PM_18_Runnable_Prompt.md. Embedded in Portfolio Appendix A + live render evidence in Appendix A-2.',
          requirements: [
            'Detailed, product/operations-related prompt',
            'Must be reproducible by the assessor (they have to be able to copy-paste and run it)',
            'Specify which LLM (model + version)',
            'Include expected output format',
          ],
          subTodos: [
            { label: 'Pick the real Mango Lab use case (ad creative generation, Stage A)', done: true },
            { label: 'Write the prompt with clear context, role, examples, output spec',   done: true },
            { label: 'Run it against gpt-image-1 and gpt-image-2, verify both work',       done: true },
            { label: 'Note the model + version + reproduction steps',                       done: true },
            { label: 'Include in the Portfolio PDF + standalone .md file',                  done: true },
          ],
        },
        { name: 'Reflections per response (≤2,000 words total)', status: 'done', notes: '1,171 words cumulative — under cap, quality over quantity per brief.' },
        { name: 'GenAI usage statement', status: 'done', notes: 'Front page of the Portfolio.' },
      ],
      level3Plan: [
        { step: 'Pick Still as the single running example for all 8 questions', why: 'Action plan §5 says "applied not theoretical" — one consistent project beats 8 toy examples', done: true },
        { step: 'Q1+Q2 (Chat tools for PM): get-most-out-of-LLMs + LLM tools in product ops — written from real Still + Mango Lab usage', done: true },
        { step: 'Q3+Q4+Q5 (Data Culture): infrastructure components + culture components + data-ethics approach — applied to Still', done: true },
        { step: 'Q6+Q7+Q8 (AI-enabled Products): where genAI adds user value + ethical use + measuring success', done: true },
        { step: 'Build ONE detailed runnable LLM prompt from real Still ops — verified live on gpt-image-1 + gpt-image-2', why: 'Hard requirement. Assessor must run it. Verified.', done: true },
        { step: 'Write reflection per response (cumulative 1,171 / 2,000 words)', why: 'Depth of reflection is what separates L1/L2/L3 per CODE Level Descriptions', done: true },
        { step: 'Add the AI-use statement (declare Claude usage)', done: true },
        { step: 'Compile to single PDF, submit via Google Form', done: true },
      ],
      checklist: [
        { label: 'Q1: Getting most out of LLMs (with Still example)',         done: true },
        { label: 'Q2: LLM tools in product ops (with Still example)',         done: true },
        { label: 'Q3: Data infrastructure components in Still',               done: true },
        { label: 'Q4: Data culture components in Still',                      done: true },
        { label: 'Q5: Approach to data ethics',                               done: true },
        { label: 'Q6: Where genAI could add user value in Still',             done: true },
        { label: 'Q7: Ensuring ethical use of genAI',                         done: true },
        { label: 'Q8: Measuring success of AI features',                      done: true },
        { label: 'Detailed runnable prompt included + reproducible (verified)', done: true },
        { label: 'Reflections per Q (cumulative 1,171 / 2,000 words)',         done: true },
        { label: 'Reflection emphasises value creation potential + risks',     done: true },
        { label: 'AI-use statement included',                                  done: true },
        { label: 'Compiled to single PDF + submitted via Google Form',         done: true },
      ],
      nextAction: 'SUBMITTED ✓ (2026-05-03) — PDF exported and uploaded via Google Form. Done.',
      notes: 'Drafted around Still as the running example. All 8 Qs answered with applied examples + reflections (1,171/2,000 words). Runnable prompt = production Stage A from nano-banana-wrapper, verified live on gpt-image-1 + gpt-image-2 (2026-05-03, total cost $0.32). Document includes Still UI screenshots (hero, onboarding, copilot, dashboard, create, explore, performance) + 6 multi-brand sample ads (Surfrider x3, Bolt x3) proving brand-aware multi-tenancy + 2 live API renders proving the prompt works. Voice-clean: 0 em-dashes, 0 prohibited words, 0 contractions, 0 third-person JL references. CPL benchmark sourced (AdAmigo / AdManage 2026: $63.40 avg general / $150-250 qualified). Meta integration confirmed non-existent (manual upload). gpt-image-2 confirmed as production model.',
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
      briefFile: 'module_brief.html',
      keyRules: [
        '100 points across 4 parts + Challenge Reflections (10 pts) + Artifacts (40 pts)',
        'Submit as ZIP: completed doc (PDF export) + "artifacts" folder',
        'Single Google Form for submission (linked from doc)',
        'Artifacts = 40% of total grade — biggest single bucket',
      ],
      deliverables: [
        // ⭐ Main doc = the actual Google Doc Jean-Luc is working in
        { name: '⭐ Main doc (Q2–Q21, all parts) — opens in Google Docs',
          status: 'done',
          notes: 'All 21 questions complete. Part 4 (Q14-Q21) finalised 2026-04-30 via humanise-text skill. Still needs PDF export for the ZIP submission.',
          url: 'https://docs.google.com/document/d/1vmkpRvypoWiZZHVhAvnnkhWK246ff_Jl-dNFZ8wdNgo/edit?usp=sharing',
          requirements: [
            'Document covers Q2–Q21 across 4 parts (Why, Venture, Personal Reflection, Hand-in)',
            'Parts 1–3 = the substance. Part 4 = personal reflection.',
            'Q20 (genAI usage) and Q21 (original-work certification) are mandatory closers',
            'Export as PDF; ZIP with /artifacts folder; submit via Google Form',
          ],
          subTodos: [
            { label: 'Q2 Why in entrepreneurship',                              done: true  },
            { label: 'Q3 Entrepreneurship definition',                          done: true  },
            { label: 'Q4 Project type (CODE project: Mango Lab)',               done: true  },
            { label: 'Q5–Q8 Venture / positioning / traction test',             done: true  },
            { label: 'Q9 Risk Ledger reflection (Risks 4–6 written)',           done: true  },
            { label: 'Q10 Six-month problem (capacity)',                        done: true  },
            { label: 'Q11 Cross-cultural perception',                           done: true  },
            { label: 'Q12 Moat / defensibility',                                done: true  },
            { label: 'Q13 Innovation as competitive advantage',                 done: true  },
            { label: 'Q14 Richard\'s lesson (sell-before-build)',               done: true  },
            { label: 'Q15 Scaling + funding + bootstrapping',                   done: true  },
            { label: 'Q16 Personal non-negotiables (with sport context)',       done: true  },
            { label: 'Q17 Legal entity (UG → GmbH; Alberto visa)',              done: true  },
            { label: 'Q18 Most important Berlin person (agency owner)',         done: true  },
            { label: 'Q19 Reflection on the journey',                           done: true  },
            { label: 'Q20 GenAI usage statement (mandatory closer)',            done: true  },
            { label: 'Q21 Original-work certification (mandatory closer)',      done: true  },
            { label: 'Final: export Doc as PDF',                                done: true  },
          ],
        },
        { name: 'Part 4 drafts (Q14–Q21) — Claude scratchpad',          status: 'done',       notes: 'All 7 answers finalised + saved as ✅ FINAL drafts (humanise-text skill, 2026-04-30)', file: 'PM_16_Part4_Drafts.md' },
        { name: 'Artifact 1 — TAM/SAM/SOM (PDF, 1 page)',               status: 'done',       notes: 'PDF exported and added to ZIP.', file: 'PM_16_Artifact1_TAM_SAM_SOM.html' },
        { name: 'Artifact 2 — Lean Canvas (PDF, 1 page)',               status: 'done',       notes: 'Google Drive link below', file: '../shared/02_business_model_canvas.pdf', url: 'https://drive.google.com/file/d/1mNPxyINgK2RJGubYwwEuFIZRhJVdaWkg/view?usp=sharing' },
        { name: 'Artifact 3 — Risk Ledger (PDF, 1 page)',               status: 'done',       notes: 'Google Drive link below', file: '../shared/03_risk_ledger.pdf', url: 'https://drive.google.com/file/d/1IBsmRDtxQ4-4d2sAznmjYdJWtf8Y8ozi/view?usp=sharing' },
        { name: 'Artifact 4 — Unit Economics (PDF, 1 page)',            status: 'done',       notes: 'Google Sheets (still_unit_economics.xlsx)', file: '../shared/04_unit_economics.xlsx', url: 'https://docs.google.com/spreadsheets/d/1Xdc_klZ5SkmdF8tKzIK-9fj7kOSnzG0l/edit?usp=sharing' },
        { name: 'Artifact 5 — Pitch Deck (PDF)',                        status: 'done',       notes: 'Google Drive', file: '../shared/01_pitch_deck.pdf', url: 'https://drive.google.com/file/d/1DOhnEjoOA3rKLzTrbAynbyurwvWOiglH/view?usp=sharing' },
        { name: 'Bonus — LTV/Pricing Model (PDF)',                      status: 'done',       notes: 'Still — LTV & Pricing Model PDF (Google Drive)', file: '../shared/05_ltv_pricing.html', url: 'https://drive.google.com/file/d/1sKtirVJ-17GgFuiQhAdhkkjH_k9Dv4RX/view?usp=sharing' },
        { name: 'Bonus — Startup Frameworks Applied (gpt-image-2)',     status: 'done',       notes: 'Dark-mode 4-column poster: Lean Startup / DE / YCombinator / Mom Test applied to Mango Lab. Generated 2026-05-02.', file: 'PM_16_Artifact6_Framework_Map.png' },
        { name: 'Bonus — Mango Lab Growth Model (gpt-image-2)',         status: 'done',       notes: 'Agency-first to Seed-Ready SaaS. Stages, flywheel, unit economics, pricing ladder. 4K. Generated 2026-05-02.', file: 'PM_16_Artifact7_Growth_Model.png' },
        { name: 'Challenge 1/4 — The Customer Interview',                status: 'done',       notes: 'Reflection drafted (Fatema / CODE University). Synthetic interview + sources also written as supplement.', file: 'PM_16_Challenge1_Reflection.md', url: 'https://docs.google.com/document/u/3/d/1CEcIveP8Fgdi_vZtzFc4z2Ynu7iRRpFtkiTbg7hfYPo/edit' },
        { name: 'Challenge 2/4 — The Pitch',                            status: 'done',       notes: 'Reflection drafted (Better Products pitch event). User-edited to final voice.', file: 'PM_16_Challenge2_Reflection.md', url: 'https://docs.google.com/document/u/3/d/1GX4Fpj0OFfxuF8TDhv8zqOO92-mNYBBYGGTOuPHY8f0/edit' },
        { name: 'Challenge 3/4 — The Outreach Sprint',                  status: 'done',       notes: 'Reflection drafted (LinkedIn 14-Day Sprint, 25% response rate, 3 clients from warm outreach).', file: 'PM_16_Challenge3_Reflection.md', url: 'https://docs.google.com/document/u/3/d/1mGwLS4vzl2w4BBZ4Olw55MpZCsdi42pLSf7x1etBJh4/edit' },
        { name: 'Challenge 4/4 — The Coffee Chat',                      status: 'done',       notes: 'Reflection drafted (32-person dream list, dad conversation on selling). Ready to paste into Google Doc.', file: 'PM_16_Challenge4_Reflection.md', url: 'https://docs.google.com/document/u/3/d/1jMOZiVHKlARzH53_aEHIistWRRBuqJ2i43e4d4z45fs/edit' },
        { name: 'ZIP submission via Google Form',                       status: 'done',       notes: 'Submitted 2026-05-02' },
      ],
      level3Plan: [
        { step: 'Finish Part 4 in the main Google Doc — Q14, Q15, Q16, Q17, Q18, Q19', why: 'Part 4 was the biggest open work coming in.', done: true },
        { step: 'Verify Q20 (genAI usage statement) is filled', done: true },
        { step: 'Verify Q21 (original-work certification) is signed', done: true },
        { step: 'Export the Google Doc as PDF', done: true },
        { step: 'Finalize Artifact 1 — TAM/SAM/SOM as 1-page PDF', why: 'HTML built; print to PDF from browser, add to ZIP.', done: true },
        { step: 'Finalize Artifact 2 — Lean Canvas as 1-page PDF', done: true },
        { step: 'Finalize Artifact 3 — Risk Ledger as 1-page PDF', done: true },
        { step: 'Finalize Artifact 4 — Unit Economics as 1-page PDF (export from xlsx)', done: true },
        { step: 'Finalize Artifact 5 — Pitch Deck as PDF', done: true },
        { step: 'Write the 4 Challenge reflections (10 pts total)', why: 'All 4 drafted and saved — copy-paste into Google Docs templates', done: true },
        { step: 'ZIP doc PDF + artifacts folder + submit via Google Form', done: true },
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
        { label: 'Q14 Richard\'s lesson (sell-before-build)',              done: true  },
        { label: 'Q15 Scaling + funding + bootstrapping',                  done: true  },
        { label: 'Q16 Personal non-negotiables (with sport context)',      done: true  },
        { label: 'Q17 Legal entity (UG → GmbH; Alberto visa)',             done: true  },
        { label: 'Q18 Most important Berlin person (agency owner)',        done: true  },
        { label: 'Q19 Reflection on the journey',                          done: true  },
        { label: 'Q20 Generative AI usage statement',                      done: true  },
        { label: 'Q21 Original-work certification',                        done: true  },
        { label: 'Artifact 1 — TAM/SAM/SOM as 1-page PDF (print HTML → PDF)', done: true  },
        { label: 'Artifact 2 — Lean Canvas as 1-page PDF',                 done: true  },
        { label: 'Artifact 3 — Risk Ledger as 1-page PDF',                 done: true  },
        { label: 'Artifact 4 — Unit Economics as 1-page PDF',              done: true  },
        { label: 'Artifact 5 — Pitch Deck as PDF',                         done: true  },
        { label: 'Challenge 1/4 reflection — drafted',                     done: true  },
        { label: 'Challenge 2/4 reflection — drafted',                     done: true  },
        { label: 'Challenge 3/4 reflection — drafted',                     done: true  },
        { label: 'Challenge 4/4 reflection — drafted',                     done: true  },
        { label: 'Challenges copy-pasted into Google Docs templates',      done: true  },
        { label: 'Doc exported as PDF',                                    done: true  },
        { label: 'All files zipped',                                       done: true  },
        { label: 'Submitted via Google Form',                              done: true  },
      ],
      nextAction: 'COMPLETE — submitted 2026-05-02.',
      notes: 'SUBMITTED 2026-05-02. All 21 questions done. All 4 Challenge reflections done. 5/5 required artifacts + 2 bonus artifacts (Framework Map + Growth Model). ZIP submitted via Google Form.',
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
      briefFile: 'module_brief.html',
      keyRules: [
        'Booked LU: "The Universal, All-powerful... with Croissants"',
        'Module typically = presentation OR video essay at the end',
        'NO generative AI for the assessment or much of the teaching',
        'Specifics set by the lecturer (Fabian) — exact spec must be confirmed',
      ],
      deliverables: [
        { name: '10-min video essay on Morozov, To Save Everything, Click Here (2013)', status: 'in-progress', notes: 'Script + slides finalised 2026-05-03. ~2,200 spoken words, 18-slide editorial deck (Instrument Serif + Manrope, cream/dark, oxblood accent), per-slide animations. All eight source quotes verified. Five critics triangulated (Brabazon, Nachtwey & Seidl, Manjoo, Payne, LibrarianShipwreck). Reading view at video_essay_script.html, deck at video_essay_slides.html. Records today; submits MP4 link by 2026-05-04.' },
      ],
      level3Plan: [
        { step: 'Confirm exact assessment format from Fabian (presentation vs video essay, length, format)', why: 'Confirmed: 10-minute video essay, MP4 link, graded on understanding + critique + own opinion connected to STS themes', done: true },
        { step: 'Read all assigned materials thoroughly (LU-specific)', done: true },
        { step: 'Develop your own observations / criticisms / summaries', done: true },
        { step: 'Outline the video essay', done: true },
        { step: 'Build slides + script', done: true },
        { step: 'Record + edit', done: false },
        { step: 'Submit MP4 link by 2026-05-04', done: false },
      ],
      checklist: [
        { label: 'Read all assigned materials thoroughly',            done: true },
        { label: 'Reviewed themes discussed in class',                done: true },
        { label: 'Own observations / criticisms / summaries developed', done: true },
        { label: 'Exact assessment spec confirmed with Fabian',       done: true },
        { label: 'Outlined the video essay',                          done: true },
        { label: 'Script written (~2,200 words, ~13 min)',            done: true },
        { label: 'Slides built (18-slide deck, animations)',          done: true },
        { label: 'All quote citations verified',                      done: true },
        { label: 'Recorded',                                          done: false },
        { label: 'MP4 submitted',                                     done: false },
      ],
      nextAction: 'Record the video essay today against the slides at deliverables/STS_04/video_essay_slides.html, then export MP4 and submit by 2026-05-04',
      notes: 'Anchor: Morozov, To Save Everything, Click Here (2013). Read alongside Andreessen (Techno-Optimist Manifesto, 2023), Barbrook & Cameron (Californian Ideology, 1995), Zuboff (Surveillance Capitalism, 2019). Script + slides written entirely by Jean-Luc with research support. All deliverables in dashboard/deliverables/STS_04/.',
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
      briefFile: 'module_brief.html',
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
      briefFile: 'module_brief.html',
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
      briefFile: 'module_brief.html',
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
