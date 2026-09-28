import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? "text-gold-light" : ""}`}>{eyebrow}</p>}
      <h2 className={`mt-4 text-display-md ${light ? "text-ivory" : "text-espresso"}`}>{title}</h2>
      <span className={`mt-6 block h-px w-16 bg-gold-light ${centered ? "mx-auto" : ""}`} />
      {description && (
        <p className={`mt-6 text-[15px] leading-relaxed ${light ? "text-ivory/75" : "text-espresso-50"}`}>{description}</p>
      )}
    </Reveal>
  );
}
