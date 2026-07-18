# Auditoría de marca — estado del código

Desvíos entre el sistema de marca y el código, detectados en **julio 2026** sobre `main`. Cada ítem tiene archivo, evidencia y acción concreta.

Prioridad: **P0** rompe consistencia visible al usuario · **P1** deuda de marca · **P2** mejora.

---

## A. Identidad — decisiones pendientes

Estas no son bugs: son definiciones que faltan. Hasta que se resuelvan, el resto de la auditoría queda a medias.

### A1 · Tipografía: Inter vs Poppins — **P0**
El código corre íntegramente en **Inter Variable** (`@fontsource-variable/inter`, token `--font-inter`). Las piezas gráficas previas declaran **Poppins** como tipografía de marca.

**Acción:** consolidar en Inter y retirar Poppins de las piezas gráficas. Inter ya está paga en costo de bundle, es más compacta para la medalla física y alinea web con marketing. Si se decide Poppins, hay que instalarla y migrar todo el producto.

### A2 · Naranja oficial — **P0**
Conviven tres naranjas: `#E46212` (interfaz, `--color-primary`), `#FFA701` (isotipo) y `#F99C38` (declarado en el flyer, no existe en ningún lado).

**Acción:** fijar `#E46212` como naranja de acción y `#FFA701` como color exclusivo de la ilustración. Descartar `#F99C38`. El flyer también declara `Tech Blue #365548E`, que es un hex inválido de 7 dígitos.

### A3 · Nomenclatura "tag" vs "medalla" — **P0**
El README dice "smart pet tags", las piezas gráficas dicen "tag inteligente", el producto y la web dicen "medalla".

**Acción:** adoptar **"medalla Kodal"** en todos los canales en español. "Tag" queda solo en documentación técnica en inglés.

### A4 · El azul del isotipo no existe en la interfaz — **P1**
`#0F94EA` es el color del perro del isotipo, pero no aparece en ningún token. El isotipo queda visualmente desconectado del producto.

**Acción:** incorporarlo como acento secundario (`--color-brand-blue`) o aceptar conscientemente que el isotipo es ilustración y no paleta.

---

## B. Copy — voseo

**26 ocurrencias** de imperativo peninsular en 14 archivos. Tabla de reemplazo completa en [`voz-y-copy.md`](./voz-y-copy.md) §2.

| Archivo | Ocurrencias | Prioridad |
|---|---|---|
| `src/pages/index.astro` | `Escaneé` (L25), `Consigue` (L30, L121), `Únete` (L115) | **P0** — es la landing |
| `src/constants/landing.ts` | `Contacta` (L8), `Modifica` (L136), `Elige` (L147), `Escanea` (L161) | **P0** — FAQ y features públicos |
| `src/components/medal/detail/EmergencyCard.astro` | `Toca` (L28) | **P0** — pantalla del que encuentra |
| `src/components/medal/detail/PromoCard.astro` | `Protege` (L10), `Consigue` (L13) | P1 |
| `src/pages/medal/[id]/email-sent.astro` | `Revisa` (L20, L85), `Haz` (L24), `Edita` (L28), `Verifica` (L86) | P1 |
| `src/pages/medal/[id]/edit.astro` | `Edita` (L23), `Actualiza` (L29) | P1 |
| `src/pages/medal/[id]/create.astro` | `Completa` (L8) | P1 |
| `src/components/medal/forms/BasicForm.tsx` | `Selecciona` (L59, L112) | P1 |
| `src/components/medal/forms/OwnerForm.tsx` | `Selecciona` (L42) | P1 |
| `src/components/dialogs/SendVerificationCodeDialog.tsx` | `Ingresa` (L50) | P1 |
| `src/actions/sendVerificationCode.ts` | `Ingresa` (L11) | P1 |
| `src/schemas/medal.ts` | `Ingresa` (L41) | P1 |
| `src/emails/verifyIdentityToken.tsx` | `Verifica` (L46) | P1 |

> `src/pages/index.astro:25` dice **"Escaneé el código QR"** — además de no ser voseo, es un pretérito. Es la primera línea que lee un visitante.

**Caso especial:** el mismo bloque de los 3 pasos en la landing ya está bien conjugado ("Escaneá", "Completá", "Protegé"), lo que hace la inconsistencia más visible: conviven ambas formas en la misma página.

---

## C. Color — tokens

### C1 · Colores crudos de Tailwind fuera de estados semánticos — **P1**
12 ocurrencias fuera de `components/shadcn` y `components/starwind`.

| Archivo | Detalle | Veredicto |
|---|---|---|
| `src/components/medal/detail/EmergencyCard.astro` | 8 usos de `red-*` (L12, 17, 22, 27, 28, 31, 34, 41) | **Decidir.** El rojo de urgencia es intencional y funciona, pero está hardcodeado y no es un token. Convertir a `--color-destructive` / `--color-emergency`. |
| `src/components/Background.astro` | `pink/rose/fuchsia` y `sky/blue/indigo` por género (L9-10) | **P1.** Gradientes rosa/celeste por género no están en la paleta y refuerzan un estereotipo. Reemplazar por variaciones de la paleta cálida. |
| `src/pages/medal/[id]/email-sent.astro` | `amber-*` (L72) | P2 — es un estado de alerta, tokenizar. |
| `src/emails/verifyIdentityToken.tsx` | `amber-*` (L82) | P2 — email, ver C2. |

### C2 · Hex hardcodeados — **P2**
`src/emails/verifyIdentityToken.tsx` (L32-38) duplica `#E46212`, `#FFF8EA`, `#595959`, `#737373`. Es una limitación real de los clientes de email (no soportan variables CSS), pero **`#595959` y `#737373` no coinciden con `--color-foreground` (`#3A3A3A`) ni `--color-muted-foreground` (`#555555`)**.

**Acción:** alinear los valores y agregar un comentario que apunte a `docs/brand/design-tokens.md` para que se actualicen juntos.

### C3 · Contraste del botón primario — **P0**
Blanco sobre `#E46212` da **3.47:1**. No pasa WCAG AA para texto normal. Afecta a todos los CTA del sitio, incluido "Conseguí tu Medalla".

**Acción, elegir una:**
- Oscurecer `--color-primary` a `#C4500A` (4.67:1) — cambia el tono de marca levemente.
- Mantener el color y subir el texto de botón a ≥18.5px bold.
- Mantener `#E46212` para superficies y usar una variante oscura solo para texto sobre naranja.

### C4 · Sidebar oscuro fuera de paleta — **P2**
`--color-sidebar` en dark es `oklch(0.2795 0.0368 260.03)` = `#1E293B`, un azul frío (parece un default de shadcn) mientras el resto del modo oscuro es cálido (`#181611`, `#26241F`).

**Acción:** reemplazar por un cálido de la familia, ej. `oklch(0.24 0.012 85)`.

---

## D. Assets

### D1 · Isotipo vectorial de 68 KB — **P1**
`public/favicon.svg` y `src/icons/isotipo.svg` son idénticos: un trazado automático con cientos de nodos y 8 fills. Un redibujo limpio pesaría ~5 KB.

**Beneficio:** menor peso, escalado más nítido, y permite generar la variante monocromática que hoy no existe.

### D2 · Falta variante monocromática — **P1**
No hay versión de un solo color del isotipo para grabado láser, sellos, fondos complejos o impresión a una tinta.

### D3 · `og-image.png` — ~~210 KB y sin mensaje~~ **RESUELTO**
La versión anterior era solo el lockup escalado: pesaba 210 KB y no comunicaba qué hace Kodal en el preview de un link.

Reemplazada por una pieza con titular, descripción y CTA — **41 KB**. Generada por [`og/generate.py`](./og/generate.py), que produce además dos alternativas (`og/alt-producto.png`, `og/alt-marca.png`).

Para regenerar: requiere `cairosvg`, `qrcode` y las estáticas de Inter instaladas en el sistema (el script parte de `node_modules/@fontsource-variable/inter`).

---

## E. Backlog sugerido

**Sprint 1 — visible al usuario**
1. A1, A2, A3: cerrar las tres definiciones de identidad (bloquean el resto).
2. B: voseo en `index.astro`, `landing.ts` y `EmergencyCard.astro`.
3. C3: resolver contraste del botón primario.

**Sprint 2 — consistencia**
4. B: voseo en el resto de los archivos.
5. C1: tokenizar `EmergencyCard` y rehacer `Background.astro`.
6. D1 + D2: redibujar isotipo y generar monocromo.

**Sprint 3 — pulido**
7. C2, C4, D3.

---

*Auditoría generada contra el estado del repo en julio 2026. Al resolver un ítem, marcarlo acá en el mismo commit.*
