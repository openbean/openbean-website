// Security & control, business-friendly. Four chips, two sentences,
// one link. The full model lives at /security.

const POINTS = ["Self-hosted", "Auditable", "Permission-controlled", "Backup-ready"];

export function EnterpriseSecuritySection() {
  return (
    <section className="ob-section" id="security">
      <div className="ob-wrap ob-sec-wrap">
        <h2 className="ob-h2">Your knowledge stays yours.</h2>
        <p className="ob-lead">
          OpenBean installs in your environment. Your company controls what is
          remembered, who can see it, and how it is used.
        </p>
        <ul className="ob-sec-chips">
          {POINTS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <a className="ob-sec-link" href="/security">
          Read the full security model &rarr;
        </a>
      </div>
    </section>
  );
}
