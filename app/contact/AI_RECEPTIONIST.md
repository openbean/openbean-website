# OpenBean AI Receptionist — Design

**Date:** 2026-07-04 (V1) · 2026-07-04 (V9 upgrade)
**Status:** Design-first. A structured intake form (the V1) is implemented and shipping; the V9 iteration upgrades the qualification surface with the named fields the V9 brief calls out (organization, industry, company size, deployment preference, compliance, existing AI tools, existing infrastructure, timeline, budget stage, decision maker). The conversational / LLM-driven V2 is a separate, post-evaluation-program milestone.
**Scope:** the public-facing qualification and hand-off flow that replaces the three `mailto:` CTAs on `openbean.xyz`.

---

## 1. Why a receptionist, not a contact form

OpenBean's prior call to action on the public site was three `mailto:` links: `hello@openbean.xyz?subject=Request%20a%20demo`, `…Architecture%20review`, `…OpenBean%20enterprise%20inquiry`. An enterprise evaluator who clicked any of them got an unfiltered mailbox entry with no qualification, no scheduling, no sales hand-off. The brief: stop losing leads because the first response to a security-conscious enterprise is "send us a freeform email and wait."

The V9 brief sharpens the receptionist's job. The receptionist is **not a chatbot**. It is an **enterprise qualification system** whose purpose is to understand, in the form-filler's own words:

- **Organization** — the company, team, or division the requester is evaluating on behalf of.
- **Industry** — vertical context, used to anticipate compliance regime and architecture constraints.
- **Company size** — sizing signal, used to scope the right Professional Services engagement and the right Evaluation Program tier.
- **Deployment preference** — where the instance would run: Vercel + hosted Supabase, self-managed Postgres on a VPS, dedicated server / on-premise / air-gapped, or "not sure yet."
- **Compliance requirements** — SOC 2, HIPAA, FedRAMP, GDPR, ISO 27001, "not yet decided," or other.
- **Existing AI tools** — Claude Code, Cursor, a hosted agent (OpenAI / Ollama), an automation (GitHub Actions / n8n), a vendor memory product, none, or other.
- **Existing infrastructure** — what the organization already runs in production: Vercel, AWS, GCP, Azure, a colo / dedicated server, on-prem K8s, or other. Used to anticipate deployment friction.
- **Timeline** — when the decision is being made: active now, 1–3 months, 3–6 months, exploring, or other.
- **Budget stage** — whether the evaluation has funding, is pre-funding, or is a personal-curiosity read. (Phrased as a single-select, with an explicit "we're not ready to talk about this" answer, so the question does not feel like a sales funnel.)
- **Decision maker** — who signs off on the eventual purchase: the requester themselves, a peer who has authority, a manager, a procurement team, an executive sponsor, or "I don't know yet." Determines whether the reply goes to engineering, the requester, or a named executive.

With those ten answers in hand, the receptionist can do what a `mailto:` cannot:

- **Route to the right person** — engineering for architecture, sales for procurement, security for FedRAMP/HIPAA hand-off.
- **Name the right next step** — Architecture Review vs. a quickstart walkthrough vs. a Professional Services scoping call vs. the Evaluation Program.
- **Pre-qualify the conversation** — a "no budget, no timeline, no decision maker" reply becomes a "thanks for the read, here's the architecture overview, no follow-up" rather than a sales sequence.

The receptionist does not pretend to be a person, does not claim a calendar slot it does not have, and does not auto-subscribe the requester to anything. The receptionist is a structured intake that an operator reads.

## 2. Two surfaces, one receptionist

The receptionist is reachable two ways; both flow into the same intake, the same hand-off, and the same follow-up cadence.

| Surface | Audience | Trigger |
|---|---|---|
| `/contact` (the landing site's first dedicated page beyond the landing itself) | Anyone arriving at `openbean.xyz` from a CTO/architect search, a security questionnaire, a competitor comparison, or direct word-of-mouth. | "Talk to us" or any "Request a demo" / "Schedule an architecture review" / "Contact sales" CTA anywhere on the marketing site. |
| The structured intake form itself | Anyone ready to give structured information. | Direct submit; no LLM in the loop. |

The V2 conversational surface (an LLM-mediated dialogue that asks the same intake questions in a more guided sequence, escalates to a human when it doesn't know, and never invents facts about OpenBean) is **not** in scope for this iteration. It is named, with its design constraints, in §7. The brief is design-first — this iteration ships the design and the structured intake; the conversational surface is documented but not built.

## 3. The intake — every field earns its place

The intake is the receptionist's only mandatory surface. Each field exists because an operator needs the answer to do the next thing well.

| Field | Why we ask | What the operator does with it |
|---|---|---|
| **Your name** | We need to address a reply; "Hi" is the wrong opener for a security-conscious buyer. | Personalize the reply; never share, never sell, never auto-subscribe. |
| **Work email** | Free webmail is a real signal of evaluation seriousness for enterprise procurement; we ask for a corporate domain and explain why. | Filter out personal-mail noise; the answer is a calendar invite, not a marketing drip. |
| **Organization** | Two people from "Acme" should not both fill out the form and double-book a sales slot. | Match the request to an existing pipeline conversation; create a CRM record when there isn't one. |
| **Industry** *(V9)* | Vertical context shapes compliance regime and architecture constraints (regulated industries default to on-prem; SaaS-default teams default to Vercel). | Anticipate the deployment and compliance conversation before the first reply. |
| **Company size** *(V9)* | Sizing signal for the right Professional Services engagement and the right Evaluation Program tier. | A 50-person team's architecture review is different from a 5,000-person team's. |
| **Role** | A CTO's questions and a Platform Engineer's questions are not the same. | Route the reply to the right human — engineering for architecture questions, sales for procurement. |
| **Decision maker** *(V9)* | Whether the requester signs off themselves, escalates to a peer, a manager, a procurement team, or an executive sponsor. | Determines whether the reply goes to engineering, the requester, or a named executive; determines whether a calendar invite is the right shape or a written reply is. |
| **What brings you here?** *(single-select)* | `Evaluating for a real deployment` / `Researching, not ready yet` / `Already running OpenBean, want a service` / `Something else`. | Determines the reply timeline, the reply length, and which operator handles it. |
| **Where would OpenBean run?** *(multi-select)* | `Vercel + hosted Supabase` / `Self-managed Postgres on a VPS or VM` / `Fully on-premise / air-gapped` / `Not sure yet` / `Other`. | Determines whether the right hand-off is a quickstart walkthrough, a deployment-guide link, or a Professional Services scoping conversation. |
| **Existing AI tools** *(V9, multi-select)* | `Claude Code` / `Cursor` / `A hosted agent (OpenAI / Ollama)` / `Automation (GitHub Actions / n8n / etc.)` / `A vendor memory product` / `None yet` / `Other`. | Determines which Connection setup guidance the operator sends, and which integrations to surface. |
| **Existing infrastructure** *(V9, multi-select)* | `Vercel` / `AWS` / `GCP` / `Azure` / `Colo / dedicated server` / `On-prem Kubernetes` / `None yet` / `Other`. | Determines whether the deployment conversation starts with a managed-service path or an on-prem / dedicated-server path. |
| **Compliance or regulatory requirements?** *(multi-select)* | `SOC 2` / `HIPAA` / `FedRAMP` / `GDPR` / `ISO 27001` / `None specific right now` / `Other`. | Determines whether security documentation, an enterprise architecture review, or a custom deployment conversation is the right next step. |
| **How many AI tools / Connections would you expect to integrate?** *(free integer, optional)* | Sizing signal. | Helps scope the architecture review and the eventual Professional Services estimate. |
| **Budget stage** *(V9, single-select)* | `Funded and approved` / `Funded but not yet approved` / `Pre-funding, exploring` / `Personal curiosity` / `Rather not say`. | Determines whether the reply is a calendar invite, a written response, or a thank-you-and-no-follow-up. |
| **When are you aiming to decide?** *(single-select)* | `Active evaluation now` / `Next 1–3 months` / `Next 3–6 months` / `Just exploring` / `Other`. | Determines reply urgency and follow-up cadence. |
| **Anything else we should know?** *(textarea, optional, 1000 char max)* | Sometimes the real constraint is in the one sentence no form field can hold. | Read; treat as the conversation's first paragraph, not its entire content. |

Every field is marked required or optional explicitly, in plain language. The form rejects input only when rejection serves the operator: a free webmail address gets a single-line explanation, not a generic "invalid email" error, and only blocks submission if the explanation is dismissed.

The form does **not** ask for, store, or transmit: phone number (a calendar invite is the right next step, not a phone call), a screenshot or document upload (security review requires a different, separate process), or a precise headcount. The `company-size` field is a banded select, not a free integer, so the requester is not cornered into a number the operator's reply won't actually use.

## 4. The hand-off

The receptionist does not assign a person — it routes by content, not by availability. A reply comes from a named individual within the next business day, not from a no-reply address, and references the answers the form collected so the conversation continues from where the form left off.

Routing table (V9 expansion; the V8 routing rows remain, the V9 rows add the new qualification-driven branches):

| Intake answers suggest | Hand-off |
|---|---|
| `Evaluating for a real deployment` + `Funded and approved` + any non-trivial compliance requirement + decision-maker is the requester or a peer | A senior engineer for an architecture review within one business day, with a calendar invite. |
| `Evaluating for a real deployment` + `Funded and approved` + Vercel/hosted Supabase + no specific compliance + decision-maker is the requester or a peer | Quickstart walkthrough (reply with the deployment guides; calendar invite within one business day). |
| `Evaluating for a real deployment` + on-premise / air-gapped + any compliance requirement | Professional Services scoping call within one business day, scoped to the answers — the Evaluation Program's Discovery phase is the recommended entry point for a deployment this size. |
| `Already running OpenBean, want a service` | Professional Services intake (calendar invite within one business day; the right shape is Migration Assessment or Health Check based on what the running instance looks like). |
| `Funded but not yet approved` + active evaluation | A written response with the architecture one-pager, a deployment guide, and a note that a calendar invite becomes appropriate once internal approval lands. |
| `Pre-funding, exploring` or `Personal curiosity` | A one-paragraph reply with the most relevant documentation links; no follow-up unless asked. |
| `Researching, not ready yet` | A one-paragraph reply with the architecture one-pager, the manifesto's philosophical case, and a "no follow-up unless asked" closing. |
| `Something else` | A one-paragraph reply asking for the missing context; no follow-up unless the lead responds. |

The intake never suggests a time-slot picker in the form itself — the calendar invite arrives in the reply, with a link to the operator's actual availability, so the form's promise ("we'll reply within one business day") is the only scheduling the form makes. A time-slot picker on the form would lie about availability it does not have.

## 5. The follow-up cadence

Two reply principles, no more:

- **Every reply references the answers the form collected.** Not a generic "thanks for your interest" — a sentence that names the deployment target, the compliance requirement, the company size, the decision maker, or the budget stage. The conversation starts where the form left off.
- **Every reply ends with a real next step.** A calendar invite, a documentation link, a specific engineer to talk to, or a clear statement that no further follow-up will happen unless asked. A reply that does not commit to a next step is a failed reply.

There is no auto-responder, no marketing drip, no "you might also like" follow-up sequence. OpenBean's value is "an AI participating in organizational learning under the same rules as a human"; a website that does the opposite of what it sells is not a website worth having.

## 6. What the receptionist is not

The receptionist is not:

- A chatbot. It is a structured intake that an operator reads.
- A sales development rep. It does not call, does not score, does not enrich data.
- A marketing analytics engine. The only data it captures is what the form's fields collect, and a timestamp.
- A LLM-mediated conversation. That is V2, documented in §7 but not in this iteration.
- A pretend-human. No avatar, no first-person-on-the-other-side, no "Sarah from OpenBean will be in touch."

The receptionist's success is measured by: (a) the percentage of intakes that route to a useful next step, and (b) the percentage of replies that the requester considers worth responding to. The first is a routing-table measurement; the second is qualitative. Both are more important than any volume metric, and neither is "conversions."

## 7. V2 — the conversational surface (designed, not built)

V2 is an LLM-mediated dialogue that walks a requester through the §3 intake one question at a time, with a single hard rule: **the model never invents a fact about OpenBean that is not in the canonical product documentation.** Every claim it makes about pricing, deployment, security, governance, or availability is grounded in a retrieved passage from `docs/architecture/OPENBEAN.md`, `docs/product/OPENBEAN_MANIFESTO.md`, the relevant `docs/enterprise/*.md` document, and the landing-site copy. When the model does not know, it says so plainly and offers to route to a human — it does not guess.

V2's design constraints (the only ones V1 implementation would have to honor):

1. **No silent uncertainty.** Every LLM utterance that asserts an OpenBean fact must carry a citation to a documentation file the user can read.
2. **No availability claims.** The model never says "I have a slot Tuesday at 2pm" or anything resembling availability. A calendar invite arrives from a real operator.
3. **No persona.** No "I'm [name] from OpenBean." The receptionist is the receptionist, not a person.
4. **Routing over conversation.** The goal is to collect the §3 fields and route; the conversation is the means, not the end. A requester who has answered enough fields is told the form is complete and a human will be in touch — not kept talking for the model's sake.
5. **A "talk to a human" escape at every step.** Every question is followed by "or skip — a human can ask you this instead." No field is mandatory in the conversational surface even if it is mandatory in the structured form.

V2 ships after the V1 intake has been measured in real use. The V1 form is the receptionist's MVP; the conversation is its improvement, not its origin.

## 8. What this iteration ships

The V1 iteration (2026-07-04, shipped) ships:

- **This design document** (`docs/enterprise/AI_RECEPTIONIST.md`).
- **A working structured intake at `/contact`** on the marketing site, replacing the three `mailto:` CTAs.
- **Updated CTAs across the marketing landing page** that link to `/contact` rather than opening an email client.
- **A hand-off routing table** the operator can use without a CRM until the volume justifies one.

The V9 iteration (2026-07-04, this iteration) ships:

- **The V9 qualification upgrade to the intake** — five new fields (industry, company size, decision maker, existing AI tools, existing infrastructure) and one re-shaped field (budget stage, replacing the implicit "is this serious" question with an explicit single-select that has a "rather not say" answer). The form's required/optional set is unchanged in shape; every new field is required except `existing AI tools` and `existing infrastructure`, which are optional to keep the form's completion friction bounded.
- **The expanded routing table in §4** — six new routing rows added, each with a different "what to do next" answer that the V1 routing did not distinguish.
- **The form's accessibility posture** unchanged: every field has a `<label>`, every multi-select group is a `<fieldset>` with a `<legend>`, the free-webmail explanation is `aria-describedby`-connected, the submit error is `role="alert"`.

The V9 iteration does **not** ship:

- The V2 conversational surface.
- A CRM integration. A spreadsheet, or a dedicated mailbox, is fine until volume justifies the integration.
- A time-slot picker on the form. A calendar invite in the reply is the right shape.

The hand-off routing table is operational, not technical. The form is a form. The interesting work is the table.
