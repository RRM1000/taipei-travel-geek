"use client";

import { useRef } from "react";

const slides = [
  { category: "Sightseeing", title: "Is the Taipei Fun Pass worth it?", href: "/taipei-fun-pass", image: "/media/2019/12/taiwan-fun-pass.jpg" },
  { category: "Shopping", title: "A simple guide to Taiwan's tourist tax refund", href: "/taiwan-tourist-tax-refund", image: "/media/2019/12/taiwan-tax-refund.png" },
  { category: "Everyday Taipei", title: "Using a public sports centre gym", href: "/sports-centre-gym", image: "/media/2019/10/Sports-Centre-Gym-11-1024x724.jpg" },
  { category: "Practical", title: "How to use a Taipei launderette", href: "/taipei-laundrettes", image: "/media/2019/05/Laundrette-7-686x1024.jpg" },
];

export function GuideCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * Math.min(track.current.clientWidth * .78, 460), behavior: "smooth" });
  return <section className="carousel-section" aria-label="Featured practical guides"><div className="wrap carousel-heading"><div><p className="eyebrow">Before you go</p><h2>Make the city easier.</h2></div><div className="carousel-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous guides">←</button><button type="button" onClick={() => move(1)} aria-label="Next guides">→</button></div></div><div className="carousel-track wrap" ref={track}>{slides.map((slide) => <a className="carousel-card" href={slide.href} key={slide.href}><img src={slide.image} alt="" /><div><p>{slide.category}</p><h3>{slide.title}</h3><span>Explore guide →</span></div></a>)}</div></section>;
}
