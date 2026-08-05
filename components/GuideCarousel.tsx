"use client";

import { useRef } from "react";

const slides = [
  { category: "Sightseeing", title: "Is the Taipei Fun Pass worth it?", href: "/taipei-fun-pass", image: "/media/2019/12/taiwan-fun-pass.jpg" },
  { category: "Transport", title: "Your first purchase: the EasyCard", href: "/taiwan-easycard", image: "/media/2019/04/easy-card.jpg" },
  { category: "Connectivity", title: "Which Taiwan SIM card should you get?", href: "/taiwan-sim-cards", image: "/media/2019/08/SIM-Cards-Taiwan-3-1024x654.jpg" },
  { category: "Transport", title: "Getting around Taipei, every option explained", href: "/taipei-public-transport", image: "/media/2019/08/Taipei-Airport-Express-2-1024x688.jpg" },
];

export function GuideCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * Math.min(track.current.clientWidth * .78, 460), behavior: "smooth" });
  return <section className="carousel-section" aria-label="Featured practical guides"><div className="wrap carousel-heading"><div><p className="eyebrow">Before you go</p><h2>Make the city easier.</h2></div><div className="carousel-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous guides">←</button><button type="button" onClick={() => move(1)} aria-label="Next guides">→</button></div></div><div className="carousel-track wrap" ref={track}>{slides.map((slide) => <a className="carousel-card" href={slide.href} key={slide.href}><img src={slide.image} alt="" /><div><p>{slide.category}</p><h3>{slide.title}</h3><span>Explore guide →</span></div></a>)}</div></section>;
}
