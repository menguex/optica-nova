# Auditoría de imágenes — Óptica Salud Visual (Chile)

**Fecha:** mayo 2026  
**Contexto:** Centro óptico en Ovalle, Provincia del Limarí. Público local, FONASA y particular.

## Resumen

| Área | Estado actual (mayo 2026) |
|------|---------------------------|
| Carrusel y acordeón | **Solo producto y equipo** — sin retratos que incluyan personas afroamericanas |
| Hero | Equipo clínico (5752241) — sin retrato; foto propia del local opcional |
| Texto sobre fotos | Scrim `ink` reforzado + `text-on-dark` (WCAG sobre imágenes claras) |

## Criterio de selección de stock

- Priorizar monturas, lentes, foróptero y balanza óptica.
- Evitar retratos en carrusel de productos y acordeón «Por qué OSV».
- Hero: único retrato permitido en home (perfil acorde al público de Ovalle/Limarí).

## Limitación Chile

En bancos gratuitos (Pexels) **no hay fotos de Ovalle, Limarí ni interior del local en Coquimbo #177**. Las imágenes son genéricas pero **neutras y profesionales**, aptas para un centro óptico chileno.

**Recomendación final:** sustituir progresivamente por fotos propias:

- Vitrina de armazones en OSV  
- Gonzalo Alanís en consulta (con consentimiento)  
- Fachada / sala de espera Ovalle  
- Pacientes locales (autorización escrita)

## Productos — fotos reales (`public/productos/`)

| Criterio | Implementación |
|----------|----------------|
| Fuente | Archivos del local (carpeta «imagenes de armazon») |
| Recorte | `object-contain` + `object-center` — foto completa, sin cortar monturas |
| Marco | Fondo `paper`, borde interior; proporción `aspect-[3/4]` (fotos 960×1280 del local) |
| Carrusel | Tarjetas de ancho fijo (~18–19rem), gap entre slides, sin recorte de títulos en bordes |
| Código | `components/ui/gallery4.tsx` → `ProductGalleryMedia`, `imageMode="product"` |

Archivos nombrados por slug (`premium-marcas.jpeg`, `gama-alta.jpeg`, etc.) en `lib/data/product-gallery.ts`.

## Otras secciones

| Sección | ID | Uso |
|---------|-----|-----|
| Equipamiento clínico | 5752241 | Foróptero |
| Paciente en consulta | 5752254, 5201897 | Accesibilidad, FONASA |
| Elección de lentes | 5752311 | Tratamientos / mineral |
| Armazón de prueba | 6749768 | Adelgazado 1.74 |

## Licencia

Todas las URLs usan `lib/pexels.ts` (Pexels License — uso comercial permitido, sin marca de agua). Verificar atribución si el cliente lo exige en pie de página.

## Pendiente

- [ ] Foto real `public/profesional/gonzalo-alanis.jpg`  
- [ ] Sesión fotográfica en tienda Ovalle  
- [ ] Revisar rimless: si hay foto propia de montura sin aro, reemplazar 7534108  
