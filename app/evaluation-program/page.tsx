// The Evaluation Program — the structured 4–6 week path an organization
// follows from "I have heard of OpenBean" to "I am running it in production."
// The program is a contract: named gates, named deliverables at each gate,
// named exit criteria, and a named next step regardless of whether the
// evaluation concludes with a "yes" or a "no."

import { Footer, TopBar } from "@openbean/ui";

export const metadata = {
  title: "Evaluation Program — OpenBean",
  description: "A structured 4–6 week path from \"I have heard of OpenBean\" to \"I am running it in production.\" Named gates, named deliverables at each gate, named exit criteria.",
};

interface Gate {
  id: string;
  number: number;
  name: string;
  duration: string;
  description: string;
  deliverable: string;
  exit: string;
  nextStep: string;
}

const GATES: Gate[] = [
  {
    id: "discovery",
    number: 1,
    name: "Discovery",
    duration: "Week 1",
    description: "The maintainer team and the organization's team align on the deployment target, the compliance regime, the AI tool inventory, the decision makers, the budget stage, and the success criteria for the evaluation. This is the conversation that turns an open-ended \"I want to evaluate OpenBean\" into a named scope with named gates.",
    deliverable: "A written Discovery brief, signed off by both sides, naming the deployment target, the compliance regime, the AI tool inventory, the decision makers, the budget stage, the timeline, and the success criteria for the evaluation. The brief is the contract the rest of the program runs against.",
    exit: "Both sides have signed off on the brief; the pilot scope (or production scope) is named; the maintainer team has confirmed it can support the named shape.",
    nextStep: "Move to Gate 2 (Architecture Review) if the brief names a real deployment target. Move to Gate 1.5 (Migration Assessment) first if the evaluation includes bringing existing knowledge from a wiki, Slack, or a prior AI tool.",
  },
  {
    id: "architecture",
    number: 2,
    name: "Architecture Review",
    duration: "Week 2",
    description: "The maintainer team produces a written architecture memo for the named deployment target, working with the organization's engineering team to map OpenBean's documented properties to the organization's actual environment. The memo is the engineering team's first chance to see the deployment in their own context, not in the abstract.",
    deliverable: "A signed-off architecture memo: the recommended deployment topology, the security model as it lands in the named compliance regime, the migration path from the current memory surface, the named operational risks specific to the target, and the named open questions that Gate 3 needs to resolve.",
    exit: "The engineering team has the memo and has triaged the named risks into \"do now\" / \"do later\" / \"won't do, and here's why.\"",
    nextStep: "Move to Gate 3 (Pilot Deployment) for the typical 4–6 week pilot. Move to Gate 4 (Production Deployment Support) directly if the engineering team is already confident in the memo and the deployment is well-understood.",
  },
  {
    id: "pilot",
    number: 3,
    name: "Pilot Deployment",
    duration: "Weeks 3 – 6 (4 weeks typical)",
    description: "The organization stands up a single-team, single-use-case pilot of OpenBean in their own environment, with the maintainer team attending a weekly cadence and available on a daily Slack channel. The pilot is bounded by the Gate 1 brief's success criteria.",
    deliverable: "A working pilot instance the pilot team uses daily; a written pilot-outcome report at the end, produced by the maintainer team, summarizing what was learned against the success criteria, what worked, what didn't, and a recommended next step.",
    exit: "The pilot has either met the named success criteria (and the next step is Gate 4) or has not (and the next step is a written close-out report the organization can use to inform its decision).",
    nextStep: "Move to Gate 4 (Production Deployment Support) on success. On close-out, the program ends with a written handoff to the organization's team, and the next step is theirs to name.",
  },
  {
    id: "production",
    number: 4,
    name: "Production Deployment",
    duration: "Weeks 7 – 10 (4 weeks typical)",
    description: "The organization stands up the first production-bound OpenBean instance, with the maintainer team walking the named owner through the operator's runbook (`doctor`, `backup`, `restore`, the upgrade sequence). The deployment ends with a one-hour hand-off to the named owner.",
    deliverable: "A working production instance the organization owns; a named owner who has the operator's runbook; a written hand-off summary.",
    exit: "The organization has run `npm run doctor` clean on its own instance, has executed a `backup`/`restore` drill against its own data, and can describe the upgrade sequence from memory. The engagement does not end before these three have happened on the maintainer team's watch.",
    nextStep: "Move to Gate 5 (Operational Maturity) — quarterly Health Checks and, if the organization wants, a Support engagement for the running instance.",
  },
  {
    id: "maturity",
    number: 5,
    name: "Operational Maturity",
    duration: "Ongoing",
    description: "Quarterly Health Checks and, if the organization wants, a Support engagement. The maturity gate is not a gate with a single exit; it is the program operating as designed, with the maintainer team on a quarterly cadence and the organization's team fully owning the running instance.",
    deliverable: "A quarterly Health Check report and, if engaged, a Support agreement with named response-time targets and named channels.",
    exit: "The engagement is renewed, expires, or is terminated; the next step is a written close-out summary.",
    nextStep: "Renewal or close-out, on the organization's terms.",
  },
];

export default function EvaluationProgramPage() {
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
        <p className="ent-eyebrow">Evaluation Program</p>
        <h1>From &ldquo;I have heard of OpenBean&rdquo; to &ldquo;I am running it in production.&rdquo;</h1>
        <p className="lede">
          A structured 4–6 week path with named gates, named deliverables at each gate, and
          named exit criteria. The program is a contract: the success criteria are written
          down in Gate 1, the architecture is signed off in Gate 2, the pilot is bounded
          by the criteria in Gate 3, the production hand-off ends Gate 4, and Gate 5 is
          the organization running OpenBean on its own terms.
        </p>
        <p className="lede">
          The program ends with a &ldquo;yes&rdquo; or a &ldquo;no.&rdquo; Both are valid
          outcomes; the contract&rsquo;s value is that the &ldquo;no&rdquo; is a written
          close-out report the organization can use to inform its decision, not a quiet
          end-of-engagement.
        </p>

        <div className="lp-svc-list">
          {GATES.map((g) => (
            <article key={g.id} className="lp-svc" id={g.id}>
              <h2>
                <span style={{ marginRight: 12, opacity: 0.7 }}>Gate {g.number}.</span>
                {g.name}
                <span className="anchor">#{g.id}</span>
              </h2>
              <p className="summary"><b>{g.duration}</b> — {g.description}</p>
              <div className="grid">
                <div>
                  <h3>Deliverable</h3>
                  <p>{g.deliverable}</p>
                </div>
                <div>
                  <h3>Exit condition</h3>
                  <p>{g.exit}</p>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <h3>Next step</h3>
                  <p>{g.nextStep}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="lp-svc-cta">
          <p>Start with the structured intake. The maintainer team will name the right gate.</p>
          <a className="btn btn-primary lp-btn-lg" href="/contact">Start an evaluation</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
