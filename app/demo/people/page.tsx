// The V15 Enterprise Demo — People view. The 60 employees of Northwind,
// grouped by department. This is the "who works here" view a CEO would
// want to see first.

import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { PEOPLE, type Department } from "@/app/demo/data/northwind";

export const metadata = {
  title: "The People — Northwind on OpenBean",
  description:
    "The 60 people of Northwind Manufacturing, grouped by department. The CEO and the COO and the CFO and the heads of every function. Real names, real roles, real titles.",
  alternates: { canonical: "https://openbean.xyz/demo/people" },
  robots: { index: true, follow: true },
};

const DEPT_ORDER: Department[] = [
  "Executive",
  "HR",
  "Sales",
  "Operations",
  "Finance",
  "IT",
  "Engineering",
];

export default function DemoPeoplePage() {
  return (
    <>
      <DemoBar active="people" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">The people</p>
              <h1>60 people. 7 departments. 1 company.</h1>
              <p className="lede">
                Northwind&apos;s full org chart. Every person is attached to a
                department, has a role (owner, admin, or member), and is
                linked to the knowledge they author and approve.
              </p>
            </div>
          </section>

          {DEPT_ORDER.map((dept) => {
            const people = PEOPLE.filter((p) => p.department === dept);
            if (people.length === 0) return null;
            return (
              <section className="ob-demo-section" key={dept}>
                <h2>{dept}</h2>
                <p className="lede">
                  {people.length} {people.length === 1 ? "person" : "people"} in {dept.toLowerCase()}.
                </p>
                <div className="ob-people-grid">
                  {people.map((p) => (
                    <div className="ob-person" data-role={p.role} key={p.id}>
                      <p className="name">{p.name}</p>
                      <p className="title">{p.title}</p>
                      <p className="dept">{p.role}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
