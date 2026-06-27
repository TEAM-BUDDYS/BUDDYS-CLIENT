---
name: architecture-review
description: BUDDYS-CLIENT의 파일 위치, domain/shared 소유권, App Router 경계, Server/Client Component 분리와 의존 방향을 검토합니다. 폴더 구조 변경, 공통화, 새 추상화, 코드 리뷰 또는 리팩터링 판단에 사용합니다.
---

# 아키텍처 리뷰

## Source Of Truth

- `docs/architecture/repo-structure.md`
- `docs/architecture/app-structure.md`
- 변경 대상과 가까운 기존 코드

## Review Order

1. 기능의 소유 도메인이 명확한지 확인합니다.
2. `src/app`에 비즈니스 로직이 과하게 들어갔는지 확인합니다.
3. `shared`가 특정 domain을 참조하거나 특정 기능에 종속됐는지 확인합니다.
4. 실제 재사용 없이 공통화된 코드가 있는지 확인합니다.
5. `"use client"` 경계가 필요 이상으로 넓은지 확인합니다.
6. 새 abstraction이 복잡도를 실제로 줄이는지 확인합니다.
7. 구조 변경이 문서와 일치하는지 확인합니다.

## Dependency Rules

허용:

```txt
app -> domains -> shared -> lib
app -> shared
```

금지:

```txt
domains -> app
shared -> domains
lib -> domains
lib -> app
```

## Commonization Decision

공통화 판단은 `docs/architecture/app-structure.md`의 `Commonization Rules`를 따릅니다.

리뷰에서는 `shared` 이동 근거가 실제 사용처에서 확인되는지와 선택한 소유 위치가 의존 방향에 맞는지 검증합니다.

## Review Output

코드 리뷰 요청에서는 문제를 심각도 순으로 작성합니다.

```markdown
- [P1/P2/P3] 문제 제목
- 근거 파일과 위치
- 현재 위험
- 수정 방향
```

문제가 없으면 명확히 말하고 남은 검증 공백만 기록합니다.
