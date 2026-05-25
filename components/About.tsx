import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="py-20 border-t border-[color:var(--border)]">
      <SectionHeader num="01" path="about">About</SectionHeader>

      <div className="space-y-5 text-[15.5px] leading-[1.78] text-fg-soft max-w-[62ch]">
        {config.about.bio.map((paragraph, i) => (
          <p key={i}>
            {i === 0 ? (
              <>
                I&apos;m a{" "}
                <span className="font-serif-italic text-fg">Software Engineer</span>{" "}
                focused on building things end-to-end — from polished UI to the
                systems behind them.
              </>
            ) : (
              paragraph
            )}
          </p>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-10 gap-x-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono">
            <span className="text-accent">$</span> stack
          </p>
        </div>
        <div className="space-y-3">
          <ul className="flex flex-wrap gap-1.5">
            {config.techStack.primary.map((t) => (
              <li key={t} className="pill">{t}</li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-1.5">
            {config.techStack.secondary.map((t) => (
              <li key={t} className="pill opacity-60">{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono">
            <span className="text-accent">$</span> focus
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[14px] text-fg-soft">
          {config.coreExpertise.map((item) => (
            <li key={item} className="flex items-baseline gap-2.5">
              <span className="text-accent text-xs font-mono">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
