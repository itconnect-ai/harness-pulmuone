# harness-pulmuone

Pulmuone 프로젝트를 Claude Code로만 운영하기 위한 harness engineering 저장소입니다.
목표는 PRD, FRD, TRD를 넣으면 Claude Code가 계획을 문서화하고, Epic > Story 순서로 개발하며, 진행 중인 상태를 `STATUS.md`에 계속 남기게 하는 것입니다.

## 빠른 시작

```powershell
pnpm install
Copy-Item .env.example .env.local
pnpm dev
```

Supabase 프로젝트를 만든 뒤 `.env.local`과 Vercel 환경 변수에 아래 값을 넣습니다.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Claude Code에서 쓰는 명령

제품 문서를 먼저 채웁니다.

- `docs/product/PRD.md`
- `docs/product/FRD.md`
- `docs/product/TRD.md`

그 다음 Claude Code에 아래처럼 입력합니다.

```text
개발 계획을 수립해
```

Claude Code는 `.claude/skills/plan-development/SKILL.md`를 기준으로 다음 산출물을 만들어야 합니다.

- `docs/plans/YYYY-MM-DD-<slug>-development-plan.md`
- `docs/stories/<epic-id>/<story-id>.md`
- `STATUS.md` 업데이트

## 개발 원칙

- 계획은 항상 Epic > Story 구조로 작성합니다.
- Story는 의존성과 구현 순서를 포함해야 합니다.
- 구현은 TDD 방식으로 시작하되, 위험 대비 가치가 낮은 과도한 테스트는 만들지 않습니다.
- Story 진행 중에는 `STATUS.md`를 갱신합니다.
- Vercel을 사용하므로 별도 GitHub Actions CI/CD는 기본으로 만들지 않습니다.
- 데이터베이스는 Supabase를 사용합니다.

## 검증 명령

```powershell
pnpm validate:quick
pnpm validate
pnpm status:plan
```

`validate:quick`는 개발 중에 사용하고, `validate`는 Story 또는 Epic 완료 전 사용합니다.

## 문서 지도

| 문서                                  | 목적                                          |
| ------------------------------------- | --------------------------------------------- |
| `CLAUDE.md`                           | Claude Code가 매 세션 읽는 최상위 규칙        |
| `docs/harness/research-2026-06-24.md` | 2026-06-24 기준 harness engineering 조사 요약 |
| `docs/harness/planning-protocol.md`   | 계획, Story, STATUS 운영 규칙                 |
| `docs/harness/validation.md`          | TDD, lint, format, build 검증 규칙            |
| `docs/product/`                       | PRD, FRD, TRD 입력 위치                       |
| `docs/plans/`                         | 개발 계획 산출물 위치                         |
| `docs/stories/`                       | Story 산출물 위치                             |

## 배포

Vercel에서 이 GitHub 저장소를 연결하고 Supabase 환경 변수를 추가하면 됩니다. 자동 CI/CD workflow는 별도로 두지 않습니다. Vercel의 Preview/Production deploy가 배포 게이트 역할을 합니다.
