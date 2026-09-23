/*
  새 글 쓰기 폼. (write.html)
  - 입력값으로 CLAUDE.md 규칙에 맞는 파일(파일명 + 머리말 + 본문)을 만든다.
    ?type=post    (기본) _posts/YYYY-MM-DD-slug.md
    ?type=project _project_posts/<project>/NN-slug.md — 기존 프로젝트 기록과 같은 머리말(title/date/project/tags)
                  만 쓰고, layout·category 는 _config.yml defaults 에 맡긴다. NN 은 다음 순번을 자동으로 붙인다.
  - "GitHub에서 저장"을 누르면 GitHub 새 파일 화면을 연다.
    GitHub 는 약 7,000자가 넘는 주소를 거절(414)하므로, 내용이 짧으면 주소에 담아 채우고
    길면 클립보드에 복사한 뒤 파일명만 채운 화면을 연다. (거기서 Ctrl+V 로 붙여넣는다)
  - 작성 중인 내용은 이 브라우저의 localStorage 에만 임시 저장한다.
*/
(function () {
  var form = document.querySelector('[data-write-form]');
  if (!form) return;

  var type = 'post';
  try {
    if (new URLSearchParams(location.search).get('type') === 'project') type = 'project';
  } catch (e) {}
  var isProject = type === 'project';

  // 일반 글과 프로젝트 기록의 임시 저장이 섞이지 않게 키를 나눈다.
  var DRAFT_KEY = isProject ? 'write-draft-project' : 'write-draft';
  var MAX_URL_LENGTH = 6000;
  var SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  var TEMPLATE = [
    '## 들어가며 (Situation)',
    '',
    '- 어떤 작업을 하다가 이 내용을 배우게 됐는지',
    '',
    '## 문제 상황 (Task)',
    '',
    '- 무엇이 막혔거나 헷갈렸는지, 제약 조건은 무엇이었는지',
    '',
    '## 해결 과정 (Action)',
    '',
    '- 검토한 방법 비교 (표 활용)',
    '- 선택한 방법과 이유',
    '- 실제로 해 본 과정 (코드, 다이어그램)',
    '- 실패한 시도',
    '',
    '## 결과 (Result)',
    '',
    '- 무엇이 달라졌는지 (가능하면 숫자로)',
    '- 배운 점',
    '',
    '## 더 학습하면 좋은 개념',
    '',
    '- **개념** — 한 줄 설명과 왜 학습하면 좋은지',
    '',
    '## 참고 자료',
    '',
    '- [공식 문서 제목](https://example.com)',
    ''
  ].join('\n');

  var fields = {
    title: form.elements.title,
    date: form.elements.date,
    slug: form.elements.slug,
    category: form.elements.category,
    project: form.elements.project,
    tags: form.elements.tags,
    body: form.elements.body
  };

  // 모드에 맞는 칸만 보여 주고, 숨긴 칸은 제출 대상에서 뺀다.
  form.setAttribute('data-write-type', type);
  document.querySelectorAll('[data-write-mode]').forEach(function (node) {
    var active = node.getAttribute('data-write-mode') === type;
    node.hidden = !active;
    node.querySelectorAll('select, input').forEach(function (input) { input.disabled = !active; });
  });
  if (isProject) {
    var heading = document.querySelector('[data-write-heading]');
    if (heading) heading.textContent = '프로젝트 기록 쓰기';
    document.title = document.title.replace('새 글 쓰기', '프로젝트 기록 쓰기');
  }

  var repo = form.getAttribute('data-repo');
  var branch = form.getAttribute('data-branch') || 'main';
  var existing = [];
  try {
    existing = JSON.parse(form.querySelector('[data-write-existing]').textContent) || [];
  } catch (e) {}

  var el = {
    slugDate: form.querySelector('[data-write-slug-date]'),
    errors: form.querySelector('[data-write-errors]'),
    output: form.querySelector('[data-write-output]'),
    filename: form.querySelector('[data-write-filename]'),
    status: form.querySelector('[data-write-status]')
  };

  /* ---------- 날짜 (한국 시간 기준) ---------- */

  function nowKst() {
    var d = new Date(Date.now() + 9 * 60 * 60 * 1000);
    var iso = d.toISOString();
    return { date: iso.slice(0, 10), time: iso.slice(11, 19) };
  }

  /* ---------- 입력값 정리 ---------- */

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

  // 프로젝트 기록 파일명 앞 번호: 해당 프로젝트 폴더의 가장 큰 번호 + 1 (00-overview.md → 01)
  function nextProjectNumber(project) {
    var dir = '_project_posts/' + project + '/';
    var max = -1;
    existing.forEach(function (path) {
      if (path.indexOf(dir) !== 0) return;
      var match = path.slice(dir.length).match(/^(\d+)-/);
      if (match) max = Math.max(max, parseInt(match[1], 10));
    });
    var next = String(max + 1);
    return next.length < 2 ? '0' + next : next;
  }

  function build() {
    var title = fields.title.value.trim();
    var date = fields.date.value;
    var slug = fields.slug.value.trim();
    var category = isProject ? 'project' : fields.category.value;
    var project = isProject ? fields.project.value : '';
    var tags = parseTags(fields.tags.value);
    var body = fields.body.value.replace(/\s+$/, '') + '\n';
    var now = nowKst();

    // 오늘 글은 지금 시각, 다른 날짜는 오전 9시로 둔다. (미래 시각이면 Jekyll 이 글을 숨긴다)
    var time = date === now.date ? now.time : '09:00:00';

    var lines = ['---'];
    var prefix, path;

    if (isProject) {
      prefix = project ? nextProjectNumber(project) : 'NN';
      path = '_project_posts/' + project + '/' + prefix + '-' + slug + '.md';
      lines.push(
        'title: ' + yamlString(title),
        'date: ' + date + ' ' + time + ' +0900',
        'project: ' + project
      );
      // 기존 프로젝트 기록과 같은 목록 형식
      if (tags.length) lines.push('tags:', tags.map(function (tag) { return '  - ' + tag; }).join('\n'));
    } else {
      prefix = date || 'YYYY-MM-DD';
      path = '_posts/' + date + '-' + slug + '.md';
      lines.push(
        'layout: post',
        'title: ' + yamlString(title),
        'date: ' + date + ' ' + time + ' +0900',
        'categories: ' + category
      );
      if (tags.length) lines.push('tags: [' + tags.join(', ') + ']');
    }

    if (usesMermaid(body)) lines.push('mermaid: true');
    lines.push('---', '', body);

    return {
      title: title,
      date: date,
      slug: slug,
      category: category,
      project: project,
      tags: tags,
      body: body,
      today: now.date,
      prefix: prefix,
      path: path,
      content: lines.join('\n')
    };
  }

  /* ---------- 검사 ---------- */

  function check(post) {
    var errors = [];
    var warnings = [];

    if (!post.title) errors.push('제목을 입력하세요.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) errors.push('게시일을 선택하세요.');
    if (!post.slug) errors.push('파일명(영문)을 입력하세요.');
    else if (!SLUG_PATTERN.test(post.slug)) errors.push('파일명은 영문 소문자·숫자·하이픈(-)만 쓸 수 있습니다. 예) login-cookie-session');
    if (isProject) {
      if (!post.project) errors.push('프로젝트를 선택하세요.');
      var dir = '_project_posts/' + post.project + '/';
      var same = existing.filter(function (path) {
        return path.indexOf(dir) === 0 && /^\d+-/.test(path.slice(dir.length)) &&
               path.slice(dir.length).replace(/^\d+-/, '') === post.slug + '.md';
      });
      if (post.slug && same.length) errors.push('같은 이름의 프로젝트 기록이 이미 있습니다: ' + same[0]);
    } else {
      if (!post.category) errors.push('카테고리를 선택하세요.');
      if (existing.indexOf(post.path) !== -1) errors.push('같은 이름의 글이 이미 있습니다: ' + post.path);
    }
    if (!post.body.trim()) errors.push('본문을 입력하세요.');

    if (post.date > post.today) warnings.push('미래 날짜는 그날이 되기 전까지 블로그에 보이지 않습니다.');
    if (post.tags.length && (post.tags.length < 3 || post.tags.length > 5)) warnings.push('태그는 3~5개를 권장합니다. (지금 ' + post.tags.length + '개)');
    if (/^# /m.test(post.body)) warnings.push('본문에 # 제목이 있습니다. 글 제목은 머리말 title 이 쓰므로 본문 섹션은 ## 부터 씁니다.');

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

  /* ---------- 화면 갱신 / 임시 저장 ---------- */

  function saveDraft() {
    try {
      var draft = {};
      Object.keys(fields).forEach(function (key) { draft[key] = fields[key].value; });
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch (e) {}
  }

  function loadDraft() {
    try {
      var draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
      if (!draft) return false;
      Object.keys(fields).forEach(function (key) {
        if (typeof draft[key] === 'string') fields[key].value = draft[key];
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearDraft() {
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
  }

  function refresh() {
    var post = build();
    el.slugDate.textContent = post.prefix + '-';
    el.filename.textContent = '(' + post.path + ')';
    el.output.textContent = post.content;
    if (!el.errors.hidden) showMessages(check(post));
    return post;
  }

  function setStatus(message) {
    el.status.textContent = message;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return Promise.reject(new Error('clipboard unavailable'));
  }

  function reset() {
    form.reset();
    fields.date.value = nowKst().date;
    fields.body.value = TEMPLATE;
    el.errors.hidden = true;
    clearDraft();
    refresh();
  }

  /* ---------- 이벤트 ---------- */

  form.addEventListener('input', function () {
    refresh();
    saveDraft();
  });

  // 파일명 칸은 입력하는 동안 규칙에 맞게 바로 고쳐 준다. (대문자 → 소문자, 공백 → 하이픈)
  fields.slug.addEventListener('input', function () {
    var fixed = fields.slug.value.toLowerCase().replace(/[\s_]+/g, '-');
    if (fixed !== fields.slug.value) fields.slug.value = fixed;
  });

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

    var base = 'https://github.com/' + repo + '/new/' + encodeURIComponent(branch) +
               '?filename=' + encodeURIComponent(post.path);
    var full = base + '&value=' + encodeURIComponent(post.content);

    if (full.length <= MAX_URL_LENGTH) {
      window.open(full, '_blank', 'noopener');
      setStatus('GitHub 화면이 열렸습니다. 내용 확인 후 "Commit changes..."를 누르면 게시됩니다.');
      return;
    }

    // 긴 글: 클립보드에 복사한 뒤 파일명만 채워서 연다.
    copyText(post.content).then(function () {
      setStatus('글이 길어서 내용을 클립보드에 복사했습니다. 열린 GitHub 화면의 편집기를 클릭하고 Ctrl+V 로 붙여넣은 뒤 "Commit changes..."를 누르세요.');
    }, function () {
      setStatus('자동 복사에 실패했습니다. "내용 복사" 버튼으로 복사한 뒤, 열린 GitHub 화면에 붙여넣으세요.');
    });
    window.open(base, '_blank', 'noopener');
  });

  form.querySelector('[data-write-copy]').addEventListener('click', function () {
    copyText(refresh().content).then(function () {
      setStatus('파일 내용을 클립보드에 복사했습니다.');
    }, function () {
      setStatus('복사에 실패했습니다. 미리보기에서 직접 선택해 복사하세요.');
    });
  });

  form.querySelector('[data-write-download]').addEventListener('click', function () {
    var post = refresh();
    var name = post.path.split('/').pop();
    var folder = post.path.slice(0, post.path.length - name.length - 1);
    var blob = new Blob([post.content], { type: 'text/markdown;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
    setStatus(name + ' 을(를) 내려받았습니다. GitHub 저장소의 ' + folder + ' 폴더에 올리면 게시됩니다.');
  });

  form.querySelector('[data-write-template]').addEventListener('click', function () {
    if (fields.body.value.trim() && fields.body.value !== TEMPLATE &&
        !window.confirm('지금 본문을 지우고 STAR 템플릿으로 바꿀까요?')) return;
    fields.body.value = TEMPLATE;
    refresh();
    saveDraft();
  });

  form.querySelector('[data-write-reset]').addEventListener('click', function () {
    if (!window.confirm('작성 중인 내용을 모두 지우고 새로 쓸까요?')) return;
    reset();
    setStatus('');
  });

  /* ---------- 시작 ---------- */

  if (loadDraft()) {
    if (!fields.date.value) fields.date.value = nowKst().date;
    refresh();
    setStatus('이전에 작성하던 내용을 불러왔습니다.');
  } else {
    reset();
  }
})();
