import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHero image="/img/aerial.webp" eyebrow="Gallery" title="Glimpses of the palace" subtitle="Sandstone and sea, lantern light and linen — a visual journey through The Royal Heritage." height="short" />
      <section className="container py-24">
        <GalleryGrid />
      </section>
    </>
  );
}
