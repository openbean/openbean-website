import { IconShieldCheck, IconHumanAI, IconConnect, IconLock, IconRefresh, IconGoverned } from "./icons";

const CARDS = [
  {
    icon: IconShieldCheck,
    title: "Verified by design",
    body: "Every memory is linked to a source. Every claim is traceable.",
  },
  {
    icon: IconHumanAI,
    title: "Human + AI together",
    body: "AI helps. People decide. You stay in control.",
  },
  {
    icon: IconConnect,
    title: "Connects to your world",
    body: "Works with your tools, systems, and workflows. No rip and replace.",
  },
  {
    icon: IconLock,
    title: "Private. Secure. Yours.",
    body: "Deploy on your own infrastructure. We never see your data.",
  },
  {
    icon: IconRefresh,
    title: "Always up to date",
    body: "Information stays fresh so your team always works with the truth.",
  },
  {
    icon: IconGoverned,
    title: "Governed and compliant",
    body: "Access, audit trails, and policies that fit your needs.",
  },
];

export function WhyOpenBeanGrid() {
  return (
    <section className="ob-section" id="why-openbean">
      <div className="ob-wrap">
        <p className="ob-eyebrow">Why OpenBean</p>
        <h2 className="ob-h2">Built for the way modern organizations work</h2>
        <div className="ob-why-grid">
          {CARDS.map(({ icon: Icon, title, body }) => (
            <div className="ob-why-card" key={title}>
              <span className="ob-why-icon"><Icon width={22} height={22} /></span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
