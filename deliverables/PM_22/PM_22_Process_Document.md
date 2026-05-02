# PM_22 — Process Document

> A live record of how this hand-in was built. Updated after each phase. Written in first person because the assessor should see the thinking, not just the artefact. AI was used heavily across this module (which is allowed and disclosed) but every decision was mine to make and mine to defend.

**Project:** Mango Lab → Still
**Module:** PM_22 / BM_22 — Product Discovery
**Author:** Jean-Luc André Navarro
**Started:** 2026-05-02

---

## Why a process document at all

The standard hand-in is a slide deck plus an oral exam. That is enough to pass. It is not enough to actually show that I understood the material, that I made specific choices for specific reasons, and that I would do some of it differently next time. CODE Level 3 is graded on depth and reflection, not just completeness. So I am writing this document in parallel with the deck. Every section of the deck has a finished artefact. This document has the working underneath it.

There is a second reason. Most of the deck is built using AI (Claude Sonnet 4.6 and Opus 4.7). That is allowed by the module rules but it raises a fair question: did I actually do the thinking, or did the model? This document is my answer. The decisions are tracked here, the rejections are tracked here, the moments where I corrected the model are tracked here.

---

## Phase A — Locating what I already had, designing the persona pool, grounding it in real data

### A.0 — The starting state

When I sat down for this module I had a lot of raw material from PM_16 (How to Start a Startup, which I just submitted on 2026-05-02). The pitch deck, the BMC, the risk ledger, the validation plan v3, the traction test cards, the unit economics sheet, the LTV/pricing model, the Engine_001 Meta Ads campaign plan, the creative brief, and two bonus artefacts (a Frameworks Map and a Growth Model). PM_16 also produced one real interview, with Fatema, the marketing coordinator at CODE University, and one synthetic interview (Lisa Bauer / Koma Studio) that I built end-to-end during PM_16 to pressure-test what Fatema told us.

So I was not starting from zero. The L1 checklist for PM_22 is 21 items long and roughly 70% of them already exist somewhere in those PM_16 artefacts. The work is reformatting and gap-filling, not building from scratch.

The big gap is the interviews. L1 requires at least 5 user interviews or surveys in the appendix. I had 1 real (Fatema) and 1 synthetic (Lisa). I needed 4 more.

### A.1 — The argument for synthetic interviews

The deadline for this module is 2026-05-04. I am sitting at 2026-05-02. I do not have time to find, schedule, and conduct 4 more real interviews in 48 hours. That is the practical reason. There is also a more interesting reason.

The point of the interviews in product discovery is to surface patterns. Fatema gave me two strong patterns: the "PDF deliverable" agency failure mode, and the knowledge-gap-not-money-gap insight. The question I want the next four interviews to answer is: do those patterns generalise across the beachhead? If five different personas, each with a different business shape and a different relationship to advertising, all surface the same pattern unprompted, that is real signal. If they diverge, that is also signal: it tells me which slice of the beachhead the patterns actually fit and which part I was wrong about.

A synthetic interview cannot validate that a pattern is real in the world. Only real interviews can do that. What it can do, if it is run honestly, is pressure-test internal consistency. If I cannot construct a credible persona where the patterns hold, that is a problem with my hypothesis. If I can construct credible personas and the patterns still come out, I have at least caught my own blind spots.

I am being honest about this in the AI-use statement. Five of six interviews are synthetic and labelled as such.

### A.2 — Designing the persona pool

I started by listing the kinds of customer Mango Lab and Still are actually trying to reach. The beachhead, as defined in the validation plan, is DACH SMB owners and small marketing teams who run their own paid social ads with limited time, budget, and visibility. That is a wide group. Inside it there are quite different shapes:

- **A solo DTC founder** who is the marketer and the budget holder and the brand voice all in one. (Lisa)
- **A small-org marketing coordinator** who has no budget authority and is part of a 5-person team where the work is fragmented. (Fatema)
- **A B2B SaaS founder** running performance marketing themselves before they hire a marketer. (Marc)
- **A performance marketing agency owner** who could either use Still as a tool or see it as competition. (Sven)
- **A marketing manager at a slightly bigger B2B SaaS** who has team support but limited unilateral spending authority. (Anja)
- **A B2B service solopreneur** running lead-magnet funnels rather than SaaS or e-commerce. (Tobias)

That gives me six shapes, of which two (Fatema, Lisa) are already covered. So the four new synthetic personas need to be Marc, Sven, Anja, Tobias. I picked them because each one tests a different boundary. Marc is the closest to our ICP, so he is a "does it feel real for the cleanest case" test. Sven is the agency angle, which decides whether agencies are a customer or a channel. Anja tests whether the price point lands inside a constrained marketing manager's authority. Tobias tests whether the value prop generalises beyond e-commerce.

The first version of the persona profiles was based on training knowledge: rough numbers I knew from working in SMB marketing for a couple of years. Reasonable but not citable.

### A.3 — Replacing rough numbers with cited research

After I built the first persona pool I went back through it and asked: which of these numbers can I actually defend? Which are anecdotal? The answer was that most of them were anecdotal, and that is fine for an internal document but not for a hand-in that is supposed to demonstrate market research literacy.

I ran a research pass against eleven specific topics, each one tied to a number I had asserted in a persona. For each topic I wanted a real, fetchable URL, a specific data point, and a publication date in 2022 or later. The full list is in §2 of the persona brief. The shape of what I found:

- **Some of my rough numbers were correct.** SMB owners spending 6+ hours a week on social media content is reported by VerticalResponse at 43% of small businesses. That matched what I had assumed for Lisa and Tobias.
- **Some of my rough numbers were too aggressive.** I had Marc at €15k MRR at 18 months bootstrapped. SaaSRanger's 2024 dataset (a thousand founders) says median is $1k MRR at 12–18 months and $5k takes 2–4 years. €15k at 18 months would put Marc in the top 5% of bootstrapped B2B SaaS, which is a stretch. I dropped it to €8k. That is still above median but it is credible.
- **Some of my rough numbers were just wrong.** I had said agencies churn clients at 6–9 months. Focus Digital's 2024 churn report puts small-agency annual churn at 32%, which is roughly a three-year average tenure. I rewrote Sven's pain to be about churn at 12–18 months, not 6–9. The core point (clients leave because they cannot see results) survived. The number I attached to it changed.
- **Some topics had no clean source.** I could not find a published DACH-specific SaaS S&M benchmark or a published DACH agency retainer report. I noted that openly. OpenView's data is US-weighted and I assumed DACH within ±10%, which I think is fair but I flagged it.

The honest moment in this whole exercise was the agency retainer. I had Sven at €3,500–€5,500 average retainer per client. The Foxwell Digital benchmark says US boutique agencies are at $1,500–$3,000 and EU pricing runs 15–20% below. So DACH boutique agencies are more like €1,500–€4,500. I dropped Sven's retainer to €2,800–€4,500 and his revenue from €480k to €340k. He is now a smaller agency than he was in version 1, which actually makes him a more interesting interview because he is closer to the floor of his market and has thinner margins.

That is the kind of correction I want to be visible. The first draft was not wrong because I was lazy. It was wrong because I was working from memory. The fix is mechanical: ground every claim in something fetchable.

### A.4 — What I did not do

I did not interview anyone new for this module. The deadline made it impossible and the synthetic-interview frame made it unnecessary for what I am trying to learn. If I were building Still as a real venture this week (which I am, in parallel) I would absolutely be doing more real interviews. The synthetic ones are research scaffolding for the assessment, not a substitute for primary research in the actual product work.

I did not run the dual-agent interview generation in this phase yet. That is Phase B. Phase A was about getting the persona pool clean enough that the interviews would produce something useful.

I did not look at the Google Classroom for this module. I tried, but it requires login and Claude cannot authenticate. I have eight screenshots of class framework templates from the LU sessions (Hypothesis Board, Validation Board, ROI matrix, Cost of Delay, DUFVS, MuSoCu, User Story Map, Card Sorting, Kano, Buy-a-Feature, Business Killers, Demand Funnel) and I will pull whichever of those frameworks fit naturally into the deck. I will not name-check frameworks I did not actually apply, because that is exactly the kind of move the assessors should be sceptical of.

### A.5 — Beachhead clarification (mid-session correction)

When I sat down with Claude for Phase C planning, the model came back with a synthesis of all the PM_16 materials and reported, confidently, that Mango Lab's beachhead was iGaming, with Bet & Babes as the proof case. I had to stop and correct that. The beachhead is SMBs, full stop. It always has been.

The confusion is fair. Somewhere in my PM_16 materials I had explored iGaming as a vertical option, and the model picked that up and treated it as the locked-in beachhead. It is not. The real picture is:

- **Beachhead:** small to medium businesses (SMBs), not vertical-locked
- **Two real paying clients to date:** a marketing agency we did work for, and meetDWIGHT, a B2B SaaS app we ran ads for
- **Expansion verticals from the Growth Model:** e-commerce, DTC, agencies, learning platforms. All SMB-shaped.
- **What the synthetic personas test:** Lisa (DTC), Marc (B2B SaaS), Sven (agency owner), Anja (B2B SaaS marketing manager), Tobias (B2B service consultant). All SMBs. The pool was already aligned. The only thing that needed updating was the framing.

I am writing this section partly because the assessor might see the same confusion if they only read the PM_16 hand-in. The PM_22 deck has to be clear about this from slide one. The wedge is SMBs that can not afford full agencies but need better than DIY tools. Not iGaming.

This is also a useful entry to keep in this document because it is exactly the kind of moment where the model and I disagreed on a fact that mattered, and I caught it because I know my own business better than any model does. Worth recording as a small instance of where AI co-authoring needs human ground-truthing.

### A.6 — What I would do differently

If I had another week:

1. I would do at least two more real interviews instead of two more synthetic ones. Even one real B2B SaaS founder would be worth more than the cleanest synthetic Marc. The synthetic interviews are a pressure test for internal consistency, not a substitute.
2. I would find a DACH-specific SaaS benchmark. I am pretty sure one exists, probably from Point Nine Capital or a German VC, and I just did not have time to dig for it.
3. I would build the persona pool from a different starting point. I started from "what shapes of customer might be in the beachhead" and ended up with six. A more rigorous version would start from observed clusters in real data (e.g. who actually books a call from the LinkedIn outreach sprint) and reverse-engineer personas from there.

---

## Phase B — Interview generation (will be filled in after I run it)

*(To be written after Phase B is complete. This section will record the dual-agent setup, the system prompts used, the moments where the model drifted off-persona and I had to redirect, and the patterns that came out across the five synthetic interviews.)*

---

## Phase C — Slide deck construction (to be written)

*(To be written after Phase C is complete. This section will record which existing artefacts were ported, which were re-built, the JL-twist applied to each standard framework, and the bonus sections added beyond the L1/L2 baseline.)*

---

## Phase D — Assembly and PDF export (to be written)

---

## Phase E — Dashboard update and submission (to be written)

---

## Standing principles I am applying through every phase

1. **Show the thinking.** Each artefact in the deck has a "thinking trail" element next to it. Rejected candidates, decision criteria, the working underneath. If a slide is just the finished output, it is not done yet.
2. **Reflect inline.** Every knowledge area closes with a "what I learned" card attached to specific decisions, not pooled at the end.
3. **Twist every framework.** When I apply DUFVS, MuSoCu, Kano, VPC, BMC, or Lean Canvas, I add an annotation, a sixth dimension, or a critique. The textbook version gets used as the starting point, not the destination.
4. **Cite or admit.** Every benchmark is cited or flagged as estimate. No placeholder authorities ("HubSpot says...") without a real URL.
5. **AI is a co-author, disclosed.** I am writing this with Claude. The prompts, the corrections, the moments where I disagreed with the model, all go into the AI-use statement at the end.

---

## Clarification on who did what (added 2026-05-03)

After previewing the near-final deck, I asked Claude to make the AI-use disclosure honest about the split of work. The honest version is this. I ran the real interview with Fatema in person in April. I designed and ran the Engine_001 €400 Meta sprint on a real client account. I built the Wizard-of-Oz prototype that meetDWIGHT paid €500 for. I personally ran every diagram exercise in our internal Notion and Miro workspace before any of them became slides: the Idiometrics killer-list, the Hypothesis Board, the Experiment Board, the DUFVS scoring, the Solution-Impact Board, the user story map, the MoSCoW. I set every kill criterion before each test ran. I made every strategic call.

What Claude did is more limited. It drafted the slide copy that I then rewrote line-by-line in my own voice. It generated the five synthetic interview transcripts using the dual-agent setup I directed, grounded in cited research that I verified. It searched for and verified URLs for the PESTLE and market-prognosis slides. It built the visual system. The decisions and the work are mine. The drafts and the polish are co-authored.

The deck reflects this on slide 45 explicitly. The next person who reads this hand-in should not be confused about the boundary.

## AI-use log (running, to be merged into the final AI-use statement)

| Phase | What AI did | What I did |
|---|---|---|
| A.2 | Drafted first version of all six persona profiles based on my brief | Picked the persona shapes, set the boundary tests each one had to cover, edited every profile after generation |
| A.3 | Ran a research pass against eleven topics, returned a citation table | Defined the eleven topics, picked the ones to keep, made the calls about which numbers to adjust in the personas |
| A.3 | Rewrote the §2 research base with the verified citations | Approved each citation, kept the explicit "what changed and why" log, kept the "what we lost and replaced" section that is the visible thinking |
| A (this doc) | Drafted this process document from a structured outline I gave it | Wrote the outline. Edited every paragraph after generation. The voice is mine because I do not let the model write in its default voice (no em-dashes, no "stakeholder," no "leverage," British spelling, the rules in feedback_humanise.md). |

