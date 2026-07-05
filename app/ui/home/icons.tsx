// A small, consistent line-icon set for the enterprise landing page.
// One shared stroke style (24x24, round joins) so every icon reads as part
// of the same system rather than a grab-bag of clipart. All icons here are
// decorative — the labels next to them carry the meaning — so each is
// rendered aria-hidden.

import type { SVGProps } from "react";

function Icon({ children, ...props }: SVGProps<SVGSVGElement> & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// ── business information sources ────────────────────────────────────────
export function IconDocument(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M6.5 3h8l3 3v14.5h-11z" />
      <path d="M14.5 3v3h3" />
      <path d="M9 12h6M9 15h6M9 18h4" />
    </Icon>
  );
}

export function IconConversation(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4.5 4.5V16H6.5A2.5 2.5 0 0 1 4 13.5z" />
    </Icon>
  );
}

export function IconDecision(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M8.5 12.2l2.2 2.3 4.8-5.3" />
    </Icon>
  );
}

export function IconPolicy(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3.2 5.5 5.8v5.6c0 5 3 7.9 6.5 9 3.5-1.1 6.5-4 6.5-9V5.8z" />
      <path d="M9 12.1l2 2 4-4.6" />
    </Icon>
  );
}

export function IconProject(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3.5 7.2A2 2 0 0 1 5.5 5.2h3.7l1.8 2h7.5a2 2 0 0 1 2 2v7.6a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2z" />
    </Icon>
  );
}

export function IconKnowledge(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M9.2 18h5.6M10 20.5h4" />
      <path d="M12 3.2a5.8 5.8 0 0 0-3.3 10.5c.5.4.9 1.1 1 1.8h4.6c.1-.7.5-1.4 1-1.8A5.8 5.8 0 0 0 12 3.2z" />
    </Icon>
  );
}

// ── where memory is used ────────────────────────────────────────────────
export function IconAgent(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="5" y="8" width="14" height="9.5" rx="2" />
      <path d="M12 8V4.3" />
      <circle cx="12" cy="3.4" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12.7" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.7" r="1.05" fill="currentColor" stroke="none" />
      <path d="M9 15.6h6" />
    </Icon>
  );
}

export function IconAssistant(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3.4v3.8M12 16.8v3.8M4.2 12h3.8M16 12h3.8" />
      <path d="M6.9 6.9l2.5 2.5M14.6 14.6l2.5 2.5M17.1 6.9l-2.5 2.5M9.4 14.6l-2.5 2.5" />
    </Icon>
  );
}

export function IconSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="10.4" cy="10.4" r="6" />
      <path d="M14.9 14.9 20 20" />
    </Icon>
  );
}

export function IconWorkApp(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3.4" y="3.4" width="7.2" height="7.2" rx="1.3" />
      <rect x="13.4" y="3.4" width="7.2" height="7.2" rx="1.3" />
      <rect x="3.4" y="13.4" width="7.2" height="7.2" rx="1.3" />
      <rect x="13.4" y="13.4" width="7.2" height="7.2" rx="1.3" />
    </Icon>
  );
}

export function IconDatabase(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <ellipse cx="12" cy="6.2" rx="7" ry="2.6" />
      <path d="M5 6.2v5.8c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6.2" />
      <path d="M5 12v5.8c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V12" />
    </Icon>
  );
}

export function IconTool(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M14.8 6.2a4 4 0 0 0-5.4 5.4L4 17l3 3 5.4-5.4a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.6-.6-.6-2.6z" />
    </Icon>
  );
}

// ── industries ───────────────────────────────────────────────────────────
export function IconFinance(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4.5 20V13.2M9.7 20V9M14.8 20V5M20 20v-9.2" />
      <path d="M3 20h18" />
    </Icon>
  );
}

export function IconLegal(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3v3M12 6l-6.2 3M12 6l6.2 3" />
      <path d="M3.8 9l2 5.3a2.5 2.5 0 0 0 4.8 0L8.6 9M15.4 9l2 5.3a2.5 2.5 0 0 0 4.8 0L20.2 9" />
      <path d="M12 18v2.6M8.4 20.6h7.2" />
    </Icon>
  );
}

export function IconHealthcare(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.3" />
      <path d="M12 8.2v7.6M8.2 12h7.6" />
    </Icon>
  );
}

export function IconManufacturing(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.6v2.2M12 18.2v2.2M20.4 12h-2.2M5.8 12H3.6M17.6 6.4l-1.6 1.6M7.9 16.1l-1.6 1.6M17.6 17.7l-1.6-1.6M7.9 7.9 6.3 6.3" />
    </Icon>
  );
}

export function IconGovernment(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3 3.6 7.6h16.8z" />
      <path d="M5.2 7.6V19M9.4 7.6V19M14.6 7.6V19M18.8 7.6V19" />
      <path d="M3 21h18" />
    </Icon>
  );
}

export function IconEducation(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 4 3.2 8.4 12 12.8l8.8-4.4z" />
      <path d="M7 10.6v4.2c0 1.3 2.2 2.4 5 2.4s5-1.1 5-2.4v-4.2" />
      <path d="M20.4 8.4v5.2" />
    </Icon>
  );
}

// ── why openbean / trust ─────────────────────────────────────────────────
export function IconShieldCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3.2 5.5 5.8v5.6c0 5 3 7.9 6.5 9 3.5-1.1 6.5-4 6.5-9V5.8z" />
      <path d="M9 12.1l2 2 4-4.6" />
    </Icon>
  );
}

export function IconHumanAI(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="7.6" cy="7.6" r="2.5" />
      <path d="M3.2 18.8c0-2.7 2-4.4 4.4-4.4s4.4 1.7 4.4 4.4" />
      <rect x="14.6" y="6" width="5.8" height="5.8" rx="1.3" />
      <path d="M14.8 18.8c0-2.3 1.5-3.8 2.8-3.8s2.8 1.5 2.8 3.8" />
    </Icon>
  );
}

export function IconConnect(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="6" cy="6.2" r="2.1" />
      <circle cx="18" cy="6.2" r="2.1" />
      <circle cx="12" cy="18" r="2.1" />
      <path d="M7.6 7.5 10.3 16.1M16.4 7.5 13.7 16.1M8.1 6.2h7.8" />
    </Icon>
  );
}

export function IconLock(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="5.3" y="10.4" width="13.4" height="9.4" rx="1.7" />
      <path d="M8 10.4V7.6a4 4 0 0 1 8 0v2.8" />
    </Icon>
  );
}

export function IconRefresh(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4.5 12a7.5 7.5 0 0 1 12.7-5.4L19 8" />
      <path d="M19.5 12a7.5 7.5 0 0 1-12.7 5.4L5 16" />
      <path d="M19 4.6V8h-3.4M5 19.4V16h3.4" />
    </Icon>
  );
}

export function IconGoverned(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="6" y="4.6" width="12" height="16" rx="1.7" />
      <path d="M9 4.6V3h6v1.6" />
      <path d="M9 12.4l2 2 4-4.6" />
    </Icon>
  );
}

export function IconServer(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="4.6" y="4" width="14.8" height="6" rx="1.4" />
      <rect x="4.6" y="14" width="14.8" height="6" rx="1.4" />
      <circle cx="7.8" cy="7" r=".7" fill="currentColor" stroke="none" />
      <circle cx="7.8" cy="17" r=".7" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconSeal(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="9.6" r="6.3" />
      <path d="M8.9 9.8l2.2 2.1 4-4.4" />
      <path d="M9.1 15.2 7.6 20.6l4.4-2.3 4.4 2.3-1.5-5.4" />
    </Icon>
  );
}

export function IconEnterpriseBuilding(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M5 20.6V6.2l7-3 7 3v14.4" />
      <path d="M9.2 20.6v-4.8h5.6v4.8" />
      <path d="M9.2 10h.01M9.2 13.4h.01M14.8 10h.01M14.8 13.4h.01" />
    </Icon>
  );
}

// ── chrome: buttons, nav, dividers ──────────────────────────────────────
export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 12h16M13.5 5.5 20 12l-6.5 6.5" />
    </Icon>
  );
}

export function IconPlay(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.2 8.7v6.6l5.6-3.3z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props} strokeWidth={1.8}>
      <path d="M5.5 8.5 12 15l6.5-6.5" />
    </Icon>
  );
}

