# App Structure

BUDDYS-CLIENT는 Next.js App Router를 라우팅 경계로 사용하고, 제품 기능 코드는 `src/domains`에 둡니다.

## Base Structure

```txt
src/
  app/
    (private)/
      layout.tsx
      page.tsx
    layout.tsx
    providers.tsx
    globals.css

  domains/

  shared/
    analytics/
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
- `shared/analytics`: 여러 route에 걸친 측정 정책과 Analytics Client 경계를 둡니다.
- `lib`: 외부 라이브러리 설정이나 작은 헬퍼를 둡니다.
- `types`: 앱 전체에서 사용하는 공통 타입을 둡니다.

## App Router Rules

- `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`는 Next 파일 convention이므로 `app`에 둡니다.
- `providers.tsx`는 전역 Client Provider가 필요할 때 사용합니다.
- route group은 URL을 바꾸지 않고 레이아웃을 나눌 때만 사용합니다.
- route handler는 서버 경계가 필요할 때만 `app/api`에 둡니다.

## Protected Routes

- 인증이 필요한 route는 `src/app/(private)` route group 아래에 둡니다.
- `(private)`는 URL에 포함되지 않으므로 기존 화면 경로는 유지됩니다.
- `src/app/(private)/layout.tsx`에서 `AuthEntryGuard`를 한 번만 적용하며, 각 `page.tsx`에서 guard를 중복해서 감싸지 않습니다.
- 공통 layout은 Server Component로 유지하고, 인증 상태와 redirect가 필요한 `AuthEntryGuard`만 Client Component 경계로 사용합니다.
- 미인증 사용자가 `(private)` route에 접근하면 `/landing`으로 이동하고, 랜딩 화면에서 사용자가 로그인 진입을 선택하도록 합니다.
- `/landing`, `/login`, `/auth/kakao/callback`처럼 인증 전 접근이 필요한 route는 `(private)` 밖에 둡니다.

## Route Path Configuration

- 앱 내부 화면 경로는 `src/shared/config/routes.ts`의 `ROUTES`에서 관리합니다.
- 정적 경로는 상수로 사용하고 식별자가 필요한 동적 경로는 팩토리 함수로 생성합니다.
- `Link`, `router.push`, `router.replace` 등에서 같은 경로 문자열을 직접 반복하지 않습니다.
- API 요청 주소는 `src/shared/api/end-point.ts`의 `END_POINT`가 담당하며 화면 경로와 섞지 않습니다.

```tsx
router.push(ROUTES.POST.ROOT);
router.replace(ROUTES.POST.DETAIL(postId));
```

## Confirmed Routes And Domains

| Screen | URL           | Route entry                             | Owner domain | Notes                                   |
| ------ | ------------- | --------------------------------------- | ------------ | --------------------------------------- |
| 홈     | `/`           | `src/app/(private)/page.tsx`            | 없음         | 여러 도메인의 기능을 조합하는 인증 화면 |
| 랜딩   | `/landing`    | `src/app/landing/page.tsx`              | 없음         | 인증 전 서비스 진입 화면                |
| 로그인 | `/login`      | `src/app/login/page.tsx`                | `auth`       | 인증과 로그인 흐름                      |
| 온보딩 | `/onboarding` | `src/app/(private)/onboarding/page.tsx` | `onboarding` | 인증 후 초기 사용자 정보 입력 흐름      |
| 게시물 | `/posts`      | `src/app/(private)/posts/page.tsx`      | `posts`      | 게시물 목록과 게시물 관련 기능          |
| 프로필 | `/profile`    | `src/app/(private)/profile/page.tsx`    | `profile`    | 프로필 조회와 수정 기능                 |
| 채팅   | `/chat`       | `src/app/(private)/chat/page.tsx`       | `chat`       | 채팅 목록과 채팅 관련 기능              |

확정된 화면을 기준으로 route와 domain의 최상위 폴더를 아래와 같이 구성합니다.

```txt
src/
  app/
    (private)/
      layout.tsx
      page.tsx
      onboarding/
        page.tsx
      posts/
        page.tsx
      profile/
        page.tsx
      chat/
        page.tsx
    landing/
      page.tsx
    login/
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
- 인증이 필요한 화면은 `(private)` layout에서 공통으로 보호하고, 인증 전 화면은 route group 밖에 유지합니다.
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

## Loading And Error Boundary

- `src/app/loading.tsx`와 `src/app/error.tsx`는 route 전체의 최종 loading/error fallback으로 사용합니다.
- `src/app/global-error.tsx`는 root layout까지 렌더링하지 못하는 치명적 오류의 최후 안전망으로만 사용합니다.
- 화면 일부의 독립적인 조회 상태는 `src/shared/components/ui/async-boundary`로 감싸 나머지 화면을 유지합니다.
- Suspense를 사용하는 TanStack Query는 `QueryErrorResetBoundary`와 함께 구성해 재시도 시 query 오류 상태도 초기화합니다.
- `DelayedFallback`은 loading fallback을 기본 200ms 뒤에 표시해 짧은 요청의 깜빡임을 줄이고, 지연 중에도 fallback 영역 크기를 유지합니다.
- `AsyncBoundary`에서 잡은 오류는 Sentry에 기록하고, `onError`가 있으면 추가 오류 처리도 실행합니다.
- `redirect()`, `notFound()` 같은 Next.js 라우팅 제어 오류는 잡지 않고 App Router 경계로 다시 전달합니다.
- 조건부 조회처럼 `enabled`가 필요한 query, background polling과 mutation은 Suspense로 일괄 전환하지 않고 사용처에서 pending/error 상태를 처리합니다.
- 정상 응답의 빈 데이터는 Error Boundary가 아니라 `EmptyState` 같은 명시적인 empty UI로 처리합니다.

Suspense query를 호출하는 컴포넌트보다 상위에서 `AsyncBoundary`를 사용합니다.

```tsx
<AsyncBoundary
  className="min-h-60"
  loadingDelayMs={200}
  loadingState={{ title: '목록을 불러오고 있어요' }}
  errorState={{ title: '목록을 불러오지 못했어요' }}
>
  <FeatureContent />
</AsyncBoundary>
```

기능 전용 fallback이 필요하면 기본 상태 대신 UI를 전달합니다. custom fallback은 자체 layout을 소유하며, error fallback은 전달받은 `reset`으로 재시도 동작을 연결합니다.

```tsx
<AsyncBoundary
  loadingFallback={<FeatureSkeleton />}
  errorFallback={({ reset }) => <FeatureError onRetry={reset} />}
>
  <FeatureContent />
</AsyncBoundary>
```

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
