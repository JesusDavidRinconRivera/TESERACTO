/* ============================================================
   UI — REVEAL ON SCROLL
============================================================ */

import CONSTANTS from '../config/constants.js';
import { setupObserver } from './observer.js';

/**
 * Inicializa el efecto "reveal on scroll" para elementos con clase .reveal
 */
export function initRevealOnScroll() {
  setupObserver(CONSTANTS.REVEAL_CLASS, CONSTANTS.REVEAL_VISIBLE_CLASS, 0.15);
}
