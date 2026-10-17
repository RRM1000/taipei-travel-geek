/**
 * Hosts we earn commission from. Links to these must carry rel="sponsored"
 * (enhanceAffiliateLinks in lib/content.ts), and clicks on them are sent to
 * GA4 as an affiliate_click event (app/layout.tsx).
 *
 * Kept in its own module so the root layout can read it without pulling the
 * whole of posts.json in with lib/content.ts.
 */
export const AFFILIATE_HOSTS = ["klook.com", "kkday.com", "wise.com", "agoda.com", "booking.com", "trip.com", "getyourguide.com"];
