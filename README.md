# harness-pulmuone

Pulmuone 프로젝트를 Claude Code로만 개발하기 위한 harness engineering 저장소입니다.

## 1. 프로젝트 열기

사용자가 할 일:

- 이 저장소를 로컬에서 엽니다.
- Claude Code를 이 저장소 루트에서 실행합니다.

Claude Code에 입력할 프롬프트:

```text
이 저장소의 CLAUDE.md를 먼저 읽고, 현재 프로젝트 준비 상태를 간단히 확인해줘.
내가 다음에 무엇을 입력해야 하는지도 알려줘.
```

## 2. Supabase 준비

사용자가 할 일:

- Supabase 프로젝트를 만듭니다.
- Project URL과 Publishable key를 확인합니다.
- 로컬 `.env.local`과 Vercel 환경 변수에 아래 값을 넣습니다.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Claude Code에 입력할 프롬프트:

```text
Supabase 연결 준비 상태를 확인해줘.
실제 비밀값은 읽거나 출력하지 말고, 필요한 환경 변수 이름과 누락 여부만 알려줘.
```

## 3. 제품 문서 작성

사용자가 할 일:

- `docs/product/PRD.md`를 채웁니다.
- `docs/product/FRD.md`를 채웁니다.
- `docs/product/TRD.md`를 채웁니다.

Claude Code에 입력할 프롬프트:

```text
docs/product/PRD.md, docs/product/FRD.md, docs/product/TRD.md를 읽고
기획에 필요한 내용이 충분한지 점검해줘.
부족한 내용은 개발자가 아닌 사람도 답할 수 있게 질문으로 정리해줘.
아직 개발은 시작하지 마.
```

## 4. 개발 계획 수립

사용자가 할 일:

- PRD, FRD, TRD가 충분히 채워졌는지 확인합니다.

Claude Code에 입력할 프롬프트:

```text
개발 계획을 수립해
```

Claude Code가 해야 할 일:

- Epic > Story 구조로 계획을 작성합니다.
- Story 의존성과 구현 순서를 정리합니다.
- 계획을 `docs/plans/`에 저장합니다.
- Story 문서를 `docs/stories/`에 저장합니다.
- 현재 상태를 `STATUS.md`에 기록합니다.
- 사용자가 구현을 승인하기 전에는 개발을 시작하지 않습니다.

## 5. 개발 시작

사용자가 할 일:

- Claude Code가 만든 계획을 읽고 구현을 시작할 Story를 승인합니다.

Claude Code에 입력할 프롬프트:

```text
STATUS.md에 기록된 첫 번째 Story부터 개발을 시작해.
Story 문서를 먼저 읽고, TDD 방식으로 진행해.
진행 상황은 STATUS.md에 계속 기록해.
필요한 검증은 네가 알아서 실행하고, 실패하면 원인을 고친 뒤 다시 확인해.
```

## 6. Story 완료 확인

사용자가 할 일:

- Claude Code의 완료 보고를 확인합니다.
- 다음 Story로 넘어갈지 승인합니다.

Claude Code에 입력할 프롬프트:

```text
현재 Story가 완료되었는지 확인해줘.
완료 기준, 변경 파일, 검증 결과, 남은 위험을 간단히 정리해줘.
문제가 없으면 STATUS.md를 다음 Story 기준으로 갱신해줘.
```

## 7. Epic 완료 확인

사용자가 할 일:

- Epic 전체가 끝났는지 확인합니다.
- 배포 전 점검이 필요하면 Claude Code에 요청합니다.

Claude Code에 입력할 프롬프트:

```text
현재 Epic이 완료되었는지 확인해줘.
모든 Story 상태, 검증 결과, Supabase 영향, Vercel 배포 시 확인할 점을 정리해줘.
반복된 문제나 다음 Epic에서 조심할 점이 있으면 harness 문서에 반영해줘.
```

## 개발 원칙

- Claude Code만 사용합니다.
- 계획은 구현 전에 문서화합니다.
- 계획은 Epic > Story 구조로 작성합니다.
- Story는 의존성과 순서를 고려합니다.
- 개발 진행 상태는 `STATUS.md`에 계속 기록합니다.
- 구현은 TDD 방식으로 시작합니다.
- 과도한 테스트는 만들지 않습니다.
- Linting, formatting, typecheck, test, build는 Claude Code가 필요한 시점에 실행합니다.
- Vercel을 사용하므로 별도 GitHub Actions CI/CD는 기본으로 만들지 않습니다.
- Supabase는 Publishable key 기반으로 연동하고, Secret key는 서버 전용으로만 다룹니다.
- 실제 비밀값은 파일에 커밋하지 않습니다.

## 문서 지도

| 문서                                  | 목적                                          |
| ------------------------------------- | --------------------------------------------- |
| `CLAUDE.md`                           | Claude Code가 매 세션 읽는 최상위 규칙        |
| `.claude/skills/plan-development/`    | `개발 계획을 수립해` 명령 처리 규칙           |
| `.claude/settings.json`               | Claude Code hooks와 프로젝트 공용 설정        |
| `docs/harness/research-2026-06-24.md` | 2026-06-24 기준 harness engineering 조사 요약 |
| `docs/harness/planning-protocol.md`   | 계획, Story, STATUS 운영 규칙                 |
| `docs/harness/validation.md`          | Claude Code가 실행할 검증 규칙                |
| `docs/harness/hooks.md`               | Claude Code hook 설명                         |
| `docs/product/`                       | PRD, FRD, TRD 입력 위치                       |
| `docs/plans/`                         | 개발 계획 산출물 위치                         |
| `docs/stories/`                       | Story 산출물 위치                             |
| `STATUS.md`                           | 현재 계획, Story, 검증 상태 기록              |
