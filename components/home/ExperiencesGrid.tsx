import Link from "next/link";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const TILES = [
  { title: "The Royal Spa", sub: "Ayurveda & hammam rituals", image: "/img/spa.webp", href: "/wellness", span: "md:col-span-2 md:row-span-2" },
  { title: "Sunset Yacht Cruise", sub: "Champagne on the Arabian Sea", image: "/img/yacht.webp", href: "/experiences", span: "" },
  { title: "Beach Dinners", sub: "Lantern-lit tables on the sand", image: "/img/beach-dinner.webp", href: "/experiences", span: "" },
  { title: "Desert Safari", sub: "The White Rann of Kutch", image: "/img/desert.webp", href: "/experiences", span: "" },
  { title: "Royal Weddings", sub: "Celebrations of a lifetime", image: "/img/wedding.webp", href: "/celebrations", span: "" },
];

export default function ExperiencesGrid() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Experiences" title="Moments worthy of a maharaja" description="Unhurried rituals, adventures at sea and in the desert, and celebrations planned down to the last petal." />
        <div className="mt-16 grid auto-rows-[260px] gap-5 md:grid-cols-4 md:auto-rows-[280px]">
          {TILES.map((t, i) => (
            <Reveal key={t.title} delay={i * 80} className={t.span}>
              <Link href={t.href} className="group relative block h-full">
                <ZoomImage src={t.image} alt={t.title} className="h-full w-full" overlay sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <p className="text-[10px] uppercase tracking-luxe text-gold-light">{t.sub}</p>
                  <h3 className="mt-2 text-2xl sm:text-3xl">{t.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
