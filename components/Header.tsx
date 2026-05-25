import Link from "next/link";
import { config } from "@/utils/config";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[color:var(--bg)]/75 border-b border-[color:var(--border)]">
      <div className="max-w-2xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-[13px] tracking-tight text-fg hover:text-accent transition-colors inline-flex items-baseline"
        >
          <span className="text-muted">~/</span>
          {config.logo.toLowerCase()}
          <span className="caret" aria-hidden />
        </Link>

        <nav className="flex items-center gap-5 text-[12px] font-mono">
          {config.navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${link.href}`}
              className="nav-link hidden sm:inline"
            >
              {link.label.toLowerCase()}
            </Link>
          ))}
          <a
            href={config.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            resume
          </a>
          <span className="hidden sm:block w-px h-4 bg-[color:var(--border)]" aria-hidden />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
