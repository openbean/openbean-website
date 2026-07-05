import "@/app/ui/home/enterprise-home.css";
import {
  EnterpriseNav,
  HeroSection,
  ProblemSolutionSection,
  IndustryStrip,
  WhyOpenBeanGrid,
  FinalCTA,
  EnterpriseFooter,
} from "@/app/ui/home";

export default function Home() {
  return (
    <div className="ob">
      <EnterpriseNav />
      <HeroSection />
      <IndustryStrip />
      <ProblemSolutionSection />
      <WhyOpenBeanGrid />
      <FinalCTA />
      <EnterpriseFooter />
    </div>
  );
}
