// The V15 Enterprise Demo — "Who approved it?" view. The approval queue
// (the AI proposals awaiting review) + the recent approvals + the recent
// retractions.

import Link from "next/link";
import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { KNOWLEDGE, PEOPLE } from "@/app/demo/data/northwind";

export const metadata = {
  title: "Who approved it? — Company Brain on OpenBean",
  description:
    "The approval queue at Northwind. The AI proposals awaiting a human's review, and the recent approvals and retractions with full chain of custody.",
  alternates: { canonical: "https://openbean.xyz/demo/brain/approvals" },
  robots: { index: true, follow: true },
};

export default function DemoBrainApprovalsPage() {
  const pending = KNOWLEDGE.filter((k) => k.status === "pending_review").sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
  const approvedRecently = KNOWLEDGE.filter(
    (k) => k.status === "trusted" && k.approvedAt
  )
    .sort((a, b) => ((a.approvedAt ?? "") < (b.approvedAt ?? "") ? 1 : -1))
    .slice(0, 12);
  const retracted = KNOWLEDGE.filter((k) => k.status === "retracted");

  return (
    <>
      <DemoBar active="brain" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The Company Brain</p>
              <h1>Who approved it?</h1>
              <p className="lede">
                {pending.length} AI proposals awaiting a human&apos;s review.
                The approval queue is a tested path: the V12 work ran a
                parallel-approval test (8 of 8 checks pass) and a
                reliability test (12 of 12) against this exact page.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Awaiting review ({pending.length})</h2>
            <p className="lede">
              Every important change waits for a person&apos;s approval. The
              default already covers pricing, contracts, deployment
              targets, and customer commitments. The team tunes the rest.
            </p>
            <div>
              {pending.map((k) => (
                <div className="ob-kn" key={k.id}>
                  <div className="ob-kn-head">
                    <span className="ob-kn-tag" data-cat="ai_proposal">AI proposal</span>
                    <span className="ob-kn-meta">
                      <span><strong>{k.department}</strong></span>
                      <span>{k.createdAt}</span>
                      {k.author ? <span>by <strong>{k.author}</strong></span> : null}
                    </span>
                  </div>
                  <h3>{k.title}</h3>
                  <p>{k.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Recently approved (12 most recent)</h2>
            <div>
              {approvedRecently.map((k) => {
                const approver = PEOPLE.find((p) => p.id === k.approver);
                return (
                  <div className="ob-kn" key={k.id}>
                    <div className="ob-kn-head">
                      <span className="ob-kn-tag" data-cat={k.category}>{k.category.replace(/_/g, " ")}</span>
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

          {retracted.length > 0 ? (
            <section className="ob-demo-section">
              <h2>Retracted ({retracted.length})</h2>
              <p className="lede">
                Retracted knowledge is preserved — the retraction is itself
                a record. The current belief is computed from the log; the
                retraction is part of the history.
              </p>
              <div>
                {retracted.map((k) => (
                  <div className="ob-kn" key={k.id}>
                    <div className="ob-kn-head">
                      <span className="ob-kn-tag" data-cat="rejected_proposal">Retracted</span>
                      <span className="ob-kn-meta">
                        <span><strong>{k.department}</strong></span>
                        <span>Retracted {k.retractedAt}</span>
                      </span>
                    </div>
                    <h3>{k.title}</h3>
                    <p>{k.body}</p>
                    {k.retractedReason ? (
                      <p style={{ marginTop: 8, color: "var(--ob-muted)", fontSize: "0.86rem", fontStyle: "italic" }}>
                        Reason: {k.retractedReason}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

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
