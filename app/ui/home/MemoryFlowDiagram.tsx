import {
  IconDocument,
  IconConversation,
  IconDecision,
  IconPolicy,
  IconProject,
  IconKnowledge,
  IconAgent,
  IconAssistant,
  IconSearch,
  IconWorkApp,
  IconDatabase,
  IconTool,
  IconShieldCheck,
} from "./icons";

const SOURCES = [
  { label: "Documents", icon: IconDocument },
  { label: "Conversations", icon: IconConversation },
  { label: "Decisions", icon: IconDecision },
  { label: "Policies", icon: IconPolicy },
  { label: "Projects", icon: IconProject },
  { label: "Knowledge", icon: IconKnowledge },
];

const DESTINATIONS = [
  { label: "AI Agents", icon: IconAgent },
  { label: "AI Assistants", icon: IconAssistant },
  { label: "Search", icon: IconSearch },
  { label: "Work Apps", icon: IconWorkApp },
  { label: "Databases", icon: IconDatabase },
  { label: "Custom Tools", icon: IconTool },
];

export function MemoryFlowDiagram() {
  return (
    <figure
      className="ob-diagram"
      role="img"
      aria-label="Diagram: documents, conversations, decisions, policies, projects, and knowledge flow into OpenBean, the trusted memory layer, which then feeds AI agents, AI assistants, search, work apps, databases, and custom tools. A status card below reads verified, governed, always up to date."
    >
      <div className="ob-diagram-mesh" aria-hidden="true" />
      <div className="ob-diagram-row">
        <div className="ob-diagram-col sources">
          <span className="ob-diagram-col-label">Your business information</span>
          <div className="ob-pill-row">
            {SOURCES.map(({ label, icon: Icon }) => (
              <span className="ob-pill" key={label}>
                <span className="ob-pill-icon"><Icon width={15} height={15} /></span>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="ob-diagram-center">
          <div className="ob-mark-wrap">
            <div className="ob-mark-glow" />
            <div className="ob-mark-ring r1" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ob-mark-img" src="/mark-transparent.png" alt="" width={48} height={48} />
          </div>
          <div className="ob-status-card">
            <span className="ob-status-card-icon"><IconShieldCheck width={18} height={18} /></span>
            <p>Verified. Governed.<br />Always up to date.</p>
          </div>
        </div>

        <div className="ob-diagram-col destinations">
          <span className="ob-diagram-col-label">Used across your tools</span>
          <div className="ob-pill-row">
            {DESTINATIONS.map(({ label, icon: Icon }) => (
              <span className="ob-pill" key={label}>
                <span className="ob-pill-icon"><Icon width={15} height={15} /></span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="ob-diagram-arrow" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16M6 14l6 6 6-6" /></svg>
      </div>
    </figure>
  );
}
