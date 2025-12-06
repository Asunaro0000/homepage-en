(function () {
  const modes = [
    document.getElementById("risuko-calendar"),   // A
    document.getElementById("risuko-stamp"),      // B
    document.getElementById("risuko-stamp-2"),    // C

  ].filter(Boolean);

  if (!modes.length) return;

  let current = 0;

  function showMode(index) {
    modes.forEach((el, i) => {
      const active = i === index;
      el.classList.toggle("is-hidden", !active);
      el.setAttribute("aria-hidden", (!active).toString());
    });
    current = index;
  }

  const prevBtn = document.getElementById("prevMode");
  const nextBtn = document.getElementById("nextMode");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const next = (current - 1 + modes.length) % modes.length;
      showMode(next);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const next = (current + 1) % modes.length;
      showMode(next);
    });
  }

  // 初期はAモード表示
  showMode(0);
})();
