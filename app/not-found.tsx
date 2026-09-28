import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-espresso px-6 pt-24 text-center text-ivory">
      <div>
        <p className="eyebrow text-gold-light">Error 404</p>
        <h1 className="mt-4 text-display-lg">This corridor leads nowhere</h1>
        <p className="mx-auto mt-5 max-w-md text-ivory/70">
          The page you were looking for has wandered off. Let us guide you back to the palace.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-light">Return home</Link>
          <Link href="/stay" className="btn-gold">Explore stays</Link>
        </div>
      </div>
    </section>
  );
}
