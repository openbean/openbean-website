// The V15 Enterprise Demo — "What decisions have we made?" view. The
// executive decisions, the approved changes, and the rejected proposals.
// The full picture of how the company has changed in the last 12 months.

import Link from "next/link";
import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { KNOWLEDGE, PEOPLE } from "@/app/demo/data/northwind";

export const metadata = {
  title: "What decisions have we made? — Company Brain on OpenBean",
  description:
    "The executive decisions, the approved changes, and the rejected proposals at Northwind. The full picture of how the company has changed in the last 12 months.",
  alternates: { canonical: "https://openbean.xyz/demo/brain/decisions" },
  robots: { index: true, follow: true },
};

export default function DemoBrainDecisionsPage() {
  const decisions = KNOWLEDGE.filter((k) => k.category === "decision").sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
  const approved = KNOWLEDGE.filter((k) => k.category === "approved_change").sort((a, b) =>
    (a.approvedAt ?? "") < (b.approvedAt ?? "") ? 1 : -1
  );
  const rejected = KNOWLEDGE.filter((k) => k.category === "rejected_proposal").sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  return (
    <>
      <DemoBar active="brain" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The Company Brain</p>
              <h1>What decisions have we made?</h1>
              <p className="lede">
                {decisions.length} executive decisions, {approved.length}{" "}
                approved changes, and {rejected.length} rejected proposals.
                The most recent are at the top. Every decision has a name,
                a date, and a reason.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Executive decisions ({decisions.length})</h2>
            <div>
              {decisions.map((k) => {
                const approver = PEOPLE.find((p) => p.id === k.approver);
                return (
                  <div className="ob-kn" key={k.id}>
                    <div className="ob-kn-head">
                      <span className="ob-kn-tag" data-cat="decision">Decision</span>
                      <span className="ob-kn-meta">
                        <span><strong>{k.department}</strong></span>
                        <span>{k.createdAt}</span>
                        {approver ? <span>by <strong>{approver.name}</strong></span> : null}
                      </span>
                    </div>
                    <h3>{k.title}</h3>
                    <p>{k.body}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Approved changes ({approved.length})</h2>
            <div>
              {approved.map((k) => {
                const approver = PEOPLE.find((p) => p.id === k.approver);
                return (
                  <div className="ob-kn" key={k.id}>
                    <div className="ob-kn-head">
                      <span className="ob-kn-tag" data-cat="approved_change">Approved</span>
                      <span className="ob-kn-meta">
                        <span><strong>{k.department}</strong></span>
                        <span>Approved {k.approvedAt}</span>
                        {approver ? <span>by <strong>{approver.name}</strong></span> : null}
                      </span>
                    </div>
                    <h3>{k.title}</h3>
                    <p>{k.body}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Rejected proposals ({rejected.length})</h2>
            <p className="lede">
              Rejected proposals are not deleted — they are preserved in
              the log. The reason for the rejection is itself a record.
              This is how the company remembers what it considered and
              what it chose not to do.
            </p>
            <div>
              {rejected.map((k) => {
                const approver = PEOPLE.find((p) => p.id === k.approver);
                return (
                  <div className="ob-kn" key={k.id}>
                    <div className="ob-kn-head">
                      <span className="ob-kn-tag" data-cat="rejected_proposal">Rejected</span>
                      <span className="ob-kn-meta">
                        <span><strong>{k.department}</strong></span>
                        <span>{k.createdAt}</span>
                        {approver ? <span>by <strong>{approver.name}</strong></span> : null}
                      </span>
                    </div>
                    <h3>{k.title}</h3>
                    <p>{k.body}</p>
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
