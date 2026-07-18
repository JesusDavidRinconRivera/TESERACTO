# TESERACTO — Mantenimiento y Software para Empresas

Sitio web moderno y responsivo para la empresa de mantenimiento e infraestructura TESERACTO.

## 📁 Estructura del Proyecto

```
TESERACTO/
├── index.html
├── assets/
│   └── css/
│       ├── base/              # Estilos fundamentales
│       │   ├── reset.css      # Reseteo y box-sizing
│       │   ├── variables.css  # Tokens de diseño (colores, tipografía, espacios)
│       │   ├── typography.css # Tipografía y estilos de texto
│       │   ├── global.css     # Estilos globales
│       │   └── animations.css # Animaciones y transiciones
│       ├── layout/             # Componentes de layout
│       │   ├── header.css     # Navegación principal
│       │   ├── hero.css       # Sección hero con cubo
│       │   ├── sections.css   # Secciones de contenido
│       │   ├── footer.css     # Pie de página
│       │   └── responsive.css # Media queries
│       ├── components/         # Componentes reutilizables
│       │   ├── buttons.css    # Botones
│       │   ├── cards.css      # Tarjetas
│       │   ├── badges.css     # Badges
│       │   ├── forms.css      # Formularios
│       │   ├── grid.css       # Grid system
│       │   └── logo.css       # Logo y marca
│       └── themes/             # Temas (oscuro, etc)
│           └── dark.css
├── js/
│   ├── app.js                  # Orquestador principal
│   ├── cube/                   # Módulo de cubo 3D
│   │   ├── cube.js            # Controlador principal
│   │   ├── cubeGeometry.js    # Definiciones geométricas
│   │   ├── cubeRenderer.js    # Renderización Three.js
│   │   ├── cubeAnimation.js   # Lógica de animación
│   │   └── cubeResize.js      # Manejo de resize
│   ├── brand/                  # Módulo de marca
│   │   ├── brandColorPicker.js # Selector de color
│   │   ├── brandReset.js      # Reset de color
│   │   └── heroLogoReveal.js  # Animación de logo
│   ├── hero/                   # Módulo del hero
│   │   └── heroBackground.js  # Manejo de fondo
│   ├── forms/                  # Módulo de formularios
│   │   ├── contactForm.js     # Controlador del formulario
│   │   ├── validator.js       # Validación de campos
│   │   └── sendForm.js        # Envío al backend
│   ├── ui/                     # Módulo de UI
│   │   ├── revealOnScroll.js  # Efecto reveal
│   │   ├── animations.js      # Animaciones JS
│   │   └── observer.js        # Intersection Observer
│   ├── utils/                  # Utilidades compartidas
│   │   ├── colors.js          # Funciones de color
│   │   ├── math.js            # Funciones matemáticas
│   │   ├── dom.js             # Helpers del DOM
│   │   └── helpers.js         # Helpers generales
│   └── config/                 # Configuración
│       └── constants.js       # Constantes globales
├── images/
├── icons/
└── fonts/
```

## 🎨 Sistema de Colores

- **--void**: #0A0908 (negro cálido)
- **--paper**: #F2F4F3 (blanco marfil)
- **--maroon**: #49111C (rojo marca)
- **--ember**: #D6334A (rojo vivo)

## 🔧 Cómo Usar

### 1. Abrir en navegador
Simplemente abre `index.html` en tu navegador.

### 2. Modificar estilos
- Edita los archivos en `assets/css/`
- Los cambios se reflejan automáticamente

### 3. Modificar funcionalidad JS
- Edita los módulos en `js/`
- Respeta la modularización actual

### 4. Agregar nuevos estilos
- Crea un archivo en la carpeta correspondiente (`base/`, `layout/`, `components/`)
- Importa el archivo en `index.html`

### 5. Agregar nuevas funciones JS
- Crea un módulo en la carpeta correspondiente
- Importa en `app.js` e inicializa en `initApp()`

## 📦 Dependencias

- **Three.js** (CDN) - Para el cubo 3D
- **Google Fonts** - Unbounded, Inter, JetBrains Mono

## 🎯 Características Principales

- ✅ Cubo 3D isométrico animado
- ✅ Selector de color de marca en tiempo real
- ✅ Efecto "reveal on scroll" con Intersection Observer
- ✅ Formulario de contacto con validación
- ✅ Diseño responsivo (mobile-first)
- ✅ Respetuoso con preferencias de movimiento reducido
- ✅ Modularización de código para mantenimiento fácil

## 📝 Notas de Desarrollo

- Todos los módulos JS están encapsulados como módulos ES6
- Las constantes están centralizadas en `config/constants.js`
- Las funciones reutilizables están en `utils/`
- Los estilos siguen una metodología ITCSS
- Respeta las preferencias de accesibilidad del usuario

## 🔄 Flujo de Inicialización

1. DOM cargado
2. `app.js` se ejecuta
3. `initApp()` espera `DOMContentLoaded`
4. Se inicializan todos los módulos en orden
5. Registro en consola de cada paso

## 📱 Breakpoints Responsivos

- **920px**: Tablets
- **560px**: Móviles grandes
- **400px**: Móviles pequeños

---

**Desarrollado para TESERACTO © 2026**
