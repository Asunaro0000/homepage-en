// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// 画像ごとに個別キャプションを設定
const items = [
  { src: './images/1.webp',  title: '木漏れ日の中で',
    caption: '差し込む光を手でさえぎり、木に寄りかかる。まぶしさに目を細めながら、静かに息を整えていた。' },

  { src: './images/2.webp',  title: '空を見上げて',
    caption: '高く立ちのぼる雲を仰ぐと、風が草原を駆け抜ける。赤い紐がその流れに触れ、ひらりと揺れた。' },

  { src: './images/3.webp',  title: '小鳥たちの巣',
    caption: 'かがんだ手元に小さな雛が寄り添う。午後の明るさがかごの中へ入り込み、静かな温もりが続いていた。' },

  { src: './images/4.webp',  title: '森のフクロウ',
    caption: '差し出した手にフクロウがそっと身を乗せる。朝の光が羽を照らし、模様の輪郭がくっきりと浮かび上がった。' },

  { src: './images/5.webp',  title: '野原のうさぎたち',
    caption: '野原に腰を下ろすと、小さなうさぎたちが寄り添う。草の匂いが、胸の奥にそっと広がった。' },

  { src: './images/6.webp',  title: '夕暮れの道',
    caption: '金色の道をゆっくり歩く。傾く光が背を押し、遠い空にあたたかな色が滲んでいた。' },

  { src: './images/7.webp',  title: '草の上で',
    caption: '草に身をあずけると、地面の温度が静かに伝わる。午後の穏やかさが、音もなく満ちていった。' },

  { src: './images/8.webp',  title: '森の風を聴く',
    caption: '目を閉じると、枝が触れ合う気配がそっと寄ってくる。森全体が耳元でささやくようだった。' },

  { src: './images/9.webp',  title: '子猫を抱いて',
    caption: '朝の光が差す部屋で、子猫をそっと胸もとに寄せる。かすかな体温が、静かな時間をあたためていた。' },

  { src: './images/10.webp', title: '夕陽を見上げて',
    caption: '草の上に横たわり、空へ目を向ける。沈む陽の明るさがまぶたを淡く染めていった。' },

  { src: './images/11.webp', title: '秋の縁側で',
    caption: '縁側で落ち葉を集める手が止まる。紅葉の色が光と重なり、季節の匂いがふわりと広がった。' },

  { src: './images/12.webp', title: '森のかげから',
    caption: '木の影を出たところで、リスが足元に現れた。森の明るさがその小さな動きを照らしていた。' },

  { src: './images/13.webp', title: '桜の下で',
    caption: '並木を歩くと、花びらが肩に落ちる。ひとひらが触れただけで、春の気配がすっと近づいてきた。' },

  { src: './images/14.webp', title: '紙飛行機を空へ',
    caption: '紙飛行機を放つと、白い翼が風をとらえた。空へ向かう軌跡が、朝の光を軽く跳ね返していた。' },

  { src: './images/15.webp', title: '灯をともして',
    caption: '小さな灯を掲げると、橙色の明かりが手元に集まる。山あいの静けさが夜の始まりを告げていた。' },

  { src: './images/16.webp', title: '縁側の小鳥たち',
    caption: '縁側に腰掛け、小鳥へそっと餌を置く。羽ばたきが弾むように広がり、朝の気配がやわらかく動きだした。' },

  { src: './images/17.webp', title: '森のきつねへ',
    caption: '森でいつもの場所に腰を下ろし、器を差し出す。きつねは落ち着いた様子で近づき、馴染んだ空気がふたりを包んでいた。' },

  { src: './images/18.webp', title: '朝の支度',
    caption: '鍋をかき混ぜると、湯気がふわりと立つ。香りが広がり、朝の始まりをそっと知らせていた。' },

  { src: './images/19.webp', title: '雨の木かげで',
    caption: '雨音の下、木のそばでそっと立ち止まる。葉から落ちた雫が肩を滑り、ひんやりとした空気が肌をかすめた。' },

  { src: './images/20.webp', title: '空へ羽ばたく朝',
    caption: '小鳥が羽を震わせる。光を受けたその姿に、朝の気配がやわらかく重なっていった。' },

  { src: './images/21.webp', title: '森での再会',
    caption: '目を閉じたきつねが腕に落ち着く。ウサ子は目を開け、その様子を静かに見守った。' },

  { src: './images/22.webp', title: '竹の道を歩く',
    caption: '竹林の階段を下りる。緑の香りが足もとに満ち、光が新しい季節の予感を運んでいた。' },

  { src: './images/23.webp', title: '竹林を抜けて',
    caption: '竹の道を進むたび、葉が小さく触れ合う。淡い影が足もとに落ち、静かな朝が続いていった。' },

  { src: './images/24.webp', title: '花畑の真ん中で',
    caption: '花畑の中心でそっと手を合わせる。花冠が光を受け、やわらかなきらめきが風にほどけていった。' },
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

function openLB(i){
  idx = (i + items.length) % items.length;
  const it = items[idx];
  lbImg.src = it.src;
  lbImg.alt = it.title || "";
  lbTitle.textContent = it.title || "";
  lbCaption.textContent = it.caption || "";
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  preloadAround(idx);
}

function closeLB(){
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
