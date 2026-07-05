// V14: Why Companies Choose OpenBean. The honest comparison in plain language.

const COMPARISONS = [
  {
    name: "vs. The AI tool’s built-in memory",
    body: "Built-in AI memory is a feature inside a vendor’s product, not infrastructure your company operates. It is not auditable as a database log, cannot be governed by your own rules, and disappears the moment your contract does. OpenBean is a system you own, with governance your team configures and your team can read.",
  },
  {
    name: "vs. A wiki or a knowledge base",
    body: "A wiki is human-authored and human-readable. The knowledge an AI tool needs to act on — pricing bands, deployment targets, the contract clause a customer signed last Tuesday — does not naturally live in a wiki. OpenBean is a knowledge system that AI tools read and write, governed the way your source code is governed, not the way a wiki page is.",
  },
  {
    name: "vs. Building it yourself",
    body: "Building a governed knowledge system from scratch is eighteen months of engineering and a permanent team to maintain it. OpenBean ships the whole system as one runnable product: the knowledge store, the approval queue, the AI connections, the audit trail, and the daily operations surface.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="ob-section" id="why-choose">
      <div className="ob-wrap">
        <p className="ob-eyebrow" style={{ justifyContent: "center", display: "flex" }}>Why companies choose OpenBean</p>
        <h2 className="ob-h2 ob-center">The honest comparison, written to be useful, not flattering.</h2>
        <p className="ob-lead ob-center" style={{ maxWidth: "62ch", margin: "18px auto 0" }}>
          The most common question a CEO or a CTO asks is “why not just use the thing we
          already pay for?” The honest answer is that the obvious alternatives solve a
          different problem.
        </p>
        <div className="ob-compare-grid">
          {COMPARISONS.map((c) => (
            <article className="ob-compare-card" key={c.name}>
              <h3 className="ob-h3">{c.name}</h3>
              <p className="ob-body">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
