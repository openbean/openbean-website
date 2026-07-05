# V15 — Enterprise Demo & Evaluation Platform

**Date:** 2026-07-05
**Iteration:** V15
**Author:** V15 working session
**Status:** In progress

---

## 1. Mission

> This is no longer a product demo.
> It is an enterprise evaluation experience.
> A visitor should understand the value of OpenBean without
> talking to a salesperson. The demo should make someone think:
> "We need this."

V15 is the **evaluation platform** iteration. V11 closed the
engineering surface. V12 closed the operational surface. V13
closed the adoption surface. V14 closed the website copy. V15
closes the **evaluation experience** — the live, seeded
company a CEO can explore, the guided tour a visitor can
follow, the read-only mode a prospect can use safely.

The V15 work must land on the live marketing repository
(`openbean/openbean-website`), not on the engine repository
(`openbean/openbean`). The V10 split is the rule.

## 2. The positioning, restated

The V15 brief restates the V14 hierarchy. The rule for every
copy decision:

| Layer | Name | Audience |
|-------|------|----------|
| Company | OpenBean | Everyone |
| Business | AI Transformation Platform | Buyer, CEO, Operations |
| Flagship Product | Company Brain | Buyer, end user |
| Core Technology | Enterprise Memory Platform | IT, Architect |
| Core Innovation | Trusted Memory | Architect, Engineer |

The brief is explicit: **never explain technology before
business value.** The demo is a business value artifact, not
a technology artifact.

## 3. The non-negotiable copy rules

The V15 brief's Part 9 is the strictest possible
interpretation of "plain business language." Every jargon
term in the existing copy is translated.

| Don't say | Say |
|-----------|-----|
| Memory Layer | Company knowledge |
| Governance | Business decisions (or: every important change is reviewed) |
| Claims | Verified information (or: pieces of company knowledge) |
| Evidence | Verified facts |
| Append-only | The full history of every change is kept forever |
| MCP | The open standard OpenBean uses (or: the connection) |
| RLS | Per-company data isolation enforced by the database itself |
| Embeddings | The way OpenBean understands meaning across your documents |
| Vectors | (do not mention) |
| Supabase | The open-source database OpenBean runs on |
| Protocols | (do not mention) |
| LLMs | (do not mention) |
| Scope | What a person or an AI tool is allowed to know about |
| Reviews | Approvals |
| Adversarial test suite | OpenBean is tested against attack patterns on every change |
| High-stakes | Important enough that a human should approve it |
| Principal | The identity of an AI tool |
| Service role | The system-level credential OpenBean uses to write to the database |
| Tenant | Company (your organization) |

## 4. The seeded company

The V15 brief mandates a permanent demo organization. The
brief suggests "Northwind Manufacturing" — an iconic, instantly
recognizable name in dev history, perfect for a believable
mid-sized company. The V15 work uses Northwind.

The Northwind data model:

- **Company:** Northwind Manufacturing
- **Industry:** Specialty chemicals (B2B, contract manufacturing)
- **Founded:** 1987
- **Headquarters:** Madison, Wisconsin
- **Employees:** 60
- **Annual revenue:** $42M
- **Departments:** Executive, HR, Sales, Operations, Finance, IT, Engineering
- **Projects:** Customer rollout, Hiring, ISO compliance, Infrastructure, Sales expansion, AI initiatives
- **Knowledge:** Policies, procedures, meeting decisions, approved changes, rejected proposals, historical knowledge, AI proposals, AI recalls, manager reviews, corrections, conflicts, merge history, audit history
- **AI tool connections:** Claude, Codex, Copilot, Gemini, Internal Automation

The seed produces:
- 60 employees with realistic names, roles, departments
- 7 departments
- 6 projects (each with active state)
- ~200 pieces of company knowledge across 8 categories
- ~30 pending high-stakes approvals
- 5 active AI tool connections with realistic activity
- A 30-day history of changes, approvals, and corrections

The seed is in `app/demo/data/northwind.ts` (a typed
TypeScript module that produces the seeded state at build
time — no database, no API, no live instance). The
marketing site is static (`output: "export"`); the demo
data is the source of truth.

## 5. The 9 parts of V15

The V15 brief's structure:

| Part | What | Where |
|-----:|------|-------|
| 1 | Seeded company | `app/demo/data/northwind.ts` |
| 2 | Guided tour | `app/demo/components/GuidedTour.tsx` |
| 3 | Company Brain views | `app/demo/views/*` |
| 4 | Enterprise scenarios | `app/demo/scenarios.ts` |
| 5 | Evaluation mode | `app/demo/eval-mode.ts` (read-only) |
| 6 | Storytelling layer | per-view |
| 7 | Demo reset | `app/demo/data/reset.ts` + a button |
| 8 | Design | `app/ui/demo/demo.css` |
| 9 | Copy | per-view |

The V15 work is split across:
- `app/demo/` — the new demo experience
- `app/ui/demo/` — the demo's design system
- `app/ui/home/` — small additions to the existing system (the
  "Try the Live Demo" CTA on the home page)
- The home page — the entry point to the demo

## 6. The 7 demo scenarios (Part 4)

The V15 brief names 7 scenarios. Each is a short narrative
that a CEO can read in 2 minutes:

1. **New employee onboarding.** A new sales rep joins. The
   Company Brain shows her what the company has agreed is
   true. She doesn't have to ask anyone.
2. **Sales policy changes.** The sales director updates the
   discount policy. Every AI tool sees the update. The next
   time anyone asks about pricing, the answer is the approved
   one.
3. **IT password policy.** IT updates the password
   requirements. Every employee sees the update. The next
   password reset uses the new policy.
4. **Customer refund process.** A customer requests a refund
   above the auto-approve limit. The AI proposes a
   review-queue item. The customer success manager approves.
5. **Executive decision.** The CEO decides to expand into a
   new region. The decision enters the Company Brain as a
   piece of trusted knowledge. Every AI tool, in every
   department, sees it.
6. **HR handbook update.** HR updates the parental leave
   policy. Every employee sees the update. The next time
   anyone asks the AI about leave, the answer is the
   approved one.
7. **Legal policy update.** Legal updates the data retention
   policy. Every employee sees the update. The compliance
   team's audit log shows the change.

## 7. The guided tour (Part 2)

The V15 brief's Part 2 names a 5-step narrative:

1. An employee asks the AI a question.
2. The AI recalls trusted company knowledge.
3. The AI proposes something new.
4. A manager reviews the proposal.
5. The new knowledge becomes trusted.
6. Another employee benefits.

The V15 work builds a `GuidedTour` component that
walks a visitor through these 6 steps as an overlay on
the demo, with a "Start tour" button at the top of every
demo view and a "Skip" button at the bottom.

## 8. The Company Brain views (Part 3)

The V15 brief names 6 views:

1. **What does my company know?** — the full knowledge base,
   filtered by department, project, and category.
2. **What changed?** — the recent activity stream, with
   proposed, approved, retracted, and corrected items.
3. **Who approved it?** — the approval queue, with the
   approver, the timestamp, and the chain of custody.
4. **What are our AI tools learning?** — the AI activity
   stream, with which tool proposed what.
5. **What decisions have we made?** — the decisions view,
   with the high-stakes items that have been approved or
   retracted.
6. **What does AI remember?** — the recall view, with
   "ask the AI a question" interface and the answers.

Each view is a page at `/demo/view/[id]`. The home
demo page links to all 6.

## 9. Evaluation mode (Part 5)

The V15 brief's Part 5 says: read-only, browse, search,
follow audit history, explore departments, explore memories,
explore Company Brain. Disallow: delete, modify, approve,
administration.

The V15 work enforces this by:
- All demo views are static. There are no form
  submissions, no admin endpoints, no delete buttons.
- The AI "ask" interface is a mock — it returns realistic
  answers from the seeded data, but does not write back.
- The "Reset demo" button is the only state change, and
  it operates on the in-memory state in the browser
  (a `localStorage` reset, not a database reset). The
  data reloads on next page load.

## 10. Design (Part 8)

The V15 brief's Part 8 says:
- Use `find-skill` and `taste-skill`.
- Design for enterprise confidence.
- Avoid: Generic SaaS, AI gradients, Chat bubbles, Robot imagery.
- Focus on: People, Teams, Business, Trust, Knowledge, Decisions.

The V15 work uses the existing `ob-*` design system. The
new design tokens for the demo:
- `--ob-people` — a warm, human color (e.g., a soft amber)
- `--ob-trust` — a deep, calm color (e.g., a slate blue)
- `--ob-knowledge` — a knowledge color (e.g., a warm off-white)
- `--ob-decision` — a decision color (e.g., a deep green)

The V15 work introduces no new visual primitives. The
existing typography (Inter, Space Grotesk, IBM Plex Mono)
is the V15 typography.

## 11. The reset (Part 7)

The V15 brief's Part 7 says: one command, reset demo. The
V15 work ships a "Reset demo" button on the demo home page
that:
- Confirms via modal ("This resets the demo to a fresh
  state. Continue?")
- Clears the in-memory state
- Reloads the page (the seed runs at build time; reload
  shows the fresh state)
- Logs the reset in the console for the maintainer team

The V15 work does **not** ship a CLI reset command. The
website is static; the data is in the build. A "reset" is
"reload the page." The button makes that explicit.

## 12. The dogfood (DOGFOOD rule)

The V15 brief names 6 personas:
- CEO
- Operations Manager
- IT Manager
- HR Manager
- Developer
- New Employee

The V15 dogfood walks through the demo from each persona's
perspective, asking:
- Would I understand this?
- Would I request a pilot?
- Would I trust this?
- Would I buy this?

Every hesitation becomes Priority 1. The full journal is
in `docs/dogfood/DOGFOOD_V15.md` on the engine repo.

## 13. Validation

The V15 brief's validation checklist:
- Build, typecheck, tests, accessibility, performance,
  demo reset, internal links, no broken states.

The V15 work validates each of these. The build is
static (`output: "export"`), so performance is bounded
by the bundle size. Accessibility is inherited from the
existing `ob-*` design system (reduced motion, contrast,
keyboard).

## 14. The completion report (V15 completion)

The V15 brief's 15 sections:

1. Executive Summary
2. Enterprise Demo
3. Seeded Company
4. Demo Story
5. Evaluation Flow
6. Copy Improvements
7. UX Improvements
8. Design Improvements
9. Demo Reset
10. Dogfood Findings
11. Business Impact
12. Remaining Evaluation Gaps
13. Pilot Readiness Score
14. Recommended Next Epic
15. (implicit) Appendix A/B/C

The V15 completion report lives on the engine repo at
`docs/enterprise/V15_COMPLETION_REPORT.md`.

## 15. Stop conditions

The V15 brief's stop conditions are the same as V14's:
External infrastructure, Domain ownership, Authentication
providers, Production credentials. The V15 work does not
need any of these. The V15 work is fully static.

**The V15 work stops when the completion report is
written, the V15 commit is on `origin/main`, and the
V15 brief's last rule is observed: "Stop. Do not continue
automatically."**
