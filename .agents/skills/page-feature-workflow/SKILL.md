---
name: page-feature-workflow
description: BUDDYS-CLIENT의 Next.js App Router 페이지, route, layout과 화면 흐름을 구현하거나 검토합니다. 새 페이지, 동적 route, route-local UI, loading/error/empty 상태, Server/Client Component 경계를 다루는 작업에 사용합니다.
---

# 페이지 기능 구현

## Read First

- `docs/architecture/app-structure.md`
- `docs/conventions/conventions.md`
- 대상 route와 가까운 기존 코드

## Workflow

1. route와 사용자 진입 경로를 확인합니다.
2. `src/app`에는 route entry와 Next.js 경계만 두고 제품 기능은 `src/domains/{domain}`에 둡니다.
3. 기본 page와 layout은 Server Component로 시작합니다.
4. state, event handler, effect, browser API가 필요한 가장 작은 경계에만 `"use client"`를 추가합니다.
5. loading, empty, error, disabled, success 상태를 요구사항에 맞게 처리합니다.
6. route-local 코드는 실제 재사용이 확인되기 전까지 해당 도메인이나 flow 안에 둡니다.
7. 접근성, 반응형, 긴 텍스트, navigation 동작을 확인합니다.
8. `verify-frontend`로 마무리합니다.

## Placement

```txt
src/app/{route}/page.tsx
src/domains/{domain}/{flow}/
  components/
  hooks/
  api/
  model/
```

정확한 하위 구조는 기능 복잡도와 기존 패턴에 맞게 조정합니다. 비어 있는 디렉터리를 미리 만들지 않습니다.

## Requirement Check

새 route나 주요 화면에서는 다음 내용을 Jira와 제공된 자료에서 확인합니다.

- route와 navigation
- loading, empty, error, disabled, success 상태
- API와 사용자 상호작용
- 권한과 완료 후 이동
- 모바일과 데스크톱 조건

필요한 내용이 없고 저장소에서도 확인할 수 없다면 구현 전에 질문합니다.

## Completion

- route와 layout이 의도대로 동작합니다.
- 불필요한 Client Component 경계가 없습니다.
- 주요 상태와 접근성이 확인되었습니다.
- 도메인과 shared 소유권이 명확합니다.
