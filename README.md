<div align="center">
  <h1>BUDDYS CLIENT</h1>
  <p>교환학생 매칭 서비스 BUDDYS의 프론트엔드 애플리케이션입니다.</p>
  <p>낯선 환경에서도 더 쉽게 연결되고, 더 편하게 소통할 수 있는 교환학생 경험을 만드는 것을 목표로 합니다.</p>
</div>

<br />

## 📌 Service Introduction

BUDDYS는 교환학생들이 새로운 학교와 지역에서 더 빠르게 적응하고, 서로 자연스럽게 연결될 수 있도록 돕는 서비스입니다.

클라이언트 애플리케이션에서는 다음과 같은 사용자 경험을 중심으로 서비스를 구현합니다.

- 교환학생 간 매칭과 탐색 경험
- 코스 기록 및 공유를 통한 동행 경험 확장
- 공통 UI 컴포넌트를 통한 일관된 인터페이스 제공
- 모바일 환경에 최적화된 사용 흐름 구성

<br />

## 👥 Team

<table align="center">
  <tr>
    <td align="center" width="200">
      <a href="https://github.com/jin-evergreen">
        <img width="460" height="460" src="https://github.com/jin-evergreen.png" alt="박진석" />
      </a>
      <br />
      <a href="https://github.com/jin-evergreen"><strong>박진석</strong></a>
      <br />
    </td>
    <td align="center" width="200">
      <a href="https://github.com/winchoose">
        <img width="460" height="460" src="https://github.com/winchoose.png" alt="오승택" />
      </a>
      <br />
      <a href="https://github.com/winchoose"><strong>오승택</strong></a>
      <br />
    </td>
    <td align="center" width="200">
      <a href="https://github.com/jinaaaaaaaaaaaaa">
        <img width="460" height="460" src="https://github.com/jinaaaaaaaaaaaaa.png" alt="김진아" />
      </a>
      <br />
      <a href="https://github.com/jinaaaaaaaaaaaaa"><strong>김진아</strong></a>
      <br />
    </td>
    <td align="center" width="200">
      <a href="https://github.com/ahyohyo">
        <img width="460" height="460" src="https://github.com/ahyohyo.png" alt="강효정" />
      </a>
      <br />
      <a href="https://github.com/ahyohyo"><strong>강효정</strong></a>
      <br />
    </td>
    <td align="center" width="200">
      <a href="https://github.com/seojin15">
        <img width="460" height="460" src="https://github.com/seojin15.png" alt="황서진" />
      </a>
      <br />
      <a href="https://github.com/seojin15"><strong>황서진</strong></a>
      <br />
    </td>
  </tr>
</table>

<br />

## 🛠️ Tech Stack

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### State & Data

![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

### Tooling

![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![SVGR](https://img.shields.io/badge/SVGR-FFB13B?style=for-the-badge&logo=svg&logoColor=black)

### Monitoring

![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)

<br />

## 🗂️ Convention

### 🪾Git Flow

#### 🌿 브랜치 전략

| 브랜치                                          | 역할            | 설명                                                  |
| :---------------------------------------------- | :-------------- | :---------------------------------------------------- |
| <code style="color: #e5534b">**main**</code>    | **Production**  | 출시될 수 있는 안정된 상태의 코드를 관리합니다.       |
| <code style="color: #4a9c5d">**develop**</code> | **Development** | 모든 기능 개발이 이 브랜치를 기반으로 진행됩니다.     |
| <code style="color: #7a9eb5">**feature**</code> | **Feature**     | 기능 구현 및 버그 수정을 위한 개별 작업 브랜치입니다. |

<details>
<summary> 🚀 개발 프로세스 </summary>

1. **Jira 기반 브랜치 생성**
   - 모든 작업은 Jira 이슈를 기준으로 시작합니다.
   - `develop` 브랜치에서 작업 브랜치를 분기합니다.
   - 브랜치 이름에는 작업 유형과 Jira Key를 함께 작성합니다.
     - 예) <code style="color: #e5534b">**feature/BDYFE-2-add-login-page**</code>

2. **작업 및 PR 생성**
   - 기능 구현이 완료되면 PR을 생성합니다.
   - PR 대상 브랜치는 기본적으로 `develop`입니다.
   - 리뷰 후 `develop` 브랜치로 병합합니다.

3. **브랜치 삭제**
   - `develop` 브랜치로 병합 후, 사용이 끝난 작업 브랜치는 삭제합니다.

</details>

<details>
<summary> 📝 커밋 컨벤션 </summary>
<br/>

- **<code style="color: #e5534b">feat: 커밋 메시지</code>**

#### Prefix

| 유형         | 의미             | 상세 내용                      |
| :----------- | :--------------- | :----------------------------- |
| **feat**     | 새로운 기능 추가 | 새로운 기능 구현               |
| **fix**      | 버그 수정        | 오류 수정                      |
| **hotfix**   | 긴급 수정        | 치명적인 버그 즉시 수정        |
| **refactor** | 리팩토링         | 코드 구조 개선 (기능 변화 X)   |
| **style**    | 스타일 변경      | 스타일 코드 및 포맷팅 변경     |
| **docs**     | 문서 수정        | 문서 작성 및 수정              |
| **chore**    | 기타 수정        | 빌드, 패키지 매니저, 설정 변경 |
| **build**    | 빌드 시스템      | 빌드 도구 및 종속성 변경       |
| **ci**       | CI 설정          | CI 설정 파일 및 스크립트 수정  |
| **perf**     | 성능 개선        | 성능 최적화 코드               |
| **test**     | 테스트           | 테스트 코드 추가 및 수정       |
| **rename**   | 이름/위치 수정   | 파일명 수정 및 폴더 이동       |
| **remove**   | 파일 삭제        | 미사용 파일 삭제               |
| **revert**   | 커밋 되돌리기    | 이전 커밋 복구                 |
| **init**     | 초기 세팅        | 프로젝트 초기 세팅             |

</details>

### 📄 Code Convention

---

<details>
<summary> ⚛️ 컴포넌트 </summary>

- **React 컴포넌트와 타입명만 PascalCase 사용**
  - 의미 없는 `div` 태그 사용 지양
  - 가능한 경우 semantic tag 또는 Fragment 사용
  - children이 불필요할 땐 self-closing 사용하기 <code style="color: #e5534b">**&lt;컴포넌트명 /&gt;**</code>
  - 재사용 컴포넌트는 named export를 기본으로 사용합니다.

<br/>

```tsx
export const UserCard = () => {
  return <article />;
};
```

</details>

<details>
<summary> 📁 폴더명 </summary>

- **케밥 케이스(kebab-case) 사용**
  - 폴더명과 일반 파일명은 `kebab-case`를 적용합니다.
  - React 컴포넌트 파일과 컴포넌트 이름만 `PascalCase`를 사용합니다.
  - ❌ `UserProfile/`, `loginForm.tsx`
  - ✅ `user-profile/`, `LoginForm.tsx`

- **무조건 소문자로 시작**
  - 일반 파일과 폴더는 소문자로 시작하여 일관성을 유지합니다.
  - ❌ `Main-header.tsx`
  - ✅ `main-header.tsx`

</details>

<details>
<summary> 🧩 타입 </summary>

- **PascalCase 사용**
  - 타입과 인터페이스 이름은 `PascalCase`로 작성합니다.

- **interface 우선 사용**
  - 객체 구조 정의 시 `interface`를 우선 사용합니다.
  - union, tuple, literal, mapped type처럼 `type`이 더 적합한 경우에는 `type`을 사용합니다.

- **Props 네이밍 규칙**
  - 컴포넌트의 Props 타입은 `[컴포넌트명] + Props` 접미사를 붙입니다.
  - `interface UserCardProps { ... }`

- **일반 타입 네이밍 규칙**
  - 일반 `type` 이름에는 필요할 때 `Types` suffix를 사용할 수 있습니다.
  - 무조건 강제하지는 않습니다.

</details>

<details>
<summary> 💡 변수 </summary>

- **변수 및 상수 선언**
  - `const` → `let` 순서로 선언합니다. (`var` 금지)
  - 상수는 `UPPER_SNAKE_CASE`를 사용합니다. (ex. `API_BASE_URL`)
  - 줄임말은 지양하고, 의미 있는 변수명을 사용합니다. (ex. `userData`)

- **데이터 구조 및 타입**
  - 복수 데이터는 복수형 이름을 사용합니다. (ex. `users`)
  - Boolean 값은 `is`, `has`, `can`, `should` prefix를 권장합니다.
  - 문자열 조합은 템플릿 리터럴을 사용합니다.

- **`map` 사용 시 `key`에 `index` 사용 지양**
  - 가능한 경우 고유 `id` 사용을 권장합니다.

</details>

<details>
<summary> 🔑 함수 </summary>

- **화살표 함수(`const`)** 사용을 기본으로 합니다.

- **네이밍:** `[동사 + 명사]` 형식을 사용합니다.
  - `get`: 값 반환
  - `create`: 신규 생성
  - `check`: 로직 확인
  - `convert`: 형태 변환
  - `add` / `remove`: 값 추가·제거
  - `filter`: 배열 필터링

- **이벤트 핸들러:** 이벤트 관련 함수에만 `handle`을 붙입니다.
  - 동작이 드러나게 작성합니다.
    (ex. `handleResetClick`, `handleSubmitClick`)

- **유틸 함수:** 반환값 중심으로 네이밍합니다.
  - Boolean 반환 시 `has` 접두사 사용
    (ex. `hasEmail`)

</details>

<details>
<summary> 🏗️ 배열 & 구조 분해 </summary>
<br/>

- **배열 복사:** 스프레드 연산자(`...`) 사용
  - ex) `const copiedUsers = [...users]`

- **반복문:** `map`, `filter`, `forEach`를 우선 검토합니다.

- **예외:** 반복 중 `break`, `continue`, 조기 반환이 필요하면 `for...of` 사용을 허용합니다.

- **구조 분해 할당:** 객체/배열 추출 시 적극적으로 사용합니다.
  (특히 Props 및 함수 파라미터)

```tsx
interface VoteInfoProps {
  date: number;
  time: string;
}

export const MonthVoting = ({ date, time }: VoteInfoProps) => {
  return <section>{`${date} ${time}`}</section>;
};
```

</details>

<details>
<summary> 🎨 스타일 </summary>

- 스타일링 방식과 세부 규칙은 프로젝트 문서를 기준으로 관리합니다.
- 공통 스타일 규칙은 아래 문서를 참고합니다.
  - [스타일링 규칙](./docs/architecture/styling.md)
  - [앱 구조 및 의존 방향](./docs/architecture/app-structure.md)

</details>

## ‼️ Ground Rule

<details>
<summary> 🙌 협업 규칙 </summary>

- 💡 모르는 것을 숨기지 않기
- 🙋‍♂️ 필요한 질문은 빠르게 하기
- 🌱 서로 배려하며 소통하기
- 🧐 코드와 문제 해결에 집중하기
- ⏰ 작업 규칙과 검증 절차 지키기

</details>

<details>
<summary> 🔍 코드리뷰 규칙 </summary>

### 1️⃣ 둥글게 말하기

- 공격적이거나 단정적인 표현은 지양합니다.

### 2️⃣ 근거 있는 리뷰

- 개인 취향보다 객관적인 이유와 맥락을 설명합니다.
- 더 나은 대안이 있다면 공식 문서나 레퍼런스 링크 첨부를 권장합니다.

### 3️⃣ 문서 기준 우선

- 구조, 네이밍, Git 규칙은 README보다 프로젝트 문서를 우선합니다.
- 컨벤션 변경 시 관련 문서를 함께 업데이트합니다.

### 4️⃣ 비판적 수용

- 모든 리뷰 코멘트를 무조건적으로 수용할 필요는 없습니다.
- 맥락과 목적에 맞는지 함께 판단합니다.

</details>

## 📚 Documents

프로젝트의 상세 규칙과 구조 문서는 아래 문서를 기준으로 관리합니다.

| 문서                                                                             | 설명                   |
| :------------------------------------------------------------------------------- | :--------------------- |
| [docs/index.md](./docs/index.md)                                                 | 프로젝트 문서 인덱스   |
| [docs/conventions/conventions.md](./docs/conventions/conventions.md)             | 코딩 컨벤션            |
| [docs/conventions/git.md](./docs/conventions/git.md)                             | Git / 브랜치 / PR 규칙 |
| [docs/architecture/repo-structure.md](./docs/architecture/repo-structure.md)     | 저장소 구조            |
| [docs/architecture/app-structure.md](./docs/architecture/app-structure.md)       | 앱 구조 및 의존 방향   |
| [docs/architecture/styling.md](./docs/architecture/styling.md)                   | 스타일링 규칙          |
| [docs/workflows/feature-development.md](./docs/workflows/feature-development.md) | 기능 개발 워크플로우   |
| [docs/workflows/verification.md](./docs/workflows/verification.md)               | 검증 가이드            |

<details>
<summary> 📌 문서 사용 원칙 </summary>
<br/>

- README는 빠르게 프로젝트를 이해하기 위한 요약 문서입니다.
- 세부 규칙과 최신 기준은 위 문서를 source of truth로 삼습니다.
- 구조나 컨벤션이 변경되면 관련 문서를 함께 업데이트합니다.

</details>
