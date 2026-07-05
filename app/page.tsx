import "@openbean/ui/landing.css";
import { Footer, TopBar } from "@openbean/ui";

const GH = "https://github.com/openbean/openbean";
const CONTACT = "/contact";
const SERVICES = "/services";
const EVAL = "/contact?intent=evaluation";

function Eyebrow({ children }: { children: string }) {
  return <p className="ent-eyebrow">{children}</p>;
}

function Shot({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <figure className="ent-shot">
      <div className="ent-shot-chrome">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="url">{label}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
    </figure>
  );
}

export default function Home() {
  return (
    <div className="lp ent">
      <TopBar
        tag="platform"
        right={
          <nav className="lp-nav" aria-label="Page sections">
            <a href="#governance">Governance</a>
            <a href="#architecture">Architecture</a>
            <a href="#security">Security</a>
            <a href="#deployment">Deployment</a>
            <a href="/evaluation-program">Evaluation</a>
            <a href="/services">Services</a>
            <a href="/faq">FAQ</a>
            <a className="btn" href={CONTACT}>Talk to us</a>
          </nav>
        }
      />

      {/* ── hero ─────────────────────────────────────────────────────── */}
      <header className="ent-hero">
        <div className="wrap ent-hero-grid">
          <div className="ent-hero-copy">
            <Eyebrow>Governed AI memory infrastructure</Eyebrow>
            <h1 className="ent-h1">
              Every AI assistant in your organization.<br />
              One governed memory. <span className="ac">Your infrastructure.</span>
            </h1>
            <p className="ent-lead">
              OpenBean is the memory layer that sits between your AI tools and your
              organization&rsquo;s knowledge — an append-only, auditable log with a governance
              gate in front of it, deployed entirely inside infrastructure you control. Nothing
              is written without a record. Nothing risky ships without a human.
            </p>
            <div className="lp-cta">
              <a className="btn btn-primary lp-btn-lg" href={CONTACT}>Talk to us</a>
              <a className="btn lp-btn-lg" href={EVAL}>Get an architecture review</a>
            </div>
            <p className="ent-hero-sub">
              Prefer to see it running first? <a href="#evaluation">Deploy an evaluation instance</a> — same software, no sales call required.
            </p>
          </div>
          <div className="ent-hero-visual">
            <Shot
              src="/screenshots/review.png"
              alt="OpenBean's review queue: an AI-proposed enterprise pricing change held for a human's approval, with the reasoning shown plainly."
              label="your-instance.internal / review"
            />
            <p className="ent-hero-caption">
              A real, running instance. An AI proposed a pricing change — it waits here until a person signs off.
            </p>
          </div>
        </div>
      </header>

      {/* ── principles bar ───────────────────────────────────────────── */}
      <section className="ent-principles">
        <div className="wrap ent-principles-grid">
          <span><b>Self-hosted, permanently</b> — no OpenBean cloud, ever</span>
          <span><b>MIT licensed</b> — the entire engine is source you can read</span>
          <span><b>No closed core</b> — nothing gated behind a hidden tier</span>
          <span><b>Your database</b> — your Postgres, your credentials, your backups</span>
        </div>
      </section>

      {/* ── the enterprise problem ───────────────────────────────────── */}
      <section className="wrap ent-section" id="problem">
        <Eyebrow>The problem</Eyebrow>
        <h2 className="lp-h2">Your organization is running a dozen ungoverned AI memories, and no one signed off on any of them.</h2>
        <div className="lp-cols3">
          <div>
            <h3>Knowledge is fragmented by tool</h3>
            <p>Claude Code remembers one thing, Cursor another. Each session, each seat, each vendor holds a private, invisible notebook that no one else on the team — or in security — can see or audit.</p>
          </div>
          <div>
            <h3>Nothing is reviewed before it counts</h3>
            <p>An AI assistant can decide a pricing figure, a deployment target, or a compliance claim is true, and that belief propagates with no human checkpoint and no record of who approved it.</p>
          </div>
          <div>
            <h3>There is no audit trail to produce</h3>
            <p>When a customer, auditor, or regulator asks &ldquo;who told the AI that, and when,&rdquo; most organizations have no log to show them — because none was ever kept.</p>
          </div>
        </div>
      </section>

      {/* ── why ai memory needs governance / the gate ────────────────── */}
      <section className="wrap ent-section" id="governance">
        <Eyebrow>Governance</Eyebrow>
        <div className="lp-split">
          <div>
            <h2 className="lp-h2">Every write is classified before it becomes the truth.</h2>
            <p className="lp-sub">
              Governance that reviews everything gets bypassed under deadline pressure.
              Governance that reviews nothing is a compliance liability waiting to be found.
              OpenBean&rsquo;s gate classifies every incoming fact and routes only the ones that
              matter to a person — so routine work never slows down, and nothing high-stakes
              ships without sign-off.
            </p>
            <ul className="lp-list">
              <li>An AI identity can never grant itself approval authority — approving a held claim is a role-gated human act, enforced server-side.</li>
              <li>Which facts count as high-stakes is policy your organization owns and can inspect, not a hardcoded exception list.</li>
              <li>Held claims sit in a visible review queue with the proposer&rsquo;s identity and confidence attached — never silently dropped, never silently accepted.</li>
            </ul>
          </div>
          <div className="lp-policy">
            <div className="lp-policy-head"><span>incoming write</span><span>what the gate does</span></div>
            <div className="lp-policy-row">
              <div><b>Routine fact or procedure</b><span className="d">conventions, runbooks, addresses</span></div>
              <span className="lg-chip ok">active — lands instantly</span>
            </div>
            <div className="lp-policy-row">
              <div><b>High-stakes predicate</b><span className="d">pricing, contracts, deploy targets, policy</span></div>
              <span className="lg-chip hold">pending review</span>
            </div>
            <div className="lp-policy-row">
              <div><b>Low-confidence claim</b><span className="d">below your organization&rsquo;s configured trust floor</span></div>
              <span className="lg-chip hold">quarantined</span>
            </div>
            <div className="lp-policy-row">
              <div><b>Bulk / raw artifact</b><span className="d">dumps, transcripts, pasted research</span></div>
              <span className="lg-chip bad">rejected — never stored</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── platform overview ────────────────────────────────────────── */}
      <section className="wrap ent-section">
        <Eyebrow>Platform</Eyebrow>
        <h2 className="lp-h2">One path from &ldquo;an AI learned something&rdquo; to &ldquo;the organization can rely on it.&rdquo;</h2>
        <p className="lp-sub">No write reaches storage directly — not from a model, not from a person. Every fact takes the same audited path.</p>
        <div className="lp-pipe">
          <div className="lp-stage">
            <span className="k"><b>1</b> / propose</span>
            <code className="sig">openbean.propose(subject, predicate, object)</code>
            <h3>A fact is submitted</h3>
            <p>An AI tool or a teammate submits a claim: what it&rsquo;s about, what&rsquo;s asserted, and how confident the source is.</p>
          </div>
          <div className="lp-stage">
            <span className="k"><b>2</b> / govern</span>
            <code className="sig">route() · classifyWrite()</code>
            <h3>The gate decides</h3>
            <p>Classified and scored before anything is stored. Routine facts pass through; high-stakes ones wait for a human.</p>
          </div>
          <div className="lp-stage">
            <span className="k"><b>3</b> / record</span>
            <code className="sig">claims — append-only, RLS-sealed</code>
            <h3>It becomes permanent record</h3>
            <p>Stored as a new row, forever. Updates supersede the prior answer; nothing is ever mutated or deleted.</p>
          </div>
          <div className="lp-stage">
            <span className="k"><b>4</b> / resolve</span>
            <code className="sig">openbean.recall(subject, predicate)</code>
            <h3>Everyone gets one answer</h3>
            <p>Any authorized person or tool asks and receives the current, computed belief — with full provenance attached.</p>
          </div>
        </div>
      </section>

      {/* ── enterprise architecture ──────────────────────────────────── */}
      <section className="wrap ent-section" id="architecture">
        <Eyebrow>Architecture</Eyebrow>
        <h2 className="lp-h2">Every access path — local, remote, human — terminates at the same governed record.</h2>
        <p className="lp-sub">
          There is no separate &ldquo;admin&rdquo; data path with weaker checks. A request from an
          AI tool running on an engineer&rsquo;s laptop and a request from your browser are
          verified by the same policy, against the same database.
        </p>
        <div className="ent-diagram" role="img" aria-label="Architecture diagram: AI tools connect locally over MCP stdio or remotely over HTTPS with a scoped bearer credential; people connect through the browser application. All three paths reach the same Postgres database, sealed by row-level security, holding the append-only claims table.">
          <div className="ent-diag-row">
            <div className="ent-diag-box">AI tool<span>Claude Code, Cursor, any MCP client</span></div>
            <div className="ent-diag-box">Person<span>browser</span></div>
          </div>
          <div className="ent-diag-arrows">
            <span>local · MCP stdio</span>
            <span>remote · HTTPS + scoped bearer credential</span>
            <span>session</span>
          </div>
          <div className="ent-diag-box wide">Your instance<span>the application layer — setup, review, governance, the API surface — deployed on infrastructure you choose</span></div>
          <div className="ent-diag-arrows single"><span>every path, same policy</span></div>
          <div className="ent-diag-box wide accent">Postgres<span>row-level security · append-only claims · your database, your credentials</span></div>
        </div>
      </section>

      {/* ── deployment model ─────────────────────────────────────────── */}
      <section className="wrap ent-section" id="deployment">
        <Eyebrow>Deployment</Eyebrow>
        <div className="lp-split lp-split-narrow">
          <div>
            <h2 className="lp-h2">There is one deployment model: yours.</h2>
            <p className="lp-sub">
              OpenBean does not operate a multi-tenant service that holds your organization&rsquo;s
              knowledge. You deploy the application and provision the database; both live under
              credentials only your organization holds. If OpenBean the project disappeared
              tomorrow, your instance would keep running exactly as it does today.
            </p>
            <p className="lp-sub">
              Told plainly: the fully tested, documented deployment path today is the
              application on infrastructure you control (verified on Vercel and on a plain
              Ubuntu host) with a Postgres database you provision and hold the keys to. A fully
              air-gapped, zero-external-dependency packaging is architecturally straightforward
              — nothing in the design is tied to a specific cloud vendor — and is active work,
              not a promise made and left unbuilt.
            </p>
          </div>
          <div className="ent-deploy-card">
            <h3>What you hold</h3>
            <ul className="lp-list">
              <li>The Postgres database — every row of every organization&rsquo;s memory</li>
              <li>The application deployment — the layer AI tools and people talk to</li>
              <li>Every credential — service keys, signing secrets, AI tool tokens</li>
              <li>Every AI identity connected to your instance — nothing registered on our side</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── security & governance proof ──────────────────────────────── */}
      <section className="wrap ent-section" id="security">
        <Eyebrow>Security</Eyebrow>
        <div className="lp-proof-head">
          <h2 className="lp-h2" style={{ maxWidth: "none" }}>Proven live, not asserted in a slide deck.</h2>
          <span className="note">every invariant below is verified by an adversarial test suite, required on every code change before it can merge</span>
        </div>
        <div className="lp-proofs">
          <div><b>Append-only</b><p>Claims are never mutated or deleted — enforced by a database trigger, not application code.</p><span className="ck">CHECK 4 · 4b · 5d</span></div>
          <div><b>Scope isolation</b><p>Reads and writes are sealed to explicitly granted scopes, enforced by Postgres row-level security.</p><span className="ck">CHECK 5b · 5c</span></div>
          <div><b>Tenant wall</b><p>One organization&rsquo;s data cannot become visible to another, even through an application bug.</p><span className="ck">CHECK 6 · 8</span></div>
          <div><b>Verified trust root</b><p>A session&rsquo;s organization identity is only ever minted from a verified membership row.</p><span className="ck">CHECK 9 · 10</span></div>
          <div><b>No bypass read path</b><p>The computed belief is never readable outside the governed, policy-checked path.</p><span className="ck">CHECK 12</span></div>
        </div>
        <div className="ent-sec-grid">
          <div><h3>Session integrity</h3><p>HS256-signed, expiry-verified, constant-time-compared tokens. Forged &ldquo;alg:none&rdquo; tokens are rejected before any other check runs.</p></div>
          <div><h3>Immediate revocation</h3><p>Revoking an AI tool&rsquo;s access is enforced on every read and write path the moment it happens — not just on its next write.</p></div>
          <div><h3>Role-gated governance</h3><p>Approving or retracting a claim requires an owner or admin role, checked server-side on every request.</p></div>
        </div>
      </section>

      {/* ── ai tool compatibility ─────────────────────────────────────── */}
      <section className="wrap ent-section">
        <Eyebrow>Compatibility</Eyebrow>
        <div className="lp-split lp-split-narrow">
          <div>
            <h2 className="lp-h2">One memory, reached by every AI tool your teams already use.</h2>
            <p className="lp-sub">
              OpenBean speaks the Model Context Protocol — an open standard, not a proprietary
              API. Any MCP-capable client can connect, locally or over a network, with a
              credential scoped to exactly what it&rsquo;s allowed to touch. Switching AI vendors
              never means losing what your organization has already taught its assistants.
            </p>
          </div>
          <div className="lp-tools">
            <div className="lp-tool"><code>openbean.propose</code><p>Submit a write — runs the full governance gate</p></div>
            <div className="lp-tool"><code>openbean.recall</code><p>Get the current belief, with full provenance</p></div>
            <div className="lp-tool"><code>openbean.history</code><p>The complete claim log for any fact</p></div>
            <div className="lp-tool"><code>openbean.review</code><p>List claims awaiting a human decision</p></div>
            <div className="lp-tool"><code>openbean.approve</code><p>Promote a held claim — owner/admin only</p></div>
            <div className="lp-tool"><code>openbean.retract</code><p>Append a retraction — never deletes</p></div>
            <div className="lp-tool fill">Verified with Claude Code and Cursor.<br />Works with any MCP client.</div>
          </div>
        </div>
      </section>

      {/* ── evaluation path / customer journey ───────────────────────── */}
      <section className="wrap ent-section" id="evaluation">
        <Eyebrow>Evaluation</Eyebrow>
        <h2 className="lp-h2">See it running before you talk to anyone.</h2>
        <p className="lp-sub">There is no separate trial edition. What you deploy to evaluate is the exact software that runs in production — nothing crippled, nothing hidden behind a call.</p>
        <div className="ent-journey">
          <div className="ent-journey-step">
            <span className="n">1</span>
            <h3>Deploy an evaluation instance</h3>
            <p>One command brings up the full stack — application, database, and a guided setup wizard. See your own organization, roles, and first AI connection in minutes.</p>
            <code className="ent-inline-cmd">curl -fsSL https://openbean.xyz/install | bash</code>
          </div>
          <div className="ent-journey-step">
            <span className="n">2</span>
            <h3>Request an architecture review</h3>
            <p>Bring your deployment target, compliance requirements, and AI tool inventory. We&rsquo;ll walk through how OpenBean fits your infrastructure, not a generic deck.</p>
            <a className="btn btn-sm" href={`${EVAL}`}>Schedule a review</a>
          </div>
          <div className="ent-journey-step">
            <span className="n">3</span>
            <h3>Move to production</h3>
            <p>Take what you validated in evaluation and deploy it as your organization&rsquo;s system of record — same code, your infrastructure, your data from day one.</p>
            <a className="btn btn-sm" href={CONTACT}>Talk to us</a>
          </div>
        </div>
      </section>

      {/* ── professional services ────────────────────────────────────── */}
      <section className="wrap ent-section" id="services">
        <Eyebrow>Professional services</Eyebrow>
        <h2 className="lp-h2">Deployment support for organizations that want a second set of eyes.</h2>
        <p className="lp-sub">
          OpenBean is designed to be run by your own engineers — the entire engine is
          open source and documented. For teams that want help with a production rollout, we
          work directly with your infrastructure and security teams.
        </p>
        <div className="ent-services-grid">
          <div><h3>Architecture review</h3><p>A working session against your actual deployment target, tenancy model, and compliance requirements — with a written memo at the end.</p><a className="lp-foot-link" href={`${SERVICES}#architecture-review`}>What&rsquo;s in the memo →</a></div>
          <div><h3>Deployment support</h3><p>Hands-on help standing up your first production instance, ending when your team can run <code>doctor</code>, <code>backup</code>, and <code>restore</code> on its own.</p><a className="lp-foot-link" href={`${SERVICES}#deployment-support`}>The exit condition →</a></div>
          <div><h3>Migration guidance</h3><p>Bringing existing organizational knowledge — wikis, Slack, prior AI context — into a governed instance, with the gate policy decided up front.</p><a className="lp-foot-link" href={`${SERVICES}#migration-guidance`}>How it works →</a></div>
        </div>
        <p className="lp-foot-cta">
          <a className="btn" href={SERVICES}>See the full service catalog</a>
        </p>
      </section>

      {/* ── faq ───────────────────────────────────────────────────────── */}
      <section className="wrap ent-section" id="faq">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="lp-h2">Straight answers, including the ones that aren&rsquo;t finished yet.</h2>
        <div className="ent-faq">
          <div className="ent-faq-row">
            <h3>Is there a hosted or cloud version?</h3>
            <p>No, and there will not be one. OpenBean is self-hosted permanently, by design — there is no OpenBean cloud account for your organization&rsquo;s knowledge to live in.</p>
          </div>
          <div className="ent-faq-row">
            <h3>Can we deploy fully on our own infrastructure, air-gapped?</h3>
            <p>Architecturally, yes — nothing in the design is tied to a specific cloud vendor. Today&rsquo;s fully documented and tested path is the application plus a Postgres database you provision and hold the credentials to. A from-scratch, zero-external-dependency deployment guide is active work, named honestly as not finished rather than implied to already exist.</p>
          </div>
          <div className="ent-faq-row">
            <h3>What happens to our data if OpenBean the company stops existing?</h3>
            <p>Nothing happens to it. It was never on our infrastructure. Your Postgres database, your application deployment, and your credentials keep working exactly as they do today.</p>
          </div>
          <div className="ent-faq-row">
            <h3>How is tenant isolation enforced?</h3>
            <p>By Postgres row-level security, not application-level filtering alone — the same enforcement layer the database itself relies on, proven by an adversarial test suite required on every change.</p>
          </div>
          <div className="ent-faq-row">
            <h3>Is the source available for our security team to review?</h3>
            <p>All of it. The engine, the governance gate, the RLS policies, and the MCP protocol implementation are MIT licensed in the public repository — not a summary of the architecture, the architecture itself.</p>
          </div>
          <div className="ent-faq-row">
            <h3>Which AI tools are supported?</h3>
            <p>Any client that speaks the Model Context Protocol. Verified directly with Claude Code and Cursor; the protocol is open, so this list is not a gate.</p>
          </div>
        </div>
      </section>

      {/* ── final cta ─────────────────────────────────────────────────── */}
      <section className="lp-final">
        <div className="wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mark" src="/mark.png" alt="" width={52} height={52} />
          <h2>Your knowledge. <span className="m3">Your policies. Your infrastructure.</span></h2>
          <p>
            Deploy an evaluation instance in minutes, or talk to us first — either way, you&rsquo;re
            looking at the same software that will run in production.
          </p>
          <div className="lp-cta">
            <a className="btn btn-primary lp-btn-lg" href={CONTACT}>Talk to us</a>
            <a className="btn lp-btn-lg" href={`${GH}#quickstart`}>Deploy an evaluation instance</a>
          </div>
          <p className="lp-trust">
            <span>MIT licensed</span>
            <span>self-hosted, permanently</span>
            <span>openbean.xyz</span>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
