import { pexels } from "@/lib/pexels";

/** Hero: fachada del local en Ovalle. */
export const heroImage = {
  src: "/local/fachada-ovalle.png",
  alt: "Fachada de Óptica Salud Visual en Coquimbo 177, Ovalle",
};

/** Fotos reales del local — recepción, atención y sala de examen. */
export const localGalleryImages = [
  {
    src: "/local/interior-recepcion.png",
    alt: "Recepción de Óptica Salud Visual con mostrador y monturas en Ovalle",
    caption: "Recepción y showroom",
  },
  {
    src: "/local/interior-atencion.png",
    alt: "Atención personalizada con prueba de armazones en el local de Ovalle",
    caption: "Asesoría en monturas",
  },
  {
    src: "/local/sala-examen-visual.png",
    alt: "Sala de examen visual con autorrefractómetro y foróptero en OSV Ovalle",
    caption: "Sala de examen visual",
  },
] as const;

export const experienceImage = {
  src: localGalleryImages[2].src,
  alt: localGalleryImages[2].alt,
};

export const parallaxStatementImage = {
  src: localGalleryImages[1].src,
  alt: localGalleryImages[1].alt,
};

export const galleryImages = [
  {
    src: pexels(5842846, 900),
    alt: "Monturas y armazones ópticos en detalle",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: pexels(28295159, 600),
    alt: "Armazones clásicos de calidad",
    className: "",
  },
  {
    src: pexels(978808, 600),
    alt: "Lentes de sol con protección UV",
    className: "",
  },
  {
    src: pexels(5752241, 900),
    alt: "Equipamiento clínico para examen visual",
    className: "md:col-span-2",
  },
  {
    src: pexels(5996744, 600),
    alt: "Medición y precisión óptica",
    className: "",
  },
  {
    src: pexels(831430, 600),
    alt: "Lentes de lectura para uso cercano",
    className: "",
  },
] as const;
