import { NextResponse } from "next/server";

/**
 * Proxies Din Tai Fung's own live queue endpoint.
 *
 * Their site posts to /Queue/Home/WebApiTest with a store id and gets back
 * the current wait plus the number now being called on each party-size
 * queue. It sends no CORS headers, so the browser can't call it directly -
 * hence this route. It also only accepts POST, which is why a plain GET at
 * that URL 404s.
 *
 * Response shape per store:
 *   [{ store_id, wait_time, num_1..num_4, togo_numbers, last_time }]
 * where num_1..num_4 map to the 1-2 / 3-4 / 5-6 / 7+ seating queues.
 */

const UPSTREAM = "https://www.dintaifung.tw/Queue/Home/WebApiTest";

// Taipei-area branches only, in the order we want them displayed. Ids, names
// and street addresses all come from Din Tai Fung's own storeInfo.js, which
// backs their queue page.
//
// Map links are built from the address rather than reused from the article's
// old short links - several of those resolved to the nearest MRT station or
// the host department store rather than the restaurant itself.
const BRANCHES: { id: string; name: string; note?: string; address: string }[] = [
  { id: "0007", name: "Taipei 101", address: "台北市信義區市府路45號" },
  { id: "0015", name: "Xinsheng", address: "台北市中正區信義路二段277號" },
  { id: "0012", name: "A4", address: "台北市信義區松高路19號" },
  { id: "0013", name: "A13", address: "台北市信義區松仁路58號" },
  { id: "0011", name: "Nanxi", address: "台北市中山區南京西路12號" },
  { id: "0003", name: "Fuxing", address: "台北市大安區忠孝東路三段300號" },
  { id: "0005", name: "Tienmu", address: "台北市士林區中山北路六段77號" },
  { id: "0009", name: "Banqiao", note: "New Taipei", address: "新北市板橋區新站路28號" },
];

const mapsUrl = (address: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`鼎泰豐 ${address}`)}`;

/**
 * `open`   - wait_time is a number of minutes.
 * `closed` - branch has stopped issuing dine-in queue numbers for the day.
 *            Upstream signals this by returning the Chinese status string
 *            "已停止內用取號" in wait_time instead of a number, alongside a
 *            non-zero last_time (the Unix second it stopped).
 * `unknown` - request failed or returned something unrecognised.
 */
type BranchStatus = "open" | "closed" | "unknown";
type Branch = { id: string; name: string; note?: string; mapUrl: string; status: BranchStatus; waitMinutes: number | null };

async function fetchBranch(input: { id: string; name: string; note?: string; address: string }): Promise<Branch> {
  const { address, ...rest } = input;
  const branch = { ...rest, mapUrl: mapsUrl(address) };
  try {
    const response = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Their endpoint is fussy about looking like the real page's XHR.
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (compatible; taipeitravelgeek/1.0)",
      },
      body: `storeid=${encodeURIComponent(branch.id)}`,
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) return { ...branch, status: "unknown", waitMinutes: null };

    const rows = (await response.json()) as { wait_time?: string; last_time?: number }[];
    const row = Array.isArray(rows) ? rows[0] : undefined;
    const raw = row?.wait_time;

    const parsed = raw === undefined ? Number.NaN : Number.parseInt(raw, 10);
    if (Number.isFinite(parsed)) return { ...branch, status: "open", waitMinutes: parsed };

    // Anything non-numeric with a stop timestamp means they've shut the
    // dine-in queue rather than the request having gone wrong. Matching on
    // the timestamp as well as the string keeps this working if they ever
    // reword the message.
    const stopped = typeof raw === "string" && raw.length > 0 && Boolean(row?.last_time);
    return { ...branch, status: stopped ? "closed" : "unknown", waitMinutes: null };
  } catch {
    // One slow branch shouldn't take the whole widget down.
    return { ...branch, status: "unknown", waitMinutes: null };
  }
}

export async function GET() {
  const branches = await Promise.all(BRANCHES.map(fetchBranch));
  // "Everything is closed" is a useful answer, so a board of closed branches
  // still counts as a live response - only a total failure to reach upstream
  // should suppress the widget.
  const anyLive = branches.some((branch) => branch.status !== "unknown");

  return NextResponse.json(
    { branches, fetchedAt: new Date().toISOString(), ok: anyLive },
    {
      headers: {
        // Queue times move on the order of minutes, and every reader on the
        // page would otherwise trigger eight upstream calls.
        "Cache-Control": "public, max-age=120, s-maxage=120, stale-while-revalidate=600",
      },
    },
  );
}
