/* ============================================================
   UI — NAV SCROLL SPY
   Resalta en la barra el enlace de la sección actualmente visible.
   Sincroniza escritorio (.navlinks) y móvil (.nav-mobile).
   En escritorio, una píldora (.nav-indicator) se desliza con
   transición CSS entre los enlaces al cambiar de sección.
============================================================ */

const ACTIVE_CLASS = 'is-active';
const DESKTOP_SELECTOR = '.navlinks';
const PAD_X = 16;   // separación horizontal de la píldora respecto al enlace
const PAD_Y = 8;    // separación vertical de la píldora respecto al enlace

/**
 * Inicializa el scrollspy de la navegación
 */
export function initNavScrollSpy() {
  // Enlaces de sección: los del navlinks y los del menú móvil
  // (se excluye la CTA "Solicitar visita" que también apunta a #contacto)
  const links = Array.from(
    document.querySelectorAll(
      '.navlinks a[href^="#"], .nav-mobile a:not(.nav-mobile-cta)[href^="#"]'
    )
  );
  if (!links.length) return;

  const navlinks = document.querySelector(DESKTOP_SELECTOR);
  const desktopLinks = links.filter((link) => link.closest(DESKTOP_SELECTOR));

  // Mapa secciónId -> enlaces y lista de secciones en orden de documento
  const sections = [];
  const bySection = new Map();

  links.forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (!section) return;
    if (!bySection.has(id)) {
      bySection.set(id, []);
      sections.push(section);
    }
    bySection.get(id).push(link);
  });

  if (!sections.length) return;

  // Píldora indicadora (solo escritorio): un único elemento que se desliza
  let indicator = null;
  if (navlinks) {
    indicator = document.createElement('span');
    indicator.className = 'nav-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    navlinks.appendChild(indicator);
  }

  let currentId = null;
  let ticking = false;

  // Desplazamiento bajo el header sticky para considerar una sección "activa"
  function headerOffset() {
    const header = document.querySelector('header');
    const height = header ? header.getBoundingClientRect().height : 76;
    return height + 16;
  }

  function desktopLinkFor(id) {
    return desktopLinks.find((link) => link.getAttribute('href') === '#' + id) || null;
  }

  // Posiciona la píldora sobre el enlace activo (coordenadas relativas a .navlinks)
  function positionIndicator(id) {
    if (!indicator) return;
    const link = desktopLinkFor(id);
    if (!link) {
      indicator.style.opacity = '0';
      return;
    }
    const navRect = navlinks.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    indicator.style.left = rect.left - navRect.left - PAD_X + 'px';
    indicator.style.top = rect.top - navRect.top - PAD_Y + 'px';
    indicator.style.width = rect.width + PAD_X * 2 + 'px';
    indicator.style.height = rect.height + PAD_Y * 2 + 'px';
    indicator.style.opacity = '1';
  }

  function setActive(id) {
    if (id === currentId) return;
    currentId = id;
    bySection.forEach((list, key) => {
      const active = key === id;
      list.forEach((link) => link.classList.toggle(ACTIVE_CLASS, active));
    });
    positionIndicator(id);
  }

  function update() {
    const offset = headerOffset();
    let activeId = null;

    // La sección activa es la última cuyo borde superior ya superó el offset
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) {
        activeId = section.id;
      }
    }

    ticking = false;
    setActive(activeId);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  function onResize() {
    // Re-coloca la píldora sin esperar a que cambie la sección activa
    if (indicator) positionIndicator(currentId);
    onScroll();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('load', onScroll);
  window.addEventListener('hashchange', update);

  // Re-posicionar cuando las fuentes web terminen de cargar
  // (evita que la píldora quede desalineada por el cambio de métrica)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(onResize);
  }

  // Estado inicial (recargar con ancla, etc.)
  update();
}