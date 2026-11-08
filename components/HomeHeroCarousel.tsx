"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The home hero, as on London Travel Geek and City Break Geek: a few guides in
 * turn, each photo fading in and slowly zooming while its line and button
 * change with it, and a bar of one segment per slide along the bottom. The
 * active segment fills while its slide shows; clicking a segment jumps to it.
 * Readers who ask for less motion get the first slide, still, and can step
 * through with the bar.
 *
 * The first slide is the site itself and keeps the page's h1. The others are
 * hand-written because article titles are too long for a hero. Keep the lines
 * free of prices and dates: nobody re-checks a hero.
 *
 * Only the first slide's photo is in the HTML. The others are stacked on top
 * of it at opacity 0, so to the browser they are on screen and loading="lazy"
 * does nothing: all seven used to download on arrival, about 2.5 MB on a
 * phone. Instead each photo is added a few seconds before its turn (or at
 * once when a segment is clicked), and nothing past the first loads for
 * readers who get the still version.
 */

export type HeroSlide = {
  label: string;
  image: string;
  /** Filled in by HomeHero from lib/hero-images.json. */
  width?: number;
  height?: number;
  /** Filled in by HomeHero from lib/responsive-images.ts. */
  srcSet?: string;
  sizes?: string;
  alt: string;
  position?: string;
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  cta: { href: string; label: string };
};

const SHOW_MS = 7000;
// How long into a slide the next slide's photo is requested.
const PRELOAD_AFTER_MS = 4000;

export function HomeHeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  // Bumped on every change so the active segment's fill restarts from empty.
  const [cycle, setCycle] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const currentRef = useRef(0);
  // Which slides' photos are in the page. See the note at the top.
  const [wanted, setWanted] = useState<readonly boolean[]>(() => slides.map((_, i) => i === 0));
  const want = useCallback((n: number) => {
    setWanted((list) => (list[n] ? list : list.map((on, i) => on || i === n)));
  }, []);

  const show = useCallback(
    (n: number) => {
      const next = (n + slides.length) % slides.length;
      want(next);
      if (next !== currentRef.current) setPrevious(currentRef.current);
      currentRef.current = next;
      setCurrent(next);
      setCycle((c) => c + 1);
    },
    [slides.length, want],
  );

  // The outgoing photo keeps zooming while it fades, then lets go.
  useEffect(() => {
    if (previous === null) return;
    const t = window.setTimeout(() => setPrevious(null), 1500);
    return () => window.clearTimeout(t);
  }, [previous, cycle]);

  useEffect(() => {
    window.clearTimeout(timer.current);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || slides.length < 2) return;
    const tick = () => {
      if (document.hidden) {
        timer.current = window.setTimeout(tick, SHOW_MS);
      } else {
        show(current + 1);
      }
    };
    timer.current = window.setTimeout(tick, SHOW_MS);
    const preload = window.setTimeout(() => want((current + 1) % slides.length), PRELOAD_AFTER_MS);
    return () => {
      window.clearTimeout(timer.current);
      window.clearTimeout(preload);
    };
  }, [current, cycle, show, slides.length, want]);

  return (
    <section className="hero hero-carousel" style={{ "--hero-show": `${SHOW_MS}ms` } as React.CSSProperties}>
      <div className="hero-bg">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            className={`hero-slide${i === current ? " is-active" : ""}${i === previous ? " was-active" : ""}`}
          >
            {wanted[i] && <img
              src={slide.image}
              srcSet={slide.srcSet}
              sizes={slide.sizes}
              width={slide.width}
              height={slide.height}
              alt={i === 0 ? slide.alt : ""}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              {...(i === 0 ? { fetchPriority: "high" as const } : {})}
              style={slide.position ? { objectPosition: slide.position } : undefined}
            />}
          </div>
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-content">
        <div className="hero-stack">
          {slides.map((slide, i) => (
            <div key={slide.label} className={`hero-copy-block${i === current ? " is-active" : ""}`} aria-hidden={i !== current}>
              <p className="eyebrow light">{slide.eyebrow}</p>
              {i === 0 ? <h1>{slide.title}</h1> : <p className="hero-title">{slide.title}</p>}
              <p className="hero-copy">{slide.text}</p>
              <a className="button" href={slide.cta.href} tabIndex={i === current ? undefined : -1}>
                {slide.cta.label} <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
        {slides.length > 1 && (
          <ol className="hero-steps" style={{ "--steps": slides.length } as React.CSSProperties}>
            {slides.map((slide, i) => (
              <li key={slide.label}>
                <button
                  type="button"
                  className={`hero-step${i < current ? " is-done" : ""}${i === current ? " is-active" : ""}`}
                  aria-label={`Show ${slide.label}`}
                  aria-current={i === current}
                  onClick={() => show(i)}
                >
                  <span className="hero-fill" key={i === current ? `active-${cycle}` : "idle"} />
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
