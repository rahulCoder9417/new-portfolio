export function ProjectSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 border-t border-[color:var(--border)]">
      <h2 className="text-[21px] font-semibold tracking-tight text-fg mb-5">{title}</h2>
      <div className="space-y-4 text-[15.5px] leading-[1.75] text-fg-soft">{children}</div>
    </section>
  );
}
