// V14: Customer Journey. The 5 named gates of the Evaluation Program.

const GATES = [
  { n: "1", title: "Discovery", duration: "Week 1", body: "We name the deployment target, the compliance regime, the AI tools in scope, the decision makers, the budget stage, and the success criteria. The output is a signed Discovery brief." },
  { n: "2", title: "Architecture review", duration: "Week 2", body: "We produce a written architecture memo for your named deployment target, mapping the Company Brain to your actual environment. The memo is the engineering team’s first chance to see the deployment in their own context." },
  { n: "3", title: "Pilot deployment", duration: "Weeks 3–6", body: "Your team stands up a single-team, single-use-case pilot in your own environment, with a weekly cadence and a daily Slack channel. The pilot is bounded by the Discovery brief." },
  { n: "4", title: "Production deployment", duration: "Weeks 7–10", body: "The pilot graduates to a production-bound instance. The engineering team takes over day-to-day operations. The maintainer team’s involvement tapers to on-call and quarterly reviews." },
  { n: "5", title: "Operational maturity", duration: "Months 4–6", body: "The Company Brain becomes the system of record for the knowledge your AI tools use. The maintainer team’s role is named-on-call retainer and quarterly reviews." },
];

const REQUEST_DEMO = "/contact?intent=demo";

export function CustomerJourneySection() {
  return (
    <section className="ob-section" id="customer-journey">
      <div className="ob-wrap">
        <p className="ob-eyebrow" style={{ justifyContent: "center", display: "flex" }}>Customer journey</p>
        <h2 className="ob-h2 ob-center">From first contact to a running Company Brain, in 4–6 weeks.</h2>
        <p className="ob-lead ob-center" style={{ maxWidth: "62ch", margin: "18px auto 0" }}>
          The Evaluation Program is a structured path with five named gates. Each gate
          has a deliverable, an exit condition, and a next step. The program ends with a
          running Company Brain or a written close-out report, whichever you choose.
        </p>
        <ol className="ob-journey">
          {GATES.map((g) => (
            <li className="ob-journey-step" key={g.n}>
              <div className="ob-journey-meta">
                <span className="ob-journey-n" aria-hidden="true">{g.n}</span>
                <span className="ob-journey-dur">{g.duration}</span>
              </div>
              <h3 className="ob-h3">{g.title}</h3>
              <p className="ob-body">{g.body}</p>
            </li>
          ))}
        </ol>
        <div className="ob-cta-row ob-center" style={{ marginTop: "32px" }}>
          <a className="ob-btn ob-btn-primary ob-btn-lg" href={REQUEST_DEMO}>
            Request an Enterprise Demo
          </a>
          <a className="ob-btn ob-btn-lg" href="/evaluation-program">Read the Evaluation Program</a>
        </div>
      </div>
    </section>
  );
}
