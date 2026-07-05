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
    body: "Self-host on your own infrastructure, or use our managed hosting — either way, you own the data and set the policy.",
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
        <p className="ob-eyebrow" style={{ justifyContent: "center", display: "flex" }}>Why OpenBean</p>
        <h2 className="ob-h2 ob-center">
          Built for the way <span className="ob-accent">modern organizations</span> work
        </h2>
        <p className="ob-lead ob-center" style={{ maxWidth: 720, marginTop: -4, marginBottom: 8 }}>
          Trust in OpenBean isn&rsquo;t about taking AI&rsquo;s word for it — it&rsquo;s about
          giving your organization complete control over its own knowledge. Every memory is
          verifiable, governed by your administrators, and traceable through a full audit
          trail. Self-host and you own that data end to end; choose our managed hosting
          instead and the same governance and ownership stay with you — the only thing that
          changes is who runs the infrastructure. Either way, trust rests on the same
          foundation: transparency, governance, ownership, and an unbroken record of what&rsquo;s
          true.
        </p>
        <div className="ob-why-grid">
          {CARDS.map(({ icon: Icon, title, body }) => (
            <div className="ob-why-card" key={title}>
              <span className="ob-why-icon"><Icon width={24} height={24} /></span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
