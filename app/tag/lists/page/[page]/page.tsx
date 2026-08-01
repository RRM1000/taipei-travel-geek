import { notFound } from "next/navigation";
import { CategoryArchive } from "@/components/CategoryArchive";
import { getPostsByTag } from "@/lib/content";

type PageProperties = { params: Promise<{ page: string }> };
const lists = { name: "Best of lists", slug: "lists" };
const articles = getPostsByTag("lists");
const pageSize = 10;

export function generateStaticParams() {
  const pageCount = Math.ceil(articles.length / pageSize);
  return Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export default async function ListsTagPaginationPage({ params }: PageProperties) {
  const page = Number((await params).page);
  const pageCount = Math.ceil(articles.length / pageSize);
  if (!Number.isInteger(page) || page < 2 || page > pageCount) notFound();

  return <CategoryArchive category={lists} articles={articles} currentPage={page} basePath="/tag/lists" description="Hand-picked roundups for eating, drinking, sightseeing and making the most of Taipei." />;
}
