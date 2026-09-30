import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="py-16 border-t border-[color:var(--border)] scroll-mt-14">
      <SectionHeader>About</SectionHeader>

      <div className="space-y-4 text-[15.5px] leading-[1.75] text-fg-soft max-w-[62ch]">
        {config.about.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <h3 className="mt-12 mb-4 text-[13px] font-medium text-muted">Tools I use</h3>
      <dl className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
        {config.techStack.categories.map((cat) => (
          <div
            key={cat.label}
            className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-x-6 gap-y-1 py-3"
          >
            <dt className="text-[13.5px] text-muted">{cat.label}</dt>
            <dd className="text-[14px] text-fg-soft leading-relaxed">{cat.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
