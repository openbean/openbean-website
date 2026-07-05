import { IconServer, IconSeal, IconEnterpriseBuilding } from "./icons";

const ITEMS = [
  {
    icon: IconServer,
    title: "Your data stays yours",
    body: "Deploy on-prem or in your private cloud.",
  },
  {
    icon: IconSeal,
    title: "Trusted and verified",
    body: "Every memory has a source. Every claim can be checked.",
  },
  {
    icon: IconEnterpriseBuilding,
    title: "Built for enterprise",
    body: "Security, compliance, and control at every layer.",
  },
];

export function TrustStrip() {
  return (
    <section className="ob-trust" aria-label="Enterprise trust points">
      <div className="ob-wrap ob-trust-grid">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <div className="ob-trust-item" key={title}>
            <span className="ob-trust-icon"><Icon width={22} height={22} /></span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
