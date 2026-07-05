import { IconArrowRight } from "./icons";

const REQUEST_DEMO = "/contact?intent=demo";
const ADVISOR = "/contact?intent=advisor";

export function FinalCTA() {
  return (
    <section className="ob-final">
      <div className="ob-wrap ob-final-grid">
        <div>
          <p className="ob-eyebrow">Ready to see it in action?</p>
          <h2 className="ob-h2">See how OpenBean can work for your organization.</h2>
          <p className="ob-lead">Request an enterprise demo, or talk to an AI advisor first.</p>
          <div className="ob-final-cta">
            <a className="ob-btn ob-btn-primary ob-btn-lg" href={REQUEST_DEMO}>
              Request an Enterprise Demo
              <IconArrowRight width={17} height={17} />
            </a>
            <a className="ob-btn ob-btn-lg" href={ADVISOR}>Talk to an AI Advisor</a>
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

      <div className="ob-closing">
        <p>OpenBean is built for organizations that care about accuracy, security, and control.</p>
        <p className="ob-accent">Your memory. Your rules. Your advantage.</p>
      </div>
    </section>
  );
}
