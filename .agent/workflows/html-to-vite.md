---
description: HTML/CSS/JS 프로젝트를 React + Vite SPA로 변환하는 방법
---

# HTML to React + Vite 변환 워크플로우

## 1. 프로젝트 초기화
// turbo
```bash
npm create vite@latest . -- --template react
npm install react-router-dom react-helmet-async firebase --legacy-peer-deps
```

## 2. 폴더 구조 생성
```
src/
├── components/
│   ├── layout/     # Header, Footer, Layout
│   ├── common/     # ProductCard, Tabs, Modal 등
│   └── sections/   # HeroSection, ShopSection 등
├── pages/          # HomePage, AboutPage 등
├── context/        # LanguageContext 등
├── data/           # products.js, blogs.js
├── services/       # firebase.js
└── styles/         # index.css (글로벌 스타일)
```

## 3. Assets 복사
- 기존 `assets/` → `public/assets/`로 복사
- 폰트, 이미지, 로고 등 모두 포함

## 4. CSS 마이그레이션
- 기존 `styles.css` → `src/styles/index.css`
- 이미지 경로를 `/assets/...` (public 폴더 기준)으로 수정
- 폰트 경로도 동일하게 수정

## 5. 컴포넌트 생성
- HTML 섹션별로 React 컴포넌트 분리
- `dangerouslySetInnerHTML`은 블로그 콘텐츠 등에만 사용
- `Link` 컴포넌트로 내부 라우팅

## 6. 라우팅 설정 (App.jsx)
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
// ... 다른 페이지들

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            {/* ... */}
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
```

## 7. SEO 파일 업데이트
- `public/robots.txt` - `.html` 확장자 제거
- `public/sitemap.xml` - 클린 URL로 변경
- `public/llms.txt` - AI 봇용 정보 업데이트

## 8. Cloudflare Pages 배포 설정
필수 파일들:
```
public/_redirects     → /* /index.html 200
public/_headers       → 캐싱 및 보안 헤더
.nvmrc                → 20
.npmrc                → legacy-peer-deps=true
```

## 9. 빌드 최적화 (vite.config.js)
```js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          'seo': ['react-helmet-async'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
```

## 10. Git 백업 및 배포
// turbo
```bash
# 기존 HTML 코드 백업
git stash
git checkout -b legacy-html
git push origin legacy-html
git checkout main
git stash pop

# 새 코드 커밋 및 푸시
git add -A
git commit -m "feat: Convert to React + Vite SPA"
git push origin main
```

## Cloudflare Pages 설정
| 항목 | 값 |
|------|-----|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 20 (.nvmrc) |
