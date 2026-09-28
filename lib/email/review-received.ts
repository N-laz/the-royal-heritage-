import { EMAIL_COLORS as c, appUrl, button, emailLayout, escapeHtml } from "@/lib/email/layout";

export function reviewReceivedEmail(data: { name: string; rating: number; title: string }) {
  const first = data.name.split(" ")[0] || data.name;
  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
  const subject = "Thank you for your review — The Royal Heritage";
  const body = `
    <p style="font-size:15px;line-height:1.7;margin:0 0 20px;">Dear ${escapeHtml(first)},</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 20px;">Thank you for taking the time to share your experience. Every review is read by our team and helps us make each stay more memorable.</p>
    <p style="font-size:24px;letter-spacing:4px;margin:24px 0 6px;color:${c.gold};">${stars}</p>
    <p style="font-family:Georgia,serif;font-size:20px;line-height:1.5;margin:0 0 24px;">&ldquo;${escapeHtml(data.title)}&rdquo;</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 8px;color:${c.muted};">Your review will appear on our website once our guest relations team has approved it.</p>
    ${button("Read guest reviews", appUrl("/reviews"))}
  `;
  const text = `Dear ${first},\n\nThank you for your review "${data.title}" (${data.rating}/5). It will appear on our website once approved.\n\n${appUrl("/reviews")}`;
  return {
    subject,
    html: emailLayout({ preheader: "We have received your review", eyebrow: "Guest Review", title: "Thank you for your words", body }),
    text,
  };
}
