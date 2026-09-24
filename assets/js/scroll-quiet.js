/*
  얇은 스크롤바를 스크롤하는 동안에만 보이게 한다. (custom.css .scroll-quiet)
  .scroll-quiet 요소가 스크롤되면 is-scrolling 을 붙이고, 멈춘 뒤 0.8초가 지나면 뗀다.
  대상: 카테고리 사이드바(.sidebar-inner), 글 목차 목록(.post-toc-list)
*/
(function () {
  var HIDE_DELAY = 800;

  document.querySelectorAll('.scroll-quiet').forEach(function (element) {
    var timer = null;
    element.addEventListener('scroll', function () {
      element.classList.add('is-scrolling');
      clearTimeout(timer);
      timer = setTimeout(function () { element.classList.remove('is-scrolling'); }, HIDE_DELAY);
    }, { passive: true });
  });
})();
