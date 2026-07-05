// The V15 Enterprise Demo — 7 named scenarios. Each is a short narrative
// of a real business situation where the Company Brain made a difference.

import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";

export const metadata = {
  title: "Scenarios — Northwind on OpenBean",
  description:
    "7 real business scenarios at Northwind: new hire onboarding, sales policy, IT password, customer refund, executive decision, HR handbook, legal policy. Each one is a story, not a feature list.",
  alternates: { canonical: "https://openbean.xyz/demo/scenarios" },
  robots: { index: true, follow: true },
};

const SCENARIOS = [
  {
    n: "1",
    role: "Operations Manager",
    title: "New employee onboarding",
    body:
      "A new sales rep joins Northwind. On day one, she signs in to the Company Brain and the dashboard shows her what the company has already agreed is true: the discount policy, the parental leave policy, the expense policy, the QBR cadence, the customer onboarding procedure. She does not have to ask anyone. The knowledge was approved by Margaret Chen, Lena Kowalski, Reggie Williams, Anders Lindqvist, and Bartosz Lewandowski — all of it preserved, all of it auditable.",
  },
  {
    n: "2",
    role: "Sales Director",
    title: "Sales policy changes",
    body:
      "The VP of Sales updates the discount policy from 5% to a 5/10/15% tiered structure. Every AI tool sees the change the moment it&apos;s approved. The next time an AE asks the AI about pricing, the answer is the new policy. The previous policy (the 5% standard, approved 2024-08-12) is preserved in the merge history — the company remembers what it considered and what it chose.",
  },
  {
    n: "3",
    role: "IT Manager",
    title: "IT password policy",
    body:
      "IT updates the password requirements: 14 characters minimum, MFA on every system, no periodic rotation. Every employee sees the update. The next password reset uses the new policy. The change was approved after the IT security review by Roberto Silva and is now the trusted knowledge for every AI tool. The previous policy (the 90-day rotation, the 8-character minimum) is preserved in the history.",
  },
  {
    n: "4",
    role: "Customer Success Manager",
    title: "Customer refund process",
    body:
      "A customer requests a $4,200 refund — above the auto-approve limit ($500) and below the VP threshold ($5,000). The CSM uses the AI to draft a review-queue item, citing the customer&apos;s history, the 5-year relationship, and the prior $1,800 refund from 2024. The VP of Sales reviews and approves. The refund is issued, the audit log shows the chain of custody, and the customer&apos;s account is updated.",
  },
  {
    n: "5",
    role: "CEO",
    title: "Executive decision",
    body:
      "The CEO decides to expand into the Southeast (TN, KY, GA). The decision is entered as a piece of trusted knowledge: 3-state territory, $1.2M investment over 12 months, $4M ARR target by end of FY27. Every AI tool, in every department, sees the new direction. The next time anyone asks the AI about the company&apos;s growth plan, the answer includes the Southeast expansion. The investment plan and the 3 inbound distributor requests are part of the chain of custody.",
  },
  {
    n: "6",
    role: "HR Manager",
    title: "HR handbook update",
    body:
      "HR updates the parental leave policy from 8 weeks (birthing parents) and 4 weeks (non-birthing parents) to 16 weeks for all caregivers. Every employee sees the update. The next time anyone asks the AI about leave, the answer is the new policy. The previous policy is preserved in the history; the company remembers what it considered and what it chose. The change was approved by Margaret Chen, drafted by Lena Kowalski, and communicated to all employees on 2026-01-03.",
  },
  {
    n: "7",
    role: "Legal & Compliance",
    title: "Legal policy update",
    body:
      "Legal updates the data retention policy: 7 years for financial records (per IRS requirements), 3 years for operational records. The change was approved by Priya Ramaswamy ahead of the ISO 9001 audit. Every employee sees the update. The compliance team&apos;s audit log shows the change with the full chain of custody: who proposed, who approved, when, and why.",
  },
];

export default function DemoScenariosPage() {
  return (
    <>
      <DemoBar active="scenarios" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">7 scenarios</p>
              <h1>The Company Brain, in 7 real stories.</h1>
              <p className="lede">
                Every scenario is a real business situation where a single,
                governed memory made a difference. The story is the proof;
                the technology is in the background.
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>The scenarios</h2>
            <div className="ob-scenarios">
              {SCENARIOS.map((s) => (
                <div className="ob-scenario-card" key={s.n}>
                  <p className="num">SCENARIO {s.n}</p>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <p className="role">From the perspective of: {s.role}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
