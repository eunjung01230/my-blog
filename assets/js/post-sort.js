/*
  글 목록 정렬. (_includes/post-sort.html 의 드롭다운 → _includes/post-list.html 의 #post-list)
  - 기준 값은 카드의 data-* 속성에서 읽는다. (_includes/post-card.html)
      data-date           : 작성일 (Unix 초)
      data-learning-rank  : 학습순에서 카테고리의 순번 — _data/learning_order.yml 기준 (없으면 빈 값)
      data-learning-order : front matter learningOrder — 같은 카테고리 안의 공부 순서 (없으면 빈 값)
      data-series-order   : front matter seriesOrder — 한 시리즈 안의 읽는 순서 (없으면 빈 값)
      data-order          : front matter order (없으면 빈 값)
    learningOrder 와 seriesOrder 는 섞지 않는다. 각각 다른 기준(learning / series)에서만 쓴다.
  - 비교 결과가 같으면 0 을 돌려주고, 정렬은 늘 처음 받은 목록(최신순)에서 새로 하므로 기존 순서가 유지된다.
  - 새 기준을 추가하려면: 아래 SORTS 에 비교 함수를 하나 넣고,
    post-sort.html 의 case 에 표시 이름을, 쓰려는 페이지의 options 에 같은 key 를 추가한다.
    예) 인기순: 카드에 data-views 를 넣고 → readEntry 에서 views 를 읽고 → SORTS.popular = byNumber('views', 'desc')
*/
(function () {
  var select = document.querySelector('[data-post-sort]');
  if (!select) return;
  var list = document.getElementById(select.getAttribute('aria-controls'));
  if (!list) return;

  function toNumber(value) {
    if (value === undefined || value === '') return null;
    var number = parseFloat(value);
    return isNaN(number) ? null : number;
  }

  function readEntry(card) {
    return {
      card: card,
      date: toNumber(card.dataset.date) || 0,
      learningRank: toNumber(card.dataset.learningRank),
      learningOrder: toNumber(card.dataset.learningOrder),
      seriesOrder: toNumber(card.dataset.seriesOrder),
      order: toNumber(card.dataset.order)
    };
  }

  function latest(a, b) { return b.date - a.date; }
  function oldest(a, b) { return a.date - b.date; }

  // 숫자 값 기준. 값이 없는 글은 뒤로 보내고, 값이 같거나 둘 다 없으면 fallback 순서 (기본: 최신순).
  function byNumber(key, direction, fallback) {
    var sign = direction === 'desc' ? -1 : 1;
    var then = fallback || latest;
    return function (a, b) {
      var x = a[key];
      var y = b[key];
      if (x === null && y === null) return then(a, b);
      if (x === null) return 1;
      if (y === null) return -1;
      return sign * (x - y) || then(a, b);
    };
  }

  // 학습순: 카테고리 순서(learningRank) → 같은 카테고리 안에서 learningOrder → 번호 없는 글은 오래된 글부터.
  var byLearningRank = byNumber('learningRank', 'asc', function () { return 0; });
  var byLearningOrder = byNumber('learningOrder', 'asc', oldest);
  function learning(a, b) {
    return byLearningRank(a, b) || byLearningOrder(a, b);
  }

  // 정렬 기준은 여기 한 곳에서 관리한다. (추후 popular · custom 등도 여기에 추가)
  var SORTS = {
    latest: latest,                               // 최신순
    oldest: oldest,                               // 오래된순
    learning: learning,                           // 학습순 (카테고리 순서 → learningOrder)
    series: byNumber('seriesOrder'),              // 학습순 (시리즈 안 · seriesOrder)
    custom: byNumber('order')                     // 직접 지정순
  };

  var entries = Array.prototype.map.call(list.querySelectorAll(':scope > .post-card'), readEntry);

  function apply(key) {
    entries.slice().sort(SORTS[key] || SORTS.latest).forEach(function (entry) {
      list.appendChild(entry.card);
    });
  }

  select.addEventListener('change', function () { apply(select.value); });

  // 뒤로 가기로 돌아와 브라우저가 선택값을 되살린 경우에도 목록을 맞춘다. (첫 옵션 = 페이지가 넘긴 순서)
  if (select.selectedIndex > 0) apply(select.value);
})();
