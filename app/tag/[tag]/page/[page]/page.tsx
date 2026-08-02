import { notFound } from "next/navigation";
import { CategoryArchive } from "@/components/CategoryArchive";
import { getPostsByTag, getTag, tags } from "@/lib/content";

type PageProperties = { params: Promise<{ tag: string; page: string }> };

export function generateStaticParams() {
  return tags.flatMap((tag) => {
    const pageCount = Math.ceil(getPostsByTag(tag.slug).length / 10);
    return Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) => ({ tag: tag.slug, page: String(index + 2) }));
  });
}

export default async function TagPaginationPage({ params }: PageProperties) {
  const { tag: tagSlug, page } = await params;
  const tag = getTag(tagSlug);
  const currentPage = Number(page);
  const articles = tag ? getPostsByTag(tag.slug) : [];
  const pageCount = Math.ceil(articles.length / 10);

  if (!tag || !Number.isInteger(currentPage) || currentPage < 2 || currentPage > pageCount) notFound();

  return <CategoryArchive category={tag} articles={articles} currentPage={currentPage} basePath={`/tag/${tag.slug}`} description={`Guides and recommendations for ${tag.name.toLowerCase()} in Taipei.`} />;
}
