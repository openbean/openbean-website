// The Enterprise FAQ — distinct from the marketing landing page's FAQ. The
// landing FAQ is for a visitor deciding whether to read further. This FAQ is
// for a buyer, security reviewer, or procurement lead who has decided to read
// further and now has specific, named questions about the product, the
// architecture, the deployment, the security model, the license, and the
// service shape. Each answer points at the canonical document so the buyer
// can verify it against the public source.

import { Footer, TopBar } from "@openbean/ui";

export const metadata = {
  title: "Enterprise FAQ — OpenBean",
  description: "Specific, named answers to the questions a security reviewer, procurement lead, or enterprise architect asks about OpenBean. Each answer points at the canonical public document.",
};

interface Q {
  q: string;
  a: string;
  links?: Array<{ label: string; href: string }>;
}

const SECURITY: Q[] = [
  {
    q: "Is the engine open source, and what license is it under?",
    a: "Yes. The entire engine is MIT-licensed source. No feature is gated behind a proprietary tier; the source the maintainer team ships is the source that runs in your instance.",
    links: [
      { label: "Architecture one-pager", href: "/docs/enterprise/ARCHITECTURE_OVERVIEW.md" },
    ],
  },
  {
    q: "How is tenant isolation enforced?",
    a: "By Postgres row-level security policies on the `claims` table, enforced at the database layer rather than by application filtering. The same RLS wall protects the `tenant_users`, `scope_grants`, and `ai_identities` tables. The adversarial acceptance suite verifies the wall on every PR with a forged JWT — see CHECK 5b, 5c, 6, 8.",
    links: [
      { label: "Architecture overview", href: "/docs/enterprise/ARCHITECTURE_OVERVIEW.md" },
      { label: "Engine spec (security §)", href: "/docs/architecture/OPENBEAN.md#12-security" },
    ],
  },
  {
    q: "How are AI tool connections authenticated?",
    a: "Two ways. Local connections use the engine's service-role key, scoped by a per-connection `OPENBEAN_PRINCIPAL` value. Remote connections use a hashed, revocable API key checked on every request, against a `kind='service'` row in `ai_identities`. Revocation takes effect on the very next request, on every access path — not just on writes.",
    links: [
      { label: "AI identity spec", href: "/docs/specs/002-ai-identity-lifecycle.md" },
    ],
  },
  {
    q: "Is the source available for our security team to review?",
    a: "All of it. The engine, the governance gate, the RLS policies, and the MCP protocol implementation are MIT-licensed in the public repository. Every invariant is verified by the adversarial acceptance suite on every PR; the CHECK numbers are part of the documentation.",
    links: [
      { label: "README — Invariants", href: "/" },
    ],
  },
  {
    q: "Do you have a SOC 2 / HIPAA / ISO 27001 attestation?",
    a: "OpenBean is an open-source engine operated by your own engineering team on your own infrastructure. The compliance posture of your OpenBean instance is the compliance posture of your own deployment, not OpenBean the project. The Professional Services catalog has a Security Review service (see the Services page) that walks your team's security questionnaire against OpenBean's documented properties; a third-party SOC 2 / HIPAA / ISO 27001 attestation is the customer's responsibility to commission separately, on the customer's own deployment.",
    links: [
      { label: "Professional Services — Security Review", href: "/services#security-review" },
    ],
  },
  {
    q: "What does the adversarial acceptance suite actually test?",
    a: "Every structural invariant the engine makes: append-only integrity, scope isolation, tenant isolation, the trust root (session tenant minted only from verified membership), the materialized-view leak seal, the gate's branch logic, the tenant-stamping trigger, and the revocation enforcement. 40+ checks, run on every PR against a real Postgres stack. The CHECK numbers are part of the architecture overview.",
    links: [
      { label: "Architecture overview — numbers", href: "/docs/enterprise/ARCHITECTURE_OVERVIEW.md" },
    ],
  },
  {
    q: "Can an AI tool grant itself approval authority?",
    a: "No. AI connections are structurally incapable of governance actions because they have no `tenant_users` row — `getRole()` returns null, and `canApprove(null)` is false. Approving or retracting a claim is a role-gated human act (owner or admin only), checked server-side on every request. This is enforced by construction, not by an added permission check.",
  },
];

const DEPLOYMENT: Q[] = [
  {
    q: "What deployment targets are supported today, and which are verified?",
    a: "Six targets are documented in the deployment guides: local development (Windows, macOS, Ubuntu WSL), fresh Ubuntu 24.04 VPS, Vercel + hosted Supabase, self-managed Postgres on a VPS or VM, dedicated server / on-prem Kubernetes, and fully on-premise / air-gapped. Local development and Vercel + hosted Supabase are Verified — exercised against a real host by the maintainer team. The remaining four are Designed — the procedure is correct against the application's interfaces, but the maintainer team has not yet run the procedure on a real host of that shape. Each Designed target names the verification gap explicitly in the guide.",
    links: [
      { label: "Deployment guides", href: "/docs/enterprise/DEPLOYMENT_GUIDES.md" },
    ],
  },
  {
    q: "Is there a hosted or cloud version?",
    a: "No, and there will not be one. OpenBean is self-hosted permanently, by design — there is no OpenBean cloud account for your organization's knowledge to live in. The manifesto makes the argument: an organization's accumulated knowledge is among its most valuable assets, and the only acceptable place for something that valuable is infrastructure the organization itself controls.",
  },
  {
    q: "Can we deploy fully on our own infrastructure, air-gapped?",
    a: "Architecturally, yes — nothing in the design is tied to a specific cloud vendor. Today's fully documented and tested path is the application plus a Postgres database you provision and hold the credentials to. A from-scratch, zero-external-dependency deployment guide is designed in the deployment guides; the maintainer team has not yet exercised it on a real air-gapped host, and the Professional Services Deployment Support or On-Premise Deployment engagements are the right shape for an organization that wants hands-on help standing one up.",
    links: [
      { label: "Deployment guides — on-prem", href: "/docs/enterprise/DEPLOYMENT_GUIDES.md" },
      { label: "Professional Services", href: "/services" },
    ],
  },
  {
    q: "What happens to our data if OpenBean the project stops existing?",
    a: "Nothing happens to it. It was never on the project's infrastructure. Your Postgres database, your application deployment, and your credentials keep working exactly as they do today. The whole engine is MIT-licensed source you can fork and continue running as-is, with or without the maintainer team.",
  },
  {
    q: "What is the recovery story if something goes wrong?",
    a: "Three pieces, all in the engine today: `npm run backup` produces a single archive of the entire instance (memory, accounts, connections, secrets); `npm run restore -- <archive>` restores it (prompts before overwriting; verified by drill on real data, not a unit test); `npm run doctor` runs eight health checks, each failure paired with its cause and the exact recovery command. Recovery is a documented, exercised path, not a sketch on a roadmap.",
    links: [
      { label: "Deployment guides — verification", href: "/docs/enterprise/DEPLOYMENT_GUIDES.md" },
    ],
  },
  {
    q: "What's the upgrade procedure?",
    a: "For the local development path: `npm install && npx supabase migration up --workdir packages/engine --local && npm run dev:up`. For the Vercel + hosted Supabase path: `git push` to the tracked branch (which triggers Vercel's build), then `npx supabase db push --workdir packages/engine` for any new migrations. The `migration up` / `db push` step is the easy-to-miss one and the documentation repeats it deliberately: it applies any new migrations from the pulled code, and skipping it leaves the database schema behind the code.",
  },
];

const PRODUCT: Q[] = [
  {
    q: "Which AI tools are supported?",
    a: "Any client that speaks the Model Context Protocol. Verified directly with Claude Code and Cursor. The protocol is open, so this list is not a gate — a vendor's cooperation is not required to participate.",
  },
  {
    q: "Is there an SDK or a CLI?",
    a: "An SDK and a CLI are planned (Phase C of the roadmap) and are not yet built. The engine's compiled exports are usable as a library today (`openbean`, `openbean/gate`, `openbean/mcp/*`), and the `npm run mcp` script exposes the engine's seven MCP tools over stdio for local use. The Professional Services Migration Assessment is the right engagement for an organization that wants a real, typed client for an integration today.",
    links: [
      { label: "Professional Services — Migration Assessment", href: "/services#migration-assessment" },
    ],
  },
  {
    q: "How is the gate policy configured?",
    a: "The gate is configuration, not hardcoded exceptions. The `config` table holds `HIGH_STAKES` predicates (which always wait for a human), `ACCUMULATE` predicates (which pile up rather than supersede), `SUPERSEDE_ON_RERUN` predicates (which auto-replace on a new value), the decay rate, and the trust floor. The Organization page in the product renders the live `config` as a read-only Policies card. Editing the policy today is a database operation, not a UI button — this is a deliberate constraint, because `config` is one instance-wide table, not tenant-scoped, and a browser edit here would silently change governance for every organization sharing the instance.",
  },
  {
    q: "What happens when an AI tool proposes something high-stakes?",
    a: "The gate routes it to `pending_review` regardless of how trusted the writer is. A human owner or admin reviews it from the Review page, with the proposer's identity, the confidence, the gate's reasoning, and the full provenance visible. The reviewer can approve, decline, correct, merge, or escalate. A correction re-enters review (philosophically right; may need explanation in-product). A merge keeps one and declines the other in a single decision.",
  },
  {
    q: "Is there a way to make the AI also forget something?",
    a: "No. The append-only trigger is the last line of defense, and it is a database trigger, not application code. 'Removing' a fact is always an append: a retraction or a correction is a new row that supersedes the old one. The full claim chain remains intact, with the retraction's reason. This is the same property that makes the audit trail trustworthy.",
  },
];

const BUSINESS: Q[] = [
  {
    q: "What does it cost?",
    a: "The engine is free and MIT-licensed. There is no per-seat, per-instance, or per-claim charge. Professional Services engagements are scoped and priced per the catalog; conversations that don't fit a catalog shape are answered in writing. Pricing is deliberately not on the public page; a templated number produces a templated engagement, and OpenBean would rather scope an engagement to your deployment than publish a number that does not match any real one.",
    links: [
      { label: "Professional Services catalog", href: "/services" },
    ],
  },
  {
    q: "Do you offer enterprise support?",
    a: "Yes. The Support service (see the Services page) is a named, time-bounded engagement with named response-time targets (Severity 1: 1-hour response, 4-hour mitigation; Severity 2: 4-hour response, 1-business-day mitigation; Severity 3: 1-business-day response), a quarterly review, and a written incident report for every Severity 1. The Pilot Program service is the right engagement for an organization that wants a structured pilot before committing to a production deployment.",
    links: [
      { label: "Professional Services — Support", href: "/services#support" },
      { label: "Professional Services — Pilot Program", href: "/services#pilot-program" },
    ],
  },
  {
    q: "Do you sign an NDA?",
    a: "Yes, for the Architecture Review, Security Review, Migration Assessment, and Health Check services, before the engagement starts. The NDA is the customer's standard form where possible; the maintainer team has a form it can offer when the customer does not.",
  },
  {
    q: "Is there a hosted, single-tenant, OpenBean-managed option?",
    a: "No, and there will not be one. The manifesto's argument is that an organization's accumulated knowledge is among its most valuable assets, and the only acceptable place for that is infrastructure the organization itself controls. A hosted, single-tenant offering would invert that argument. The Professional Services Deployment Support and On-Premise Deployment engagements exist precisely so an organization that does not want to stand up OpenBean on its own hardware can have the maintainer team walk its own team through standing it up on its own infrastructure.",
  },
];

const SECTIONS: Array<{ id: string; title: string; description: string; items: Q[] }> = [
  { id: "security", title: "Security & trust", description: "What a security reviewer needs.", items: SECURITY },
  { id: "deployment", title: "Deployment & operations", description: "What a platform engineer or SRE needs.", items: DEPLOYMENT },
  { id: "product", title: "Product & governance", description: "What a product owner or governance lead needs.", items: PRODUCT },
  { id: "business", title: "Business & procurement", description: "What a procurement lead or executive sponsor needs.", items: BUSINESS },
];

export default function FaqPage() {
  return (
    <div className="lp ent">
      <TopBar
        tag="platform"
        right={
          <nav className="lp-nav" aria-label="Page sections">
            <a href="/#governance">Governance</a>
            <a href="/#architecture">Architecture</a>
            <a href="/#security">Security</a>
            <a href="/#deployment">Deployment</a>
            <a href="/evaluation-program">Evaluation program</a>
            <a href="/services">Services</a>
            <a className="btn" href="/contact">Talk to us</a>
          </nav>
        }
      />
      <main className="lp-services">
        <p className="ent-eyebrow">Enterprise FAQ</p>
        <h1>Specific answers to specific questions.</h1>
        <p className="lede">
          The landing page&rsquo;s FAQ is for a visitor deciding whether to read further. This FAQ
          is for a security reviewer, procurement lead, or enterprise architect who has decided
          to read further and now has specific, named questions. Each answer points at the
          canonical public document so you can verify it against the source.
        </p>

        {SECTIONS.map((section) => (
          <section key={section.id} className="lp-faq-section" id={section.id}>
            <h2 className="lp-h2" style={{ maxWidth: "none" }}>{section.title}</h2>
            <p className="lede">{section.description}</p>
            <div className="lp-faq-list">
              {section.items.map((item) => (
                <article key={item.q} className="lp-faq-item">
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                  {item.links && item.links.length > 0 ? (
                    <ul className="lp-faq-links">
                      {item.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href}>{l.label} →</a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}

        <div className="lp-svc-cta">
          <p>Didn&rsquo;t find your question? Use the structured intake to ask it directly.</p>
          <a className="btn btn-primary lp-btn-lg" href="/contact">Ask the maintainer team</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
