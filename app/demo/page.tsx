// The V15 Enterprise Demo — the entry point. The visitor lands here and
// can either start the guided tour (the 6-step narrative in DemoBar) or
// explore the live, seeded Northwind Manufacturing company on their own.
//
// The page is the home of the demo surface. It links to every other demo
// view: the company, the people, the AI tools, the Company Brain, the
// scenarios, the activity, and the reset.

import Link from "next/link";
import "@/app/ui/demo/demo.css";
import { EnterprisePageShell } from "@/app/ui/home";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { COMPANY, SEED_STATS } from "@/app/demo/data/northwind";

export const metadata = {
  title: "Live Demo — Northwind Manufacturing on OpenBean",
  description:
    "Explore a real company on OpenBean. Northwind Manufacturing is a 60-person specialty chemicals manufacturer with 5 active AI tool connections, ~200 pieces of company knowledge, and a 30-day history. Read-only. Resettable in one click.",
  keywords: [
    "OpenBean live demo",
    "Northwind Manufacturing",
    "Company Brain demo",
    "AI knowledge management demo",
    "enterprise demo",
  ],
  openGraph: {
    title: "Live Demo — Northwind Manufacturing on OpenBean",
    description:
      "Explore a real company on OpenBean. 60 people, 5 AI tools, ~200 pieces of company knowledge. Read-only. Resettable.",
    type: "website",
    url: "https://openbean.xyz/demo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Demo — Northwind Manufacturing on OpenBean",
    description: "Explore a real company on OpenBean. Read-only. Resettable.",
  },
  alternates: { canonical: "https://openbean.xyz/demo" },
  robots: { index: true, follow: true },
};

export default function DemoHomePage() {
  return (
    <>
      <DemoBar active="home" cta={{ label: "Request a live demo", href: "/contact?intent=demo" }} />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-grid">
              <div className="ob-demo-hero-card">
                <p className="ent-eyebrow">Live demo · Northwind Manufacturing</p>
                <h1>{COMPANY.name}</h1>
                <p className="lede">
                  A real 60-person specialty chemicals company. {COMPANY.description}
                </p>
                <div className="ob-demo-quick">
                  <div className="ob-demo-quick-stat">
                    <p className="label">People</p>
                    <p className="value">{SEED_STATS.people}</p>
                  </div>
                  <div className="ob-demo-quick-stat">
                    <p className="label">Pieces of knowledge</p>
                    <p className="value">{SEED_STATS.knowledge}</p>
                  </div>
                  <div className="ob-demo-quick-stat">
                    <p className="label">AI tool connections</p>
                    <p className="value">{SEED_STATS.connections}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="ent-eyebrow">Where to start</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                  <li>
                    <Link
                      href="/demo/tour"
                      className="ob-brain-card"
                      style={{ padding: 18 }}
                    >
                      <p className="question" style={{ fontSize: "1rem" }}>Start the guided tour</p>
                      <p className="body" style={{ fontSize: "0.9rem" }}>6 steps. 3 minutes. The whole story of an AI tool helping a real company make a real decision.</p>
                      <p className="arrow">Begin →</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/demo/brain"
                      className="ob-brain-card"
                      style={{ padding: 18 }}
                    >
                      <p className="question" style={{ fontSize: "1rem" }}>Explore the Company Brain</p>
                      <p className="body" style={{ fontSize: "0.9rem" }}>6 questions a CEO would ask. Each one has a real answer in the seeded data.</p>
                      <p className="arrow">Explore →</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/demo/scenarios"
                      className="ob-brain-card"
                      style={{ padding: 18 }}
                    >
                      <p className="question" style={{ fontSize: "1rem" }}>Walk through 7 scenarios</p>
                      <p className="body" style={{ fontSize: "0.9rem" }}>New hire onboarding, sales policy, IT password, customer refund, executive decision, HR handbook, legal policy.</p>
                      <p className="arrow">Walk through →</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>What you can do here</h2>
            <p className="lede">
              The demo is a real, read-only window into a real company&apos;s
              OpenBean instance. You can browse, search, follow the audit
              history, and explore every department and every piece of
              knowledge. You cannot delete, modify, approve, or administer.
            </p>
            <ul style={{ marginTop: 18, paddingLeft: 18, color: "var(--ob-muted)", lineHeight: 1.7 }}>
              <li><strong style={{ color: "var(--ob-ink)" }}>Browse</strong> the company, the people, the AI tools, the knowledge, the activity.</li>
              <li><strong style={{ color: "var(--ob-ink)" }}>Search</strong> the Company Brain for any topic — pricing, policy, decision, procedure.</li>
              <li><strong style={{ color: "var(--ob-ink)" }}>Follow the audit history</strong> on every piece of knowledge: who proposed, who approved, who retracted.</li>
              <li><strong style={{ color: "var(--ob-ink)" }}>Ask the AI</strong> a question (in the Recall view) and see what it recalls, with provenance.</li>
              <li><strong style={{ color: "var(--ob-ink)" }}>Reset</strong> the demo to a fresh state in one click.</li>
            </ul>
            <p style={{ marginTop: 18, color: "var(--ob-muted)", fontSize: "0.9rem" }}>
              Want a live walkthrough with your data instead of Northwind&apos;s?
              <a href="/contact?intent=demo"> Request a live demo with your company&apos;s data</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
