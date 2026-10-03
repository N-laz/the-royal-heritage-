import Link from "next/link";

export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`group flex flex-col items-center leading-none ${className}`} aria-label="The Royal Heritage — home">
      <svg width="26" height="14" viewBox="0 0 26 14" fill="none" className="mb-1 text-gold-light transition-transform duration-700 group-hover:-translate-y-0.5">
        <path d="M1 13h24M2 12L4 3l5 5 4-7 4 7 5-5 2 9" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
      <span className={`font-serif text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] ${light ? "text-ivory/80" : "text-espresso-50"}`}>The</span>
      <span className={`font-serif text-base uppercase tracking-[0.2em] sm:text-xl sm:tracking-[0.28em] ${light ? "text-ivory" : "text-espresso"}`}>Royal Heritage</span>
    </Link>
  );
}
