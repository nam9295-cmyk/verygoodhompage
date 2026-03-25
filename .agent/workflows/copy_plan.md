---
description: VeryGood 최종 카피 Polish 및 리다이렉트 정리 계획
---

VeryGood 최종 카피 Polish 및 리다이렉트 정리 계획

목적

현재 통합 허브 1차 구조, 자산 연동, 실제 링크 연결이 완료된 상태에서,
남은 마감 작업을 브랜드 완성도 중심으로 정리한다.

이번 단계의 목표는 개발 추가보다 아래 3가지를 마무리하는 것이다.
	1.	최종 카피 polish
	2.	리다이렉트 / 유지 / 흡수 정책 정리
	3.	공개 전 운영 점검 체크리스트 확정

⸻

1. 현재 상태 요약

현재 완료된 항목:
	•	메인 허브 IA 구성 완료
	•	라우트 단위 lazy loading 및 Suspense fallback 적용 완료
	•	기존 기능 유지 섹션 정리 완료
	•	Services / Digital / Store 자산 연동 완료
	•	실제 링크 반영 완료
	•	Reviews: reciept.verygood-chocolate.com
	•	Cake Reservation: partner.verygood-chocolate.com
	•	Wellness App: 소개형 연결 정리 완료
	•	Admin Dashboard: 실제 화면 반영 완료
	•	AI Beta: 설명형 상태 유지
	•	자산/문구/연동 설정 분리 완료
	•	projectIntegrations.js
	•	siteContent.js
	•	sectionAssets.js
	•	빌드 검증 완료 (npm run build)
	•	home-legacy 보존 + noindex 처리 유지

즉, 현재는 구조 공사 종료 후 마감 정리 단계이다.

⸻

2. 이번 단계 우선순위

Priority 1. 최종 카피 Polish

사용자가 처음 보는 인상과 브랜드 완성도를 높이기 위해,
전 페이지 주요 문구를 정리한다.

Priority 2. 리다이렉트 / 유지 정책 문서화

기존 도메인/경로를 어떤 기준으로 유지하고, 어떤 것은 흡수하고,
어떤 것은 장기적으로 리다이렉트할지 정리한다.

Priority 3. 운영 공개 체크리스트 확정

공개 전에 메뉴, 링크, 모바일, 준비중 기능 표현을 최종 점검한다.

⸻

3. 카피 Polish 대상 섹션

Home
	•	Hero title
	•	Hero description
	•	Hero CTA
	•	Brand Overview section
	•	Featured Products section
	•	Visit the Store section
	•	Services section
	•	Digital Experience section
	•	Latest from Blog section
	•	Contact preview section

Brand
	•	브랜드 소개 문구
	•	스토리 요약 문구
	•	About / Business Story와의 중복 여부 점검

Products
	•	제품 카테고리 설명
	•	Chocolate / Tea / Gift / Seasonal 소개 문구

Store
	•	매장 소개 문구
	•	방문 유도 문구
	•	오프라인 경험 강조 문구

Services
	•	Cake Reservation 카드 문구
	•	Reviews 카드 문구
	•	Order / Gift Guide 문구

Digital
	•	Wellness App 문구
	•	Admin Dashboard 문구
	•	AI Beta 문구

Blog
	•	블로그 소개 문구
	•	최근 글 섹션 설명

Contact
	•	문의 / 방문 / 운영시간 안내 문구

⸻

4. 카피 작성 원칙
	1.	짧고 명확하게 쓴다.
	2.	브랜드형 톤을 유지한다.
	3.	과장 광고 문구보다 안내형 문구를 우선한다.
	4.	기술 설명투를 줄이고, 사용자 입장에서 읽히게 쓴다.
	5.	버튼 문구는 1~2단어 중심으로 통일한다.
	6.	준비중 기능은 어색하지 않게 설명형으로 정리한다.

⸻

5. 버튼 / CTA 톤 통일 규칙

권장 버튼 톤
	•	Explore
	•	View More
	•	Visit
	•	Read More
	•	Learn More
	•	Preview

지양할 표현
	•	과한 홍보형 문구
	•	길고 설명적인 버튼 문구
	•	한 페이지 안에서 톤이 들쭉날쭉한 CTA

⸻

6. AI Beta 표현 원칙

AI Beta는 아직 실제 기능이 없으므로,
메인 핵심 기능처럼 보이지 않게 아래 원칙으로 정리한다.
	•	링크는 강제하지 않는다.
	•	설명형 / 프리뷰형 카드로 유지한다.
	•	“곧 출시”보다 “추천 경험을 다듬는 중” 톤이 자연스럽다.
	•	버튼은 Preview 또는 Learn More 수준으로 제한 가능하다.

예시 톤:
	•	새로운 추천 경험을 준비하고 있습니다.
	•	베리굿의 추천 흐름을 확장하기 위한 베타 실험입니다.

⸻

7. Wellness App / Admin 문구 원칙

Wellness App
	•	실제 앱 링크보다, 브랜드의 디지털 확장 흐름으로 보여야 함
	•	기록과 추천을 연결하는 경험 중심
	•	지나치게 기술 스택 설명으로 가지 않기

Admin Dashboard
	•	내부 운영용 도구라는 점은 드러나되,
너무 개발자용 툴처럼 보이지 않게 정리
	•	“운영과 관리 흐름을 정리하는 시스템” 톤 유지
	•	직접 로그인 유도보다 소개 중심

⸻

8. 리다이렉트 / 유지 / 흡수 정책

이번 단계에서는 실제 리다이렉트를 바로 적용하지 않고,
먼저 아래 기준으로 정책을 문서화한다.

A. 유지

즉시 삭제하거나 리다이렉트하지 않고 유지하는 대상
	•	home-legacy
	•	about
	•	business-story
	•	기존 주문 / 카트 / 체크아웃 / 법률 페이지

B. 흡수 예정

새 허브 내용과 겹치며, 장기적으로 메인 섹션에 흡수할 대상
	•	kr.verygood-chocolate.com의 매장 / 한국어 콘텐츠
	•	기존 분리된 블로그 구조

C. 리다이렉트 예정

새 구조가 안정화된 뒤 리다이렉트 검토할 대상
	•	언어별 분산 블로그 경로
	•	중복 소개 성격 페이지
	•	허브로 대체 가능한 구형 진입 경로

⸻

9. 리다이렉트 정책 문서에 포함할 항목

각 경로마다 아래 기준으로 정리한다.
	•	기존 경로
	•	현재 상태
	•	새 허브에서 대응되는 위치
	•	즉시 유지 / 추후 흡수 / 추후 리다이렉트
	•	SEO 주의 필요 여부
	•	비고

예시 형식:

기존 경로	현재 상태	대응 위치	처리 정책	비고
/home-legacy	보존 중	/	유지	noindex 유지
/about	기존 소개	/brand	유지 후 추후 흡수	중복 카피 정리 필요
/business-story	기존 브랜드 스토리	/brand	유지 후 추후 흡수	내용 재편 가능


⸻

10. 공개 전 운영 체크리스트

링크
	•	상단 메뉴 전부 정상 이동하는가
	•	Services 카드 링크가 정상 작동하는가
	•	Reviews 링크가 정상 작동하는가
	•	Cake Reservation 링크가 정상 작동하는가
	•	Wellness App 소개 페이지가 자연스러운가
	•	Admin 소개 페이지가 과하게 내부툴처럼 보이지 않는가
	•	AI Beta 카드가 비어 보이지 않는가

레이아웃
	•	모바일 메뉴가 정상 동작하는가
	•	카드 높이가 과도하게 들쭉날쭉하지 않은가
	•	섹션 간격이 일정한가
	•	로딩 fallback이 어색하지 않은가
	•	lazy loading 중 레이아웃 점프가 과하지 않은가

콘텐츠
	•	Hero 문구가 브랜드를 5초 안에 설명하는가
	•	Products / Store / Services / Digital 구분이 명확한가
	•	Blog 소개 문구가 자연스러운가
	•	준비중 기능이 허술해 보이지 않는가

운영
	•	home-legacy noindex 적용 유지 확인
	•	footer 링크 점검
	•	메타/기본 alt 점검
	•	외부 링크 오타 여부 확인

⸻

11. 이번 단계에서 하지 않을 것
	•	새로운 기능 대량 추가
	•	AI Beta 실제 구현 시작
	•	앱 / 관리자 완전 통합
	•	기존 legacy 페이지 즉시 삭제
	•	세부 애니메이션 과몰입
	•	SEO 세부 튜닝 대공사

이번 단계의 핵심은 브랜드 허브 마감 정리다.

⸻

12. Codex에게 요청할 최종 작업

Step 1. 카피 Polish

아래 순서로 문구를 다듬는다.
	1.	Home
	2.	Services
	3.	Digital
	4.	Blog
	5.	Contact
	6.	Brand / Products / Store

Step 2. 버튼 / 카드 톤 통일
	•	CTA 문구 통일
	•	카드 설명 길이 통일
	•	준비중 기능 표현 통일

Step 3. 리다이렉트 전략 문서 초안 작성
	•	기존 경로 목록 정리
	•	유지 / 흡수 / 리다이렉트 예정 구분
	•	대응 경로 제안

Step 4. 최종 QA 체크
	•	메뉴
	•	링크
	•	모바일
	•	home-legacy 처리
	•	준비중 기능 표현

⸻

13. 최종 한 줄 정리

현재 허브는 구조적으로 거의 완성된 상태이며,
이번 단계는 verygood-chocolate.com을 실제 공개 가능한 수준으로 다듬기 위한
최종 카피 polish + 리다이렉트 정책 정리 + 운영 점검 단계이다.