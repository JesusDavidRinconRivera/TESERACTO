/* ============================================================
   APP — CONTROLADOR PRINCIPAL
============================================================ */

import { initCube } from './cube/cube.js';
import { initHeroLogoReveal } from './brand/heroLogoReveal.js';
import { initHeroBackground } from './hero/heroBackground.js';
import { initQuiz } from './forms/quiz.js';
import { initRevealOnScroll } from './ui/revealOnScroll.js';
import { initAnimations } from './ui/animations.js';
import { initMobileNav } from './ui/mobileNav.js';
import { onReady } from './utils/helpers.js';

/**
 * Inicializa toda la aplicación
 */
function initApp() {
  // Esperamos a que el DOM esté completamente cargado
  onReady(() => {
    console.log('[TESERACTO] Inicializando aplicación...');

    // La animación del hero se muestra solo en la primera visita por navegador
    const VISITED_KEY = 'teseracto_visto';
    let isFirstVisit = false;
    try {
      isFirstVisit = localStorage.getItem(VISITED_KEY) === null;
      if (isFirstVisit) {
        localStorage.setItem(VISITED_KEY, '1');
      }
    } catch (err) {
      console.warn('[TESERACTO] No se pudo acceder a localStorage:', err);
    }
    const skipAnimation = !isFirstVisit;
    console.log('[TESERACTO] Primera visita:', isFirstVisit, '| skipAnimation:', skipAnimation);

    try {
      // Inicializar cube (Three.js)
      initCube(skipAnimation);
      console.log('[TESERACTO] ✓ Cubo inicializado');
    } catch (err) {
      console.warn('[TESERACTO] ✗ Error al inicializar cubo:', err);
    }

    try {
      // Inicializar logo reveal
      initHeroLogoReveal(skipAnimation);
      console.log('[TESERACTO] ✓ Logo reveal inicializado');
    } catch (err) {
      console.warn('[TESERACTO] ✗ Error al inicializar logo reveal:', err);
    }

    try {
      // Inicializar hero background
      initHeroBackground();
      console.log('[TESERACTO] ✓ Fondo hero inicializado');
    } catch (err) {
      console.warn('[TESERACTO] ✗ Error al inicializar fondo hero:', err);
    }

    try {
      // Inicializar cuestionario de cotización (6 pasos)
      initQuiz();
      console.log('[TESERACTO] ✓ Cuestionario de cotización inicializado');
    } catch (err) {
      console.warn('[TESERACTO] ✗ Error al inicializar cuestionario:', err);
    }

    try {
      // Inicializar navegación móvil
      initMobileNav();
      console.log('[TESERACTO] ✓ Navegación móvil inicializada');
    } catch (err) {
      console.warn('[TESERACTO] ✗ Error al inicializar navegación móvil:', err);
    }

    try {
      // Inicializar reveal on scroll
      initRevealOnScroll();
      console.log('[TESERACTO] ✓ Reveal on scroll inicializado');
    } catch (err) {
      console.warn('[TESERACTO] ✗ Error al inicializar reveal:', err);
    }

    try {
      // Inicializar animaciones
      initAnimations();
      console.log('[TESERACTO] ✓ Animaciones inicializadas');
    } catch (err) {
      console.warn('[TESERACTO] ✗ Error al inicializar animaciones:', err);
    }

    console.log('[TESERACTO] ✓ Aplicación completamente inicializada');

    // Header glass: agrega clase is-scrolled al hacer scroll
    var header = document.querySelector('header');
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 30) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  });
}

// Iniciar cuando se cargue el script
initApp();

export default initApp;
