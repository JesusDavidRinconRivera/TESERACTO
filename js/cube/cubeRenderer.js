/* ============================================================
   CUBE — RENDERIZADOR
============================================================ */

import CONSTANTS from '../config/constants.js';

/**
 * Crea una línea que crece
 * @param {THREE.Scene} scene - Escena
 * @param {THREE.Vector2} start - Punto de inicio
 * @param {THREE.Vector2} dir - Dirección
 * @param {number} length - Longitud
 * @param {number} color - Color (hex)
 * @param {number} thickness - Grosor
 * @returns {THREE.Mesh}
 */
export function makeGrowLine(scene, start, dir, length, color = 0x0A0908, thickness = CONSTANTS.THICKNESS) {
  const geo = new THREE.PlaneGeometry(1, thickness);
  geo.translate(0.5, 0, 0);
  const mat = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(start.x, start.y, 0);
  mesh.rotation.z = Math.atan2(dir.y, dir.x);
  mesh.scale.x = 0.0001;
  scene.add(mesh);
  return mesh;
}

/**
 * Crea una malla de relleno para una cara
 * @param {THREE.Scene} scene - Escena
 * @param {array} points - Puntos de la cara
 * @param {number} color - Color (hex)
 * @returns {THREE.Mesh}
 */
export function createFaceFill(scene, points, color = 0x0A0908) {
  const shape = new THREE.Shape();
  points.forEach((p, i) => {
    i === 0 ? shape.moveTo(p.x, p.y) : shape.lineTo(p.x, p.y);
  });
  shape.closePath();

  const geo = new THREE.ShapeGeometry(shape);
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0, 0.5);
  scene.add(mesh);
  return mesh;
}

/**
 * Crea un relleno opaco blanco para una cara EXTERNA del cubo
 * @param {THREE.Scene} scene - Escena
 * @param {array} points - Puntos de la cara
 * @returns {THREE.Mesh}
 */
export function createOuterFace(scene, points) {
  const shape = new THREE.Shape();
  points.forEach((p, i) => {
    i === 0 ? shape.moveTo(p.x, p.y) : shape.lineTo(p.x, p.y);
  });
  shape.closePath();

  const raw = getComputedStyle(document.documentElement).getPropertyValue('--paper').trim();
  const hex = parseInt(raw.replace('#', ''), 16);

  const geo = new THREE.ShapeGeometry(shape);
  const mat = new THREE.MeshBasicMaterial({
    color: hex,
    transparent: false,
    opacity: 1,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0, -0.5);
  scene.add(mesh);
  return mesh;
}

/**
 * Configura el renderizador Three.js
 * @param {element} mount - Elemento de montaje
 * @param {number} width - Ancho
 * @param {number} height - Alto
 * @returns {THREE.WebGLRenderer}
 */
export function createRenderer(mount, width, height) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  mount.appendChild(renderer.domElement);
  return renderer;
}

/**
 * Configura la cámara ortográfica
 * @param {number} width - Ancho
 * @param {number} height - Alto
 * @returns {THREE.OrthographicCamera}
 */
export function createCamera(width, height) {
  const viewSize = 600;
  const aspect = width / height;

  const camera = new THREE.OrthographicCamera(
    -viewSize * aspect / 2,
    viewSize * aspect / 2,
    viewSize / 2,
    -viewSize / 2,
    0.1,
    100
  );

  camera.position.z = 10;
  return camera;
}
