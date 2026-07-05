import type { ReactNode } from "react";

export function TopBar({ tag, right }: { tag?: string; right?: ReactNode }) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="OpenBean home">
        <img src="/mark-transparent.png" alt="" width={34} height={34} />
        <span>OpenBean</span>
        {tag ? <small>{tag}</small> : null}
      </a>
      {right ? <div className="topbar-right">{right}</div> : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <a className="brand footer-brand" href="/" aria-label="OpenBean home">
            <img src="/mark-transparent.png" alt="" width={30} height={30} />
            <span>OpenBean</span>
          </a>
          <p>Governed AI memory infrastructure, self-hosted permanently.</p>
        </div>
        <nav aria-label="Footer">
          <a href="/services">Services</a>
          <a href="/evaluation-program">Evaluation</a>
          <a href="/faq">FAQ</a>
          <a href="/case-studies">Case studies</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
