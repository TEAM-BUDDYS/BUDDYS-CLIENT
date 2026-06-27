---
name: verify-frontend
description: BUDDYS-CLIENT의 코드, 문서, 설정 또는 UI 변경을 변경 범위와 위험에 맞게 검증합니다. 구현 완료 후, 커밋 전 또는 코드 리뷰 중 lint, typecheck, build, 브라우저 동작과 구조 검사가 필요할 때 사용합니다.
---

# 프론트엔드 검증

## Select Scope

`docs/workflows/verification.md`를 기준으로 검증을 선택합니다.

| Change                 | Minimum                                       |
| ---------------------- | --------------------------------------------- |
| Markdown               | `git diff --check`, 링크와 경로 확인          |
| Config or workflow     | 문법 검사, `git diff --check`, 관련 동작 확인 |
| TypeScript or React    | lint, typecheck                               |
| Shared or architecture | lint, typecheck, build                        |
| Route or UI            | lint, typecheck, build, 브라우저 확인         |

## Commands

```bash
git diff --check
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

실패하면 원인을 확인하고 수정 후 해당 검사와 관련 검사를 다시 실행합니다.

## UI Verification

- route가 열리고 콘솔 오류가 없는지 확인합니다.
- 모바일과 데스크톱 viewport를 확인합니다.
- loading, empty, error, disabled, success 상태를 확인합니다.
- 긴 텍스트와 동적 데이터가 레이아웃을 깨지 않는지 확인합니다.
- keyboard focus와 accessible name을 확인합니다.

## Security And Hygiene

- 실제 token, credential이 커밋되지 않았는지 확인합니다.
- 임시 페이지, test endpoint, debug log가 남지 않았는지 확인합니다.
- 사용자 변경사항을 검증 과정에서 되돌리지 않습니다.

## Report

```markdown
## Verification

- PASS:
- FAIL:
- Not run:
- Residual risk:
```

실행하지 않은 검사를 통과했다고 표현하지 않습니다.
