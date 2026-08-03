/* ============================================================
   FORMS — CONTROLADOR PRINCIPAL
============================================================ */

import CONSTANTS from '../config/constants.js';
import { validateForm } from './validator.js';
import { sendForm } from './sendForm.js';

/**
 * Muestra un mensaje de feedback en el formulario
 * @param {HTMLElement} note - Elemento donde mostrar el mensaje
 * @param {string} text - Texto del mensaje
 * @param {'idle'|'success'|'error'|'loading'} state - Estado visual
 */
function setFormState(note, text, state = 'idle') {
  note.textContent = text;
  note.className = 'form-note';
  if (state !== 'idle') {
    note.classList.add(`form-note--${state}`);
  }
}

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
    btn.classList.add('btn--loading');
    setFormState(note, 'Enviando tu solicitud…', 'loading');

    try {
      if (!validateForm(form)) {
        setFormState(note, 'Por favor, completa todos los campos correctamente.', 'error');
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('btn--loading');
        return;
      }

      const result = await sendForm(form);

      if (result.success) {
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('btn--loading');
        setFormState(note, '¡Solicitud enviada! Te contactaremos pronto.', 'success');
      } else {
        const statusMsg = result.status ? ` — código HTTP ${result.status}` : '';
        setFormState(note, (result.message || 'No se pudo enviar. Intenta de nuevo o llámanos.') + statusMsg, 'error');
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('btn--loading');
      }
    } catch (err) {
      setFormState(note, 'No pudimos enviar tu solicitud. Intenta de nuevo o llámanos.', 'error');
      btn.textContent = originalText;
      btn.disabled = false;
      btn.classList.remove('btn--loading');
    }
  });
}
