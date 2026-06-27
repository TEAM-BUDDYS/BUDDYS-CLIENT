# Repo Structure

BUDDYS-CLIENT는 단일 Next.js 앱으로 시작합니다.

## Root Layout

```txt
.agents/
.github/
docs/
public/
src/
AGENTS.md
```

## Root Directories

- `.agents`: AI agent가 사용하는 작업 유형별 Skill
- `.github`: GitHub 관련 설정
- `docs`: 프로젝트 구조, 컨벤션, 작업 절차 문서
- `public`: URL로 직접 접근하거나 원본 그대로 제공하는 정적 에셋
- `src`: Next.js 앱 코드
- `AGENTS.md`: AI agent의 저장소 진입점

## Rules

- 모노레포 구조는 현재는 사용하지 않습니다.
- 앱 코드는 `src` 안에 둡니다.
- 특정 도메인에서 import해 사용하는 이미지와 아이콘은 `src/domains/{domain}/assets`에 둡니다.
- 여러 도메인에서 공통으로 import하는 이미지와 아이콘은 `src/shared/assets`에 둡니다.
- OG 이미지, 정적 배너처럼 URL로 직접 접근하거나 파일 그대로 제공해야 하는 에셋은 `public`에 둡니다.
- 문서는 `docs`에 둡니다.
- GitHub 관련 설정은 `.github`에 둡니다.
- Agent 실행 절차는 `.agents/skills`에 둡니다.
- `AGENTS.md`는 세부 규칙을 복사하지 않고 Source of Truth를 연결합니다.
- 새 루트 디렉터리는 역할이 명확할 때만 추가합니다.
