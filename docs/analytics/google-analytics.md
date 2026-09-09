# Google Analytics

BUDDYS는 GA4를 운영 환경의 기본 페이지 조회와 유입 경로 분석에 사용합니다. 커스텀 이벤트는 제품 지표와 이벤트 명세가 확정된 뒤 별도 작업으로 추가합니다.

## Runtime Configuration

- 측정 ID는 `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`로 전달합니다.
- 측정 ID는 공개 식별자이지만 소스 코드에 직접 작성하지 않고 배포 환경 변수로 관리합니다.
- 개발 환경에서는 Analytics를 로드하지 않습니다.
- CI는 측정 ID 없이도 빌드되어야 합니다.
- Vercel 운영 환경에는 `G-` 형식의 유효한 측정 ID를 설정합니다.

배포 전달 경로는 다음과 같습니다.

```txt
Vercel Environment Variable
  -> Next.js production build
```

## Page View Policy

GA4의 자동 페이지 조회를 사용하지 않고 App Router의 pathname 변경을 기준으로 `page_view`를 직접 전송합니다. 실제 화면 전환은 각각 집계하되 보고서에 내부 식별자나 검색어가 남지 않도록 보고용 경로를 정규화합니다.

| Browser path                  | Analytics path        |
| ----------------------------- | --------------------- |
| `/posts/123`                  | `/posts/:postId`      |
| `/profile/123`                | `/profile/:userId`    |
| `/chat/123`                   | `/chat/:roomId`       |
| `/customized-explore?keyword` | `/customized-explore` |

`/auth/kakao/callback` 최초 진입에서는 Analytics script를 로드하지 않으며 페이지 조회에서도 제외합니다. URL query string은 Analytics의 `page_location`과 `page_referrer`에 포함하지 않습니다.

초기 진입 URL의 표준 UTM parameter만 별도의 GA4 campaign 설정으로 변환합니다. 이 방식으로 캠페인 유입은 유지하면서 검색어와 OAuth parameter가 페이지 URL로 수집되는 것을 막습니다.

| URL parameter  | GA4 campaign field |
| -------------- | ------------------ |
| `utm_id`       | `campaign_id`      |
| `utm_source`   | `campaign_source`  |
| `utm_medium`   | `campaign_medium`  |
| `utm_campaign` | `campaign_name`    |
| `utm_term`     | `campaign_term`    |
| `utm_content`  | `campaign_content` |

## GA4 Console Checklist

운영 반영 전에 웹 데이터 스트림에서 다음 설정을 완료합니다.

1. 향상된 측정의 페이지 조회 고급 설정에서 페이지 로드와 브라우저 방문 기록 기반 페이지 변경을 비활성화합니다. 코드에서 `send_page_view: false`를 함께 사용해 수동 페이지 조회와 중복되지 않게 합니다.
2. 데이터 마스킹에서 이메일 주소를 활성화하고 `code`, `state`, `keyword` query parameter를 추가합니다.
3. 원치 않는 추천 목록에 `kauth.kakao.com`을 추가해 카카오 로그인 복귀가 새로운 유입 출처로 집계되지 않게 합니다.
4. 데이터 보관 기간은 팀의 개인정보 정책에 맞게 설정합니다. GA4 Standard에서 장기 분석이 필요하면 14개월을 검토합니다.
5. 고정된 팀 IP가 있으면 내부 트래픽 필터를 먼저 `Testing` 상태로 검증한 뒤 활성화를 결정합니다.
6. 광고 기능을 사용하기 전에는 Google Signals와 광고 개인화를 활성화하지 않습니다. 현재 코드에서도 두 기능을 명시적으로 비활성화합니다.

## Privacy

- OAuth code와 state, 사용자 ID, 채팅방 ID, 검색어 원문, 게시글과 채팅 내용은 Analytics event parameter로 전송하지 않습니다.
- 캠페인 URL의 UTM 값에는 이메일, 학번, 사용자 ID 등 개인을 식별할 수 있는 값을 사용하지 않습니다.
- 운영 측정 ID를 활성화하기 전에 서비스 대상 지역과 Analytics 동의 정책을 확정합니다. 사전 동의가 필요한 경우 Consent Mode v2 또는 CMP를 도입하기 전까지 운영 수집을 활성화하지 않습니다.
- 동의 정책이 확정되기 전에는 광고 목적의 이벤트와 사용자 식별 기능을 추가하지 않습니다.

## Verification

- 개발 서버에서 Google Analytics script와 수집 요청이 발생하지 않습니다.
- 운영 빌드의 최초 진입과 client navigation에서 `page_view`가 한 번씩만 발생합니다.
- 동적 상세 경로는 정규화되고 query string은 수집 요청에 포함되지 않습니다.
- 표준 UTM parameter는 대응하는 `campaign_*` 설정으로 전달되고 나머지 query parameter는 전달되지 않습니다.
- 카카오 callback 최초 진입에서는 Analytics script와 `page_view`가 발생하지 않습니다.
- Analytics 또는 광고 차단으로 요청이 실패해도 애플리케이션 동작에는 영향이 없어야 합니다.
- 배포 후 GA4 DebugView와 실시간 보고서에서 수집 결과를 확인합니다.

## Custom Events

커스텀 이벤트는 구현 전에 이벤트 이름, 발생 조건, parameter, 개인정보 포함 여부와 Key Event 지정 여부를 문서화합니다. 로그인, 온보딩 완료, 검색, 필터 적용, 게시글 작성과 채팅 진입은 별도 이슈에서 정의합니다.

## References

- [Next.js Script](https://nextjs.org/docs/app/guides/scripts)
- [GA4 page view measurement](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [GA4 single-page application measurement](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
- [GA4 configuration fields](https://developers.google.com/analytics/devguides/collection/ga4/reference/config)
- [GA4 data redaction](https://support.google.com/analytics/answer/13544947)
- [GA4 unwanted referrals](https://support.google.com/analytics/answer/10327750)
- [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)
