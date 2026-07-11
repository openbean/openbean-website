// Demo layout — puts every demo page inside the `.ob` scope.
//
// This one wrapper is load-bearing: every --ob-* design token (colors,
// lines, panels) is defined on the `.ob` class in enterprise-base.css.
// The demo pages previously rendered OUTSIDE that scope, so every
// var(--ob-*) reference in demo.css and the page markup silently
// resolved to nothing — cards had no backgrounds, buttons no colors,
// chips no fills. The demo looked like plain text on black not because
// it was designed that way, but because its design system never loaded.

import type { ReactNode } from "react";
import "@/app/ui/demo/demo.css";

export default function DemoLayout({ children }: { children: ReactNode }) {
  return <div className="ob ob-demo-shell">{children}</div>;
}
