import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryArchive, categoryPageCount } from "@/components/CategoryArchive";
import { categories } from "@/lib/content";

type PageProperties = { params: Promise<{ category: string; page: string }> };

export function generateStaticParams() {
  return categories.flatMap((category) =>
    Array.from({ length: categoryPageCount(category) }, (_, index) => ({ category: category.slug, page: String(index + 1) })),
  );
}

export async function generateMetadata({ params }: PageProperties): Promise<Metadata> {
  const { category: categorySlug, page } = await params;
  const category = categories.find((item) => item.slug === categorySlug);
  return category ? { title: `${category.name} guides — page ${page}` } : {};
}

export default async function PaginatedCategoryPage({ params }: PageProperties) {
  const { category: categorySlug, page } = await params;
  const category = categories.find((item) => item.slug === categorySlug);
  const currentPage = Number(page);
  if (!category || !Number.isInteger(currentPage) || currentPage < 1 || currentPage > categoryPageCount(category)) notFound();

  return <CategoryArchive category={category} currentPage={currentPage} />;
}
