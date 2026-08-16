"use client";

import { useEffect, useState } from "react";
import eventsData from "@/content/events.json";

/**
 * Eight Taipei events: what's on right now, then what's coming up.
 *
 * A fixed count rather than a date window - a rolling four-week view looked
 * thin in quiet stretches and would empty out entirely between seasons.
 *
 * Slots are reserved for events already under way. Sorting purely by start
 * date pushed them out completely in busy periods: in mid-August eight
 * things were running (Ghost Month, mango season, the Dadaocheng fireworks)
 * and none of them showed, because eight more were about to begin. That
 * fails the visitor who is in the city *this week* rather than planning a
 * future trip. Capping them at three stops long seasons like the baseball
 * calendar from swamping the list, which was the original problem.
 *
 * Anything finished is dropped. Runs on the client so it reads the
 * visitor's actual date - a server render could be cached and freeze the
 * list at build time.
 */

type SiteEvent = {
  name: string;
  start: string;
  end: string;
  when: string;
  blurb: string;
  url?: string;
};

const MAX_SHOWN = 8;
/** Reserved for events already under way, so they can't be crowded out. */
const MAX_RUNNING = 3;

/** Parsed as local midnight so a date-only string isn't shifted by timezone. */
function parseDay(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function daysUntil(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

function timingLabel(event: SiteEvent, today: Date): string {
  const start = parseDay(event.start);
  const untilStart = daysUntil(today, start);

  if (untilStart <= 0) return "On now";
  if (untilStart === 1) return "Tomorrow";
  if (untilStart <= 7) return `In ${untilStart} days`;
  return start.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<SiteEvent[] | null>(null);

  useEffect(() => {
    const today = startOfToday();

    // Everything that hasn't finished yet - the count, not a date horizon,
    // decides how much is shown.
    const remaining = (eventsData as SiteEvent[]).filter(
      (event) => parseDay(event.end) >= today,
    );

    // Running events sort by end date so the ones about to finish come
    // first - "catch it before it goes" beats a season with months left.
    const running = remaining
      .filter((event) => parseDay(event.start) <= today)
      .sort((a, b) => parseDay(a.end).getTime() - parseDay(b.end).getTime());

    const starting = remaining
      .filter((event) => parseDay(event.start) > today)
      .sort((a, b) => parseDay(a.start).getTime() - parseDay(b.start).getTime());

    const onNow = running.slice(0, MAX_RUNNING);
    const next = starting.slice(0, MAX_SHOWN - onNow.length);

    // Whichever group is short, the other backfills - a quiet December with
    // two events left still shows whatever is running, and a month with
    // nothing under way fills up with what's ahead.
    const picked = [...onNow, ...next];
    if (picked.length < MAX_SHOWN) {
      picked.push(...running.slice(onNow.length, onNow.length + (MAX_SHOWN - picked.length)));
    }

    setEvents(picked);
  }, []);

  // Nothing until the client has computed the window, and nothing at all if
  // the calendar has run dry - better a missing section than an empty one.
  if (!events?.length) return null;

  const today = startOfToday();

  return (
    <section className="upcoming-events wrap" aria-label="Upcoming events in Taipei">
      <div className="section-heading">
        <div>
          <p className="eyebrow">On now &amp; coming up</p>
          <h2>Upcoming Taipei Events</h2>
        </div>
        <a href="/taipei-annual-events">
          Full 2026 calendar <span aria-hidden="true">→</span>
        </a>
      </div>

      <ul className="upcoming-events-list">
        {events.map((event) => {
          const label = timingLabel(event, today);
          const isNow = label === "On now";
          // Anything inside a week reads as urgent and gets the accent
          // colour; dated items further out stay quiet so the near ones
          // actually stand out.
          const isSoon = label.startsWith("In ") || label === "Tomorrow";
          const body = (
            <>
              <span
                className={`upcoming-events-when${isNow ? " is-now" : ""}${isSoon ? " is-soon" : ""}`}
              >
                {label}
              </span>
              <span className="upcoming-events-name">{event.name}</span>
              <span className="upcoming-events-blurb">{event.blurb}</span>
              <span className="upcoming-events-dates">{event.when}</span>
            </>
          );

          return (
            <li key={event.name} className="upcoming-events-item">
              {event.url ? (
                <a href={event.url}>{body}</a>
              ) : (
                <div className="upcoming-events-static">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
