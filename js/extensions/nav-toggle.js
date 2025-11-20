// /js/extensions/nav-toggle.js
(() => {
  const header = document.querySelector('header.nav');
  const nav = header?.querySelector('nav');
  const brand = header?.querySelector('.brand');
  if (!header || !nav || !brand) return;

  const mq = window.matchMedia('(max-width: 900px)');
  let btn = null;

  const close = () => {
    header.classList.remove('menu-open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  };

  const onToggle = () => {
    const opened = header.classList.toggle('menu-open');
    if (btn) btn.setAttribute('aria-expanded', String(opened));
  };
  const onDocClick = (e) => {
    if (!header.classList.contains('menu-open')) return;
    if (header.contains(e.target)) return;
    close();
  };
  const onEsc = (e) => { if (e.key === 'Escape') close(); };

  function mount() {
    if (btn) return;               // 既に作成済み
    btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'メニューを開閉');
    btn.textContent = '☰';

    if (!nav.id) nav.id = 'site-nav';
    btn.setAttribute('aria-controls', nav.id);

    brand.insertAdjacentElement('afterend', btn);
    btn.addEventListener('click', onToggle);
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
  }

  function unmount() {
    close();
    if (!btn) return;
    btn.removeEventListener('click', onToggle);
    document.removeEventListener('click', onDocClick);
    document.removeEventListener('keydown', onEsc);
    btn.remove();
    btn = null;
  }

  function sync() { mq.matches ? mount() : unmount(); }

  // 初期 & 画面幅が変わった時に同期
  mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);
  sync();
})();
