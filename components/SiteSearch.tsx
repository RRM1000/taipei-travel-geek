"use client";

import { useEffect, useState } from "react";
type SearchEntry = { slug: string; title: string; excerpt: string; image: string | null; categories: string[]; searchText: string };

export function SiteSearch() {
  const [open, setOpen] = useState(false), [query, setQuery] = useState(""), [index, setIndex] = useState<SearchEntry[]>([]), [ready, setReady] = useState(false);
  useEffect(() => { if (!open || ready) return; fetch("/search-index.json").then((response) => response.json()).then((data) => { setIndex(data); setReady(true); }); }, [open, ready]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length === 0 ? [] : index.filter((entry) => terms.every((term) => entry.searchText.includes(term))).slice(0, 8);
  return <><button type="button" className="search-trigger" onClick={() => setOpen(true)} aria-label="Search guides">Search <span aria-hidden="true">⌕</span></button>{open && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search Taipei guides"><div className="search-dialog"><div className="search-bar"><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Taipei guides" aria-label="Search Taipei guides" /><button type="button" onClick={() => setOpen(false)} aria-label="Close search">×</button></div>{!ready && <p className="search-status">Loading guides…</p>}{ready && terms.length === 0 && <p className="search-status">Try a place, neighbourhood, food or practical topic.</p>}{ready && terms.length > 0 && results.length === 0 && <p className="search-status">No guides found for “{query}”.</p>}{results.length > 0 && <div className="search-results">{results.map((result) => <a href={`/${result.slug}`} key={result.slug} onClick={() => setOpen(false)}><img src={result.image || "/images/taipei-skyline.jpg"} alt="" /><span><b>{result.categories[0] || "Taipei guide"}</b><strong>{result.title}</strong><small>{result.excerpt}</small></span></a>)}</div>}</div></div>}</>;
}
