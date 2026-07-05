// The V15 Enterprise Demo — "What does AI remember?" view. The recall
// view. Pick a question, see what the AI recalls, with full provenance.

"use client";

import { useState } from "react";
import Link from "next/link";
import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { CONNECTIONS } from "@/app/demo/data/northwind";

const SUGGESTED_QUESTIONS: { q: string; a: { tool: string; toolName: string; body: string; source: string; daysAgo: number } }[] = [
  {
    q: "What is our parental leave policy?",
    a: {
      tool: "ai:copilot-m365-1",
      toolName: "Copilot",
      body:
        "Northwind offers 16 weeks of paid parental leave for all caregivers, effective 2026-01-01. The previous policy (8 weeks for birthing parents, 4 weeks for non-birthing parents) was retired.",
      source: "Parental leave: 16 weeks paid, all caregivers (approved by Margaret Chen, 2025-11-22)",
      daysAgo: 15,
    },
  },
  {
    q: "What is our standard discount?",
    a: {
      tool: "ai:copilot-m365-1",
      toolName: "Copilot",
      body:
        "The standard discount is 5%. Discounts up to 10% require VP of Sales approval. Discounts above 10% require CEO approval. The 10% threshold was raised from 8% on 2026-05-14 to match industry benchmarks.",
      source: "Discount policy: 5% standard, 10% VP approval, 15% CEO approval (approved by Margaret Chen, 2026-05-14)",
      daysAgo: 8,
    },
  },
  {
    q: "How long does the help desk take to respond?",
    a: {
      tool: "ai:claude-code-2",
      toolName: "Claude",
      body:
        "The IT help desk first-response time is 4 hours (median, all priorities). P1 (blocking work) is fixed within 4 hours. P2 (degraded work) within 1 business day. P3 (no impact) within 5 business days. The figure was corrected from the previously reported 2-hour figure, which was the P1-only median.",
      source: "How to request IT support (approved by Zara Patel); Correction: the help desk first-response time is 4 hours, not 2",
      daysAgo: 22,
    },
  },
  {
    q: "What is the FY25 revenue?",
    a: {
      tool: "ai:claude-code-2",
      toolName: "Claude",
      body:
        "The FY25 revenue is $42M, not $44M (the figure originally cited in the 2025 annual report). The $44M figure included $2M of year-end orders that were not shipped until 2026-01. The corrected $42M figure uses the cash-receipt basis.",
      source: "Correction: the FY25 revenue is $42M, not $44M (filed 2026-02-10 by Priya Ramaswamy)",
      daysAgo: 3,
    },
  },
  {
    q: "What is the line-2 uptime?",
    a: {
      tool: "ai:northwind-bot-1",
      toolName: "Internal Automation",
      body:
        "Line 2 uptime is 98.4% for the last 30 days (2026-06-05 to 2026-07-04). The figure includes 4 quality-hold days but excludes planned maintenance.",
      source: "MES uptime log, recalled from the operational knowledge record",
      daysAgo: 1,
    },
  },
  {
    q: "What is our position on AI tool use?",
    a: {
      tool: "ai:claude-code-2",
      toolName: "Claude",
      body:
        "Employees may use only AI tools approved by IT (currently: Claude, Codex, Copilot, Gemini, and the internal automation bot). Customer data (names, PII, contract terms) may not be entered into AI prompts without redaction. The policy was issued 2026-02-01 and updated 2026-05-20 to add Gemini.",
      source: "AI tool use: only approved tools, no customer data in prompts (approved by Margaret Chen, 2026-05-20)",
      daysAgo: 18,
    },
  },
];

export default function DemoBrainRecallPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof SUGGESTED_QUESTIONS[number]["a"] | null>(null);
  const [resultFor, setResultFor] = useState<string>("");

  function ask(q: string, a: (typeof SUGGESTED_QUESTIONS)[number]["a"]) {
    setQuery(q);
    setResult(a);
    setResultFor(q);
  }

  return (
    <>
      <DemoBar active="brain" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The Company Brain</p>
              <h1>What does AI remember?</h1>
              <p className="lede">
                Ask the AI a question about Northwind. Pick one of the
                suggested questions, or type your own. The AI recalls from
                the Company Brain, with full provenance.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Ask a question</h2>
            <div className="ob-ask">
              <form
                className="ob-ask-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const m = SUGGESTED_QUESTIONS.find((s) => s.q.toLowerCase() === query.trim().toLowerCase());
                  if (m) {
                    setResult(m.a);
                    setResultFor(m.q);
                  } else {
                    setResult({
                      tool: "ai:claude-code-2",
                      toolName: "Claude",
                      body:
                        "I do not have a specific answer to that question in the seeded data. The Northwind seed is a sample — it covers the most common questions a CEO would ask. Try one of the suggested questions below, or browse the full Company Brain.",
                      source: "The seeded Company Brain, full coverage",
                      daysAgo: 0,
                    });
                    setResultFor(query);
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="Ask the AI a question…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Ask the AI a question"
                />
                <button type="submit" className="ob-btn ob-btn-primary">Ask</button>
              </form>
              {result ? (
                <div className="ob-ask-answer">
                  <p className="attribution">Answered by {result.toolName} · {resultFor}</p>
                  <p className="body">{result.body}</p>
                  <p className="source">Source: {result.source}{result.daysAgo > 0 ? ` · recalled ${result.daysAgo} day${result.daysAgo === 1 ? "" : "s"} ago` : ""}</p>
                </div>
              ) : null}
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Try one of these</h2>
            <p className="lede">Each suggested question is a real recall from the seeded data, with full provenance.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              {SUGGESTED_QUESTIONS.map((s) => (
                <li key={s.q}>
                  <button
                    type="button"
                    className="ob-btn"
                    onClick={() => ask(s.q, s.a)}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {s.q}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="ob-demo-section">
            <h2>The 5 AI tools behind the answers</h2>
            <p className="lede">
              Every answer above came from one of the 5 active AI tools. The
              tool&apos;s name, identity, and activity are listed below.
            </p>
            <div className="ob-connections" style={{ marginTop: 16 }}>
              {CONNECTIONS.map((c) => (
                <div className="ob-connection" key={c.id}>
                  <p className="name">{c.name}</p>
                  <p className="identity">{c.identity}</p>
                  <div className="ob-connection-stats" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                    <span><strong>{c.proposed}</strong> proposed</span>
                    <span><strong>{c.recalled}</strong> recalled</span>
                  </div>
                </div>
              ))}
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
