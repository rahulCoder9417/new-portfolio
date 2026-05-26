import { config } from "@/utils/config";
import { LiveClock } from "./LiveClock";

export function Hero() {
  const [first, ...rest] = config.name.split(" ");
  const last = rest.join(" ");

  return (
    <section className="pt-24 pb-24">
      {/* Status pill */}
      {config.about.open_to_work && (
        <div className="inline-flex items-center gap-2.5 mb-12 text-[11px] uppercase tracking-[0.18em] font-mono text-fg-soft border border-[color:var(--border)] bg-bg-soft rounded-full pl-2.5 pr-3.5 py-1.5">
          <span className="pulse-dot" />
          <span>{config.freelanceTagline}</span>
        </div>
      )}

      {/* Name */}
      <h1 className="font-mono uppercase text-fg leading-[0.9] tracking-tight">
        <span className="block text-[clamp(2.5rem,8vw,4.5rem)]">{first}</span>
        <span className="block font-serif-italic normal-case text-accent text-[clamp(2.9rem,9.2vw,5.2rem)] -mt-1">
          {last}.
        </span>
      </h1>

      {/* Role line */}
      <p className="mt-7 text-[14px] text-fg-soft max-w-[60ch]">
        <span className="font-mono text-muted">{">"}</span>{" "}
        <span className="font-serif-italic text-fg text-[17px]">{config.title}</span>
        <span className="text-muted/60"> · </span>
        <span className="font-mono text-[12.5px] text-muted">based in</span>{" "}
        <span>{config.location}</span>
      </p>

      {/* Subtitle */}
      <p className="mt-10 text-[15.5px] leading-[1.72] text-fg-soft max-w-[58ch]">
        {config.hero.subtitle}
      </p>

      {/* Currently */}
      <div className="mt-10 max-w-[60ch]">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted font-mono mb-4">
          <span className="text-accent">$</span> currently
        </p>
        <ul className="grid gap-2.5 text-[13.5px] font-mono text-fg-soft">
          <li>
            <span className="text-accent">→</span> shipping{" "}
            <a
              href="https://inboxkit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link text-fg"
            >
              inboxkit/enrich
            </a>{" "}
            <span className="text-muted/70">(go · next · clickhouse · fastify · mongo)</span>
          </li>
          <li>
            <span className="text-accent">→</span> building{" "}
            <a
              href="https://dev-sync-blush.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link text-fg"
            >
              devsync
            </a>{" "}
            <span className="text-muted/70">(collaborative low-latency cloud ide)</span>
          </li>
          <li>
            <span className="text-accent">→</span> hacking{" "}
            <a
              href="https://github.com/rahulCoder9417/GoRedis"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link text-fg"
            >
              goredis
            </a>{" "}
            <span className="text-muted/70">(resp-protocol redis clone in go)</span>
          </li>
          <li>
            <span className="text-accent">→</span> grinding{" "}
            <a
              href={config.leetCodeProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link text-fg"
            >
              dsa
            </a>{" "}
            <span className="text-muted/70">({config.leetCodeStats.solved} solved · medium-heavy)</span>
          </li>
        </ul>
      </div>

      {/* Foot: clock pinned to the right */}
      <div className="mt-12 flex items-center justify-between text-[11px] font-mono text-muted uppercase tracking-[0.18em] border-t border-dashed border-[color:var(--border)] pt-4">
        <span>IST</span>
        <LiveClock />
      </div>
    </section>
  );
}
