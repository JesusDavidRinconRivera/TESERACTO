/* ============================================================
   NAV SCROLL PROGRESS — óvalo que recorre los títulos del navbar
   según el avance del scroll de la página
============================================================ */

(function () {
  var nav = null;
  var bar = null;
  var navLeft = null;
  var targets = [];
  var ticking = false;

  var PAD_X = 14;
  var PAD_Y = 8;

  var mobileQuery = window.matchMedia('(max-width: 920px)');

  function collectTargets() {
    var list = [navLeft];
    if (!mobileQuery.matches) {
      var links = nav.querySelectorAll('.navlinks a');
      for (var i = 0; i < links.length; i++) {
        list.push(links[i]);
      }
    }
    targets = list;
  }

  function rectFor(el) {
    var wrapRect = nav.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    return {
      left: r.left - wrapRect.left - PAD_X,
      top: r.top - wrapRect.top - PAD_Y,
      width: r.width + PAD_X * 2,
      height: r.height + PAD_Y * 2
    };
  }

  function safeRect(r) {
    if (!r || r.width <= 0 || r.height <= 0 || isNaN(r.left) || isNaN(r.width)) {
      return rectFor(navLeft);
    }
    return r;
  }

  function applyRect(r) {
    r = safeRect(r);
    bar.style.left = r.left + 'px';
    bar.style.top = r.top + 'px';
    bar.style.width = r.width + 'px';
    bar.style.height = r.height + 'px';
  }

  function applyProgress() {
    if (!nav || !bar || !navLeft) return;

    var doc = document.documentElement;
    var scrollTop = window.pageYOffset || doc.scrollTop || document.body.scrollTop || 0;
    var scrollMax = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
    var progress = scrollMax > 0 ? Math.max(0, Math.min(1, scrollTop / scrollMax)) : 0;

    if (targets.length === 0) return;

    var last = targets.length - 1;
    var scaled = progress * last;
    var idx = Math.floor(scaled);
    var t = scaled - idx;

    if (t === 0 || idx >= last) {
      applyRect(rectFor(targets[idx]));
      return;
    }

    var from = rectFor(targets[idx]);
    var to = rectFor(targets[idx + 1]);
    applyRect({
      left: from.left + (to.left - from.left) * t,
      top: from.top + (to.top - from.top) * t,
      width: from.width + (to.width - from.width) * t,
      height: from.height + (to.height - from.height) * t
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      applyProgress();
      ticking = false;
    });
  }

  function init() {
    nav = document.querySelector('nav.wrap');
    if (!nav) return;
    bar = nav.querySelector('.nav-scroll-progress');
    navLeft = nav.querySelector('.nav-left');
    if (!bar || !navLeft) return;

    collectTargets();
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', function () {
        collectTargets();
        onScroll();
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', onScroll);
    applyProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
