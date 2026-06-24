# Repo Structure

BUDDYS-CLIENT는 단일 Next.js 앱으로 시작합니다.

## Root Layout

```txt
.github/
public/
src/
docs/
```

## Root Directories

- `.github`: GitHub 관련 설정
- `public`: 정적 이미지, 아이콘, 폰트
- `src`: Next.js 앱 코드
- `docs`: 프로젝트 구조, 컨벤션, 개발 방법 문서

## Rules

- 모노레포 구조는 현재는 사용하지 않습니다.
- 앱 코드는 `src` 안에 둡니다.
- 정적 이미지, 아이콘, 폰트는 `public`에 둡니다.
- 문서는 `docs`에 둡니다.
- GitHub 관련 설정은 `.github`에 둡니다.
- 새 루트 디렉터리는 역할이 명확할 때만 추가합니다.
