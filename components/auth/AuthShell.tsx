import Image from "next/image";
import type { ReactNode } from "react";

export default function AuthShell({ eyebrow, title, subtitle, image, children }: { eyebrow: string; title: string; subtitle: string; image: string; children: ReactNode }) {
  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-espresso lg:block">
        <Image src={image} alt="" fill priority sizes="50vw" className="object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-600/80 via-transparent to-espresso-600/30" />
        <div className="absolute inset-x-12 bottom-14 text-ivory">
          <p className="font-serif text-4xl leading-tight">&ldquo;A palace where time slows to the rhythm of the tide.&rdquo;</p>
          <p className="mt-4 text-[11px] uppercase tracking-luxe text-gold-light">Condé Nast Traveller India</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 pb-16 pt-36 lg:pt-40">
        <div className="w-full max-w-md">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-display-sm">{title}</h1>
          <p className="mt-3 text-sm text-espresso-50">{subtitle}</p>
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
