// The homepage's signature element: one memory earning trust, on a loop.
//
// A product-shaped card plays the whole story in ~14 seconds:
//   1. a line from real work is captured
//   2. it is HELD for review (yellow — awaiting a person's judgment)
//   3. a person approves it (green — trusted)
//   4. an AI answers a question from it, citing the trusted memory
//
// CSS-only (no JS), keyframes live in enterprise-v17.css. With
// prefers-reduced-motion the loop is disabled and the card shows the
// final, trusted state — the story still reads top to bottom.

export function MemoryLifecycle() {
  return (
    <figure
      className="ob-life"
      role="img"
      aria-label="A memory earning trust in OpenBean: a sentence from a team meeting is captured, held for a person's review, approved as trusted knowledge, and then used by an AI to answer a teammate's question."
    >
      <div className="ob-life-card">
        <div className="ob-life-head">
          <span className="ob-life-dot" aria-hidden="true" />
          Company memory
        </div>

        <div className="ob-life-capture ob-life-s1">
          <p className="ob-life-quote">
            &ldquo;Every new enterprise deal includes a 14-day pilot before the
            contract.&rdquo;
          </p>
          <p className="ob-life-meta">Captured from Tuesday&rsquo;s sales meeting</p>
        </div>

        <div className="ob-life-status">
          <span className="ob-life-chip pending ob-life-s2">
            Held for review &mdash; pricing needs a person&rsquo;s sign-off
          </span>
          <span className="ob-life-chip trusted ob-life-s3">
            Approved by Dana &middot; Trusted memory
          </span>
        </div>

        <div className="ob-life-recall ob-life-s4">
          <p className="ob-life-q">
            <span>Q</span> What&rsquo;s our pilot policy for new enterprise deals?
          </p>
          <p className="ob-life-a">
            <span>AI</span> A 14-day pilot comes before every new enterprise
            contract. <em>From a trusted memory, approved by Dana.</em>
          </p>
        </div>
      </div>
      <figcaption className="ob-life-caption">
        Captured &rarr; reviewed &rarr; trusted &rarr; answered. That&rsquo;s the whole product.
      </figcaption>
    </figure>
  );
}
