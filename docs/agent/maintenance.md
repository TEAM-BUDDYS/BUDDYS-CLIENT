# Agent Harness Maintenance

Agent Harness는 실제 코드와 팀 작업 방식이 바뀔 때 함께 갱신합니다.

## Add Or Update

다음 상황에서 관련 문서를 갱신합니다.

- 루트 또는 `src` 구조가 변경됨
- 새로운 반복 작업 방식이 팀 표준이 됨
- 검증 명령이나 CI 기준이 변경됨
- 같은 설명을 AI에게 반복해서 제공하고 있음
- 기존 Skill이 현재 코드 패턴과 맞지 않음

## Placement

- 저장소 전체 진입 규칙: `AGENTS.md`
- 프로젝트 사실과 정책: `docs`
- 특정 작업의 판단과 실행 순서: `.agents/skills`

## Avoid

- `AGENTS.md`에 세부 구현 규칙을 모두 복사하지 않습니다.
- Skill과 Workflow 문서에 상세 규칙을 길게 중복하지 않습니다.
- 항상 적용할 핵심 불변량과 문서 라우팅은 `AGENTS.md`와 Skill에 짧게 요약할 수 있습니다.
- 아직 도입하지 않은 라이브러리나 구조를 확정된 규칙처럼 적지 않습니다.
- 과거 작업 기록과 현재 PR 상태를 하네스 문서에 남기지 않습니다.
- 개인 token, 계정, 로컬 설정을 저장소에 커밋하지 않습니다.

## Skill Rule

- Skill 이름은 lowercase kebab-case를 사용합니다.
- `SKILL.md` frontmatter에는 `name`, `description`만 둡니다.
- description에는 Skill의 역할과 사용 시점을 함께 적습니다.
- 각 Skill의 `agents/openai.yaml`에는 UI 표시 이름, 짧은 설명과 `$skill-name`을 포함한 기본 프롬프트를 둡니다.
- Skill은 500줄 이하로 유지하고 상세 지식은 기존 docs에 연결합니다.
- 반복되는 deterministic 작업이 생기기 전에는 script를 추가하지 않습니다.

## Verification

하네스 변경 후 다음을 확인합니다.

```bash
git diff --check
```

- 모든 Markdown 링크와 참조 경로가 존재하는지 확인
- Skill frontmatter와 폴더명이 일치하는지 확인
- 각 Skill의 `agents/openai.yaml`이 존재하고 Skill 이름을 올바르게 참조하는지 확인
- `AGENTS.md`의 Skill 목록과 실제 Skill이 일치하는지 확인
- 기존 docs와 상충하거나 중복된 규칙이 없는지 확인

코드나 설정도 함께 변경했다면 `docs/workflows/verification.md`에 따라 추가 검증을 실행합니다.
