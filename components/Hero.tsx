import { config } from "@/utils/config";
import { LiveClock } from "./LiveClock";

export function Hero() {
  const [first, ...rest] = config.name.split(" ");
  const last = rest.join(" ");

  return (
    <section className="pt-24 pb-20">
      {/* Status pill */}
      {config.about.open_to_work && (
        <div className="inline-flex items-center gap-2.5 mb-10 text-[11px] uppercase tracking-[0.18em] font-mono text-fg-soft border border-[color:var(--border)] bg-bg-soft rounded-full pl-2.5 pr-3 py-1.5">
          <span className="pulse-dot" />
          <span>Available · accepting 2026 roles</span>
        </div>
      )}

      {/* Greeting */}
      <p className="text-sm font-mono text-muted mb-4">
        <span className="text-accent">$</span> whoami
      </p>

      {/* Name — mono caps + serif italic on surname */}
      <h1 className="font-mono uppercase text-fg leading-[0.92] tracking-tight">
        <span className="block text-[clamp(2.5rem,8vw,4.5rem)]">{first}</span>
        <span className="block font-serif-italic normal-case text-accent text-[clamp(2.8rem,9vw,5rem)] -mt-1">
          {last}.
        </span>
      </h1>

      {/* Asymmetric metadata strip */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-y-3 gap-x-8 items-baseline">
        <p className="text-[13px] text-fg-soft">
          <span className="font-mono text-muted">{">"}</span>{" "}
          {config.title}{" "}
          <span className="text-muted">in</span>{" "}
          <span className="font-serif-italic text-fg text-base">{config.location}</span>
        </p>
        <p className="text-[11px] font-mono text-muted uppercase tracking-[0.16em] flex items-center gap-2">
          <span>IST</span>
          <span className="text-fg-soft/40">·</span>
          <LiveClock />
        </p>
      </div>

      {/* Subtitle */}
      <p className="mt-12 text-[15.5px] leading-[1.7] text-fg-soft max-w-[58ch]">
        {config.hero.subtitle}
      </p>

      {/* Currently working on — terminal-flavored */}
      <div className="mt-8 grid gap-2 text-[13px] font-mono text-muted max-w-[58ch]">
        <p>
          <span className="text-accent">→</span> shipping{" "}
          <a
            href="https://inboxkit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link text-fg-soft"
          >
            inboxkit/enrich
          </a>{" "}
          <span className="text-muted/70">(go · rust · next · clickhouse)</span>
        </p>
        <p>
          <span className="text-accent">→</span> building{" "}
          <a
            href="https://github.com/rahulCoder9417/GoRedis"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link text-fg-soft"
          >
            goredis
          </a>{" "}
          <span className="text-muted/70">(resp-protocol redis clone in go)</span>
        </p>
        <p>
          <span className="text-accent">→</span> grinding{" "}
          <a
            href={config.leetCodeProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link text-fg-soft"
          >
            dsa
          </a>{" "}
          <span className="text-muted/70">({config.leetCodeStats.solved} solved · medium-heavy)</span>
        </p>
      </div>
    </section>
  );
}
