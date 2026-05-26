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
                focused on building things end to end, from polished UI to the
                systems behind them.
              </>
            ) : (
              paragraph
            )}
          </p>
        ))}
      </div>

      {/* Stack: categorized, room to breathe */}
      <div className="mt-16">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted font-mono mb-7">
          <span className="text-accent">$</span> stack --list
        </p>

        <dl className="space-y-6">
          {config.techStack.categories.map((cat) => (
            <div
              key={cat.label}
              className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-x-6 gap-y-2 items-start"
            >
              <dt className="text-[12px] font-mono uppercase tracking-[0.16em] text-muted pt-1.5">
                {cat.label}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {cat.items.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center text-[13px] font-mono px-2.5 py-1.5 rounded-[5px] border border-[color:var(--border)] bg-bg-soft text-fg-soft hover:text-accent hover:border-accent hover:bg-[color:var(--accent-soft)] transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Focus */}
      <div className="mt-14">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted font-mono mb-5">
          <span className="text-accent">$</span> focus
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[14.5px] text-fg-soft">
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
