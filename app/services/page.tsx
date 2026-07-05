// The Professional Services catalog page (see docs/enterprise/PROFESSIONAL_SERVICES.md).
// Each service has six fields, in order: For, Intake, Deliverable, Exit condition,
// Customer responsibilities, OpenBean responsibilities, and an explicit
// "what is not in scope." The page mirrors the structure of the design
// document so an evaluator can read either and land in the same place.
//
// V9 expansion: 5 -> 9 services. Migration Assessment, Security Review,
// Pilot Program, and Support are the new ones. Customer responsibilities and
// OpenBean responsibilities are now in the grid alongside the others.

import { Footer, TopBar } from "@openbean/ui";

export const metadata = {
  title: "Professional Services — OpenBean",
  description: "The OpenBean maintainer team's service catalog: Architecture Review, Deployment Support, Migration Guidance, Migration Assessment, Training, Security Review, Pilot Program, Support, and Health Check. Each engagement has a named deliverable, a named exit condition, and a clear split of customer and OpenBean responsibilities.",
};

interface Service {
  id: string;
  name: string;
  summary: string;
  for_: string;
  intake: string;
  deliverable: string;
  exit: string;
  customer: string;
  openbean: string;
  outOfScope: string;
}

const SERVICES: Service[] = [
  {
    id: "architecture-review",
    name: "Architecture Review",
    summary: "A working session against your actual deployment target, not a generic walkthrough. Written memo at the end, suitable for attaching to your own architecture review.",
    for_: "An organization that has a concrete deployment target and wants a working session against their actual environment.",
    intake: "A named deployment target, a named compliance regime, a list of AI tools the team plans to connect first.",
    deliverable: "A signed-off architecture memo covering the recommended deployment topology, the security model as it lands in the named compliance regime, the migration path from your current memory surface, and a list of named operational risks specific to the target. Shared under the engagement's NDA.",
    exit: "The memo is attached to your own architecture review; the open questions in the memo are the only things left to resolve before deployment.",
    customer: "Name the deployment target, the compliance regime, and the AI tools; provide the memo's distribution list; schedule the working session within the engagement's stated window.",
    openbean: "Produce the memo, walk it through a working session, and answer follow-up questions in writing for a stated period after the engagement ends.",
    outOfScope: "Building the deployment (that's a separate service), choosing AI tools, or recommending competitors.",
  },
  {
    id: "deployment-support",
    name: "Deployment Support",
    summary: "Hands-on help standing up your first production instance, ending when your team can run doctor, backup, and restore on its own.",
    for_: "An organization that has decided to deploy OpenBean and wants hands-on help with the first production-bound instance.",
    intake: "A named deployment target, a named owner for the project inside your organization, a written decision to deploy, and the prerequisite access (cloud account, VPS, or on-prem environment).",
    deliverable: "A working OpenBean instance your team can sign in to; the named owner has the operator's runbook; the engagement's last day is a one-hour hand-off with the named owner.",
    exit: "Your team has run `npm run doctor` clean on its own instance, has executed a backup/restore drill against its own data, and can describe the upgrade sequence from memory.",
    customer: "Provide the prerequisite access, name the project's owner, and ensure the owner is available for the hand-off and the runbook walkthrough.",
    openbean: "Stand up the instance, run the operator's runbook walkthrough with the named owner, and produce a written hand-off summary.",
    outOfScope: "Running the instance for you after the engagement ends, providing 24/7 operational support (that's Support, §2.8), or refactoring the application's source code to fit the deployment.",
  },
  {
    id: "migration-guidance",
    name: "Migration Guidance",
    summary: "Bringing existing organizational knowledge — wikis, Slack, prior AI tool memories, design docs — into a governed instance, with the gate policy decided up front.",
    for_: "An organization bringing existing organizational knowledge into a governed instance.",
    intake: "A description of the source surface and a destination project structure (a named list of OpenBean Projects the migrated content should land in).",
    deliverable: "A working migration plan: the order of operations, the writer identities, the gate policy, and a written rationale for each choice. The engagement team is present for the first run and reviews the second; your team owns the third and onward.",
    exit: "The first migration run has produced a set of claims your owner can audit by project, the writer attribution is correct, and the gate policy is in force.",
    customer: "Produce the source surface (the wiki export, the Slack archive, the prior AI tool's memory dump), name the destination Project structure, and staff the team that owns the third migration run onward.",
    openbean: "Produce the migration plan, be present for the first run, review the second, and write a post-run summary.",
    outOfScope: "Automated ingestion of unstructured sources, rewriting migrated content to fit the engine's shape, or a service that runs the migration on a schedule.",
  },
  {
    id: "migration-assessment",
    name: "Migration Assessment (V9 new)",
    summary: "A written assessment of feasibility, scope, and risk before committing to a Migration Guidance engagement. The assessment is a plan, not the migration itself.",
    for_: "An organization considering migration but not yet committed to a date or a source surface.",
    intake: "A source surface named at a sufficient level of detail to estimate the volume (number of wikis, number of Slack channels, size of the prior AI tool's memory) and a target outcome (search-only access, full governance, or hybrid).",
    deliverable: "A written Migration Assessment covering: estimated claim volume per source surface; the gate policy the migration would land under; the AI tool inventory and Connection re-creation; the risk surface specific to the named source; a recommended phased plan with named gates; a total-engagement estimate.",
    exit: "You have a written assessment you can attach to an internal decision about whether and when to start a Migration Guidance engagement.",
    customer: "Provide the volume estimate, name the target outcome, and confirm the assessment's distribution list.",
    openbean: "Produce the assessment and answer one round of clarifying questions in writing.",
    outOfScope: "Running the actual migration, the writer-attribution work, the gate-policy work. The assessment is a plan; the Migration Guidance service is the execution.",
  },
  {
    id: "training",
    name: "Training",
    summary: "Sessions for the team that will operate OpenBean day-to-day. Half-day or full-day, in person or remote, organized by audience.",
    for_: "An organization whose team will operate OpenBean day-to-day and needs to build the muscle memory, not just the documentation.",
    intake: "A deployed or nearly-deployed instance and a named list of attendees (a typical session is 4–8 people). Sessions are organized by audience: engineering / SRE, governance, or developer.",
    deliverable: "A working session with a written agenda circulated in advance and a written summary circulated after. Each attendee leaves with a specific, named next thing to do in your instance.",
    exit: "Each named attendee has done at least one of the named next things in your instance, with the engagement team present, before the session is over.",
    customer: "Staff the named attendees, provide the deployed instance, and ensure each attendee has the time and access to do the hands-on exercise.",
    openbean: "Produce the agenda, run the session, and write the summary.",
    outOfScope: "Certification (OpenBean does not have a certification program and is not building one), and training your customers.",
  },
  {
    id: "security-review",
    name: "Security Review (V9 new)",
    summary: "A security-shaped sign-off on OpenBean against your questionnaire — CAIQ, SIG, or custom. An opinion about how OpenBean's documented properties map to your items, not a re-audit.",
    for_: "An organization that needs a security-shaped sign-off before OpenBean can be deployed into a regulated environment.",
    intake: "A security questionnaire or its equivalent (CAIQ, SIG, a custom internal questionnaire, or a named list of security topics the security team needs covered). 60-minute scoping call.",
    deliverable: "A written Security Review covering: the mapping between OpenBean's documented security properties and the questionnaire's items (every item: covered, partially covered, not covered); the acceptance-suite CHECK numbers that prove each covered property; the deployment-target-specific security posture; the operator's responsibilities for the named compliance regime; the named security questions the engagement team could not answer, with the contact at OpenBean who can.",
    exit: "You have a written review you can attach to a security questionnaire, and the named questions are routed to the right human at OpenBean.",
    customer: "Provide the questionnaire or the equivalent list, name the deployment target, and confirm the review's distribution list.",
    openbean: "Produce the review, sign off on it, and be available for one round of follow-up questions in writing.",
    outOfScope: "A penetration test, a SOC 2 audit, a HIPAA attestation. The Security Review is an opinion about how OpenBean's documented properties map to your questionnaire, not a re-audit.",
  },
  {
    id: "pilot-program",
    name: "Pilot Program (V9 new)",
    summary: "A structured, time-bounded pilot deployment with named gates. 4–6 weeks is the typical duration. The pilot ends with a written outcome report your team uses to inform a production decision.",
    for_: "An organization that wants a structured pilot deployment rather than a one-shot deployment, in order to evaluate fit before committing to a production rollout.",
    intake: "A named pilot scope (a single team, a single use case, a named set of AI tools, a defined duration), a named executive sponsor, and a written decision about what 'pilot success' means in your context.",
    deliverable: "A structured pilot plan with named gates, each gate's entry and exit criteria, the deliverables produced at each gate, and a written pilot-outcome report at the end. Signed off by both your organization and the maintainer team before the pilot starts.",
    exit: "The pilot has either met its named success criteria (and the next step is a Production Deployment Support engagement) or has not (and the next step is a written close-out report).",
    customer: "Name the pilot scope, the executive sponsor, the success criteria, and the pilot team; provide the prerequisite access; staff the team's weekly cadence with the maintainer team's pilot lead.",
    openbean: "Produce the pilot plan, attend the weekly cadence, be available for the daily Slack channel the pilot team uses, and produce the pilot-outcome report at the end.",
    outOfScope: "A production deployment (that's Deployment Support, separately), a full migration (that's Migration Guidance, separately), or an indefinite engagement.",
  },
  {
    id: "support",
    name: "Support (V9 new)",
    summary: "A named, time-bounded support relationship with named response-time targets. Typically a quarter or a year. Operational issues against the running instance, not new work.",
    for_: "An organization running OpenBean in production that needs a named, time-bounded support relationship with named response-time targets.",
    intake: "A running production instance, a named operations contact, and a written support agreement that names the response-time targets, the escalation path, and what is and is not covered.",
    deliverable: "A working support relationship: a named channel (Slack Connect, shared email, or a ticketing system you provide), named response-time targets (Severity 1: 1-hour response, 4-hour mitigation; Severity 2: 4-hour response, 1-business-day mitigation; Severity 3: 1-business-day response), a quarterly review, and a written incident report for every Severity 1 incident.",
    exit: "The support agreement is renewed, expires, or is terminated; the engagement ends with a written close-out summary.",
    customer: "Staff the named operations contact, use the named channel, provide the severity classification for every issue, and engage the named escalation path when the response-time targets are not met.",
    openbean: "Staff the named support team, meet the response-time targets, produce the quarterly review, and produce the incident report for every Severity 1.",
    outOfScope: "Feature work, security audits, deployment work, or migration work. A feature request is routed to the public roadmap, not absorbed into the support engagement.",
  },
  {
    id: "health-check",
    name: "Health Check",
    summary: "A second pair of eyes on the operational shape of a production instance, not on the application. Written report, signed off by a senior engineer.",
    for_: "An organization running an instance that has been in production for a while, where the team wants a second pair of eyes on the operational shape.",
    intake: "A production instance with at least 30 days of claim history, a willing operations contact, and a willingness to share `doctor` output, `backup` archive metadata (not the contents), and a representative sample of `config` and `scope_grants` rows.",
    deliverable: "A written health report covering: a review of the gate policy against the actual claim history; a sizing review; a security review; a concrete list of named, prioritized recommendations.",
    exit: "You have the report, have triaged each named recommendation, and any 'do now' items are either completed or scheduled.",
    customer: "Provide the `doctor` output and the sample of `config` and `scope_grants` rows, and triage the recommendations.",
    openbean: "Produce the report, walk it through a working session, and answer one round of clarifying questions in writing.",
    outOfScope: "The engagement team taking operational action on the instance; you own the operational decisions and their execution.",
  },
];

export default function ServicesPage() {
  return (
    <div className="lp ent">
      <TopBar
        tag="platform"
        right={
          <nav className="lp-nav" aria-label="Page sections">
            <a href="/#governance">Governance</a>
            <a href="/#architecture">Architecture</a>
            <a href="/#security">Security</a>
            <a href="/#deployment">Deployment</a>
            <a href="/evaluation-program">Evaluation program</a>
            <a href="/services">Services</a>
            <a className="btn" href="/contact">Talk to us</a>
          </nav>
        }
      />
      <main className="lp-services">
        <p className="ent-eyebrow">Professional Services</p>
        <h1>Engagement shapes for organizations that want help.</h1>
        <p className="lede">
          OpenBean is designed to be run by your own engineers. For teams that want help with
          a production rollout, the maintainer team offers nine named engagements. Each has
          a deliverable, an exit condition, and a clear split of customer and OpenBean
          responsibilities — paid against the deliverable, not against hours.
        </p>
        <p className="lede">
          Pricing is not on this page. A scoped engagement produces a real number; a templated
          number produces a templated engagement. Conversations that don&rsquo;t fit one of the
          shapes below are answered in writing rather than forced into the nearest one.
        </p>

        <div className="lp-svc-list">
          {SERVICES.map((s) => (
            <article key={s.id} className="lp-svc" id={s.id}>
              <h2>
                {s.name}
                <span className="anchor">#{s.id}</span>
              </h2>
              <p className="summary">{s.summary}</p>
              <div className="grid">
                <div>
                  <h3>For</h3>
                  <p>{s.for_}</p>
                </div>
                <div>
                  <h3>Intake</h3>
                  <p>{s.intake}</p>
                </div>
                <div>
                  <h3>Deliverable</h3>
                  <p>{s.deliverable}</p>
                </div>
                <div>
                  <h3>Exit condition</h3>
                  <p>{s.exit}</p>
                </div>
                <div>
                  <h3>Customer responsibilities</h3>
                  <p>{s.customer}</p>
                </div>
                <div>
                  <h3>OpenBean responsibilities</h3>
                  <p>{s.openbean}</p>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <h3>What is not in scope</h3>
                  <p>{s.outOfScope}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="lp-svc-cta">
          <p>Engagements start with the same structured intake as everything else.</p>
          <a className="btn btn-primary lp-btn-lg" href="/contact">Start a conversation</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
