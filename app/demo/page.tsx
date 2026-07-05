// The V14 Enterprise Demo page — the read-only, anonymized, 3-step walkthrough
// of the Company Brain experience for a CEO. The page is a marketing surface,
// not a live instance. The actual live demo (with a seeded Halberd Robotics
// instance) is the local OpenBean instance seeded by `scripts/seed-demo.mjs`
// in the engine repo; this page is the explainer that a CEO can read in 3
// minutes without signing in.

import { EnterprisePageShell } from "@/app/ui/home";

export const metadata = {
  title: "Enterprise Demo — OpenBean",
  description:
    "See the Company Brain in action, with a real company's data. A 3-step walkthrough of how a growing company uses OpenBean to govern what its AI tools know, approve what matters, and audit everything.",
  keywords: [
    "OpenBean demo",
    "Company Brain demo",
    "AI knowledge management demo",
    "enterprise AI demo",
    "self-hosted AI demo",
  ],
  openGraph: {
    title: "Enterprise Demo — OpenBean",
    description:
      "See the Company Brain in action, with a real company's data.",
    type: "website",
    url: "https://openbean.xyz/demo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Demo — OpenBean",
    description: "See the Company Brain in action, with a real company's data.",
  },
  alternates: { canonical: "https://openbean.xyz/demo" },
  robots: { index: true, follow: true },
};

const REQUEST_DEMO = "/contact?intent=demo";
const EVAL = "/evaluation-program";

export default function DemoPage() {
  return (
    <EnterprisePageShell>
      <div className="ob-wrap ob-doc-wrap">
        <div className="ob-doc-hero">
          <p className="ob-eyebrow">Enterprise Demo</p>
          <h1 className="ob-h1">
            See the Company Brain in action, with a real company’s data.
          </h1>
          <p className="ob-lead">
            The Enterprise Demo is a 3-step walkthrough of how a growing
            company uses OpenBean. The data is real (a fictional contract
            manufacturer called <strong>Halberd Robotics</strong>, 50
            employees, 4 departments, 6 projects). The screens are the
            real screens. The audit log is a real database log. No sales
            call required.
          </p>
        </div>

        <section className="ob-doc-section" id="story">
          <h2 className="ob-h2">The story the demo tells</h2>
          <p>
            Halberd Robotics is a 50-person contract manufacturer. Their AI
            tools — Claude Code for engineering, Cursor for code review, an
            internal RAG for cross-functional knowledge — all read from
            and write to the same Company Brain. Every important decision
            is reviewed by a person. The full history is kept forever. The
            demo walks through one typical Tuesday at Halberd:
          </p>
          <ol>
            <li>
              <strong>A new sales rep joins.</strong> She signs in to the
              Company Brain and the dashboard shows her what the company
              has already agreed is true. She does not have to ask anyone.
            </li>
            <li>
              <strong>The engineering team’s AI proposes a pricing change.</strong>{" "}
              The pricing is important enough that the Company Brain holds
              it in the approval queue until the pricing manager signs off.
            </li>
            <li>
              <strong>The pricing manager reviews the proposal.</strong> She
              sees the reasoning, the trust score, the full chain of
              custody. She approves.
            </li>
            <li>
              <strong>Every other AI tool sees the change.</strong> The
              next time anyone — in any department — asks the AI about
              pricing, the answer is the approved one.
            </li>
            <li>
              <strong>An auditor asks who approved a contract clause.</strong>{" "}
              Six months later. The answer is one query against the audit
              log.
            </li>
          </ol>
        </section>

        <section className="ob-doc-section" id="screens">
          <h2 className="ob-h2">The screens the demo shows</h2>
          <p>The demo walks through five screens, in order:</p>
          <ol>
            <li>
              <strong>The home dashboard.</strong> A count of the knowledge
              pieces proposed this week, a count of the important ones
              waiting for a person’s approval, a count of the AI tools
              connected, a count of the warnings about knowledge below the
              trust threshold.
            </li>
            <li>
              <strong>A single piece of knowledge, in full provenance.</strong>{" "}
              The proposer (which AI tool), the project, the importance
              level, the trust score, the full text, the chain of
              custody.
            </li>
            <li>
              <strong>The approval queue.</strong> Every important change
              waiting for a person’s decision. One click to approve, one
              click to retract, one click to see the full reasoning.
            </li>
            <li>
              <strong>The full knowledge store.</strong> Every piece of
              company knowledge, with filters by department, project,
              importance, and trust. The full history is one click away.
            </li>
            <li>
              <strong>The operations surface.</strong> Health, backups,
              storage, updates, logs, diagnostics, notifications.
              Everything the IT team needs to operate the Company Brain is
              in the browser.
            </li>
          </ol>
        </section>

        <section className="ob-doc-section" id="data">
          <h2 className="ob-h2">The data the demo uses</h2>
          <p>
            The Halberd Robotics seed data is realistic: a working
            contract manufacturer with active projects, an active sales
            pipeline, an active operations schedule, and a working
            compliance program. The seed produces:
          </p>
          <ul>
            <li>1 organization (Halberd Robotics)</li>
            <li>4 departments (Engineering, Operations, Sales, Compliance)</li>
            <li>6 projects (Atlas, Beacon, Compass, Drift, Echo, Forge)</li>
            <li>18 employees (1 owner, 2 admins, 15 members)</li>
            <li>~120 pieces of company knowledge across 8 categories</li>
            <li>24 important changes waiting for a person’s approval</li>
            <li>3 active AI tool connections (Claude Code, Cursor, internal RAG)</li>
          </ul>
          <p>
            The seed is idempotent and resettable. See the{" "}
            <a href="#reset">reset procedure</a>.
          </p>
        </section>

        <section className="ob-doc-section" id="reset">
          <h2 className="ob-h2">Resettable in one command</h2>
          <p>
            The demo is resettable. The seed script produces the same
            state every time it runs, so a fresh demo is one command
            away:
          </p>
          <pre><code>node scripts/seed-demo.mjs --reset</code></pre>
          <p>
            The seed script refuses to run against a non-localhost URL.
            The seed is a development tool, not a production tool.
          </p>
        </section>

        <section className="ob-doc-section" id="next-steps">
          <h2 className="ob-h2">Next steps after the demo</h2>
          <div className="ob-doc-grid">
            <article>
              <h3>Request a live demo with your data</h3>
              <p>
                The maintainer team will run a live walkthrough of the
                Company Brain with your company’s actual data (a
                sanitized sample, not your production data). The
                walkthrough takes 30 minutes and is the closest you can
                get to a real evaluation without standing up your own
                instance.
              </p>
              <p>
                <a className="ob-btn ob-btn-primary" href={REQUEST_DEMO}>
                  Request a live demo
                </a>
              </p>
            </article>
            <article>
              <h3>Start the Evaluation Program</h3>
              <p>
                The Evaluation Program is a 4–6 week path with five
                named gates. The maintainer team commits to the timeline
                in the Discovery brief; the next step is named at every
                gate, regardless of whether the evaluation concludes
                with a yes or a no.
              </p>
              <p>
                <a className="ob-btn" href={EVAL}>Read the Evaluation Program</a>
              </p>
            </article>
            <article>
              <h3>Stand up your own instance</h3>
              <p>
                OpenBean is open source, self-hosted, and ships with a
                single-command installer. The same software that runs
                the demo runs in your environment, with your database,
                your credentials, and your audit log.
              </p>
              <p>
                <a
                  className="ob-btn"
                  href="https://github.com/openbean/openbean"
                  target="_blank"
                  rel="noreferrer"
                >
                  See the install guide on GitHub
                </a>
              </p>
            </article>
          </div>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">Related pages</h2>
          <ul>
            <li><a href="/services">Professional Services</a> — the named engagements the maintainer team offers.</li>
            <li><a href={EVAL}>Evaluation Program</a> — the 4–6 week path with five named gates.</li>
            <li><a href="/pricing">Pricing philosophy</a> — why there is no price on the page, and the four-step path to a quote.</li>
            <li><a href="/security">Security</a> — the one-page summary for a security reviewer.</li>
          </ul>
        </section>
      </div>
    </EnterprisePageShell>
  );
}
