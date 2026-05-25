import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Collection } from "@/lib/data/collections";

type CollectionDetailProps = {
  collection: Collection;
};

export function CollectionDetail({ collection }: CollectionDetailProps) {
  return (
    <article className="bg-background pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-container px-6 md:px-16">
        <Link
          href="/#colecciones"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-subtle transition-colors hover:text-optic"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Volver a colecciones
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line shadow-float">
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute left-4 top-4 rounded-full border border-line bg-paper/90 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-ink backdrop-blur-sm">
              {collection.tag}
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-mono text-xs tracking-[0.2em] text-subtle">
              COLECCIÓN · {collection.tag}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] text-ink">
              {collection.name}
            </h1>
            <p className="mt-3 font-mono text-sm text-optic">{collection.price}</p>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              {collection.overview}
            </p>

            <ul className="mt-8 space-y-3">
              {collection.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm text-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-optic"
                >
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/reservar"
              className="btn-cta group mt-10 w-fit"
            >
              Reservar asesoría
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
            Galería <span className="text-accent">de la colección</span>
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collection.gallery.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-cream"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-luxury hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
