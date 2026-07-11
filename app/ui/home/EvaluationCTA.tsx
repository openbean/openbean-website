// The evaluation band. Honest terms: guided, 30 days, full
// functionality, and expiry never deletes anything.

export function EvaluationCTA() {
  return (
    <section className="ob-eval" id="evaluation">
      <div className="ob-wrap ob-eval-inner">
        <h2 className="ob-h2">See what your company already knows.</h2>
        <p className="ob-lead">
          Start a guided 30-day evaluation and turn real work into trusted
          company knowledge. Full functionality, on your infrastructure.
        </p>
        <p className="ob-eval-fineprint">
          If an evaluation lapses, everything stays readable and exportable.
          Nothing is ever deleted.
        </p>
        <div className="ob-eval-cta">
          <a className="ob-btn ob-btn-primary ob-btn-lg" href="/contact?intent=demo">
            Request Evaluation
          </a>
          <a className="ob-btn ob-btn-lg" href="/download">
            Download OpenBean
          </a>
        </div>
      </div>
    </section>
  );
}
