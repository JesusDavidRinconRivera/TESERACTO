/* ============================================================
   UI — NAV SCROLLSPY / GOTA
   Indicador de sección activa con forma de "gota": se estira al
   hacer scroll y termina en una punta fina. Si el scroll queda a
   medias, la gota se recoge sola a su posición.

   La gota es un <svg class="nav-indicator"> que ocupa todo el
   navbar; cada frame se redibuja su <path> (curva de Béisbol/óvalo
   con cola afinada). Los enlaces se marcan con .is-active cuando la
   gota los cubre.
============================================================ */

export function initNavScrollSpy() {
  var nav = document.querySelector('nav.wrap');
  if (!nav) return;

  var navLeft = nav.querySelector('.nav-left');
  var links = Array.prototype.slice.call(nav.querySelectorAll('.navlinks a'));
  var mobileQuery = window.matchMedia('(max-width: 920px)');
  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var targets = [], boxes = [], stops = [];

  function collectTargets() {
    targets = [];
    if (navLeft) targets.push(navLeft);
    if (!mobileQuery.matches) targets = targets.concat(links);
  }
  collectTargets();
  if (!targets.length) return;

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var indicator = document.createElementNS(SVG_NS, 'svg');
  indicator.setAttribute('class', 'nav-indicator');
  indicator.setAttribute('aria-hidden', 'true');
  /* Degradado vertical: --maroon-2 (más claro) arriba y --maroon abajo */
  var defs = document.createElementNS(SVG_NS, 'defs');
  var grad = document.createElementNS(SVG_NS, 'linearGradient');
  grad.setAttribute('id', 'navBlobGradient');
  grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0');
  grad.setAttribute('x2', '0'); grad.setAttribute('y2', '1');
  [['0', 'var(--maroon-2)'], ['1', 'var(--maroon)']].forEach(function (s) {
    var stop = document.createElementNS(SVG_NS, 'stop');
    stop.setAttribute('offset', s[0]);
    stop.style.stopColor = s[1];
    grad.appendChild(stop);
  });
  defs.appendChild(grad);
  indicator.appendChild(defs);
  var blob = document.createElementNS(SVG_NS, 'path');
  indicator.appendChild(blob);
  nav.appendChild(indicator);

  /* --- Parámetros --- */
  var PAD_X = 14;          /* relleno horizontal de la burbuja */
  var PAD_Y = 8;           /* relleno vertical */
  var HEAD_SPEED = 29;     /* velocidad del borde de ataque */
  var TAIL_SPEED = 12;     /* velocidad de la cola */
  var MAX_STRETCH = 66;    /* px máximos de estiramiento */
  var MAX_TAPER = 0.5;     /* cuánto se afina la cola (0 a 0.5) */
  var TAPER_DIST = 40;     /* px de estiramiento para el afinado máximo */
  var IDLE_MS = 600;       /* ms sin scroll para considerar que se detuvo */
  var RELEASE_SPEED = 15;  /* velocidad de recogida */
  var DAMPING = 0.65;      /* rebote al asentarse (efecto elástico líquido):
                              1 = sin rebote, 0.5 = rebote marcado, 0.8 = muy sutil.
                              Ajusta este único valor para afinar el efecto. */

  var anchor = 0, dir = 1;
  var des = { L: 0, R: 0, H: 0, C: 0 };
  var cur = { L: 0, R: 0, H: 0, C: 0 };
  var vel = { L: 0, R: 0, H: 0, C: 0 };   /* velocidad de cada valor (resorte) */
  var raf = 0, lastT = 0, ticking = false;
  var released = false;    /* true = scroll detenido a medias: la gota vuelve al ancla */
  var idleTimer = 0;
  var navigating = false;  /* true = clic en un enlace: la gota va directo al destino */
  var navTarget = 0;       /* índice del enlace clicado */

  function measure() {
    var nr = nav.getBoundingClientRect();
    boxes = targets.map(function (el) {
      var r = el.getBoundingClientRect();
      return {
        l: r.left - nr.left - PAD_X, r: r.right - nr.left + PAD_X,
        tl: r.left - nr.left, tr: r.right - nr.left,
        cy: r.top - nr.top + r.height / 2, h: r.height + PAD_Y * 2
      };
    });
    computeStops();
  }

  function computeStops() {
    var doc = document.documentElement;
    var scrollMax = Math.max(0, (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight);
    var y = window.pageYOffset || doc.scrollTop || 0;
    var last = targets.length - 1, missing = false;
    stops = targets.map(function (el) {
      if (el === navLeft) return 0;
      var href = el.getAttribute('href') || '';
      var sec = href.length > 1 && href.charAt(0) === '#' ? document.getElementById(href.slice(1)) : null;
      if (!sec) { missing = true; return 0; }
      return Math.max(0, Math.min(scrollMax, sec.getBoundingClientRect().top + y));
    });
    if (missing) stops = targets.map(function (el, i) { return last > 0 ? scrollMax * i / last : 0; });
    for (var i = 1; i < stops.length; i++) if (stops[i] <= stops[i - 1] + 1) stops[i] = stops[i - 1] + 1;
  }

  function getProgress() {
    var doc = document.documentElement;
    var y = window.pageYOffset || doc.scrollTop || 0;
    var last = stops.length - 1;
    if (last <= 0 || y <= stops[0]) return 0;
    if (y >= stops[last]) return last;
    for (var i = 0; i < last; i++) {
      if (y < stops[i + 1]) {
        if (y - stops[i] <= 2) return i;
        if (stops[i + 1] - y <= 2) return i + 1;
        return i + (y - stops[i]) / (stops[i + 1] - stops[i]);
      }
    }
    return last;
  }

  function retarget() {
    var last = targets.length - 1;
    var p = getProgress();

    if (reduceQuery.matches) {
      var ri = Math.round(p);
      anchor = ri;
      var b = boxes[ri];
      des.L = b.l; des.R = b.r; des.H = b.h; des.C = b.cy;
      return;
    }

    if (Math.abs(p - anchor) >= 1) anchor = p > anchor ? Math.floor(p) : Math.ceil(p);

    var diff = p - anchor;
    if (diff > 0) dir = 1; else if (diff < 0) dir = -1;
    var t = Math.abs(diff);
    if (released) t = 0;                       /* scroll incompleto: sin estiramiento */
    var next = anchor + dir;
    if (next < 0 || next > last) { next = anchor; t = 0; }

    var a = boxes[anchor], n = boxes[next];
    var ease = 1 - (1 - t) * (1 - t);
    if (dir > 0) {
      des.L = a.l;
      des.R = a.r + Math.min(MAX_STRETCH, Math.max(0, n.r - a.r)) * ease;
    } else {
      des.R = a.r;
      des.L = a.l - Math.min(MAX_STRETCH, Math.max(0, a.l - n.l)) * ease;
    }
    des.H = a.h;
    des.C = a.cy;
  }

  /* Dibuja la gota: cabeza con alto completo y cola más delgada */
  function render() {
    var a = boxes[anchor];
    var elong = Math.max(0, (cur.R - cur.L) - (a.r - a.l));
    var stretch = reduceQuery.matches ? 0 : Math.min(1, elong / TAPER_DIST);
    indicator.style.setProperty('--glow', stretch.toFixed(3));   /* la sombra crece al estirarse */
    var taper = stretch * stretch * (3 - 2 * stretch) * MAX_TAPER;

    var hHead = Math.max(1, cur.H / 2);
    var hTail = hHead * (1 - taper);
    var hl = dir > 0 ? hTail : hHead;
    var hr = dir > 0 ? hHead : hTail;

    var w = cur.R - cur.L;
    if (w < hl + hr) { var sc = Math.max(0.01, w / (hl + hr)); hl *= sc; hr *= sc; }

    var cy = cur.C, xl = cur.L + hl, xr = cur.R - hr, mid = (xl + xr) / 2;
    blob.setAttribute('d',
      'M' + xl + ' ' + (cy - hl) +
      ' C' + mid + ' ' + (cy - hl) + ' ' + mid + ' ' + (cy - hr) + ' ' + xr + ' ' + (cy - hr) +
      ' A' + hr + ' ' + hr + ' 0 0 1 ' + xr + ' ' + (cy + hr) +
      ' C' + mid + ' ' + (cy + hr) + ' ' + mid + ' ' + (cy + hl) + ' ' + xl + ' ' + (cy + hl) +
      ' A' + hl + ' ' + hl + ' 0 0 1 ' + xl + ' ' + (cy - hl) + ' Z');

    for (var i = 0; i < targets.length; i++) {
      /* El texto cambia de color cuando la gota cubre ~el 65% central del enlace,
         no al cubrirlo entero: así la transición de .25s termina justo cuando
         la gota llega, en vez de ir con retraso. */
      var bx = boxes[i];
      var inset = (bx.tr - bx.tl) * 0.35;
      targets[i].classList.toggle('is-active', cur.L <= bx.tl + inset && cur.R >= bx.tr - inset);
    }
  }

  /* Un paso de resorte amortiguado: omega = frecuencia, zeta = amortiguación */
  function spring(key, omega, zeta, h) {
    var acc = omega * omega * (des[key] - cur[key]) - 2 * zeta * omega * vel[key];
    vel[key] += acc * h;
    cur[key] += vel[key] * h;
  }

  function step(now) {
    raf = 0;
    var dt = Math.min(0.05, ((now - lastT) / 1000) || 0.016);
    lastT = now;

    /* Resorte amortiguado: la cabeza y la cola tienen frecuencias distintas
       (HEAD_SPEED / TAIL_SPEED), y DAMPING < 1 hace que se pasen un poco del
       destino y vuelvan, como una gota que se asienta. */
    var wHead = reduceQuery.matches ? 60 : (released ? RELEASE_SPEED : HEAD_SPEED);
    var wTail = reduceQuery.matches ? 60 : TAIL_SPEED;
    var zeta = reduceQuery.matches ? 1 : DAMPING;
    var wL = dir > 0 ? wTail : wHead;
    var wR = dir > 0 ? wHead : wTail;

    var n = Math.ceil(dt * 120), h = dt / n;   /* sub-pasos para mantener la estabilidad */
    for (var s = 0; s < n; s++) {
      spring('L', wL, zeta, h);
      spring('R', wR, zeta, h);
      spring('H', wHead, zeta, h);
      spring('C', wHead, zeta, h);
    }

    var settled =
      Math.abs(des.L - cur.L) < 0.05 && Math.abs(des.R - cur.R) < 0.05 &&
      Math.abs(des.H - cur.H) < 0.05 && Math.abs(des.C - cur.C) < 0.05 &&
      Math.abs(vel.L) < 0.5 && Math.abs(vel.R) < 0.5 &&
      Math.abs(vel.H) < 0.5 && Math.abs(vel.C) < 0.5;
    if (settled) {
      cur.L = des.L; cur.R = des.R; cur.H = des.H; cur.C = des.C;
      vel.L = vel.R = vel.H = vel.C = 0;
      render();
    } else {
      render();
      raf = window.requestAnimationFrame(step);
    }
  }

  function kick() {
    if (raf) return;
    lastT = performance.now();
    raf = window.requestAnimationFrame(step);
  }

  function snap() {
    cur.L = des.L; cur.R = des.R; cur.H = des.H; cur.C = des.C;
    render();
    indicator.style.opacity = '1';
  }

  function update() {
    ticking = false;
    if (navigating) {
      /* Durante el scroll suave la gota ya viaja directo al destino: se ignoran
         las secciones intermedias hasta que el scroll llega a su destino. */
      if (Math.abs(getProgress() - navTarget) > 0.001) return;
      navigating = false;
    }
    retarget();
    kick();
  }

  /* El usuario dejó de hacer scroll: la gota se recoge a su posición */
  function onIdle() {
    navigating = false;
    released = true;
    retarget();
    kick();
  }

  function onScroll() {
    released = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(onIdle, IDLE_MS);
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  function onResize() {
    navigating = false;
    collectTargets(); measure(); anchor = 0; released = false; retarget(); snap();
  }

  /* Cambió la altura del contenido (imágenes que cargan tarde, acordeones,
     contenido dinámico...): se recalculan las posiciones de las secciones sin
     reiniciar la gota. Se agrupa en un solo frame para no medir en exceso. */
  var contentRaf = 0;
  function onContentChange() {
    if (contentRaf) return;
    contentRaf = window.requestAnimationFrame(function () {
      contentRaf = 0;
      measure();
      retarget();
      kick();
    });
  }

  /* Clic en un enlace: la gota viaja directo hasta él en un solo movimiento
     fluido (cabeza adelante, cola siguiéndola), sin saltar por los enlaces
     intermedios mientras el scroll suave recorre las secciones. */
  function goTo(el) {
    var i = targets.indexOf(el);
    if (i < 0 || reduceQuery.matches) return;
    var b = boxes[i];
    navigating = true;
    navTarget = i;
    released = false;
    anchor = i;
    if (b.l + b.r > cur.L + cur.R) dir = 1;
    else if (b.l + b.r < cur.L + cur.R) dir = -1;
    des.L = b.l; des.R = b.r; des.H = b.h; des.C = b.cy;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(onIdle, IDLE_MS);   /* por si el clic no genera scroll */
    kick();
  }

  [navLeft].concat(links).forEach(function (el) {
    if (!el) return;
    el.addEventListener('click', function () { goTo(el); });
  });

  /* Scroll explícito en los enlaces internos del header. El logo apunta a "#",
     y en iframes, vistas previas o sitios con <base> ese enlace no siempre
     mueve la página: la gota viajaba al logo y, al no haber scroll, se
     recogía a su posición anterior. Al hacer el scroll aquí, siempre llega. */
  function scrollTargetY(href) {
    if (href === '#') return 0;
    var sec = document.getElementById(href.slice(1));
    if (!sec) return null;
    var doc = document.documentElement;
    var max = Math.max(0, doc.scrollHeight - doc.clientHeight);
    var y = Math.round(sec.getBoundingClientRect().top + (window.pageYOffset || 0));
    return Math.max(0, Math.min(max, y));
  }

  Array.prototype.forEach.call(document.querySelectorAll('header a[href^="#"]'), function (a) {
    a.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var href = a.getAttribute('href');
      var y = scrollTargetY(href);
      if (y === null) return;
      e.preventDefault();
      window.scrollTo({ top: y, behavior: reduceQuery.matches ? 'auto' : 'smooth' });
      try { history.replaceState(null, '', href === '#' ? location.pathname + location.search : href); } catch (err) {}
    });
  });

  /* Si el usuario toma el control del scroll, se cancela el viaje */
  function cancelNav() { navigating = false; }
  window.addEventListener('wheel', cancelNav, { passive: true });
  window.addEventListener('touchmove', cancelNav, { passive: true });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('load', onScroll);
  mobileQuery.addEventListener('change', onResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onResize);

  /* ResizeObserver sobre el body: recalcula computeStops cuando el contenido
     cambia de tamaño, no sólo al redimensionar la ventana o cargar fuentes. */
  if ('ResizeObserver' in window) {
    new ResizeObserver(onContentChange).observe(document.body);
  }

  measure();
  retarget();
  snap();
}
