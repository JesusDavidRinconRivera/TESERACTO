/* ============================================================
   CUBE — RESIZE
============================================================ */

const viewSize = 600;

/**
 * Obtiene el tamaño del contenedor
 * @param {element} mount - Elemento de montaje
 * @returns {object} { w, h }
 */
export function getContainerSize(mount) {
  return {
    w: mount.clientWidth || 150,
    h: mount.clientHeight || 150,
  };
}

/**
 * Maneja el redimensionamiento de la ventana
 * @param {element} mount - Elemento de montaje
 * @param {THREE.OrthographicCamera} camera - Cámara
 * @param {THREE.WebGLRenderer} renderer - Renderizador
 */
export function handleCubeResize(mount, camera, renderer) {
  const { w, h } = getContainerSize(mount);
  const aspect = w / h;

  camera.left = (-viewSize * aspect) / 2;
  camera.right = (viewSize * aspect) / 2;
  camera.top = viewSize / 2;
  camera.bottom = -viewSize / 2;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
}
