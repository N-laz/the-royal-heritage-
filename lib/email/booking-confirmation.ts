import type { BookingView } from "@/types";
import { formatDate, formatINR, paymentLabel, plural } from "@/lib/format";
import { EMAIL_COLORS as c, appUrl, button, divider, emailLayout, escapeHtml, row } from "@/lib/email/layout";

export function bookingSummaryTable(b: BookingView): string {
  const guests = `${plural(b.adults, "adult")}${b.children ? `, ${plural(b.children, "child", "children")}` : ""}`;
  const extrasRows = b.extras.map((e) => row(e.name, formatINR(e.amount))).join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
    ${row("Booking reference", `<span style="color:${c.gold};font-weight:600;letter-spacing:1px;">${escapeHtml(b.ref)}</span>`)}
    ${row("Guest", escapeHtml(`${b.firstName} ${b.lastName}`))}
    ${row("Accommodation", escapeHtml(b.room.name))}
    ${row("Check-in", `${escapeHtml(formatDate(b.checkIn, "long"))} · from 3:00 PM`)}
    ${row("Check-out", `${escapeHtml(formatDate(b.checkOut, "long"))} · by 12:00 PM`)}
    ${row("Stay", `${plural(b.nights, "night")} · ${plural(b.rooms, "room")}`)}
    ${row("Guests", escapeHtml(guests))}
    ${b.arrivalTime ? row("Arrival time", escapeHtml(b.arrivalTime)) : ""}
    ${divider()}
    ${row("Room total", formatINR(b.roomTotal))}
    ${b.discount ? row(`Promo ${b.promoCode ?? ""}`, `− ${formatINR(b.discount)}`) : ""}
    ${extrasRows}
    ${row("Subtotal", formatINR(b.subtotal))}
    ${row("GST (18%)", formatINR(b.tax))}
    ${divider()}
    ${row("Total", `<span style="font-size:18px;">${formatINR(b.total)}</span>`, true)}
    ${row("Payment", escapeHtml(paymentLabel(b.paymentMethod, b.paymentLast4)))}
  </table>`;
}

export function bookingConfirmationEmail(b: BookingView) {
  const subject = `Your stay is confirmed — ${b.ref} · The Royal Heritage`;
  const body = `
    <p style="font-size:15px;line-height:1.7;margin:0 0 24px;">Dear ${escapeHtml(b.firstName)},</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 28px;">Thank you for choosing The Royal Heritage. We are delighted to confirm your reservation and look forward to welcoming you to the palace by the sea.</p>
    ${bookingSummaryTable(b)}
    ${b.requests ? `<p style="font-size:14px;line-height:1.7;margin:20px 0 0;color:${c.muted};"><strong style="color:${c.espresso};">Special requests:</strong> ${escapeHtml(b.requests)}</p>` : ""}
    <div style="background:${c.ivory};padding:18px 20px;margin:24px 0 0;font-size:13px;line-height:1.7;color:${c.muted};">
      <strong style="color:${c.espresso};">Cancellation policy</strong><br />${escapeHtml(b.room.cancellation)}
    </div>
    ${button("View your booking", appUrl(`/confirmation/${b.ref}`))}
    <p style="font-size:13px;line-height:1.7;text-align:center;color:${c.muted};margin:8px 0 0;">You can view or cancel this booking anytime at <a href="${escapeHtml(appUrl("/my-booking"))}" style="color:${c.gold};">My Booking</a> using your reference and email.</p>
  `;
  const text = [
    `Dear ${b.firstName},`,
    ``,
    `Your stay at The Royal Heritage is confirmed.`,
    ``,
    `Reference: ${b.ref}`,
    `Accommodation: ${b.room.name}`,
    `Check-in: ${formatDate(b.checkIn, "long")} (from 3:00 PM)`,
    `Check-out: ${formatDate(b.checkOut, "long")} (by 12:00 PM)`,
    `Stay: ${plural(b.nights, "night")}, ${plural(b.rooms, "room")}`,
    `Guests: ${plural(b.adults, "adult")}${b.children ? `, ${plural(b.children, "child", "children")}` : ""}`,
    ``,
    `Room total: ${formatINR(b.roomTotal)}`,
    b.discount ? `Promo ${b.promoCode}: -${formatINR(b.discount)}` : "",
    ...b.extras.map((e) => `${e.name}: ${formatINR(e.amount)}`),
    `Subtotal: ${formatINR(b.subtotal)}`,
    `GST (18%): ${formatINR(b.tax)}`,
    `Total: ${formatINR(b.total)}`,
    `Payment: ${paymentLabel(b.paymentMethod, b.paymentLast4)}`,
    ``,
    `Cancellation policy: ${b.room.cancellation}`,
    ``,
    `View your booking: ${appUrl(`/confirmation/${b.ref}`)}`,
  ]
    .filter((line) => line !== "")
    .join("\n");

  return {
    subject,
    html: emailLayout({ preheader: `Booking ${b.ref} confirmed for ${formatDate(b.checkIn)}`, eyebrow: "Reservation Confirmed", title: "We look forward to welcoming you", body }),
    text,
  };
}
