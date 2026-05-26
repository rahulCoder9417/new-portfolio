"use client";

import { useEffect, useMemo, useState } from "react";
import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";

type CommitDay = { date: string; count: number };

function shadeClass(count: number) {
  if (count === 0) return "bg-[color:var(--border)]";
  if (count === 1) return "bg-accent/30";
  if (count === 2) return "bg-accent/60";
  if (count === 3) return "bg-accent/85";
  return "bg-accent shadow-[0_0_8px_var(--accent-soft)]";
}

/** Pad commit array so it lays out cleanly as 7-row × N-week grid. */
function buildGrid(commits: CommitDay[]) {
  if (commits.length === 0) return { cells: [] as (CommitDay | null)[], weeks: 0 };
  const first = new Date(commits[0].date + "T00:00:00");
  const startPad = first.getDay(); // 0=Sun … 6=Sat
  const cells: (CommitDay | null)[] = Array(startPad).fill(null).concat(commits);
  const weeks = Math.ceil(cells.length / 7);
  while (cells.length < weeks * 7) cells.push(null);
  return { cells, weeks };
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

  const totalDays = config.gitMonths * 30 + 1;
  const { cells, weeks } = useMemo(() => buildGrid(commits), [commits]);

  return (
    // Full-bleed: breaks out of the main column so the heatmap reads as a real artifact
    <section className="py-24 border-t border-[color:var(--border)] relative left-1/2 -translate-x-1/2 w-screen max-w-[1200px] px-6">
      <SectionHeader
        num="04"
        path="github"
        right={
          <a
            href={config.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            @{config.githubUsername} ↗
          </a>
        }
      >
        {totalDays} days of commits
      </SectionHeader>

      {loading ? (
        <p className="text-sm font-mono text-muted">
          <span className="text-accent">$</span> git log --since=&quot;{config.gitMonths} months ago&quot;<span className="caret" />
        </p>
      ) : errored || commits.length === 0 ? (
        <p className="text-sm font-mono text-muted">
          <span className="text-accent">$</span> echo $GITHUB_TOKEN <span className="text-muted/60"># (not set, heatmap hidden)</span>
        </p>
      ) : (
        <>
          <div
            className="grid gap-[4px] w-full"
            style={{
              gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
              gridTemplateRows: "repeat(7, 1fr)",
              gridAutoFlow: "column",
            }}
          >
            {cells.map((d, i) =>
              d ? (
                <div
                  key={i}
                  title={`${d.count} commit${d.count === 1 ? "" : "s"} · ${d.date}`}
                  className={`aspect-square rounded-[4px] ${shadeClass(d.count)} hover:scale-125 transition-transform`}
                />
              ) : (
                <div key={i} className="aspect-square" aria-hidden />
              ),
            )}
          </div>

          <div className="mt-8 flex items-center justify-between text-[12px] font-mono text-muted uppercase tracking-[0.12em]">
            <div className="flex items-center gap-2.5">
              <span>less</span>
              <div className="flex gap-1">
                <div className="h-3 w-3 rounded-[3px] bg-[color:var(--border)]" />
                <div className="h-3 w-3 rounded-[3px] bg-accent/30" />
                <div className="h-3 w-3 rounded-[3px] bg-accent/60" />
                <div className="h-3 w-3 rounded-[3px] bg-accent/85" />
                <div className="h-3 w-3 rounded-[3px] bg-accent" />
              </div>
              <span>more</span>
            </div>
            <span>
              total{" "}
              <span className="text-fg tabular-nums normal-case text-[13px]">
                {totalCommits.toLocaleString()}
              </span>
            </span>
          </div>
        </>
      )}
    </section>
  );
}
