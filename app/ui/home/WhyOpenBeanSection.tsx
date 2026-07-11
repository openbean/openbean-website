// Why OpenBean: exactly four benefits, one sentence each. Stated once —
// this page used to make the same claims three separate times.

const BENEFITS = [
  {
    title: "Knowledge stays with the company",
    body: "What your team learns is kept — even when people move on.",
  },
  {
    title: "Only trusted information is remembered",
    body: "A person approves what becomes company knowledge.",
  },
  {
    title: "Your data stays under your control",
    body: "OpenBean runs on your infrastructure, never on ours.",
  },
  {
    title: "One shared memory for people and AI",
    body: "Every teammate and every AI tool gets the same reliable answer.",
  },
];

export function WhyOpenBeanSection() {
  return (
    <section className="ob-section" id="why-openbean">
      <div className="ob-wrap">
        <h2 className="ob-h2 ob-center">Why OpenBean</h2>
        <div className="ob-benefit-grid">
          {BENEFITS.map((b) => (
            <article className="ob-benefit-card" key={b.title}>
              <h3 className="ob-h3">{b.title}</h3>
              <p className="ob-body">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
