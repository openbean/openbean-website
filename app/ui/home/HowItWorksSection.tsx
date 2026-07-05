// V14: How OpenBean Works section. Three-step explainer in plain language.

const STEPS = [
  {
    n: "1",
    eyebrow: "The knowledge",
    title: "The Company Brain",
    body: "A single, append-only log of every piece of company knowledge, stored in a database you own. Nothing is ever deleted. The full history is kept forever, so you can always see how a decision was made, and why.",
  },
  {
    n: "2",
    eyebrow: "The connections",
    title: "Every AI tool, one connection",
    body: "OpenBean uses an open standard so any AI tool your teams use — Claude Code, Cursor, an internal script — can read from and write to the same Company Brain. One connection per tool, one credential, full audit trail.",
  },
  {
    n: "3",
    eyebrow: "The approval",
    title: "People approve what matters",
    body: "A configurable rule decides which knowledge is important enough to need a person’s approval. The default already covers pricing, contracts, deployment targets, and customer commitments. Your team tunes the rest.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="ob-section" id="how-it-works">
      <div className="ob-wrap">
        <p className="ob-eyebrow" style={{ justifyContent: "center", display: "flex" }}>How it works</p>
        <h2 className="ob-h2 ob-center">A simple system, explained in plain language.</h2>
        <p className="ob-lead ob-center" style={{ maxWidth: "62ch", margin: "18px auto 0" }}>
          OpenBean is one system with three parts: a Company Brain (the knowledge itself),
          a way for AI tools to read and write that knowledge, and a way for people to
          approve the important changes.
        </p>
        <ol className="ob-how-grid">
          {STEPS.map((s) => (
            <li className="ob-how-card" key={s.n}>
              <span className="ob-how-n" aria-hidden="true">{s.n}</span>
              <p className="ob-eyebrow muted">{s.eyebrow}</p>
              <h3 className="ob-h3">{s.title}</h3>
              <p className="ob-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
