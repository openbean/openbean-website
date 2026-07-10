// Regenerates public/downloads/latest.json from the newest GitHub Release.
//
// The engine repo's release pipeline (openbean/openbean
// .github/workflows/release.yml) builds native installers and attaches a
// release-manifest.json (schema openbean.release-manifest.v1) to every
// tagged release. This script pulls that manifest down so the website's
// /download page — which reads public/downloads/latest.json at build
// time — always describes the latest release.
//
// Run manually after a release, or wire it into CI ahead of `next build`:
//   node scripts/update-release-manifest.mjs
//
// Exits 0 without touching the file when no release is reachable (repo
// private, no releases yet, network down) so builds never break on it.

import { writeFileSync } from "node:fs";

const REPO = process.env.OPENBEAN_RELEASE_REPO ?? "openbean/openbean";
const OUT = new URL("../public/downloads/latest.json", import.meta.url);

const headers = { "User-Agent": "openbean-website-manifest-refresh" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers });
if (!res.ok) {
  console.log(`No reachable release for ${REPO} (HTTP ${res.status}) — keeping the committed manifest.`);
  process.exit(0);
}
const release = await res.json();
const manifestAsset = (release.assets ?? []).find((a) => a.name === "release-manifest.json");
if (!manifestAsset) {
  console.log(`Release ${release.tag_name} has no release-manifest.json asset — keeping the committed manifest.`);
  process.exit(0);
}
const manifestRes = await fetch(manifestAsset.browser_download_url, { headers });
if (!manifestRes.ok) {
  console.log(`Could not download release-manifest.json (HTTP ${manifestRes.status}) — keeping the committed manifest.`);
  process.exit(0);
}
const manifest = await manifestRes.json();
writeFileSync(OUT, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${release.tag_name} manifest (${manifest.artifacts?.length ?? 0} artifacts) to public/downloads/latest.json`);
