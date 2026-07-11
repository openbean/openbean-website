// How it works: three steps, one sentence each. The numbers are real
// sequence — a memory passes through them in order.

const STEPS = [
  {
    n: "01",
    title: "Remember",
    body: "OpenBean notices important work and proposes what should be kept.",
  },
  {
    n: "02",
    title: "Review",
    body: "Your team decides what is accurate and trusted.",
  },
  {
    n: "03",
    title: "Use",
    body: "People and AI get the right answer, whenever they ask.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="ob-section" id="how-it-works">
      <div className="ob-wrap">
        <h2 className="ob-h2 ob-center">How it works</h2>
        <ol className="ob-how-grid">
          {STEPS.map((s) => (
            <li className="ob-how-card" key={s.n}>
              <span className="ob-how-n" aria-hidden="true">{s.n}</span>
              <h3 className="ob-h3">{s.title}</h3>
              <p className="ob-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
