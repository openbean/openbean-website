import { MemoryLifecycle } from "./MemoryLifecycle";
import { IconArrowRight, IconPlay } from "./icons";

const REQUEST_EVALUATION = "/contact?intent=demo";
const WATCH_DEMO = "/demo/tour";

export function HeroSection() {
  return (
    <header className="ob-hero">
      <div className="ob-wrap ob-hero-grid">
        <div className="ob-hero-copy">
          <p className="ob-hero-flag">Self-hosted &middot; Private alpha</p>
          <h1 className="ob-h1 ob-hero-h1">
            Your company never loses
            <br />
            <span className="ob-accent">what it knows.</span>
          </h1>
          <p className="ob-lead ob-hero-lead">
            OpenBean turns important decisions, conversations, and everyday
            work into trusted knowledge your team and AI can use.
          </p>
          <div className="ob-hero-cta">
            <a className="ob-btn ob-btn-primary ob-btn-lg" href={REQUEST_EVALUATION}>
              Request a 30-Day Evaluation
              <IconArrowRight width={17} height={17} />
            </a>
            <a className="ob-btn ob-btn-lg" href={WATCH_DEMO}>
              Watch it work
              <IconPlay width={17} height={17} />
            </a>
          </div>
          <p className="ob-hero-note">
            Runs in your environment. Your data never lives on ours.
          </p>
        </div>

        <MemoryLifecycle />
      </div>
    </header>
  );
}
