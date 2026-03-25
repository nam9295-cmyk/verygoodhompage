---
description: VeryGood 메인 허브 통합 개편 계획
---

VeryGood 메인 허브 통합 개편 계획

1. 목표

verygood-chocolate.com을 베리굿 전체 브랜드의 통합 허브로 재설계한다.

현재 흩어져 있는 자산을 하나의 사용자 경험으로 묶는다.

대상 자산:
	•	verygood-chocolate.com : 기존 제품 소개 사이트
	•	kr.verygood-chocolate.com : 한국어 오프라인 매장/제품 소개 사이트
	•	영어 블로그 / 한국어 블로그 : 내용은 동일, 언어만 다름
	•	rcpt-review.pages.dev : 오프라인 매장 리뷰 페이지
	•	partner.verygood-chocolate.com : 케이크 예약 페이지
	•	wellness app 관련 소개 페이지
	•	admin / dashboard 관련 소개 페이지
	•	AI 추천 베타(테스터) 소개 및 진입 포인트

핵심 방향:
	•	브랜드 입구는 하나로 통합한다.
	•	기존 기능성 서비스는 당장 무리하게 삭제하지 않는다.
	•	먼저 메인 허브 구조와 공통 UI를 만든다.
	•	이후 기존 자산을 단계적으로 연결하거나 흡수한다.

⸻

2. 이번 작업의 원칙
	1.	기존 페이지를 바로 삭제하지 않는다.
	2.	먼저 새 홈, 공통 헤더, 공통 푸터, 메뉴 구조를 만든다.
	3.	기존 외부 페이지(리뷰, 예약, 앱, 관리자)는 우선 링크 연결 기반으로 유지한다.
	4.	kr.verygood-chocolate.com의 콘텐츠는 장기적으로 메인 사이트 안으로 흡수한다.
	5.	블로그는 하나의 구조로 통합한다.
	6.	한국어/영어는 같은 사이트 안에서 언어 구조로 정리한다.
	7.	React + Vite 구조를 유지한다.
	8.	디자인은 브랜드 허브형 / 에디토리얼 느낌 / 카드형 섹션 구조로 정리한다.

⸻

3. 최종 사이트 방향

메인 도메인:
	•	verygood-chocolate.com

역할:
	•	브랜드 소개
	•	제품 소개
	•	오프라인 매장 안내
	•	서비스 안내
	•	디지털 서비스 안내
	•	블로그
	•	예약 / 리뷰 / 앱 / 관리자 / AI 베타로 연결되는 허브

즉, 단순 제품 소개 사이트가 아니라 브랜드 플랫폼의 메인 입구로 개편한다.

⸻

4. 추천 상단 메뉴 구조
	•	Home
	•	Brand
	•	Products
	•	Store
	•	Services
	•	Digital
	•	Blog
	•	Contact

푸터 보조 링크:
	•	Reviews
	•	Cake Reservation
	•	Wellness App
	•	Admin Dashboard
	•	AI Beta
	•	Instagram

⸻

5. 사이트맵 v1

verygood-chocolate.com
├─ Home
├─ Brand
├─ Products
│  ├─ Chocolate
│  ├─ Blending Tea
│  └─ Gift / Seasonal
├─ Store
│  ├─ Offline Store
│  ├─ Visit Info
│  └─ Store Products
├─ Services
│  ├─ Cake Reservation
│  ├─ Reviews
│  └─ Order / Gift Guide
├─ Digital
│  ├─ Wellness App
│  ├─ Admin Dashboard
│  ├─ Partner Tools
│  └─ AI Beta
├─ Blog
│  ├─ All Posts
│  ├─ Product
│  ├─ Store
│  ├─ Wellness
│  └─ Story
└─ Contact


⸻

6. 언어 구조

기본 언어는 한국어 기준으로 정리한다.

추천 구조:
	•	한국어: verygood-chocolate.com/...
	•	영어: verygood-chocolate.com/en/...

블로그 구조:
	•	한국어 블로그: /blog
	•	영어 블로그: /en/blog

예시:
	•	/blog
	•	/blog/[slug]
	•	/en/blog
	•	/en/blog/[slug]

주의:
	•	기존 영어 블로그와 한국어 블로그는 별도 사이트처럼 유지하지 않는다.
	•	같은 사이트 안에서 언어만 분기한다.

⸻

7. 각 섹션 역할 정의

Home

브랜드 전체 허브 첫 화면.

포함 요소:
	•	Hero
	•	브랜드 요약
	•	대표 제품
	•	오프라인 매장 소개
	•	서비스 카드
	•	디지털 경험 소개
	•	최근 블로그 글

Brand

브랜드 철학, 스토리, 방향성.

Products

초콜릿 / 블렌딩 티 / 시즌 / 선물세트.

Store

오프라인 매장 소개, 위치, 운영시간, 매장 중심 제품.
기존 kr.verygood-chocolate.com의 핵심 내용을 장기적으로 이 섹션으로 흡수.

Services

고객 행동 유도 페이지.
	•	케이크 예약
	•	리뷰 보기
	•	주문 / 선물 안내

Digital

디지털 서비스 소개.
	•	wellness app
	•	admin dashboard
	•	partner / reservation tools
	•	AI beta

Blog

브랜드/제품/매장/웰니스 관련 콘텐츠 허브.

Contact

연락처, 위치, 운영시간, SNS, 문의.

⸻

8. 홈 화면 섹션 구성 v1
	1.	Hero Section
	•	베리굿 한 줄 소개
	•	주요 CTA 2~3개
	•	예: 제품 보기 / 매장 보기 / 디지털 경험 보기
	2.	Brand Overview
	•	chocolate
	•	blending tea
	•	offline store
	•	digital wellness experience
	3.	Featured Products
	•	대표 초콜릿
	•	대표 티
	•	선물세트 또는 시즌 제품
	4.	Visit the Store
	•	매장 사진
	•	오프라인 경험
	•	위치 / 운영시간
	5.	Services
	•	Cake Reservation
	•	Reviews
	•	Order / Gift Guide
	6.	Digital Experience
	•	Wellness App
	•	Admin Dashboard
	•	AI Recommendation Beta
	7.	Latest from Blog
	•	최근 글 3개 정도 표시
	8.	Contact / Footer
	•	주소
	•	연락처
	•	링크 모음

⸻

9. 기존 자산 처리 방향

A. verygood-chocolate.com
	•	새 메인 허브의 중심 프로젝트로 사용
	•	이번 작업의 기준 프로젝트

B. kr.verygood-chocolate.com
	•	콘텐츠는 점진적으로 메인 사이트의 Store / Products 섹션으로 흡수
	•	당장은 구조 참고용 자산으로 활용
	•	즉시 삭제하지 않음

C. 영어/한국어 블로그
	•	하나의 Blog 메뉴로 통합
	•	언어는 / 와 /en/ 구조로 정리
	•	동일한 글을 각 언어별 경로로 제공 가능하게 설계

D. rcpt-review.pages.dev
	•	우선 Services > Reviews에서 링크 연결
	•	장기적으로 메인 사이트 안으로 흡수 가능

E. partner.verygood-chocolate.com
	•	우선 Services > Cake Reservation 또는 Digital > Partner Tools에서 링크 연결
	•	장기적으로 구조 통합 가능

F. wellness app / admin web
	•	우선 Digital 섹션에서 소개 및 진입 링크 제공
	•	실제 앱과 관리자 웹은 별도 실행 주소 유지 가능

G. AI Beta
	•	메인 핵심 기능처럼 과하게 전면 배치하지 않음
	•	Digital 또는 하단 실험/베타 카드로 소개
	•	“체험/베타” 톤으로 접근

⸻

10. 이번 구현 단계

Phase 1. 분석
	•	현재 프로젝트 구조 파악
	•	라우팅 구조 확인
	•	공통 레이아웃 가능성 점검
	•	기존 컴포넌트 재사용 가능 범위 파악

Phase 2. 정보 구조 정리
	•	상단 메뉴 확정
	•	하위 경로 구조 제안
	•	홈 섹션 순서 정리

Phase 3. 공통 UI 제작
	•	Header
	•	Navigation
	•	Footer
	•	공통 카드 / 버튼 / 섹션 스타일

Phase 4. 새 Home 구현
	•	허브형 메인페이지 제작
	•	각 섹션 카드 구성
	•	기존 서비스 링크 연결

Phase 5. Blog 메뉴 통합
	•	Blog 상단 메뉴 추가
	•	한국어/영어 블로그 경로 구조 정리
	•	최근 글 섹션 추가

Phase 6. 연결 정리
	•	Reviews 링크 연결
	•	Reservation 링크 연결
	•	Wellness/App/Admin 링크 연결
	•	AI Beta 진입 포인트 연결

Phase 7. 후속 정리 제안
	•	중복 페이지 목록 정리
	•	추후 흡수 대상 제안
	•	리다이렉트 필요 목록 제안

⸻

11. Codex 작업 지시 핵심

Codex는 아래 원칙으로 작업한다.
	•	기존 기능을 바로 삭제하지 말 것
	•	먼저 메인 허브 구조를 만들 것
	•	새 사이트맵에 맞는 라우팅을 설계할 것
	•	공통 레이아웃과 홈을 먼저 만들 것
	•	기존 외부 서비스는 우선 링크 연결 기반으로 유지할 것
	•	Blog를 정식 상단 메뉴로 추가할 것
	•	한국어/영어 블로그를 같은 사이트 구조 안으로 통합할 수 있게 설계할 것
	•	디자인 톤은 브랜드형, 깔끔한 에디토리얼 구조로 정리할 것

⸻

12. Codex에게 먼저 요청할 실제 작업
	1.	현재 프로젝트 구조를 분석해 요약하기
	2.	이 문서 기준으로 새 라우팅 구조 제안하기
	3.	상단 메뉴와 푸터 구조 만들기
	4.	허브형 Home 페이지 초안 만들기
	5.	Blog 메뉴 추가 및 /blog, /en/blog 경로 설계안 제안하기
	6.	기존 리뷰 / 예약 / 앱 / 관리자 링크 연결 포인트 만들기
	7.	마지막에 “기존 구조에서 정리 가능한 부분” 목록 제안하기

⸻

13. 이번 단계에서 하지 않을 것
	•	기존 모든 사이트를 한 번에 삭제
	•	리뷰 / 예약 / 앱 / 관리자 기능을 무리하게 한 코드베이스로 완전 통합
	•	실제 데이터 구조를 먼저 대공사
	•	AI Beta를 메인 기능처럼 과도하게 전면 배치

이번 단계의 목표는 브랜드 허브 완성이다.

⸻

14. 최종 한 줄 정리

이번 작업은 verygood-chocolate.com을 베리굿 전체의 통합 메인 허브로 재설계하고, 제품 / 매장 / 서비스 / 디지털 / 블로그를 하나의 브랜드 경험으로 정리하는 프로젝트다.