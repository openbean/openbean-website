// V14: Business Outcomes section. Mirrors the WhyOpenBeanGrid pattern.
// Three named outcomes in plain business language. No jargon.

const OUTCOMES = [
  {
    eyebrow: "Audit",
    title: "Decisions your team can show",
    body: "Every important decision has a chain of custody: which AI proposed it, which person approved it, and when. The audit trail is the same one your finance and compliance teams already know how to read — a database log, not a vendor dashboard.",
  },
  {
    eyebrow: "Continuity",
    title: "Knowledge that survives a vendor change",
    body: "The knowledge your company has built up — pricing terms, deployment facts, customer commitments — is stored in a system you own, on infrastructure you own. Switching AI vendors does not lose what your team has taught its assistants.",
  },
  {
    eyebrow: "Alignment",
    title: "One source of truth, not twelve",
    body: "Every AI tool your teams use reads from the same governed knowledge. New hires onboard faster because the AI assistants they use on day one already know what the team agreed to last quarter.",
  },
];

export function BusinessOutcomesSection() {
  return (
    <section className="ob-section" id="business-outcomes">
      <div className="ob-wrap">
        <p className="ob-eyebrow" style={{ justifyContent: "center", display: "flex" }}>What you get</p>
        <h2 className="ob-h2 ob-center">
          What changes inside your company the day OpenBean goes live.
        </h2>
        <p className="ob-lead ob-center" style={{ maxWidth: "62ch", margin: "18px auto 0" }}>
          Three outcomes your team will feel in the first month. The rest of this page
          is the proof for each.
        </p>
        <div className="ob-outcomes-grid">
          {OUTCOMES.map((o) => (
            <article className="ob-outcome-card" key={o.title}>
              <p className="ob-eyebrow muted">{o.eyebrow}</p>
              <h3 className="ob-h3">{o.title}</h3>
              <p className="ob-body">{o.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
