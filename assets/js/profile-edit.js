/*
  프로필 사진 편집 (profile-edit.html).
  - 사진을 고르면 정사각형으로 잘라 원형 미리보기를 보여 준다. 끌어서 위치, 슬라이더로 확대를 조정한다.
  - "GitHub에 저장"은 저장 코드를 맞히면(assets/js/save-gate.js)
    잘라낸 사진을 profile.jpg(400×400)로 내려받고 GitHub 의 assets/images 업로드 화면을 연다.
    같은 이름으로 올리면 기존 사진을 덮어쓴다.
  - "프로필 설정 연결"은 처음 한 번만: _data/profile.yml 의 image 줄을 복사하고 편집 화면을 연다.
*/
(function () {
  var root = document.querySelector('[data-photo-edit]');
  if (!root) return;

  var OUTPUT_SIZE = 400;
  var OUTPUT_NAME = 'profile.jpg';

  var repo = root.getAttribute('data-repo');
  var branch = root.getAttribute('data-branch') || 'main';
  var photoPath = root.getAttribute('data-photo-path');

  var canvas = root.querySelector('[data-photo-canvas]');
  var ctx = canvas.getContext('2d');
  var preview = root.querySelector('[data-photo-preview]');
  var previewCtx = preview.getContext('2d');
  var empty = root.querySelector('[data-photo-empty]');
  var fileInput = root.querySelector('[data-photo-file]');
  var zoomInput = root.querySelector('[data-photo-zoom]');
  var saveButton = root.querySelector('[data-photo-save]');
  var downloadButton = root.querySelector('[data-photo-download]');
  var connectButton = root.querySelector('[data-photo-connect]');
  var status = root.querySelector('[data-photo-status]');

  // 화면 좌표계: 캔버스 한 변(size) 안에서 사진 중심을 (size/2 + x, size/2 + y) 에 둔다.
  var state = { image: null, zoom: 1, x: 0, y: 0 };

  function setStatus(message) {
    status.textContent = message;
  }

  function githubUrl(action, path) {
    return 'https://github.com/' + repo + '/' + action + '/' + encodeURIComponent(branch) + '/' + path;
  }

  /* ---------- 그리기 ---------- */

  // 사진이 정사각형을 꽉 채우는 배율 × 확대
  function drawScale(size) {
    var img = state.image;
    return Math.max(size / img.naturalWidth, size / img.naturalHeight) * state.zoom;
  }

  // 사진이 정사각형 밖으로 빠져 빈 곳이 생기지 않게 위치를 제한한다.
  function clamp() {
    var size = canvas.width;
    var scale = drawScale(size);
    var maxX = Math.max(0, (state.image.naturalWidth * scale - size) / 2);
    var maxY = Math.max(0, (state.image.naturalHeight * scale - size) / 2);
    state.x = Math.min(maxX, Math.max(-maxX, state.x));
    state.y = Math.min(maxY, Math.max(-maxY, state.y));
  }

  function paint(target, size) {
    var img = state.image;
    var scale = drawScale(canvas.width) * (size / canvas.width);
    var w = img.naturalWidth * scale;
    var h = img.naturalHeight * scale;
    var ratio = size / canvas.width;
    target.fillStyle = '#ffffff';
    target.fillRect(0, 0, size, size);
    target.drawImage(img, size / 2 + state.x * ratio - w / 2, size / 2 + state.y * ratio - h / 2, w, h);
  }

  function render() {
    if (!state.image) return;
    clamp();
    paint(ctx, canvas.width);

    // 원 밖을 어둡게 덮어 실제로 쓰일 영역을 보여 준다.
    var size = canvas.width;
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.beginPath();
    ctx.rect(0, 0, size, size);
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2, true);
    ctx.fill('evenodd');
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    paint(previewCtx, preview.width);
  }

  function exportBlob() {
    var out = document.createElement('canvas');
    out.width = out.height = OUTPUT_SIZE;
    paint(out.getContext('2d'), OUTPUT_SIZE);
    return new Promise(function (resolve) {
      out.toBlob(resolve, 'image/jpeg', 0.9);
    });
  }

  function download(blob) {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = OUTPUT_NAME;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
  }

  /* ---------- 사진 불러오기 ---------- */

  fileInput.addEventListener('change', function () {
    var file = fileInput.files && fileInput.files[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      setStatus('이미지 파일만 쓸 수 있습니다.');
      return;
    }
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
      state.image = img;
      state.zoom = 1;
      state.x = state.y = 0;
      zoomInput.value = '1';
      zoomInput.disabled = saveButton.disabled = downloadButton.disabled = false;
      empty.hidden = true;
      root.classList.add('has-photo');
      render();
      setStatus('');
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      setStatus('이 사진은 열 수 없습니다. JPG · PNG · WebP 파일로 다시 선택해 주세요. (아이폰 HEIC 는 지원되지 않아요)');
    };
    img.src = url;
  });

  zoomInput.addEventListener('input', function () {
    state.zoom = parseFloat(zoomInput.value) || 1;
    render();
  });

  /* ---------- 끌어서 위치 옮기기 (마우스·터치 공통) ---------- */

  var drag = null;

  canvas.addEventListener('pointerdown', function (event) {
    if (!state.image) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: state.x, startY: state.y };
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener('pointermove', function (event) {
    if (!drag || drag.id !== event.pointerId) return;
    // 화면에 보이는 크기와 캔버스 내부 크기의 비율만큼 보정한다.
    var ratio = canvas.width / canvas.getBoundingClientRect().width;
    state.x = drag.startX + (event.clientX - drag.x) * ratio;
    state.y = drag.startY + (event.clientY - drag.y) * ratio;
    render();
  });

  function endDrag(event) {
    if (drag && drag.id === event.pointerId) drag = null;
  }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  /* ---------- 저장 ---------- */

  function requireCode(action) {
    if (!window.SaveGate) {
      setStatus('저장 코드 확인 기능을 불러오지 못했습니다. 새로고침해 주세요.');
      return;
    }
    window.SaveGate.require(action, {
      notify: setStatus,
      cancelMessage: '체험 모드입니다. 사진은 저장되지 않았습니다. ("사진 받기"로 잘라낸 사진을 받을 수는 있어요)'
    });
  }

  saveButton.addEventListener('click', function () {
    if (!state.image) return;
    requireCode(function () {
      // 새 창은 사용자 동작 직후에 열어야 팝업 차단을 피한다. 파일 생성은 그다음에 한다.
      window.open(githubUrl('upload', photoPath.replace(/^\//, '').replace(/\/[^/]+$/, '')), '_blank', 'noopener');
      exportBlob().then(function (blob) {
        download(blob);
        setStatus(OUTPUT_NAME + ' 을(를) 내려받았습니다. 열린 GitHub 업로드 화면에 이 파일을 끌어다 놓고 "Commit changes"를 누르세요. ' +
                  '같은 이름의 기존 사진은 새 사진으로 바뀝니다. 배포까지 몇 분 걸립니다.' +
                  (connectButton ? ' 올린 다음 아래 "프로필 설정 연결"도 한 번 해 주세요.' : ''));
      });
    });
  });

  downloadButton.addEventListener('click', function () {
    if (!state.image) return;
    exportBlob().then(function (blob) {
      download(blob);
      setStatus(OUTPUT_NAME + ' 을(를) 내려받았습니다.');
    });
  });

  if (connectButton) {
    connectButton.addEventListener('click', function () {
      requireCode(function () {
        var line = 'image: "' + photoPath + '"';
        window.open(githubUrl('edit', '_data/profile.yml'), '_blank', 'noopener');
        var message = '열린 profile.yml 에서 image: "" 줄을 ' + line + ' 로 바꾸고 Commit 하세요.';
        setStatus(message);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(line).then(function () {
            setStatus(message + ' (바꿀 줄을 복사해 두었습니다)');
          }, function () {});
        }
      });
    });
  }
})();
