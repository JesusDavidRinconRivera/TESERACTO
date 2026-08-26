# TESERACTO — Mantenimiento y Software para Empresas

Sitio web moderno y responsivo para la empresa de mantenimiento e infraestructura TESERACTO.  
Versión actual: **v1.4.16** (rama `Experimentos-Front`)

## Estructura del Proyecto

```
TESERACTO/
├── index.html                    # Página principal
├── paleta.html                   # Laboratorio de colores (10 contenedores glass)
├── lab-confianza.html            # Laboratorio de tarjetas de confianza (carpetas Windows)
├── README.md
├── VERSIONES.txt                 # Historial de versiones y hashes
├── GUIA_INFRAESTRUCTURA.txt      # Guía técnica del sitio
├── assets/
│   └── css/
│       ├── base/                 # Estilos fundamentales
│       │   ├── reset.css         # Reseteo y box-sizing
│       │   ├── variables.css     # Tokens de diseño (colores, glass, tipografía)
│       │   ├── typography.css    # Tipografía, headings, eyebrows
│       │   ├── global.css        # Estilos globales (.wrap, .section, .section-head)
│       │   └── animations.css    # Reveal on scroll, transiciones
│       ├── layout/               # Componentes de layout
│       │   ├── header.css        # Navbar liquid glass, toggles, progreso scroll
│       │   ├── hero.css          # Hero, cubo, partículas, .hero-area
│       │   ├── sections.css      # Stats glass, servicios transparente
│       │   ├── footer.css        # Pie de página
│       │   └── responsive.css    # Media queries (900px / 560px / 400px)
│       ├── components/           # Componentes reutilizables
│       │   ├── buttons.css       # Botones (CTA nav, teléfono, sólidos)
│       │   ├── cards.css         # Tarjetas de confianza (carpetas Windows)
│       │   ├── badges.css        # Badges (versión, estado)
│       │   ├── forms.css         # Formulario de contacto
│       │   ├── grid.css          # Grid system (.grid-field)
│       │   ├── logo.css          # Logo cubo 3D, wordmark, firma Tech
│       └── tools/                # Herramientas de desarrollo
│           └── ember-picker.css  # Estilos del color picker (comentado)
├── js/
│   ├── app.js                    # Orquestador principal (módulos ES6)
│   ├── cube/                     # Cubo 3D isométrico (Three.js)
│   │   ├── cube.js              # Controlador principal
│   │   ├── cubeGeometry.js      # Definiciones geométricas
│   │   ├── cubeRenderer.js      # Renderización (líneas + rellenos)
│   │   ├── cubeAnimation.js     # Lógica de animación
│   │   └── cubeResize.js        # Manejo de resize
│   ├── brand/                    # Marca
│   │   └── heroLogoReveal.js    # Animación de revelado del logo
│   ├── hero/                     # Hero
│   │   └── heroBackground.js    # Manejo de fondo
│   ├── forms/                    # Formularios
│   │   ├── contactForm.js       # Controlador del formulario
│   │   ├── validator.js         # Validación de campos
│   │   └── sendForm.js          # Envío vía Resend (API)
│   ├── ui/                       # Interfaz de usuario
│   │   ├── revealOnScroll.js    # Efecto reveal on scroll
│   │   ├── animations.js        # Animaciones JS
│   │   ├── observer.js          # Intersection Observer
│   │   ├── mobileNav.js         # Navegación móvil
│   │   ├── navScrollProgress.js # Indicador de scroll (óvalo)
│   │   ├── scrollbarHover.js    # Scrollbar personalizada
│   │   ├── emberPicker.js       # Picker de color --ember (comentado)
│   │   └── maroonPicker.js      # Picker de color --maroon (comentado)
│   ├── utils/                    # Utilidades compartidas
│   │   ├── colors.js            # Funciones de color
│   │   ├── math.js              # Funciones matemáticas
│   │   ├── dom.js               # Helpers del DOM
│   │   └── helpers.js           # Helpers generales
│   └── config/                   # Configuración
│       └── constants.js         # Constantes globales
├── images/
├── icons/
└── fonts/
```

## Sistema de Colores

| Variable | Valor | Uso |
|---|---|---|
| `--void` | `#0A0908` | Negro cálido — fondo primario |
| `--paper` | `#F2F4F3` | Blanco marfil — fondo secundario |
| `--maroon` | `#0E3A8B` | Azul marca — botones, stats, wordmark, encabezados |
| `--maroon-2` | `#154BC2` | Hover / variante clara del azul marca |
| `--ember` | `#D0D0D0` | Gris claro — focos, iconos, eyebrows |
| `--ink` | `#0A0908` | Texto sobre fondo claro |
| `--fog` | `#706A66` | Texto secundario sobre fondo claro |
| `--mist` | `#A9A3A0` | Texto secundario sobre fondo oscuro |

### Glass (Liquid Glass)

| Variable | Valor |
|---|---|
| `--glass-bg` | `rgba(255, 255, 255, 0.45)` |
| `--glass-border` | `rgba(255, 255, 255, 0.3)` |
| `--glass-blur` | `blur(20px)` |
| `--glass-bg-maroon` | `rgba(14, 58, 139, 0.45)` |
| `--glass-border-maroon` | `rgba(14, 58, 139, 0.3)` |

### Transparencias (borders)

| Variable | Valor |
|---|---|
| `--hair-d` | `rgba(242, 244, 243, 0.14)` |
| `--hair-d2` | `rgba(242, 244, 243, 0.30)` |
| `--hair-l` | `rgba(10, 9, 8, 0.14)` |
| `--hair-l2` | `rgba(10, 9, 8, 0.30)` |

## Tipografía

| Fuente | Variable | Uso |
|---|---|---|
| **Unbounded** | `--display` | Títulos, wordmark, números de stats |
| **Inter** | `--body` | Texto general |
| **JetBrains Mono** | `--mono` | Eyebrows, badges, labels, código |

## Dependencias

- **Three.js** (CDN) — Cubo 3D isométrico
- **particles.js** (CDN) — Partículas carmesí en el hero
- **Google Fonts** — Unbounded, Inter, JetBrains Mono

## Características Principales

- Cubo 3D isométrico animado con Three.js
- **Liquid Glass** en navbar, stats y pillar cards (filtro SVG `#glass-distortion` con feTurbulence + feDisplacementMap)
- **Partículas carmesí** en el hero que cubren la zona de servicios
- **Tarjetas de confianza estilo carpetas Windows** (pestaña sobresaliente + iconos flotantes)
- Indicador de scroll (óvalo `--ember`)
- Reveal on scroll con Intersection Observer
- Formulario de contacto con validación y envío vía Resend
- Diseño responsivo (mobile-first, breakpoints: 900px / 560px / 400px)
- Respetuoso con preferencias de movimiento reducido
- Picker de colores `--ember` y `--maroon` (comentado, listo para activar)
- Laboratorio de colores `paleta.html` (10 contenedores glass con pickers y blur)
- Laboratorio de confianza `lab-confianza.html` (carpetas Windows)

## Cómo Usar

### Abrir en navegador
Abre `index.html` en tu navegador o accede vía live-server en LAN.

### Modificar estilos
Edita los archivos en `assets/css/`. Los cambios se reflejan automáticamente con live-server.

### Modificar funcionalidad JS
Edita los módulos en `js/`. Respeta la modularización ES6 actual.

### Activar el color picker
En `index.html`, descomenta:
1. El link CSS en la sección de tools (línea ~88)
2. El bloque HTML + scripts en la sección SCRIPTS (línea ~507)

### Agregar nuevos estilos
Crea un archivo en la carpeta correspondiente e impórtalo en `index.html`.

### Agregar nuevas funciones JS
Crea un módulo en la carpeta correspondiente e importa en `app.js`.

## Flujo de Inicialización

1. DOM cargado
2. `app.js` ejecuta `initApp()`
3. Se inicializan módulos: cubo Three.js, partículas, reveal on scroll, navbar scroll, navegación móvil
4. Registro en consola de cada paso

## Breakpoints Responsivos

- **900px**: Tablets (2 columnas → 1 columna)
- **560px**: Móviles grandes
- **400px**: Móviles pequeños

## Versionado

El proyecto sigue un esquema manual `v1.4.X`:
- **X** se incrementa por cada lote de cambios
- Cada versión incluye: badge en el hero + fila en `VERSIONES.txt` + commit

---

**Desarrollado para TESERACTO © 2026**
