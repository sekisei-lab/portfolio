// 戻るボタンで戻ったとき、オープニングは最初から再生し直す
// （同じページのタブを押した場合は、ブラウザの再読み込みで再生される）
window.addEventListener("pageshow", (e) => {
  if (e.persisted && document.body.classList.contains("opening")) location.reload();
});
