import type { Metadata } from "next";
import { brand } from "@/lib/data/brand";
import { site } from "@/lib/data/site";

const siteUrl = brand.siteUrl;

/** Imagen para Open Graph / Twitter (fachada real del local). */
export const defaultOgImage = {
  url: "/local/fachada-ovalle.png",
  width: 1200,
  height: 630,
  alt: "Fachada de Óptica Salud Visual en Coquimbo 177, Ovalle",
} as const;

export const seoKeywords = [
  "óptica Ovalle",
  "examen visual Ovalle",
  "óptica salud visual",
  "lentes Ovalle",
  "armazones Ovalle",
  "cristales ópticos Ovalle",
  "óptica FONASA Ovalle",
  "salud visual Limarí",
  "óptica Coquimbo 177",
] as const;

const defaultDescription =
  "Óptica en Ovalle, Región de Coquimbo. Examen visual, armazones, cristales, FONASA y particular. Coquimbo #177, Provincia del Limarí.";

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Óptica en Ovalle | Examen visual y lentes — ${brand.name}`,
    template: `%s | ${brand.name}`,
  },
  description: defaultDescription,
  keywords: [...seoKeywords],
  authors: [{ name: brand.name, url: siteUrl }],
  creator: brand.name,
  publisher: brand.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteUrl,
    siteName: brand.name,
    title: `Óptica en Ovalle | ${brand.name}`,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Óptica en Ovalle | ${brand.name}`,
    description: defaultDescription,
    images: [defaultOgImage.url],
  },
  icons: {
    icon: [{ url: "/logo-salud-visual.png", type: "image/png" }],
    apple: [{ url: "/logo-salud-visual.png", type: "image/png" }],
  },
  category: "health",
};

export const homeMetadata: Metadata = {
  title: `Óptica en Ovalle | Examen visual, armazones y cristales`,
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: `Óptica en Ovalle | Examen visual — ${brand.name}`,
    description: defaultDescription,
    url: siteUrl,
    images: [defaultOgImage],
  },
};

export function reservarMetadata(): Metadata {
  return {
    title: "Reservar cita y examen visual en Ovalle",
    description: `Agenda tu examen visual en ${brand.name}, Ovalle. Formulario online, confirmación por WhatsApp, teléfono o correo. ${site.address}.`,
    alternates: { canonical: "/reservar" },
    openGraph: {
      title: `Reservar examen visual — ${brand.name}`,
      description: `Solicita tu hora en Ovalle. ${site.address}.`,
      url: `${siteUrl}/reservar`,
      images: [defaultOgImage],
    },
  };
}

export function collectionMetadata(input: {
  name: string;
  overview: string;
  slug: string;
}): Metadata {
  const path = `/colecciones/${input.slug}`;
  const description = `${input.overview} Disponible en ${brand.name}, ${site.city}.`;

  return {
    title: `${input.name} en Ovalle`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${input.name} — ${brand.name}`,
      description,
      url: `${siteUrl}${path}`,
      images: [defaultOgImage],
    },
  };
}
