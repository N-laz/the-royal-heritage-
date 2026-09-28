"use client";

import { Input, Select, Textarea } from "@/components/ui/Input";
import { ARRIVAL_TIMES, COUNTRIES } from "@/lib/constants";

export type GuestState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  arrivalTime: string;
  requests: string;
};

export default function StepGuestDetails({
  guest,
  setGuest,
  errors,
  signedIn,
}: {
  guest: GuestState;
  setGuest: (g: GuestState) => void;
  errors: Record<string, string>;
  signedIn: boolean;
}) {
  const set = (key: keyof GuestState) => (e: { target: { value: string } }) => setGuest({ ...guest, [key]: e.target.value });

  return (
    <div>
      <h2 className="text-3xl">Guest details</h2>
      <p className="mt-2 text-sm text-espresso-50">
        {signedIn ? "We've filled in your details from your account." : "Your confirmation will be sent to this email address."}
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Input label="First name *" name="firstName" value={guest.firstName} onChange={set("firstName")} error={errors.firstName} autoComplete="given-name" />
        <Input label="Last name *" name="lastName" value={guest.lastName} onChange={set("lastName")} error={errors.lastName} autoComplete="family-name" />
        <Input label="Email *" name="email" type="email" value={guest.email} onChange={set("email")} error={errors.email} autoComplete="email" />
        <Input label="Phone *" name="phone" type="tel" value={guest.phone} onChange={set("phone")} error={errors.phone} placeholder="+91 98xxx xxxxx" autoComplete="tel" />
        <Select label="Country *" name="country" value={guest.country} onChange={set("country")} error={errors.country}>
          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
        </Select>
        <Select label="Estimated arrival" name="arrivalTime" value={guest.arrivalTime} onChange={set("arrivalTime")}>
          <option value="">Select a time</option>
          {ARRIVAL_TIMES.map((t) => <option key={t}>{t}</option>)}
        </Select>
        <Textarea
          className="sm:col-span-2"
          label="Special requests"
          name="requests"
          value={guest.requests}
          onChange={set("requests")}
          placeholder="Anniversary, dietary needs, pillow preferences, connecting rooms…"
          maxLength={1000}
        />
      </div>
    </div>
  );
}
