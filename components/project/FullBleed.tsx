type Props = {
  children: React.ReactNode;
  max?: string;
  className?: string;
};

/**
 * Breaks out of the parent column to viewport width, then re-constrains
 * to `max`. Use for media that needs more room than the reading column.
 */
export function FullBleed({ children, max = "1280px", className }: Props) {
  return (
    <div className="relative left-1/2 -translate-x-1/2 w-screen px-6">
      <div className={`mx-auto ${className ?? ""}`} style={{ maxWidth: max }}>
        {children}
      </div>
    </div>
  );
}
