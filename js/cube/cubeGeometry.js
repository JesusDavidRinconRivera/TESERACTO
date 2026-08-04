/* ============================================================
   CUBE — GEOMETRÍA
============================================================ */

import CONSTANTS from '../config/constants.js';

/**
 * Define los ángulos de los vértices del hexágono isométrico
 * @returns {array} Array de ángulos en grados
 */
export function getVertexAngles() {
  return [90, 30, -30, -90, -150, 150];
}

/**
 * Crea vectores de vértices en 2D
 * @returns {array} Array de THREE.Vector2
 */
export function createVertices() {
  const angles = getVertexAngles();
  return angles.map((a) => {
    const rad = THREE.MathUtils.degToRad(a);
    return new THREE.Vector2(
      Math.cos(rad) * CONSTANTS.HEX_RADIUS,
      Math.sin(rad) * CONSTANTS.HEX_RADIUS
    );
  });
}

/**
 * Define el orden de conexión de aristas (edge order)
 * @returns {array} Array de pares [inicio, fin]
 */
export function getEdgeOrder() {
  return [
    [0, 5], [4, 3], [2, 1],
    [5, 4], [3, 2], [1, 0],
  ];
}

/**
 * Define los índices de vértices para las líneas centrales
 * @returns {array} Array de índices
 */
export function getCenterLineVertexIndices() {
  return [5, 1, 3];
}

/**
 * Define los brazos Y (inner Y lines)
 * @returns {array} Array de objetos con nombre y punto objetivo
 */
export function getYArms(vertices, centerLines) {
  return [
    { name: 'arriba_izquierda', target: centerLines[0].endPoint },
    { name: 'abajo', target: centerLines[2].endPoint },
    { name: 'arriba_derecha', target: centerLines[1].endPoint },
  ];
}

/**
 * Define las especificaciones de líneas cruzadas
 * @returns {array} Array de especificaciones
 */
export function getCrossLineSpecs() {
  return [
    { name: 'naranja', angleDeg: 300 },
    { name: 'morado', angleDeg: 60 },
    { name: 'cian', angleDeg: 360 },
    { name: 'rosa', angleDeg: 60 },
    { name: 'amarillo_oscuro', angleDeg: 300 },
    { name: 'cafe', angleDeg: 60 },
  ];
}

/**
 * Define las especificaciones de caras (faces)
 * @returns {array} Array de definiciones de caras
 */
export function getFaceDefinitions() {
  return [
    { armA: 'arriba_derecha', crossA: 'naranja', armB: 'arriba_izquierda', crossB: 'morado' },
    { armA: 'arriba_izquierda', crossA: 'cian', armB: 'abajo', crossB: 'rosa' },
    { armA: 'abajo', crossA: 'amarillo_oscuro', armB: 'arriba_derecha', crossB: 'cafe' },
  ];
}
