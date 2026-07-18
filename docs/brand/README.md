# Kodal — Sistema de Marca

Fuente de verdad de la identidad de Kodal. Todo lo que hay acá está derivado del producto real, no de un moodboard.

## Contenido

| Archivo | Qué es | Para quién |
|---|---|---|
| [`manual-de-marca.html`](./manual-de-marca.html) | Manual visual completo: logo, color, tipografía, voz, producto, redes. Abrir en el navegador. | Humanos — diseño, marketing, proveedores |
| [`design-tokens.md`](./design-tokens.md) | Paleta, tokens, tipografía y reglas de UI en formato legible por agentes | Agentes y devs |
| [`voz-y-copy.md`](./voz-y-copy.md) | Voseo, glosario, tono por contexto, do/don't de copy | Agentes, devs y marketing |
| [`auditoria.md`](./auditoria.md) | Desvíos detectados en el código, con archivos y líneas, priorizados | Backlog de refactor |

## Fuentes de verdad

| Qué | Dónde vive |
|---|---|
| Tokens de color | `src/global.css` (bloque `@theme` y `[data-theme="dark"]`) |
| Isotipo | `public/favicon.svg` = `src/icons/isotipo.svg` |
| Lockup de marca | `src/layouts/components/Brand.astro` |
| Estados y etiquetas | `src/constants/labels.ts` |
| Copy de landing y legales | `src/constants/landing.ts` |
| Tipografía | `@fontsource-variable/inter` (importada en `global.css`) |

Si un valor de este manual y el código no coinciden, **gana el código** — y hay que abrir un issue para alinear el manual, o al revés. No se copian hex sueltos desde acá a un componente: se usa el token.

## Cómo se usa

Para refactorizar o crear UI alineada a la marca, invocá la skill del repo:

```
/kodal-brand
```

Definida en [`.claude/skills/kodal-brand/SKILL.md`](../../.claude/skills/kodal-brand/SKILL.md).

## Versión

**v1.0** — Julio 2026. Cambios de paleta, tipografía o nomenclatura requieren actualizar los cuatro archivos de esta carpeta en el mismo commit.
