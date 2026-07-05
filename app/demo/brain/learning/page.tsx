// The V15 Enterprise Demo — "What are our AI tools learning?" view. The
// AI proposal activity, grouped by tool, with the activity stats for each.

import Link from "next/link";
import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { KNOWLEDGE, CONNECTIONS } from "@/app/demo/data/northwind";

export const metadata = {
  title: "What are our AI tools learning? — Company Brain on OpenBean",
  description:
    "The AI tool activity at Northwind. What each tool has proposed, what each tool has recalled, which tool is the most active, which tool is the most trusted.",
  alternates: { canonical: "https://openbean.xyz/demo/brain/learning" },
  robots: { index: true, follow: true },
};

export default function DemoBrainLearningPage() {
  const aiProposals = KNOWLEDGE.filter((k) => k.author?.startsWith("ai:"));
  const aiRecalls = KNOWLEDGE.filter((k) => k.category === "ai_recall");

  return (
    <>
      <DemoBar active="brain" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The Company Brain</p>
              <h1>What are our AI tools learning?</h1>
              <p className="lede">
                {aiProposals.length} AI proposals and {aiRecalls.length} AI
                recalls across 5 active AI tools. The numbers below are the
                rolling 90-day totals.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>AI tool activity</h2>
            <div className="ob-connections">
              {CONNECTIONS.map((c) => {
                const toolProposals = aiProposals.filter((k) => k.author === c.identity);
                const toolRecalls = aiRecalls.filter((k) => k.author === c.identity);
                return (
                  <div className="ob-connection" key={c.id}>
                    <p className="name">{c.name}</p>
                    <p className="identity">{c.identity}</p>
                    <p style={{ fontSize: "0.9rem", color: "var(--ob-muted)", margin: "0 0 14px" }}>
                      Last activity {c.lastActivity}
                    </p>
                    <div className="ob-connection-stats" style={{ flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                      <span><strong>{c.proposed}</strong> proposed all-time</span>
                      <span><strong>{c.recalled}</strong> recalled all-time</span>
                      <span><strong>{toolProposals.length}</strong> proposed in the seeded knowledge</span>
                      <span><strong>{toolRecalls.length}</strong> recalled in the seeded knowledge</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>What this means</h2>
            <p className="lede">
              The AI tools are not separate memories. They share one
              Company Brain. When Claude proposes a pricing change and
              Copilot later recalls the change, both tools see the same
              fact. When the change is approved or retracted, every tool
              updates. The company&apos;s knowledge is one log, not five.
            </p>
          </section>

          <section className="ob-demo-section">
            <p className="lede">
              <Link href="/demo/brain" className="ob-btn">← Back to the Company Brain</Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
