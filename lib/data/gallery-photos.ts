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
    x: "-240px",
    y: "15px",
    zIndex: 50,
    direction: "left",
    src: "/local/interior-recepcion.png",
    alt: "Recepción de Óptica Salud Visual en Ovalle",
  },
  {
    id: 2,
    order: 1,
    x: "-80px",
    y: "32px",
    zIndex: 40,
    direction: "left",
    src: "/local/interior-atencion.png",
    alt: "Atención personalizada en el local de OSV",
  },
  {
    id: 3,
    order: 2,
    x: "80px",
    y: "8px",
    zIndex: 30,
    direction: "right",
    src: "/local/sala-examen-visual.png",
    alt: "Sala de examen visual con equipamiento clínico",
  },
];
