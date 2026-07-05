// V14: Enterprise Demo. The 6-step narrative that explains the demo to a CEO.

const STEPS = [
  { n: "1", title: "Someone joins", body: "A new employee is invited to the Company Brain. They sign in, and the dashboard shows them what the company has already agreed is true." },
  { n: "2", title: "The AI proposes a change", body: "The team’s AI tool proposes a pricing change. The Company Brain holds it in the approval queue because pricing is important enough to need a person’s sign-off." },
  { n: "3", title: "A manager approves", body: "The pricing manager reviews the proposal, sees the reasoning, and approves it. The approval is itself a record in the log." },
  { n: "4", title: "The knowledge evolves", body: "Every other AI tool, in every other department, sees the updated knowledge. The next time anyone asks the AI about pricing, the answer is the approved one." },
  { n: "5", title: "Another employee searches", body: "A sales rep asks the AI “what did we agree with Acme on the renewal?” The answer comes with the full chain of custody." },
  { n: "6", title: "Everything is audited", body: "Six months later, when an auditor asks who approved the Acme renewal and when, the answer is one query against the audit log." },
];

const REQUEST_DEMO = "/contact?intent=demo";
const TRY_DEMO = "/demo";

export function EnterpriseDemoSection() {
  return (
    <section className="ob-section" id="enterprise-demo">
      <div className="ob-wrap">
        <p className="ob-eyebrow" style={{ justifyContent: "center", display: "flex" }}>Enterprise demo</p>
        <h2 className="ob-h2 ob-center">See the Company Brain in action, with a real company’s data.</h2>
        <p className="ob-lead ob-center" style={{ maxWidth: "62ch", margin: "18px auto 0" }}>
          The Enterprise Demo walks through a realistic company — a contract manufacturer
          with 50 employees, 4 departments, 6 projects, and 18 people connected to the
          Company Brain. No sales call required. The demo is resettable; the data is
          seeded; the screens are the real screens.
        </p>
        <ol className="ob-demo-grid">
          {STEPS.map((s) => (
            <li className="ob-demo-card" key={s.n}>
              <span className="ob-demo-n" aria-hidden="true">{s.n}</span>
              <h3 className="ob-h3">{s.title}</h3>
              <p className="ob-body">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="ob-cta-row ob-center" style={{ marginTop: "32px" }}>
          <a className="ob-btn ob-btn-primary ob-btn-lg" href={TRY_DEMO}>
            Try the Enterprise Demo
          </a>
          <a className="ob-btn ob-btn-lg" href={REQUEST_DEMO}>
            Request a live demo with your data
          </a>
        </div>
      </div>
    </section>
  );
}
