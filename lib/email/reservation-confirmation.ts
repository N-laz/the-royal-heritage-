import type { ReservationView } from "@/types";
import { formatDate } from "@/lib/format";
import { EMAIL_COLORS as c, appUrl, button, emailLayout, escapeHtml, row } from "@/lib/email/layout";

const KIND_LABEL: Record<ReservationView["kind"], string> = {
  DINING: "Dining Reservation",
  SPA: "Spa Appointment",
  EXPERIENCE: "Experience Booking",
  CELEBRATION: "Celebration Enquiry",
  CONTACT: "Message Received",
};

export function reservationConfirmationEmail(r: ReservationView) {
  const label = KIND_LABEL[r.kind];
  const isRequest = r.kind === "CONTACT" || r.kind === "CELEBRATION";
  const subject = `${label} — ${r.ref} · The Royal Heritage`;
  const title = isRequest ? "Thank you for reaching out" : "Your reservation is confirmed";
  const intro = isRequest
    ? "Thank you for getting in touch. A member of our team will respond within 24 hours."
    : "We are delighted to confirm your reservation. Our team will be ready to welcome you.";

  const body = `
    <p style="font-size:15px;line-height:1.7;margin:0 0 24px;">Dear ${escapeHtml(r.name)},</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 28px;">${intro}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Reference", `<span style="color:${c.gold};font-weight:600;">${escapeHtml(r.ref)}</span>`)}
      ${row(r.kind === "CONTACT" ? "Subject" : "Selection", escapeHtml(r.item))}
      ${r.date ? row("Date", escapeHtml(formatDate(r.date, "long"))) : ""}
      ${r.time ? row("Time", escapeHtml(r.time)) : ""}
      ${r.guests ? row("Guests", escapeHtml(r.guests)) : ""}
      ${r.phone ? row("Phone", escapeHtml(r.phone)) : ""}
    </table>
    ${r.notes ? `<p style="font-size:14px;line-height:1.7;margin:20px 0 0;color:${c.muted};"><strong style="color:${c.espresso};">Notes:</strong> ${escapeHtml(r.notes)}</p>` : ""}
    ${button("Explore the resort", appUrl("/"))}
  `;
  const text = [
    `Dear ${r.name},`,
    intro,
    `Reference: ${r.ref}`,
    `${r.kind === "CONTACT" ? "Subject" : "Selection"}: ${r.item}`,
    r.date ? `Date: ${formatDate(r.date, "long")}` : "",
    r.time ? `Time: ${r.time}` : "",
    r.guests ? `Guests: ${r.guests}` : "",
    r.notes ? `Notes: ${r.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject,
    html: emailLayout({ preheader: `${label} ${r.ref}`, eyebrow: label, title, body }),
    text,
  };
}
