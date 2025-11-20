// panorama.js
// ------------------------------------------------------
// リス子パノラマ：セット切り替え＋無限送り＋キャプション＋進行ランプ
// ------------------------------------------------------

// DOM参照
const pano = document.getElementById('panorama');
const thumbsWrap = document.getElementById('panoThumbs');
const captionTitleEl = document.getElementById('panoTitle');
const captionTextEl = document.getElementById('panoText');
const progressDots = document.querySelectorAll('.pano-progress-dot');

const IMAGE_BASE = './assets/images/';

// 表示したいセット一覧
// images: パノラマ用に横に繋げる画像のリスト（1〜2枚想定）
const panoSets = [
  {
    id: 'set1',
    label: '古樹の回廊',
    images: ['1-1.webp','1-2.webp','1-3.webp','1-4.webp','1-5.webp','1-6.webp'],
    title: '古樹の回廊（Ancient Trunk Corridor）',
    caption: '幹がねじれ重なり、森そのものがひとつの回廊を形づくっている。紅葉の光が柱のように立ち、歩く者を静かに奥へと誘っていた。'
  },
  {
    id: 'set2',
    label: '祠の並ぶ径',
    images: ['2-1.webp','2-2.webp','2-3.webp','2-4.webp','2-5.webp','2-6.webp'],
    title: '祠の並ぶ径（Shrineborne Path）',
    caption: '大小の祠が点在し、まるで古い祈りが途切れず続いてきた証のようだった。道の両側に漂う澄んだ空気は、ここが森の“記憶域”であることを示している。'
  },
  {
    id: 'set3',
    label: '杜の社群',
    images: ['3-1.webp','3-2.webp','3-3.webp','3-4.webp','3-5.webp','3-6.webp'],
    title: '杜の社群（Forest Sanctuaries）',
    caption: '陽光を受けた社が連なり、森の中心部に静かな軌跡を描いている。長い時間を経た木々が、まるで拝殿の柱のように立ち並んでいた。'
  },
  {
    id: 'set4',
    label: '森痕の庭',
    images: ['4-1.webp','4-2.webp','4-3.webp','4-4.webp','4-5.webp','4-6.webp'],
    title: '森痕の庭（Garden of Remnants）',
    caption: '杭や倒れた幹が、森の時間が積み重なってきた証として静かに横たわっている。空いた空間に満ちる光が、過ぎ去った層とこれから芽吹く層をゆるやかにつないでいた。'
  },
  {
    id: 'set6',
    label: '静水の森',
    images: ['6-1.webp','6-2.webp','6-3.webp','6-4.webp','6-5.webp','6-6.webp'],
    title: '静水の森（Stillwater Grove）',
    caption: '水面が森の色を抱き、まるで別の層が鏡越しに存在するようだった。音が吸い込まれるほど静かで、少し踏み出すだけで境界を越える感覚があった。'
  },
  {
    id: 'set5',
    label: '陽だまりの遊径',
    images: ['5-1.webp','5-2.webp','5-3.webp','5-4.webp','5-5.webp','5-6.webp'],
    title: '陽だまりの遊径（Sunlit Meadow Trail）',
    caption: '柔らかな光が差し込み、小道が幾筋も森へ溶け込んでいく。動物たちの影が点々と残り、この場所が日々の営みで満たされていることが分かる。'
  },
  {
    id: 'set10',
    label: '巡る小径',
    images: ['10-1.webp','10-2.webp','10-3.webp','10-4.webp','10-5.webp','10-6.webp'],
    title: '巡る小径（Wandering Roots Trail）',
    caption: '切り株、小道、浅い流れが点在し、森の生活の輪郭だけが淡く残されている。踏み跡が少ないほど、森の奥ゆきが深く、息づかいの密度が増していった。'
  },

  {
    id: 'set7',
    label: '森律の径',
    images: ['7-1.webp','7-2.webp','7-3.webp','7-4.webp','7-5.webp','7-6.webp'],
    title: '森律の径（Harmonic Woodland Trail）',
    caption: '倒木や石が自然に円を描き、森がそっと呼吸を整える場所になっていた。小さな存在たちが腰掛けた気配だけが残り、歩く者の心をゆるやかに鎮めていく。'
  },

  {
    id: 'set8',
    label: '祭祀の座',
    images: ['8-1.webp','8-2.webp','8-3.webp','8-4.webp','8-5.webp','8-6.webp'],
    title: '祭祀の座（Ritual Thrones）',
    caption: '祈りの場が点々と続き、森が長い年月をかけて形づくった祭具の配置が見えてくる。陽が差すたび、古い痕跡が淡く浮かび上がり、儀式の残響が風に乗った。'
  },
  {
    id: 'set9',
    label: '間灯の森',
    images: ['9-1.webp','9-2.webp','9-3.webp','9-4.webp','9-5.webp','9-6.webp'],
    title: '間灯の森（Lanternwood Glade）',
    caption: '木々の間に灯りが宿り、朝と夕の境目だけがほのかな光を抱いていた。足元の影が長く伸び、森が静かに次の“層”を準備しているようだった。'
  },

  {
    id: 'set11',
    label: '緑環の路',
    images: ['11-1.webp','11-2.webp','11-3.webp','11-4.webp','11-5.webp','11-6.webp'],
    title: '緑環の路（Viridian Rings Passage）',
    caption: '樹々が円環を描くように並び、自然とは思えないほど滑らかな構造をしていた。森の境界が薄く重なり、ここを抜ければ別の層に触れられそうな気配がある。'
  },
  {
    id: 'set12',
    label: '精霊の残滓',
    images: ['12-1.webp','12-2.webp','12-3.webp','12-4.webp','12-5.webp','12-6.webp'],
    title: '精霊の残滓（Echoes of Spirits）',
    caption: '森の中に小さな影が揺れ、精霊が通り過ぎた痕跡だけが淡く残っていた。光と風の集まり方が不自然で、世界の“裏側”がすぐ隣にあるように感じられる。'
  }
];





// ============================
// 無限ループ用の状態
// ============================
let loopWidth = 0;        // 1周ぶんの幅（オリジナルのみ）
let autoScroll = false;
let rafId = null;
const SPEED = 2.5;

let currentSetIndex = 0;

// スワイプ用
let pDown = false;
let pStartX = 0;
let pScroll = 0;

// ============================
// 進行ランプ
// ============================
function resetProgress() {
  if (!progressDots.length) return;
  progressDots.forEach(dot => dot.classList.remove('is-on'));
}

function updateProgress() {
  if (!pano || !loopWidth || !progressDots.length) return;

  // ほぼ先頭なら全部消灯
  if (pano.scrollLeft <= 1) {
    resetProgress();
    return;
  }

  // 0.0〜1.0 の範囲で1周ぶんの進行度
  let ratio = pano.scrollLeft / loopWidth;
  if (ratio < 0) ratio = 0;
  if (ratio > 0.999) ratio = 0.999;

  // 0〜(dots数-1) のインデックス
  const index = Math.floor(ratio * progressDots.length);

  progressDots.forEach((dot, i) => {
    dot.classList.toggle('is-on', i <= index);
  });
}

// ============================
// 画像読み込み待ちユーティリティ
// ============================
function waitImagesLoaded(container, cb) {
  const imgs = Array.from(container.querySelectorAll('img'));
  if (imgs.length === 0) {
    cb();
    return;
  }
  let remaining = imgs.length;
  const done = () => {
    remaining -= 1;
    if (remaining <= 0) cb();
  };
  imgs.forEach(img => {
    if (img.complete) {
      done();
    } else {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    }
  });
}

// ============================
// セット読み込み＋無限ループ化
// ============================
function stopAutoScroll() {
  autoScroll = false;
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function startAutoScroll() {
  autoScroll = true;
  if (rafId === null) {
    rafId = requestAnimationFrame(step);
  }
}

function loadSet(index) {
  const set = panoSets[index];
  if (!set || !pano) return;

  currentSetIndex = index;

  // 自動送りリセット
  stopAutoScroll();
  pano.scrollLeft = 0;
  loopWidth = 0;
  resetProgress();

  // キャプション更新
  if (captionTitleEl) captionTitleEl.textContent = set.title || '';
  if (captionTextEl) captionTextEl.textContent = set.caption || '';

  // 中身入れ替え
  pano.innerHTML = '';

  set.images.forEach(file => {
    const img = document.createElement('img');
    img.src = IMAGE_BASE + file;
    img.alt = set.title || 'Risuko panorama';
    pano.appendChild(img);
  });

  // 画像ロード後に 1周ぶんの幅を取得し、クローンで2周構成にする
  waitImagesLoaded(pano, () => {
    // オリジナルだけの幅を測る
    const originalsWidth = pano.scrollWidth;

    const originals = Array.from(pano.children);
    originals.forEach(node => {
      const clone = node.cloneNode(true);
      pano.appendChild(clone);
    });

    // ループ用の「1周ぶんの幅」はオリジナルだけ
    loopWidth = originalsWidth;

    // 初期状態のランプ更新（先頭なので全部消灯のまま）
    resetProgress();
  });

  updateActiveThumb();
}

// ============================
// サムネイル
// ============================
function createThumbnails() {
  if (!thumbsWrap) return;
  thumbsWrap.innerHTML = '';

  panoSets.forEach((set, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pano-thumb';
    btn.dataset.index = String(idx);

    const thumbImg = document.createElement('img');
    const thumbFile = set.images[0];
    thumbImg.src = IMAGE_BASE + thumbFile;
    thumbImg.alt = set.label || set.title || `set ${idx + 1}`;

    const label = document.createElement('span');
    label.textContent = set.label || set.title || `セット${idx + 1}`;

    btn.appendChild(thumbImg);
    btn.appendChild(label);

    btn.addEventListener('click', () => {
      loadSet(idx);
      // セット切り替え後に自動送りを開始
      startAutoScroll();

      // BGM 初回再生トリガー
      if (window.bgmControl && window.bgmControl.playOnFirstInteraction) {
        window.bgmControl.playOnFirstInteraction();
      }
    });

    thumbsWrap.appendChild(btn);
  });

  updateActiveThumb();
}

function updateActiveThumb() {
  if (!thumbsWrap) return;
  const buttons = Array.from(thumbsWrap.querySelectorAll('.pano-thumb'));
  buttons.forEach((btn, i) => {
    if (i === currentSetIndex) {
      btn.classList.add('is-active');
    } else {
      btn.classList.remove('is-active');
    }
  });
}

// ============================
// 自動スクロール（無限送り）
// ============================
function step() {
  if (!autoScroll || !pano) return;

  pano.scrollLeft += SPEED;

  if (loopWidth > 0 && pano.scrollLeft >= loopWidth) {
    // 1周ぶん超えたら巻き戻し
    pano.scrollLeft -= loopWidth;
    // 先頭に戻った瞬間はランプ全消灯
    resetProgress();
  } else {
    // 途中は進行度更新
    updateProgress();
  }

  rafId = requestAnimationFrame(step);
}

// ============================
// イベント登録
// ============================
if (pano) {
  // パノラマクリックで再生/停止＋BGM初回トリガー
  pano.addEventListener('click', () => {
    if (window.bgmControl && window.bgmControl.playOnFirstInteraction) {
      window.bgmControl.playOnFirstInteraction();
    }

    if (autoScroll) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  });

  // スクロール（手動スワイプなど）でもランプ更新
  pano.addEventListener('scroll', () => {
    if (!loopWidth) return;
    updateProgress();
  });

  // スワイプ（タッチドラッグ）
  pano.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') return;
    pDown = true;
    pStartX = e.clientX;
    pScroll = pano.scrollLeft;
    pano.setPointerCapture(e.pointerId);
  });

  pano.addEventListener('pointermove', e => {
    if (!pDown) return;
    pano.scrollLeft = pScroll - (e.clientX - pStartX);
  });

  pano.addEventListener('pointerup', e => {
    if (!pDown) return;
    pDown = false;
    pano.releasePointerCapture(e.pointerId);
  });

  pano.addEventListener('pointercancel', e => {
    if (!pDown) return;
    pDown = false;
    pano.releasePointerCapture(e.pointerId);
  });
}

// ============================
// 初期化
// ============================
window.addEventListener('load', () => {
  createThumbnails();
  loadSet(0);
});
