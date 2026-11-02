// ページ遷移時のフェードアウト
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.href === location.href) return;
  e.preventDefault();
  document.body.classList.add("leaving");
  setTimeout(() => { location.href = url.href; }, 600);
});
// 戻るボタンで戻ったときにフェードアウト状態を解除
window.addEventListener("pageshow", (e) => {
  if (e.persisted) document.body.classList.remove("leaving");
});

// オープニング（index のみ）
if (document.body.classList.contains("opening")) {
  const start = () => document.body.classList.add("open");
  Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((r) => setTimeout(r, 1500))
  ]).then(() => setTimeout(start, 900));
}
