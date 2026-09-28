import type { Metadata } from "next";
import MyBookingLookup from "@/components/booking/MyBookingLookup";

export const metadata: Metadata = { title: "Manage Your Booking" };

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function MyBookingPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const ref = typeof sp.ref === "string" ? sp.ref.toUpperCase() : "";
  const email = typeof sp.email === "string" ? sp.email : "";
  return (
    <section className="container pb-24 pt-36 lg:pt-44">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">My Booking</p>
        <h1 className="mt-3 text-display-md">Manage your reservation</h1>
        <p className="mt-4 text-espresso-50">Enter your booking reference and the email used when booking to view or cancel your stay.</p>
      </div>
      <div className="mt-12">
        <MyBookingLookup initialRef={ref} initialEmail={email} />
      </div>
    </section>
  );
}
