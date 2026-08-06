"use client";

import { useRef } from "react";
import { posts } from "@/lib/content";

export function LatestArticlesCarousel() {
  const track = useRef<HTMLDivElement>(null);
  
  // Filter for actual blog posts and select the 6 most recent
  const latest = posts.filter((p) => p.type === "post").slice(0, 6);

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
        {latest.map((post) => (
          <a className="latest-carousel-card" href={`/${post.slug}`} key={post.slug}>
            <div className="latest-card-bg-wrap">
              <img src={post.featuredImage || "/images/taipei-skyline.jpg"} alt="" />
            </div>
            <div className="latest-card-overlay" />
            <div className="latest-card-content">
              <p className="latest-card-category">{post.categories[0]?.name || "Taipei guide"}</p>
              <h3>{post.title}</h3>
              <span className="latest-card-cta">Read Article <span aria-hidden="true">→</span></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
