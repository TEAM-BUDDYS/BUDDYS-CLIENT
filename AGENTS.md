# BUDDYS-CLIENT Agent Guide

이 문서는 BUDDYS-CLIENT에서 작업하는 AI agent의 진입점입니다. 상세 규칙을 중복해서 적지 않고 작업에 필요한 원본 문서와 Skill을 연결합니다.

## Repository

- Product: 교환학생 매칭 서비스 BUDDYS
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS
- Package manager: pnpm
- Jira key: `BDYFE-*`
- Base branch: `develop`
- Application code: `src`

## Default Workflow

1. `repo-orientation`으로 요청, 브랜치, 변경사항, 관련 문서와 기존 코드를 확인합니다.
2. `frontend-task-workflow`으로 작업 유형과 필요한 구현 Skill을 선택합니다.
3. 페이지, 도메인 기능, 공통 컴포넌트, API 중 해당 Skill로 변경 위치와 Server/Client 경계를 결정하고 구현합니다.
4. 구조 영향이 있으면 `architecture-review` 기준으로 의존 방향과 공통화 범위를 확인합니다.
5. `verify-frontend`로 변경 범위에 맞는 정적 검사와 화면 동작을 검증합니다.
6. 구현 내용, 실행한 검증과 남은 위험을 정리합니다.

사용자가 계획, 분석, 리뷰만 요청한 경우 구현을 시작하지 않습니다.
작은 변경에는 필요한 단계만 비례해서 적용하고 불필요한 Skill 호출이나 긴 계획을 강제하지 않습니다.

## Source Of Truth

- 문서 인덱스: `docs/index.md`
- 저장소 구조: `docs/architecture/repo-structure.md`
- 앱 구조와 의존 방향: `docs/architecture/app-structure.md`
- 스타일링: `docs/architecture/styling.md`
- 코딩 컨벤션: `docs/conventions/conventions.md`
- Git과 Jira 규칙: `docs/conventions/git.md`
- 개발 작업 절차: `docs/workflows/*`
- Agent Harness 운영: `docs/agent/*`

문서와 실제 코드가 다르면 현재 코드를 확인하고 관련 문서도 함께 갱신합니다.

## Skill Routing

| Task | Skill | Supporting document |
| --- | --- | --- |
| 저장소 파악 | `repo-orientation` | `docs/index.md` |
| 프론트엔드 작업 분류와 진행 | `frontend-task-workflow` | `docs/workflows/feature-development.md` |
| 페이지 또는 라우트 | `page-feature-workflow` | `docs/architecture/app-structure.md` |
| 도메인 기능, 컴포넌트 또는 훅 | `domain-feature-workflow` | `docs/architecture/app-structure.md` |
| 공통 UI 또는 layout 컴포넌트 | `shared-component-workflow` | `docs/architecture/app-structure.md` |
| API 연동 | `api-integration-workflow` | `docs/architecture/app-structure.md` |
| 구조와 의존 방향 검토 | `architecture-review` | `docs/architecture/app-structure.md` |
| 구현 검증 | `verify-frontend` | `docs/workflows/verification.md` |
| 문서, 설정 또는 GitHub Actions | `verify-frontend` | 가까운 Source of Truth와 기존 파일 |

## Architecture Principles

- `src/app`은 route, layout, metadata, route handler 같은 Next.js 경계로 사용합니다.
- 제품 기능은 `src/domains/{domain}`에 둡니다.
- 여러 도메인에서 실제로 재사용되는 코드만 `src/shared`에 둡니다.
- 외부 라이브러리 설정과 작은 기반 helper는 `src/lib`에 둡니다.
- 기본 page와 layout은 Server Component로 유지하고 브라우저 기능이 필요한 경계만 Client Component로 전환합니다.
- 의존 방향은 `app -> domains -> shared -> lib`을 따릅니다.

세부 기준은 `docs/architecture/app-structure.md`를 따릅니다.

## Editing Principles

- 기존 패턴과 가까운 코드를 먼저 확인합니다.
- 요청과 무관한 리팩터링을 섞지 않습니다.
- 재사용 가능성만으로 공통화를 진행하지 않습니다.
- 확정되지 않은 도메인 폴더, 라이브러리, 데이터 계층을 문서만으로 강제하지 않습니다.
- 비밀값과 실제 환경변수 값을 커밋하지 않습니다.
- 사용자 변경사항을 임의로 되돌리지 않습니다.

## Verification

문서만 변경한 경우:

```bash
git diff --check
```

코드를 변경한 경우 기본 후보:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

모든 명령을 무조건 실행하지 않고 `docs/workflows/verification.md`에 따라 변경 범위와 위험에 맞게 선택합니다. 실행하지 못한 검증은 이유와 잔여 위험을 보고합니다.

## Completion

- 요청의 완료 기준을 충족했는지 확인합니다.
- 구조나 규칙을 바꿨다면 관련 문서도 갱신합니다.
- 임시 코드, 사용하지 않는 import, 디버그 출력이 남지 않았는지 확인합니다.
- 최종 응답에는 변경 요약, 검증 결과, 필요한 후속 설정만 남깁니다.
