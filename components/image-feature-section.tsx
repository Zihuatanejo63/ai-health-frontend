import { ReactNode } from "react";
import { SectionHeader } from "@/components/section-header";
import { VisualCard } from "@/components/visual-card";

type ImageFeatureSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  reverse?: boolean;
};

export function ImageFeatureSection({
  id,
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  reverse = false
}: ImageFeatureSectionProps) {
  return (
    <section className="home-section" id={id}>
      <div className={`image-feature-section${reverse ? " image-feature-reverse" : ""}`}>
        <div className="image-feature-copy">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
          {children}
        </div>
        <VisualCard src={imageSrc} alt={imageAlt} />
      </div>
    </section>
  );
}
