import { SectionHeader } from "../SectionHeader";

export function ProjectSection({
  title,
  num,
  path,
  children,
}: {
  title: string;
  num?: string;
  path?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-14 border-t border-[color:var(--border)]">
      <SectionHeader num={num} path={path}>
        {title}
      </SectionHeader>
      <div className="space-y-4 text-[15px] leading-[1.78] text-fg-soft">
        {children}
      </div>
    </section>
  );
}
