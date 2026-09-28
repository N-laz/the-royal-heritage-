"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SessionUser } from "@/types";

export default function UserMenu({ user, light }: { user: SessionUser; light: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const color = light ? "text-ivory/90 hover:text-ivory" : "text-espresso-100 hover:text-gold";

  if (!user) {
    return (
      <Link href="/login" className={`link-underline text-[11px] uppercase tracking-wider2 ${color}`}>
        Sign In
      </Link>
    );
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative z-[100]" ref={ref}>
      <button onClick={() => setOpen((v) => !v)} className={`flex items-center gap-2 text-[11px] uppercase tracking-wider2 ${color}`} aria-expanded={open}>
        <span className={`flex h-8 w-8 items-center justify-center rounded-full border font-serif text-sm normal-case tracking-normal ${light ? "border-ivory/50" : "border-gold/50 text-gold"}`}>
          {initials}
        </span>
        <span className="hidden md:inline">{user.name.split(" ")[0]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-[999] mt-3 w-56 animate-slide-down whitespace-nowrap border border-ivory-400 bg-ivory-50 py-2 shadow-luxe">
          <Link href="/account" onClick={() => setOpen(false)} className="block px-5 py-2.5 text-sm text-espresso hover:bg-ivory-200">My Account</Link>
          <Link href="/my-booking" onClick={() => setOpen(false)} className="block px-5 py-2.5 text-sm text-espresso hover:bg-ivory-200">Find a Booking</Link>
          {user.role === "ADMIN" && (
            <Link href="/admin" onClick={() => setOpen(false)} className="block px-5 py-2.5 text-sm text-gold hover:bg-ivory-200">Admin Dashboard</Link>
          )}
          <button onClick={logout} className="block w-full border-t border-ivory-400 px-5 py-2.5 text-left text-sm text-espresso-50 hover:bg-ivory-200">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
