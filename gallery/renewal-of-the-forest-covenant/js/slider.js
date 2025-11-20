// tiny helpers
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// ---- 編集ポイント：この配列を書き換えて使う ----
const slides = [
  {
    src: "./thumbnail/kv01.webp",
    thumb: "./thumbnail/kv01.webp",
    href: "https://asunaro0000.github.io/Renewal-of-the-Forest-Covenant/"  ,
    title: "森の契約更新譚 ― Storyboard",
    caption: "森に宿る約束が再び目を覚ます。 背景美術と物語イラストで描く「契約更新」の風景。"
  },
  {
    src: "./thumbnail/kv02.webp",
    thumb: "./thumbnail/kv02.webp",
    href: "./Forest_of_Story_Marks/index.html",
    title: "栞の森 ― Single Scene",
    caption: "森に刻まれた一瞬を栞にして、背景美術で紡ぐ情景。"
  },
  {
    src: "./thumbnail/kv03.webp",
    thumb: "./thumbnail/kv03.webp",
    href: "./Forest-Sprits/index.html",
    title: "精霊の森 ― Single Scene",
    caption: "精霊×森の一場面を収めた小さな展示室。背景のゆるやかな動きが、奥へと続く森の気配をそっと示します。"
  },
  {
    src: "./thumbnail/kv04.webp",
    thumb: "./thumbnail/kv04.webp",
    href: "./Forest-panorama-background/index.html",
    title: "森の営み ― panorama Scene",
    caption: "森の形や光の流れ、倒木・切り株・祠などの要素を横に並べて整理した資料展示です。背景制作や世界観設計のために、森の一連の景観が確認できます。"
  },
];

function createSlider(mount, slides = []){
  const track  = mount.querySelector(".sld__track");
  const dots   = mount.querySelector(".sld__dots");
  const thumbs = mount.querySelector(".sld__thumbs");
  const title  = mount.querySelector(".sld__title");
  const capEl  = mount.querySelector("#caption");

  // slides -> DOM
  track.innerHTML = slides.map(s => `
    <div class="sld__slide">
      ${s.href ? `<a class="sld__link" href="${s.href}">` : `<span class="sld__link">`}
        <img src="${s.src}" alt="${s.title || ''}" loading="eager">
      ${s.href ? `</a>` : `</span>`}
    </div>
  `).join("");

  dots.innerHTML = slides.map((_, i) => `<button class="sld__dot" data-i="${i}" aria-label="Go to slide ${i+1}"></button>`).join("");
  thumbs.innerHTML = slides.map((s, i) => `
    <button class="sld__th" data-i="${i}" aria-label="Preview ${i+1}">
      <img src="${s.thumb || s.src}" alt="">
    </button>
  `).join("");

  let idx = 0, n = slides.length;
  function update(i){
    if (!n) return;
    idx = (i + n) % n;
    track.style.transform = `translateX(${-100 * idx}%)`;
    $$(".sld__dot", dots).forEach((d,k)=>d.classList.toggle("active", k===idx));
    $$(".sld__th",  thumbs).forEach((t,k)=>t.classList.toggle("active", k===idx));
    title.textContent = slides[idx]?.title || "";
    capEl.textContent = slides[idx]?.caption || "";
  }


  dots.addEventListener("click", (e)=>{
    const b = e.target.closest(".sld__dot"); if(!b) return;
    update(parseInt(b.dataset.i,10));
  });
  thumbs.addEventListener("click", (e)=>{
    const b = e.target.closest(".sld__th"); if(!b) return;
    update(parseInt(b.dataset.i,10));
  });

  // drag/swipe (avoid hijacking <a> click)
  let sx=null, anchor=null;
  track.addEventListener("pointerdown", (e)=>{
    anchor = e.target.closest("a");
    sx = e.clientX;
    if (!anchor) track.setPointerCapture(e.pointerId);
  });
  track.addEventListener("pointerup", (e)=>{
    if (sx===null) return;
    const dx = e.clientX - sx;
    if (!anchor && Math.abs(dx) > 40){
      update(idx + (dx < 0 ? 1 : -1));
    } else if (anchor && Math.abs(dx) < 6){
      anchor.click();
    }
    sx=null; anchor=null;
  });

  update(0);
  return {update};
}

// init
createSlider(document.getElementById("work-slider"), slides);
