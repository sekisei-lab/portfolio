const isOpening = document.body.classList.contains("opening");
const normalize = (p) => p.replace(/index\.html$/, "");

// ページ遷移時のフェードアウト
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  e.preventDefault();
  const samePage = normalize(url.pathname) === normalize(location.pathname);
  // 同じページのタブは、オープニングのときだけ再生し直す
  if (samePage && !isOpening) return;
  document.body.classList.add("leaving");
  setTimeout(() => {
    if (samePage) location.reload();
    else location.href = url.href;
  }, 600);
});

// 戻るボタンで戻ったとき：オープニングは最初から再生し、他はフェードアウト状態を解除
window.addEventListener("pageshow", (e) => {
  if (!e.persisted) return;
  if (isOpening) location.reload();
  else document.body.classList.remove("leaving");
});
