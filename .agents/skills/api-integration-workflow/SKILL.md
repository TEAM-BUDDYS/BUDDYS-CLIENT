---
name: api-integration-workflow
description: BUDDYS-CLIENT에서 API 요청, 응답 타입, 인증, 에러, 캐시와 UI 상태를 연결합니다. 새 endpoint 연동, 데이터 fetching 또는 mutation, API helper 위치 결정, 네트워크 오류 처리 검토에 사용합니다.
---

# API 연동

현재 저장소에서 API 클라이언트나 서버 상태 라이브러리가 확정되지 않았다면 특정 도구를 임의로 도입하지 않습니다.

## Read First

- `docs/architecture/app-structure.md`
- 관련 도메인과 기존 API 코드
- 사용자에게 제공된 API 명세

## Workflow

1. endpoint, method, request, response, 인증, 오류 형식을 확인합니다.
2. 서버에서 실행할 요청인지 브라우저에서 실행할 요청인지 판단합니다.
3. 특정 도메인의 요청은 `src/domains/{domain}/api`를 우선합니다.
4. 여러 도메인에서 사용하는 API 기반 설정만 `src/shared/api`에 둡니다.
5. transport 타입과 UI model을 무조건 하나로 합치지 않습니다.
6. loading, empty, error, retry, success 상태를 화면과 연결합니다.
7. mutation 이후 필요한 cache 갱신 또는 재조회 동작을 명시합니다.
8. 인증 토큰과 비밀값이 브라우저에 노출되지 않는지 확인합니다.

## Boundary Decision

- 초기 HTML에 필요하고 서버에서 안전하게 조회할 수 있으면 Server Component 요청을 검토합니다.
- 사용자 상호작용, polling, infinite scroll, 실시간 갱신이 중심이면 Client Component 요청을 검토합니다.
- 비밀값 보호나 BFF 역할이 필요할 때만 Route Handler를 추가합니다.
- 단순 proxy를 이유로 불필요한 Route Handler를 만들지 않습니다.

## Error Handling

- 사용자에게 보여줄 메시지와 개발자가 진단할 정보를 구분합니다.
- 네트워크 오류, 인증 오류, validation 오류, 서버 오류를 구분할 수 있으면 구분합니다.
- 오류를 조용히 삼키지 않습니다.
- 오류 관측 도구가 있더라도 사용자 상태 처리를 대체하지 않습니다.

## Completion

- 타입과 runtime validation의 책임이 명확합니다.
- UI 상태가 요청 결과와 연결됩니다.
- API 코드가 올바른 domain 또는 shared 경계에 있습니다.
- 민감한 값이 코드나 클라이언트 번들에 노출되지 않습니다.
