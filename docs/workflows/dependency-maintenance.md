# Dependency Maintenance

의존성 업데이트는 설치 성공뿐 아니라 보안 권고, 호환성, lockfile과 실제 배포 경로를 함께 확인합니다.

## Source Of Truth

- 직접 의존성과 허용 버전 범위는 `package.json`에서 관리합니다.
- 전이 의존성 override는 루트 `pnpm-workspace.yaml`에서 관리합니다.
- 실제 해상도 결과는 생성된 `pnpm-lock.yaml`로 고정하며 lockfile을 수동 편집하지 않습니다.

## Security Update

1. `pnpm audit`으로 현재 lockfile의 알려진 취약점을 확인합니다.
2. 직접 의존성은 공식 릴리스와 peer dependency, framework 및 build 호환성을 검토한 뒤 업데이트합니다.
3. 취약 패키지가 전이 의존성이고 상위 패키지 업데이트만으로 해결하기 어렵거나 불필요한 major 변경이 필요하면 pnpm `overrides`를 검토합니다.
4. override selector는 현재 lockfile에 설치된 취약 버전 계열만 대상으로 하고, 대상 버전은 공식 보안 권고의 patched version을 사용합니다.
5. 보안 권고가 요구하지 않는 major 업데이트는 별도 호환성 검토 없이 override에 포함하지 않습니다.
6. `pnpm install`로 lockfile을 다시 생성한 뒤 audit과 관련 검증을 반복합니다.

## Override Maintenance

`overrides`는 상위 패키지 업데이트로 안전한 의존성 그래프를 구성할 수 있을 때까지 사용하는 임시 정책입니다.

- 의존성 변경 PR의 작성자는 기존 override가 여전히 필요한지 확인합니다.
- 리뷰어는 selector가 공식 권고의 affected range보다 넓지 않은지와 대상 버전이 patched version인지 확인합니다.
- 상위 패키지 업데이트만으로 취약 버전이 제거되면 override를 삭제하고 lockfile을 다시 생성합니다.
- override가 존재하는 동안 CI와 Vercel build에는 `pnpm-workspace.yaml`이 함께 제공되어야 합니다.

## Verification

변경 범위에 따라 아래 검증을 선택하고, 실행하지 못한 항목은 이유를 기록합니다.

```bash
pnpm install --frozen-lockfile
pnpm audit
pnpm format:check
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

- `pnpm-lock.yaml` 상단의 override selector와 대상 버전이 `pnpm-workspace.yaml`과 일치하는지 확인합니다.
- audit 결과는 전체 심각도 기준으로 확인하고, 허용하거나 보류한 취약점이 있다면 근거를 PR에 남깁니다.
- Next.js, Sentry 등 production runtime이나 빌드 산출물에 영향을 주는 의존성을 변경했다면 Vercel preview deployment 또는 `pnpm build` 결과를 기준으로 확인합니다.
- 배포 방식을 변경하면 실제 배포 산출물에 맞춰 CI와 preview 검증 기준도 함께 갱신합니다.
