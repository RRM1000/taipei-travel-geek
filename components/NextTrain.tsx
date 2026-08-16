"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Next Airport Express departure, computed rather than fetched.
 *
 * The Taoyuan Airport MRT express runs at fixed minutes past every hour, so
 * the live answer is pure arithmetic on the current Taipei time - no API, no
 * key, no network call, and it keeps working if any upstream disappears.
 * The schedules below are the ones documented in the post itself.
 *
 * Mounts into `<div data-next-train="...">` markers placed in the article
 * HTML. Portalling into an existing node rather than splitting the content
 * string keeps the markup intact - `.article-content > p:first-child` styles
 * the lead paragraph, and wrapping segments in extra divs would break it.
 */

type Line = {
  label: string;
  /** Minutes past each hour that an express departs. */
  minutes: number[];
  /** First and last express of the day, as "HH:MM". */
  first: string;
  last: string;
};

type Schedule = { heading: string; lines: Line[]; footnote?: string };

const SCHEDULES: Record<string, Schedule> = {
  "to-taipei": {
    heading: "Next express to Taipei Main",
    lines: [
      { label: "Terminal 1", minutes: [13, 28, 43, 58], first: "05:58", last: "22:58" },
      { label: "Terminal 2", minutes: [10, 25, 40, 55], first: "05:55", last: "22:55" },
    ],
    footnote: "35 min from T1, 39 min from T2. After the last express, commuter trains run until about 23:35.",
  },
  "to-airport": {
    heading: "Next express to the airport",
    lines: [{ label: "Taipei Main Station", minutes: [0, 15, 30, 45], first: "05:30", last: "23:00" }],
    footnote: "35 min to Terminal 1, 39 min to Terminal 2. Allow extra time to find the platform - it's a long walk down.",
  },
};

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const pad = (n: number): string => String(n).padStart(2, "0");
const formatClock = (mins: number): string => `${pad(Math.floor(mins / 60) % 24)}:${pad(mins % 60)}`;

/** Current wall-clock minute in Taipei, regardless of the reader's own zone. */
function taipeiNowMinutes(): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Taipei",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  const [h, m] = parts.split(":").map(Number);
  return h * 60 + m;
}

type Upcoming = { departsAt: number; inMinutes: number } | null;

function nextDeparture(line: Line, nowMins: number): Upcoming {
  const firstMins = toMinutes(line.first);
  const lastMins = toMinutes(line.last);

  const todays: number[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of line.minutes) {
      const at = hour * 60 + minute;
      if (at >= firstMins && at <= lastMins) todays.push(at);
    }
  }
  todays.sort((a, b) => a - b);

  const next = todays.find((at) => at > nowMins);
  if (next === undefined) return null; // service finished for today
  return { departsAt: next, inMinutes: next - nowMins };
}

function LineRow({ line, nowMins }: { line: Line; nowMins: number }) {
  const next = nextDeparture(line, nowMins);

  return (
    <li className="next-train-row">
      <span className="next-train-line">{line.label}</span>
      {next ? (
        <span className="next-train-when">
          <strong>{formatClock(next.departsAt)}</strong>
          <em>
            {next.inMinutes === 0
              ? "departing now"
              : next.inMinutes === 1
                ? "in 1 min"
                : `in ${next.inMinutes} min`}
          </em>
        </span>
      ) : (
        <span className="next-train-when next-train-closed">
          <strong>{line.first}</strong>
          <em>first tomorrow</em>
        </span>
      )}
    </li>
  );
}

function Board({ schedule }: { schedule: Schedule }) {
  const [nowMins, setNowMins] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNowMins(taipeiNowMinutes());
    tick();
    const timer = setInterval(tick, 30_000);
    return () => clearInterval(timer);
  }, []);

  // Rendered only after mount - the correct answer depends on the reader's
  // clock, so there is nothing meaningful to server-render.
  if (nowMins === null) return null;

  return (
    <aside className="next-train" aria-label={schedule.heading}>
      <p className="next-train-head">
        <span className="next-train-dot" aria-hidden="true" />
        {schedule.heading}
        <span className="next-train-now">Taipei {formatClock(nowMins)}</span>
      </p>
      <ul className="next-train-list">
        {schedule.lines.map((line) => (
          <LineRow key={line.label} line={line} nowMins={nowMins} />
        ))}
      </ul>
      {schedule.footnote && <p className="next-train-foot">{schedule.footnote}</p>}
    </aside>
  );
}

/**
 * Finds every marker in the rendered article and portals a board into it.
 */
export function NextTrainBoards() {
  const [targets, setTargets] = useState<{ node: Element; key: string }[]>([]);

  useEffect(() => {
    const found = Array.from(document.querySelectorAll("[data-next-train]"))
      .map((node) => ({ node, key: node.getAttribute("data-next-train") ?? "" }))
      .filter((entry) => entry.key in SCHEDULES);
    setTargets(found);
  }, []);

  return (
    <>
      {targets.map(({ node, key }) => createPortal(<Board schedule={SCHEDULES[key]} />, node, key))}
    </>
  );
}
