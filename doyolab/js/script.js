$(function(){$("nav div.panel").hide();$(".menu").click(function(){$(this).toggleClass("menuOpen").next().slideToggle();});})
// ===== スクロールでフェードインアニメーション =====
document.addEventListener("scroll", function() {
    const elements = document.querySelectorAll(".fadein");
    const windowHeight = window.innerHeight;
  
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 100) {
        el.classList.add("visible");
      }
    });
  });
  