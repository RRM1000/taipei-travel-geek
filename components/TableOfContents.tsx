"use client";

import { useEffect, useState } from "react";

export type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

type TableOfContentsProps = {
  headings: HeadingItem[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

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
      { rootMargin: "-80px 0px -70% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <section className="sidebar-section sidebar-contents-guide">
      <p className="sidebar-kicker">On this page</p>
      <nav aria-label="On this page">

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
                    const top = target.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top, behavior: "smooth" });
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
    </section>
  );
}
