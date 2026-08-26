/* ============================================================
   TOOL — COLOR PICKER DE --maroon
   Cambia en vivo la variable --maroon y persiste en localStorage.

   DESCOMENTAR TODO PARA HABILITAR (junto con el HTML en index.html)
=========================================================== */

/*
(function () {
  var STORAGE_KEY = 'teseracto-maroon';
  var DEFAULT = '#49111C';

  var picker = document.getElementById('maroonPicker');
  if (!picker) return;

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      picker.value = saved;
      document.documentElement.style.setProperty('--maroon', saved);
    }
  } catch (e) { }

  picker.addEventListener('input', function () {
    document.documentElement.style.setProperty('--maroon', picker.value);
    try {
      localStorage.setItem(STORAGE_KEY, picker.value);
    } catch (e) { }
  });
})();
*/
