/* ============================================================
   UTILS — COLORES
============================================================ */

/**
 * Convierte un color hex a HSL
 * @param {string} hex - Color en formato #RRGGBB
 * @returns {object} { h, s, l }
 */
export function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convierte HSL a hex
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Color en formato #RRGGBB
 */
export function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (v) => Math.round(v * 255)
    .toString(16)
    .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Aplica variables CSS de color de marca
 * @param {string} hex - Color en formato #RRGGBB
 */
export function applyBrandColor(hex) {
  const { h, s, l } = hexToHsl(hex);
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const maroon2 = hslToHex(h, s, clamp(l + 8, 0, 92));
  const ember = hslToHex(h, clamp(s + 8, 0, 100), clamp(l + 28, 0, 92));

  const root = document.documentElement.style;
  root.setProperty('--maroon', hex);
  root.setProperty('--maroon-2', maroon2);
  root.setProperty('--ember', ember);
}
