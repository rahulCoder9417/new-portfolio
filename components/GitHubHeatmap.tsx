"use client";

import { useEffect, useMemo, useState } from "react";
import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";
import { FullBleed } from "./project/FullBleed";

type CommitDay = { date: string; count: number };

function shadeClass(count: number) {
  if (count === 0) return "bg-[color:var(--border)]";
  if (count === 1) return "bg-accent/30";
  if (count === 2) return "bg-accent/60";
  if (count === 3) return "bg-accent/85";
  return "bg-accent";
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

type MonthGroup = {
  key: string;
  label: string;
  weeks: (CommitDay | null)[][]; // each week = 7 days, Sun-anchored
};

/** Split commits into month groups, padded so each week is exactly 7 days. */
function buildMonthGroups(commits: CommitDay[]): MonthGroup[] {
  if (commits.length === 0) return [];

  const first = new Date(commits[0].date + "T00:00:00");
  const startPad = first.getDay();
  const cells: (CommitDay | null)[] = Array(startPad).fill(null).concat(commits);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (CommitDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const groups: MonthGroup[] = [];
  for (const week of weeks) {
    const firstReal = week.find((d) => d !== null);
    if (!firstReal) continue;
    const key = firstReal.date.slice(0, 7);
    const label = MONTH_NAMES[Number(key.slice(5, 7)) - 1];
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.weeks.push(week);
    else groups.push({ key, label, weeks: [week] });
  }
  return groups;
}

export function GitHubHeatmap() {
  const [commits, setCommits] = useState<CommitDay[]>([]);
  const [totalCommits, setTotalCommits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/github/commits");
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        if (cancelled) return;
        if (data.error) setErrored(true);
        else {
          setCommits(data.dailyCommits ?? []);
          setTotalCommits(data.totalCommits ?? 0);
        }
      } catch {
        if (!cancelled) setErrored(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const groups = useMemo(() => buildMonthGroups(commits), [commits]);

  // Cell size: clamps so 6 months fit without horizontal scroll on common viewports
  // and never get either tiny or absurdly large.
  const cellStyle: React.CSSProperties = {
    width: "clamp(18px, 2.4vw, 30px)",
    height: "clamp(18px, 2.4vw, 30px)",
  };

  if (errored || (!loading && commits.length === 0)) return null;

  return (
    <section className="py-16 border-t border-[color:var(--border)]">
      <SectionHeader
        right={
          <a
            href={config.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            @{config.githubUsername} ↗
          </a>
        }
      >
        GitHub activity
      </SectionHeader>

      {loading ? (
        <p className="text-[13.5px] text-muted">Loading contributions…</p>
      ) : (
        <FullBleed max="1100px">
          {/* Horizontal scroll only kicks in on very narrow viewports */}
          <div className="overflow-x-auto -mx-2 px-2">
            <div className="flex items-end gap-4 w-fit mx-auto">
              {groups.map((g) => (
                <div key={g.key} className="flex flex-col gap-2">
                  <span className="text-[12px] text-muted px-0.5">
                    {g.label}
                  </span>
                  <div className="flex gap-[3px]">
                    {g.weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {week.map((d, di) =>
                          d ? (
                            <div
                              key={di}
                              title={`${d.count} commit${d.count === 1 ? "" : "s"} · ${d.date}`}
                              className={`rounded-[3px] ${shadeClass(d.count)}`}
                              style={cellStyle}
                            />
                          ) : (
                            <div key={di} aria-hidden style={cellStyle} />
                          ),
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-[12.5px] text-muted">
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-0.5">
                <div className="h-2.5 w-2.5 rounded-[2px] bg-[color:var(--border)]" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-accent/30" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-accent/60" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-accent/85" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-accent" />
              </div>
              <span>More</span>
            </div>
            <span>
              <span className="text-fg tabular-nums">{totalCommits.toLocaleString()}</span>{" "}
              contributions in the last {config.gitMonths} months
            </span>
          </div>
        </FullBleed>
      )}
    </section>
  );
}
