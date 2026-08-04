/* ============================================================
   UI — NAVEGACIÓN MÓVIL
============================================================ */

import CONSTANTS from '../config/constants.js';

/**
 * Inicializa el menú de navegación móvil
 */
export function initMobileNav() {
  const toggle = document.getElementById(CONSTANTS.NAV_TOGGLE_ID);
  const panel = document.getElementById(CONSTANTS.NAV_MOBILE_ID);
  if (!toggle || !panel) return;

  const links = panel.querySelectorAll('a');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
    panel.classList.toggle('is-open', open);
    toggle.classList.toggle('is-active', open);
    document.body.classList.toggle('nav-open', open);
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  window.matchMedia('(min-width: 921px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}
