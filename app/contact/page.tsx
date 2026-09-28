import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/reservations/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero image="/img/aerial.webp" eyebrow="Contact" title="We would love to hear from you" subtitle="Our reservations and concierge team are available around the clock." height="short" />
      <section className="container grid gap-14 py-24 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-10">
          <div>
            <p className="eyebrow">Address</p>
            <p className="mt-3 font-serif text-2xl leading-snug">{SITE.address}</p>
          </div>
          <div>
            <p className="eyebrow">Reservations</p>
            <p className="mt-3 text-lg"><a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-gold">{SITE.phone}</a></p>
            <p className="mt-1 text-lg"><a href={`mailto:${SITE.email}`} className="hover:text-gold">{SITE.email}</a></p>
            <p className="mt-1 text-sm text-espresso-50">WhatsApp: {SITE.whatsapp}</p>
          </div>
          <div>
            <p className="eyebrow">Getting here</p>
            <ul className="mt-3 space-y-2 text-sm text-espresso-50">
              <li>Bhuj Airport (BHJ) — 60 km, about 1 hour</li>
              <li>Ahmedabad Airport (AMD) — 390 km, or a 45-minute private charter</li>
              <li>Bhuj Railway Station — 58 km</li>
              <li>Complimentary transfers for villa guests</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <p className="mt-3 text-sm text-espresso-50">Check-in {SITE.checkInTime} · Check-out {SITE.checkOutTime} · Concierge 24 hours</p>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
