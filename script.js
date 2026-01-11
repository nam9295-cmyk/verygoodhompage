const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

// LANGUAGE STATE (default: English)
let currentLang = "EN"; // "EN" or "KR"

function toggleLanguage() {
  currentLang = currentLang === "EN" ? "KR" : "EN";
  updateLanguageUI();
}

function updateLanguageUI() {
  const isKr = currentLang === "KR";

  // 1. Update Toggle Button Text
  const toggleBtn = $("#langToggle");
  if (toggleBtn) toggleBtn.textContent = isKr ? "EN" : "KR"; // Show target language to switch to

  // 2. Re-render Products
  const activeTab = document.querySelector(".tab.is-active")?.dataset?.tab || "new";
  renderProducts(activeTab);

  // 3. Update Menu Items (Optional: Extend this to object mapping if needed)
  // For now, simple text replacement example or just keep menu in English as designed

  // We can also update static texts if we tag them (e.g. data-i18n="shop-title")
}

// NOTE: 'products' array is now loaded from ./assets/data/products.js

function renderProducts(tabKey) {
  const grid = $("#productGrid");

  // Filter products that include the current tabKey in their 'tabs' array
  const list = products.filter(p => p.tabs.includes(tabKey));
  const isKr = currentLang === "KR";

  grid.innerHTML = list.map(p => `
    <article class="card product" data-id="${p.id}">
       <div class="thumb">
  <img src="${p.mainImage}" alt="${p.name}" loading="lazy">
</div>

      <div class="body">
        <div class="title">${isKr && p.name_ko ? p.name_ko : p.name}</div>
        <div class="meta">
          <div class="price">${p.priceStr}</div>
          <div class="pills">
            ${p.tags.slice(0, 2).map(t => `<span class="mini">${t}</span>`).join("")}
          </div>
        </div>
        <div class="btns">
          <a class="btn" href="./product-detail.html?id=${p.id}&lang=${currentLang}">${isKr ? "상세보기" : "Detail"}</a>
          <button class="btn primary" type="button" data-action="buy">${isKr ? "구매하기" : "Buy"}</button>
        </div>
      </div>
    </article>
  `).join("");

  // Buy button handler only (Detail is now a link)
  $$(".product .btn.primary").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".product");
      const id = card?.dataset?.id || "";
      alert(`장바구니/구매 연결 예정: ${id}\n(결제 링크로 교체)`);
    });
  });
}

function initTabs() {
  const tabs = $$(".tab");
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => {
      x.classList.remove("is-active");
      x.setAttribute("aria-selected", "false");
    });
    t.classList.add("is-active");
    t.setAttribute("aria-selected", "true");
    renderProducts(t.dataset.tab);
  }));
  renderProducts("new");
}

function initMenu() {
  const menuBtn = $("#menuBtn");
  const closeBtn = $("#menuCloseBtn");
  const dialog = $("#menuDialog");

  const open = () => {
    dialog.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    dialog.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  menuBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) close();
  });

  $$("[data-close-menu]").forEach(a => a.addEventListener("click", close));

  window.addEventListener("keydown", (e) => {
    if (!dialog.hidden && e.key === "Escape") close();
  });
}

function initYear() {
  $("#year").textContent = new Date().getFullYear();
}

function initScrollHeader() {
  const hero = document.querySelector(".hero-bleed");
  if (!hero) return;

  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    const show = rect.bottom <= 60;
    document.body.classList.toggle("is-header-visible", show);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}


function initMarquee() {
  const track = document.querySelector(".marquee-track");
  const set1 = document.querySelector(".marquee-set");
  if (!track || !set1) return;

  const apply = () => {
    // set1 실제 폭(px)
    const w = Math.ceil(set1.getBoundingClientRect().width);
    track.style.setProperty("--marq-shift", `${w}px`);

    // 속도도 화면/폭에 맞춰 자동조절(원하면 값만 바꾸면 됨)
    // 90px/sec 기준으로 계산 -> 폭이 커지면 자연스럽게 더 오래 걸림
    const seconds = Math.max(12, Math.round(w / 90));
    track.style.setProperty("--marq-dur", `${seconds}s`);
  };

  apply();
  window.addEventListener("resize", () => {
    // 리사이즈 중 연속 계산 방지(가벼운 디바운스)
    clearTimeout(window.__marqT);
    window.__marqT = setTimeout(apply, 120);
  });
}

function initLanguage() {
  const btn = $("#langToggle");
  if (btn) {
    btn.addEventListener("click", toggleLanguage);
  }
}

initTabs();
initMenu();
initYear();
initScrollHeader();
initLanguage();
