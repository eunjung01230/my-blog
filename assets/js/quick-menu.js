/*
  홈 카테고리 바로가기(Quick Menu) ← → 버튼.
  - 카드가 한 화면에 다 들어가면 버튼을 숨긴다.
  - 버튼은 보이는 폭만큼(한 페이지씩) 넘긴다. 목록은 순환한다:
    맨 끝에서 → 를 누르면 처음으로, 맨 앞에서 ← 를 누르면 끝으로 간다.
  - 트랙패드/터치 스크롤도 그대로 쓸 수 있다.
*/
(function () {
  var menu = document.querySelector('[data-quick-menu]');
  if (!menu) return;

  var track = menu.querySelector('[data-quick-track]');
  var nav = menu.querySelector('[data-quick-nav]');
  var prev = menu.querySelector('[data-quick-prev]');
  var next = menu.querySelector('[data-quick-next]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function update() {
    var max = track.scrollWidth - track.clientWidth;
    // 숨겨진 상태(사이드바 펼침)에서는 폭이 0 이므로 버튼도 숨긴다.
    nav.hidden = track.clientWidth === 0 || max <= 1;
  }

  function page(direction) {
    var max = track.scrollWidth - track.clientWidth;
    var behavior = reduceMotion.matches ? 'auto' : 'smooth';
    // 양 끝에서는 반대쪽 끝으로 돌아간다.
    if (direction > 0 && track.scrollLeft >= max - 1) {
      track.scrollTo({ left: 0, behavior: behavior });
      return;
    }
    if (direction < 0 && track.scrollLeft <= 1) {
      track.scrollTo({ left: max, behavior: behavior });
      return;
    }
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (track.clientWidth + gap), behavior: behavior });
  }

  prev.addEventListener('click', function () { page(-1); });
  next.addEventListener('click', function () { page(1); });

  // 사이드바 접기/펼치기, 화면 크기 변경으로 트랙 폭이 바뀌면 다시 계산한다.
  if (window.ResizeObserver) {
    new ResizeObserver(update).observe(track);
  } else {
    window.addEventListener('resize', update);
  }

  update();
})();
