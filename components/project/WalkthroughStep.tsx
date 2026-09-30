type Props = {
  num: string;
  title: string;
  blurb?: string;
  children: React.ReactNode;
};

/** One section of a project walkthrough: numbered title, a one-line blurb, then media and detail. */
export function WalkthroughStep({ num, title, blurb, children }: Props) {
  return (
    <section className="pt-12 pb-2 border-t border-[color:var(--border)]">
      <h3 className="text-[21px] font-semibold tracking-tight text-fg">
        <span className="text-muted font-normal tabular-nums mr-2">{num}</span>
        {title}
      </h3>
      {blurb && <p className="mt-2 text-[15px] text-fg-soft max-w-[65ch]">{blurb}</p>}
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}
