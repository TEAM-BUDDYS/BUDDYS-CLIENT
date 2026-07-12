---
name: domain-feature-workflow
description: BUDDYS-CLIENT의 특정 제품 도메인에 속하는 컴포넌트, 훅, 상태 로직과 사용자 흐름을 구현하거나 검토합니다. 새 route가 중심이 아닌 도메인 기능, domain-local component, hook, model 또는 flow의 위치와 경계를 결정할 때 사용합니다.
---

# 도메인 기능 구현

## Read First

- `docs/architecture/app-structure.md`
- `docs/conventions/conventions.md`
- 대상 도메인과 가까운 기존 코드

## Workflow

1. 기능의 소유 domain과 완료 기준을 확인합니다.
2. domain 이름이 실제 요구사항으로 확정된 경우에만 `src/domains/{domain}`을 생성합니다.
3. component, hook, API, model 중 현재 기능에 필요한 파일만 추가합니다.
4. 화면 조합, 상태 로직, 데이터 변환의 책임을 나눕니다.
5. 브라우저 기능이 필요한 가장 작은 경계에만 `"use client"`를 추가합니다.
6. 다른 domain과의 직접 의존을 피하고 공통 기반은 `shared` 경계를 검토합니다.
7. 실제 재사용이 확인되지 않은 코드를 미리 `shared`로 이동하지 않습니다.
8. `verify-frontend`로 변경 범위에 맞게 검증합니다.

## Placement

```txt
src/domains/{domain}/
  assets/
  components/
  hooks/
  api/
  model/
```

위 구조를 전부 생성하지 않습니다. 기능 복잡도와 가까운 기존 패턴에 필요한 위치만 사용하며, 도메인이 커지면 실제 필요에 따라 하위 기능 폴더를 추가합니다.

## Shared Decision

공통화 판단은 `docs/architecture/app-structure.md`의 `Commonization Rules`를 따릅니다.

기준을 충족하기 전에는 코드를 소유 domain에 유지하고, 제품 의미가 포함된 코드를 형태가 비슷하다는 이유만으로 이동하지 않습니다.

## Completion

- 기능 소유권과 의존 방향이 명확합니다.
- route entry와 도메인 로직이 분리되어 있습니다.
- 불필요한 추상화와 빈 디렉터리가 없습니다.
- 필요한 사용자 상태와 오류 처리가 검증되었습니다.
