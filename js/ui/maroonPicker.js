/* ============================================================
   TOOL — COLOR PICKER DE --maroon
   Cambia en vivo la variable --maroon (stats, eyebrows,
   wordmark em, botones sólidos) y persiste en localStorage.
============================================================ */

(function () {
  var STORAGE_KEY = 'teseracto-maroon';
  var DEFAULT = '#49111C';

  var picker = document.getElementById('maroonPicker');
  if (!picker) return;

  /* Restaurar valor guardado */
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      picker.value = saved;
      document.documentElement.style.setProperty('--maroon', saved);
    }
  } catch (e) { /* localStorage no disponible */ }

  picker.addEventListener('input', function () {
    document.documentElement.style.setProperty('--maroon', picker.value);
    try {
      localStorage.setItem(STORAGE_KEY, picker.value);
    } catch (e) { /* ignorar */ }
  });
})();
