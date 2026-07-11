import { IconArrowRight } from "./icons";

export function FinalCTA() {
  return (
    <section className="ob-final">
      <div className="ob-wrap ob-final-grid">
        <div>
          <h2 className="ob-h2">Stop letting valuable knowledge disappear.</h2>
          <div className="ob-final-cta">
            <a className="ob-btn ob-btn-primary ob-btn-lg" href="/contact?intent=demo">
              Request a 30-Day Evaluation
              <IconArrowRight width={17} height={17} />
            </a>
          </div>
        </div>

        <div className="ob-final-visual" role="img" aria-label="The OpenBean mark resting on a stack of secured memory layers.">
          <div className="ob-final-rings" aria-hidden="true" />
          <div className="ob-stack-layer l3" />
          <div className="ob-stack-layer l2" />
          <div className="ob-stack-layer l1" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ob-stack-mark" src="/mark-transparent.png" alt="" width={54} height={54} />
        </div>
      </div>
    </section>
  );
}
