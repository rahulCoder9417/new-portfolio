export function HighlightList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-fg/90">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-accent">›</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
