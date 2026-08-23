/* ============================================================
   TOOL — COLOR PICKER DE --ember
   Cambia en vivo la variable --ember (focos, eyebrow, iconos,
   hovers de formularios) y persiste en localStorage.
============================================================ */

(function () {
  var STORAGE_KEY = 'teseracto-ember';
  var DEFAULT = '#D6334A';

  var picker = document.getElementById('emberPicker');
  if (!picker) return;

  /* Restaurar valor guardado */
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      picker.value = saved;
      document.documentElement.style.setProperty('--ember', saved);
    }
  } catch (e) { /* localStorage no disponible */ }

  picker.addEventListener('input', function () {
    document.documentElement.style.setProperty('--ember', picker.value);
    try {
      localStorage.setItem(STORAGE_KEY, picker.value);
    } catch (e) { /* ignorar */ }
  });
})();
