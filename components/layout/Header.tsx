"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import UserMenu from "@/components/layout/UserMenu";
import { NAV_LINKS } from "@/lib/constants";
import type { SessionUser } from "@/types";

const HERO_ROUTES = ["/", "/stay", "/dining", "/wellness", "/experiences", "/offers", "/celebrations", "/gallery", "/about", "/contact"];

function hasDarkHero(pathname: string) {
  return HERO_ROUTES.includes(pathname) || /^\/stay\/[^/]+$/.test(pathname);
}

export default function Header({ user }: { user: SessionUser }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (pathname.startsWith("/admin")) {
    return (
      <header className="no-print fixed inset-x-0 top-0 z-50 border-b border-ivory-400 bg-ivory-50/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Logo className="scale-90" />
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[11px] uppercase tracking-wider2 text-espresso-50 hover:text-gold">View site</Link>
            <UserMenu user={user} light={false} />
          </div>
        </div>
      </header>
    );
  }

  const transparent = hasDarkHero(pathname) && !scrolled && !open;
  const light = transparent || open;

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe ${
        transparent ? "bg-transparent" : open ? "bg-espresso" : "border-b border-ivory-400/70 bg-ivory-50/95 shadow-soft backdrop-blur"
      }`}
    >
      <div className={`container grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`flex items-center gap-3 lg:hidden ${light ? "text-ivory" : "text-espresso"}`}
          >
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
            <span className="hidden text-[11px] uppercase tracking-wider2 sm:inline">Menu</span>
          </button>
          <Link
            href="/my-booking"
            className={`link-underline hidden text-[11px] uppercase tracking-wider2 lg:inline-block ${light ? "text-ivory/90" : "text-espresso-100"}`}
          >
            My Booking
          </Link>
        </div>

        <Logo light={light} />

        <div className="flex items-center justify-end gap-5">
          <div className="hidden sm:block">
            <UserMenu user={user} light={light} />
          </div>
          <Link
            href="/stay"
            className={`${light ? "btn-gold" : "btn-primary"} !px-4 !py-2.5 text-[10px] sm:!px-5 sm:!py-3 sm:text-xs`}
          >
            Book<span className="hidden sm:inline">&nbsp;Now</span>
          </Link>
        </div>
      </div>

      <nav className={`relative z-0 hidden border-t lg:block ${transparent ? "border-ivory/15" : "border-ivory-400/70"}`}>
        <ul className="container flex items-center justify-center gap-8 py-3.5 xl:gap-11">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`link-underline text-[11px] uppercase tracking-wider2 transition-colors ${
                    light ? (active ? "text-gold-light" : "text-ivory/85 hover:text-ivory") : active ? "text-gold" : "text-espresso-100 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {open && (
        <div className="h-[calc(100svh-72px)] animate-fade-in overflow-y-auto overscroll-contain bg-espresso lg:hidden">
          <ul className="container flex flex-col gap-1 py-8">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                <Link href={link.href} className="block py-2.5 font-serif text-3xl text-ivory transition-colors hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-6 border-t border-ivory/15 pt-6">
              <Link href="/my-booking" className="block py-2 text-sm uppercase tracking-wider2 text-ivory/80">My Booking</Link>
              {user ? (
                <>
                  <Link href="/account" className="block py-2 text-sm uppercase tracking-wider2 text-ivory/80">My Account</Link>
                  {user.role === "ADMIN" && (
                    <Link href="/admin" className="block py-2 text-sm uppercase tracking-wider2 text-gold-light">Admin Dashboard</Link>
                  )}
                </>
              ) : (
                <Link href="/login" className="block py-2 text-sm uppercase tracking-wider2 text-ivory/80">Sign In</Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
