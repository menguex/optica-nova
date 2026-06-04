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
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div
      className="product-gallery-media relative overflow-hidden rounded-[2rem] sm:rounded-[2.25rem]"
      style={{ aspectRatio: "3 / 4" }}
    >
      <div className="product-gallery-media__backdrop" aria-hidden />
      <div className="product-gallery-media__vignette" aria-hidden />
      <div
        className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-line/20"
        aria-hidden
      />
      <div className="product-gallery-media__frame">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          objectFit="contain"
          objectPosition="center"
          className="product-gallery-media__img transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 86vw, (max-width: 1024px) 45vw, 384px"
        />
      </div>
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
  const isProduct = imageMode === "product";

  return (
    <div ref={rootRef} className={cn("w-full", isProduct && "product-gallery-root")}>
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "start",
          watchResize: true,
          containScroll: "trimSnaps",
          dragFree: false,
        }}
        className={cn("w-full", imageMode === "product" && "product-gallery-carousel")}
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
          <div className={cn("flex shrink-0 gap-3", !showNav && "hidden")}>
            <CarouselPrevious
              className={cn(
                isProduct &&
                  "h-12 w-12 rounded-full border-line/80 bg-paper shadow-soft hover:shadow-float",
              )}
            />
            <CarouselNext
              className={cn(
                isProduct &&
                  "h-12 w-12 rounded-full border-line/80 bg-paper shadow-soft hover:shadow-float",
              )}
            />
          </div>
        </div>

        <CarouselContent
          className={cn(
            imageMode === "product"
              ? "ml-0 gap-5 md:gap-6"
              : "-ml-4 md:-ml-6",
          )}
        >
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className={cn(
                imageMode === "product"
                  ? "basis-[min(100%,18.5rem)] pl-0 sm:basis-[min(100%,20rem)] md:basis-[min(100%,17.5rem)] lg:basis-[min(100%,19rem)]"
                  : "basis-[88%] pl-4 sm:basis-[70%] md:basis-[55%] md:pl-6 lg:basis-[42%]",
              )}
            >
              <article
                className={cn(
                  "group flex h-full min-w-0 flex-col overflow-hidden border bg-paper shadow-soft transition-[box-shadow,transform] duration-500 ease-luxury hover:shadow-float",
                  isProduct
                    ? "product-gallery-card rounded-[2.5rem] border-line/70 p-2.5 sm:p-3"
                    : "rounded-2xl border-line",
                )}
              >
                {imageMode === "product" || isProductAsset(item.image) ? (
                  <ProductGalleryMedia
                    src={item.image}
                    alt={item.title}
                    priority={items.indexOf(item) === 0}
                  />
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
                <div
                  className={cn(
                    "flex flex-1 flex-col",
                    isProduct
                      ? "product-gallery-card__body m-1 rounded-[1.75rem] bg-cream/50 p-5 md:p-6"
                      : "p-5 md:p-6",
                  )}
                >
                  <h4 className="font-display text-lg tracking-[-0.02em] text-ink md:text-xl">
                    {item.title}
                  </h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                    {item.description}
                  </p>
                  <Link
                    href={item.href ?? "/reservar"}
                    className={cn(
                      "mt-5 inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors",
                      isProduct
                        ? "rounded-full border border-line bg-paper px-5 py-3 text-ink shadow-soft hover:border-optic/40 hover:text-optic"
                        : "text-ink group-hover:text-optic",
                    )}
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
        <div
          className={cn(
            "mt-8 flex justify-center gap-2.5",
            isProduct && "rounded-full border border-line/60 bg-paper/80 px-4 py-3 shadow-soft",
          )}
        >
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir a tarjeta ${index + 1}`}
              aria-current={currentSlide === index ? "true" : undefined}
              onClick={() => carouselApi?.scrollTo(index)}
              className={cn(
                "rounded-full transition-all duration-300",
                isProduct ? "h-2.5" : "h-2",
                currentSlide === index
                  ? cn("bg-optic", isProduct ? "w-8" : "w-6")
                  : cn("bg-line hover:bg-muted", isProduct ? "w-2.5" : "w-2"),
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
