"use client";

import { useRef } from "react";
import { Card } from "@/components/Card";

export type CarouselItem = {
  slug: string;
  title: string;
  featuredImage?: string | null;
  category: string;
};

export function LatestArticlesCarousel({ items }: { items: CarouselItem[] }) {
  const track = useRef<HTMLDivElement>(null);

  const move = (direction: number) => {
    if (track.current) {
      track.current.scrollBy({
        left: direction * Math.min(track.current.clientWidth * 0.78, 460),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="latest-carousel-section" aria-label="Latest articles">
      <div className="wrap latest-carousel-heading">
        <div>
          <p className="eyebrow">Fresh from the blog</p>
          <h2>Latest Guides &amp; Stories</h2>
        </div>
        <div className="latest-carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous articles">
            ←
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next articles">
            →
          </button>
        </div>
      </div>
      <div className="latest-carousel-track wrap" ref={track}>
        {items.map((post) => (
          <Card
            key={post.slug}
            className="card--rail"
            href={`/${post.slug}`}
            title={post.title}
            image={post.featuredImage}
            eyebrow={post.category}
            more="Read article"
          />
        ))}
      </div>
    </section>
  );
}
