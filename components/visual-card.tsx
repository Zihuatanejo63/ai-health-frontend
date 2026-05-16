import Image from "next/image";

type IllustrationImageProps = {
  src: string;
  alt: string;
  variant?: "hero" | "section" | "compact";
  priority?: boolean;
  className?: string;
};

export function IllustrationImage({
  src,
  alt,
  variant = "section",
  priority = false,
  className = ""
}: IllustrationImageProps) {
  return (
    <figure className={`illustration-image illustration-${variant}${className ? ` ${className}` : ""}`}>
      <Image src={src} alt={alt} width={1536} height={1152} priority={priority} />
    </figure>
  );
}

export function VisualCard(props: Omit<IllustrationImageProps, "variant">) {
  return <IllustrationImage {...props} variant="section" />;
}
