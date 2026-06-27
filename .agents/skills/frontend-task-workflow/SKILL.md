---
name: frontend-task-workflow
description: BUDDYS-CLIENT의 프론트엔드 요청을 페이지, 도메인 기능, 공통 컴포넌트, API, 구조 검토와 검증 흐름으로 분류합니다. 여러 유형이 섞인 기능 구현이나 작업 범위와 검증 수준을 결정해야 할 때 사용합니다.
---

# 프론트엔드 작업 흐름

## Input

- 작업 목표와 완료 기준
- Jira 또는 요구사항
- 대상 route, domain, 기존 기능
- 기대 산출물: 코드, 문서, 리뷰, 검증

필수 정보가 저장소 탐색으로도 확인되지 않으면 구현 전에 질문합니다.

## Routing

| Work | Skill |
| --- | --- |
| 새 작업의 저장소 맥락 확인 | `repo-orientation` |
| 페이지, route, UI flow | `page-feature-workflow` |
| 도메인 기능, component, hook, model | `domain-feature-workflow` |
| 여러 도메인의 공통 UI 또는 layout | `shared-component-workflow` |
| API 요청과 상태 연결 | `api-integration-workflow` |
| 폴더 위치, 의존 방향, 공통화 판단 | `architecture-review` |
| 구현 후 검사 | `verify-frontend` |
| 문서 변경 | 가까운 Source of Truth와 `verify-frontend` |
| 설정 또는 GitHub Actions | 기존 설정과 `verify-frontend` |

## Workflow

1. `repo-orientation`으로 현재 구조와 기존 패턴을 확인합니다.
2. `docs/workflows/feature-development.md`에서 구현 순서를 확인합니다.
3. 페이지, 도메인 기능, 공통 컴포넌트, API 중 핵심 작업 Skill을 선택합니다.
4. 복잡하거나 애매한 요구사항은 Jira와 제공된 자료에서 상태와 완료 기준을 확인합니다.
5. 구현 후 `verify-frontend`로 검증합니다.
6. 구현 내용과 검증 결과를 정리합니다.

## Planning Output

큰 작업에서만 아래 형식으로 계획을 작성합니다.

```markdown
## Frontend Work Plan

- Goal:
- Scope:
- Related paths:
- Skill:
- Verification:
- Open questions:
```

## Rules

- 단순 수정에는 긴 계획을 강제하지 않습니다.
- 여러 유형이 섞이면 핵심 구현 Skill을 먼저 적용하고 검증 Skill로 마무리합니다.
- 전용 Skill이 없는 문서나 설정 작업은 가까운 Source of Truth와 기존 파일 패턴을 우선합니다.
- 사용자가 구현을 원하면 계획만 제시하고 멈추지 않습니다.
