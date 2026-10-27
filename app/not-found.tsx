import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="wrap" style={{ paddingBlock: "100px 120px", textAlign: "center" }}>
        <p className="eyebrow" style={{ color: "var(--red-dark)" }}>404 — Page Not Found</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(48px, 6vw, 80px)", margin: "0 0 20px" }}>
          Lost in Taipei?
        </h1>
        <p style={{ maxWidth: "560px", margin: "0 auto 40px", fontSize: "18px", color: "var(--muted)" }}>
          The page or guide you were looking for doesn’t exist or has moved. Explore our main travel sections below to get back on track.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <Link className="btn" href="/">Back to Home Page →</Link>
          <Link className="btn btn--secondary" href="/taipei-guide">Taipei Guide →</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
