import { IconFinance, IconLegal, IconHealthcare, IconManufacturing, IconGovernment, IconEducation } from "./icons";

const INDUSTRIES = [
  { label: "Finance", icon: IconFinance },
  { label: "Legal", icon: IconLegal },
  { label: "Healthcare", icon: IconHealthcare },
  { label: "Manufacturing", icon: IconManufacturing },
  { label: "Government", icon: IconGovernment },
  { label: "Education", icon: IconEducation },
];

export function IndustryStrip() {
  return (
    <section className="ob-wrap">
      <div className="ob-industry-card">
        <p className="ob-industry-heading">
          Trusted by teams who<br />
          <span className="ob-accent">value accuracy and control</span>
        </p>
        <div className="ob-industry-row">
          {INDUSTRIES.map(({ label, icon: Icon }) => (
            <div className="ob-industry-item" key={label}>
              <Icon width={26} height={26} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
