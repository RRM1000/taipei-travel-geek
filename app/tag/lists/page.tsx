import type { Metadata } from "next";
import { CategoryArchive } from "@/components/CategoryArchive";
import { getPostsByTag } from "@/lib/content";

const lists = { name: "Best of lists", slug: "lists" };
const articles = getPostsByTag("lists");

export const metadata: Metadata = {
  title: "Best of Taipei lists",
  description: "Taipei Travel Geek’s best-of lists for food, places, culture and practical travel planning.",
};

export default function ListsTagPage() {
  return <CategoryArchive category={lists} articles={articles} currentPage={1} basePath="/tag/lists" description="Hand-picked roundups for eating, drinking, sightseeing and making the most of Taipei." />;
}
