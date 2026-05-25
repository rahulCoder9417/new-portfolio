import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";

export function LeetCodeStats() {
  const { solved, easy, medium, hard } = config.leetCodeStats;
  const total = easy + medium + hard;
  const buckets = [
    { label: "easy", value: easy, color: "var(--accent)" },
    { label: "medium", value: medium, color: "#f59e0b" },
    { label: "hard", value: hard, color: "#ef4444" },
  ];

  return (
    <section className="py-20 border-t border-[color:var(--border)]">
      <SectionHeader
        num="05"
        path="leetcode"
        right={
          <a
            href={config.leetCodeProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            profile ↗
          </a>
        }
      >
        Daily DSA, mostly medium
      </SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-10 gap-y-8 items-start">
        <div className="flex items-baseline gap-3">
          <span className="font-serif-italic text-[64px] leading-none text-fg">
            {solved}
          </span>
          <span className="text-[11px] font-mono text-muted uppercase tracking-[0.16em]">
            problems<br />solved
          </span>
        </div>

        <ul className="space-y-3.5">
          {buckets.map((b, i) => {
            const pct = total > 0 ? (b.value / total) * 100 : 0;
            return (
              <li
                key={b.label}
                className="grid grid-cols-[70px_1fr_auto_auto] items-center gap-3"
              >
                <span className="text-[11px] text-muted font-mono uppercase tracking-[0.12em]">
                  {b.label}
                </span>
                <div className="h-1.5 rounded-full bg-[color:var(--border)] overflow-hidden">
                  <div
                    className="bar-fill h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: b.color,
                      animationDelay: `${i * 120}ms`,
                    }}
                  />
                </div>
                <span className="text-[11px] font-mono text-muted tabular-nums">
                  {pct.toFixed(0)}%
                </span>
                <span className="text-[12px] font-mono text-fg-soft tabular-nums w-7 text-right">
                  {b.value}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
