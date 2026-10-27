import { RightSidebarContentsWidget, type HeadingItem } from "@/components/StickyContentsGuide";

type RightSidebarProps = {
  headings: HeadingItem[];
  /** Off for pages that opt out of "klookDeals" in GENERIC_UNIT_OPT_OUTS (lib/content.ts). */
  showKlookDeals?: boolean;
  /** Off for pages that opt out of "wise" in GENERIC_UNIT_OPT_OUTS. */
  showWise?: boolean;
};

const KLOOK_SEARCH_URL = "https://www.klook.com/en-GB/search/result/?query=Taipei&aid=8733";
const KLOOK_HOTELS_URL = "https://www.klook.com/en-GB/destination/c19-taipei/3-hotel/?aid=8733";
const WISE_URL = "https://wise.com/invite/ecac/robertrichardm17";

/**
 * The article's one side column, as on City Break Geek: the contents card,
 * and under it one compact "Book your trip" card of plain links (tours,
 * hotels, our where-to-stay guide). The whole column pins below the header
 * (--sticky-top in app/styles/layout.css).
 *
 * The Klook deals widget that used to sit here now goes inside the article
 * instead, mid-post on desktop and after the Quick Verdict on a phone (see
 * insertDesktopBookingCard and insertMobileBookingCard in
 * app/[slug]/page.tsx), so the two never sit side by side.
 */
export function RightSidebar({ headings, showKlookDeals = true, showWise = true }: RightSidebarProps) {
  const showBooking = showKlookDeals || showWise;

  return (
    <aside className="article-right-sidebar" aria-label="Article contents and booking">
      <RightSidebarContentsWidget headings={headings} />

      {showBooking && (
        <section className="sidebar-section sidebar-booking-card" data-placement="sidebar" aria-label="Book your trip">
          <p className="booking-card-kicker">{showKlookDeals ? "Book your trip" : "Money tip"}</p>
          {showKlookDeals && (
            <ul className="booking-card-list">
              <li>
                <a href={KLOOK_SEARCH_URL} target="_blank" rel="sponsored noopener noreferrer">
                  <span className="booking-card-name">Taipei tours &amp; tickets</span>
                  <span className="booking-card-note">Taipei 101, day trips and food tours on Klook</span>
                </a>
              </li>
              <li>
                <a href={KLOOK_HOTELS_URL} target="_blank" rel="sponsored noopener noreferrer">
                  <span className="booking-card-name">Hotels in Taipei</span>
                  <span className="booking-card-note">Compare prices on Klook</span>
                </a>
              </li>
              <li>
                <a href="/best-areas-and-hotels-to-stay">
                  <span className="booking-card-name">Where to stay</span>
                  <span className="booking-card-note">Our guide to the best areas and hotels</span>
                </a>
              </li>
            </ul>
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
