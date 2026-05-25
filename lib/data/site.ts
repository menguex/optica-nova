/** Datos locales — Óptica Salud Visual, Ovalle, Chile */
export const site = {
  city: "Ovalle",
  region: "Región de Coquimbo",
  province: "Provincia del Limarí",
  country: "Chile",
  locationLabel: "Ovalle, Chile",
  street: "Coquimbo",
  streetNumber: "177",
  address: "Coquimbo #177, Ovalle",
  addressLine2: "Provincia del Limarí, Región de Coquimbo",
  /** Centro aproximado en calle Coquimbo — Ovalle (para mapa embebido) */
  coordinates: { lat: -30.5971, lng: -71.1994 },
  mapsQuery: "Coquimbo+177,+Ovalle,+Región+de+Coquimbo,+Chile",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Coquimbo+177,+Ovalle,+Chile",
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Coquimbo+177,+Ovalle,+Chile",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=Coquimbo+177,+Ovalle,+Chile&hl=es&z=17&output=embed",
  phone: "+56932451123",
  phoneDisplay: "+56 9 3245 1123",
  whatsappUrl: "https://wa.me/56932451123",
  whatsappMessage:
    "Hola, quisiera agendar un examen visual en Óptica Salud Visual.",
  payment: "FONASA y particular",
  hoursSummary: [
    "Lun–Jue · 09:30–14:30 / 15:00–19:30",
    "Vie · 09:30–14:30 / 15:00–18:00",
    "Sáb · 10:30–14:00",
    "Domingo cerrado",
  ],
} as const;

export const whatsappUrlWithMessage = `https://wa.me/56932451123?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;
