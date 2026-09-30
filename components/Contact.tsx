import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  return (
    <section id="contact" className="py-16 border-t border-[color:var(--border)] scroll-mt-14">
      <SectionHeader>Contact</SectionHeader>

      <p className="text-[15.5px] leading-[1.75] text-fg-soft mb-6 max-w-[60ch]">
        I&apos;m open to full-time roles and freelance projects. Email is the
        fastest way to reach me.
      </p>

      <ul className="space-y-2.5">
        {config.primaryContact.map((c) => {
          const Icon = c.icon;
          return (
            <li key={c.href} className="flex items-center gap-3 text-[15px]">
              <Icon size={15} className="text-muted shrink-0" />
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-link">
                {c.label}
              </a>
            </li>
          );
        })}
      </ul>

      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-muted">
        {config.secondaryContact.map((c) => (
          <li key={c.href}>
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="nav-link">
              {c.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
