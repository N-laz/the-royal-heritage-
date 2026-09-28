import { EMAIL_COLORS as c, appUrl, button, emailLayout, escapeHtml } from "@/lib/email/layout";

export function welcomeEmail(user: { name: string; email: string }) {
  const first = user.name.split(" ")[0] || user.name;
  const subject = "Welcome to The Royal Heritage";
  const body = `
    <p style="font-size:15px;line-height:1.7;margin:0 0 20px;">Dear ${escapeHtml(first)},</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 20px;">Welcome to The Royal Heritage — a palace of carved sandstone and quiet courtyards on the shores of the Arabian Sea. Your account is ready.</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 8px;">With your account you can:</p>
    <ul style="font-size:15px;line-height:1.9;margin:0 0 8px;padding-left:20px;color:${c.muted};">
      <li>See all your stays in one place</li>
      <li>Book faster with your details filled in</li>
      <li>Get members-only offers, like <strong style="color:${c.gold};">ROYAL10</strong> for 10% off your next stay</li>
    </ul>
    ${button("Begin your journey", appUrl("/stay"))}
  `;
  const text = `Dear ${first},\n\nWelcome to The Royal Heritage. Your account is ready.\nUse code ROYAL10 for 10% off your next stay.\n\n${appUrl("/stay")}`;
  return {
    subject,
    html: emailLayout({ preheader: "Your Royal Heritage account is ready", eyebrow: "Welcome", title: "A royal welcome awaits", body }),
    text,
  };
}
