import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionDetail } from "@/components/sections/CollectionDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { collectionMetadata } from "@/lib/seo/metadata";
import {
  getAllCollectionSlugs,
  getCollectionBySlug,
} from "@/lib/data/collections";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllCollectionSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) return {};

  return collectionMetadata({
    name: collection.name,
    overview: collection.overview,
    slug: collection.slug,
  });
}

export default function CollectionPage({ params }: PageProps) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: collection.name, path: `/colecciones/${collection.slug}` },
        ])}
      />
      <CollectionDetail collection={collection} />
    </>
  );
}
