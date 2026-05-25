# Auditoría contraste — OSV (completa)

**Criterio:** WCAG 2.1 AA — texto normal ≥ 4.5:1, texto grande (≥18px) ≥ 3:1.

## Resumen por sección

| Sección | Fondo | Estado |
|---------|-------|--------|
| Hero | `background` + foto | **Rediseñado** — layout 2 cols, chips, foto equipo, pastilla `ink/90` |
| Nosotros (About) | `background` / `cream` | OK — tabs activos `text-on-dark` |
| **Por qué OSV** | `ink` | **Mejorado** — tokens `on-dark-*` |
| Profesional | `background` | OK |
| Exámenes | `cream` | OK — pills y labels `text-muted` |
| Servicios | `cream` | OK |
| Compromiso (parallax) | `surface-dark` + foto | OK — `text-on-dark-accent` |
| Productos | `background` | OK |
| Reserva | `reserve` | OK — sin opacidades bajas |
| Footer | `cream` | OK — eyebrows `text-eyebrow` |

## Tokens nuevos (fondos oscuros)

| Token / clase | Color | Uso |
|---------------|-------|-----|
| `--nova-on-dark-accent` | `#c8e4fa` | Acento en títulos (AA sobre ink) |
| `--nova-on-dark-secondary` | `#e4ebf2` | Cuerpo secundario sobre ink |
| `--nova-on-dark-eyebrow` | `#b8c8d8` | Rótulos 02 — POR QUÉ OSV |
| `.text-on-dark-accent` | — | Títulos acento |
| `.text-on-dark-secondary` | — | Párrafos y descripciones |
| `.text-eyebrow-on-dark` | — | Eyebrows en `bg-ink` |
| `.bg-ink .text-on-dark` | — | Fuerza blanco roto pleno |

## Por qué OSV — diseño y contraste

- Titular en **dos líneas sólidas** (sin gradiente `bg-clip-text`, que fallaba contraste).
- Caja de mensaje con borde `18%` y fondo `8%` paper sobre ink.
- Pasos 01–03 con número en acento y detalle en `on-dark-secondary`.
- Tarjetas pilares: borde `20%`, texto cuerpo `on-dark-secondary`.

## Correcciones globales aplicadas

- Footer: `text-subtle` → `text-eyebrow` / `text-muted`
- Exámenes: labels mono `text-muted`
- Navbar: enlaces `text-muted` (no `foreground/80`)
- Reserva: separadores `text-on-dark-secondary`
- Parallax: acento unificado con clase token

## Pendiente editorial

- Foto profesional: cargada en `public/profesional/gonzalo-alanis.jpg`
- Colecciones `/colecciones/*`: revisar imágenes aparte

## Validación

```bash
npm run build   # tipos + lint
npm run dev     # http://localhost:3000
```

Recarga forzada **Cmd+Shift+R** tras cambios de CSS.
