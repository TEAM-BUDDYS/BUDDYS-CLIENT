# Verification

검증은 변경 범위와 실패 시 영향에 맞게 선택합니다.

## Matrix

| Change                     | Required verification                                     |
| -------------------------- | --------------------------------------------------------- |
| Markdown only              | `git diff --check`, 링크와 경로 확인                      |
| GitHub Actions or config   | 문법 검사, `git diff --check`, 관련 이벤트 또는 빌드 확인 |
| TypeScript utility         | lint, typecheck, 필요한 단위 동작 확인                    |
| React component            | lint, typecheck, 주요 상태 확인                           |
| Route or page              | lint, typecheck, build, 브라우저 확인                     |
| Shared API or architecture | lint, typecheck, build, 영향받는 기능 확인                |

## Commands

```bash
git diff --check
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Browser Checklist

- route가 정상적으로 열림
- 콘솔과 네트워크에 예상하지 않은 오류가 없음
- 모바일과 데스크톱에서 레이아웃이 깨지지 않음
- loading, empty, error, disabled, success 상태가 의도대로 표시됨
- 긴 텍스트와 동적 데이터가 영역을 넘치지 않음
- keyboard focus와 accessible name이 확인됨

## Reporting

- 성공한 검사와 실패한 검사를 구분합니다.
- 실행하지 않은 검사를 통과했다고 적지 않습니다.
- 환경 문제로 실행하지 못했다면 원인과 잔여 위험을 남깁니다.
- 실패를 수정했다면 관련 검사를 다시 실행합니다.
