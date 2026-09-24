/*
  글 자동 목차. (_layouts/post.html 의 nav.post-toc)
  - 본문(.post-content)의 h2/h3 만 읽는다. id 는 kramdown 이 만든 값을 그대로 쓰고 새로 만들지 않는다.
    (id 가 없는 heading 은 건너뛴다 → 기존 heading 주소가 바뀌지 않는다)
  - h2/h3 가 3개 미만이면 목차를 숨긴 채로 둔다.
  - h2 에 이미 "1. " 같은 번호가 붙은 글은 번호가 겹치지 않게 자동 번호를 붙이지 않는다.
  - 클릭: 부드럽게 이동하고 주소에 #id 를 남긴다. prefers-reduced-motion 이면 바로 이동한다.
  - 현재 읽는 항목: IntersectionObserver 로 화면 위쪽 30% 구간에 들어온 heading 을 강조한다.
  - 접기/펼치기: 데스크톱은 펼친 상태, 좁은 화면(767px 이하)은 접힌 상태로 시작한다. 상태는 저장하지 않는다.
*/
(function () {
  var toc = document.querySelector('[data-post-toc]');
  var content = document.querySelector('.post-content');
  if (!toc || !content) return;

  var MIN_HEADINGS = 3;
  var headings = Array.prototype.filter.call(content.querySelectorAll('h2, h3'), function (heading) {
    return heading.id;
  });
  if (headings.length < MIN_HEADINGS) return;

  var list = toc.querySelector('[data-post-toc-list]');
  var toggle = toc.querySelector('[data-post-toc-toggle]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var narrow = window.matchMedia('(max-width: 767px)');

  var numbered = !headings.some(function (heading) {
    return heading.tagName === 'H2' && /^\s*\d+[.)]\s/.test(heading.textContent);
  });
  toc.classList.toggle('is-numbered', numbered);

  /* ---------- 목록 만들기 ---------- */

  var links = [];
  var sublist = null;

  headings.forEach(function (heading) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + encodeURIComponent(heading.id);
    a.textContent = heading.textContent.trim();
    li.appendChild(a);
    links.push(a);

    // h3 는 바로 앞 h2 항목 아래에 넣는다. (앞에 h2 가 없으면 맨 위 목록에 둔다)
    if (heading.tagName === 'H3' && list.lastElementChild && list.lastElementChild.classList.contains('is-h2')) {
      if (!sublist) {
        sublist = document.createElement('ul');
        sublist.className = 'post-toc-sub';
        list.lastElementChild.appendChild(sublist);
      }
      sublist.appendChild(li);
    } else {
      li.className = heading.tagName === 'H2' ? 'is-h2' : 'is-h3';
      list.appendChild(li);
      sublist = null;
    }
  });

  toc.hidden = false;

  /* ---------- 접기 / 펼치기 ---------- */

  function setOpen(open) {
    list.hidden = !open;
    toc.classList.toggle('is-collapsed', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '목차 접기' : '목차 펼치기');
  }

  setOpen(!narrow.matches);
  toggle.addEventListener('click', function () {
    setOpen(list.hidden);
  });

  /* ---------- 클릭 이동 ---------- */

  list.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;
    var heading = headings[links.indexOf(link)];
    if (!heading) return;
    event.preventDefault();
    heading.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
    // 키보드 사용자가 이동한 위치에서 이어 읽을 수 있게 heading 으로 초점을 옮긴다.
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
    if (history.pushState) history.pushState(null, '', '#' + encodeURIComponent(heading.id));
    else location.hash = heading.id;
  });

  /* ---------- 현재 읽는 항목 ---------- */

  if (!('IntersectionObserver' in window)) return;

  var active = -1;

  function setActive(index) {
    if (index === active) return;
    if (links[active]) {
      links[active].parentNode.classList.remove('is-active');
      links[active].removeAttribute('aria-current');
    }
    active = index;
    var link = links[active];
    if (!link) return;
    link.parentNode.classList.add('is-active');
    link.setAttribute('aria-current', 'location');
  }

  // 오른쪽 고정 목차에서 현재 항목이 목록 밖에 있으면 목록 안쪽만 스크롤해 보이게 한다.
  // 부드러운 이동 도중에 다른 요소를 스크롤하면 이동이 끊기므로, 페이지 스크롤이 끝난 뒤에만 부른다.
  function reveal() {
    var link = links[active];
    if (!link || list.hidden || list.scrollHeight <= list.clientHeight) return;
    var top = link.offsetTop - list.offsetTop;
    if (top < list.scrollTop || top + link.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = top - list.clientHeight / 3;
    }
  }

  // 현재 항목 = 화면 위쪽 30% 기준선보다 위로 올라간 마지막 heading. (첫 heading 전이면 없음)
  function sync() {
    var line = window.innerHeight * 0.3;
    var index = -1;
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top > line) break;
      index = i;
    }
    setActive(index);
  }

  // heading 이 기준선을 지날 때만 다시 계산한다. (scroll 이벤트를 매번 처리하지 않는다)
  // 스크롤바를 끌어 크게 건너뛰면 지나친 heading 을 놓칠 수 있어, 스크롤이 끝났을 때 한 번 더 맞춘다.
  var observer = new IntersectionObserver(sync, { rootMargin: '0px 0px -70% 0px' });
  headings.forEach(function (heading) { observer.observe(heading); });
  window.addEventListener('scrollend', function () {
    sync();
    reveal();
  });
})();
