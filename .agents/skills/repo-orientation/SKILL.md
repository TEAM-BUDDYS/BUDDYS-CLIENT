---
name: repo-orientation
description: BUDDYS-CLIENT 저장소에서 새 작업을 시작하기 전에 브랜치, 변경사항, 기술 스택, 폴더 구조, 관련 문서와 기존 구현 패턴을 파악합니다. 기능 구현, 구조 변경, 코드 리뷰처럼 현재 저장소 맥락을 먼저 확인해야 하는 작업에 사용합니다.
---

# 저장소 파악

작업에 필요한 범위만 탐색하고, 추측보다 현재 코드와 문서를 우선합니다.

## Workflow

1. 현재 브랜치와 변경사항을 확인합니다.

```bash
git branch --show-current
git status --short
git log --oneline --decorate -5
```

2. 저장소 구조와 실행 환경을 확인합니다.

```bash
rg --files --hidden -g '!.git' -g '!node_modules' -g '!.next'
cat package.json
```

3. 작업 유형에 맞는 원본 문서를 읽습니다.

- 구조: `docs/architecture/repo-structure.md`, `docs/architecture/app-structure.md`
- 스타일: `docs/architecture/styling.md`
- 코딩 규칙: `docs/conventions/conventions.md`
- Git과 Jira: `docs/conventions/git.md`
- 작업 절차: `docs/workflows/*`

4. 변경 대상과 가까운 기존 코드를 검색합니다. 문서만 보고 새 패턴을 만들지 않습니다.

5. 아래 내용을 짧게 정리하고 다음 Skill로 넘깁니다.

```markdown
## Repo Orientation

- Branch:
- Working tree:
- Related paths:
- Source of truth:
- Existing pattern:
- Verification candidates:
```

## Rules

- 사용자가 분석이나 계획만 요청했다면 파일을 수정하지 않습니다.
- 사용자 변경사항을 되돌리지 않습니다.
- 실제 요구사항이 확정되지 않은 도메인이나 추상화를 미리 생성하지 않습니다.
- 작은 변경에는 전체 문서를 모두 읽거나 긴 계획을 강제하지 않습니다.
