/* ============================================================
   SCROLLBAR HOVER — la scrollbar nativa aparece solo cuando el
   mouse se acerca al borde derecho de la ventana
============================================================ */

(function () {
  var THRESHOLD = 24;
  var root = document.documentElement;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (!canHover.matches) return;

  function show() {
    root.classList.add('show-scrollbar');
  }

  function hide() {
    root.classList.remove('show-scrollbar');
  }

  window.addEventListener('mousemove', function (e) {
    if (e.clientX >= window.innerWidth - THRESHOLD) {
      show();
    } else {
      hide();
    }
  }, { passive: true });

  document.addEventListener('mouseleave', hide);
})();
