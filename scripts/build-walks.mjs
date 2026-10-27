// Build the walking-route data behind the numbered route maps on the walk posts.
//
//   node scripts/build-walks.mjs                 write data/walks/<slug>.json
//   node scripts/build-walks.mjs --report        print stops, legs and distances only
//   node scripts/build-walks.mjs --fetch-paths   also (re)fetch walking paths for
//                                                the hand-written walks (see below)
//
// WHY. The walks used to embed a Google My Maps iframe: Google's map, Google's
// pins, lettered A-I by the directions tool, and nothing on it a crawler could
// read. London Travel Geek draws its walks itself - a street map, numbered pins
// in walking order joined by the route, and an "Open in Google Maps" link with
// the stops as waypoints - and the Taipei walks now do the same (see
// components/WalkRouteMap.tsx and lib/walks.ts).
//
// WHERE THE DATA COMES FROM. data/maps/<mid>.json, the My Maps export made by
// scripts/export-my-maps.mjs. Each walk map has a "directions" layer: one line
// (the walking path Google worked out) plus one point per waypoint, in walking
// order. Those points are the lettered stops in the post, so they become the
// numbered stops here, one for one. Their names in the export are mostly
// street addresses ("No. 214, Section 2, Fuxing S Rd"), so each stop is named
// below from the post's own step-by-step text instead. The other layer holds
// the hand-placed pins (restaurants, landmarks); the ones the post mentions but
// that are not numbered stops are carried across as "also on the map" pins.
//
// Distances are measured along the directions line, so they follow the
// streets rather than the crow. They are an estimate - the pages say "about".
//
// HAND-WRITTEN WALKS. Walks added after the My Maps era (Wanhua, Dadaocheng,
// Xinbeitou) have no export. Their stops - names, site pages and coordinates
// checked against OpenStreetMap - live in data/walks-input/<slug>.json, and
// they come out in exactly the same data/walks format. The line between stops
// is a real walking path from the OSRM foot profile on routing.openstreetmap.de
// (OpenStreetMap data), fetched one leg at a time with --fetch-paths and cached
// in data/walks-input/paths/<slug>.json, so normal builds never touch the
// network. Without a cached path, a leg is drawn as a straight line between
// its stops, as London Travel Geek does.

import fs from "node:fs";
import path from "node:path";

const MAPS_DIR = path.resolve("data/maps");
const HAND_DIR = path.resolve("data/walks-input");
const PATHS_DIR = path.join(HAND_DIR, "paths");
const OUT_DIR = path.resolve("data/walks");
const report = process.argv.includes("--report");
const fetchPaths = process.argv.includes("--fetch-paths");
const FOOT_ROUTER = "https://routing.openstreetmap.de/routed-foot/route/v1/foot";

/**
 * One entry per walk post. `layer` picks the directions layer in the export by
 * name; `stops` must list exactly one name per waypoint in that layer, in
 * order. `extras` pick pins from the export by their exported name.
 */
const WALKS = [
  {
    slug: "daan-walking-route",
    mid: "1AmROqVqlBufN153Jf_ME0clo-p4tgkFW",
    title: "the Daan walking route from Jianguo Flower Market to Chiang Kai-shek Memorial Hall",
    duration: "4 to 6 hours",
    routes: [
      {
        id: "route",
        layer: /^Directions from/,
        stops: [
          { name: "Jianguo Flower Market", url: "/jianguo-flower-market" },
          { name: "Jianguo Weekend Artist's Corner" },
          { name: "Daan Forest Park", url: "/daan-forest-park" },
          { name: "Dongmen Market and Yongkang Street", url: "/yongkang-street" },
          { name: "Chiang Kai-shek Memorial Hall", url: "/chiang-kai-shek-memorial-hall" },
          { name: "Chiang Kai-shek Memorial Hall MRT (exit 2)" },
        ],
      },
    ],
    extras: [],
  },
  {
    slug: "zhongzheng-walking-route",
    mid: "1d5RuUPsOM6MPTU13ODnRiMq3d6X6q4C0",
    title: "the Zhongzheng walking route from Chiang Kai-shek Memorial Hall to 228 Peace Memorial Park",
    duration: "5 to 7 hours",
    routes: [
      {
        id: "route",
        layer: /^Walking Directions$/,
        stops: [
          { name: "Chiang Kai-shek Memorial Hall Station" },
          { name: "The East Gate" },
          { name: "National Taiwan University Hospital" },
          { name: "Taipei Guest House", url: "/taipei-guest-house" },
          { name: "Ministry of Foreign Affairs" },
          { name: "Taiwan Provincial City God Temple" },
          { name: "Land Bank Exhibition Hall", url: "/national-taiwan-museum" },
          { name: "National Taiwan Museum", url: "/national-taiwan-museum" },
          { name: "228 Peace Memorial Park", url: "/peace-park" },
        ],
      },
    ],
    extras: [
      { pin: "National Chiang Kai-shek Memorial Hall", name: "Chiang Kai-shek Memorial Hall", url: "/chiang-kai-shek-memorial-hall" },
      { pin: "Liberty Square Arch", name: "Liberty Square Arch" },
      { pin: "National Concert Hall", name: "National Concert Hall" },
      { pin: "國家兩廳院", name: "National Theater" },
      { pin: "Chun Shui Tang", name: "Chun Shui Tang", url: "/chun-shui-tang" },
      { pin: "Presidential Office Building", name: "Presidential Office Building", url: "/presidential-office-building" },
      { pin: "Jin Feng Braised Pork Rice", name: "Jin Feng Braised Pork Rice", url: "/jin-feng-braised-pork-rice" },
    ],
  },
  {
    slug: "gongguan-walking-route",
    mid: "13MSBymYL_OYhuNh0zzW_O66BMchnp8k",
    title: "the Gongguan walking route through NTU, Taipei Water Park and Treasure Hill",
    duration: "8 to 10 hours",
    routes: [
      {
        id: "route",
        layer: /^Directions from/,
        stops: [
          { name: "Technology Building Station" },
          { name: "NTU campus and Drunken Moon Lake", url: "/national-taiwan-university" },
          { name: "NTU main campus and the Fu Bell", url: "/national-taiwan-university" },
          { name: "Fu Yuan (Fu Ssu-nien Memorial Garden)", url: "/national-taiwan-university" },
          { name: "Gongguan, for lunch", url: "/gongguan" },
          { name: "Drinking Water Museum", url: "/see-the-drinking-water-museum-at-taipei-water-park" },
          { name: "Taipei Water Park trails" },
          { name: "Treasure Hill Art Village", url: "/treasure-hill" },
          { name: "Gongguan Night Market", url: "/gongguan-night-market" },
        ],
        // The post says not to follow Google's directions from the Water Park
        // trails to Treasure Hill - a path and a one-way turnstile behind the
        // reservoir take you straight there - so that leg is drawn direct.
        direct: [8],
      },
    ],
    extras: [
      { pin: "Yong He Soy Milk King", name: "Yong He Soy Milk King", url: "/yong-he-soy-milk-king" },
      { pin: "The Diner", name: "The Diner", url: "/the-diner" },
      { pin: "YU POKÉ", name: "YU POKÉ", url: "/yu-poke" },
      { pin: "Lan Jia Gua Bao Traditional Taiwanese Snack", name: "Lan Jia Gua Bao", url: "/lan-jia-traditional-taiwanese-snack" },
      { pin: "Madame Jill's Vietnamese Cuisine", name: "Madame Jill's Vietnamese Cuisine" },
      { pin: "El Sabroso Mexican Food", name: "El Sabroso Mexican Food" },
    ],
  },
  {
    slug: "datong-walking-route",
    mid: "1d2NXfrxGHCP_xKV9kB6suSL8LwRKyi0i",
    title: "the Datong walking routes from Yuanshan MRT",
    // The post gives a time per route (3-4 hours west, 5-6 east) and 8-10
    // hours for both, so the time sits on each route here.
    duration: null,
    routes: [
      {
        // The My Maps layer names are the wrong way round: the layer called
        // "West Walk" runs east of Yuanshan to the museums and parks, which is
        // the post's East Route, and vice versa. The post's headings match
        // the geography, so they win.
        id: "east",
        label: "East route",
        duration: "5 to 6 hours",
        layer: /^West Walk/,
        stops: [
          { name: "Yuanshan MRT, exit 1" },
          { name: "Expo Farmer's Market", url: "/expo-farmers-market" },
          { name: "Taipei Story House", url: "/taipei-story-house" },
          { name: "Taipei Fine Arts Museum", url: "/fine-arts-museum" },
          { name: "Site of the Indigenous Cultural Centre (demolished)" },
          { name: "Lin An Tai Ancestral House", url: "/lin-an-tai-ancestral-house" },
          { name: "Taipei Collective Botanical Garden", url: "/collective-botanical-garden" },
          { name: "The garden maze" },
        ],
      },
      {
        id: "west",
        label: "West route",
        duration: "3 to 4 hours",
        layer: /^East Walk/,
        stops: [
          { name: "Yuanshan MRT" },
          { name: "Baoan Temple Garden", url: "/dalongdong-baoan-temple-and-gardens" },
          { name: "Dalongdong Baoan Temple", url: "/dalongdong-baoan-temple-and-gardens" },
          { name: "Taipei Confucius Temple", url: "/confucius-temple" },
          { name: "Dalong Street Night Market" },
          { name: "Back to Yuanshan MRT" },
        ],
      },
    ],
    extras: [
      { pin: "MAJI Square", name: "MAJI Square", url: "/maji-square" },
      { pin: "Taipei Rose Garden", name: "Rose Garden, Xinsheng Park", url: "/xinsheng-park" },
    ],
  },
  {
    slug: "songshan-xinyi-walking-tour",
    mid: "1Qf26AeJpZUD8do8PdZ15eJGReKX6nT2w",
    title: "the Songshan and Xinyi walking route from Sun Yat-sen Memorial Hall to Taipei 101",
    duration: "6 to 8 hours",
    routes: [
      {
        id: "route",
        layer: /^Walking Route$/,
        stops: [
          { name: "Sun Yat-sen Memorial Hall Station" },
          { name: "Sun Yat-sen Memorial Hall", url: "/sun-yat-sen-memorial-hall" },
          { name: "Songshan Cultural and Creative Park", url: "/songshan-cultural-and-creative-park" },
          { name: "Xinyi Shopping District", url: "/xinyi-shopping-district" },
          { name: "Breeze Nan Shan" },
          { name: "Taipei 101", url: "/taipei-101" },
        ],
      },
    ],
    extras: [],
  },
];

// ------------------------------------------------------------- geometry ---
const EARTH_RADIUS_M = 6371008.8;
const toRad = (deg) => (deg * Math.PI) / 180;

/** Great-circle distance in metres between two [lat, lng] pairs. */
function metres([lat1, lng1], [lat2, lng2]) {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(a));
}

const round = (n, dp = 6) => Number(n.toFixed(dp));

/**
 * Where along the path each stop falls. The path starts at the first stop and
 * ends at the last, so those are pinned; every stop in between is the first
 * vertex after the previous stop's that comes within a few metres of the
 * closest approach. Searching forward keeps a loop (Datong's west route starts
 * and ends at Yuanshan) from matching its last stop to its first, and taking
 * the first close vertex rather than the closest matters where the path passes
 * a stop twice - Gongguan's goes past the Drinking Water Museum, loops round
 * the Water Park trails and comes back by it on the way to Treasure Hill.
 */
const STOP_TOLERANCE_M = 10;
function stopIndexes(path, stops) {
  const indexes = [0];
  for (let s = 1; s < stops.length - 1; s++) {
    const from = indexes[s - 1];
    const distances = path.slice(from).map((vertex) => metres(vertex, stops[s]));
    const closest = Math.min(...distances);
    indexes.push(from + distances.findIndex((d) => d <= closest + STOP_TOLERANCE_M));
  }
  indexes.push(path.length - 1);
  return indexes;
}

// ---------------------------------------------------------------- build ---
const built = [];

for (const walk of WALKS) {
  const map = JSON.parse(fs.readFileSync(path.join(MAPS_DIR, `${walk.mid}.json`), "utf8"));
  if (!map.usedOn.includes(walk.slug)) throw new Error(`${walk.mid} is not used on ${walk.slug}`);

  const routes = walk.routes.map((route) => {
    const layer = map.layers.find((l) => route.layer.test(l.name));
    if (!layer) throw new Error(`${walk.slug}: no layer matching ${route.layer}`);
    const line = layer.places.find((p) => p.type === "line");
    const waypoints = layer.places.filter((p) => p.type === "point");
    if (!line) throw new Error(`${walk.slug}/${route.id}: the layer has no route line`);
    if (waypoints.length !== route.stops.length) {
      throw new Error(
        `${walk.slug}/${route.id}: ${waypoints.length} waypoints in the export, ${route.stops.length} stops named here`,
      );
    }

    const points = waypoints.map((w) => [round(w.lat), round(w.lng)]);
    let pathLatLng = line.path.map(([lng, lat]) => [round(lat, 5), round(lng, 5)]);
    let at = stopIndexes(pathLatLng, points);

    // A direct leg replaces Google's path into that stop with a straight line
    // from the stop before. Later stops' positions shift, so match again.
    for (const number of [...(route.direct ?? [])].sort((a, b) => b - a)) {
      const into = number - 1;
      pathLatLng = [...pathLatLng.slice(0, at[into - 1] + 1), points[into], ...pathLatLng.slice(at[into] + 1)];
      at = stopIndexes(pathLatLng, points);
    }

    const cumulative = [0];
    for (let i = 1; i < pathLatLng.length; i++) {
      cumulative.push(cumulative[i - 1] + metres(pathLatLng[i - 1], pathLatLng[i]));
    }

    return {
      id: route.id,
      ...(route.label ? { label: route.label } : {}),
      ...(route.duration ? { duration: route.duration } : {}),
      distanceMetres: Math.round(cumulative.at(-1)),
      stops: route.stops.map((stop, i) => ({
        number: i + 1,
        name: stop.name,
        ...(stop.url ? { url: stop.url } : {}),
        lat: points[i][0],
        lng: points[i][1],
        ...(i > 0 ? { legMetres: Math.round(cumulative[at[i]] - cumulative[at[i - 1]]) } : {}),
      })),
      path: pathLatLng,
    };
  });

  const pins = map.layers.flatMap((l) => l.places.filter((p) => p.type === "point"));
  const extras = walk.extras.map((extra) => {
    const pin = pins.find((p) => p.name === extra.pin);
    if (!pin) throw new Error(`${walk.slug}: no pin called ${extra.pin}`);
    return { name: extra.name, ...(extra.url ? { url: extra.url } : {}), lat: round(pin.lat), lng: round(pin.lng) };
  });

  const data = {
    slug: walk.slug,
    title: walk.title,
    ...(walk.duration ? { duration: walk.duration } : {}),
    source: { mid: walk.mid, fetchedAt: map.fetchedAt },
    routes,
    extras,
  };
  built.push(data);

  console.log(`\n${walk.slug}`);
  for (const route of routes) {
    console.log(`  ${route.label ?? "route"}: ${route.stops.length} stops, ${(route.distanceMetres / 1000).toFixed(2)} km, ${route.path.length} path points`);
    for (const stop of route.stops) {
      console.log(`    ${String(stop.number).padStart(2)}. ${stop.name.padEnd(40)} ${stop.legMetres == null ? "" : `+${stop.legMetres} m`}`);
    }
  }
  for (const extra of extras) console.log(`     +  ${extra.name}`);
}

// ------------------------------------------------------ hand-written walks ---
/** One leg's walking path from the foot router, as [lat, lng] pairs. */
async function fetchLeg(from, to) {
  const url = `${FOOT_ROUTER}/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
  const res = await fetch(url, { headers: { "User-Agent": "taipeitravelgeek.com walk builder" } });
  if (!res.ok) throw new Error(`foot router ${res.status} for ${url}`);
  const body = await res.json();
  if (body.code !== "Ok" || !body.routes?.length) throw new Error(`foot router: ${body.code} for ${url}`);
  // Start and end on the stops themselves rather than the nearest snapped road.
  return [from, ...body.routes[0].geometry.coordinates.map(([lng, lat]) => [round(lat, 5), round(lng, 5)]), to];
}

const handFiles = fs.existsSync(HAND_DIR) ? fs.readdirSync(HAND_DIR).filter((f) => f.endsWith(".json")).sort() : [];

for (const file of handFiles) {
  const walk = JSON.parse(fs.readFileSync(path.join(HAND_DIR, file), "utf8"));
  if (`${walk.slug}.json` !== file) throw new Error(`${file}: slug is ${walk.slug}`);
  if (walk.stops.length < 2 || walk.stops.length > 11) throw new Error(`${walk.slug}: ${walk.stops.length} stops`);
  const points = walk.stops.map((s) => {
    if (typeof s.lat !== "number" || typeof s.lng !== "number") throw new Error(`${walk.slug}: ${s.name} has no coordinates`);
    return [round(s.lat), round(s.lng)];
  });

  const cacheFile = path.join(PATHS_DIR, `${walk.slug}.json`);
  let legs = null;
  if (fetchPaths) {
    legs = [];
    for (let i = 1; i < points.length; i++) {
      legs.push(await fetchLeg(points[i - 1], points[i]));
      await new Promise((r) => setTimeout(r, 1100)); // the public router allows about one request a second
    }
    fs.mkdirSync(PATHS_DIR, { recursive: true });
    fs.writeFileSync(cacheFile, JSON.stringify({ stops: points, router: FOOT_ROUTER, fetchedAt: new Date().toISOString(), legs }) + "\n");
  } else if (fs.existsSync(cacheFile)) {
    const cached = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    // A cached path only counts if the stops haven't moved since it was fetched.
    if (JSON.stringify(cached.stops) === JSON.stringify(points)) legs = cached.legs;
    else console.warn(`${walk.slug}: stops changed since the paths were fetched - drawing straight lines; rerun with --fetch-paths`);
  }
  const routed = Boolean(legs);
  legs ??= points.slice(1).map((p, i) => [points[i], p]);

  const legMetres = legs.map((leg) => leg.slice(1).reduce((sum, p, i) => sum + metres(leg[i], p), 0));
  const pathLatLng = legs.flatMap((leg, i) => (i === 0 ? leg : leg.slice(1)));

  const data = {
    slug: walk.slug,
    title: walk.title,
    ...(walk.duration ? { duration: walk.duration } : {}),
    source: { input: `data/walks-input/${file}`, path: routed ? "OSRM foot profile, routing.openstreetmap.de (OpenStreetMap)" : "straight lines between stops" },
    routes: [
      {
        id: "route",
        distanceMetres: Math.round(legMetres.reduce((a, b) => a + b, 0)),
        stops: walk.stops.map((stop, i) => ({
          number: i + 1,
          name: stop.name,
          ...(stop.url ? { url: stop.url } : {}),
          lat: points[i][0],
          lng: points[i][1],
          ...(i > 0 ? { legMetres: Math.round(legMetres[i - 1]) } : {}),
        })),
        path: pathLatLng,
      },
    ],
    extras: (walk.extras ?? []).map((e) => ({ name: e.name, ...(e.url ? { url: e.url } : {}), lat: round(e.lat), lng: round(e.lng) })),
  };
  built.push(data);

  const route = data.routes[0];
  console.log(`\n${walk.slug} (hand-written, ${routed ? "walking paths" : "straight lines"})`);
  console.log(`  route: ${route.stops.length} stops, ${(route.distanceMetres / 1000).toFixed(2)} km, ${route.path.length} path points`);
  for (const stop of route.stops) {
    console.log(`    ${String(stop.number).padStart(2)}. ${stop.name.padEnd(40)} ${stop.legMetres == null ? "" : `+${stop.legMetres} m`}`);
  }
  for (const extra of data.extras) console.log(`     +  ${extra.name}`);
}

if (!report) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const data of built) {
    // One [lat, lng] pair per line, rather than three lines each.
    const json = JSON.stringify(data, null, 2).replace(/\[\s+(-?[\d.]+),\s+(-?[\d.]+)\s+\]/g, "[$1, $2]");
    fs.writeFileSync(path.join(OUT_DIR, `${data.slug}.json`), json + "\n");
  }
  console.log(`\nWrote ${built.length} walks to ${path.relative(process.cwd(), OUT_DIR)}/`);
}
