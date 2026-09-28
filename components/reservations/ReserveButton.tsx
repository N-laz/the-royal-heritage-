"use client";

import { useState } from "react";
import ReservationModal, { type ReservationKind } from "@/components/reservations/ReservationModal";

export default function ReserveButton({
  kind,
  item,
  options,
  times,
  label = "Reserve",
  variant = "primary",
  className = "",
}: {
  kind: ReservationKind;
  item?: string;
  options?: string[];
  times?: string[];
  label?: string;
  variant?: "primary" | "gold" | "outline" | "light";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const cls = { primary: "btn-primary", gold: "btn-gold", outline: "btn-outline", light: "btn-light" }[variant];
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`${cls} ${className}`}>{label}</button>
      <ReservationModal open={open} onClose={() => setOpen(false)} kind={kind} item={item} options={options} times={times} />
    </>
  );
}
