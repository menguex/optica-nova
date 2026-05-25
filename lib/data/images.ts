import { pexels } from "@/lib/pexels";

/** Hero: fachada del local en Ovalle. */
export const heroImage = {
  src: "/local/fachada-ovalle.png",
  alt: "Fachada de Óptica Salud Visual en Coquimbo 177, Ovalle",
};

export const experienceImage = {
  src: pexels(5752241, 1000),
  alt: "Foróptero y equipo de examen visual en consulta",
};

export const parallaxStatementImage = {
  src: pexels(5842846, 2400),
  alt: "Monturas ópticas — compromiso con la salud visual",
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
