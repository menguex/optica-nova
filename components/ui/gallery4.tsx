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
};

export function Gallery4({ title, description, items }: Gallery4Props) {
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
        opts={{ align: "start", watchResize: true }}
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
              className="basis-[88%] pl-4 sm:basis-[70%] md:basis-[55%] md:pl-6 lg:basis-[42%]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-soft transition-shadow hover:shadow-float">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized={item.image.startsWith("/productos/")}
                    className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 88vw, 42vw"
                  />
                </div>
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

  return <Gallery4 items={galleryItems} />;
}
