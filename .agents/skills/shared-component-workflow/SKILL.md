---
name: shared-component-workflow
description: BUDDYS-CLIENT에서 여러 도메인이 함께 사용하는 UI 또는 layout 컴포넌트를 구현하거나 검토합니다. `src/shared/components` 추가, 도메인 컴포넌트의 공통화, 공통 컴포넌트 API와 접근성 경계를 판단할 때 사용합니다.
---

# 공통 컴포넌트 구현

## Read First

- `docs/architecture/app-structure.md`
- `docs/architecture/styling.md`
- `docs/conventions/conventions.md`
- 가까운 domain 또는 shared 컴포넌트

구조나 공통화 판단이 필요한 경우 `architecture-review`를 함께 적용합니다.

## Entry Decision

공통화 판단은 `docs/architecture/app-structure.md`의 `Commonization Rules`를 따릅니다.

공통화 기준을 충족한 뒤, 제품 도메인 지식 없이 props와 UI 책임을 설명할 수 있는지 추가로 확인합니다.

조건이 충족되지 않으면 소유 domain 내부에 유지합니다.

## Placement

```txt
src/shared/components/
  ui/
  layout/
```

- 버튼, 입력, 모달처럼 재사용 가능한 UI 요소는 `ui`를 검토합니다.
- 헤더, 내비게이션, 앱 shell처럼 화면 구조를 담당하면 `layout`을 검토합니다.
- 단일 페이지나 domain 전용 section은 shared에 두지 않습니다.

## Workflow

1. 기존 사용처와 중복 구현을 확인합니다.
2. 컴포넌트의 단일 책임과 최소 props를 정의합니다.
3. 특정 domain 이름, 상태, API 타입이 props에 스며들지 않게 합니다.
4. semantic element, keyboard, focus, accessible name을 확인합니다.
5. loading, disabled, error 등 컴포넌트가 소유해야 하는 상태만 처리합니다.
6. Tailwind와 기존 스타일 규칙을 따릅니다.
7. 사용처를 함께 갱신하고 불필요한 중복 코드를 제거합니다.
8. `verify-frontend`로 변경 범위와 화면 동작을 검증합니다.

## Rules

- 미래의 재사용 가능성만으로 만들지 않습니다.
- 하나의 사용처를 위해 과도한 variant나 abstraction을 추가하지 않습니다.
- 서버와 클라이언트 경계를 넓히는 props 설계를 피합니다.
- 디자인 시스템 package가 도입되기 전에는 앱 내부 shared 컴포넌트로 취급합니다.

## Completion

- 공통화 근거와 소유 위치가 명확합니다.
- domain 의존이 없습니다.
- 주요 상태와 접근성이 검증되었습니다.
- 사용하지 않는 이전 구현이 남지 않았습니다.
