"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tap-to-expand for schematic images in article bodies - the MRT network map
 * above all, which is unreadable at column width on a phone.
 *
 * Article HTML is injected with dangerouslySetInnerHTML, so there is no React
 * element to attach a handler to. This listens on the article container and
 * picks out clicks inside a `figure.article-diagram`, the same way NextTrain
 * and DinTaiFungQueue find their markers in the body.
 *
 * The markup it enhances is an ordinary `<a href="{full size}"><img></a>`, so
 * with JavaScript off the link still opens the image on its own. Nothing here
 * is required for the page to work.
 */
export function DiagramLightbox() {
  const [source, setSource] = useState<{ src: string; alt: string } | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setSource(null);
    setZoomed(false);
  }, []);

  useEffect(() => {
    const article = document.querySelector(".article-content");
    if (!article) return;

    const onClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const figure = target?.closest?.("figure.article-diagram");
      if (!figure) return;

      const image = figure.querySelector("img");
      const link = figure.querySelector("a");
      if (!image) return;

      event.preventDefault();
      lastFocused.current = document.activeElement as HTMLElement;
      // Prefer the anchor's target - it points at the unresized original.
      setSource({ src: link?.getAttribute("href") || image.src, alt: image.alt || "" });
    };

    article.addEventListener("click", onClick);
    return () => article.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!source) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    // Hold the page still behind the overlay.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      lastFocused.current?.focus?.();
    };
  }, [source, close]);

  if (!source) return null;

  return (
    <div
      className="diagram-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={source.alt || "Expanded image"}
      onClick={close}
    >
      <button
        type="button"
        ref={closeButtonRef}
        className="diagram-lightbox-close"
        onClick={close}
        aria-label="Close image"
      >
        ×
      </button>
      <div className="diagram-lightbox-scroll" onClick={(event) => event.stopPropagation()}>
        <img
          className={zoomed ? "diagram-lightbox-image is-zoomed" : "diagram-lightbox-image"}
          src={source.src}
          alt={source.alt}
          onClick={() => setZoomed((current) => !current)}
        />
      </div>
      <p className="diagram-lightbox-hint">{zoomed ? "Tap the map to fit it to the screen" : "Tap the map to zoom in"}</p>
    </div>
  );
}
