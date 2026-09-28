"use client";

import { useEffect, type ReactNode } from "react";

export default function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const width = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-5xl" }[size];

  return (
    <div className="no-print fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 animate-fade-in bg-espresso-600/70 backdrop-blur-sm" />
      <div className={`relative max-h-[92vh] w-full ${width} animate-fade-up overflow-y-auto bg-ivory-50 shadow-luxe`}>
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-ivory-400 bg-ivory-50 px-6 py-5 sm:px-8">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="mt-1 text-2xl sm:text-3xl">{title}</h2>}
          </div>
          <button onClick={onClose} aria-label="Close dialog" className="mt-1 p-1 text-espresso-50 transition-colors hover:text-gold">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6 sm:px-8 sm:py-8">{children}</div>
      </div>
    </div>
  );
}
