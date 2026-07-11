// Product proof: one real screenshot, two lines, one door into the live
// demo. The hero already animates the lifecycle; this section shows the
// actual product doing the middle step.

export function ProofSection() {
  return (
    <section className="ob-section" id="proof">
      <div className="ob-wrap">
        <div className="ob-proof-grid">
          <div className="ob-proof-copy">
            <h2 className="ob-h2">Watch knowledge earn trust.</h2>
            <p className="ob-lead">
              This is the review queue. Your team approves what becomes
              company knowledge — everything else stays a proposal.
            </p>
            <div className="ob-proof-cta">
              <a className="ob-btn ob-btn-primary ob-btn-lg" href="/demo/tour">
                Explore the live demo
              </a>
              <p className="ob-proof-note">
                A full seeded company, in your browser. No sign-up.
              </p>
            </div>
          </div>
          <div className="ob-proof-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screenshots/review.png"
              alt="The OpenBean review queue: proposed knowledge waiting for a person's approval, with the proposer, reasoning, and history visible."
              width={1200}
              height={750}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
