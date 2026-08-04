/* ============================================================
   BRAND — COLOR PICKER
============================================================ */

import CONSTANTS from '../config/constants.js';
import { applyBrandColor } from '../utils/colors.js';

/**
 * Inicializa el selector de color de marca
 */
export function initBrandColorPicker() {
  const picker = document.getElementById(CONSTANTS.BRAND_COLOR_PICKER_ID);
  if (!picker) return;

  picker.addEventListener('input', (e) => {
    applyBrandColor(e.target.value);
  });
}
