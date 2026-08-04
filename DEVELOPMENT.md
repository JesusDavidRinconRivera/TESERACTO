# Guía de Desarrollo - TESERACTO

## Estructura CSS (ITCSS)

### 1. Base
- **reset.css**: Reseteo global, box-sizing, selección
- **variables.css**: Tokens de diseño (colores, tipografía, espacios)
- **typography.css**: Estilos tipográficos
- **global.css**: Clases globales reutilizables
- **animations.css**: Keyframes y animaciones

### 2. Layout
- **header.css**: Navegación sticky, brand color picker
- **hero.css**: Sección hero, logo reveal, cubo canvas
- **sections.css**: Franja de cifras, servicios, proceso, visión/misión
- **footer.css**: Pie de página
- **responsive.css**: Media queries consolidadas

### 3. Components
- **buttons.css**: .btn, .btn-solid, .btn-outline, .btn-phone, .btn-cta-nav
- **cards.css**: .pillar-card, .tp-card
- **badges.css**: .h-badge, .hero-badges
- **forms.css**: .contact-grid, .contact-form, .field, .contact-line
- **grid.css**: .wrap, .grid-field
- **logo.css**: .logo-lockup, .cube-canvas-mark, .cube-glow, .wm-full

### 4. Themes
- **dark.css**: Variantes de tema (futuro)

## Estructura JavaScript (Modular ES6)

### Configuración
- **config/constants.js**: Selectores, IDs, rutas, tiempos

### Utilidades
- **utils/colors.js**: hexToHsl, hslToHex, applyBrandColor
- **utils/math.js**: easeOutCubic, progressAt, rotateVec, clamp
- **utils/dom.js**: addClass, removeClass, querySelector helpers
- **utils/helpers.js**: prefersReducedMotion, delay, onReady, log

### Módulos
- **cube/**: Cubo 3D con Three.js
  - `cube.js`: Orquestador (init)
  - `cubeGeometry.js`: Definiciones geométricas
  - `cubeRenderer.js`: Setup de Three.js
  - `cubeAnimation.js`: Animación frame-by-frame
  - `cubeResize.js`: Manejo de responsividad

- **brand/**: Sistema de marca
  - `brandColorPicker.js`: Selector interactivo
  - `brandReset.js`: Reset a color default
  - `heroLogoReveal.js`: Trigger de animación

- **hero/**: Sección hero
  - `heroBackground.js`: Carga condicional de fondo

- **forms/**: Formularios
  - `contactForm.js`: Orquestador del formulario
  - `validator.js`: Validación de campos
  - `sendForm.js`: Envío AJAX

- **ui/**: Interfaz de usuario
  - `revealOnScroll.js`: Efecto reveal
  - `observer.js`: Intersection Observer setup
  - `animations.js**: Placeholder para lógica de animaciones

- **app.js**: Orquestador principal

## Convenciones

### Clases CSS
- Usa kebab-case: `.btn-primary`, `.hero-section`
- Prefijos de contexto: `.on-void`, `.on-paper`, `.on-brand`
- Usa BEM cuando sea apropiado: `.card__title`, `.btn--large`

### JavaScript
- Usa camelCase para funciones y variables: `initCube()`, `applyBrandColor`
- Funciones export deben tener prefijo clear: `init*`, `get*`, `set*`, etc.
- Nombres descriptivos y comentarios de bloque

### Colores
- Define en variables.css y úsalas en todo el proyecto
- Usa CSS custom properties: `var(--maroon)`
- Nunca hardcodees colores en componentes

## Agregar Nuevas Secciones

### Paso 1: Crear módulo CSS
```
assets/css/layout/mi-seccion.css
```

### Paso 2: Importar en HTML
```html
<link rel="stylesheet" href="assets/css/layout/mi-seccion.css">
```

### Paso 3: Agregar HTML en index.html
```html
<section class="mi-seccion on-paper">
  <!-- contenido -->
</section>
```

### Paso 4: Si necesita JS
```
js/mi-seccion/init.js
```

### Paso 5: Importar y usar en app.js
```javascript
import { initMiSeccion } from './mi-seccion/init.js';

// En initApp():
initMiSeccion();
```

## Testing y Debugging

### Ver logs en consola
```javascript
// Los módulos usan console directamente
// Busca "[TESERACTO]" en consola del navegador
```

### Inspeccionar Cubo
```javascript
// En DevTools, accede a:
window.THREE // Verifica Three.js
document.getElementById('cubeCanvasMount') // Canvas del cubo
```

### Validar Formulario
```javascript
// En app.js está el handler completo del form
// Busca validateForm() en js/forms/validator.js
```

## Rendimiento

- Cubo 3D usa requestAnimationFrame para suavidad
- Intersection Observer solo observa elementos necesarios
- CSS animations prefieren transforms y opacity
- Lazy loading de imágenes de fondo

## Accesibilidad

- Respeta `prefers-reduced-motion`
- Usa aria-labels donde es necesario
- Contraste de colores cumple WCAG AA
- Navegación teclado-friendly

---

**Última actualización: 2026**
