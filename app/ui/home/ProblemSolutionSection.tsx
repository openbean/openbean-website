import type { CSSProperties } from "react";
import { IconConversation, IconDocument, IconDatabase, IconTool, IconKnowledge, IconProject } from "./icons";

const CHAOS_ITEMS: Array<{ label: string; icon: typeof IconDocument; style: CSSProperties }> = [
  { label: "Chats", icon: IconConversation, style: { top: "10%", left: "6%", transform: "rotate(-6deg)" } },
  { label: "Files", icon: IconDocument, style: { top: "58%", left: "2%", transform: "rotate(4deg)" } },
  { label: "Wikis", icon: IconKnowledge, style: { top: "18%", left: "38%", transform: "rotate(3deg)" } },
  { label: "Databases", icon: IconDatabase, style: { top: "62%", left: "40%", transform: "rotate(-4deg)" } },
  { label: "Tools", icon: IconTool, style: { top: "8%", left: "72%", transform: "rotate(5deg)" } },
  { label: "Projects", icon: IconProject, style: { top: "56%", left: "76%", transform: "rotate(-3deg)" } },
];

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
      <div className="ob-wrap ob-ps-grid">
        <div>
          <p className="ob-eyebrow muted">The problem</p>
          <h2 className="ob-h2">Important information is everywhere.</h2>
          <p className="ob-lead">
            Scattered across chats, files, emails, tools, and systems. Hard to find. Easy to
            lose. Impossible to trust.
          </p>
          <div className="ob-chaos" role="img" aria-label="Illustration of business information scattered across disconnected chats, files, wikis, databases, tools, and projects.">
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
          <h2 className="ob-h2">One trusted memory for everything.</h2>
          <p className="ob-lead">
            OpenBean brings it all together, verifies what matters, and delivers the right
            context to the right people and tools.
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
          </div>
        </div>
      </div>
    </section>
  );
}
