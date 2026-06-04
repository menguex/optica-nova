"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { ProductGalleryItem } from "@/lib/data/product-gallery";

export type Gallery4Item = {
  id: string;
  title: string;
  description: string;
  image: string;
  href?: string;
};

type Gallery4Props = {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  /** Fotos propias de producto: centradas, sin recorte agresivo. */
  imageMode?: "product" | "editorial";
};

function isProductAsset(src: string) {
  return src.startsWith("/productos/");
}

function ProductGalleryMedia({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="product-gallery-media relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-paper via-cream to-paper">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_42%,rgba(255,255,255,0.65),transparent_70%)]"
        aria-hidden
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-line/30" aria-hidden />
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="object-cover object-[center_42%] transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 84vw, 380px"
      />
    </div>
  );
}

export function Gallery4({
  title,
  description,
  items,
  imageMode = "editorial",
}: Gallery4Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const syncCarousel = useCallback((api: CarouselApi | undefined) => {
    if (!api) return;
    setSnapCount(api.scrollSnapList().length);
    setCurrentSlide(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    syncCarousel(carouselApi);
    const onChange = () => syncCarousel(carouselApi);

    carouselApi.on("init", onChange);
    carouselApi.on("reInit", onChange);
    carouselApi.on("select", onChange);
    carouselApi.on("resize", onChange);

    return () => {
      carouselApi.off("init", onChange);
      carouselApi.off("reInit", onChange);
      carouselApi.off("select", onChange);
      carouselApi.off("resize", onChange);
    };
  }, [carouselApi, syncCarousel]);

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.reInit();
    carouselApi.scrollTo(0, true);
    syncCarousel(carouselApi);
  }, [carouselApi, items, syncCarousel]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !carouselApi) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        window.requestAnimationFrame(() => {
          carouselApi.reInit();
          syncCarousel(carouselApi);
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [carouselApi, syncCarousel]);

  if (items.length === 0) return null;

  const showNav = items.length > 1 && snapCount > 1;

  return (
    <div ref={rootRef} className="w-full">
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: imageMode === "product" ? "center" : "start",
          watchResize: true,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-10 md:flex-row md:items-end">
          <div className="max-w-xl">
            {title ? (
              <h3 className="font-display text-2xl tracking-[-0.02em] text-ink md:text-3xl">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="mt-3 text-base text-muted">{description}</p>
            ) : null}
          </div>
          <div className={cn("flex shrink-0 gap-2", !showNav && "hidden")}>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>

        <CarouselContent className="-ml-4 md:-ml-6">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className={cn(
                "pl-4 md:pl-6",
                imageMode === "product"
                  ? "basis-[84%] sm:basis-[62%] md:basis-[48%] lg:basis-[38%]"
                  : "basis-[88%] sm:basis-[70%] md:basis-[55%] lg:basis-[42%]",
              )}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-soft transition-shadow hover:shadow-float">
                {imageMode === "product" || isProductAsset(item.image) ? (
                  <ProductGalleryMedia src={item.image} alt={item.title} />
                ) : (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 88vw, 42vw"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h4 className="font-display text-xl tracking-[-0.02em] text-ink md:text-2xl">
                    {item.title}
                  </h4>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-4">
                    {item.description}
                  </p>
                  <Link
                    href={item.href ?? "/reservar"}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-optic"
                  >
                    Consultar disponibilidad
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {snapCount > 1 ? (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir a tarjeta ${index + 1}`}
              aria-current={currentSlide === index ? "true" : undefined}
              onClick={() => carouselApi?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "w-6 bg-optic"
                  : "w-2 bg-line hover:bg-muted",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

type ProductsGallery4Props = {
  items: ProductGalleryItem[];
  activeCategory: ProductGalleryItem["category"];
};

export function ProductsGallery4({ items, activeCategory }: ProductsGallery4Props) {
  const filtered = useMemo(
    () => items.filter((item) => item.category === activeCategory),
    [items, activeCategory],
  );

  const galleryItems: Gallery4Item[] = useMemo(
    () =>
      filtered.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        href: "/reservar",
      })),
    [filtered],
  );

  return <Gallery4 items={galleryItems} imageMode="product" />;
}
