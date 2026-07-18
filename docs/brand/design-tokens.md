# Design Tokens — Kodal

Referencia técnica de color, tipografía y UI. Los valores OKLCH son los que viven en `src/global.css`; los HEX son la conversión sRGB para diseño e impresión.

---

## 1. Paleta de identidad (isotipo)

Extraídos de `public/favicon.svg`. Se usan **solo** dentro de la ilustración de marca y como acentos gráficos en piezas. **No** son tokens de interfaz y no deben aparecer hardcodeados en componentes.

| Nombre | HEX | Uso |
|---|---|---|
| Kodal Navy | `#001A41` | Contorno del isotipo, titulares, QR impreso |
| Navy Deep | `#000C29` | Trazo interno del vector |
| Navy Mid | `#000F33` | Trazo interno del vector |
| Kodal Blue | `#0F94EA` | Perro del isotipo |
| Kodal Yellow | `#FFA701` | Gato del isotipo |
| Kodal Orange Deep | `#FF8205` | Collar del perro |
| Orange Soft | `#FFA433` | Luces del gato |
| Blanco | `#FFFFFF` | Medallas QR del isotipo |

---

## 2. Tokens de interfaz — modo claro

Definidos en el bloque `@theme` de `src/global.css`.

| Token | OKLCH | HEX | Uso |
|---|---|---|---|
| `--color-background` | `oklch(1 0 0)` | `#FFFFFF` | Base |
| `--color-foreground` | `oklch(0.35 0 0)` | `#3A3A3A` | Texto principal |
| `--color-primary` | `oklch(0.65 0.18 45)` | `#E46212` | CTA, links, acción |
| `--color-primary-accent` | `oklch(0.72 0.16 45)` | `#F47F46` | Hover primario |
| `--color-secondary` | `oklch(0.7 0.15 35)` | `#EC785B` | Acento secundario |
| `--color-secondary-accent` | `oklch(0.78 0.13 35)` | `#FF987E` | Hover secundario |
| `--color-card` | `oklch(0.98 0.02 85)` | `#FFF8EA` | Superficies elevadas |
| `--color-popover` | `oklch(0.99 0.015 85)` | `#FFFBF4` | Menús, diálogos |
| `--color-muted` | `oklch(0.96 0.01 85)` | `#F5F1EA` | Fondos sutiles |
| `--color-muted-foreground` | `oklch(0.45 0 0)` | `#555555` | Texto secundario |
| `--color-border` / `--color-input` | `oklch(0.9 0.01 85)` | `#E1DED7` | Bordes y campos |
| `--color-ring` | `oklch(0.65 0.18 45)` | `#E46212` | Foco |
| `--color-destructive` | `oklch(0.58 0.24 27.32)` | `#E50017` | Error, mascota perdida |
| `--color-sidebar` | `oklch(0.9885 0.0098 87.47)` | `#FEFBF4` | Nav lateral, `theme-color` del sitio |

## 3. Tokens de interfaz — modo oscuro

Definidos en `html[data-theme="dark"]`.

| Token | HEX | | Token | HEX |
|---|---|---|---|---|
| `--color-background` | `#181611` | | `--color-primary` | `#F0834E` |
| `--color-foreground` | `#F1EEE7` | | `--color-secondary` | `#D77B64` |
| `--color-card` | `#26241F` | | `--color-muted` | `#302D28` |
| `--color-border` | `#3D3A35` | | `--color-sidebar` | `#1E293B` |

> `--color-sidebar` en oscuro (`#1E293B`, azul frío) rompe la familia cálida del resto de la paleta. Ver `auditoria.md` → D3.

---

## 4. Reglas de color

**Proporción 60 / 30 / 10** — crema de fondo, navy en texto y estructura, naranja **solo** en lo accionable. Un único botón primario por pantalla.

**Nunca**
- Hardcodear un hex en un componente. Siempre el token (`bg-primary`, `text-muted-foreground`).
- Usar colores crudos de Tailwind (`bg-blue-500`, `text-gray-600`) fuera de los estados semánticos definidos en `labels.ts`.
- Usar el naranja de marca para comunicar éxito o error.
- Usar `#FFA701` para texto: 1.88:1 sobre crema, no pasa contraste en ningún fondo claro.

**Contraste verificado (WCAG 2.1)**

| Combinación | Ratio | Veredicto |
|---|---|---|
| `#001A41` sobre `#FEFBF4` | 16.6:1 | AAA |
| `#3A3A3A` sobre `#FEFBF4` | 11.0:1 | AAA |
| `#E46212` sobre `#FEFBF4` | 3.36:1 | Solo ≥24px o ≥18.5px bold |
| Blanco sobre `#E46212` | 3.47:1 | **Falla AA en texto normal** |
| Blanco sobre `#C4500A` | 4.67:1 | AA — alternativa sugerida |
| `#FFA701` sobre `#FEFBF4` | 1.88:1 | Falla siempre |

---

## 5. Colores semánticos

De `src/constants/labels.ts`. El color asignado a un estado no se cambia.

| Estado | Clases | Significado |
|---|---|---|
| `CREATED` / `DISABLED` | `bg-neutral-100 text-neutral-700` | Neutro |
| `MANUFACTURED` | `bg-blue-100 text-blue-700` | Informativo |
| `ACTIVE` | `bg-emerald-100 text-emerald-700` | Éxito |
| `LOST` | `bg-red-100 text-red-700` | Crítico |
| `DECEASED` | `bg-neutral-200 text-neutral-500` | Inactivo |

---

## 6. Tipografía

**Inter Variable** — familia única, ya instalada (`@fontsource-variable/inter`). Token: `--font-inter`.

Pesos: 400 Regular · 600 SemiBold · 700 Bold · 800 ExtraBold.

| Rol | Tamaño | Peso | Tracking |
|---|---|---|---|
| Display | 48–68px | 800 | −0.03em |
| H1 | 36px | 800 | −0.02em |
| H2 | 28px | 700 | normal |
| H3 | 20px | 700 | normal |
| Lead | 19px | 400 | normal, `text-muted-foreground` |
| Body | 16px | 400 | line-height 1.65 |
| Small | 14px | 400 | normal |
| Botón | 15px | 600 | normal |
| Overline | 11px | 800 | 0.16em, uppercase |

**Reglas** — alineación izquierda salvo hero y CTA final · máximo 70 caracteres por línea · mayúsculas solo en overlines y badges · no introducir una segunda familia tipográfica.

---

## 7. UI

| Elemento | Regla |
|---|---|
| Radio de tarjetas | 16px |
| Radio de botones e inputs | 10px |
| Superficie de tarjeta | `bg-card` + `border-border` + sombra sutil |
| Altura mínima táctil | 48px en el perfil escaneado, 40px en el resto |
| Geometría | Todo redondeado. Nada con esquinas vivas: es parte de la calidez de la marca. |
| Botón primario | Uno por pantalla. `bg-primary text-white` |
| Foco | Visible siempre, `--color-ring` |

---

## 8. Logo

| Regla | Valor |
|---|---|
| ViewBox del isotipo | `439 × 408` — nunca deformar a cuadrado |
| Área de resguardo | 25% de la altura del isotipo en los cuatro lados |
| Mínimo digital (isotipo) | 24 × 22 px |
| Mínimo digital (lockup) | 120 px de ancho |
| Mínimo impreso (lockup) | 30 mm de ancho |
| Medalla Ø30 mm | Solo wordmark o isotipo, nunca el lockup completo |

Composición del lockup en `Brand.astro`: isotipo `w-16 h-16` · `<h2>` `text-3xl font-bold` · `<p>` `text-sm font-semibold text-primary`.

**Prohibido** — deformar, rotar, recolorear, aplicar sombras o efectos, cambiar la tipografía del wordmark, comprimir el espacio entre isotipo y logotipo, usar el isotipo full-color sobre naranja de marca.

---

## 9. QR

| Regla | Valor |
|---|---|
| Color | Navy `#001A41` sobre blanco. Nunca naranja ni bajo contraste. |
| Zona de silencio | 2 mm alrededor |
| Corrección de error | Nivel H (30%) — sobrevive rayones |
| Test de lote | Escanear la medalla física con un teléfono de gama baja, a 30 cm, con luz de interior, antes de producir |
