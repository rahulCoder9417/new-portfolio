export function HighlightList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 list-disc pl-5 marker:text-[color:var(--line)]">
      {items.map((item) => (
        <li key={item} className="pl-1">{item}</li>
      ))}
    </ul>
  );
}
