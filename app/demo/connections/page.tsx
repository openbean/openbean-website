// The V15 Enterprise Demo — AI tool connections view. The 5 active AI
// tools Northwind is using, with the activity stats for each.

import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { CONNECTIONS } from "@/app/demo/data/northwind";

export const metadata = {
  title: "The AI Tools — Northwind on OpenBean",
  description:
    "The 5 AI tools Northwind uses: Claude, Codex, Copilot, Gemini, and an internal automation bot. Every tool reads from and writes to the same Company Brain.",
  alternates: { canonical: "https://openbean.xyz/demo/connections" },
  robots: { index: true, follow: true },
};

export default function DemoConnectionsPage() {
  return (
    <>
      <DemoBar active="connections" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The AI tools</p>
              <h1>5 AI tools. 1 Company Brain.</h1>
              <p className="lede">
                Every AI tool Northwind uses — Claude for engineering, Codex
                for code review, Copilot for the office, Gemini for customer
                service, and an internal automation bot for operations —
                reads from and writes to the same Company Brain. Every
                proposal, every recall, every approval is logged.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Active connections</h2>
            <p className="lede">
              Each tool has its own identity, its own permissions, and its
              own activity stream. The numbers below are the rolling 90-day
              totals.
            </p>
            <div className="ob-connections">
              {CONNECTIONS.map((c) => (
                <div className="ob-connection" key={c.id}>
                  <p className="name">{c.name}</p>
                  <p className="identity">{c.identity}</p>
                  <p style={{ fontSize: "0.9rem", color: "var(--ob-muted)", margin: "0 0 14px" }}>
                    Connected {c.connectedAt} · last activity {c.lastActivity}
                  </p>
                  <div className="ob-connection-stats">
                    <span><strong>{c.proposed}</strong> pieces proposed</span>
                    <span><strong>{c.recalled}</strong> pieces recalled</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>What this means</h2>
            <p className="lede">
              When an AI tool proposes a change to the company&apos;s
              knowledge, every other AI tool sees the change the moment
              it&apos;s approved. When an AI tool recalls a piece of
              knowledge, the recall is logged. When a tool is disconnected,
              its access is revoked instantly on the very next request.
              That&apos;s the value of one Company Brain with five tools,
              not five separate memories.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
