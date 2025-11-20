// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// 画像ごとに個別キャプションを設定
const items = [
  { src: './images/1.webp', title: '葉を記す朝',
    caption: '札を確かめる指先に淡い色が落ちる。瓶を前にした朝の作業が、ひと区切りの気配を帯びていた。' },

  { src: './images/2.webp', title: '月を見上げる窓辺',
    caption: 'マフラーに指先を添え、夜空へそっと視線を上げる。月の明かりが窓辺を満たし、静けさが深く息づいていた。' },

  { src: './images/3.webp', title: '書きかけの頁',
    caption: '綴りかけの文字の前で筆が止まる。開いたノートに、積まれた本の影が静かに伸びていた。' },

  { src: './images/4.webp', title: '夜の瓶棚',
    caption: 'ふたを閉じる指先に、外の夜色がそっと寄り添う。棚の瓶が、眠る種をほのかに映していた。' },

  { src: './images/5.webp', title: '灯りと地図の部屋',
    caption: '地図を広げた机に灯がともる。紙面の起伏が浮かび上がり、静かに道筋を示していた。' },

  { src: './images/6.webp', title: '二人の作業台',
    caption: '筆を取る母の手元に寄り添うようにして見守る。柔らかな光がふたりの間に静かな温度を残していた。' },

  { src: './images/7.webp', title: 'うたた寝の午後',
    caption: '本に顔を寄せたまま深い息が落ちる。温かさの残るカップが、ゆっくりと午後の時間を支えていた。' },

  { src: './images/8.webp', title: '秋の調合机',
    caption: '色づく外の景色を眺めながら記録を整える。木の道具たちが、秋の静かな気配を受け止めていた。' },

  { src: './images/9.webp', title: '図書室の片隅で',
    caption: '本を開いて一歩止まる。障子越しの光が文字の輪郭をやわらかく浮かべていた。' },

  { src: './images/10.webp', title: '本棚の通路で',
    caption: '並ぶ背表紙の間を抜けながら振り返る。赤いマフラーが空気を切るように揺れていた。' },

  { src: './images/11.webp', title: '木漏れ日の机',
    caption: '外から吹き込む風にページがかすかに揺れ、木々の影が紙面に軽い模様を描いていった。' },

  { src: './images/12.webp', title: 'ランプの光と紙の音',
    caption: '指先で原稿をなぞると、紙が静かに鳴る。夜の明かりが手元に深みを与えていた。' },

  { src: './images/13.webp', title: '地図の部屋',
    caption: '壁に掛けられた地図をなぞる。揺れる蝋燭の明かりが古い紙の表情をゆっくり変えていった。' },

  { src: './images/14.webp', title: '葉影の机',
    caption: '本を開いたまま視線を止める。窓辺の蔦が揺れ、午後の空気に淡い影を落としていた。' },

  { src: './images/15.webp', title: '光る瓶の棚',
    caption: '棚の瓶に触れると、内部の色がきらりと返る。小さな輝きが部屋にやわらかな余韻を広げていた。' },

  { src: './images/16.webp', title: '本を抱える夕暮れ',
    caption: '胸に抱えた本の重みがじんわり伝わる。夕の明かりが木の香りをそっと引き立てていた。' },

  { src: './images/17.webp', title: '窓辺で森を見渡す',
    caption: '手帳を置き、緑へ視線を向ける。朝の風が葉をゆっくり揺らし、一日の気配を整えていた。' },

  { src: './images/18.webp', title: 'ガラス棚の前で',
    caption: '瓶のラベルを確かめるたび、陽の反射が淡い色を生んでいく。室内に穏やかな温度が満ちていた。' },

  { src: './images/19.webp', title: '朝の記録帳',
    caption: '開いたノートに静かに書き込む。湯気の立つ茶杯が、始まりの時間をそっと支えてくれた。' },

  { src: './images/20.webp', title: '森の図書廊下',
    caption: '光の模様が床に伸びる廊下をゆっくり進む。棚の端に置かれた紙片が、静けさの中で白く際立っていた。' },

  { src: './images/21.webp', title: '小瓶の調合台',
    caption: '小瓶を傾けて色を確かめる。薬草と器具の並びが、朝の作業の始まりを静かに知らせていた。' },
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
