/* ============================================================
   FORMS — VALIDACIÓN
============================================================ */

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Valida un teléfono (simple)
 * @param {string} phone - Teléfono a validar
 * @returns {boolean}
 */
export function validatePhone(phone) {
  return phone.length >= 7;
}

/**
 * Valida que un campo no esté vacío
 * @param {string} value - Valor a validar
 * @returns {boolean}
 */
export function validateRequired(value) {
  return value && value.trim().length > 0;
}

/**
 * Valida todos los campos del formulario
 * @param {HTMLFormElement} form - Elemento del formulario
 * @returns {boolean}
 */
export function validateForm(form) {
  const nombre = form.querySelector('[name="nombre"]').value;
  const empresa = form.querySelector('[name="empresa"]').value;
  const telefono = form.querySelector('[name="telefono"]').value;
  const correo = form.querySelector('[name="correo"]').value;
  const mensaje = form.querySelector('[name="mensaje"]').value;

  return (
    validateRequired(nombre) &&
    validateRequired(empresa) &&
    validateRequired(telefono) &&
    validateEmail(correo) &&
    validateRequired(mensaje)
  );
}
