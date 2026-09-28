export function escapeHtml(value: string | number | null | undefined): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function appUrl(path = ""): string {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return `${base}${path}`;
}

export const EMAIL_COLORS = {
  ivory: "#F5EFE6",
  ivoryLight: "#FCFAF6",
  espresso: "#2A1F18",
  muted: "#6B5A4E",
  gold: "#A8834B",
  goldLight: "#C9A961",
  line: "#E2D4BF",
};

export function row(label: string, value: string, bold = false): string {
  return `<tr>
    <td style="padding:8px 0;color:${EMAIL_COLORS.muted};font-size:14px;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;text-align:right;color:${EMAIL_COLORS.espresso};font-size:14px;${bold ? "font-weight:600;" : ""}">${value}</td>
  </tr>`;
}

export function divider(): string {
  return `<tr><td colspan="2" style="border-top:1px solid ${EMAIL_COLORS.line};padding:0;height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>`;
}

export function button(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 8px;"><tr><td style="background:${EMAIL_COLORS.espresso};">
    <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 34px;color:${EMAIL_COLORS.ivory};font-size:12px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;font-family:Helvetica,Arial,sans-serif;">${escapeHtml(label)}</a>
  </td></tr></table>`;
}

export function emailLayout(opts: { preheader: string; eyebrow: string; title: string; body: string }): string {
  const c = EMAIL_COLORS;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:${c.ivory};font-family:Helvetica,Arial,sans-serif;color:${c.espresso};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.ivory};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${c.ivoryLight};border:1px solid ${c.line};">
      <tr><td align="center" style="background:${c.espresso};padding:36px 24px;">
        <div style="font-family:Georgia,'Times New Roman',serif;color:${c.goldLight};font-size:12px;letter-spacing:6px;text-transform:uppercase;">The</div>
        <div style="font-family:Georgia,'Times New Roman',serif;color:${c.ivory};font-size:28px;letter-spacing:4px;text-transform:uppercase;margin-top:4px;">Royal Heritage</div>
        <div style="width:48px;height:1px;background:${c.goldLight};margin:14px auto 0;"></div>
      </td></tr>
      <tr><td style="padding:40px 36px 12px;">
        <div style="color:${c.gold};font-size:11px;letter-spacing:4px;text-transform:uppercase;text-align:center;">${escapeHtml(opts.eyebrow)}</div>
        <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:30px;line-height:1.25;text-align:center;margin:12px 0 24px;color:${c.espresso};">${escapeHtml(opts.title)}</h1>
        ${opts.body}
      </td></tr>
      <tr><td style="padding:28px 36px 36px;border-top:1px solid ${c.line};text-align:center;color:${c.muted};font-size:12px;line-height:1.7;">
        The Royal Heritage · Heritage Cove, Mandvi Beach Road, Kutch, Gujarat 370465, India<br />
        +91 90812 20186 · kazinomanimtiyaz7656@gmail.com<br />
        <a href="${escapeHtml(appUrl("/"))}" style="color:${c.gold};text-decoration:none;">${escapeHtml(appUrl("/").replace(/^https?:\/\//, ""))}</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}
