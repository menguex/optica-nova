"use client";

import { useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Gallery4 } from "@/components/ui/gallery4";
import {
  productGalleryCategories,
  productGalleryItems,
  type ProductGalleryItem,
} from "@/lib/data/product-gallery";
import { cn } from "@/lib/utils";

export function Products() {
  const [activeCategory, setActiveCategory] =
    useState<ProductGalleryItem["category"]>("armazones");

  const activeMeta = productGalleryCategories.find(
    (cat) => cat.id === activeCategory,
  );

  const filteredItems = productGalleryItems.filter(
    (item) => item.category === activeCategory,
  );

  return (
    <section id="productos" className="bg-cream py-24 md:py-32">
      <PageContainer size="wide">
        <SectionHeader
          eyebrow="07 — PRODUCTOS"
          title={
            <>
              Armazones y cristales
              <br />
              <span className="text-accent">para cada necesidad.</span>
            </>
          }
          subtitle="Desliza para explorar nuestra oferta de armazones, tratamientos y materiales de cristales."
          className="mb-10"
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {productGalleryCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === cat.id
                  ? "border-cta bg-cta text-cta-fg"
                  : "border-line bg-paper text-muted hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <Gallery4
          key={activeCategory}
          title={activeMeta?.label}
          description={activeMeta?.description}
          items={filteredItems.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image,
            href: "/reservar",
          }))}
        />
      </PageContainer>
    </section>
  );
}
