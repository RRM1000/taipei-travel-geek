import imageVariants from "@/lib/image-variants.json";

/**
 * srcset for the site's photos, from the WebP copies that
 * scripts/build-image-variants.mjs writes to public/sized/ (400w and 800w of
 * everything, plus 1200w and 1600w of featured and hero images).
 *
 * The site has no on-the-fly image resizing (it runs on a Cloudflare Worker
 * without an Images binding), so without this a phone downloads the same
 * 1024-2400px file as a desktop for a 330px card. With it, the browser picks
 * the smallest copy that is still sharp for the slot's `sizes` and the
 * screen's pixel density.
 *
 * Server-only: the JSON lists ~3,000 photos, so client components get the
 * finished srcset string as a prop instead of importing this.
 *
 * `src` stays the original file (it is what Google Images and old links know),
 * and the original is kept as the largest srcset candidate when it is wider
 * than every copy, so large high-density screens are never sent anything
 * softer than before.
 */

// [ext, source suffix, source bytes, width, height, ...copy widths]
type VariantRow = [string, string, number, number, number, ...number[]];
const VARIANTS = imageVariants as unknown as Record<string, VariantRow>;
const FILE = /^(\/(?:media|images)\/.*?)(-(\d+)x(\d+))?\.(jpe?g|png|webp)$/i;
// An original heavier than this is not offered even to the largest screens:
// a few are barely compressed camera files, and sharper is not worth 700 KB+.
const MAX_ORIGINAL_BYTES = 700 * 1024;

const cache = new Map<string, string | undefined>();

/**
 * Builds srcset for `src`, or returns undefined when there are no smaller
 * copies (an external image, a GIF, a photo added since the last build, or a
 * cropped copy whose shape differs from its original's).
 *
 * `width`/`height` are the referenced file's pixel size if known; they are
 * only needed for files whose name carries no "-WIDTHxHEIGHT" suffix.
 */
export function responsiveSrcSet(src: string | null | undefined, width?: number, height?: number): string | undefined {
  if (!src) return undefined;
  const key = `${src}|${width ?? ""}|${height ?? ""}`;
  if (cache.has(key)) return cache.get(key);
  const result = build(src, width, height);
  cache.set(key, result);
  return result;
}

function build(src: string, width?: number, height?: number): string | undefined {
  if (/[\s,?#]/.test(src)) return undefined;
  const m = FILE.exec(src);
  if (!m) return undefined;
  const stem = m[1];
  const row = VARIANTS[stem];
  if (!row || row[0] !== m[5].toLowerCase()) return undefined;
  const [, sourceSuffix, sourceBytes, sourceWidth, sourceHeight, ...widths] = row;
  if (!widths.length) return undefined;

  const isSource = src.slice(stem.length) === sourceSuffix;
  let refWidth = m[3] ? Number(m[3]) : width;
  let refHeight = m[4] ? Number(m[4]) : height;
  if (isSource) {
    refWidth = sourceWidth;
    refHeight = sourceHeight;
  }
  if (!refWidth || !refHeight) return undefined;

  // The copies are of the source; only use them if this file shows the same
  // picture, i.e. it is a proportional resize rather than a square crop.
  const ratio = sourceWidth / sourceHeight;
  if (Math.abs(refWidth / refHeight - ratio) / ratio > 0.02) return undefined;

  const candidates = widths.map((w) => `/sized${stem}-${w}w.webp ${w}w`);
  const largest = widths[widths.length - 1];
  if (refWidth > largest && !(isSource && sourceBytes > MAX_ORIGINAL_BYTES)) {
    candidates.push(`${src} ${refWidth}w`);
  }
  return candidates.join(", ");
}

/**
 * `sizes` for the shared slots. Each is the rendered width of the image box
 * (object-fit: cover boxes included), so the browser's pick is sharp at any
 * pixel density without over-fetching.
 */
export const IMAGE_SIZES = {
  // Full-bleed heroes. On a phone the hero is taller than it is wide, so the
  // cover-fitted photo is wider than the screen; 150vw lands on the 1200w copy
  // at 2x, which is plenty under the hero's dark shade.
  hero: "(max-width: 600px) 150vw, 100vw",
} as const;

/** srcset for a Card's photo, including the skyline Card falls back to. */
export function cardSrcSet(image: string | null | undefined): string | undefined {
  return responsiveSrcSet(image || "/images/taipei-skyline.webp");
}
