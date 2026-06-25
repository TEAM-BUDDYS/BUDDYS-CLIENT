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
