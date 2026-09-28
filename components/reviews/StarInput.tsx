"use client";

import { useState } from "react";
import { StarIcon } from "@/components/reviews/Stars";

const LABELS = ["", "Poor", "Fair", "Good", "Very good", "Exceptional"];

export default function StarInput({ value, onChange, error }: { value: number; onChange: (v: number) => void; error?: string }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div>
      <span className="field-label">Your rating</span>
      <div className="mt-2 flex items-center gap-4">
        <div className="flex gap-1" role="radiogroup" aria-label="Rating" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={value === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onMouseEnter={() => setHover(n)}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(0)}
              onClick={() => onChange(n)}
              className="transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              <StarIcon size={30} filled={n <= shown ? 1 : 0} />
            </button>
          ))}
        </div>
        <span className="text-sm text-espresso-50">{LABELS[shown]}</span>
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
