import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "light";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-primary",
  gold: "btn-gold",
  outline: "btn-outline",
  light: "btn-light",
};

type Common = { id?: string; variant?: Variant; className?: string; children: ReactNode };

export function ButtonLink({ href, variant = "primary", className = "", id, children }: Common & { href: string }) {
  return (
    <Link id={id} href={href} className={`${VARIANT_CLASS[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  loading = false,
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button {...props} disabled={props.disabled || loading} className={`${VARIANT_CLASS[variant]} ${className}`}>
      {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" />}
      {children}
    </button>
  );
}
