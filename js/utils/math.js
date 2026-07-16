/* ============================================================
   UTILS — MATEMÁTICAS
============================================================ */

/**
 * Easing function — ease out cubic
 * @param {number} x - Valor entre 0 y 1
 * @returns {number} Valor easing
 */
export function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

/**
 * Calcula el progreso entre un tiempo inicial y duración
 * @param {number} t - Tiempo actual
 * @param {number} startTime - Tiempo inicial
 * @param {number} duration - Duración
 * @returns {number} Progreso entre 0 y 1
 */
export function progressAt(t, startTime, duration) {
  const localT = t - startTime;
  if (localT <= 0) return 0;
  if (localT >= duration) return 1;
  return easeOutCubic(localT / duration);
}

/**
 * Rota un vector 2D en grados
 * @param {object} v - Vector con propiedades x, y
 * @param {number} deg - Grados a rotar
 * @returns {object} Vector rotado
 */
export function rotateVec(v, deg) {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const x = v.x * cos - v.y * sin;
  const y = v.x * sin + v.y * cos;

  if (typeof v.clone === 'function' && typeof v.set === 'function') {
    const rotated = v.clone();
    rotated.set(x, y);
    return rotated;
  }

  return { x, y };
}

/**
 * Clamp — limita un valor entre min y max
 * @param {number} v - Valor
 * @param {number} min - Mínimo
 * @param {number} max - Máximo
 * @returns {number} Valor limitado
 */
export function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
