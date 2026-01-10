const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

const products = [
  { id: "new-1", tab: "new", title: "Almond Chocoball", price: "₩11,000", tags: ["CHOC", "BEST"], img:"/assets/products/almond.png" },
  { id: "new-2", tab: "new", title: "Ruby berry Chocoball", price: "₩12,000", tags: ["CHOC", "FRUITY"], img:"/assets/products/ruby.png" },
  { id: "new-3", tab: "new", title: "Strawberry Bonbon", price: "₩10,000", tags: ["STRAW", "CRUNCH"],img:"/assets/products/straw.png" },
  { id: "new-4", tab: "new", title: "Matcha berry", price: "₩12,000", tags: ["DIP", "MATCHA"], img:"/assets/products/matcha.png" },

  { id: "best-1", tab: "best", title: "British Black", price: "₩10,000", tags: ["DETOX", "SIGNATURE"], img:"./assets/products/british.png" },
  { id: "best-2", tab: "best", title: "Hibiscus Fruit", price: "₩10,000", tags: ["DETOX", "FRUIT"], img:"/assets/products/hibis.png" },
  { id: "best-3", tab: "best", title: "Almond Chocoball", price: "₩11,000", tags: ["CHOC", "ALMOND"], img:"/assets/products/almond.png" },
  { id: "best-4", tab: "best", title: "Rubby berry Chocoball", price: "₩12,000", tags: ["CHOC", "BLUEBERRY"], img:"/assets/products/ruby.png" },

  { id: "gift-1", tab: "gift", title: "Gift 2 set", price: "₩29,800", tags: ["GIFT", "BOX"], img:"/assets/products/2set.png" },
  { id: "gift-2", tab: "gift", title: "Gift 4 set", price: "₩39,800", tags: ["GIFT", "PREMIUM"], img:"/assets/products/4set.png" },
  { id: "gift-3", tab: "gift", title: "Hogirl key-ring", price: "₩3,000", tags: ["ADD-ON"], img:"/assets/products/hogirl.png" },
  { id: "gift-4", tab: "gift", title: "Horse key-ring", price: "₩3,000", tags: ["ADD-ON"], img:"/assets/products/horse.png" },

  { id: "tea-1", tab: "tea", title: "British Black", price: "₩10,000", tags: ["DETOX", "EARLGREY"], img:"./assets/products/british.png" },
  { id: "tea-2", tab: "tea", title: "Asian Gold", price: "₩10,000", tags: ["DETOX", "OOLONG"], img:"./assets/products/asian.png" },
  { id: "tea-3", tab: "tea", title: "Hibiscus Fruit", price: "₩10,000", tags: ["DETOX", "FRUIT"], img:"./assets/products/hibis.png" },
  { id: "tea-4", tab: "tea", title: "Minty Chocolat", price: "₩10,000", tags: ["DETOX", "MINT"], img:"./assets/products/minty.png" },
];

function renderProducts(tabKey){
  const grid = $("#productGrid");
  const list = products.filter(p => p.tab === tabKey);

  grid.innerHTML = list.map(p => `
    <article class="card product" data-id="${p.id}">
       <div class="thumb">
  <img src="${p.img}" alt="${p.title}" loading="lazy">
</div>

      <div class="body">
        <div class="title">${p.title}</div>
        <div class="meta">
          <div class="price">${p.price}</div>
          <div class="pills">
            ${p.tags.slice(0,2).map(t => `<span class="mini">${t}</span>`).join("")}
          </div>
        </div>
        <div class="btns">
          <button class="btn" type="button" data-action="detail">Detail</button>
          <button class="btn primary" type="button" data-action="buy">Buy</button>
        </div>
      </div>
    </article>
  `).join("");

  $$(".product .btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".product");
      const id = card?.dataset?.id || "";
      const action = e.target.dataset.action;

      if(action === "detail"){
        alert(`상세 페이지 연결 예정: ${id}\n(스마트스토어/자사몰 링크로 교체)`);
      }
      if(action === "buy"){
        alert(`장바구니/구매 연결 예정: ${id}\n(결제 링크로 교체)`);
      }
    });
  });
}

function initTabs(){
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

function initMenu(){
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
    if(e.target === dialog) close();
  });

  $$("[data-close-menu]").forEach(a => a.addEventListener("click", close));

  window.addEventListener("keydown", (e) => {
    if(!dialog.hidden && e.key === "Escape") close();
  });
}

function initYear(){
  $("#year").textContent = new Date().getFullYear();
}

function initScrollHeader(){
  const hero = document.querySelector(".hero-bleed");
  if(!hero) return;

  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    const show = rect.bottom <= 60;
    document.body.classList.toggle("is-header-visible", show);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}


function initMarquee(){
  const track = document.querySelector(".marquee-track");
  const set1 = document.querySelector(".marquee-set");
  if(!track || !set1) return;

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

initTabs();
initMenu();
initYear();
initScrollHeader();
