# TESERACTO — Mantenimiento y Software para Empresas

Sitio web moderno y responsivo para la empresa de mantenimiento e infraestructura TESERACTO.  
Versión actual: **v1.4.25** (rama `Experimentos-Front`)

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

## Skills usadas en el proyecto

- `ui-ux-pro-max`
- `design-taste-frontend`
- `banner-design`
- `brand`
- `design`
- `design-system`
- `slides`
- `ui-styling`

## Dependencias

- **Three.js** (CDN) — Cubo 3D isométrico
- **particles.js** (CDN) — Partículas carmesí en el hero
- **Google Fonts** — Unbounded, Inter, JetBrains Mono
- **Google Analytics (GA4)** — Medición de tráfico y eventos de conversión (etiqueta gtag `G-QLK7B30SC0` en el `<head>` de todas las páginas: `index.html`, `servicios.html`, `paleta.html`, `lab-confianza.html`, `lab-contacto.html`, `lab-contacto-buena.html`)

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

## ICP — Perfil de Cliente Ideal

> Alineado con el quiz de cotización y las ramas de la página principal.

**Qué es el ICP**: el tipo de empresa que le conviene más a TESERACTO — la que tiene el problema que resolvemos, presupuesto para pagar y más probabilidad de quedarse a largo plazo. Todo el copy, el quiz y las promesas de la web (24/7, respuesta <2h) apuntan a este perfil.

### Perfil central

**Nombre interno**: *"Negocio local en operación con equipos que ya están costando."*

| Atributo | Detalle |
|---|---|
| **Rubro** | Restaurantes/hostelería, farmacias, clínicas, hoteles, comercios, producción de eventos y fundaciones |
| **Ubicación** | Cartagena, Turbaco, Magangué y municipios cercanos |
| **Tamaño** | 5–80 empleados, 1–4 puntos de operación |
| **Infraestructura** | Punto de venta, impresión, red y equipos críticos que no pueden parar |
| **Referencias visibles** | Carmelo Alvis, Club San Sebastián del Pastelillo, Playa Producciones, Fundación Vida Abundante |

### Dolores principales
- Equipos viejos que se caen en horas pico.
- Pagos imprevistos y sobreprecios por urgencia y repuestos.
- No tener visibilidad del estado de sus equipos ("no sé quién responde").
- Coordinar varios proveedores sin resultados.
- Software viejo (o ninguno) que no deja crecer.

### Motivos de compra
- Certeza: respuesta en menos de 2 horas, 24/7.
- Contrato de mantenimiento simple (prevenir = ahorrar).
- Un solo proveedor que les haga mantenimiento y software a la medida.
- Confianza y cercanía local (hablar claro, en persona o virtual).

### Quién decide
El **dueño o gerente local** (no una central corporativa). Valora la confianza, la referencia y la claridad en el precio.

### Señales de encaje (leads ideales)
- Ya pagaron soporte/mantenimiento antes y lo sienten caro o lento.
- Odian el "no tengo a quién llamar" cuando falla algo.
- Crecen y necesitan un solo proveedor (compran mantenimiento + software).
- Están en la zona de cobertura (Cartagena, Turbaco, Magangué).

### Mapeo con el quiz de la página

| Rama del quiz | Necesidad | Perfil asociado |
|---|---|---|
| **Ahorrar dinero** | Detener fugas de gasto en mantenimiento y fallas | Negocio que ya paga demasiado por urgencias |
| **Ganar dinero** | Recuperar ventas perdidas por demoras y modernizar | Negocio en crecimiento con software viejo |
| **Ahorrar tiempo** | Quitar procesos manuales y coordinar menos | Negocio con operación manual y varios proveedores |
| **Quiero crear una aplicación** | Prototipo a medida (web, ERP, automatización, app móvil) | Dueño con idea clara que quiere construir |

Las 4 ramas son matices de un mismo ICP central: un negocio local que necesita que esto funcione para **no perder dinero ni tiempo**.

### Qué NO es nuestro ICP (por ahora)
- Grandes corporaciones con IT interno y procesos de compra largos.
- Clientes fuera de la zona de cobertura sin soporte onsite.
- Empresas que solo quieren una compra puntual barata sin contrato.

---

**Desarrollado para TESERACTO © 2026**
