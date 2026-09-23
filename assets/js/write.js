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
  - 저장(GitHub 화면 열기)은 저장 코드를 맞혀야 한다. 틀리면 체험 모드로 남는다. (아래 '저장 코드' 참고)
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
    projectLabel: form.elements.project_label,
    projectTitle: form.elements.project_title,
    projectSlug: form.elements.project_slug,
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
  var NEW_PROJECT = '__new__';
  var existingProjects = [];
  try {
    existingProjects = JSON.parse(form.querySelector('[data-write-projects]').textContent) || [];
  } catch (e) {}

  var existing = [];
  try {
    existing = JSON.parse(form.querySelector('[data-write-existing]').textContent) || [];
  } catch (e) {}

  var el = {
    slugDate: form.querySelector('[data-write-slug-date]'),
    errors: form.querySelector('[data-write-errors]'),
    output: form.querySelector('[data-write-output]'),
    filename: form.querySelector('[data-write-filename]'),
    status: form.querySelector('[data-write-status]'),
    newProject: form.querySelector('[data-write-newproject]'),
    projectPagePath: form.querySelector('[data-write-project-page-path]')
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

  /* ---------- 새 프로젝트 ---------- */

  function isNewProject() {
    return isProject && fields.project.value === NEW_PROJECT;
  }

  function newProjectInfo() {
    var label = fields.projectLabel.value.trim();
    return {
      slug: fields.projectSlug.value.trim(),
      label: label,
      title: fields.projectTitle.value.trim() || label
    };
  }

  function checkNewProject() {
    var info = newProjectInfo();
    var errors = [];
    if (!info.label) errors.push('새 프로젝트 이름을 입력하세요.');
    if (!info.slug) errors.push('새 프로젝트 폴더명(영문)을 입력하세요.');
    else if (!SLUG_PATTERN.test(info.slug)) errors.push('프로젝트 폴더명은 영문 소문자·숫자·하이픈(-)만 쓸 수 있습니다. 예) tanchunrun');
    else if (existingProjects.indexOf(info.slug) !== -1 ||
             existing.some(function (path) { return path.indexOf('_project_posts/' + info.slug + '/') === 0; })) {
      errors.push('이미 있는 프로젝트 폴더명입니다: ' + info.slug);
    }
    return errors;
  }

  // _data/projects.yml 맨 아래에 붙일 항목 (기존 항목과 같은 키 순서)
  function projectListSnippet(info) {
    return '\n- slug: ' + info.slug + '\n  title: ' + yamlString(info.title) + '\n  label: ' + yamlString(info.label) + '\n';
  }

  // projects/<slug>.md — 기존 projects/tanchunrun.md 와 같은 형식
  function projectPageContent(info) {
    return [
      '---',
      'layout: project',
      'title: ' + yamlString(info.label),
      'project: ' + info.slug,
      'permalink: /projects/' + info.slug + '/',
      '---',
      ''
    ].join('\n');
  }

  function build() {
    var title = fields.title.value.trim();
    var date = fields.date.value;
    var slug = fields.slug.value.trim();
    var category = isProject ? 'project' : fields.category.value;
    var isNew = isNewProject();
    var project = !isProject ? '' : isNew ? fields.projectSlug.value.trim() : fields.project.value;
    var tags = parseTags(fields.tags.value);
    var body = fields.body.value.replace(/\s+$/, '') + '\n';
    var now = nowKst();

    // 오늘 글은 지금 시각, 다른 날짜는 오전 9시로 둔다. (미래 시각이면 Jekyll 이 글을 숨긴다)
    var time = date === now.date ? now.time : '09:00:00';

    var lines = ['---'];
    var prefix, path;

    if (isProject) {
      prefix = isNew ? '00' : project ? nextProjectNumber(project) : 'NN';
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
      if (isNewProject()) errors = errors.concat(checkNewProject());
      else if (!post.project) errors.push('프로젝트를 선택하세요.');
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
    if (el.newProject) {
      el.newProject.hidden = !isNewProject();
      el.projectPagePath.textContent = 'projects/' + (fields.projectSlug.value.trim() || '폴더명') + '.md';
    }
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

  /* ---------- 저장 코드 ----------
     누구나 폼을 써 볼 수 있지만, GitHub 저장 화면은 저장 코드를 맞힌 경우에만 연다.
     _config.yml 의 write.code_hash 에는 코드 원문이 아니라 SHA-256 해시만 둔다.
     정적 사이트라 이 검사는 브라우저에서만 이뤄지므로 우회할 수 있다. 실제로 글을 막는 것은
     GitHub 저장소 쓰기 권한이며(주인만 Commit 가능), 이 코드는 방문자에게 '체험'과 '저장'을 나누는 입구다. */

  var CODE_SALT = 'my-blog-write:';
  var UNLOCK_KEY = 'write-unlock';
  var codeHash = (form.getAttribute('data-code-hash') || '').trim().toLowerCase();
  var unlocked = false;
  var pendingAction = null;

  var gate = {
    dialog: document.querySelector('[data-write-gate]'),
    form: document.querySelector('[data-write-gate-form]'),
    input: document.querySelector('[data-write-gate-input]'),
    remember: document.querySelector('[data-write-gate-remember]'),
    error: document.querySelector('[data-write-gate-error]'),
    cancel: document.querySelector('[data-write-gate-cancel]')
  };

  try {
    if (codeHash && localStorage.getItem(UNLOCK_KEY) === codeHash) unlocked = true;
  } catch (e) {}

  function hashCode(code) {
    var bytes = new TextEncoder().encode(CODE_SALT + code);
    return crypto.subtle.digest('SHA-256', bytes).then(function (buffer) {
      return Array.prototype.map.call(new Uint8Array(buffer), function (b) {
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    });
  }

  function requireCode(action) {
    if (unlocked) return action();
    if (!codeHash) {
      setStatus('저장 코드가 아직 설정되지 않아 저장할 수 없습니다. 지금은 체험 모드입니다.');
      return;
    }
    if (!window.crypto || !crypto.subtle || !gate.dialog || !gate.dialog.showModal) {
      setStatus('이 브라우저에서는 저장 코드를 확인할 수 없습니다. (https 주소에서 열어 주세요)');
      return;
    }
    pendingAction = action;
    gate.input.value = '';
    gate.error.hidden = true;
    gate.dialog.showModal();
    gate.input.focus();
  }

  if (gate.form) {
    gate.form.addEventListener('submit', function (event) {
      event.preventDefault();
      var code = gate.input.value;
      if (!code) return;
      hashCode(code).then(function (hash) {
        if (hash !== codeHash) {
          gate.error.hidden = false;
          gate.input.select();
          return;
        }
        unlocked = true;
        try {
          if (gate.remember.checked) localStorage.setItem(UNLOCK_KEY, codeHash);
        } catch (e) {}
        var action = pendingAction;
        pendingAction = null;
        gate.dialog.close();
        if (action) action();
      });
    });

    gate.cancel.addEventListener('click', function () {
      gate.dialog.close();
    });

    gate.dialog.addEventListener('close', function () {
      if (!pendingAction) return;
      pendingAction = null;
      setStatus('체험 모드입니다. 작성한 글은 저장되지 않았습니다. (내용 복사·다운로드는 할 수 있어요)');
    });
  }

  // 코드 설정 도우미: /write/?setup=1 에서 코드를 입력하면 _config.yml 에 넣을 해시를 만들어 준다.
  (function setupHelper() {
    var panel = document.querySelector('[data-write-setup]');
    if (!panel) return;
    var show = false;
    try { show = new URLSearchParams(location.search).has('setup'); } catch (e) {}
    if (!show) return;
    panel.hidden = false;

    var code1 = panel.querySelector('[data-write-setup-code]');
    var code2 = panel.querySelector('[data-write-setup-confirm]');
    var result = panel.querySelector('[data-write-setup-result]');
    var output = panel.querySelector('[data-write-setup-output]');
    var message = panel.querySelector('[data-write-setup-message]');
    panel.querySelector('[data-write-setup-state]').textContent = codeHash ? '설정됨' : '아직 설정되지 않음';

    panel.querySelector('[data-write-setup-make]').addEventListener('click', function () {
      result.hidden = true;
      if (code1.value.length < 4) { message.textContent = '코드는 4자 이상으로 정하세요.'; return; }
      if (code1.value !== code2.value) { message.textContent = '두 칸의 코드가 다릅니다.'; return; }
      message.textContent = '';
      hashCode(code1.value).then(function (hash) {
        output.textContent = '  code_hash: "' + hash + '"';
        result.hidden = false;
        code1.value = code2.value = '';
      });
    });

    panel.querySelector('[data-write-setup-copy]').addEventListener('click', function () {
      copyText(output.textContent.trim()).then(function () {
        message.textContent = '복사했습니다. 열린 _config.yml 에서 write: 아래 code_hash 줄을 이 값으로 바꾸고 Commit 하세요.';
      }, function () {
        message.textContent = '복사에 실패했습니다. 위 값을 직접 선택해 복사하세요.';
      });
      window.open(githubUrl('edit', '_config.yml'), '_blank', 'noopener');
    });
  })();

  /* ---------- 이벤트 ---------- */

  form.addEventListener('input', function () {
    refresh();
    saveDraft();
  });

  // 파일명 칸은 입력하는 동안 규칙에 맞게 바로 고쳐 준다. (대문자 → 소문자, 공백 → 하이픈)
  [fields.slug, fields.projectSlug].forEach(function (input) {
    input.addEventListener('input', function () {
      var fixed = input.value.toLowerCase().replace(/[\s_]+/g, '-');
      if (fixed !== input.value) input.value = fixed;
    });
  });

  function githubUrl(action, path) {
    return 'https://github.com/' + repo + '/' + action + '/' + encodeURIComponent(branch) +
           (action === 'new' ? '?filename=' + encodeURIComponent(path) : '/' + path);
  }

  // 새 프로젝트 1·2단계. 프로젝트 정보만 검사한다. (제목·본문은 3단계에서 검사)
  form.querySelectorAll('[data-write-step]').forEach(function (button) {
    button.addEventListener('click', function () {
      var errors = checkNewProject();
      showMessages({ errors: errors, warnings: [] });
      if (errors.length) {
        setStatus('');
        return;
      }
      requireCode(function () {
        var info = newProjectInfo();

        if (button.getAttribute('data-write-step') === 'list') {
          copyText(projectListSnippet(info)).then(function () {
            setStatus('프로젝트 항목을 복사했습니다. 열린 projects.yml 편집 화면의 맨 아래에 Ctrl+V 로 붙여넣고 Commit 하세요.');
          }, function () {
            setStatus('자동 복사에 실패했습니다. 아래 내용을 projects.yml 맨 아래에 붙여넣으세요:' + projectListSnippet(info));
          });
          window.open(githubUrl('edit', '_data/projects.yml'), '_blank', 'noopener');
        } else {
          var path = 'projects/' + info.slug + '.md';
          window.open(githubUrl('new', path) + '&value=' + encodeURIComponent(projectPageContent(info)), '_blank', 'noopener');
          setStatus(path + ' 화면이 열렸습니다. 내용 확인 후 Commit 하세요. 그다음 아래에서 첫 기록을 저장합니다.');
        }
        button.classList.add('is-done');
      });
    });
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

    requireCode(function () { openSave(post); });
  });

  function openSave(post) {
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
  }

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
