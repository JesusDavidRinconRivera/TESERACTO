/* ============================================================
   BRAND — HERO LOGO REVEAL
============================================================ */

import CONSTANTS from '../config/constants.js';
import { prefersReducedMotion } from '../utils/helpers.js';
import { addClass } from '../utils/dom.js';
import { TOTAL_END } from '../cube/cubeAnimation.js';

/**
 * Inicializa la revelación del logo en el hero
 * (Nota: La lógica principal está en cube.js, pero esta función
 * puede usarse para ajustes adicionales si es necesario)
 */
export function initHeroLogoReveal() {
  const logoRow = document.getElementById(CONSTANTS.LOGO_ROW_ID);
  if (!logoRow) return;

  const reducedMotion = prefersReducedMotion();
  const revealDelayMs = reducedMotion ? 60 : (TOTAL_END * 1000 + CONSTANTS.REVEAL_DELAY_MS);

  // Inicializa el timeout
  setTimeout(() => {
    addClass(logoRow, CONSTANTS.LOGO_ROW_ASSEMBLED_CLASS);
  }, revealDelayMs);
}
