/* ============================================================
   FORMS — CONTROLADOR PRINCIPAL
============================================================ */

import CONSTANTS from '../config/constants.js';
import { validateForm } from './validator.js';
import { sendForm } from './sendForm.js';

/**
 * Inicializa el formulario de contacto
 */
export function initContactForm() {
  const form = document.getElementById(CONSTANTS.CONTACT_FORM_ID);
  const note = document.getElementById(CONSTANTS.FORM_NOTE_ID);

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.submit-btn');
    const originalText = btn.textContent;

    btn.textContent = 'Enviando…';
    btn.disabled = true;

    try {
      if (!validateForm(form)) {
        note.textContent = 'Por favor, completa todos los campos correctamente.';
        return;
      }

      const result = await sendForm(form);

      if (result.success) {
        form.reset();
        note.textContent = '¡Gracias! Tu solicitud fue enviada, te contactaremos pronto.';
      } else {
        note.textContent = result.message;
      }
    } catch (err) {
      note.textContent = 'No pudimos enviar tu solicitud. Intenta de nuevo o llámanos.';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}
