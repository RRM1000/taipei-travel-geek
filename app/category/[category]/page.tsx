import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CategoryArchive } from "@/components/CategoryArchive";
import { categories } from "@/lib/content";

type PageProperties = { params: Promise<{ category: string }> };

/**
 * Categories retired for having one or two members - a single-post archive is
 * a thin page competing with the post it lists. Their URLs are kept alive as
 * permanent redirects to the nearest surviving category rather than 404ing,
 * since they may hold indexed links.
 */
const retiredCategoryRedirects: Record<string, string> = {
  hotels: "areas",
  hostels: "areas",
  "memorial-halls": "buildings",
  amusements: "visit",
};

export function generateStaticParams() {
  return [
    ...categories.map((category) => ({ category: category.slug })),
    ...Object.keys(retiredCategoryRedirects).map((slug) => ({ category: slug })),
  ];
}

export async function generateMetadata({ params }: PageProperties): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((item) => item.slug === categorySlug);
  return category ? { title: `${category.name} guides`, description: `Taipei Travel Geek’s ${category.name.toLowerCase()} guides.` } : {};
}

export default async function CategoryPage({ params }: PageProperties) {
  const { category: categorySlug } = await params;

  const redirectTo = retiredCategoryRedirects[categorySlug];
  if (redirectTo) permanentRedirect(`/category/${redirectTo}`);

  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) notFound();

  return <CategoryArchive category={category} currentPage={1} />;
}
