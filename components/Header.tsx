import Link from "next/link";
import { config } from "@/utils/config";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ wide = false }: { wide?: boolean }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--bg)]/80 border-b border-[color:var(--border)]">
      <div
        className={`${wide ? "max-w-4xl" : "max-w-2xl"} mx-auto px-6 h-14 flex items-center justify-between`}
      >
        <Link href="/" className="text-[14px] font-medium text-fg">
          {config.name}
        </Link>

        <nav className="flex items-center gap-5 text-[13.5px]">
          {config.navLinks.map((link) => (
            <Link key={link.href} href={`/${link.href}`} className="nav-link hidden sm:inline">
              {link.label}
            </Link>
          ))}
          <a href={config.resumePath} target="_blank" rel="noopener noreferrer" className="nav-link">
            Resume
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
