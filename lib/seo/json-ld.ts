import { brand } from "@/lib/data/brand";
import { schedule } from "@/lib/data/clinic";
import { site } from "@/lib/data/site";
import { defaultOgImage } from "@/lib/seo/metadata";

const siteUrl = brand.siteUrl;

function openingHoursSpecification() {
  const specs: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }> = [];

  const addRange = (
    days: string[],
    morning: string,
    afternoon: string | null,
  ) => {
    const parse = (range: string) => {
      const [opens, closes] = range.split("–").map((s) => s.trim());
      return { opens: opens?.replace(".", ":") ?? "", closes: closes?.replace(".", ":") ?? "" };
    };

    if (morning && morning !== "Cerrado" && morning !== "—") {
      const { opens, closes } = parse(morning);
      if (opens && closes) {
        specs.push({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: days,
          opens,
          closes,
        });
      }
    }

    if (afternoon && afternoon !== "—" && afternoon !== "Cerrado") {
      const { opens, closes } = parse(afternoon);
      if (opens && closes) {
        specs.push({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: days,
          opens,
          closes,
        });
      }
    }
  };

  for (const row of schedule) {
    if (row.morning === "Cerrado") continue;

    const days =
      row.day === "Lunes – Jueves"
        ? ["Monday", "Tuesday", "Wednesday", "Thursday"]
        : row.day === "Viernes"
          ? ["Friday"]
          : row.day === "Sábado"
            ? ["Saturday"]
            : [];

    if (days.length === 0) continue;
    addRange(days, row.morning, row.afternoon);
  }

  return specs;
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Optician", "LocalBusiness", "MedicalBusiness"],
    "@id": `${siteUrl}/#localbusiness`,
    name: brand.name,
    url: siteUrl,
    image: `${siteUrl}${defaultOgImage.url}`,
    logo: `${siteUrl}${brand.logo.src}`,
    description:
      "Centro óptico de salud visual en Ovalle. Exámenes clínicos, armazones, cristales, FONASA y particular.",
    telephone: site.phone,
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.street} ${site.streetNumber}`,
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: "",
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coordinates.lat,
      longitude: site.coordinates.lng,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: site.province,
    },
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: brand.instagram.map((ig) => ig.url),
    priceRange: "$$",
    paymentAccepted: "Cash, Credit Card, FONASA",
    currenciesAccepted: "CLP",
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brand.name,
    url: siteUrl,
    inLanguage: "es-CL",
    publisher: {
      "@id": `${siteUrl}/#localbusiness`,
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
