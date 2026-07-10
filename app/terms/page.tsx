import { EnterprisePageShell } from "@/app/ui/home";

export const metadata = {
  title: "Terms of Service — OpenBean",
  description: "The terms for using the openbean.xyz marketing website. The OpenBean engine itself is separately MIT licensed.",
};

export default function TermsPage() {
  return (
    <EnterprisePageShell>
      <div className="ob-wrap ob-doc-wrap">
        <div className="ob-doc-hero">
          <p className="ob-eyebrow">Legal</p>
          <h1 className="ob-h1">Terms of Service</h1>
          <p className="ob-lead">Last updated: July 2026.</p>
          <p className="ob-lead">
            These terms cover your use of the openbean.xyz marketing website. They are
            separate from the license on the OpenBean engine itself.
          </p>
        </div>

        <div className="ob-doc-list">
          <article className="ob-doc-card">
            <h2>The website</h2>
            <p className="ob-doc-summary" style={{ marginBottom: 0 }}>
              This site is informational: it describes OpenBean, the professional services
              catalog, and how to get in touch. Use it like you would any other company
              website — don&rsquo;t attempt to disrupt it, scrape it at abusive volume, or use
              it to attack other systems.
            </p>
          </article>

          <article className="ob-doc-card">
            <h2>The OpenBean engine has its own license</h2>
            <p className="ob-doc-summary" style={{ marginBottom: 0 }}>
              The OpenBean engine — the software your organization deploys and runs — is
              MIT licensed. That license, not this page, governs
              your right to use, modify, and redistribute the software.
            </p>
          </article>

          <article className="ob-doc-card">
            <h2>No warranty on the website&rsquo;s content</h2>
            <p className="ob-doc-summary" style={{ marginBottom: 0 }}>
              We keep this site accurate to the best of our ability, and correct mistakes we
              find. It is provided as-is, without a warranty of any kind, to the extent the
              law allows.
            </p>
          </article>

          <article className="ob-doc-card">
            <h2>Professional services engagements</h2>
            <p className="ob-doc-summary" style={{ marginBottom: 0 }}>
              Services described on this site (see <a href="/services">/services</a>) are
              each governed by the written agreement signed for that specific engagement, not
              by this page.
            </p>
          </article>

          <article className="ob-doc-card">
            <h2>Changes to these terms</h2>
            <p className="ob-doc-summary" style={{ marginBottom: 0 }}>
              If we change these terms, we update the date at the top of this page. Continued
              use of the site after a change means you accept the updated terms.
            </p>
          </article>

          <article className="ob-doc-card">
            <h2>Questions</h2>
            <p className="ob-doc-summary" style={{ marginBottom: 0 }}>
              Email hello@openbean.xyz.
            </p>
          </article>
        </div>
      </div>
    </EnterprisePageShell>
  );
}
