import { config } from "@/utils/config";

export function Footer() {
  return (
    <footer className="py-10 border-t border-[color:var(--border)] flex items-center justify-between gap-4">
      <p className="text-[13px] text-muted">
        © {new Date().getFullYear()} {config.name}
      </p>
      <ul className="flex items-center gap-4">
        {config.socials.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted hover:text-fg transition-colors"
              >
                <Icon size={15} />
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
