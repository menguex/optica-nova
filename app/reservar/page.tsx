import type { Metadata } from "next";
import { ReservarPageView } from "@/components/sections/ReservarPageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { reservarMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = reservarMetadata();

export default function ReservarPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Reservar cita", path: "/reservar" },
        ])}
      />
      <ReservarPageView />
    </>
  );
}
