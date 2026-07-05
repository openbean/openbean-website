// The V15 Enterprise Demo — Company view. The full company profile, the 7
// departments, the 6 active projects, and the company-level stats.

import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { COMPANY, PROJECTS, PEOPLE, SEED_STATS } from "@/app/demo/data/northwind";

export const metadata = {
  title: "The Company — Northwind on OpenBean",
  description:
    "Northwind Manufacturing on OpenBean. 60 people, 7 departments, 6 active projects, ~200 pieces of company knowledge, 5 AI tool connections. A real mid-sized company.",
  alternates: { canonical: "https://openbean.xyz/demo/company" },
  robots: { index: true, follow: true },
};

const DEPT_LIST = [
  { name: "Executive", color: "var(--ob-decision)" },
  { name: "HR", color: "var(--ob-people)" },
  { name: "Sales", color: "var(--ob-trust)" },
  { name: "Operations", color: "#8a6a3a" },
  { name: "Finance", color: "#4a5a6a" },
  { name: "IT", color: "#2b5a6e" },
  { name: "Engineering", color: "#3a6b3a" },
] as const;

export default function DemoCompanyPage() {
  return (
    <>
      <DemoBar active="company" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The company</p>
              <h1>{COMPANY.name}</h1>
              <p className="lede">{COMPANY.description}</p>
              <div className="ob-demo-quick" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                <div className="ob-demo-quick-stat">
                  <p className="label">Founded</p>
                  <p className="value" style={{ fontSize: "1.2rem" }}>{COMPANY.founded}</p>
                </div>
                <div className="ob-demo-quick-stat">
                  <p className="label">Headquarters</p>
                  <p className="value" style={{ fontSize: "1.2rem" }}>{COMPANY.headquarters}</p>
                </div>
                <div className="ob-demo-quick-stat">
                  <p className="label">Employees</p>
                  <p className="value">{SEED_STATS.people}</p>
                </div>
                <div className="ob-demo-quick-stat">
                  <p className="label">Annual revenue</p>
                  <p className="value" style={{ fontSize: "1.2rem" }}>{COMPANY.annualRevenue}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Departments</h2>
            <p className="lede">
              Northwind has 7 departments. Every person, every project, and
              every piece of knowledge is attached to a department. The
              Company Brain is the cross-department view of the company&apos;s
              shared knowledge.
            </p>
            <div className="ob-brain-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {DEPT_LIST.map((d) => {
                const count = PEOPLE.filter((p) => p.department === d.name).length;
                return (
                  <div key={d.name} className="ob-brain-card" style={{ cursor: "default" }}>
                    <p className="question" style={{ fontSize: "1rem", color: d.color }}>{d.name}</p>
                    <p className="body">{count} people</p>
                  </div>
                );
              })}
              <div className="ob-brain-card" style={{ cursor: "default" }}>
                <p className="question" style={{ fontSize: "1rem" }}>Total</p>
                <p className="body">{PEOPLE.length} people across {DEPT_LIST.length} departments</p>
              </div>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>Active projects</h2>
            <p className="lede">
              Northwind is in the middle of a multi-year modernization
              program. The 6 active projects are the work that the company
              is doing right now.
            </p>
            <div className="ob-scenarios">
              {PROJECTS.map((proj) => {
                const owner = PEOPLE.find((p) => p.id === proj.owner);
                return (
                  <div key={proj.id} className="ob-scenario-card">
                    <p className="num">PROJECT</p>
                    <h3>{proj.name}</h3>
                    <p>{proj.description}</p>
                    <p className="role">Owner: {owner?.name ?? "—"}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
