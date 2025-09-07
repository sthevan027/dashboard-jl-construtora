// Utilitários de A11y – verificação de contraste dos design tokens

function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

function parseCssColor(color) {
  const trimmed = String(color).trim();
  if (trimmed.startsWith('hsl')) {
    const m = trimmed.match(/hsl\(\s*(\d+(?:\.\d+)?)\s+([\d.]+)%\s+([\d.]+)%\s*\)/i);
    if (m) {
      const [h, s, l] = [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
      const [r, g, b] = hslToRgb(h, s, l);
      return { r, g, b };
    }
  }
  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    const bigint = parseInt(hex.length === 3 ? hex.replace(/(.)/g, '$1$1') : hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
  // rgb(...) fallback
  const m = trimmed.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (m) return { r: +m[1], g: +m[2], b: +m[3] };
  return { r: 0, g: 0, b: 0 };
}

function relativeLuminance({ r, g, b }) {
  const srgb = [r, g, b].map(v => v / 255).map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(rgb1, rgb2) {
  const L1 = relativeLuminance(rgb1);
  const L2 = relativeLuminance(rgb2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function checkDesignTokensContrast() {
  const getVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name);
  const pairs = [
    ['--color-background', '--color-foreground', 'background/foreground'],
    ['--color-card', '--color-card-foreground', 'card'],
    ['--color-primary', '--color-primary-foreground', 'primary'],
    ['--color-secondary', '--color-secondary-foreground', 'secondary'],
    ['--color-muted', '--color-muted-foreground', 'muted'],
    ['--color-destructive', '--color-destructive-foreground', 'destructive'],
  ];

  const MIN = 4.5; // WCAG AA normal text
  let allOk = true;
  pairs.forEach(([bgVar, fgVar, label]) => {
    const bg = parseCssColor(getVar(bgVar));
    const fg = parseCssColor(getVar(fgVar));
    const ratio = contrastRatio(bg, fg);
    if (ratio < MIN) {
      allOk = false;
      console.warn(`[A11y] Contraste insuficiente (${ratio.toFixed(2)}:1) em ${label} – mínimo ${MIN}:1`);
    }
  });

  if (allOk) {
    console.info('[A11y] Contrastes dos tokens verificados: OK (WCAG AA)');
  }
}


