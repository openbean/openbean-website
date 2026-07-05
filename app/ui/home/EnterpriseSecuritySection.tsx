// V14: Enterprise Security section. The one-sentence summary + three control points.

const PILLARS = [
  {
    eyebrow: "Data",
    title: "You control the database",
    body: "The knowledge store is a database you provision, with credentials only your team holds. OpenBean writes through a per-deployment system credential you rotate.",
  },
  {
    eyebrow: "Infra",
    title: "You control the infrastructure",
    body: "The application runs on infrastructure you choose: a cloud server, your own data center, or fully air-gapped. Nothing in the design is tied to a specific cloud vendor.",
  },
  {
    eyebrow: "Audit",
    title: "You control the audit log",
    body: "The history of every piece of company knowledge is kept forever, by a database rule that cannot be bypassed. Every change has a chain of custody: which AI proposed it, which person approved it, and when.",
  },
];

const REQUEST_DEMO = "/contact?intent=demo";

export function EnterpriseSecuritySection() {
  return (
    <section className="ob-section" id="enterprise-security">
      <div className="ob-wrap">
        <p className="ob-eyebrow" style={{ justifyContent: "center", display: "flex" }}>Enterprise security</p>
        <h2 className="ob-h2 ob-center">The one-sentence summary.</h2>
        <p className="ob-lead ob-center" style={{ maxWidth: "62ch", margin: "18px auto 0" }}>
          OpenBean runs on your infrastructure, with your database, your credentials, and
          your audit log. There is no OpenBean cloud account that holds a copy of your
          company’s knowledge. The full security model is on the{" "}
          <a href="/security">security page</a>.
        </p>
        <div className="ob-sec-grid">
          {PILLARS.map((p) => (
            <article className="ob-sec-card" key={p.title}>
              <p className="ob-eyebrow muted">{p.eyebrow}</p>
              <h3 className="ob-h3">{p.title}</h3>
              <p className="ob-body">{p.body}</p>
            </article>
          ))}
        </div>
        <div className="ob-cta-row ob-center" style={{ marginTop: "32px" }}>
          <a className="ob-btn ob-btn-primary ob-btn-lg" href={REQUEST_DEMO}>
            Request an Enterprise Demo
          </a>
          <a className="ob-btn ob-btn-lg" href="/security">Read the security model</a>
        </div>
      </div>
    </section>
  );
}
