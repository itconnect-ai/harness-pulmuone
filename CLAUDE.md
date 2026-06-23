# Claude Code Rules

This repository is Claude Code only. Do not create Cursor, Codex, or multi-agent specific workflows unless the user explicitly changes that constraint.

## Read Order

1. Read this file.
2. For Next.js implementation, read the relevant local guide under `node_modules/next/dist/docs/` before changing app code.
3. For planning work, read `.claude/skills/plan-development/SKILL.md`.
4. For product work, read `docs/product/PRD.md`, `docs/product/FRD.md`, and `docs/product/TRD.md`.
5. For active work, read `STATUS.md` and the active plan in `docs/plans/`.

## Planning Contract

When the user says `개발 계획을 수립해`, do not jump directly into implementation.

Required behavior:

1. Inspect PRD, FRD, and TRD.
2. Create or update a dependency-aware Epic > Story development plan in `docs/plans/`.
3. Create Story files under `docs/stories/`.
4. Update `STATUS.md` with the current plan, next Story, risks, and validation state.
5. Ask for implementation approval unless the user also explicitly asked you to implement.

During development, update `STATUS.md` at minimum when a Story starts, when tests are added, when implementation is complete, when validation passes or fails, and when a Story is done.

## Engineering Standards

- Use Next.js App Router with TypeScript.
- Keep Server Components as the default. Add Client Components only for browser APIs, state, or event handlers.
- Use Supabase through `@supabase/ssr` and `@supabase/supabase-js`.
- Use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for browser-safe Supabase access. Do not introduce legacy anon keys for new work.
- Do not commit real secrets. Use `.env.local` for fast local development. Add the same required public env vars to Vercel only when deployment is being prepared.
- Keep implementation changes scoped to the active Story.
- Prefer simple, agent-legible modules over clever abstractions.

## TDD And Testing

Use TDD for behavior that can regress:

1. Add or adjust the smallest useful failing test.
2. Implement the behavior.
3. Run focused validation.
4. Broaden validation before marking a Story done.

Avoid low-value test volume. Do not add snapshot-heavy, implementation-detail, or duplicate tests just to increase count.

## Validation

Use these commands:

```powershell
pnpm validate:quick
pnpm validate
```

`validate:quick` runs lint, typecheck, and unit tests. `validate` additionally checks formatting and production build.

## Vercel And Supabase

Vercel is the deployment platform, so do not add GitHub Actions CI/CD by default. Local development happens first with `.env.local`; Vercel environment variables are required when deployment is prepared. Supabase is the database and auth platform.

Required local public env vars:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

If a future Story needs server-only Supabase operations, add the needed private env var to `.env.example` with an empty placeholder and document it in the Story.

Before Vercel deployment, make sure the Vercel project has the same public Supabase variables registered for the intended environments. Do not read or print real secret values while checking this.

## Git Hygiene

- Preserve user changes.
- Stage only intended files.
- Include validation evidence in final reports.
- If publishing to GitHub, verify local `HEAD`, `origin/main`, and remote `main` parity after push.
