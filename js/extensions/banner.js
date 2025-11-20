// 自動切り替えバナー（スライド＋ドットインジケーター付き）
(function () {
  const bannerImage   = document.getElementById("bannerImage");
  const bannerCaption = document.getElementById("bannerCaption");
  const bannerLink    = document.getElementById("bannerLink");
  const bannerDotsBox = document.getElementById("bannerDots");

  if (!bannerImage || !bannerCaption || !bannerLink || !bannerDotsBox) return;

  // ★ ここを差し替えれば内容を自由に増減できる
  const banners = [
     {
      src: "./assets/banner/banner7.webp",
      caption: "森の資料室「森の営み」はこちらから。",
      href: "./gallery/renewal-of-the-forest-covenant/Forest-panorama-background/index.html",
      btnLabel: "▶ 森の資料室「森の営み」へ"
    },   
    {
      src: "./assets/banner/banner6.webp",
      caption: "森の精霊ギャラリーはこちらから。",
      href: "./gallery/renewal-of-the-forest-covenant/Forest-Sprits/index.html",
      btnLabel: "▶ 森の精霊ギャラリーへ"
    },
    {
      src: "./assets/banner/banner5.webp",
      caption: "ハロウィンのパノラマギャラリーはこちらから。",
      href: "./gallery/lili_and_kaede/halloween_single/index.html",
      btnLabel: "▶ ハロウィンパノラマへ"
    },
    {
      src: "./assets/banner/banner4.webp",
      caption: "リス子のパノラマギャラリーはこちらから。",
      href: "./gallery/Risko/risuko_room/index.html",
      btnLabel: "▶ リス子のパノラマへ"
    },
    {
      src: "./assets/banner/banner3.webp",
      caption: "栞の森の背景美術ルームをオープンしました。",
      href: "./gallery/renewal-of-the-forest-covenant/Forest_of_Story_Marks/index.html",
      btnLabel: "▶ 栞の森、背景美術ルームへ"
    },
    {
      src: "./assets/banner/banner2.webp",
      caption: "カメコの日常、一枚絵のギャラリーを公開しました。",
      href: "./gallery/Usako_and_Kameko/kameko_diary/index.html",
      btnLabel: "▶ カメコの日常へ"
    },
    {
      src: "./assets/banner/banner1.webp",
      caption: "ウサ子の日常、一枚絵のギャラリーを公開しました。",
      href: "./gallery/Usako_and_Kameko/usako_diary/index.html",
      btnLabel: "▶ ウサ子の日常へ"
    },

  ];

  let index = 0;
  const INTERVAL_MS = 4000; // 4秒ごとに切り替え
  let timer = null;

  // ▼ ドットを自動生成
  const dots = banners.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "top-banner__dot";
    dot.setAttribute("aria-label", `バナー ${i + 1}`);
    dot.addEventListener("click", () => {
      index = i;
      showBanner(index, true); // 即座に切り替え
      resetTimer();            // 手動操作後も自動送り継続
    });
    bannerDotsBox.appendChild(dot);
    return dot;
  });

  function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
      if (i === activeIndex) {
        dot.classList.add("is-active");
      } else {
        dot.classList.remove("is-active");
      }
    });
  }

  function showBanner(i, immediate) {
    const item = banners[i];

    // フェードアウト（＋スライドアウト）
    bannerImage.classList.add("is-fading");
    bannerCaption.style.opacity = 0;
    bannerLink.style.opacity = 0;

    const delay = immediate ? 0 : 250;

    setTimeout(() => {
      bannerImage.src = item.src;
      bannerCaption.textContent = item.caption;
      bannerLink.href = item.href;
      bannerLink.textContent = item.btnLabel;

      // フェードイン
      requestAnimationFrame(() => {
        bannerImage.classList.remove("is-fading");
        bannerCaption.style.opacity = 1;
        bannerLink.style.opacity = 1;
      });

      updateDots(i);
    }, delay);
  }

  function nextBanner() {
    index = (index + 1) % banners.length;
    showBanner(index);
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextBanner, INTERVAL_MS);
  }

  function resetTimer() {
    startTimer();
  }

  // 最初の表示
  showBanner(index, true);
  updateDots(index);

  // 自動送り開始
  startTimer();
})();
