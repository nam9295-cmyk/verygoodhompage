---
description: VeryGood 허브 개편 후속 정리 메모
---

# VeryGood 허브 개편 후속 정리

기준 프로젝트:
- `/Users/nam9295/Desktop/john_2.0/code/verygood_hompage_en/verygoodhompage`

기준 상태:
- 허브형 홈, 공통 헤더/푸터, `/` + `/en` 미러 라우팅, `Brand / Store / Services / Digital / Blog / Contact` 1차 랜딩 구현 완료
- 기존 기능 삭제 없이 유지 중
- `home-legacy`는 보존 경로로 분리되었고, 상단 안내 배너 + `noindex` 처리 완료

## 0. 현재 진행률

- Phase 1 분석: 완료
- Phase 2 정보 구조/라우팅 재설계: 완료
- Phase 3 공통 헤더/푸터/내비 구축: 완료
- Phase 4 허브형 홈 구현: 완료
- Phase 5 Blog 통합 및 `/blog`, `/en/blog` 구조 정리: 완료
- Phase 6 리뷰/예약/앱/관리자 연결 포인트 구성: 대부분 완료
- Phase 7 후속 정리 제안 및 장기 흡수 기준 문서화: 진행 중

현재 체감 진행률:
- 허브 1차 개편 기준 약 85~90%

## 1. 현재 라우트 분류

### A. 새 허브 구조
- `/`
- `/en`
- `/brand`
- `/store`
- `/services`
- `/digital`
- `/contact`
- `/blog`
- `/blog/:id`
- `/en/blog`
- `/en/blog/:id`

### B. 기존 유지 라우트
- `/about`
- `/business-story`
- `/products`
- `/category/:id`
- `/product/:id`
- `/cart`
- `/checkout`
- `/order-success`
- `/privacy`
- `/terms`
- `/refund`
- `/shipping`
- `/admin`
- `/home-legacy`

## 2. 중복/겹침 페이지 목록

### 2-1. Brand 계열
- `/brand`
- `/about`
- `/business-story`

설명:
- 현재 `Brand`는 허브형 요약 랜딩 역할
- `/about`, `/business-story`는 상세 읽기 페이지 역할
- 내용 축이 겹치므로 장기적으로는 `Brand` 아래 서브 읽기 흐름으로 재배치 가능

현재 권장:
- 유지
- `Brand`는 허브형 입구
- `About`, `Business Story`는 상세 문서형 페이지로 남김

장기 권장:
- `/brand`를 중심 브랜드 페이지로 키우고
- `/about`, `/business-story`를 `Brand` 하위 읽기 모듈로 흡수 또는 축소

### 2-2. Home 계열
- `/`
- `/home-legacy`
- 기존 `HomePage` 내부 섹션들

설명:
- 현재 `/`는 새 허브 홈
- `/home-legacy`는 기존 랜딩을 보존하기 위한 임시 경로
- 구형 Hero/Shop/Story/Blog/Contact 흐름이 새 허브 홈과 역할이 겹침

현재 권장:
- 유지
- 내부 참고/비교용으로만 `home-legacy` 보존
- 검색 유입 방지를 위해 `noindex` 유지
- 페이지 상단에서 새 허브 홈으로 이동시키는 안내 배너 유지

장기 권장:
- 충분히 안정화되면 `/home-legacy` 제거 후보

### 2-3. Store / Contact 정보 중복
- `/store`
- `/contact`
- 푸터 연락처
- 홈의 `Visit the Store`

설명:
- 주소, 운영시간, 방문 안내가 여러 위치에 반복됨
- 하지만 이 정보는 반복 노출이 오히려 유리한 유형

현재 권장:
- 중복 허용
- `Store`는 상세 방문 안내
- `Contact`는 빠른 확인용
- 푸터는 전역 요약용

장기 권장:
- 데이터 소스는 하나로 정리하고 표시 위치만 다르게 유지

### 2-4. Products 계열
- `/products`
- `/category/chocolate`
- `/category/tea`
- `/category/gift`

설명:
- `/products`는 전체 컬렉션 허브
- `/category/:id`는 카테고리 상세 진입
- 역할이 다르므로 당장 중복 삭제 대상은 아님

현재 권장:
- 유지

장기 권장:
- `/products`를 더 강한 컬렉션 허브로 만들고
- `category`는 필터형 또는 서브컬렉션형으로 정리

### 2-5. Services / 외부 페이지 역할 겹침
- `/services`
- `https://rcpt-review.pages.dev`
- `https://partner.verygood-chocolate.com`

설명:
- `Services`는 허브 설명/진입 페이지
- 실제 기능은 외부 서비스가 담당

현재 권장:
- 유지
- 허브는 링크 집약 페이지

장기 권장:
- 리뷰/예약 흐름 일부를 메인 사이트 안으로 흡수 검토

## 3. 추후 흡수 대상

### 우선순위 A
- `kr.verygood-chocolate.com` 핵심 오프라인 매장 안내
- 매장 방문 정보
- 매장 중심 제품 소개
- 오프라인 중심 카피/사진 자산

흡수 위치:
- `/store`
- 일부는 `/products`

이유:
- 허브 구조에서 가장 자연스럽게 메인 사이트 안으로 들어올 수 있는 자산

### 우선순위 B
- `/about`
- `/business-story`

흡수 위치:
- `/brand`

이유:
- 브랜드 메시지를 한 축으로 모아야 상단 메뉴 구조가 더 단단해짐

### 우선순위 C
- 기존 홈의 `story`, `faq`, `contact` 섹션

흡수 위치:
- `/brand`
- `/contact`
- 일부는 새 홈

이유:
- 현재 `home-legacy`에 남아 있는 구형 정보 구조를 새 허브에 순차적으로 옮길 수 있음

### 우선순위 D
- 리뷰 페이지 일부
- 예약 소개 일부

흡수 위치:
- `/services`
- `/store`

이유:
- 실제 기능 자체는 외부 유지 가능하지만 소개와 설명은 메인 허브 안으로 가져오는 편이 좋음

### 우선순위 E
- 웰니스 앱 소개
- AI 베타 소개

흡수 위치:
- `/digital`

이유:
- 현재는 소개 슬롯만 있음
- 실제 공개 상태가 정리되면 가장 빠르게 완성도를 높일 수 있는 영역

## 4. 리다이렉트 후보

주의:
- 아래는 "지금 당장 적용"이 아니라 "후속 검토 후보"다.
- 현재 원칙은 기존 기능 즉시 삭제 금지.

### 즉시 리다이렉트 금지
- `/products`
- `/category/:id`
- `/product/:id`
- `/cart`
- `/checkout`
- `/order-success`
- `/admin`
- `/blog`
- `/blog/:id`

이유:
- 실제 사용자 기능/데이터/플로우가 살아 있음

### 1차 리다이렉트 후보
- `/home-legacy` -> `/`

조건:
- 새 홈에서 기존 홈 핵심 역할을 충분히 대체한 뒤

### 2차 리다이렉트 후보
- `/about` -> `/brand`
- `/business-story` -> `/brand`

조건:
- `Brand` 페이지 안에 브랜드 철학/비즈니스 스토리 내용이 충분히 흡수된 뒤

### 보류 후보
- `/category/chocolate` -> `/products`
- `/category/tea` -> `/products`
- `/category/gift` -> `/products`

이유:
- 아직 카테고리 탐색 구조가 실제로 유효함
- 지금은 리다이렉트보다 유지가 맞음

### 법적 페이지
- `/privacy`
- `/terms`
- `/refund`
- `/shipping`

권장:
- 유지
- 리다이렉트 대상 아님

## 5. 다음 실제 작업 우선순위

### 5-1. 콘텐츠 흡수
- `Brand`에 `/about`, `/business-story` 핵심 문장 통합
- `Store`에 오프라인 실제 정보 추가
- `Digital`에 실제 앱/AI 상태 반영

### 5-2. 구조 정리
- `home-legacy` 의존도 제거
- `home-legacy` 방문량/내부 의존 확인 후 리다이렉트 전환 여부 판단
- 공통 데이터 소스 정리
- 연락처/운영시간 반복 노출용 데이터 통합

### 5-3. 최종 정리
- 리다이렉트 적용 후보 확정
- 중복 페이지 삭제 여부 검토
- 외부 서비스 흡수 가능성 재평가

## 6. 현재 권장 결론

지금 단계에서 가장 안전한 운영 방향:
- 새 허브 구조는 계속 강화
- 기존 기능 페이지는 유지
- `home-legacy`, `about`, `business-story`는 장기 흡수 후보로 관리
- `Store / Services / Digital / Contact`에 실제 운영 콘텐츠를 점진적으로 채움
- 리다이렉트는 마지막 단계에서만 적용
