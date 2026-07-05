// The Case Studies page — the structure for future case studies, with a
// charter that names the conditions under which a case study is
// publishable. The page is honest about its current state: OpenBean does not
// have named customers to feature, and the maintainer team is not going to
// invent one. The page is the template future case studies will fill.

import { EnterprisePageShell } from "@/app/ui/home";

export const metadata = {
  title: "Case Studies — OpenBean, the AI Transformation Platform",
  description:
    "The case study template and the publishability charter. The Company Brain is OpenBean's flagship product; the case studies that follow are the structure future engagements will fill.",
  keywords: [
    "OpenBean case studies",
    "Company Brain case studies",
    "AI Transformation Platform case studies",
  ],
  openGraph: {
    title: "Case Studies — OpenBean",
    description: "The case study template and the publishability charter.",
    type: "website",
    url: "https://openbean.xyz/case-studies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — OpenBean",
    description: "The case study template and the publishability charter.",
  },
  alternates: { canonical: "https://openbean.xyz/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <EnterprisePageShell>
      <div className="ob-wrap ob-doc-wrap">
        <div className="ob-doc-hero">
          <p className="ob-eyebrow">Case studies</p>
          <h1 className="ob-h1">The structure for case studies we will write, with the customers we do not yet have.</h1>
          <p className="ob-lead">
            OpenBean is available self-hosted or as managed hosting, and the engine itself
            is MIT-licensed. The maintainer team is small. We do not yet have named, public
            case studies of organizations running OpenBean in production — the product is
            recent, most deployments so far have been private, and inventing one would
            be the wrong move. This page is the structure future case studies will fill,
            and the conditions under which one is publishable.
          </p>
        </div>

        <div className="ob-doc-list">
          <article className="ob-doc-card">
            <h2>When a case study is publishable</h2>
            <p className="ob-doc-summary">
              A case study is publishable when the customer organization has agreed in
              writing to be named, has approved the draft in writing, and the case study
              describes a real deployment, not a synthetic or hypothetical one.
            </p>
            <div className="ob-doc-grid">
              <div>
                <h3>Named customer</h3>
                <p>
                  The customer organization has agreed in writing to be named in the case
                  study. The default is anonymous; only an explicit, written approval moves
                  a case study from anonymous to named.
                </p>
              </div>
              <div>
                <h3>Approved draft</h3>
                <p>
                  The customer has reviewed the draft, has approved it in writing, and
                  has the right to require changes before publication. The draft is not
                  a marketing brochure; it is a factual account of what was deployed, how,
                  and what changed.
                </p>
              </div>
              <div>
                <h3>Real deployment</h3>
                <p>
                  The case study describes a deployment that actually happened. A
                  synthetic or hypothetical case study — even one that would be useful as
                  a marketing artifact — is not publishable, and the maintainer team
                  will not invent one.
                </p>
              </div>
            </div>
          </article>

          <article className="ob-doc-card">
            <h2>The case study template</h2>
            <p className="ob-doc-summary">
              Every published case study has the same eight sections, in order, so an
              evaluator comparing two case studies is comparing two deployments, not two
              marketing artifacts.
            </p>
            <div className="ob-doc-grid">
              <div>
                <h3>1 · Organization</h3>
                <p>
                  Industry, company size band (per the AI Receptionist's bands), the team
                  that ran the evaluation, the decision makers, and the success criteria
                  the team set for itself.
                </p>
              </div>
              <div>
                <h3>2 · Problem</h3>
                <p>
                  The specific, named problem the organization was trying to solve. Not
                  "AI memory in general," but the named gap in the organization's
                  governance or operations that the deployment was meant to close.
                </p>
              </div>
              <div>
                <h3>3 · Deployment target</h3>
                <p>
                  Where OpenBean runs, the compliance regime, the AI tool inventory, the
                  gate policy, and the named scope of the deployment. The deployment
                  target is named at a level of specificity that another organization
                  can pattern-match against.
                </p>
              </div>
              <div>
                <h3>4 · Migration</h3>
                <p>
                  What knowledge the organization brought in, how, and what the migration's
                  outcome looked like. A migration that did not happen is also a
                  publishable fact.
                </p>
              </div>
              <div>
                <h3>5 · Governance model</h3>
                <p>
                  Which predicates the organization configures as high-stakes, the trust
                  floor, the accumulate / supersede policy, and the role distribution
                  across the team.
                </p>
              </div>
              <div>
                <h3>6 · Operational shape</h3>
                <p>
                  Who runs the instance, on what schedule, with what backup and recovery
                  cadence, and what the on-call rotation looks like.
                </p>
              </div>
              <div>
                <h3>7 · What changed</h3>
                <p>
                  The measured or observed change in the team's day-to-day work: how
                  long it took to onboard a new engineer to the team's decisions, how
                  often the same question got answered twice, the time saved by a
                  named search behavior, and so on. An honest accounting includes the
                  things that did not change.
                </p>
              </div>
              <div>
                <h3>8 · What we would do differently</h3>
                <p>
                  The named, honest list of things the organization would do differently
                  the next time. A case study that does not include this section is
                  marketing copy, not a case study.
                </p>
              </div>
            </div>
          </article>

          <article className="ob-doc-card">
            <h2>What is on this page today</h2>
            <p className="ob-doc-summary">
              Nothing. The page is the structure for the case studies we will write, and
              the charter under which we will write them. We will populate this page
              when a customer organization has agreed to be named, has approved a draft,
              and the case study describes a real deployment.
            </p>
            <div className="ob-doc-grid">
              <div>
                <h3>If you would like to publish a case study with us</h3>
                <p>
                  The right engagement is the Professional Services Health Check or Pilot
                  Program service, with the case-study publishability added as an explicit
                  deliverable. Start with the structured intake.
                </p>
              </div>
              <div>
                <h3>If you would prefer to stay anonymous</h3>
                <p>
                  The case study can be published with the organization described in
                  terms of its industry, size band, and deployment shape, without being
                  named. The eight sections above are unchanged.
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="ob-doc-cta">
          <p>The first case study will be published when the conditions above are met.</p>
          <a className="ob-btn ob-btn-primary ob-btn-lg" href="/contact">Talk to us about a case study</a>
        </div>
      </div>
    </EnterprisePageShell>
  );
}
