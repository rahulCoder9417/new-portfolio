type Props = {
  num?: string;
  path?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
};

export function SectionHeader({ num, path, children, right }: Props) {
  return (
    <div className="mb-9">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-[11px] uppercase tracking-[0.2em] font-mono text-muted whitespace-nowrap">
          {path && <span className="text-fg-soft">~/{path}</span>}
          {path && num && <span className="text-muted/60 mx-2">·</span>}
          {num && <span className="text-accent">{num}</span>}
          {!path && !num && children}
        </h2>
        <div className="section-rule" aria-hidden />
        {right && (
          <div className="text-[11px] uppercase tracking-[0.16em] font-mono text-muted whitespace-nowrap">
            {right}
          </div>
        )}
      </div>
      {(path || num) && (
        <h3 className="font-serif-italic text-[28px] leading-[1.05] text-fg">
          {children}
        </h3>
      )}
    </div>
  );
}
