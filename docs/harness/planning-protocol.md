# Planning Protocol

The phrase `개발 계획을 수립해` starts the planning protocol.

## Inputs

Claude Code must read:

- `docs/product/PRD.md`
- `docs/product/FRD.md`
- `docs/product/TRD.md`
- `STATUS.md`

If any product document is empty or clearly incomplete, Claude Code should ask for the missing requirement instead of inventing product scope.

## Outputs

Planning must create or update:

- `docs/plans/YYYY-MM-DD-<slug>-development-plan.md`
- `docs/stories/<epic-id>/<story-id>.md`
- `STATUS.md`

## Plan Shape

Each plan must include:

- Goal and non-goals
- Assumptions
- Architecture impact
- Supabase impact
- Vercel impact
- Epic list
- Story list per Epic
- Story dependencies
- Suggested implementation order
- TDD notes
- Validation commands
- Risks and rollback notes

## Story Shape

Each Story must include:

- ID
- Parent Epic
- Dependency list
- User value
- Acceptance criteria
- TDD plan
- Implementation notes
- Validation checklist
- Status log

## Status Rules

`STATUS.md` is the live handoff. Update it whenever:

- a plan is created
- a Story starts
- a failing test is added
- implementation is complete
- validation fails
- validation passes
- a Story is done
- scope changes

Keep the status concise. It should help a resumed Claude Code session continue without reading every prior conversation.
