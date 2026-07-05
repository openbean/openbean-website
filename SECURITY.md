# Security Policy

## Reporting a vulnerability

**Please do not open public issues for security problems.** Report privately:

- Email **security@openbean.dev** with affected version, reproduction, and impact
- (Maintainers may also open a private advisory through the maintainer team's internal GitHub workflow.)

We aim to acknowledge within **3 business days** and to ship a fix or mitigation for
confirmed high-severity issues within **30 days**, coordinating disclosure with you.

## What to scrutinize

OpenBean's security rests on a small number of invariants, each proven by the acceptance
suite (`packages/engine/scripts/acceptance.ts`):

- **Append-only** — claims are never mutated/deleted (RLS grants + the `claims_append_only`
  trigger). CHECK 4/4b/5d.
- **Scope isolation** — RLS partitions claims by scope; reads/writes sealed to granted
  scopes. CHECK 5b/5c.
- **Tenant isolation** — RLS partitions by tenant; the tenant wall composes with the scope
  wall on both the authenticated and service_role paths. CHECK 6/8.
- **Trust root** — `tenant_id` in a session JWT is only ever minted from a verified
  membership; identity comes only from the verified token. CHECK 9/10.
- **No matview leak** — `current_belief` is never readable on the authenticated path. CHECK 12.

A report demonstrating a breach of any of these is high-severity.

## Supported versions

The latest minor release receives security fixes. Older minors are best-effort.
