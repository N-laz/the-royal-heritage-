"use client";

import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function ConfirmationActions({ emailHtml, emailSubject, email }: { emailHtml: string; emailSubject: string; email: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="no-print flex flex-wrap justify-center gap-3">
        <button onClick={() => window.print()} className="btn-outline">Print</button>
        <button onClick={() => setOpen(true)} className="btn-outline">View Email</button>
        <Link href="/my-booking" className="btn-primary">Manage Booking</Link>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} eyebrow={`Sent to ${email}`} title={emailSubject} size="lg">
        <iframe title="Confirmation email" srcDoc={emailHtml} className="h-[70vh] w-full border border-ivory-400 bg-white" sandbox="" />
      </Modal>
    </>
  );
}
