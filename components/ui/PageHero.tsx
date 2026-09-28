import Image from "next/image";

export default function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  height = "tall",
}: {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  height?: "tall" | "short";
}) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-espresso ${height === "tall" ? "h-[78vh] min-h-[520px]" : "h-[56vh] min-h-[420px]"}`}>
      <Image src={image} alt="" fill priority sizes="100vw" className="animate-ken-burns object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-600/60 via-espresso-600/20 to-espresso-600/80" />
      <div className="container relative pb-16 text-ivory sm:pb-20">
        <p className="eyebrow animate-fade-up text-gold-light">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl animate-fade-up text-display-lg [animation-delay:120ms]">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl animate-fade-up text-base text-ivory/80 [animation-delay:240ms] sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
