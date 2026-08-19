"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Live queue times at every Taipei-area Din Tai Fung, read from the
 * restaurant's own queue system via /api/dtf-queue.
 *
 * This is the single most useful thing this page can tell someone: the post
 * is built around the fact that there are no reservations, so the only
 * lever a reader has is choosing when and which branch. A static "expect
 * 60+ minutes" is a guess; this is the actual number right now.
 *
 * Renders nothing at all if the upstream is unreachable - the article
 * already stands on its own, and a dead widget on a page about queues would
 * undermine the rest of it.
 */

type BranchStatus = "open" | "closed" | "unknown";
type Branch = {
  id: string;
  name: string;
  note?: string;
  mapUrl: string;
  status: BranchStatus;
  waitMinutes: number | null;
};
type Payload = { branches: Branch[]; fetchedAt: string; ok: boolean };

const REFRESH_MS = 3 * 60 * 1000;

function describeWait(minutes: number): { label: string; tone: "low" | "medium" | "high" } {
  if (minutes <= 0) return { label: "No wait", tone: "low" };
  if (minutes < 30) return { label: `${minutes} min`, tone: "low" };
  if (minutes < 75) return { label: `${minutes} min`, tone: "medium" };
  return { label: `${minutes} min`, tone: "high" };
}

function formatClock(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Taipei",
    });
  } catch {
    return "";
  }
}

/**
 * Branch names for the loading skeleton. The real list comes from the API,
 * but showing the names immediately means the block lands at its final size
 * and only the times have to arrive - the first fetch fans out to eight
 * branches upstream and can take several seconds, which is a long time to
 * stare at nothing.
 */
const SKELETON_BRANCHES = [
  "Taipei 101",
  "Xinsheng",
  "A4",
  "A13",
  "Nanxi",
  "Fuxing",
  "Tienmu",
  "Banqiao",
];

/**
 * Portals the board into `<div data-dtf-queue></div>` in the article body, so
 * it sits inside the "Which Branch to Choose" section where the reader is
 * actually deciding - rather than floating above the article with no context.
 * Falls back to rendering in place if the marker is missing.
 */
export function DinTaiFungQueue() {
  const [target, setTarget] = useState<Element | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setTarget(document.querySelector("[data-dtf-queue]"));
    setSearched(true);
  }, []);

  if (!searched) return null;
  const board = <QueueBoard />;
  return target ? createPortal(board, target) : board;
}

function QueueBoard() {
  const [data, setData] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    try {
      // The route already caches for two minutes (and Cloudflare caches at
      // the edge), so an extra browser-level cache only means a reader who
      // reloads sees the board they were already looking at.
      const response = await fetch("/api/dtf-queue", { cache: "no-store" });
      if (!response.ok) throw new Error(`queue ${response.status}`);
      const json = (await response.json()) as Payload;
      if (!json.ok) throw new Error("no live branches");

      // Individual branches fail intermittently upstream and come back as
      // "unknown", which would drop that row from the board. Carry the last
      // known reading forward instead, so branches don't flicker in and out
      // between refreshes.
      setData((previous) => {
        if (!previous) return json;
        return {
          ...json,
          branches: json.branches.map((branch) => {
            if (branch.status !== "unknown") return branch;
            const last = previous.branches.find((b) => b.id === branch.id);
            return last && last.status !== "unknown" ? last : branch;
          }),
        };
      });
      setFailed(false);
    } catch {
      // A failed refresh must not throw away a board that is already on
      // screen - the times go slightly stale, which is far better than the
      // widget vanishing mid-read. Only a failure with nothing to fall back
      // on counts as failed.
      setData((current) => {
        if (!current) setFailed(true);
        return current;
      });
    }
  }, []);

  useEffect(() => {
    void load();
    const timer = setInterval(() => void load(), REFRESH_MS);
    return () => clearInterval(timer);
  }, [load]);

  // Only hide when the first load failed outright - once there is data on
  // screen it stays, even if a later refresh fails.
  if (failed && !data) return null;

  // Skeleton while the first fetch is in flight. Same shell and row count as
  // the real thing, so nothing jumps when the data lands.
  if (!data) {
    return (
      <aside className="dtf-queue is-loading" aria-busy="true" aria-label="Loading live Din Tai Fung queue times">
        <div className="dtf-queue-head">
          <p className="dtf-queue-label">
            <span className="dtf-queue-dot" aria-hidden="true" />
            Live queue times
          </p>
          <p className="dtf-queue-updated">Checking all branches&hellip;</p>
        </div>

        <ul className="dtf-queue-list">
          {SKELETON_BRANCHES.map((name) => (
            <li key={name} className="dtf-queue-item tone-loading">
              <span className="dtf-queue-branch">{name}</span>
              <span className="dtf-queue-skeleton" aria-hidden="true" />
            </li>
          ))}
        </ul>

        <p className="dtf-queue-foot">Reading Din Tai Fung&rsquo;s live queue&hellip;</p>
      </aside>
    );
  }

  // Closed branches are shown too - "half the city has stopped queuing" is
  // more useful than silently dropping them, and it stops the board from
  // vanishing entirely late in the evening. Only branches we genuinely
  // couldn't read are omitted.
  const shown = data.branches.filter((branch) => branch.status !== "unknown");
  if (!shown.length) return null;

  const open = shown.filter((branch) => branch.status === "open");
  const quietest = open.length
    ? open.reduce((best, branch) =>
        (branch.waitMinutes ?? Infinity) < (best.waitMinutes ?? Infinity) ? branch : best,
      )
    : null;

  return (
    <aside className="dtf-queue" aria-label="Live Din Tai Fung queue times">
      <div className="dtf-queue-head">
        <p className="dtf-queue-label">
          <span className="dtf-queue-dot" aria-hidden="true" />
          Live queue times
        </p>
        <p className="dtf-queue-updated">Taipei time {formatClock(data.fetchedAt)}</p>
      </div>

      <ul className="dtf-queue-list">
        {shown.map((branch) => {
          const wait =
            branch.status === "open"
              ? describeWait(branch.waitMinutes as number)
              : { label: "Not accepting", tone: "closed" as const };
          return (
            <li key={branch.id} className={`dtf-queue-item tone-${wait.tone}`}>
              {/* Straight to Maps: someone reading a wait time is deciding
                  where to go, so the branch name is the natural thing to
                  make actionable. */}
              <a
                className="dtf-queue-branch"
                href={branch.mapUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {branch.name}
                {branch.note && <em> {branch.note}</em>}
              </a>
              <span className="dtf-queue-wait">{wait.label}</span>
            </li>
          );
        })}
      </ul>

      <p className="dtf-queue-foot">
        {quietest ? (
          <>
            Shortest wait right now: <strong>{quietest.name}</strong>
            {quietest.waitMinutes !== null && quietest.waitMinutes > 0
              ? ` at ${quietest.waitMinutes} minutes.`
              : ", with no queue at all."}
          </>
        ) : (
          <>Every branch has stopped taking dine-in queue numbers for today.</>
        )}{" "}
        Select a branch name to see it on the map.
      </p>
    </aside>
  );
}
