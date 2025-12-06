// 画像フォルダ（相対パス）
const CAL_PATH = "./assets/goods_calendar/";

// カレンダー用のファイル名（拡張子なし）
const calendarNames = [
  "January", "February", "March", "April","Cover",
  // 必要なら "May"〜"December" をここに追加
];

// 要素取得（Cモード専用ID）
const calWrap  = document.getElementById("risuko-calendar");
const calImg   = document.getElementById("risuko-calendar-img");
const calText  = document.getElementById("risuko-calendar-text");
const calBtn   = document.getElementById("risuko-calendar-btn");

// 年内通し日で日替わりインデックス
function dayOfYearCal(d) {
  const s = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - s) / 86400000);
}
let currentCalIndex = dayOfYearCal(new Date()) % calendarNames.length;

// 表示適用
function applyCalendarByIndex(i) {
  const name = calendarNames[i];

  calImg.classList.add("rs-swap-out");
  setTimeout(() => {
    calImg.src = CAL_PATH + encodeURIComponent(name) + ".webp";
    calImg.alt = name;
    calText.textContent = name;
    calImg.onload = () => calImg.classList.remove("rs-swap-out");
  }, 120);

  if (window.preloadAround) {
    window.preloadAround(calendarNames, i, CAL_PATH, ".webp");
  }
}

// 初期表示
if (calWrap && calImg && calText && calBtn) {
  applyCalendarByIndex(currentCalIndex);

  // インクリメントで順番に切り替え（最後まで行ったら先頭に戻る）
  function changeCalendarNext() {
    currentCalIndex = (currentCalIndex + 1) % calendarNames.length;
    applyCalendarByIndex(currentCalIndex);

    // GAを分けたいならここでイベント送信
    // if (window.gtag) {
    //   window.gtag("event", "calendar_click", { value: currentCalIndex });
    // }
  }

  // 枠クリック → 絵だけ1つ先に進める（ボタンは除外）
  calWrap.addEventListener("click", (e) => {
    if (e.target.id === "risuko-calendar-btn") return;
    changeCalendarNext();
  });

  // ボタンクリック → BOOTHの商品ページへ移動
  calBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // 枠のクリックイベントを発火させない
    window.location.href = "https://asunaro0000.booth.pm/items/7697649";
  });
}
