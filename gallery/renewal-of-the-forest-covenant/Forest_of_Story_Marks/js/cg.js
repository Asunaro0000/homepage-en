// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// 画像ごとに個別キャプションを設定
const items = [
  { src: './images/1.webp',  title: '森の社で', caption: '' },
  { src: './images/2.webp',  title: '樹の祠のあかり', caption: '' },
  { src: './images/3.webp',  title: '切り株の芽吹き', caption: '' },
  { src: './images/4.webp',  title: '水辺の祈り', caption: '' },
  { src: './images/5.webp',  title: '森を照らす灯籠', caption: '' },
  { src: './images/6.webp',  title: '小川の回廊', caption: '' },
  { src: './images/7.webp',  title: '森の石門', caption: '' },
  { src: './images/8.webp',  title: '若葉の宿る切り株で', caption: '' },
  { src: './images/9.webp',  title: '水鏡の小道', caption: '' },
  { src: './images/10.webp', title: '森の入口で', caption: '' },

  { src: './images/11.webp', title: '静けさの水辺にて', caption: '' },
  { src: './images/12.webp', title: '祈りの台座', caption: '' },
  { src: './images/13.webp', title: '波紋の庭', caption: '' },
  { src: './images/14.webp', title: '切り株の語り', caption: '' },
  { src: './images/15.webp', title: '木霊のさえずり', caption: '' },
  { src: './images/16.webp', title: '石灯籠のそばで', caption: '' },
  { src: './images/17.webp', title: '祠のそばで', caption: '' },
  { src: './images/18.webp', title: '道ゆく猫の背中', caption: '' },
  { src: './images/19.webp', title: '森にとまる気配', caption: '' },
  { src: './images/20.webp', title: '供え台の静寂', caption: '' },

  { src: './images/21.webp', title: '秋空を渡る布', caption: '' },
  { src: './images/22.webp', title: '柔光の道', caption: '' },
  { src: './images/23.webp', title: '水辺の安らぎ', caption: '' },
  { src: './images/24.webp', title: '木上のまなざし', caption: '' },
  { src: './images/25.webp', title: '切り株の道', caption: '' },
  { src: './images/26.webp', title: '温もりの湯辺', caption: '' },
  { src: './images/27.webp', title: '灯籠の導き', caption: '' },
  { src: './images/28.webp', title: '緑に伸びる息', caption: '' },
  { src: './images/29.webp', title: '装束の旅人', caption: '' },
  { src: './images/30.webp', title: '木上の鳥', caption: '' },

  { src: './images/31.webp', title: '朝のこだま', caption: '' },
  { src: './images/32.webp', title: '白樺の間を抜けて', caption: '' },
  { src: './images/33.webp', title: '寄り添う二つの気配', caption: '' },
  { src: './images/34.webp', title: '青い灯の導き', caption: '' },
  { src: './images/35.webp', title: '木陰の支度', caption: '' },
  { src: './images/36.webp', title: '森に響く輪音', caption: '' },
  { src: './images/37.webp', title: '高みの気配', caption: '' },
  { src: './images/38.webp', title: '帰る道', caption: '' },
  { src: './images/39.webp', title: '紋木の門', caption: '' },
  { src: './images/40.webp', title: '眠りの瞳', caption: '' },

  { src: './images/41.webp', title: '水音のささやき', caption: '' },
];




const gallery = $("#cardGallery");
gallery.innerHTML = items.map((it, i)=>`
  <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title}">
    <div class="card__imgwrap">
      <img src="${it.src}" alt="${it.title}" loading="lazy">
    </div>
    <figcaption class="card__meta">
      <h3 class="card__title">${it.title}</h3>
      <p class="card__caption">${it.caption}</p>
    </figcaption>
  </figure>
`).join("");

const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbTitle = $("#lbTitle");
const lbCaption = $("#lbCaption");
const zonePrev = $(".lb__zone--prev");
const zoneNext = $(".lb__zone--next");
const btnClose = $(".lb__close");

let idx = -1;

let viewStartTime = null;
let viewImageIndex = null;

function startImageViewTracking(index) {
  viewImageIndex = index;
  viewStartTime = performance.now();
}

function stopImageViewTracking() {
  if (viewStartTime == null || viewImageIndex == null) return;

  const elapsedMs = performance.now() - viewStartTime;
  const elapsedSec = Math.round(elapsedMs / 1000);

  // 1秒未満はノイズとして無視
  if (elapsedSec > 0 && typeof gtag === "function") {
    const it = items[viewImageIndex];
    gtag('event', 'image_view', {
      image_index: viewImageIndex,
      image_title: it.title,
      view_seconds: elapsedSec
    });
  }

  viewStartTime = null;
  viewImageIndex = null;
}

function openLB(i){
  // 直前に見ていた画像の閲覧時間を確定
  if (idx >= 0) {
    stopImageViewTracking();
  }

  idx = (i + items.length) % items.length;
  const it = items[idx];
  lbImg.src = it.src;
  lbImg.alt = it.title || "";
  lbTitle.textContent = it.title || "";
  lbCaption.textContent = it.caption || "";
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  preloadAround(idx);

  // この画像の閲覧計測を開始
  startImageViewTracking(idx);
}


function closeLB(){
  // 最後に見ていた画像の閲覧時間を確定
  stopImageViewTracking();

  lb.hidden = true;
  document.body.style.overflow = "";
  idx = -1;
}


function move(delta){
  if(idx < 0) return;
  openLB(idx + delta);
}

function preloadAround(i){
  [i-1, i+1].forEach(k=>{
    const j = (k + items.length) % items.length;
    const img = new Image();
    img.src = items[j].src;
  });
}

// Card click / Enter key
gallery.addEventListener("click", (e)=>{
  const card = e.target.closest(".card");
  if(!card) return;
  openLB(parseInt(card.dataset.i,10));
});
gallery.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" || e.key === " "){
    const card = e.target.closest(".card");
    if(card){ e.preventDefault(); openLB(parseInt(card.dataset.i,10)); }
  }
});

// Lightbox controls
btnClose.addEventListener("click", closeLB);
zonePrev.addEventListener("click", ()=> move(-1));
zoneNext.addEventListener("click", ()=> move(1));

// Click on image: decide left/right half
lbImg.addEventListener("click", (e)=>{
  const rect = lbImg.getBoundingClientRect();
  const mid = rect.left + rect.width/2;
  if(e.clientX < mid) move(-1); else move(1);
});

// Keyboard navigation
document.addEventListener("keydown", (e)=>{
  if(lb.hidden) return;
  if(e.key === "Escape") closeLB();
  if(e.key === "ArrowLeft") move(-1);
  if(e.key === "ArrowRight") move(1);
});

// Swipe (basic)
let sx = null;
lb.addEventListener("pointerdown", (e)=>{
  if(e.pointerType === "mouse") return; // touch only
  sx = e.clientX;
  lb.setPointerCapture(e.pointerId);
});
lb.addEventListener("pointerup", (e)=>{
  if(sx == null) return;
  const dx = e.clientX - sx;
  if(Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
  sx = null;
});
