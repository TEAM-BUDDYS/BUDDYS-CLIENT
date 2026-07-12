# Agent Harness

BUDDYS-CLIENT의 Agent Harness는 AI가 저장소의 규칙과 현재 코드를 근거로 일관되게 작업하도록 돕는 문서와 절차의 집합입니다.

## Structure

```txt
AGENTS.md
.agents/
  skills/
    {skill-name}/
      SKILL.md
      agents/
        openai.yaml
docs/
  agent/
  workflows/
```

## Responsibilities

- `AGENTS.md`: 저장소 진입점, 문서와 Skill 라우팅
- `.agents/skills/*/SKILL.md`: 작업 유형별 판단과 실행 절차
- `.agents/skills/*/agents/openai.yaml`: Skill UI 표시 정보와 기본 호출 프롬프트
- `docs`: 프로젝트 구조, 컨벤션, 팀 작업 절차의 원본

## Skills

| Skill                       | Purpose                                  |
| --------------------------- | ---------------------------------------- |
| `repo-orientation`          | 브랜치, 구조, 관련 문서와 기존 패턴 확인 |
| `frontend-task-workflow`    | 요청 유형 분류와 작업 흐름 선택          |
| `page-feature-workflow`     | Next.js 페이지와 route 구현              |
| `domain-feature-workflow`   | 도메인 기능, 컴포넌트와 훅 구현          |
| `shared-component-workflow` | 공통 UI와 layout 컴포넌트 구현           |
| `api-integration-workflow`  | API 연동과 UI 상태 연결                  |
| `architecture-review`       | 폴더 소유권과 의존 방향 검토             |
| `verify-frontend`           | 변경 범위에 맞는 검증                    |

## Usage

일반 작업은 Skill 이름을 외우지 않고 자연어로 요청할 수 있습니다.

```text
BDYFE-30 게시물 상세 페이지 구현해줘
현재 브랜치의 폴더 구조를 리뷰해줘
커밋 전 최종 검증해줘
```

`AGENTS.md`를 지원하는 agent는 기본 작업 흐름과 Skill Routing을 기준으로 필요한 문서를 선택합니다.

특정 절차를 명확하게 적용하고 싶다면 Skill을 직접 호출할 수 있습니다.

```text
$page-feature-workflow 게시물 상세 페이지를 구현해줘
$architecture-review 현재 변경사항의 의존 방향을 검토해줘
$verify-frontend 커밋 전에 검증해줘
```

사용하는 AI 도구가 `.agents/skills` 형식을 지원하지 않는 경우에도 `AGENTS.md`와 `docs`는 저장소 작업 지침으로 사용할 수 있습니다.

## Source Of Truth

상세 규칙을 여러 파일에 그대로 복사하지 않습니다.

- 구조와 의존 방향은 `docs/architecture/*`
- 코딩과 Git 규칙은 `docs/conventions/*`
- 팀 작업 절차는 `docs/workflows/*`
- Skill은 위 문서를 읽고 실행 순서만 정의

AI가 항상 따라야 하는 핵심 불변량과 문서 라우팅은 `AGENTS.md`와 Skill에 짧게 요약할 수 있습니다.

문서가 충돌하면 실제 코드와 가장 가까운 Source of Truth를 확인하고 충돌한 문서를 함께 수정합니다.

## Scope

현재 하네스는 단일 Next.js 앱 기준입니다. 다음 요소는 실제 필요가 생기기 전까지 추가하지 않습니다.

- 모노레포와 workspace 전용 Skill
- 디자인 시스템 package 전용 Skill
- 특정 API 라이브러리를 강제하는 절차
- Jira, Figma, MCP 자동화
- 파일 generator
- repo-local 개인 설정

## Maintenance

자세한 유지보수 원칙은 [Maintenance](./maintenance.md)를 따릅니다.
