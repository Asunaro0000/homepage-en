// =====================================
// 1. 背景の森スクロール（PC / スマホで速度分岐）
// =====================================
(() => {
  const bg = document.querySelector(".forest-bg");
  if (!bg) return;

  const images = [
    "assets/images/bg-forest1.webp",
    "assets/images/bg-forest2.webp",
    "assets/images/bg-forest3.webp",
    // 必要ならここに追加
  ];

  let index = 0;
  let posY = 100;

  // PC（768px以上）: ゆっくり、スマホ: やや速く
  const isMobile = window.innerWidth < 768;
  const SPEED = isMobile ? 0.1 : 0.02;

  function setImage(i) {
    bg.style.backgroundImage = `url("${images[i]}")`;
    posY = 100;
    bg.style.backgroundPosition = `center ${posY}%`;
  }

  setImage(index);

  function animate() {
    posY -= SPEED;
    bg.style.backgroundPosition = `center ${posY}%`;

    if (posY <= 0) {
      index++;
      if (index >= images.length) index = 0;
      setImage(index);
    }

    requestAnimationFrame(animate);
  }

  animate();
})();


// =====================================
// 2. ギャラリーカード定義（プレイリスト管理）
// =====================================
const galleryItems = [
  {
    src: "assets/images/1.webp",
    alt: "秋の森で本を読む少女とフクロウ",
    caption: "風音にまぎれて、頁がそっと息づく。"
  },

  {
    src: "assets/images/2.webp",
    alt: "月明かりに照らされた少女と紅葉の光",
    caption: "満ちる光が、胸の奥をそっと温めた。"
  },
  {
    src: "assets/images/3.webp",
    alt: "手のひらに光を受ける少女と秋空",
    caption: "ひらめく光が、世界の輪郭を描いていく。"
  },

  {
    src: "assets/images/4.webp",
    alt: "切り株に座る少女と寄り添う精霊たち",
    caption: "静かな息が、森の奥で青く揺れた。"
  },

  {
    src: "assets/images/5.webp",
    alt: "木漏れ日の下で木の実を分け合う少女と小さな仲間",
    caption: "あたたかい匂いに誘われて、小さな輪がひらく。"
  },

  {
    src: "assets/images/6.webp",
    alt: "大きな葉に伏せる少女の情景",
    caption: "露のきらめきに耳をすませ、葉の海をそっと進む。"
  },
  {
    src: "assets/images/7.webp",
    alt: "木の枝で風を受ける少女と精霊たち",
    caption: "風をまとって座ると、青い火がほほえみ寄る。"
  },
  {
    src: "assets/images/8.webp",
    alt: "虹色の翼を広げる少女と精霊の情景",
    caption: "ひかりの翼が森を照らし、青い声が舞い上がる。"
  },
  {
    src: "assets/images/9.webp",
    alt: "大きな梟とともに佇む青衣の少女",
    caption: "静かなまなざしが合図になり、森の気配が深まる。"
  },
  {
    src: "assets/images/10.webp",
    alt: "花原を歩き蓮の灯りを手にする少女",
    caption: "花風のなかで灯をすくい、ひと息の祈りを落とす。"
  },
  {
    src: "assets/images/11.webp",
    alt: "花の中で眠る少女の情景",
    caption: "花の息に包まれ、夢だけが揺れていた。"
  },
  {
    src: "assets/images/12.webp",
    alt: "兎耳の巫女たちと社の情景",
    caption: "朝の社に小さな足音が集い、森が目を覚ます。"
  },
  {
    src: "assets/images/13.webp",
    alt: "白樺の根元に座る少女と精霊と大蛇",
    caption: "白樺の影でひと息つくと、古い守り手たちが寄り添う。"
  },
  {
    src: "assets/images/14.webp",
    alt: "鹿の仮面をつけた巫女の情景",
    caption: "仮面の奥に静かな気配が宿り、葉音がそっと結ぶ。"
  },
  {
    src: "assets/images/15.webp",
    alt: "森を歩む緑の巫女と精霊たち",
    caption: "緑の息をまといながら、青い影がつれだって揺れる。"
  },

  {
    src: "assets/images/16.webp",
    alt: "神社の屋根の上で青い火を抱く狐耳の少女",
    caption: "祈りの灯が、静かに揺れる。"
  },
  {
    src: "assets/images/17.webp",
    alt: "吊り下がる鈴の間で青い狐火を見上げる少女",
    caption: "呼ばれた気配に、胸がふるえる。"
  },
  {
    src: "assets/images/18.webp",
    alt: "社の前で振り返る狐耳の少女と青い狐火",
    caption: "風が扉をひらき、道が続く。"
  },
  {
    src: "assets/images/19.webp",
    alt: "大樹の枝に座る緑の仮面の小さな存在",
    caption: "森の目が、そっと見守る。"
  },
  {
    src: "assets/images/20.webp",
    alt: "幹にひそむ緑の光と、大木に刻まれた無数の窓",
    caption: "樹の奥には、古い記憶が眠る。"
  },
  {
    src: "assets/images/21.webp",
    alt: "枝の上で黒い小獣と向き合う緑髪の少女",
    caption: "影の声が、葉を揺らす。"
  },
  {
    src: "assets/images/22.webp",
    alt: "並び立つ白鹿と黒鹿の精霊たち",
    caption: "森の主は、静かに姿を現す。"
  },
  {
    src: "assets/images/23.webp",
    alt: "炎をまとった白い小獣が森を跳ねる情景",
    caption: "ひとすじの火が、闇を照らす。"
  },
  {
    src: "assets/images/24.webp",
    alt: "水面に立ち、近づく青い魚の精霊を見つめる少女",
    caption: "揺れる輪の向こうに、呼ぶ声があった。"
  },

  // ここに追加していけばカードが増える
];


// =====================================
// 3. ギャラリーDOM生成
// =====================================
function renderGallery() {
  const grid = document.getElementById("fg-grid");
  if (!grid) return;

  grid.innerHTML = "";

  galleryItems.forEach((item) => {
    const link = document.createElement("a");
    link.className = "fg-card";
    link.href = "#";

    const fig = document.createElement("figure");
    fig.className = "fg-figure";

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || "";
    img.loading = "lazy";

    const cap = document.createElement("figcaption");
    cap.className = "fg-caption";
    cap.textContent = item.caption || "";

    fig.appendChild(img);
    fig.appendChild(cap);
    link.appendChild(fig);
    grid.appendChild(link);
  });
}


// =====================================
// 4. ライトボックス初期化
// =====================================
function setupLightbox() {
  const cards = document.querySelectorAll(".fg-card");
  const lightbox = document.getElementById("fg-lightbox");
  const imgEl = document.getElementById("fg-lightbox-img");
  const capEl = document.getElementById("fg-lightbox-caption");
  const closeBtn = document.querySelector(".fg-lightbox-close");

  if (!cards.length || !lightbox || !imgEl || !capEl) return;

  function openLightbox(src, alt, caption) {
    imgEl.src = src;
    imgEl.alt = alt || "";
    capEl.textContent = caption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    imgEl.src = "";
    imgEl.alt = "";
    capEl.textContent = "";
  }

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const img = card.querySelector("img");
      const cap = card.querySelector(".fg-caption");
      if (!img) return;
      openLightbox(img.src, img.alt, cap ? cap.textContent : "");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}


// =====================================
// 5. DOM構築後にギャラリーとライトボックスを準備
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  setupLightbox();
});
