"use client";

import { useEffect, useState } from "react";
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
        if (data.error) {
          setErrored(true);
        } else {
          setCommits(data.dailyCommits ?? []);
          setTotalCommits(data.totalCommits ?? 0);
        }
      } catch {
        if (!cancelled) setErrored(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalDays = config.gitMonths * 30 + 1;

  return (
    <section className="py-20 border-t border-[color:var(--border)]">
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
        <div className="space-y-3">
          <p className="text-sm font-mono text-muted">
            <span className="text-accent">$</span> git log --since=&quot;{config.gitMonths} months ago&quot;<span className="caret" />
          </p>
        </div>
      ) : errored || commits.length === 0 ? (
        <p className="text-sm font-mono text-muted">
          <span className="text-accent">$</span> echo $GITHUB_TOKEN <span className="text-muted/60"># (not set — heatmap hidden)</span>
        </p>
      ) : (
        <>
          <div className="overflow-x-auto -mx-2 px-2 pb-1">
            <div className="flex items-start gap-3 min-w-max">
              {Array.from({ length: config.gitMonths }, (_, monthIdx) => {
                const start = monthIdx * 30;
                const end =
                  monthIdx === config.gitMonths - 1 ? start + 31 : start + 30;
                return (
                  <div
                    key={monthIdx}
                    className="grid gap-[3px]"
                    style={{
                      gridTemplateRows: "repeat(5, 14px)",
                      gridAutoFlow: "column",
                      gridAutoColumns: "14px",
                    }}
                  >
                    {commits.slice(start, end).map(({ count, date }, i) => (
                      <div
                        key={i}
                        title={`${count} commit${count === 1 ? "" : "s"} · ${date}`}
                        className={`h-3.5 w-3.5 rounded-[3px] ${shadeClass(count)} hover:scale-125 transition-transform`}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-muted uppercase tracking-[0.12em]">
            <div className="flex items-center gap-2">
              <span>less</span>
              <div className="flex gap-0.5">
                <div className="h-2.5 w-2.5 rounded-[2px] bg-[color:var(--border)]" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-accent/30" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-accent/60" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-accent/85" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-accent" />
              </div>
              <span>more</span>
            </div>
            <span>
              total{" "}
              <span className="text-fg tabular-nums normal-case">
                {totalCommits.toLocaleString()}
              </span>
            </span>
          </div>
        </>
      )}
    </section>
  );
}
