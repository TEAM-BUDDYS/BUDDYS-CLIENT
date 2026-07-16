# Local Development

## Requirements

- Node.js
- pnpm

프로젝트에서 별도 Node 버전을 지정하면 해당 파일을 우선합니다.

## Install

```bash
pnpm install
```

## Run

```bash
pnpm dev
```

기본 개발 서버는 Next.js가 출력하는 로컬 URL에서 확인합니다.

## Check

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

명령은 변경 범위에 맞게 선택합니다. 자세한 기준은 [Verification](./verification.md)을 따릅니다.

## Environment Variables

- 실제 값이 들어간 `.env*` 파일은 커밋하지 않습니다.
- 공개 가능한 변수인지와 서버 전용 변수인지 구분합니다.
- `NEXT_PUBLIC_` prefix가 붙은 값은 브라우저 번들에 포함될 수 있습니다.
- 팀에 필요한 변수 이름은 실제 값 없이 예시 문서에 기록합니다.

| Variable                          | Purpose                      |
| --------------------------------- | ---------------------------- |
| `NEXT_PUBLIC_API_BASE_URL`        | HTTP API 기본 주소           |
| `NEXT_PUBLIC_KAKAO_REST_API_KEY`  | 카카오 OAuth REST API 식별자 |
| `NEXT_PUBLIC_KAKAO_REDIRECT_URI`  | 카카오 OAuth callback 주소   |
| `NEXT_PUBLIC_WEBSOCKET_URL`       | STOMP WebSocket 연결 주소    |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | 운영 웹 스트림의 GA4 측정 ID |

Google Analytics는 운영 빌드에서 유효한 측정 ID가 전달될 때만 활성화합니다. 로컬에서 운영 동작을 검증할 때만 `.env.local`에 측정 ID를 추가하며, 실제 값은 커밋하지 않습니다. 상세 수집 정책과 GA4 콘솔 설정은 [Google Analytics](../analytics/google-analytics.md)를 참고합니다.
