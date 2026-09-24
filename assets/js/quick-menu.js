/*
  홈 카테고리 바로가기(Quick Menu) ← → 버튼.
  - 목록은 끊김 없이 순환한다. → 는 항상 오른쪽으로, ← 는 항상 왼쪽으로 넘어간다.
    (마지막 카드 다음에 첫 카드가 이어서 나온다)
  - 방법: 카드 목록 앞뒤에 복제본을 한 벌씩 붙이고, 스크롤이 끝났을 때 복제본 구간에 와 있으면
    같은 모양의 원래 카드 위치로 순간 이동한다. 복제본은 스크린리더·Tab 이동에서 뺀다.
  - 버튼은 보이는 폭만큼(한 페이지씩) 넘긴다. 트랙패드/터치 스크롤도 그대로 쓸 수 있다.
  - 사이드바가 펼쳐져 트랙이 숨겨져 있으면(폭 0) 버튼도 숨긴다.
*/
(function () {
  var menu = document.querySelector('[data-quick-menu]');
  if (!menu) return;

  var track = menu.querySelector('[data-quick-track]');
  var nav = menu.querySelector('[data-quick-nav]');
  var prev = menu.querySelector('[data-quick-prev]');
  var next = menu.querySelector('[data-quick-next]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var cards = Array.prototype.slice.call(track.children);
  if (cards.length < 2) return;

  function makeClone(card) {
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('tabindex', '-1');
    return clone;
  }

  var before = document.createDocumentFragment();
  var after = document.createDocumentFragment();
  cards.forEach(function (card) {
    before.appendChild(makeClone(card));
    after.appendChild(makeClone(card));
  });
  track.insertBefore(before, track.firstChild);
  track.appendChild(after);
  var firstAfterClone = cards[cards.length - 1].nextElementSibling;

  // 원래 카드 첫 장의 스크롤 위치와, 카드 한 벌(원래 카드 전체 + 간격)의 폭
  function realStart() {
    return cards[0].getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
  }

  function setWidth() {
    return firstAfterClone.getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
  }

  // 복제본 구간이면 같은 모양의 원래 카드 위치로 옮긴다. (애니메이션 없이)
  function normalize() {
    var start = realStart();
    var span = setWidth();
    if (track.scrollLeft < start - 1) track.scrollLeft += span;
    else if (track.scrollLeft >= start + span - 1) track.scrollLeft -= span;
  }

  function page(direction) {
    normalize();
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (track.clientWidth + gap),
      behavior: reduceMotion.matches ? 'auto' : 'smooth'
    });
  }

  function reset() {
    nav.hidden = track.clientWidth === 0;
    if (track.clientWidth) track.scrollLeft = realStart();
  }

  prev.addEventListener('click', function () { page(-1); });
  next.addEventListener('click', function () { page(1); });

  // 스크롤이 끝나면 위치를 원래 카드 구간으로 맞춘다. (scrollend 가 없는 브라우저는 잠시 멈춘 뒤)
  if ('onscrollend' in window) {
    track.addEventListener('scrollend', normalize);
  } else {
    var timer = null;
    track.addEventListener('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(normalize, 150);
    }, { passive: true });
  }

  // 사이드바 접기/펼치기, 화면 크기 변경으로 트랙 폭이 바뀌면 첫 카드부터 다시 보여 준다.
  if (window.ResizeObserver) {
    new ResizeObserver(reset).observe(track);
  } else {
    window.addEventListener('resize', reset);
  }

  reset();
})();
