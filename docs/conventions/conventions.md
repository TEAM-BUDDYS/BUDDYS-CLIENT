# Coding Convention

## File And Folder

| Target               | Convention   | Example                         |
| -------------------- | ------------ | ------------------------------- |
| Folder               | `kebab-case` | `user-profile/`                 |
| React component file | `PascalCase` | `UserCard.tsx`                  |
| Hook                 | `kebab-case` | `use-auth.ts`                   |
| API / Utils          | `kebab-case` | `auth-api.ts`, `format-date.ts` |

- 폴더명과 일반 파일명은 `kebab-case`를 사용합니다.
- React 컴포넌트 파일과 컴포넌트 이름만 `PascalCase`를 사용합니다.
- 파일명과 폴더명은 소문자로 시작합니다.

## Component

- 컴포넌트는 arrow function으로 작성합니다.
- 재사용 컴포넌트는 named export를 사용합니다.
- 자식 요소가 없으면 self-closing 형태를 사용합니다.
- page route 파일은 Next convention에 맞춰 default export를 사용합니다.
- 의미 없는 wrapper `div`는 피하고, 가능한 semantic tag 또는 Fragment를 사용합니다.
- Fragment는 불필요한 DOM wrapper를 만들지 않아야 할 때 사용합니다.

```tsx
export const UserCard = () => {
  return <article />;
};
```

## Type

- 타입 이름은 `PascalCase`를 사용합니다.
- Props 타입은 `Props` suffix를 사용합니다.
- 객체 형태의 확장 가능한 계약은 `interface`를 우선 사용합니다.
- union, tuple, literal, mapped type처럼 `type`이 더 적합한 경우에는 `type`을 사용합니다.
- 일반 `type` 이름에는 필요할 때 `Types` suffix를 사용합니다.
- 특정 도메인 타입은 해당 도메인 내부에 둡니다.

```tsx
interface UserCardProps {
  name: string;
}
```

```tsx
type ButtonVariantTypes = "primary" | "secondary";
```

## Variable And Constant

- 재할당이 필요 없으면 `const`를 사용하고, 필요한 경우에만 `let`을 사용합니다.
- `var`는 사용하지 않습니다.
- 상수는 `UPPER_SNAKE_CASE`를 사용합니다.
- 줄임말은 지양하고 의미가 드러나는 이름을 사용합니다.
- 복수 데이터는 복수형 이름을 사용합니다.
- Boolean 값은 `is`, `has`, `can`, `should` prefix를 권장합니다.
- 문자열 조합은 template literal을 사용합니다.

```tsx
const API_BASE_URL = "https://api.example.com";
const users = ["jiho", "mina"];
const isActive = true;
const message = `${users[0]} is active`;
```

## Function

- 함수명은 동사와 명사를 조합해 동작이 드러나게 작성합니다.
- 이벤트 핸들러에는 `handle` prefix를 사용합니다.
- 이벤트 핸들러가 아닌 함수에는 `handle` prefix를 사용하지 않습니다.
- 유틸 함수는 반환값이나 변환 결과가 드러나게 이름을 작성합니다.
- 함수는 arrow function 사용을 기본으로 합니다.

권장 동사:

| Prefix           | Usage                  |
| ---------------- | ---------------------- |
| `get`            | 값을 가져와 반환       |
| `create`         | 새 값이나 객체 생성    |
| `check`          | 조건이나 상태 확인     |
| `convert`        | 값을 다른 형태로 변환  |
| `add` / `remove` | 값 추가 또는 제거      |
| `filter`         | 조건에 맞는 목록 반환  |
| `has`            | Boolean 존재 여부 반환 |

```tsx
const getUserName = (userId: string) => {
  return userId;
};

const handleSubmitClick = () => {
  return;
};
```

## Method And Expression

- 배열 복사는 spread syntax를 사용합니다.
- 배열 변환은 `map`, 조건 필터링은 `filter`, 단순 반복은 `forEach`를 우선 검토합니다.
- 반복 중 `break`, `continue`, 조기 반환이 필요하면 `for...of` 사용을 허용합니다.
- 객체와 props는 구조 분해 할당을 권장합니다.

```tsx
const copiedUsers = [...users];

interface VoteInfoProps {
  date: number;
  time: string;
}

export const MonthVoting = ({ date, time }: VoteInfoProps) => {
  return <section>{`${date} ${time}`}</section>;
};
```

## Import

- `src` 내부 모듈은 `@/*` alias를 사용할 수 있습니다.
- 같은 폴더의 짧은 import는 relative path를 허용합니다.
- import 순서는 외부 패키지, 내부 alias, 상대 경로 순서를 권장합니다.

## State And Logic

- page 안에 복잡한 상태, form, API 로직을 오래 두지 않습니다.
- 특정 도메인에서만 쓰는 로직은 `src/domains/{domain}` 안으로 분리합니다.
- 여러 도메인에서 실제로 재사용되고 의미와 변경 이유가 같은 로직만 `src/shared` 이동을 검토합니다.

## Accessibility

- 텍스트가 없는 버튼에는 `aria-label`을 제공합니다.
- 입력 요소는 `label`과 연결합니다.
- heading level은 논리적인 순서를 유지합니다.
- focus indicator를 임의로 제거하지 않습니다.
