/* ============================================================
   FORMS — ENVÍO
============================================================ */

/**
 * Envía el formulario al backend
 * @param {HTMLFormElement} form - Elemento del formulario
 * @returns {Promise}
 */
export async function sendForm(form) {
  const formData = new FormData(form);

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json().catch(() => ({ ok: res.ok }));
    return {
      success: data.ok,
      message: data.ok ? 'Solicitud enviada correctamente.' : (data.error || 'Error al enviar.'),
      error: !data.ok,
    };
  } catch (err) {
    return {
      success: false,
      message: 'No pudimos conectar con el servidor. Intenta de nuevo o llámanos.',
      error: true,
    };
  }
}
