import { MemoryFlowDiagram } from "./MemoryFlowDiagram";

const REQUEST_DEMO = "/contact?intent=demo";

export function HeroSection() {
  return (
    <header className="ob-hero">
      <div className="ob-wrap">
        <div className="ob-hero-top">
          <p className="ob-eyebrow">Trusted memory layer</p>
          <h1 className="ob-h1">The memory layer your business can trust.</h1>
          <p className="ob-lead">
            OpenBean captures, organizes, and verifies important business knowledge so your
            AI agents, tools, and teams always work with the right context.
          </p>
          <div className="ob-hero-cta">
            <a className="ob-btn ob-btn-primary ob-btn-lg" href={REQUEST_DEMO}>Request a Demo</a>
            <a className="ob-btn ob-btn-lg" href="#solutions">See How It Works</a>
          </div>
        </div>

        <MemoryFlowDiagram />
      </div>
    </header>
  );
}
