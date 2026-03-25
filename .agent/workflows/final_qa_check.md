# VeryGood Final QA Check

목적

허브 공개 전, 현재 코드 기준으로 확인 가능한 항목과 수동 확인이 필요한 항목을 나눠 최종 점검한다.

기준 시점

- 빌드 검증: 완료
- 카피 polish: 완료
- 리다이렉트 정책 문서: 작성 완료
- 실제 리다이렉트 적용: 미적용

## 1. 메뉴

| 항목 | 상태 | 비고 |
| --- | --- | --- |
| 상단 1차 메뉴 `Home / Brand / Products / Store / Services / Digital / Blog / Contact` | 확인 | `siteContent.js` 기준 정리 완료 |
| `/` 와 `/en` 미러 구조 | 확인 | `LocaleLayout`, `pathUtils` 구조 유지 |
| 모바일 메뉴 오버레이 | 코드상 확인 | 실제 디바이스 수동 확인 권장 |
| 언어 전환 시 현재 경로 유지 | 코드상 확인 | `LanguageSelector`에서 locale swap 처리 |

## 2. 링크

| 항목 | 상태 | 비고 |
| --- | --- | --- |
| Reviews 링크 | 확인 | [https://reciept.verygood-chocolate.com/](https://reciept.verygood-chocolate.com/) |
| Cake Reservation 링크 | 확인 | [https://partner.verygood-chocolate.com/](https://partner.verygood-chocolate.com/) |
| Wellness App | 확인 | 외부 앱 링크 대신 `/digital` 설명형 유지 |
| Admin Dashboard | 확인 | 홈에서는 설명형, 실제 기능 경로는 `/admin` 유지 |
| AI Beta | 확인 | 링크 없이 `Preview` 톤 유지 |
| Instagram 링크 | 확인 | Footer / Contact / Home 보조 링크 유지 |

## 3. 카피와 톤

| 항목 | 상태 | 비고 |
| --- | --- | --- |
| Home hero 문구 | 완료 | 브랜드형 짧은 문구로 정리 |
| Services / Digital / Blog / Contact 문구 | 완료 | 설명투 축소, 안내형 톤 유지 |
| 버튼 톤 통일 | 완료 | `Explore / Visit / Read More / Learn More / Preview` 기준 |
| 준비중 기능 표현 | 완료 | `AI Beta`는 설명형 `Preview` 유지 |

## 4. home-legacy 처리

| 항목 | 상태 | 비고 |
| --- | --- | --- |
| `/home-legacy` 경로 보존 | 확인 | 기존 기능 유지 원칙 반영 |
| `noindex, nofollow` | 확인 | `HomePage.jsx` 적용 유지 |
| 새 허브 이동 유도 | 확인 | 안내 배너 유지 |

## 5. SEO / 메타

| 항목 | 상태 | 비고 |
| --- | --- | --- |
| 허브/섹션 메타 description | 확인 | 주요 페이지 반영 |
| legacy canonical 유지 | 확인 | 기존 주요 경로 반영 상태 |
| 실제 리다이렉트 미적용 | 확인 | 정책 문서만 작성 |
| 주문/결제/관리자 인덱스 정책 | 추후 검토 | 필요 시 `noindex` 확대 검토 |

## 6. 접근성 / 기본 속성

| 항목 | 상태 | 비고 |
| --- | --- | --- |
| 주요 이미지 alt | 대체로 확인 | 허브/섹션 주요 이미지 반영 |
| 메뉴 / 버튼 aria-label | 확인 | Header, loading fallback, tabs 등 반영 |
| 외부 링크 rel 처리 | 확인 | `noreferrer` 적용 |

## 7. 빌드 / 구조

| 항목 | 상태 | 비고 |
| --- | --- | --- |
| `npm run build` | 통과 | 최종 확인 완료 |
| lazy loading / fallback | 유지 | 허브 구조 기준 정상 |
| 리다이렉트 정책 문서 | 완료 | `redirect_policy_draft.md` 작성 |

## 8. 수동 확인 권장

- 모바일 실제 화면에서 메뉴 오버레이 열림/닫힘
- 카드 높이와 줄 수 균형
- 외부 링크 새 탭 동작
- `/en` 경로에서 카피와 CTA 톤 자연스러움
- `home-legacy` 배너와 noindex 상태 재확인

## 현재 결론

- 현재 허브는 공개 전 마감 단계까지 정리된 상태다.
- 구조, 카피, 링크, 정책 문서 기준으로는 1차 공개 준비가 가능하다.
- 남은 일은 실제 운영 화면에서의 수동 확인과, 추후 리다이렉트 시점 결정이다.
