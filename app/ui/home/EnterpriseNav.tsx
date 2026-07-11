"use client";

// Simplified navigation: six flat links, one primary CTA, no dropdowns.
// (The V14 nav had five dropdown groups; the simplification epic's rule
// is that a visitor should never have to open a menu to find the door.)

import { useState } from "react";

const LINKS: Array<{ label: string; href: string }> = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Demo", href: "/demo" },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Download", href: "/download" },
];

const REQUEST_EVALUATION = "/contact?intent=demo";

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
          {LINKS.map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="ob-nav-cta">
          <a className="ob-btn ob-btn-primary ob-btn-sm ob-nav-cta-primary" href={REQUEST_EVALUATION}>
            Request Evaluation
          </a>
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
        {LINKS.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
        ))}
        <div className="ob-nav-mobile-cta">
          <a className="ob-btn ob-btn-primary" href={REQUEST_EVALUATION} onClick={() => setOpen(false)}>
            Request Evaluation
          </a>
        </div>
      </div>
    </header>
  );
}
