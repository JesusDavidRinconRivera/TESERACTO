/* ============================================================
   BRAND — RESET COLOR
============================================================ */

import CONSTANTS from '../config/constants.js';
import { applyBrandColor } from '../utils/colors.js';

/**
 * Inicializa el botón de reseteo de color
 */
export function initBrandReset() {
  const resetBtn = document.getElementById(CONSTANTS.COLOR_RESET_BTN_ID);
  const picker = document.getElementById(CONSTANTS.BRAND_COLOR_PICKER_ID);

  if (!resetBtn || !picker) return;

  resetBtn.addEventListener('click', () => {
    picker.value = CONSTANTS.DEFAULT_MAROON;
    applyBrandColor(CONSTANTS.DEFAULT_MAROON);
  });
}
