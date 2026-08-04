/* ============================================================
   UI — OBSERVER (Intersection Observer)
============================================================ */

/**
 * Configura un Intersection Observer para efectos
 * @param {string} selector - Selector CSS de elementos
 * @param {string} visibleClass - Clase a aplicar cuando es visible
 * @param {number} threshold - Umbral de visibilidad (0-1)
 */
export function setupObserver(selector, visibleClass = 'is-visible', threshold = 0.15) {
  const items = document.querySelectorAll(selector);

  if (!('IntersectionObserver' in window)) {
    // Fallback para navegadores sin soporte
    items.forEach((el) => el.classList.add(visibleClass));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add(visibleClass);
        io.unobserve(e.target);
      }
    });
  }, { threshold });

  items.forEach((el) => io.observe(el));
}
