import { Footer, TopBar } from "@/app/ui";

export const metadata = {
  title: "Terms of Service — OpenBean",
  description: "The terms for using the openbean.xyz marketing website. The OpenBean engine itself is separately MIT licensed.",
};

export default function TermsPage() {
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
            <a href="/services">Services</a>
            <a className="btn" href="/contact">Talk to us</a>
          </nav>
        }
      />
      <main className="lp-services">
        <p className="ent-eyebrow">Legal</p>
        <h1>Terms of Service</h1>
        <p className="lede">Last updated: July 2026.</p>
        <p className="lede">
          These terms cover your use of the openbean.xyz marketing website. They are
          separate from the license on the OpenBean engine itself.
        </p>

        <div className="lp-svc-list">
          <article className="lp-svc">
            <h2>The website</h2>
            <p className="summary">
              This site is informational: it describes OpenBean, the professional services
              catalog, and how to get in touch. Use it like you would any other company
              website — don&rsquo;t attempt to disrupt it, scrape it at abusive volume, or use
              it to attack other systems.
            </p>
          </article>

          <article className="lp-svc">
            <h2>The OpenBean engine has its own license</h2>
            <p className="summary">
              The OpenBean engine — the software your organization deploys and runs — is
              MIT licensed in the public repository. That license, not this page, governs
              your right to use, modify, and redistribute the software.
            </p>
          </article>

          <article className="lp-svc">
            <h2>No warranty on the website&rsquo;s content</h2>
            <p className="summary">
              We keep this site accurate to the best of our ability, and correct mistakes we
              find. It is provided as-is, without a warranty of any kind, to the extent the
              law allows.
            </p>
          </article>

          <article className="lp-svc">
            <h2>Professional services engagements</h2>
            <p className="summary">
              Services described on this site (see <a href="/services">/services</a>) are
              each governed by the written agreement signed for that specific engagement, not
              by this page.
            </p>
          </article>

          <article className="lp-svc">
            <h2>Changes to these terms</h2>
            <p className="summary">
              If we change these terms, we update the date at the top of this page. Continued
              use of the site after a change means you accept the updated terms.
            </p>
          </article>

          <article className="lp-svc">
            <h2>Questions</h2>
            <p className="summary">Email hello@openbean.xyz.</p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
