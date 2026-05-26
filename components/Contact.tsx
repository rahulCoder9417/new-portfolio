import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  return (
    <section id="contact" className="py-20 border-t border-[color:var(--border)]">
      <SectionHeader num="06" path="contact">
        Let&apos;s talk
      </SectionHeader>

      <p className="text-[15.5px] leading-[1.78] text-fg-soft mb-9 max-w-[60ch]">
        I&apos;m open to{" "}
        <span className="font-serif-italic text-fg">interesting work</span>:
        full-time roles, freelance, or just a good conversation about systems
        and frontend craft.
      </p>

      <ul className="space-y-3">
        {config.primaryContact.map((c) => {
          const Icon = c.icon;
          return (
            <li key={c.href} className="flex items-center gap-3">
              <Icon size={15} className="text-accent shrink-0" />
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="prose-link text-fg"
              >
                {c.label}
              </a>
            </li>
          );
        })}
      </ul>

      <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-mono text-muted uppercase tracking-[0.14em]">
        {config.secondaryContact.map((c) => (
          <li key={c.href}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {c.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
