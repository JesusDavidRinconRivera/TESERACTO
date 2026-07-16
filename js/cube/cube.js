/* ============================================================
   CUBE — CONTROLADOR PRINCIPAL
============================================================ */

import CONSTANTS from '../config/constants.js';
import { prefersReducedMotion } from '../utils/helpers.js';
import { hasClass, addClass } from '../utils/dom.js';
import { rotateVec } from '../utils/math.js';

import {
  createVertices, getEdgeOrder, getCenterLineVertexIndices,
  getYArms, getCrossLineSpecs, getFaceDefinitions,
} from './cubeGeometry.js';

import {
  animateAllCubeElements, TOTAL_END,
} from './cubeAnimation.js';

import {
  makeGrowLine, createFaceFill, createRenderer, createCamera,
} from './cubeRenderer.js';

import { getContainerSize, handleCubeResize } from './cubeResize.js';

const LINE_COLOR = new THREE.Color(0x0A0908).getHex();
const NOTCH_ROTATE_DEG = CONSTANTS.NOTCH_ROTATE_DEG;
const NOTCH_LENGTH = CONSTANTS.NOTCH_LENGTH;
const Y_LENGTH_RATIO = CONSTANTS.Y_LENGTH_RATIO;
const Y_LINE_GAP = CONSTANTS.Y_LINE_GAP;
const Y_LINE_THICKNESS = CONSTANTS.Y_LINE_THICKNESS;
const CLOSE_LINE_THICKNESS = CONSTANTS.CLOSE_LINE_THICKNESS;
const CROSS_LINE_LENGTH = CONSTANTS.CROSS_LINE_LENGTH;

/**
 * Inicializa y anima el cubo
 */
export function initCube() {
  const mount = document.getElementById(CONSTANTS.CUBE_CANVAS_MOUNT_ID);
  if (!mount || typeof THREE === 'undefined') return;

  const reducedMotion = prefersReducedMotion();

  // ========== SETUP ==========
  const scene = new THREE.Scene();
  const { w: width, h: height } = getContainerSize(mount);
  const camera = createCamera(width, height);
  const renderer = createRenderer(mount, width, height);

  // ========== GEOMETRÍA ==========
  const vertices = createVertices();
  const edgeOrder = getEdgeOrder();
  const centerLineVertexIndices = getCenterLineVertexIndices();
  const CENTER = new THREE.Vector2(0, 0);

  // ====== ARISTAS ======
  const edges = edgeOrder.map(([iStart, iEnd]) => {
    const start = vertices[iStart];
    const end = vertices[iEnd];
    const dir = new THREE.Vector2(end.x - start.x, end.y - start.y);
    const length = dir.length();
    dir.normalize();
    const mesh = makeGrowLine(scene, start, dir, length);
    return { mesh, length };
  });

  // ====== LÍNEAS CENTRALES ======
  const centerLines = centerLineVertexIndices.map((vIdx) => {
    const start = vertices[vIdx];
    const end = new THREE.Vector2(
      start.x + (CENTER.x - start.x) * 0.5,
      start.y + (CENTER.y - start.y) * 0.5
    );
    const dir = new THREE.Vector2(end.x - start.x, end.y - start.y);
    const length = dir.length();
    dir.normalize();
    const mesh = makeGrowLine(scene, start, dir, length);
    return { mesh, length, endPoint: end, dir: dir.clone() };
  });

  // ====== LÍNEAS DE MUESCA (NOTCH) ======
  const notchLines = centerLines.map((cl, i) => {
    const start = cl.endPoint;
    const notchDir = i === 0
      ? new THREE.Vector2(0, -1)
      : rotateVec(cl.dir, -NOTCH_ROTATE_DEG);
    const mesh = makeGrowLine(scene, start, notchDir, NOTCH_LENGTH);
    const endPoint = new THREE.Vector2(
      start.x + notchDir.x * NOTCH_LENGTH,
      start.y + notchDir.y * NOTCH_LENGTH
    );
    return { mesh, length: NOTCH_LENGTH, endPoint, start: start.clone(), dir: notchDir.clone() };
  });

  // ====== LÍNEAS DE CIERRE ======
  const closingLines = notchLines.map((nl, i) => {
    const targetCenterLine = centerLines[(i + 2) % centerLines.length];
    const start = nl.endPoint;
    const end = targetCenterLine.endPoint;
    const dir = new THREE.Vector2(end.x - start.x, end.y - start.y);
    const length = dir.length();
    dir.normalize();
    const mesh = makeGrowLine(scene, start, dir, length);
    return { mesh, length, start: start.clone(), dir: dir.clone() };
  });

  // ====== CENTROIDE INTERIOR ======
  const innerCentroid = [
    centerLines[0].endPoint,
    notchLines[0].endPoint,
    centerLines[2].endPoint,
    notchLines[2].endPoint,
    centerLines[1].endPoint,
    notchLines[1].endPoint,
  ].reduce((acc, v) => acc.add(v.clone()), new THREE.Vector2(0, 0))
    .multiplyScalar(1 / 6);

  // ====== BRAZOS Y ======
  const yArms = [
    { name: 'arriba_izquierda', target: centerLines[0].endPoint },
    { name: 'abajo', target: centerLines[2].endPoint },
    { name: 'arriba_derecha', target: centerLines[1].endPoint },
  ];

  const innerYLines = yArms.map(({ name, target }) => {
    const start = innerCentroid;
    const fullDir = new THREE.Vector2(target.x - start.x, target.y - start.y);
    const dir = fullDir.clone().normalize();
    const length = fullDir.length() * Y_LENGTH_RATIO;
    const perp = new THREE.Vector2(-dir.y, dir.x).multiplyScalar(Y_LINE_GAP / 2);

    const startA = new THREE.Vector2(start.x + perp.x, start.y + perp.y);
    const startB = new THREE.Vector2(start.x - perp.x, start.y - perp.y);

    const meshA = makeGrowLine(scene, startA, dir, length, LINE_COLOR, Y_LINE_THICKNESS);
    const meshB = makeGrowLine(scene, startB, dir, length, LINE_COLOR, Y_LINE_THICKNESS);

    const endA = new THREE.Vector2(startA.x + dir.x * length, startA.y + dir.y * length);
    const endB = new THREE.Vector2(startB.x + dir.x * length, startB.y + dir.y * length);

    return { name, meshA, meshB, length, startA, startB, endA, endB };
  });

  // ====== LÍNEAS CRUZADAS DE CIERRE ======
  const crossLineSpecs = [
    { name: 'naranja', origin: innerYLines.find(a => a.name === 'arriba_derecha').endA, refDir: centerLines[1].dir, angleDeg: 300 },
    { name: 'morado', origin: innerYLines.find(a => a.name === 'arriba_izquierda').endB, refDir: closingLines[0].dir, angleDeg: 60 },
    { name: 'cian', origin: innerYLines.find(a => a.name === 'arriba_izquierda').endA, refDir: notchLines[0].dir, angleDeg: 360 },
    { name: 'rosa', origin: innerYLines.find(a => a.name === 'abajo').endB, refDir: closingLines[2].dir, angleDeg: 60 },
    { name: 'amarillo_oscuro', origin: innerYLines.find(a => a.name === 'abajo').endA, refDir: centerLines[2].dir, angleDeg: 300 },
    { name: 'cafe', origin: innerYLines.find(a => a.name === 'arriba_derecha').endB, refDir: closingLines[1].dir, angleDeg: 60 },
  ];

  const closingDoubleLines = crossLineSpecs.map(({ name, origin, refDir, angleDeg }) => {
    const dir = rotateVec(refDir, angleDeg);
    const mesh = makeGrowLine(scene, origin, dir, CROSS_LINE_LENGTH, LINE_COLOR, CLOSE_LINE_THICKNESS);
    const endPoint = new THREE.Vector2(
      origin.x + dir.x * CROSS_LINE_LENGTH,
      origin.y + dir.y * CROSS_LINE_LENGTH
    );
    return { name, mesh, length: CROSS_LINE_LENGTH, origin, dir, endPoint };
  });

  // ====== RELLENOS DE CARAS ======
  const faceDefs = getFaceDefinitions();
  const findArm = (name) => innerYLines.find(a => a.name === name);
  const findCross = (name) => closingDoubleLines.find(c => c.name === name);

  const faceFillMeshes = faceDefs.map(({ armA, crossA, armB, crossB }) => {
    const a = findArm(armA);
    const b = findArm(armB);
    const ca = findCross(crossA);
    const cb = findCross(crossB);

    const points = [a.startA, a.endA, ca.endPoint, cb.endPoint, b.endB, b.startB];
    const mesh = createFaceFill(scene, points);
    return { mesh };
  });

  // ========== ANIMACIÓN Y RENDER ==========
  let elapsed = reducedMotion ? TOTAL_END + 1 : 0;
  let lastTimestamp = performance.now();

  // Trigger logo reveal
  const logoRow = document.getElementById(CONSTANTS.LOGO_ROW_ID);
  if (logoRow) {
    const revealDelayMs = reducedMotion ? 60 : (TOTAL_END * 1000 + CONSTANTS.REVEAL_DELAY_MS);
    setTimeout(() => addClass(logoRow, CONSTANTS.LOGO_ROW_ASSEMBLED_CLASS), revealDelayMs);
  }

  const allElements = {
    edges, centerLines, notchLines, closingLines,
    innerYLines, closingDoubleLines, faceFillMeshes,
  };

  function animate() {
    requestAnimationFrame(animate);

    if (!reducedMotion) {
      const now = performance.now();
      elapsed += (now - lastTimestamp) / 1000;
      lastTimestamp = now;
    }

    animateAllCubeElements(allElements, elapsed);
    renderer.render(scene, camera);
  }

  animate();

  // ========== HANDLE RESIZE ==========
  window.addEventListener('resize', () => {
    handleCubeResize(mount, camera, renderer);
  });
}
