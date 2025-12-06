// ============================
// normal calendar mapping
// ============================
const NORMAL_CALENDAR_IMAGES = {
  1:"assets/normal-calendar/01.png",
  2:"assets/normal-calendar/02.png",
  3:"assets/normal-calendar/03.png",
  4:"assets/normal-calendar/04.png",
  // 必要分だけ追加してOK（数は自動で反映される）
};

// 画像数を自動で取得
const NORMAL_CALENDAR_COUNT = Object.keys(NORMAL_CALENDAR_IMAGES).length;

let normalCalendarMonth = 1;

function updateNormalCalendar(month, animate = false) {
  const img = document.getElementById("normal-calendar-image");
  if (!img) return;

  normalCalendarMonth = month;

  if (animate) {
    img.style.opacity = "0";
    img.style.transform = "scale(.96)";
    setTimeout(() => {
      img.src = NORMAL_CALENDAR_IMAGES[month];
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    }, 140);
  } else {
    img.src = NORMAL_CALENDAR_IMAGES[month];
  }
}


// ============================
// button events
// ============================
function setupNormalCalendarNav() {
  const prev = document.getElementById("normal-calendar-prev");
  const next = document.getElementById("normal-calendar-next");

  if (!prev || !next) return;

  prev.addEventListener("click", () => {
    normalCalendarMonth =
      normalCalendarMonth === 1 ? NORMAL_CALENDAR_COUNT : normalCalendarMonth - 1;
    updateNormalCalendar(normalCalendarMonth, true);
  });

  next.addEventListener("click", () => {
    normalCalendarMonth =
      normalCalendarMonth === NORMAL_CALENDAR_COUNT ? 1 : normalCalendarMonth + 1;
    updateNormalCalendar(normalCalendarMonth, true);
  });
}


// ============================
// init
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("normal-calendar-image");
  if (!img) return;

  const datasetMonth = Number(img.dataset.month);
  normalCalendarMonth = datasetMonth || 1;

  updateNormalCalendar(normalCalendarMonth, false);
  setupNormalCalendarNav();
});
