import { notFound, permanentRedirect } from "next/navigation";
import { CategoryArchive } from "@/components/CategoryArchive";
import { ARCHIVE_PAGE_SIZE, getPostsByTag, getTag, tags } from "@/lib/content";

type PageProperties = { params: Promise<{ tag: string; page: string }> };

export function generateStaticParams() {
  return tags.flatMap((tag) => {
    const pageCount = Math.ceil(getPostsByTag(tag.slug).length / ARCHIVE_PAGE_SIZE);
    return Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) => ({ tag: tag.slug, page: String(index + 2) }));
  });
}

export default async function TagPaginationPage({ params }: PageProperties) {
  const { tag: tagSlug, page } = await params;
  const tag = getTag(tagSlug);
  const currentPage = Number(page);
  const articles = tag ? getPostsByTag(tag.slug) : [];
  const pageCount = Math.ceil(articles.length / ARCHIVE_PAGE_SIZE);

  if (!tag || !Number.isInteger(currentPage) || currentPage < 2) notFound();
  // See the category route: retired page numbers redirect rather than 404.
  if (currentPage > pageCount) permanentRedirect(`/tag/${tag.slug}`);

  return <CategoryArchive category={tag} articles={articles} currentPage={currentPage} basePath={`/tag/${tag.slug}`} description={`Guides and recommendations for ${tag.name.toLowerCase()} in Taipei.`} />;
}
