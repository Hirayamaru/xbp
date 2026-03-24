// メニューの開閉
$(function(){
  $("nav div.panel").hide();
  $(".menu").click(function(){
    $(this).toggleClass("menuOpen").next().slideToggle();
  });
});

// スクロールでフェードイン（ブログセクション）
function handleFadeIn() {
  const elements = document.querySelectorAll(".fadein");
  const windowHeight = window.innerHeight;
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      el.classList.add("visible");
    }
  });
}

document.addEventListener("scroll", handleFadeIn);
window.addEventListener("load", handleFadeIn);

// ヒーロー：スクロールで自然にフェードアウト＋パララックス
window.addEventListener("scroll", function() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const scrollY = window.scrollY;
  const heroH   = hero.offsetHeight;

  // テキストブロック：ゆっくり上へ流れながら消える
  const heroInner = hero.querySelector(".hero-inner");
  if (heroInner) {
    const progress = Math.min(scrollY / (heroH * 0.55), 1);
    heroInner.style.opacity   = 1 - progress;
    heroInner.style.transform = `translateY(${scrollY * 0.14}px)`;
  }

  // 右縦線装飾（::after は直接操作できないので疑似要素はCSSアニメに任せる）
});