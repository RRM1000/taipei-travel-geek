/**
 * The site's one card. Every guide card (homepage rows, carousels, first
 * timers, category archives) renders through this, so they share one visual
 * language: a 3:2 photo, a red category eyebrow, a serif title, an optional
 * excerpt and footer. Styles live in app/styles/components.css (.card).
 *
 * The title link is stretched over the whole card (.card-link::after), so a
 * card is one link and one tab stop rather than three (image, title, arrow).
 */
const FALLBACK_IMAGE = "/images/taipei-skyline.webp";

// The photo's rendered width in each layout (app/styles/components.css), so a
// phone picks the 800w copy for a full-width card and the 400w one for a list
// thumbnail. A list thumbnail is cover-fitted into a roughly square box, so
// its photo is drawn wider than the 7-9rem column.
const SIZES = {
  default: "(max-width: 620px) 100vw, (max-width: 960px) 50vw, 520px",
  rail: "(max-width: 410px) 78vw, 320px",
  list: "200px",
};

export type CardProps = {
  href: string;
  title: string;
  image?: string | null;
  /** From responsiveSrcSet() in lib/responsive-images.ts, worked out on the server. */
  imageSrcSet?: string;
  eyebrow?: string;
  excerpt?: string | null;
  /** Small muted line in the footer, e.g. "Updated Aug 2026". */
  meta?: string;
  /** Footer call to action, e.g. "Read guide". An arrow is added. */
  more?: string;
  /** "list" is the compact horizontal card: thumbnail left, copy right. */
  variant?: "default" | "list";
  headingLevel?: "h2" | "h3";
  /** Above-the-fold cards load eagerly; everything else is lazy. */
  eager?: boolean;
  className?: string;
};

export function Card({
  href,
  title,
  image,
  imageSrcSet,
  eyebrow,
  excerpt,
  meta,
  more,
  variant = "default",
  headingLevel = "h3",
  eager = false,
  className,
}: CardProps) {
  const Heading = headingLevel;
  const classes = ["card", variant === "list" ? "card--list" : "", className || ""].filter(Boolean).join(" ");
  return (
    <article className={classes}>
      <div className="card-media">
        <img
          src={image || FALLBACK_IMAGE}
          srcSet={imageSrcSet}
          sizes={imageSrcSet ? SIZES[variant === "list" ? "list" : className?.includes("card--rail") ? "rail" : "default"] : undefined}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="card-body">
        {eyebrow && <p className="card-eyebrow">{eyebrow}</p>}
        <Heading className="card-title">
          <a className="card-link" href={href}>{title}</a>
        </Heading>
        {excerpt && <p className="card-excerpt">{excerpt}</p>}
        {(meta || more) && (
          <div className="card-footer">
            {meta && <span className="card-meta">{meta}</span>}
            {more && <span className="card-more" aria-hidden="true">{more} <span>→</span></span>}
          </div>
        )}
      </div>
    </article>
  );
}
