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
    <section className="ob-section ob-industry">
      <div className="ob-wrap">
        <h2 className="ob-h2" style={{ marginInline: "auto", maxWidth: 640 }}>
          Trusted by teams who value accuracy and control
        </h2>
        <div className="ob-industry-grid">
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
