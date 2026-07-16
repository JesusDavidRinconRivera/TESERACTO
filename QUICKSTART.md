# Quick Start - TESERACTO

## 📂 ¿Qué se creó?

Tu proyecto ha sido **completamente modularizado y organizado** en una estructura profesional. Todos los estilos y scripts están separados por funcionalidad, facilitando el mantenimiento y escalabilidad.

## 🚀 Para empezar

### 1. Abre el sitio
```
Abre: TESERACTO/index.html en tu navegador
```

### 2. Estructura completa creada
```
✅ 15 archivos CSS (base, layout, components, themes)
✅ 18 módulos JavaScript (cube, brand, forms, ui, utils, config)
✅ 1 index.html limpio y modularizado
✅ README.md con documentación completa
✅ DEVELOPMENT.md con guía de desarrollo
```

## 📁 Carpetas Principales

| Carpeta | Uso |
|---------|-----|
| `assets/css/base/` | Estilos fundamentales y reset |
| `assets/css/layout/` | Componentes de layout (header, hero, footer) |
| `assets/css/components/` | Componentes reutilizables |
| `js/cube/` | Cubo 3D con Three.js |
| `js/brand/` | Sistema de marca (color picker) |
| `js/hero/` | Sección hero |
| `js/forms/` | Formulario de contacto |
| `js/ui/` | Elementos de interfaz (reveal on scroll) |
| `js/utils/` | Funciones reutilizables |
| `js/config/` | Constantes globales |

## 🎨 Editar Estilos

### Cambiar un color
```
Abre: assets/css/base/variables.css
Busca: --maroon o --ember
Cambia el valor hex
```

### Editar header
```
Abre: assets/css/layout/header.css
O: assets/css/layout/responsive.css (para mobile)
```

### Agregar botón nuevo
```
Abre: assets/css/components/buttons.css
Crea una nueva clase: .btn-mi-boton
```

## 🔧 Editar Funcionalidad

### Cambiar animación del cubo
```
Edita: js/cube/cubeAnimation.js
Funciones: animateEdges(), animateCenterLines(), etc.
```

### Cambiar validación del formulario
```
Edita: js/forms/validator.js
Funciones: validateEmail(), validateRequired(), etc.
```

### Agregar nueva sección
1. Crea CSS en `assets/css/layout/`
2. Importa en `index.html`
3. Agrega HTML en `index.html`
4. Si necesita JS, crea módulo en `js/`
5. Importa y usa en `js/app.js`

## 🐛 Debugging

Abre la **consola del navegador** (F12 → Console) para ver logs:
```
[TESERACTO] Inicializando aplicación...
[TESERACTO] ✓ Cubo inicializado
[TESERACTO] ✓ Color picker inicializado
... etc
```

## 📞 Contacto y Formulario

El formulario envía a `enviar.php`. Asegúrate de que este archivo existe en el servidor, o cambia:
```html
<!-- En index.html -->
<form action="enviar.php" method="post" id="contactForm">
<!-- Cambia "enviar.php" por tu endpoint -->
```

## ✨ Características Implementadas

- ✅ Cubo 3D isométrico animado (Three.js)
- ✅ Selector de color de marca en tiempo real
- ✅ Efecto "reveal on scroll"
- ✅ Formulario con validación
- ✅ Diseño responsivo (mobile-first)
- ✅ Respeta preferencia de movimiento reducido
- ✅ Navegación sticky header
- ✅ Grid system moderno

## 📚 Documentación Adicional

- **README.md** - Descripción general del proyecto
- **DEVELOPMENT.md** - Guía técnica de desarrollo
- **Este archivo (QUICKSTART.md)** - Inicio rápido

## ⚡ Tips Pro

1. **Reutiliza CSS**: Busca clases existentes antes de crear nuevas
2. **Modulariza JS**: Cada funcionalidad en su carpeta
3. **Usa variables CSS**: Nunca hardcodees valores
4. **Respeta breakpoints**: 920px (tablet), 560px (mobile), 400px (small)
5. **Prueba en mobile**: Usa DevTools → Toggle device toolbar

## 🎯 Próximos pasos

1. Personaliza colores en `variables.css`
2. Sube tu logo en carpeta `images/`
3. Reemplaza el fondo "FondoIso" (varios formatos soportados)
4. Configura el backend para envío de formularios
5. Deploy en tu servidor web

---

**¿Necesitas ayuda? Consulta los archivos MD incluidos.**

**© 2026 TESERACTO**
