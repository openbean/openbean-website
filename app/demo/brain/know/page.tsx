// The V15 Enterprise Demo — "What does my company know?" view. The full
// knowledge base, filtered by department and category.

import Link from "next/link";
import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { KNOWLEDGE, type KnowledgeCategory } from "@/app/demo/data/northwind";

export const metadata = {
  title: "What does my company know? — Company Brain on OpenBean",
  description:
    "The full Company Brain of Northwind Manufacturing. Every policy, every procedure, every decision, every piece of trusted knowledge. Filter by department and category.",
  alternates: { canonical: "https://openbean.xyz/demo/brain/know" },
  robots: { index: true, follow: true },
};

const CATEGORIES: { id: KnowledgeCategory; label: string }[] = [
  { id: "policy", label: "Policies" },
  { id: "procedure", label: "Procedures" },
  { id: "decision", label: "Decisions" },
  { id: "approved_change", label: "Approved changes" },
  { id: "rejected_proposal", label: "Rejected proposals" },
  { id: "historical", label: "Historical" },
  { id: "ai_proposal", label: "AI proposals" },
  { id: "ai_recall", label: "AI recalls" },
  { id: "manager_review", label: "Manager reviews" },
  { id: "correction", label: "Corrections" },
  { id: "conflict", label: "Conflicts (resolved)" },
  { id: "merge_history", label: "Merge history" },
  { id: "audit", label: "Audit records" },
];

export default function DemoBrainKnowPage() {
  const sorted = [...KNOWLEDGE].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
  const countsByCat: Record<string, number> = {};
  for (const k of sorted) {
    countsByCat[k.category] = (countsByCat[k.category] ?? 0) + 1;
  }

  return (
    <>
      <DemoBar active="brain" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The Company Brain</p>
              <h1>What does my company know?</h1>
              <p className="lede">
                {sorted.length} pieces of trusted knowledge. {countsByCat["policy"] ?? 0} policies,
                {" "}{countsByCat["procedure"] ?? 0} procedures,
                {" "}{countsByCat["decision"] ?? 0} decisions,
                {" "}{countsByCat["approved_change"] ?? 0} approved changes,
                {" "}{countsByCat["ai_proposal"] ?? 0} AI proposals awaiting review,
                {" "}{countsByCat["historical"] ?? 0} historical records.
                The most recent changes are at the top.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Browse by category</h2>
            <p className="lede">
              The Company Brain has 13 categories of knowledge. Each piece
              is a single fact, decision, or procedure — the smallest unit
              of meaning that the company can recall and reuse.
            </p>
            <div className="ob-brain-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {CATEGORIES.map((c) => (
                <a href={`#${c.id}`} className="ob-brain-card" key={c.id} style={{ padding: 16 }}>
                  <p className="question" style={{ fontSize: "0.96rem" }}>{c.label}</p>
                  <p className="body" style={{ fontSize: "0.86rem" }}>{countsByCat[c.id] ?? 0} pieces</p>
                </a>
              ))}
            </div>
          </section>

          {CATEGORIES.map((c) => {
            const items = sorted.filter((k) => k.category === c.id);
            if (items.length === 0) return null;
            return (
              <section className="ob-demo-section" id={c.id} key={c.id}>
                <h2>{c.label} ({items.length})</h2>
                <div>
                  {items.map((k) => (
                    <div className="ob-kn" key={k.id}>
                      <div className="ob-kn-head">
                        <span className="ob-kn-tag" data-cat={k.category}>{c.label}</span>
                        <span className="ob-kn-meta">
                          <span><strong>{k.department}</strong></span>
                          <span>{k.createdAt}</span>
                          {k.approver ? <span>Approved by <strong>{k.approver}</strong></span> : null}
                          {k.trust > 0 ? (
                            <span className="ob-kn-trust">
                              Trust
                              <span className="ob-kn-trust-bar"><span className="ob-kn-trust-bar-fill" style={{ width: `${k.trust * 100}%` }} /></span>
                              {(k.trust * 100).toFixed(0)}
                            </span>
                          ) : null}
                        </span>
                      </div>
                      <h3>{k.title}</h3>
                      <p>{k.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

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
