"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "./icons";

interface NavItem {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
}

const LINKS: NavItem[] = [
  {
    label: "Solutions",
    href: "#solutions",
    children: [
      { label: "AI agent memory", href: "/#why-openbean" },
      { label: "Work app integration", href: "/#solutions" },
      { label: "Enterprise search", href: "/#why-openbean" },
      { label: "Team knowledge", href: "/#solutions" },
    ],
  },
  { label: "Why OpenBean", href: "#why-openbean" },
  {
    label: "Resources",
    href: "/faq",
    children: [
      { label: "FAQ", href: "/faq" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Evaluation program", href: "/evaluation-program" },
    ],
  },
  { label: "Services", href: "/services" },
  {
    label: "Company",
    href: "/case-studies",
    children: [
      { label: "Contact", href: "/contact" },
      { label: "Talk to an expert", href: "/contact?intent=expert" },
      { label: "Request a demo", href: "/contact?intent=demo" },
    ],
  },
];

const REQUEST_DEMO = "/contact?intent=demo";
const TALK_TO_EXPERT = "/contact?intent=expert";

export function EnterpriseNav() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onDocEvent(e: MouseEvent | KeyboardEvent) {
      if (e instanceof KeyboardEvent && e.key === "Escape") {
        setDropdown(null);
        return;
      }
      if (e instanceof MouseEvent && navRef.current && !navRef.current.contains(e.target as Node)) {
        setDropdown(null);
      }
    }
    document.addEventListener("mousedown", onDocEvent);
    document.addEventListener("keydown", onDocEvent);
    return () => {
      document.removeEventListener("mousedown", onDocEvent);
      document.removeEventListener("keydown", onDocEvent);
    };
  }, []);

  return (
    <header className="ob-nav" ref={navRef}>
      <div className="ob-wrap ob-nav-inner">
        <a className="ob-nav-brand" href="/" aria-label="OpenBean home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark-transparent.png" alt="" width={32} height={32} />
          <span>OpenBean</span>
        </a>

        <nav className="ob-nav-links" aria-label="Primary">
          {LINKS.map((item) =>
            item.children ? (
              <div className="ob-nav-item" key={item.label}>
                <button
                  type="button"
                  className="ob-nav-item-trigger"
                  aria-expanded={dropdown === item.label}
                  aria-haspopup="true"
                  onClick={() => setDropdown((d) => (d === item.label ? null : item.label))}
                >
                  {item.label}
                  <IconChevronDown width={13} height={13} />
                </button>
                <div className="ob-nav-dropdown" data-open={dropdown === item.label} role="menu">
                  {item.children.map((c) => (
                    <a href={c.href} key={c.label} role="menuitem" onClick={() => setDropdown(null)}>{c.label}</a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href}>{item.label}</a>
            )
          )}
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
        {LINKS.map((item) => (
          <a key={item.label} href={item.href ?? item.children?.[0]?.href ?? "#"} onClick={() => setOpen(false)}>{item.label}</a>
        ))}
        <div className="ob-nav-mobile-cta">
          <a className="ob-btn" href={REQUEST_DEMO} onClick={() => setOpen(false)}>Request Demo</a>
          <a className="ob-btn ob-btn-primary" href={TALK_TO_EXPERT} onClick={() => setOpen(false)}>Talk to an Expert</a>
        </div>
      </div>
    </header>
  );
}
