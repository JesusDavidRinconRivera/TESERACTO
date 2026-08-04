/* ============================================================
   CUBE — ANIMACIÓN
============================================================ */

import CONSTANTS from '../config/constants.js';
import { easeOutCubic, progressAt } from '../utils/math.js';

const DRAW_TIME = CONSTANTS.DRAW_TIME;
const GAP_TIME = CONSTANTS.GAP_TIME;

// Tiempos de cada fase
const P0 = 0;
const P1 = DRAW_TIME + GAP_TIME;
const P2 = 2 * (DRAW_TIME + GAP_TIME);
const P3 = 3 * (DRAW_TIME + GAP_TIME);
const P4 = 4 * (DRAW_TIME + GAP_TIME);
const P5 = 5 * (DRAW_TIME + GAP_TIME);
const P6 = 6 * (DRAW_TIME + GAP_TIME);
const P7 = 7 * (DRAW_TIME + GAP_TIME);

export const TOTAL_END = P7 + DRAW_TIME;

/**
 * Anima las aristas del cubo
 * @param {array} edges - Array de aristas
 * @param {number} t - Tiempo actual
 */
export function animateEdges(edges, t) {
  edges.forEach((edge, i) => {
    const startTime = i < 3 ? P0 : P1;
    const progress = progressAt(t, startTime, DRAW_TIME);
    edge.mesh.scale.x = Math.max(progress * edge.length, 0.0001);
  });
}

/**
 * Anima las líneas centrales
 * @param {array} centerLines - Array de líneas centrales
 * @param {number} t - Tiempo actual
 */
export function animateCenterLines(centerLines, t) {
  centerLines.forEach((line) => {
    const p = progressAt(t, P2, DRAW_TIME);
    line.mesh.scale.x = Math.max(p * line.length, 0.0001);
  });
}

/**
 * Anima las líneas de muesca (notch lines)
 * @param {array} notchLines - Array de líneas de muesca
 * @param {number} t - Tiempo actual
 */
export function animateNotchLines(notchLines, t) {
  notchLines.forEach((nl) => {
    const p = progressAt(t, P3, DRAW_TIME);
    nl.mesh.scale.x = Math.max(p * nl.length, 0.0001);
  });
}

/**
 * Anima las líneas de cierre
 * @param {array} closingLines - Array de líneas de cierre
 * @param {number} t - Tiempo actual
 */
export function animateClosingLines(closingLines, t) {
  closingLines.forEach((cl) => {
    const p = progressAt(t, P4, DRAW_TIME);
    cl.mesh.scale.x = Math.max(p * cl.length, 0.0001);
  });
}

/**
 * Anima las líneas Y interiores
 * @param {array} innerYLines - Array de líneas Y
 * @param {number} t - Tiempo actual
 */
export function animateInnerYLines(innerYLines, t) {
  innerYLines.forEach((yl) => {
    const p = progressAt(t, P5, DRAW_TIME);
    const scaleX = Math.max(p * yl.length, 0.0001);
    yl.meshA.scale.x = scaleX;
    yl.meshB.scale.x = scaleX;
  });
}

/**
 * Anima las líneas cruzadas de cierre
 * @param {array} closingDoubleLines - Array de líneas cruzadas
 * @param {number} t - Tiempo actual
 */
export function animateClosingDoubleLines(closingDoubleLines, t) {
  closingDoubleLines.forEach((cdl) => {
    const p = progressAt(t, P6, DRAW_TIME);
    cdl.mesh.scale.x = Math.max(p * cdl.length, 0.0001);
  });
}

/**
 * Anima el relleno de caras
 * @param {array} faceFillMeshes - Array de mallas de caras
 * @param {number} t - Tiempo actual
 */
export function animateFaceFills(faceFillMeshes, t) {
  const p7 = progressAt(t, P7, DRAW_TIME);
  faceFillMeshes.forEach((f) => {
    f.mesh.material.opacity = p7;
  });
}

/**
 * Ejecuta la animación completa del cubo
 * @param {object} allElements - Objeto con todos los elementos del cubo
 * @param {number} t - Tiempo actual
 */
export function animateAllCubeElements(allElements, t) {
  const {
    edges, centerLines, notchLines, closingLines,
    innerYLines, closingDoubleLines, faceFillMeshes,
  } = allElements;

  animateEdges(edges, t);
  animateCenterLines(centerLines, t);
  animateNotchLines(notchLines, t);
  animateClosingLines(closingLines, t);
  animateInnerYLines(innerYLines, t);
  animateClosingDoubleLines(closingDoubleLines, t);
  animateFaceFills(faceFillMeshes, t);
}
