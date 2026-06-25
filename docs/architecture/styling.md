# Styling

BUDDYS-CLIENT는 Tailwind CSS를 기본 스타일링 도구로 사용합니다.

## Current Setup

- Tailwind CSS v4를 사용합니다.
- `src/app/globals.css`에는 `@import "tailwindcss";`를 유지합니다.
- `postcss.config.mjs`는 Tailwind PostCSS 플러그인을 연결합니다.
- 현재 별도 `tailwind.config.ts`는 사용하지 않습니다.

## Rules

- 기본 스타일은 Tailwind utility class로 작성합니다.
- 여러 도메인에서 실제로 재사용되는 UI 패턴은 `src/shared/components/ui` 컴포넌트로 분리합니다.
- 전역 스타일은 `src/app/globals.css`에서 관리합니다.
- 전역 CSS는 reset, Tailwind import, 앱 전체 토큰처럼 전역성이 명확한 경우에만 추가합니다.
