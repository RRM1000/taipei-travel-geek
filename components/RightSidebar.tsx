import { RightSidebarContentsWidget, type HeadingItem } from "@/components/StickyContentsGuide";
import { KlookSidebarWidget } from "@/components/KlookSidebarWidget";

type RightSidebarProps = {
  headings: HeadingItem[];
  /** Off for pages that opt out of "klookDeals" in GENERIC_UNIT_OPT_OUTS (lib/content.ts). */
  showKlookDeals?: boolean;
  /** Off for pages that opt out of "wise" in GENERIC_UNIT_OPT_OUTS. */
  showWise?: boolean;
};

const KLOOK_SEARCH_URL = "https://www.klook.com/en-GB/search/result/?query=Taipei&aid=8733";
const WISE_URL = "https://wise.com/invite/ecac/robertrichardm17";

/**
 * The article's one side column, as on City Break Geek: the contents card,
 * and under it one compact "Book in Taipei" card. The whole column pins
 * below the header (--sticky-top in app/styles/layout.css).
 *
 * This replaces the old left rail of five Klook deal tiles and the long tail
 * of sidebar sections (write for us, useful guides, categories, tags), which
 * now sit in the band after the article (RelatedGuides). The booking card is
 * desktop only: on a phone the same Klook unit is placed in the article,
 * after the Quick Verdict (see insertMobileBookingCard in app/[slug]/page.tsx).
 */
export function RightSidebar({ headings, showKlookDeals = true, showWise = true }: RightSidebarProps) {
  const showBooking = showKlookDeals || showWise;

  return (
    <aside className="article-right-sidebar" aria-label="Article contents and booking">
      <RightSidebarContentsWidget headings={headings} />

      {showBooking && (
        <section className="sidebar-section sidebar-booking-card" aria-label="Book in Taipei">
          <p className="booking-card-kicker">{showKlookDeals ? "Book in Taipei" : "Money tip"}</p>
          {showKlookDeals && (
            <>
              <KlookSidebarWidget amount="3" />
              <a className="booking-card-link" href={KLOOK_SEARCH_URL} target="_blank" rel="sponsored noopener noreferrer">
                Browse Taipei tours on Klook <span aria-hidden="true">→</span>
              </a>
            </>
          )}
          {showWise && (
            <p className="booking-card-wise">
              {showKlookDeals && <><strong>Money tip:</strong>{" "}</>}
              <a href={WISE_URL} target="_blank" rel="sponsored noopener noreferrer">Wise</a> gives
              you the real exchange rate and a card that works at Taiwan ATMs.
            </p>
          )}
        </section>
      )}
    </aside>
  );
}
