// The V15 Enterprise Demo — Activity page. The 30-day activity stream at
// Northwind, in a single view.

import Link from "next/link";
import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { ACTIVITY, PEOPLE, KNOWLEDGE } from "@/app/demo/data/northwind";

export const metadata = {
  title: "Activity — Northwind on OpenBean",
  description:
    "The 30-day activity stream at Northwind. Every change is a record. Every record has a name, a date, and a reason.",
  alternates: { canonical: "https://openbean.xyz/demo/activity" },
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

export default function DemoActivityPage() {
  const sorted = [...ACTIVITY].sort((a, b) => (a.at < b.at ? 1 : -1));
  return (
    <>
      <DemoBar active="activity" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The activity stream</p>
              <h1>What happened in the last 30 days.</h1>
              <p className="lede">
                {sorted.length} entries. Every change is a record: who
                proposed, who approved, who retracted. The most recent
                changes are at the top.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Recent activity</h2>
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
        </div>
      </main>
    </>
  );
}
