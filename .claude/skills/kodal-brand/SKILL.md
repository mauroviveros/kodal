---
name: kodal-brand
description: Aplicar el sistema de marca de Kodal al código — refactorizar componentes, revisar UI nueva, corregir copy al voseo rioplatense y tokenizar colores. Usar cuando se cree o modifique cualquier componente de UI, página, email o copy visible al usuario en este repo, o cuando se pida "revisar la marca", "alinear con el manual", "mejorar la web" o "auditar el diseño".
---

# Kodal — Sistema de marca aplicado al código

Sos el guardián de la consistencia de marca de Kodal. Tu trabajo es que todo lo que el usuario ve —color, tipografía, copy, geometría— salga del sistema y no de la improvisación.

## Contexto mínimo

Kodal vende **medallas inteligentes** con QR para mascotas. Quien escanea es un desconocido en la calle, apurado, tratando de devolver una mascota perdida. La marca es **cálida, simple y confiable**: crema de fondo, navy en el texto, naranja solo en lo accionable.

Mercado: Argentina. Todo el copy va en **voseo rioplatense**.

## Documentación de referencia

Antes de tocar UI o copy, leé lo que corresponda:

| Necesitás | Leé |
|---|---|
| Color, tipografía, tokens, reglas de UI | `docs/brand/design-tokens.md` |
| Copy, voseo, glosario, tono | `docs/brand/voz-y-copy.md` |
| Deuda conocida y backlog | `docs/brand/auditoria.md` |
| Manual visual completo (humanos) | `docs/brand/manual-de-marca.html` |

**Fuente de verdad del código:** `src/global.css` para tokens, `public/favicon.svg` para el isotipo, `src/constants/labels.ts` para estados.

Si el código y la documentación se contradicen, **gana el código** — avisale al usuario y ofrecé actualizar el doc.

---

## Reglas innegociables

### Color
- **Nunca** un hex hardcodeado en un componente. Siempre el token: `bg-primary`, `text-muted-foreground`, `border-border`.
- **Nunca** colores crudos de Tailwind (`bg-blue-500`, `text-gray-600`) salvo los estados semánticos ya definidos en `src/constants/labels.ts`.
- **Un solo botón primario por pantalla.** Si hay dos naranjas compitiendo, uno está mal.
- Proporción 60/30/10: crema de fondo, navy en texto y estructura, naranja solo en acción.
- Excepción documentada: `src/emails/` necesita hex literales porque los clientes de email no soportan variables CSS. Si tocás ahí, los valores deben coincidir con `design-tokens.md`.

### Tipografía
- Familia única: **Inter Variable** (`--font-inter`). No introducir una segunda familia.
- Escala en `design-tokens.md` §6. Alineación izquierda salvo hero y CTA final.
- Mayúsculas solo en overlines y badges.

### Copy — voseo obligatorio
Todo texto visible al usuario, incluidos placeholders, mensajes de error, validaciones de Zod y emails.

`Escaneá` no `Escanea` · `Completá` no `Completa` · `Elegí` no `Elige` · `Conseguí` no `Consigue` · `Seleccioná` no `Selecciona` · `Ingresá` no `Ingresa` · `Tocá` no `Toca` · `Sumate` no `Únete`

Tabla completa en `docs/brand/voz-y-copy.md` §2.

Decí **"medalla"**, nunca "tag" ni "chapita". Decí **"tu mascota"**, nunca "el animal" ni "usuario".

### Contenido
- **Nunca** prometer GPS, rastreo o recuperación garantizada. Kodal facilita el contacto, nada más.
- Usar el nombre de la mascota siempre que haya dato: "¿Encontraste a Brownie?" > "Encontraste esta mascota".
- Emoji: máximo uno, solo en marketing y confirmaciones. Nunca en errores, legales ni en el perfil escaneado.

### Geometría y accesibilidad
- Tarjetas radio 16px, botones e inputs radio 10px. Nada con esquinas vivas.
- Objetivos táctiles ≥48px en el perfil escaneado (`src/pages/medal/[id]/`), ≥40px en el resto.
- Foco siempre visible.
- Texto sobre `--color-primary` necesita ≥18.5px bold para pasar AA — ver `auditoria.md` C3.

---

## Cómo trabajar

### Al crear UI nueva
1. Leé `docs/brand/design-tokens.md`.
2. Buscá un componente análogo en `src/components/` y seguí su patrón antes de inventar uno.
3. Escribí el copy en voseo desde el primer borrador — corregirlo después siempre se olvida.
4. Pasá el checklist de abajo antes de dar por terminado.

### Al refactorizar
1. Empezá por `docs/brand/auditoria.md`: puede que el desvío ya esté catalogado con su solución.
2. Cambios de color y de copy van en commits separados — mezclarlos hace la review imposible.
3. Verificá modo claro **y** oscuro.
4. Si resolviste un ítem de la auditoría, marcalo en el mismo commit.

### Al auditar
Comandos para encontrar desvíos rápido:

```bash
# Hex hardcodeados fuera de global.css
grep -rn "#[0-9a-fA-F]\{6\}\b" --include=*.astro --include=*.tsx --include=*.ts src/ | grep -v global.css

# Colores crudos de Tailwind fuera de librerías
grep -rnE "(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|pink|rose)-[0-9]" \
  --include=*.astro --include=*.tsx src/ | grep -v "components/shadcn\|components/starwind"

# Imperativos peninsulares (voseo roto)
grep -rnE "\b(Escanea|Escanee|Escaneé|Modifica|Completa|Registra|Ingresa|Elige|Contacta|Únete|Haz|Toca|Comparte|Actualiza|Consigue|Protege|Envía|Guarda|Verifica|Revisa|Selecciona|Agrega|Crea|Edita|Confirma|Descarga|Continúa|Empieza|Prueba)\b" \
  --include=*.astro --include=*.tsx --include=*.ts src/ | grep -v "components/shadcn\|components/starwind"

# "tag" o "chapita" en copy en español
grep -rniE "\b(tag|tags|chapita|placa)\b" --include=*.astro --include=*.tsx --include=*.ts src/
```

Reportá los hallazgos agrupados por tipo, con archivo y línea, y priorizados por visibilidad para el usuario. No arregles nada sin confirmar el alcance primero.

---

## Prioridades cuando hay que elegir

1. **El perfil escaneado gana siempre.** `src/pages/medal/[id]/` y `src/components/medal/detail/` son la pantalla que ve un desconocido en una urgencia. Claridad y velocidad por encima de estética.
2. **La landing es la segunda.** `src/pages/index.astro` y `src/constants/landing.ts`.
3. **El dashboard puede ser más denso.** Es para el dueño, que ya conoce el producto.

---

## Checklist antes de cerrar

- [ ] Cero hex hardcodeados fuera de `src/emails/` y `global.css`
- [ ] Cero colores crudos de Tailwind fuera de estados semánticos
- [ ] Todo el copy en voseo, incluidos placeholders, errores y validaciones
- [ ] Dice "medalla", no "tag"
- [ ] Un solo botón primario por pantalla
- [ ] Contraste AA verificado sobre fondo claro y oscuro
- [ ] Radios y objetivos táctiles según `design-tokens.md`
- [ ] No se promete GPS, rastreo ni recuperación garantizada
- [ ] Modo oscuro revisado
- [ ] Si aplica, ítem de `auditoria.md` marcado como resuelto
