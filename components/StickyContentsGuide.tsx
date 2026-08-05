"use client";

import { useEffect, useRef, useState } from "react";

export type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

type ContentsProps = {
  headings: HeadingItem[];
};

export function RightSidebarContentsWidget({ headings }: ContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true); // Default open for desktop SSR
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Collapse by default on mobile screens (< 880px)
    if (window.innerWidth < 880) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-145px 0px -70% 0px", threshold: 0.1 }

    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (!activeId || !isOpen || !containerRef.current) return;

    const activeItem = containerRef.current.querySelector(`.toc-item.active`);
    if (activeItem) {
      const itemTop = (activeItem as HTMLElement).offsetTop;
      const containerHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: Math.max(0, itemTop - containerHeight / 2 + 15),
        behavior: "smooth",
      });
    }
  }, [activeId, isOpen]);

  if (!headings || headings.length === 0) return null;

  return (
    <section className="sidebar-section sidebar-contents-guide guide-card-box">
      <button
        type="button"
        className="guide-card-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="guide-card-title">In this guide</span>
        <span className="guide-card-icon" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div ref={containerRef} className="sidebar-toc-container">
          <nav aria-label="In this guide navigation">
            <ul className="sidebar-toc-list">
              {headings.map((h) => (
                <li
                  key={h.id}
                  className={`toc-item level-${h.level}${activeId === h.id ? " active" : ""}`}
                >
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(h.id);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                        history.pushState(null, "", `#${h.id}`);
                      }
                    }}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </section>
  );
}
