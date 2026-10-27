"use client";

import { useEffect, useState } from "react";

// Taipei city centre.
const LAT = 25.033;
const LON = 121.5654;
const CACHE_KEY = "ttg-weather-cache-v1";
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 min - plenty fresh for a header strip, keeps calls low.

type WeatherState = { tempC: number; label: string; emoji: string } | null;

// WMO weather codes (what Open-Meteo returns) collapsed into a short label
// and emoji. Not exhaustive - covers what Taipei actually sees.
function describeWeatherCode(code: number): { label: string; emoji: string } {
  if (code === 0) return { label: "Clear", emoji: "☀️" };
  if (code <= 2) return { label: "Partly Cloudy", emoji: "🌤️" };
  if (code === 3) return { label: "Overcast", emoji: "☁️" };
  if (code === 45 || code === 48) return { label: "Foggy", emoji: "🌫️" };
  if (code >= 51 && code <= 57) return { label: "Drizzle", emoji: "🌦️" };
  if (code >= 61 && code <= 67) return { label: "Rain", emoji: "🌧️" };
  if (code >= 80 && code <= 82) return { label: "Showers", emoji: "🌦️" };
  if (code >= 95) return { label: "Thunderstorms", emoji: "⛈️" };
  if (code >= 71 && code <= 77) return { label: "Snow", emoji: "🌨️" }; // essentially never in Taipei, kept for completeness
  return { label: "", emoji: "🌡️" };
}

/** Taipei's local time, e.g. "3:40 pm". */
function taipeiTime(): string {
  return new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Taipei" }).format(new Date());
}

/**
 * "22°C in Taipei right now - Partly Cloudy". With `withTime` it becomes the
 * quieter "Taipei right now" line used in the Plan Your Trip menu and under
 * the homepage hero: temperature, conditions and local time. It left the
 * header bar in October 2026 to declutter it.
 */
export function WeatherStrip({ withTime = false }: { withTime?: boolean }) {
  const [weather, setWeather] = useState<WeatherState>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (!withTime) return;
    const tick = () => setTime(taipeiTime());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [withTime]);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as { savedAt: number; data: WeatherState };
          if (Date.now() - cached.savedAt < CACHE_TTL_MS) {
            if (!cancelled) setWeather(cached.data);
            return;
          }
        }
      } catch {
        // Corrupt/blocked storage - just fall through to a fresh fetch.
      }

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&timezone=Asia%2FTaipei`,
        );
        if (!response.ok) return;
        const data = await response.json();
        const tempC = Math.round(data?.current?.temperature_2m);
        const code = data?.current?.weather_code;
        if (typeof tempC !== "number" || Number.isNaN(tempC) || typeof code !== "number") return;

        const { label, emoji } = describeWeatherCode(code);
        const result = { tempC, label, emoji };

        if (!cancelled) setWeather(result);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data: result }));
        } catch {
          // Storage full/blocked - not worth failing over.
        }
      } catch {
        // Network error, CORS hiccup, etc. - fail silently, strip just won't render.
      }
    }

    loadWeather();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!weather) return null;

  if (withTime) {
    return (
      <p className="taipei-now">
        <span className="taipei-now-label">Taipei right now</span>
        <span aria-hidden="true">{weather.emoji}</span> {weather.tempC}°C{weather.label ? `, ${weather.label.toLowerCase()}` : ""}
        {time ? ` · ${time} local time` : ""}
      </p>
    );
  }

  return (
    <p className="header-weather-strip">
      <span aria-hidden="true">{weather.emoji}</span> {weather.tempC}°C in Taipei right now
      {weather.label ? ` - ${weather.label}` : ""}
    </p>
  );
}
