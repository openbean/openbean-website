# OpenBean Website

The public website for OpenBean — a governed, append-only memory layer
for AI tools.

This repository is one of three in the OpenBean project:

- **[openbean/openbean](https://github.com/openbean/openbean)** — the engine, the CLI, the SDK, the database, the tests. The source of truth.
- **[openbean/openbean-website](https://github.com/openbean/openbean-website)** — this repository. The public site.
- **[openbean/openbean-docs](https://github.com/openbean/openbean-docs)** — the public documentation.

## What this is

A Next.js 15 App Router site, statically prerendered, no backend. The
receptionist at `/contact` posts a structured intake to
`mailto:hello@openbean.xyz`; the rest of the site is plain
documentation. There is no analytics SDK, no third-party tracker,
no telemetry. The site exists to be read.

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # 8 routes, all statically prerendered
npm run typecheck
npm run check:copy
npm run check:links
```

## What ships here

| Route | Purpose |
|---|---|
| `/` | The enterprise landing page. |
| `/contact` | The AI Receptionist structured intake. |
| `/evaluation-program` | The five-gate evaluation path. |
| `/case-studies` | The publishability charter and the eight-section template. |
| `/faq` | Sixteen enterprise FAQ answers. |
| `/services` | The Professional Services catalog (nine engagements). |
| `/apple-icon.png`, `/icon.png` | Favicons. |
| `/install`, `/install.ps1` | The platform installers. |

## What does NOT ship here

- The engine. `packages/engine/` is the engine's home in the
  `openbean/openbean` repo, not here.
- The CLI. `packages/cli/` is the CLI's home, not here.
- The SDK. `packages/sdk/` is the SDK's home, not here.
- Engineering documentation. `docs/architecture/`, `docs/specs/`,
  `docs/thesis/`, `docs/research/`, `docs/roadmap/`, and
  `docs/dogfood/` are in the engine repo, not here. The
  `docs/enterprise/` and `docs/product/` trees are mirrored
  to the `openbean-docs` repo; they are also kept here as the
  source of truth the build pulls from until the post-push
  redirect changes land.

## Deployment

The site is deployed to Vercel. The configuration is
`vercel.json` at the repo root. Production deploys require
human approval; preview deploys are automatic on PR.

## License

Same as the engine: see `LICENSE`.
