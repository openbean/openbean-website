// The V15 Enterprise Demo — "What changed?" view. The 30-day activity
// stream, sorted by most recent.

import Link from "next/link";
import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { ACTIVITY, PEOPLE, KNOWLEDGE } from "@/app/demo/data/northwind";

export const metadata = {
  title: "What changed? — Company Brain on OpenBean",
  description:
    "The 30-day activity stream at Northwind. Every proposal, every approval, every recall, every correction. Real names, real dates, real AI tools.",
  alternates: { canonical: "https://openbean.xyz/demo/brain/changes" },
  robots: { index: true, follow: true },
};

const TYPE_LABEL: Record<string, string> = {
  proposed: "Proposed",
  approved: "Approved",
  retracted: "Retracted",
  recalled: "Recalled",
  corrected: "Corrected",
  merged: "Merged",
  connected: "Connected",
  invited: "Invited",
};

export default function DemoBrainChangesPage() {
  const sorted = [...ACTIVITY].sort((a, b) => (a.at < b.at ? 1 : -1));

  return (
    <>
      <DemoBar active="brain" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The Company Brain</p>
              <h1>What changed?</h1>
              <p className="lede">
                {sorted.length} entries in the last 30 days. Every change
                is a record: who proposed, who approved, who retracted. The
                most recent changes are at the top.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>30-day activity</h2>
            <div className="ob-activity">
              {sorted.map((a) => {
                const kn = a.knowledge ? KNOWLEDGE.find((k) => k.id === a.knowledge) : null;
                const personName = a.person?.startsWith("ai:")
                  ? a.person.replace("ai:", "")
                  : PEOPLE.find((p) => p.id === a.person)?.name ?? a.person;
                return (
                  <div className="ob-activity-row" key={a.id}>
                    <span className="ob-activity-when">{a.at}</span>
                    <div>
                      <p className="ob-activity-summary">{a.summary}</p>
                      <p style={{ margin: "4px 0 0", color: "var(--ob-muted)", fontSize: "0.86rem" }}>
                        by <strong style={{ color: "var(--ob-ink)" }}>{personName}</strong>
                        {kn ? <> · <Link href="/demo/brain/know" style={{ color: "var(--ob-trust)" }}>{kn.title}</Link></> : null}
                      </p>
                    </div>
                    <span className="ob-activity-type" data-type={a.type}>{TYPE_LABEL[a.type] ?? a.type}</span>
                  </div>
                );
              })}
            </div>
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
