import Link from "next/link";
import Logo from "@/components/ui/Logo";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="no-print bg-espresso text-ivory">
      <div className="container px-4 sm:px-6 grid gap-10 sm:gap-14 py-14 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light className="!items-start" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/80">
            A royal coastal resort on the Arabian Sea — where the palaces of Rajasthan meet the calm of the Mediterranean.
          </p>
          <div className="mt-6 flex gap-5 text-[11px] uppercase tracking-wider2 text-ivory/80">
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center hover:text-gold-light">Instagram</a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-gold-light">Discover</p>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 text-sm text-ivory/80 lg:grid-cols-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-[36px] items-center transition-colors hover:text-gold-light">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold-light">Contact</p>
          <address className="mt-6 space-y-3 text-sm not-italic leading-relaxed text-ivory/80">
            <p>{SITE.address}</p>
            <p>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="inline-flex min-h-[36px] items-center hover:text-gold-light">{SITE.phone}</a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="inline-flex min-h-[36px] items-center hover:text-gold-light">{SITE.email}</a>
            </p>
            <p className="text-ivory/60 text-xs">Check-in {SITE.checkInTime} · Check-out {SITE.checkOutTime}</p>
          </address>
        </div>

        <div>
          <p className="eyebrow text-gold-light">Letters from the Palace</p>
          <p className="mt-6 text-sm leading-relaxed text-ivory/80">Seasonal offers, new experiences and stories from the coast — a few times a year.</p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-wider2 text-ivory/70">
            <Link id="footer-manage-booking" href="/my-booking" className="inline-flex min-h-[36px] items-center hover:text-gold-light">Manage Booking</Link>
            <Link id="footer-my-account" href="/account" className="inline-flex min-h-[36px] items-center hover:text-gold-light">My Account</Link>
            <Link id="footer-reviews" href="/reviews" className="inline-flex min-h-[36px] items-center hover:text-gold-light">Guest Reviews</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/15">
        <div className="container px-4 sm:px-6 flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/70 sm:flex-row text-center sm:text-left">
          <p>© {year} The Royal Heritage. All rights reserved.</p>
          <p>All rates in Indian Rupees. GST at 18% applies.</p>
        </div>
      </div>
    </footer>
  );
}
