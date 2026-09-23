/*
  헤더 프로필 카드 열기/닫기.
  - 아이콘을 다시 누르거나, 카드 바깥을 누르거나, Esc 를 누르면 닫힌다.
  - 카드가 화면 왼쪽 밖으로 나가면 안쪽으로 밀어 넣는다. (좁은 모바일 화면 대비)
*/
(function () {
  var root = document.querySelector('[data-profile]');
  if (!root) return;

  var button = root.querySelector('[data-profile-toggle]');
  var popover = root.querySelector('[data-profile-popover]');
  var EDGE = 12;

  function isOpen() {
    return popover.classList.contains('is-open');
  }

  function place() {
    popover.style.setProperty('--profile-shift', '0px');
    var rect = popover.getBoundingClientRect();
    var shift = 0;
    if (rect.left < EDGE) shift = EDGE - rect.left;
    else if (rect.right > window.innerWidth - EDGE) shift = window.innerWidth - EDGE - rect.right;
    popover.style.setProperty('--profile-shift', shift + 'px');
  }

  function setOpen(open) {
    popover.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    if (open) place();
  }

  button.addEventListener('click', function () {
    setOpen(!isOpen());
  });

  document.addEventListener('click', function (event) {
    if (isOpen() && !root.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (isOpen()) place();
  });
})();
