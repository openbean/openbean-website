import { MemoryFlowDiagram } from "./MemoryFlowDiagram";
import { IconArrowRight, IconPlay, IconServer, IconSeal, IconEnterpriseBuilding } from "./icons";

const REQUEST_DEMO = "/contact?intent=demo";

const TRUST_ITEMS = [
  { icon: IconServer, title: "Your data stays yours", body: "Deploy on-prem, in your private cloud, or on our managed hosting." },
  { icon: IconSeal, title: "Trusted & verified", body: "Every memory has a source. Every claim can be checked." },
  { icon: IconEnterpriseBuilding, title: "Built for enterprise", body: "Security, compliance, and control at every layer." },
];

export function HeroSection() {
  return (
    <header className="ob-hero">
      <div className="ob-wrap ob-hero-grid">
        <div className="ob-hero-copy">
          <p className="ob-eyebrow">AI memory for modern organizations</p>
          <h1 className="ob-h1">
            The memory layer your business<br />
            <span className="ob-accent">can trust.</span>
          </h1>
          <p className="ob-lead">
            OpenBean is a trusted memory layer for your business. It captures, organizes,
            and verifies important information so your AI agents, tools, and teams always
            work with the right context.
          </p>
          <div className="ob-hero-cta">
            <a className="ob-btn ob-btn-primary ob-btn-lg" href={REQUEST_DEMO}>
              Request a Demo
              <IconArrowRight width={17} height={17} />
            </a>
            <a className="ob-btn ob-btn-lg" href="#solutions">
              See How It Works
              <IconPlay width={17} height={17} />
            </a>
          </div>

          <div className="ob-hero-trust">
            {TRUST_ITEMS.map(({ icon: Icon, title, body }) => (
              <div className="ob-hero-trust-item" key={title}>
                <Icon width={19} height={19} />
                <div>
                  <b>{title}</b>
                  <span>{body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <MemoryFlowDiagram />
      </div>
    </header>
  );
}
