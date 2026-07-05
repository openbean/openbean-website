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
      aria-label="Diagram: documents, conversations, decisions, policies, projects, and knowledge flow into OpenBean, the trusted memory layer, which then feeds AI agents, AI assistants, search, work apps, databases, and custom tools. A status bar below reads verified, governed, always up to date."
    >
      <div className="ob-diagram-row">
        <div className="ob-diagram-col sources">
          <span className="ob-diagram-col-label">Business sources</span>
          <div className="ob-pill-row">
            {SOURCES.map(({ label, icon: Icon }) => (
              <span className="ob-pill" key={label}>
                <Icon width={16} height={16} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="ob-diagram-center">
          <div className="ob-mark-wrap">
            <div className="ob-mark-glow" />
            <div className="ob-mark-ring r3" />
            <div className="ob-mark-ring r2" />
            <div className="ob-mark-ring r1" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ob-mark-img" src="/mark-transparent.png" alt="" width={60} height={60} />
          </div>
          <p className="ob-mark-caption">
            <b>OpenBean</b>
            <span>Trusted memory layer</span>
          </p>
        </div>

        <div className="ob-diagram-col destinations">
          <span className="ob-diagram-col-label">Where memory is used</span>
          <div className="ob-pill-row">
            {DESTINATIONS.map(({ label, icon: Icon }) => (
              <span className="ob-pill" key={label}>
                <Icon width={16} height={16} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="ob-diagram-arrow" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16M6 14l6 6 6-6" /></svg>
      </div>

      <div className="ob-status-bar">
        <span className="ob-status-item"><span className="ob-status-dot" />Verified</span>
        <span className="ob-status-item"><span className="ob-status-dot" />Governed</span>
        <span className="ob-status-item"><span className="ob-status-dot" />Always up to date</span>
      </div>
    </figure>
  );
}
