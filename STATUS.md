# STATUS

## Current

- Active plan: none
- Active Epic: none
- Active Story: none
- State: scaffold initialized for local-first development with current Supabase security defaults and minimal Claude Code hooks
- Next action: fill `docs/product/PRD.md`, `docs/product/FRD.md`, and `docs/product/TRD.md`, then tell Claude Code `개발 계획을 수립해`

## Validation

- Last `pnpm validate:quick`: passed on 2026-06-24
- Last `pnpm validate`: passed on 2026-06-24

## Decisions

- Claude Code only.
- Plans are documented before implementation.
- Story progress is tracked in this file.
- Vercel handles deployment, so no separate GitHub Actions CI/CD is included by default.
- Supabase is the database/auth platform.
- Supabase uses the publishable key naming for new projects.
- Local development uses `.env.local` first; Vercel environment variables are registered when deployment is prepared.
- Claude Code hooks block likely secret-file access and format edited files.

## Log

- 2026-06-24: Initial harness scaffold created.
- 2026-06-24: Updated Supabase configuration to publishable key naming, switched Proxy auth refresh to `getClaims()`, added minimal Claude Code hooks, and rewrote README as user steps plus prompts.
- 2026-06-24: Clarified the local-first workflow: Supabase is connected through `.env.local` during development, and Vercel environment variables are deferred until deployment preparation.
