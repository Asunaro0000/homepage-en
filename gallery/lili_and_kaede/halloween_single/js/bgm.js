// js/bgm.js

(function () {
  const audio = document.getElementById("bgmAudio");
  const btn   = document.querySelector(".pano-bgm-btn"); // index.html の BGMボタン
  if (!audio) return;

  let started = false;     // 一度でも「画像クリック」で再生を試みたか
  let isOn    = false;     // 今BGMが鳴るべき状態か
  let currentRoom = 1;     // 1 / 2 / 3

  function applySrc() {
    audio.src = `./bgm/bgm${currentRoom}.mp3`;
  }

  // ★ 画像クリックからしか呼ばせない「スタート専用」
  function playOnFirstInteraction() {
    if (!audio.src) {
      applySrc();
    }

    if (!started) {
      started = true;
    }

    isOn = true;
    audio.play().catch(() => {
      // ブロックされたら無視（ユーザー操作が足りない場合など）
    });

    updateButtonUI();
  }

function setRoom(roomId) {
  currentRoom = roomId;

  // ★停止させず、現在の ON/OFF 状態を維持したまま曲だけ更新
  const wasPlaying = isOn;

  applySrc(); // 曲だけ切り替える

  if (wasPlaying) {
    audio.play().catch(() => {});
  }

  updateButtonUI();
}


  // BGMボタンの見た目更新
  function updateButtonUI() {
    if (!btn) return;
    if (isOn && started) {
      btn.classList.add("is-on");
      btn.textContent = "BGM: ON";
    } else {
      btn.classList.remove("is-on");
      btn.textContent = "BGM: OFF";
    }
  }

  // ★ BGMボタンは「初回スタートはしない」＝ただのON/OFFスイッチ
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // パノラマのクリックには伝播させない

      // まだ一度も画像クリックでスタートしていないなら何もしない
      if (!started) {
        return;
      }

      if (isOn) {
        isOn = false;
        audio.pause();
      } else {
        isOn = true;
        audio.play().catch(() => {});
      }

      updateButtonUI();
    });

    // 初期表示
    updateButtonUI();
  }

  // 外から呼ぶAPI（panorama.js から使う）
  window.bgmControl = {
    playOnFirstInteraction,
    setRoom
  };
})();
