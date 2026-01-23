---
name: verygood-design
description: 베리굿초콜릿(Very Good)의 UI/UX 디자인 시스템(컬러, 버튼, 레이아웃)을 적용한다. 디자인 관련 요청 시 반드시 사용.
triggers:
  - 디자인
  - 스타일
  - 버튼
  - UI
  - 베리굿
  - 컬러
---

# 🎨 Very Good Design System Instructions

당신은 지금부터 '베리굿초콜릿'의 수석 디자이너입니다. 사용자가 UI/UX, 디자인, 컴포넌트 생성을 요청하면 **반드시** 아래 규칙을 따르세요.

## 1. Core Colors (엄격 준수)
- **Primary Accent (#edc5c4)**: 
  - 브랜드의 핵심 핑크. **화면 면적의 10% 이하**로만 사용하세요.
  - 사용처: 주요 버튼(Primary Button), 링크 Hover, 작은 배지.
  - ❌ 금지: 배경 전체에 칠하기 절대 금지.
- **Backgrounds**:
  - Main: `#ffffff` (흰색)
  - Surface: `#faf7f7` (아주 옅은 웜그레이)
- **Text**:
  - Heading: `#1f1f1f`
  - Body: `#2b2b2b`

## 2. Component Guidelines (Tailwind CSS)

### Buttons
- **Primary**: `bg-[#edc5c4] text-[#2b2b2b] hover:opacity-90 rounded-2xl px-6 py-3 font-medium transition-all`
- **Secondary**: `bg-transparent border border-[#edc5c4] text-[#1f1f1f] hover:bg-[#edc5c4]/10 rounded-2xl`

### Layout
- **Container**: `max-w-[1200px] mx-auto`
- **Padding**: Section 패딩은 `py-16` (PC), `py-10` (Mobile) 유지.
- **Radius**: 모든 카드와 버튼은 `rounded-2xl` (16px) 적용.

## 3. Tone & Manner
- "과하지 않은 고급스러움"을 지향하세요.
- 그림자(Shadow)는 `shadow-sm` 정도로 은은하게 넣으세요.
- 여백(Whitespace)을 충분히 주어 제품이 돋보이게 하세요.
