// The V14 Security one-pager for a security reviewer. The full security model
// is in the engine repo's docs/architecture/OPENBEAN.md §12 and
// docs/enterprise/ARCHITECTURE_OVERVIEW.md. Every claim on this page is
// verifiable against the public source; the "Sources" section at the bottom
// links each claim to the canonical document. V14 applies the new
// positioning layer to the metadata.

import { EnterprisePageShell } from "@/app/ui/home";

export const metadata = {
  title: "Security — OpenBean, the AI Transformation Platform",
  description:
    "How OpenBean protects your company's knowledge. The Company Brain runs on your infrastructure, with your database, your credentials, and your audit log. Every claim is verifiable against the public source.",
  keywords: [
    "OpenBean security",
    "AI Transformation Platform security",
    "Company Brain security",
    "Enterprise Memory Platform security",
    "self-hosted AI security",
    "AI governance security",
  ],
  openGraph: {
    title: "Security — OpenBean",
    description:
      "How OpenBean protects your company's knowledge. Every claim is verifiable against the public source.",
    type: "website",
    url: "https://openbean.xyz/security",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security — OpenBean",
    description:
      "How OpenBean protects your company's knowledge.",
  },
  alternates: { canonical: "https://openbean.xyz/security" },
};

const CONTACT = "/contact?intent=security-review";
const SERVICES = "/services#security-review";

export default function SecurityPage() {
  return (
    <EnterprisePageShell>
      <div className="ob-wrap ob-doc-wrap">
        <div className="ob-doc-hero">
          <p className="ob-eyebrow">Security · one-pager</p>
          <h1 className="ob-h1">The one-sentence summary.</h1>
          <p className="ob-lead">
            OpenBean is a self-hosted engine. The database it writes to is
            your database. The infrastructure it runs on is your
            infrastructure. The credentials it uses are your credentials.
            There is no OpenBean cloud account that holds a copy of your
            company’s knowledge.
          </p>
        </div>

        <section className="ob-doc-section">
          <h2 className="ob-h2">What you control</h2>
          <ul>
            <li>
              <strong>The database.</strong> A database you provision,
              with credentials only your team holds. OpenBean writes
              through a per-deployment system credential you rotate.
            </li>
            <li>
              <strong>The application.</strong> A web app and an
              AI-connection server you deploy, on infrastructure you
              choose (VPS, on-premise, Vercel + hosted database, fully
              air-gapped).
            </li>
            <li>
              <strong>The credentials.</strong> The API keys your AI
              tools use, the per-member sign-in credentials, the
              system-level credential for the engine, and the rotation
              cadence for all of the above.
            </li>
            <li>
              <strong>The audit log.</strong> The knowledge log is
              append-only, enforced by a database rule, not by application
              code. The rule cannot be bypassed by any code path through
              the engine.
            </li>
            <li>
              <strong>The compliance posture.</strong> The compliance
              posture of your OpenBean deployment is the compliance
              posture of your infrastructure, not the posture of OpenBean
              the project.
            </li>
          </ul>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">What OpenBean the project does</h2>
          <ul>
            <li>
              <strong>The engine.</strong> MIT-licensed source. The same
              source the maintainer team ships is the source that runs in
              your instance.
            </li>
            <li>
              <strong>The governance gate.</strong> A write gate in front
              of every change: route → classify → plan. Every change is
              classified by structural type before it is stored.
            </li>
            <li>
              <strong>The high-stakes approval queue.</strong> Configurable
              approval rules: which categories are always held for a
              person to approve, which accumulate versus replace, and the
              confidence line below which a change is set aside for review.
            </li>
            <li>
              <strong>The per-company wall.</strong> Database-level
              isolation between companies, enforced at the database
              layer, not by application filtering.
            </li>
            <li>
              <strong>The adversarial test suite.</strong> 40+ checks,
              required status check on every change, including a
              forged-credential attempt, a cross-company read attempt, and
              a system-bypass attempt.
            </li>
          </ul>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">What the project does not do</h2>
          <ul>
            <li>
              The project does not run a cloud service that holds a copy
              of your data.
            </li>
            <li>
              The project does not phone home, telemetry, or analytics
              from your instance.
            </li>
            <li>
              The project does not bundle a proprietary tier, a paid
              add-on, or a feature that lives in a separate,
              source-inaccessible repository.
            </li>
            <li>
              The project does not provide a hosted or managed deployment.
              Self-hosting is the design, not an option.
            </li>
          </ul>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">Threat model</h2>
          <ul>
            <li>
              <strong>An AI tool overreaches its scope.</strong> A
              per-connection identity (local) or a hashed, revocable API
              key checked on every request (remote). Revocation takes
              effect on the very next request, on every access path.
            </li>
            <li>
              <strong>A change is written without a human’s review.</strong>{" "}
              The high-stakes category list (pricing, contract terms,
              deployment targets, API key references, customer commitments)
              is held for review. The reviewer is a human with the right
              role, verified server-side on every request.
            </li>
            <li>
              <strong>A change is mutated or deleted after the fact.</strong>{" "}
              Append-only by a database rule. The rule is on the table
              itself; the engine has no UPDATE or DELETE permission
              against it.
            </li>
            <li>
              <strong>One company’s data is visible to another.</strong>{" "}
              Per-company isolation at the database layer. The wall is
              verified by an adversarial test that uses a forged
              credential, on every change.
            </li>
            <li>
              <strong>A forged credential is accepted.</strong>{" "}
              Cryptographically signed, expiry-verified, constant-time-
              compared. A forged credential is rejected before any other
              check runs.
            </li>
            <li>
              <strong>A member’s identity is fabricated.</strong> The
              session’s company identity is only ever minted from a
              verified membership row. A session credential alone is not
              sufficient.
            </li>
            <li>
              <strong>A bug in application code bypasses the gate.</strong>{" "}
              The gate runs in the same transaction as the change. A
              failed gate is a rolled-back transaction, not a logged
              failure.
            </li>
          </ul>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">Compliance posture</h2>
          <p>
            OpenBean is an MIT-licensed engine operated by your engineering
            team on your infrastructure. The compliance posture of your
            OpenBean deployment is the compliance posture of your
            infrastructure.
          </p>
          <p>
            For a SOC 2 / HIPAA / ISO 27001 attestation, the third-party
            attestation is yours to commission on your own deployment. The
            Professional Services catalog has a{" "}
            <a href={SERVICES}>Security Review</a> that walks your team’s
            security questionnaire against OpenBean’s documented
            properties. The review is a written memo, not a certification.
          </p>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">Disclosures</h2>
          <ul>
            <li>
              <strong>Public security advisories.</strong>{" "}
              <code>SECURITY.md</code> in the public{" "}
              <a
                href="https://github.com/openbean/openbean-docs/blob/main/SECURITY.md"
                target="_blank"
                rel="noreferrer"
              >
                openbean-docs
              </a>{" "}
              repository.
            </li>
            <li>
              <strong>Vulnerability reporting.</strong>{" "}
              <code>SECURITY.md</code> in the public{" "}
              <a
                href="https://github.com/openbean/openbean-docs/blob/main/SECURITY.md"
                target="_blank"
                rel="noreferrer"
              >
                openbean-docs
              </a>{" "}
              repository. The
              maintainer team responds within one business day to a
              private report.
            </li>
            <li>
              <strong>Known limitations.</strong> A named Known
              Limitations document — every limitation named, with a
              workaround and a target iteration — is shared with every
              evaluating team. Ask for it via <a href="/contact">contact</a>.
            </li>
            <li>
              <strong>Roadmap for security work.</strong> Named in each
              iteration&rsquo;s completion report, shared with evaluating
              teams alongside the Known Limitations document.
            </li>
          </ul>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">Sources (verify the claims)</h2>
          <ul>
            <li>
              <a
                href="https://github.com/openbean/openbean-docs/blob/main/docs/ARCHITECTURE_OVERVIEW.md"
                target="_blank"
                rel="noreferrer"
              >
                Architecture one-pager
              </a>
            </li>
            <li>
              <a
                href="https://github.com/openbean/openbean-docs/blob/main/docs/DEPLOYMENT_GUIDES.md"
                target="_blank"
                rel="noreferrer"
              >
                Deployment guides
              </a>
            </li>
            <li>
              Engine spec, AI identity lifecycle, and the adversarial
              acceptance suite — shared in source form with evaluating
              teams under the <a href="/evaluation-program">evaluation
              program</a>.
            </li>
            <li>
              <a href={SERVICES}>Professional Services — Security Review</a>
            </li>
          </ul>
        </section>

        <div className="ob-doc-cta">
          <h2 className="ob-h2">Contact</h2>
          <p>
            <a className="ob-btn ob-btn-primary ob-btn-lg" href={CONTACT}>
              Request a security review
            </a>{" "}
            <a className="ob-btn ob-btn-lg" href="/contact">General contact</a>
          </p>
        </div>
      </div>
    </EnterprisePageShell>
  );
}
