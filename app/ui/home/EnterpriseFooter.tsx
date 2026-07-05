const COLUMNS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Solutions",
    links: [
      { label: "AI agent memory", href: "/#why-openbean" },
      { label: "Work app integration", href: "/#solutions" },
      { label: "Enterprise search", href: "/#why-openbean" },
      { label: "Team knowledge", href: "/#solutions" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Evaluation program", href: "/evaluation-program" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Talk to an expert", href: "/contact?intent=expert" },
      { label: "Request a demo", href: "/contact?intent=demo" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Architecture review", href: "/services#architecture-review" },
      { label: "Deployment support", href: "/services#deployment-support" },
      { label: "Migration guidance", href: "/services#migration-guidance" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export function EnterpriseFooter() {
  return (
    <footer className="ob-footer">
      <div className="ob-wrap">
        <div className="ob-footer-top">
          <div className="ob-footer-brand">
            <a className="ob-nav-brand" href="/" aria-label="OpenBean home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mark-transparent.png" alt="" width={28} height={28} />
              <span>OpenBean</span>
            </a>
            <p className="ob-footer-tagline">The trusted memory layer for your business.</p>
          </div>

          {COLUMNS.map((col) => (
            <div className="ob-footer-col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ob-footer-bottom">
          <span>© {new Date().getFullYear()} OpenBean</span>
          <span>Verified. Governed. Always up to date.</span>
        </div>
      </div>
    </footer>
  );
}
