type Props = {
  num: string;
  title: string;
  blurb?: string;
  children: React.ReactNode;
};

/**
 * One section of a project walkthrough: faux-path header, big italic title,
 * optional one-liner blurb, then the media + detail body.
 */
export function WalkthroughStep({ num, title, blurb, children }: Props) {
  return (
    <section className="pt-14 pb-2 border-t border-dashed border-[color:var(--border)]">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent">
          {num}
        </span>
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
          /walkthrough
        </span>
      </div>
      <h3 className="font-serif-italic text-[28px] leading-tight text-fg mb-2">
        {title}
      </h3>
      {blurb && (
        <p className="text-[14px] text-fg-soft max-w-[60ch] mb-6">{blurb}</p>
      )}
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  );
}
