// The V15 Enterprise Demo — Guided tour standalone page. The tour is also
// available as an overlay in the DemoBar; this page is the canonical
// version that a visitor can bookmark and return to.

import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";

export const metadata = {
  title: "The guided tour — Northwind on OpenBean",
  description:
    "A 6-step, 3-minute tour of how Northwind uses the Company Brain. An employee asks, the AI recalls, the AI proposes, a manager reviews, the knowledge becomes trusted, another employee benefits.",
  alternates: { canonical: "https://openbean.xyz/demo/tour" },
  robots: { index: true, follow: true },
};

const STEPS = [
  {
    n: 1,
    title: "An employee asks the AI a question.",
    body:
      "A new sales rep signs in to the Company Brain and asks: 'what's our parental leave policy?' The question is simple. The answer matters.",
  },
  {
    n: 2,
    title: "The AI recalls trusted company knowledge.",
    body:
      "The AI searches the Company Brain for the most relevant piece of trusted knowledge. The answer is the '16 weeks for all caregivers' policy, approved by Margaret Chen on 2025-11-22. The full chain of custody is shown: who proposed it, who approved it, when.",
  },
  {
    n: 3,
    title: "The AI proposes something new.",
    body:
      "The AI also flags a related proposal: 'add a veteran hiring preference to the recruiting policy.' The proposal is from the HR AI (Copilot), submitted 2 weeks ago, and is awaiting Lena Kowalski's review. The rep sees both the trusted answer and the new proposal in one view.",
  },
  {
    n: 4,
    title: "A manager reviews the proposal.",
    body:
      "Lena reviews the proposal in the approval queue. She sees the AI's reasoning, the proposed change, and the trust score. She can approve, retract, or send back for more analysis. Every decision is itself a record in the log.",
  },
  {
    n: 5,
    title: "The new knowledge becomes trusted.",
    body:
      "When Lena approves, the proposal becomes trusted. Every other AI tool, in every other department, sees the new policy. The next time anyone asks the AI about hiring, the answer includes the veteran preference.",
  },
  {
    n: 6,
    title: "Another employee benefits.",
    body:
      "Six months later, a new engineering hire asks: 'do we have a parental leave policy?' The answer is the same trusted policy. The audit log shows when it was proposed, when it was approved, who approved it, and who has recalled it since. The company never lost important knowledge again.",
  },
];

export default function DemoTourPage() {
  return (
    <>
      <DemoBar active="tour" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The guided tour</p>
              <h1>6 steps. 3 minutes. The whole story.</h1>
              <p className="lede">
                A first-time visitor should never feel lost. The tour is a
                single, linear narrative that walks a visitor through
                the whole flow. Press the &ldquo;Start the tour&rdquo;
                button in the top bar to see the overlay version, or
                scroll through the steps below.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>The 6 steps</h2>
            <ol style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "grid", gap: 16 }}>
              {STEPS.map((s) => (
                <li key={s.n} style={{
                  background: "var(--ob-surface)",
                  border: "1px solid var(--ob-line)",
                  borderRadius: 14,
                  padding: 24,
                }}>
                  <p style={{ fontFamily: "var(--nf-mono, ui-monospace), monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ob-trust)", margin: "0 0 6px" }}>
                    Step {s.n} of {STEPS.length}
                  </p>
                  <h3 style={{ fontFamily: "var(--nf-display, inherit), ui-sans-serif, sans-serif", fontSize: "1.18rem", fontWeight: 600, margin: "0 0 10px", color: "var(--ob-ink)" }}>
                    {s.title}
                  </h3>
                  <p style={{ color: "var(--ob-muted)", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
    </>
  );
}
