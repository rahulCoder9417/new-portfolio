import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="py-16 border-t border-[color:var(--border)] scroll-mt-14">
      <SectionHeader>Experience</SectionHeader>

      <div className="space-y-12">
        {config.experience.map((exp) => (
          <article key={exp.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[16px] font-medium text-fg">
                {exp.role},{" "}
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                  {exp.company}
                </a>
              </h3>
              <span className="text-[13px] text-muted tabular-nums">{exp.period}</span>
            </div>
            <p className="mt-0.5 text-[13.5px] text-muted">{exp.location}</p>

            <p className="mt-4 text-[15px] text-fg-soft leading-relaxed">{exp.description}</p>

            <ul className="mt-3 space-y-2 text-[14.5px] text-fg-soft list-disc pl-5 marker:text-[color:var(--line)]">
              {exp.highlights.map((h) => (
                <li key={h} className="leading-relaxed pl-1">{h}</li>
              ))}
            </ul>

            <p className="mt-4 text-[12.5px] font-mono text-muted">{exp.tags.join(" · ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
