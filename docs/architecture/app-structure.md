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
    assets/
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
- `shared`: 아래 공통화 기준을 충족한 여러 도메인의 공용 코드를 둡니다.
- `lib`: 외부 라이브러리 설정이나 작은 헬퍼를 둡니다.
- `types`: 앱 전체에서 사용하는 공통 타입을 둡니다.

## App Router Rules

- `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`는 Next 파일 convention이므로 `app`에 둡니다.
- `providers.tsx`는 전역 Client Provider가 필요할 때 사용합니다.
- route group은 URL을 바꾸지 않고 레이아웃을 나눌 때만 사용합니다.
- route handler는 서버 경계가 필요할 때만 `app/api`에 둡니다.

## Confirmed Routes And Domains

| Screen | URL           | Route entry                   | Owner domain | Notes                                   |
| ------ | ------------- | ----------------------------- | ------------ | --------------------------------------- |
| 홈     | `/`           | `src/app/page.tsx`            | 없음         | 여러 도메인의 기능을 조합하는 진입 화면 |
| 로그인 | `/login`      | `src/app/login/page.tsx`      | `auth`       | 인증과 로그인 흐름                      |
| 온보딩 | `/onboarding` | `src/app/onboarding/page.tsx` | `onboarding` | 초기 사용자 정보와 가입 완료 흐름       |
| 게시물 | `/posts`      | `src/app/posts/page.tsx`      | `posts`      | 게시물 목록과 게시물 관련 기능          |
| 프로필 | `/profile`    | `src/app/profile/page.tsx`    | `profile`    | 프로필 조회와 수정 기능                 |
| 채팅   | `/chat`       | `src/app/chat/page.tsx`       | `chat`       | 채팅 목록과 채팅 관련 기능              |

확정된 화면을 기준으로 route와 domain의 최상위 폴더를 아래와 같이 구성합니다.

```txt
src/
  app/
    page.tsx
    login/
      page.tsx
    onboarding/
      page.tsx
    posts/
      page.tsx
    profile/
      page.tsx
    chat/
      page.tsx

  domains/
    auth/
      components/
      features/
      hooks/
      api/
      model/
    onboarding/
      components/
      features/
      hooks/
      api/
      model/
    posts/
      components/
      features/
      hooks/
      api/
      model/
    profile/
      components/
      features/
      hooks/
      api/
      model/
    chat/
      components/
      features/
      hooks/
      api/
      model/
```

- 홈은 여러 도메인을 조합하는 route로 시작하며, 홈에만 속한 기능과 상태가 확인될 때 `home` domain 추가를 검토합니다.
- 게시물 상세나 채팅방처럼 식별자가 필요한 화면은 요구사항이 확정된 뒤 `[postId]`, `[roomId]` 같은 dynamic route를 추가합니다.
- 인증 전후 화면에서 서로 다른 layout이 실제로 필요해질 때 route group을 추가합니다.
- 각 `page.tsx`는 현재 routing 확인을 위한 최소 화면이며, 실제 기능 구현 시 owner domain의 컴포넌트를 조합하는 route entry로 사용합니다.
- 각 domain은 `components`, `features`, `hooks`, `api`, `model`을 기본 하위 폴더로 사용합니다.
- `assets`와 추가 flow 폴더는 실제 구현에 필요한 시점에 추가합니다.

## Domain Structure

```txt
domains/{domain}/
  assets/
  components/
  features/
  hooks/
  api/
  model/
```

- 특정 도메인에서만 쓰는 컴포넌트, 훅, API, 타입과 에셋은 해당 도메인 내부에 둡니다.
- 특정 사용자 흐름이나 화면 단위 기능처럼 상태, 여러 하위 컴포넌트, API 연동이 함께 묶이는 코드는 `features/{feature-name}`에 둡니다.
- 작은 재사용 UI 조각이나 독립적인 도메인 컴포넌트는 `components`에 둡니다.
- 공통화 여부는 아래 `Commonization Rules`를 기준으로 판단합니다.
- `app` 내부에는 복잡한 비즈니스 로직을 두지 않습니다.
- 도메인 폴더는 실제 기능명이 확정된 뒤 생성합니다.
- 현재 확정된 domain은 `auth`, `onboarding`, `posts`, `profile`, `chat`입니다.

## Commonization Rules

- 한 도메인에서만 사용하는 코드는 해당 도메인 내부에 둡니다.
- 형태가 비슷하거나 미래에 재사용될 수 있다는 이유만으로 공통화하지 않습니다.
- 여러 도메인에서 실제로 재사용되고 사용 의미와 변경 이유가 같을 때만 `shared` 이동을 검토합니다.
- 제품 도메인 지식이 포함된 코드는 형태가 비슷하더라도 소유 도메인에 유지합니다.
- 외부 라이브러리 wrapper는 앱 전체에서 사용하는 기반 설정일 때 `lib` 배치를 검토합니다.

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
