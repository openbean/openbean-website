"use client";

import { useState } from "react";

const LINKS = [
  { href: "#solutions", label: "Solutions" },
  { href: "#why-openbean", label: "Why OpenBean" },
  { href: "/faq", label: "Resources" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Company" },
];

const REQUEST_DEMO = "/contact?intent=demo";
const TALK_TO_EXPERT = "/contact?intent=expert";

export function EnterpriseNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="ob-nav">
      <div className="ob-wrap ob-nav-inner">
        <a className="ob-nav-brand" href="/" aria-label="OpenBean home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark-transparent.png" alt="" width={32} height={32} />
          <span>OpenBean</span>
        </a>

        <nav className="ob-nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="ob-nav-cta">
          <a className="ob-btn ob-btn-sm" href={REQUEST_DEMO}>Request Demo</a>
          <a className="ob-btn ob-btn-primary ob-btn-sm ob-nav-cta-primary" href={TALK_TO_EXPERT}>Talk to an Expert</a>
          <button
            type="button"
            className="ob-nav-toggle"
            aria-expanded={open}
            aria-controls="ob-nav-mobile-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            )}
          </button>
        </div>
      </div>

      <div id="ob-nav-mobile-panel" className="ob-wrap ob-nav-mobile" data-open={open}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <div className="ob-nav-mobile-cta">
          <a className="ob-btn" href={REQUEST_DEMO} onClick={() => setOpen(false)}>Request Demo</a>
          <a className="ob-btn ob-btn-primary" href={TALK_TO_EXPERT} onClick={() => setOpen(false)}>Talk to an Expert</a>
        </div>
      </div>
    </header>
  );
}
