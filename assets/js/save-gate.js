/*
  저장 코드 확인 (글쓰기 /write/ · 프로필 사진 편집 /profile/edit/ 공용). 입력 창은 _includes/save-gate.html.
  - 누구나 화면을 써 볼 수 있지만, GitHub 저장 화면을 여는 동작은 저장 코드를 맞힌 경우에만 실행한다.
  - _config.yml 의 write.code_hash 에는 코드 원문이 아니라 SHA-256 해시만 둔다.
  - 정적 사이트라 이 검사는 브라우저에서만 이뤄지므로 우회할 수 있다. 실제로 저장을 막는 것은
    GitHub 저장소 쓰기 권한이며(주인만 Commit 가능), 이 코드는 방문자에게 '체험'과 '저장'을 나누는 입구다.

  사용: SaveGate.require(action, { notify: fn(message), cancelMessage: '...' })
*/
(function () {
  var CODE_SALT = 'my-blog-write:';
  var UNLOCK_KEY = 'write-unlock';

  var dialog = document.querySelector('[data-save-gate]');
  var codeHash = dialog ? (dialog.getAttribute('data-code-hash') || '').trim().toLowerCase() : '';
  var unlocked = false;
  var pending = null;

  var gate = dialog && {
    form: dialog.querySelector('[data-save-gate-form]'),
    input: dialog.querySelector('[data-save-gate-input]'),
    remember: dialog.querySelector('[data-save-gate-remember]'),
    error: dialog.querySelector('[data-save-gate-error]'),
    cancel: dialog.querySelector('[data-save-gate-cancel]')
  };

  try {
    if (codeHash && localStorage.getItem(UNLOCK_KEY) === codeHash) unlocked = true;
  } catch (e) {}

  function hash(code) {
    var bytes = new TextEncoder().encode(CODE_SALT + code);
    return crypto.subtle.digest('SHA-256', bytes).then(function (buffer) {
      return Array.prototype.map.call(new Uint8Array(buffer), function (b) {
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    });
  }

  function require(action, options) {
    options = options || {};
    var notify = options.notify || function () {};

    if (unlocked) return action();
    if (!codeHash) {
      notify('저장 코드가 아직 설정되지 않아 저장할 수 없습니다. 지금은 체험 모드입니다.');
      return;
    }
    if (!window.crypto || !crypto.subtle || !dialog || !dialog.showModal) {
      notify('이 브라우저에서는 저장 코드를 확인할 수 없습니다. (https 주소에서 열어 주세요)');
      return;
    }
    pending = { action: action, notify: notify, cancelMessage: options.cancelMessage || '체험 모드입니다. 저장되지 않았습니다.' };
    gate.input.value = '';
    gate.error.hidden = true;
    dialog.showModal();
    gate.input.focus();
  }

  if (dialog) {
    gate.form.addEventListener('submit', function (event) {
      event.preventDefault();
      var code = gate.input.value;
      if (!code) return;
      hash(code).then(function (value) {
        if (value !== codeHash) {
          gate.error.hidden = false;
          gate.input.select();
          return;
        }
        unlocked = true;
        try {
          if (gate.remember.checked) localStorage.setItem(UNLOCK_KEY, codeHash);
        } catch (e) {}
        var done = pending;
        pending = null;
        dialog.close();
        if (done) done.action();
      });
    });

    gate.cancel.addEventListener('click', function () {
      dialog.close();
    });

    // 취소·Esc 로 닫히면 체험 모드 안내
    dialog.addEventListener('close', function () {
      if (!pending) return;
      var cancelled = pending;
      pending = null;
      cancelled.notify(cancelled.cancelMessage);
    });
  }

  window.SaveGate = {
    configured: !!codeHash,
    hash: hash,
    require: require
  };
})();
