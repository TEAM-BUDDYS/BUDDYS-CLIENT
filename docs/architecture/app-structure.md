# App Structure

BUDDYS-CLIENT는 Next.js App Router를 라우팅 경계로 사용하고, 제품 기능 코드는 `src/domains`에 둡니다.

## Base Structure

```txt
src/
  app/
    layout.tsx
    page.tsx
    providers.tsx
    globals.css

  domains/

  shared/
    components/
      ui/
      layout/
    hooks/
    utils/
    api/
    config/
    constants/

  lib/
  types/
```

## Directory Rules

- `app`: route, layout, loading, error, not-found, metadata, route handler를 둡니다.
- `domains`: 제품 도메인 단위 코드를 둡니다. 하위 도메인은 요구사항에 따라 추가합니다.
- `shared`: 여러 도메인에서 실제로 재사용되고 의미와 변경 이유가 같은 코드만 둡니다.
- `lib`: 외부 라이브러리 설정이나 작은 헬퍼를 둡니다.
- `types`: 앱 전체에서 사용하는 공통 타입을 둡니다.

## App Router Rules

- `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`는 Next 파일 convention이므로 `app`에 둡니다.
- `providers.tsx`는 전역 Client Provider가 필요할 때 사용합니다.
- route group은 URL을 바꾸지 않고 레이아웃을 나눌 때만 사용합니다.
- route handler는 서버 경계가 필요할 때만 `app/api`에 둡니다.

## Domain Structure

```txt
domains/{domain}/
  pages-or-flows/
  components/
  hooks/
  api/
  model/
```

- 특정 도메인에서만 쓰는 컴포넌트, 훅, API, 타입은 해당 도메인 내부에 둡니다.
- 여러 도메인에서 실제로 재사용되고 의미와 변경 이유가 같으면 `shared` 이동을 검토합니다.
- `app` 내부에는 복잡한 비즈니스 로직을 두지 않습니다.
- 도메인 폴더는 실제 기능명이 확정된 뒤 생성합니다.

## Server And Client Boundary

- 기본 page와 layout은 Server Component로 둡니다.
- `useState`, event handler, `useEffect`, browser API가 필요한 파일만 Client Component로 둡니다.
- `"use client"`는 가능한 leaf component나 `providers.tsx` 같은 경계에만 둡니다.

## Dependency Direction

허용 방향:

```txt
app -> domains -> shared
app -> shared
domains -> shared
shared -> lib
```

금지 방향:

```txt
domains -> app
shared -> domains
lib -> app
lib -> domains
```
