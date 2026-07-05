import type { CSSProperties } from "react";
import { IconConversation, IconDocument, IconDatabase, IconTool, IconKnowledge, IconProject, IconArrowRight, IconLock } from "./icons";

const CHAOS_ITEMS: Array<{ label: string; icon: typeof IconDocument; style: CSSProperties }> = [
  { label: "Chats", icon: IconConversation, style: { top: "10%", left: "6%", transform: "rotate(-6deg)" } },
  { label: "Files", icon: IconDocument, style: { top: "58%", left: "2%", transform: "rotate(4deg)" } },
  { label: "Wikis", icon: IconKnowledge, style: { top: "18%", left: "38%", transform: "rotate(3deg)" } },
  { label: "Databases", icon: IconDatabase, style: { top: "62%", left: "40%", transform: "rotate(-4deg)" } },
  { label: "Tools", icon: IconTool, style: { top: "8%", left: "72%", transform: "rotate(5deg)" } },
  { label: "Projects", icon: IconProject, style: { top: "56%", left: "76%", transform: "rotate(-3deg)" } },
];

function ChaosThreads() {
  return (
    <svg className="ob-chaos-threads" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
      <path d="M40 30 C120 90, 180 40, 260 100 S 340 50, 380 90" />
      <path d="M30 130 C100 70, 160 150, 240 90 S 330 140, 370 110" />
      <path d="M60 40 C140 130, 220 60, 300 140" />
      <path d="M20 90 C90 40, 200 170, 340 60" />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ob-flow-arrow">
      <path d="M12 4v14M6 12l6 6 6-6" />
    </svg>
  );
}

export function ProblemSolutionSection() {
  return (
    <section className="ob-section" id="solutions">
      <div className="ob-wrap">
        <div className="ob-ps-card">
          <div className="ob-ps-grid">
            <div>
              <p className="ob-eyebrow muted">The problem</p>
              <h2 className="ob-h2">Important information is everywhere.</h2>
              <p className="ob-lead">
                Scattered across chats, files, emails, tools, and systems. Hard to find. Easy
                to lose. Impossible to trust.
              </p>
              <div className="ob-chaos" role="img" aria-label="Illustration of business information scattered across disconnected chats, files, wikis, databases, tools, and projects.">
                <ChaosThreads />
                {CHAOS_ITEMS.map(({ label, icon: Icon, style }) => (
                  <span className="ob-chaos-item" style={style} key={label}>
                    <Icon width={15} height={15} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="ob-eyebrow">The solution</p>
              <h2 className="ob-h2">
                One trusted memory<br /><span className="ob-accent">for everything.</span>
              </h2>
              <p className="ob-lead">
                OpenBean brings it all together, verifies what matters, and delivers the
                right context to the right people and tools&mdash;instantly.
              </p>
              <div className="ob-flow" role="img" aria-label="Diagram: capture, organize, verify, and keep updated flow into OpenBean, which delivers context to AI agents, AI tools, work apps, and your teams.">
                <div className="ob-flow-row">
                  <span className="ob-flow-pill">Capture</span>
                  <span className="ob-flow-pill">Organize</span>
                  <span className="ob-flow-pill">Verify</span>
                  <span className="ob-flow-pill">Keep Updated</span>
                </div>
                <DownArrow />
                <div className="ob-flow-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/mark-transparent.png" alt="" width={28} height={28} />
                </div>
                <DownArrow />
                <div className="ob-flow-row">
                  <span className="ob-flow-pill">AI Agents</span>
                  <span className="ob-flow-pill">AI Tools</span>
                  <span className="ob-flow-pill">Work Apps</span>
                  <span className="ob-flow-pill">Your Teams</span>
                </div>
                <span className="ob-flow-note"><IconLock width={14} height={14} />You own the data</span>
              </div>
            </div>
          </div>

          <div className="ob-ps-divider" aria-hidden="true">
            <span className="ob-ps-divider-arrow"><IconArrowRight width={18} height={18} /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
