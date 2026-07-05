import type { ReactNode } from "react";
import "./enterprise-doc.css";
import { EnterpriseNav } from "./EnterpriseNav";
import { EnterpriseFooter } from "./EnterpriseFooter";

export function EnterprisePageShell({ children }: { children: ReactNode }) {
  return (
    <div className="ob">
      <EnterpriseNav />
      <main className="ob-doc">{children}</main>
      <EnterpriseFooter />
    </div>
  );
}
