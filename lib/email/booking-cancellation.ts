import type { BookingView } from "@/types";
import { formatDate, formatINR, plural } from "@/lib/format";
import { EMAIL_COLORS as c, appUrl, button, emailLayout, escapeHtml, row } from "@/lib/email/layout";

export function bookingCancellationEmail(b: BookingView) {
  const subject = `Booking cancelled — ${b.ref} · The Royal Heritage`;
  const body = `
    <p style="font-size:15px;line-height:1.7;margin:0 0 24px;">Dear ${escapeHtml(b.firstName)},</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 28px;">As requested, your reservation has been cancelled. We are sorry not to welcome you this time and hope to host you at the palace soon.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Booking reference", `<span style="color:${c.gold};font-weight:600;">${escapeHtml(b.ref)}</span>`)}
      ${row("Accommodation", escapeHtml(b.room.name))}
      ${row("Dates", escapeHtml(`${formatDate(b.checkIn)} – ${formatDate(b.checkOut)}`))}
      ${row("Stay", `${plural(b.nights, "night")} · ${plural(b.rooms, "room")}`)}
      ${row("Booking total", formatINR(b.total))}
      ${row("Status", `<span style="color:#9B2C2C;font-weight:600;">Cancelled</span>`)}
    </table>
    <div style="background:${c.ivory};padding:18px 20px;margin:24px 0 0;font-size:13px;line-height:1.7;color:${c.muted};">
      Any refund due under the cancellation policy will be returned to your original payment method within 7–10 working days.
    </div>
    ${button("Plan a new stay", appUrl("/stay"))}
  `;
  const text = [
    `Dear ${b.firstName},`,
    `Your booking ${b.ref} (${b.room.name}, ${formatDate(b.checkIn)} – ${formatDate(b.checkOut)}) has been cancelled.`,
    `Any refund due will be returned to your original payment method within 7–10 working days.`,
    `Plan a new stay: ${appUrl("/stay")}`,
  ].join("\n\n");
  return {
    subject,
    html: emailLayout({ preheader: `Booking ${b.ref} has been cancelled`, eyebrow: "Cancellation Confirmed", title: "Your booking has been cancelled", body }),
    text,
  };
}
