import Image from "next/image";

type VisualCardProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function VisualCard({ src, alt, priority = false }: VisualCardProps) {
  return (
    <figure className="visual-card">
      <Image src={src} alt={alt} width={1536} height={1152} priority={priority} />
    </figure>
  );
}
