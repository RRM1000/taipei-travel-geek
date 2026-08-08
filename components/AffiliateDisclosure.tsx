/**
 * FTC / ASA disclosure. Rendered above the article body on any post that
 * contains a monetised outbound link, so it is visible before the reader
 * reaches the first one rather than buried in a footer.
 */
export function AffiliateDisclosure() {
  return (
    <p className="affiliate-disclosure">
      Some links on this page earn us a commission if you book through them, at no extra cost to you.
      We only recommend things we have used ourselves.
    </p>
  );
}
