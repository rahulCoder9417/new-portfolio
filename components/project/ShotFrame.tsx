import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
};

export function ShotFrame({ src, alt, caption, priority }: Props) {
  return (
    <figure>
      <div className="rounded-md overflow-hidden border border-[color:var(--border)] bg-bg-soft">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(min-width: 768px) 720px, 100vw"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-[13px] text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
