"use client";

import { useRef } from "react";
import { Card } from "@/components/Card";

export type GuideSlide = { category: string; title: string; href: string; image: string; imageSrcSet?: string };

/** The slides live in app/page.tsx, which adds each photo's srcset on the server. */
export function GuideCarousel({ slides }: { slides: GuideSlide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * Math.min(track.current.clientWidth * .78, 460), behavior: "smooth" });
  return <section className="carousel-section" aria-label="Featured practical guides"><div className="wrap carousel-heading"><div><p className="eyebrow">Before you go</p><h2>Make the city easier.</h2></div><div className="carousel-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous guides">←</button><button type="button" onClick={() => move(1)} aria-label="Next guides">→</button></div></div><div className="carousel-track wrap" ref={track}>{slides.map((slide) => <Card key={slide.href} className="card--rail" href={slide.href} title={slide.title} image={slide.image} imageSrcSet={slide.imageSrcSet} eyebrow={slide.category} more="Explore guide" />)}</div></section>;
}
