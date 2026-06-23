---
name: plan-development
description: Use when the user says "개발 계획을 수립해" or asks Claude Code to create a development plan from PRD, FRD, and TRD. Produces documented Epic > Story plans and updates STATUS.md before implementation.
---

# Plan Development Skill

Use this skill when the user asks for development planning, especially with the Korean trigger:

```text
개발 계획을 수립해
```

## Required Inputs

Read these files first:

1. `CLAUDE.md`
2. `docs/harness/planning-protocol.md`
3. `docs/product/PRD.md`
4. `docs/product/FRD.md`
5. `docs/product/TRD.md`
6. `STATUS.md`

If PRD, FRD, or TRD is empty, placeholder-only, or contradictory, ask for the missing information before creating a plan.

## Required Outputs

Create or update:

1. `docs/plans/YYYY-MM-DD-<short-slug>-development-plan.md`
2. `docs/stories/<epic-id>/<story-id>.md`
3. `STATUS.md`

## Planning Rules

- Write plans as Epic > Story.
- Include dependency order.
- Include TDD notes per Story.
- Include Supabase and Vercel impact.
- Include validation commands.
- Include risks, rollback notes, and open questions.
- Do not implement unless the user explicitly asks for implementation in the same request.

## Epic Format

Each Epic must include:

- Epic ID, such as `E1`
- Goal
- Dependencies
- Ordered Stories
- Definition of done
- Validation gate

## Story Format

Each Story must include:

- Story ID, such as `E1-S1`
- Parent Epic
- Dependencies
- User value
- Acceptance criteria
- TDD plan
- Implementation outline
- Validation checklist
- Status log

## STATUS.md Update Rules

When the plan is created:

- Set active plan path.
- Set active Epic and Story to the first planned item.
- Add next action.
- Add known risks and open questions.
- Add a dated log entry.

During implementation:

- Update at Story start.
- Update after adding the failing test.
- Update after implementation.
- Update after validation pass or fail.
- Update when a Story is complete.

Keep status concise enough for future Claude Code sessions to resume quickly.
