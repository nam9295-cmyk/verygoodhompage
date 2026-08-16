# VERYGOOD Australia Main Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` 또는 `superpowers:executing-plans`로 이 계획을 작업 단위별 실행한다. 모든 진행 항목은 체크박스로 추적한다.

**Goal:** 기존 `nam9295-cmyk/verygoodhompage` React/Vite 프로젝트를 `verygood-chocolate.com`의 호주 중심 종합 브랜드 홈페이지로 전환하고, 케이크·키즈 클래스·후기·예약 조회는 기존 `au.verygood-chocolate.com` 서비스로 안전하게 연결한다.

**Architecture:** 현재 React 19, Vite, React Router, i18next, Helmet 구조를 유지한다. 새 AU 전용 페이지·컴포넌트·데이터·CSS를 별도 네임스페이스로 추가한 뒤 공개 라우터를 교체한다. 기존 Cart, Checkout, Admin, Digital 관련 코드는 첫 출시에서 삭제하지 않고 공개 경로와 번들에서 제외하며, 예약 가격과 고객 데이터는 새 홈페이지가 다루지 않는다.

**Tech Stack:** React 19, Vite 7, React Router 7, i18next, react-helmet-async, vanilla CSS, Node.js built-in test runner, Cloudflare Pages

## Global Constraints

- `nam9295-cmyk/au-cake` 저장소와 `au.verygood-chocolate.com` 배포는 수정하지 않는다.
- 새 도메인·새 저장소·새 Cloudflare 프로젝트를 만들지 않는다.
- 작업 대상은 `nam9295-cmyk/verygoodhompage` 하나다.
- `main` 브랜치에서 직접 작업하지 않는다.
- 기존 맥북 작업 폴더에서 직접 수정하지 않고 별도 Git worktree를 사용한다.
- Penpot/Pencil에서 `HOME SHELL APPROVED FOR BUILD` 또는 `APPROVED FOR BUILD` 표시가 나오기 전에는 해당 화면 코드를 구현하지 않는다.
- 새 홈페이지에 Appwrite, Firebase 주문 저장, PortOne 결제, EmailJS 주문 전송을 연결하지 않는다.
- 가격, 수량, 장바구니, Checkout, 온라인 결제 UI를 공개하지 않는다.
- 실제 케이크 가격·사이즈·옵션은 기존 예약사이트가 단일 출처다.
- 예약 링크는 `https://au.verygood-chocolate.com`의 승인된 경로만 허용한다.
- 초콜릿·티·굿즈는 소개 전용이며 시드니 판매가 확정된 것처럼 표현하지 않는다.
- Tea 페이지는 맛, 향, 원재료 중심으로 작성하고 건강 효능을 약속하지 않는다.
- `/`는 `en-AU`, `/ko`는 `ko-KR`을 사용한다.
- `prefers-reduced-motion`에서 티커, reveal, 부유 모션을 정지한다.
- 모든 작업은 테스트 작성 또는 계약 확인 → 구현 → 테스트 → lint → build → 작은 커밋 순으로 진행한다.

---

## 1. 권장 작업 위치

### 최종 권장

**맥북에서 진행하되 기존 `verygoodhompage` 폴더를 직접 수정하지 않고, 옆에 Git worktree를 만든다.**

이유:

- Penpot MCP, Antigravity, Codex, 브라우저 검수가 맥북에서 가장 편하다.
- 기존 이미지와 Git 객체를 공유하므로 새 clone보다 빠르고 저장 공간을 적게 사용한다.
- 현재 작업 폴더에 미완성 변경이 있어도 서로 섞이지 않는다.
- 베리서버에 새 clone을 만들 필요가 없고, 배포는 GitHub와 Cloudflare Preview에서 검증할 수 있다.

### 작업 폴더 예시

```text
~/workspace/verygoodhompage       기존 폴더, 건드리지 않음
~/workspace/verygoodhompage-au    새 worktree, 이번 작업 전용
```

### 생성 명령

```bash
cd ~/workspace/verygoodhompage

git status
git fetch origin

git worktree add ../verygoodhompage-au \
  -b feature/au-main-redesign \
  origin/main

cd ../verygoodhompage-au
npm ci
npm run lint
npm run build
```

Expected:

```text
npm run lint  → exit 0
npm run build → dist 생성, exit 0
```

기존 폴더에 커밋되지 않은 파일이 있어도 새 worktree는 `origin/main`에서 독립적으로 시작한다.

### 베리서버를 사용하는 경우

다음 조건일 때만 베리서버에 clone한다.

- 구현 에이전트가 서버에서만 실행되는 경우
- Penpot MCP가 서버 환경에서도 동일하게 연결되는 경우
- 로컬 맥북 저장 공간이 부족한 경우

그 외에는 디자인·브라우저 확인이 잦은 이번 작업에 서버 clone이 더 불편하다.

---

## 2. 출시 전략

제니가 빠르게 필요로 하므로 두 번에 나눠 출시한다.

### Release A — Urgent AU Shell

```text
새 Home
새 Header / Mobile Menu
새 Footer
영어 기본 경로
Cake 예약 링크
Kids Class 링크
Daegu → Sydney 소개
Chocolate / Tea / Goods 대표 카드
Cart / Checkout / Admin / Digital 공개 제거
기본 SEO
```

Release A가 완료되면 브랜드 홈페이지로 사용할 수 있다.

### Release B — Full Catalogue

```text
About 완성
Cakes / Bakes 카테고리 완성
Chocolate / Tea / Goods 상세페이지
한국어 /ko 전체 번역
레거시 URL 세부 전환
sitemap / hreflang / 구조화 데이터
접근성·성능·시각 회귀 마감
```

---

## 3. 목표 파일 구조

```text
verygoodhompage/
├─ design.md
├─ plan.md
├─ index.html
├─ package.json
├─ public/
│  ├─ _headers
│  ├─ _redirects
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ assets/
│     └─ au/
│        ├─ home/
│        ├─ cakes/
│        ├─ bakes/
│        ├─ chocolate/
│        ├─ tea/
│        ├─ goods/
│        └─ about/
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ components/
│  │  └─ au/
│  │     ├─ AuHeader.jsx
│  │     ├─ AuFooter.jsx
│  │     ├─ AuLayout.jsx
│  │     ├─ AuMobileMenu.jsx
│  │     ├─ AuProductCard.jsx
│  │     ├─ AvailabilityBadge.jsx
│  │     ├─ ExternalBookingLink.jsx
│  │     └─ LanguageLink.jsx
│  ├─ config/
│  │  ├─ auLinks.js
│  │  └─ auSiteContent.js
│  ├─ data/
│  │  └─ auCatalog.js
│  ├─ pages/
│  │  └─ au/
│  │     ├─ AuHomePage.jsx
│  │     ├─ AuAboutPage.jsx
│  │     ├─ AuCategoryPage.jsx
│  │     ├─ AuProductPage.jsx
│  │     ├─ LegacyProductRedirect.jsx
│  │     └─ AuNotFoundPage.jsx
│  ├─ styles/
│  │  └─ au-site.css
│  └─ utils/
│     ├─ auCatalog.js
│     └─ auPaths.js
└─ tests/
   ├─ au-catalog.test.mjs
   ├─ au-links.test.mjs
   ├─ au-routes.test.mjs
   └─ au-public-contract.test.mjs
```

새 AU 클래스에는 `au-` 접두사를 사용해 기존 65KB 전역 CSS와 충돌하지 않게 한다.

---

### Task 1: Worktree·문서·클린 베이스라인 확정

**Files:**
- Copy into worktree: `design.md`
- Copy into worktree: `plan.md`
- Modify: `.gitignore` only when generated design exports need exclusion

**Produces:**
- Branch `feature/au-main-redesign`
- Clean baseline build
- Design approval gate

- [ ] **Step 1: 기존 폴더 상태 기록**

```bash
cd ~/workspace/verygoodhompage
git status --short
git branch --show-current
git log -1 --oneline
git fetch origin
```

- [ ] **Step 2: 새 worktree 생성**

```bash
git worktree add ../verygoodhompage-au \
  -b feature/au-main-redesign \
  origin/main
cd ../verygoodhompage-au
```

- [ ] **Step 3: 문서 복사**

```bash
cp /path/to/design.md ./design.md
cp /path/to/plan.md ./plan.md
```

- [ ] **Step 4: 의존성과 베이스라인 확인**

```bash
npm ci
npm run lint
npm run build
```

Expected: 두 명령 모두 exit 0.

- [ ] **Step 5: Penpot 홈 셸 승인 기록**

`design.md`의 Penpot 프롬프트로 홈, 헤더, 푸터, 모바일 메뉴를 만든 후 Penpot Cover에 아래 문구를 넣는다.

```text
HOME SHELL APPROVED FOR BUILD
Approved by John
```

- [ ] **Step 6: 문서 커밋**

```bash
git add design.md plan.md
git commit -m "docs: define AU main website redesign"
```

---

### Task 2: 테스트 기반과 AU 링크 계약 만들기

**Files:**
- Modify: `package.json`
- Create: `src/config/auLinks.js`
- Create: `src/utils/auPaths.js`
- Create: `tests/au-links.test.mjs`
- Create: `tests/au-routes.test.mjs`

**Interfaces:**

```js
export const AU_LINKS
export function isAllowedAuExternalUrl(value)
export function localePath(path, locale)
export function localeFromPath(pathname)
export function stripLocalePath(pathname)
```

- [ ] **Step 1: test 스크립트 추가 전 실패 확인**

Create `tests/au-links.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { AU_LINKS, isAllowedAuExternalUrl } from '../src/config/auLinks.js'

test('all booking links use the approved AU origin', () => {
  for (const href of Object.values(AU_LINKS.booking)) {
    assert.equal(isAllowedAuExternalUrl(href), true)
  }
})

test('unapproved external booking origins are rejected', () => {
  assert.equal(isAllowedAuExternalUrl('https://example.com/cakes'), false)
  assert.equal(isAllowedAuExternalUrl('javascript:alert(1)'), false)
})
```

Run:

```bash
node --test tests/au-links.test.mjs
```

Expected: FAIL because `auLinks.js` does not exist.

- [ ] **Step 2: 링크 상수 구현**

Create `src/config/auLinks.js`:

```js
const AU_ORIGIN = 'https://au.verygood-chocolate.com'

export const AU_LINKS = Object.freeze({
  booking: Object.freeze({
    cakes: `${AU_ORIGIN}/cakes`,
    classes: `${AU_ORIGIN}/classes`,
    reviews: `${AU_ORIGIN}/reviews`,
    lookup: `${AU_ORIGIN}/lookup`,
    pave: `${AU_ORIGIN}/cakes/pave-chocolate-cake`,
    vanillaFreshCream: `${AU_ORIGIN}/cakes/vanilla-fresh-cream-cake`,
    poundAndCupcakes: `${AU_ORIGIN}/cakes/chocolate-pound-cake-and-cupcakes`,
    lemon: `${AU_ORIGIN}/cakes/lemon-cake`,
    basque: `${AU_ORIGIN}/cakes/chocolatiers-basque-cheesecake`,
  }),
  korea: 'https://kr.verygood-chocolate.com',
  instagram: 'https://www.instagram.com/verygood_chocolate/',
})

export function isAllowedAuExternalUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && (
      url.origin === AU_ORIGIN ||
      url.origin === 'https://kr.verygood-chocolate.com' ||
      url.origin === 'https://www.instagram.com'
    )
  } catch {
    return false
  }
}
```

- [ ] **Step 3: 언어 경로 테스트와 구현**

Create `tests/au-routes.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { localeFromPath, localePath, stripLocalePath } from '../src/utils/auPaths.js'

test('English is the default root locale', () => {
  assert.equal(localeFromPath('/'), 'en')
  assert.equal(localeFromPath('/about'), 'en')
})

test('Korean uses the /ko prefix', () => {
  assert.equal(localeFromPath('/ko'), 'ko')
  assert.equal(localeFromPath('/ko/tea'), 'ko')
  assert.equal(localePath('/tea', 'ko'), '/ko/tea')
  assert.equal(localePath('/tea', 'en'), '/tea')
  assert.equal(stripLocalePath('/ko/tea'), '/tea')
})
```

Create `src/utils/auPaths.js`:

```js
export function localeFromPath(pathname = '/') {
  return pathname === '/ko' || pathname.startsWith('/ko/') ? 'ko' : 'en'
}

export function stripLocalePath(pathname = '/') {
  if (pathname === '/ko') return '/'
  return pathname.replace(/^\/ko(?=\/|$)/, '') || '/'
}

export function localePath(path = '/', locale = 'en') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale !== 'ko') return normalized
  return normalized === '/' ? '/ko' : `/ko${normalized}`
}
```

- [ ] **Step 4: package 스크립트 추가**

Modify `package.json`:

```json
{
  "scripts": {
    "test": "node --test tests/*.test.mjs"
  }
}
```

기존 `dev`, `build`, `lint`, `preview`는 유지한다.

- [ ] **Step 5: 검증과 커밋**

```bash
npm test
npm run lint
npm run build
git add package.json src/config/auLinks.js src/utils/auPaths.js tests
git commit -m "test: define AU public link and locale contracts"
```

---

### Task 3: AU 카탈로그를 기존 쇼핑 데이터와 분리하기

**Files:**
- Create: `src/data/auCatalog.js`
- Create: `src/utils/auCatalog.js`
- Create: `tests/au-catalog.test.mjs`

**Interfaces:**

```js
export const AU_CATEGORIES
export const AU_PRODUCTS
export function getPublishedAuProducts(category)
export function getAuProduct(category, slug)
export function validateAuCatalog(products)
```

- [ ] **Step 1: 실패 테스트 작성**

Create `tests/au-catalog.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { AU_PRODUCTS } from '../src/data/auCatalog.js'
import { getPublishedAuProducts, validateAuCatalog } from '../src/utils/auCatalog.js'

test('published products have localized names, media and availability', () => {
  assert.deepEqual(validateAuCatalog(AU_PRODUCTS), [])
})

test('draft products are excluded from public category lists', () => {
  const cakes = getPublishedAuProducts('cakes')
  assert.equal(cakes.some((item) => item.status === 'draft'), false)
})

test('catalogue data never stores prices', () => {
  for (const product of AU_PRODUCTS) {
    assert.equal(Object.hasOwn(product, 'price'), false)
    assert.equal(Object.hasOwn(product, 'priceAUD'), false)
    assert.equal(Object.hasOwn(product, 'priceKRW'), false)
  }
})
```

Run:

```bash
npm test
```

Expected: FAIL because catalog modules do not exist.

- [ ] **Step 2: 카테고리와 제품 데이터 구현**

Create `src/data/auCatalog.js` with these exact category IDs:

```js
export const AU_CATEGORIES = Object.freeze([
  'cakes',
  'bakes',
  'chocolate',
  'tea',
  'goods',
])
```

Initial published products:

```text
cakes:
  pave-chocolate-cake
  vanilla-fresh-cream-cake

bakes:
  chocolate-pound-cake
  chocolate-cupcakes
  lemon-cake
  chocolatiers-basque-cheesecake

chocolate:
  almond-chocoball
  strawberry-bonbon
  ruby-berry-chocoball
  matcha-berry

tea:
  british-black
  asian-gold
  hibiscus-fruit
  minty-chocolat

goods:
  hogeori-keyring
```

Draft products:

```text
buttercream-cake
pave-chocolate
marshmallow-smores-stick
hogeori-plush
eco-bag
pouch
```

Every product object uses this shape:

```js
{
  id,
  category,
  slug,
  status: 'published' | 'draft',
  availability: 'preorder' | 'available-daegu' | 'not-announced-sydney' | 'coming-soon',
  action: { mode: 'external-booking', href } | { mode: 'catalogue-only' },
  copy: {
    en: { name, shortDescription, story },
    ko: { name, shortDescription, story },
  },
  media: {
    card,
    hero,
    gallery,
    altEn,
    altKo,
  },
}
```

- [ ] **Step 3: 카탈로그 유틸 구현**

Create `src/utils/auCatalog.js`:

```js
import { AU_CATEGORIES, AU_PRODUCTS } from '../data/auCatalog.js'
import { isAllowedAuExternalUrl } from '../config/auLinks.js'

export function getPublishedAuProducts(category) {
  if (!AU_CATEGORIES.includes(category)) return []
  return AU_PRODUCTS.filter((item) => item.category === category && item.status === 'published')
}

export function getAuProduct(category, slug) {
  return AU_PRODUCTS.find((item) => (
    item.category === category && item.slug === slug && item.status === 'published'
  )) || null
}

export function validateAuCatalog(products) {
  const errors = []
  const ids = new Set()

  for (const item of products) {
    if (ids.has(item.id)) errors.push(`duplicate id: ${item.id}`)
    ids.add(item.id)
    if (!AU_CATEGORIES.includes(item.category)) errors.push(`invalid category: ${item.id}`)
    if (!item.copy?.en?.name || !item.copy?.ko?.name) errors.push(`missing name: ${item.id}`)
    if (!item.media?.card || !item.media?.altEn || !item.media?.altKo) errors.push(`missing media: ${item.id}`)
    if (item.action?.mode === 'external-booking' && !isAllowedAuExternalUrl(item.action.href)) {
      errors.push(`invalid booking href: ${item.id}`)
    }
    if (Object.keys(item).some((key) => key.toLowerCase().includes('price'))) {
      errors.push(`price field is forbidden: ${item.id}`)
    }
  }

  return errors
}
```

- [ ] **Step 4: 검증과 커밋**

```bash
npm test
npm run lint
npm run build
git add src/data/auCatalog.js src/utils/auCatalog.js tests/au-catalog.test.mjs
git commit -m "feat: add AU catalogue source of truth"
```

---

### Task 4: 제품 이미지 자산을 독립적으로 준비하기

**Files:**
- Create directory: `public/assets/au/cakes`
- Create directory: `public/assets/au/bakes`
- Create directory: `public/assets/au/chocolate`
- Create directory: `public/assets/au/tea`
- Create directory: `public/assets/au/goods`
- Create directory: `public/assets/au/about`

**Consumes:** existing assets from `verygoodhompage` and image files from a local `au-cake` checkout.

- [ ] **Step 1: AU 자산 폴더 생성**

```bash
mkdir -p public/assets/au/{home,cakes,bakes,chocolate,tea,goods,about}
```

- [ ] **Step 2: 기존 저장소 제품 이미지 복사**

```bash
cp public/assets/products/almond.png public/assets/au/chocolate/almond-chocoball.png
cp public/assets/products/straw.png public/assets/au/chocolate/strawberry-bonbon.png
cp public/assets/products/ruby.png public/assets/au/chocolate/ruby-berry-chocoball.png
cp public/assets/products/matcha.png public/assets/au/chocolate/matcha-berry.png
cp public/assets/products/british_cup.webp public/assets/au/tea/british-black.webp
cp public/assets/products/asian_cup.webp public/assets/au/tea/asian-gold.webp
cp public/assets/products/hibis_cup.webp public/assets/au/tea/hibiscus-fruit.webp
cp public/assets/products/minty_cup.webp public/assets/au/tea/minty-chocolat.webp
cp public/assets/products/hogirl.png public/assets/au/goods/hogeori-keyring.png
```

- [ ] **Step 3: `au-cake`에서 케이크 사진 파일만 복사**

Assuming sibling repo `../au-cake`:

```bash
cp ../au-cake/public/products/pave-chocolate-cake-sydney.webp \
  public/assets/au/cakes/pave-chocolate-cake.webp
cp ../au-cake/public/products/vanilla-cake-sydney.webp \
  public/assets/au/cakes/vanilla-fresh-cream-cake.webp
cp ../au-cake/public/products/chocolate-pound-cake-sydney.webp \
  public/assets/au/bakes/chocolate-pound-cake.webp
cp ../au-cake/public/products/chocolate-cupcakes-sydney.webp \
  public/assets/au/bakes/chocolate-cupcakes.webp
cp ../au-cake/public/products/lemon-cake-sydney.webp \
  public/assets/au/bakes/lemon-cake.webp
cp ../au-cake/public/products/chocolatiers-basque-cheesecake-sydney.webp \
  public/assets/au/bakes/chocolatiers-basque-cheesecake.webp
```

- [ ] **Step 4: 파일 존재 검사 추가**

Create `tests/au-assets.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { AU_PRODUCTS } from '../src/data/auCatalog.js'

test('every published product card asset exists', () => {
  for (const product of AU_PRODUCTS.filter((item) => item.status === 'published')) {
    assert.equal(existsSync(`public${product.media.card}`), true, product.id)
  }
})
```

- [ ] **Step 5: 검증과 커밋**

```bash
npm test
git add public/assets/au tests/au-assets.test.mjs src/data/auCatalog.js
git commit -m "assets: add AU brand catalogue imagery"
```

---

### Task 5: AU 공통 Layout·Header·Footer 만들기

**Files:**
- Create: `src/components/au/AuLayout.jsx`
- Create: `src/components/au/AuHeader.jsx`
- Create: `src/components/au/AuMobileMenu.jsx`
- Create: `src/components/au/AuFooter.jsx`
- Create: `src/components/au/LanguageLink.jsx`
- Create: `src/styles/au-site.css`
- Modify: `src/main.jsx`
- Test: `tests/au-public-contract.test.mjs`

**Interfaces:**

```jsx
<AuLayout />
<AuHeader locale="en" | "ko" />
<AuFooter locale="en" | "ko" />
<LanguageLink locale="en" | "ko" />
```

- [ ] **Step 1: 공통 셸 계약 테스트 작성**

Create `tests/au-public-contract.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const header = readFileSync('src/components/au/AuHeader.jsx', 'utf8')
const footer = readFileSync('src/components/au/AuFooter.jsx', 'utf8')

test('AU public shell has no cart or admin navigation', () => {
  assert.equal(/\/cart|Admin Dashboard|\/admin/.test(header + footer), false)
})

test('AU public shell exposes booking, classes and Korea destinations', () => {
  assert.match(header + footer, /Book a Cake|케이크 예약/)
  assert.match(header + footer, /Kids Classes|키즈 클래스/)
  assert.match(header + footer, /Korea|한국/)
})
```

Run:

```bash
npm test
```

Expected: FAIL because AU components do not exist.

- [ ] **Step 2: CSS 네임스페이스와 디자인 토큰 구현**

At the top of `src/styles/au-site.css` define:

```css
:root {
  --au-canvas: #f0eee9;
  --au-surface: #ffffff;
  --au-surface-soft: #f8f7f4;
  --au-forest: #1f5a46;
  --au-forest-deep: #164334;
  --au-charcoal: #362f31;
  --au-muted: #655f61;
  --au-pink: #edc5c4;
  --au-mint: #ddeae3;
  --au-kids-yellow: #f6c945;
  --au-page-max: 1400px;
}
```

All new component classes start with `.au-`.

- [ ] **Step 3: Header와 모바일 메뉴 구현**

Required links:

```text
About
Cakes
Bakes
Chocolate
Tea
Goods
Kids Classes
Korea
Book a Cake
```

Requirements:

- No Cart.
- No Admin.
- Mobile Escape close.
- Restore focus to menu button.
- Body scroll lock only while open.
- `aria-current="page"` on internal current route.

- [ ] **Step 4: Footer 구현**

Footer groups:

```text
Explore
Sydney
Korea
Instagram
```

Do not include Korean business registration details or unverified AU business details.

- [ ] **Step 5: CSS import**

Modify `src/main.jsx`:

```js
import './styles/index.css'
import './styles/au-site.css'
```

Keep existing order so AU prefixed styles are loaded last.

- [ ] **Step 6: 검증과 커밋**

```bash
npm test
npm run lint
npm run build
git add src/components/au src/styles/au-site.css src/main.jsx tests/au-public-contract.test.mjs
git commit -m "feat: add AU public site shell"
```

---

### Task 6: Urgent AU Home 구현

**Files:**
- Create: `src/pages/au/AuHomePage.jsx`
- Create: `src/config/auSiteContent.js`
- Modify: `src/styles/au-site.css`
- Test: `tests/au-home-contract.test.mjs`

**Consumes:** approved Penpot Home Desktop and Mobile frames.

- [ ] **Step 1: Home 계약 테스트 작성**

Create `tests/au-home-contract.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync('src/pages/au/AuHomePage.jsx', 'utf8')

test('home includes the two primary conversions', () => {
  assert.match(source, /Book a Cake|케이크 예약/)
  assert.match(source, /Kids Cake Classes|키즈 케이크 클래스/)
})

test('home includes all five product categories', () => {
  for (const label of ['Cakes', 'Bakes', 'Chocolate', 'Tea', 'Goods']) {
    assert.match(source, new RegExp(label))
  }
})

test('home does not expose shopping controls', () => {
  assert.equal(/Add to Cart|Checkout|priceUSD|priceKRW/.test(source), false)
})
```

- [ ] **Step 2: Home 콘텐츠 단일 출처 구현**

Create `src/config/auSiteContent.js` with localized objects for:

```text
announcement
hero
coreExperiences
categories
signatureSelection
daeguSydney
spotlight
locationCards
```

Use the exact hero copy from `design.md`.

- [ ] **Step 3: Home 섹션 구현**

Render in this order:

```text
Announcement ticker
Hero
Core experiences
Category mosaic
Signature selection
Daegu to Sydney
Spotlight
Reviews link
Destination cards
```

- [ ] **Step 4: Responsive and reduced-motion CSS**

Implement breakpoints at:

```css
@media (max-width: 767px) {}
@media (min-width: 768px) and (max-width: 1099px) {}
@media (min-width: 1100px) {}
@media (prefers-reduced-motion: reduce) {}
```

- [ ] **Step 5: 검증과 커밋**

```bash
npm test
npm run lint
npm run build
git add src/pages/au/AuHomePage.jsx src/config/auSiteContent.js src/styles/au-site.css tests/au-home-contract.test.mjs
git commit -m "feat: build urgent AU brand homepage"
```

At this point Release A can be previewed but not yet merged.

---

### Task 7: 라우터를 영어 기본 AU 구조로 전환하기

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/layout/LocaleLayout.jsx` or replace its public use
- Modify: `src/context/LanguageContext.jsx`
- Create: `src/pages/au/AuNotFoundPage.jsx`
- Create: `src/pages/au/LegacyProductRedirect.jsx`
- Test: `tests/au-app-routes-contract.test.mjs`

**Produces:**

```text
/      → English AU home
/ko    → Korean AU home
```

- [ ] **Step 1: 라우트 계약 테스트 작성**

Create `tests/au-app-routes-contract.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const app = readFileSync('src/App.jsx', 'utf8')

test('root is the English AU home and Korean uses /ko', () => {
  assert.match(app, /path="\/"/)
  assert.match(app, /path="\/ko"/)
})

test('shopping and admin routes are not public AU routes', () => {
  assert.equal(/path="cart"|path="checkout"|path="admin"/.test(app), false)
})
```

- [ ] **Step 2: 공개 AU 경로 정의**

`src/App.jsx` exposes:

```text
/
/about
/cakes
/bakes
/chocolate
/chocolate/:slug
/tea
/tea/:slug
/goods
/goods/:slug

/ko
/ko/about
/ko/cakes
/ko/bakes
/ko/chocolate
/ko/chocolate/:slug
/ko/tea
/ko/tea/:slug
/ko/goods
/ko/goods/:slug
```

- [ ] **Step 3: 레거시 경로 컴포넌트 구현**

`LegacyProductRedirect` maps:

```text
almond-chocoball      → /chocolate/almond-chocoball
strawberry-bonbon     → /chocolate/strawberry-bonbon
ruby-berry-chocoball  → /chocolate/ruby-berry-chocoball
matcha-berry          → /chocolate/matcha-berry
british-black         → /tea/british-black
asian-gold            → /tea/asian-gold
hibiscus-fruit        → /tea/hibiscus-fruit
minty-chocolat        → /tea/minty-chocolat
hogirl-key-ring       → /goods/hogeori-keyring
```

Unknown products go to the AU 404 page.

- [ ] **Step 4: 언어 상태를 URL 기준으로 동기화**

`LanguageContext` must derive the active language from the current route. Browser language detection must not redirect root away from English.

- [ ] **Step 5: 검증과 커밋**

```bash
npm test
npm run lint
npm run build
git add src/App.jsx src/components/layout/LocaleLayout.jsx src/context/LanguageContext.jsx src/pages/au tests/au-app-routes-contract.test.mjs
git commit -m "feat: switch public routing to AU English-first site"
```

---

### Task 8: About·Cakes·Bakes 카테고리 구현

**Files:**
- Create: `src/pages/au/AuAboutPage.jsx`
- Create: `src/pages/au/AuCategoryPage.jsx`
- Create: `src/components/au/AuProductCard.jsx`
- Create: `src/components/au/AvailabilityBadge.jsx`
- Create: `src/components/au/ExternalBookingLink.jsx`
- Modify: `src/styles/au-site.css`
- Test: `tests/au-category-contract.test.mjs`

- [ ] **Step 1: 카테고리 계약 테스트 작성**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const card = readFileSync('src/components/au/AuProductCard.jsx', 'utf8')

test('booking products use View & Book without prices', () => {
  assert.match(card, /View & Book|예약 보기/)
  assert.equal(/priceUSD|priceKRW|Add to Cart/.test(card), false)
})
```

- [ ] **Step 2: About 페이지 구현**

Use the exact section order and approved copy rules from `design.md`. Do not reuse the existing Bean-to-Bar claims.

- [ ] **Step 3: Generic category component 구현**

`AuCategoryPage` receives:

```jsx
<AuCategoryPage category="cakes" locale="en" />
```

It loads published products via `getPublishedAuProducts(category)`.

- [ ] **Step 4: Cakes와 Bakes CTA 구현**

`external-booking` products render:

```text
View & Book ↗
```

The button uses the validated catalog href and does not calculate price.

- [ ] **Step 5: 검증과 커밋**

```bash
npm test
npm run lint
npm run build
git add src/pages/au/AuAboutPage.jsx src/pages/au/AuCategoryPage.jsx src/components/au src/styles/au-site.css tests/au-category-contract.test.mjs
git commit -m "feat: add AU about cakes and bakes pages"
```

---

### Task 9: Chocolate·Tea·Goods 소개 상세페이지 구현

**Files:**
- Create: `src/pages/au/AuProductPage.jsx`
- Modify: `src/pages/au/AuCategoryPage.jsx`
- Modify: `src/components/au/AuProductCard.jsx`
- Modify: `src/styles/au-site.css`
- Test: `tests/au-product-page-contract.test.mjs`

- [ ] **Step 1: 소개 전용 상세 계약 테스트 작성**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const page = readFileSync('src/pages/au/AuProductPage.jsx', 'utf8')

test('catalogue detail excludes commerce controls', () => {
  for (const term of ['Add to Cart', 'Quantity', 'Checkout', 'priceUSD', 'priceKRW']) {
    assert.equal(page.includes(term), false)
  }
})

test('catalogue detail includes availability and related products', () => {
  assert.match(page, /AvailabilityBadge/)
  assert.match(page, /related/i)
})
```

- [ ] **Step 2: 공통 상세페이지 구현**

Required sections:

```text
Breadcrumb
Gallery
Category eyebrow
Product name
Short description
Availability badge
Story
Ingredients or materials
Care / brewing notes
Related products
Sydney updates link
```

- [ ] **Step 3: Tea 표현 검증**

Create `tests/au-tea-copy.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { AU_PRODUCTS } from '../src/data/auCatalog.js'

test('published tea copy does not make detox or medical claims', () => {
  const forbidden = /detox|cleanse|toxin|weight loss|gut health|치료|해독|체중 감량/i
  for (const item of AU_PRODUCTS.filter((product) => product.category === 'tea' && product.status === 'published')) {
    assert.equal(forbidden.test(JSON.stringify(item.copy)), false, item.id)
  }
})
```

- [ ] **Step 4: 검증과 커밋**

```bash
npm test
npm run lint
npm run build
git add src/pages/au/AuProductPage.jsx src/pages/au/AuCategoryPage.jsx src/components/au/AuProductCard.jsx src/styles/au-site.css tests
git commit -m "feat: add AU chocolate tea and goods catalogue pages"
```

---

### Task 10: 기존 쇼핑·디지털 기능을 공개 번들에서 분리하기

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/App.jsx`
- Modify: `src/config/projectIntegrations.js`
- Modify or stop importing: `src/components/layout/Header.jsx`
- Modify or stop importing: `src/components/layout/Footer.jsx`
- Test: `tests/au-no-commerce-contract.test.mjs`

- [ ] **Step 1: 공개 번들 계약 테스트 작성**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const main = readFileSync('src/main.jsx', 'utf8')
const app = readFileSync('src/App.jsx', 'utf8')

test('public app no longer mounts CartProvider', () => {
  assert.equal(main.includes('CartProvider'), false)
})

test('public app does not import commerce or internal admin pages', () => {
  assert.equal(/CartPage|CheckoutPage|OrderSuccessPage|AdminPage|Digital/.test(app), false)
})
```

- [ ] **Step 2: `CartProvider` 제거**

Modify `src/main.jsx` to render:

```jsx
<StrictMode>
  <App />
</StrictMode>
```

- [ ] **Step 3: AU 외부 링크로 통합 설정 교체**

Update or replace public uses of `projectIntegrations.js` so no public route points to:

```text
cake.verygood-chocolate.com
partner.verygood-chocolate.com
reciept.verygood-chocolate.com
```

Public destinations must come from `AU_LINKS`.

- [ ] **Step 4: 사용하지 않는 dependency는 즉시 삭제하지 않음**

`firebase`, `@portone/browser-sdk`, `@emailjs/browser`는 공개 라우트에서 import하지 않게 한 뒤, Release B 안정화 후 별도 cleanup PR에서 제거한다.

- [ ] **Step 5: 검증과 커밋**

```bash
npm test
npm run lint
npm run build
git add src/main.jsx src/App.jsx src/config/projectIntegrations.js tests/au-no-commerce-contract.test.mjs
git commit -m "refactor: isolate AU public site from commerce and admin"
```

---

### Task 11: 영어 기본 SEO·광고 제거·정적 검색 파일 만들기

**Files:**
- Modify: `index.html`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Modify: `public/_redirects`
- Modify: `public/_headers`
- Create: `src/components/au/AuSeo.jsx`
- Test: `tests/au-seo-contract.test.mjs`

- [ ] **Step 1: SEO 계약 테스트 작성**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const html = readFileSync('index.html', 'utf8')
const robots = readFileSync('public/robots.txt', 'utf8')
const sitemap = readFileSync('public/sitemap.xml', 'utf8')

test('base document is English and contains no AdSense', () => {
  assert.match(html, /<html lang="en-AU">/)
  assert.equal(/adsbygoogle|google-adsense-account/.test(html), false)
})

test('robots references the production sitemap', () => {
  assert.match(robots, /https:\/\/verygood-chocolate\.com\/sitemap\.xml/)
})

test('sitemap contains English and Korean public roots', () => {
  assert.match(sitemap, /<loc>https:\/\/verygood-chocolate\.com\/<\/loc>/)
  assert.match(sitemap, /<loc>https:\/\/verygood-chocolate\.com\/ko<\/loc>/)
})
```

- [ ] **Step 2: `index.html` 정리**

- Set `<html lang="en-AU">`.
- Add Playfair Display and Work Sans.
- Remove AdSense meta and script.
- Keep GA only if consent-based loading is implemented; otherwise remove the direct script for Release A.
- Set theme color to `#1f5a46`.

- [ ] **Step 3: `AuSeo` 구현**

`AuSeo` accepts:

```jsx
<AuSeo
  locale="en"
  path="/tea"
  title="Signature Tea | Verygood Chocolate"
  description="Four signature tea blends from Verygood Chocolate."
  image="/assets/au/og/tea.jpg"
/>
```

It renders canonical, Open Graph and alternate hreflang links.

- [ ] **Step 4: Redirects**

Use temporary `302` redirects during preview:

```text
/en                  /                    302
/en/*                /:splat              302
/brand               /about               302
/products            /chocolate           302
/category/chocolate  /chocolate           302
/category/tea        /tea                 302
/category/gift       /goods               302
/cart                /                    302
/checkout            /                    302
/order-success       /                    302
```

After production verification, change stable mappings to `301` in a separate commit.

- [ ] **Step 5: 검증과 커밋**

```bash
npm test
npm run lint
npm run build
git add index.html public src/components/au/AuSeo.jsx tests/au-seo-contract.test.mjs
git commit -m "feat: add AU SEO and remove public advertising"
```

---

### Task 12: 접근성·반응형·성능 마감

**Files:**
- Modify: `src/components/au/*`
- Modify: `src/pages/au/*`
- Modify: `src/styles/au-site.css`
- Create: `docs/au-release-qa.md`

- [ ] **Step 1: 키보드 테스트**

Verify manually:

```text
Tab → Menu
Enter → open
Tab → every link
Escape → close
Focus → returns to Menu
```

- [ ] **Step 2: 필수 폭 시각 검수**

Capture or inspect:

```text
320
360
390
768
1024
1440
```

Record pass/fail in `docs/au-release-qa.md`.

- [ ] **Step 3: reduced-motion 검수**

Browser DevTools에서 `prefers-reduced-motion: reduce`를 활성화한다. Ticker, reveal, floating object가 멈추는지 기록한다.

- [ ] **Step 4: 이미지 최적화**

For images over 400KB, create WebP versions with long edge no larger than 1800px unless the source is a transparent hero cutout.

- [ ] **Step 5: 링크 검수**

Check all approved external URLs with:

```bash
node --test tests/au-links.test.mjs
```

Then manually open Cakes, Classes, Reviews, Lookup and Korea links in Cloudflare Preview.

- [ ] **Step 6: 전체 검증과 커밋**

```bash
npm test
npm run lint
npm run build
git add src docs/au-release-qa.md public/assets/au
git commit -m "fix: complete AU responsive accessibility and performance QA"
```

---

### Task 13: Cloudflare Preview·검수·출시

**Files:**
- Modify only if required: `README.md`
- Modify after verification: `public/_redirects`

- [ ] **Step 1: Branch push**

```bash
git push -u origin feature/au-main-redesign
```

- [ ] **Step 2: Cloudflare Preview에서 확인**

Required paths:

```text
/
/about
/cakes
/bakes
/chocolate
/tea
/goods
/ko
/ko/cakes
/ko/tea
```

- [ ] **Step 3: John·Jenny 승인**

Approval checklist:

```text
Home first impression
Book a Cake link
Kids Classes link
Mobile menu
English copy
Korean copy
Product images
No price/cart/checkout
Korea link
```

- [ ] **Step 4: 안정적 redirect를 301로 전환**

Only after preview and production verification:

```text
/en                  /                    301
/brand               /about               301
/products            /chocolate           301
/category/chocolate  /chocolate           301
/category/tea        /tea                 301
/category/gift       /goods               301
```

Keep `/cart`, `/checkout`, `/order-success` as `302` for one release cycle before permanently retiring them.

- [ ] **Step 5: 최종 검증**

```bash
npm ci
npm test
npm run lint
npm run build
git status --short
```

Expected:

```text
All tests pass
Lint exit 0
Build exit 0
Working tree clean
```

- [ ] **Step 6: Draft PR**

PR title:

```text
feat: turn verygood-chocolate.com into the AU brand home
```

PR body must include:

```text
- AU booking site was not modified
- Removed public cart/checkout/admin paths
- English root and Korean /ko paths
- External booking link verification
- Cloudflare Preview URL
- Mobile and desktop QA evidence
- Rollback instructions
```

---

## 4. 롤백 전략

- `au-cake`는 수정하지 않으므로 예약 서비스는 항상 독립적으로 동작한다.
- 새 작업은 하나의 feature branch와 Cloudflare Preview에서 검증한다.
- 문제가 생기면 `verygoodhompage`의 이전 production commit으로 즉시 롤백한다.
- 기존 Cart, Checkout, Digital 파일을 첫 출시에서 삭제하지 않으므로 필요하면 이전 라우터를 복원할 수 있다.
- redirect를 처음부터 301로 고정하지 않고 Preview와 첫 운영 검수 동안 302를 사용한다.

---

## 5. Release A 완료 기준

- [ ] `/`가 영어 AU 브랜드 홈이다.
- [ ] `/ko`가 한국어 AU 브랜드 홈이다.
- [ ] 새 Header와 Footer가 적용된다.
- [ ] Cart, Checkout, Admin, Digital이 공개 내비게이션에서 제거된다.
- [ ] Book a Cake가 AU 케이크 예약으로 이동한다.
- [ ] Kids Classes가 AU 클래스 페이지로 이동한다.
- [ ] Korea가 `kr.verygood-chocolate.com`으로 이동한다.
- [ ] 홈에 Cakes, Bakes, Chocolate, Tea, Goods가 표시된다.
- [ ] 제품 가격이 표시되지 않는다.
- [ ] AdSense가 제거된다.
- [ ] 모바일 360px에서 헤더와 CTA가 겹치지 않는다.
- [ ] `npm test`, `npm run lint`, `npm run build`가 통과한다.

---

## 6. 전체 완료 기준

- [ ] About, Cakes, Bakes, Chocolate, Tea, Goods가 모두 완성된다.
- [ ] Chocolate, Tea, Goods 소개 상세페이지가 완성된다.
- [ ] 모든 공개 제품이 `auCatalog.js`에서 관리된다.
- [ ] draft 제품은 공개되지 않는다.
- [ ] 모든 예약 링크가 승인된 AU 도메인으로만 연결된다.
- [ ] 영어와 한국어 경로가 서로 정확히 전환된다.
- [ ] 기존 `/en`, `/products`, `/category/*`, `/product/*`가 안전하게 전환된다.
- [ ] sitemap, robots, canonical, hreflang이 적용된다.
- [ ] reduced motion과 키보드 메뉴가 동작한다.
- [ ] Cloudflare Preview에서 John과 Jenny가 승인한다.
- [ ] `au-cake` 저장소에는 변경이 없다.

---

## 7. 구현 에이전트 시작 프롬프트

```text
verygoodhompage 저장소의 design.md와 plan.md를 먼저 끝까지 읽어줘.
현재 작업 경로가 feature/au-main-redesign 브랜치의 독립 worktree인지 확인해.
main 브랜치와 au-cake 저장소는 수정하지 마.

Penpot Cover에 HOME SHELL APPROVED FOR BUILD가 있는지 확인한 뒤,
plan.md의 Task 1부터 순서대로 진행해.

이번 사이트는 쇼핑몰이 아니다.
가격, Cart, Checkout, 온라인 결제를 공개하지 말고,
케이크와 키즈 클래스는 au.verygood-chocolate.com의 승인된 URL로만 연결해.

각 Task마다:
1. 테스트 또는 계약 확인
2. 최소 구현
3. npm test
4. npm run lint
5. npm run build
6. 작은 커밋
순서를 지켜줘.
```
