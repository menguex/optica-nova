import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionDetail } from "@/components/sections/CollectionDetail";
import {
  getAllCollectionSlugs,
  getCollectionBySlug,
} from "@/lib/data/collections";
import { brand } from "@/lib/data/brand";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllCollectionSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) return { title: brand.name };

  return {
    title: `${collection.name} — ${brand.name}`,
    description: collection.overview,
  };
}

export default function CollectionPage({ params }: PageProps) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) notFound();

  return <CollectionDetail collection={collection} />;
}
