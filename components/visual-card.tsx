type VisualCardProps = {
  src: string;
  alt: string;
};

export function VisualCard({ src, alt }: VisualCardProps) {
  return (
    <figure className="visual-card">
      <img src={src} alt={alt} />
    </figure>
  );
}
