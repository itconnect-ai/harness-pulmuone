# Validation

This repo uses lightweight validation by default. Add heavier tests only when a Story changes critical behavior or integration risk is high.

## Inner Loop

```powershell
pnpm validate:quick
```

Runs:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`

## Completion Gate

```powershell
pnpm validate
```

Runs:

- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## TDD Rule

For each Story:

1. Write the smallest useful failing test first.
2. Implement the simplest code that satisfies the test and acceptance criteria.
3. Run focused tests.
4. Run `pnpm validate:quick`.
5. Run `pnpm validate` before marking the Story done.

## Avoid Over-Testing

Do not add:

- snapshots for stable static markup unless visual regression risk is real
- duplicate tests for the same branch
- tests that assert private implementation details
- e2e tests for simple presentational changes

Prefer tests around exposed behavior, data boundaries, and user-visible state.
