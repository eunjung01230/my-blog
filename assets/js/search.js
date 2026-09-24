/*
  헤더 게시물 검색. (_includes/site-search.html)
  - 검색 데이터: /search.json — 빌드할 때 Jekyll 이 전체 글로 만든 정적 파일. 검색 창을 처음 열 때 한 번만 받는다.
  - 검색 대상: 제목 · 본문 · 카테고리(표시명·slug) · 태그. 대소문자는 구분하지 않는다.
  - 검색어를 띄어 쓰면 모든 단어가 들어 있는 글만 보여준다. 제목 > 태그·카테고리 > 본문 순으로 점수를 매겨 정렬한다.
  - Enter: 첫 결과로 이동 · ↓/↑: 결과 사이 이동 · Esc 나 바깥 누르기: 닫기
*/
(function () {
  var openButton = document.querySelector('[data-search-open]');
  var dialog = document.querySelector('[data-search-dialog]');
  if (!openButton || !dialog) return;

  // <dialog> 를 지원하지 않는 오래된 브라우저에서는 버튼을 숨긴다.
  if (typeof dialog.showModal !== 'function' || !window.fetch) {
    openButton.hidden = true;
    return;
  }

  var form = dialog.querySelector('[data-search-form]');
  var input = dialog.querySelector('[data-search-input]');
  var closeButton = dialog.querySelector('[data-search-close]');
  var status = dialog.querySelector('[data-search-status]');
  var results = dialog.querySelector('[data-search-results]');

  var MAX_RESULTS = 30;
  var SNIPPET_BEFORE = 40;
  var SNIPPET_LENGTH = 140;

  var entries = null;
  var loading = null;

  // macOS 에서 쓴 한글(자모 분리형 NFD)도 같은 글자로 찾도록 NFC 로 맞춘다.
  function nfc(text) {
    text = String(text == null ? '' : text);
    return text.normalize ? text.normalize('NFC') : text;
  }

  function normalize(text) {
    return nfc(text).toLowerCase();
  }

  function prepare(item) {
    var tags = (Array.isArray(item.tags) ? item.tags : []).map(nfc);
    var entry = {
      title: nfc(item.title),
      url: item.url,
      date: item.date || '',
      category: nfc(item.category),
      tags: tags,
      content: nfc(item.content)
    };
    entry.search = {
      title: entry.title.toLowerCase(),
      tags: tags.join(' ').toLowerCase(),
      category: normalize(entry.category + ' ' + nfc(item.categorySlug)),
      content: entry.content.toLowerCase()
    };
    return entry;
  }

  function load() {
    if (!loading) {
      loading = fetch(dialog.getAttribute('data-search-src'))
        .then(function (response) {
          if (!response.ok) throw new Error(response.status);
          return response.json();
        })
        .then(function (data) {
          entries = data.map(prepare);
        })
        .catch(function (error) {
          loading = null; // 다음에 열 때 다시 시도한다
          throw error;
        });
    }
    return loading;
  }

  function scoreOf(entry, terms) {
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i];
      var score = 0;
      if (entry.search.title.indexOf(term) !== -1) score += 10;
      if (entry.search.tags.indexOf(term) !== -1) score += 6;
      if (entry.search.category.indexOf(term) !== -1) score += 6;
      if (entry.search.content.indexOf(term) !== -1) score += 1;
      if (score === 0) return 0; // 한 단어라도 없으면 제외
      total += score;
    }
    return total;
  }

  function search(query) {
    var terms = normalize(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return { terms: terms, items: [] };

    var items = [];
    entries.forEach(function (entry, index) {
      var score = scoreOf(entry, terms);
      if (score > 0) items.push({ entry: entry, score: score, index: index });
    });
    // 점수가 같으면 search.json 순서(최신순)를 따른다.
    items.sort(function (a, b) { return b.score - a.score || a.index - b.index; });
    return { terms: terms, items: items };
  }

  // 본문에서 처음 찾은 검색어 주변만 잘라 보여준다.
  function snippetOf(entry, terms) {
    var text = entry.content;
    var first = -1;
    terms.forEach(function (term) {
      var found = entry.search.content.indexOf(term);
      if (found !== -1 && (first === -1 || found < first)) first = found;
    });
    var start = first > SNIPPET_BEFORE ? first - SNIPPET_BEFORE : 0;
    var end = Math.min(text.length, start + SNIPPET_LENGTH);
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }

  // 글자는 textContent 로만 넣고, 검색어 부분만 <mark> 로 감싼다.
  function appendHighlighted(element, text, terms) {
    var lower = normalize(text);
    var ranges = [];
    terms.forEach(function (term) {
      var from = 0;
      var found;
      while ((found = lower.indexOf(term, from)) !== -1) {
        ranges.push([found, found + term.length]);
        from = found + term.length;
      }
    });
    ranges.sort(function (a, b) { return a[0] - b[0]; });

    var cursor = 0;
    ranges.forEach(function (range) {
      if (range[1] <= cursor) return;
      var from = Math.max(range[0], cursor);
      if (from > cursor) element.appendChild(document.createTextNode(text.slice(cursor, from)));
      var mark = document.createElement('mark');
      mark.textContent = text.slice(from, range[1]);
      element.appendChild(mark);
      cursor = range[1];
    });
    if (cursor < text.length) element.appendChild(document.createTextNode(text.slice(cursor)));
  }

  function createElement(tag, className) {
    var element = document.createElement(tag);
    element.className = className;
    return element;
  }

  function renderItem(entry, terms) {
    var item = document.createElement('li');
    var link = createElement('a', 'search-result');
    link.href = entry.url;

    var meta = createElement('span', 'search-result-meta');
    meta.textContent = [entry.category, entry.date].filter(Boolean).join(' · ');
    if (entry.tags.length) {
      var tags = createElement('span', 'search-result-tags');
      appendHighlighted(tags, entry.tags.map(function (tag) { return '#' + tag; }).join(' '), terms);
      meta.appendChild(tags);
    }

    var title = createElement('span', 'search-result-title');
    appendHighlighted(title, entry.title, terms);

    link.appendChild(meta);
    link.appendChild(title);

    var snippet = snippetOf(entry, terms);
    if (snippet) {
      var excerpt = createElement('span', 'search-result-snippet');
      appendHighlighted(excerpt, snippet, terms);
      link.appendChild(excerpt);
    }

    item.appendChild(link);
    return item;
  }

  function setStatus(text) {
    status.textContent = text;
    status.hidden = !text;
  }

  function render() {
    results.textContent = '';
    var query = input.value.trim();

    if (!entries) return;
    if (!query) {
      setStatus('제목, 본문, 카테고리, 태그에서 글을 찾습니다.');
      return;
    }

    var found = search(query);
    if (!found.items.length) {
      setStatus('‘' + query + '’에 맞는 글이 없습니다.');
      return;
    }

    setStatus(found.items.length + '개의 글');
    found.items.slice(0, MAX_RESULTS).forEach(function (item) {
      results.appendChild(renderItem(item.entry, found.terms));
    });
  }

  function resultLinks() {
    return Array.prototype.slice.call(results.querySelectorAll('.search-result'));
  }

  function open() {
    dialog.showModal();
    document.documentElement.classList.add('search-open');
    openButton.setAttribute('aria-expanded', 'true');
    input.focus();
    input.select();

    if (entries) {
      render();
      return;
    }
    setStatus('검색 데이터를 불러오는 중…');
    load().then(render, function () {
      setStatus('검색 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
    });
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  openButton.setAttribute('aria-expanded', 'false');
  openButton.addEventListener('click', open);

  // 버튼에 마우스를 올리거나 포커스하면 미리 받아 둔다. (실패해도 열 때 다시 시도)
  ['pointerenter', 'focus'].forEach(function (type) {
    openButton.addEventListener(type, function () { load().catch(function () {}); }, { once: true });
  });

  closeButton.addEventListener('click', close);

  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('search-open');
    openButton.setAttribute('aria-expanded', 'false');
    openButton.focus();
  });

  // 검색 창 바깥(배경)을 누르면 닫는다. 패널이 dialog 를 꽉 채우므로 target 이 dialog 면 바깥이다.
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) close();
  });

  input.addEventListener('input', render);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var first = resultLinks()[0];
    if (first) window.location.href = first.href;
  });

  dialog.addEventListener('keydown', function (event) {
    // type="search" 입력창은 Esc 를 먼저 "글자 지우기"로 써 버려서, 한 번에 닫히도록 직접 처리한다.
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    var links = resultLinks();
    if (!links.length) return;

    var current = links.indexOf(document.activeElement);
    var next;
    if (event.key === 'ArrowDown') {
      next = current === -1 ? 0 : Math.min(current + 1, links.length - 1);
      links[next].focus();
    } else if (current <= 0) {
      if (current === -1) return; // 입력창 안에서의 ↑ 는 기본 동작 그대로
      input.focus();
    } else {
      links[current - 1].focus();
    }
    event.preventDefault();
  });
})();
