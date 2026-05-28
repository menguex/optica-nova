---
description: UX/UI premium (tokens + accesibilidad + motion) para este proyecto Next.js + Tailwind + Framer Motion + Lenis.
globs: "**/*.{ts,tsx,js,jsx,css,mdx}"
---

# UX/UI God-Level (Optica Nova)

## Principios base (obligatorio)
- **Tokens primero**: usar colores y sombras ya definidos en Tailwind (`bg-background`, `text-foreground`, `border-line`, `text-muted`, `shadow-soft`, `ease-luxury`, etc.). Evitar hex en componentes.
- **Estructura**: preferir composición (UI primitives en `components/ui/`) y secciones en `components/sections/`. No duplicar patrones.
- **Tipografía y escala**: mantener jerarquía existente con `clamp()` cuando corresponda; no inventar escalas inconsistentes.
- **Responsive**: diseñar mobile-first y verificar `sm/md/lg` para evitar saltos.

## Usabilidad y accesibilidad (WCAG 2.2)
- **Targets**: cualquier elemento clicable debe ser de al menos **44x44px** o tener padding equivalente.
- **Estados**: todo interactivo debe tener `hover`, `active` y `focus-visible` (usar clases existentes como `btn-cta`, `btn-secondary`, etc. o extenderlas con tokens).
- **Semántica**: usar elementos semánticos (`nav`, `main`, `section`, `header`, `footer`, `button`, `a`).
- **ARIA**: cuando haya toggles/modales/acordeones, mantener `aria-expanded`, `aria-controls`, `role` correcto y foco accesible.
- **Imágenes**: `alt` descriptivo si aporta información; si es decorativa, `alt=""` y `aria-hidden`.

## Motion “premium” (Framer Motion + Lenis)
- **Prefiere springs** y transiciones suaves (evitar lineales “duros”).
- **Reduce motion**: respetar `prefers-reduced-motion` y ofrecer fallback sin animaciones agresivas.
- **No bloquear scroll**: si Lenis está detenido por modal/overlay, coordinar scroll con cierres y delays (usar utilidades existentes en `lib/scroll.ts` y `NavAnchor`).
- **Evitar jank**: animar `transform/opacity`, no propiedades que gatillan layout.

## Performance & calidad visual
- **Evitar CLS**: reservar espacio (aspect-ratio) para imágenes y contenido dinámico.
- **Next/Image**: usar `sizes` correctos, `priority` solo para hero/above-the-fold.
- **Reutilización**: si una UI necesita un patrón (cards, pills, labels), crear/usar un componente en `components/ui/`.

## Checklist mínimo antes de “terminar”
- No hay strings de contacto “inventados” (emails/telefonos/handles deben vivir en `lib/data/*`).
- `npm run typecheck` y `npm run lint` pasan.

