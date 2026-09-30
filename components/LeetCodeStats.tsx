import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";

export function LeetCodeStats() {
  const { solved, easy, medium, hard, beats } = config.leetCodeStats;
  const total = easy + medium + hard;
  const buckets = [
    { label: "easy", value: easy, color: "#10b981" },
    { label: "medium", value: medium, color: "#f59e0b" },
    { label: "hard", value: hard, color: "#ef4444" },
  ];

  return (
    <section className="py-16 border-t border-[color:var(--border)]">
      <SectionHeader
        right={
          <a
            href={config.leetCodeProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Profile ↗
          </a>
        }
      >
        LeetCode
      </SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-10 gap-y-8 items-start">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-semibold tracking-tight leading-none text-fg tabular-nums">
              {solved}
            </span>
            <span className="text-[13.5px] text-muted">problems solved</span>
          </div>
          <p className="text-[13.5px] text-muted">
            Beats <span className="text-fg tabular-nums">{beats}%</span>
          </p>
        </div>

        <ul className="space-y-3.5">
          {buckets.map((b, i) => {
            const pct = total > 0 ? (b.value / total) * 100 : 0;
            return (
              <li
                key={b.label}
                className="grid grid-cols-[70px_1fr_auto_auto] items-center gap-3"
              >
                <span className="text-[13px] text-muted capitalize">
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
                <span className="text-[12px] text-muted tabular-nums">
                  {pct.toFixed(0)}%
                </span>
                <span className="text-[13px] text-fg-soft tabular-nums w-7 text-right">
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
