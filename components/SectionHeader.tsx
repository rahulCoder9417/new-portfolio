type Props = {
  children: React.ReactNode;
  right?: React.ReactNode;
};

export function SectionHeader({ children, right }: Props) {
  return (
    <div className="mb-8 flex items-baseline justify-between gap-4">
      <h2 className="text-[15px] font-medium text-fg">{children}</h2>
      {right && <div className="text-[13px] text-muted">{right}</div>}
    </div>
  );
}
