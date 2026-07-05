// V14: Meet the Company Brain. The flagship product.

const PILLARS = [
  { eyebrow: "Store", title: "One knowledge store", body: "Every piece of company knowledge — pricing, contracts, deployment, customer commitments, runbooks, policies — lives in one place, in a format the AI tools can read and the people can review." },
  { eyebrow: "Approval", title: "One approval queue", body: "The important knowledge waits for a person’s approval. The queue is the only place where high-stakes knowledge enters the system, and the approval is itself a record in the log." },
  { eyebrow: "Trail", title: "One audit trail", body: "The full history of every change is kept forever. The audit trail is the same database log your finance, security, and compliance teams already know how to read." },
];

const REQUEST_DEMO = "/contact?intent=demo";

export function CompanyBrainSection() {
  return (
    <section className="ob-section" id="company-brain">
      <div className="ob-wrap">
        <p className="ob-eyebrow" style={{ justifyContent: "center", display: "flex" }}>The flagship product</p>
        <h2 className="ob-h2 ob-center">Meet the Company Brain.</h2>
        <p className="ob-lead ob-center" style={{ maxWidth: "62ch", margin: "18px auto 0" }}>
          The Company Brain is OpenBean’s flagship product: a single, governed system of
          record for the knowledge your company has agreed is true. It is the destination
          for every AI tool your teams use, and the source of every important answer.
        </p>
        <div className="ob-cb-grid">
          {PILLARS.map((p) => (
            <article className="ob-cb-card" key={p.title}>
              <p className="ob-eyebrow muted">{p.eyebrow}</p>
              <h3 className="ob-h3">{p.title}</h3>
              <p className="ob-body">{p.body}</p>
            </article>
          ))}
        </div>
        <div className="ob-cta-row ob-center" style={{ marginTop: "32px" }}>
          <a className="ob-btn ob-btn-primary ob-btn-lg" href={REQUEST_DEMO}>
            Request an Enterprise Demo
          </a>
          <a className="ob-btn ob-btn-lg" href="#customer-journey">See the customer journey</a>
        </div>
      </div>
    </section>
  );
}
