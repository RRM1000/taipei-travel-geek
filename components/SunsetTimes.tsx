"use client";

import { useEffect, useState } from "react";

/**
 * Tonight's sunset, for the two places people specifically go to watch it.
 *
 * Reuses Open-Meteo (already the source behind <WeatherStrip/>, no key
 * needed) and the same localStorage cache pattern. Sunset moves by about a
 * minute a day, so a 6-hour TTL is generous and keeps the call count near
 * zero for a returning reader.
 *
 * Shows one time only: today's, or tomorrow's once today's has passed. A
 * reader checking at 21:00 wants to know when to turn up tomorrow, not to
 * be told they missed it.
 */
type SunsetTimesProps = {
  latitude: number;
  longitude: number;
  /** Where the reader is being told to stand, e.g. "Tamsui waterfront". */
  place: string;
  /** Optional line on what to do with the time, shown under the readout. */
  advice?: string;
};

type Day = { date: string; sunset: string };

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

/** "2026-08-16T18:28" -> "18:28". */
function clockOf(iso: string): string {
  return (iso.split("T")[1] ?? "").slice(0, 5);
}

function minutesOf(iso: string): number {
  const [h, m] = clockOf(iso).split(":").map(Number);
  return h * 60 + m;
}

/** Current wall-clock minute in Taipei, whatever zone the reader is in. */
function taipeiNowMinutes(): number {
  const [h, m] = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Taipei",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .split(":")
    .map(Number);
  return h * 60 + m;
}

const taipeiToday = (): string =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Taipei" });

export function SunsetTimes({ latitude, longitude, place, advice }: SunsetTimesProps) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [nowMins, setNowMins] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `ttg-sunset-${latitude},${longitude}-v1`;

    async function load() {
      try {
        const cachedRaw = localStorage.getItem(cacheKey);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as { savedAt: number; data: Day[] };
          // The cached first day must still be today, or "today" would label
          // yesterday's time for anyone opening the page next morning.
          if (Date.now() - cached.savedAt < CACHE_TTL_MS && cached.data[0]?.date === taipeiToday()) {
            if (!cancelled) setDays(cached.data);
            return;
          }
        }

        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&daily=sunset&timezone=Asia%2FTaipei&forecast_days=2`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`sunset fetch ${response.status}`);
        const json = (await response.json()) as { daily?: { time: string[]; sunset: string[] } };
        if (!json.daily?.sunset?.length) throw new Error("no sunset data");

        const data: Day[] = json.daily.time.map((date, index) => ({
          date,
          sunset: json.daily!.sunset[index],
        }));

        if (!cancelled) setDays(data);
        localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), data }));
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [latitude, longitude]);

  useEffect(() => {
    const tick = () => setNowMins(taipeiNowMinutes());
    tick();
    // Only needs to catch the moment sunset passes, so a minute is ample.
    const timer = setInterval(tick, 60_000);
    return () => clearInterval(timer);
  }, []);

  // Nothing rendered until data arrives, and nothing at all if the API is
  // down - a broken widget is worse than no widget on a page that reads fine
  // without it.
  if (failed || !days?.length || nowMins === null) return null;

  const todayPassed = nowMins >= minutesOf(days[0].sunset);
  const showing = todayPassed && days[1] ? days[1] : days[0];
  const dayLabel = showing === days[0] ? "today" : "tomorrow";

  return (
    <aside className="sunset-widget" aria-label={`Sunset time for ${place}`}>
      <p className="sunset-widget-label">🌅 Sunset at {place}</p>
      <p className="sunset-widget-main">
        <span className="sunset-widget-time">{clockOf(showing.sunset)}</span>
        <span className="sunset-widget-today">{dayLabel}</span>
      </p>
      {advice && <p className="sunset-widget-advice">{advice}</p>}
    </aside>
  );
}
