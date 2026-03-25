---
description: VeryGood 자산 연동 실행 현황
---

# VeryGood 자산 연동 실행 현황

## Batch 1 완료

대상:
- `welness_app`
- `welness_admin`
- `code/partners`

반영 위치:
- `Digital > Wellness App`
- `Digital > Admin Dashboard`
- `Services > Cake Reservation`

## 사용한 폴더 경로

- `/Users/nam9295/Desktop/john_2.0/code/welness_app`
- `/Users/nam9295/Desktop/john_2.0/code/welness_admin`
- `/Users/nam9295/Desktop/john_2.0/code/partners`

## 추출한 이미지 경로

원본:
- `/Users/nam9295/Desktop/john_2.0/code/welness_app/assets/images/hero.webp`
- `/Users/nam9295/Desktop/john_2.0/code/welness_app/assets/images/app-icon.png`
- `/Users/nam9295/Desktop/john_2.0/code/partners/public/cake-hero.webp`

현재 허브 내부 복사본:
- `/Users/nam9295/Desktop/john_2.0/code/verygood_hompage_en/verygoodhompage/public/assets/integrations/wellness-app-hero.webp`
- `/Users/nam9295/Desktop/john_2.0/code/verygood_hompage_en/verygoodhompage/public/assets/integrations/wellness-app-icon.png`
- `/Users/nam9295/Desktop/john_2.0/code/verygood_hompage_en/verygoodhompage/public/assets/integrations/cake-reservation-hero.webp`

## 카드별 연결 방식

### Wellness App
- 링크 방식: 소개 중심
- 현재 링크: `/digital`
- 사용 자산: `wellness-app-hero.webp`
- 메모: 실제 Expo 프리뷰 URL은 존재하지만, 정식 공개 전이므로 허브에서는 직접 링크 대신 `Digital` 설명 페이지로 안내

### Admin Dashboard
- 링크 방식: 내부 도구 소개
- 현재 링크: `/admin`
- 사용 자산: `wellness-admin-dashboard.png`, `wellness-admin-parent-mode.png`
- 메모: Playwright 캡처 기준으로 실제 대시보드/parent mode 스크린샷 확보 완료, 하지만 허브에서는 로그인 유도는 최소화

### Cake Reservation
- 링크 방식: 실제 외부 링크
- 현재 링크: `https://partner.verygood-chocolate.com`
- 사용 자산: `cake-reservation-hero.webp`
- 메모: 허브에서는 가장 강한 행동 유도 서비스 카드로 유지

## 이번 배치에서 아직 미확정인 항목

- `AI Beta` 실제 링크

## 다음 배치 예정

대상:
- `code/영수증리뷰이벤트`
- `code/vcc체험단페이지`

반영 위치:
- `Services > Reviews`
- `Store / Visit the Store`

## Batch 2 완료

대상:
- `code/영수증리뷰이벤트`
- `code/vcc체험단페이지`

반영 위치:
- `Services > Reviews`
- `Store / Visit the Store`

## 추가 사용한 폴더 경로

- `/Users/nam9295/Desktop/john_2.0/code/영수증리뷰이벤트`
- `/Users/nam9295/Desktop/john_2.0/code/vcc체험단페이지`

## 추가 추출한 이미지 경로

원본:
- `/Users/nam9295/Desktop/john_2.0/code/영수증리뷰이벤트/public/hero-bg.webp`
- `/Users/nam9295/Desktop/john_2.0/code/vcc체험단페이지/public/vcc_map.png`
- `/Users/nam9295/Desktop/john_2.0/code/vcc체험단페이지/public/logo_b.png`

현재 허브 내부 복사본:
- `/Users/nam9295/Desktop/john_2.0/code/verygood_hompage_en/verygoodhompage/public/assets/integrations/review-event-hero.webp`
- `/Users/nam9295/Desktop/john_2.0/code/verygood_hompage_en/verygoodhompage/public/assets/integrations/store-map.png`
- `/Users/nam9295/Desktop/john_2.0/code/verygood_hompage_en/verygoodhompage/public/assets/integrations/store-logo.png`

## 추가 카드별 연결 방식

### Reviews
- 링크 방식: 실제 외부 링크
- 현재 링크: `https://reciept.verygood-chocolate.com/`
- 사용 자산: `review-event-hero.webp`
- 메모: 이벤트형 후기 랜딩의 톤을 유지하면서 Services와 Store 양쪽 신뢰 레이어로 사용

### Store / Visit the Store
- 링크 방식: 메인 허브 내부 페이지 + 외부 지도 링크
- 현재 링크: `/store`, `https://map.naver.com/p/entry/place/1069379954`
- 사용 자산: `store-map.png`, `store-logo.png`
- 메모: vcc체험단페이지의 위치/지도/브랜드 자산을 허브 안으로 단계적으로 흡수하는 방향

## 현재 남은 미확정 항목

- `AI Beta` 실제 링크

## 운영 메모

- 프로젝트별 링크, 원본 경로, 썸네일 자산은 `/src/config/projectIntegrations.js`로 분리함
- 허브 문구는 `siteContent.js`, 비주얼 매핑은 `sectionAssets.js`가 `projectIntegrations.js`를 참조하는 구조로 정리됨
