// The V15 Enterprise Demo — Company Brain hub. The 6 named views a CEO
// would ask. Each is a question the company can answer from its
// Company Brain.

import Link from "next/link";
import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";

export const metadata = {
  title: "The Company Brain — Northwind on OpenBean",
  description:
    "The Company Brain is Northwind's single, governed system of record for company knowledge. 6 questions a CEO would ask. Every answer has a chain of custody.",
  alternates: { canonical: "https://openbean.xyz/demo/brain" },
  robots: { index: true, follow: true },
};

const BRAIN_VIEWS = [
  {
    id: "know",
    question: "What does my company know?",
    body: "The full knowledge base — policies, procedures, decisions, history — filtered by department and project. ~200 pieces of trusted knowledge at your fingertips.",
    href: "/demo/brain/know",
  },
  {
    id: "changes",
    question: "What changed?",
    body: "The 30-day activity stream. Who proposed what. Who approved what. Who retracted what. Every change has a name and a date.",
    href: "/demo/brain/changes",
  },
  {
    id: "approvals",
    question: "Who approved it?",
    body: "The approval queue. ~30 pending decisions, 12 approved this month, 1 retracted. Every approval is itself a record in the log.",
    href: "/demo/brain/approvals",
  },
  {
    id: "learning",
    question: "What are our AI tools learning?",
    body: "What the AI tools have proposed. What the AI tools have recalled. Which tool is the most active. Which tool is the most trusted.",
    href: "/demo/brain/learning",
  },
  {
    id: "decisions",
    question: "What decisions have we made?",
    body: "The executive decisions. The approved changes. The rejected proposals. The full picture of how the company has changed in the last 12 months.",
    href: "/demo/brain/decisions",
  },
  {
    id: "recall",
    question: "What does AI remember?",
    body: "Ask the AI a question. See what it recalls, with full provenance. Six real recalls from the last 30 days.",
    href: "/demo/brain/recall",
  },
];

export default function DemoBrainHubPage() {
  return (
    <>
      <DemoBar active="brain" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The Company Brain</p>
              <h1>6 questions a CEO would ask.</h1>
              <p className="lede">
                The Company Brain is Northwind&apos;s single, governed system
                of record for the knowledge the company has agreed is true.
                Every answer has a chain of custody: which AI proposed it,
                which person approved it, and when. Every change is
                reversible. Every audit is permanent.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Pick a question</h2>
            <p className="lede">Each link is a real view into the seeded data. Read-only.</p>
            <div className="ob-brain-grid">
              {BRAIN_VIEWS.map((v) => (
                <Link href={v.href} className="ob-brain-card" key={v.id}>
                  <p className="question">{v.question}</p>
                  <p className="body">{v.body}</p>
                  <p className="arrow">Open the view →</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
