/*
  게시물 수정 폼. (edit.html)
  - /edit/?path=_posts/....md 로 들어오면 저장 코드를 먼저 확인한 뒤, GitHub 에서 원본 파일을 불러와 폼에 채운다.
    (정적 사이트라 원본 Markdown 을 가진 곳은 저장소뿐이다. 공개 저장소라 토큰 없이 읽을 수 있다)
  - 제목·작성일·카테고리·태그·요약(description)·본문만 고친다. 나머지 머리말(layout, mermaid, project 등)은
    원래 줄 그대로 두고, 값이 바뀌지 않은 항목도 원래 줄을 그대로 둔다. (따옴표·목록 형식이 바뀌지 않게)
  - 저장: 수정본 전체를 클립보드에 복사하고 GitHub 편집 화면을 연다. 거기서 전체 선택 → 붙여넣기 → Commit.
    GitHub 기존 파일 편집 화면은 새 파일 화면(?value=)처럼 주소로 내용을 채울 수 없다.
  - 저장 코드 확인은 assets/js/save-gate.js 가 맡는다. 실제로 저장을 막는 것은 GitHub 저장소 쓰기 권한이다.
*/
(function () {
  var form = document.querySelector('[data-edit-form]');
  if (!form) return;

  var repo = form.getAttribute('data-repo');
  var branch = form.getAttribute('data-branch') || 'main';

  var fields = {
    title: form.elements.title,
    date: form.elements.date,
    category: form.elements.category,
    tags: form.elements.tags,
    description: form.elements.description,
    body: form.elements.body
  };

  var el = {
    list: document.querySelector('[data-edit-list]'),
    message: document.querySelector('[data-edit-message]'),
    locked: document.querySelector('[data-edit-locked]'),
    path: form.querySelector('[data-edit-path]'),
    projectNote: form.querySelector('[data-edit-project-note]'),
    errors: form.querySelector('[data-edit-errors]'),
    output: form.querySelector('[data-edit-output]'),
    status: form.querySelector('[data-edit-status]')
  };

  var entries = [];
  try { entries = JSON.parse(form.querySelector('[data-edit-entries]').textContent) || []; } catch (e) {}

  var path = '';
  try { path = new URLSearchParams(location.search).get('path') || ''; } catch (e) {}
  var entry = entries.filter(function (item) { return item.path === path; })[0];
  var isProject = path.indexOf('_project_posts/') === 0;

  // 불러온 원본: { original: 파일 전체, front: 머리말 항목 목록, body: 본문 }
  var source = null;

  /* ---------- 공통 규칙 (write.js 와 같은 규칙) ---------- */

  function nowKst() {
    return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  }

  function parseTags(value) {
    var seen = {};
    return value.split(',')
      .map(function (tag) {
        return tag.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}.+-]/gu, '');
      })
      .filter(function (tag) {
        if (!tag || seen[tag]) return false;
        seen[tag] = true;
        return true;
      });
  }

  function yamlString(value) {
    return '"' + value.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }

  function usesMermaid(body) {
    return /^```mermaid\s*$/m.test(body);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return Promise.reject(new Error('clipboard unavailable'));
  }

  /* ---------- 원본 파일 읽기 ---------- */

  // 머리말을 "키 한 줄 + 이어지는 줄(목록 등)" 단위로 나눈다. 원래 줄을 그대로 보관한다.
  function parseFront(text) {
    var items = [];
    text.split('\n').forEach(function (line) {
      var match = line.match(/^([A-Za-z_][\w-]*):(?:\s+(.*))?$/);
      if (match) items.push({ key: match[1], value: (match[2] || '').trim(), lines: [line] });
      else if (items.length) items[items.length - 1].lines.push(line);
      else items.push({ key: null, value: '', lines: [line] });
    });
    return items;
  }

  function unquote(value) {
    if (/^".*"$/.test(value)) return value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    if (/^'.*'$/.test(value)) return value.slice(1, -1).replace(/''/g, "'");
    return value;
  }

  function findItem(key) {
    return source.front.filter(function (item) { return item.key === key; })[0];
  }

  function scalar(key) {
    var item = findItem(key);
    return item ? unquote(item.value) : '';
  }

  // tags: [a, b] · tags: a · 줄마다 "- a" 세 형식을 모두 읽는다.
  function list(key) {
    var item = findItem(key);
    if (!item) return [];
    if (item.value.charAt(0) === '[') {
      return item.value.replace(/^\[|\]$/g, '').split(',')
        .map(function (value) { return unquote(value.trim()); })
        .filter(Boolean);
    }
    if (item.value) return [unquote(item.value)];
    return item.lines.slice(1)
      .map(function (line) { var m = line.match(/^\s*-\s+(.*)$/); return m ? unquote(m[1].trim()) : ''; })
      .filter(Boolean);
  }

  function isBlockList(key) {
    var item = findItem(key);
    return item ? !item.value : isProject;
  }

  function parseFile(text) {
    text = text.replace(/\r\n/g, '\n');
    var match = text.match(/^---\n([\s\S]*?)\n---[ \t]*(?:\n|$)/);
    if (!match) return null;
    var rest = text.slice(match[0].length);
    return {
      original: text,
      front: parseFront(match[1]),
      gap: rest.charAt(0) === '\n', // 머리말 뒤 빈 줄 여부
      body: rest.replace(/^\n/, '')
    };
  }

  function fill() {
    fields.title.value = scalar('title');
    fields.date.value = scalar('date').slice(0, 10);
    fields.tags.value = list('tags').join(', ');
    fields.description.value = scalar('description');
    fields.body.value = source.body;

    if (isProject) {
      // 프로젝트 기록은 _config.yml defaults 가 category 를 project 로 채운다.
      var option = document.createElement('option');
      option.value = 'project';
      option.textContent = 'Project';
      fields.category.appendChild(option);
      fields.category.value = 'project';
      fields.category.disabled = true;
      el.projectNote.hidden = false;
    } else {
      var category = list('categories')[0] || '';
      // 목록에 없는 값이면 그대로 보이게 추가해 둔다. (저장 시 값이 사라지지 않게)
      if (category && !fields.category.querySelector('option[value="' + CSS.escape(category) + '"]')) {
        var extra = document.createElement('option');
        extra.value = category;
        extra.textContent = category;
        fields.category.appendChild(extra);
      }
      fields.category.value = category;
    }
  }

  /* ---------- 수정본 만들기 ---------- */

  function build() {
    var title = fields.title.value.trim();
    var date = fields.date.value;
    var category = fields.category.value;
    var tags = parseTags(fields.tags.value);
    var description = fields.description.value.replace(/\s+/g, ' ').trim();
    // 본문을 고치지 않았으면 원본 그대로 둔다. (파일 끝 줄바꿈 유무까지 유지)
    var body = fields.body.value.replace(/\r\n/g, '\n');
    if (body !== source.body) body = body.replace(/\s+$/, '') + '\n';

    // 바뀐 항목만 새 줄로 만든다. null 이면 그 항목을 뺀다.
    var changes = {};
    if (title !== scalar('title')) changes.title = ['title: ' + yamlString(title)];
    var oldDate = scalar('date');
    if (date !== oldDate.slice(0, 10)) changes.date = ['date: ' + date + oldDate.slice(10)];
    if (!isProject && category !== (list('categories')[0] || '')) changes.categories = ['categories: ' + category];
    if (tags.join(',') !== list('tags').join(',')) {
      changes.tags = !tags.length ? null
        : isBlockList('tags') ? ['tags:'].concat(tags.map(function (tag) { return '  - ' + tag; }))
        : ['tags: [' + tags.join(', ') + ']'];
    }
    if (description !== scalar('description')) changes.description = description ? ['description: ' + yamlString(description)] : null;

    var lines = ['---'];
    source.front.forEach(function (item) {
      if (item.key && changes.hasOwnProperty(item.key)) {
        if (changes[item.key]) lines = lines.concat(changes[item.key]);
        delete changes[item.key];
      } else {
        lines = lines.concat(item.lines);
      }
    });
    // 원래 없던 항목(요약·태그 등)은 머리말 끝에 붙인다.
    Object.keys(changes).forEach(function (key) {
      if (changes[key]) lines = lines.concat(changes[key]);
    });
    if (usesMermaid(body) && !findItem('mermaid')) lines.push('mermaid: true');
    lines.push('---');
    if (source.gap) lines.push('');
    lines.push(body);

    return {
      title: title,
      date: date,
      category: category,
      dateChanged: date !== oldDate.slice(0, 10),
      content: lines.join('\n')
    };
  }

  function check(post) {
    var errors = [];
    var warnings = [];
    if (!post.title) errors.push('제목을 입력하세요.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) errors.push('작성일을 선택하세요.');
    if (!post.category) errors.push('카테고리를 선택하세요.');
    if (!fields.body.value.trim()) errors.push('본문을 입력하세요.');
    if (post.date > nowKst()) warnings.push('미래 날짜는 그날이 되기 전까지 블로그에 보이지 않습니다.');
    if (post.dateChanged) warnings.push('작성일을 바꾸면 글 주소가 바뀝니다. (주소에 날짜가 들어갑니다)');
    return { errors: errors, warnings: warnings };
  }

  function showMessages(result) {
    el.errors.innerHTML = '';
    result.errors.concat(result.warnings).forEach(function (message, i) {
      var li = document.createElement('li');
      li.textContent = message;
      if (i >= result.errors.length) li.className = 'is-warning';
      el.errors.appendChild(li);
    });
    el.errors.hidden = !el.errors.children.length;
  }

  function refresh() {
    var post = build();
    el.output.textContent = post.content;
    if (!el.errors.hidden) showMessages(check(post));
    return post;
  }

  function setStatus(message) {
    el.status.textContent = message;
  }

  /* ---------- 불러오기 ---------- */

  function load() {
    el.locked.hidden = true;
    el.message.textContent = '원본을 불러오는 중입니다...';
    var encoded = path.split('/').map(encodeURIComponent).join('/');
    var url = 'https://api.github.com/repos/' + repo + '/contents/' + encoded + '?ref=' + encodeURIComponent(branch);
    fetch(url, { headers: { Accept: 'application/vnd.github.raw+json' }, cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error(response.status);
        return response.text();
      })
      .then(function (text) {
        source = parseFile(text);
        if (!source) throw new Error('front matter');
        fill();
        el.path.textContent = path;
        el.message.textContent = '';
        form.hidden = false;
        refresh();
      })
      .catch(function () {
        el.message.textContent = '원본을 불러오지 못했습니다. 잠시 후 새로고침해 주세요. (GitHub 조회 한도에 걸렸을 수 있습니다)';
      });
  }

  function requireCode(action, cancelMessage) {
    if (!window.SaveGate) {
      el.message.textContent = '저장 코드 확인 기능을 불러오지 못했습니다. 새로고침해 주세요.';
      return;
    }
    window.SaveGate.require(action, {
      notify: function (message) {
        if (form.hidden) {
          el.message.textContent = message;
          el.locked.hidden = !window.SaveGate.configured;
        } else {
          setStatus(message);
        }
      },
      cancelMessage: cancelMessage
    });
  }

  /* ---------- 저장 ---------- */

  function openSave(post) {
    if (post.content === source.original) {
      setStatus('바뀐 내용이 없습니다.');
      return;
    }
    var name = path.split('/').pop();
    var hint = '';
    if (post.dateChanged && !isProject) {
      hint = ' 파일 이름도 날짜에 맞추려면 GitHub 화면 위쪽 파일 이름을 ' + post.date + name.slice(10) + ' 로 바꾸세요. (선택)';
    }
    copyText(post.content).then(function () {
      setStatus('수정본을 복사했습니다. 열린 GitHub 편집 화면에서 Ctrl+A 로 전체 선택 → Ctrl+V 로 붙여넣고 "Commit changes..."를 누르세요.' + hint);
    }, function () {
      setStatus('자동 복사에 실패했습니다. 아래 미리보기 내용을 직접 복사해 GitHub 편집 화면에 붙여넣으세요.' + hint);
    });
    window.open('https://github.com/' + repo + '/edit/' + encodeURIComponent(branch) + '/' + path, '_blank', 'noopener');
  }

  form.addEventListener('input', refresh);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var post = refresh();
    var result = check(post);
    showMessages(result);
    if (result.errors.length) {
      setStatus('');
      el.errors.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    requireCode(function () { openSave(post); }, '저장하지 않았습니다.');
  });

  form.querySelector('[data-edit-cancel]').addEventListener('click', function () {
    location.href = entry.url;
  });

  document.querySelector('[data-edit-unlock]').addEventListener('click', function () {
    requireCode(load, '저장 코드를 입력해야 수정할 수 있습니다.');
  });

  /* ---------- 시작 ---------- */

  if (!path) {
    el.list.hidden = false;
  } else if (!entry) {
    el.message.textContent = '수정할 글을 찾지 못했습니다: ' + path;
  } else {
    requireCode(load, '저장 코드를 입력해야 수정할 수 있습니다.');
  }
})();
