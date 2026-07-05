// V14: Deployment Options. Six deployment paths, your choice.

const OPTIONS = [
  { name: "Cloud server (VPS)", body: "A single cloud server with the application and the database, deployed in under an hour. The recommended starting point for most companies." },
  { name: "Managed Postgres + Vercel", body: "A hosted Postgres service plus a serverless web application. The lowest-operations path, suitable for teams that do not want to run a server." },
  { name: "Self-managed Postgres", body: "Your existing Postgres database, on infrastructure you already operate. OpenBean runs as a single application process." },
  { name: "Dedicated server", body: "A dedicated physical or virtual server in your environment, with the database and the application on the same host." },
  { name: "On-premise / air-gapped", body: "A fully on-premise deployment with no external network dependencies. Suitable for regulated industries and defense-adjacent environments." },
  { name: "Local development", body: "A laptop deployment for evaluation and development. The same software that runs in production, configured for a single engineer." },
];

export function DeploymentOptionsSection() {
  return (
    <section className="ob-section" id="deployment">
      <div className="ob-wrap">
        <p className="ob-eyebrow" style={{ justifyContent: "center", display: "flex" }}>Deployment options</p>
        <h2 className="ob-h2 ob-center">One product, six deployment paths, your choice.</h2>
        <p className="ob-lead ob-center" style={{ maxWidth: "62ch", margin: "18px auto 0" }}>
          OpenBean is designed to be run by your own engineers. The full deployment guides
          cover every path, from a laptop to a fully air-gapped data center.
        </p>
        <div className="ob-deploy-grid">
          {OPTIONS.map((o) => (
            <article className="ob-deploy-card" key={o.name}>
              <h3 className="ob-h3">{o.name}</h3>
              <p className="ob-body">{o.body}</p>
            </article>
          ))}
        </div>
        <div className="ob-cta-row ob-center" style={{ marginTop: "32px" }}>
          <a className="ob-btn ob-btn-lg" href="/evaluation-program">See the Evaluation Program</a>
          <a className="ob-btn ob-btn-lg" href="/services">Read the deployment guides</a>
        </div>
      </div>
    </section>
  );
}
