# Git Convention

## Jira Key

프론트엔드 작업은 `BDYFE-*` Jira key를 사용합니다.

## Branch

브랜치 이름에는 Jira key와 작업 성격을 포함합니다.

```txt
feature/BDYFE-1-initialize-project
fix/BDYFE-2-login-layout
docs/BDYFE-3-update-app-structure
```

## Commit

커밋 메시지는 작업 의도가 드러나게 작성합니다.

```txt
BDYFE-1 initialize next project
BDYFE-2 add login page layout
BDYFE-3 document app structure
```

## Rules

- 하나의 PR은 가능한 하나의 Jira issue 범위에 맞춥니다.
- 작업 구분은 Jira label 또는 component로 처리합니다.
