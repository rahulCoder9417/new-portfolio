import { config } from "@/utils/config";

export function Footer() {
  return (
    <footer className="py-14 mt-12 border-t border-[color:var(--border)]">
      <div className="space-y-6">
        <p className="font-mono text-[13px] text-muted">
          <span className="text-fg-soft">~/portfolio</span>{" "}
          <span className="text-accent">$</span>{" "}
          <span className="text-fg-soft">echo</span>{" "}
          <span className="text-muted/80">&quot;thanks for scrolling.&quot;</span>
          <span className="caret" aria-hidden />
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-dashed border-[color:var(--border)]">
          <p className="text-[11px] font-mono text-muted uppercase tracking-[0.16em]">
            © {new Date().getFullYear()} {config.name.toLowerCase().replace(" ", "-")}
          </p>
          <ul className="flex items-center gap-5">
            {config.socials.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-muted hover:text-accent transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
