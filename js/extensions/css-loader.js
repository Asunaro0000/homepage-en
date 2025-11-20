// /extensions/css-loader.js
// 軽量CSSローダ：重複読込防止 & 読込完了待ち
export function loadCssOnce(href, { id } = {}) {
  return new Promise((resolve, reject) => {
    // 既に読み込み済みならスキップ
    const exists = [...document.styleSheets].some(ss => {
      try { return ss.href && ss.href.includes(href); } catch { return false; }
    }) || (id && document.getElementById(id));

    if (exists) return resolve('already');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (id) link.id = id;
    link.onload = () => resolve('loaded');
    link.onerror = (e) => reject(new Error(`CSS load failed: ${href}`));
    document.head.appendChild(link);
  });
}

export async function loadCssBatch(urls) {
  for (const href of urls) {
    const id = `css-${href.replace(/[^\w-]/g, '_')}`;
    try { await loadCssOnce(href, { id }); } 
    catch (e) { console.warn(e.message); }
  }
}
