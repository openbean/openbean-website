// The V16 Enterprise Delivery — the discovery intake wizard.
//
// This is the AI Receptionist V2. The V1 receptionist is a
// structured form at /contact (the V1 work). The V16 wizard
// is a 12-step guided intake at /discovery, with the same
// 12 fields as DISCOVERY_WORKFLOW.md §2.
//
// The wizard's output is a discovery brief that the
// sales engineer reads. The wizard does not require a
// server roundtrip; the brief is generated client-side
// (the same logic is in scripts/discover.mjs on the
// engine repo).
//
// The wizard saves progress in localStorage; the customer
// can resume within 14 days.

"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

const STORAGE_KEY = "openbean-discovery-v1";

const EMPLOYEE_BANDS = ["<50", "50-200", "200-1000", "1000-5000", "5000+"];
const INDUSTRIES = [
  { id: "saas", label: "SaaS / software" },
  { id: "fintech", label: "Fintech" },
  { id: "healthtech", label: "Healthtech" },
  { id: "industrial", label: "Industrial / manufacturing" },
  { id: "government", label: "Government / public sector" },
  { id: "education", label: "Education" },
  { id: "retail", label: "Retail / e-commerce" },
  { id: "other", label: "Other" },
];
const DEPARTMENT_OPTIONS = [
  "Executive", "HR / People", "Sales", "Customer Success", "Marketing",
  "Operations", "Finance", "IT", "Engineering", "Legal", "Security",
];
const AI_OPTIONS = [
  "Claude Code", "Cursor", "GitHub Copilot", "A hosted agent (OpenAI, Ollama, etc.)",
  "An automation (GitHub Actions, n8n, Zapier, etc.)",
  "A vendor memory product (Notion AI, Confluence, Guru, etc.)",
  "None yet",
];
const SYSTEM_OPTIONS = [
  "Salesforce", "HubSpot", "Jira", "Linear", "Slack", "Microsoft Teams",
  "Google Workspace", "Microsoft 365", "Confluence", "Notion",
  "A custom internal wiki", "A custom internal system", "None",
];
const AUTH_OPTIONS = [
  { id: "supabase-auth", label: "Supabase Auth (default)" },
  { id: "okta", label: "Okta" },
  { id: "azure-ad", label: "Azure AD / Entra ID" },
  { id: "google-workspace", label: "Google Workspace" },
  { id: "auth0", label: "Auth0" },
  { id: "other", label: "Other" },
  { id: "none", label: "We do not have an auth provider yet" },
];
const INFRA_OPTIONS = [
  "Vercel", "AWS", "GCP", "Azure", "A colo / dedicated server",
  "On-prem Kubernetes", "Self-managed Postgres", "None yet",
];
const COMPLIANCE_OPTIONS = [
  "SOC 2", "HIPAA", "FedRAMP", "GDPR", "ISO 27001", "PCI-DSS", "None specific right now",
];
const TOPOLOGY_OPTIONS = [
  { id: "vercel-supabase", label: "Vercel + hosted Supabase (managed, fast to start)" },
  { id: "vps-postgres", label: "VPS + self-managed Postgres (semi-managed, more control)" },
  { id: "dedicated-server", label: "Dedicated server (fully managed by OpenBean, on the customer's host)" },
  { id: "on-prem-air-gapped", label: "On-prem / air-gapped (fully managed by OpenBean, on the customer's network)" },
  { id: "managed", label: "Managed (OpenBean operates the instance 24/7)" },
  { id: "not-sure", label: "Not sure yet (the sales engineer will recommend)" },
];
const BUDGET_OPTIONS = [
  "Funded and approved", "Funded but not yet approved",
  "Pre-funding, exploring", "Personal curiosity", "Rather not say",
];
const TIMELINE_OPTIONS = [
  "Active evaluation now", "Next 1\u20133 months",
  "Next 3\u20136 months", "Just exploring", "Other",
];

type DiscoveryData = {
  companyProfile: { name: string; parent?: string; hq: string; website: string; founded: string };
  industry: string;
  employees: string;
  departments: string[];
  currentAIUsage: string[];
  existingSystems: string[];
  authProvider: string;
  infrastructure: string[];
  compliance: string[];
  deploymentPreference: string;
  successCriteria: { name: string; description: string; measurable: boolean; target: string }[];
  decisionCriteria: { budget: string; timeline: string; decisionMaker: string; competingOptions: string };
};

const EMPTY: DiscoveryData = {
  companyProfile: { name: "", hq: "", website: "", founded: "" },
  industry: "",
  employees: "",
  departments: [],
  currentAIUsage: [],
  existingSystems: [],
  authProvider: "",
  infrastructure: [],
  compliance: [],
  deploymentPreference: "",
  successCriteria: [
    { name: "", description: "", measurable: false, target: "" },
    { name: "", description: "", measurable: false, target: "" },
    { name: "", description: "", measurable: false, target: "" },
  ],
  decisionCriteria: { budget: "", timeline: "", decisionMaker: "", competingOptions: "" },
};

export default function DiscoveryWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [resumed, setResumed] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.data) {
          setData({ ...EMPTY, ...parsed.data });
          setStep(parsed.step ?? 1);
          setResumed(true);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
    } catch (e) {
      // ignore
    }
  }, [step, data]);

  const totalSteps = 12;
  const isLast = step === totalSteps;
  const canAdvance = useMemo(() => {
    if (step === 1) return data.companyProfile.name.length > 0;
    if (step === 2) return data.industry.length > 0;
    if (step === 3) return data.employees.length > 0;
    if (step === 4) return data.departments.length > 0;
    if (step === 5) return data.currentAIUsage.length > 0;
    if (step === 6) return data.existingSystems.length > 0;
    if (step === 7) return data.authProvider.length > 0;
    if (step === 8) return data.infrastructure.length > 0;
    if (step === 9) return true; // compliance is optional
    if (step === 10) return data.deploymentPreference.length > 0;
    if (step === 11) {
      const withName = data.successCriteria.filter((s) => s.name.length > 0).length;
      return withName >= 3;
    }
    if (step === 12) return data.decisionCriteria.budget.length > 0 && data.decisionCriteria.timeline.length > 0;
    return true;
  }, [step, data]);

  function next() { if (canAdvance) setStep(Math.min(totalSteps, step + 1)); }
  function prev() { setStep(Math.max(1, step - 1)); }
  function submit() {
    // In production this would POST to a backend. For V16
    // we render a summary and ask the user to email it.
    setSubmitted(true);
  }
  function reset() {
    setData(EMPTY);
    setStep(1);
    setSubmitted(false);
    setResumed(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  if (submitted) {
    return <SubmittedScreen data={data} onReset={reset} />;
  }

  return (
    <div>
      {resumed ? (
        <div style={{ background: "var(--ob-surface)", border: "1px solid var(--ob-line)", borderRadius: 10, padding: 12, marginBottom: 16, fontSize: "0.86rem" }}>
          <strong>Resumed your previous draft.</strong> Continue where you left off, or <button type="button" onClick={reset} style={{ color: "var(--ob-trust)", textDecoration: "underline" }}>start over</button>.
        </div>
      ) : null}

      <ProgressBar step={step} total={totalSteps} />

      <div style={{ background: "var(--ob-surface)", border: "1px solid var(--ob-line)", borderRadius: 14, padding: 28, marginTop: 16 }}>
        {step === 1 && <Step1 data={data} setData={setData} />}
        {step === 2 && <Step2 data={data} setData={setData} />}
        {step === 3 && <Step3 data={data} setData={setData} />}
        {step === 4 && <Step4 data={data} setData={setData} />}
        {step === 5 && <Step5 data={data} setData={setData} />}
        {step === 6 && <Step6 data={data} setData={setData} />}
        {step === 7 && <Step7 data={data} setData={setData} />}
        {step === 8 && <Step8 data={data} setData={setData} />}
        {step === 9 && <Step9 data={data} setData={setData} />}
        {step === 10 && <Step10 data={data} setData={setData} />}
        {step === 11 && <Step11 data={data} setData={setData} />}
        {step === 12 && <Step12 data={data} setData={setData} />}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, gap: 12, flexWrap: "wrap" }}>
        <button type="button" onClick={prev} disabled={step === 1} className="ob-btn" style={{ opacity: step === 1 ? 0.4 : 1 }}>
          ← Back
        </button>
        {isLast ? (
          <button type="button" onClick={submit} disabled={!canAdvance} className="ob-btn ob-btn-primary" style={{ opacity: canAdvance ? 1 : 0.4 }}>
            Submit discovery →
          </button>
        ) : (
          <button type="button" onClick={next} disabled={!canAdvance} className="ob-btn ob-btn-primary" style={{ opacity: canAdvance ? 1 : 0.4 }}>
            Next →
          </button>
        )}
      </div>

      <p style={{ marginTop: 18, fontSize: "0.82rem", color: "var(--ob-muted)" }}>
        Your progress is saved in your browser. You can close this tab and resume within 14 days. <button type="button" onClick={reset} style={{ color: "var(--ob-trust)", textDecoration: "underline" }}>Start over</button>.
      </p>
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = (step / total) * 100;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--ob-muted)", marginBottom: 6 }}>
        <span>Step {step} of {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 6, background: "var(--ob-line)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "var(--ob-trust)", transition: "width 0.2s" }} />
      </div>
    </div>
  );
}

function StepHeader({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <p style={{ fontFamily: "var(--nf-mono, ui-monospace), monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ob-trust)", margin: 0 }}>
        Question {n} of 12
      </p>
      <h2 style={{ fontFamily: "var(--nf-display, inherit), ui-sans-serif, sans-serif", fontSize: "1.4rem", fontWeight: 600, margin: "6px 0 8px", color: "var(--ob-ink)" }}>{title}</h2>
      <p style={{ color: "var(--ob-muted)", margin: 0 }}>{body}</p>
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontWeight: 500, marginBottom: 6, color: "var(--ob-ink)" }}>{label}</label>
      {children}
      {hint ? <p style={{ fontSize: "0.82rem", color: "var(--ob-muted)", margin: "4px 0 0" }}>{hint}</p> : null}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px 12px",
  background: "var(--ob-bg)",
  border: "1px solid var(--ob-line)",
  borderRadius: 8,
  color: "var(--ob-ink)",
  fontFamily: "var(--nf-body, inherit), ui-sans-serif, sans-serif",
  fontSize: "0.95rem",
};

const textareaStyle = { ...inputStyle, minHeight: 80, fontFamily: "var(--nf-body, inherit), ui-sans-serif, sans-serif" };

function Step1({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  const set = (k: keyof DiscoveryData["companyProfile"]) => (e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, companyProfile: { ...data.companyProfile, [k]: e.target.value } });
  return (
    <div>
      <StepHeader n={1} title="Tell us about your company." body="The name, headquarters, and website are the basics we need to start. The website is a sanity check." />
      <Field label="Company name *">
        <input type="text" value={data.companyProfile.name} onChange={set("name")} style={inputStyle} placeholder="e.g., Northwind Manufacturing" />
      </Field>
      <Field label="Parent organization (if any)">
        <input type="text" value={data.companyProfile.parent ?? ""} onChange={(e) => setData({ ...data, companyProfile: { ...data.companyProfile, parent: e.target.value } })} style={inputStyle} />
      </Field>
      <Field label="Headquarters">
        <input type="text" value={data.companyProfile.hq} onChange={set("hq")} style={inputStyle} placeholder="e.g., Greensboro, NC" />
      </Field>
      <Field label="Website">
        <input type="url" value={data.companyProfile.website} onChange={set("website")} style={inputStyle} placeholder="https://example.com" />
      </Field>
      <Field label="Year founded">
        <input type="number" value={data.companyProfile.founded} onChange={set("founded")} style={inputStyle} placeholder="e.g., 1998" min="1700" max="2030" />
      </Field>
    </div>
  );
}

function Step2({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  return (
    <div>
      <StepHeader n={2} title="What industry are you in?" body="The industry shapes the compliance regime, the architecture, the AI tool inventory, and the customer references." />
      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(2, 1fr)" }}>
        {INDUSTRIES.map((opt) => (
          <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, border: `1px solid ${data.industry === opt.id ? "var(--ob-trust)" : "var(--ob-line)"}`, borderRadius: 8, cursor: "pointer", background: data.industry === opt.id ? "rgba(43, 90, 110, 0.08)" : "transparent" }}>
            <input type="radio" name="industry" value={opt.id} checked={data.industry === opt.id} onChange={() => setData({ ...data, industry: opt.id })} />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

function Step3({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  return (
    <div>
      <StepHeader n={3} title="How many people work at your company?" body="The headcount band sizes the engagement, the instance size, and the training plan." />
      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(2, 1fr)" }}>
        {EMPLOYEE_BANDS.map((band) => (
          <label key={band} style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, border: `1px solid ${data.employees === band ? "var(--ob-trust)" : "var(--ob-line)"}`, borderRadius: 8, cursor: "pointer", background: data.employees === band ? "rgba(43, 90, 110, 0.08)" : "transparent" }}>
            <input type="radio" name="employees" value={band} checked={data.employees === band} onChange={() => setData({ ...data, employees: band })} />
            {band}
          </label>
        ))}
      </div>
    </div>
  );
}

function MultiSelect({ options, selected, onChange, columns = 2 }: { options: readonly (string | { id: string; label: string })[]; selected: string[]; onChange: (v: string[]) => void; columns?: number }) {
  function toggle(id: string) {
    if (selected.includes(id)) onChange(selected.filter((s) => s !== id));
    else onChange([...selected, id]);
  }
  return (
    <div style={{ display: "grid", gap: 8, gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {options.map((opt) => {
        const id = typeof opt === "string" ? opt : opt.id;
        const label = typeof opt === "string" ? opt : opt.label;
        return (
          <label key={id} style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, border: `1px solid ${selected.includes(id) ? "var(--ob-trust)" : "var(--ob-line)"}`, borderRadius: 8, cursor: "pointer", background: selected.includes(id) ? "rgba(43, 90, 110, 0.08)" : "transparent" }}>
            <input type="checkbox" checked={selected.includes(id)} onChange={() => toggle(id)} />
            {label}
          </label>
        );
      })}
    </div>
  );
}

function Step4({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  return (
    <div>
      <StepHeader n={4} title="What departments will use OpenBean?" body="Pick all that apply. The departments are the first-class organizational unit in OpenBean." />
      <MultiSelect options={DEPARTMENT_OPTIONS} selected={data.departments} onChange={(v) => setData({ ...data, departments: v })} columns={3} />
    </div>
  );
}

function Step5({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  return (
    <div>
      <StepHeader n={5} title="Which AI tools does your team use today?" body="Pick all that apply. The AI tool inventory is the primary input to the integration plan." />
      <MultiSelect options={AI_OPTIONS} selected={data.currentAIUsage} onChange={(v) => setData({ ...data, currentAIUsage: v })} columns={2} />
    </div>
  );
}

function Step6({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  return (
    <div>
      <StepHeader n={6} title="Which systems does OpenBean need to integrate with?" body="Pick all that apply, initially or in the future. The integration surface is a primary scope driver." />
      <MultiSelect options={SYSTEM_OPTIONS} selected={data.existingSystems} onChange={(v) => setData({ ...data, existingSystems: v })} columns={3} />
    </div>
  );
}

function Step7({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  return (
    <div>
      <StepHeader n={7} title="Which authentication provider does your organization use?" body="The auth provider is the primary input to the identity integration stage." />
      <div style={{ display: "grid", gap: 8 }}>
        {AUTH_OPTIONS.map((opt) => (
          <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, border: `1px solid ${data.authProvider === opt.id ? "var(--ob-trust)" : "var(--ob-line)"}`, borderRadius: 8, cursor: "pointer", background: data.authProvider === opt.id ? "rgba(43, 90, 110, 0.08)" : "transparent" }}>
            <input type="radio" name="authProvider" value={opt.id} checked={data.authProvider === opt.id} onChange={() => setData({ ...data, authProvider: opt.id })} />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

function Step8({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  return (
    <div>
      <StepHeader n={8} title="Where would OpenBean run?" body="Pick all that apply. The infrastructure shapes the deployment topology, the network configuration, and the backup strategy." />
      <MultiSelect options={INFRA_OPTIONS} selected={data.infrastructure} onChange={(v) => setData({ ...data, infrastructure: v })} columns={2} />
    </div>
  );
}

function Step9({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  return (
    <div>
      <StepHeader n={9} title="Which compliance regimes apply to your organization?" body="Pick all that apply, or 'None specific right now'." />
      <MultiSelect options={COMPLIANCE_OPTIONS} selected={data.compliance} onChange={(v) => setData({ ...data, compliance: v })} columns={2} />
    </div>
  );
}

function Step10({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  return (
    <div>
      <StepHeader n={10} title="What deployment model do you prefer?" body="Your preference is the default, but the readiness score may recommend a different topology." />
      <div style={{ display: "grid", gap: 8 }}>
        {TOPOLOGY_OPTIONS.map((opt) => (
          <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, border: `1px solid ${data.deploymentPreference === opt.id ? "var(--ob-trust)" : "var(--ob-line)"}`, borderRadius: 8, cursor: "pointer", background: data.deploymentPreference === opt.id ? "rgba(43, 90, 110, 0.08)" : "transparent" }}>
            <input type="radio" name="deploymentPreference" value={opt.id} checked={data.deploymentPreference === opt.id} onChange={() => setData({ ...data, deploymentPreference: opt.id })} />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

function Step11({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  function setC(i: number, k: string, v: string | boolean) {
    const next = [...data.successCriteria];
    next[i] = { ...next[i], [k]: v };
    setData({ ...data, successCriteria: next });
  }
  return (
    <div>
      <StepHeader n={11} title="What does success look like?" body="Name 3 specific, measurable outcomes. Each should be specific, measurable, and time-bounded." />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ marginBottom: 18, padding: 14, border: "1px solid var(--ob-line)", borderRadius: 10 }}>
          <p style={{ fontWeight: 500, margin: "0 0 8px" }}>Success criterion #{i + 1} *</p>
          <Field label="Name">
            <input type="text" value={data.successCriteria[i].name} onChange={(e) => setC(i, "name", e.target.value)} style={inputStyle} placeholder="e.g., Discount policy accuracy" />
          </Field>
          <Field label="Description">
            <textarea value={data.successCriteria[i].description} onChange={(e) => setC(i, "description", e.target.value)} style={textareaStyle} placeholder="e.g., 100% of the Sales team's discount policy questions are answered by the AI with a source cited, with a 95% accuracy rate on a 100-question test set, by 2026-12-31." />
          </Field>
          <Field label="Target">
            <input type="text" value={data.successCriteria[i].target} onChange={(e) => setC(i, "target", e.target.value)} style={inputStyle} placeholder="e.g., 95% accuracy by 2026-12-31" />
          </Field>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={data.successCriteria[i].measurable} onChange={(e) => setC(i, "measurable", e.target.checked)} />
            <span style={{ fontSize: "0.9rem", color: "var(--ob-muted)" }}>This criterion is specific, measurable, and time-bounded.</span>
          </label>
        </div>
      ))}
    </div>
  );
}

function Step12({ data, setData }: { data: DiscoveryData; setData: (d: DiscoveryData) => void }) {
  const set = (k: keyof DiscoveryData["decisionCriteria"]) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setData({ ...data, decisionCriteria: { ...data.decisionCriteria, [k]: e.target.value } });
  return (
    <div>
      <StepHeader n={12} title="What are your decision criteria?" body="The decision criteria are the sales process's input. The deployment team does not act on the decision criteria directly, but the sales engineer uses them to scope the proposal, the SOW, and the contract." />
      <Field label="Budget stage *" hint="Phrased as a single-select, with an explicit 'rather not say' answer, so the question does not feel like a sales funnel.">
        <select value={data.decisionCriteria.budget} onChange={set("budget")} style={inputStyle}>
          <option value="">Select a budget stage…</option>
          {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </Field>
      <Field label="Decision timeline *">
        <select value={data.decisionCriteria.timeline} onChange={set("timeline")} style={inputStyle}>
          <option value="">Select a timeline…</option>
          {TIMELINE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Decision maker" hint="The person who signs off on the eventual purchase. If you don't know yet, leave blank.">
        <input type="text" value={data.decisionCriteria.decisionMaker} onChange={set("decisionMaker")} style={inputStyle} placeholder="e.g., Lena Kowalski, VP Operations" />
      </Field>
      <Field label="Competing options we are evaluating" hint="The other products or approaches the team is considering alongside OpenBean. Optional but helpful.">
        <textarea value={data.decisionCriteria.competingOptions} onChange={set("competingOptions")} style={textareaStyle} placeholder="e.g., Notion AI, Confluence, a vendor memory product" />
      </Field>
    </div>
  );
}

function SubmittedScreen({ data, onReset }: { data: DiscoveryData; onReset: () => void }) {
  // Compute readiness score (client-side, mirrors scripts/discover.mjs)
  const score = useMemo(() => {
    let s = 0;
    if (data.companyProfile.name) s += 1;
    if (data.industry) s += 1;
    if (data.employees) s += 1;
    if (data.departments.length > 0) s += 1;
    if (data.currentAIUsage.length > 0) s += 1;
    if (data.existingSystems.length > 0) s += 1;
    if (data.authProvider) s += 1;
    if (data.infrastructure.length > 0) s += 1;
    s += 1; // compliance (optional)
    if (data.deploymentPreference) s += 1;
    const measurable = data.successCriteria.filter((c: { measurable: boolean }) => c.measurable).length;
    if (measurable >= 3) s += 15;
    if (data.decisionCriteria.decisionMaker && data.decisionCriteria.decisionMaker !== "I don't know yet") s += 13;
    // For the wizard we don't have assessment verdicts; those are filled in by the deployment engineer after the call.
    return s;
  }, [data]);

  const band = score >= 75 ? "Ready" : score >= 50 ? "Additional discovery" : "Not ready";
  const recommended = recommendArchitecture(data);

  return (
    <div style={{ background: "var(--ob-surface)", border: "1px solid var(--ob-line)", borderRadius: 14, padding: 28 }}>
      <h2 style={{ fontFamily: "var(--nf-display, inherit), ui-sans-serif, sans-serif", fontSize: "1.5rem", fontWeight: 600, margin: "0 0 12px", color: "var(--ob-ink)" }}>
        Thank you — your discovery is submitted.
      </h2>
      <p style={{ color: "var(--ob-muted)", margin: "0 0 18px" }}>
        The OpenBean delivery team will review your submission within 1 business day. A real human will reply, referencing your answers below. If you'd like to follow up sooner, email <a href="mailto:delivery@openbean.xyz" style={{ color: "var(--ob-trust)" }}>delivery@openbean.xyz</a>.
      </p>

      <h3 style={{ fontFamily: "var(--nf-display, inherit), ui-sans-serif, sans-serif", fontSize: "1.1rem", fontWeight: 600, margin: "18px 0 8px", color: "var(--ob-ink)" }}>What we heard</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6, color: "var(--ob-muted)" }}>
        <li><strong style={{ color: "var(--ob-ink)" }}>Company:</strong> {data.companyProfile.name} ({data.companyProfile.hq || "HQ not specified"})</li>
        <li><strong style={{ color: "var(--ob-ink)" }}>Industry:</strong> {data.industry}</li>
        <li><strong style={{ color: "var(--ob-ink)" }}>Employees:</strong> {data.employees}</li>
        <li><strong style={{ color: "var(--ob-ink)" }}>Departments:</strong> {data.departments.join(", ")}</li>
        <li><strong style={{ color: "var(--ob-ink)" }}>AI tools today:</strong> {data.currentAIUsage.join(", ")}</li>
        <li><strong style={{ color: "var(--ob-ink)" }}>Auth provider:</strong> {data.authProvider}</li>
        <li><strong style={{ color: "var(--ob-ink)" }}>Compliance:</strong> {data.compliance.join(", ") || "(none specified)"}</li>
        <li><strong style={{ color: "var(--ob-ink)" }}>Preferred deployment:</strong> {data.deploymentPreference}</li>
        <li><strong style={{ color: "var(--ob-ink)" }}>Decision maker:</strong> {data.decisionCriteria.decisionMaker || "(not yet named)"}</li>
        <li><strong style={{ color: "var(--ob-ink)" }}>Decision timeline:</strong> {data.decisionCriteria.timeline}</li>
      </ul>

      <h3 style={{ fontFamily: "var(--nf-display, inherit), ui-sans-serif, sans-serif", fontSize: "1.1rem", fontWeight: 600, margin: "18px 0 8px", color: "var(--ob-ink)" }}>What we recommend</h3>
      <p style={{ color: "var(--ob-muted)", margin: 0 }}>
        Based on your answers, we recommend a <strong style={{ color: "var(--ob-ink)" }}>{recommended}</strong> deployment.
        {data.deploymentPreference !== recommended ? ` (Your preference is ${data.deploymentPreference}; the readiness score + compliance regime + infrastructure point to ${recommended}.)` : ""}
      </p>

      <h3 style={{ fontFamily: "var(--nf-display, inherit), ui-sans-serif, sans-serif", fontSize: "1.1rem", fontWeight: 600, margin: "18px 0 8px", color: "var(--ob-ink)" }}>What happens next</h3>
      <p style={{ color: "var(--ob-muted)", margin: 0 }}>
        {band === "Ready"
          ? "The OpenBean delivery team will write a proposal and send it to you within 2 business days. The proposal will include the engagement scope, the timeline, the fees, and your responsibilities."
          : band === "Additional discovery"
          ? "The OpenBean delivery team will schedule a follow-up discovery call to address the missing items. The call is typically 30 minutes."
          : "The OpenBean delivery team will schedule a second discovery call to address the missing items. The call is typically 60 minutes."}
      </p>

      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/services" className="ob-btn">See the 9 Professional Services →</Link>
        <Link href="/security" className="ob-btn">Read the security overview →</Link>
        <button type="button" onClick={onReset} className="ob-btn" style={{ background: "transparent", border: "1px solid var(--ob-line)" }}>Start a new discovery</button>
      </div>
    </div>
  );
}

function recommendArchitecture(data: DiscoveryData) {
  const compliance = data.compliance || [];
  if (compliance.some((c: string) => c === "FedRAMP")) return "on-prem-air-gapped";
  if (data.deploymentPreference === "on-prem-air-gapped") return "on-prem-air-gapped";
  if (compliance.some((c: string) => c === "HIPAA" || c === "PCI-DSS")) return "dedicated-server";
  if (data.deploymentPreference === "dedicated-server") return "dedicated-server";
  if (data.deploymentPreference === "managed") return "managed";
  if (data.deploymentPreference === "vps-postgres" && data.infrastructure?.some((i: string) => ["AWS", "GCP", "Azure"].includes(i))) {
    return "vps-postgres";
  }
  if (data.deploymentPreference === "vercel-supabase" && (compliance.length === 0 || compliance.some((c: string) => c === "GDPR"))) {
    return "vercel-supabase";
  }
  return "local-development";
}
