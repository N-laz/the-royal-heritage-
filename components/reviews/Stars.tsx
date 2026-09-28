const STAR = "M12 2.5l2.94 6.2 6.8.8-5.03 4.66 1.33 6.72L12 17.52 5.96 20.88l1.33-6.72L2.26 9.5l6.8-.8L12 2.5z";

export function StarIcon({ filled, size = 16, className = "" }: { filled: number; size?: number; className?: string }) {
  const id = `star-${Math.round(filled * 100)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${filled * 100}%`} stopColor="#A8834B" />
          <stop offset={`${filled * 100}%`} stopColor="#A8834B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={STAR} fill={`url(#${id})`} stroke="#A8834B" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export default function Stars({ rating, size = 16, className = "" }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} size={size} filled={Math.max(0, Math.min(1, rating - (n - 1)))} />
      ))}
    </span>
  );
}
