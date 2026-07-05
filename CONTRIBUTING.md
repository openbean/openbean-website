# Contributing to OpenBean

Thanks for helping! OpenBean's value is its **invariants** (append-only, scope/tenant
isolation, trust root). Every PR must keep them intact.

## The bar for a PR

- **The acceptance suite runs on every PR and is a required status check.** A PR that breaks
  a seal cannot merge. Run it locally first: `npm test`. It brings up its own disposable
  Supabase stack, runs the suite, and tears the stack down again — pass or fail; it never
  touches whatever instance you're running for day-to-day development, so there's no need
  to start or reset anything first.
- Add/adjust acceptance checks when you change engine behavior — especially anything touching
  RLS, the gate, `resolve()`, or the stamp trigger.
- `npm run typecheck` must pass.
- Keep dependencies minimal. New deps are an architectural decision.

## RLS changes get extra scrutiny

RLS is the highest-risk code. Any change to a policy, the stamp trigger, or
grants must: explain each policy in plain English in the PR description, and be covered by an
acceptance check that adversarially proves the seal (see CHECK 5b/6/8/12 for the pattern).

## Maintainer settings (branch protection — configure on the repo)

- **No direct pushes to `main`** — changes land via PR only.
- **Require the `engine-acceptance` status check to pass** before merge.
- **Require review; do not self-merge external PRs.** External contributions are reviewed by
  a maintainer who also confirms the suite passed on a trusted runner.
- Require branches up to date before merge.

## Reporting security issues

Privately — see [SECURITY.md](./SECURITY.md). Do not open public issues for vulnerabilities.
