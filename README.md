# OpenBean Website

The public website for OpenBean — https://openbean.xyz. OpenBean makes
sure a company never loses what it knows.

This repository is one of three in the OpenBean project:

- **`openbean/openbean-website`** — this repository. The public site.
- **`openbean/openbean-docs`** — the public documentation.
- **`openbean/openbean`** — the engine, the CLI, the SDK, the database, the tests. The source of truth. **Not publicly accessible** (the engine workspace is private; the MIT-licensed engine sources, the CLI, the SDK, and the tests are distributed to enterprise customers under the standard enterprise license, not via a public GitHub mirror).

## What this is

A Next.js 15 App Router site, statically exported (`output: "export"`),
no backend. The receptionist at `/contact` posts a structured intake to
`mailto:hello@openbean.xyz`; the demo at `/demo` runs entirely on a
build-time seeded dataset. There is no analytics SDK, no third-party
tracker, no telemetry. The site exists to be read.

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to out/
npm run typecheck
npm run check:copy   # banned engine vocabulary in visible copy
npm run check:links  # internal links, images, imports resolve
```

## What ships here

| Route | Purpose |
|---|---|
| `/` | The enterprise landing page. |
| `/download` | The download page — one-command installs + release artifacts. |
| `/demo`, `/demo/*` | The seeded, read-only product demo (Northwind). |
| `/discovery` | The 12-step discovery intake wizard. |
| `/contact` | The AI Receptionist structured intake. |
| `/evaluation-program` | The five-gate evaluation path. |
| `/case-studies` | The publishability charter and the eight-section template. |
| `/faq` | The enterprise FAQ. |
| `/services` | The Professional Services catalog. |
| `/pricing`, `/security`, `/privacy`, `/terms` | Policy and posture pages. |

## The installer contract

These URLs are load-bearing — released installers, the engine README,
and third-party documentation fetch them. Never remove or rename them
without redirects:

| URL | What it serves |
|---|---|
| `/install`, `/server`, `/server-install.sh` | The production installer launcher (POSIX). Downloads the `openbean-server-bundle` from the release and runs `openbean-server install`. |
| `/install.ps1`, `/server-install.ps1` | The production installer launcher (Windows PowerShell). |
| `/install-ubuntu.sh` | Source-checkout install tuned for fresh Ubuntu / WSL. |
| `/dev-install`, `/dev-install.ps1` | The developer source-checkout install. Not the customer path. |
| `/download` | The download page. |
| `/downloads/latest.json` | The release manifest (`openbean.release-manifest.v1`). Refresh with `node scripts/update-release-manifest.mjs` after a release. |

All are static files in `public/` (plus one prerendered page); the URL
is the file path. `vercel.json` sets cache and content-type headers for
them, and security headers site-wide.

## Deployment

The site is deployed to Vercel via Git integration; `openbean.xyz`
serves this repository (the apex 308-redirects to `www.openbean.xyz`).
Production deploys require human approval; preview deploys are
automatic on PR. CI (`.github/workflows/ci.yml`) runs typecheck, build,
copy check, and link check on every push and PR.

## License

Same as the engine: see `LICENSE`.
