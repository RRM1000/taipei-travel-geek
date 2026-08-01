import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryArchive } from "@/components/CategoryArchive";
import { categories } from "@/lib/content";

type PageProperties = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProperties): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((item) => item.slug === categorySlug);
  return category ? { title: `${category.name} guides`, description: `Taipei Travel Geek’s ${category.name.toLowerCase()} guides.` } : {};
}

export default async function CategoryPage({ params }: PageProperties) {
  const { category: categorySlug } = await params;
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) notFound();

  return <CategoryArchive category={category} currentPage={1} />;
}
