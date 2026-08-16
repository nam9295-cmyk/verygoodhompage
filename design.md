# VERYGOOD Australia Main Website — Design Specification

- 작성일: 2026-08-16
- 대상 저장소: `nam9295-cmyk/verygoodhompage`
- 운영 도메인: `https://verygood-chocolate.com`
- 연결할 예약 서비스: `https://au.verygood-chocolate.com`
- 한국 사이트: `https://kr.verygood-chocolate.com`
- 기술 기반: 기존 React + Vite 프로젝트 유지
- 디자인 선행 도구: Penpot 또는 Pencil
- 문서 목적: `verygoodhompage`를 호주 중심 종합 홈페이지로 전환하기 위한 디자인·콘텐츠·구현 기준

---

## 1. 최종 결정

새 도메인과 새 저장소를 만들지 않는다.

현재 `verygood-chocolate.com`에 배포되는 `verygoodhompage` 저장소를 **호주 중심의 베리굿 종합 홈페이지**로 전환한다. 기존 `au.verygood-chocolate.com`은 케이크와 키즈 클래스의 실제 예약 서비스로 그대로 유지하고, 한국 고객은 `kr.verygood-chocolate.com`으로 연결한다.

```text
verygood-chocolate.com
└─ 호주 중심 글로벌 브랜드 홈페이지
   ├─ 회사 및 브랜드 소개
   ├─ Cakes
   ├─ Bakes
   ├─ Chocolate
   ├─ Tea
   ├─ Goods
   ├─ Sydney Kids Classes 소개·연결
   └─ Daegu / Korea 연결

au.verygood-chocolate.com
└─ 운영 중인 예약 서비스, 수정하지 않음
   ├─ 케이크 목록과 옵션
   ├─ 주문 목록
   ├─ 케이크 예약 요청
   ├─ 키즈 클래스 안내·예약
   ├─ 후기
   ├─ 예약 조회
   └─ Appwrite·관리자

kr.verygood-chocolate.com
└─ 한국 매장·메뉴·한국 고객용 사이트
```

이번 작업은 예약 기능 재개발이 아니다. **기존 홈페이지의 프론트와 공개 정보 구조를 호주용 브랜드 카탈로그로 재설계하는 작업**이다.

---

## 2. 기존 저장소에서 재사용할 것

현재 저장소에는 새 사이트를 빠르게 만들 수 있는 기반이 이미 있다.

### 기술 기반

- React 19
- Vite
- React Router
- i18next 기반 한글·영문 구조
- React Helmet 기반 메타 정보
- Cloudflare Pages용 `_headers`, `_redirects`
- 반응형 CSS와 공통 Layout

### 재사용 가능한 코드

- 로고와 언어 전환 구조
- Header·Footer의 기본 컴포넌트 구조
- Product Card의 이미지·텍스트 구조
- Product Detail의 이미지 갤러리 구조
- `products.js`에 있는 초콜릿·티·굿즈 데이터 일부
- `public/assets/products`의 제품 사진
- `public/assets/story`의 브랜드 사진
- 기존 Cloudflare Pages 배포 설정

### 재사용 가능한 제품 자산

- Almond Chocoball
- Strawberry Bonbon
- Ruby Berry Chocoball
- Matcha Berry
- British Black
- Asian Gold
- Hibiscus Fruit
- Minty Chocolat
- 선물 세트 이미지
- 호걸이 키링 이미지

### `au-cake`에서 파일만 복사해 사용할 자산

아래 이미지는 예약 코드를 가져오지 않고 이미지 파일만 새 홈페이지 저장소로 복사한다.

```text
pave-chocolate-cake-sydney.webp
vanilla-cake-sydney.webp
chocolate-pound-cake-sydney.webp
chocolate-cupcakes-sydney.webp
lemon-cake-sydney.webp
chocolatiers-basque-cheesecake-sydney.webp
```

새 홈페이지는 `au-cake`의 소스 코드, Appwrite 설정, 예약 컴포넌트, CSS를 import하지 않는다.

---

## 3. 제거하거나 공개하지 않을 기존 기능

현재 저장소에는 한국 쇼핑몰 및 통합 허브 성격의 기능이 섞여 있다. 호주 홈페이지에서는 다음 항목을 공개 내비게이션과 주요 사용자 흐름에서 제거한다.

```text
Cart
Checkout
Order Success
Admin Dashboard
Wellness App
AI Beta
Digital
한국 오프라인 매장 전용 Store 페이지
한국 리뷰 이벤트
한국 케이크 예약 링크
한국 키즈 클래스 링크
```

### 장바구니·결제 정책

이번 호주 홈페이지에서는 다음을 제공하지 않는다.

- 제품 가격 표시
- 수량 선택
- Add to Cart
- Checkout
- 온라인 결제
- 배송비 계산
- 회원가입
- 재고 표시

초콜릿·티·굿즈는 제품 소개용이다. 케이크와 예약 가능한 구운 과자만 기존 호주 예약 서비스로 연결한다.

### 기존 파일 처리

기존 Cart, Checkout, Admin, Digital 관련 파일은 첫 개편에서 삭제하지 않아도 된다. 다만 새 공개 라우터와 내비게이션에서는 제거하고 번들에 포함되지 않게 한다. 사이트가 안정된 후 별도 정리 작업으로 삭제할 수 있다.

---

## 4. 브랜드 포지셔닝

### 기존 인식

> 한국 초콜릿 제품과 여러 디지털 프로젝트를 한곳에 모은 통합 허브

### 목표 인식

> 대구에서 시작해 시드니로 이어지는 쇼콜라티에 중심의 브랜드. 케이크, 구운 과자, 초콜릿, 티, 캐릭터 굿즈와 프라이빗 키즈 클래스를 소개한다.

### 핵심 문장

```text
BORN IN DAEGU · GROWING IN SYDNEY
Chocolate makes every day verygood.
```

### 디자인 성격

```text
Editorial Chocolatier 80%
Playful Verygood 20%
```

- 제품 사진과 큰 타이포그래피가 중심이다.
- 기본 화면은 차분하고 고급스럽다.
- 호걸이, 굿즈, 키즈 클래스에서만 놀이성을 높인다.
- 쇼핑몰보다는 브랜드 화보와 작은 매거진에 가깝게 보인다.
- 기존 `au-cake`의 아이보리·포레스트 그린·핑크 분위기와 자연스럽게 연결한다.

---

## 5. 주요 사용자와 목표

### 시드니 케이크 고객

- 제품을 빠르게 둘러본다.
- 실제 옵션과 가격은 예약사이트에서 확인한다.
- `View & Book`을 통해 정확한 예약 페이지로 이동한다.

### 시드니 키즈 클래스 부모

- 프라이빗하고 안전한 수업인지 확인한다.
- 클래스 상세와 예약은 기존 `/classes`로 이동한다.

### 브랜드 탐색 고객

- 대구와 시드니의 관계를 이해한다.
- 베리굿이 케이크 외에 초콜릿과 티도 만드는 브랜드임을 알게 된다.

### 한국 고객

- 메인 헤더와 푸터의 `Korea` 링크를 통해 `kr.verygood-chocolate.com`으로 이동한다.

### 성공 기준

- 첫 화면 5초 안에 초콜릿 브랜드, 대구–시드니, 케이크 예약, 키즈 클래스를 이해한다.
- 케이크 예약까지 2번 이내 클릭으로 이동한다.
- 모든 카테고리까지 1번의 메뉴 클릭으로 이동한다.
- 시드니에서 현재 주문 가능한 제품과 소개 전용 제품을 혼동하지 않는다.
- 모바일 360px에서도 메뉴와 CTA가 겹치지 않는다.

---

## 6. 공개 사이트 구조

### 영어 기본 경로

```text
/
├─ /about
├─ /cakes
├─ /bakes
├─ /chocolate
│  └─ /chocolate/:slug
├─ /tea
│  └─ /tea/:slug
└─ /goods
   └─ /goods/:slug
```

### 한국어 보조 경로

```text
/ko
├─ /ko/about
├─ /ko/cakes
├─ /ko/bakes
├─ /ko/chocolate
├─ /ko/chocolate/:slug
├─ /ko/tea
├─ /ko/tea/:slug
├─ /ko/goods
└─ /ko/goods/:slug
```

### 외부 서비스

```text
Book a Cake
→ https://au.verygood-chocolate.com/cakes

Kids Cake Classes
→ https://au.verygood-chocolate.com/classes

Customer Reviews
→ https://au.verygood-chocolate.com/reviews

Find My Booking
→ https://au.verygood-chocolate.com/lookup

Korea
→ https://kr.verygood-chocolate.com
```

### 레거시 경로 정책

현재 `/en`이 영어 경로이므로 개편 후 다음처럼 연결한다.

```text
/en                → /
/en/about          → /about
/en/products       → /chocolate
/category/chocolate → /chocolate
/category/tea       → /tea
/category/gift      → /goods
/brand              → /about
/products           → /chocolate
/cart               → /
/checkout           → /
/order-success      → /
```

기존 개별 `/product/:id`는 제품 ID에 따라 새 `/chocolate/:slug`, `/tea/:slug`, `/goods/:slug`로 내부 전환한다.

---

## 7. 글로벌 내비게이션

### 데스크톱

```text
[VERYGOOD 로고]

About
Cakes
Bakes
Chocolate
Tea
Goods
Kids Classes ↗

Korea ↗
EN / 한국어
[Book a Cake]
```

### 모바일

상단에는 다음 세 요소만 둔다.

```text
[로고]                       [Book] [Menu]
```

전체 화면 메뉴 드로어:

```text
About
Cakes
Bakes
Chocolate
Tea
Goods
Kids Cake Classes ↗
Reviews ↗
Find My Booking ↗
Korea ↗
EN / 한국어
```

### 헤더 원칙

- Cart 버튼을 제거한다.
- Admin 링크를 제거한다.
- 모바일 메뉴를 열면 배경 스크롤을 막는다.
- Escape로 메뉴를 닫는다.
- 현재 페이지를 `aria-current="page"`로 표시한다.
- 외부 링크에는 시각적으로 작은 화살표를 표시한다.

---

## 8. 비주얼 디자인 시스템

### 색상

```css
--au-canvas: #f0eee9;
--au-surface: #ffffff;
--au-surface-soft: #f8f7f4;
--au-forest: #1f5a46;
--au-forest-deep: #164334;
--au-charcoal: #362f31;
--au-muted: #655f61;
--au-pink: #edc5c4;
--au-mint: #ddeae3;
--au-berry: #b83f4c;
--au-kids-yellow: #f6c945;
--au-bakes: #e8d8b5;
--au-goods-blue: #c9d8ea;
```

### 카테고리 포인트 색

```text
Cakes       Verygood Pink
Bakes       Warm Butter Beige
Chocolate   Cacao Brown + Berry Pink
Tea         Forest + Pale Mint
Goods       Soft Blue + Verygood Pink
Kids Class  Yellow accent
```

포인트 색은 화면 면적의 20% 이하로 사용한다. 기본 배경은 아이보리, 기본 CTA와 텍스트 포인트는 포레스트 그린으로 통일한다.

### 타이포그래피

```text
Display: Playfair Display
Body / UI: Work Sans
Korean fallback: Apple SD Gothic Neo, Malgun Gothic, sans-serif
```

권장 크기:

```text
Desktop hero         72–96px
Desktop section H2   44–68px
Mobile hero          42–54px
Mobile section H2    32–42px
Body                  16–18px
UI / label            12–14px
```

### 레이아웃

```text
Maximum page width   1400px
Readable copy width  720–860px
Desktop gutter       32px
Tablet gutter        24px
Mobile gutter        20px
Spacing base         8px
```

### 형태

- 제품 사진 영역은 사각형 또는 작은 라운드만 사용한다.
- CTA는 기존 AU 예약사이트처럼 pill 형태를 사용한다.
- 테두리는 1px 포레스트 또는 반투명 포레스트를 사용한다.
- 그림자는 제품 누끼와 핵심 CTA에만 사용한다.
- 모든 영역을 흰 카드로 감싸는 일반적인 쇼핑몰 레이아웃을 피한다.

---

## 9. 홈페이지 상세 설계

### 섹션 순서

```text
01 Announcement ticker
02 Brand hero
03 Two core experiences
04 Explore the Verygood world
05 Signature selection
06 From Daegu to Sydney
07 Tea spotlight or character spotlight
08 Reviews
09 Sydney / Korea links
10 Footer
```

### 9.1 Announcement ticker

기존 상단 배너를 아래 문구로 교체한다.

```text
BORN IN DAEGU
GROWING IN SYDNEY
SYDNEY CAKE PRE-ORDER
MELROSE PARK PICKUP
PRIVATE KIDS CAKE CLASSES
```

`prefers-reduced-motion`에서는 첫 문장만 고정 표시한다.

### 9.2 Brand hero

#### 영문 카피

```text
BORN IN DAEGU · GROWING IN SYDNEY

Chocolate makes
every day verygood.

Cakes, bakes, chocolate, tea and playful little things
from a chocolatier-led brand growing in Sydney.

[Explore Products] [Book a Cake]
```

#### 한국어 카피

```text
대구에서 시작해, 시드니로

초콜릿이 생각날 땐,
베리굿.

케이크, 구운 과자, 초콜릿, 티와 작은 즐거움을
시드니에서도 만나보세요.

[제품 둘러보기] [케이크 예약]
```

#### 비주얼

- 파베 케이크를 중심 오브젝트로 사용한다.
- 레몬 케이크, 티 제품, 초콜릿, 호걸이 중 3–4개를 보조 오브젝트로 배치한다.
- 자동 캐러셀을 사용하지 않는다.
- 데스크톱에서만 4–6px 범위의 느린 부유 모션을 허용한다.
- 모바일에서는 정적 콜라주를 기본으로 한다.

### 9.3 Two core experiences

#### Cake & Bakes Pre-order

```text
Made to order in Sydney
Pre-arranged Melrose Park pickup
[Explore booking options]
```

목적지: `https://au.verygood-chocolate.com/cakes`

#### Kids Cake Classes

```text
Private weekend cake classes
Small groups with Jenny
[Explore classes]
```

목적지: `https://au.verygood-chocolate.com/classes`

데스크톱은 2열, 모바일은 1열이다. 클래스 카드에만 노란색 포인트를 사용한다.

### 9.4 Explore the Verygood world

다섯 카테고리를 비대칭 편집 레이아웃으로 보여준다.

```text
┌──────────────────────┬──────────────┐
│ CAKES                │ BAKES        │
│ large                ├──────────────┤
│                      │ CHOCOLATE    │
├──────────────┬───────┴──────────────┤
│ TEA          │ GOODS                │
└──────────────┴──────────────────────┘
```

카피:

```text
CAKES
Celebration cakes made to order

BAKES
Small cakes and baked treats

CHOCOLATE
Made by our chocolatier

TEA
Four signature blends

GOODS
Take a little verygood home
```

모바일은 세로 카드 또는 86vw 가로 스크롤 카드로 구성한다.

### 9.5 Signature selection

초기 대표 제품:

- Pave Chocolate Cake
- Chocolate Pound Cake
- Almond Chocoball
- British Black
- Hogeori Keyring

홈 카드에서는 가격을 표시하지 않고 현재 상태를 표시한다.

```text
Sydney pre-order
Available in Daegu
Sydney release not announced
Coming soon
```

### 9.6 From Daegu to Sydney

헤드라인:

```text
Born in Daegu.
Growing in Sydney.
```

#### Daegu

- 베리굿의 시작
- 초콜릿과 티 제품
- 한국 매장과 제조 기반
- `Visit Korea Website`

#### Sydney

- 주문 제작 케이크
- 멜로즈파크 사전 약속 픽업
- Jenny의 프라이빗 키즈 클래스
- `Book a Cake`, `Explore Classes`

세계지도보다 호걸이 또는 까치가 두 도시를 연결하는 작은 그래픽을 권장한다.

### 9.7 Spotlight

첫 공개에서는 한 개만 선택한다.

추천 우선순위:

1. British Black
2. Meet Hogeori
3. Kids Class

이 영역을 캐러셀로 만들지 않는다. 콘텐츠 교체는 데이터 한 항목만 변경해서 처리한다.

### 9.8 Reviews

새 사이트에 리뷰 시스템을 복사하지 않는다. 기존 검증 리뷰 페이지를 소개하는 2–3개 카드 또는 대표 후기 인용을 보여주고 전체 보기는 외부로 연결한다.

```text
[Read customer reviews]
→ https://au.verygood-chocolate.com/reviews
```

### 9.9 지역 연결

```text
SYDNEY
Made-to-order cakes and private kids classes
Pre-arranged pickup in Melrose Park
No walk-in shop

KOREA
Verygood Chocolate in Daegu
Store, menu and Korean updates
```

---

## 10. About 페이지

### 구성

```text
01 About hero
02 Brand statement
03 Daegu chapter
04 Sydney chapter
05 What we believe
06 Two destination cards
07 Cake / Class CTA
```

### 확인된 범위만 사용

About 페이지에서 다음과 같은 검증되지 않은 표현은 사용하지 않는다.

- 직접 카카오 농장과 거래한다
- Bean-to-Bar 전 공정을 수행한다
- 직접 위노잉·콘칭한다
- 특정 원료가 윤리적이라고 단정한다
- 특정 건강 효능을 제공한다

### 사용할 브랜드 가치

```text
Chocolate first
Small batches
Finished by hand
Warm, playful and carefully made
```

### 핵심 카피

```text
Verygood began in Daegu with chocolate at its centre.
Today, the brand is growing in Sydney through made-to-order cakes,
small-group kids classes and a new local community.
```

---

## 11. Cakes 페이지

### 목적

축하용 홀케이크를 소개하고 기존 예약사이트로 연결한다.

### 초기 공개 제품

- Pave Chocolate Cake
- Vanilla Fresh Cream Cake
- Buttercream Cake는 사진과 실제 예약 가능 상태가 확정될 때까지 숨긴다.

### 카드 CTA

```text
View & Book
```

### 목적지

```text
Pave Chocolate Cake
→ https://au.verygood-chocolate.com/cakes/pave-chocolate-cake

Vanilla Fresh Cream Cake
→ https://au.verygood-chocolate.com/cakes/vanilla-fresh-cream-cake
```

새 홈페이지에서 가격, 사이즈, 맛 옵션을 복사하지 않는다.

---

## 12. Bakes 페이지

### 초기 공개 제품

- Chocolate Pound Cake
- Chocolate Cupcakes
- Lemon Cake
- Chocolatier's Basque Cheesecake

### 예약 연결

```text
Chocolate Pound Cake
Chocolate Cupcakes
→ https://au.verygood-chocolate.com/cakes/chocolate-pound-cake-and-cupcakes

Lemon Cake
→ https://au.verygood-chocolate.com/cakes/lemon-cake

Chocolatier's Basque Cheesecake
→ https://au.verygood-chocolate.com/cakes/chocolatiers-basque-cheesecake
```

두 제품이 같은 기존 예약 페이지로 이동하더라도 카드 설명에서 해당 페이지 안에서 종류를 선택한다는 사실을 짧게 안내한다.

---

## 13. Chocolate 페이지

### 초기 공개 제품

- Almond Chocoball
- Strawberry Bonbon
- Ruby Berry Chocoball
- Matcha Berry

### 숨김 제품

- Pave Chocolate
- Marshmallow S'mores Stick

위 두 제품은 정확한 사진과 설명이 준비된 후 공개한다.

### 상세페이지

기존 이미지 갤러리 구조를 재사용하되 다음을 제거한다.

- 가격
- 수량
- Add to Cart
- Buy Now
- 결제 모달

대신 다음을 표시한다.

```text
Available in Daegu
Sydney release not announced
```

---

## 14. Tea 페이지

### 초기 공개 제품

- British Black
- Asian Gold
- Hibiscus Fruit
- Minty Chocolat

### 문구 원칙

`Detox`를 상단 메뉴, H1, SEO 키워드로 사용하지 않는다. 제품 설명은 향, 맛, 원재료, 어울리는 디저트에 집중한다.

예:

```text
British Black
Cacao nib, Earl Grey and cornflower.
Deep, aromatic and softly sweet.
```

피해야 할 문구:

```text
Cleanses your body
Supports weight loss
Removes toxins
Improves gut health
```

### 상세페이지 상태

```text
Available in Daegu
Sydney release not announced
```

---

## 15. Goods 페이지

### 초기 공개

- Hogeori Keyring

### 소개 가능하지만 사진 확정 전 숨김

- Plush
- Eco Bag
- Pouch

### 디자인 방향

- Goods 페이지는 다른 카테고리보다 캐릭터 그래픽 비중을 높인다.
- 호걸이 영문 표기는 `Hogeori`로 통일한다.
- 현재 파일명이 `hogirl.png`여도 고객에게 보이는 제품명은 `Hogeori Keyring`으로 교정한다.
- 제품이 한 개뿐이라면 빈 그리드를 만들지 않고 캐릭터 스토리와 큰 제품 사진 중심으로 구성한다.

---

## 16. 제품 상태와 데이터 원칙

새 AU 제품 데이터는 기존 쇼핑 데이터와 분리한다.

```js
{
  id: 'pave-chocolate-cake',
  category: 'cakes',
  slug: 'pave-chocolate-cake',
  status: 'published',
  availability: {
    sydney: 'preorder',
    daegu: 'not-shown'
  },
  action: {
    mode: 'external-booking',
    href: 'https://au.verygood-chocolate.com/cakes/pave-chocolate-cake'
  },
  copy: {
    en: { name, shortDescription, story },
    ko: { name, shortDescription, story }
  },
  media: { card, hero, gallery }
}
```

### 허용 상태

```text
preorder
available-daegu
seasonal
coming-soon
not-announced-sydney
```

### 공개 조건

아래 조건을 충족하지 않는 제품은 `draft`로 숨긴다.

- 영문·한글 제품명
- 한 문장 설명
- 제품 이미지
- 판매 지역 상태
- 필요한 경우 예약 링크
- alt 텍스트

가격은 AU 카탈로그 데이터에 넣지 않는다.

---

## 17. 언어 정책

### 기본

- `/`는 영어 `en-AU`
- `/ko`는 한국어 `ko-KR`
- 첫 방문 때 브라우저 언어로 강제 이동시키지 않는다.
- 사용자가 언어 버튼을 눌렀을 때만 경로를 바꾼다.
- 선택 언어는 localStorage에 저장할 수 있지만 URL이 최종 기준이다.

### 경로 전환 예

```text
/about ↔ /ko/about
/tea/british-black ↔ /ko/tea/british-black
```

### 한국 사이트 연결

한국어 페이지를 제공하더라도 `Korea`는 별도 사이트인 `kr.verygood-chocolate.com`으로 연결한다. `/ko`는 시드니 홈페이지의 한국어 번역이지 한국 매장 사이트가 아니다.

---

## 18. Footer 설계

```text
VERYGOOD CHOCOLATE
Born in Daegu. Growing in Sydney.

Explore
About / Cakes / Bakes / Chocolate / Tea / Goods

Sydney
Book a Cake / Kids Classes / Reviews / Find My Booking

Korea
Visit Korean Website

Instagram
© YEAR Verygood Chocolate
```

### Footer에서 제거할 것

- 한국 사업자등록번호
- 한국 통신판매업 신고번호
- Admin Dashboard
- Wellness App
- AI Beta
- 확인되지 않은 호주 ABN
- 시드니 개인 주소

정확한 호주 법인·ABN·연락처가 확정되면 별도 승인 후 추가한다.

---

## 19. 사진 방향

### 제품 사진

- 실제 제품 비율과 질감을 유지한다.
- 부드러운 자연광과 절제된 색감을 사용한다.
- 같은 카테고리는 그림자 방향과 배경 온도를 통일한다.
- 누끼 사진과 실제 사용 장면을 섞되 한 카드 안에서는 한 방식만 사용한다.

### 권장 규격

```text
Product card       1200 × 1500, 4:5 WebP
Category cover     1600 × 1200 WebP
Product detail     long edge 1600px 이상 WebP
Hero cutout        long edge 1600px 이상 WebP
Open Graph         1200 × 630
```

### 이미지가 없는 경우

- 가짜 AI 제품 이미지를 임의로 만들지 않는다.
- 제품은 draft로 숨긴다.
- 카테고리 자체는 타이포그래피와 캐릭터 그래픽으로 공개할 수 있다.

---

## 20. 모션 원칙

- 한 화면에 지속적으로 움직이는 요소는 최대 1개다.
- 자동 슬라이더를 기본으로 사용하지 않는다.
- 카드 hover는 최대 `translateY(-4px)`와 1.02배 확대다.
- 기존 Product Card의 `-10px`, 강한 그림자는 축소한다.
- 모바일에서 hover 의존 정보를 사용하지 않는다.
- reduced motion에서는 티커, reveal, 부유 모션을 정지한다.

---

## 21. 반응형 기준

### Mobile 320–767px

- 한 열
- 전체 화면 메뉴 드로어
- 히어로 이미지와 제목이 겹치지 않음
- CTA 터치 영역 44×44px 이상
- 제품 카드는 최소 1열, 필요할 때만 가로 스크롤

### Tablet 768–1099px

- 2열 중심
- 히어로 오브젝트 수를 줄인다.
- 메뉴는 드로어 또는 축약 내비게이션을 사용한다.

### Desktop 1100px 이상

- 최대 1400px 편집 그리드
- 비대칭 카테고리 레이아웃
- 넓은 여백과 큰 제품 사진

필수 검수 폭:

```text
320
360
390
768
1024
1440
```

---

## 22. 접근성

- 내부 링크는 실제 `href`를 가진다.
- 외부 링크는 목적지를 이해할 수 있는 라벨을 가진다.
- 메뉴는 키보드로 열고 닫을 수 있다.
- 메뉴를 닫으면 포커스가 원래 버튼으로 돌아간다.
- 이미지 alt는 제품명만 반복하지 않고 장면을 설명한다.
- 장식용 배경 글자와 패턴은 `aria-hidden` 처리한다.
- 상태는 색상만으로 표현하지 않는다.
- 본문 대비는 WCAG AA 4.5:1 이상을 목표로 한다.
- 언어별 `<html lang>`을 정확히 설정한다.

---

## 23. SEO·광고·분석

### SEO

새 공개 페이지마다 다음을 제공한다.

- 고유 title
- description
- canonical
- Open Graph
- 영어·한국어 hreflang
- sitemap.xml
- robots.txt

### 구조화 데이터

```text
Home          Organization + WebSite
About         AboutPage
Category      CollectionPage + ItemList + BreadcrumbList
Product intro WebPage + BreadcrumbList
```

가격과 판매가 없는 소개 전용 제품에는 `Offer`를 만들지 않는다.

### 광고

현재 `index.html`의 Google AdSense 코드는 제거한다. 프리미엄 브랜드 홈페이지에 외부 광고를 노출하지 않는다.

### 분석

Google Analytics는 동의 기반으로 로드하거나, 동의 UI가 준비되지 않으면 첫 출시에서 비활성화한다. 이름, 전화번호, 이메일, 예약 내용을 이벤트에 넣지 않는다.

권장 이벤트:

```text
au_home_view
au_category_open
au_product_view
au_book_cake_click
au_class_click
au_korea_click
```

---

## 24. Penpot/Pencil 디자인 작업 순서

코딩 전에 디자인한다. 단, 급한 일정에 맞춰 **홈과 공통 컴포넌트를 먼저 승인**하고 개발을 시작한 뒤 나머지 페이지를 병행할 수 있다.

### Penpot 페이지 구조

```text
00_COVER
01_REFERENCES
02_FOUNDATIONS
03_COMPONENTS
04_HOME
05_ABOUT
06_CAKES
07_BAKES
08_CHOCOLATE
09_TEA
10_GOODS
11_NAVIGATION_STATES
12_RESPONSIVE_CHECKS
13_PROTOTYPE
14_HANDOFF
```

### 프레임

```text
Desktop 1440px
Tablet 1024px
Mobile 390px
Mobile QA 360px
```

### 디자인 승인 기준

Penpot의 `00_COVER`에 다음 문구를 넣는다.

```text
APPROVED FOR BUILD
Approved by John
```

홈·헤더·푸터만 먼저 승인할 경우:

```text
HOME SHELL APPROVED FOR BUILD
```

---

## 25. Antigravity/Codex용 Penpot 마스터 프롬프트

```text
저장소의 design.md를 먼저 끝까지 읽어줘.
지금은 React 코드를 수정하지 말고 Penpot/Pencil에서 프론트 디자인만 진행해.

대상은 verygood-chocolate.com에 들어갈 호주 중심 베리굿 종합 홈페이지야.
기존 au.verygood-chocolate.com은 예약 서비스이므로 디자인을 복제하거나 수정하지 않고, 시각적 톤과 제품 자산만 참고해.

먼저 다음만 만들어:
1. 02_FOUNDATIONS
2. 03_COMPONENTS
3. 04_HOME의 Desktop 1440px
4. 04_HOME의 Mobile 390px
5. Desktop Header open state
6. Mobile navigation drawer state

디자인 방향:
- Editorial Chocolatier 80%, Playful Verygood 20%
- warm ivory #f0eee9
- forest green #1f5a46
- verygood pink #edc5c4
- Playfair Display + Work Sans
- 큰 여백, 얇은 선, 제품 사진 중심
- generic ecommerce 카드와 과한 glassmorphism 금지
- 장바구니, 가격, 결제 UI 금지

홈 섹션은 design.md의 순서를 그대로 따르고,
제품 이미지가 없는 항목은 임의 이미지를 만들지 말고 draft 상태로 제외해.
완료 후 사용한 컴포넌트 이름, 그리드, 컬러 토큰, 텍스트 스타일을 14_HANDOFF에 정리해.
```

### 홈 승인 후 나머지 페이지 프롬프트

```text
Penpot의 HOME SHELL APPROVED FOR BUILD 프레임을 기준으로
About, Cakes, Bakes, Chocolate, Tea, Goods를 확장해.

새로운 스타일을 만들지 말고 승인된 Header, Footer, Button, Category Card,
Product Card, Availability Badge 컴포넌트를 재사용해.

Cakes와 Bakes의 CTA는 외부 예약 연결임을 알 수 있게 View & Book으로 표시하고,
Chocolate, Tea, Goods에는 가격·장바구니·구매 버튼을 넣지 마.
Desktop 1440, Tablet 1024, Mobile 390 프레임을 모두 만들어.
```

---

## 26. 디자인 완료 기준

- [ ] 첫 화면이 호주 중심 베리굿 종합 홈페이지로 보인다.
- [ ] 기존 한국 쇼핑몰·디지털 허브 인상이 사라진다.
- [ ] 케이크 예약과 키즈 클래스가 가장 강한 두 전환이다.
- [ ] Cakes, Bakes, Chocolate, Tea, Goods를 한눈에 이해한다.
- [ ] 대구와 시드니의 역할이 명확하다.
- [ ] 가격과 장바구니가 노출되지 않는다.
- [ ] 시드니 예약 가능 제품만 예약사이트로 연결된다.
- [ ] 호주 예약 사이트와 시각적으로 자연스럽게 연결된다.
- [ ] 모바일 메뉴와 CTA가 겹치지 않는다.
- [ ] 현재 준비되지 않은 제품을 가짜 이미지로 채우지 않는다.
- [ ] Admin, Digital, Cart, Checkout이 공개 메뉴에 나타나지 않는다.
- [ ] 영어 기본 경로와 한국어 `/ko` 경로가 설계되어 있다.
- [ ] Penpot/Pencil에 디자인 토큰과 컴포넌트가 정리되어 있다.

---

## 27. 최종 한 줄

> `verygood-chocolate.com`은 베리굿의 호주 중심 브랜드 세계를 보여주고, 실제 케이크와 클래스 예약은 검증된 `au.verygood-chocolate.com`으로 연결한다.
