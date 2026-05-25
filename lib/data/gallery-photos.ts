import { pexels } from "@/lib/pexels";

export type GalleryPhotoDirection = "left" | "right";

export type GalleryPhoto = {
  id: number;
  order: number;
  x: string;
  y: string;
  zIndex: number;
  direction: GalleryPhotoDirection;
  src: string;
  alt: string;
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    order: 0,
    x: "-320px",
    y: "15px",
    zIndex: 50,
    direction: "left",
    src: pexels(5842846, 600),
    alt: "Monturas ópticas en primer plano",
  },
  {
    id: 2,
    order: 1,
    x: "-160px",
    y: "32px",
    zIndex: 40,
    direction: "left",
    src: pexels(5752241, 600),
    alt: "Equipo de consulta oftalmológica",
  },
  {
    id: 3,
    order: 2,
    x: "0px",
    y: "8px",
    zIndex: 30,
    direction: "right",
    src: pexels(978808, 600),
    alt: "Lentes de sol",
  },
  {
    id: 4,
    order: 3,
    x: "160px",
    y: "22px",
    zIndex: 20,
    direction: "right",
    src: pexels(5996744, 600),
    alt: "Precisión óptica en consulta",
  },
  {
    id: 5,
    order: 4,
    x: "320px",
    y: "44px",
    zIndex: 10,
    direction: "left",
    src: pexels(28295159, 600),
    alt: "Armazones de calidad",
  },
];
