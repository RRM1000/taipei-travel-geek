import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryArchive } from "@/components/CategoryArchive";
import { getPostsByTag, getTag, tags } from "@/lib/content";

type PageProperties = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: PageProperties): Promise<Metadata> {
  const tag = getTag((await params).tag);
  return tag ? { title: `${tag.name} guides`, description: `Taipei Travel Geek guides tagged ${tag.name}.` } : {};
}

export default async function TagPage({ params }: PageProperties) {
  const tag = getTag((await params).tag);
  if (!tag) notFound();

  return <CategoryArchive category={tag} articles={getPostsByTag(tag.slug)} currentPage={1} basePath={`/tag/${tag.slug}`} description={`Guides and recommendations for ${tag.name.toLowerCase()} in Taipei.`} />;
}
