import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/data/collections";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Collections() {
  return (
    <section id="colecciones" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-container px-6 md:px-16">
        <SectionHeader
          eyebrow="03 — COLECCIONES"
          title={
            <>
              Piezas de autor.
              <br />
              <span className="text-accent">Visión sin compromisos.</span>
            </>
          }
          subtitle="Curaduría de monturas ópticas y solares de las casas más relevantes del diseño contemporáneo."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {collections.map((item, index) => (
            <Link
              key={item.slug}
              href={`/colecciones/${item.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mist"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,11,0.8)] via-[rgba(10,10,11,0.15)] to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-[rgba(250,248,244,0.35)] bg-[rgba(10,10,11,0.25)] px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-paper backdrop-blur-sm">
                {item.tag}
              </span>
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl text-paper">{item.name}</h3>
                  <p className="mt-1 font-mono text-xs text-[rgba(250,248,244,0.85)]">
                    {item.price}
                  </p>
                  <p className="mt-2 text-sm text-[rgba(250,248,244,0.75)]">
                    {item.description}
                  </p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(250,248,244,0.45)] text-paper transition-colors group-hover:bg-paper group-hover:text-ink">
                  →
                </span>
              </div>
              <span className="sr-only">
                Ver colección {item.name} — {index + 1} de {collections.length}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
