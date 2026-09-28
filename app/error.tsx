"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 pt-28 text-center">
      <div>
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-4 text-display-md">We hit an unexpected ripple</h1>
        <p className="mx-auto mt-4 max-w-md text-espresso-50">Please try again. If the problem continues, contact our reservations team.</p>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={reset} className="btn-primary">Try again</button>
          <Link href="/" className="btn-outline">Home</Link>
        </div>
      </div>
    </section>
  );
}
