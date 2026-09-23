/*
  카테고리 사이드바 접기/펼치기.

  - 데스크톱(>= 1100px): 사이드바를 접으면 레이아웃에서 빠지고 main 이 넓어진다.
    상태는 localStorage('sidebar') 에 저장해 페이지를 이동해도 유지한다.
  - 그보다 좁은 화면: 사이드바는 drawer 로 열고 닫는다. (상태 저장 없음)
*/
(function () {
  var root = document.documentElement;
  var desktop = window.matchMedia('(min-width: 1100px)');
  var toggles = document.querySelectorAll('[data-sidebar-toggle]');
  var closers = document.querySelectorAll('[data-sidebar-close]');
  var backdrop = document.querySelector('.sidebar-backdrop');

  function isExpanded() {
    return desktop.matches
      ? !root.classList.contains('sidebar-collapsed')
      : root.classList.contains('sidebar-open');
  }

  function sync() {
    var expanded = isExpanded();
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].setAttribute('aria-expanded', String(expanded));
    }
    if (backdrop) backdrop.hidden = desktop.matches || !expanded;
  }

  function setDrawer(open) {
    root.classList.toggle('sidebar-open', open);
    sync();
  }

  function toggle(event) {
    // 더블클릭의 두 번째 click 은 무시한다. (접힘 전환 중인 버튼이 한 번 더 눌려 곧바로 다시 펼쳐지는 것을 방지)
    // 키보드로 누른 경우 detail 은 0 이므로 영향이 없다.
    if (event && event.detail > 1) return;
    if (desktop.matches) {
      var collapsed = root.classList.toggle('sidebar-collapsed');
      try {
        localStorage.setItem('sidebar', collapsed ? 'collapsed' : 'expanded');
      } catch (e) {}
      sync();
    } else {
      setDrawer(!root.classList.contains('sidebar-open'));
    }
  }

  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', toggle);
  }

  for (var j = 0; j < closers.length; j++) {
    closers[j].addEventListener('click', function () { setDrawer(false); });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && root.classList.contains('sidebar-open')) {
      setDrawer(false);
    }
  });

  // 화면 폭이 데스크톱 기준을 넘나들면 열려 있던 drawer 는 닫는다.
  var onChange = function () { setDrawer(false); };
  if (desktop.addEventListener) {
    desktop.addEventListener('change', onChange);
  } else if (desktop.addListener) {
    desktop.addListener(onChange);
  }

  sync();

  // 방명록 입력 글자 수 표시 (저장 기능은 아직 없다)
  var guestbookInput = document.querySelector('[data-guestbook-input]');
  var guestbookCount = document.querySelector('[data-guestbook-count]');
  if (guestbookInput && guestbookCount) {
    guestbookInput.addEventListener('input', function () {
      guestbookCount.textContent = guestbookInput.value.length + '/' + guestbookInput.maxLength;
    });
  }
})();
