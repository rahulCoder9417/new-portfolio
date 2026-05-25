import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="py-20 border-t border-[color:var(--border)]">
      <SectionHeader num="03" path="experience">
        Where I&apos;ve worked
      </SectionHeader>

      <div className="space-y-14">
        {config.experience.map((exp) => (
          <article
            key={exp.company}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-3 gap-x-8"
          >
            <div className="text-[11px] font-mono text-muted uppercase tracking-[0.14em] pt-1">
              {exp.period}
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <h3 className="font-serif-italic text-[22px] text-fg leading-tight">
                  {exp.role}
                </h3>
                <span className="text-muted">@</span>
                <span className="text-fg-soft text-base">{exp.company}</span>
                {exp.current && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-accent uppercase tracking-[0.16em] ml-1">
                    <span className="pulse-dot" />
                    current
                  </span>
                )}
              </div>

              <p className="text-[12px] font-mono text-muted">{exp.location}</p>

              <p className="text-[15px] text-fg-soft leading-relaxed">
                {exp.description}
              </p>

              <ul className="mt-2 space-y-2 text-[14.5px] text-fg-soft">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="text-accent shrink-0 mt-1.5 text-[10px]">▹</span>
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-1.5 pt-3">
                {exp.tags.map((t) => (
                  <li key={t} className="pill">{t}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
