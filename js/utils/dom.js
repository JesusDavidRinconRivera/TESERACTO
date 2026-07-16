/* ============================================================
   UTILS — DOM
============================================================ */

/**
 * Selecciona un elemento por ID
 * @param {string} id - ID del elemento
 * @returns {element} Elemento o null
 */
export function getElementById(id) {
  return document.getElementById(id);
}

/**
 * Selecciona elementos por selector
 * @param {string} selector - Selector CSS
 * @param {element} root - Elemento raíz (por defecto document)
 * @returns {array} Array de elementos
 */
export function querySelectorAll(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

/**
 * Agrega una clase a un elemento
 * @param {element} el - Elemento
 * @param {string} className - Nombre de la clase
 */
export function addClass(el, className) {
  if (el) el.classList.add(className);
}

/**
 * Remueve una clase de un elemento
 * @param {element} el - Elemento
 * @param {string} className - Nombre de la clase
 */
export function removeClass(el, className) {
  if (el) el.classList.remove(className);
}

/**
 * Verifica si un elemento tiene una clase
 * @param {element} el - Elemento
 * @param {string} className - Nombre de la clase
 * @returns {boolean}
 */
export function hasClass(el, className) {
  return el && el.classList.contains(className);
}

/**
 * Establece un atributo data en un elemento
 * @param {element} el - Elemento
 * @param {string} key - Nombre del atributo (sin el prefijo 'data-')
 * @param {string} value - Valor
 */
export function setData(el, key, value) {
  if (el) el.dataset[key] = value;
}

/**
 * Obtiene un atributo data de un elemento
 * @param {element} el - Elemento
 * @param {string} key - Nombre del atributo (sin el prefijo 'data-')
 * @returns {string} Valor del atributo
 */
export function getData(el, key) {
  return el ? el.dataset[key] : undefined;
}

/**
 * Establece estilos en línea en un elemento
 * @param {element} el - Elemento
 * @param {object} styles - Objeto con estilos CSS
 */
export function setStyle(el, styles) {
  if (!el) return;
  Object.assign(el.style, styles);
}

/**
 * Obtiene un valor computado de CSS
 * @param {element} el - Elemento
 * @param {string} prop - Propiedad CSS
 * @returns {string} Valor computado
 */
export function getComputedStyle(el, prop) {
  return window.getComputedStyle(el).getPropertyValue(prop);
}
