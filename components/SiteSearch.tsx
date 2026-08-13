"use client";

import { useEffect, useState } from "react";
type SearchEntry = { slug: string; title: string; excerpt: string; image: string | null; categories: string[]; tags: string[]; closed?: boolean; searchText: string };

export function SiteSearch() {
  const [open, setOpen] = useState(false), [query, setQuery] = useState(""), [index, setIndex] = useState<SearchEntry[]>([]), [ready, setReady] = useState(false);
  useEffect(() => { if (!open || ready) return; fetch("/search-index.json").then((response) => response.json()).then((data) => { setIndex(data); setReady(true); }); }, [open, ready]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  const fullQuery = query.trim().toLowerCase();
  const terms = fullQuery.split(/\s+/).filter(Boolean);
  // Every term must appear somewhere (title, excerpt, categories, tags, or
  // body), but WHERE it matches determines rank - a title match should
  // always beat a match buried in paragraph three. Without this, results
  // just came back in posts.json's source order, so a post could rank
  // dead last purely because of when it was added, even with an exact
  // title match on the query.
  const results = terms.length === 0 ? [] : index
    .filter((entry) => terms.every((term) => entry.searchText.includes(term)))
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const cats = entry.categories.join(" ").toLowerCase();
      const excerpt = entry.excerpt.toLowerCase();
      const isRoundup = entry.tags.some((tag) => tag.toLowerCase() === "lists");
      let score = title.includes(fullQuery) ? 1000 : 0;
      for (const term of terms) {
        if (title.includes(term)) score += 100;
        else if (cats.includes(term) || excerpt.includes(term)) score += 20;
        else score += 1;
      }
      // When the title STARTS with the query, this is almost always the
      // canonical page for that thing rather than a post that merely mentions
      // it. Without this, "taipei 101" tied three posts on 1200 - the
      // observatory guide, a rooftop bar with the view, and a closed venue -
      // and the winner came down to posts.json source order.
      if (title.startsWith(fullQuery)) score += 400;
      // A "best of X" roundup (tagged Lists) is the definitive guide for a
      // bare topic word - it should outrank single-venue posts that only
      // happen to share a title word, not tie with them. Deliberately small,
      // so it breaks ties without beating a canonical title match.
      if (isRoundup) score += 5;
      // Closed venues stay findable by name - learning a place has shut is a
      // useful result - but should never sit above somewhere still open.
      if (entry.closed) score -= 800;
      return { entry, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((result) => result.entry);
  return <><button type="button" className="search-trigger" onClick={() => setOpen(true)} aria-label="Search guides"><span className="search-placeholder-text">Search 260+ Taipei guides...</span><span className="search-icon-btn" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span></button>{open && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search Taipei guides"><div className="search-dialog"><div className="search-bar"><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Taipei guides" aria-label="Search Taipei guides" /><button type="button" onClick={() => setOpen(false)} aria-label="Close search">×</button></div>{!ready && <p className="search-status">Loading guides…</p>}{ready && terms.length === 0 && <p className="search-status">Try a place, neighbourhood, food or practical topic.</p>}{ready && terms.length > 0 && results.length === 0 && <p className="search-status">No guides found for “{query}”.</p>}{results.length > 0 && <div className="search-results">{results.map((result) => <a href={`/${result.slug}`} key={result.slug} onClick={() => setOpen(false)}><img src={result.image || "/images/taipei-skyline.jpg"} alt="" /><span><b>{result.categories[0] || "Taipei guide"}</b><strong>{result.title}</strong><small>{result.excerpt}</small></span></a>)}</div>}</div></div>}</>;
}

