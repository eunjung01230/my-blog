/*
  글 목록 정렬. (_includes/post-sort.html 의 드롭다운 → _includes/post-list.html 의 #post-list)
  - 기준 값은 카드의 data-* 속성에서 읽는다. (_includes/post-card.html)
      data-date          : 작성일 (Unix 초)
      data-series-order  : front matter seriesOrder (없으면 빈 값)
      data-order         : front matter order (없으면 빈 값)
  - 새 기준을 추가하려면: 아래 SORTS 에 비교 함수를 하나 넣고, post-sort.html 에 같은 value 의 <option> 을 추가한다.
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
      seriesOrder: toNumber(card.dataset.seriesOrder),
      order: toNumber(card.dataset.order)
    };
  }

  function latest(a, b) { return b.date - a.date; }

  // 숫자 값 기준. 값이 없는 글은 뒤로 보내고, 값이 같거나 둘 다 없으면 최신순.
  function byNumber(key, direction) {
    var sign = direction === 'desc' ? -1 : 1;
    return function (a, b) {
      var x = a[key];
      var y = b[key];
      if (x === null && y === null) return latest(a, b);
      if (x === null) return 1;
      if (y === null) return -1;
      return sign * (x - y) || latest(a, b);
    };
  }

  var SORTS = {
    latest: latest,                               // 최신순
    oldest: function (a, b) { return a.date - b.date; }, // 오래된순
    series: byNumber('seriesOrder'),              // 학습순
    custom: byNumber('order')                     // 직접 지정순
  };

  var entries = Array.prototype.map.call(list.querySelectorAll(':scope > .post-card'), readEntry);

  function apply(key) {
    entries.slice().sort(SORTS[key] || SORTS.latest).forEach(function (entry) {
      list.appendChild(entry.card);
    });
  }

  select.addEventListener('change', function () { apply(select.value); });

  // 뒤로 가기로 돌아와 브라우저가 선택값을 되살린 경우에도 목록을 맞춘다.
  if (select.value !== 'latest') apply(select.value);
})();
