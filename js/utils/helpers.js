/* ============================================================
   UTILS — HELPERS
============================================================ */

/**
 * Verifica si el navegador prefiere movimiento reducido
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Espera un cierto tiempo (Promise)
 * @param {number} ms - Milisegundos
 * @returns {Promise}
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Ejecuta una callback cuando el DOM está listo
 * @param {function} callback - Función a ejecutar
 */
export function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

/**
 * Verifica si Three.js está disponible
 * @returns {boolean}
 */
export function hasThree() {
  return typeof THREE !== 'undefined';
}

/**
 * Registra mensajes en consola (con prefijo)
 * @param {string} message - Mensaje
 * @param {string} type - Tipo: 'log', 'warn', 'error'
 */
export function log(message, type = 'log') {
  console[type](`[TESERACTO] ${message}`);
}
