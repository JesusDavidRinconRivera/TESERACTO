/* ============================================================
   TOOL — COLOR PICKER DE --ember
   Cambia en vivo la variable --ember y persiste en localStorage.

   DESCOMENTAR TODO PARA HABILITAR (junto con el HTML en index.html)
=========================================================== */

/*
(function () {
  var STORAGE_KEY = 'teseracto-ember';
  var DEFAULT = '#D6334A';

  var picker = document.getElementById('emberPicker');
  if (!picker) return;

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      picker.value = saved;
      document.documentElement.style.setProperty('--ember', saved);
    }
  } catch (e) { }

  picker.addEventListener('input', function () {
    document.documentElement.style.setProperty('--ember', picker.value);
    try {
      localStorage.setItem(STORAGE_KEY, picker.value);
    } catch (e) { }
  });
})();
*/
