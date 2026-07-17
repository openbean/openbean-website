// The public download page — the end of the website's journey and the
// start of the customer's. The build-time manifest (public/downloads/latest.json,
// schema openbean.release-manifest.v1) seeds the first paint; DownloadContent
// then refreshes the version + installer list CLIENT-SIDE from GitHub's
// releases/latest, so the page stays aligned with the newest release without
// editing the site or redeploying per release. The install/verify commands are
// copy-pasteable (see CopyBlock).

import { EnterprisePageShell } from "@/app/ui/home";
import manifest from "@/public/downloads/latest.json";
import { DownloadContent, type ReleaseManifest } from "./DownloadContent";

export const metadata = {
  title: "Download OpenBean — install on your own server",
  description:
    "Get OpenBean running on your own server in minutes. One command on macOS, Linux, or Windows. Your company's knowledge stays on infrastructure you control.",
  openGraph: {
    title: "Download OpenBean",
    description:
      "One command. Your own server. Your company's knowledge under your control.",
    type: "website",
    url: "https://openbean.xyz/download",
  },
  alternates: { canonical: "https://openbean.xyz/download" },
};

export default function DownloadPage() {
  return (
    <EnterprisePageShell>
      <DownloadContent initial={manifest as ReleaseManifest} />
    </EnterprisePageShell>
  );
}
