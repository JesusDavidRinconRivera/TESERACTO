/* ============================================================
   HERO — FONDO DE IMAGEN
============================================================ */

import CONSTANTS from '../config/constants.js';

/**
 * Inicializa la carga del fondo isométrico del hero
 */
export function initHeroBackground() {
  const img = document.getElementById(CONSTANTS.FONDO_ISO_IMG_ID);
  if (!img) return;

  const candidates = CONSTANTS.FONDO_ISO_FORMATS;
  let i = 0;

  function tryNext() {
    if (i >= candidates.length) {
      img.remove();
      return;
    }
    img.src = candidates[i++];
  }

  img.addEventListener('error', tryNext);
  tryNext();
}
