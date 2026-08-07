/* ============================================================
   APP — CONTROLADOR PRINCIPAL
============================================================ */

import { initCube } from './cube/cube.js';
import { initHeroLogoReveal } from './brand/heroLogoReveal.js';
import { initHeroBackground } from './hero/heroBackground.js';
import { initContactForm } from './forms/contactForm.js';
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

    try {
      // Inicializar cube (Three.js)
      initCube();
      console.log('[TESERACTO] ✓ Cubo inicializado');
    } catch (err) {
      console.warn('[TESERACTO] ✗ Error al inicializar cubo:', err);
    }

    try {
      // Inicializar logo reveal
      initHeroLogoReveal();
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
      // Inicializar contact form
      initContactForm();
      console.log('[TESERACTO] ✓ Formulario de contacto inicializado');
    } catch (err) {
      console.warn('[TESERACTO] ✗ Error al inicializar formulario:', err);
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
  });
}

// Iniciar cuando se cargue el script
initApp();

export default initApp;
