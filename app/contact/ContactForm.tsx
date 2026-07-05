"use client";

import { useState } from "react";

// The structured intake's fields are the exact set named in
// docs/enterprise/AI_RECEPTIONIST.md §3. Each field exists because the operator
// needs the answer to do the next thing well. Adding or removing a field is a
// design change to the receptionist and must update the design doc.
//
// V9 upgrade (2026-07-04): added industry, company size, decision maker,
// existing AI tools, existing infrastructure, and a reshaped budget stage.
// The required/optional set is unchanged in shape: every newly-added field
// is required except the multi-select existing-* fields, which are optional
// to keep the form's completion friction bounded.

type Intent = "evaluating" | "researching" | "running" | "other";
type Deployment = "vercel_hosted" | "self_postgres" | "on_premise" | "unsure" | "other";
type Compliance = "soc2" | "hipaa" | "fedramp" | "gdpr" | "iso27001" | "none" | "other";
type Timeline = "active" | "1-3" | "3-6" | "exploring" | "other";
type BudgetStage = "funded_approved" | "funded_unapproved" | "pre_funding" | "personal" | "rather_not_say";
type DecisionMaker = "self" | "peer" | "manager" | "procurement" | "executive" | "unknown";
type CompanySize = "1-50" | "51-200" | "201-1000" | "1001-5000" | "5000+";
type Industry =
  | "saas"
  | "fintech"
  | "healthcare"
  | "government"
  | "education"
  | "retail"
  | "media"
  | "manufacturing"
  | "professional_services"
  | "other";
type AiTool =
  | "claude_code"
  | "cursor"
  | "hosted_agent"
  | "automation"
  | "vendor_memory"
  | "none"
  | "other";
type Infra =
  | "vercel"
  | "aws"
  | "gcp"
  | "azure"
  | "colo"
  | "k8s_onprem"
  | "none"
  | "other";

const COMPLIANCE_OPTIONS: Array<{ value: Compliance; label: string }> = [
  { value: "soc2", label: "SOC 2" },
  { value: "hipaa", label: "HIPAA" },
  { value: "fedramp", label: "FedRAMP" },
  { value: "gdpr", label: "GDPR" },
  { value: "iso27001", label: "ISO 27001" },
  { value: "none", label: "None specific right now" },
  { value: "other", label: "Other" },
];

const DEPLOYMENT_OPTIONS: Array<{ value: Deployment; label: string }> = [
  { value: "vercel_hosted", label: "Vercel + hosted Supabase" },
  { value: "self_postgres", label: "Self-managed Postgres on a VPS or VM" },
  { value: "on_premise", label: "Fully on-premise / air-gapped" },
  { value: "unsure", label: "Not sure yet" },
  { value: "other", label: "Other" },
];

const INTENT_OPTIONS: Array<{ value: Intent; label: string; help: string }> = [
  { value: "evaluating", label: "Evaluating for a real deployment", help: "A live, funded, time-bounded evaluation" },
  { value: "researching", label: "Researching, not ready yet", help: "Learning the space; no committed timeline" },
  { value: "running", label: "Already running OpenBean, want a service", help: "Existing instance; looking for help or scoping" },
  { value: "other", label: "Something else", help: "Tell us in the notes below" },
];

const TIMELINE_OPTIONS: Array<{ value: Timeline; label: string }> = [
  { value: "active", label: "Active evaluation now" },
  { value: "1-3", label: "Next 1–3 months" },
  { value: "3-6", label: "Next 3–6 months" },
  { value: "exploring", label: "Just exploring" },
  { value: "other", label: "Other" },
];

// V9: budget stage replaces the implicit "is this serious" with a single-select
// that has an explicit "rather not say" answer, so the question does not feel
// like a sales funnel.
const BUDGET_OPTIONS: Array<{ value: BudgetStage; label: string; help: string }> = [
  { value: "funded_approved", label: "Funded and approved", help: "Budget exists; the decision is whether to spend it on OpenBean" },
  { value: "funded_unapproved", label: "Funded but not yet approved", help: "An internal sponsor exists; sign-off is pending" },
  { value: "pre_funding", label: "Pre-funding, exploring", help: "No sponsor yet; this is the research phase" },
  { value: "personal", label: "Personal curiosity", help: "Reading on your own time, not on behalf of a team" },
  { value: "rather_not_say", label: "Rather not say", help: "The reply does not change based on the answer" },
];

// V9: the decision-maker question tells the operator whether the reply should
// go to engineering, the requester, a named executive, or a procurement team.
const DECISION_MAKER_OPTIONS: Array<{ value: DecisionMaker; label: string }> = [
  { value: "self", label: "I sign off myself" },
  { value: "peer", label: "A peer with authority" },
  { value: "manager", label: "My manager" },
  { value: "procurement", label: "A procurement / security team" },
  { value: "executive", label: "An executive sponsor" },
  { value: "unknown", label: "I don't know yet" },
];

// V9: company size is a banded select, not a free integer, so the requester
// is not cornered into a number the operator's reply won't actually use.
const COMPANY_SIZE_OPTIONS: Array<{ value: CompanySize; label: string }> = [
  { value: "1-50", label: "1 – 50" },
  { value: "51-200", label: "51 – 200" },
  { value: "201-1000", label: "201 – 1,000" },
  { value: "1001-5000", label: "1,001 – 5,000" },
  { value: "5000+", label: "5,000+" },
];

const INDUSTRY_OPTIONS: Array<{ value: Industry; label: string }> = [
  { value: "saas", label: "SaaS / software" },
  { value: "fintech", label: "Financial services" },
  { value: "healthcare", label: "Healthcare" },
  { value: "government", label: "Government / public sector" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail / e-commerce" },
  { value: "media", label: "Media / publishing" },
  { value: "manufacturing", label: "Manufacturing / industrial" },
  { value: "professional_services", label: "Professional services / consulting" },
  { value: "other", label: "Other" },
];

const AI_TOOL_OPTIONS: Array<{ value: AiTool; label: string }> = [
  { value: "claude_code", label: "Claude Code" },
  { value: "cursor", label: "Cursor" },
  { value: "hosted_agent", label: "A hosted agent (OpenAI / Ollama / etc.)" },
  { value: "automation", label: "Automation (GitHub Actions / n8n / etc.)" },
  { value: "vendor_memory", label: "A vendor memory product (Mem0 / Zep / etc.)" },
  { value: "none", label: "None yet" },
  { value: "other", label: "Other" },
];

const INFRA_OPTIONS: Array<{ value: Infra; label: string }> = [
  { value: "vercel", label: "Vercel" },
  { value: "aws", label: "AWS" },
  { value: "gcp", label: "Google Cloud" },
  { value: "azure", label: "Azure" },
  { value: "colo", label: "Colocation / dedicated server" },
  { value: "k8s_onprem", label: "On-prem Kubernetes" },
  { value: "none", label: "None yet" },
  { value: "other", label: "Other" },
];

// The encoded mailto body is a single human-readable block, not a CSV — the
// operator's first read of the email is the entire conversation, and the
// structured fields are simply the next thing that the operator scans.
function formatBody(state: FormState): string {
  const lines: string[] = [];
  const fmt = (k: string, v: string | number | string[] | undefined) => {
    if (v === undefined || v === "") return;
    if (Array.isArray(v) && v.length === 0) return;
    lines.push(`${k}: ${Array.isArray(v) ? v.join(", ") : v}`);
  };
  fmt("Name", state.name);
  fmt("Email", state.email);
  fmt("Organization", state.org);
  fmt("Industry", state.industry);
  fmt("Company size", state.companySize);
  fmt("Role", state.role);
  fmt("Decision maker", state.decisionMaker);
  fmt("What brings you here", state.intent);
  fmt("Where would OpenBean run", state.deployment);
  fmt("Existing AI tools", state.aiTools);
  fmt("Existing infrastructure", state.infra);
  fmt("Compliance or regulatory requirements", state.compliance);
  fmt("Expected AI tool / Connection count", state.connections);
  fmt("Budget stage", state.budgetStage);
  fmt("Decision timeline", state.timeline);
  if (state.notes) {
    lines.push("");
    lines.push("Notes:");
    lines.push(state.notes);
  }
  lines.push("");
  lines.push("—");
  lines.push("Submitted from openbean.xyz/contact");
  return lines.join("\n");
}

interface FormState {
  name: string;
  email: string;
  org: string;
  industry: Industry | "";
  companySize: CompanySize | "";
  role: string;
  decisionMaker: DecisionMaker | "";
  intent: Intent;
  deployment: Deployment[];
  aiTools: AiTool[];
  infra: Infra[];
  compliance: Compliance[];
  connections: string;
  budgetStage: BudgetStage | "";
  timeline: Timeline;
  notes: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  org: "",
  industry: "",
  companySize: "",
  role: "",
  decisionMaker: "",
  intent: "evaluating",
  deployment: [],
  aiTools: [],
  infra: [],
  compliance: [],
  connections: "",
  budgetStage: "",
  timeline: "1-3",
  notes: "",
};

const MAX_NOTES = 1000;

export function ContactForm() {
  const [state, setState] = useState<FormState>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Free webmail is a real signal of evaluation seriousness for enterprise
  // procurement; we explain why and let the requester proceed if they have a reason.
  const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|icloud|aol|proton|mail)\.(com|net|org)$/i;
  const emailInvalid = state.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);
  const isFreeMail = state.email.length > 0 && FREE_MAIL.test(state.email);
  const showFreeMailNotice = touched && isFreeMail && !state.email.endsWith(".ok");

  const requiredMissing =
    !state.name || !state.email || !state.org ||
    !state.industry || !state.companySize || !state.role ||
    !state.decisionMaker || !state.budgetStage ||
    state.deployment.length === 0 || state.compliance.length === 0;

  const onChangeMulti = (
    field: "deployment" | "compliance" | "aiTools" | "infra",
    value: string
  ) => {
    setState((s) => {
      const cur = s[field] as string[];
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      return { ...s, [field]: next };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (emailInvalid) {
      setError("That email address doesn't look right — check the formatting and try again.");
      return;
    }
    if (requiredMissing) {
      setError("Every required field needs an answer before the operator can route this. The labels marked with * are required.");
      return;
    }
    const subject = `OpenBean inquiry — ${state.org}`;
    const body = formatBody(state);
    const url = `mailto:hello@openbean.xyz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  return (
    <form className="ob-form" onSubmit={onSubmit} noValidate>
      <div className="ob-form-field ob-form-field-required">
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          type="text"
          required
          maxLength={120}
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
          autoComplete="name"
        />
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label htmlFor="contact-email">Work email</label>
        <input
          id="contact-email"
          type="email"
          required
          maxLength={200}
          value={state.email}
          onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
          onBlur={() => setTouched(true)}
          autoComplete="email"
        />
        <span className="ob-form-hint">
          A corporate address is the strongest signal of an active evaluation. We don't subscribe
          you to anything or share the address; the reply is the only thing the form produces.
        </span>
        {emailInvalid ? (
          <span className="ob-form-hint" style={{ color: "var(--ob-danger)" }}>
            That email address doesn't look right — check the formatting.
          </span>
        ) : null}
        {showFreeMailNotice ? (
          <span className="ob-form-hint" style={{ color: "var(--ob-green)" }}>
            A free webmail address is fine if that's right for you; we just want to be sure the
            form's promise (a real reply) lands somewhere you actually read.
          </span>
        ) : null}
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label htmlFor="contact-org">Organization</label>
        <input
          id="contact-org"
          type="text"
          required
          maxLength={200}
          value={state.org}
          onChange={(e) => setState((s) => ({ ...s, org: e.target.value }))}
          autoComplete="organization"
        />
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label htmlFor="contact-industry">Industry</label>
        <select
          id="contact-industry"
          required
          value={state.industry}
          onChange={(e) => setState((s) => ({ ...s, industry: e.target.value as Industry }))}
        >
          <option value="" disabled>Select one</option>
          {INDUSTRY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="ob-form-hint">Used to anticipate the compliance and architecture conversation, not to filter you out.</span>
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label htmlFor="contact-company-size">Company size</label>
        <select
          id="contact-company-size"
          required
          value={state.companySize}
          onChange={(e) => setState((s) => ({ ...s, companySize: e.target.value as CompanySize }))}
        >
          <option value="" disabled>Select one</option>
          {COMPANY_SIZE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="ob-form-hint">A band, not a headcount — used to size the right engagement shape, not to score you.</span>
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label htmlFor="contact-role">Your role</label>
        <input
          id="contact-role"
          type="text"
          required
          maxLength={120}
          value={state.role}
          onChange={(e) => setState((s) => ({ ...s, role: e.target.value }))}
          placeholder="CTO, platform engineer, security lead, ..."
        />
        <span className="ob-form-hint">
          A free-text role, not a single-select — the answer tells the operator whether to
          route the reply to engineering, sales, or security.
        </span>
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label htmlFor="contact-decision-maker">Who signs off on the eventual decision?</label>
        <select
          id="contact-decision-maker"
          required
          value={state.decisionMaker}
          onChange={(e) => setState((s) => ({ ...s, decisionMaker: e.target.value as DecisionMaker }))}
        >
          <option value="" disabled>Select one</option>
          {DECISION_MAKER_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="ob-form-hint">Determines whether the reply goes to engineering, the requester, or a named executive; whether a calendar invite is the right shape or a written reply is.</span>
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label>What brings you here?</label>
        <div className="ob-form-radioset">
          {INTENT_OPTIONS.map((opt) => (
            <label key={opt.value}>
              <input
                type="radio"
                name="intent"
                value={opt.value}
                checked={state.intent === opt.value}
                onChange={() => setState((s) => ({ ...s, intent: opt.value }))}
              />
              <span>
                <b>{opt.label}</b>
                <br />
                <span style={{ color: "var(--ob-muted)", fontSize: "0.8rem" }}>{opt.help}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label>Where would OpenBean run?</label>
        <span className="ob-form-hint">Select all that apply.</span>
        <div className="ob-form-checkset">
          {DEPLOYMENT_OPTIONS.map((opt) => (
            <label key={opt.value}>
              <input
                type="checkbox"
                value={opt.value}
                checked={state.deployment.includes(opt.value)}
                onChange={() => onChangeMulti("deployment", opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="ob-form-field">
        <label>Which AI tools are you using today? (optional)</label>
        <span className="ob-form-hint">Helps us point you at the right Connection setup guidance.</span>
        <div className="ob-form-checkset">
          {AI_TOOL_OPTIONS.map((opt) => (
            <label key={opt.value}>
              <input
                type="checkbox"
                value={opt.value}
                checked={state.aiTools.includes(opt.value)}
                onChange={() => onChangeMulti("aiTools", opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="ob-form-field">
        <label>What infrastructure does your organization already run? (optional)</label>
        <span className="ob-form-hint">Determines whether the deployment conversation starts with a managed-service path or an on-prem / dedicated-server path.</span>
        <div className="ob-form-checkset">
          {INFRA_OPTIONS.map((opt) => (
            <label key={opt.value}>
              <input
                type="checkbox"
                value={opt.value}
                checked={state.infra.includes(opt.value)}
                onChange={() => onChangeMulti("infra", opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label>Compliance or regulatory requirements?</label>
        <span className="ob-form-hint">Select all that apply.</span>
        <div className="ob-form-checkset">
          {COMPLIANCE_OPTIONS.map((opt) => (
            <label key={opt.value}>
              <input
                type="checkbox"
                value={opt.value}
                checked={state.compliance.includes(opt.value)}
                onChange={() => onChangeMulti("compliance", opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="ob-form-field">
        <label htmlFor="contact-connections">How many AI tools / Connections would you expect to integrate?</label>
        <input
          id="contact-connections"
          type="number"
          min={0}
          max={10000}
          value={state.connections}
          onChange={(e) => setState((s) => ({ ...s, connections: e.target.value }))}
          placeholder="Optional, but it helps scope the review"
        />
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label htmlFor="contact-budget">Budget stage</label>
        <select
          id="contact-budget"
          required
          value={state.budgetStage}
          onChange={(e) => setState((s) => ({ ...s, budgetStage: e.target.value as BudgetStage }))}
        >
          <option value="" disabled>Select one</option>
          {BUDGET_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="ob-form-hint">Phrased as a single-select with an explicit "rather not say" so the question does not feel like a sales funnel.</span>
      </div>

      <div className="ob-form-field ob-form-field-required">
        <label>When are you aiming to decide?</label>
        <div className="ob-form-radioset">
          {TIMELINE_OPTIONS.map((opt) => (
            <label key={opt.value}>
              <input
                type="radio"
                name="timeline"
                value={opt.value}
                checked={state.timeline === opt.value}
                onChange={() => setState((s) => ({ ...s, timeline: opt.value }))}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="ob-form-field">
        <label htmlFor="contact-notes">Anything else we should know?</label>
        <textarea
          id="contact-notes"
          maxLength={MAX_NOTES}
          value={state.notes}
          onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
          placeholder="Optional. The real constraint is often in the one sentence no field can hold."
        />
        <span className="ob-form-hint">{state.notes.length} / {MAX_NOTES}</span>
      </div>

      {error ? <div className="ob-form-error" role="alert">{error}</div> : null}

      <button type="submit" className="ob-btn ob-btn-primary ob-btn-lg" style={{ justifySelf: "start" }}>Send to the OpenBean team</button>
      <span className="ob-form-hint">
        Submitting opens your mail client with the answers pre-formatted. The maintainer
        team reads the email and replies within one business day. Nothing is stored, sold,
        or used for anything other than this conversation.
      </span>
    </form>
  );
}
